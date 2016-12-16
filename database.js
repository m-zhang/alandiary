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
    brief:String,
    content:String,
    date:String,
    label:{type: Schema.Types.ObjectId, ref: 'labels'}
});

var Label=new Schema({
    name:{type:String,unique:true},
    articles:[{ type: Schema.Types.ObjectId, ref: 'articles'}],
    subCategory:[{ type: Schema.Types.ObjectId, ref: 'labels'}]
});
mongoose.model('files',File);
mongoose.model('users',User);
mongoose.model('articles',Article);
mongoose.model('labels',Label);
var options = {
    user: 'zhangming',
    pass: 'XIAmi08@'
}
//mongoose.connect(uri, options);
// 部署线上地址
//mongoose.connect('mongodb://@ds119728.mlab.com:19728/my-diary',options);
mongoose.connect('mongodb://localhost/ad-db');