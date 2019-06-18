
const mysql = require('mysql');
const express = require('express');
  var app = express();
  const bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json());
  app.use(express.json());
  var path = require('path');
  const router=express.Router();
  const method=require("method-override");
  app.use(method('_met'));



  router.get('/Students', function(req, res) {
    res.sendFile(path.join(NODEJS + '/Get.html'));
});


const mc = mysql.createConnection({
    host: 'northside.in',
    user: 'shakir',
    password: 'shakir123',
    database: 'shakir_test'
});


mc.connect(function(err){
  if(!err)
    console.log("DB Connected");
    else
    console.log("DB Failed:"+JSON.stringify(err,undefined,2));

});


app.listen(1000,function()
 {
   console.log('Port Started:1000')
  });

/// get Students Details
app.get('/Students',function(req,res)
{
  mc.query('SELECT * FROM Students',function(err,rows,fields)
  {
    if(!err)
   res.send(rows);
      else
      console.log(err);
  })
});


app.get('/Students/:id',function(req,res)
{
 var id=req.query.id;
  mc.query('SELECT * FROM Students WHERE id=?',[req.query.id],(err,rows)=>
  {
    if(!err)
   res.send(rows);
      else
      console.log(err);
  })
});


/// Delete 
app.delete('/delete/:id',function(req,res)
{
  mc.query('DELETE FROM Students WHERE id=?',[req.body.id],(err,rows)=>
  {
    if(!err)
   res.send('Deleted');
      else
      console.log(err);
  })
});

/// Post

app.post('/post',(req,res)=>
{
  var params=[req.body.id,req.body.Fname,req.body.Lname,req.body.Dept];

  mc.query('insert into Students set id=?,`Fname`=?,`Lname`=?,`Dept`=?',params,(err,rows)=>
  {
    if(!err)
        res.send('Inserted');
    else
      console.log(err);
  });
  //res.end(JSON.stringify(rows));
});


/// Put

app.put('/Stu/:id',(req,res)=>
{
  var putdata=[req.body.id,req.body.Fname,req.body.Lname,req.body.Dept];
  mc.query('UPDATE Students SET `Fname` = ?,`Lname`=?,`Dept`=? WHERE id = ?',putdata,(err,rows,fields)=>
  {
    if(!err)
    res.send('Updated');
  else
      console.log(err);
  });
  res.end(JSON.stringify(rows));
});
