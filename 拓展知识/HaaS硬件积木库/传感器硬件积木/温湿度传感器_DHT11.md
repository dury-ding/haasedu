> **学习物联网，来HaaSEDU就对了**

# 温湿度传感器 - DHT11

## 一、产品简介
DHT11数字温湿度传感器是一款含有已校准数字信号输出的温湿度复合传感器。它应用专用的数字模块采集技术和温湿度传感技术，确保产品具有极高的可靠性与卓越的长期稳定性。传感器包括一个电阻式感湿元件和一个NTC测温元件，并与一个高性能8位单片机相连接。因此该产品具有品质卓越、超快响应、抗干扰能力强、性价比极高等优点。<br>
每个DHT11传感器都在极为精确的湿度校验室中进行校准。校准系数以程序的形式储存在OTP内存中，传感器内部在检测信号的处理过程中要调用这些校准系数。<br>
传感器单线制串行接口，使系统集成变得简易快捷。再配合我们提供的代码，你可以快速搭建。超小的体积、极低的功耗，信号传输距离可达20米以上，使其成为各类应用甚至最为苛刻的应用场合的最佳选则。<br>
DHT11数字温湿度传感器是数字接口类型，一根DATA就可以完成数据的传输；采用PH2.0接口封装，尺寸是32mm*22mm。
<div align="center">
<img src=./../../../图片/ext_dht11温湿度_定义尺寸.png  width=100%/>
</div>

<br>

## 四、技术参数
### 1、电气特性
VDD=5V，T=25度，除非特殊标注
| 参数 | 条件 |min | typ | max | 单位 |
| :-: | :- | :-: | :-: | :-: | :-: |
|供电| DC| 3 | 5 | 5.5 | V |
|供电电流|测量|0.5| | 2.5|mA|
||平均|0.2||1|mA|
||待机|100||150|uA|
|采样周期|秒|1|||次|
|温度范围(误差±2℃)||0||50|度|
|湿度范围(误差±5%RH)||20||90|%|

>注意：采样周期间隔不得低于1秒钟。

<br>

### 2、性能参数
<div align="center">
<img src=./../../../图片/ext_dht11温湿度_性能指标.png  width=100%/>
</div>

<br>

## 三、软件接口
### DHT11(gpioObj) - 创建DHT11驱动对象
* 函数原型：
> dht11Obj = DHT11(gpioObj)

* 参数说明：

|参数|类型|必选参数？|说明|
|-----|----|:---:|----|
|gpioObj|GPIO|是|调用此函数前需确保gpioObj对象已经处于open状态|

* 返回值：
DHT11对象成功，返回DHT11对象；DHT11对象创建失败，抛出Exception

* 示例代码：

```python
from driver import GPIO             # 驱动库
import dht11                        # DHT11温湿度传感器驱动库

# 初始化GPIO类型的设备
gpioObj = GPIO()
gpioObj.open("dht11")               # 按照board.json中名为"dht11"的设备节点的配置参数（主设备GPIO端口号，输入输出模式，上拉/下拉电阻配置等）初始化GPIO类型设备对象
print("dht11 inited!")

humitureDev = dht11.DHT11(gpioObj)  # 初始化DHT11传感器
```

* 输出：
```log
dht11 inited!
```

### getTemperature - 测量温度

* 函数功能：
量测周围温度并返回测量结果

* 函数原型：
> DHT11.getTemperature()

* 参数说明：
无

* 返回值：
成功返回温度测量结果（数据类型：浮点型；单位：摄氏度）；失败抛出Exception

* 示例：

```python
from driver import GPIO               # 驱动库
import dht11                          # DHT11温湿度传感器驱动库

# 初始化GPIO类型的设备
gpioObj = GPIO()
gpioObj.open("dht11")                 # 按照board.json中名为"dht11"的设备节点的配置参数（主设备GPIO端口号，输入输出模式，上拉/下拉电阻配置等）初始化GPIO类型设备对象

humitureDev = dht11.DHT11(gpioObj)   # 初始化DHT11传感器

temp = humitureDev.getTemperature()
print("temperature is ", temp, "°C")

```

