# Event

## 内置事件列表
子事件会继承父事件属性，如无特殊情况，则不标注父事件含有的属性。

### 内置事件列表
事件名 | 父事件 | 可否取消 | 事件属性 | 描述
:---: | :---: | :---: | --- | ---
MessageEvent | Event | 是 | sender: 发送人 | 收到消息事件。
GroupMessageEvent | MessageEvent | 是 | sender: 发送消息的群成员, group: 消息来自群| 群消息事件。
PrivateMessageEvent | MessageEvent | 是 | - | 私聊消息事件。
-|-|-
MessageRecallEvent | Event | 否 | sender: 发送者, operator: 撤回者, messageId: 消息Id| 消息撤回事件
PrivateRecallEvent | MessageRecallEvent | 否 | - | 私聊消息撤回事件
GroupRecallEvent | MessageRecaallEvent | 否 | group: 撤回消息的群 | 私聊消息撤回事件
-|-|-
FriendListEvent | Event | 否 | - | 好友列表变动事件
FriendAddEvent | FriendListEvent | 否 | friend: 新增的好友 | 好友新增事件
FriendDeleteEvent | FriendListEvent | 否 | friend: 消失的好友 | 好友减少事件
-|-|-
GroupListEvent | Event | 否 | - | 群列表变动事件
BotJoinGroupEvent | GroupListEvent | 否 | group: 进入的群 | 机器人加入新群事件
BotLevelGroupEvent | GroupListEvent | 否 | group: 离开的群 | 机器人从离开某群事件
-|-|-
GroupMemberEvent | Event | 否 | group: 成员变动的群, member: 变动的群成员 | 群成员事件
GroupMemberJoinEvent | GroupMemberEvent | 否 | - | 新成员入群事件
GroupMemberInviteEvent | GroupMemberJoinEvent | 否 | inviter: 邀请者 | 新成员被邀请入群事件
GroupMemberLeaveEvent | GroupMemberEvent | 否 | - | 群成员退群事件
GroupMemberKickEvent | GroupMemberLeaveEvent | 否 | operator: 操作者 | 群成员被移除群事件
GroupBanMemberEvent | GroupMemberEvent | 否 | operator: 操作者, time: 禁言时长 | 群成员被禁言事件
GroupUnBanMemberEvent | GroupMemberEvent  | 否| operator: 操作者| 群成员被取消禁言事件
GroupBanBotEvent | GroupMemberEvent | 否 | operator: 操作者, time: 禁言时长 | 机器人在某群被禁言事件
GroupUnBanBotEvent | GroupMemberEvent | 否 | operator: 操作者| 机器人在某群被取消禁言事件
-|-|-
NewRequestEvent | Event | 是 | message: 请求消息 | 新的请求事件。
NewFriendRequestEvent | NewRequestEvent | 是 | qq: 申请人的 QQ 号码 | 新的好友请求事件。
GroupInviteEvent | NewRequestEvent | 是 | group: 群号码, qq: 邀请人的 QQ 号码 | 新的邀请入群事件。
GroupMemberRequestEvent | NewRequestEvent | 是 | group: 被申请的群, qq: 申请人的 QQ 号码 | 申请入群事件。
-|-|-
ContextSessionCreateEvent | Event | 否 | session: Session | ContextSession 创建事件。
-|-|-
ActionContextInvokeEvent | Event | 是 | context: 上下文 | Controller 处理链路事件
ActionContextInvokeEvent.Per | ActionContextInvokeEvent | 是 | - | Controller 处理之前事件
ActionContextInvokeEvent.Post | ActionContextInvokeEvent | 是 | - | Controller 处理之后事件

### 内置事件注意事项

