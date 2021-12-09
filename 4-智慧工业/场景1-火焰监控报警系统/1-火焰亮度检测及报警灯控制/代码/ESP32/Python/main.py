# -*- encoding: utf-8 -*-

import utime                 # 延时API所在组件
from driver import ADC      # ADC类，通过微处理器的ADC模块读取ADC通道输入电压
from driver import GPIO     # GPIO类，用于控制微处理器的输入输出功能
import fire

adcDev = 0                     # ADC通道对象
ledDev = 0                  # 报警LED对象

def alarm_control(on):
    global ledDev

    if on == 0:
        ledDev.write(0)  # GPIO写入0，执行灭灯操作
    else:
        ledDev.write(1)  # GPIO写入 1，执行亮灯报警动作

if __name__ == '__main__':
    global fireDev

    alarm = 0
    # 硬件初始化
    # 初始化 ADC
    adcDev = ADC()
    adcDev.open("fire")
    fireDev = fire.Fire(adcDev)

    # 初始化LED所连接GPIO
    ledDev = GPIO()
    ledDev.open("led")
    

    # 初始化 GPIO
    while True:
        value = fireDev.getVoltage()   # 获取电压值
        print("The fire status Voltage ",value)
        utime.sleep(1)                # 休眠1秒
        alarm = 1 - alarm            # LED输出反转
        alarm_control(alarm)         # 控制LED状态反转
    adcDev.close()
    ledDev.close()

