> **学习物联网，来HaaSEDU就对了**

# OLED倒计时

&emsp;&emsp;
本节课程的主要目标是通过HaaS EDU K1设置一个倒计时的功能，然后通过OLED屏幕来展示整个倒计时的过程，HaaS EDU K1自带OLED屏，无需外接扩展屏。

<br>

## 硬件连线图
&emsp;&emsp;
本实验只需要一台HaaS EDU K1和一根USB转Type-C的数据线即可，无需外接其它传感器。

<br>

## 开发环境

&emsp;&emsp;
在进行下一步之前请确保HaaS EDU K1开发环境已经搭建完毕。详情请参考:
* [HaaS Studio开发环境](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)
<br>

## 创建解决方案

&emsp;&emsp;
如下图所示，打开VS Code之后在新建一个基于helloworld的python工程，设定好工程名称（“fq_time”）及工作区路径之后，硬件类型选择HaaS EDU K1，点击立即创建，创建一个Python轻应用的解决方案。
<div align="center">
<img src=./../../../图片/2_3_工程项目创建.jpg width=40%/>
</div>

&emsp;&emsp;
将[OLED倒计时](./代码/HaaSEDUK1/Python/)下的所有脚本的代码复制后覆盖HaaS-Studio工程根目录原本的文件。main.py脚本内容如下图所示：
<div align="center">
<img src=./../../../图片/2_3_fqtime工程代码.jpg width=80%/>
</div>

> Python脚本的详细说明请参考脚本内嵌的文字注释

<br>

## 推送脚本并运行

&emsp;&emsp;
在推送脚本的之前，把编辑器右下角的编码UTF-8修改为GBK，不然OLED中文屏幕会显示乱码。
<div align="center">
<img src=./../../../图片/2_3_编码修改1.jpg width=80%/>
</div>

&emsp;&emsp;
点击UTF-8,选中：Save with Encoding，然后搜索GBK后，选择"Simple Chinese(GBK)"，如下图所示。
<div align="center">
<img src=./../../../图片/2_3_编码修改2.jpg width=80%/>
</div>

&emsp;&emsp;
推送此脚本到HaaS EDU K1之后，HaaS EDU K1设备就会显示25分钟开始的倒计时，如下图所示：
<div align="center">
<img src=./../../../图片/2_3_oled倒计时案例图片.jpg width=60%/>
</div>

<br>

## 课后作业

暂无
<br>
<br>

> 关于HaaS EDU K1的详细信息请参考[HaaS EDU K1开发板介绍](../../../拓展知识/HaaS硬件积木库/HaaS-EDU-K1开发板/HaaS-EDU-K1.md)。

<br>