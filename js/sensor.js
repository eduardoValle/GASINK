var five = require("johnny-five"),
    http = require('http'),
    angular = require('angular');

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

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end('O sensor será iniciado!!');
}).listen(3000);
console.log('Servidor iniciado em localhost:3000. Ctrl+C para encerrar…');