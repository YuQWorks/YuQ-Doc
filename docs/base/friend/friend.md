# Friend 对象

friend对象指示的是一个好友，存在于机器人的好友列表之中，可用yuq对象中的friends获取所有的机器人好友对象。  
每个对象都可以判断qq号，昵称等常见个人资料，同时Friend继承自contact，可以使用sendMessage来实现消息的主动发送。  

## Friend的几个操作


sendMessage  发送消息 使用Message对象发送  
isFriend    判断是否好友 返回boolean类型

```kotlin
interface Friend : Contact {

    override fun isFriend() = true
    override fun canSendMessage() = true
    override fun toLogString() = "$name($id)"

    fun delete()
    fun click()
}
```