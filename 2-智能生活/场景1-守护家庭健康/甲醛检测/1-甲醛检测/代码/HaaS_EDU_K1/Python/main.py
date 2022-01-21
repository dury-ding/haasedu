# -*- encoding: utf-8 -*-

import hcho
import time                 # 延时API所在组件
from driver import ADC      # ADC类，通过微处理器的ADC模块读取ADC通道输入电压

adcObj = 0                     # ADC通道对象
hchoDev = 0

def hcho_init():
    global adcObj,hchoDev

    adcObj = ADC()
    adcObj.open("hcho")

    hchoDev = hcho.HCHO(adcObj)

def get_hcho_value():
    global hchoDev
    return hchoDev.getPPM()

# 获取甲醛传感器的浓度值并将其打印log
def get_and_show_hcho():
    while True:
        data = get_hcho_value()
        H_str = "Hcho : " + str(round(data,2))+'ppm'
        print('Hcho :' + str(round(data,2)) +'ppm')
        time.sleep(2)


if __name__ == '__main__':
    # 运行此demo之前务必保证模块已经上电5分钟以上
    hcho_init()
    get_and_show_hcho()
