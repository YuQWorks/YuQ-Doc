# Contact对象

YuQ中最基本的队话对象，所有可以发送消息的目标都可以视为一个Contact  
在Action和Event中如果不知道具体的来源到底是什么的时候，可以考虑使用Contact来进行接受  
[Friend](base/friend/firend.md)(好友)  
[Group](base/firend/group.md)(群组)  
[Member](base/friend/member.md)(群聊对象)  
三者皆继承自Contact对象，都可使用SendMessage(Message)来发送消息


```kotlin  
interface   User {
    val id: Long
    val avatar: String
    val name: String

    fun isFriend(): Boolean
    fun canSendMessage(): Boolean
}


interface Contact : User {

    fun sendMessage(message: Message): MessageSource

    fun toLogString(): String
    override fun canSendMessage() = true
}
```