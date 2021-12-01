
var adc = require('adc');

function adc_open(value)
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

function adc_close(obj)
{
    //gpio close
    adc.close();
    return 0;
}

function adc_readValue(obj)
{
    var value = obj.readValue();
    return value;
}

module.exports = {
    adc_open,
    adc_close,
    adc_readValue,
}
