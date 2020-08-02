# MessageItem 接口
MessageItem 存在的意义是让消息处理更加简单明了。  
因为一条消息可能由多重内容组成，它不单单是文字，还有表情，图片等等。  
所以为了让消息处理更加简单，将每种消息类型封装为对象是非常有必要的。  
在酷 Q 中，我们可能会频繁的处理 CQ 码，来判断有没有需要的消息内容。  
但是在这，我们只需要迭代消息内容，就可以非常简单的处理所有类型的消息。  

所有消息内容都实现了 MessageItem 接口。

## 如果创建 MessageItem 对象呢？
为了保证跨 Runtime 迁移正常，推荐使用 [MessageItemFactory](base/message/MessageItemFactory.md) ，而不选择直接 new 相应 Runtime 的 MessageItem 实现。

## 使用 MessageItem
### Text
Text 一般用于纯文本的消息内容。
```
interface Text : MessageItem {
    val text: String // 消息内容
}
```
目标格式 | 能否转换 | 描述
--- | --- | ---
String | 是 | -
Integer | 是 | 仅限纯数字
Long | 是 | 仅限纯数字
Float | 是 | 仅限可转换的小数
Double | 是 | 仅限可转换的小数
Boolean | 是 | 特定内容可为 true，其他均为 false
Contact | 是 | 仅限纯数字
Friend | 是 | 仅限纯数字
Group | 是 | 仅限纯数字
Member | 是 | 仅限纯数字
User | 是 | 仅限纯数字
### At
QQ 群中的 At，私聊中无法使用。  
At 全体成员为 -1。
```
interface At : MessageItem {
    val user: Long // 被 At 的目标 QQ
}
```
目标格式 | 能否转换 | 描述
--- | --- | ---
String | 是 | At_目标 QQ 号码
Integer | 否 | -
Long | 是 | 目标 QQ 号码
Float | 否 | -
Double | 否 | -
Boolean | 否 | -
Contact | 是 | 被 At 的成员对象
Friend | 否 | -
Group | 否 | -
Member | 是 | 被 At 的成员对象
User | 是 | 被 At 的成员对象
### 表情
基础的 QQ 表情，Emoji 是 Unicode 字符，不属于表情。
```
interface Face : MessageItem {
    val faceId: Int // 表情编号。
}
```
目标格式 | 能否转换 | 描述
--- | --- | ---
String | 是 | 表情_表情Id
Integer | 是 | 表情Id
Long | 是 | 表情Id
Float | 否 | -
Double | 否 | -
Boolean | 否 | -
Contact | 否 | -
Friend | 否 | -
Group | 否 | -
Member | 否 | -
User | 否 | -
#### 表情编号对照表
// TODO 待更新
### 图片
图片默认不会被下载。
```
interface Image : MessageItem {
    val id: String // 图片ID。（请不要尝试记住图片ID，他不可靠！）
    val url: String // 图片下载地址
}
```
目标格式 | 能否转换 | 描述
--- | --- | ---
String | 是 | 图片
### 未被支持的消息内容
该内容未暂时未被实现。
```
interface NoImplItem : MessageItem {
    val source: Any // Runtime 的源消息内容，可能为任何类型。
}
```