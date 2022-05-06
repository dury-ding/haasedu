> **学习物联网，来HaaSEDU就对了** 

# HaaS Studio JavaScript工程开发

&emsp;&emsp;
本节课程主要是介绍如何使用HaaS Studio IDE使用JavaScript语言进行开发。

## 创建工程

&emsp;&emsp;
请遵循如下的步骤完成JavaScript工程的创建。
1. 点击下图左下角的"创建工程"按键(<img src=./../../图片/1_HaaS_Studio_创建工程按钮.png width=2%/>)会弹出HaaS Studio的欢迎页面，请选择"JavaScript轻应用开发"中的“创建项目”，如下图所示：

<div align="center">
<img src=./../../图片/1_HaaS_Studio_JS_创建新工程.png width=70%/>
</div>

&emsp;&emsp;
根据创建工程向导，开发者输入/选择相关的信息即可。下面以在HaaS600上面创建helloworld示例程序为例演示工程创建。
> 注意事项： 文件夹不要有中文，空格及其他异常字符。

1. 输入项目名字 
项目名称为”helloworld"，如下图所示。
<div align="center">
<img src=./../../图片/1_HaaS_Studio_JS_创建新工程_项目名称.png width=70%/>
</div>

2. 选择工作区所在路径
<div align="center">
<img src=./../../图片/1_HaaS_Studio_JS_创建新工程_路径.png width=70%/>
</div>

3. 选择硬件类型
<div align="center">
<img src=./../../图片/1_HaaS_Studio_JS_创建新工程_选择硬件.png width=70%/>
</div>

4. 选择解决方案模板

<div align="center">
<img src=./../../图片/1_HaaS_Studio_JS_创建新工程_helloworld.png width=70%/>
</div>


&emsp;&emsp;
然后点击“立即创建”按钮，工程创建完成后可以在左侧的文件浏览页面中看到刚刚创建的helloworld工程。

&emsp;&emsp;
创建的工程主要包含了app.js、app.json和README.md等三个文件，以及examples目录（包含了相关的用例），其余都是VSCODE插件自带的配置文件。
<div align="center">
<img src=./../../图片/1_HaaS_Studio_JS_helloworld_代码.png width=70%/>
</div>

## 推送脚本到设备

&emsp;&emsp;
JavaScript支持文件解析执行，所以只需要将工程中app.js和app.json文件推送到开发板上就可以直接由解释器解释执行。

&emsp;&emsp;
推送脚本之前，需要先对脚本进行编译，点击“编译”按钮(<img src=./../../图片/1_HaaS_Studio_JS_编译按钮.png width=1.5%/>)，该功能会对JS工程代码进行语法检查，并将app.js和app.json打包。

&emsp;&emsp;
点击“推送并执行”按钮(<img src=./../../图片/1_HaaS_Studio_Python_推送按钮.png width=2%/>)将"编译"环节生成的包文件上传到设备端。
JavaScript轻应用脚本推送到设备端有两种推送方式可以选择。
* 本地更新（通过串口）
* 在线更新（通过云端）

&emsp;&emsp;
本文则只介绍“本地更新”的方式，“本地更新”需要如下五步完成脚本下载。

&emsp;&emsp;
点击"推送执行"按钮(<img src=./../../图片/1_HaaS_Studio_Python_推送按钮.png width=2%/>)后，会弹出如下的窗口让开发者选择。

1. 选择“本地更新”

<div align="center">
<img src=./../../图片/1_HaaS_Studio_JS_选择本地更新.png width=70%/>
</div>

2. 选择串口设备

<div align="center">
<img src=./../../图片/1_HaaS_Studio_Python_选择烧录串口.png width=70%/>
</div>
> 注意：每台设备的串口名称都不一样，上图串口名称是笔者电脑上显示的串口名称，请读者确认自己根据自己开发环境的实际情况选择合适的串口。

3. 选择串口波特率

&emsp;&emsp;
对于HaaS600请选择115200的设定。
<div align="center">
<img src=./../../图片/1_HaaS_Studio_Python_选择串口波特率.png width=70%/>
</div>

4. 选择对应的JavaScript引擎

&emsp;&emsp;
HaaS600 ES600S选择duptape即可。
<div align="center">
<img src=./../../图片/1_HaaS_Studio_JavaScript_选择JS引擎类型.png width=70%/>
</div>

5. 选择“是否编译”
<div align="center">
<img src=./../../图片/1_HaaS_Studio_JS_选择是否编译.png width=70%/>
</div>
> 如果选择是，在下载JavaScript脚本之前，Haas-Studio在烧录前会先将脚本编译编译成二进制文件再将二进制文件下载到开发板里；如果选择否，则直接将脚本烧录到HaaS600。

&emsp;&emsp;
接下来系统在命令行窗口中会提示“等待和设备握手，请重启设备”，此时重启设备，设备重启完成后，HaaS Studio会将此工程下载到设备中，并开始运行
<div align="center">
<img src=./../../图片/1_HaaS_Studio_JS_等待设备重启.png width=70%/>
</div>

&emsp;&emsp;
脚本下载过程如下图所示，下载完成后会提示“put complite!”。
<div align="center">
<img src=./../../图片/1_烧录完成_JS.png width=30%/>
</div>

&emsp;&emsp;
更新完成后，会在 .vscode 文件下生成“update.json”文件（如下图所示），文件记录了当前烧录模式及串口配置信息。后续更新操作会使用该文件里面的内容作为配置。

# 常见问题
&emsp;&emsp;
如果用USB和HaaS600设备连接之后系统更没有发现新的串口，则需要手动安装串口驱动，Windows下需要安装[串口驱动](http://www.wch.cn/downloads/CH343SER_ZIP.html?spm=a2c4g.11186623.0.0.1c0811d1q4LqWB)。MAC和Ubuntu一般不需要安装驱动即可识别串口。

&emsp;&emsp;
MacOS下HaaS600 EC600S推送脚本过程中，HaaS Studio烧录脚本如果报如下错误：
```log
device type: ymodem
generating app package...
Wait shakehand with board ...
Please reboot board now
Putting: ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 0/3
/snapshot/amp-clitools/src/local/ymodem.js:104
          throw('timeout');
          ^
timeout
```

&emsp;&emsp;
原因是MacOS上串口驱动对EC600S的串口芯片支持的不好，需要使用额外的TTY转USB模块接出串口，按照下面的连线方式将额外的TTY转USB模块连接到电脑之后再尝试烧录脚本。
<div align="center">
<img src=./../../图片/1_HaaS_Studio_HaaS600_MACOS连线图.png width=100%/>
</div>