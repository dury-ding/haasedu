> **学习物联网，来HaaSEDU就对了**

# HaaS600甲醛检测数据上云

## 硬件连线图

&emsp;&emsp;
同上一节课程。

<br>

## 代码编辑及讲解

&emsp;&emsp;
本节课程是在[甲醛检测](../1-甲醛检测/README.md)的基础上进行开发，设备端的工程无需再创建，只需要将[JavaScript源代码](./代码/HaaS600/JS/)里的脚本文件复制后覆盖“hcho_detector”工程根目录下app.js和app.json,
> Javascript脚本的详细说明请参考脚本内嵌的文字版注释

&emsp;&emsp;
接下来需要完成以下三处代码修改。

1. **修改设备端三元组**

&emsp;&emsp;
修改hcho_detector工程里app.js中productKey、deviceName和deviceSecret的值为读者创建的物联网设备的三元组信息，如下图所示：

<div align="center">
<img src=./../../../../图片/1_HaaS600甲醛检测_修改设备端三元组_马塞克.png
 width=60%/>
</div>


2. **修改设备端上报数据所用标识符**

hcho_detector工程里app.js中下面的代码实现的是上传甲醛检测结果到云端的功能。其中HCHO便是甲醛检测结果上报云端所用的标识符。
```
    // 上报数据到云端
    iotdev.postProps(
       JSON.stringify({
        HCHO: voltage,
       })
    );
```
确保这两个标识符和物联网产品的物模型中属性标识符是一样的，如下图所示：

<div align="center">
<img src=./../../../../图片/1_HaaS600_HCHO_属性标识符修改.png
 width=80%/>
</div>

<br>

## 推送脚本到HaaS600并运行

&emsp;&emsp;
请参考[HaaS-Studio JavaScript工程](../../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中“HaaS-Studio JavaScript工程 - 推送脚本到设备”的详细说明。

&emsp;&emsp;
推送此脚本到HaaS600之后，串口会周期性的打印如下日志：

```
<D>[ADC](93) adc value: 216

<D>[ADC](93) adc value: 219

<D>[ADC](93) adc value: 219

<D>[ADC](93) adc value: 220

<D>[ADC](93) adc value: 218

hchoVoltage: 0.02
```
<br>
