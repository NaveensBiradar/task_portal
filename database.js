
var mysql = require('mysql');

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root@123',
    database:'Task_portal'
})

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE users (id int NOT NULL AUTO_INCREMENT,f_name VARCHAR(255),l_name VARCHAR(255),contact VARCHAR(255),email VARCHAR(255),password VARCHAR(255),role VARCHAR(255),PRIMARY KEY (id),UNIQUE (email))";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });
// });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE taskList (id int NOT NULL AUTO_INCREMENT,name VARCHAR(255),description VARCHAR(255),technologies_used JSON DEFAULT NULL, time_estimated VARCHAR(255),resoure_allocated VARCHAR(255),PRIMARY KEY (id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});


