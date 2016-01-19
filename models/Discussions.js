var mongoose = require('mongoose');

var DiscussionSchema = new mongoose.Schema({
	bookId : {type : String, required : true},
	title : {type : String, required : true},
	content : {type : String, required : true},
	author :  {type : String, required : true},
	upvotes : {type : Number, default : 0},
	comments : {type : Number, default : 0},
	page:{type : Number, required : true},
	create_date:{type: Date,default: Date.now}
	
});


mongoose.model('Discussion', DiscussionSchema);
