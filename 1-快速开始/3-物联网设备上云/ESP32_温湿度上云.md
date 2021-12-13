> **学习物联网，来HaaSEDU就对了**

# ESP32温湿度上云

## 硬件连线图
本实验只需要如下硬件：
* ESP32一台
* SHT3X-DIS温湿度传感器一个
* 杜邦线若干
* Micro-USB数据线一条

硬件连线图如下图所示：

<div align="center">
<img src=./../../图片/1_ESP32_SHT3X_DIS_节点图.png width=100%/>
</div>

<br>

## 开发环境
在进行下一步之前请确保ESP32开发环境已经搭建完毕。详情请参考：
1. [HaaS Studio开发环境](./../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)
2. [ESP32固件烧录](./../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/ESP32_固件烧录.md)

## 创建解决方案

&emsp;&emsp;
点击下图中的"快速开始"按键(<img src=./../../图片/1_HaaS_Studio_创建工程按钮.png width=8%/>)会弹出HaaS Studio的欢迎页面，请点击“创建项目”按钮。

&emsp;&emsp;
在随后弹框中，设定好项目名称（“humiture”）及工作区路径之后，硬件类型选择ESP32，点击“立即创建”，创建一个Python轻应用的解决方案。

<div align="center">
<img src=./../../图片/1_创建Humiture工程_ESP32.png width=40%/>
</div>

&emsp;&emsp;
将[温湿度数据上云](./代码/ESP32/Python/)目录中的所有文件复制后覆盖humiture工程目录下的原有文件。其中main.py脚本的内容如下图所示：
<div align="center">
<img src=./../../图片/1_温湿度读上云工程_ESP32.png width=80%/>
</div>

> Python脚本的详细说明请参考脚本内嵌的文字注释

<br>

## 代码编辑
&emsp;&emsp;
完成下面3个步骤就完成了设备端的开发。

1. **修改路由器名称及密码**   
&emsp;&emsp;
修改humiture工程里main.py中wifiSsid和wifiPassword的值为读者实际要连接的路由器的名称及密码（请注意名称和密码都需要放在""符号中间）。

```python
# Wi-Fi SSID和Password设置
wifiSsid = "请填写您的路由器名称"
wifiPassword = "请填写您的路由器密码"
```

&emsp;&emsp;
修改完成之后get_wifi_status函数中的wlan.connect(wifiSsid, wifiPassword)语句就会连接读者自己设定的路由器。

2. **修改设备端三元组**

&emsp;&emsp;
修改humiture工程里main.py中productKey、deviceName和deviceSecret的值为读者创建的物联网设备的三元组信息，如下图所示：
```python
# 三元组信息
productKey = "产品密钥"
deviceName = "设备名称"
deviceSecret = "设备密钥"
```

3. **修改设备端上报温湿度信息所用标识符**

&emsp;&emsp;
humiture工程里main.py中下面的代码实现的是上传温湿度值到云端的功能。其中CurrentTemperature和CurrentHumidity便是温湿度值上报时所用的标识符。
```python
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

## 推送脚本到ESP32并运行

&emsp;&emsp;
请参考[HaaS Studio Python工程开发指南](../1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_Python工程开发指南.md)中“推送脚本到设备”的详细说明，选择串口本地更新的方式进行推送。

&emsp;&emsp;
推送此脚本到ESP32之后，串口会周期性的打印如下日志：
```log
 ==== python file check /data/pyamp/main.py ====
 ==== main.py update time = 691100968 ====
 ==== python execute from /data/pyamp/main.py ====
sht3x inited!
wifi_connected: False
wifi_connected: False
wifi_connected: False
wifi_connected: False
wifi_connected: False
('172.20.10.2', '255.255.255.240', '172.20.10.1', '172.20.10.1')
sleep for 1 s
establish tcp connection with server(host='a158sBmxLet.iot-as-mqtt.cn-shanghai.aliyuncs.com', port=[443])
tcp_connect: can only connect from state CLOSED
success to establish tcp, fd=54
物联网平台连接成功
sleep for 2s
uploading data:  {"CurrentTemperature": 25.14527, "CurrentHumidity": 31.44579}
uploading data:  {"CurrentTemperature": 25.13192, "CurrentHumidity": 31.40459}
...

```

&emsp;&emsp;
其中"CurrentTemperature"后面是温湿度传感器实际测量到的温度值，"CurrentHumidity"是温湿度传感器实际测量到的湿度值。