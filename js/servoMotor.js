var five = require("johnny-five");

module.exports.abrirPortao = function () {
    var servo = new five.Servo(9);
    servo.to(0, 3000);
};

module.exports.fecharPortao = function () {
    var servo = new five.Servo(9);
    servo.to(89, 3000);
};