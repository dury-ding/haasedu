var light_adc = require('./ioset.js');
var lightObj = light_adc.adc_open('ADC0');

setInterval(function() {
  var lightness = light_adc.adc_readValue(lightObj);
  console.log('adc value is ' + lightness);
}, 500);
