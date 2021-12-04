> **学习物联网，来HaaSEDU就对了**

# HaaS600读取温度

本节介绍如何在HaaS600上读取温湿度信息。

## 硬件连线图
因HaaS600内置的温度传感器，所以本节就以HaaS600内置的温度传感器为例介绍如何通过JavaScript读取开发板的温度信息。

<br>

## 开发环境
在进行下一步之前请确保HaaS600开发环境已经搭建完毕。详情请参考:
* [HaaS Studio开发环境](./../1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)
<br>


## 创建解决方案

&emsp;&emsp;
如下图所示，打开VS Code之后在新建一个基于helloworld的JavaScript工程，设定好工程名称（“temperature”）及工作区路径之后，硬件类型选择HaaS600 ES600，点击立即创建，创建一个JavaScript轻应用的解决方案。

<div align="center">
<img src=./../../图片/1_创建temperature工程_JS.png width=40%/>
</div>

&emsp;&emsp;
将[温度测量](./代码/HaaS600/JavaScript/)脚本文件复制后覆盖HaaS-Studio工程根目录下app.js和app.json两个文件。如下图所示：

<div align="center">
<img src=./../../图片/1_温度测量工程_JS.png width=80%/>
</div>

> JavaScript脚本的详细说明请参考脚本内嵌的文字注释

<br>

## 推送脚本并运行

&emsp;&emsp;
请参考[HaaS-Studio JavaScript工程](../1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio JavaScript工程 - 推送脚本到设备”的详细说明。

&emsp;&emsp;
推送此脚本到HaaS600之后，串口会周期性的打印如下日志，其中“lm75 data is xxx”后面的xxx即为LM75温度传感器测量到的温度值，单位：摄氏度。
```log
lm75 data is 29.625
lm75 data is 29.5
lm75 data is 29.625
lm75 data is 29.5
lm75 data is 29.625
lm75 data is 29.75
```

>>> 作业：本节课程使用HaaS600内置的温度传感器进行温度的测量，但没有完成湿度的测量，请尝试在HaaS600上外接温湿度传感器，完成温湿度的测量。
<br>


> 关于HaaS600的详细信息请参考[HaaS600开发板介绍](../../../拓展知识/HaaS硬件积木库/HaaS600开发板/README.md)
