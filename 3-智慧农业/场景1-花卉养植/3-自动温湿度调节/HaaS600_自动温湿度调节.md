> **学习物联网，来HaaSEDU就对了**

# HaaS600温湿度上云

## 硬件连线图

&emsp;&emsp;
硬件连线图如下图所示：
<div align="center">
<img src=./../../../图片/3_HaaS600_温湿度测量_硬件连线图_LED.png
 width=100%/>
</div>

&emsp;&emsp;

需要连接两颗LED模拟控制空调和加湿器的开关的功能此处就借助于HaaS600上面外接的蓝色和绿色LED灯，其中：
* 蓝色LED模拟空调的开关
* 绿色LED模拟加湿器的开关

&emsp;&emsp;
根据HaaS600的硬件连线图，可以得知三个LED和GPIO的对应关系如下。所以如果要模拟控制空调打开，则需要打开IO31（蓝色LED）；如需模拟控制加湿器打开，则需要打开IO3（绿色LED）；

<br>

## 代码编辑及讲解

&emsp;&emsp;
本节课程是在[花卉养植之温湿度数据上云](../2-温湿度数据上云/README.md)的基础上进行开发，设备端的工程无需再创建，[JavaScript源代码](./代码/HaaS_600/JavaScript)里的脚本文件复制后覆盖floriture工程根目录下文件，然后完成以下两处代码修改。然后经过2个步骤即可完成设备端功能的开发。

1. **修改设备端三元组**

&emsp;&emsp;
修改humiture工程里main.py中productKey、deviceName和deviceSecret的值为读者创建的物联网设备的三元组信息，如下图所示：

<div align="center">
<img src=./../../../图片/3_温湿度上云_修改设备端三元组信息_JS.png
 width=40%/>
</div>

2. **修改设备端上报温湿度信息所用标识符**

&emsp;&emsp;
humiture工程里app.js中下面的代码实现的是上传温湿度值到云端的功能。其中CurrentTemperature和CurrentHumidity便是温湿度值上报时所用的标识符。
```python
   // 上报数据到云端
   iotdev.postProps(
       JSON.stringify({
           CurrentTemperature: temp,
           CurrentHumidity: humi,
       })
   );
```

&emsp;&emsp;
确保这两个标识符和物联网产品的物模型中属性标识符是一样的，如下图所示：
<div align="center">
<img src=./../../../图片/1_HaaS_EDU_K1_humiture_属性标识符修改.png
 width=40%/>
</div>

&emsp;&emsp;
下面是本节添加的重点代码段落讲解：
* 新增两个变量用来控制空调和加湿器对应的GPIO
```python
# 空调和加湿器状态变量
airconditioner = 0
humidifier = 0
```

* 新增函数处理云端信息并控制GPIO的接口
```python
  iotdev.onProps(function(properity) {
    console.log('received cloud properity param ' + properity.params);
    console.log('received cloud properity param len ' + properity.params_len);
    // 解析云端下发的控制空调和加湿器的指令，并控制空调/加湿器状态
    var obj = JSON.parse(properity.params, function (key, value) {
      if (key == "airconditioner") {
        airconditionerState = value;
        // 设置空调状态
        blueLed.writeValue(airconditionerState);
        console.log((value ? '打开' : '关闭') + ' 空调');
      } else if (key == "humidifier") {
        // 设置加湿器状态
        humidifierState = value;
        greenLed.writeValue(humidifierState);
        console.log((value ? '打开' : '关闭') + ' 加湿器');
      }
    });
    // 上报空调和加湿器状态数据到云端
    iotdev.postProps(
      JSON.stringify({
        airconditioner: airconditionerState,
        humidifier: humidifierState,
    }));
 });
```

* 注册接收到云端控制消息的回调函数
```python
iotdev.onProps(function(properity) {
  ...
}
```

<br>

## 推送脚本到HaaS600并运行

&emsp;&emsp;
推送工程到HaaS600的详细操作步骤请参考[HaaS-Studio JavaScript工程 - 本地更新](../../1-IoT简介与HaaS云端一体开发框架/HaaS_Studio_开发环境.md)。推送此脚本到HaaS600之后，串口会周期性的打印如下日志。其中：
* 当湿度低于50%的时候，云端会下发控制指令打开加湿器（{"humidifier":1}，如下面的日志所示）的指令，收到此指令后蓝色LED会亮起，模拟打开控制加湿器继电器的动作
* 在相对湿度高于70%之后 ，云端安会下发关闭加湿器的指令（{"humidifier":1}，收到此指令后蓝色LED会熄灭，模拟关闭控制加湿器继电器的动作
* 当温度高于28度的时候，云端会下发打开空调({"airconditioner":1})的指令，收到此指令后绿色LED会亮起，模拟打开控制空调继电器的动作
* 当温度低于26度的时候，云端下发关闭空调（{"airconditioner":0}，如下图所示）的指令，收到此指令后绿色LED会熄灭，模拟关闭控制空调继电器的动作

```log
humi: 29.6620128658 temp: 3.058641315958127
reporting {"CurrentHumidity":29.6620128658,"CurrentTemperature":3.058641315958127} to cloud
received cloud properity param {"airconditioner":0}
received cloud properity param len 20
关闭 空调
received cloud properity param {"humidifier":1}
received cloud properity param len 16
打开 加湿器
```
