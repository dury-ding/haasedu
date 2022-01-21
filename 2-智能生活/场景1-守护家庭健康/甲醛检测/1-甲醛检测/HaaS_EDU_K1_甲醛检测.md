> **学习物联网，来HaaSEDU就对了**

# HaaS EDU K1甲醛检测

&emsp;&emsp;
本节课程的主要目标是通过HaaS EDU K1和HOCO甲醛传感器测量环境的甲醛浓度信息。

<br>

## 硬件列表
&emsp;&emsp;
本课程需要使用的硬件模块如下：
1. HaaS EDU K1一套
2. HCHO甲醛传感器一个
3. 杜邦连接线若干


## 开发环境
&emsp;&emsp;
在进行下一步之前请确保HaaS EDU K1开发环境已经搭建完毕。详情请参考:
* [HaaS Studio开发环境](../../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)

### 创建解决方案

&emsp;&emsp;
如下图所示，打开VS Code之后在新建一个基于helloworld的python工程，设定好工程名称（“hcho_detector”）及工作区路径之后，硬件类型选择HaaS EDU K1，点击立即创建，创建一个Python轻应用的解决方案。

<div align="center">
<img src=./../../../../图片/2_创建hcho_detector工程_HaaS_EDU_K1.png width=60%/>
</div>

## ADC方式读取甲醛传感器

&emsp;&emsp;

通过ADC方式读取甲醛传感器的测量结果，连线之前请先将传感器上拨码开关切换到DAC一侧。硬件连线图如下图所示：
<div align="center">
<img src=./../../../../图片/2_甲醛检测_HaaS_EDU_K1_HCHO_DAC_连线.jpg width=100%/>
</div>
<br>

&emsp;&emsp;
此甲醛传感器的输出模拟电压（V）与鉴权浓度(ppm)是线性关系，0.4V对应0ppm, 2.0V对应5ppm，因此电压与浓度的线性关系图如下图所示：
<div align="center">
<img src=./../../../../图片/2_甲醛检测_DAC电压曲线.png  width=50%/>
</div>

### 案例代码
&emsp;&emsp;
将[甲醛检测和LED控制](./代码/HaaS_EDU_K1/Python/main.py)脚本的代码复制后覆盖“hcho_detector”工程根目录下的脚本。如下图所示：
<div align="center">
<img src=./../../../../图片/2_hcho_detector工程_HaaS_EDU_K1.png width=80%/>
</div>

> Python脚本的详细说明请参考脚本内嵌的文字注释

<br>

## 推送脚本并运行

&emsp;&emsp;
请参考[HaaS-Studio Python工程](../../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio Python工程 - 推送脚本到设备”的详细说明。

&emsp;&emsp;
实际日志输入如下下所示：
```log
...
             Welcome to AliOS Things           
amp shakehand begin...
dev /dev/wifi0 is already add
 ==== python execute from /data/pyamp/main.py ====
 Welcome to MicroPython 
...
Hcho :0.1ppm
Hcho :0.09ppm
Hcho :0.1ppm
Hcho :0.09ppm
Hcho :0.1ppm
Hcho :0.1ppm
Hcho :0.1ppm
...
```


<br>

## 系统调试
&emsp;&emsp;
暂无

<br>
## 课后作业

&emsp;&emsp;
本课程实验代码中，通过ADC读取甲醛传感器的输出电压值，对ADC量测电压值进行校准的过程没有详细说明。请读者在自己的开发板上完成校准过程，并计算得出精准的校准值。

<br>

> 关于HaaS EDU K1的详细信息请参考[HaaS EDU K1开发板介绍](../../../../拓展知识/HaaS硬件积木库/HaaS-EDU-K1开发板/HaaS-EDU-K1.md)。

<br>
