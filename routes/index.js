var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
	host: 'localhost:9200',
	log: 'trace'
});

var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

var mongoose = require('mongoose');
var Book = mongoose.model('Book');
var Discussion = mongoose.model('Discussion');
var User = mongoose.model('User');

var scrape = require('html-metadata');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/v1/search/:input', function(req, res, next){
	//console.log(req.params.input)
	client.search({q: "title:"+ req.params.input +"OR author:"+req.params.input, size:8})
	.then(function (body) {
			var hits = body.hits.hits;
			//console.log(hits);
			res.json(hits);
		}, function (error) {
			console.trace(error.message);
		});
})


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
	Discussion.find({bookId:req.params.id})
	.where('page')
	.lt(req.params.page)
	.populate('postedBy comments.postedBy', 'username')
	.exec(function(err, discussions){
		if(err)
			throw err;
		//console.log('backend: '+book);
		//console.log(discussions);
		res.json(discussions);
	});
})

router.get('/api/v1/discussion/:id',function(req, res, next){
	Discussion.findOne({_id:req.params.id})
	.populate('postedBy comments.postedBy', 'username')
	.exec(function(err, discussion){
		if(err)
			throw err;
		//console.log('backend: '+book);
		//console.log(discussions);
		res.json(discussion);
	});
})

router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password || !req.body.email){
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  if(req.body.password !== req.body.passwordchk){
    return res.status(400).json({message: 'Please make sure you have entered right password!'});
  }
  var user = new User();

  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password)

  user.save(function (err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.post('/scrapebook',function(req, res, next){
	scrape(req.body.url, function(error, metadata){
		if(error){ return next(error); }
		res.json(metadata);
	});
});

router.post('/discussion/:book',function(req, res, next){
	var discussion = new Discussion(req.body);
	req.book.addDiscussion();
	discussion.save(function(err, discussion){
		if (err) {return next(err);}
		res.json(discussion);
	})
})

router.param('discussion', function(req, res, next, id){
	var query = Discussion.findById(id);
	query.exec(function (err, discussion){
		if (err) {return next(err);}
		if (!discussion) {return next(new Error('can\'t ifnd discussion')); }

		req.discussion = discussion;
		return next();
	})
})

router.param('book', function(req, res, next, id){
	var query = Book.findById(id);
	query.exec(function (err, book){
		if (err) {return next(err);}
		if (!book) {return next(new Error('can\'t ifnd book')); }

		req.book = book;
		return next();
	})
})


router.put('/comment/:discussion', function(req, res, next){
	var comment = req.body;
	req.discussion.addComment(comment,function(err, data){
		if (err) {return next(err);}
		res.json(data);
	})
})



module.exports = router;
