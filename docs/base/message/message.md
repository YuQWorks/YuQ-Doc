# Message 类

Message 对象，既为一个消息的具体的对象。  
接受消息，收到的是一个 Message 对象，发送消息同样也需要一个 Message 对象。

## Message 的组成

```Kotlin
    var temp: Boolean // 是否为临时会话
    
    var id: Int? // 消息Id
    var qq: Long? // 发言人 QQ 号码
    var group: Long? // 发言人所在群号码（当好友私聊时此项为空）

    lateinit var source:MessageSource // 消息源，用于回复与撤回
    var reply: MessageSource? // 回复某条消息，为空时不回复
    var at: Boolean = false // 发送消息时 At 对方

    lateinit var sourceMessage: Any // Runtime 平台源消息对象，可能为任何类型。
    var body: List<MessageItem> // 消息内容
    lateinit var path:List<MessageItem> // 经过处理的，用于路由的路径消息内容
```

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
   