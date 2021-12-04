> **学习物联网，来HaaSEDU就对了**

# HaaS600 获取定位数据

&emsp;&emsp;
本节课程的主要目标是通过HaaS600获取定位数据。HaaS600提供了两种获取定位的方式：

- 一是其板载的 L76KB-A58 卫星定位模块，其支持多卫星系统（DeiDou，GPS，GLONASS，QZSS）联合定位和单系统独立定位；
- 二是 HaaS600 作为 4G CAT1 所特有的基站定位。
<br>

## 硬件连线图
&emsp;&emsp;
本实验需要准备的硬件有：
- HaaS600开发板及电源
- MicroUSB数据线
- 物联网流量卡
- LTE天线及卫星陶瓷天线

> 注意⚠️ 连接天线时，请注意对应开发板上的丝印，只有正确连接对应天线才能接收到信号。
> 
<div align="center">
<img src=./../../../图片/5_HaaS600_获取定位数据_硬件连接图.png width=40%/>
</div>

<br>

## 开发环境
&emsp;&emsp;
在进行下一步之前请确保HaaS600开发环境已经搭建完毕。详情请参考:
* [HaaS Studio开发环境](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)
<br>

## 创建解决方案

&emsp;&emsp;
如下图所示，打开HaaS Studio后，新建一个基于 helloworld 的 JavaScript轻应用。
<div align="center">
<img src=./../../../图片/5_3_HaaSStudio创建JS.png width=100%/>
</div>

&emsp;&emsp;
设定好工程名称及工作区路径之后，硬件类型选择HaaS600-EC600S，点击立即创建，创建一个JavaScript轻应用的解决方案。

<div align="center">
<img src=./../../../图片/5_3_创建JS工程.png width=60%/>
</div>

&emsp;&emsp;
将获取定位数据的全部文件（[app.js](./代码/HaaS600/app.js), [gps.js](./代码/HaaS600/gps.js), [app.json](./代码/HaaS600/app.json)）复制后覆盖刚刚创建的工程目录（your_project_path/solutions/your_project_name）下，替换原有的所有文件。如下图所示：
<div align="center">
<img src=./../../../图片/5_3_JS工程复制脚本.png width=100%/>
</div>

> JavaScript脚本的详细说明请参考脚本内嵌的文字注释

<br>

## 推送脚本并运行

&emsp;&emsp;
推送此脚本到HaaS600之后，等待定位模块完成定位。
**GNSS定位模块在定位时，需要花费一定时间去搜索可用的卫星，因此建议读者们将定位模块放置于户外或靠近窗户的地方。**
完成定位后，串口会周期性的打印出定位信息。

```log
{
    "lat": 31.188085,
    "lon": 121.60435366666667,
    "alt": 1.3
} 
```

<br>

## 课后作业

&emsp;&emsp;
调研并了解GNSS技术和GPS，北斗等卫星定位系统各自的特点

了解NMEA0183协议格式

<br>
