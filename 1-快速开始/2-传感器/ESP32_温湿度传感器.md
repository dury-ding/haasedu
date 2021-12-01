> **学习物联网，来HaaSEDU就对了**

# ESP读取温湿度

本节介绍如何在ESP32上读取温湿度信息。

## 硬件连线图
本实验只需要如下硬件：
* ESP32一台
* SHT3X-DIS温湿度传感器一个
* 杜邦线若干
* Micro-USB数据线一条

硬件连线图如下图所示：

<div align="center">
<img src=./../../图片/1_ESP32_SHT3X_DIS_节点图.png width=100%/>
</div>

<br>

## 开发环境
在进行下一步之前请确保ESP32开发环境已经搭建完毕。详情请参考:
* [ESP32固件烧录](./../1-IoT简介与HaaS云端一体开发框架/ESP32_固件烧录.md)

## 创建解决方案

&emsp;&emsp;
点击下图中的"快速开始"按键(<img src=./../../图片/1_HaaS_Studio_创建工程按钮.png width=8%/>)会弹出HaaS Studio的欢迎页面，请点击“创建项目”按钮。

&emsp;&emsp;
在随后弹框中，设定好项目名称（“humiture”）及工作区路径之后，硬件类型选择ESP32，点击“立即创建”，创建一个Python轻应用的解决方案。

<div align="center">
<img src=./../../图片/1_创建Humiture工程_ESP32.png width=40%/>
</div>

&emsp;&emsp;
将[温湿度测量](./代码/ESP32/Python/)目录中的所有文件复制后覆盖humiture工程目录下的原有文件。其中main.py脚本的内容如下图所示：
<div align="center">
<img src=./../../图片/1_温湿度读测量工程_ESP32.png width=80%/>
</div>

> Python脚本的详细说明请参考脚本内嵌的文字注释

<br>

## 推送脚本并运行

&emsp;&emsp;
请参考[HaaS-Studio Python工程](../1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio Python工程 - 推送脚本到设备”的详细说明。

&emsp;&emsp;
推送此脚本到ESP32之后，HaaS Studio会打开ESP32串口，并运行main.py脚本，此时可以看到程序运行后，串口会周期性的打印温湿度信息出来，如下日志。
```
...
************* python task init*******
mount fs
 ==== python file check /data/pyamp/main.py ====
 ==== main.py update time = 691096714 ====
 ==== python execute from /data/pyamp/main.py ====
sht3x inited!
The temperature is: 25.1
The humidity is: 30
The temperature is: 25.1
The humidity is: 30
The temperature is: 25.2
The humidity is: 30
...
```

<br>

> 关于ESP32的详细信息请参考[ESP32开发板介绍](../../拓展知识/HaaS硬件积木库/ESP32开发板/ESP32.md)
