var mongoose= require('mongoose');
var Schema=mongoose.Schema;

var User=new Schema({
    name:{type:String,unique:true},
    password:String,
    email:{type:String,unique:true},
    role:String,//管理员、普通用户
    date:String
});

var File=new Schema({
    name:String,
    date:String
});

var Article=new Schema({
    name:String,
    user:{ type: Schema.Types.ObjectId, ref: 'users'},
    content:String,
    date:String
});

mongoose.model('files',File);
mongoose.model('users',User);
mongoose.model('articles',Article);

mongoose.connect('mongodb://localhost/ad-db');