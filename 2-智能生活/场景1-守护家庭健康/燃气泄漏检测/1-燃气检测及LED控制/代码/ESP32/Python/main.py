#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File       :    main.py
@Description:    燃气检测和报警灯控制
@Author     :    ethan.lcz
@version    :    1.0
'''

import utime                # 延时API所在组件
from driver import ADC      # ADC类，通过微处理器的ADC模块读取ADC通道输入电压
from driver import GPIO     # GPIO类，用于控制微处理器的输入输出功能
import mq2                  # MQ2燃气传感器驱动库

alarmLed = 0               # 报警LED对象
adcObj = 0                 # ADC类型的外设对象

def ledControl(on):
    global alarmLed

    if on == 0:
        alarmLed.write(0)  # GPIO写入0，执行灭灯操作
    else:
        alarmLed.write(1)  # GPIO写入 1，执行亮灯报警动作

if __name__ == '__main__':
    light = 0
    # 硬件初始化
    # 初始化 ADC和MQ2传感器对象
    adcObj = ADC()                 # ADC通道对象
    adcObj.open("mq2")             # 按照board.json中名为"mq2"节点的配置初始化ADC设备对象
    mq2Dev = mq2.MQ2(adcObj)       # 初始化MQ2设备对象

    # 初始化红色LED所连接GPIO
    alarmLed = GPIO()
    alarmLed.open('led')        # LED报警灯使用board.json中名为led的节点中定义的GPIO进行控制

    # 初始化 GPIO
    while True:
        V = mq2Dev.getVoltage()  # 呼叫mq2传感器库提供的getVoltage函数获取电压值，单位：mV
        print ("gasVoltage:", V, " alarmOn:", light)                # 打印电压值和LED等状态
        light = 1 - light        # LED输出反转
        ledControl(light)        # 控制LED状态反转
        utime.sleep(1)           # 休眠1秒

    adcObj.close()
    alarmLed.close()
