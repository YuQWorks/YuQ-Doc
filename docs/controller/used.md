# 咋用啊？

## 建立一个类

YuQ 将私聊信息与群聊信息分为两个不同体系。  
双方不互通。  

`@PrivateController` 声明这是一个用来处理私聊的 Controller。  
`@GroupController` 声明这是一个用来处理群聊的 Controller。  

两种 Controller 除了服务的对象不一样之外，其余的使用方法全部相同。

```Java
@GroupController
public class DemoController {
    
    @Action("菜单")
    public String menu(){
        return "这是一个基础菜单，\n" +
                "但因为这只是一个演示 Demo，\n" +
                "他并没有什么具体功能，\n" +
                "所以，就这样吧。";
    }

}
```
```Kotlin
@GroupController
class DemoController {
    
    @Action("菜单")
    fun menu()= """
        |这是一个基础菜单，
        |但因为这只是一个演示 Demo，
        |他并没有什么具体功能，
        |所以，就这样吧。
        """.ttrimMargin()

}
```

这时候，我们只需要在群里发送一句"菜单"，就能看到我们机器人回复的消息了。

