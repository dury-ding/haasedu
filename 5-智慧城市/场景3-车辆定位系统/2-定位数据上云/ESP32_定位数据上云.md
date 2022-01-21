> **学习物联网，来HaaSEDU就对了**

# ESP32 定位数据上云
本节课程是在[ESP32 获取定位数据](../1-获取定位数据/ESP32_获取定位数据.md)的基础上进行开发。

## 硬件连线图

&emsp;&emsp;
请参考[ESP32获取定位数据](../1-获取定位数据/ESP32_获取定位数据.md)

<br>

## 开发环境

&emsp;&emsp;
在进行下一步之前请确保ESP32开发环境已经搭建完毕。详情请参考[HaaS Studio开发环境](./../1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)的说明
<br>

## 代码编辑及讲解

&emsp;&emsp;
将定位数据上云的文件[main.py](./代码/ESP32/Python/main.py)复制后，覆盖上节课程中创建的gnss工程目录，替换原有的main.py。如下图所示：
<div align="center">
<img src=./../../../图片/5_3_Python工程复制脚本_esp32.jpg width=100%/>
</div>

> Python脚本的详细说明请参考脚本内嵌的文字版注释
> 
&emsp;&emsp;
之后，在代码中填入对应的信息

1. **填写Wi-Fi名称及密码**   
&emsp;&emsp;
在[main.py](./代码/ESP32/Python/main.py)中，填写可用的Wi-Fi名称及密码。

``` python
# wifi连接的的ssid和pwd定义
wifiSsid = "请填写您的路由器名称"
wifiPassword = "请填写您的路由器密码"
```

2. **修改设备端三元组**

&emsp;&emsp;
在[main.py](./代码/HaaS_EDU_K1/main.py)中，填写创建的设备三元组信息。关于设备三元组的获取，请参考[获取设备三元组](./README.md "获取设备三元组")中的步骤。

``` python
# 三元组信息
productKey     = "产品key"
deviceName     = "设备名称"
deviceSecret   = "设备密钥"
```

<br>

## 推送脚本到ESP32并运行

> 推送工程到ESP32的详细操作步骤请参考[HaaS-Studio Python工程 - 本地更新](../../1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)。

&emsp;&emsp;
推送此脚本到ESP32之后，串口会输出获取到的定位信息，同时按照脚本中的逻辑，当定位信息发生变化时，会将更新的定位信息上报至物联网平台。如下面这段串口日志所示。

&emsp;&emsp;
出现此段日志时，说明定位信息上报成功，读者此时可以前往物联网平台查看设备的实时定位数据，具体的操作请参考[在物联网平台上查看设备数据](./README.md "在物联网平台上查看设备数据")

```log
...

************* python task init*******
mount fs
>>> execfile("/data/pyamp/main.py")
wifi_connected: False
wifi_connected: False
wifi_connected: False
wifi_connected: False
wifi_connected: False
wifi_connected: False
wifi_connected: False
wifi_connected: False
wifi_connected: False
wifi_connected: False
wifi_connected: False
wifi_connected: False
('192.168.0.105', '255.255.255.0', '192.168.0.1', '192.168.0.1')
sleep for 1 s
...
tcp_connect: can only connect from state CLOSED
success to establish tcp, fd=54
物联网平台连接成功
sleep for 2s
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
...
```

