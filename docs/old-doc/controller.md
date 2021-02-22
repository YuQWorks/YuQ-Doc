# Controller

## 干啥的？
### 啥玩意啊
Controller 顾名思义，控制器。  
单独提出来控制器，可能不知道是干啥的。  
但是，机器人，它最主要的功能是啥？   
处理消息。   
无论其他的，什么申请啊，禁言啊，撤回啊，那都是次要的。  
处理消息，是最主要的目的。

相比于其他机器人框架，消息和其他的事件都是事件。  
YuQ，在这里和他们有些不同。  
YuQ 不仅可以通过事件处理消息，还可以通过路由匹配，更精确，更方便的处理消息。  
这就是 Controller 部分存在的意义。

尽其所能，降低消息处理的难度与复杂度。

### 咋回事啊
很多情况下，我们的机器人都会处理很多很多的指令。  
有些是娱乐性指令，有些可能是功能性指令，有些则可能是群管类的。

在其他的框架下，我们可能会针对这些指令，写出无数的 if-else 判断。  
这些机械化的东西，真的没有意义，而且性能也很差。  
偶尔心血来潮的时候想写点东西，耐心都被这些重复性的，机械化的，没有丝毫体验的劳动消磨光了。

### 那咋整啊
YuQ 在这里引入了类似于 Web MVC 的那套理论。  
将消息按一定的内容（空格，换行）进行分割，作为路由，然后匹配到相关方法。

举个例子：  
"群 撤回监控 启用"  
通过空格分割，我们就得到了"群"、"撤回监控"、"启用"，这三个元素。  
就像 Web 中请求的地址 /api/user/info 一样。  
然后我们就得到了一个多级地址，可以理解为 Web 中的 URL，就像：群/撤回监控/启用  
熟悉 RESTful 的同学，可能会熟悉，URL，中，某个内容是可以当做参数的。  
这里的启用应该就会被解析为一个参数。  
那我们的代码就应该是：
```java
@Path("群")
@GroupController
public class DemoController {

    @Action("撤回监控 {flag}")
    public String recall(boolean flag) {
        if (flag) return "撤回监控启用！";
        return "撤回监控禁用！";
    }

}
```
```kotlin
@Path("群")
@GroupController
class TestPathGroupController {
    
    @Action("撤回监控 {flag}")
    fun recall(flag: Boolean) = if (switch) "撤回监控启用！" else "撤回监控禁用！"
    
}
```
`@GroupController` 注解，声明了这是一个 Controller，并且是用来处理群消息的。  
`@Path` 注解，声明了这个 Controller 的一级路由为"群"。

到 recall 方法，`@Action` 注解声明了这是一个具体处理某个消息的处理器。  
想其他的 Web MVC 一样，YuQ 的 Controller 也支持零个到多个参数，只需要将你需要的参数写下来。  
YuQ 就会将你需要的参数带到你的方法里面。

这里，我们在 `Action` 注解中，用 `{flag}` 指定了一个参数 `flag`。  
它的含义就是 "群 撤回监控 启用" 这段话中的启用，就会被映射到 flag 参数。  
因为我们要求的参数类型是 `boolean`，所以 "启用" 这个内容，就会被 YuQ 智能的转化为一个 `boolean` 类型的值，并带入到您的 Action 中。

然后 recall 返回的一个 String 对象，被 YuQ 接收，并且组成一个 Message，向消息源发送。

就本例子而言，您在群里发送"群 成员监控 启用"。  
机器人就会给您一个回应："撤回监控启用！"这一结果。

通过这种方式，我们可以让自己从繁杂的指令判断中解放出来，专注于功能的开发。
YuQ 竭尽所能的减少一切机械化的重复劳动。


## 咋用啊？

:::tip 提示
这一部分内容更推荐阅读[指南-编写命令](../guide/command.md)部分
:::

YuQ 将私聊信息与群聊信息分为两个不同体系。  
双方不互通。

`@PrivateController` 声明这是一个用来处理私聊的 Controller。  
`@GroupController` 声明这是一个用来处理群聊的 Controller。

