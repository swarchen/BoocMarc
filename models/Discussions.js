var mongoose = require('mongoose');

var DiscussionSchema = new mongoose.Schema({
	bookId : {type : String, required : true},
	title : {type : String, required : true},
	content : {type : String, required : true},
	postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
	upvotes : {type : Number, default : 0},
	comments :[{
        text: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        upvotes: {type:Number, default : 0}
    }],
	page:{type : Number, required : true},
	create_date:{type: Date,default: Date.now}
	
});

DiscussionSchema.methods.addComment = function(comment,cb){
    this.comments.push(comment);
    this.save(cb);
};

mongoose.model('Discussion', DiscussionSchema);
