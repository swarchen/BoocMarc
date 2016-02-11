var express = require('express');
var router = express.Router();

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

router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;

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

router.post('/discussion',function(req, res, next){
	var discussion = new Discussion(req.body);
	discussion.save(function(err, discussion){
		if (err) {return next(err);}
		res.json(discussion);
	})
})


module.exports = router;
