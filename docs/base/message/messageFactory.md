# MessageFactory 。

## 如何获得一个 MessageFactory 的实例呢？

鉴于 YuQ 需要同时兼容不同的机器人平台，不同的机器人平台又会有所不同。  
所以 MessageFactory 是以接口的形式出现在 YuQ 中的。  
由各个 Runtime 实现，并由 Yu-Core 注入到类中。

```Java
@Inject
private MessageFactory mf;
```
```Kotlin
@Inject
private lateinit var mf: MessageFactory
```
## 如何使用 MessageFactory 呢？
根据你的需求，直接调用相关方法即可。
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