var express = require('express'),
    cons = require('consolidate'),
    five = require("johnny-five");

var cooler = require('./js/cooler'),
    portao = require('./js/servoMotor');

/***************************
  * RENDERIZAÇÃO E ROTAS *
***************************/

app = express();
app.listen(3000);
console.log('Servidor iniciado em localhost:3000. Ctrl+C para encerrar…');

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
    res.render('index');
});

app.use('/views', express.static('views'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/libs', express.static(__dirname + '/libs'));
app.use('/layout', express.static(__dirname + '/layout'));


/*******************************
  * INTEGRAÇÃO COM O ARDUINO *
*******************************/

var board = new five.Board();

board.on("ready", function () {

    /**************
      * PORTÃO *
    **************/
    var servo = new five.Servo(9);
    app.get('/abrirPortao', function (req, res) {
        portao.abrirPortao(servo);
    });

    app.get('/fecharPortao', function (req, res) {
        portao.fecharPortao(servo);
    });


    /*************
      * COOLER *
    **************/
    app.get('/ligarCooler', function (req, res) {
        cooler.ligarCooler();
    });

    app.get('/desligarCooler', function (req, res) {
        cooler.desligarCooler();
    });


    /*************
      * SENSOR *
    **************/
    // Pegando o pino analógico do sensor de gás.
    var gas = new five.Sensor("A0");
    var y;

    gas.scale(0, 100).on("change", function () {

        y = parseFloat(this.value.toFixed(3));
        app.get('/grafico', function (req, res) {
            console.log(y);
            var data = new Date();
            var hora = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
            var ponto = new Array(hora, y);

            res.json(ponto);
        });
    });
});