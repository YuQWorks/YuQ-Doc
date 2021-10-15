# 关于信息本身

在YuQ的系统中，我们对于每条信息都只需要考虑信息本身，不用考虑信息的来源又或者信息的发送方，信息本身只有信息。

## Message

在YuQ中，我们发送和接受的都是`Message`类型，也就是信息本身，而QQ的信息可以被称为是富文本的，因为除了文字以外，还包括图片，表情，语音，甚至分享卡片等。

所以YuQ设计了`MessageItem`来解决这个问题，不同的元素会变成不同的`MessageItem`，方便了我们对于信息内容的拼接和分割。

### MessageItem

在`MessaegItem`中，信息被分为了`text`，`image`，`voice`，`face`，`at`，`JsonEx`，`XmlEx`，`NoImpl`等内容。

其中`text`，`image`，`voice`，`face`，`at`五个可以说是基本内容。

`text`是基本的文字内容，也是最常触发命令的方式。

`image`是群内发送的图片，也包括表情包图片。

`voice`是指声音，可以指定文件让你的机器人发送音频文件。

`face`是指腾讯自带的表情。

`at`是指群聊中的@某人。

而`JsonEx`，`XmlEx`和`NoImpl`则相对比较特殊。

`JsonEx`和`XmlEx`分别表示的是Json卡片和Xml卡片，曾经的假红包就属于这两种，音乐分享卡片也属于这个。

`NoImpl`则表示不支持的内容，比如红包。

## MessageItemFactory

已经知道了`MessageItem`之后，如何才能创建一个`MessageItem`呢？

通常来说，你可以使用`@Inject`来注入一个YuQ自带的`MessageItemFactory`。就像下面代码这样：
```java
    @Inject
    private MessageItemFactory mif;
```

那么应该如何使用`MessageItemFactory`来创建一个信息呢？

```java
    mif.text("想输出一段文本").toMessage();
    mif.text("想输出一段文本").plus(mif.imageByFile(new File(filePath))).toMessage();
```

只要翻一翻`mif`所提供的方法，就能找到创建对应内容的方法，非常简便和快捷。

但是在上面的代码中，我们需要注意两个东西：
- plus() ： plus方法提供三个重载的方法，分别允许`String`，`MessageItem`和`Message`，这使得你的信息可以自由拼接，使用`.plus()`之后信息会被合成一条。在上面第二行中，就是文字+图片一起发送。
- toMessage()： 这个方法是将`MessageItem`转为`Message`，毕竟YuQ的接受和发送都是使用的`Message`对象。


### LineQ

我还没有咋用过，所以先不详解。放一段示例代码：
```java
    @Action("testLineQ")
    public Message linQ(long qq){
        return Message.linQ().at(qq).textLine(",您好。").textLine("您是第xxx位加入本群的");
    }   
```

相比较`MessageItemFactory`而言，他看起来更加简洁，容易书写，可以尝试一下。


## 最后

想不到太多关于`Message`需要讲述的内容，所以重点放在了信息的拼接上，如果有什么问题欢迎群内@我，或者在[项目地址](https://github.com/YuQWorks/YuQ-Doc)下提出issue。