> **学习物联网，来HaaSEDU就对了**

# RFID读卡器MFRC522模块

## 一、产品简介
MFRC522是应用于13.56MHz非接触式通信中高集成度的读写卡芯片，一款低电压、低成本、体积小的非接触式读写卡芯片，是智能仪表和便捷式手持设备研发的较好选择。MFRC522利用了先进的调制和解调概念，集成了在13.56MHz下所有类型的被动非接触式通信方式和协议。支持14443A兼容应答器信号。此外，还支持快速CRYPTO1加密算法，用语验证MIFARE系列产品。本模块可直接装入各种读卡器模具。通过SPI接口简单的几条线就可以直接与用户任何CPU主板相连接通信，可以保证模块稳定可靠的工作。

<div align="center">
<img src=./../../../图片/ext_MFRC522_外观图.png  width=100%/>
</div>

<br>

## 二、技术参数
* 工作电压：3.3V<br>
* 工作电流：13～26mA@3.3V<br>
* 空闲电流：10～13mA@3.3V<br>
* 休眠电流：<80uA<br>
* 峰值电流：<30mA<br>
* 工作频率：13.56MHz<br>
* 接口方式：SPI<br>
* 支持的卡类型：mifare1 s50/mifare1 s70/mifare UltraLight/mifare Pro/mifare Desfire<br>
* 环境工作温度：-20～80度<br>
* 环境储存温度：-40～85度<br>
* 环境相对湿度：5%～95%<br>
* 尺寸：40mm * 60mm<br>
  

## 三、软件接口
<br>

### MFRC522(spiObj,sda_gpio,reset_gpio) - 创建MFRC522驱动对象
<br>

* 函数原型

> mfrc522Obj = MFRC522(spiObj,sda_gpio,reset_gpio)

* 参数说明

参数|类型|必选参数？|说明|
|:-:|:-:|:-:|:-|
|spiObj|SPI|是|调用此函数前需确保spiObj对象已经处于open状态|
|sda_gpio|GPIO|是|调用此函数前需确保gpioObj对象已经处于open状态|
|reset_gpio|GPIO|是|调用此函数前需确保gpioObj对象已经处于open状态|

* 返回值

> MFRC522对象成功，返回MFRC522对象；MFRC522对象创建失败，抛出Exception

* 示例代码
```python
from driver import SPI,GPIO  #驱动库
import mfrc522

spiDev = SPI()
spiDev.open("mfrc522")

sda_gpio = GPIO()
sda_gpio.open("mfrc522_sda")
reset_gpio = GPIO()
reset_gpio.open("mfrc522_rst")

mfrc522Dev = mfrc522.MFRC522(spiDev, sda_gpio, reset_gpio)
```

* 输出
```python
mfrc522 inited!
```
</br>

### readCardID() - 获取卡的ID号
<br>

* 函数功能：

> 获取卡的ID号 

* 函数原型： 

> MFRC522.readCardID()

* 参数说明：

> 无

* 返回值：

> 读取到的卡号

* 示例：

```python
from driver import SPI,GPIO  #驱动库
import mfrc522

spiDev = SPI()
spiDev.open("mfrc522")

sda_gpio = GPIO()
sda_gpio.open("mfrc522_sda")
reset_gpio = GPIO()
reset_gpio.open("mfrc522_rst")

mfrc522Dev = mfrc522.MFRC522(spiDev, sda_gpio, reset_gpio)
print("mfrc522 inited!")
id = mfrc522Dev.readCardID()
print("ID:%s" % id) #打印获取到的卡号
```

* 输出
```python
mfrc522 inited!
ID:979024648674
```

</br>

## 四、接口案例

此使用实例在board.json中定义了名为mfrc522的SPI类型的对象。在Python脚本中读取到的卡号的数字并打印在日志中。

