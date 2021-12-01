> **学习物联网，来HaaSEDU就对了** 

# HaaS Studio开发环境安装

&emsp;&emsp;
HaaS Studio目前是以插件的形式安装在VS Code（Visual Studio Code）工具中，所以安装HaaS Studio之前需要先安装VS Code。

<br>

## 安装VS Code

&emsp;&emsp;
读者请到[微软官方网站](https://code.visualstudio.com/)上下载 VS Code 安装包并进行安装，VS Code安装包要求不低于版本 1.57。

&emsp;&emsp;
VS Code安装包下载网站： https://code.visualstudio.com/

> 推荐 Windows 系统版本为 win10， MacOS 版本不低于 10.15。

<br>

## 安装haas-studio插件

&emsp;&emsp;
安装完 VS Code之后，请按照下图中数字的指示步骤完成haas-studio插件的安装。

<div align="center">
<img src=./../../图片/1_安装haas_studio_插件.png width=100%/>
</div>

<br>

## HaaS-Studio功能简介

&emsp;&emsp;
插件安装完成后，如果你当前的 VS Code 未打开任何工作台，则 VS Code 左下角的状态栏只会显示"快速开始"的图标，如下图所示。

<div align="center">
<img src=./../../图片/1_HaaS_Studio_新建工程按钮.png width=100%/>
</div>

&emsp;&emsp;
如果你已经打开了某个Python工程，则会在VS Code底部的状态栏显示如下一排按钮，这些按钮的功能如下图所示：

<div align="center">
<img src=./../../图片/1_HaaS_Studio_Python工程按钮.png width=50%/>
</div>

&emsp;&emsp;
接下来是使用HaaS Studio创建Python或JavaScript工程的步骤，请读者根据自己选择的开发板及开发语言选择学习。

## HaaS-Studio Python工程
&emsp;&emsp;
请参考[HaaS Python轻应用IDE开发指南](./HaaS_Studio_Python工程开发指南.md)的说明进行Python语言的开发。

## HaaS-Studio JavaScript工程
&emsp;&emsp;
请参考[HaaS JavaScript轻应用IDE开发指南](./HaaS_Studio_JavaScript工程开发指南.md)的说明进行Python语言的开发。

## HaaS-Studio C/C++工程
&emsp;&emsp;
请参考[HaaS C/C++ IDE开发指南](./HaaS_Studio_C工程开发指南.md)的说明进行Python语言的开发。

## 查看串口日志

&emsp;&emsp;
本项目中所有工程所用硬件的日志都是通过串口输出的。HaaS解决方案不限定读者使用那种PC串口工具，这里分别介绍下MacOS上面的picocom工具和Windows系统下面的PuTTY工具。


### **MacOS串口工具-picocom**

&emsp;&emsp;
MacOS建议读者使用picocom串口工具，picocom工具的安装命令如下：
```
brew install picocom
```

&emsp;&emsp;
picocom安装完成后，以为例命令如下：
```
picocom -b 115200 /dev/tty.usbserial-AU03OKKM
```

&emsp;&emsp;
其中，-b 1500000指的ESP32的波特率是115200，/dev/tty.usbserial-AU03OKKM是ESP32在PC上枚举出的串口设备。
> 不同开发板的串口和波特率波特率是不同的，比如HaaS EDU K1的串口波特率应该使用1500000（5个0，1.5Mbps）。

### **Windows串口工具-PuTTY**

&emsp;&emsp;
Windows系统下可以使用PuTTY工具查看设备端上报的日志，工具下载链接实例：https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html。

<div align="center">
<img src=./../../图片/1_HaaS_Studio_PuTTY配置.png width=60%/>
</div>

&emsp;&emsp;
如果发现Putty上没有日志输出，请读者确认该COM口是否被其他程序占用，例如VSCode上的Terminal等，或者重新插拔下HaaS板的USB口试试。
> 不同开发板的串口和波特率波特率是不同的，比如HaaS EDU K1波特率应该使用1500000，ESP32的串口波特率应该使用115200。
> 在此工具页面下如果需要退出串口的时候请先按Ctrl+a，再按Ctrl+q。
<br>