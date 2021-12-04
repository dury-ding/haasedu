> **学习物联网，来HaaSEDU就对了**

# HaaS600 温湿度测量

&emsp;&emsp;
本节课程的主要目标是通过HaaS600读取周围环境的温度信息和湿度信息。因HaaS600只内置了温度传感器。没办法满足同时测量温度和湿度的目标，所以我们外接一颗温湿度传感器SH3T-DIS传感器模组来完成温湿度的测量。

<br>

## 硬件连线图
&emsp;&emsp;
1. HaaS600一套
2. SH3T-DIS温湿度传感器
3. RGB LED模组一个（读者也可以选择使用红色、蓝色、绿色LED或二极管各一个）
4. 连接线若干

硬件连线图如下图所示：
<div align="center">
<img src=./../../../图片/3_HaaS600_温湿度测量_硬件连线图_LED.png  width=80%/>
</div>

<br>

## 开发环境
&emsp;&emsp;
在进行下一步之前请确保HaaS600开发环境已经搭建完毕。详情请参考:
* [HaaS Studio开发环境](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)
<br>

## 创建解决方案

&emsp;&emsp;
如下图所示，打开VS Code之后在新建一个基于helloworld的JavaScript工程，设定好工程名称（“floriculture”）及工作区路径之后，硬件类型选择HaaS600，点击立即创建，创建一个JavaScript轻应用的解决方案。

<div align="center">
<img src=./../../../图片/3_创建floriculture工程_JS.png width=40%/>
</div>

&emsp;&emsp;
将[温湿度测量](./代码/HaaS600/JavaScript)里的我脚本文件复制后覆盖“floriculture”工程根目录下appp.js和app.json。如下图所示。
<div align="center">
<img src=./../../../图片/3_floriculture温湿度读测量工程.png width=80%/>
</div>

> JavaScript脚本的详细说明请参考脚本内嵌的文字注释

<br>

## 推送脚本并运行

请参考[HaaS-Studio JavaScript工程](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio JavaScript工程 - 推送脚本到设备”的详细说明。

&emsp;&emsp;
推送此脚本到HaaS600之后，串口会周期性的打印如下日志。其中“humi: xxx temp: yyy”中的xxx即为相对湿度值，yyy即为温度值，单位：摄氏度。在这个过程中代表空调和加湿器状态的
```log
...
humi: 29.6620128658 temp: 23.058641315958127
关闭 空调和加湿器
humi: 29.6620128658 temp: 23.058641315958127
打开 空调和加湿器
...
```

<br>

> 关于HaaS600的详细信息请参考[HaaS600开发板介绍](../../../拓展知识/HaaS硬件积木库/HaaS600开发板/README.md)


<br>