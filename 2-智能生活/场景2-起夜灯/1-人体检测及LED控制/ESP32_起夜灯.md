> **学习物联网，来HaaSEDU就对了**

# ESP32 起夜灯

&emsp;&emsp;

## 案例介绍

本节课程的主要目标是通过ESP32和IR红外传感器进行人感检测。

<br>

## 硬件接线图

1. ESP32开发板         一套
2. 人体热释电红外传感器   一个
3. 连接线               若干
<div align="center">
<img src=./../../../图片/2_2_HaaS_EDU_K1_起夜灯硬件接线图_esp32.jpg width=70%/>
</div>

<br>

## 开发环境
&emsp;&emsp;
在进行下一步之前请确保ESP32开发环境已经搭建完毕。详情请参考[HaaS Studio开发环境](./../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)的说明。
<br>

## 创建解决方案

&emsp;&emsp;
如下图所示，打开VS Code之后在新建一个基于helloworld的python工程，设定好工程名称（“human_detector”）及工作区路径之后，硬件类型选择ESP32，点击立即创建，创建一个Python轻应用的解决方案。

<div align="center">
<img src=./../../../图片/2_2_创建human_detector工程_esp32.jpg width=40%/>
</div>

&emsp;&emsp;
将[人体检测和LED控制](./代码/ESP32)文件下的所有脚本进行复制到“human_detector”工程根目录中。如下图代码区所示：
<div align="center">
<img src=./../../../图片/2_2_human_detector工程_esp32.jpg width=80%/>
</div>

> Python脚本的详细说明请参考脚本内嵌的文字注释

<br>

## 推送脚本并运行

&emsp;&emsp;
推送此脚本到ESP32之后，串口会周期性的打印如下日志。
```log
human is here .....
human is here .....
human is here .....
```

&emsp;&emsp;
请参考[HaaS-Studio Python工程](./../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio Python工程 - 推送脚本到设备”的详细说明。

## 系统调试

<br>

## 课后作业

<br>