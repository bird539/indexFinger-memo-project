var fs = require('fs');

//동기 sync
console.log('1');
var data = fs.readFileSync('data.txt',{encoding: 'utf8'}, );
console.log(data);

//비동기 async
console.log('2');
fs.readFile('data.txt', {encoding:'utf-8'}, function(err, data){
    console.log('3');
    console.log(data);
})
console.log('4');