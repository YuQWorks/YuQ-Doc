# Member对象


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
