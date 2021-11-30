// Katherine Jackson, 11142976, kmj908
// CMPT 353

'use strict';

const express = require("express"); 
const bodyParser = require("body-parser") 
const mysql = require('mysql');

const PORT = 8080;
const app = express(); 


app.use(bodyParser.urlencoded({ extended:true})); 

var conn = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'secret',
  database: 'newhope'   
}); 

conn.connect(function(err) {
  if (err) console.log(err);
  else console.log('Connected to database "newHope" as user "root"');   
});


app.get('/', (req, res) => {
  res.sendfile("index.html")
})

app.get('/dog', (req, res) => {
    res.sendfile("dog.html")
  })

app.get('/staff', (req, res) => {
res.sendfile("staff.html")
})

app.get('/homevisit', (req, res) => {
res.sendfile("homevisit.html")
})


app.post("/new_dog", function(req, res) {
    var name = req.body.name;
    var age = req.body.age || 1;
    var breed = req.body.breed || "";
    var gender = req.body.gender || "";
        
    var query = `INSERT INTO dogs (name, age, breed, gender) VALUES ('${name}', '${age}', '${breed}', '${gender}')`;
    
    conn.query(query,function (err, data) {
        if (err) throw err;
        else console.log("New dog added to dogs table"); 
        res.status(204).send();
    });
    
}); 

app.post("/new_staff", function(req, res) {
    var lastName = req.body.lastName;
    var firstName = req.body.firstName;
    var phone = req.body.phone;
        
    var query = `INSERT INTO staff (last_name, first_name, phone) VALUES ('${lastName}', '${firstName}', '${phone}')`;
    
    conn.query(query,function (err, data) {
        if (err) throw err;
        else console.log("New staff added to staff table"); 
        res.status(204).send();
    });
    
}); 


app.post("/new_homevisit", function(req, res) {
    var dog = req.body.dog;
    var staff = req.body.staff;
        
    var query = `INSERT INTO homevisits(dog, staff) VALUES ('${dog}', '${staff}')`;
    
    conn.query(query,function (err, data) {
        if (err) throw err;
        else console.log("New homevisit added to homevisit table"); 
        res.status(204).send();
    });
    
}); 

app.get("/doglist", function(req, res) {
    var query = `SELECT * from dogs`;
    
    conn.query(query,function (err, result) {
        if (err) throw err;
        
        res.json(result)
    });
    
}); 

app.get("/stafflist", function(req, res) {
    var query = `SELECT * from staff`;
    
    conn.query(query,function (err, result) {
        if (err) throw err;
        
        res.json(result)
    });
    
}); 


app.get("/homevisitlist", function(req, res) {
    console.log('updated')
    var query = `select homevisits.status, homevisits.id, dogs.name as dog, dogs.id as dogid, staff.first_name, staff.last_name, staff.id as staffid from homevisits join dogs on dogs.id=homevisits.dog join staff on staff.id=homevisits.staff`;
    
    conn.query(query,function (err, result) {
        if (err) throw err;
        
        res.json(result)
    });
});

app.post("/update_dog", function(req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var age = req.body.age || 1;
    var breed = req.body.breed || "";
    var gender = req.body.gender || "";
    var status = req.body.status || 0;
        
    var query = `UPDATE dogs SET name='${name}', age='${age}', breed='${breed}', gender='${gender}', status=${status} WHERE id=${id}`;
    
    conn.query(query,function (err, data) {
        if (err) throw err;
        else console.log("Updated Dog"); 
        res.status(204).send();
    });
    
}); 

app.post("/update_staff", function(req, res) {
    var id = req.body.id;
    var lastName = req.body.lastName;
    var firstName = req.body.firstName;
    var phone = req.body.phone;
        
    var query = `UPDATE staff SET first_name='${firstName}', last_name='${lastName}', phone='${phone}' WHERE id=${id}`;
    
    conn.query(query,function (err, data) {
        if (err) throw err;
        else console.log("Updated Staff"); 
        res.status(204).send();
    });
}); 


app.post("/update_homevisit", function(req, res) {
    var id = req.body.id;
    var status = req.body.status;
        
    var query = `UPDATE homevisits SET status='${status}' WHERE id=${id}`;
    
    conn.query(query,function (err, data) {
        if (err) throw err;
        else console.log("Updated Homevisit"); 
        res.status(204).send();
    });
    
}); 

app.delete("/delete_dog", function(req, res) {
    var id = JSON.parse(Object.keys(req.body)[0]).id
        
    var query = `DELETE from dogs WHERE id=${id}`;
    
    conn.query(query,function (err, data) {
        if (err) throw err;
        else console.log("deleted Dog"); 
        res.status(204).send();
    });
    
}); 

app.delete("/delete_staff", function(req, res) {
    var id = JSON.parse(Object.keys(req.body)[0]).id
        
    var query = `DELETE from staff WHERE id=${id}`;
    
    conn.query(query,function (err, data) {
        if (err) throw err;
        else console.log("deleted Staff"); 
        res.status(204).send();
    });
}); 


app.delete("/delete_homevisit", function(req, res) {
    var id = JSON.parse(Object.keys(req.body)[0]).id
    console.log(id)
        
    var query = `DELETE from homevisits WHERE id=${id}`;
    
    conn.query(query,function (err, data) {
        if (err) throw err;
        else console.log("deleted Homevisit"); 
        res.status(204).send();
    });
}); 


app.listen(PORT, function() {
  console.log('Server listening on http://localhost:' + PORT);
});