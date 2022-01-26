> **学习物联网，来HaaSEDU就对了**

# 温湿度传感器 - AHT21B

## 一、产品简介
AHT21B是基于AH21开发的集成式温湿度传感器模块，产品内部配有一个全新设计的ASIC专用芯片、一个经过改进的MEMS半导体电容式湿度传感元件和一个标准的片上温度传感元件，PCB板采用沉金工艺，延长产品使用寿命；输出经过标定的数字信号，标准IIC格式，具有免标定、响应速度快、抗干扰能力强、精度高、品质高、稳定性高等特点，性能达到国际水平，是国产替代进口的理想选择。

<div align="center">
<img src=./../../../图片/ext_aht21b_实物图2.png  width=100%/>
</div>


## 二、技术参数
* 供电电压：2～5.5V
* IIC信号接口，最高频率可到400KHz
* 测量范围：温度：-40～120度，湿度：0～100%
* 测量精度：温度：0.3度，湿度：2%RH
* 分辨率：温度：0.01度，湿度：0.024%RH
* 封装：12mm * 12mm * 1mm

## 三、软件接口
### AHT21B(i2cObj) - 创建AHT21B驱动对象
* 函数原型：
> aht21bObj = AHT21B(i2cObj)

* 参数说明：

|参数|类型|必选参数？|说明|
|-----|----|:---:|----|
|i2cObj|I2C|是|调用此函数前需确保i2cObj对象已经处于open状态|

* 返回值：
AHT21B对象成功，返回AHT21B对象；AHT21B对象创建失败，抛出Exception

* 示例代码：

```python
from driver import I2C               # 驱动库
import aht21b                        # AHT21B温湿度传感器驱动库

# 初始化I2C类型的设备
i2cObj = I2C()
i2cObj.open("aht21b")                # 按照board.json中名为"aht21b"的设备节点的配置参数（主设备I2C端口号，从设备地址，总线频率等）初始化I2C类型设备对象
print("aht21b inited!")

humitureDev = aht21b.AHT21B(i2cObj)  # 初始化AHT21B传感器
```

* 输出：
```log
aht21b inited!
```

### getTemperature - 测量温度

* 函数功能：
量测周围温度并返回测量结果

* 函数原型：
> AHT21B.getTemperature()

* 参数说明：
无

* 返回值：
成功返回温度测量结果（数据类型：浮点型；单位：摄氏度）；失败抛出Exception

* 示例：

```python
from driver import I2C               # 驱动库
import aht21b                        # AHT21B温湿度传感器驱动库

# 初始化I2C类型的设备
i2cObj = I2C()
i2cObj.open("aht21b")                # 按照board.json中名为"aht21b"的设备节点的配置参数（主设备I2C端口号，从设备地址，总线频率等）初始化I2C类型设备对象

humitureDev = aht21b.AHT21B(i2cObj)  # 初始化AHT21B传感器

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
> AHT21B.getHumidity()

* 参数说明：
无

* 返回值：
成功返回相对湿度测量结果（数据类型：整型；单位：%RH）；失败抛出Exception

* 示例：

```python
from driver import I2C               # 驱动库
import aht21b                        # AHT21B温湿度传感器驱动库

# 初始化I2C类型的设备
i2cObj = I2C()
i2cObj.open("aht21b")                # 按照board.json中名为"aht21b"的设备节点的配置参数（主设备I2C端口号，从设备地址，总线频率等）初始化I2C类型设备对象

humitureDev = aht21b.AHT21B(i2cObj)  # 初始化AHT21B传感器

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
> AHT21B.getTempHumidity()

* 参数说明：
无

* 返回值：
成功返回温度和相对湿度测量结果（数据类型：数组，[温度值, 相对湿度值]；温度单位：摄氏度；相对湿度单位：%RH）；失败抛出Exception

* 示例：

