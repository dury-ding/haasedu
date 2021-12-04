> **学习物联网，来HaaSEDU就对了**

# HaaS轻应用开发 - JavaScript篇

## JavaScript轻应用介绍

&emsp;&emsp;
JavaScript轻应用是指可运行在轻量级嵌入式设备上的JavaScript应用。

&emsp;&emsp;
JavaScript轻应用框架则是包含，集成了JavaScript引擎，封装了底层硬件和服务，对应用层提供API，用于支持轻应用开发的软件框架。

&emsp;&emsp;
JavaScript轻应用有如下特点：
*  轻巧，基于事件驱动的JavaScript轻应用短小精悍，免编译、免烧录。
*  快速，结合阿里云物联网平台，一键完成应用代码热更新。
*  简单，JavaScript API 简洁易懂，大幅降低IoT嵌入式设备应用开发门槛。
*  兼容，轻松移植JavaScript生态软件包，与各类云端业务浑然一体。

<br>

## JavaScript运行原理
<div align="center">
<img src=./../../图片/ext_JavaScript轻应用运行原理.png width=80%/>
</div>

&emsp;&emsp;
如上图所示，简言之，轻应用运行的主要步骤：
* 第一步，将JavaScript文件解析成字符串。
* 第二步，引擎将JavaScript字符串解析成对应可调用的C代码。
* 第三步，通过C代码对底层硬件进行操作，实现具体功能。

&emsp;&emsp;
常见的嵌入式开发主要体现在第三步，轻应用通过前两步对嵌入式做了抽象，开发者无需再去翻阅大量晦涩难懂的协议文档、寄存器手册，无需再编写更多门槛极高的C代码，简洁的几行JavaScript代码就可以快速进行业务开发。

<br>

