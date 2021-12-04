> **学习物联网，来HaaSEDU就对了**

# HaaS轻应用开发-Python篇

&emsp;&emsp;
Python在PC端取得的巨大成功是众所周知的。IoT场景如何借力Python生态，如何通过Python这种简单、高效的脚本化语言赋能硬件资源受限的IoT设备研发？这两个问题被IoT行业的头部玩家持续关注，但始终都未能找到一个完美的解决方案。

&emsp;&emsp;
2014年MicroPython诞生，MicroPython是Python3编程语言的精简高效实现，包含了Python基础语法特性和部分最常用的Python库，可以满足IoT应用开发的基本需求。MicroPython最低内存占用只有16K，具备了广泛应用在硬件资源受限的IoT设备上的条件。基于MicroPython使用各种复杂的外设功能只需要少量的代码。正因如此，MicroPython诞生之后，意法半导体、TI、乐鑫等物联网芯片方案的头部厂商积极跟进，完成了芯片层的适配。自此 ，MicroPython硬件生态初具雏形。到现如今，越来越多的芯片原生支持MicroPython，随着树莓派、荔枝派、HaaS等国内外知名开发板宣布全面支持MicroPython，数以十万计的开发者开始学习和使用MicroPython。

&emsp;&emsp;
MicroPython开源项目中主要包含四部分内容：轻量级的Python解释器、开发应用必备的基础库、设备基础能力的适配接口标准以及MicroPython在各种芯片上的硬件适配实现，这四块内容基本可以覆盖大多数IoT设备的最基础开发的需要。但是，IoT场景的需求复杂多样，想要真正实现快速定制和零门槛开发，还需要基于MicroPython官方版本做更多的扩展。HaaS Python轻应用（简称Python轻应用）对MicroPython 做了大量易用性的改造和高级能力的补齐，是目前MicroPython相关开源工程中很受行业认可的长期维护项目。接下来的章节将详细讲述HaaS Python轻应用的架构和编程方式。

<br>

## Python轻应用介绍

&emsp;&emsp;
Python轻应用是阿里云IoT团队最新研发的一套低代码编程框架，兼容MicroPython编程规范，依托HaaS平台软硬件积木提供AI、支付、蓝牙配网、云连接等物联网场景常用的能力，从而解决了物联网应用开发难的问题。有了Python轻应用框架，物联网编程不再局限于专业软件开发人员，一般的技术员也可以快速实现复杂的物联网需求。

<br>

### **Python轻应用的软件架构**

&emsp;&emsp;
Python轻应用是一套端云结合、软硬结合的一站式解决方案，它采用如下图所示的分层架构。


<div align="center">
<img src=./../../图片/ext_python轻应用分层架构.png width=80%/>
</div>

&emsp;&emsp;
从Python轻应用的架构图可以看出，Python轻应用在兼容MicroPython原生编程接口的同时，引入了很多HaaS软件积木和传感器的支持。整体架构自下向上分5层：

* 第一层是硬件层，包括HaaS100、HaaS600、HaaS EDU系列等开发板以及距离、温湿度、光感等数百种传感器。基于这些HaaS硬积木，可以快速搭建开发者的硬件环境。
* 第二层是系统层，目前已经支持AliOS Things和Free RTOS两种操作系统，覆盖绝大多数物联网场景。
* 第三层是软件积木层，这些积木基于C语言实现，对上提供与硬件无关的调用接口，功能层面覆盖云连接、外设控制、AI等IoT场景最常见应用场景。
* 第四层是Python轻应用框架，基于MicroPython引擎打造，兼容MicroPython原生特性和扩展库的基础上新增支持HaaS软硬件积木的高级扩展接口、应用热更新和远程调试功能。Python轻应用框架将复杂的技术细节屏蔽，给开发者提供最简单的开发接口。
* 第五层是云端能力，依靠阿里生态强大的平台能力，提供了支付、云端AI、多媒体资源等行业独有的平台能力。

<br>

### **Python轻应用特点**

&emsp;&emsp;
前文介绍了Python轻应用的分层架构，本节内容将介绍Python轻应用和原生MicroPython相比的差异。
1. 更好的解决数据上云问题  
物联网中最常用的场景是数据上云及远程设备控制，针对这点，Python轻应用提供了简单易用的硬件访问接口及包括Socket，HTTP，HTTPS，Websocket，MQTT及aliyunIoT（连接阿里云物联网平台的SDK）在内的多种网络功能。以下是基于Python轻应用框架实现远程控制HaaS EDK K1 LED灯的例子。可以看出只需要数十行代码就可以完成物联网设备数据上云及远程控制的功能。

