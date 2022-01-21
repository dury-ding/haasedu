#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File       :    main.py
@Description:    读取温湿度信息
@Author     :    ethan.lcz
@version    :    1.0
'''

import utime                          # 延时API所在组件
from driver import I2C               # I2C总线驱动库
from haaseduk1 import HAASEDUK1      # 引入haaseduk1库，目标用于区分K1版本

board = HAASEDUK1()                  # 新建HAASEDUK1对象
hwID = board.getHWID()               # 获取开发板ID
i2cObj = I2C()

if (hwID == 1):
    from cht8305 import CHT8305      # HaaS EDU K1C上的温湿度传感器采用的是CHT8305
    i2cObj.open("cht8305")           # 按照board.json中名为"cht8305"的设备节点的配置参数（主设备I2C端口号，从设备地址，总线频率等）初始化I2C类型设备对象
    humitureDev = CHT8305(i2cObj)   # 初始化CHT8305传感器
    # print("cht8305 inited!")
else:
    from si7006 import SI7006        # HaaS EDU K1上的温湿度传感器采用的是SI7006
    i2cObj.open("si7006")            # 按照board.json中名为"si7006"的设备节点的配置参数（主设备I2C端口号，从设备地址，总线频率等）初始化I2C类型设备对象
    humitureDev = SI7006(i2cObj)   # 初始化SI7006传感器
    version = humitureDev.getVer()  # 获取SI7006的版本信息
    chipID = humitureDev.getID()    # 获取SI7006 ID信息
    # print("si7006 version:%d, chipID:%d" , version, chipID)

# 通过温湿度传感器读取温湿度信息
def get_temp_humi():
    temperature = humitureDev.getTemperature()         # 获取温度测量结果
    humidity = humitureDev.getHumidity()               # 获取相对湿度测量结果
    '''
    # 如果需要同时获取温湿度信息，可以呼叫getTempHumidity，实例代码如下:
    humniture = humitureDev.getTempHumidity()          # 获取温湿度传感器测量到的温湿度值
    temperature = humniture[0]                          # getTempHumidity返回的字典中的第一个值为温度值
    humidity = humniture[1]                             # getTempHumidity返回的字典中的第二个值为相对湿度值
    '''
    print("The temperature is: %.1f" % temperature)
    print("The humidity is: %d" % humidity)

    return temperature, humidity                        # 返回读取到的温度值和相对湿度值

if __name__ == '__main__':

    while True:
        data = get_temp_humi()                          # 读取温度信息和相对湿度信息
        utime.sleep(1)                                   # 每隔1秒钟进行一次温湿度信息测量和打印

    i2cObj.close()                                       # 关闭I2C设备对象