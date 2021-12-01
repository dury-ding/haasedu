> **学习物联网，来HaaSEDU就对了**

# 温湿度传感器 - SHT3X-DIS

## 一、产品简介
Sensirion SHT3x-DIS湿度和温度传感器基于CMOSens®传感器芯片，更加智能、可靠，精度更高。SHT3x-DIS具有增强的信号处理能力、两个独特的用户可选I2C地址，通信速度高达1MHz。SHT35-DIS的典型相对湿度 (RH) 精度为±1.5%，典型温度精度为±0.2°C。SHT3x-DIS具有2.5mm x 2.5mm x 0.9mm（长x宽x高）占位面积，电源电压范围为2.4V至5.5V。

## 二、技术参数
* 供电电压：2.4V～5.5V
* I2C接口，通信速度高达1MHz，具有两个用户可选地址
* 完全校准、线性化和温度补偿的数字输出
* 启动和测量速度极快
* 湿度精度：0 ~ 100%，精度为±2%RH
* 温度精度：-40度～125度，精度±0.3℃
* 封装：DFN-8，2.5mm * 2.5mm 0.9mm

## 三、软件接口
### SHT3X(i2cObj) - 创建SHT3X驱动对象
* 函数原型：
> sht3xObj = SHT3X(i2cObj)

* 参数说明：

|参数|类型|必选参数？|说明|
|-----|----|:---:|----|
|i2cObj|I2C|是|调用此函数前需确保i2cObj对象已经处于open状态|

* 返回值：
SHT3X对象成功，返回SHT3X对象；SHT3X对象创建失败，抛出Exception

* 示例代码：

```Python
from driver import I2C               # 驱动库
import sht3x                         # SHT3X-DIS温湿度传感器驱动库

# 初始化I2C类型的设备
i2cObj = I2C()
i2cObj.open("sht3x")                 # 按照board.json中名为"sht3x"的设备节点的配置参数（主设备I2C端口号，从设备地址，总线频率等）初始化I2C类型设备对象
print("sht3x inited!")

humitureDev = sht3x.SHT3X(i2cObj)   # 初始化SHT3X-DIS传感器
```

* 输出：
```
sht3x inited!
```

### getTemperature - 测量温度

* 函数功能：
量测周围温度并返回测量结果

* 函数原型：
> SHT3X.getTemperature()

* 参数说明：
无

* 返回值：
成功返回温度测量结果（数据类型：浮点型；单位：摄氏度）；失败抛出Exception

* 示例：

```Python
import I2C
import sht3x

# 初始化I2C类型的设备
i2cObj = I2C()

# 按照board.jsono中名为"sht3x"的I2C类型的设备节点配置（总线频率、从设备地址信息等）打开i2cObj对象
i2cObj.open("sht3x")

humitureDev = sht3x.SHT3X(i2cObj)

temp = humitureDev.getTemperature()
print("temperature is ", temp, "°C")

```

* 输出：
```
temperature is 25.3°C
```

### getHumidity - 测量相对湿度

* 函数功能：
量测周围相对湿度并返回测量结果

* 函数原型：
> SHT3X.getHumidity()

* 参数说明：
无

* 返回值：
成功返回相对湿度测量结果（数据类型：整型；单位：%RH）；失败抛出Exception

* 示例：

```Python
import I2C
import sht3x

# 初始化I2C类型的设备
i2cObj = I2C()
# 按照board.jsono中名为"sht3x"的I2C类型的设备节点配置（总线频率、从设备地址信息等）打开i2cObj对象
i2cObj.open("sht3x")

humitureDev = sht3x.SHT3X(i2cObj)

humi = humitureDev.getHumidity()
print("humidity is ", humi, "%H")

```

* 输出：
```
humidity is 60%H
```

### getTempHumidity - 量测温度相对湿度

* 函数功能：
同时量测周围温度和相对湿度并返回测量结果

* 函数原型：
> SHT3X.getTempHumidity()

* 参数说明：
无

* 返回值：
成功返回温度和相对湿度测量结果（数据类型：数组，[温度值, 相对湿度值]；温度单位：摄氏度；相对湿度单位：%RH）；失败抛出Exception

* 示例：

