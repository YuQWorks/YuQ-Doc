# 发生了什么？

在刚刚我们已经启动了一个基本的YuQ实例，并且触发了他的群聊和私聊路由，如果你有仔细观察IDE下方的Log，你还可以发现定时器（Job）和事件（Event）也正在运行。  

现在，让我们来看看到底发生了什么。

## 从 Hello 开始

我记得我说过，YuQ是一个无头的QQ客户端，当你向你的机器人发送Hello的时候，这条消息也会从腾讯服务器下发至你的机器人QQ，这时候，机器人就会和正常的QQ一样接受，并且解析他们。  

## 进入YuQ
    
这时候，消息已经被YuQ所拿到，他将信息与发送者包装成为一个个对象，然后打包开始走固定的流程，首先出场的是Event（事件）。

## 进入Event

不论什么消息，常规的群聊消息或者是好友请求这样的特殊消息，基本都存在着对应的事件，所以YuQ拿到消息的第一时间，也是将消息发送给事件，在Event中，你可以找到MessageEvent。  
顾名思义，消息事件会在这里触发，并允许处理逻辑，对于MessageEvent，有两个子类，分别是PrivateMessageEvent和GroupMessageEvent，对应的处理群聊和私聊逻辑。  
Event可以使用参数设置优先级，任何事件都拥有`high`,`normal`,`low`,三个级别可供选择，默认情况为`normal`。  

```java
    @Event(weight = Event.Weight.normal)
    public void onGroupMessage(GroupMessageEvent event) {
        System.out.printf("消息来自群：%s(%d)%n", event.getGroup().getName(), event.getGroup().getId());
        System.out.printf("消息来自群成员：%s(%d)%n" , event.getSender().getNameCard(),event.getSender().getId());
    }

```
这是处理群聊的事件代码，其中`@Event`表明它是一个事件，`(weight = Event.Weight.normal)`声明了其权重，`event.getGroup()`是通过事件获取其群对象，其中包括了群名称`event.getGroup().getName()`,群ID`event.getGroup().getId()`。  
同时也获取了发送者对象` event.getSender()`，它的昵称`event.getSender().getNameCard()`和他的号码` event.getSender().getId()`。  
你还可以使用`event.getMessage`来获取发送的对象。

更详细的情况我们会在事件功能进一步阐述，目前你只需要知道他是触发型，有优先级，可以取消向后的传递，就足以了。

## Controller

走过Event，信息将会被给到对应的Controller（但是仅有聊天信息，好友请求等情况是作为事件处理的），作为命令式机器人，使用大量的if，else或者switch判断机器人的信息是否符合指令实在是，太累了。作为一个现代开发者，更喜欢的是注解表达指令，直接处理逻辑。  
使用过Spring或者其他现代MVC框架的人都应该很容易的理解这里的过程，匹配指令，处理逻辑，进行返回，但是有几个点我需要说明一下，这是机器人与WebMVC不同的地方。

### 关于

写在介绍功能之前，是因为我要简单的说明一点，Controller的核心是`@Action`，所以只有遇到了适合`@Action`的情况下，才会走所在类的`@Before`和`@After`，如果没匹配到任何的`@Action`，那么信息在走完Event之后就已经结束了。

### Before

Before是信息在Controller中第一个到达的地方，通常来说，Action中的参数表达了具体的命令，他所在类的Before则会先于Action一步对其进行处理，构思来自于Web的拦截器。常见情况下我们会在这里进行开关判断，更为进阶的使用一步我们后续再说，先来看看代码。
```java
    @Before
    public void before(long qq) {
        if (qq % 2 == 0) throw mif.text("你没有使用该命令的权限！").toMessage().toThrowable();
    }
```
`long qq`表明你在向YuQ索要信息发送者的QQ号码，同理你可以使用`long group`来获取群号码，这是特性之一的参数自动注入的简单使用。  
当我们认为不符合条件不可以执行下一步时，与`event.setCancel(true);`来取消事件不同，这里使用throw抛出异常来通知YuQ，当你throw了一个Message类型的异常，YuQ会自动将你的信息返回到原来的群聊（私聊）窗口中。
而`mif`是MessageItemFactory的缩写，他在上面已经被注入进来（在`TestGroupController`的第35行），在这里是为了快速的制作一个Message，你以后会经常碰到他，使用它。


### Action

Action是信息匹配的地方，经过了重重过滤，我们的信息在符合条件的情况下终于到达了他所要到达的地方，在这里，就和写Web一样，我们要针对指令的请求进行反馈，这一点无需多言，但是在这里，YuQ仍然有者很多特点需要说一说。

```java
    @Action("禁言 {sb} {time}")
    @Synonym({"ban {sb} {time}"})
    public String ban(Member sb, Member qq, int time) {
        if (time < 60) time = 60;
        if (qq.isAdmin()) {
            sb.ban(time);
            return "好的";
        }
        qq.ban(time);
        return "您没有使用该命令的权限！为了防止恶意操作，你已被禁言相同时间。";
    }
```
 - 别名

上面这一段中，`@Synonym`与`@Action`表达了两个不同的命令，但是他们的参数是相同的，这意味着`禁言 xxx xx`与`ban xxx xx`都会在这里触发。这就是与WebMVC框架不同的一点，别名。  

 - 参数注入 

在整个方法的参数中分别出现了`Member sb`，`Member qq`，`int time`三项，其中`Member qq`道理与上面Before中出现`long qq`相同，他们都是在索要发送者的信息，不同点在于，Before中仅索要了号码，而这里则在索要相对完整的个人信息。
在代码中，`qq.isAdmin()`判断了发言者否为管理员。   
而`Member sb`是YuQ完成的智能转换，根据你在消息中提供的账号，找到他的对应信息，转成一个对象，来提供禁言的功能，任何时候，你都可以这样来获取某个人的信息，而无需自己寻找。  
接着是`int time`这是由于你已知了参数time是一个数字，表达禁言的时间，那么他最终都会变成`int`类型，所以你可以直接向YuQ要求提供`int`类型的参数，这样你可以直接使用而无需自己转换。当然，如果不能转换会产生异常。  
在某些情况下，你甚至可以直接向YuQ索要`boolean`类型的参数。

 - 返回类型  

最后是方法的返回，YuQ接受两种返回方式，`String`和`Message`，当你选择前者时，直接return即可。他会自动被包装成为`Message`并发送回到信息来源的地方。如果是`Message`则需要你使用之前我们说过的`MessageItemFactory`来包装成为`Message`返回,在这样的返回模式下，返回值极为多样化，可以包括文字，图片，@信息等。
 
### After

这里已经算得上是消息的终点站，走出这里之后，消息就会被YuQ发往腾讯服务器，然后你就会在群聊或者私聊窗口看到他。但是对于After，其实并没有太多需要说的，他和`@Before`太多相似，只是一个在处理之前，一个在处理之后。  
所以接下来


### Catch

这是一个特殊的注解，注解参数是异常类型，可以用于捕获所在类里面的该种异常然后进行处理，我会稍后在进阶文档中对他进行描述。如果你动手能力强，在完成基础部分以后，也可以考虑进行尝试。


