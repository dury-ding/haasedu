> **学习物联网，来HaaSEDU就对了**

# OLED显示SSD1306模块

## 一、产品简介
OLED（Organic Light-Emitting Diode)有机发光二极管又称为有机激光显示、OLED显示技术具有自发光的特性、采用非常薄的有机材料涂层、和玻璃基板、当有电流通过时、这些有机材料就会发光、而且OLED显示屏幕可视角大、功耗低、OLED由于同时具备自发光、不需要光源（只是供电不会亮的、驱动程序和接线正确才会点亮）、对比度高、厚度薄视角广、反应速度快、可用于挠曲面板、使用温度范围广、结构及制程等优异之特性、先接触的1286屏都是LCD的、需要背光、功耗较高、而OLED的功耗低、更加适合小系统、由于两者发光材料的不同、在不同的环境中、OLED的显示效果好、模块供电可以是3.3V或5V、不需要修改模块电路、OLED屏具有多个控制指令、可以控制OLED的亮度、对比度、开关升压电路等指令、操作方便、功能丰富、可显示汉子、ASCII、图案等、同时为了方便应用在产品上。具体外观尺寸图如下：

<div align="center">
<img src=./../../../图片/ext_ssd1306_外观图.png  width=100%/>
</div>

<br>

## 二、技术参数
* 工作电压：3.3V~5V<br>
* 工作温度：-20~60℃<br>
* 分辨率：128*64<br>
* 接口类型：标准IIC<br>
* 控制芯片：SSD1306<br>
* 显示区域：21.744mm*10.864mm<br>
* 视角方式：全视角<br>
* 亮度: 对比度可以通过程序指令控制<br>


## 三、软件接口
<br>

### SSD1306_I2C(i2cObj) - 创建oled显示驱动对象
<br>

* 函数原型

> oledObj = SSD1306_I2C(i2cObj)

* 参数说明

参数|类型|必选参数？|说明|
|:-:|:-:|:-:|:-|
|i2cObj|I2C|是|调用此函数前需确保i2cObj对象已经处于open状态|

* 返回值

> SSD1306_I2C对象成功，返回SSD1306_I2C对象；SSD1306_I2C对象创建失败，抛出Exception

* 示例代码
```python
from driver import I2C
from ssd1306 import SSD1306_I2C
import utime

#初始化相关模块
i2cObj = I2C()

i2cObj.open("ssd1306")
print("ssd1306 inited!")
oled = SSD1306_I2C(128, 64, i2cObj)
```

* 输出
```python
ssd1306 inited!
```
</br>

### show() - 屏幕显示控制
<br>

* 函数功能：

> 屏幕显示控制

* 函数原型： 

> oledObj.show()

* 参数说明：

> 无

* 返回值：

> 无

* 重要提示
> 使用show之前需要填入显示的信息格式

* oledObj.fill(status)

参数|类型|必选参数？|说明|
|:-:|:-:|:-:|:-|
|status|bool|是|status - 0(缓存区清屏显示) <br> status - 1(缓存区满屏显示)|

* oledObj.text(data,y,x))

参数|类型|必选参数？|说明|
|:-:|:-:|:-:|:-|
|data|string|是|需要显示的内容|
|y|number|是|内容显示在y坐标位置|
|x|number|是|内容显示在x坐标位置|

* 示例：

```python
from driver import I2C
from ssd1306 import SSD1306_I2C
import utime

#初始化相关模块
i2cObj = I2C()
i2cObj.open("ssd1306")
print("ssd1306 inited!")
oled = SSD1306_I2C(128, 64, i2cObj)

oled.fill(0)   #清屏背景黑色
oled.text('HaaSPython', 0, 0)
oled.show()

```

* 输出
```python
ssd1306 inited!
```

</br>

## 四、接口案例

此使用实例在board.json中定义了名为ssd1306的I2C类型的对象。在Python脚本中执行oled屏幕信息显示并打印在日志中。

* 案例代码
```python
{
    "name": "esp32",
    "version": "1.0.0",
    "io": {
      "ssd1306": {
        "type": "I2C",
        "port": 0,
        "addrWidth": 7,
        "freq": 400000,
        "mode": "master",
        "devAddr": 60
      }
    },
    "debugLevel": "ERROR",
    "repl": "disable"
  }
  
```

