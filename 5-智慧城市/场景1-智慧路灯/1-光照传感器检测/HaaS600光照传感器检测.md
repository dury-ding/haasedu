> **学习物联网，来HaaSEDU就对了**

# HaaS600光照传感器检测

&emsp;&emsp;
本节课程的主要目标是通过HaaS600读取光传感器的光照强度值。

<br>

## 硬件连线图

&emsp;&emsp;
本实验需要一台HaaS600开发板套件以及一个光照传感器。

<div align="center">
<img src=./../../../图片/5_1_实物连接示意图1.jpg
 width=80%/>
</div>

<div align="center">
<img src=./../../../图片/5_1_实物图连接2.jpg
 width=60%/>
</div>

<br>

## 开发环境

&emsp;&emsp;
在进行下一步之前请确保HaaS600开发环境已经搭建完毕。详情请参考:
* [HaaS Studio开发环境](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)
<br>

## 创建解决方案

&emsp;&emsp;
如下图所示，打开VS Code之后在新建一个基于helloworld的JS工程，设定好工程名称（“light_smart”）及工作区路径之后，硬件类型选择HaaS600(具体型号看读者手上的开发板型号)，点击立即创建，创建一个JS轻应用的解决方案。
<div align="center">
<img src=./../../../图片/5_1_创建智慧路灯工程js.jpg width=40%/>
</div>

&emsp;&emsp;
将[光照传感器检测](./代码/HaaS600/JS)脚本的代码复制后覆盖HaaS-Studio工程根目录app/下的所有内容。如下图所示：
<div align="center">
<img src=./../../../图片/5_1_光强度检测工程js.jpg
 width=80%/>
</div>

> Python脚本的详细说明请参考脚本内嵌的文字注释

<br>

## 推送脚本并运行

&emsp;&emsp;
推送此脚本到HaaS600开发板之后，设备串口显示如下日志所示：

```log
adc: open success
AT command server ready!
+CEREG: 0
+CEREG: 0
Booting done
5
PMIC_Phase3Init,Clk Init
send 0xee to DSP 
SW restart reason: Normal powering on
CommPMLPT --- 1, 0, 1
adc value is 485
adc value is 485
adc value is 485
adc value is 485
adc value is 485
adc value is 485
adc value is 485
adc value is 486
adc value is 486
adc value is 485
adc value is 485
adc value is 486
adc value is 486
adc value is 486
adc value is 486
adc value is 486
```

<br>

## 课后作业

暂无
<br>
<br>

> 关于HaaS600的详细信息请参考[HaaS600开发板介绍](../../../拓展知识/HaaS硬件积木库/HaaS600开发板/HaaS600.md)。

<br>
