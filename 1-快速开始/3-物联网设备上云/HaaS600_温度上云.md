> **学习物联网，来HaaSEDU就对了**

# HaaS EDU K1温湿度上云

## 硬件连线图

&emsp;&emsp;
本实验只需要一台HaaS600即可，无需外接其它设备。

<br>

## 开发环境

&emsp;&emsp;
在进行下一步之前请确保HaaS EDU K1开发环境已经搭建完毕。详情请参考：
* [HaaS Studio开发环境](../1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)
<br>

## 创建解决方案

&emsp;&emsp;
如下图所示，打开VS Code之后在新建一个基于helloworld的JavaScript案例，硬件类型选择HaaS600 ES600，设定好工程名称（temperature）及工作区路径之后，点击立即创建，创建一个JavaScript轻应用的解决方案。

<div align="center">
<img src=./../../图片/1_创建temperature工程_JS.png
 width=40%/>
</div>

&emsp;&emsp;
将[温度测量上云](./代码/HaaS600/JavaScript/)里边的脚本文件复制后覆盖HaaS-Studio工程根目录下app.js和app.json两个文件。如下图所示：
<div align="center">
<img src=./../../图片/1_温度测量上云_JS.png width=80%/>
</div>

> JavaScript脚本的详细说明请参考脚本内嵌的文字注释

## 代码编辑
&emsp;&emsp;
完成下面2个步骤就完成了设备端的开发。

1. **修改设备端三元组**

&emsp;&emsp;
修改temperature工程里app.js中productKey、deviceName和deviceSecret的值为读者创建的物联网设备的三元组信息，如下图所示：

<div align="center">
<img src=./../../图片/1_temperature_修改设备端三元组信息_JS.png
 width=40%/>
</div>


2. **修改设备端上报温湿度信息所用标识符**

temperature工程里app.js中下面的代码实现的是上传温湿度值到云端的功能。其中CurrentTemperature便是温度值上报时所用的标识符。
```python
   // 上报数据到云端
   iotdev.postProps(
       JSON.stringify({
           CurrentTemperature: temp,
       })
   );
```
确保这个标识符和物联网产品的物模型中属性标识符是一样的，如下图所示：
<div align="center">
<img src=./../../图片/1_HaaS600_temperature_属性标识符修改.png
 width=40%/>
</div>

## 推送脚本到HaaS600并运行

&emsp;&emsp;
请参考[HaaS-Studio JavaScript工程开发指南](../1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“推送脚本到设备”的详细说明，选择串口本地更新的方式进行推送。

&emsp;&emsp;
推送此脚本到HaaS600之后，串口会周期性的打印如下日志。其中“lm75 data is xx.yyy”中的xxx为LM75温度传感器测量到的温度值，“{"CurrentTemperature":xx.yyy}”则为HaaS600上传到云端的温度属性值。

```log
lm75 data is 31.125
reporting {"CurrentTemperature":31.125} to cloud
lm75 data is 31
lm75 data is 31.123
reporting {"CurrentTemperature":31.123} to cloud
```

&emsp;&emsp;
其中xxx是温湿度传感器实际测量到的温度值
> 此温度值为开发板的温度值，所以和体感温度会有一定的差别