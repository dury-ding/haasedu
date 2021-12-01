#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File       :    main.py
@Description:    读取温湿度信息
@version    :    1.0
'''

import utime                         # 延时API所在组件
from driver import I2C               # 驱动库
import sht3x                         # SHT3X-DIS温湿度传感器驱动库

wlan = None

# 物联网设备实例
device = None

i2cObj = None
humitureDev = None

# 通过温湿度传感器读取温湿度信息
def get_temp_humi():
    temperature = humitureDev.getTemperature()         # 获取温度测量结果
    humidity = humitureDev.getHumidity()               # 获取相对湿度测量结果
    '''
    # 如果需要同时获取温湿度信息，可以呼叫getTempHumidity，实例代码如下:
    humniture = humitureDev.getTempHumidity()          # 获取温湿度传感器测量到的温湿度值
    temperature = humniture[0]                          # get_temp_humidity返回的字典中的第一个值为温度值
    humidity = humniture[1]                             # get_temp_humidity返回的字典中的第二个值为相对湿度值
    '''
    print("The temperature is: %.1f " % temperature)
    print("The humidity is: %d" % humidity)

    return temperature, humidity                        # 返回读取到的温度值和相对湿度值

if __name__ == '__main__':
    # 硬件初始化
    i2cObj = I2C()

    i2cObj.open("sht3x")                 # 按照board.json中名为"sht3x"的设备节点的配置参数（主设备I2C端口号，从设备地址，总线频率等）初始化I2C类型设备对象
    print("sht3x inited!")

    humitureDev = sht3x.SHT3X(i2cObj)   # 初始化SHT3X-DIS传感器

    while True:
        data = get_temp_humi()                          # 读取温度信息和相对湿度信息
        utime.sleep(1)                                   # 每隔1秒钟进行一次温湿度信息测量和打印

    i2cObj.close()                                      # 关闭I2C设备对象