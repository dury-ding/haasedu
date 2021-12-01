> **学习物联网，来HaaSEDU就对了**

# HaaS EDU K1温湿度上云

## 硬件连线图

&emsp;&emsp;
本实验只需要一台HaaS EDU K1即可，无需外接其它设备。

<br>

## 开发环境

&emsp;&emsp;
在进行下一步之前请确保HaaS EDU K1开发环境已经搭建完毕。详情请参考：
* [HaaS Studio开发环境](../1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)

<br>

## 创建解决方案

&emsp;&emsp;
如下图所示，打开VS Code之后在新建一个基于helloworld的python案例，硬件类型选择HaaS EDU K1，设定好工程名称（humiture）及工作区路径之后，点击立即创建，创建一个Python轻应用的解决方案。

<div align="center">
<img src=./../../图片/1_创建Humiture工程.png
 width=40%/>
</div>

&emsp;&emsp;
将[main.py](./代码/HaaS_EDU_K1/Python/main.py)脚本的代码复制后覆盖main.py里边的内容。
> Python脚本的详细说明请参考脚本内嵌的文字注释

## 代码编辑
&emsp;&emsp;
完成下面3个步骤就完成了设备端的开发。

1. **修改路由器名称及密码**   
&emsp;&emsp;
修改humiture工程里main.py中wifiSsid和wifiPassword的值为读者实际要连接的路由器的名称及密码（请注意名称和密码都需要放在""符号中间）。

```
# Wi-Fi SSID和Password设置
wifiSsid = "请填写您的路由器名称"
wifiPassword = "请填写您的路由器密码"
```

&emsp;&emsp;
修改完成之后get_wifi_status函数中的nm.connect(wifiSsid, wifiPassword) 语句就会连接读者自己设定的路由器。

2. **修改设备端三元组**

&emsp;&emsp;
修改humiture工程里main.py中productKey、deviceName和deviceSecret的值为读者创建的物联网设备的三元组信息，如下图所示：

<div align="center">
<img src=./../../图片/1_修改设备端三元组信息.png
 width=40%/>
</div>


3. **修改设备端上报温湿度信息所用标识符**

humiture工程里main.py中下面的代码实现的是上传温湿度值到云端的功能。其中CurrentTemperature和CurrentHumidity便是温湿度值上报时所用的标识符。
```
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
确保这两个标识符和物联网产品的物模型中属性标识符是一样的，如下图所示：
<div align="center">
<img src=./../../图片/1_HaaS_EDU_K1_humiture_属性标识符修改.png
 width=40%/>
</div>

## 推送脚本到HaaS EDU K1并运行

&emsp;&emsp;
请参考[HaaS Studio Python工程开发指南](../1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_Python工程开发指南.md)中“推送脚本到设备”的详细说明，选择串口本地更新的方式进行推送。

&emsp;&emsp;
推送此脚本到HaaS EDU K1之后，串口会周期性的打印如下日志：
```
...
The temperature is: 50.4
The humidity is: 14.0
...
The temperature is: 50.5
The humidity is: 14.0
...
The temperature is: xxx
The humidity is: yyy
...
```

&emsp;&emsp;
其中xxx是温湿度传感器实际测量到的温度值，yyy是温湿度传感器实际测量到的湿度值。
> 此温度值为开发板的温度值，所以和体感温度会有一定的差别