```Python
import I2C
import sht3x
# 初始化I2C类型的设备
i2cObj = I2C()
# 按照board.jsono中名为"sht3x"的I2C类型的设备节点配置（总线频率、从设备地址信息等）打开i2cObj对象
i2cObj.open("sht3x")

humitureDev = sht3x.SHT3X(i2cObj)

data = humitureDev.getTempHumidity()
print("temperature is ", data[0], "°C")
print("humidity is ", data[1], "%H")
```

* 输出：
```
temperature is 25.3°C
humidity is 60%H
```

## 四、接口案例
此使用实例在board.json中定义了名为sht3x的I2C类型的对象。在Python脚本中周期性的获取温湿度测量结果并打印在日志中。

* 代码：
```Python
# board.json配置：
{
    "name": "board-name",
    "version": "1.0.0",
    "io": {
      "sht3x": {
        "type": "I2C",
        "port": 0,
        "addrWidth": 7,
        "freq": 400000,
        "mode": "master",
        "devAddr": 68
      }
    },
    "debugLevel": "ERROR",
    "repl": "disable"
}

```
```Python
# Python代码
import utime                         # 延时API所在组件
from driver import I2C               # 驱动库
import sht3x                         # SHT3X-DIS温湿度传感器驱动库

i2cObj = I2C()

i2cObj.open("sht3x")                 # 按照board.json中名为"sht3x"的设备节点的配置参数（主设备I2C端口号，从设备地址，总线频率等）初始化I2C类型设备对象
print("sht3x inited!")

humitureDev = sht3x.SHT3X(i2cObj)    # 初始化SHT3X-DIS传感器

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

    i2cObj.close()                                      # 关闭I2C设备对象
```

* 输出：
```Python
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
主控芯片和SHT3X-DIS传感器之间通信所用命令字如下表所示：
|序号|命令字|功能说明|缩写|
|:-:|:-:|:-:|:-|
|1|0x3780|读取芯片序列号|CMD_READ_SERIALNBR|
|2|0xF32D|读取状态寄存器|CMD_READ_STATUS|
|3|0x3041|清除状态寄存器|CMD_CLEAR_STATUS|
|4|0x306D|开启加热功能|CMD_HEATER_ENABLE|
|5|0x3066|关闭加热功能|CMD_HEATER_DISABLE|
|6|0x30A2|软件复位|CMD_SOFT_RESET|
|7|0x2B32|加速响应时间|CMD_ART|
|8|0x3093|停止周期性测量|CMD_BREAK|
|9|0x2400|高频率周期性测量|CMD_MEAS_POLLING_H|
|10|0x240B|中频率周期性测量|CMD_MEAS_POLLING_M|
|11|0x2416|低频率周期性测量|CMD_MEAS_POLLING_L|

实际控制此传感器的流程可参考如下伪代码。 
</br>

* 初始化传感器并开始进行温湿度测量
```
    清除状态寄存器（发送CMD_CLEAR_STATUS）
    等待20ms
    发送周期性测量指令（CMD_MEAS_POLLING_H、CMD_MEAS_POLLING_M或CMD_MEAS_POLLING_L）
    等待20ms
```

* 读取温湿度测量结果
```
    发起I2C读取数据（6个字节）的操作
    将读取到的测量结果转换成实际温室度值
```
读取到的6个字节格式如下表所示：
|字节序号|1|2|3|4|5|6|
|:-:|:-:|:-:|:-|:-|:-|:-|
|意义|温度(高位)|温度(低位)|温度CRC-8校验值||湿度(高位)|湿度(低位)|湿度CRC-8校验值|

转换过程可以使用如下公式：
温度值 = ((data[0]<<8) | data[1]) * 0.0015259022
相对湿度值 = -45.0 + ((data[3]<<8) | data[4]) * 175.0 / (0xFFFF - 1)

* 停止测量
```
    发送停止周期性测量指令字（CMD_BREAK）
```

## 六、工作原理

<div align="center">
<img src=./../../../图片/ext_sht3x-dis_工作原理.png  width=100%/>
</div>


## 参考文献
[1] [SHT3X-DIS温湿度传感器](https://www.mouser.cn/new/sensirion/sensirion-sht3x-dis-sensors/)
