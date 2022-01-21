#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File       :    main.py
@Description:    温湿度上云
@Author     :    ethan.lcz
@version    :    1.0
'''
from aliyunIoT import Device      # aliyunIoT组件是连接阿里云物联网平台的组件
import utime                      # 延时API所在组件
from driver import I2C            # I2C总线驱动库
from haaseduk1 import HAASEDUK1   # 引入haaseduk1库，目标用于区分K1和K1C
import netmgr as nm               # netmgr是Wi-Fi网络连接的组件
import ujson                      # json库

# 物联网平台连接标志位
iot_connected = False

# 三元组信息
productKey = "产品密钥"
deviceName = "设备名称"
deviceSecret = "设备密钥"

# 物联网设备实例
device = None

# Wi-Fi SSID和Password设置

wifiSsid = "请填写您的路由器名称"
wifiPassword = "请填写您的路由器密码"

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
    # print("The temperature is: %.1f" % temperature)
    # print("The humidity is: %d" % humidity)

    return temperature, humidity                        # 返回读取到的温度值和相对湿度值

# 等待Wi-Fi成功连接到路由器
def get_wifi_status():
   nm.init()
   wifi_connected = nm.getStatus()
   print("start to connect " , wifiSsid)
   nm.connect(wifiSsid, wifiPassword)       # 连接到指定的路由器（路由器名称为wifiSsid, 密码为：wifiPassword）

   while True :
      if wifi_connected == 5:               # nm.getStatus()返回5代表连线成功
        break
      else:
        wifi_connected = nm.getStatus() # 获取Wi-Fi连接路由器的状态信息
        utime.sleep(0.5)
   # utime.sleep(5)
   print("Wi-Fi connected")
   print('DeviceIP:' + nm.getInfo()['ip'])  # 打印Wi-Fi的IP地址信息

# 物联网平台连接成功的回调函数
def on_connect(data):
    global iot_connected
    iot_connected = True

# 连接物联网平台
def connect_lk(productKey, deviceName, deviceSecret):
    global device, iot_connected
    key_info = {
        'region': 'cn-shanghai',
        'productKey': productKey,
        'deviceName': deviceName,
        'deviceSecret': deviceSecret,
        'keepaliveSec': 60
    }
    # 将三元组信息设置到iot组件中
    device = Device()

    # 设定连接到物联网平台的回调函数，如果连接物联网平台成功，则调用on_connect函数
    device.on(Device.ON_CONNECT, on_connect)

    # 启动连接阿里云物联网平台过程
    device.connect(key_info)

    # 等待设备成功连接到物联网平台
    while(True):
        if iot_connected:
            print('物联网平台连接成功')
            break
        else:
            print('sleep for 1 s')
            utime.sleep(1)

# 上传温度信息和湿度信息到物联网平台
def upload_temperature_and_Humidity():
    global device

    while True:
        data = get_temp_humi()                      # 读取温度信息和湿度信息

        # 生成上报到物联网平台的属性值字串
        prop = ujson.dumps({
            'CurrentTemperature': round(data[0], 1),
            'CurrentHumidity': round(data[1])
            })
        print('uploading data: ', prop)
        
        upload_data = {'params': prop}
        # 上传温度和湿度信息到物联网平台
        device.postProps(upload_data)
        utime.sleep(2)

if __name__ == '__main__':
    # 请替换物联网平台申请到的产品和设备信息,可以参考文章:https://blog.csdn.net/HaaSTech/article/details/114360517
    # global productKey, deviceName, deviceSecret ,on_request, on_play
    get_wifi_status()

    connect_lk(productKey, deviceName, deviceSecret)
    upload_temperature_and_Humidity()

i2cObj.close()