事件名 | 注意事项
:--- | ---
MessageEvent | MessageEvent 及其子事件，取消事件会导致 Controller 部分一并取消响应。
GroupBanBotEvent | 与 GroupBanMemberEvent 事件相互独立，触发本事件不会触发 GroupBanMemberEvent 事件。
GroupUnBanBotEvent | 与 GroupUnBanMemberEvent 事件相互独立，触发本事件不会触发 GroupUnBanMemberEvent 事件。
NewRequestEvent | 当事件被取消时，则代表处理本请求。事件的 accept 属性若为 true 则为接受，false 则为拒绝，null 则为忽略。
GroupMemberRequestEvent | 当拒绝入群时，若事件的 blackList 为 true，则禁止此人继续加群。
ActionContextInvokeEvent.Per | 事件发生于路由寻路之前，也就是说，没有任何路由绑定依旧会触发此事件。取消会中断处理链路。
ActionContextInvokeEvent.Post | 事件发生于路由寻路之后，也就是说，没有任何路由绑定依旧会触发此事件。取消会中断可能存在的返回消息的发送。


## 事件监听器

### 了解事件
首先，让我们来了解一下 YuQ 的事件机制。

监听器是监听一个事件，当触发了某个事件时，调用相关的监听器。    
根据监听器及事件的逻辑，来确定后续的过程。

同一个事件监听分为 3 个不同的等级，高，中，低。  
同一个事件，可以被监听多次。  
有些事件可以取消，有些则不能。

```java
public class Event {

    public boolean cancel = false;

    // 事件可否被取消。
    public boolean cancelAble() {
        return false;
    }
    
    /*
        省略 Getter，Setter
    */

}
```

所有事件都 继承自 Event 类。
监听某个事件，其任意一个子事件触发都会触发父事件监听器。  
这句话可能听起来有些让人难以理解。  
举个例子，MessageEvent 有两个子类 GroupMessageEvent 与 PrivateMessageEvent。  
那么 GroupMessageEvent 与 PrivateMessageEvent 就是 MessageEvent 的子事件。  
反之 MessageEvent 就是他俩的父事件。  
那么这句话怎么理解呢？  
就是当你某个监听器监听了 MessageEvent，一旦触发 GroupMessageEvent 或 PrivateMessageEvent，MessageEvent 的监听器就会被调用。

### 监听一个事件

我们需要为事件监听器准备一个类。  
只要你的类标上了 `@EventListener` 注解，那么这个类就会作为事件监听器被载入。

有了事件监听器，我们就要准备监听方法了。  
我们随便准备一个方法，然后标记上 `@Event` 并且填写一个你需要监听的事件作为参数。  
事件监听方法需要一个继承自 Event 类型的参数，并且没有返回值。  
以下是一个最基本的例子。

```java
@EventListener
public class FriendListEvent {
    
    @Event
    public void newFriendRequestEvent(NewFriendRequestEvent event) {
        event.setAccept(true);
        event.setCancel(true);
    }

}
```

我们可以通过自定义 `Event` 注解的 `weight` 属性，来指定监听的优先级。  
`@Event(weight = Event.Weight.high)`  
这样我们就可以得到一个高优先级的监听器。

#### 取消事件

我们只需要将传递过来的 `event` 参数的 `cancel` 属性设置成 `true`，就可以取消这个事件。  
`event.setCancel(true);`  
当然，前提是这个事件可以取消。



## 自定义事件


### 开始之前
内置事件虽然很多但是完全不满足个人的需要，这是显而易见的事情。  
最为常规的移植其他机器人进入yuq的方式很明显是使用MessageEvent事件，或者分开使用GroupMessageEvent和PrivateMessageEvent.  
但是当我们使用yuq开发机器人的时候，还会遇到其他想要的情况，比如，有人@了你的机器人？  
所以某些情况时，我们需要判断是否符合某种情况，但是又要优雅的写好代码，就需要自定义事件来帮忙完成。

### 正式开始

未完成。

#### 看看代码

具体代码参考[YuQ-Mirai-Demo](https://github.com/YuQWorks/YuQ-Mirai-Demo) 的 `wiki.IceCream.yuq.demo.event.myEvent`部分。这里不再放出。





]
