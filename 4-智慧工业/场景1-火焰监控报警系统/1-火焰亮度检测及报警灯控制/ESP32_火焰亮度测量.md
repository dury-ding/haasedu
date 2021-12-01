> **学习物联网，来HaaSEDU就对了**

# ESP32火焰强度检测和LED控制

&emsp;&emsp;
本节课程的主要目标是通过ESP32和火焰传感器测量环境的火焰亮度信息，并实现报警灯报警的功能。
<br>

## 硬件连线图

硬件器材：
1. ESP32开发一套
2. 火焰传感器一个
3. 连接线若干

硬件连线图如下图所示：
<div align="center">
<img src=./../../../图片/4_ESP32_火焰传感器连线图.jpg width=80%/>
</div>
<br>

## 开发环境
&emsp;&emsp;
在进行下一步之前请确保HaaS EDU K1开发环境已经搭建完毕。详情请参考：
1. [HaaS Studio开发环境](../1-IoT简介与HaaS云端一体开发框架/HaaS_Studio开发环境.md)
2. [ESP32工程开发指南](../1-IoT简介与HaaS云端一体开发框架/ESP32工程开发指南.md)
<br>

## 创建解决方案

&emsp;&emsp;
如下图所示，打开VS Code之后在新建一个基于helloworld的python工程，设定好工程名称（“fire_detector”）及工作区路径之后，硬件类型选择ESP32，点击立即创建，创建一个Python轻应用的解决方案。

<div align="center">
<img src=./../../../图片/4_创建fire_detector工程_esp32.jpg width=40%/>
</div>

&emsp;&emsp;
将[火焰检测和LED控制](./代码/ESP32/Python/main.py)脚本的代码复制后覆盖“fire_detector”工程根目录下main.py里边的内容。如下图所示：
<div align="center">
<img src=./../../../图片/4_fire_detector工程_esp32.jpg width=80%/>
</div>

> Python脚本的详细说明请参考脚本内嵌的文字注释

<br>

## 推送脚本并运行

&emsp;&emsp;
请参考[HaaS Studio Python工程开发指南](../1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_Python工程开发指南.md)中“推送脚本到设备”的详细说明，选择串口本地更新的方式进行推送。

&emsp;&emsp;
推送此脚本到ESP32之后，串口会周期性的打印如下日志。其中“The fire status Voltage xxx”中的xxx即为火焰传感器两侧到的电压值。
* 在没有检测到火焰的时候，火焰传感器输出电压为1.1V。
* 在检测到火焰之后，火焰传感器输出电压会迅速下降，实际量测到的结果为几十mv左右，火焰亮度越弱，传感器输出电压越高

```
MicroPython v1.17-dirty on 2021-11-04; ESP32 module with ESP32
Type "help()" for more information.
>>> 
>>> execfile("/data/pyamp/main.py")
The fire status Voltage  1100
The fire status Voltage  1100
The fire status Voltage  1100
The fire status Voltage  1100
The fire status Voltage  1100
The fire status Voltage  1100
```

<br>

# 系统调试
&emsp;&emsp;
打火机打着🔥后，远离和靠近火焰传感器的二极管，查看设备端日志的量测值是否有变化。
>>> 请务必注意安全！！！


<br>

## 课后作业
&emsp;&emsp;
暂无

<br>

> 关于ESP32的详细信息请参考[ESP32开发板介绍](../../../拓展知识/HaaS硬件积木库/ESP32开发板/ESP32.md)。

<br>