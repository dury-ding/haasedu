> **学习物联网，来HaaSEDU就对了**

# HaaS600 起夜灯

&emsp;&emsp;

## 案例介绍

<div align="center">
<img src=./../../../图片/2_2_起夜灯_HaaS600_案例图.png width=60%/>
</div>

<br>

## 硬件接线图

1. HaaS600开发板        &emsp;&emsp; 一套
2. 人体热释电红外传感器   &emsp;&emsp; 一个
3. 连接线               &emsp;&emsp; 若干

<div align="center">
<img src=./../../../图片/2_2_起夜灯_HaaS600硬件接线图.png width=60%/>
</div>

<br>

## 开发环境
&emsp;&emsp;
在进行下一步之前请确保HaaS600开发环境已经搭建完毕。详情请参考:
* [HaaS Studio开发环境](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)

<br>

## 创建解决方案

&emsp;&emsp;
如下图所示，打开VS Code之后在新建一个基于helloworld的JavaScript工程，设定好工程名称（“human_detector_js”）及工作区路径之后，硬件类型选择HaaS600 EC600S，点击立即创建，创建一个JavaScript轻应用的解决方案。

<div align="center">
<img src=./../../../图片/2_2_起夜灯_创建human_detector_js工程.png width=40%/>
</div>

&emsp;&emsp;
将[人体检测和LED控制](./代码/HaaS600/app.js)里的文件复制后覆盖“human_detector_js”工程根目录下。如下图所示：
<div align="center">
<img src=./../../../图片/2_2_起夜灯_JS工程.png width=80%/>
</div>

> JavaScript脚本的详细说明请参考脚本内嵌的文字注释

<br>

## 推送脚本并运行


&emsp;&emsp;
请参考[HaaS-Studio JavaScript工程](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio JavaScript工程 - 推送脚本到设备”的详细说明。


&emsp;&emsp;
推送此脚本到HaaS600之后，串口会打印如下日志，其中有人在周围的时候，LED灯会亮,日志中led值设置为1；人离开后，LED灯会灭，日志中led值设置为0。

```log
gpio: led set value 1
gpio: led set value 0
gpio: led set value 1
gpio: led set value 0

```

<br>

## 系统调试

## 课后作业

<br>

> 关于HaaS600的详细信息请参考[HaaS600开发板介绍](../../../拓展知识/HaaS硬件积木库/HaaS600开发板/README.md)


<br>