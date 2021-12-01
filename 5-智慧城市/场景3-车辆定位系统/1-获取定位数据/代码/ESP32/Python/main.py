from driver import UART
import utime
import gnss


uartDev = 0
gnssDev = 0

def gnssInit():
    global gnssDev,uartDev
    # 初始化定位模组串口
    uartDev = UART()
    uartDev.open('gnss')
    # 创建定位信息解析器
    gnssDev = gnss.Gnss(uartDev)

def getGnssLocation():
    global gnssDev,uartDev
    # 连续从串口种读取信息
    while True:
        # 串口读取定位模块语句
        location = gnssDev.getLocation()      
        print(location.longitude, location.latitude, location.altitude)
        utime.sleep(2)
    uartDev.close()

# 主程序入口
if __name__ == '__main__':
    gnssInit()
    getGnssLocation()
