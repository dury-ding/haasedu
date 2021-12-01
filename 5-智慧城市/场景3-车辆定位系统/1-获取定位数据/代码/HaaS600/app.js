// 创建 GNSS解析器
var GPS = require("./gps.js");
var gnss = new GPS();

// 打开连接GNSS模块的串口
var UART1 = require('uart');
var port = UART1.open({ id: 'UART1' });

var locationData = { 'latitude': 0, 'longitude': 0, 'altitude': 0 }

// GNSS解析器 监听data事件
gnss.on("data", function (parsed) {
  console.log(parsed);
  locationData['latitude'] = parsed["lat"];
  locationData['longitude'] = parsed["lon"];
  locationData['altitude'] = parsed["alt"];
  console.log(locationData)
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