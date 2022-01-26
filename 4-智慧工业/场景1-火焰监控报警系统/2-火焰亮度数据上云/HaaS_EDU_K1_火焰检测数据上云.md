> **学习物联网，来HaaSEDU就对了**

# HaaS EDU K1 燃气检测数据上云

## 硬件连线图

&emsp;&emsp;
同上一节课程。

<br>

## 代码编辑及讲解

&emsp;&emsp;
本节课程是在[火焰亮度检测及报警灯控制](../1-火焰亮度检测及报警灯控制/README.md)的基础上进行开发，设备端的工程无需再创建，只需要将[本节脚本目录](./代码/HaaS_EDU_K1/Python/)下所有的脚本复制后覆盖fire_detector工程根目录下的原本文件后，完成以下三处代码修改。
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
修改完成之后get_wifi_status函数中的nm.connect(wifiSsid, wifiPassword) 语句就会连接读者自己设定的路由器。

2. **修改设备端三元组**

&emsp;&emsp;
修改humiture工程里main.py中productKey、deviceName和deviceSecret的值为读者创建的物联网设备的三元组信息。

```python
# 三元组信息
productKey = "产品密钥"
deviceName = "设备名称"
deviceSecret = "设备密钥"
```

3. **修改设备端上报数据所用标识符**

&emsp;&emsp;
fire_detector工程里main.py中下面的代码实现的是上传燃气检测结果和报警灯状态到云端的功能。其中gasVoltate便是燃气检测结果上报云端所用的标识符。

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

&emsp;&emsp;
确保这两个标识符和物联网产品的物模型中属性标识符是一样的，如下图所示：
<div align="center">
<img src=./../../../图片/4_HaaS_EDU_K1_属性标识符修改.png
 width=70%/>
</div>

<br>

## 推送脚本到HaaS EDU K1并运行

&emsp;&emsp;
请参考[HaaS-Studio Python工程](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio Python工程 - 推送脚本到设备”的详细说明。

&emsp;&emsp;
Python脚本推送到HaaS EDU K1之后 ，会自动运行，运行过程中日志如下。其中：
* “物联网平台连接成功” 代表成功连接到物联网平台
* "uploading data to the cloud"之后跟着的为设备端向云端发布的火焰传感器的检测结果，alarmState代表报警灯的状态，fireVoltage代表火焰检测的电压值
* 火焰传感器没有检测到明火的时候，fireVoltage比较大，云端会下发开始报警的消息，脚本会打印“开始报警”，HaaS EDU K1的LED灯也会亮起
* 火焰传感器检测到明火的时候，fireVoltage比较小，云端会下发结束报警的消息，脚本会打印“结束报警”，HaaS EDU K1的LED灯也会熄灭

```python
...
Wi-Fi connected
...
DeviceIP:172.20.10.10
...
success to establish tcp, fd=54
物联网平台连接成功

uploading data to the cloud,  {"alarmState": 1, "fireVoltage": 1946}
开始报警
uploading data to the cloud,  {"alarmState": 1, "fireVoltage": 180}
结束报警
uploading data to the cloud,  {"alarmState": 0, "fireVoltage": 174}

```


<br>
