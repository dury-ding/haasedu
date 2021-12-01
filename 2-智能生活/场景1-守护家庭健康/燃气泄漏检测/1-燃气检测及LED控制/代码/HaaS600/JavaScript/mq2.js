var adc = require('adc');

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
    adc.close();
    return 0;
}

function readValue(obj)
{
    //console.log('pir read value ' + obj);
    var value = obj.readValue() * 2;
    return value;
}

module.exports = {
    open,
    close,
    readValue,
}