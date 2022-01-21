> **学习物联网，来HaaSEDU就对了**

# HaaS600温湿度上云

## 硬件连线图

&emsp;&emsp;
硬件连线图如下图所示：
<div align="center">
<img src=./../../../图片/3_HaaS600_温湿度测量_硬件连线图_LED.png width=80%/>
</div>

<br>

## 开发环境

&emsp;&emsp;
在进行下一步之前请确保HaaS600开发环境已经搭建完毕。详情请参考:
[HaaS Studio开发环境](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)

<br>

## 代码编辑及讲解

&emsp;&emsp;
本节课程是在[花卉养植之温湿度检测](../1-温湿度检测/README.md)的基础上进行开发，设备端的工程无需再创建，只需要将[JavaScript源代码](./代码/HaaS_600/JavaScript)里的脚本文件复制后覆盖floriture工程根目录下文件，然后完成以下2处代码修改。
> JavaScript脚本的详细说明请参考脚本内嵌的文字版注释

1. **修改设备端三元组**

&emsp;&emsp;
修改humiture工程里app.js中productKey、deviceName和deviceSecret的值为读者创建的物联网设备的三元组信息，如下图所示：
<div align="center">
<img src=./../../../图片/3_温湿度上云_修改设备端三元组信息_JS.png
 width=40%/>
</div>


2. **修改设备端上报温湿度信息所用标识符**

humiture工程里app.js中下面的代码实现的是上传温湿度值到云端的功能。其中CurrentTemperature和CurrentHumidity便是温湿度值上报时所用的标识符。
```python
   // 上报数据到云端
   iotdev.postProps(
       JSON.stringify({
           CurrentTemperature: temp,
           CurrentHumidity: humi,
       })
   );
```
确保这两个标识符和物联网产品的物模型中属性标识符是一样的，如下图所示：
<div align="center">
<img src=./../../../图片/3_HaaS600_floriculture_属性标识符修改.png
 width=40%/>
</div>

<br>

## 推送脚本到HaaS600并运行
&emsp;&emsp;
请参考[HaaS-Studio JavaScript工程](../../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio JavaScript工程 - 推送脚本到设备”的详细说明。

&emsp;&emsp;
推送此脚本到HaaS600之后，串口会周期性的打印如下日志。其中"reporting xxx to cloud"中的xxx即为设备端上报的温湿度信息的属性值（格式为json格式）。

```log

humi: 29.3003740444 temp: 3.058641315958127
reporting {"CurrentHumidity":29.3003740444,"CurrentTemperature":3.058641315958127} to cloud

humi: 29.6620128658 temp: 23.058641315958127
reporting {"CurrentHumidity":29.3003740444,"CurrentTemperature":23.058641315958127} to cloud
```

&emsp;&emsp;
这样就完成了HaaS600上温湿度信息上云的课程。
<br>
