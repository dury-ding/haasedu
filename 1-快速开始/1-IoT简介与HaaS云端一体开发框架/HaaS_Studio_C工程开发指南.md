> **学习物联网，来HaaSEDU就对了** 

# HaaS Studio C/C++工程开发

&emsp;&emsp;
本节课程主要是介绍如何使用HaaS Studio IDE使用C或C++语言进行开发，主要分为如下三个步骤：
* 创建工程
* 工程开发
* 烧录固件

## 创建工程

&emsp;&emsp;
创建工程会自动拉取AliOS-Things的核心组件代码，并配置好相关编译选项。

&emsp;&emsp;
点击VS Code左侧H形图标，选择快速开始选项，打开HaaS快速开始页面。

<div align="center">
<img src=../../图片/1_HaaS_Studio_C_快速开始.png width=60%/>
</div>

&emsp;&emsp;
选择C/C++开发选项，点击创建项目按钮，打开创建工程向导。如下图所示，其中的几个选项说明如下：
* 项目名字，给这个项目起个名字
* 工作区路径，工作区路径即为源码路径(注：此目录名称必须为连续的英文字符)
* 选择硬件类型，即选择在哪块开发板上运行这套示例程序，如HaaS EDU K1等
* 选择解决方案，即选择什么功能的示例程序，这里选择最简单的helloworld例程。

<div align="center">
<img src=../../图片/1_HaaS_Studio_C_创建工程.png width=60%/>
</div>

&emsp;&emsp;
填好工程配置信息之后，点击“立即创建”按钮，HaaS Studio会弹出确认页面，如下所示：
<div align="center">
<img src=../../图片/1_HaaS_Studio_C_创建工程_确认.png width=60%/>
</div>

&emsp;&emsp;
点击“确认”按钮之后，HaaS Studio会自动下载解决方案所需要的组件，如下图所示。这个过程需要一段时间，需要的时间长短跟网络速度强相关，请耐心等待。
<div align="center">
<img src=../../图片/1_HaaS_Studio_C_创建工程过程.png width=60%/>
</div>

&emsp;&emsp;
AliOS Things源代码下载完成之后，左上角便是整个解决方案的代码，解决方案的代码入口函数位于"Solutions/helloworld/helloworld.c"中的application_start函数。

<div align="center">
<img src=../../图片/1_HaaS_Studio_C_hellworld_代码.png width=60%/>
</div>

## 编译工程
&emsp;&emsp;
工程创建好之后，点击状态栏的编译图标，稍等片刻（由于需要安装编译器，第一次编译耗时稍久）就能看到编译成功的提示，如下图所示。
<div align="center">
<img src=../../图片/1_HaaS_Studio_C_helloworld_编译.png width=60%/>
</div>

## 烧录固件
&emsp;&emsp;
编译生成固件之后，需要将固件烧录到物联网设备中运行。烧录之前需要先将物联网设备连接到电脑并开启物联网设备的电源，电脑识别到物联网设备的串口之后，点击VS Code下方状态栏中的烧录图标，随后VS Code会显示电脑已识别到的串口的列表(Avaliable ports)。然后根据物联网设备和PC相连后PC识别到的串口号，如下图所示。
<div align="center">
<img src=../../图片/1_HaaS_Studio_C_helloworld烧录.png width=60%/>
</div>

&emsp;&emsp;
点击烧录图标后，HaaS Studio会尝试自动复位物联网设备，如果复位不成功，则会提示“Please reset the board manually.”，如果出现此提示，需要手动复位物联网设备（如果是物联网设备没有上电，则需要打开其电源）。固件烧录完成后，HaaS Studio会输出如下日志：
<div align="center">
<img src=../../图片/1_HaaS_Studio_C_helloworld_烧录.png width=60%/>
</div>








