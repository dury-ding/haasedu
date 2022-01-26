> **学习物联网，来HaaSEDU就对了**

# HaaS EDU K1光照传感器检测

&emsp;&emsp;
本节课程的主要目标是通过HaaS EDU K1读取光照强度值，然后通过OLED屏幕来展示周围环境的光强度值。

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
如下图所示，打开VS Code之后在新建一个基于helloworld的python工程，设定好工程名称（“light_smart”）及工作区路径之后，硬件类型选择HaaS EDU K1，点击立即创建，创建一个Python轻应用的解决方案。
<div align="center">
<img src=./../../../图片/5_1_创建智慧路灯工程_HaaS_EDU_K1.png width=40%/>
</div>

&emsp;&emsp;
复制[光照传感器检测代码](./代码/HaaS_EDU_K1/Python)下的所有文件后覆盖HaaS-Studio工程根目录下原本的文件之后，main.py如下图所示：
<div align="center">
<img src=./../../../图片/5_1_光强度检测工程_HaaS_EDU_K1.png
 width=80%/>
</div>

> Python脚本的详细说明请参考脚本内嵌的文字注释

<br>

## 推送脚本并运行

&emsp;&emsp;
推送此脚本到HaaS EDU K1之后，在设备终端会打印光强度值，如下所示。其中“亮度:”后面的数值即为AP3216C测量到的光强度值，强度越高，数值越大。

```log
...
亮度:339
亮度:225
亮度:339
亮度:320
...
```

<br>

## 课后作业
&emsp;&emsp;
AP3216C还支持检测物体的接近程度，请尝试使用其接近程度的功能，想想看这个功能在实际生活中可以解决什么样的问题？
<details>
<summary>点我查看提示</summary>

&emsp;&emsp;
AP3216C硬件积木说明可以参考[HaaS官网链接](https://haas.iot.aliyun.com/solution/detail/hardware?versionId=800C6A2692E65BF000000002&dataId=800C6A2692E65BF0)

</details>


<br>
<br>

> 关于HaaS EDU K1的详细信息请参考[HaaS EDU K1开发板介绍](../../../拓展知识/HaaS硬件积木库/HaaS-EDU-K1开发板/README.md)。

<br>