* 输出：
```log
temperature is 25.3°C
```

### getHumidity - 测量相对湿度

* 函数功能：
量测周围相对湿度并返回测量结果

* 函数原型：
> DHT11.getHumidity()

* 参数说明：
无

* 返回值：
成功返回相对湿度测量结果（数据类型：整型；单位：%RH）；失败抛出Exception

* 示例：

```python
from driver import GPIO               # 驱动库
import dht11                          # DHT11温湿度传感器驱动库

# 初始化GPIO类型的设备
gpioObj = GPIO()
gpioObj.open("dht11")                 # 按照board.json中名为"dht11"的设备节点的配置参数（主设备GPIO端口号，输入输出模式，上拉/下拉电阻配置等）初始化GPIO类型设备对象

humitureDev = dht11.DHT11(gpioObj)    # 初始化DHT11传感器

humi = humitureDev.getHumidity()
print("humidity is ", humi, "%H")

```

* 输出：
```log
humidity is 60%H
```

### getTempHumidity - 量测温度相对湿度

* 函数功能：
同时量测周围温度和相对湿度并返回测量结果

* 函数原型：
> DHT11.getTempHumidity()

* 参数说明：
无

* 返回值：
成功返回温度和相对湿度测量结果（数据类型：数组，[温度值, 相对湿度值]；温度单位：摄氏度；相对湿度单位：%RH）；失败抛出Exception

* 示例：

```python
from driver import GPIO               # 驱动库
import dht11                          # DHT11温湿度传感器驱动库

# 初始化GPIO类型的设备
gpioObj = GPIO()
gpioObj.open("dht11")                 # 按照board.json中名为"dht11"的设备节点的配置参数（主设备GPIO端口号，输入输出模式，上拉/下拉电阻配置等）初始化GPIO类型设备对象

humitureDev = dht11.DHT11(gpioObj)    # 初始化DHT11传感器

data = humitureDev.getTempHumidity()
print("temperature is ", data[0], "°C")
print("humidity is ", data[1], "%H")
```

* 输出：
```log
temperature is 25.3°C
humidity is 60%H
```

## 四、接口案例
此使用实例在board.json中定义了名为dht11的GPIO类型的对象。在Python脚本中周期性的获取温湿度测量结果并打印在日志中。

* 代码：
```python
# board.json配置：
{
    "name": "board-name",
    "version": "1.0.0",
    "io": {
      "dht11": {
        "type": "GPIO",
        "port": 33,
        "dir": "output",
        "pull": "pullup"
      }
    },
    "debugLevel": "ERROR",
    "repl": "disable"
}

```
```python
# Python代码
import utime                         # 延时API所在组件
from driver import GPIO               # 驱动库
import dht11                        # DHT11温湿度传感器驱动库

# 初始化GPIO类型的设备
gpioObj = GPIO()
gpioObj.open("dht11")                # 按照board.json中名为"dht11"的设备节点的配置参数（主设备GPIO端口号，从设备地址，总线频率等）初始化GPIO类型设备对象

humitureDev = dht11.DHT11(gpioObj)  # 初始化DHT11传感器

# 通过温湿度传感器读取温湿度信息
def get_temp_humi():
    temperature = humitureDev.getTemperature()         # 获取温度测量结果
    humidity = humitureDev.getHumidity()               # 获取相对湿度测量结果
    '''
    # 如果需要同时获取温湿度信息，可以呼叫getTempHumidity，实例代码如下:
    humniture = humitureDev.getTempHumidity()          # 获取温湿度传感器测量到的温湿度值
    temperature = humniture[0]                         # get_temp_humidity返回的字典中的第一个值为温度值
    humidity = humniture[1]                            # get_temp_humidity返回的字典中的第二个值为相对湿度值
    '''
    print("The temperature is: %.1f" % temperature)
    print("The humidity is: %d" % humidity)

    return temperature, humidity                        # 返回读取到的温度值和相对湿度值

if __name__ == '__main__':

    while True:
        data = get_temp_humi()                          # 读取温度信息和相对湿度信息
        utime.sleep(1)                                  # 每隔1秒钟进行一次温湿度信息测量和打印

    gpioObj.close()                                      # 关闭GPIO设备对象
```

