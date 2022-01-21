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
根据创建工程向导，开发者输入/选择相关的信息即可。下面以在NodeMCU-32S上面创建hellworld示例程序为例演示工程进行，步骤如下:
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
* [HaaS EDU K1 Python 固件烧录](./HaaS_EDU_K1_Python_固件烧录.md)
* [ESP32 固件烧录](./ESP32_固件烧录.md)

### HaaSEDU平台
&emsp;&emsp;
在推送脚本之前请确保：
  * HaaS EDU K1通过Type-C的数据线连接到电脑的USB口
  * HaaS EDU K1左侧的电源拨码开关已经处于开启的状态

&emsp;&emsp;
点击HaaS-Studio的“部署运行”按钮（<img src=./../../图片/1_HaaS_Studio_部署运行.png width=5%/>），HaaS Studio工具上面会弹出如下的选择框，请按照如下的步骤逐步选择完成后，HaaS-Studio开始推出送固件。
<div align="center">
<img src=./../../图片/1_HaaS_Studio_Python_HaaS_EDU_K1_推送脚本.png width=50%/>
</div>

&emsp;&emsp;
推送固件过程中会提示重启开发板，此时需要开发者按下HaaS EDU K1上复位按钮(正面屏幕旁边的最小的按钮)重启开发板。
<div align="center">
<img src=./../../图片/1_HaaS_Studio_Python_HaaS_EDU_K1_推送脚脚本提示.png width=70%/>
</div>


### ESP32平台
&emsp;&emsp;
在推送脚本之前请确保：
  * ESP32通过数据线连接到电脑的USB口

&emsp;&emsp;
系统会弹出如下提示框及输出信息。请读者重启设备（在HaaS EDU K1上按一下屏幕旁边的小按钮即可）。
<div align="center">
<img src=./../../图片/1_HaaS_Studio_Python_重启设备提示.png width=70%/>
</div>

&emsp;&emsp;
点击HaaS-Studio的“部署运行”按钮（<img src=./../../图片/1_HaaS_Studio_部署运行.png width=5%/>），HaaS-Studio会将脚本推送到开发板上。

&emsp;&emsp;
烧录过程中需要重启设备，在ESP32平台上，HaaS-Studio会ESP32进行自动重启，无需开发者操作。

&emsp;&emsp;
脚本下载完成后，系统会有如下提示：
```log
upload success
```

&emsp;&emsp;
如果`推送不成功`请点击下面"推送失败的解决方案"按钮查看解决方法。
<details>
<summary>推送失败的解决方案</summary>
&emsp;&emsp;
一般情况下，推送失败是因为电脑上外接了多个USB转串口的设备导致的。此时，VS Code的命令行中会列出系统的串口列表，需要您在命令行中敲入ESP32串口名称（前面“ESP32串口名称确认”步骤中有说明）对应的序号之后敲回车。如下图所示：

<div align="center">
<img src=./../../图片/1_HaaS_Studio_选择串口序号.png width=150%/>
</div>

&emsp;&emsp;
如果选择了串口仍然推送失败，请联系HaaS小二解决推送问题。

</details>
