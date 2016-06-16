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

app.use('/views', express.static('views'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/libs', express.static(__dirname + '/libs'));
app.use('/layout', express.static(__dirname + '/layout'));


console.log(__dirname + '/layout');