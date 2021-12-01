/**
 * EC600S模组只有一路ADC：ADC0，电压范围 0 - 1.3V，分辨率 12 bits, 误差± 2%
 * ADC0位号 J8_A0, 开发板有2个100K电阻串联分压，最大电压范围 0 - 2.6V
 * 
 * 功能：读取火焰传感器电压
 */

 var ir = require('./nh_ir.js');
 var irObj = ir.open('ADC0');    // 打开ADC0通道，ADC0的ADC端口号及采样频率设定请参考app.json
  
 var gpio = require('gpio');
 var alarmOn = 0
 
 var RED_LED = gpio.open({        // 打开红色LED所连接的GPIO， GPIO设定请参考app.json
   id: 'RED_LED'
 });
 
  setInterval(function() {
     alarmOn = 1 - alarmOn;
     RED_LED.writeValue(alarmOn);                            // 控制LED状态反转
     console.log('fireVoltage: ' + ir.readValue(irObj));     // 打印火焰传感器的测量数据
     console.log('alarmOn: ' + alarmOn);                     // 打印报警灯状态
  }, 500);
  