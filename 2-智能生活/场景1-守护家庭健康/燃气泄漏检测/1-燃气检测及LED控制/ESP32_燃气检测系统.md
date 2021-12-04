> **学习物联网，来HaaSEDU就对了**

# ESP32燃气检测和LED控制

&emsp;&emsp;
本节课程的主要目标是通过ESP32和MQ2燃气传感器测量环境的燃气浓度信息，并实现LED红灯报警的功能。

<br>

## 硬件连线图
&emsp;&emsp;
完成本节内容的学习需要如下硬件：
1. ESP32一套
2. MQ2燃气传感器一个
3. RGB LED一个（或红色LED一个）
4. 连接线若干

&emsp;&emsp;
硬件连线图如下图所示：
<div align="center">
<img src=./../../../../图片/2_燃气检测_ESP32_MQ2连线.png width=80%/>
</div>
<br>

## 开发环境
&emsp;&emsp;
在进行下一步之前请确保ESP32开发环境已经搭建完毕。详情请参考:
* [ESP32固件烧录](./../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/ESP32_固件烧录.md)

<br>

## 创建解决方案

&emsp;&emsp;
如下图所示，打开VS Code之后在新建一个基于helloworld的python工程，设定好工程名称（“gas_detector”）及工作区路径之后，硬件类型选择ESP32，点击立即创建，创建一个Python轻应用的解决方案。

<div align="center">
<img src=./../../../../图片/2_ESP32_创建gas_detector工程.png width=40%/>
</div>

&emsp;&emsp;
将[燃气检测和LED控制](./代码/ESP32/Python)中的所有文件复制后覆盖“gas_detector”工程根目录下原本的内容。如下图所示：
<div align="center">
<img src=./../../../../图片/2_gas_detector工程.png width=80%/>
</div>

> Python脚本的详细说明请参考脚本内嵌的文字注释

<br>

## 推送脚本并运行


&emsp;&emsp;
请参考[HaaS-Studio Python工程](../../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio Python工程 - 推送脚本到设备”的详细说明。


&emsp;&emsp;
推送此脚本到ESP32之后，串口会打印如下日志，并周期性的输出燃气电压和报警灯状态信息。其中，“gasVoltage: xxx alarmOn: yyy”中的xxx即为燃气传感器检测到的电压值（单位：mV），yyy代表报警灯的状态，1代表打开，0代表关闭。在此过程中会看到红色LED周期性的闪烁。

```log
...
 ==== python file check /data/pyamp/main.py ====
 ==== main.py update time = 691110460 ====
 ==== python execute from /data/pyamp/main.py ====
gasVoltage: 1100  alarmOn: 0
gasVoltage: 1100  alarmOn: 1
gasVoltage: 1100  alarmOn: 0
gasVoltage: 1100  alarmOn: 1
gasVoltage: 1100  alarmOn: 0
...
```

<br>

# 系统调试
&emsp;&emsp;
因真实环境燃气检测具有很高的危险性，所以请勿在真实环境下进行测试！ 因MQ2传感器自带了信号放大调节器，所以可以通过调节此信号放大器旋钮来模拟燃气浓度变化进行功能调试。信号放大调节器，请参考下图红框框起来的旋钮。

<div align="center">
<img src=./../../../../图片/2_MQ2燃气传感器_信号放大调节旋钮.png  width=30%/>
</div>

<br>

## 课后作业

&emsp;&emsp;
本节课程使用ADC量测MQ2传感器的输出电压，请根据MQ2传感器的数据手册将获取到的电压值转换为燃气浓度。

<br>

> 关于ESP32的详细信息请参考[ESP32开发板介绍](../../../../拓展知识/HaaS硬件积木库/ESP32开发板/ESP32.md)。

<br>