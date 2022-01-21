# -*- coding: UTF-8 -*-
import utime
import sh1106              # SH1106 OLED驱动库
from driver import SPI     # 引入SPI总线库
from driver import GPIO    # 引入GPIO库
import framebuf            # framebuf基类，用于设置字体库

# OLED初始化
def oledInit():
    global oled

    # 字库文件存放于项目目录 font, 注意若用到了中英文字库则都需要放置
    framebuf.set_font_path(framebuf.FONT_HZK12, '/data/font/HZK12')
    framebuf.set_font_path(framebuf.FONT_HZK16, '/data/font/HZK16')
    framebuf.set_font_path(framebuf.FONT_HZK24, '/data/font/HZK24')
    framebuf.set_font_path(framebuf.FONT_HZK32, '/data/font/HZK32')
    framebuf.set_font_path(framebuf.FONT_ASC12_8, '/data/font/ASC12_8')
    framebuf.set_font_path(framebuf.FONT_ASC16_8, '/data/font/ASC16_8')
    framebuf.set_font_path(framebuf.FONT_ASC24_12, '/data/font/ASC24_12')
    framebuf.set_font_path(framebuf.FONT_ASC32_16, '/data/font/ASC32_16')

    oled_spi = SPI()
    oled_spi.open("oled_spi")

    oled_res = GPIO()
    oled_res.open("oled_res")

    oled_dc = GPIO()
    oled_dc.open("oled_dc")

    #oled像素132*64
    oled = sh1106.SH1106_SPI(132, 64, oled_spi, oled_dc, oled_res)

# OLED显示
# text:显示的文本
# x:水平坐标 y:垂直坐标 
# color:颜色
# clear: True-清屏显示 False-不清屏显示
# sz:字体大小
def oledShowText(text, x, y, color, clear, sz):
    global oled
    if clear:
        oled.fill(0) # 清屏    
    oled.text(text, x, y, color, size = sz)
    oled.show()

# 番茄时钟 OLED显示，每一秒刷一次
def down_time():
    global downtime_end,time_d 

    if time_d[4] > 0x30:
        time_d[4] = time_d[4] - 1
    else:
        time_d[4] = 0x39
        if time_d[3] > 0x30:
            time_d[3] = time_d[3] - 1
        else:
            time_d[3] = 0x35
            if time_d[1] > 0x30:
                time_d[1] = time_d[1] - 1
            else:
                time_d[1] = 0x39
                if time_d[0] > 0x30:
                    time_d[0] = time_d[0] - 1
                else:
                    downtime_end = 1
                    time_d[0] = 0x30
                    time_d[1] = 0x30
                    time_d[3] = 0x30
                    time_d[4] = 0x30                     
                    data_time = bytes(time_d) 
                    oledShowText(data_time, 35, 10, 1, True, 32)
                    oledShowText("番茄", 3, 1, 1, False, 12)
                    oledShowText("时钟", 3, 16, 1, False, 12)
                    oledShowText("结束", 60, 43, 1, False, 16)
                    return
    data_time = bytes(time_d)   
    oledShowText(data_time, 28, 15, 1, True, 32)

def main():
    global downtime_end,time_d

    time_d = [0x32, 0x35, 0x3a, 0x30, 0x30] # 倒计时 25:00
    downtime_end = 0
    oledInit()

    # 开始倒数计时，并更新屏幕上面的剩余时间
    while True:  
        if downtime_end == 0:        
            down_time()
        utime.sleep(1)

if __name__ == '__main__':
    main()
