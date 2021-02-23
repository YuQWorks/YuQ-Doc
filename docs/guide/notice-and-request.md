# 处理通知和请求

除了聊天信息之外，YuQ也不会丢下加群请求，加好友请求，出入群通知等其他通知类型事件。这些情况常常会被用于机器人的群管功能中。这是QQ机器人很重要的应用之一。  
在本章中，将介绍如何处理通知和请求。

## 新建文件

一切都从新建文件开始，让我们新建一个`GroupManager.java`，并且和刚刚的路由一样，但是这次添加的注解是`@EventListener`，用以表明自己是一个事件处理的文件。

```java

import com.IceCreamQAQ.Yu.annotation.EventListener;
//此处声明这里是一个事件监听器。
@EventListener
public class GroupManager {
}
```

:::tip 提示
尽管YuQ并不限制注解声明的功能数量，对于同一个文件你可以同时作为路由、事件处理、定时器、Web控制器，但是个人依然希望你能保持良好的文件编写习惯，分开，分类存放。
:::


## 自动通过加群申请

对于事件的具体方法，我们还需要添加`@Event`注解，然后在方法的参数中寻找到对应的想要处理的事件。所以出现如下代码。
```java
    //表明这是一个事件,优先级为Normal
    @Event@Event(weight = Event.Weight.normal)
    /**
     * 需要处理的种种事件，直接寻找对应参数，进行处理即可。
     * @GroupMemberRequestEvent 是群申请入群事件
     */
    public void requestGroup(GroupMemberRequestEvent event){
        if("暗号".equals(event.getMessage())){
            //同意进群申请
            event.setAccept(true);
        }else {
            //拒绝进群事情
            event.setAccept(false);
            //设置拒绝原因
            event.setRejectMessage("暗号错误");
        }
        //取消事件（这样事件才会返回拒绝或者同意的请求，没有这一步事件是不会完成的。
        event.setCancel(true);
    }

```
对于代码的每一行我认为都有了足以让人理解的注释，在YuQ中处理事件就是如此简单，找到方法，书写逻辑，设置参数即可。  

如果你没有使用`event.setCancel(true)`或者根本没有处理这个事件，那么这个入群申请就会放给其他群管理来进行处理。

## 欢迎新成员

新成员入群之后，为了活跃气氛，我们可能希望机器人发一段欢迎消息。只需下面的代码即可实现：

```java
    //事件优先级默认normal。
    @Event
    public void welcome(GroupMemberJoinEvent event){
        event.getGroup().sendMessage(Message.Companion.toMessage("欢迎新朋友~"));
    }
```

这里没有对群号进行校验，所以机器人所在的任何群他都会发出这句欢迎语，你可以自行添加判断代码来实现对某个群的单独发送或者不发送。

总体来说，事件的处理就是如此。其他事件的列表可以暂时参考[旧版文档](../old-doc/event.md)

