> **学习物联网，来HaaSEDU就对了**

# HaaS EDU K1温湿度测量

&emsp;&emsp;
本节课程的主要目标是通过HaaS EDU K1读取周围环境的温度信息和湿度信息。因HaaS EDU K1内置了温湿度传感器，只是它量测的是开发板的温湿度，和周围环境的温湿度有一定的差值。本节就以HaaS EDU K1内置的温湿度传感器测量到的温湿度代替环境的温湿度信息。

<br>

## 硬件连线图
&emsp;&emsp;
本实验只需要一台HaaS EDU K1和一根USB转Type-C的数据线即可，无需外接其它设备。

<br>

## 开发环境
&emsp;&emsp;
在进行下一步之前请确保HaaS EDU K1开发环境已经搭建完毕。详情请参考:
* [HaaS Studio开发环境](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)

<br>

## 创建解决方案
&emsp;&emsp;
如下图所示，打开VS Code之后在新建一个基于helloworld的python工程，设定好工程名称（“humiture”）及工作区路径之后，硬件类型选择HaaS EDU K1，点击立即创建，创建一个Python轻应用的解决方案。

<div align="center">
<img src=./../../../图片/1_创建Humiture工程_HaaS_EDU_K1.png width=40%/>
</div>

&emsp;&emsp;
将[温湿度测量](./代码/HaaS_EDU_K1/Python/)目录中的所有文件复制后覆盖humiture工程目录下的原有文件。其中main.py脚本的内容如下图所示：
<div align="center">
<img src=./../../../图片/1_温湿度读测量工程.png width=80%/>
</div>

> Python脚本的详细说明请参考脚本内嵌的文字注释

<br>

## 推送脚本并运行

请参考[HaaS-Studio Python工程](../../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio Python工程 - 推送脚本到设备”的详细说明。

&emsp;&emsp;
推送此脚本到HaaS EDU K1之后，串口会周期性的打印如下日志。
```
...
The temperature is: 52.1
The humidity is: 19.6
...
```

<br>

## 课后作业

&emsp;&emsp;
为了得到更精确的温湿度信息，请读者可以外置的温湿度传感器（具体可参考[HaaS硬件积木库](../../../拓展知识/HaaS硬件积木库/HaaS硬件积木库.md)的硬件积木列表）并编写对应的Python程序来获取更准确的温湿度信息数据。
<br>


> 关于HaaS EDU K1的详细信息请参考[HaaS EDU K1开发板介绍](./../../../拓展知识/HaaS硬件积木库/HaaS-EDU-K1开发板/README.md)。

<br>