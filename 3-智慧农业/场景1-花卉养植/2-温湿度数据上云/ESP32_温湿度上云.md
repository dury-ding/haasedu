> **学习物联网，来HaaSEDU就对了**

# ESP32温湿度上云

## 硬件连线图

&emsp;&emsp;
本实验只需要如下硬件：
* ESP32一台
* SHT3X-DIS温湿度传感器一个
* 杜邦线若干
* Micro-USB数据线一条

&emsp;&emsp;
硬件连线图如下图所示：

<div align="center">
<img src=./../../图片/1_ESP32_SHT3X_DIS_节点图_.gif width=100%/>
</div>


<br>

## 开发环境

&emsp;&emsp;
在进行下一步之前请确保ESP32开发环境已经搭建完毕。详情请参考:
* [HaaS Studio开发环境](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)

<br>

## 代码编辑及讲解

&emsp;&emsp;
本节课程是在[花卉养植之温湿度检测](../1-温湿度检测/README.md)的基础上进行开发，设备端的工程无需再创建，只需要将[main.py](./代码/ESP32/Python/main.py)脚本的代码复制后覆盖humiture工程根目录下的main.py里边的内容后需要完成以下三处代码修改。
> Python脚本的详细说明请参考脚本内嵌的文字版注释

1. **修改路由器名称及密码**   
&emsp;&emsp;
修改humiture工程里main.py中wifiSsid和wifiPassword的值为读者实际要连接的路由器的名称及密码（请注意名称和密码都需要放在""符号中间）。

```
# Wi-Fi SSID和Password设置
wifiSsid = "请填写您的路由器名称"
wifiPassword = "请填写您的路由器密码"
```

&emsp;&emsp;
修改完成之后get_wifi_status函数中的wlan.connect(wifiSsid, wifiPassword)语句就会连接读者自己设定的路由器。

2. **修改设备端三元组**

&emsp;&emsp;
修改humiture工程里main.py中productKey、deviceName和deviceSecret的值为读者创建的物联网设备的三元组信息，如下图所示：
```
# 三元组信息
productKey = "产品密钥"
deviceName = "设备名称"
deviceSecret = "设备密钥"
```

3. **修改设备端上报温湿度信息所用标识符**

&emsp;&emsp;
humiture工程里main.py中下面的代码实现的是上传温湿度值到云端的功能。其中CurrentTemperature和CurrentHumidity便是温湿度值上报时所用的标识符。
```
# 上传温度信息和湿度信息到物联网平台
def upload_temperature_and_Humidity():
    global device

    while True:
        data = get_temp_humi()                      # 读取温度信息和湿度信息
        # 生成上报到物联网平台的属性值字串
        prop = ujson.dumps({
            'CurrentTemperature': data[0],
            'CurrentHumidity': data[1]
            })
        print('uploading data: ', prop)
        
        upload_data = {'params': prop}
        # 上传温度和湿度信息到物联网平台
        device.postProps(upload_data)
        utime.sleep(2)
```
&emsp;&emsp;
确保这两个标识符和物联网产品的物模型中属性标识符是一样的，如下图所示：
<div align="center">
<img src=./../../图片/1_ESP32_humiture_属性标识符修改.png
 width=40%/>
</div>

<br>

## 推送脚本到ESP32并运行

&emsp;&emsp;
请参考[HaaS-Studio Python工程](../../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio Python工程 - 推送脚本到设备”的详细说明。

&emsp;&emsp;
推送此脚本到ESP32之后，通过PC端串口调试工具可以看到ESP32打印如下日志。其中:
* “物联网平台连接成功” 代表成功连接到物联网平台
* "uploading data:"之后跟着的为设备端向云端发布的温湿度属性信息，其中CurrentTemperature后面的数值为温度值，单位：摄氏度；CurrentHumidity后面数值为相对湿度值。

```
 ==== python file check /data/pyamp/main.py ====
 ==== main.py update time = 691107276 ====
 ==== python execute from /data/pyamp/main.py ====
sht3x inited!
wifi_connected: False
wifi_connected: False
wifi_connected: False
wifi_connected: False
wifi_connected: False
wifi_connected: False
wifi_connected: False
wifi_connected: False
('192.168.0.116', '255.255.255.0', '192.168.0.1', '192.168.0.1')
sleep for 1 s
establish tcp connection with server(host='a158sBmxLet.iot-as-mqtt.cn-shanghai.aliyuncs.com', port=[443])
tcp_connect: can only connect from state CLOSED
success to establish tcp, fd=54
物联网平台连接成功
sleep for 2s
uploading data:  {"CurrentTemperature": 28.30015, "CurrentHumidity": 50.82117}     
uploading data:  {"CurrentTemperature": 28.30018, "CurrentHumidity": 50.82117}
...
```
<br>