## 丰富的组件支持
&emsp;&emsp;
轻应用目前支持以下组件，点击超链接即可学习各组件的用法实例：
*  基础组件：
   - [文件系统 FS](https://help.aliyun.com/document_detail/268745.htm?spm=a2c4g.11186623.0.0.356a3a30nBcDlU)
   - [系统信息 SYS](https://help.aliyun.com/document_detail/268744.htm?spm=a2c4g.11186623.0.0.356a3a30nBcDlU)
   - [键值对存储 KV](https://help.aliyun.com/document_detail/268787.htm?spm=a2c4g.11186623.0.0.356a3a30nBcDlU)
   - [电源管理 PM](https://help.aliyun.com/document_detail/268780.htm?spm=a2c4g.11186623.0.0.356a3a30nBcDlU#topic-2088849)
   - [硬件I/O UART](https://help.aliyun.com/document_detail/268752.htm?spm=a2c4g.11186623.0.0.356a69af2UDjEQ)
   - [硬件I/O GPIO](https://help.aliyun.com/document_detail/268755.htm?spm=a2c4g.11186623.0.0.356a69af2UDjEQ)
   - [硬件I/O I2C](https://help.aliyun.com/document_detail/268762.htm?spm=a2c4g.11186623.0.0.356a69af2UDjEQ)
   - [硬件I/O SPI](https://help.aliyun.com/document_detail/268758.htm?spm=a2c4g.11186623.0.0.356a69af2UDjEQ)
   - [模数转换 ADC](https://help.aliyun.com/document_detail/268763.htm?spm=a2c4g.11186623.0.0.356a69af2UDjEQ#topic-2088834)
   - [脉宽调制 PWM](https://help.aliyun.com/document_detail/268764.htm?spm=a2c4g.11186623.0.0.356a69af2UDjEQ)
   - [定时器 TIMER](https://help.aliyun.com/document_detail/268765.htm?spm=a2c4g.11186623.0.0.356a69af2UDjEQ)
   - [实时时钟 RTC](https://help.aliyun.com/document_detail/268766.htm?spm=a2c4g.11186623.0.0.356a69af2UDjEQ)
   - [看门狗 WDG](https://help.aliyun.com/document_detail/268767.htm?spm=a2c4g.11186623.0.0.356a69af2UDjEQ)
   - [4G网络状态](https://help.aliyun.com/document_detail/299147.htm?spm=a2c4g.11186623.0.0.356a69af2UDjEQ#topic-2105011)
   - [网络协议 UDP](https://help.aliyun.com/document_detail/268775.htm?spm=a2c4g.11186623.0.0.356a69af2UDjEQ)
   - [网络协议 TCP](https://help.aliyun.com/document_detail/268776.htm?spm=a2c4g.11186623.0.0.356a69af2UDjEQ)
   - [网络协议 HTTP](https://help.aliyun.com/document_detail/268777.htm?spm=a2c4g.11186623.0.0.356a69af2UDjEQ)
   - [网络协议 MQTT](https://help.aliyun.com/document_detail/268778.htm?spm=a2c4g.11186623.0.0.356a69af2UDjEQ)

*  高级组件：
   - [物联网平台连接组件 - iot](https://help.aliyun.com/document_detail/268790.htm?spm=a2c4g.11186623.0.0.356a69af2UDjEQ#topic-2088853)
   - [物联网平台网关组件 - gateway](https://help.aliyun.com/document_detail/268785.html)
   - [音频播放组件 - audioplayer](https://help.aliyun.com/document_detail/268786.html?spm=a2c4g.11186623.0.0.356d4a9cElri6f)
   - [阿里运营卡组件 smartcard](https://help.aliyun.com/document_detail/268788.html?spm=a2c4g.11186623.0.0.356d4a9cElri6f)


*  还有大量外设驱动库，包括:

```
编码电机/步进电机/伺服电机/继电器
麦克风/语音录放模块/扬声器
PS2摇杆/电容触摸/按键
TFT彩屏/数码管/三色灯
加速度计/陀螺仪/电子罗盘/气压计/磁力计
温湿度/颜色/光照强度
```

<br>

## JavaScript轻应用目录结构

&emsp;&emsp;
一个最精简的轻应用包由最少两个文件组成，必须放在项目文件夹的根目录：

```bash
App/
├── App.js		#业务逻辑入口
└── App.json	#全局配置
```

<br>

### **轻应用入口App.js***

&emsp;&emsp;
入口函数原型：App(Object options)。
App()用于注册轻应用，接受一个Object作为属性，用来配置轻应用的生命周期等。App()必须在App.js中调用，必须调用且只能调用一次。其中options属性如下表options属性所示。

<div align="center">
<img src=./../../图片/ext_JavaScript_option属性.png width=80%/>
</div>

&emsp;&emsp;
App.js参考代码如下：
```js
App({
  onLaunch: function() {
    // 第一次打开
    console.log('App onLaunch');
  },
  onError: function() {
    // 出现错误
    console.log('App onError');
  },
  onExit: function() {
    // 退出轻应用
    console.log('App onExit');
  }
});
```

<br>

### **轻应用全局配置App.json**
&emsp;&emsp;
App.json用于对轻应用进行全局配置，设置页面文件的路径、硬件I/O口的配置等。以下是一个定义了名为D1、D2两个GPIO的基本配置示例：
```json
{
  "version": "0.0.1",
  "io": {
    "D1": {
      "type": "GPIO",
      "port": 31,
      "dir": "output",
      "pull": "pullup"
    },
    "D2": {
      "type": "GPIO",
      "port": 32,
      "dir": "output",
      "pull": "pullup"
    },
  },
  "debugLevel": "DEBUG",
  "repl": "enable"
}
```

&emsp;&emsp;
各配置项说明如下表所示。

<div align="center">
<img src=./../../图片/ext_app_json配置项.png width=80%/>
</div>

<br>

### **JavaScript轻应用开发流程**
&emsp;&emsp;
JavaScript轻应用开发流程如下图JavaScript轻应用开发流程所示：

<div align="center">
<img src=./../../图片/ext_JavaScript轻应用开发流程.png width=80%/>
</div>

&emsp;&emsp;
可以看出，轻应用的开发步骤十分简单：
* 第一步，编写轻应用JavaScript代码
* 第二步，通过轻应用命令行工具，一键打包应用代码并热更新到设备中运行

<br>

### 轻应用与C/C++应用开发对比

<div align="center">
<img src=./../../图片/ext_JavaScript轻应用与C应用开发对比.png width=80%/>
</div>

<br>

### **命令行工具**

&emsp;&emsp;
命令行工具amp（请通过 HaaS官网下载）用于轻应用的辅助开发，以简单的命令行方式运行在MAC或Windows电脑上的工具程序。该命令行工具主要是用来推送应用脚本到设备端，并拥有一套完整的命令，可以完成设备的应用热更新、运维服务、日志服务等。可以在阿里云官网搜索“ HaaS JavaScript轻应用使用文档”找到该工具。

&emsp;&emsp;
amp工具包中内容如下：

```bash
amp-clitools
 ├── dist
 │   └── amp                  # 命令行工具
 │   ├── app                  # 应用脚本
 │   │   └── app.json
 │   └── app.js
 │   └── bindings.node        # 本地更新库
 └── engines                  # 引擎
         └── quickjs
```

&emsp;&emsp;
下面详细介绍此工具包的用法。

<br>

#### **登录 login**
* 参数  
amp login <your-token>
* 说明  
使用在线热更新前，需要获取token（请参考 HaaS官网说明获取token），该命令用于绑定用户，仅需执行一次。使用本地串口更新时，无需执行此命令。
* 示例  
```bash
$ amp login b8****************************0e
```

<br>

#### **列出绑定的设备 device list**
* 参数  
amp device list

* 说明  
在amp login <your-token>成功后，使用该命令可列出您账号下已绑定的设备名称，建议使用IMEI号或其它硬件唯一标识作为设备名称<device-name>。

* 示例  

```bash
$ amp device list
Your bound devices:
8675*******3456
8675*******4321
3522*******7456
```

<br>

#### **在线推送应用热更新到目标设备 put**
* 参数  
amp put <App-dir> <device-name>
  * <App-dir>指存放应用代码的目录，包含配置文件和JavaScript脚本文件。
  * <device_name>指需要推送应用热更新的目标设备，且已存在于绑定列表中。

* 说明  
该命令会消耗网络流量，推送应用到蜂窝模组时请按需使用。

* 示例  

```bash
$ amp device list
Your bound devices:
8675*******3456
$ amp put ./App 8675*******3456
device:8675*******3456 ONLINE.
generate App package
push App package SUCCESS
```

<br>

#### **打包应用 pack**
* 参数  
amp pack <App-dir>

* 说明  
打包<App-dir>目录代码成App.bin。

* 示例  

```bash
$ amp pack ./App
generating App package...
generate App package SUCCESS
```

<br>

#### **列出电脑串口 seriallist**
* 参数  
amp seriallist

* 说明  
列出电脑上的所有串口，确定本地热更新的串口号<serial-port>

* 示例  

```bash
// MacOS
$ amp seriallist
/dev/tty.usbserial-AK08LNMO
/dev/tty.usbserial-AK08LNMM

// Windows OS
$ amp seriallist
COM59
COM60
```

<br>

#### **通过串口推送应用到目标设备 serialput**
* 参数  
amp serialput <App-dir> <serial-port>

* 说明  
推送应用前需确认串口连接正常

* 示例  

```bash
$ amp seriallist
COM59
// 串口以实际情况为准
$ amp serialput ./App COM59
device type: ymodem
generate App package
put complete!
```

<br>

#### **查看版本号 --version**
* 参数  
amp --version

#### **查看帮助 --help**
* 参数  
amp --help

* 说明  
查看amp工具的使用说明文档

* 示例  

```bash
$ ./amp --help
Usage: amp [options]
AliOS Things Mini Program PC CLI tool
Options:
 -V, --version                          output the version number
 -h, --help                             output usage information
Commands:
 login <token>                          login
 device list                             list bind devices
 put <filepath> <deviceName>            upload file to device
 seriallist                               list serial port
 serialput [options] <filepath> <port>       put file to device via serial port
```

<br>

### **应用热更新**

&emsp;&emsp;
不同于传统嵌入式开发流程，轻应用的JavaScript代码在PC端开发完成后，无需编译、链接、固件烧录等繁琐步骤，开发者可直接使用命令行工具动态推送最新的应用到指定设备，这个过程称之为应用热更新，轻应用支持本地串口更新和在线推送应用热更新两种方式。

&emsp;&emsp;
本地串口更新：通过有线方式（串口）对设备的应用进行更新，适用于设备无法联网的环境。

&emsp;&emsp;
在线热更新：通过无线方式（网络）对设备的应用进行更新，尤其适用于设备不在本地或不支持与开发机有线连接的环境。

<br>

### **准备工作**

&emsp;&emsp;
在线热更新：通过无线方式（网络）对设备的应用进行更新，尤其适用于设备不在本地或不支持与开发机有线连接的环境。

&emsp;&emsp;
* 首先，下载命令行工具amp。
* 然后，准备好支持轻应用开发的硬件，如HaaS100，HaaS600等。

&emsp;&emsp;
此外，还需要安装串口工具以便查看日志，串口工具可以使用常见或熟悉的软件。

<br>

#### **本地热更新**

<div align="center">
<img src=./../../图片/ext_JS轻应用_本地串口更新.png width=50%/>
</div>

&emsp;&emsp;
本地热更新与实际的硬件连接强相关，以HaaS600为例，需先让开发板进入本地更新模式（请参考HaaS官网的描述），然后运行amp命令完成本地更新。
* 操作示例：  
```bash
$ ./amp serialput ./App /dev/tty.SLAB_USBtoUART
device type: ymodem
generate App package
put complete!
```

&emsp;&emsp;
其中/dev/tty.SLAB_USBtoUART是实际硬件对应的串口号。

<br>

#### **在线更新**

<div align="center">
<img src=./../../图片/ext_JS轻应用_在线热更新.png width=50%/>
</div>

&emsp;&emsp;
在线热更新通过网络完成应用包的推送，依赖阿里云服务，因此需要提前准备好用于绑定开发者的设备的token（请参考 HaaS官网说明获取token），执行amp login <your-token> 完成用身份绑定。

&emsp;&emsp;
已绑定的设备可以通过amp device list查看。
* 操作示例：  
```bash
$ ./amp login 9da64dd7e367********c02655a8abcd
login success

$ ./amp device list
Your bound devices:
8675*******3456
8675*******4321
3522*******7456

$ ./amp put ./App 8675*******3456
device:8675*******3456 ONLINE.
generate App package
push App package SUCCESS
```

<br>

## JavaScript轻应用开发指南

### **JavaScript语言基础语法**
#### **JavaScript Helloworld**

&emsp;&emsp;
JavaScript Helloworld代码如下：
```js
/* app.js */

// 每隔一秒打印hello world

setInterval(() => {
	console.log('Helloworld')
}, 1000)


/* app.json */

// 硬件资源配置

{
	"version": "1.0.0",
	"io": {
	},
	"debugLevel": "DEBUG"
}
```

<br>

#### **变量**

&emsp;&emsp;
变量是数据的“命名存储”。

&emsp;&emsp;
变量名是大小写英文、数字、$和_的组合，且不能用数字开头。变量名也不能是JavaScript的关键字。

&emsp;&emsp;
在 JavaScript 中创建一个变量，可以使用let/var/const关键字。

&emsp;&emsp;
下面的语句创建（也可以称为"声明"或者"定义"）了一个名称为“message”的变量：
```js
// 关键字const/var/let
// var等价于let，推荐使用let
// const定义的变量，必须带值，不可再变更
var message = 1;
let message = 1;
const message = 1;

// 以var为例
var message; // 变量定义
message = 'Hello'; // 变量赋值
var message = 'Hello!'; // 定义变量，并且赋值
var user = 'John', age = 25, message = 'Hello’; // 在一行中声明多个变量

// 推荐，多行变量声明有点长，但更容易阅读
var user = 'John’; 
var age = 25; 
var message = 'Hello';
```

<br>

#### **数据类型**

&emsp;&emsp;
JavaScript 中有七种基本的数据类型，前六种为基本数据类型，也称为原始类型，而object为复杂数据类型，也称为引用类型。

```
number 数字类型，整数或浮点数，在 ±(253-1) 范围内的整数。
string 字符串类型，一个字符串可以包含0个或多个字符。没有单独的单字符类型。
boolean 布尔类型，true和false
null 用于未知的值，只有一个 null 值的独立类型。
undefined 用于未定义的值，只有一个 undefined 值的独立类型。
symbol 用于唯一的标识符。
object 对象类型，用于更复杂的数据结构，其成员可以是任意类型。
```

<br>

#### **对象类型**
&emsp;&emsp;
除了原始数据类型以外，其它都是对象类型。

&emsp;&emsp;
对象类型与原始类型不同之处在于，原始类型存储的是值，而对象类型其实存储的是地址，或叫指针。

&emsp;&emsp;
当创建一个对象类型并赋值给变量时，系统会在内存中自动分配一片内存空间来存放值，最终变量都存在这里。如：
```js
var message = {
  head: 'this is head',
  payload: 100
}
```

<br>

#### **常用类型操作**

&emsp;&emsp;
对于原始类型来说，除了null都可以用typeof显示正确的类型。
```
ypeof 1 // 'number' 
typeof '1' // 'string' 
typeof undefined // 'undefined' 
typeof true // 'boolean' 
typeof Symbol() // 'symbol'
```

&emsp;&emsp;
typeof对于对象来说，除了函数，都会显示object。
```
ypeof [] // 'object'
typeof {} // 'object' 
typeof console.log // 'function'
```

<br>

### **轻应用的面向对象开发**

&emsp;&emsp;
面向对象编程是一种常见的程序设计思想，在许多编程语言中都有应用。轻应用的编程也一样，把对象作为基本单元，一个对象包含了数据和操作数据的函数，以此来对系统能力和硬件驱动做封装抽象，从而使应用开发能达到低代码、易上手的目标。

&emsp;&emsp;
轻应用的基础组件文件系统FS、系统功能SYS、键值对存储KV、电源管理PM、硬件I/O、网络协议，以及高级组件物联网连接、语音等等大量积木组件，都是以对象形式封装API对上提供接口的。

<br>

### **基于事件驱动的轻应用开发**

&emsp;&emsp;
在实际的轻应用开发中，事件驱动是用得最多的编程模型。

&emsp;&emsp;
事件驱动开发是基于发布-订阅模式进行的，所有能触发事件的对象都是EventEmitter类的实例。

&emsp;&emsp;
一般事件驱动开发会存在两个角色分别是发布者（又称触发器，Emitter）和订阅者（又称监听器，Listener），订阅者订阅自身关注的主题，一旦有发布者发布了相关的主题，订阅者收到相关的信息，并执行相对应的操作。
以代码为例：

```js
const EventEmitter = require('events');        // 引入EventEmitter类
class ExampleEmitter extends EventEmitter {}  // 初始化一个继承Emitter的对象

const exampleEmitter = new ExampleEmitter(); // 初始化一个事件驱动对象实例

// 增加监听器，一旦触发器发布了'event'事件,便执行打印'触发事件'。
exampleEmitter.on('event', () => {
  console.log('触发事件');
});

exampleEmitter.emit('event'); // 增加一个触发器，触发'event'事件。
```

&emsp;&emsp;
EventEmitter类可以在events模块中定义和引出：
```js
const EventEmitter = require('events');
```

<br>

### **轻应用配置详解**
&emsp;&emsp;
JavaScript轻应用通过App.json来详细描述应用与硬件的配置。

<br>

#### **version配置项**
&emsp;&emsp;
version是一个字符串类型的值，由开发者根据应用需求自定义。举例如下：

```json
{
"version": "1.0.0",
... ...
}
```

<br>

#### **io配置项**
&emsp;&emsp;
不同的模组或芯片，各个端口和管脚的功能映射可能是不一样的。

&emsp;&emsp;
轻应用的配置文件App.json中，可将硬件（芯片）的物理端口映射成为统一的应用层逻辑端口。

&emsp;&emsp;
映射的好处是在替换不同的硬件或者芯片时，只需要替换App.json而不用修改应用程序或设备程序，从而便于应用的跨平台运行。

&emsp;&emsp;
IO配置项中有type、port等硬件描述概念，对于每一款硬件（通常是芯片/模组/开发板）该配置文件均可能不同。如下面这段代码所示：
```json
{
  "io": {
   "D1":{
      "type":"GPIO",
      "port":12,
      "dir":"output",
      "pull":"pullup"
    },
    "I2C0":{
      "type":"I2C",
      "port":0,
      "mode":"master",
      "addrWidth":7,
      "devAddr":270,
      "freq":100000
    }
  },
  "debugLevel": "DEBUG"
}
```

&emsp;&emsp;
D1、I2C0：定义对象，后面大括号里面则描述了该对象的类型。定义后可以在 JavaScript 中直接使用。
* type: 描述了该对象的类型，可以是IoT轻应用支持的硬件扩展类型，如GPIO，I2C，ADC等。
* port：描述了该对象的端口，这里需要根据实际硬件连接及芯片的PIN 脚映射关系来填写。
* dir、pull: 是 GPIO类型特有的，用于描述GPIO输出输出及上拉下拉，其他如 ADC 类型则有sampling采样频率这种类型描述。

&emsp;&emsp;
外设type用于描述该对象是什么硬件端口类型，而每一种type也拥有不同的属性字段，如 GPIO与ADC的属性字段是不一样的。

&emsp;&emsp;
下述提供了GPIO、UART、I2C、SPI、ADC、PWM、TIMER等组件的type相关配置供参考。

 * GPIO通用输入输出模块配置

&emsp;&emsp;
一个标准的GPIO配置如下所示。
```json
{
  "io": {
    "D3": {
        "type": "GPIO", 
        "port": 22,
        "dir": "output",
        "pull": "pullup"
    },
  },
  "debugLevel": "DEBUG"
}
```

&emsp;&emsp;
示例项中的含义请参考下面的表格。
<div align="center">
<img src=./../../图片/JS_GPIO配置项.png width=40%/>
</div>

 * UART串口相关配置
&emsp;&emsp;
一个标准的UART配置如下所示。
```json
{
  "io": {
    "UART1":{
      "type":"UART",
      "port":1,
      "dataWidth":3,
      "baudRate":9600,
      "stopBits":1,
      "flowControl":"disable",
      "parity":"none"
    },
  },
  "debugLevel": "DEBUG"
}
```
&emsp;&emsp;
UART示例项中的含义请参考下面的表格。
<div align="center">
<img src=./../../图片/ext_JS_UART配置项.png width=40%/>
</div>

* I2C相关配置
&emsp;&emsp;
一个标准的I2C配置如下所示。
```json
{
  "io": {
    "I2C0":{
      "type":"I2C",
      "port":0,
      "mode":"master",
      "addrWidth":7,
      "devAddr":27,
      "freq":100000
    }
  },
  "debugLevel": "DEBUG"
}
```
&emsp;&emsp;
I2C示例项中的含义请参考下面的表格。
<div align="center">
<img src=./../../图片/ext_JS_I2C配置项.png width=40%/>
</div>

* SPI相关配置
&emsp;&emsp;
一个标准的SPI配置如下所示。
```json
{
  "io": {
    "SPI1":{
      "type":"SPI",
      "port":1,
      "mode":"master",
      "freq":3250000
    }
  },
  "debugLevel": "DEBUG"
}
```
&emsp;&emsp;
I2C示例项中的含义请参考下面的表格。
<div align="center">
<img src=./../../图片/ext_JS_SPI配置项.png width=40%/>
</div>

* ADC相关配置
&emsp;&emsp;
一个标准的ADC配置如下所示。
```json
{
  "io": {
    "voltage": {
        "type": "ADC",
      "port": 1,
      "sampling": 12000000
    }
  },
  "debugLevel": "DEBUG"
}
```
&emsp;&emsp;
ADC示例项中的含义请参考下面的表格。
<div align="center">
<img src=./../../图片/ext_JS_ADC配置项.png width=40%/>
</div>

* PWM相关配置
&emsp;&emsp;
一个标准的PWM配置如下所示。
```json
{
  "io": {
    "PWM1": {
      "type": "PWM",
      "port": 1
    }
  },
  "debugLevel": "DEBUG"
}
```
&emsp;&emsp;
PWM示例项中的含义请参考下面的表格。
<div align="center">
<img src=./../../图片/ext_JS_PWM配置项.png width=40%/>
</div>

* TIMER相关配置
&emsp;&emsp;
一个标准的TIMER配置如下所示。
```json
{
  "io": {
    "TIMER1": {
        "type": "TIMER",
      "port": 1
    }
  },
  "debugLevel": "DEBUG"
}
```
&emsp;&emsp;
TIMER示例项中的含义请参考下面的表格。
<div align="center">
<img src=./../../图片/ext_JS_TIMER配置项.png width=40%/>
</div>

<br>

#### **debugLevel配置项**
&emsp;&emsp;
此配置项用来配置调试日志等级，分为如下几个等级，默认为ERROR。

<div align="center">
<img src=./../../图片/ext_JS_DebugLevel级别.png width=30%/>
</div>

<br>

#### **REPL配置项**
&emsp;&emsp;
配置交互式解释器开关，默认打开。

&emsp;&emsp;
REPL来源于Node.js，类似PC上的终端或Shell，可以在这个“终端”中输入JavaScript代码，即可解释执行。

&emsp;&emsp;
打开这个功能后，一般在硬件平台上通过串口进入REPL。

<div align="center">
<img src=./../../图片/ext_JS_REPL功能控制.png width=30%/>
</div>

<br>

## 基于IDE进行HaaS JavaScript轻应用开发
&emsp;&emsp;
基于HaaS Studio IDE进行JavaScript轻应用开发的请参考[HaaS Studio JavaScript IDE开发说明](../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_JavaScript工程开发指南.md)。
<br>
