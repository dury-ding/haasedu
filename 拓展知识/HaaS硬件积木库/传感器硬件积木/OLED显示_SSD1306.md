> **学习物联网，来HaaSEDU就对了**

# OLED显示SSD1306模块

## 一、产品简介

<br>
@曼索帮忙补充

<div align="center">
<img src=./../../../图片/ext_oled屏幕ssd1306_示意图.png  width=100%/>
</div>

<br>

## 二、技术参数
<br>
@曼索帮忙补充


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
<br>
@曼索帮忙补充


## 参考文献
<br>
@曼索帮忙补充

