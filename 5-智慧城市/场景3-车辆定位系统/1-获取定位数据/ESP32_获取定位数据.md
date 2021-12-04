> **学习物联网，来HaaSEDU就对了**

# ESP32 获取定位数据

&emsp;&emsp;
本章节介绍如何使用ESP32获取定位数据，由于ESP32本身不搭载定位模组，因此我们选择了外接的GNSS定位模块 HT2828Z3G5L。其详细介绍可以参考[这篇文档](../../../拓展知识/HaaS硬件积木库/传感器硬件积木/GPS传感器.md)。

<br>

## 硬件连线图
&emsp;&emsp;
需要准备：

* ESP32开发板  1套
* 杜邦线若干
* GNSS定位模块 HT2828Z3G5L

其中，HT2828Z3G5L与ESP32的连接如下：

<table>
    <tr>
        <td colspan="2">定位模块</td> 
        <td colspan="2">ESP32</td>    
    </tr>
    <tr>
        <td>引脚名</td> 
        <td>引脚功能</td>
        <td>连接到引脚</td>
        <td>引脚序号</td>
    </tr>
    <tr>
        <td>VBAT/PPS</td> 
        <td>备用电池 / 时间标准脉冲输出</td>
        <td>NC（不连接）</td>
        <td>——</td>
    </tr>
    <tr>
        <td>VCC</td> 
        <td>模块供电，可选3.3V至5V</td>
        <td>3.3V</td>
        <td>2</td>
    </tr>
    <tr>
        <td>TX</td> 
        <td>串口发送端</td>
        <td>U2 RXD</td>
        <td>GPIO16</td>
    </tr>
    <tr>
        <td>RX</td> 
        <td>串口接收端</td>
        <td>U2 TXD</td>
        <td>GPIO17</td>
    </tr>
    <tr>
        <td>GND</td> 
        <td>接地</td>
        <td>GND</td>
        <td>30</td>
    </tr>
    <tr>
        <td>EN</td> 
        <td>模块使能，高电平/悬空使能模组工作，低电平模组关闭</td>
        <td>NC（不连接）</td>
        <td>——</td>
    </tr>
</table>

如下图实物图所示：
<div align="center">
<img src=./../../../图片/5_3_HaaSStudio实物图_esp32.jpg width=100%/>
</div>

<br>

## 开发环境
&emsp;&emsp;
在进行下一步之前请确保ESP32开发环境已经搭建完毕。详情请参考[HaaS Studio开发环境](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)的说明。
<br>

## 创建解决方案

&emsp;&emsp;
如下图所示，打开HaaS Studio后，新建一个基于 helloworld 的 Python轻应用。
<div align="center">
<img src=./../../../图片/5_3_HaaSStudio创建Python_esp32.jpg width=100%/>
</div>

&emsp;&emsp;
设定好工程名称及工作区路径之后，硬件类型选择ESP32，点击立即创建，创建一个Python轻应用的解决方案。

&emsp;&emsp;
将获取定位数据的全部[代码](./代码/ESP32/Python/)文件复制后，覆盖刚刚创建的gnss工程目录下。main.py代码区如下图所示：
<div align="center">
<img src=./../../../图片/5_3_Python工程复制脚本_esp32.jpg width=100%/>
</div>

> Python脚本的详细说明请参考脚本内嵌的文字注释

<br>

## 推送脚本并运行

&emsp;&emsp;
推送此脚本到ESP32之后，等待定位模块完成定位。
**GNSS定位模块在定位时，需要花费一定时间去搜索可用的卫星，因此建议读者们将定位模块放置于户外或靠近窗户的地方。**
完成定位后，串口会周期性的打印定位模块输出的原始语句以及解析出的定位信息。

```log
************* python task init*******
mount fs
 ==== python file check /data/pyamp/main.py ====
 ==== main.py update time = 691108116 ====
 ==== python execute from /data/pyamp/main.py ====
[0.0, 'W'] [0.0, 'N'] 0.0
bytearray(b'$GNGGA,,,,,,0,00,25.5,,,,,,*64\r\n$GNGLL,,,,,,V,M*79\r\n$GNGSA,A,1,,,,,,,,,,,,,25.5,25.5,25.5,1*01\r\n$GNG')
[0.0, 'W'] [0.0, 'N'] 0.0
[0.0, 'W'] [0.0, 'N'] 0.0
bytearray(b'SA,A,1,,,,,,,,,,,,,25.5,25.5,25.5,4*04\r\n$GPGSV,1,1,00,0*65\r\n$BDGSV,1,1,00,0*74\r\n$GNRMC,,V,,,,,,,,,,M')
[0.0, 'W'] [0.0, 'N'] 0.0
[0.0, 'W'] [0.0, 'N'] 0.0
bytearray(b',V*34\r\n$GNVTG,,,,,,,,,M*2D\r\n$GNZDA,,,,,,*56\r\n$GPTXT,01,01,01,ANTENNA OPEN*25\r\n\r\n$GNRMC,,V,,,,,,,,,,M')
[0.0, 'W'] [0.0, 'N'] 0.0
[0.0, 'W'] [0.0, 'N'] 0.0
bytearray(b',V*34\r\n$GNVTG,,,,,,,,,M*2D\r\n$GNZDA,,,,,,*56\r\n$GPTXT,01,01,01,ANTENNA OPEN*25\r\n$GNGGA,,,,,,0,00,25.5,')
[0.0, 'W'] [0.0, 'N'] 0.0
[0.0, 'W'] [0.0, 'N'] 0.0
```

<br>

## 课后作业

&emsp;&emsp;
调研并了解GNSS技术和GPS，北斗等卫星定位系统各自的特点

了解NMEA0183协议格式


<br>
