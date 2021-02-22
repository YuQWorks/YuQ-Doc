# 模块开发

我之所以叫做 Model 而不是 Module，是因为模块本身不具有应用代码，甚至不具有完整的功能实现，而是功能的 API。  
具体功能的实现，应该由运行时实现。  
才能让某个模组的 YuQ 应用，具有跨运行时的能力。

## 开发

### 自定义注解类扫描

#### 定义注解

YuQ 提供了一种非常方便的方法，供您获得被标记了您特定注解的类。  
以 YuQ-QQ 为例：

```java
    @LoadBy(QQControllerLoader.class)
    public @interface PrivateController {
        String value() default "";
    }
```

只需要将注解标记一个 ```com.IceCreamQAQ.YuQ.annotation.LoadBy``` 注解，并将 Loader 指向您的加载器，就可以非常方便的获得所有标记了您特定注解的类。  

#### 编写加载器

您需要编写一个类，并实现 ```com.IceCreamQAQ.YuQ.loader.Loader ```接口。  
在应用初始化的时候，如有存在的指向加载器的注解，则加载器会被实例化，并调用相关方法。
```java
void load(List<LoadItem> items) throws Exception;
```
方法允许抛出任何异常，但方法一旦抛出异常，应用加载过程就会被终止。  
```java
@Data
public class LoadItem {
    
    private Annotation annotation;
    private Class<?> type;
    private Object instance;

}
```
这个对象承载了所有的加载信息。  
annotation 内存储了类标记的特定注解。  
type 内存储了类的 Class 对象。  
instance 内存储了类的实例。

您可以在方法内进行该有的加载及初始化操作。

### 为运行时提供接口

如果您的模块提供运行时，如 YuQ-Web，那则无需关注这个。  
如果您的模块不提供运行时，或者可以跨多个运行时运行，如 YuQ-QQ，则您应该将模块需要运行时实现的功能做成接口，然后单独实现运行时。