```python
from driver import I2C
from ssd1306 import SSD1306_I2C
import utime

#初始化相关模块
i2cObj = I2C()

i2cObj.open("ssd1306")
print("ssd1306 inited!")
print("-----------------")
oled = SSD1306_I2C(128, 64, i2cObj)
print("-----------------")
temp = 15
while(True):
    if temp >= 60:
        temp = 15  
    oled.fill(0)   #清屏背景黑色
    oled.text('HaaSPython', 0, 0)
    oled.text('Temp test:',0,20)
    temp += 1
    oled.text(str('%.2f'%temp)+' C',0,40) #显示temp,保留2位小数
    oled.show()
    utime.sleep(1)

```

* 输出
```python
ssd1306 inited!
-----------------
-----------------
```

## 五、工作原理
### 1、SSD1306简介
SSD1306是一款带控制器的单片CMOS OLED/PLED驱动，用于OLED点阵图形显示系统。它由128个segment和64个common组成。该集成电路是为普通阴极型OLED面板设计的。

SSD1306内置了对比度控制、显示RAM和振荡器，减少了外部组件的数量和功耗。它有256级亮度控制。数据/命令从通用MCU通过硬件可选的6800/8000串行兼容并行接口，I2C接口或串行外设接口发送。它适用于许多小型便携式应用，如手机子显示器、MP3播放器和计算器等。
### 2、SSD1306引脚
SSD1306单片机接口由8个数据引脚和5个控制引脚组成。不同接口模式下的引脚分配如下表所示。
<div align="center">
<img src=./../../../图片/ext_ssd1306_引脚.png  width=100%/>
</div>

<br>


### 3、SSD1306接口配置
不同的MCU模式可以通过BS[2:0]引脚上的硬件选择来设置。根据原理图可知这款的BS[2:0]=3’b010。设置为I2C驱动。
<div align="center">
<img src=./../../../图片/ext_ssd1306_接口配置1.png  width=100%/>
</div>

<br>


I2C写数据与命令的时序：
<div align="center">
<img src=./../../../图片/ext_ssd1306_接口配置2.png  width=100%/>
</div>

<br>


contorl byte: 8’h40(数据)，8’h00(指令)
关于I2C时序，这里注意几个关键参数就行，其他的都是标准接口：

I2C时钟周期最小为2.5us，即400KHz。
刷新率:
取I2C时钟频率 f I 2 C f_{I^2C} f 
I 
2
 C
​	
 =350KHz。I2C驱动模块系统时钟为4倍I2C时钟频率 f s y s f_{sys} f 
sys
​	
 =1.4MHz。
从触发一次写到写完成大概需要130个系统时钟。
完成一次刷新需要1048次I2C写，其中1024个数据以及24个指令。
所以刷新率为：
f r e f r e s h = f s y s / 130 / 1048 ≈ 10.276 H z f_{refresh} = f_{sys} / 130 / 1048 \approx 10.276Hz
f(refresh)=fsys/130/1048≈10.276Hz
关于配置空间，注意：

显存地址与数据排列
<div align="center">
<img src=./../../../图片/ext_ssd1306_显存地址.png  width=100%/>
</div>

<br>

将整个显示像素点128*64分为8行，127列的8bit数据，数据的低位对应低坐标点。
设置页寻址模式的下列起始地址(00h~0Fh)
设置页面寻址模式的高列起始地址(10h~1Fh)
设置页面寻址方式的页面起始地址(B0h~B7h)

### 1、OLED模块原理图
<div align="center">
<img src=./../../../图片/ext_ssd1306_原理图.png  width=100%/>
</div>

<br>



### 2、OLED模块结构图

<div align="center">
<img src=./../../../图片/ext_ssd1306_结构图.png  width=100%/>
</div>

<br>


### 3、驱动芯片为SSD1306的OLED显示屏裸屏外观：
<div align="center">
<img src=./../../../图片/ext_ssd1306_裸屏外观.png  width=100%/>
</div>

<br>


## 参考文献
[1] [0.96OLED模块显示原理](https://blog.csdn.net/lum250/article/details/121439597)

