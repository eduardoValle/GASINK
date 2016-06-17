var five = require("johnny-five");

var board = new five.Board();

board.on("ready", function () {

    // Pegando o pino do led vermelho.
    var ledVermelho = new five.Led('13');

    // Pegando o pino analógico do sensor de gás.
    var gas = new five.Sensor("A0");

    gas.scale(0, 100).on("change", function () {
        console.log(this.value);
        ledVermelho.blink(500);
    });
});