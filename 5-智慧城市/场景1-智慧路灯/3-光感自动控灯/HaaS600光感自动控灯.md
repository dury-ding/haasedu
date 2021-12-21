> **学习物联网，来HaaSEDU就对了**

# HaaS600光感自动控灯

## 硬件连线图

&emsp;&emsp;
本实验只需要一台HaaS600、光照传感器、LED灯以及wifi路由器。

<div align="center">
<img src=./../../../图片/5_1_实物连接示意图2.jpg
 width=80%/>
</div>

<div align="center">
<img src=./../../../图片/5_1_实物图连接1.jpg
 width=60%/>
</div>

<br>

## 开发环境

&emsp;&emsp;
在进行下一步之前请确保HaaS600开发环境已经搭建完毕。详情请参考:
* [HaaS Studio开发环境](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)

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
 width=60%/>
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
 width=60%/>
</div>

&emsp;&emsp;
当光照传感器值大于800，执行关灯的指令
<div align="center">
<img src=./../../../图片/5_1_规则引擎2_js.jpg
 width=80%/>
</div>

&emsp;&emsp;
当光照传感器值小于800，执行开灯的指令
<div align="center">
<img src=./../../../图片/5_1_规则引擎3_js.jpg
 width=80%/>
</div>

&emsp;&emsp;
规则引擎创建完成以后，启动引擎即可。
<div align="center">
<img src=./../../../图片/5_1_3规则引擎4.jpg
 width=80%/>
</div>

### 设备端代码

&emsp;&emsp;
本节课程是在[光强度数据上云](../2-光强度数据上云/HaaS600光强度数据上云.md)的基础上进行开发，设备端的工程无需再创建，需要将[代码](./代码/HaaS600/JS)脚本的代码复制后覆盖light_smart工程根目录app/下的内容，并且完成以下两处代码修改。

1. **修改设备端三元组**

&emsp;&emsp;
修改light_smart工程里app.js中productKey、deviceName和deviceSecret的值为上面物联网平台创建的物联网设备的三元组信息，复制即可：

<div align="center">
<img src=./../../../图片/2_3_设备证书.jpg
 width=40%/>
</div>

```python
# 物联网平台相关的key和serect定义
const productKey = '产品密钥';     //请输入您的pk
const deviceName = '设备名称';    //请输入您的dn
const deviceSecret = '设备密钥';   //请输入您的ds
```

2. **修改设备端上报光强度和下发开关标识符**

&emsp;&emsp;
light_smart工程里app.js中下面的代码实现的是上传光强度值到云端的功能，以及云端下发对应的开关命令。其中Brightness便是光强度值上报时所用的标识符，onoff为云端下发的开关标识符。

```python
 // 每5秒钟上报温湿度数据
 setInterval(function () {
  var lightness = light_adc.adc_readValue(lightObj);
  console.log('adc value is ' + lightness);

   // 上报数据到云端
   iotdev.postProps(
       JSON.stringify({
        Brightness: lightness,
       })
   );
 }, 5000);
```

```python
 // 云端收到上报下发的消息
 iotdev.onProps(function(properity) {
    console.log('received cloud properity param ' + properity.params);
    console.log('received cloud properity param len ' + properity.params_len);
    var onoffObj = JSON.parse(properity.params);
    console.log('received cloud properity param value ' + onoffObj.onoff);
    if(onoffObj.onoff == 1){
     console.log('turn on light');
     gpio_adc.gpio_writeValue(ledObj, 1);
    }else{
     console.log('turn off light');
     gpio_adc.gpio_writeValue(ledObj, 0);
    }
});
```

&emsp;&emsp;
确保Brightness和onoff两个标识符和物联网产品的物模型中属性标识符是一样的，如下图所示：
<div align="center">
<img src=./../../../图片/5_1_完成物模型设置.jpg
 width=60%/>
</div>

<br>

## 推送脚本并运行

&emsp;&emsp;
推送此脚本到HaaS600之后，设备串口显示如下日志，同时将相关的光强度值上传到云端，本传感器周围亮度越暗，读出的adc值越大，在物联网平台中设置光照传感器值大于800，开灯，光照传感器值小于800，关灯，如下图所示：
<div align="center">
<img src=./../../../图片/5_1_光感控制灯案例js.jpg width=80%/>
</div>

<br>

## 课后作业

暂无
<br>

> 关于HaaS600的详细信息请参考[HaaS600开发板介绍](../../../拓展知识/HaaS硬件积木库/HaaS600开发板/HaaS600.md)。

<br>

