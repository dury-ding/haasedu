> **学习物联网，来HaaSEDU就对了**

# HaaS EDU K1 起夜灯数据上云

## 硬件连线图

&emsp;&emsp;
同上一节课程。

<br>

## 代码编辑及讲解

&emsp;&emsp;
本节课程是在[人体检测及LED控制](../1-人体检测及LED控制/README.md)的基础上进行开发，设备端的工程无需再创建，只需要将[本节课程代码目录](./代码/HaaS_EDU_K1/Python)脚本的代码复制后覆盖human_detector工程根目录下覆盖原本文件内容后，完成如下以下三处代码修改。
> Python脚本的详细说明请参考脚本内嵌的文字版注释

1. **修改路由器名称及密码**
&emsp;&emsp;
修改human_detector工程里main.py中wifiSsid和wifiPassword的值为读者实际要连接的路由器的名称及密码（请注意名称和密码都需要放在""符号中间）。

```
# Wi-Fi SSID和Password设置
wifiSsid = "请填写您的路由器名称"
wifiPassword = "请填写您的路由器密码"
```

&emsp;&emsp;
修改完成之后get_wifi_status函数中的nm.connect(wifiSsid, wifiPassword) 语句就会连接读者自己设定的路由器。

2. **修改设备端三元组**

&emsp;&emsp;
修改human_detector工程里main.py中productKey、deviceName和deviceSecret的值为读者创建的物联网设备的三元组信息。

```python
# 三元组信息
productKey = "产品密钥"
deviceName = "设备名称"
deviceSecret = "设备密钥"
```

3. **修改设备端上报数据所用标识符**

&emsp;&emsp;
human_detector工程里main.py中下面的代码实现的是上传燃气检测结果和报警灯状态到云端的功能。其中LEDSwitch便是起夜灯状态上报云端所用的标识符。
```python
def human_detector() :
    global gpioirDev,gpioledDev,irDev

    last_have_human = 0                 # 记录初始值
    while True :
        have_human = irDev.irDetect()   # 获取传感器的值
        if (have_human == 1) :
            print("human is here ...\r\n")
        if (last_have_human != have_human) :
            led_control(have_human)         # 控制LED亮灭

            # 生成上报到物联网平台的属性值字串，此处的属性标识符"LEDSwith"必须和物联网平台的属性一致
            # "LEDSwitch" - 表示起夜灯的状态
            upload_data = {'params': ujson.dumps({
                'LEDSwitch': have_human,
            })
            }
            # 上传LED状态到物联网平台
            device.postProps(upload_data)

        last_have_human = have_human    # 记录当前状态
        utime.sleep(1)                  # 休眠1秒

    gpioirDev.close()
    gpioledDev.close()
```

&emsp;&emsp;
确保这起夜灯的标识符和物联网产品的物模型中属性标识符是一样的.

<br>

## 推送脚本到HaaS EDU K1并运行

&emsp;&emsp;
请参考[HaaS-Studio Python工程](../../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio Python工程 - 推送脚本到设备”的详细说明。

&emsp;&emsp;
推送此脚本到HaaS EDU K1之后，串口会周期性的打印如下日志。其中:
* “物联网平台连接成功” 代表成功连接到物联网平台
* 人体感应传感器检测到有人体活动的时候变会打印“human is here”，同时HaaS EDU K1上面的红色LED会亮起。
* 人体感应传感器`没检测`到人体活动的时候变会停止打印“human is here”，Haas EDU K1的红色LED灯也会随之熄灭。

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
human is here ...

human is here ...

human is here ...
...
```


<br>
