var mysql = require('mysql');
var connection = mysql.createConnection({
    host: ''%'',    // 호스트 주소
    user: 'test',           // mysql user
    password: 'bird553399',       // mysql password
    database: 'testDB',         // mysql 데이터베이스
});
connection.connect();
connection.query('SELECT 1 + 1 AS solution',
    function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });
connection.end();