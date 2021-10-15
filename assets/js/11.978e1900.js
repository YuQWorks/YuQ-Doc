(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{177:function(t,s,e){"use strict";e.r(s);var a=e(0),n=Object(a.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"content"},[t._m(0),t._v(" "),e("p",[t._v("在YuQ的系统中，我们对于每条信息都只需要考虑信息本身，不用考虑信息的来源又或者信息的发送方，信息本身只有信息。")]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),t._m(8),t._v(" "),t._m(9),t._v(" "),t._m(10),t._v(" "),t._m(11),t._v(" "),t._m(12),t._v(" "),t._m(13),t._v(" "),t._m(14),t._v(" "),t._m(15),t._v(" "),t._m(16),t._v(" "),t._m(17),t._v(" "),t._m(18),t._m(19),t._v(" "),t._m(20),t._m(21),t._v(" "),e("p",[t._v("但是在上面的代码中，我们需要注意两个东西：")]),t._v(" "),t._m(22),t._v(" "),t._m(23),t._v(" "),e("p",[t._v("我还没有咋用过，所以先不详解。放一段示例代码：")]),t._v(" "),t._m(24),t._m(25),t._v(" "),t._m(26),t._v(" "),e("p",[t._v("想不到太多关于"),e("code",[t._v("Message")]),t._v("需要讲述的内容，所以重点放在了信息的拼接上，如果有什么问题欢迎群内@我，或者在"),e("a",{attrs:{href:"https://github.com/YuQWorks/YuQ-Doc",target:"_blank",rel:"noopener noreferrer"}},[t._v("项目地址"),e("OutboundLink")],1),t._v("下提出issue。")])])}),[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"关于信息本身"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#关于信息本身"}},[this._v("#")]),this._v(" 关于信息本身")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"message"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#message"}},[this._v("#")]),this._v(" Message")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("在YuQ中，我们发送和接受的都是"),s("code",[this._v("Message")]),this._v("类型，也就是信息本身，而QQ的信息可以被称为是富文本的，因为除了文字以外，还包括图片，表情，语音，甚至分享卡片等。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("所以YuQ设计了"),s("code",[this._v("MessageItem")]),this._v("来解决这个问题，不同的元素会变成不同的"),s("code",[this._v("MessageItem")]),this._v("，方便了我们对于信息内容的拼接和分割。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"messageitem"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#messageitem"}},[this._v("#")]),this._v(" MessageItem")])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("p",[t._v("在"),e("code",[t._v("MessaegItem")]),t._v("中，信息被分为了"),e("code",[t._v("text")]),t._v("，"),e("code",[t._v("image")]),t._v("，"),e("code",[t._v("voice")]),t._v("，"),e("code",[t._v("face")]),t._v("，"),e("code",[t._v("at")]),t._v("，"),e("code",[t._v("JsonEx")]),t._v("，"),e("code",[t._v("XmlEx")]),t._v("，"),e("code",[t._v("NoImpl")]),t._v("等内容。")])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("p",[t._v("其中"),e("code",[t._v("text")]),t._v("，"),e("code",[t._v("image")]),t._v("，"),e("code",[t._v("voice")]),t._v("，"),e("code",[t._v("face")]),t._v("，"),e("code",[t._v("at")]),t._v("五个可以说是基本内容。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("text")]),this._v("是基本的文字内容，也是最常触发命令的方式。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("image")]),this._v("是群内发送的图片，也包括表情包图片。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("voice")]),this._v("是指声音，可以指定文件让你的机器人发送音频文件。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("face")]),this._v("是指腾讯自带的表情。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("at")]),this._v("是指群聊中的@某人。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("而"),s("code",[this._v("JsonEx")]),this._v("，"),s("code",[this._v("XmlEx")]),this._v("和"),s("code",[this._v("NoImpl")]),this._v("则相对比较特殊。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("JsonEx")]),this._v("和"),s("code",[this._v("XmlEx")]),this._v("分别表示的是Json卡片和Xml卡片，曾经的假红包就属于这两种，音乐分享卡片也属于这个。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("NoImpl")]),this._v("则表示不支持的内容，比如红包。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"messageitemfactory"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#messageitemfactory"}},[this._v("#")]),this._v(" MessageItemFactory")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("已经知道了"),s("code",[this._v("MessageItem")]),this._v("之后，如何才能创建一个"),s("code",[this._v("MessageItem")]),this._v("呢？")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("通常来说，你可以使用"),s("code",[this._v("@Inject")]),this._v("来注入一个YuQ自带的"),s("code",[this._v("MessageItemFactory")]),this._v("。就像下面代码这样：")])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"language-java line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-java"}},[e("code",[t._v("    "),e("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Inject")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MessageItemFactory")]),t._v(" mif"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("那么应该如何使用"),s("code",[this._v("MessageItemFactory")]),this._v("来创建一个信息呢？")])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"language-java line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-java"}},[e("code",[t._v("    mif"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("text")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"想输出一段文本"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("toMessage")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    mif"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("text")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"想输出一段文本"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("plus")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("mif"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("imageByFile")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("File")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("filePath"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("toMessage")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("只要翻一翻"),s("code",[this._v("mif")]),this._v("所提供的方法，就能找到创建对应内容的方法，非常简便和快捷。")])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ul",[e("li",[t._v("plus() ： plus方法提供三个重载的方法，分别允许"),e("code",[t._v("String")]),t._v("，"),e("code",[t._v("MessageItem")]),t._v("和"),e("code",[t._v("Message")]),t._v("，这使得你的信息可以自由拼接，使用"),e("code",[t._v(".plus()")]),t._v("之后信息会被合成一条。在上面第二行中，就是文字+图片一起发送。")]),t._v(" "),e("li",[t._v("toMessage()： 这个方法是将"),e("code",[t._v("MessageItem")]),t._v("转为"),e("code",[t._v("Message")]),t._v("，毕竟YuQ的接受和发送都是使用的"),e("code",[t._v("Message")]),t._v("对象。")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"lineq"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lineq"}},[this._v("#")]),this._v(" LineQ")])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"language-java line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-java"}},[e("code",[t._v("    "),e("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Action")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"testLineQ"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Message")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("linQ")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("long")]),t._v(" qq"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Message")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("linQ")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("at")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("qq"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("textLine")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('",您好。"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("textLine")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"您是第xxx位加入本群的"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("   \n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("相比较"),s("code",[this._v("MessageItemFactory")]),this._v("而言，他看起来更加简洁，容易书写，可以尝试一下。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"最后"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#最后"}},[this._v("#")]),this._v(" 最后")])}],!1,null,null,null);s.default=n.exports}}]);