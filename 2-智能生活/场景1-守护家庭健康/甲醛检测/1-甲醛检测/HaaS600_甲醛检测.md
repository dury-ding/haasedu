> **学习物联网，来HaaSEDU就对了**

# HaaS600甲醛检测

&emsp;&emsp;
本节课程的主要目标是通过HaaS600和HOCO甲醛传感器测量环境中的甲醛浓度信息。

<br>

## 准备
1. HaaS600一套
2. HCHO甲醛传感器一个
3. 杜邦连接线若干

## 开发环境
&emsp;&emsp;
在进行下一步之前请确保HaaS600开发环境已经搭建完毕。详情请参考:
* [HaaS Studio开发环境](../../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)

### 创建解决方案

&emsp;&emsp;
如下图所示，打开VS Code之后在新建一个基于helloworld的Javascript工程，设定好工程名称（“hcho_detector”）及工作区路径之后，硬件类型选择HaaS600-EC600S，点击"立即创建"按钮，创建一个Java script轻应用的解决方案。

<div align="center">
<img src=./../../../../图片/2_创建hcho_detector工程_JS.png width=40%/>
</div>

## ADC模式读取甲醛传感器测量结果
> 使用ADC模式前，请先将拨码开关切换到DAC一端。

&emsp;&emsp;
传感器测量结果输出的模拟电压（V）与浓度(ppm)是线性关系，0.4V对应0ppm, 2.0V对应5ppm，因此电压与浓度的线性关系图如下图所示：

<div align="center">
<img src=./../../../../图片/2_甲醛检测_DAC电压曲线.png  width=50%/>
</div>

### 硬件连线图
HaaS600和甲醛传感器硬件连线如下图所示：
<div align="center">
<img src=./../../../../图片/2_甲醛检测_HaaS600_HCHO_DAC_连线.png width=100%/>
</div>
<br>

### 案例代码
将[甲醛检测和LED控制(ADC方式)](./代码/HaaS600/JS/../../HaaS_EDU_K1/Python/ADC/)内的三个文件复制到“hcho_detector”工程根目录下并覆盖工程目录里边的文件。如下图所示：
<div align="center">
<img src=./../../../../图片/2_hcho_detector_工程_JS.png width=80%/>
</div>

> Javascript脚本的详细说明请参考脚本内嵌的文字注释

<br>

## 推送脚本并运行

&emsp;&emsp;
请参考[HaaS-Studio JavaScript工程](../../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio JavaScript工程 - 推送脚本到设备”的详细说明。

实际日志输入如下图所示：
<div align="center">
<img src=./../../../../图片/2_甲醛检测_设备端日志.png  width=100%/>
</div>

<br>

## 系统调试
&emsp;&emsp;
请注意，此甲醛传感器在使用之前需要预热5分钟以上，因此系统启动后需要等待5分钟才能得到准确的测量结果。

<br>

## 课后作业
&emsp;&emsp;
本课程实验代码中，通过ADC读取甲醛传感器的输出电压值，对ADC量测电压值进行校准的过程没有详细说明。请读者在自己的开发板上完成校准过程，并计算得出精准的校准值。

<br>

> 关于HaaS600的详细信息请参考[HaaS600开发板介绍](../../../拓展知识/HaaS硬件积木库/HaaS600开发板/README.md)
>
<br>
