var five = require("johnny-five");

module.exports.abrirPortao = function () {
    var servo = new five.Servo(9);
    servo.to(0, 4000);
    servo.stop();
};

module.exports.fecharPortao = function () {
    var servo = new five.Servo(9);
    servo.to(89, 4000);
    servo.stop();
};