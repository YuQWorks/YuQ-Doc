# Controller 进阶特性

## QMsg 注解
我们先来看一看 QMsg 注解的结构。
```kotlin
annotation class QMsg(
    // 回复消息时 At 对方。
    val at: Boolean = false,
    // 回复消息时使用回复功能，回复消息。
    val reply: Boolean = false,
    // 如果 at 为 true 时，回复消息 At 对方并换行。
    val atNewLine: Boolean = false,
    // 声明本 Action 必须 @机器人，或者直呼机器人名字触发。
    val mastAtBot: Boolean = false,
    // 回复消息间隔时间自动撤回。
    val recall: Long = 0,
    // 完全匹配路由，当下级存在内容时不匹配本命令。
    val forceMatch: Boolean = false,
)
```
通过注释，我们可以很清楚的看到 QMsg 注解的结构。  
同时也很清晰的理解 QMsg 注解的作用。

当您有需要的时候可以直接通过为 Action 方法声明 QMsg 注解并书写相应声明而实现功能。
## 单 Action 发送多条消息
如果您有一个 Action 中发送多条消息的需求，您可以通过构建并返回一个 Object 数组来快速实现。  
您也可以在多条 Message 中穿插 Int 与 Long，来指定多条 Message 之间的发送间隔。  
发送间隔单位为毫秒。  
```java
new Object(){message1, 1000, message2, 5000, message3};
```
在这条示例代码中，当 Action 执行完毕时，会立即发送 message1，并间隔 1 秒后发送 message2，再次间隔 5 秒后发送 message3。  
返回的 Object 数据将接受如下数据类型：
  - Int（作为时间间隔）
  - Long（作为时间间隔）
  - String（作为消息，可根据配置作为 RainCodeString 解析）
  - MessageItem（会被自动构建为 Message 并发送）
  - Message（作为消息，可正常触发自动撤回）
  - MessageLineQ（会被自动解析为 Message，然后发送）

当出现不符合如上规则的内容时，将自动调用其 toString 方法，并作为 String 参数使用。