```python
# -*- coding: UTF-8 -*-
import iot
import utime
from driver import GPIO
import ujson

productKey     = "产品key"
deviceName     = "设备名称"
deviceSecret   = "设备密钥"

# 初始化aliyunIoT sdk
key_info = {
    'region' : 'cn-shanghai' ,
    'productKey' : productKey,
    'deviceName': deviceName,
    'deviceSecret': deviceSecret,
    'keepaliveSec': 60
}

# 物联网平台连接成功的回调函数
def on_connect(data):
    global iot_connected
    iot_connected = True

# 物联网平台连接成功的回调函数
def on_props(request):
#服务端返回的json转换成dict并获取dict中led状态
    payload = ujson.loads(request['params'])
    state = payload["ledSwitch"]
    gpio = GPIO()
    gpio.open('led1')
    gpio.write(state)
    gpio.close()

def main():
    # 将三元组信息设置到iot组件中
    device = Device()

    # 设定连接到物联网平台的回调函数，如果连接物联网平台成功，则调用on_connect函数
    device.on(Device.ON_CONNECT, on_connect)

    # 配置收到云端属性控制指令的回调函数，如果收到物联网平台发送的属性控制消息，则调用on_props函数
    device.on(Device.ON_PROPS, on_props)

    # 启动连接阿里云物联网平台过程
    device.connect(key_info)
    while True:
            utime.sleep(1)
    device.close()
if __name__ == "__main__":
    main()

```

2. 丰富的垂直解决方案  
HaaS云端解决方案中心包含大量软硬一体应用案例，覆盖连云、控端、AI、UI等IoT设备常见应用。开发者可以基于这些案例快速定制物联网产品。

3. 背靠阿里生态，不止有端，还有云  
Python轻应用不仅仅是一个端上开发框架，它还背靠阿里生态，提供强大的云端能力。除了提供物联网常用的设备管理、远程控制、数据报表、异常预警等能力以外，还提供了支付宝支付能力、天猫精灵语音识别和语义理解能力、达摩院数视觉算法能力及高德地图能力等。

4. 易上手也易精通  
积木化编程接口+跨平台IDE，快速搭建您的物联网应用并一键热部署。精简掉了传统C语言编译、烧录固件等繁琐复杂的调试环节，使得Python轻应用容易上手也容易精通。

5. 完善的技术保障和支持体系  
HaaS开发者钉钉群提供7*24小时技术支持。HaaS供需平台，帮HaaS开发者实现商业链路闭环。每月一次Python轻应用开发者月会，开发者提出的需求和建议通过阿里内部任务系统跟进，并通过HaaS微发布向开发者反馈最新进展。Python轻应用的开发团队还提供了一套详细的编程文档，其中包括如何在不同的HaaS开发板上完成快速上手的文章、最新编程接口的详细介绍及参考用法（其中包括Python轻应用在物联网场景的垂直使用案例），基于这套文档及技术支持体系，开发者只需要一两天就可以学会Python轻应用。

<br>

## Python轻应用开发指南

&emsp;&emsp;
前面讲述了Python轻应用诞生的背景以及Python轻应用的技术框架。本节内容将详细介绍如何基于HaaS EDU K1进行Python轻应用开发。

<br>

### **Python轻应用快速开始**
&emsp;&emsp;
HaaS EDU K1出厂固件默认集成了Python轻应用框架，系统开机以后，用波特率设定为1500000 bps的串口连接EDU K1就可以开始Python轻应用之旅了。 Python轻应用默认支持两种运行模式：交互式和文件执行，在EDU K1 Shell中输入不同的命令可以进入不同的模式。

&emsp;&emsp;
在EDU K1 Shell中输入“python”命令，进入交互模式，进入交互模式以后，可以逐行输入Python代码并通过换行符触发Python解释器执行。如下图所示，输入“python”命令进入了Python交互模式后，再输入一条print("hello-world")代码打印hello-world字串。

<div align="center">
<img src=./../../图片/ext_Python轻应用交互模式.png width=80%/>
</div>

&emsp;&emsp;
读者如果希望批量执行一个或者多个Python文件，应该如何操作呢？可以通过在命令行交互模式(Shell)中输入“python xxx.py”命令进入文件执行模式，解释器将执行xxx.py及xxx.py依赖的其他python文件，目前支持通过两种方式将Python文件存储到EDU K1设备中，第一种方式是将期望执行的Python文件拷贝到sdcard根目录下。第二种方式是通过Python IDE将期望执行的Python文件一键推送到EDU K1上并执行。关于IDE的详细用法，请参考[HaaS Studio Python IDE开发说明](../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_Python工程开发指南.md)。

<br>

### **Python轻应用编程接口介绍**

