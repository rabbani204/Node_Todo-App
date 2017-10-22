var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to datavase

mongoose.connect('mongodb://test:test@ds127375.mlab.com:27375/todo')

//create a schema this is like blue print

var todoSchema = new mongoose.Schema({
  item: String
});


var Todo = mongoose.model('Todo', todoSchema);


/*var data = [
  {item: 'get milk'},{item: 'walk dog'}, {item: 'kick some coding ass'}
];*/

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

    app.get('/todo', function(req, res){

      //get data from mongodb pass it to view
        Todo.find({}, function(err, data){
         if(err) throw err;
         res.render('todo', {todos: data});

      });

    });


    app.post('/todo', urlencodedParser, function(req, res){
       //get data from the view and sent to mongodb
       var newTodo = Todo(req.body).save(function(err, data){
         if(err) throw err;
         res.json(data);
       });
    });


    app.delete('/todo/:item', function(req, res){
      //delete the requested item from mongo db
      Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
        if(err) throw err;
        res.json(data);
      });

    });

}