两种 Controller 除了服务的对象不一样之外，其余的使用方法全部相同。  
(但一个类可以同时作为 PrivateController 和 GroupController 使用)

### Controller

#### Controller 类
我们需要为 Controller 准备一个类。
然后根据我们要处理的是群聊，或是私聊标记上相应的注解。

```java
@GroupController
public class DemoController {

}
```
```kotlin
@GroupController
class DemoController {

}
```

#### 处理链路

消息 -> MessageEvent -> ActionContextInvokeEvent.Per -> 查找路由 -> Befores -> Action -> Afters -> ActionContextInvokeEvent.Post

Befores -> Action -> Afters  
这一过程就是 Controller 的处理链路。
在链路内，任何一个环节产生异常，均可以中断处理链路。

和一般的异常不同，Message 对象本身就是一个异常，通过 throw Message，可以直接中断处理链路，并直接返回一条消息。  
一般用在 Before 中，做权限判断时，如果没有权限，则 throw 一个 Message 出去，通知对方并且停止处理链路。

和 Message 一样，DoNone 也是一个相对特殊的异常，通过 throw DoNone 可以中断处理链路，并且什么都不响应。


### Action

```java
    @Action("菜单")
    public String menu(){
        return "这是一个基础菜单，\n" +
                "但因为这只是一个演示 Demo，\n" +
                "他并没有什么具体功能，\n" +
                "所以，就这样吧。";
    }
```
```kotlin
    @Action("菜单")
    fun menu()= """
        |这是一个基础菜单，
        |但因为这只是一个演示 Demo，
        |他并没有什么具体功能，
        |所以，就这样吧。
        """.trimMargin()
```
这时候，我们只需要在群里发送一句"菜单"，就能看到我们机器人回复的消息了。

#### 参数映射

有时候我们不仅仅需要响应消息，还需要根据消息的内容，做出不同的反应。  
YuQ 提供了非常方便的读取消息内容的方法。  
只需要在 `Action` 注解中，写好你需要的内容，就可以匹配读取。

如 `@Action("你好 {name}")`  
我们只需要在 Action 的方法中，添加一个名为 name 的 String 类型的参数，就可以自动拿到 "你好 世界" 这个消息中的世界。
YuQ 能办到的还不只这些。  
他还能根据你的需要，将参数转化为你所需要的类型。  
如 `@Action("撤回监控 {flag}")`，通过将 flag 参数 指定为 boolean 类型，就可以自动的将参数转化为相应的值。  
根据消息内容不同，可转化的类型也不同，具体可以参考：[MessageItem](base/message/MessageItem.md)

有时候，我们不仅仅需要某段消息的内容，还需要匹配某段消息中的某个内容。  
就比如，我们想匹配 "你*" 这种指令，我们只需要写 `@Action("你{para}")`，通过方法添加一个名为 para 的 String 参数，就可以获取到想要的。  
但是目前，只能转化为 String 参数。  
如果你有更复杂的匹配需求，可以在 {} 内指定正则表达式。  
如：`@Action("你{para:.}")`，通过在参数名 : 后面就可以书写正则表达式了。  
一个消息段中可以有多处正则表达式匹配内容。

如果我们只需要正则匹配，不需要获取信息，可以通过 \\ 反斜杠将正则表达式内容括起来。  
例如：`@Action("\\(s|S)team炸了吗\\")`

需要其他参数？看看下面的参数映射。


### 前置拦截器 Before

前置拦截器在 Action 之前响应。

```java
    @Before
    public void before(Member qq) {
        if (!qq.isAdmin()) throw MessageUtil.stringToMessage("你没有使用该命令的权限！");
    }
```
我们可以通过 `Before` 注解声明一个前置拦截器。  
通过设定注解的 except 和 only 参数，可以指定拦截器排除某些 Action 或只对某些 Action 生效。  
如 `@Before(except = "init")` 则代表了这个拦截器排除了方法名为 init 的 Action。  
可以通过指定 value 参数来指定拦截器的优先级，值越小优先级越高。

