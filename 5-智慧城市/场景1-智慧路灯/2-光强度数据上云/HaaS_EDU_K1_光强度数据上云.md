> **学习物联网，来HaaSEDU就对了**

# HaaS EDU K1光强度数据上云

## 硬件连线图

&emsp;&emsp;
本实验只需要一台HaaS EDU K1以及Wi-Fi路由器即可。

<br>

## 开发环境

&emsp;&emsp;
在进行下一步之前请确保HaaS EDU K1开发环境已经搭建完毕。详情请参考[HaaS Studio开发环境](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)的说明。

<br>

## 代码讲解
### 云端创建产品

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
如下图设置对应产品的物模型，分别设置光强度和灯开关两个模型，
<div align="center">
<img src=./../../../图片/5_1_产品物模型.jpg
 width=40%/>
</div>

&emsp;&emsp;
在产品详情中增加产品的功能，可以看到刚才设置的光强度和开关两个功能属性，点击发布上线。
<div align="center">
<img src=./../../../图片/5_1_完成物模型设置.jpg
 width=40%/>
</div>

&emsp;&emsp;
这样，整个智慧路灯产品在物联网平台就创建好了。

3. **设备管理**

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
本节课程是在[光照传感器检测](../1-光照传感器检测/HaaS_EDU_K1_光照传感器检测.md)的基础上进行开发，设备端的工程无需再创建，只需要将[本节目录](./代码/HaaS_EDU_K1/Python)下所有脚本复制后覆盖light_smart工程根目录下的原本文件，然后完成以下3处代码修改。

1. **修改路由器名称及密码**   

&emsp;&emsp;
修改light_smart工程里main.py中wifiSsid和wifiPassword的值为读者实际要连接的路由器的名称及密码（请注意名称和密码都需要放在""符号中间）。

```python
# wifi连接的的ssid和pwd定义
wifiSsid = "请输入您的路由器名称"
wifiPassword = "请输入您的路由器密码"
```

&emsp;&emsp;
修改完成之后get_wifi_status函数中的nm.connect(wifiSsid, wifiPassword) 语句就会连接读者自己设定的路由器。

2. **修改设备端三元组**

&emsp;&emsp;
修改smart_light工程里main.py中productKey、deviceName和deviceSecret的值为上面物联网平台创建的物联网设备的三元组信息。

```python
# 物联网平台相关的key和serect定义
productKey     = "产品密钥"
deviceName     = "设备名"
deviceSecret   = "设备密钥"
```

3. **修改设备端上报光强度标识符**

&emsp;&emsp;
light_smart工程里main.py中下面的代码实现的是上传光强度值到云端的功能，其中Brightness便是光强度值上报时所用的标识符。

```python
def report_light_data(l_data):
    # 生成上报到物联网平台的属性值字串
    upload_data = {'params': {
        'Brightness': l_data,
    }
    }
    print("uploading data to the cloud:", upload_data)

    # 上传光强度信息到物联网平台
    device.postProps(upload_data)
```

&emsp;&emsp;
确保Brightness标识符和物联网产品的物模型中属性标识符是一样的，如下图所示：
<div align="center">
<img src=./../../../图片/5_1_完成物模型设置.jpg
 width=40%/>
</div>

<br>

## 推送脚本并运行

&emsp;&emsp;
推送此脚本到HaaS EDU K1之后，在设备终端会打印光强度值，同时将光强度值上传到云端，如下所示。其中：
1. “Wi-Fi connected”代表链接无线路由器成功
2. “物联网平台连接成功”代表成功连接到阿里云物联网平台
3. “uploading data to the cloud:”后面跟的是光强度值，"Brightness"则为设备上报属性信息到云端的属性标识符。
在用手遮住HaaS EDU K1屏幕上方的透明小孔的时候就可以看到AP3216C测量到的亮度值会发生变化。在设备端检测到的光亮度值超过一定的阈值会把测量结果上传到云端。
```log
...
Wi-Fi connected
...
DeviceIP:192.168.0.111
...
物联网平台连接成功
ap3216c init finished
system first come
uploading data to the cloud: {'params': '{"Brightness": 344}'}
亮度:344
no need report
亮度:247
uploading data to the cloud: {'params': '{"Brightness": 0}'}
light has change
亮度:0
uploading data to the cloud: {'params': '{"Brightness": 345}'}
light has change
亮度:345
no need report
亮度:345
uploading data to the cloud: {'params': '{"Brightness": 13}'}
light has change
亮度:13
uploading data to the cloud: {'params': '{"Brightness": 344}'}
light has change
亮度:344
no need report
亮度:345
```

<br>

## 课后作业

暂无
<br>

> 关于HaaS EDU K1的详细信息请参考[HaaS EDU K1开发板介绍](../../../拓展知识/HaaS硬件积木库/HaaS-EDU-K1开发板/README.md)。

<br>

