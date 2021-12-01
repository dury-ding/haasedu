var adc = require('adc');

function open(value)
{
    var obj = adc.open({                     // 开启ADC通道
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
    adc.close();                              // 关闭ADC通道
    return 0;
}

function readValue(obj)
{
    var value = obj.readValue() * 2;          // 从ADC读取测量结果
    return value;
}

module.exports = {                            // 此模块对外地输出的API
    open,
    close,
    readValue,
}