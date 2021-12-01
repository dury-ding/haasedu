/* 加载 adc 模块 */
var adc = require('adc');

/* 打开ADC端口，port为ADC通道ID */
function open(port)
{
    // open ADC channel
    var obj = adc.open({
        id: port,
        success: function() {
            console.log('adc: open success')
        },
        fail: function() {
            console.log('adc: open failed')
        }
    });

    return obj;
}

/* 关闭ADC端口 */
function close(obj)
{
    //close ADC channel
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

    // 测量结果算法：连续读取ADC数据32次，去掉最大值和最小值后求平均值
    for (i = 0; i < 32; i++) {
        value = obj.readValue();
        if (value < min)
            min = value;

        if (value > max)
            max = value;

        total += value;
    }

    analogVoltage = (total - min - max) / 30;   // 去掉最大值和最小值后取平均值
    analogVoltage *= 1.7979;                    // HaaS600测得的电压值约为实际电压值的1.7979（在HaaS600+甲醛传感器上经过校准的参数）倍，单位：mV
    analogVoltage /= 1000.0;                    // 单位转换:mV to V

    ppm = 3.125 * analogVoltage - 1.25;	        // 实际测量电压转换为甲醛浓度（0.4V 代表 0 ppm， 2V 代表 5ppm，电压和浓度呈线性关系)

    return ppm;
}

function readValue(obj){
    return dacReadPPM(obj);
}

module.exports = {
    open,
    close,
    readValue,
}