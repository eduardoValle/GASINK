var express = require('express');
var cons = require('consolidate');

app = express();
app.get('/', function (req, res) {
    res.send('É isso aí mano!!');
});
app.listen(3000);
console.log('app rodando na prota 3000');

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

/* app.get('/',function(req,res){res.send();}); */
app.get('/', function (req, res) {
    res.render('index');
});

app.use(express.static(__dirname + '/static'));

app.use('/js', express.static(__dirname + '/static/javascript'));