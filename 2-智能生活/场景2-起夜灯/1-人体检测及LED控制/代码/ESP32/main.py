# -*- coding: UTF-8 -*-
import utime                     # 延时API所在组件
import ir
from driver import GPIO          # GPIO类，用于控制微处理器的输入输出功能

gpioirDev = 0
gpioledDev = 0
irDev = 0

def human_check_init():
    global gpioirDev,gpioledDev,irDev

    gpioirDev = GPIO()
    gpioirDev.open("ir")
    irDev = ir.IR(gpioirDev)

    gpioledDev = GPIO()
    gpioledDev.open("led")

def led_control(on):
    global gpioledDev
    if on == 0:
        gpioledDev.write(0)        # GPIO写入0，灭灯
    else:
        gpioledDev.write(1)        # GPIO写入1，亮灯

def human_detector() :
    global gpioirDev,gpioledDev,irDev

    while True :
        human_status = irDev.irDetect()   # 获取传感器的值
        print("human status ",human_status)
        if (human_status == 1) :
            print("human is here .....\r\n")
        led_control(human_status)         # 控制LED亮灭
        utime.sleep_ms(1000)            # 休眠1秒
    gpioirDev.close()
    gpioledDev.close()

if __name__ == '__main__' :
    human_check_init()
    human_detector()
