const bodyParser = require('body-parser');
const express = require('express'); //supervisor app_file.js supervisor는 자동으로 새로고침해주는 npm
const app = express();
const fs = require('fs');
app.locals.pretty = true; //jade 줄바꿈 해줌
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', './views_file');
app.set('view engine', 'jade');

app.get('/topic/new', function (req, res) {
    fs.readdir('app_data', function (err, files) {//데이터를 읽어와 주는 노드 기능
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new', {topics:files});
    });

});

app.get(['/topic', '/topic/:id'], function (req, res) {
    fs.readdir('app_data', function (err, files) {//데이터를 읽어와 주는 노드 기능
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        const id = req.params.id;
        if(id) {
            //id값이 잇을 때
            fs.readFile('app_data/' + id, 'utf-8', function (err, data) {//id+description
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', { topics: files, title: id, description:data });
            })
        } else {
            //id값이 없을 때
            res.render('view', { topics: files, title:'Welcome' });// 파일을 주입
        }
    });
});

// app.get('/topic/:id', function (req, res) {
//     const id = req.params.id;

//     fs.readdir('app_data', function (err, files) {//topics
//         if (err) {
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }

//         fs.readFile('app_data/' + id, 'utf-8', function (err, data) {//id+description
//             if (err) {
//                 console.log(err);
//                 res.status(500).send('Internal Server Error');
//             }
//             res.render('view', { topics: files, title: id, description: data });
//         })
//     })

// });


app.post('/topic', function (req, res) {
    const title = req.body.title
    const description = req.body.description;
    fs.writeFile('app_data/' + title, description, function (err) {
        if (err) {
            res.status(500).send('Internal Server Error')
        }
        res.redirect('/topic/'+title);
    });
});
app.listen(3000, function () {
    console.log('Connected 3000 Files')
});