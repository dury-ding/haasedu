/**
 * EC600S 模组 GPIO 的原始电压域是1.8v，开发板上 GPIO 经电平转换芯片后转换为3.3v，默认拉高
 *
 * 板子的USER LED 通过 GPIO[33] 控制，与 SPI_CLK 引脚复用，
 * SPI 和 USER LED 功能不可同时使用。
 *
 * 人体红外传感器 使用 GPIO[4], 丝印 J8_D4
 *
 */

 var gpio = require('gpio');

 var iot = require('iot');         // 物联网平台相关操作所用对象
 var network = require('network'); // 获取网络状态所用对象

  var led = gpio.open({
	   id: 'USER_LED'
   });

  var sensor = gpio.open({
	  id: 'D4'
  });

  var value = 0;
  var last_value = 0;

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

   // 定时检测，当LED灯状态变化后上报结果到物联网平台
    setInterval(function () {
	    value = sensor.readValue();
	    if (value != last_value) {
		   led.writeValue(value);
		   console.log('gpio: led set value ' + value);
		   // 上报数据到云端
		   iotdev.postProps(
			    JSON.stringify({
				    LEDSwitch: value,
			    })
		    );
	    }
	    last_value = value;
    }, 200);
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


