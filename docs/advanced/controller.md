# 路由系统

在这个页面，我将讲解一些在Contrller中用得到的注解和其他方便的功能。

## GroupController 与 PrivateController

在YuQ的Controller系统中，便携的提供了类似于常见的类似于WebMVC的Controller功能，主要是继承自`com.IceCreamQAQ.Yu.annotation.DefaultController`的`com.icecreamqaq.yuq.annotation.GroupController`和`com.icecreamqaq.yuq.annotation.PrivateController`两个。

我们顾名思义，`GroupController`和`PrivateController`分别提供了面向群聊和面向私聊的不同路由，也就是在class的上面添加注解之后，便会向YuQ注册成为对饮的路由，然后YuQ便会解析该类下的所有`Action`，来完成对于命令的触发。

其实很多内容在Demo中已经实现，所以对于两个路由不再赘述。

简易代码示例：
```java
@PrivateController
@GroupController
public class WeatherController{}
```

但是，我们有时会遇到一个命令同时使用在群聊和私聊的情况，这种情况会在对路由系统有了一个相对完整认识之后再来讨论。


## BotActionContext

在说`@Before`和`@After`之前，我们先简单说一下`BotActionContext`，这位可以说是路由系统的核心，而你随时可以使用方法参数获取到这个核心，就像是下面这样：
```java
    @Before
    public void getContext(BotActionContext actionContext){}
```

在`BotActionContext`中，用的最多的是以下四位：
- source ：消息来源，如果是`Group`对象表示是群聊，如果是`Friend`或者`Member`则是私聊。
- sender ：消息的发送者，如果消息来源是`Group`，则消息的发送者是信息的具体发送对象，否则可能和`source`中是同一个对象。
- message：信息本身。
- session：会话信息。


## 参数注入

在[编写命令](../guide/command.md)中我们已经见过YuQ可以自动的注入参数，将参数`city`自动从信息中提取出来，然后提交给对应的方法，除了`String`类型以外，YuQ可以进行更简化的注入。





## Before 与 After

关于`com.IceCreamQAQ.Yu.annotation.Before`和`com.IceCreamQAQ.Yu.annotation.After`两个注解，通常是打在已经表明了是路由系统的class上，如果某个类并没有路由系统的标记，其`@Before`和`@After`也是毫无作用的，当然，下面的`@Action`也是同理。

而`@Before`和`@After`注解的作用，主要是在执行具体的指令操作之前进行一个过滤或者善后，比如在执行某些命令的时候需要权限校验，又或者在发送内容的时候要求自己的机器人主动替换掉一些违规内容。


## Action 与 QMsg

## Catch

## Global

## 路由的优先级