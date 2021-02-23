# 好友相关
## Contact对象

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

## Friend 对象

friend对象指示的是一个好友，存在于机器人的好友列表之中，可用yuq对象中的friends获取所有的机器人好友对象。  
每个对象都可以判断qq号，昵称等常见个人资料，同时Friend继承自contact，可以使用sendMessage来实现消息的主动发送。

### Friend的几个操作


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

## Group对象
Group指代的是Bot中的一个群组，与friends相似，使用yuq的getGroups可以获取所有的Group，并且同样继承自Contact。  
在Group中，存有全体群成员的MemberList和管理员列表的AdminList

```kotlin
interface Group : Contact {

    val members: Map<Long, Member>
    val bot: Member
    val maxCount: Int

    val owner: Member
    val admins: List<Member>

    operator fun get(qq: Long)= getOrNull(qq) ?: error("Member $qq Not Found!")

    fun getOrNull(qq:Long):Member? = members[qq] ?: if (qq == bot.id) bot else null
    /***
     * 离开本群，当机器人是群主的时候解析为解散。
     */
    fun leave()
    fun banAll()
    fun unBanAll()
}
```

## Member对象


继承自Contact，发送方法一致。与Group和Friend不同的是，Member指向的是群聊内的某个成员，他未必与机器人构成好友关系。  
与此同时，YuQ提供了一系列对于群成员的操作方法

```KOTLIN
interface Member : Contact, User {

    //所在群
    val group: Group
    //权限级别
    val permission: Int
    //群昵称
    var nameCard: String
    //头衔（大概）
    val title: String
    //被禁言时间
    val ban: Int
    fun isBan()
    fun ban(time: Int)
    fun unBan()
    fun nameCardOrName() 
    fun click()
    fun clickWithTemp()
    fun at(): At = mif.at(this)
    fun isAdmin() 
    fun isOwner()

    fun kick(message: String = "")
}
```

方法名 | 参数 | 返回值 | 解释
--- | --- | --- | ---
isBan | void | boolean | 是否被禁言
Ban | int | void | 禁言Member（需要管理员权限）
NameCardOrName | void | String | 返回群昵称或者QQ昵称
Click | void | void | 戳一戳
isAdmin | void | boolean | 是否拥有管理员权限
isOwner | void | boolean | 是否群主
kick | message | void | 踢人
