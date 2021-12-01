var GPS = require("./gps.js");
var gnss = new GPS();

var UART1 = require('uart');
var port = UART1.open({ id: 'UART1' });

var locationData = { 'latitude': 0, 'longitude': 0, 'altitude': 0 }

var iot = require('iot');
var network = require('network');

var net = network.openNetWorkClient();

// 填写你的设备三元组信息
var productKey = "产品密钥"; 
var deviceName = "设备名称"; 
var deviceSecret = "设备密钥";

var device;

function createDevice() {
  device = iot.device({
    productKey: productKey,
    deviceName: deviceName,
    deviceSecret: deviceSecret,
    region: 'cn-shanghai'
  });

  device.on('connect', function () {
    console.log('success connect to aliyun');
  });

  /* 网络断开事件 */
  device.on('disconnect', function () {
    console.log('disconnect ');
  });

  /* 关闭连接事件 */
  device.on('close', function () {
    console.log('iot client just closed');
  });

  /* 发生错误事件 */
  device.on('error', function (err) {
    console.log('error ' + err);
  });

  /* 云端设置属性事件 */
  device.onProps(function (res) {
    console.log('cloud req msg_id is ' + res.msg_id);
    console.log('cloud req params_len is ' + res.params_len);
    console.log('cloud req params is ' + res.params);
  });

  /* 云端下发服务事件 */
  device.onService(function (res) {
    console.log('received cloud msg_id is ' + res.msg_id);
    console.log('received cloud service_id is ' + res.service_id);
    console.log('received cloud params_len is ' + res.params_len);
    console.log('received cloud params is ' + res.params);
  });
}

var status = net.getStatus();
console.log('net status is: ' + status);

if (status == 'connect') {
  createDevice();
} else {
  net.on('connect', function () {
    console.log('net connect success');
    createDevice();
  });
}

gnss.on("data", function (parsed) {
  console.log(parsed);
  locationData['latitude'] = parsed["lat"];
  locationData['longitude'] = parsed["lon"];
  locationData['altitude'] = parsed["alt"];
  console.log(locationData)
  if (locationData['latitude'] != null || locationData['longitude'] != null || locationData['altitude'] != null) {
    var propPayload = JSON.stringify({
      "GeoLocation":{
      'Longitude': locationData['longitude'],
      'Latitude': locationData['latitude'],
      'Altitude': locationData['altitude'],
      'CoordinateSystem': 1
    }});
    device.postProps(propPayload,null);
  }
});

function ab2str(arraybuf) {
  var string = "";
  for (var i = 0; i < arraybuf.length; i++) {
    string += String.fromCharCode(arraybuf[i]);
  }
  return string;
}

var sentence;

port.on('data', function (data) {
  var aaa = ab2str(data);
  console.log(aaa)
  var bbb = aaa.split("$");
  sentence = "$" + bbb[1];
  gnss.update(sentence);
});