Before 接受 0 或多个参数，参数内容详见参数注入。  
Before 接受任意返回值。  
如果 Before 有返回值，那么则将该返回值以其实际类的类名（simpleName），并将首字母转为小写为键保存起来，以供后续注入。  
例如，返回值类型为 com.IceCreamQAQ.simple.Entity 则键为 entity。  
在后续处理中可以通过声明一个 entity 为名的参数取得本返回值。  
所谓的后续处理，是指位于Before之后的Action，当他走入对应的Action时候，Message可能已经被你在Before中进行了一定的处理。  
如果你要问什么处理，比如参数的修改，我将Member的QQid更换为另外一个QQid，在Action中处理的id就是修改后的。又或者本来没有Session，我在Before中建了一个Session，那么Action就可以进行使用。拿代码来简单举例一下
算了，代码解释，不太会写文档。
```kotlin
    //weight 表示权重
    @Before(weight = 0)
    //表示全局，他不论位于哪个class中，都会位于其他Action之前。
    @global
    fun before(qq: Long, message: Message, actionContext: BotActionContext){
        
        val TestEntity = Service.findByQQ(qq)
        //Before之后会进入Action。如果想要中断，使用throw抛出异常，如果异常类型是Message，则机器人会返会此条Message
        if (TestEntity == null || TestEntity.cookie == "") throw mif.at(qq).plus("您还没有绑定哔哩哔哩账号，无法继续！！！，如需绑定请发送[bilibililoginbyqq]或[bilibililoginbyweibo]或[]bilibililoginbyqr").toThrowable()
        actionContext["biliBiliEntity"] = TestEntity
    }
    @Action("Testmy")
    //自动At  At之后自动换行
    @QMsg(at = true, atNewLine = true)
    //注意参数TestEntity 这个Entity是由Before的actionContext注入进来的。
    fun searchMyFriendDynamic(testEntity: TestEntity, @PathVar(value = 1, type = PathVar.Type.Integer) num :Int?, qq: Long): Message{
        //假定此行获取TestEntity的好友动态  那么可以直接使用testEntity          
        val commonResult = testLogic.getFriendDynamic(testEntity)
        val list = commonResult.t ?: return mif.at(qq).plus(commonResult.msg)
        if (list.isEmpty()) return mif.at(qq).plus("您的好友没有任何动态呢！！")
        val newNum = this.parseNum(list, num)
        return testLogic.convertStr(list[newNum - 1]).toMessage()
    }
```

### 后置拦截器 After

后置拦截器在 Action 之前响应。

```java
    @After
    public void after(Message reMessage) {
        if (reMessage != null) reMessage.at = true;
    }
```
我们可以通过 `After` 注解声明一个后置拦截器。  
与前置拦截器相同，通过设定注解的 except 和 only 参数，可以指定拦截器排除某些 Action 或只对某些 Action 生效。  
如 `@After(except = "init")` 则代表了这个拦截器排除了方法名为 init 的 Action。  
可以通过指定 value 参数来指定拦截器的优先级，值越小优先级越高。

After 接受 0 或多个参数，参数内容详见参数注入。  
After 接受任意返回值。  
与 Before相同，如果 After 有返回值，那么则将该返回值以其实际类的类名（simpleName），并将首字母转为小写为键保存起来，以供后续注入。  
例如，返回值类型为 com.IceCreamQAQ.simple.Entity 则键为 entity。  
在后续处理中可以通过声明一个 entity 为名的参数取得本返回值。  
但是After基本上是最后一个处理环节了，，所以.....

### 异常拦截器 Catch
Catch在Action触发异常的时候相应。  
Catch需要指定异常比如`NullPointException`或者使用`Exception`来捕获所有的异常。  
Catch与Before与After在使用上，作用范围上都基本一致，同样具有优先级，参数注入，可以使用`@Global`来使其变为全局异常捕获器（依然只限于Controller部分）  
除此之外，还可以使用方法参数获取Exception，也就是说相当于在Try Catch 中的Catch执行方法，不需要每个方法都写一下Try Catch了。
Catch同样具有优先级设定，对于一个异常，也会按照优先级逐步前进。虽然我感觉未必有用，但是说不定你恰好需要呢？  
至于代码，因为和Before和After非常相似，所以我就不写了。如果确实需要示例，后期会再补上。


