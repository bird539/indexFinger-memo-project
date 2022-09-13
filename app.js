var express = require('express');
var app = express();
app.get('/', function(req, res){
    res.send('hello home page');
});

app.get('/login', function(req, res){
    res.send('<script src = ex.html></script>');
});

app.listen(3000, function(){
    console.log('conneted 3000 port');
}); //커넥션 끊기 컨트롤 C
