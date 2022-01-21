> **学习物联网，来HaaSEDU就对了**

# HaaS EDU K1火焰强度检测和LED控制

&emsp;&emsp;
本节课程的主要目标是通过HaaS EDU K1和火焰传感器测量环境的火焰亮度信息，并实现报警灯报警的功能。
<br>

## 硬件连线图
&emsp;&emsp;
1. HaaS EDU K1一套
2. 火焰传感器一个
3. 连接线若干

硬件连线图如下图所示：
<div align="center">
<img src=./../../../图片/4_HaaS_EDU_K1_火焰传感器连线图.png width=80%/>
</div>
<br>

## 开发环境
&emsp;&emsp;
在进行下一步之前请确保HaaS EDU K1开发环境已经搭建完毕。详情请参考：
* [HaaS Studio开发环境](../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)

<br>

## 创建解决方案

&emsp;&emsp;
如下图所示，打开VS Code之后在新建一个基于helloworld的python工程，设定好工程名称（“fire_detector”）及工作区路径之后，硬件类型选择HaaS EDU K1，点击立即创建，创建一个Python轻应用的解决方案。

<div align="center">
<img src=./../../../图片/4_创建fire_detector工程.png width=40%/>
</div>

&emsp;&emsp;
将[火焰检测和LED控制](./代码/HaaS_EDU_K1/Python)全部脚本的代码复制后覆盖“fire_detector”工程根目录下原本文件。如下图所示：
<div align="center">
<img src=./../../../图片/4_fire_detector工程.png width=80%/>
</div>

> Python脚本的详细说明请参考脚本内嵌的文字注释

<br>

## 推送脚本并运行

&emsp;&emsp;
请参考[HaaS Studio Python工程开发指南](../1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_Python工程开发指南.md)中“推送脚本到设备”的详细说明，选择串口本地更新的方式进行推送。

&emsp;&emsp;
推送此脚本到HaaS EDU K1之后，串口会周期性的打印如下日志，同时会看到红色报警LED等周期性的闪烁。其中“fire sensor measure result:  xxx mV”中的xxx即为火焰传感器两侧到的电压值。
* 在没有检测到火焰的时候，火焰传感器输出电压为3.3V，会超出HaaS EDU K1的ADC通道（1.8V），ADC实际返回的电压值为1.917V。
* 在检测到火焰之后，火焰传感器输出电压会迅速下降，实际量测到的结果为0.1V左右，火焰亮度越弱，传感器输出电压越高

```
fire sensor measure result:  1917  mV
turn off the alarm
fire sensor measure result:  1917  mV
turn on the alarm
fire sensor measure result:  1917  mV
turn off the alarm
...

fire sensor measure result:  114  mV
turn off the alarm
fire sensor measure result:  106  mV
turn on the alarm
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


> 关于HaaS EDU K1的详细信息请参考[HaaS EDU K1开发板介绍](../../../拓展知识/HaaS硬件积木库/HaaS-EDU-K1开发板/HaaS-EDU-K1.md)。

<br>