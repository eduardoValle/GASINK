var five = require("johnny-five");
var http = require('http');
var board = new five.Board();


http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end('O sensor será iniciado!!');
}).listen(3000);

console.log('Servidor iniciado em localhost:3000. Ctrl+C para encerrar…');

board.on("ready", function () {

    // Plug the MQ2 Gas (Combustible Gas/Smoke)
    var ledVermelho = new fiv.led(13);

    // module into the Grove Shield's A0 jack
    var gas = new five.Sensor("A0");

    gas.scale(0, 100).on("change", function () {
        console.log(this.value);
        ledVermelho.blink(500);
    });
});
