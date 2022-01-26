> **学习物联网，来HaaSEDU就对了**

# ESP32 光强度数据上云

## 硬件连线图

&emsp;&emsp;
参考第一节光照传感器检测。

<br>

## 开发环境

&emsp;&emsp;
在进行下一步之前请确保ESP32开发环境已经搭建完毕。详情请参考[ESP32快速开始](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)的说明。

<br>

## 代码讲解
### 云端创建产品
> 在创建云端产品前，请确保您已经开通“物联网平台公共实例”功能，开通方法请参考[物联网设备上云](./../../../1-快速开始/3-物联网设备上云/README.md)中“开通公共实例”小节的描述。

<br>

&emsp;&emsp;
请先登陆[物联网平台](https://www.aliyun.com/product/iot/iot_instc_public_cn?spm=5176.19720258.J_8058803260.75.c9a82c4a1twOdW),然后按下面步骤一步步操作。

1. **创建项目入口**

&emsp;&emsp;
注册登入后，如下图所示，前往管理控制台。
<div align="center">
<img src=./../../../图片/2_3_物联网平台登陆.jpg
 width=40%/>
</div>

&emsp;&emsp;
点击公共实例，就可以开始创建产品啦。
<div align="center">
<img src=./../../../图片/2_3_公共实例.jpg
 width=40%/>
</div>

2. **创建产品**

&emsp;&emsp;
点击创建产品，见下图所示，
<div align="center">
<img src=./../../../图片/2_3_创建产品.jpg
 width=40%/>
</div>

&emsp;&emsp;
这里创建了一个名称为“智慧路灯”的产品，
<div align="center">
<img src=./../../../图片/5_1_新建智慧路灯产品.jpg
 width=40%/>
</div>

&emsp;&emsp;
点击确认，就可以在产品列表中出现智慧路灯，
<div align="center">
<img src=./../../../图片/5_1_完成产品创建.jpg
 width=40%/>
</div>

&emsp;&emsp;
查看产品详情，
<div align="center">
<img src=./../../../图片/5_1_产品功能定义.jpg
 width=40%/>
</div>

&emsp;&emsp;
编辑草稿，选择自定义功能，
<div align="center">
<img src=./../../../图片/5_1_自定义产品物模型定义.jpg
 width=40%/>
</div>

&emsp;&emsp;
如下图设置对应产品的物模型，设置光强度电压值的物模型，
<div align="center">
<img src=./../../../图片/5_1_2产品物模型.jpg
 width=40%/>
</div>

&emsp;&emsp;
在产品详情中增加产品的功能，可以看到刚才设置的光强度电压值物模型属性，点击发布上线。
<div align="center">
<img src=./../../../图片/5_1_2完成物模型设置.jpg
 width=40%/>
</div>

&emsp;&emsp;
这样，整个智慧路灯产品在物联网平台就创建好了。

1. **设备管理**

&emsp;&emsp;
选中最左边栏设备管理中的设备，然后添加设备，
<div align="center">
<img src=./../../../图片/2_3_添加设备.jpg
 width=40%/>
</div>

&emsp;&emsp;
选择的产品为刚刚创建的智慧路灯，设备名设置为smartlight,点击确认，
<div align="center">
<img src=./../../../图片/5_1_智慧路灯设备.jpg
 width=40%/>
</div>

&emsp;&emsp;
进入设备详情，获取设备三元组信息，
<div align="center">
<img src=./../../../图片/5_1_设备三元组信息.jpg
 width=40%/>
</div>

&emsp;&emsp;
将设备三元组信息一键拷贝出来，在设备开发中会用到。
<div align="center">
<img src=./../../../图片/2_3_设备证书.jpg
 width=40%/>
</div>

### 设备端代码

&emsp;&emsp;
本节课程是在[光照传感器检测](../1-光照传感器检测/ESP32_光照传感器检测.md)的基础上进行开发，设备端的工程无需再创建，只需要将[main.py](./代码/ESP32/Python/main.py)脚本的代码复制后覆盖light_smart工程根目录下的main.py里边的内容后需要完成以下三处代码修改。

1. **修改路由器名称及密码**   

&emsp;&emsp;
修改light_smart工程里main.py中wifiSsid和wifiPassword的值为读者实际要连接的路由器的名称及密码（请注意名称和密码都需要放在""符号中间）。

```python
# wifi连接的的ssid和pwd定义
wifiSsid = "请填写您的路由器名称"
wifiPassword = "请填写您的路由器密码"
```

&emsp;&emsp;
修改完成之后get_wifi_status函数中的wlan.connect(wifiSsid, wifiPassword) 语句就会连接读者自己设定的路由器。

2. **修改设备端三元组**

&emsp;&emsp;
修改smart_light工程里main.py中productKey、deviceName和deviceSecret的值为上面物联网平台创建的物联网设备的三元组信息，复制即可：

<div align="center">
<img src=./../../../图片/2_3_设备证书.jpg
 width=40%/>
</div>

```python
# 物联网平台相关的key和serect定义
productKey     = "产品key"
deviceName     = "设备名称"
deviceSecret   = "设备密钥"
```

3. **修改设备端上报光强度标识符**

&emsp;&emsp;
light_smart工程里main.py中下面的代码实现的是上传光强度值到云端的功能，其中Brightness便是光强度值上报时所用的标识符。

```python
def report_light_data(l_data):
    # 生成上报到物联网平台的属性值字串
    upload_data = {'params': ujson.dumps({
        'Brightness': l_data,
    })
    }
    # 上传光强度信息到物联网平台
    device.postProps(upload_data)
```

&emsp;&emsp;
确保Brightness标识符和物联网产品的物模型中属性标识符是一样的，如下图所示：
<div align="center">
<img src=./../../../图片/5_1_2完成物模型设置.jpg
 width=70%/>
</div>

<br>

## 推送脚本并运行

&emsp;&emsp;
推送此脚本到ESP32之后，在设备上通过OLED显示亮度值，同时将相关的光强度值上传到云端，如下日志所示：

```python
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
establish tcp connection with server(host='a1zxKgAV78Z.iot-as-mqtt.cn-shanghai.aliyuncs.com', port=[443])
tcp_connect: can only connect from state CLOSED
success to establish tcp, fd=54
物联网平台连接成功
sleep for 2s
photoresistor init finished
The lightness is:  571
system first come
亮度:571
The lightness is:  926
no need report
亮度:926
The lightness is:  577
no need report
亮度:577
```

<br>

## 课后作业

暂无
<br>

> 关于ESP32的详细信息请参考[ESP32开发板介绍](../../../拓展知识/HaaS硬件积木库/ESP32开发板/README.md)。

<br>