#### **Python轻应用基础语法**
&emsp;&emsp;
Python轻应用支持了Python3的基础语法，也支持了闭包、异常处理、列表理解、生成器等高级特性。本节内容只介绍本书实验环节涉及到的一些Python基础语法。如果大家希望系统学习python3语法，可以购买相关书籍进行系统学些，也可以参考Micropython官方文档学习。接下来，我们将简单介绍一下Python轻应用中的注释、数据运算、变量声明、函数定义、类定义、模块引用等基础知识。

1.	注释，单行注释用‘#’，多行注释用三个引号包裹  
```
# 用井字符开头的是单行注释
"""
多行字符串用三个引号包裹
"""
```

2.	常见数据类型和运算符  

```python
# 运算符四则运算 +/-/*//
1 + 2       # 3
2 – 1       # 1
1 * 2       # 2
2 / 1       # 1.0 整数相除结果自动转换为浮点数
1 * 2.0     #2.0
1 + 2.0     #2.0

#运算法取模 %
3 % 2       #1

#布尔值、逻辑运算
True
False
not True          # False
not False.        #True
False and True    # False
False or True     # True
0 and 3           # 0
0 or 3            # 3
# 比较运算 == / != / > / < / >= /<= 和C语言Java语言一致

# 字符串类型
# 字符串可以用单引号也可以用双引号
"This is a string"
'This is a string'
"This" + "is a string"                    # “This is a string"
"This is a string"[0]                     # ‘T’
"{0} is a {1}".format("This", "string").  #This is a string

# None是一个对象，不能用’==’判断是否相等，得用is
# 0、空字符串、空列表、空字典、None都是flase，其他值都为True
"Alibaba" is None  # False
None is None      # True
```

3.	变量申明  
```python
# 变量不需要提前声明，变量必须初始化，如果访问为初始化的变量会报异常
var = 1
```

4.	控制语句  
```python
#  for循环，输出 0，1，2
for i in range(2):
    print(i)

#  while循环, 输出 0，1，2
i = 0
while i < 2:
    print(i)
    i +=1# 用def定义函数，例如
def add(a,b):
    return a + b
# 函数调用
add(1,2)
```

5.	类定义
Python原生支持面向对象，Python的类(class)
```python
# 定义类类型
#定义cat类，继承animal
class cat(animal):
eye_num = 2
# 类构造函数，当实例初始化时候被调用
def __init__(self, name):
    self.name = name

# 实例方法，方法的第一个参数总是self，只能被当前实例使用
def say(self):
    print("I am cat, miao!")

# 类方法，可以被类的所有实例共用，第一个参数总数当前类的对象
@classmethod
def get_eye_num(cls):
    return cls.eye_num

#静态方法
@staticmethod
def run():
   return "running"

# 创建实例
kelly = Cat("kelly")
print(kelly.say())

#调用类方法
kelly.get_eye_num()

#调用静态方法
Cat.run()
```

&emsp;&emsp;
这段代码执行结果如下
```log
I am a cat, my name is kelly, miao!
2
grunt

```

6.	模块

```python
import driver
from driver import uart
from driver import uart，i2c
import driver as dr

```

&emsp;&emsp;
Python轻应用编程接口分两部分，第一部分是基础库接口，第二部分是HaaS高级扩展编程接口。

<br>

#### **Python轻应用基础库**

&emsp;&emsp;
Python轻应用基础接口实现了对MicroPython原生接口的完全兼容，这些接口可以满足包括运算、数组、队列、堆、文件、线程等最基础的编程Python需求。Python轻应用基础接口列表见下表。每个模块的详细接口介绍及参考代码请点击超链接查阅接口的详细说明。

