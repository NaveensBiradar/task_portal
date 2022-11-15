const express = require('express');
const app = express();
const PORT = 9001;  //move to .ENV file
const mysql = require('mysql2')
const bcrypt = require('bcrypt');
const saltRounds = 10; //move to .ENV file
app.use(express.json())

//Database connectivity
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root@123',
    database:'Task_portal'
})
con.connect((err)=>{
    if (err) throw err;
    console.log("database connected")
})


//Server listion 
app.listen(PORT, function(err){
    if (err) throw err;
    console.log("Server is running on the port",PORT);
})

app.get('/home', (req,res)=>{
    res.send("GET Request Called HOME page")
})


//Registeration 
app.post('/register',async (req,res)=>{
    console.log(req.body)
    let Fname = req.body.first_name;
    let Lname = req.body.last_name;
    let contact = req.body.contact; 
    let email = req.body.email;
    let password = req.body.password;
    console.log(Fname, Lname, contact, email, password)
    await bcrypt.hash(password, saltRounds, function(err, hash) {
        //Insert in to the table with password and hash
        console.log("=====hash==>",hash)
        let sql = `INSERT INTO users (f_name, l_name, contact, email, password, role) VALUES ('${Fname}','${Lname}','${contact}','${email}','${hash}','user')`;
        con.query(sql,(err,result)=>{
            if(err){
                console.log(err);
                res.send({message:"Failed", status:404, data:err.sqlMessage})
            } else{
                console.log("Record stored successfully")
                res.send({message:"success", status:200, data:req.body})
            }
        })
    }); 
})


//login
app.post('/login', async (req,res)=>{
    console.log(req.body)
    let email = req.body.email;
    let password = req.body.password;
    if(req.body !== []){
        console.log(email, password)
        con.query (`select * from users where email='${email}'`,async function (err, result, fields){
            if (err) throw err;
            console.log(result[0].password);
            let hash = result[0].password;
            await bcrypt.compare(password, hash, function(err, result) {
                console.log("compare",result)
                if(result == true){
                    res.send({message:"success", status:200, data:result})
                    //redirect to user Dashboard.
                }else{
                    res.send({message:"Fails", status:404, data:"Please check the Password"})
                }
            });
       })
    }else{
        res.send({message:"Failed", status:400, data:req.body})
    }
})

app.get('/getTasks_list',(req,res)=>{
    res.send("GET Request Called Login page")
})

app.get('/getUserProfile',(req,res)=>{
    res.send("GET Request Called Login page")
})

app.get('/getTaskStatus',(req,res)=>{
    res.send("GET Request Called Login page")
})


//All User List
app.get('/getAllusers',(req,res)=>{
   con.query ("select * from users", function (err, result, fields){
        if (err) throw err;
        console.log(result);
        res.send({message:"success", status:200, data:result})
   })
})

//delete
app.get('/deleteUser',(req,res)=>{
    res.send("GET Request Called Login page")
})

app.get('/deleteTask',(req,res)=>{
    res.send("GET Request Called Login page")
})