```python
from driver import I2C               # 驱动库
import aht21b                        # AHT21B温湿度传感器驱动库

# 初始化I2C类型的设备
i2cObj = I2C()
i2cObj.open("aht21b")                # 按照board.json中名为"aht21b"的设备节点的配置参数（主设备I2C端口号，从设备地址，总线频率等）初始化I2C类型设备对象

humitureDev = aht21b.AHT21B(i2cObj)  # 初始化AHT21B传感器

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
此使用实例在board.json中定义了名为aht21b的I2C类型的对象。在Python脚本中周期性的获取温湿度测量结果并打印在日志中。

* 代码：
```python
# board.json配置：
{
    "name": "board-name",
    "version": "1.0.0",
    "io": {
      "aht21b": {
        "type": "I2C",
        "port": 1,
        "addrWidth": 7,
        "freq": 400000,
        "mode": "master",
        "devAddr": 56
      }
    },
    "debugLevel": "ERROR",
    "repl": "disable"
}

```
```python
# Python代码
import utime                         # 延时API所在组件
from driver import I2C               # 驱动库
import aht21b                        # AHT21B温湿度传感器驱动库

# 初始化I2C类型的设备
i2cObj = I2C()
i2cObj.open("aht21b")                # 按照board.json中名为"aht21b"的设备节点的配置参数（主设备I2C端口号，从设备地址，总线频率等）初始化I2C类型设备对象

humitureDev = aht21b.AHT21B(i2cObj)  # 初始化AHT21B传感器

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
主控芯片和AHT21B传感器之间通信所用命令字如下表所示：
|序号|命令字|功能说明|缩写|
|:-:|:-:|:-:|:-|
|1|0xE1|校准指令|AHT21B_CMD_CALIBRATE|
|2|0xAC|触发读取测量结果操作|AHT21B_CMD_TRIGGER|
|3|0xBA|软件复位|AHT21B_CMD_SOFTRESET|



实际控制此传感器的流程可参考如下伪代码。 
</br>

* 初始化传感器
```python
    发起I2C读取创阿奇状态（1个字节）的操作
    IF (not 传感器处于READY状态)
        复位传感器
```

* 读取温湿度测量结果
```python
    发送读取温湿度测量结果指令([AHT21B_CMD_TRIGGER, 0x33, 0x00])
    while (传感器处于BUSY状态):
        等待5ms
    发起I2C读取操作（7个字节）
```
读取到的7个字节格式如下表所示：
|字节序号|1|2|3|4|5|6|7|
|:-:|:-:|:-:|:-|:-|:-|:-|:-|
|意义|传感器状态|湿度(bit12-bit19)|湿度(bit4-bit11)|湿度(bit0-bit3)-温度(bit16-bit19)|温度(bit8-bit15)|温度(bit0-bit7)|温度CRC-8|

转换过程可以使用如下公式：
温度值 = (((data[3] << 16) | (data[4] << 8) | data[5]) & 0xfffff) * 200 /1024 / 1024 - 50
相对湿度值 = (((data[1] << 16) | (data[2] << 8) | data[3]) >> 4) * 100 /1024 / 1024

* 停止测量
```python
    发送停止周期性测量指令（CMD_BREAK）
```

## 六、工作原理

### 1、传感器读取流程
（1）上电后要等待40ms，读取温湿度值之前，首先要看状态字的校准使能位bit[3]是否为1(通过发送0x71可以获取一个字节的状态字)，如果不为1，要发送0xbe命令（初始化），此命令参数有两个字节，第一个字节为0x08，第二个字节为0x00，然后等待10ms。

（2）直接发送0xac命令（触发测量），此命令参数有两个字节，第一个字节为0x33，第二个字节为0x00。

（3）等待80ms待测量完成，如果读取状态字bit[7]为0，表示测量完成，然后可以连续读取六个字节；否则继续等待。

（4）当接收完六个字节后，紧接着下一个字节是CRC校验数据，用户可以根据需要读出，如果接收断需要CRC校验，则在接收完第六个字节后发ACK应答，否则发NACK结束。

（5）计算温湿度值

<div align="center">
<img src=./../../../图片/ext_aht21b_读取1.png  width=100%/>
</div>

<div align="center">
<img src=./../../../图片/ext_aht21b_读取2.png  width=100%/>
</div>


## 参考文献
[1] [AHT21B](https://blog.csdn.net/weixin_45189628/article/details/111110465)
