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

var led = gpio.open({
	 id: 'USER_LED'
 });

var sensor = gpio.open({
	id: 'D4'
});

var vol = 0;
var last_vol = 0;

setInterval(function () {
	vol = sensor.readValue();
    if (vol != last_vol) {
		led.writeValue(vol);
		console.log('gpio: led set value ' + vol);
	}

	last_vol = vol;
}, 200);
