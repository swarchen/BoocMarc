var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Book = mongoose.model('Book');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/featured-books', function(req, res, next){
	Book.find(function(err, books){
		if(err){return next(err);}
		res.json(books);
	}).sort({readers:-1});
});

router.get('/discussed-books', function(req, res, next){
	Book.find(function(err, books){
		if(err){return next(err);}
		res.json(books);
	}).sort({discussions:-1});
})
module.exports = router;
