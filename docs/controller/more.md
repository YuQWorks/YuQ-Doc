## 常用注解

注解|参数|描述|可用位置|备注
---|---|---|---|---
Synonym|value: String[]|同义词，使得一个 Action 可以响应多个指令。|Action 方法
QMsg|at: 在消息头At对方, reply: 回复该消息|对返回的消息进行附加操作|Action 方法
NextContext|value: 下一次的 Context 路由名, status: 状态码|声明下一条消息需要走哪个上下文路由|Action 方法
ContextTip|value: 提示内容,status: 状态码|如果下一条消息的上下文路由是自己，则输出消息提示|Action 方法|该注解允许重复标在同一方法上。
Save| - |将方法参数保存到 Session | Before，Action，After 方法的参数 | 默认保存的键为参数名，可通过 @Named 注解指定。
PathVar|value: 欲获取的消息段下标, type: 目标类型|获取消息中的某段消息| Before，Action，After 方法的参数

## 上下文路由

可放弃，推荐使用上下文会话

## ContextSession 上下文会话

session 是以 QQ 账号为单位的。  
同一群组内，不同 QQ 账号有不同的 Session。  
不同群组内，同一 QQ 账号有不同的 Session。  
私聊与群聊 Session 不互通。  
  
Session 默认持续时间为 30 分钟。  
如果 Session 30 分钟内，没有任何响应才会失效。  
持续时间修改请参考 Ehcache。  

### waitNextMessage 等待下一条消息

waitNextMessage 方法可以使当前线程挂起，并等待下一条消息是激活。  
参数： maxTime 最大等待时长，单位：毫秒。默认为 30 秒。  
返回值：Message 下一条消息。  
当超时后会抛出 WaitNextMessageTimeoutException。  

####上下文队话以及路由的初级使用示范

在路由中继承`com.icecreamqaq.yuq.controller.QQcontroller`是获取ContextSession的第一步。
QQcontroller自带了reply方法可以直接将对象返回至源，进行极为方便的消息反馈。以下为绑定实例。
````kotlin
@PrivateController
class BindController: QQController() {
    //Bind bind BindAccount 皆可触发该Action
    @Action("Bind")
    //注意此注解，不懂参考上表
    @Synonym(["bind","BindAccount"])
    /**
      * qq自动获取发言人的qqid，或者使用qq : contact 来接受一个contact对象
      *
    **/
    fun bind(qq: Long, session: ContextSession): String{
        //Bot对于Bind进行回复
        reply("请输入账号！！")
        //等待消息 返回值是Message对象，可以使用trycatch捕获超时异常
        val accountMessage = session.waitNextMessage(30 * 1000)
        val account = accountMessage.firstString()
        reply("请输入密码")
        val pwdMessage = session.waitNextMessage(60 * 1000 * 2)
        val password = pwdMessage.firstString()
        return "绑定成功！！"
    }
}
````
####上下文队话在群组中的高级示例

同样需要继承`com.icecreamqaq.yuq.controller.QQcontroller`，与上面被动的简单使用Session不同的是，使用注入来获取YuQ的Session缓存，
能够让我们对于Session有更强的控制力，在群组对话中玩出更多的花样。以下是一个Bp的Demo，可以从中体会一下自定义Session的作用。

````kotlin
    @GroupController
    class DemoController : QQController() {
        //使用inject注入Session缓存来实现自定义控制
        @Inject
        @field:Named("ContextSession")
        private lateinit var cache: EhcacheHelp<ContextSession>
    
        @Action("Bp {num}")
        @Synonym(["BP {num}","bp {num}","bP {num}"])
        fun colorPic(group: Group, qq: Long, session: ContextSession, num : Int ): Message {
            if(num %2 !=0) return "bp数字应该为2的倍数".toMessage()
            reply("Bp第一版本，自我指定Bp数字，对bp内容不做校验，游戏参与者请注意输入的Bp内容。")
            reply(mif.at(qq).plus("请指定第一位BP手，如是自己请输入1"))
            //注意此处PathVar的使用，可以获取Message中某一段的内容
            var midMessage = session.waitNextMessage().body[0].convertByPathVar(PathVar.Type.Long)
            if( midMessage != 1L) {
                //直接retrun打断对话，撤销Session
                group.members[midMessage] ?: return "群成员不存在，已退出上下文，请从头再来".toMessage()
            }
            val firstBp : Long = qq
            reply("请指定第二位BP手，如是自己请输入1")
            var secondBp = session.waitNextMessage().body[0].convertByPathVar(PathVar.Type.Long)
            if( secondBp == 1L) secondBp = qq
            if( secondBp == firstBp) return "两位Bp手不能为同一人，已退出上下文，请从头再来".toMessage()
            group.members[secondBp] ?: return "群成员不存在，已退出上下文，请从头再来".toMessage()
            //自己创建Session对象
            val secondSession = ContextSession(group.id.toString()+"_"+secondBp.toString())
            //假如Cache
            cache[group.id.toString()+"_"+secondBp.toString()] = secondSession
            reply("准备开始Bp，总计Bp${num}个")
            val array = arrayListOf<String>()
            var result = "Bp结果如下：\n"
            for (i in 1..num){
                if(i %2 !=  0){
                    reply("第${i}次Bp，一号Bp手发言")
                    midMessage = session.waitNextMessage().body[0].convertByPathVar(PathVar.Type.String)
                    array.plus(midMessage)
                    result += "${midMessage}\n"
                }else{
                    reply("第${i}次Bp，二号Bp手发言")
                    midMessage = secondSession.waitNextMessage().body[0].convertByPathVar(PathVar.Type.String)
                    array.plus(midMessage)
                    result += "${midMessage}\n"
                }
            }
            return result.toMessage()
        }
    }
````
#####最后一句话
在Session中，我们的消息处理不会被额外的内容所打断（特别是群聊队话）也能达成更多的其他操作，避免了长命令，复杂命令等情况。但是美中不足的一点是，可能会在聊天记录上看起来略显繁琐，
但是这也是不必避免了，毕竟我们总需要反馈或者指导机器人的使用者来进行下一步操作不是吗？（笑