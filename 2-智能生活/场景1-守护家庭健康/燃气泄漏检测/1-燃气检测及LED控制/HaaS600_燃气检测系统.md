> **学习物联网，来HaaSEDU就对了**

# HaaS600燃气检测和LED控制

&emsp;&emsp;
本节课程的主要目标是通过HaaS600和MQ2燃气传感器测量环境的燃气浓度信息，并实现LED红灯报警的功能。

<br>

## 硬件连线图
&emsp;&emsp;
1. HaaS600一套
2. MQ2燃气传感器一个
3. RGB LED一个（或红色LED一个）
4. 连接线若干

硬件连线图如下图所示：
<div align="center">
<img src=./../../../../图片/2_烟雾检测_HaaS600_MQ2连线.png width=80%/>
</div>
<br>



## 开发环境
&emsp;&emsp;
在进行下一步之前请确保HaaS600开发环境已经搭建完毕。详情请参考:
* [HaaS Studio开发环境](../../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)
<br>

## 创建解决方案

&emsp;&emsp;
如下图所示，打开VS Code之后在新建一个基于helloworld的JavaScript工程，设定好工程名称（“gas_detector”）及工作区路径之后，硬件类型选择HaaS600 ES600，点击立即创建，创建一个轻应用的解决方案。

<div align="center">
<img src=./../../../../图片/2_创建gas_detector工程_JS.png width=40%/>
</div>

&emsp;&emsp;
将[燃气检测和LED控制](./代码/HaaS600/JavaScript)里的我脚本文件复制后覆盖“gas_detector”工程根目录下。如下图所示：
<div align="center">
<img src=./../../../../图片/2_gas_detector工程_JS.png width=100%/>
</div>

> JavaScript脚本的详细说明请参考脚本内嵌的文字注释

<br>

## 推送脚本并运行


&emsp;&emsp;
请参考[HaaS-Studio JavaScript工程](../../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio JavaScript工程 - 推送脚本到设备”的详细说明。


&emsp;&emsp;
推送此脚本到HaaS600之后，串口会周期性的打印如下日志，其中gasVoltage为燃气传感器实际测量到的电压值（单位：mV），alarmOn为红色报警LED的状态，1代表报警灯亮，0代表报警灯灭。

```log

gasVoltage: 852 alarmOn: 1
<D>[ADC](93) adc value: 426

gasVoltage: 850 alarmOn: 0
<D>[ADC](93) adc value: 425

gasVoltage: 850 alarmOn: 1
<D>[ADC](93) adc value: 425

```

&emsp;&emsp;
实际日志输出如下图所示：
<div align="center">
<img src=./../../../../图片/2_燃气传感器_本地检测_设备端日志_JS.gif  width=100%/>
</div>

<br>

# 系统调试
&emsp;&emsp;
因真实环境燃气检测具有很高的危险性，所以请勿在真实环境下进行测试！ 因MQ2传感器自带了信号放大调节器，所以可以通过调节此信号放大器旋钮来模拟燃气浓度变化进行功能调试。信号放大调节器，请参考下图红框框起来的旋钮。

<div align="center">
<img src=./../../../../图片/2_MQ2燃气传感器_信号放大调节旋钮.png  width=30%/>
</div>

<br>

## 课后作业

&emsp;&emsp;
本节课程使用ADC量测MQ2传感器的输出电压，请根据MQ2传感器的数据手册将获取到的电压值转换为燃气浓度。

<br>

> 关于HaaS600的详细信息请参考[HaaS600开发板介绍](../../../拓展知识/HaaS硬件积木库/HaaS600开发板/README.md)


<br>