> **学习物联网，来HaaSEDU就对了**

# HaaS EDU K1定位数据上云
本节课程是在[HaaS600 获取定位数据](../1-获取定位数据/HaaS600_获取定位数据.md)的基础上进行开发。

## 硬件连线图

&emsp;&emsp;
请参考[HaaS600 获取定位数据](../1-获取定位数据/HaaS600_获取定位数据.md "硬件连线图")

<br>

## 开发环境

&emsp;&emsp;
在进行下一步之前请确保HaaS600开发环境已经搭建完毕。详情请参考[HaaS Studio开发环境](./../../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)中VS Studio/HaaS-Studio插件及JavaScript工程环境准备的说明。

<br>

## 代码编辑及讲解

&emsp;&emsp;
将定位数据上云的全部文件（[app.js](./代码/HaaS600/app.js), [gps.js](./代码/HaaS600/gps.js), [app.json](./代码/HaaS600/app.json)）复制后覆盖刚刚创建的工程目录（your_project_path/solutions/your_project_name）下，替换原有的所有文件。如下图所示：
<div align="center">
<img src=./../../../图片/5_3_JS工程复制脚本.png width=100%/>
</div>

> JavaScript脚本的详细说明请参考脚本内嵌的文字注释

&emsp;&emsp;
之后，在代码中填入对应的信息

**修改设备端三元组**

&emsp;&emsp;
在[app.js](./代码/HaaS600/app.js)中，填写创建的设备三元组信息。关于设备三元组的获取，请参考[获取设备三元组](./README.md "获取设备三元组")中的步骤。

``` js
var productKey = "产品密钥"; 
var deviceName = "设备名称"; 
var deviceSecret = "设备密钥";
```

<br>

## 推送脚本并运行

> 推送工程到HaaS600的详细操作步骤请参考[HaaS-Studio JavaScript工程 - 本地更新](../../1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)。

&emsp;&emsp;
推送此脚本到HaaS600之后，串口会输出获取到的定位信息，并上报至物联网平台。如下面这段串口日志所示。

&emsp;&emsp;
读者此时可以前往物联网平台查看设备的实时定位数据，具体的操作请参考[在物联网平台上查看设备数据](./README.md "在物联网平台上查看设备数据")

```
...

$GNGGA,070211.000,3008.05024,N,12004.48657,E,1,07,5.4,-11.7,M,7.2,M,,*69
$GNGLL,3008.05024,N,12004.48657,E,070211.000,A,A*45
$GNGSA,A,3,13,15,24,193,,,,,,,,,7.1,5.4,4.5,1*0C
$GNGSA,A,3,14,26,42,,,,,,,,,,7.1,5.4,4.5,4*35
$GPGSV,3,1,10,05,20,118,,10,25,316,,12,13,146,,13,11,058,26,0*62
$GPGSV,3,
{time:"1970-01-01T07:02:11.000Z",lat:30.134170666666666,lon:120.07477616666667,alt:-11.7,quality:"fix",satellites:7,hdop:5.4,geoidal:7.2,age:null,stationID:null,raw:"$GNGGA,070211.000,3008.05024,N,12004.48657,E,1,07,5.4,-11.7,M,7.2,M,,*69\r\n",valid:true,type:"GGA"}
{latitude:30.134170666666666,longitude:120.07477616666667,altitude:-11.7}
...
```

