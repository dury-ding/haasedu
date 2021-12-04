> **学习物联网，来HaaSEDU就对了** 

# 创建hellworld工程
&emsp;&emsp;
本节主要介绍如何通过HaaS-Studio IDE创建基于ESP32的hellwoorld工程并完成程序下载及运行。

## 硬件连线图
&emsp;&emsp;
本实验只需要一台ESP32开发板即可，无需外接其它设备。

## 开发环境

&emsp;&emsp;
在进行下一步之前请确保：
* ESP32 HaaS标准固件烧录完成。详情请参考[ESP32固件烧录](./ESP32_固件烧录.md)。

<br>


## 创建helloworld解决方案

&emsp;&emsp;
打开VS Code之后在新建一个基于helloworld的Python案例，硬件类型选择ESP32，设定好工程名称及工作区路径之后，点击立即创建，创建一个Python轻应用的解决方案。详细过程请参考[HaaS Studio Python工程开发指南](./HaaS_Studio_Python工程开发指南.md)中“创建工程”的详细说明。

&emsp;&emsp;
helloworld工程中脚本（main.py）内容如下：

```python
#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File       :    main.py
@Description:    helloworld案例 - 周期性打印"helloworld"到console中
@Author     :    ethan.lcz
@version    :    1.0
'''


import utime   # 延时函数在utime库中

if __name__ == '__main__':
    while True:             # 无限循环
        print("hellworld")  # 打印"helloworld"字串到console中
        utime.sleep(1)      # 打印完之后休眠1秒
```

<br>

## 推送脚本并运行

&emsp;&emsp;
请参考[HaaS Studio Python工程开发指南](./HaaS_Studio_Python工程开发指南.md)中“推送脚本到设备”的详细说明。

&emsp;&emsp;
推送此脚本到ESP32之后，HaaS Studio会自动打开串口工具，并自动执行main.py脚本，此时可以看到设备会周期性的打印如下日志。

```log
...
helloworld
helloworld
helloworld
...
```