## 还有呢？

### 参数注入

有时候，我们不仅仅需要对于消息做出基本的响应。  
我们还需要一些参数，来知道我们的指令需要做些什么。

参数名 | 描述 | 类型 | 备注
:---: | --- | --- | ---
qq | 发送者 | long，Long，User，Contact，Friend/Member | 好友私聊具体对象为 Friend 实例，临时会话私聊为 Member 实例。
sender | 等同于qq | long，Long，User，Contact，Friend/Member | 好友私聊具体对象为 Friend 实例，临时会话私聊为 Member 实例。
group | 来自群 | long，Long，User，Contact，Group | 仅在群聊消息或临时会话消息时存在。
actionContext | 当前处理的上下文 | ActionContext，BotActionContext
context | 等同于 actionContext | ActionContext，BotActionContext
contextSession | 上下文会话 | ContextSession
session | 等同于 contextSession | ContextSession
path | 当前消息的具体路径 | String[]
sourceMessage | runtime 平台的原生消息对象 | Object | 如果 YuQ 满足需求，一般不建议对 runtime 的原生对象进行操作，以尽量保证跨平台能力。
reply | 消息回复的消息源 | MessageSource | 如果未回复消息则为 null。
message | 收到的消息对象 | Message
reMessage | 回复的消息对象 | Message | 仅在 After 阶段才可能有本对象。

上面的一些参数，如果有需要，直接在 Before，Action，After 的具体方法中填写某个参数，以及你需要的类型，即可自动将参数注入到方法。  


### 常用注解

注解|参数|描述|可用位置|备注
---|---|---|---|---
Synonym|value: String[]|同义词，使得一个 Action 可以响应多个指令。|Action 方法
QMsg|at: 在消息头At对方, reply: 回复该消息|对返回的消息进行附加操作|Action 方法
NextContext|value: 下一次的 Context 路由名, status: 状态码|声明下一条消息需要走哪个上下文路由|Action 方法
ContextTip|value: 提示内容,status: 状态码|如果下一条消息的上下文路由是自己，则输出消息提示|Action 方法|该注解允许重复标在同一方法上。
Save| - |将方法参数保存到 Session | Before，Action，After 方法的参数 | 默认保存的键为参数名，可通过 @Named 注解指定。
PathVar|value: 欲获取的消息段下标, type: 目标类型|获取消息中的某段消息| Before，Action，After 方法的参数

### 上下文路由

可放弃，推荐使用上下文会话

### ContextSession 上下文会话

session 是以 QQ 账号为单位的。  
同一群组内，不同 QQ 账号有不同的 Session。  
不同群组内，同一 QQ 账号有不同的 Session。  
私聊与群聊 Session 不互通。

Session 默认持续时间为 30 分钟。  
如果 Session 30 分钟内，没有任何响应才会失效。  
持续时间修改请参考 Ehcache。

#### waitNextMessage 等待下一条消息

waitNextMessage 方法可以使当前线程挂起，并等待下一条消息是激活。  
参数： maxTime 最大等待时长，单位：毫秒。默认为 30 秒。  
返回值：Message 下一条消息。  
当超时后会抛出 WaitNextMessageTimeoutException。

#####上下文队话以及路由的初级使用示范

