# Group对象
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