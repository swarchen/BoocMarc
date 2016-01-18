var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Book = mongoose.model('Book');
var Discussion = mongoose.model('Discussion');

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

router.get('/api/v1/book/:id',function(req, res, next){
	Book.findById(req.params.id,function(err, book){
		if(err)
			throw err;
		//console.log('backend: '+book);
		res.json(book);
	})
});

router.get('/api/v1/discussions/:id/page/:page',function(req, res, next){
	Discussion.find({bookId:req.params.id}).
	where('page').lt(req.params.page).
	exec(function(err, discussions){
		if(err)
			throw err;
		//console.log('backend: '+book);
		//console.log(discussions);
		res.json(discussions);
	});
})



module.exports = router;
