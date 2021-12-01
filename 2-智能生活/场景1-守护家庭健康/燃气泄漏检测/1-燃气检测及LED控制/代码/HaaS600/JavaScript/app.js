/**
 * EC600S模组只有一路ADC：ADC0，电压范围 0 - 1.3V，分辨率 12 bits, 误差± 2%
 * ADC0位号 J8_A0, 开发板有2个100K电阻串联分压，最大电压范围 0 - 2.6V
 * 功能：读取燃气传感器电压，MQ2.js中已经对量测的ADC进行了单位转换，通过MQ2 readValue获取到的电压值即为外部设备输入的实际电压值
 */

var mq2 = require('./mq2.js');          // 获取MQ2燃气传感器驱动模块
var mq2Obj = mq2.open('ADC0');          // 打开MQ2燃气传感器设备
var gpio = require('gpio');
var alarmOn = 0                         // 红色报警灯状态，1代表打开；0代表关闭

var RED_LED = gpio.open({               // 打开红色LED所连接的GPIO，GPIO设定请参考app.json
  id: 'RED_LED'
});

// 每一秒钟打印一次当前燃气传感器的测量结果
setInterval(function() {
    alarmOn = 1 - alarmOn;
    RED_LED.writeValue(alarmOn);                 // 控制LED状态反转
    var voltage = mq2.readValue(mq2Obj);         // 读取燃气传感器测量的电压值
    console.log('gasVoltage: ' + voltage + ' ' + 'alarmOn: ' + alarmOn);  // 打印日志
}, 1000);
 