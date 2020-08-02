# Message 类

Message 对象，既为一个消息的具体的对象。  
接受消息，收到的是一个 Message 对象，发送消息同样也需要一个 Message 对象。

## Message 的结构

与 CoolQ 等机器人不同的是，YuQ 的 Message 不再仅仅是一串文本。  
在 YuQ 中 Message 被封装成了一个对象。  
YuQ 将消息中常用的逻辑抽象，构建了一个更易用的 Message 类。  
和 CoolQ 那种一个消息混杂了文本与酷Q码的形式不同，YuQ 也将消息中的不同元素（纯文本，At，图片等等）封装为了 [MessageItem](base/message/messageItem.md)。  
以供更方便的操作，取值，及转化。  

Message 的 body，也就是消息体，是一个消息的内容，也是一个消息中重要的组成部分。  
他是由一个或多个 MessageItem。  

Message 的 body 也是所有消息内容的对象组成的数组。 

```java
public class Message{

    // 消息Id
    private Integer id;
    
    // 消息源，用于回复与撤回
    private MessageSource source;
    
    // 回复某条消息，为空时不回复
    private MessageSource reply;
    // 发送消息时 At 对方（仅群聊生效）
    private boolean at = fasle;
    
    // Runtime 平台源消息对象，可能为任何类型。
    private Object sourceMessage;
    
    // 消息内容
    private List<MessageItem> body;
    // 经过处理的，用于路由的路径消息内容
    private List<MessageItem> path;
    
    /*
        省略 Getter Setter
    */

}
```

## Message 的使用

### 得到一个新的 Message

API 变动，我们无需再通过 MessageFactory 构造消息。  
现直接通过 new 关键字即可获取新 Message 。  

```java
    new Message()
```

### 向消息中添加内容

Message 对象提供 plus 方法用以向消息中添加内容。
```java
    // 向 Message 中追加一个 MessageItem
    public Message plus(MessageItem item)
    // 向 Message 中追加一段文字
    public Message plus(String item)
    // 向 Message 中追加另一消息的内容
    public Message plus(Message item)
```

plus 方法同时重写了 Kotlin 中的操作符 "+"，Kotlin 开发者可以直接使用 + 向 Message 添加内容。

### 发送消息

在 YuQ 中，所有可以发送消息的对象都被称之为联系人（Contact）。  
Contact 提供了一个 `sendMessage(Message)` 方法，用于发送消息。

### 撤回消息
通过 Message 或者 MessageSource 的 recall 方法，我们可以直接撤回本条消息。
撤回成功，返回 0，权限不足返回 -1。

### 回复消息
将 Message 的 reply 属性，设置为您想回复的消息的 MessageSource 对象。