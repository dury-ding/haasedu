/* 加载 adc 模块 */
var adc = require('adc');
var USED_ADC = 1;

function open(value)
{
    var obj = adc.open({
        id: value,
        success: function() {
            console.log('adc: open success')
        },
        fail: function() {
            console.log('adc: open failed')
        }
    });

    return obj;
}

function close(obj)
{
    //gpio close
    obj.close();
    return 0;
}

function dacReadPPM(obj) {
    var min = 0;
    var max = 0;
    var value = 0;
    var total = 0;
    var ppm = 0.0;
    var analogVoltage = 0;
    var i = 0;

    for (i = 0; i< 32; i++) {

        value = obj.readValue();
        if (value < min)
            min = value;

        if (value > max)
            max = value;

        total += value;
    }

    analogVoltage = (total - min - max) / 30;
    analogVoltage *= 1.78; // haas600 测得的电压值约为实际电压值的1.78倍。
    analogVoltage /= 990.0;

    ppm = 3.125 * analogVoltage - 1.25;	// inear relationship(0.4V for 0 ppm and 2V for 5ppm)

    return Number(ppm.toFixed(2));
}

function readValue(obj){
    return dacReadPPM(obj);
}

module.exports = {
    open,
    close,
    readValue,
}