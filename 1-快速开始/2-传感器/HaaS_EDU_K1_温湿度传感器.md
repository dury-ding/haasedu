> **学习物联网，来HaaSEDU就对了**

# HaaS EDU K1读取温湿度

本节介绍如何在HaaS EDU K1上读取温湿度信息。

## 硬件连线图
本实验只需要一台HaaS EDU K1和一根USB转Type-C的数据线即可，无需外接其它设备。

<br>

## 开发环境
在进行下一步之前请确保HaaS EDU K1开发环境已经搭建完毕。详情请参考:
* [HaaS Studio开发环境](./../1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)


## 创建解决方案

&emsp;&emsp;
如下图所示，打开VS Code之后在新建一个基于helloworld的python工程，设定好工程名称（“humiture”）及工作区路径之后，硬件类型选择HaaS EDU K1，点击立即创建，创建一个Python轻应用的解决方案。

<div align="center">
<img src=./../../图片/1_创建Humiture工程.png width=40%/>
</div>

&emsp;&emsp;
将[温湿度测量](./代码/HaaS_EDU_K1/Python/main.py)脚本的代码复制后覆盖HaaS-Studio工程根目录下main.py里边的内容。如下图所示：
<div align="center">
<img src=./../../图片/1_温湿度读测量工程.png width=80%/>
</div>

> Python脚本的详细说明请参考脚本内嵌的文字注释

<br>

## 推送脚本并运行

&emsp;&emsp;
请参考[HaaS-Studio Python工程](../1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio Python工程 - 推送脚本到设备”的详细说明。

&emsp;&emsp;
推送此脚本到HaaS EDU K1之后，串口会周期性的打印如下日志。
```
...
si7006 version is: 32
The temperature is: 52.1
The humidity is: 19.6
...
```

&emsp;&emsp;
实际日志输入如下图所示：
<div align="center">
<img src=./../../图片/1_温湿度案例_设备端日志.gif width=100%/>
</div>

> 作业：HaaS EDU K1除了集成了温湿度传感器外，还集成了大气压传感器、光照传感器、陀螺仪传感器等，请在HaaS EDU K1上获取环境光强度。
<br>

> 关于HaaS EDU K1的详细信息请参考[HaaS EDU K1开发板介绍](../../拓展知识/HaaS硬件积木库/HaaS-EDU-K1开发板/HaaS-EDU-K1.md)
