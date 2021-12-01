/**
 * EC600S模组只有一路ADC：ADC0，电压范围 0 - 1.3V，分辨率 12 bits, 误差± 2%
 * ADC0位号 J8_A0, 开发板有2个100K电阻串联分压，最大电压范围 0 - 2.6V
 * 
 * 功能：读取火焰传感器电压，nh_ir.js中已经对量测的ADC进行了单位转换，通过MQ2 readValue获取到的电压值即为外部设备输入的实际电压值
 */

var ir = require('./nh_ir.js');
var irObj = ir.open('ADC0');      // 打开ADC0通道，ADC0的ADC端口号及采样频率设定请参考app.json
 
var gpio = require('gpio');
var alarmOn = 0

var redLED = gpio.open({          // 打开红色LED所连接的GPIO， GPIO设定请参考app.json
  id: 'RED_LED'
});

var iot = require('iot');         // 物联网平台相关操作所用对象
var network = require('network'); // 获取网络状态所用对象

function uploadData(iotdev) {
  // 收到物联网下发的服务调用消息
  iotdev.onService(function(service) {
    console.log('received cloud service id ' + service.service_id);
    console.log('received cloud service param  ' + service.params);
    console.log('received cloud service param len  ' + service.params_len);
  });
 
  // 收到物联网平台下发的属性控制消息
  iotdev.onProps(function(properity) {
    console.log('received cloud properity param ' + properity.params);
    console.log('received cloud properity param len ' + properity.params_len);
    var obj = JSON.parse(properity.params, function (key, value) {
      if (key == "alarmState") {
        alarmOn = value;
        // 设置报警LED状态
        redLED.writeValue(alarmOn);
        console.log((alarmOn ? '打开' : '关闭') + ' 报警灯');
      }
    });
    // 上报报警LED状态数据到物联网平台
    iotdev.postProps(
      JSON.stringify({
        alarmState: alarmOn,
    }));
 });
 
  // 每一秒钟上报一次当前火焰传感器的测量结果到物联网平台
  setInterval(function () {
   var voltage = ir.readValue(irObj);

    console.log('fireVoltage: ' + voltage + ' ' + 'alarmOn: ' + alarmOn);
    // 上报数据到云端
    iotdev.postProps(
       JSON.stringify({
        fireVoltage:voltage,
        alarmState: alarmOn,
       })
    );
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
 
  // IoT连接成功事件的回调函数注册
  iotdev.on('connect', function () {
      console.log('success connect to aliyun iot server');
      // 上报数据
      uploadData(iotdev);
  });
 
  // IoT重新连接成功的回调函数注册
  iotdev.on('reconnect', function () {
      console.log('success reconnect to aliyun iot server');
  });
 
  // IoT断开连接事件的回调函数注册
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