* 案例代码
```python
{
    "name": "esp32",
    "version": "1.0.0",
    "io": {
      "mfrc522": {
        "type": "SPI",
        "port": 3,
        "mode": "master",
        "freq": 1000000
      },
      "mfrc522_sda": {
        "type": "GPIO",
        "port": 4,
        "dir": "output"
      },
      "mfrc522_rst": {
        "type": "GPIO",
        "port": 5,
        "dir": "output"
      }
    },
    "debugLevel": "ERROR",
    "repl": "disable"
}
```

```python
from driver import SPI,GPIO
import mfrc522

spiDev = SPI()
spiDev.open("mfrc522")

sda_gpio = GPIO()
sda_gpio.open("mfrc522_sda")
reset_gpio = GPIO()
reset_gpio.open("mfrc522_rst")

mfrc522Dev = mfrc522.MFRC522(spiDev, sda_gpio, reset_gpio)
print("mfrc522 inited!")

while True:
    print("\nHold a tag near the reader")
    id = mfrc522Dev.readCardID()
    print("ID:%s" % id)
```

* 输出
```python
mfrc522 inited!

Hold a tag near the reader
ID:979024648674

Hold a tag near the reader
ID:979024648674
```

## 五、工作原理
 在学习RFID打卡模块时，需要涉及的操作原理主要有两方面。一方面是MFRC522模块的操作原理，即主机要怎样才能操作控制这个模块的问题。另一方面是MFRC522与M1卡之间的通信原理。只有两方面都正确进行了，主机才能通过MFRC522模块和M1卡进行通信。
 ### 1、MFRC522基本原理实现
 #### （1）其SPI接口通信原理：
 主机负责产生(控制)SCK信号-主从机通信时钟，以下是SPI线上操作的时序。
读字节数据：主机写地址---先发要读的数据字节地址的MSB位放到MOSI引脚，直到LSB位发完，SCK=1时RC522模块获取MOSI引脚值作为其中一地址位，SCK=0时RC522准备读下一位地址；
主机读数据---写完地址之后即可开始读MISO引脚数据，先从这个引脚读取电平当做数据的MSB位，SCK = 1时，MISO数据保持不变，SCK = 0时，MISO切换到下一位的值。
写字节数据：也是先串行写目的地址到MOSI引脚，然后同样再串行写数据到MOSI引脚，MSB位为起始发送位。
（通常在51类型的单片机中是用软件来实现SPI的通信时序，我们常把这种方法称为软件模拟SPI方式，但是在ARM这类比较高端的SOC处理器中是集成了SPI硬件控制器的，通常读写SPI外设只需要把地址/数据放到指定的寄存器即可，硬件会自动完成发送）
#### （2）FIFO工作原理：
64字节的FIFO负责缓冲RC522接收(来自主机)和发送的数据。访问FIFO缓冲区主要通过其内部FIFODataReg寄存器，由于主机一次操作只能是读或者是写，FIFO缓冲区中数据要么就是主机写进去的内容，要不就是主机即将读出来的内容—IC卡片发送给RC522模块的数据。相关操作：
FIFO清除----操作FIFOLevelReg寄存器的bit7-FlushBuffer
查看FIFO中数据量----访问FIFOLevelReg寄存器的FIFOLevel段，主机往FIFODataReg写数据时，FIFOLevel自动加1，相反，减1.
主要状态：
空状态警告----FIFO数据空间小于等于WaterLevelReg的WaterLevel值时，Status1Reg的LoAlert置1
满状态警告----FIFO剩余空间小于等于WaterLevelReg的WaterLevel值时，Status1Reg的HiAlert置1

### 2、M1-IC-S50卡工作原理/操作流程：
#### （1）M1卡结构：
共16个扇区，每个扇区4块（块0～3），共64块，按块号编址为0～63。
第0扇区的块0（即绝对地址0块）用于存放厂商代码，已经固化，不可更改。
其他各扇区：
块0、块1、块2为数据块，用于存贮数据；
块3为控制块，存放密码A、存取控制、密码B。
每个扇区的密码和存取控制都是独立的，可以根据实际需要设定各自的密码及存取控制。
注：加密是针对一个扇区来进行的，千万不要理解成对每一个数据块进行加密！！！
#### （2）MFRC522模块与MF-IC卡通信流程：
<div align="center">
<img src=./../../../图片/ext_MFRC522_通信原理.png  width=100%/>
</div>

