> **学习物联网，来HaaSEDU就对了**

# ESP32 火焰检测数据上云

## 硬件连线图

&emsp;&emsp;
同上一节课程。

<br>

## 代码编辑及讲解

&emsp;&emsp;
本节课程是在[火焰亮度检测及报警灯控制](./../1-火焰亮度检测及报警灯控制/ESP32_火焰亮度测量.md)的基础上进行开发，设备端的工程无需再创建，只需要将[main.py](./代码/ESP32/Python/main.py)脚本的代码复制后覆盖fire_detector工程根目录下的main.py里边的内容后需要完成以下三处代码修改。
> Python脚本的详细说明请参考脚本内嵌的文字版注释

1. **修改路由器名称及密码**   

&emsp;&emsp;
修改fire_detector工程里main.py中wifiSsid和wifiPassword的值为读者实际要连接的路由器的名称及密码（请注意名称和密码都需要放在""符号中间）。

```python
# Wi-Fi SSID和Password设置
wifiSsid = "请填写您的路由器名称"
wifiPassword = "请填写您的路由器密码"
```

&emsp;&emsp;
修改完成之后get_wifi_status函数中的wlan.connect(wifiSsid, wifiPassword) 语句就会连接读者自己设定的路由器。

2. **修改设备端三元组**

&emsp;&emsp;
修改fire_detector工程里main.py中productKey、deviceName和deviceSecret的值为读者创建的物联网设备的三元组信息，如下图所示：

<div align="center">
<img src=./../../../图片/4_火焰监控系统_修改设备端三元组信息_esp32.jpg width=40%/>
</div>

3. **修改设备端上报数据所用标识符**

&emsp;&emsp;
fire_detector工程里main.py中下面的代码实现的是上传火焰检测结果和报警灯状态到云端的功能。其中fireVoltage便是火焰检测结果上报云端所用的标识符。
```python
# 无限循环
while True:
    # 获取电压值
    fireVoltage = fireDev.getVoltage()   
    print("The fire status Voltage ",fireVoltage)

    # 生成上报到物联网平台的属性值字串，此处的属性标识符"fireVoltage"和"alarmState"必须和物联网平台的属性一致
    # "fireVoltage" - 代表火焰传感器测量到的电压值
    # "alarmState" - 代表报警灯的当前状态
    upload_data = {'params': ujson.dumps({
        'fireVoltage': fireVoltage,
        'alarmState': alarm_on
    })
    }
    # 上传火焰传感器测量结果和报警灯状态到物联网平台
    device.postProps(upload_data)

    # 每2秒钟上报一次
    utime.sleep(2)
```
<br>

## 推送脚本到ESP32设备上并运行

&emsp;&emsp;
请参考[HaaS-Studio Python工程](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio Python工程 - 推送脚本到设备”的详细说明。

&emsp;&emsp;
Python脚本推送到ESP32之后 ，会自动运行，运行过程中日志如下。其中：

```python
mount fs
 ==== python file check /data/pyamp/main.py ====
 ==== main.py update time = 691102560 ====
 ==== python execute from /data/pyamp/main.py ====
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
The fire status Voltage  1100
The fire status Voltage  1100
The fire status Voltage  1100
The fire status Voltage  1100
The fire status Voltage  1100
The fire status Voltage  1100
The fire status Voltage  1100
The fire status Voltage  1100
The fire status Voltage  1100
The fire status Voltage  1100
```

<br>

# 系统调试
&emsp;&emsp;
打火机打着🔥后，远离和靠近火焰传感器的二极管，查看设备端日志的量测值是否有变化。
>>> 请务必注意安全！！！

<br>

## 课后作业
&emsp;&emsp;
暂无

<br>

> 关于ESP32的详细信息请参考[ESP32开发板介绍](./../../../拓展知识/HaaS硬件积木库/ESP32开发板/README.md)。

<br>