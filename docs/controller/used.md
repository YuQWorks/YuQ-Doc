# 咋用啊？

YuQ 将私聊信息与群聊信息分为两个不同体系。  
双方不互通。  

`@PrivateController` 声明这是一个用来处理私聊的 Controller。  
`@GroupController` 声明这是一个用来处理群聊的 Controller。  

两种 Controller 除了服务的对象不一样之外，其余的使用方法全部相同。  
(但一个类可以同时作为 PrivateController 和 GroupController 使用)

## Controller

### Controller 类
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

### 处理链路

消息 -> MessageEvent -> ActionContextInvokeEvent.Per -> 查找路由 -> Befores -> Action -> Afters -> ActionContextInvokeEvent.Post  

Befores -> Action -> Afters  
这一过程就是 Controller 的处理链路。
在链路内，任何一个环节产生异常，均可以中断处理链路。

和一般的异常不同，Message 对象本身就是一个异常，通过 throw Message，可以直接中断处理链路，并直接返回一条消息。  
一般用在 Before 中，做权限判断时，如果没有权限，则 throw 一个 Message 出去，通知对方并且停止处理链路。  

和 Message 一样，DoNone 也是一个相对特殊的异常，通过 throw DoNone 可以中断处理链路，并且什么都不响应。


## Action

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

### 参数映射

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


## 前置拦截器 Before

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

## 后置拦截器 After

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

## 异常拦截器 Catch
Catch在Action触发异常的时候相应。  
Catch需要指定异常比如`NullPointException`或者使用`Exception`来捕获所有的异常。  
Catch与Before与After在使用上，作用范围上都基本一致，同样具有优先级，参数注入，可以使用`@Global`来使其变为全局异常捕获器（依然只限于Controller部分）  
除此之外，还可以使用方法参数获取Exception，也就是说相当于在Try Catch 中的Catch执行方法，不需要每个方法都写一下Try Catch了。
Catch同样具有优先级设定，对于一个异常，也会按照优先级逐步前进。虽然我感觉未必有用，但是说不定你恰好需要呢？  
至于代码，因为和Before和After非常相似，所以我就不写了。如果确实需要示例，后期会再补上。


## 参数注入

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




