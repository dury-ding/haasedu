> **学习物联网，来HaaSEDU就对了**

# HaaS Studio Python工程开发

&emsp;&emsp;
本节课程主要是介绍如何使用HaaS Studio IDE使用Python语言进行开发。

## 创建工程

&emsp;&emsp;
请遵循如下的步骤完成Python工程的创建。

&emsp;&emsp;
点击下图中的"快速开始"按键(<img src=./../../图片/1_HaaS_Studio_创建工程按钮.png width=8%/>)会弹出HaaS Studio的欢迎页面，请点击“创建项目”按钮，如下图所示：

<div align="center">
<img src=./../../图片/1_HaaS_Studio_创建项目向导.png width=70%/>
</div>

&emsp;&emsp;
根据创建工程向导，开发者输入/选择相关的信息即可。下面以在ESP32上面创建hellworld示例程序为例演示工程进行，步骤如下:
> 注意事项： 文件夹不要有中文，空格及其他异常字符。

1. 输入项目名称
2. 选择工作区所在路径
3. 选择硬件类型
4. 选择编程语言
5. 选择解决方案模板
<div align="center">
<img src=./../../图片/1_HaaS_Studio_Python创建工程_项目名称.png width=70%/>
</div>

&emsp;&emsp;
然后点击“立即创建”按钮，在随后的步骤中确认输入的信息无误，点击“确认”，等待工程创建完成后，VS Code会自动打开新创建的工程。就可以在左侧的文件浏览页面中看到刚刚创建的helloworld工程。

<div align="center">
<img src=./../../图片/1_HaaS_Studio_Python_helloworld_代码.png width=70%/>
</div>


## 推送脚本到设备

&emsp;&emsp;
因为HaaS系列产品中有多款都同时支持Python、JavaScript和C多语言开发，但不同的语言开发所需要烧录的基础固件可能是不一样的。因此在推送Python固件到设备上之前需确保设备上的基础固件是可以运行Python的。请参考下面的链接确认读者所选用的设备上已经运行了包含Python运行环境的基础固件。
* [HaaS EDU K1 固件烧录](./HaaS_EDU_K1_固件烧录.md)
* [ESP32 固件烧录](./ESP32_固件烧录.md)

&emsp;&emsp;
将此Python工程目录下的文件推送到设备端。Python轻应用脚本推送到设备端有两种推送方式可以选择。
* 串口本地更新
* 云端在线更新

&emsp;&emsp;
本文则只介绍“本地更新”的方式，在执行下面操作之前请确保：
* HaaS EDU K1
  * HaaS EDU K1通过Type-C的数据线连接到电脑的USB口
  * HaaS EDU K1左侧的电源拨码开关已经处于开启的状态
* ESP32
  * ESP32通过数据线连接到电脑的USB口

&emsp;&emsp;
“本地更新”需要如下4步完成脚本下载。

&emsp;&emsp;
&emsp;&emsp;
点击HaaS-Studio的“部署运行”按钮（(<img src=./../../图片/1_HaaS_Studio_部署运行.png width=5%/>)），系统会弹出如下的窗口让开发者选择。
1. 选择“本地更新”

<div align="center">
<img src=./../../图片/1_HaaS_Studio_Python_选择本地更新.png width=70%/>
</div>

2. 选择串口设备

<div align="center">
<img src=./../../图片/1_HaaS_Studio_Python_选择烧录串口.png width=70%/>
</div>

> 注意：每台设备的串口名称都不一样，上图串口名称是笔者电脑上显示的串口名称，请读者确认自己根据自己开发环境的实际情况选择合适的串口。

3. 选择串口波特率
* HaaS EDU K1
  * 请选择1500000
* ESP32
  * 请选择115200
<div align="center">
<img src=./../../图片/1_HaaS_Studio_Python_选择串口波特率.png width=70%/>
</div>

4. 重启设备
* HaaS EDU K1

&emsp;&emsp;
选择好波特率之后系统会弹出如下提示框及输出信息。请读者重启设备（在HaaS EDU K1上按一下屏幕旁边的小按钮即可）。
<div align="center">
<img src=./../../图片/1_HaaS_Studio_Python_重启设备提示.png width=70%/>
</div>

* ESP32
&emsp;&emsp;   
工具会控制ESP32自动重启，开发者无需操作。

&emsp;&emsp;
脚本下载完成后，系统会有如下提示：
* HaaS EDU K1：  
```log
Ymodem transfer file finish
```

* ESP32：
```log
upload success
```
