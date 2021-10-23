# 生命周期相关
这里主要是生命周期相关事件列表。
从 YuQ 本身启动到停止的过程，与 Bot 状态变化所涉及到的相关事件。

## YuQ 启动完毕
事件名: ``  
父事件: 无  
完整签名: `com.icecreamqaq.yuq.events.`  
可否取消: 否  
事件属性: 

属性名 | 类型 | 类型签名| 描述
:---: | :---: | --- | ---
yuq | YuQ | com.icecreamqaq.yuq.YuQ | 无

简介:   
YuQ 启动完成时将触发此事件，事件完成后将开始响应 Bot 动作。  
本事件不是最开始执行的事件。

## YuQ 准备停止
事件名: ``  
父事件: 无  
完整签名: `com.icecreamqaq.yuq.events.`  
可否取消: 否  
事件属性:

属性名 | 类型 | 类型签名| 描述
:---: | :---: | --- | ---
yuq | YuQ | com.icecreamqaq.yuq.YuQ | 无

简介:

## 机器人状态改变
事件名: ``  
父事件: 无  
完整签名: `com.icecreamqaq.yuq.events.`  
简介:

## 机器人上线
事件名: ``  
父事件: 无  
完整签名: `com.icecreamqaq.yuq.events.`  
可否取消: 否  
事件属性:

属性名 | 类型 | 类型签名| 描述
:---: | :---: | --- | ---
yuq | YuQ | com.icecreamqaq.yuq.YuQ | 无

简介:  

## 机器人离线
事件名: ``  
父事件: 无  
完整签名: `com.icecreamqaq.yuq.events.`  
可否取消: 否  
事件属性:

属性名 | 类型 | 类型签名| 描述
:---: | :---: | --- | ---
yuq | YuQ | com.icecreamqaq.yuq.YuQ | 无

简介:

## 机器人重新上线
事件名: ``  
父事件: 无  
完整签名: `com.icecreamqaq.yuq.events.`  
可否取消: 否  
事件属性:

属性名 | 类型 | 类型签名| 描述
:---: | :---: | --- | ---
yuq | YuQ | com.icecreamqaq.yuq.YuQ | 无

简介: 

## RainCode 初始化完毕
事件名: ``  
父事件: 无  
完整签名: `com.icecreamqaq.yuq.events.`  
可否取消: 否  
事件属性: 无  
简介:  
在这个事件触发时，默认解析器已经加载完毕。  
您可以在这个事件中放心的注册您的 RainCode 解析器。  
因为事件执行是优先级从高到低的，如果您要覆盖其他人的 RainCode 解析器，请保证您要比对方更晚注册。  
本事件要早于`YuQ 启动完毕`事件执行，请注意您的业务加载逻辑。