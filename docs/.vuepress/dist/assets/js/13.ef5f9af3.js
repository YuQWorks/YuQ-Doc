(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{180:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},(function(){var t=this.$createElement;this._self._c;return this._m(0)}),[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[a("h1",{attrs:{id:"发生了什么？"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#发生了什么？"}},[t._v("#")]),t._v(" 发生了什么？")]),t._v(" "),a("p",[t._v("在刚刚我们已经启动了一个基本的YuQ实例，并且触发了他的群聊和私聊路由，如果你有仔细观察IDE下方的Log，你还可以发现定时器（Job）和事件（Event）也正在运行。")]),t._v(" "),a("p",[t._v("现在，让我们来看看到底发生了什么。")]),t._v(" "),a("h2",{attrs:{id:"从-hello-开始"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#从-hello-开始"}},[t._v("#")]),t._v(" 从 Hello 开始")]),t._v(" "),a("p",[t._v("我记得我说过，YuQ是一个无头的QQ客户端，当你向你的机器人发送Hello的时候，这条消息也会从腾讯服务器下发至你的机器人QQ，这时候，机器人就会和正常的QQ一样接受，并且解析他们。")]),t._v(" "),a("h2",{attrs:{id:"进入yuq"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#进入yuq"}},[t._v("#")]),t._v(" 进入YuQ")]),t._v(" "),a("p",[t._v("这时候，消息已经被YuQ所拿到，他将信息与发送者包装成为一个个对象，然后打包开始走固定的流程，首先出场的是Event（事件）。")]),t._v(" "),a("h2",{attrs:{id:"进入event"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#进入event"}},[t._v("#")]),t._v(" 进入Event")]),t._v(" "),a("p",[t._v("不论什么消息，常规的群聊消息或者是好友请求这样的特殊消息，基本都存在着对应的事件，所以YuQ拿到消息的第一时间，也是将消息发送给事件，在Event中，你可以找到MessageEvent。"),a("br"),t._v("\n顾名思义，消息事件会在这里触发，并允许处理逻辑，对于MessageEvent，有两个子类，分别是PrivateMessageEvent和GroupMessageEvent，对应的处理群聊和私聊逻辑。"),a("br"),t._v("\nEvent可以使用参数设置优先级，任何事件都拥有"),a("code",[t._v("high")]),t._v(","),a("code",[t._v("normal")]),t._v(","),a("code",[t._v("low")]),t._v(",三个级别可供选择，默认情况为"),a("code",[t._v("normal")]),t._v("。")]),t._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Event")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("weight "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Event"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Weight")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("normal"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("onGroupMessage")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("GroupMessageEvent")]),t._v(" event"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("printf")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"消息来自群：%s(%d)%n"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" event"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getGroup")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getName")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" event"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getGroup")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getId")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("printf")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"消息来自群成员：%s(%d)%n"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" event"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getSender")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getNameCard")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("event"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getSender")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getId")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br")])]),a("p",[t._v("这是处理群聊的事件代码，其中"),a("code",[t._v("@Event")]),t._v("表明它是一个事件，"),a("code",[t._v("(weight = Event.Weight.normal)")]),t._v("声明了其权重，"),a("code",[t._v("event.getGroup()")]),t._v("是通过事件获取其群对象，其中包括了群名称"),a("code",[t._v("event.getGroup().getName()")]),t._v(",群ID"),a("code",[t._v("event.getGroup().getId()")]),t._v("。"),a("br"),t._v("\n同时也获取了发送者对象"),a("code",[t._v("event.getSender()")]),t._v("，它的昵称"),a("code",[t._v("event.getSender().getNameCard()")]),t._v("和他的号码"),a("code",[t._v("event.getSender().getId()")]),t._v("。"),a("br"),t._v("\n你还可以使用"),a("code",[t._v("event.getMessage")]),t._v("来获取发送的对象。")]),t._v(" "),a("p",[t._v("更详细的情况我们会在事件功能进一步阐述，目前你只需要知道他是触发型，有优先级，可以取消向后的传递，就足以了。")]),t._v(" "),a("h2",{attrs:{id:"controller"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#controller"}},[t._v("#")]),t._v(" Controller")]),t._v(" "),a("p",[t._v("走过Event，信息将会被给到对应的Controller（但是仅有聊天信息，好友请求等情况是作为事件处理的），作为命令式机器人，使用大量的if，else或者switch判断机器人的信息是否符合指令实在是，太累了。作为一个现代开发者，更喜欢的是注解表达指令，直接处理逻辑。"),a("br"),t._v("\n使用过Spring或者其他现代MVC框架的人都应该很容易的理解这里的过程，匹配指令，处理逻辑，进行返回，但是有几个点我需要说明一下，这是机器人与WebMVC不同的地方。")]),t._v(" "),a("h3",{attrs:{id:"关于"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#关于"}},[t._v("#")]),t._v(" 关于")]),t._v(" "),a("p",[t._v("写在介绍功能之前，是因为我要简单的说明一点，Controller的核心是"),a("code",[t._v("@Action")]),t._v("，所以只有遇到了适合"),a("code",[t._v("@Action")]),t._v("的情况下，才会走所在类的"),a("code",[t._v("@Before")]),t._v("和"),a("code",[t._v("@After")]),t._v("，如果没匹配到任何的"),a("code",[t._v("@Action")]),t._v("，那么信息在走完Event之后就已经结束了。")]),t._v(" "),a("h3",{attrs:{id:"before"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#before"}},[t._v("#")]),t._v(" Before")]),t._v(" "),a("p",[t._v("Before是信息在Controller中第一个到达的地方，通常来说，Action中的参数表达了具体的命令，他所在类的Before则会先于Action一步对其进行处理，构思来自于Web的拦截器。常见情况下我们会在这里进行开关判断，更为进阶的使用一步我们后续再说，先来看看代码。")]),t._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Before")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("before")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("long")]),t._v(" qq"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("qq "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("throw")]),t._v(" mif"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("text")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"你没有使用该命令的权限！"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toMessage")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toThrowable")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])]),a("p",[a("code",[t._v("long qq")]),t._v("表明你在向YuQ索要信息发送者的QQ号码，同理你可以使用"),a("code",[t._v("long group")]),t._v("来获取群号码，这是特性之一的参数自动注入的简单使用。"),a("br"),t._v("\n当我们认为不符合条件不可以执行下一步时，与"),a("code",[t._v("event.setCancel(true);")]),t._v("来取消事件不同，这里使用throw抛出异常来通知YuQ，当你throw了一个Message类型的异常，YuQ会自动将你的信息返回到原来的群聊（私聊）窗口中。\n而"),a("code",[t._v("mif")]),t._v("是MessageItemFactory的缩写，他在上面已经被注入进来（在"),a("code",[t._v("TestGroupController")]),t._v("的第35行），在这里是为了快速的制作一个Message，你以后会经常碰到他，使用它。")]),t._v(" "),a("h3",{attrs:{id:"action"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#action"}},[t._v("#")]),t._v(" Action")]),t._v(" "),a("p",[t._v("Action是信息匹配的地方，经过了重重过滤，我们的信息在符合条件的情况下终于到达了他所要到达的地方，在这里，就和写Web一样，我们要针对指令的请求进行反馈，这一点无需多言，但是在这里，YuQ仍然有者很多特点需要说一说。")]),t._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Action")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"禁言 {sb} {time}"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Synonym")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"ban {sb} {time}"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("ban")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Member")]),t._v(" sb"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Member")]),t._v(" qq"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" time"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("time "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("60")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" time "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("60")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("qq"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("isAdmin")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            sb"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("ban")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("time"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"好的"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        qq"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("ban")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("time"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"您没有使用该命令的权限！为了防止恶意操作，你已被禁言相同时间。"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br")])]),a("ul",[a("li",[t._v("别名")])]),t._v(" "),a("p",[t._v("上面这一段中，"),a("code",[t._v("@Synonym")]),t._v("与"),a("code",[t._v("@Action")]),t._v("表达了两个不同的命令，但是他们的参数是相同的，这意味着"),a("code",[t._v("禁言 xxx xx")]),t._v("与"),a("code",[t._v("ban xxx xx")]),t._v("都会在这里触发。这就是与WebMVC框架不同的一点，别名。")]),t._v(" "),a("ul",[a("li",[t._v("参数注入")])]),t._v(" "),a("p",[t._v("在整个方法的参数中分别出现了"),a("code",[t._v("Member sb")]),t._v("，"),a("code",[t._v("Member qq")]),t._v("，"),a("code",[t._v("int time")]),t._v("三项，其中"),a("code",[t._v("Member qq")]),t._v("道理与上面Before中出现"),a("code",[t._v("long qq")]),t._v("相同，他们都是在索要发送者的信息，不同点在于，Before中仅索要了号码，而这里则在索要相对完整的个人信息。\n在代码中，"),a("code",[t._v("qq.isAdmin()")]),t._v("判断了发言者否为管理员。"),a("br"),t._v("\n而"),a("code",[t._v("Member sb")]),t._v("是YuQ完成的智能转换，根据你在消息中提供的账号，找到他的对应信息，转成一个对象，来提供禁言的功能，任何时候，你都可以这样来获取某个人的信息，而无需自己寻找。"),a("br"),t._v("\n接着是"),a("code",[t._v("int time")]),t._v("这是由于你已知了参数time是一个数字，表达禁言的时间，那么他最终都会变成"),a("code",[t._v("int")]),t._v("类型，所以你可以直接向YuQ要求提供"),a("code",[t._v("int")]),t._v("类型的参数，这样你可以直接使用而无需自己转换。当然，如果不能转换会产生异常。"),a("br"),t._v("\n在某些情况下，你甚至可以直接向YuQ索要"),a("code",[t._v("boolean")]),t._v("类型的参数。")]),t._v(" "),a("ul",[a("li",[t._v("返回类型")])]),t._v(" "),a("p",[t._v("最后是方法的返回，YuQ接受两种返回方式，"),a("code",[t._v("String")]),t._v("和"),a("code",[t._v("Message")]),t._v("，当你选择前者时，直接return即可。他会自动被包装成为"),a("code",[t._v("Message")]),t._v("并发送回到信息来源的地方。如果是"),a("code",[t._v("Message")]),t._v("则需要你使用之前我们说过的"),a("code",[t._v("MessageItemFactory")]),t._v("来包装成为"),a("code",[t._v("Message")]),t._v("返回,在这样的返回模式下，返回值极为多样化，可以包括文字，图片，@信息等。")]),t._v(" "),a("h3",{attrs:{id:"after"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#after"}},[t._v("#")]),t._v(" After")]),t._v(" "),a("p",[t._v("这里已经算得上是消息的终点站，走出这里之后，消息就会被YuQ发往腾讯服务器，然后你就会在群聊或者私聊窗口看到他。但是对于After，其实并没有太多需要说的，他和"),a("code",[t._v("@Before")]),t._v("太多相似，只是一个在处理之前，一个在处理之后。"),a("br"),t._v("\n所以接下来")]),t._v(" "),a("h3",{attrs:{id:"catch"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#catch"}},[t._v("#")]),t._v(" Catch")]),t._v(" "),a("p",[t._v("这是一个特殊的注解，注解参数是异常类型，可以用于捕获所在类里面的该种异常然后进行处理，我会稍后在进阶文档中对他进行描述。如果你动手能力强，在完成基础部分以后，也可以考虑进行尝试。")])])}],!1,null,null,null);s.default=e.exports}}]);