|库名称|库说明|超链接|
|:-:|:-|:-:|
|math|数学函数|[点我查看说明](https://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/standard_api/math)|
|ubinascii|二进制/ASCII转换|[点我查看说明](https://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/standard_api/ubinascii)|
|ucollections|容器|[点我查看说明](https://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/standard_api/ucollections)|
|uhashlib|散列算法|[点我查看说明](https://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/standard_api/uhashlib)|
|uio|输入/输出流|[点我查看说明](https://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/standard_api/uio)|
|ujson|JSON编解码|[点我查看说明](https://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/standard_api/json)|
|uos|基础系统操作模块|[点我查看说明](https://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/standard_api/uos)|
|usocket|socket模块|[点我查看说明](https://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/standard_api/usocket)|
|ustruct|打包和解压原始数据类型|[点我查看说明](https://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/standard_api/ustruct)|
|sys|系统相关函数|[点我查看说明](https://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/standard_api/sys)|
|utime|时间相关函数|[点我查看说明](https://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/standard_api/utime)|
|uzlib|zlib解压缩|[点我查看说明](https://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/standard_api/uzlib)|
|_thread|底层多线程|[点我查看说明](https://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/standard_api/_thread)|
|bluetooth|蓝牙BLE功能|[点我查看说明](https://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/standard_api/bluetooth)|


<br>

#### **Python轻应用高级扩展库**

&emsp;&emsp;
Python轻应用扩展接口完成了一些高级功能的易用性封装，例如蓝牙配网、物联网设备管理及机器视觉等。下表罗列了最新版本Python轻应用支持的高级编程库。各模块详细的接口文档和参考代码请点击超链接查阅接口的详细说明。

|库名称|库说明|超链接|
|:-:|:-|:-:|
|aliyunIoT Device|物联网平台设备类功能|[点我查看说明](http://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/haas_extended_api/aliyunIoT/device)|
|aliyunIoT Gateway|物联网平台网关类功能|[点我查看说明](http://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/haas_extended_api/aliyunIoT/gateway)|
|kv|键值对存储系统|[点我查看说明](http://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/haas_extended_api/kv)|
|OSS|阿里云存储服务|[点我查看说明](http://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/haas_extended_api/oss)|
|audio| 音频录制和播放|[点我查看说明](http://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/haas_extended_api/audio)|
|bleNetConfig|蓝牙配网功能|[点我查看说明](http://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/haas_extended_api/bleNetConfig)|
|http|HTTP模块|[点我查看说明](http://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/haas_extended_api/http)|
|modbus|Modbus协议|[点我查看说明](http://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/haas_extended_api/modbus)|
|ulog|log分级打印模块|[点我查看说明](http://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/haas_extended_api/ulog)|
|OTA|Python轻应用在线更新|[点我查看说明](http://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/haas_extended_api/ota)|
|ucamera| 摄像头功能模块|[点我查看说明](http://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/haas_extended_api/ucamera)|
|AI|人工智能功能模块|[点我查看说明](http://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/haas_extended_api/AI)|

&emsp;&emsp;
driver模块是HaaS团队开发的一套更规范的硬件接口控制库，相对于MicroPython官方提供的machine库，driver库屏蔽掉了更多的硬件细节，有统一的硬件接口访问模型，从而更符合高级语言的编程习惯，例如，典型的外设控制函数包括open、read、write、close等。

&emsp;&emsp;
目前driver模块中已支持的硬件接口类及其功能描述见下表，更详细的接口文档和参考代码请点击超链接查阅接口的详细说明。

|库名称|库说明|超链接|
|:-:|:-|:-:|
|UART|通用异步收发传输器|[点我查看说明](https://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/haas_extended_api/driver/uart)|
|GPIO| 控制I/O引脚|[点我查看说明](https://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/haas_extended_api/driver/gpio)|
|ADC| 模拟信号转数字信号|[点我查看说明](https://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/haas_extended_api/driver/adc)|
|PWM|脉冲宽度调制|[点我查看说明](https://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/haas_extended_api/driver/pwm)|
|I2C|I2C协议驱动库|[点我查看说明](https://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/haas_extended_api/driver/i2c)|
|SPI|串行外设接口总线协议(master side)|[点我查看说明](https://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/haas_extended_api/driver/spi)|
|TIMER|硬件定时器|[点我查看说明](http://hli.aliyuncs.com/haas-static/haasapi/index.html#/Python/docs/zh-CN/haas_extended_api/driver/timer)|

&emsp;&emsp;
接下来，本节结合一段通过I2C接口进行数据读写操作的代码介绍一下driver库带来的便捷。以下是Python脚本中的代码：

```python
# coding=utf-8
# This is a sample Python script.
from driver import I2C   # 从driver库中引入I2C类

print("-------------------i2c test--------------------")
i2c = I2C()             # 新建一个I2C类的对象
i2c.open("pca9544")     # 打开名为pca9544设备（设备配置参考board.json配置文件）
regval = bytearray(1)
regval[0] = 0x5         # 变量赋值
print(regval)
ret = i2c.write(regval) # 通过i2c向pca9544写入0x5
print(ret)              # 打印I2C写操作结果
i2c.close()             # 关闭此I2C备
print("-------------------i2c test--------------------")
```

&emsp;&emsp;
board.json为全局配置文件，配置的是硬件接口及硬件设备标识信息，以下代码定义的是一个名为pca9544的I2C类型的从设备，其地址为112，I2C通信频率为100000 bps，和主机通信所用的I2C接口ID为1。

```python
{
    "version": "1.0.0",
    "io": {
      "pca9544": {
        "type": "I2C",
        "port": 1,
        "addrWidth": 7,
        "freq": 100000,
        "mode": "master",
        "devAddr": 112
      }
    },
    "debugLevel": "DEBUG"
  }
```

<br>

## 基于IDE进行HaaS Python轻应用
&emsp;&emsp;
基于HaaS Studio IDE进行Python轻应用开发的请参考[HaaS Studio Python IDE开发说明](../../1-快速开始/1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_Python工程开发指南.md)。