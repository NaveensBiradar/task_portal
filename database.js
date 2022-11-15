
var mysql = require('mysql');

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root@123',
    database:'Task_portal'
})

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE users (f_name VARCHAR(255),l_name VARCHAR(255),contact VARCHAR(255),email VARCHAR(255),password VARCHAR(255),role VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
});


