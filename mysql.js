var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',    // 호스트 주소
    user: 'root',           // mysql user
    password: 'bird553399',       // mysql password
    database: 'o2',         // mysql 데이터베이스
});
connection.connect();
var sql = 'SELECT * FROM topic';
// connection.query(sql, function (err, rows, fields) {
//     if (err) {
//         console.log(err);
//     } else {
//         for(var i=0; i<rows.length; i++){
//             console.log(rows[i].description);
//         }
//     }
// });
/*
//추가
var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';
var params = ['Super', 'Watcher', 'banksy'];
connection.query(sql, params, function(err, rows, fields){
    if(err){
        console.log(err);
    }else{
        console.log(rows);
    }
});

//업데이트
var sql = 'UPDATE topic SET title=?, author=? WHERE id=?';
var params = ['NPM', 'bird',1];
connection.query(sql, params, function(err, rows, fields){
    if(err){
        console.log(err);
    }else{
        console.log(rows);
    }
});
*/
//삭제
var sql = 'DELETE FROM topic WHERE id=?';
var params = [1];
connection.query(sql, params, function(err, rows, fields){
    if(err){
        console.log(err);
    }else{
        console.log(rows);
    }
});
connection.end();