# MessageItemFactory

## 如何获得一个 MessageItemFactory 的实例呢？

和 [MessageFactory](base/message/messageFactory.md)  相同，MessageItemFactory 同样也是以接口存在的，也是需要通过依赖注入来获得实例的。

```Java
@Inject
private MessageItemFactory mif;
```
```Kotlin
@Inject
private lateinit var mif: MessageItemFactory
```

## 如何使用 MessageItemFactory 呢？
MessageItemFactory 同样非常简洁明了，直接根据需求调用相关方法就可以了。
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