* 输出：
```python
...
The temperature is 25.3°C
The humidity is 60%H
...
The temperature is 25.3°C
The humidity is 60%H
...

```

<br>

## 五、通信协议

如“工作原理”中的说明，主控芯片和DHT11传感器之间采用“单总线数据协议”。但这种协议并非特别通用的协议（I2C/SPI/UART等），一般是通过控制GPIO和系统延时功能来模拟出协议所需要的波形。

比如说，“主机发起开始信号”，可以用如下的逻辑(伪代码)来实现：
```python

主机通过GPIO输出低电平
延时18ms
主机通过GPIO输出高电平
延时20us

```

“主机读取从机发送的数据”逻辑可以通过如下逻辑（读取一个bit的伪代码）来实现：
```python

while (GPIO电平状态为高);

等待35us
读取GPIO电平状态并返回结果

```

<br>

## 六、工作原理
DATA用于微处理器与DHT11之间的通讯和同步，采用单总线数据格式，一次通讯时间4ms左右，数据分小数部分和整数部分，具体格式在下面说明，当前小数部分用于以后扩展，现读出为零，操作流程如下：
一次完整的数据传输为40bit，高位先出。
数据格式：8bit湿度整数数据+8bit湿度小数数据+8bit温度整数数据+8bit温度小数数据+8bit校验和
数据传送正确时校验和数据等于“8bit湿度整数数据+8bit湿度小数数据+8bit温度整数数据+8bit温度小数数据"所得结果的末8位。
用户MCU发送一次开始信号后，DHT11从低功耗模式转换到高速模式，等待主机开始信号结束后，DHT11发送响应信号，送出40bit的数据，并触发一次信号采集，用户可选择读取部分数据，从模式下，DHT11接收到开始信号触发一次温湿度采集，如果没有接收到主机发送开始信号，DHT11不会主动进行温湿度采集，采集数据后转换到低速模式。
通讯过程如下图所示:
<div align="center">
<img src=./../../../图片/ext_dht11工作原理_图1.png  width=100%/>
</div>

总线空闲状态为高电平，主机把总线拉低等待DHT11响应，主机把总线拉低必须大于18ms，保证DHT11能检测到起始信号。DHT11接收到主机的开始信号后，等待主机开始信号结束，然后发送80us低电平响应信号，主机发送开始信号结束后，延时等待20~40us后，读取DHT11的响应信号，主机发送开始信号后，可以切换到输入模式，或者输出高电平均可，总线由上拉电阻拉高。
<div align="center">
<img src=./../../../图片/ext_dht11工作原理_图2.png  width=100%/>
</div>

总线为低电平，说明DHT11发送响应信号，DHT11发送响应信号后，再把总线拉高80us，准备发送数据，每1bit数据都以50us低电平时隙开始，高电平的长短定了数据位是0还是1。格式见下面图示，如果读取响应信号为高电平，则DHT11没有响应，请检查线路是否连接正常，当最后1bit数据传送完毕后，DHT11拉低总线50us，随后总线由上拉电阻拉高进入空闲状态。<br>
数字0信号表示方法如下图所示：
<div align="center">
<img src=./../../../图片/ext_dht11工作原理_图4.png  width=100%/>
</div>

数字1信号表示方法如下图所示：
<div align="center">
<img src=./../../../图片/ext_dht11工作原理_图5.png  width=100%/>
</div>

<br>

## 参考文献
[1] [DHT11温湿度传感器](https://www.dfrobot.com.cn/goods-109.html)

[2] [DHT11工作原理参数特性](http://www.elecfans.com/yuanqijian/sensor/20180316648303_2.html)

