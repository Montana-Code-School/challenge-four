var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animals');

var Bear = require('./models/bear');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next){
  console.log('something is happeneing!');
  next();
});



router.get('/', function(req, res){
  res.json({title: 'hooray it worked!!'})
});


router.route('/bears')
  .post(function(req, res){

    var bear = new Bear();

    bear.name = req.body.name;
    bear.age = req.body.age;
    bear.gender = req.body.gender;

    bear.save(function(err, bear){
      if(err){
        console.log(err)
      } else {
        res.json(bear)
      }
    })
  })
  .get(function(req, res){
    Bear.find(function(err, bears){
      if(err){
        console.log(err)
      } else {
        res.json(bears)
      }
    })
  });


app.use('/api', router);


app.listen(port, function(){
  console.log("app listening on port " + port)
});