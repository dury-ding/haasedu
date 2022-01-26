
import utime
import ap3216c
from driver import I2C

# ap3216c光照传感器初始化
def ap3216c_init():
    global ap3216cDev
    i2cDev = I2C()
    i2cDev.open("ap3216c")

    ap3216cDev = ap3216c.AP3216C(i2cDev)
    print("ap3216c init finished")

# ap3216c光照传感器亮度获取
def ap3216c_light():
    global ap3216cDev,lightness
    lightness = ap3216cDev.getIlluminance()

# 关闭ap3216c光照传感器
def ap3216c_close():
    global ap3216cDev
    i2cDev.close()
    del ap3216cDev

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

    ap3216c_init()
    while True:          
        ap3216c_light()
        show_lightness()
        utime.sleep(1.5)

if __name__ == '__main__':
    main()