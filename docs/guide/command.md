# 编写命令

本章将带你编写一个简单的群聊指令，以一个天气查询插件为例，教你如何编写自己的命令。

:::tip 提示
如果遇到困难，请反复阅读并参考其他Controller文件
:::

## 新建文件

一切从新建Java文件开始，在`Controller`路径下，新建文件`WeatherController.java`，并先在文件内的ClassName上添加`@GroupController`注解。同时注入`MessageItemFactory`。  
此时文件如下
```java{3-5}
package wiki.IceCream.yuq.demo.controller;

import com.icecreamqaq.yuq.annotation.GroupController;
import com.icecreamqaq.yuq.message.MessageItemFactory;
import javax.inject.Inject;

@GroupController
public class WeatherController {
    @Inject
    private MessageItemFactory mif;
}
```
:::warning 警告
请务必确认导入包的正确性，导入错误的内容将导致后续操作无法继续进行。
:::

## 编写内容

此时的`WeatherController`已经可以被视为一个群聊插件了，但是我们并没有向其中添加任何的内容，所以他并不会有任何的反应。接下来我们先为他写一个命令。

### Action

:::tip 提示
在这里开始，对于Java基础的有了简单要求，如果有使用过任何MVC框架，比如Spring，那么这里以及之后的部分将会更容易理解
:::

```java{}
    /**
     * 此处使用@Action将函数变成指令的响应器
     * 指令格式应该是 ”weather 南京“
     * 使用@Synonym使命令拥有别名
     * 所以”天气 南京“ 和 ”天气预报 南京“ 同样会触发命令
     */
    @Action("weather {city}")
    @Synonym({"天气 {city}","天气预报 {city}"})
    public Message weather(String city){
        if(city.equals("")){
            //使用mif将String变成Message
            return mif.text("要查询的城市名称不能为空").toMessage();
        }
        //使用伴生方法将String变成Message
        return Message.Companion.toMessage(city+"的天气是。。。。");
    }
```

命令的核心应该是`@Action`，同时可以使用`@Synonym`来为命令设计别名，除此之外的每一行基本都有注释，仔细阅读即可。  

### Before

在编写完成一个命令以后，我们可能还想要对命令进行更多的处理，比如我只想要群号为`12345`的群中的`122222`才可以触发这个命令。那么我们可以为他添加一个`@Before`。

```java{}
    /**
     * @param group 信息发送者所在群 YuQ会自动注入
     * @param qq 信息发送者的ID YuQ会自动注入
     * @throws DoNone 不做任何事情的异常
     */
    @Before
    public void WeatherBefore(long group,long qq) throws DoNone, Exception{
        if(group != 12345L) {
            //通过抛出异常来停止信息前往Action，这个异常只会抛出，但是不会做任何处理。
            throw new DoNone();
        }
        if(qq != 122222L){
            //将一条Message.toThrowable()会让这个信息返回到信息来源处。可以起到提示的作用。
            throw mif.text("你无权使用这个类里面的命令").toMessage().toThrowable();
        }
    }
```

### After

又或者，我们不对信息的来源进行限制，但是我们想让命令返回的时候增添一个自动@的效果，这样每个人都能看到自己所发出的指令的回馈。我们可以使用`@After`。

```java{}
    /**
     * After与 Before极其类似，除了出现的时间点不同，使用和逻辑上基本一致
     * @param reMessage 这是由Action处理完发送的信息，目前还没有交给服务器
     * @param qq 同Before
     * @return
     */
    @After
    public Message addNotice(Message reMessage,long qq){
        //使用mif添加At效果，同理可使用mif添加图片等。
         return reMessage.plus(mif.at(qq));
    }


```

:::tip 提示
这只是对于`@After`使用的介绍，其实在`@Action`下面增加另外一个注解`@Qmsg`即可实现这个功能。
:::


### Catch

这是在路由中的最后一个注解，主要功能是用于捕获异常，可以帮助我们省去大量重复的try/catch代码。

```java{}
    /**
     * 直接使用注入来获取YuQ对象，对象内存储着Bot的各种信息，包括群列表，好友列表等。
     */
    @Inject
    private YuQ yuq;
    
    /**
     * Catch 与 Before 、 After 类似，但是必须要求参数来捕获指定异常
     * @param e 这里捕获空指针异常
     * @return 也并非返回信息来源，而是留给后续使用
     */
    @Catch(error = NullPointerException.class)
    public void reportNullPoint(NullPointerException e){
        //从YuQ（此时的YuQ是你的Bot）中获取指定对象并且发送信息。
        yuq.getFriends().get(12345L).sendMessage(mif.text(e.toString()).toMessage());
    }
```

在上面的代码中我们最简化的实现了一个错误报告的模块，他会把捕捉到的空指针异常全部发送给ID为12345的对象。


### 结语

到此为止，一个天气插件基本完成，尽管为了模拟，我们并没有接入真实的API接口，但是其接入也并非难事，善用搜索引擎即可完成。除此之外我在很多地方也用随意的数字指代了具体的号码，在书写时请务必注意。

:::tip 提示
本章节代码可以点击[这里](./code/WeatherController.java)进行查看。如果有任何问题欢迎加入QQ聊天群（号码：696129128）获取帮助。
:::