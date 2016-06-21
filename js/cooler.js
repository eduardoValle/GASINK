var five = require("johnny-five");

module.exports.ligarCooler = function(){
    var cooler = new five.Led(13);
    cooler.on();
};

module.exports.desligarCooler = function(){
    var cooler = new five.Led(13);
    cooler.off();
};