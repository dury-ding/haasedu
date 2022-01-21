> **学习物联网，来HaaSEDU就对了**

# HaaS600 起夜灯数据上云

## 硬件连线图

&emsp;&emsp;
同上一节课程。

<br>

## 代码编辑及讲解

&emsp;&emsp;
本节课程是在[人体检测及LED控制](../1-人体检测及LED控制/README.md)的基础上进行开发，设备端的工程无需再创建，只需要将[JavaScript源代码](./代码/HaaS600)里的文件复制后覆盖“human_detector_js”工程根目录下appp.js和app.json，如下图所示：
<div align="center">
<img src=./../../../图片/2_2_起夜灯_HaaS600上云工程.png width=80%/>
</div>
> JavaScript脚本的详细说明请参考脚本内嵌的文字版注释

&emsp;&emsp;
接下来需要完成以下2处代码修改。
1. **修改设备端三元组**

&emsp;&emsp;
修改human_detector_js工程里app.js中productKey、deviceName和deviceSecret的值为读者创建的物联网设备的三元组信息，如下图所示：

<div align="center">
<img src=./../../../图片/2_2_起夜灯_HaaS600修改三元组.png
 width=60%/>
</div>


2. **修改设备端上报数据所用标识符**

human_detector_js工程里app.js中下面的代码实现的是上传LED灯状态到云端的功能。其中LEDSwitch便是LED灯状态上报云端所用的标识符。
```python

		// 生成上报到物联网平台的属性值字串，此处的属性标识符"LEDSwitch"必须和物联网平台的属性一致
		iotdev.postProps(
			JSON.stringify({
				LEDSwitch: value,
			})
		);
```
确保标识符和物联网产品的物模型中属性标识符是一样的。
<br>

## 推送脚本到HaaS600并运行

&emsp;&emsp;
请参考[HaaS-Studio JavaScript工程](../../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio JavaScript工程 - 推送脚本到设备”的详细说明。

&emsp;&emsp;
推送此脚本到HaaS600之后，串口会周期性的打印如下日志：

```log
gpio: led set value 1
gpio: led set value 0
gpio: led set value 1
gpio: led set value 0
```

> 推送工程到HaaS600的详细操作步骤请参考[HaaS-Studio JavaScript工程 - 本地更新](../../../1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)。
<br>
