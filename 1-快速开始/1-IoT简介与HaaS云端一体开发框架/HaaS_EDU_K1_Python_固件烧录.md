> **学习物联网，来HaaSEDU就对了** 

# HaaS EDU K1固件烧录

&emsp;&emsp;
HaaS EDU K1 是一款专用于教育的开发套件，整体配置的的资源非常丰富。 其内置了高性能MCU-HaaS1000，集成了超大大容量的存储，高达18MB的RAM以及16M的flash，并且支持扩展卡，配备了丰富的外设以及传感器。

&emsp;&emsp;
HaaS EDU K1支持使用C/C++、Python和JavaScript语言进行开发。本节则主要介绍怎样烧录进行Python开发所需要的固件。

<br>

## 固件下载

&emsp;&emsp;
下载[HaaS EDU K1官方固件](https://hli.aliyuncs.com/o/config/HaaS_Python/HaaSPython-HaaSEDUK1.zip)并解压，解压完成后可以看到起目录结构如下：

```bash
├── HaaSPython-HaaSEDUK1-{xxx}.bin   # HaaS Python官方固件，{xxx}为版本号
└── littlefs.bin                     # 文件系统
```

<br>

## PC环境准备
&emsp;&emsp;
将HaaS EDU K1用TypeC数据线和电脑相连。

### Windows系统

&emsp;&emsp;
读者请通过控制面板下的设备管理器，查询当前电脑下HaaS EDU K1插入后新增的端口。下图中显示HaaS EDUK1连接后新增的串口为“COM7”。
> 注意：每台PC的串口可能都不一样，如果有多个串口，可以断开PC和HaaS EDU K1之间的连线，然后将PC和HaaS EDU K1相连，找到新增的那个串口。

![HaaS EDU K1串口示意图](../../图片/1_HaaS_EDU_K1_WINDOWS_COM.png)

&emsp;&emsp;
如果连接HaaS EDU K1之前和之后，没有新增串口，则需要安装HaaS EDU K1的串口驱动，[请点我下载](https://ftdichip.com/drivers/vcp-drivers/)。

<br>

### MAC系统

&emsp;&emsp;
如果您的电脑是MAC系统，系统会自带HaaS EDU K1 UART驱动程序，无需单独安装。可以在命令行中通过如下命令查看HaaS EDU K1接到电脑之前和之后串口列表的差异确认HaaS EDU K1串口名称。

```
# 接入HaaS EDU K1之前
(base) ➜  ~ ls /dev/tty.usb*
zsh: no matches found: /dev/tty.usb*

# 接入HaaS EDU K1之后
(base) ➜  ~ ls /dev/tty.usb*
/dev/tty.usbserial-A908XGRO
```

&emsp;&emsp;
其中接入HaaS EDU K1之后新出现的"/dev/tty.usbserial-A908XGRO"即为HaaS EDU K1所对应的串口。
> 注意：每台PC的串口可能都不一样，上面只是笔者电脑上面的串口信息。

<br>

## 固件烧录过程

&emsp;&emsp;
烧录此固件需使用HaaS-Studio集成开发环境。

1. 点击“快速开始”按钮后选择“烧录工具”按钮。如下图所示。
<div align="center">
<img src=../../图片/1_HaaS_Studio_固件烧录.png width=75%/>
</div>
2. 选择好HaaS EDU K1对应的“串口名字” <br>
3. 选择固件所在路径（上面“固件下载”步骤中解压出来的名为HaaSPython-HaaS-EDU-K1-{xxx}.bin的文件） <br>
4. 选择文件系统所在路径（上面“固件下载”步骤中解压出来的名为lilttlefs.bin的文件） <br>
5. 点击“开始烧录”按钮，HaaS Studio便会将此固件烧录到开发板中，如下图所示。 <br>

> 下图中是笔者电脑中的串口好和固件名称，请读者按照根据串口和固件实际路径进行选择。

> 如果“串口名字”下拉框中没有正确的串口号，可以拔插HaaS EDU K1的USB口后，点击“刷新”按钮刷新串口列表。

<div align="center">
<img src=../../图片/1_HaaS_Studio_固件烧录_HaaS_EDU_K1_开始烧录.png width=75%/>
</div>

&emsp;&emsp;
烧录过程中命令行窗口会输出如下日志，烧录完成，中断日志中会提示"Hash of data verified."。
```log
...
CCCC
<<< 0x43
Packet 0 >>>
<<< 0x6
<<< 0x43
Packet 2656 / 2656 >>>  <<< ACK
File: HaaSPython-HaaSEDUK1-1.0.1.bin
Size: 2718744Bytes
...
CCCC
<<< 0x43
Packet 0 >>>
<<< 0x6
<<< 0x43
Packet 4792 / 4792 >>>  <<< ACK
EOF
>>> EOT
<<< 0x15
>>> EOT
<<< 0x6
<<< 0x43
Packet End >>>
<<< 0x6
File: littlefs.bin
Size: 4907008Bytes
Swap AB partition
```
Burn "[('/Users/xxx/Downloads/HaaSPython-HaaSEDUK1/HaaSPython-HaaSEDUK1-1.0.1.bin', '0'), ('/Users/xxx/Downloads/HaaSPython-HaaSEDUK1/littlefs.bin', '0xB32000')]" success.
<br>

&emsp;&emsp;
如果在烧录的过程中如果命令行中会出现如下提示，请按下HaaS EDU K1上复位按钮(正面屏幕旁边的最小的按钮)重启设备。

```log
"Please reboot the board manually"
```

<br>

## 查看日志

&emsp;&emsp;
烧录完成以后，可以通过串口工具连接设备进入命令行。请读者根据自己的习惯打开串口工具进行日志查看。如果读者没有使用过PC上的串口工具，也可以参考下面的工具说明。 

### Windows系统

&emsp;&emsp;
Windows系统可以使用Putty工具，工具的设定请参考下图：

![Windows系统串口工具截图](../../图片/1_Windows_系统串口工具.png)

<br>

### MAC系统

&emsp;&emsp;
MacOS 推荐使用picocom串口工具。picocom安装命令如下。
```bash
brew install picocom
```


&emsp;&emsp;
此工具只能通过命令行启动，启动命令如下：
```bash
picocom -b 1500000 /dev/cu.usbserial-A908XGRO
```


&emsp;&emsp;
在此工具页面下如果需要退出串口的时候请先按Ctrl+a，再按Ctrl+q。
