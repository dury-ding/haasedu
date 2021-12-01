> **学习物联网，来HaaSEDU就对了**

# HaaS600焰强度检测和LED控制

&emsp;&emsp;
本节课程的主要目标是通过HaaS600和火焰传感器测量环境的火焰亮度信息，并实现报警灯报警的功能。
<br>

## 硬件连线图
&emsp;&emsp;
1. HaaS600一套
2. 火焰传感器一个
3. RGB LED一颗（或红色LED一颗）
4. 连接线若干

硬件连线图如下图所示：
<div align="center">
<img src=./../../../图片/2_火焰检测_HaaS600连线.png width=80%/>
</div>
<br>

## 开发环境
&emsp;&emsp;
在进行下一步之前请确保HaaS600开发环境已经搭建完毕。详情请参考：
* [HaaS Studio开发环境](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)

<br>

## 创建解决方案

&emsp;&emsp;
如下图所示，打开VS Code之后在新建一个基于helloworld的JavaScript工程，设定好工程名称（“fire_detector”）及工作区路径之后，硬件类型选择HaaS600，点击立即创建，创建一个JavaScript轻应用的解决方案。

<div align="center">
<img src=./../../../图片/4_创建fire_detector工程_JS.png width=40%/>
</div>

&emsp;&emsp;
将[火焰检测和LED控制](./代码/HaaS600/JavaScript)里的脚本文件复制后覆盖新创建的“fire_detector”工程根目录下。如下图所示。
<div align="center">
<img src=./../../../图片/4_fire_detector工程_JS.png width=80%/>
</div>

> JavaScript脚本的详细说明请参考脚本内嵌的文字注释

<br>

## 推送脚本并运行

&emsp;&emsp;
请参考[HaaS-Studio JavaScript工程](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio JavaScript工程 - 推送脚本到设备”的详细说明。


&emsp;&emsp;

&emsp;&emsp;
JS脚本运行之后，系统会周期性的读取火焰传感器的测量结果，并打印到日志中（如下所示）同时会看到红色报警LED等周期性的闪烁。其中：
*  "[ADC](93) adc value：xxx"：xxx为ADC返回的测量结果，因为HaaS600开发板ADC通路有2个100K电阻串联分压，最大电压范围 0 - 2.6V，xxx * 2才是实际测量的电压值。在燃气传感器没有检测到火焰时，输出3.3V，会超出HaaS600 ADC实际量程，此时ADC通道的测量结果为2.598V
*  “fireVoltage：yyy”：yyy则为实际ADC输入的电压值，单位：mV
*  “alarmOn: x”：x为报警灯的状态，1代表报警灯打开，0代表报警灯关闭

```
<D>[ADC](93) adc value: 1299

fireVoltage: 2598
alarmOn: 1
<D>[ADC](93) adc value: 1299

fireVoltage: 2598
alarmOn: 0
```

<br>

# 系统调试
&emsp;&emsp;
打火机打着🔥后，远离和靠近火焰传感器的二极管，查看设备端日志的量测值是否有变化。
>>> 请务必注意安全！！！

<br>
## 课后作业
无

<br>


> 关于HaaS600的详细信息请参考[HaaS600开发板介绍](../../../拓展知识/HaaS硬件积木库/HaaS600开发板/README.md)。

<br>