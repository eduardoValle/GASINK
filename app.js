var express = require('express');
var cons = require('consolidate');

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

app.get('/grafico', function (req, res) {

    var data = new Date();
    var hora = 20;
    
    var ponto = new Array(15, hora);
    
    res.json(ponto);
});