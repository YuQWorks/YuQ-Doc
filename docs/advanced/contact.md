# 关于信息的发送方与接收方

YuQ中将发送对象和接受对象都称为`Contact`，然后在继承`Contact`的基础上，根据实际的聊天情况，出现了`Member`，`Friend`，`Group`等对象，分别用在不同的情况下。

下面我们开始介绍。

## Contact

在`Contact`中，最重要的方法是`sendMessage`，也就是发送信息的方法，这意味着我们可以随时通过`Contact`对象或者继承了`Contact`对象的其他对象直接使用该方法去发送信息，可以降低我们发送信息的难度。

`Contact`及继承`Contact`的其他对象，都会包含一个`id`属性，其类型为`Long`，通过这个id，可以简单的判断信息的具体来源，通常而言是信息来源的ID，比如信息来源某个群，那么id就是群号码，又或者信息来源好友聊天，那么id就会是发送者的QQ号码。

`Contact`还有一个`avatar`属性，其类型为`String`，保存着该聊天对象的头像。

## Friend

`Friend`对象其实通常而言比较少用，他直接继承自`Contact`对象，并且增加了一个`isFriend`的布尔类型参数，可以判断是否是好友。

## Group 与 Member

`Group`对象和`Member`对象则应该重点表述。我们先从群组成员`Member`开始说起吧。

### 群成员:Member

`Member`对象也是继承自`Contact`对象，主要的使用场景之一是[路由系统](./controller.md)中方法注入，在方法中使用了`Member`来获取注入，则会自动得到一个`Member`方法。就像如下代码:
```java
    @Action("菜单")
    public void menu(Member qq) {}
```

`Member`与`Friend`不同，他针对群聊添加了很多特别的方法和参数来提升开发效率。

- title          属性可以查看群成员的头衔
- isAdmin()      或者 isOwner()  可以判断是否是管理员或者是否是群主
- kick(String s) 可以踢出群成员，其参数`String`表示的是踢出信息
- at()           方法可以@对应的群成员
- isBan()        可以检查是否被禁言
- Ban(int Time)  可以禁言对应的时间，时间单位是秒
- unBan()        可以解除禁言
- click()        可以在群里进行戳一戳

#### 匿名成员：AnonymousMember

另外，有`AnonymousMember`从`Member`继承而来，不能对其发消息，也会默认的判定并非好友。所以无法对匿名发起私聊。

### 群组对象：Group

`Group`的使用场景和`Member`的常见场景一致，也同样添加了很多特殊方法。直接上示例和说明。
```java
    @Action("菜单")
    public void menu(Group group) {}
```

方法和参数说明：

- Members  提供了一个<QQ号码，名称>构成的Map。
- maxCount 群最大人数。
- Owner    返回当前群的群主，类型是`Member`。
- admins   返回一个由`Member`组成的List，其中是全部的群管理员。
- leaves() 退群功能，如果机器人本身是群主，则会触发退群。
- banAll() 全体禁言
- unBanAll()  解除全体禁言

## 其他对象

虽然以上三种已经可以满足基本需求，但是某些情况是不太够的，所以还有一些特殊情况使用的对象，他们和`Contact`继承而来的对象并不太一样。

### UserInfo

这个对象主要出现在`NewFriendRequestEvent`（好友申请事件）、`GroupInviteEvent`（群邀请事件）和`GroupMemberRequestEvent`（入群申请事件中）。

与`Contact`继承的对象不同，`UserInfo`并不能发送信息，主要是在事件中进行信息判断。在`UserInfo`中包括了昵称，性别，年龄，等级等信息。

### GroupInfo

该对象唯一出现的位置是`GroupInviteEvent`（群邀请事件），在该事件中获取Group即可得到该对象，这个对象内主要有群号码，群名称，群头像链接，群主和群管理员列表。