在路由中继承`com.icecreamqaq.yuq.controller.QQcontroller`是获取ContextSession的第一步。
QQcontroller自带了reply方法可以直接将对象返回至源，进行极为方便的消息反馈。以下为绑定实例。
````kotlin
@PrivateController
class BindController: QQController() {
    //Bind bind BindAccount 皆可触发该Action
    @Action("Bind")
    //注意此注解，不懂参考上表
    @Synonym(["bind","BindAccount"])
    /**
      * qq自动获取发言人的qqid，或者使用qq : contact 来接受一个contact对象
      *
    **/
    fun bind(qq: Long, session: ContextSession): String{
        //Bot对于Bind进行回复
        reply("请输入账号！！")
        //等待消息 返回值是Message对象，可以使用trycatch捕获超时异常
        val accountMessage = session.waitNextMessage(30 * 1000)
        val account = accountMessage.firstString()
        reply("请输入密码")
        val pwdMessage = session.waitNextMessage(60 * 1000 * 2)
        val password = pwdMessage.firstString()
        return "绑定成功！！"
    }
}
````
#####上下文队话在群组中的高级示例

:::tip 提示
这只是一个玩具功能，并没有实际作用，仅供参考多人上下文使用而已。
:::

同样需要继承`com.icecreamqaq.yuq.controller.QQcontroller`，与上面被动的简单使用Session不同的是，使用注入来获取YuQ的Session缓存，
能够让我们对于Session有更强的控制力，在群组对话中玩出更多的花样。以下是一个Bp的Demo，可以从中体会一下自定义Session的作用。

````kotlin
    @GroupController
    class DemoController : QQController() {
        //使用inject注入Session缓存来实现自定义控制
        @Inject
        @field:Named("ContextSession")
        private lateinit var cache: EhcacheHelp<ContextSession>
    
        @Action("Bp {num}")
        @Synonym(["BP {num}","bp {num}","bP {num}"])
        fun colorPic(group: Group, qq: Long, session: ContextSession, num : Int ): Message {
            if(num %2 !=0) return "bp数字应该为2的倍数".toMessage()
            reply("Bp第一版本，自我指定Bp数字，对bp内容不做校验，游戏参与者请注意输入的Bp内容。")
            reply(mif.at(qq).plus("请指定第一位BP手，如是自己请输入1"))
            //注意此处PathVar的使用，可以获取Message中某一段的内容
            var midMessage = session.waitNextMessage().body[0].convertByPathVar(PathVar.Type.Long)
            if( midMessage != 1L) {
                //直接retrun打断对话，撤销Session
                group.members[midMessage] ?: return "群成员不存在，已退出上下文，请从头再来".toMessage()
            }
            val firstBp : Long = qq
            reply("请指定第二位BP手，如是自己请输入1")
            var secondBp = session.waitNextMessage().body[0].convertByPathVar(PathVar.Type.Long)
            if( secondBp == 1L) secondBp = qq
            if( secondBp == firstBp) return "两位Bp手不能为同一人，已退出上下文，请从头再来".toMessage()
            group.members[secondBp] ?: return "群成员不存在，已退出上下文，请从头再来".toMessage()
            //自己创建Session对象
            val secondSession = ContextSession(group.id.toString()+"_"+secondBp.toString())
            //假如Cache
            cache[group.id.toString()+"_"+secondBp.toString()] = secondSession
            reply("准备开始Bp，总计Bp${num}个")
            val array = arrayListOf<String>()
            var result = "Bp结果如下：\n"
            for (i in 1..num){
                if(i %2 !=  0){
                    reply("第${i}次Bp，一号Bp手发言")
                    midMessage = session.waitNextMessage().body[0].convertByPathVar(PathVar.Type.String)
                    array.plus(midMessage)
                    result += "${midMessage}\n"
                }else{
                    reply("第${i}次Bp，二号Bp手发言")
                    midMessage = secondSession.waitNextMessage().body[0].convertByPathVar(PathVar.Type.String)
                    array.plus(midMessage)
                    result += "${midMessage}\n"
                }
            }
            return result.toMessage()
        }
    }
````
###### 最后一句话
在Session中，我们的消息处理不会被额外的内容所打断（特别是群聊队话）也能达成更多的其他操作，避免了长命令，复杂命令等情况。但是美中不足的一点是，可能会在聊天记录上看起来略显繁琐，
但是这也是不必避免了，毕竟我们总需要反馈或者指导机器人的使用者来进行下一步操作不是吗？（笑



