var express = require('express');
var todoController  = require('./controllers/todoController');


var app = express();

//seting templeting engine

app.set('view engine', 'ejs');

//static file
app.use(express.static('./public'));
//fire controler

todoController(app);


//listen to port

app.listen(process.env.PORT || 5000);
console.log("U are using to port 3000");
