> **学习物联网，来HaaSEDU就对了**

# ESP32甲醛检测

&emsp;&emsp;
本节课程的主要目标是通过ESP32和HCHO甲醛传感器测量环境的甲醛浓度信息。

<br>

## 准备
1. ESP32开发板一套
2. HCHO甲醛传感器一个
3. 杜邦连接线若干

## 开发环境
在进行下一步之前请确保ESP32开发环境已经搭建完毕。详情请参考[HaaS Studio开发环境](../../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)的说明。

### 创建解决方案

&emsp;&emsp;
如下图所示，打开VS Code之后在新建一个基于helloworld的python工程，设定好工程名称（“hcho_detector”）及工作区路径之后，硬件类型选择ESP32，点击立即创建，创建一个Python轻应用的解决方案。

<div align="center">
<img src=./../../../../图片/2_创建hcho_detector工程_esp32.jpg width=40%/>
</div>
<br>

## DAC模式
> 使用DAC模式前，请先将拨码开关切换到DAC一端。

&emsp;&emsp;
输出模拟电压（V）与浓度(ppm)是线性关系，0.4V对应0ppm, 2.0V对应5ppm，因此电压与浓度的线性关系图如下图所示：
<div align="center">
<img src=./../../../../图片/2_甲醛检测_DAC电压曲线.png  width=100%/>
</div>

### 硬件连线图
硬件连线图如下图所示：
<div align="center">
<img src=./../../../../图片/2_甲醛检测_ESP32_连线.jpg width=100%/>
</div>
<br>

### 案例代码
将[甲醛检测和LED控制](./代码/ESP32/Python/)文件下所有脚本代码复制后，覆盖刚创建的“hcho_detector”工程根目录下的文件。main.py代码区如下图所示：
<div align="center">
<img src=./../../../../图片/2_hcho_detector工程_esp32.jpg width=80%/>
</div>

> Python脚本的详细说明请参考脚本内嵌的文字注释

<br>

## 推送脚本并运行

&emsp;&emsp;
请参考[HaaS-Studio Python工程](../../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio Python工程 - 推送脚本到设备”的详细说明。

&emsp;&emsp;
实际日志输入如下所示：

```log
mount fs
 ==== python file check /data/pyamp/main.py ====
 ==== main.py update time = 691090236 ====
 ==== python execute from /data/pyamp/main.py ====
Hcho :0.01ppm
Hcho :0.01ppm
Hcho :0.01ppm
Hcho :0.01ppm
```
<br>

## 系统调试
&emsp;&emsp;
暂无

<br>
## 课后作业

&emsp;&emsp;
暂无

<br>

> 关于ESP32的详细信息请参考[ESP32开发板介绍](../../../../拓展知识/HaaS硬件积木库/HaaS-EDU-K1开发板/HaaS-EDU-K1.md)。

<br>