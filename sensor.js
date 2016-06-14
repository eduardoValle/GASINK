var five = require("johnny-five");
var http = require('http');
var board = new five.Board();


http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end('O sensor será iniciado!!');
}).listen(3000);

console.log('Servidor iniciado em localhost:3000. Ctrl+C para encerrar…');

board.on("ready", function () {
    var led = new five.Led(13);
    led.blink(500);
});