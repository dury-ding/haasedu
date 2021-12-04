> **学习物联网，来HaaSEDU就对了**

# HaaS600 燃气检测数据上云

## 硬件连线图

&emsp;&emsp;
同上一节课程。

<br>

## 代码编辑及讲解

&emsp;&emsp;
本节课程是在[火焰亮度检测及报警灯控制](../1-火焰亮度检测及报警灯控制/README.md)的基础上进行开发，设备端的工程无需再创建，只需要(./代码/HaaS600/JavaScript)里的我脚本文件复制后覆盖“fire_detector”工程根目录下appp.js和app.json。然后需要完成以下两处代码修改。
> JavaScript脚本的详细说明请参考脚本内嵌的文字版注释

1. **修改设备端三元组**

&emsp;&emsp;
修改fire_detector工程里app.js中productKey、deviceName和deviceSecret的值为读者创建的物联网设备的三元组信息，如下图所示：
<div align="center">
<img src=./../../../图片/4_火焰监控系统_修改设备端三元组信息_JS.png
 width=40%/>
</div>


1. **修改设备端上报数据所用标识符**

fire_detector工程里app.js中下面的代码实现的是上传燃气检测结果和报警灯状态到云端的功能。其中fireVoltate便是燃气检测结果上报云端所用的标识符。
```python
   // 上报数据到云端
   iotdev.postProps(
       JSON.stringify({
           fireVoltate: voltage,
           alarmState: alarm_on,
       })
   );
```
确保这两个标识符和物联网产品的物模型中属性标识符是一样的，如下图所示：
<div align="center">
<img src=./../../../图片/4_HaaS_EDU_K1_属性标识符修改.png
 width=40%/>
</div>

<br>

## 推送脚本到HaaS600并运行

&emsp;&emsp;
请参考[HaaS-Studio JavaScript工程](../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio JavaScript工程 - 推送脚本到设备”的详细说明。

&emsp;&emsp;
JS脚本运行之后，系统会周期性的读取火焰传感器的测量结果，并打印到日志中，如下图所示。其中：
*  "[ADC](93) adc value：xxx"，xxx为ADC返回的测量结果，因为HaaS600开发板ADC通路有2个100K电阻串联分压，最大电压范围 0 - 2.6V，xxx * 2才是实际测量的电压值。
*  “fireVoltage：yyy”：yyy则为实际ADC输入的电压值，单位：mV
*  “alarmOn: x”：x为报警灯的状态

```python
<D>[ADC](93) adc value: 1299

fireVoltage: 2598
alarmOn: 1
<D>[ADC](93) adc value: 1299

fireVoltage: 2598
alarmOn: 0

```

<br>
