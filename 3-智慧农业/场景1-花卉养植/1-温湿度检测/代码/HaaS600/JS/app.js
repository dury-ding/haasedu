// app.js
var i2c = require('i2c');

var sht3x = i2c.open({
  id: 'sht3x',
  success: function () {
    console.log('open SHT3X-DIS success')
  },
  fail: function () {
    console.log('open SHT3X-DIS failed')
  }
});

function sht3xRead() {

  var clearStatus = [0x30, 0x41];
  sht3x.write(clearStatus);             // 清除SHT3X-DIS状态寄存器
  sleepMs(20);                          // 延时是必要步骤，SHT3X-DIS芯片处理I2C数据需要一些时间，连续的两条指令会导致第二条I2C指令发送失败
  var polling = [0x24, 0x0B];
  sht3x.write(polling);                // 进行温度量测
  sleepMs(20);                         // 等待温度量测结束，必要步骤
  var regVal = sht3x.read(6);          // 读取温湿度测量结果
  // console.log(regVal);              // 打印从SHT3X-DIS读回来的值
  var temp = -45.0 + (((regVal[0]<<8) | regVal[1]) * 175.0 / (0xFFFF - 1));  // 按照SHT3X数据手册进行温度换算
  var humi = ((regVal[3]<<8) | regVal[4]) * 0.0015259022 ;                   // 按照SHT3X数据手册进行湿度换算

  return new Array(temp, humi);
}
 // 每一秒钟读取一次温湿度信息
setInterval(function () {
  
  var data = sht3xRead();               // 通过SHT3X-DIS传感器读取环境温湿度值
  var temp = data[0];
  var humi = data[1];
  console.log('humi: ' + humi + ' ' + 'temp: ' + temp);   // 打印温湿度测量结果
 }, 1000);
