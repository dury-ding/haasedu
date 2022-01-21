> **学习物联网，来HaaSEDU就对了**

# HaaS EDU K1 燃气检测数据上云

## 硬件连线图

&emsp;&emsp;
同上一节课程。

<br>

## 代码编辑及讲解

&emsp;&emsp;
本节课程是在[燃气检测及LED控制](../1-燃气检测及LED控制/README.md)的基础上进行开发，设备端的工程无需再创建，只需要将[本节代码目录](./代码/HaaS_EDU_K1/Python/)脚本的代码复制后覆盖gas_detector工程根目录下原本的文件需要完成以下三处代码修改。
> Python脚本的详细说明请参考脚本内嵌的文字版注释

1. **修改路由器名称及密码**   
&emsp;&emsp;
修改gas_detector工程里main.py中wifiSsid和wifiPassword的值为读者实际要连接的路由器的名称及密码（请注意名称和密码都需要放在""符号中间）。

```
# Wi-Fi SSID和Password设置
wifiSsid = "请填写您的路由器名称"
wifiPassword = "请填写您的路由器密码"
```

&emsp;&emsp;
修改完成之后get_wifi_status函数中的nm.connect(wifiSsid, wifiPassword) 语句就会连接读者自己设定的路由器。

2. **修改设备端三元组**

修改本工程里main.py中productKey、deviceName和deviceSecret的值为读者创建的物联网设备的三元组信息。

```python
# 三元组信息
productKey = "产品密钥"
deviceName = "设备名称"
deviceSecret = "设备密钥"
```

3. **修改设备端上报数据所用标识符**

&emsp;&emsp;
gas_detector工程里main.py中下面的代码实现的是上传燃气检测结果和报警灯状态到云端的功能。其中gasVoltate便是燃气检测结果上报云端所用的标识符。

```python
# 上传燃气传感器测量结果和报警灯状态到物联网平台
def upload_gas_detector_state():
    global device, alarmOn, mq2Dev

    gasVoltage = 0

    # 无限循环
    while True:
        gasVoltage = mq2Dev.getVoltage()   # 呼叫mq2传感器库提供的getVoltage函数获取电压值，单位：mV

        data = ujson.dumps({
            'gasVoltage': gasVoltage,
            'alarmLight': alarmOn
        })
        # 生成上报到物联网平台的属性值字串，此处的属性标识符"gasVoltage"和"alarmLight"必须和物联网平台的属性一致
        # "gasVoltage" - 代表燃气传感器测量到的电压值
        # "alarmLight" - 代表报警灯的当前状态
        print('reporting data to cloud:', data)
        uploadData = {'params': data}

        # 上传燃气传感器测量结果和报警灯状态到物联网平台
        device.postProps(uploadData)

        # 每2秒钟上报一次
        utime.sleep(2)

```

&emsp;&emsp;
确保这两个标识符和物联网产品的物模型中属性标识符是一样的，如下图所示：
<div align="center">
<img src=./../../../../图片/1_ESP32_gasVoltage_属性标识符.png
 width=60%/>
</div>

<br>

## 推送脚本到HaaS EDU K1并运行

&emsp;&emsp;
请参考[HaaS-Studio Python工程](../../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio Python工程 - 推送脚本到设备”的详细说明。

&emsp;&emsp;
推送此脚本到HaaS EDU K1之后，通过PC端串口调试工具可以看到HaaS EDU K1打印如下日志。其中:
* “物联网平台连接成功” 代表成功连接到物联网平台
* "reporting data to cloud: {"gasVoltage": 381, "alarmLight": 0}
{'alarmLight': 0}"之后跟着的为设备端向云端发布的燃气检测结果信息，gasVoltage后的值为燃气传感器检测的电压值，单位：mV
* "{"alarmLight":x}"则是收到云端回复的控制报警灯亮灭的控制指令，1代表打开报警灯，此时接在HaaS EDU K1的红色LED应该亮起；0代表关闭报警灯，此时接在HaaS EDU K1的红色LED应该熄灭。(注意：这条log的行为是云端下发控制指令触发，只有在完成“物联网应用及报警逻辑”小节之后才会打印)

```log
...
             Welcome to AliOS Things           
amp shakehand begin...
dev /dev/wifi0 is already add
 ==== python execute from /data/pyamp/main.py ====
 Welcome to MicroPython 
...
Wi-Fi connected
DeviceIP:192.168.0.107
sleep for 1 s
...
success to establish tcp, fd=4
物联网平台连接成功
reporting data to cloud: {"gasVoltage": 381, "alarmLight": 0}
{"alarmLight":0}
结束报警
reporting data to cloud: {"gasVoltage": 382, "alarmLight": 0}
{"alarmLight":0}
结束报警
reporting data to cloud: {"gasVoltage": 1200, "alarmLight": 1}
{"alarmLight":1}
开始报警
...
```

<br>
