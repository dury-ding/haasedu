/**
 * EC600S模组有两路ADC：ADC0，ADC1，电压范围 0 - 1.3V，分辨率 12 bits, 误差± 2%
 * ADC0位号 J8_A0, 开发板有2个100K电阻串联分压，最大电压范围 0 - 2.6V
 * 功能：读取燃气传感器电压
 */

var hcho = require('./hcho.js');   // 获取HCHO传感器驱动模块
var hchoObj = hcho.open('ADC0');   // 打开HCHO传感器设备

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
 });

  // 每一秒钟上报一次当前燃气传感器的测量结果到物联网平台
  setInterval(function () {
   var voltage = hcho.readValue(hchoObj)

    console.log('hchoVoltage: ' + voltage + ' ');
    // 上报数据到云端
    iotdev.postProps(
       JSON.stringify({
        HCHO: voltage,
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