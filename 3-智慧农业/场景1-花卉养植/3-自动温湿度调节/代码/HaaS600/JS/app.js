// app.js
var i2c = require('i2c');
// app.js
var iot = require('iot');
var network = require('network');
var gpio = require('gpio');

var airconditionerState = 0         // 空调状态变量
var humidifierState = 0             // 加湿器状态变量

var blueLed = gpio.open({           // 打开控制蓝色LED的GPIO
  id: 'BLUE_LED'
});
var greenLed = gpio.open({          // 打开控制绿色LED的GPIO
  id: 'GREEN_LED'
});

var sht3x = i2c.open({              // 打开SHT3X-DIS传感器
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

function uploadData(iotdev) {
  // 获取云端下发的消息
  iotdev.onService(function(service) {
    console.log('received cloud service id ' + service.service_id);
    console.log('received cloud service param  ' + service.params);
    console.log('received cloud service param len  ' + service.params_len);
  });
 
  // 云端收到上报下发的消息
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
 
  // 每一秒钟上报温湿度数据
  setInterval(function () {
   var data = sht3xRead();
   var temp = data[0]
   var humi = data[1]
   var prop = JSON.stringify({
     CurrentHumidity: humi,
     CurrentTemperature: temp,
   });
   console.log('humi: ' + humi + ' ' + 'temp: ' + temp);
   console.log('reporting ' + prop + ' to cloud');
   // 上报数据到云端
   iotdev.postProps(prop);
  }, 1000);
 }
 
 function iotDeviceCreate() {
  const productKey = '产品密钥';     //请输入您的pk
  const deviceName = '设备名称';    //请输入您的dn
  const deviceSecret = '设备密钥';   //请输入您的ds
 
  // 初始化IoT连接
  let iotdev = iot.device({
      productKey: productKey,
      deviceName: deviceName,
      deviceSecret: deviceSecret
  });
 
  // IoT连接成功
  iotdev.on('connect', function () {
      console.log('success connect to aliyun iot server');
      // 上报数据
      uploadData(iotdev);
  });
 
  // IoT重新连接
  iotdev.on('reconnect', function () {
      console.log('success reconnect to aliyun iot server');
  });
 
  // IoT断开连接
  iotdev.on('disconnect', function () {
      console.log('aliyun iot server disconnected');
  });
 }
 
 var networkClient = network.openNetWorkClient();
 
 var netStatus = networkClient.getStatus();                   // 获取网络连接状态
  
 if (netStatus == 'connect') {
     console.log('network connected, create iot connection');
     iotDeviceCreate();                                       // 网络连接成功后，连接物联网平台
 } else {
     // 如果网络当前连线状态为未联网状态则注册连接成功的回调函数，一旦连接成功则连接物联网平台
     networkClient.on('connect', function() {                 
         console.log('network connected, create iot connection');
         iotDeviceCreate();
     });
 }
