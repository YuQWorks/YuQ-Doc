# 消息相关
## Message 类

Message 对象，既为一个消息的具体的对象。  
接受消息，收到的是一个 Message 对象，发送消息同样也需要一个 Message 对象。

### Message 的结构

与 CoolQ 等机器人不同的是，YuQ 的 Message 不再仅仅是一串文本。  
在 YuQ 中 Message 被封装成了一个对象。  
YuQ 将消息中常用的逻辑抽象，构建了一个更易用的 Message 类。  
和 CoolQ 那种一个消息混杂了文本与酷Q码的形式不同，YuQ 也将消息中的不同元素（纯文本，At，图片等等）封装为了 [MessageItem](base/message/messageItem.md)。  
以供更方便的操作，取值，及转化。  

Message 的 body，也就是消息体，是一个消息的内容，也是一个消息中重要的组成部分。  
他是由一个或多个 MessageItem。  

Message 的 body 也是所有消息内容的对象组成的数组。 

```java
public class Message{

    // 消息Id
    private Integer id;
    
    // 消息源，用于回复与撤回
    private MessageSource source;
    
    // 回复某条消息，为空时不回复
    private MessageSource reply;
    // 发送消息时 At 对方（仅群聊生效）
    private boolean at = fasle;
    
    // Runtime 平台源消息对象，可能为任何类型。
    private Object sourceMessage;
    
    // 消息内容
    private List<MessageItem> body;
    // 经过处理的，用于路由的路径消息内容
    private List<MessageItem> path;
    
    /*
        省略 Getter Setter
    */

}
```

### Message 的使用

#### 得到一个新的 Message

API 变动，我们无需再通过 MessageFactory 构造消息。  
现直接通过 new 关键字即可获取新 Message 。  

```java
    new Message()
```

#### 向消息中添加内容

Message 对象提供 plus 方法用以向消息中添加内容。
```java
    // 向 Message 中追加一个 MessageItem
    public Message plus(MessageItem item)
    // 向 Message 中追加一段文字
    public Message plus(String item)
    // 向 Message 中追加另一消息的内容
    public Message plus(Message item)
```

plus 方法同时重写了 Kotlin 中的操作符 "+"，Kotlin 开发者可以直接使用 + 向 Message 添加内容。

#### 发送消息

在 YuQ 中，所有可以发送消息的对象都被称之为联系人（[Contact](base/friend/contact.md)）。  
Contact 提供了一个 `sendMessage(Message)` 方法，用于发送消息。

#### 撤回消息

通过 Message 或者 MessageSource 的 recall 方法，我们可以直接撤回本条消息。
撤回成功，返回 0，权限不足返回 -1。

#### 回复消息

将 Message 的 reply 属性，设置为您想回复的消息的 MessageSource 对象。


## MessageFactory 。

:::warning 警告
**当前文档已经过时，可直接 new Message 对象。**
:::

### 如何获得一个 MessageFactory 的实例呢？

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
### 如何使用 MessageFactory 呢？

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

## MessageItem 接口
MessageItem 存在的意义是让消息处理更加简单明了。  
因为一条消息可能由多重内容组成，它不单单是文字，还有表情，图片等等。  
所以为了让消息处理更加简单，将每种消息类型封装为对象是非常有必要的。  
在酷 Q 中，我们可能会频繁的处理 CQ 码，来判断有没有需要的消息内容。  
但是在这，我们只需要迭代消息内容，就可以非常简单的处理所有类型的消息。

所有消息内容都实现了 MessageItem 接口。

### 如果创建 MessageItem 对象呢？
为了保证跨 Runtime 迁移正常，推荐使用 [MessageItemFactory](base/message/MessageItemFactory.md) ，而不选择直接 new 相应 Runtime 的 MessageItem 实现。

### 使用 MessageItem
#### Text
Text 一般用于纯文本的消息内容。
```java
public interface Text extends MessageItem {
    String getText();  //获取纯文本内容aa
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

#### At
QQ 群中的 At，私聊中无法使用。  
At 全体成员为 -1。
```java
public interface At extends MessageItem {
    long getUser();  //获取 At 的目标
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

#### 表情
基础的 QQ 表情，Emoji 是 Unicode 字符，不属于表情。
```java
public interface Face extends MessageItem {
    int getFaceId();  //获取表情编号。
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

##### 表情编号对照表
// TODO 待更新

#### 图片
图片默认不会被下载。
```java
public interface Image extends MessageItem {
    String getId();  //获取图片Id（请不要尝试记住图片ID，他不可靠！）。
    String getUrl();  //获取图片下载地址。
}
```
目标格式 | 能否转换 | 描述
--- | --- | ---
String | 是 | 图片

#### 未被支持的消息内容

该内容未暂时未被实现。
```java
public interface NoImplItem extends MessageItem {
    Object getSource();  //获取表情编号。
}
```


## MessageItemFactory

### 如何获得一个 MessageItemFactory 的实例呢？

和 [MessageFactory](base/message/messageFactory.md)  相同，MessageItemFactory 同样也是以接口存在的，也是需要通过依赖注入来获得实例的。

```java
@Inject
private MessageItemFactory mif;
```
```kotlin
@Inject
private lateinit var mif: MessageItemFactory
```

### 如何使用 MessageItemFactory 呢？
MessageItemFactory 同样非常简洁明了，直接根据需求调用相关方法就可以了。
```java
interface MessageItemFactory{
    // 生成一个 Text 的内容。
    Text text(String text);a
    // At 某人。仅限群聊，私聊与临时会话可能出现其他问题。
    At at(long qq);
    // 表情。
    Face face(int id);
    // 通过文件发送图片
    Image image(File imgFile);
    // 通过 URL 发送图片。
    Image image(String imageUrl);
}

```
```Kotlin
// 生成一个 Text 的内容。
fun text(text:String):Text
// At 某人。仅限群聊，私聊与临时会话可能出现其他问题。
fun at(qq:Long):At
// 表情。
fun face(id:Int):Face
// 通过文件发送图片
fun image(file: File):Image
// 通过 URL 发送图片。
fun image(url:String):Image
```