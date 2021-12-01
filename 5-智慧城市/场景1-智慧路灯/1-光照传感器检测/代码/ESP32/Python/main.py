
import utime
import photoresistor
from driver import ADC

adcDev = 0
photoresistorDev = 0

# photoresistor 光敏电阻传感器初始化
def photoresistor_init():
    global photoresistorDev
    
    adcDev = ADC()
    adcDev.open("photoresistor")

    photoresistorDev = photoresistor.PhotoResistor(adcDev)
    print("photoresistor init finished")

# photoresistor 光照传感器亮度获取
def photoresistor_light():
    global photoresistorDev,lightness
    lightness = photoresistorDev.getLightness()
    print("The lightness is: ",lightness)


# 打印显示光照强度
def show_lightness():
    global lightness,i_light

    i_light = int(lightness)
    if i_light < 10:
        T_str = "亮度:" + str(round(i_light, 1))
    elif i_light >= 10 and i_light < 100:
        T_str = "亮度:" + str(round(i_light, 2))
    elif i_light >= 100 and i_light < 1000:
        T_str = "亮度:" + str(round(i_light, 3))
    elif i_light >= 1000 and i_light < 10000:
        T_str = "亮度:" + str(round(i_light, 4))
    print(T_str)

def main():
    global i_light
    i_light = 0

    photoresistor_init()
    while True:          
        photoresistor_light()
        show_lightness()
        utime.sleep(1.5)

if __name__ == '__main__':
    main()