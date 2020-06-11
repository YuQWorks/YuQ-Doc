# Message 类

Message 对象，既为一个消息的具体的对象。  
接受消息，收到的是一个 Message 对象，发送消息同样也需要一个 Message 对象。

## Message 的组成
```Java
public class Message{

    // 消息Id
    private Integer id;

    // 发言人 QQ 号码
    private Long qq;
    // 发言人所在群号码（当好友私聊时此项为空）
    private Long group;
    // 是否为临时会话
    private boolean temp;
    
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
```Kotlin
open class Message {
    var temp: Boolean // 是否为临时会话
    
    var id: Int? // 消息Id
    var qq: Long? // 发言人 QQ 号码
    var group: Long? // 发言人所在群号码（当好友私聊时此项为空）

    lateinit var source:MessageSource // 消息源，用于回复与撤回
    var reply: MessageSource? // 回复某条消息，为空时不回复
    var at: Boolean = false // 发送消息时 At 对方（仅群聊生效）

    lateinit var sourceMessage: Any // Runtime 平台源消息对象，可能为任何类型。
    var body: List<MessageItem> // 消息内容
    lateinit var path:List<MessageItem> // 经过处理的，用于路由的路径消息内容
}
```
## Message 的结构
与 CoolQ 等机器人不同的是，YuQ 的 Message 不再仅仅是一串文本。  
Message 对象，包含了一条消息所应该有的完整内容，  
如：
  发送源/接受者
  消息内容
  和一些其他的用于更加便于使用的内容

Message 的 body，也就是消息体，是一个消息的内容，也是一个消息中重要的组成部分。  
他是由一个或多个 MessageItem。  
MessageItem 既为消息内容的具体表现形式。  
和 CoolQ 那种一个消息混杂了文本与酷 Q 码的形式不同。  
YuQ 把所有组成元素都封装成了对象。  

Message 的 body 也是所有消息内容的对象组成的数组。 

## Message 的使用

### 得到一个新的 Message

1. 使用 [MessageFactory](base/message/messageFactory.md) 创建一个 Message
    ```Kotlin
        // 新建一个消息
        fun newMessage():Message
        // 新建一个群消息
        fun newGroup(group:Long):Message
        // 新建一个私聊消息
        fun newPrivate(qq:Long):Message
        // 新建一个临时会话消息
        fun newTemp(group:Long,qq:Long):Message
    ```
2. 通过 Message 直接得到一个目标是当前 Message 的新的 Message
    ```Kotlin
        message.newMessage()
    ```
### 向消息中添加内容

Message 对象提供 plus 方法用以向消息中添加内容。
```Kotlin
    // 向 Message 中追加一个 MessageItem
    operator fun plus(item: MessageItem): Message
    // 向 Message 中追加一段文字
    operator fun plus(item: String): Message
    // 向 Message 中追加另一消息的内容
    operator fun plus(item: Message): Message
```

plus 方法同时重写了 Kotlin 中的操作符 "+"，Kotlin 开发者可以直接使用 + 向 Message 添加内容。

### 发送消息
我们需要将 YuQ 的实例注入进来，并且通过 YuQ 对象发送消息。
```Kotlin
    yuq.sendMessage(message)
```

### 撤回消息
通过 Message 或者 MessageSource 的 recall 方法，我们可以直接撤回本条消息。
撤回成功，返回 0，权限不足返回 -1。

### 回复消息
将 Message 的 reply 属性，设置为您想回复的消息的 MessageSource 对象。
   