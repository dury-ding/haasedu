> **学习物联网，来HaaSEDU就对了**

# HaaS EDU K1按键控制番茄时钟

## 硬件连线图

&emsp;&emsp;
本实验只需要一台HaaS EDU K1以及wifi路由器即可。

<br>

## 开发环境

&emsp;&emsp;
在进行下一步之前请确保HaaS EDU K1开发环境已经搭建完毕。详情请参考:
* [HaaS Studio开发环境](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)

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
这里创建了一个名称为“番茄时钟”的产品，
<div align="center">
<img src=./../../../图片/2_3_新建番茄时钟产品.jpg
 width=40%/>
</div>

&emsp;&emsp;
点击确认，就可以在产品列表中出现番茄时钟，
<div align="center">
<img src=./../../../图片/2_3_完成产品创建.jpg
 width=40%/>
</div>

&emsp;&emsp;
查看产品详情，
<div align="center">
<img src=./../../../图片/2_3_产品功能定义.jpg
 width=40%/>
</div>

&emsp;&emsp;
编辑草稿，选择自定义功能，
<div align="center">
<img src=./../../../图片/2_3_自定义产品物模型定义.jpg
 width=40%/>
</div>

&emsp;&emsp;
下图为设置对应产品的物模型，点击确认
<div align="center">
<img src=./../../../图片/2_3_产品物模型.jpg
 width=40%/>
</div>

&emsp;&emsp;
在产品详情中增加产品的功能，可以看到刚才设置的番茄数，点击发布上线。
<div align="center">
<img src=./../../../图片/2_3_完成物模型设置.jpg
 width=40%/>
</div>

&emsp;&emsp;
这样，整个番茄时钟产品在物联网平台就创建好了。

3. **设备管理**

&emsp;&emsp;
选中最左边栏设备管理中的设备，然后添加设备，
<div align="center">
<img src=./../../../图片/2_3_添加设备.jpg
 width=40%/>
</div>

&emsp;&emsp;
选择的产品为刚刚创建的番茄时钟，设备名设置为fq_device01,点击确认，
<div align="center">
<img src=./../../../图片/2_3_番茄时钟设备.jpg
 width=40%/>
</div>

&emsp;&emsp;
进入设备详情，获取设备三元组信息，
<div align="center">
<img src=./../../../图片/2_3_设备三元组信息.jpg
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
本节课程是在[番茄数上云](../2-番茄数上云/HaaS_EDU_K1番茄数上云.md)的基础上进行开发，设备端的工程无需再创建，只需要将[main.py](./代码/HaaSEDUK1/Python/main.py)脚本的代码复制后覆盖fq_time工程根目录下的main.py里边的内容后需要完成以下三处代码修改。

1. **修改路由器名称及密码**  

&emsp;&emsp;
修改fq_time工程里main.py中wifi_ssid和wifi_pwd的值为读者实际要连接的路由器的名称及密码（请注意名称和密码都需要放在""符号中间）。

```python
# Wi-Fi SSID和Password设置
wifi_ssid = "请输入您的路由器名称"
wifi_pwd = "请输入您的路由器密码"
```

&emsp;&emsp;
修改完成之后get_wifi_status函数中的nm.connect(wifi_ssid,wifi_pwd) 语句就会连接到设定的路由器上。

2. **修改设备端三元组**

&emsp;&emsp;
修改fq_time工程里main.py中productKey、deviceName和deviceSecret的值为上面物联网平台创建的物联网设备的三元组信息，复制即可：
<div align="center">
<img src=./../../../图片/2_3_设备证书.jpg
 width=40%/>
</div>

```python
# 物联网平台相关的key和serect定义
productKey     = "产品密钥"
deviceName     = "设备名"
deviceSecret   = "设备密钥"
```
<br>

3. **修改设备端上报番茄数标识符**

&emsp;&emsp;
fq_time工程里main.py中实现上传番茄数到云端代码如下：

```python
def report_fq_count():
    # 生成上报到物联网平台的属性值字串
    global fqcount 
    upload_data = {'params': ujson.dumps({
        'fq_count': fqcount,
    })}
    # 上传番茄数到物联网平台
    device.postProps(upload_data)
```

&emsp;&emsp;
确保fq_count标识符和物联网产品的物模型中属性标识符是一样的，如下图所示：

<div align="center">
<img src=./../../../图片/2_3_完成物模型设置.jpg
 width=40%/>
</div>

<br>

4. **按键修改**

&emsp;&emsp;
fq_time工程里main.py中按键初始化默认K4，读者可以修改使用任意按键，用来启动和暂停番茄时钟：

```python
def keyInit():
    gpio = GPIO()
    gpio.open("KEY_4")
    gpio.on(key_Press)
```

## 推送脚本并运行

&emsp;&emsp;
在推送脚本的之前，把编辑器右下角的编码UTF-8修改为GBK，不然OLED中文屏幕会显示乱码。
<div align="center">
<img src=./../../../图片/2_3_编码修改1.jpg width=80%/>
</div>

&emsp;&emsp;
推送此脚本到HaaS EDU K1之后，实际在设备上显示25分钟开始倒计时，倒计时结束，设备会推送番茄数到云端，如下图所示：
<div align="center">
<img src=./../../../图片/2_3_实验现象.jpg
 width=40%/>
</div>

<br>

## 课后作业

暂无
<br>
<br>

> 关于HaaS EDU K1的详细信息请参考[HaaS EDU K1开发板介绍](../../../拓展知识/HaaS硬件积木库/HaaS-EDU-K1开发板/HaaS-EDU-K1.md)。

<br>