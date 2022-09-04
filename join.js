const joinForm = document.getElementById("join-form");
const IDinput = document.querySelector("#join-form input");
const PSinput = joinForm.getElementsByTagName('input')[1];
const emailInput = joinForm.getElementsByTagName('input')[2];



function joinSubmit(event) {
    event.preventDefault();
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',    // 호스트 주소
        user: 'root',           // mysql user
        password: 'bird553399',       // mysql password
        database: 'testdb',         // mysql 데이터베이스
    });
    connection.connect();
    var sql = 'SELECT * FROM user';

    var sql = 'INSERT INTO user (user_id, user_password, user_email) VALUES(?, ?, ?)';
    var params = [`${IDinput.value}`,`${PSinput.value}`, `${emailInput.value}`];
    connection.query(sql, params, function (err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log(rows);
        }
    });
    connection.end();
}

joinForm.addEventListener("submit", joinSubmit);
