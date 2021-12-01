var hcho = require('./hcho.js');
var hchoObj = hcho.open('ADC0');
setInterval(function() {
    console.log('hcho value is ' + hcho.readValue(hchoObj));
}, 1000);