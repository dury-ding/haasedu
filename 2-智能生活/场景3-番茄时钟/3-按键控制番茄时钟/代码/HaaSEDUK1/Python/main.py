# -*- coding: UTF-8 -*-
import utime
import sh1106                    # SH1106 OLED驱动
from driver import SPI           # SPI API
from driver import GPIO          # GPIO API


from aliyunIoT import Device     # aliyunIoT组件是连接阿里云物联网平台的组件
import netmgr as nm              # Wi-Fi网络管理模块
import ujson                     # json字符串解析模块
import framebuf                  # framebuf基类，用于设置字体库

# Wi-Fi SSID和Password设置
wifiSsid = "请输入您的路由器名称"
wifiPassword = "请输入您的路由器密码"

# 物联网平台相关的key和serect定义
productKey     = "产品密钥"
deviceName     = "设备名称"
deviceSecret   = "设备密钥"

device = None
# 物联网平台连接标志位
iot_connected = False

# 等待Wi-Fi成功连接到路由器
def get_wifi_status():
    nm.init()
    nm.disconnect()

    wifi_connected = nm.getStatus()
    print("start to connect " + wifiSsid)
    nm.connect(wifiSsid, wifiPassword)       # 连接到指定的路由器（路由器名称为wifiSsid, 密码为：wifiPassword）

    while True :
        if wifi_connected == 5:               # nm.getStatus()返回5代表连线成功
            break
        else:
            wifi_connected = nm.getStatus() # 获取Wi-Fi连接路由器的状态信息
            utime.sleep(0.5)
            print("wifi_connected: " + str(wifi_connected))

    print("Wi-Fi connected")
    print('DeviceIP:' + nm.getInfo()['ip'])  # 打印Wi-Fi的IP地址信息

# 物联网平台连接成功的回调函数
def on_connect(data):
    global iot_connected
    iot_connected = True

def on_props(request):
    pass

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

    # 配置收到云端属性控制指令的回调函数，如果收到物联网平台发送的属性控制消息，则调用on_props函数
    device.on(Device.ON_PROPS, on_props)

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


def report_fq_count():
    # 生成上报到物联网平台的属性值字串
    global fqcount 
    upload_data = {'params': ujson.dumps({
        'fq_count': fqcount,
    })}
    # 上传番茄数到物联网平台
    device.postProps(upload_data)

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
def oledShowText(text, x, y, color, clear,sz):
    global oled
    if clear:
        oled.fill(0) # 清屏    
    oled.text(text, x, y, color,size=sz)
    oled.show()

# 番茄时钟 OLED显示，每一秒刷一次
def down_time():
    global downtime_flag,time_d,fqcount 

    if time_d[4] > 0x30:
        time_d[4]=time_d[4]-1
    else:
        time_d[4] = 0x39
        if time_d[3] > 0x30:
            time_d[3] = time_d[3]-1
        else:
            time_d[3] = 0x35
            if time_d[1] > 0x30:
                time_d[1] = time_d[1]-1
            else:
                time_d[1] = 0x39
                if time_d[0] > 0x30:
                    time_d[0] = time_d[0] -1
                else:
                    time_d[0] = 0x30
                    time_d[1] = 0x30
                    time_d[3] = 0x30
                    time_d[4] = 0x30                     
                    downtime_flag = 2
    data_time = bytes(time_d)   
    oledShowText(data_time,28,15,1,True,32)
    if downtime_flag == 2:
        fqcount = fqcount + 1 # 记录总的番茄数存入kv中
        report_fq_count()
        oledShowText(data_time,35,10,1,True,32)
        oledShowText("番茄",3,1,1,False,12)
        oledShowText("时钟",3,16,1,False,12)
        oledShowText("结束",60,43,1,False,16)

# 通过按键启动或暂停番茄时钟
def key_Press(obj):
    global keypress_flag,downtime_flag,time_d
    if keypress_flag == 9:
        keypress_flag = 0  #系统复位时，默认进入一次
    elif keypress_flag == 1:
        keypress_flag = 0
        if downtime_flag == 2:
            downtime_flag = 1
            time_d = [0x32,0x35,0x3a,0x30,0x30]
        else:
            downtime_flag = 0
            data_time = bytes(time_d)
            oledShowText(data_time,35,10,1,True,32)
            oledShowText("番茄", 3, 1, 1, False, 12)
            oledShowText("时钟", 3, 16, 1, False, 12)
            oledShowText("结束", 60, 43, 1, False, 16)
    else:
        keypress_flag = 1
        downtime_flag = 1
        time_d = [0x32,0x35,0x3a,0x30,0x30]
    print('downtime_flag',downtime_flag,'keypress_flag',keypress_flag)

# 按键初始化
def keyInit():
    gpio = GPIO()
    gpio.open("KEY_4")
    gpio.on(key_Press)

def main():
    global downtime_flag,keypress_flag,time_d,fqcount
    downtime_flag = 0 #番茄倒计时状态 0-未开始 1-倒计时开始 2-倒计时间到
    keypress_flag = 9 #消除按键初始化时默认进入一次
    time_d = [0x32, 0x35, 0x3a, 0x30, 0x30] # 倒计时 25:00
    fqcount = 0 # 从kv中获取记录总的番茄数
    oledInit()
    keyInit()
 
    oledShowText("网络连接中", 10, 20, 1, True, 16)
    get_wifi_status()
    oledShowText("网络连接成功", 10, 20, 1, True, 16)
 
    data_time = bytes(time_d)
    oledShowText("番茄", 3, 1, 1, True, 12)
    oledShowText("时钟", 3, 16, 1, False, 12)
    oledShowText(data_time, 35, 10, 1, False, 32)
    oledShowText("开始", 60, 43, 1, False, 16)
    while True:          
        while downtime_flag == 1:
            down_time()
            utime.sleep(1)

if __name__ == '__main__':
    main()
