> **学习物联网，来HaaSEDU就对了**

# HaaS EDU K1光感自动控灯

## 硬件连线图

&emsp;&emsp;
本实验只需要一台HaaS EDU K1以及wifi路由器即可。

<br>

## 开发环境

&emsp;&emsp;
在进行下一步之前请确保HaaS EDU K1开发环境已经搭建完毕。详情请参考[HaaS EDU K1快速开始](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)的说明。

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

4. **设备引擎**

&emsp;&emsp;
如何通过光感自适应控制灯的亮灭，在物联网平台上通过引擎规则实现。
<div align="center">
<img src=./../../../图片/5_1_规则引擎1.jpg
 width=40%/>
</div>

&emsp;&emsp;
当光强度大于100，执行关灯的指令
<div align="center">
<img src=./../../../图片/5_1_规则引擎2.jpg
 width=40%/>
</div>

&emsp;&emsp;
当光强度小于100，执行开灯的指令
<div align="center">
<img src=./../../../图片/5_1_规则引擎3.jpg
 width=40%/>
</div>

&emsp;&emsp;
规则引擎创建完成以后，启动引擎即可。
<div align="center">
<img src=./../../../图片/5_1_规则引擎4.jpg
 width=40%/>
</div>

### 设备端代码

&emsp;&emsp;
本节课程是在[光强度数据上云](../2-光强度数据上云/HaaS_EDU_K1_光强度数据上云.md)的基础上进行开发，设备端的工程无需再创建，只需要将[本节目录](./代码/HaaS_EDU_K1/Python)下所有文件复制后覆盖light_smart工程根目录下的原本文件后需要完成以下3处代码修改。

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

&emsp;&emsp;
下面是采集光照数据的时候，采样值是跨阈值100就需要进行上报。
```python
# 光照强度值打印
def show_lightness():
    global brightness,i_light,last_light,system_reset

    i_light = int(brightness)
    if system_reset == 1:
        print("system first come")
        system_reset = 0    # 系统第一次启动
        report_light_data(i_light)
    elif (i_light >= 100 and last_light < 100) or (i_light < 100 and last_light >= 100):
        report_light_data(i_light)  # 每次采样值是跨阈值100就上报
        print("light has change")
    else:
        print('no need report')

    if i_light < 10:
        T_str = "亮度:" + str(round(i_light, 1))
    elif i_light >= 10 and i_light < 100:
        T_str = "亮度:" + str(round(i_light, 2))
    elif i_light >= 100 and i_light < 1000:
        T_str = "亮度:" + str(round(i_light, 3))
    elif i_light >= 1000 and i_light < 10000:
        T_str = "亮度:" + str(round(i_light, 4))
    print(T_str)
    last_light = i_light
```

&emsp;&emsp;
物联网平台下发的数据处理。
```python
# 接收到到物联网服务端平台数据信息的回调函数
def on_props(request):
    #服务端返回的json转换成dict
    payload = ujson.loads(request['params'])
    #获取dict中的灯物模型状态字段
    stat = payload["onoff"]
    if stat == 1:
        print('led on')
        ledOn()
    else:
        print('led off')
        ledOff()
    time.sleep_ms(200)
```

&emsp;&emsp;
确保Brightness和onoff两个标识符和物联网产品的物模型中属性标识符是一样的，如下图所示：
<div align="center">
<img src=./../../../图片/5_1_完成物模型设置.jpg
 width=40%/>
</div>

<br>

## 推送脚本并运行

&emsp;&emsp;
推送此脚本到HaaS EDU K1之后，在设备终端会打印光强度值，同时将光强度值上传到云端，并且当光强度大于100，关闭LED红灯；当光强度小于100，打开LED红灯。
详细日志如下：
```log
...
物联网平台连接成功
...
ap3216c init finished
system first come
...
uploading data to the cloud: {'params': '{"Brightness": 304}'}
亮度:304
led off
uploading data to the cloud: {'params': '{"Brightness": 0}'}
light has change
亮度:0
led on
no need report
亮度:53
uploading data to the cloud: {'params': '{"Brightness": 302}'}
light has change
亮度:302
led off
uploading data to the cloud: {'params': '{"Brightness": 5}'}
light has change
亮度:5
led on
...
```
<br>

## 课后作业
&emsp;&emsp;
如何检测灯是否有正常打开呢？尝试去做一个检测LED是否有正常打开或关闭的功能。
<details>
<summary>点我查看提示</summary>

&emsp;&emsp;
当前程序通过控制名为"led"的GPIO控制LED的开关状态，可以再用另外一根GPIO连接到这根名为"led"的GPIO，在控制“led”之后通过另一根GPIO来量测“led”是否有正常拉高或拉低。
注意：GPIO36没有引出到HaaS EDU K1的扩展口，可以修改board.json中"led"中的port配置信息，换成HaaS EDU K1的扩展口里边的一根GPIO方便硬件连线及测试。

</details>

<br>

> 关于HaaS EDU K1的详细信息请参考[HaaS EDU K1开发板介绍](../../../拓展知识/HaaS硬件积木库/HaaS-EDU-K1开发板/README.md)。

<br>