<br>
(1)M1卡得电复位(RPO:Power-On Restset)，是MFRC522天线发出电磁波导致，意味着有命令REQA过来，称为标准的请求，这种情况是M1卡进入感应区后首次与MFRC522通信。其他情况，M1卡进入休眠状态或之前的操作已经终止，Halt之后被WUPA命令再次唤醒，称为获得所有的请求。获得请求之后M1卡发送回应ATQA码。ATQA是卡的类型码：S50的类型码是0x04，S70的类型码是0x02。
(2)M1卡获得请求后再次获得防冲突命令执行防冲突机制。情景分析：有这么一种情况，一个时刻多张卡同时出现在MFRC522感应区，这时候RC522必须要专一，同时和几张卡发生关系早晚都是要出事的，那么RC522必须要认定其中一张卡。当然事情还要讲究两厢情愿是吧，522问人家了，这就要求M1卡能够主动告知RC522“我就是你的唯一的标识”。于是，事情就变成了这样：RC522获得最先主动告诉它的M1卡的UID，即卡的SN(4Bytes)+校验(1Byte) ，作为下一步选择通信卡的依据，这个SN需要主机从MFRC522中读出来暂时保存。
(3)选卡：在主机控制下MFRC522需要把选卡的命令和上一步获取的卡SN依次发送给M1卡，卡收到信息之后很老实，是选自己的信息就主动返回SAK信息，1Byte，实际上就是卡片的容量。

(4)验证密码：这是极其关键的一步了，里面涉及比较多比较复杂的协议。在PCD选中卡之后，接着主机控制他指出将要访问的存储器位置，然后连同验证密码命令、验证秘钥A|B一起发送给卡，三次密码确认(硬件)成功之后，MFRC522的Status2Reg的Bit_4置位，之后的数据传输都是经过加密的。（对一个扇区一次验证密码成功之后根据控制字的设置可以对该扇区的数据块进行相应读写操作直到执行Halt终止或验证其他扇区的密码，在选择另一扇区时，需要先进行这一扇区密码校验。细心观察上面那幅流程图的箭头也可以发现这个要求）
此外，有一点必须要说明的就是：默认控制下FF07806时A秘钥：不可读出，具有所有权限；B秘钥：可读出，没有任何权限。控制字和秘钥之间的联系，推荐使用这个软件：http://pan.baidu.com/s/1eQuCCvw

(5)存储器操作：最终目的。

数据块写、数据块读：通过向M1卡发送WRITE、READ命令，分别是0xA0、0x30；

数据块增值、数据块减值：通过发M1卡的INCREMENT、DECREMENT指令，分别是0xC1、0xC0；
（写数据块时命令连同数据值一块发送。）

(6)终止卡操作：HALT指令进入终止休眠模式。

(7)数据完整性措施：PCD和PICC之间的数据传输
每个块16位CRC校验、每个字节都有奇偶校验位、位计数检查、位编码区别“1”“0”“无信息”、信道监控。
#### （3）CRC16校验：
MFRC522内部有CRC16协处理器，主机通过软件设置CRC初始值，然后把要发送的数据发送给MFRC522，激活CRC16协处理器后，等待一小会读取CRCResultReg寄存器值即CRC16校验值，然后把这个16位的校验值附加到数据值后再通过MFRC522发送给M1卡片。至于其他校验是硬件自动完成的，我们只需要自己去读取MFRC522的Status1Reg寄存器看检验完成情况，读ErrorReg寄存器就可知道成功与否。

## 参考文献
[1] [MFRC522模块](https://www.cnblogs.com/lubiao/p/4716965.html)<br>

