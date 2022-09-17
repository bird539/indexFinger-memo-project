var express = require('express');
var app = express();

app.locals.pretty = true;

app.use(express.static('public'));//public폴더에서 정적인 파일을 읽어와줌


app.set('view engine', 'jade');
app.set('views', './views');
app.get('/template', function (req, res) {
    res.render('temp', {time: Date(), _title:'jjade'});
});

app.get('/', function (req, res) {
    res.send('hello home page');
});

app.get('/dy', function (req, res) {
    var output = `
   <!DOCTYPE html>
   <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Document</title>
    </head> 
    <body>
    <h2>timer</h2>
    <div class="timerr">
        <form id="timerForm">
            <input type="number" id="hourTimer" name="hour" min="0" max="24" value="00"><a> :</a>
            <input type="number" id="minuteTimer" name="minute" min="0" max="1440" value="00"><a> :</a>
            <input type="number" id="secondTimer" name="second" min="0" max="86400" value="00">
            <input type="submit" value="start">
        </form>
        <ul id="timer-list"></ul>
    </div>

    <script src="/javascript/timer.js"></script>
    </body>
    </html>
    `;
    res.send(output);
});

app.get('/route', function (req, res) {
    res.send('Router, <img src="/1.png">');//public폴더에서 이미지를 불러오게 됨
});


app.get('/login', function (req, res) {
    res.send('<script src = ex.html></script>');
});

app.listen(3000, function () {
    console.log('conneted 3000 port');
}); //커넥션 끊기 컨트롤 C
