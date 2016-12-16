var express = require('express');
var mongoose=require('mongoose');
var async=require('async');
var multer  = require('multer');
var path=require('path');
var commonLib=require('../../common');

var router = express.Router();

/*文件上传相关设置*/
var fileObj={},fileArr=[];
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        fileObj.name=Date.now()+path.extname(file.originalname);
        fileObj.date=commonLib.now();
        cb(null,fileObj.name);
    }
})
var upload=multer({ storage:storage });

var User=mongoose.model('users');
var File=mongoose.model('files');
var Article=mongoose.model('articles');
var Label=mongoose.model('labels');
/* GET home page. */
router.get('/', function(req, res) {
    //获取 当前用户
    async.series({
        getCurUser:function(callback){
            getCurUser(req,res,function(err,user){
                if(err){
                    return;
                }
                callback(null,user);
            });
            //if(req.session.curMail){
            //    User.findOne({email:req.session.curMail},function(err,user){
            //       if(err){
            //           console.log(err);
            //       }else{
            //           callback(null,user);
            //       }
            //    });
            //}else{
            //    res.redirect("/login");
            //}
        },
        getArticles:function(callback){
            Article.find({},function(err,articles){
                callback(null,articles);
            });

        }
    },function(err,results){
        if(err){
            console.log(err);
        }else{
            res.render('admin/index', { title: '后台管理',user:results.getCurUser,articles:results.getArticles});
        }
    });
});
router.get('/upload',function(req,res){
    File.find(function(err,files){
        if(err){
            console.log(err);
        }else{
            res.render('admin/file-upload',{title:'文件上传',files:files});
        }

    });
});
// 延伸阅读 http://www.cnblogs.com/kongxianghai/archive/2015/02/15/4293139.html
router.post('/upload',function(req,res){
    upload.array('pictures',8)(req,res,function(err){
        if(err){
            console.log(err);
            return;
        }
        if(req.files.length>0){
            new File(fileObj).save(function(err,file){
                if(err){
                    console.log(err);
                }else{
                    console.log(file);
                }
            });
        }
        res.redirect('/admin/upload');
    });
});
router.get('/article',function(req,res){
    async.series({
        getCurUser:function(callback){
            getCurUser(req,res,function(err,user){
                if(err){
                    return;
                }
                callback(null,user);
            });
        },
        getArticles:function(callback){
            Article.find({},function(err,articles){
                callback(null,articles);
            });
        },
        getLabels:function(callback){
            Label.find(function(err,labels){
                callback(null,labels);
            });
        }
    },function(err,results){
        if(err){
            console.log(err);
        }else{
            res.render('admin/article', { title: '文章管理',user:results.getCurUser,articles:results.getArticles,labels:results.getLabels});
        }
    });


});
router.post('/article/add',function(req,res){
    var params={
        name:req.body.name,
        user:req.body.user,
        brief:req.body.brief,
        content:req.body.content,
        label:req.body.label||"",
        date:commonLib.now()
    }
    async.waterfall([
        async.apply(creatNewArticle, params),
        updateLabel
    ], function (err, result) {
        res.end(result);
    });
});
router.delete('/article/:id',function(req,res){
    var params={
        "_id":req.params.id
    }
    Article.findOneAndRemove(params,function(err,article){
        if(err){
            console.log(err);
        }else{
            res.redirect("/admin/article");
        }
    });
});
router.get('/article/:id',function(req,res){
    var params={
        "_id":req.params.id
        };
    Article.findOne(params,function(err,article){
        if(err){
            console.log(err);
        }else{
            console.log(article);
            res.render("admin/article-edit",{article:article});
        }

    });


});

router.put('/article/:id',function(req,res){
    var params={
        "_id":req.params.id
    },update={brief:req.body.brief,content:req.body.content},options={new:true};
    Article.findOneAndUpdate(params,update,options,function(err,article) {
        if(err){
            console.log(err);
        }else{
            res.redirect("/admin");
        }
    });
});

// 新建 分类
router.post('/addLabel',function(req,res){
    var params={
        name:req.body.label,
        articles:req.body.article||[],
        subCategory:req.body.subCategory||[]
    }
    Label.create(params,function(err){
        if(err){
            //console.log(err);
            res.render('error', {
                message: err.message,
                error: err
            });
        }else{
            var docs = Array.prototype.slice.call(arguments, 1);
            console.log(docs);
            res.redirect('/admin/article');
        }
    });
});
// 获取当前用户
function getCurUser(req,res,callback){
    if(req.session.curMail){
        User.findOne({email:req.session.curMail},callback);
    }else{
        res.redirect("/login");
    }
}
// 获取文章
function creatNewArticle(arg,callback){
    Article.create(arg,function(err,article){
        if(err){
            console.log(err);
        }else{
            //ar docs = Array.prototype.slice.call(arguments, 1);
            callback(null,article);
        }
    });
}

function updateLabel(arg,callback){
    Label.findById(arg.label,function(err,label){
        label.articles.push(arg.id);
        label.save(function(err,label){
            //console.log(label);
            if(err){
                console.log(err);
                return;
            }
            console.log(label);
            callback(null,"ok");
        });
    });
    //Label.findByIdAndUpdate(arg.label,{$set:{articles:[arg.id]}},function(err,label){
    //    console.log(label);
    //    callback(null,"ok");
    //});

}
module.exports = router;
