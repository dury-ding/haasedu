> **学习物联网，来HaaSEDU就对了**

# HaaS EDU K1温湿度上云

## 硬件连线图

&emsp;&emsp;
本实验只需要一台HaaS EDU K1即可，无需外接其它设备。
需要连接两颗LED模拟控制空调和加湿器的开关的功能此处就借助于HaaS EDU K1上面的蓝色和绿色LED灯，其中：
* 蓝色LED模拟空调的开关
* 绿色LED模拟加湿器的开关

&emsp;&emsp;
根据HaaS EDU K1的硬件说明，可以得知HaaS EDU K1板载了三个可编程LED，分别是L1，L2，L3，分别为红、绿、蓝三个单色灯。三个LED和GPIO的对应关系如下。所以如果要模拟控制空调打开，则需要打开GPIO_P4_2（L3蓝色LED）；如需模拟控制加湿器打开，则需要打开GPIO_P4_3（L2绿色LED）；

<div align="center">
<img src=./../../../图片/3_HaaS_EDU_K1_LED_GPIO对应关系.png
 width=40%/>
</div>

<br>

## 代码编辑及讲解

&emsp;&emsp;
本节课程是在[花卉养植之温湿度数据上云](../2-温湿度数据上云/README.md)的基础上进行开发，设备端的工程无需再创建，只需要将[main.py](./代码/HaaS_EDU_K1/Python/main.py)脚本的代码复制后覆盖humiture工程根目录下的main.py里边的内容然后经过三个步骤即可完成设备端功能的开发。

1. **修改路由器名称及密码**   
&emsp;&emsp;
修改humiture工程里main.py中wifiSsid和wifiPassword的值为读者实际要连接的路由器的名称及密码（请注意名称和密码都需要放在""符号中间）。

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

3. **修改设备端上报温湿度信息所用标识符**

&emsp;&emsp;
humiture工程里main.py中下面的代码实现的是上传温湿度值到云端的功能。其中CurrentTemperature和CurrentHumidity便是温湿度值上报时所用的标识符。
```python
    # 生成上报到物联网平台的属性值字串，此处的
    upload_data = {'params': {
        'CurrentTemperature': data[0],
        'CurrentHumidity': data[1]
    }
    }
    # 上传温度和湿度信息到物联网平台
    device.postProps(upload_data)
    time.sleep(2)
```

&emsp;&emsp;
确保这两个标识符和物联网产品的物模型中属性标识符是一样的，如下图所示：
<div align="center">
<img src=./../../../图片/1_humiture_属性标识符修改.png
 width=100%/>
</div>

&emsp;&emsp;
下面是本节添加的重点代码段落讲解：
* 新增两个变量用来控制空调和加湿器对应的GPIO
```
# 空调和加湿器状态变量
airconditioner = 0
humidifier = 0
```

* 新增函数处理云端信息并控制GPIO的接口
```
# 设置props 事件接收函数（当云平台向设备下发属性时）
def on_props(request):
    global airconditioner, humidifier

    print(request)
    # {"airconditioner":1} or {"humidifier":1} or {"airconditioner":1, "humidifier":1}
    payload = ujson.loads(request)

    # 获取dict状态字段 注意要验证键存在 否则会抛出异常
    if "airconditioner" in payload.keys():
        airconditioner_value = payload["airconditioner"]
        if (airconditioner_value):
            print("打开空调")
        else:
            print("关闭空调")

    if "humidifier" in payload.keys():
        humidifier_value = payload["humidifier"]
        if (humidifier_value):
            print("打开加湿器")
        else:
            print("关闭加湿器")

    print(airconditioner, humidifier)

    airconditioner.write(airconditioner_value) # 控制空调开关
    humidifier.write(humidifier_value)         # 控制加湿器开关

    # 要将更改后的状态同步上报到云平台
    upload_data = {'params': {
        'airconditioner': airconditioner_value,
        'humidifier': humidifier_value,
    }
    }
    # 上报空调和加湿器属性到云端
    device.postProps(upload_data)
```

* 注册接收到云端控制消息的回调函数

```
# 连接物联网平台
def connect_lk(productKey, deviceName, deviceSecret):
...
    # 配置收到云端属性控制指令的回调函数
    device.on('props', on_props)
```

<br>

## 推送脚本到HaaS EDU K1并运行

&emsp;&emsp;
请参考[HaaS-Studio Python工程](../../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio Python工程 - 推送脚本到设备”的详细说明。

&emsp;&emsp;
推送此脚本到HaaS EDU K1之后，串口会周期性的打印如下日志。其中：
* “物联网平台连接成功” 代表成功连接到物联网平台
* "uploading data:"之后跟着的为设备端向云端发布的温湿度属性信息，其中CurrentTemperature后面的数值为温度值，单位：摄氏度；CurrentHumidity后面数值为相对湿度值。

* 设备端解析到云端送下来的控制指令中包含“{"humidifier":1}”之后会打印"打开加湿器"并点亮绿色LED模拟打开控制加湿器的继电器的动作
* 设备端解析到云端送下来的控制指令包含"{"airconditioner":1}"之后会打印"打开空调"并点亮蓝色LED模拟打开控制空调的继电器的动作

```
...
Wi-Fi connected
...
DeviceIP:172.20.10.10
...
success to establish tcp, fd=54
物联网平台连接成功
物联网平台连接成功
sleep for 2s
uploading data:  {"CurrentTemperature": 28.30015, "CurrentHumidity": 50.82117}
打开空调
打开加湿器


```

