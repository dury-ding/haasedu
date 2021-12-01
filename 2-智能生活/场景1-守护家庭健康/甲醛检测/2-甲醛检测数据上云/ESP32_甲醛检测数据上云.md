> **学习物联网，来HaaSEDU就对了**

# ESP32 甲醛检测数据上云

本课程默认以ADC方式获取甲醛浓度值。背景以及准备信息见上一节课程。
## 硬件连线图
&emsp;&emsp;
硬件连线图如下图所示：
<div align="center">
<img src=./../../../../图片/2_甲醛检测_ESP32_连线.jpg width=100%/>
</div>
<br>

## 代码编辑及讲解

&emsp;&emsp;
本节课程是在[甲醛检测](../1-甲醛检测/README.md)的基础上进行开发，设备端的工程无需再创建，只需要将[main.py](./代码/HaaS_EDU_K1/Python/main.py)脚本的代码复制后覆盖hcho_detector工程根目录下的main.py里边的内容后需要完成以下三处代码修改。
> Python脚本的详细说明请参考脚本内嵌的文字版注释

1. **修改路由器名称及密码**
&emsp;&emsp;

修改hcho_detector工程里main.py中wifiSsid和wifiPassword的值为读者实际要连接的路由器的名称及密码（请注意名称和密码都需要放在""符号中间）。

```
# Wi-Fi SSID和Password设置
wifiSsid = "请填写您的路由器名称"
wifiPassword = "请填写您的路由器密码"
```

&emsp;&emsp;
修改完成之后get_wifi_status函数中的nm.connect(wifiSsid, wifiPassword) 语句就会连接读者自己设定的路由器。

2. **修改设备端三元组**

&emsp;&emsp;
修改本工程里main.py中productKey、deviceName和deviceSecret的值为读者创建的物联网设备的三元组信息，如下图所示：

<div align="center">
<img src=./../../../../图片/1_修改设备端三元组信息_马赛克_esp32.jpg
 width=80%/>
</div>

3. **修改设备端上报数据所用标识符**

&emsp;&emsp;
hcho_detector工程里main.py中下面的代码实现的是上传甲醛检测结果到云端的功能。其中HCHO便是甲醛检测结果上报云端所用的标识符。

```
    data = get_hcho_value()
    H_str = "Hcho : " + str(round(data,2))+'ppm'
    print('Hcho :' + str(round(data,2)) +'ppm')

    # "HCHO" - 代表甲醛传感器测量到的浓度值
    upload_data = {'params': ujson.dumps({
        'HCHO': round(data,2),
    })
    }
    # 上传甲醛浓度信息到物联网平台
    device.postProps(upload_data)

    # 每2秒钟上报一次
    utime.sleep(2)
```

确保这个标识符和物联网产品的物模型中属性标识符是一样的，如下图所示：
<div align="center">
<img src=./../../../../图片/2_甲醛检测_属性标识符修改.png
 width=100%/>
</div>

<br>

## 推送脚本到HaaS EDU K1并运行

&emsp;&emsp;
请参考[HaaS-Studio Python工程](../../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio Python工程 - 推送脚本到设备”的详细说明。

&emsp;&emsp;
推送此脚本到HaaS EDU K1之后，串口会周期性的打印如下日志：

```
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
('192.168.0.105', '255.255.255.0', '192.168.0.1', '192.168.0.1')
sleep for 1 s
establish tcp connection with server(host='a1jq4P8WEYO.iot-as-mqtt.cn-shanghai.aliyuncs.com', port=[443])
tcp_connect: can only connect from state CLOSED
success to establish tcp, fd=54
物联网平台连接成功
sleep for 2s
Hcho :0.01ppm
Hcho :0.01ppm
Hcho :0.01ppm
Hcho :0.01ppm
Hcho :0.01ppm
Hcho :0.01ppm
```
<br>
