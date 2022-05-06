> **学习物联网，来HaaSEDU就对了** 

# 创建helloworld工程
&emsp;&emsp;
本节主要介绍如何通过HaaS-Studio IDE创建基于HaaS EDU K1的helloworld工程并完成程序下载及运行。

## 硬件连线图
&emsp;&emsp;
本实验只需要一台HaaS EDU K1即可，无需外接其它设备。

## 开发环境

&emsp;&emsp;
在进行下一步之前请确保：
* HaaS-Studio开发环境安装完成。详情请参考[HaaS Studio开发环境安装](./HaaS_Studio_开发环境.md)。

<br>


## 创建helloworld解决方案

&emsp;&emsp;
打开VS Code之后在新建一个基于helloworld的Python案例，硬件类型选择HaaS EDU K1，设定好工程名称及工作区路径之后，点击立即创建，创建一个Python轻应用的解决方案。详细过程请参考[HaaS Studio Python工程开发指南](./HaaS_Studio_Python工程开发指南.md)中“创建工程”的详细说明。

&emsp;&emsp;
helloworld工程中脚本 - main.py内容如下：

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
        print("helloworld")  # 打印"helloworld"字串到console中
        utime.sleep(1)      # 打印完之后休眠1秒
```

<br>

## 推送脚本并运行

&emsp;&emsp;
请参考[HaaS Studio Python工程开发指南](./HaaS_Studio_Python工程开发指南.md)中“推送脚本到设备”的详细说明。

&emsp;&emsp;
推送此脚本到HaaS EDU K1之后，重启设备。系统启动后，打开设备端的串口工具，可以看到设备会周期性的打印如下日志。

```log
...
helloworld
helloworld
helloworld
...
```

