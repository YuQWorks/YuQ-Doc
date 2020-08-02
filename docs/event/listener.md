# 事件监听器

## 了解事件
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

## 监听一个事件

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

### 取消事件

我们只需要将传递过来的 `event` 参数的 `cancel` 属性设置成 `true`，就可以取消这个事件。  
`event.setCancel(true);`  
当然，前提是这个事件可以取消。

