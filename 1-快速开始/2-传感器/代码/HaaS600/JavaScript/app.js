/**
 *  EC600S 的 I2C Port 为 1，EC100Y 的 I2C Port 为 0；
 *  EC600S 板载温湿度传感器 LM75
 *
*/

var i2c = require('i2c');

var lm75 = i2c.open({                         // 打开I2C设备
	id: 'I2C1',
	success: function () {
		console.log('lm75 sensor open success')
	},
	fail: function () {
		console.log('lm75 sensor open failed')
	}
});

function lm75tmpGet() {                     // 量测温度信息
	var temp;
	var sig = 1;
	var regval = lm75.readMem(0x00, 2);       // 通过I2C接口获取LM75量测结果
	// console.log('read regval is ' + regval);
	if (!regval) {
		return;
	}
	var tempAll = (regval[0] << 8) + regval[1];   // 按照LM75的数据手册进行数据转换
	// console.log('tempAll is ' + tempAll);

	if (regval[0] & 0x80 != 0) {
		tempAll = ~(tempAll) + 1;                   // 判断读取到的温度是不是零下
		sig = -1;
	}

  // 寄存器值向温度的转换，单位：摄氏度
	tempAll = tempAll >> 5;
	// console.log('tempAll final data ' + tempAll);
	temp = tempAll * 0.125 * sig;

	return temp;
}

// 启动定时任务读取温度信息并打印出来，时间周期：1秒
setInterval(function () {
	var temp1 = lm75tmpGet();
	console.log('lm75 data is ' + temp1);
}, 1000);