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

待完善

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