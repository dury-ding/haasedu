> **学习物联网，来HaaSEDU就对了**

# ESP32 光照传感器检测

&emsp;&emsp;
本节课程的主要目标是通过ESP32读取光照强度值。

<br>

## 硬件连线图

&emsp;&emsp;

硬件器材：
1. ESP32开发一套
2. 光敏电阻传感器一个
3. 连接线若干

硬件连线图如下图所示：
<div align="center">
<img src=./../../../图片/4_ESP32_热敏电阻传感器连线图.jpg width=80%/>
</div>
<br>

## 开发环境

&emsp;&emsp;
在进行下一步之前请确保ESP32开发环境已经搭建完毕。详情请参考[HaaS Studio开发环境](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)的说明。
<br>

## 创建解决方案

&emsp;&emsp;
如下图所示，打开VS Code之后在新建一个基于helloworld的python工程，设定好工程名称（“light_smart”）及工作区路径之后，硬件类型选择ESP32，点击立即创建，创建一个Python轻应用的解决方案。
<div align="center">
<img src=./../../../图片/5_1_创建智慧路灯工程_esp32.jpg width=80%/>
</div>

&emsp;&emsp;
将[光照传感器检测](./代码/ESP32/Python/main.py)脚本的代码复制后覆盖HaaS-Studio工程根目录下main.py里边的内容。如下图所示：
<div align="center">
<img src=./../../../图片/5_1_光强度检测工程_esp32.jpg
 width=80%/>
</div>

> Python脚本的详细说明请参考脚本内嵌的文字注释

<br>

## 推送脚本并运行

&emsp;&emsp;
推送此脚本到ESP32之后，打印光敏电阻电压值，亮度越亮，电压值越低，如下所示：

```log
mount fs
 ==== python file check /data/pyamp/main.py ====
 ==== main.py update time = 691104606 ====
 ==== python execute from /data/pyamp/main.py ====
photoresistor init finished
The lightness is:  597
亮度:597
The lightness is:  597
亮度:597
The lightness is:  583
亮度:583
The lightness is:  585
亮度:585
The lightness is:  583
亮度:583
The lightness is:  584
亮度:584
The lightness is:  580
亮度:580
The lightness is:  875
亮度:875
The lightness is:  1034
亮度:1034
The lightness is:  1011
亮度:1011
The lightness is:  1050
亮度:1050
The lightness is:  591
亮度:591
The lightness is:  589
亮度:589
The lightness is:  585
亮度:585
```
<br>

## 课后作业

暂无
<br>
<br>

> 关于ESP32的详细信息请参考[ESP32开发板介绍](../../../拓展知识/HaaS硬件积木库/ESP32开发板/README.md)。

<br>
