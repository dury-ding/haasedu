> **学习物联网，来HaaSEDU就对了**

# HaaS EDU K1 起夜灯

&emsp;&emsp;

## 案例介绍

<div align="center">
<img src=./../../../图片/2_起夜灯_HaaS_EDU_K1_案例图.png width=80%/>
</div>

<br>

## 硬件接线图

1. HaaS EDU K1         一套
2. 人体热释电红外传感器   一个
3. 连接线               若干
<div align="center">
<img src=./../../../图片/2_2_HaaS_EDU_K1_起夜灯硬件接线图.png width=70%/>
</div>

<br>

## 开发环境
&emsp;&emsp;
在进行下一步之前请确保HaaS EDU K1开发环境已经搭建完毕。详情请参考:
* [HaaS Studio开发环境](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)

<br>

## 创建解决方案

&emsp;&emsp;
如下图所示，打开VS Code之后在新建一个基于helloworld的python工程，设定好工程名称（“human_detector”）及工作区路径之后，硬件类型选择HaaS EDU K1，点击立即创建，创建一个Python轻应用的解决方案。

<div align="center">
<img src=./../../../图片/2_2_创建human_detector工程_HaaS_EDU_K1.png width=40%/>
</div>

&emsp;&emsp;
将[人体检测和LED控制](./代码/HaaS_EDU_K1/)脚本的代码复制后覆盖“human_detector”工程根目录下所有的内容。如下图所示：
<div align="center">
<img src=./../../../图片/2_2_human_detector工程.png width=80%/>
</div>

> Python脚本的详细说明请参考脚本内嵌的文字注释

<br>

## 推送脚本并运行
&emsp;&emsp;
请参考[HaaS-Studio Python工程](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio Python工程 - 推送脚本到设备”的详细说明。


&emsp;&emsp;
推送此脚本到HaaS EDU K1之后，当有人体在人体热释电红外传感器附近移动的时候，HaaS EDU K1的串口会周期性的打印如下日志，其中：
* human status后面如果为0代表没有检测到人体活动
* human status后面如果为1则代表检测到人体活动并打印“human is here .....”此时HaaS EDU K1上的红色LED等会亮起。

```log
...
             Welcome to AliOS Things           
amp shakehand begin...
dev /dev/wifi0 is already add
 ==== python execute from /data/pyamp/main.py ====
 Welcome to MicroPython 
...
human status  0
human status  1
human is here ...

human status  1
human is here ...
...
```


