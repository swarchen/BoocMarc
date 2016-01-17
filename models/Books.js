var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
	title : {type : String, required : true},
	author :  {type : String, required : true},
	discussions : {type : Number, default : 0},
	readers : {type : Number, default : 0},
	category : {type : String, required : true},
	publisher : {type : String, required : true},
	pages:{type : Number, required : true},
	imgUrl: {type : String, required : true}
	
});


mongoose.model('Book', BookSchema);
