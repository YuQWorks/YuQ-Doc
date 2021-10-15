(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{411:function(a,s,t){"use strict";t.r(s);var n=t(45),e=Object(n.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"模块开发"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#模块开发"}},[a._v("#")]),a._v(" 模块开发")]),a._v(" "),t("p",[a._v("我之所以叫做 Model 而不是 Module，是因为模块本身不具有应用代码，甚至不具有完整的功能实现，而是功能的 API。"),t("br"),a._v("\n具体功能的实现，应该由运行时实现。"),t("br"),a._v("\n才能让某个模组的 YuQ 应用，具有跨运行时的能力。")]),a._v(" "),t("h2",{attrs:{id:"开发"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#开发"}},[a._v("#")]),a._v(" 开发")]),a._v(" "),t("h3",{attrs:{id:"自定义注解类扫描"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#自定义注解类扫描"}},[a._v("#")]),a._v(" 自定义注解类扫描")]),a._v(" "),t("h4",{attrs:{id:"定义注解"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#定义注解"}},[a._v("#")]),a._v(" 定义注解")]),a._v(" "),t("p",[a._v("YuQ 提供了一种非常方便的方法，供您获得被标记了您特定注解的类。"),t("br"),a._v("\n以 YuQ-QQ 为例：")]),a._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[a._v("    "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@LoadBy")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("QQControllerLoader")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("class")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@interface")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("PrivateController")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n        "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("String")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("value")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("default")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('""')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br")])]),t("p",[a._v("只需要将注解标记一个 "),t("code",[a._v("com.IceCreamQAQ.YuQ.annotation.LoadBy")]),a._v(" 注解，并将 Loader 指向您的加载器，就可以非常方便的获得所有标记了您特定注解的类。")]),a._v(" "),t("h4",{attrs:{id:"编写加载器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#编写加载器"}},[a._v("#")]),a._v(" 编写加载器")]),a._v(" "),t("p",[a._v("您需要编写一个类，并实现 "),t("code",[a._v("com.IceCreamQAQ.YuQ.loader.Loader")]),a._v("接口。"),t("br"),a._v("\n在应用初始化的时候，如有存在的指向加载器的注解，则加载器会被实例化，并调用相关方法。")]),a._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("void")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("load")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("List")]),t("span",{pre:!0,attrs:{class:"token generics"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("LoadItem")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v(" items"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("throws")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Exception")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br")])]),t("p",[a._v("方法允许抛出任何异常，但方法一旦抛出异常，应用加载过程就会被终止。")]),a._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Data")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("class")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("LoadItem")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    \n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Annotation")]),a._v(" annotation"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Class")]),t("span",{pre:!0,attrs:{class:"token generics"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("?")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v(" type"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("private")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Object")]),a._v(" instance"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br"),t("span",{staticClass:"line-number"},[a._v("6")]),t("br"),t("span",{staticClass:"line-number"},[a._v("7")]),t("br"),t("span",{staticClass:"line-number"},[a._v("8")]),t("br")])]),t("p",[a._v("这个对象承载了所有的加载信息。"),t("br"),a._v("\nannotation 内存储了类标记的特定注解。"),t("br"),a._v("\ntype 内存储了类的 Class 对象。"),t("br"),a._v("\ninstance 内存储了类的实例。")]),a._v(" "),t("p",[a._v("您可以在方法内进行该有的加载及初始化操作。")]),a._v(" "),t("h3",{attrs:{id:"为运行时提供接口"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#为运行时提供接口"}},[a._v("#")]),a._v(" 为运行时提供接口")]),a._v(" "),t("p",[a._v("如果您的模块提供运行时，如 YuQ-Web，那则无需关注这个。"),t("br"),a._v("\n如果您的模块不提供运行时，或者可以跨多个运行时运行，如 YuQ-QQ，则您应该将模块需要运行时实现的功能做成接口，然后单独实现运行时。")])])}),[],!1,null,null,null);s.default=e.exports}}]);