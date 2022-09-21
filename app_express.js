const { response } = require('express');
var express = require('express');
const { get } = require('underscore');
var bodyParser = require('body-parser');//npm install body-parser --save  해서 쓰는 모듈
var app = express();

app.locals.pretty = true;

app.use(express.static('public'));//public폴더에서 정적인 파일을 읽어와줌

app.get('/topic/form', function(req, res){
    res.render('form');
});
app.get('/form_receiver', function(req, res){
    var title = req.query.title;
    var description = req.query.description;//사용자가 요청한 데이터를 받을 수 있었다.
    res.send(title+','+description);
});
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/form_receiver',  function(req, res){ //url에 노출되지 않고, 대규모 데이터 전송시 사용이 필요
    var title = req.body.title;
    var description = req.body.description;
    res.send(title+','+description);
});

app.set('view engine', 'jade');
app.set('views', './views');
app.get('/template', function (req, res) {
    res.render('temp', {time: Date(), _title:'jjade'});
});

app.get('/topic/:id',function(req, res){
    var topics=[
        'js...',
        'ddd...',
        'bird...'
    ];
    var output =`
    <a href="/topic/0">Jabascriptxxxx</a><br>
    <a href="/topic/1">ddd</a><br>
    <a href="/topic/2">bird</a><br>
    ${topics[req.params.id]}
    `
    res.send(output);
});//${topics[req.query.id]} -> localhost:3000/topic?id=1

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
