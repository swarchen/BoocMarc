var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Book = mongoose.model('Book');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/v1/featured-books', function(req, res, next){
	Book.find(function(err, books){
		if(err){return next(err);}
		res.json(books);
	}).sort({readers:-1}).limit(8);
});

router.get('/api/v1/discussed-books', function(req, res, next){
	Book.find(function(err, books){
		if(err){return next(err);}
		res.json(books);
	}).sort({discussions:-1}).limit(8);
})
module.exports = router;
