
var adc = require('adc');
var gpio = require('gpio');

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
    //console.log('pir read value ' + obj);
    var value = obj.readValue();
    return value;
}

function gpio_open(value)
{
    console.log('relay open id ' + value);
    var obj = gpio.open({
        id: value
    });
    return obj;
}

function gpio_close(obj)
{
    console.log('relay clode obj ' + obj);
    //gpio close
    return 0;
}

function gpio_writeValue(obj, value)
{
    console.log('relay write value ' + value);
    obj.writeValue(value);
    return 0;
}

module.exports = {
    adc_open,
    adc_close,
    adc_readValue,
    gpio_open,
    gpio_close,
    gpio_writeValue
}
