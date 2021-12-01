var gpio_adc = require('./ioset.js');
var iot = require('iot');
var network = require('network');

var lightObj = gpio_adc.adc_open('ADC0');
var ledObj = gpio_adc.gpio_open('D5');

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
    var onoffObj = JSON.parse(properity.params);
    console.log('received cloud properity param value ' + onoffObj.onoff);
    if(onoffObj.onoff == 1){
     console.log('turn on light');
     gpio_adc.gpio_writeValue(ledObj, 1);
    }else{
     console.log('turn off light');
     gpio_adc.gpio_writeValue(ledObj, 0);
    }
 
});

 // 每一秒钟上报温湿度数据
 setInterval(function () {
        var lightness = gpio_adc.adc_readValue(lightObj);
        console.log('adc value is ' + lightness);

        // 上报数据到云端
        iotdev.postProps(
            JSON.stringify({
            Brightness: lightness,
            })
        );
    }, 5000);
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

var netStatus = networkClient.getStatus();

if (netStatus == 'connect') {
    console.log('network connected, create iot connection');
    iotDeviceCreate();
} else {
    networkClient.on('connect', function() {
        console.log('network connected, create iot connection');
        iotDeviceCreate();
    });
}
