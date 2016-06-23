var five = require("johnny-five");

module.exports.abrirPortao = function (servo) {
    servo.to(0, 3000);
};

module.exports.fecharPortao = function (servo) {
    servo.to(89, 3000);
};