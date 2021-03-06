var express=require("express");
var router=express.Router();
var mongoose=require('mongoose');
var async=require('async');

var commonLib=require("../../common");


var Category=mongoose.model('categorys');
var User=mongoose.model('users');
var Article=mongoose.model('articles');

router.get('/',function(req,res){
    async.series({
        getCurUser:function(callback){
            commonLib.getCurUser(req,res,User,function(err,user){
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
        getCategorys:function(callback){
            Category.find(function(err,categorys){
                callback(null,categorys);
            });
        }
    },function(err,results){
        if(err){
            console.log(err);
        }else{
            res.render('admin/article', { title: '文章管理',user:results.getCurUser,articles:results.getArticles,categorys:results.getCategorys});
        }
    });

});

// 新增文章 ----start------
router.get('/add',function(req,res){
    async.series({
        getCurUser:function(callback){
            commonLib.getCurUser(req,res,User,function(err,user){
                if(err){
                    return;
                }
                callback(null,user);
            });
        },
        getCategorys:function(callback){
            Category.find({leaf:0}).populate({
                path:"subCategory",
                model:Category
            }).exec(function(err,docs){
                callback(null,docs);
            });
        }
    },function(err,results){
        if(err){
            console.log(err);
        }else{
            res.render('admin/article-add', { title: '文章管理',user:results.getCurUser,categorys:results.getCategorys});
        }
    });
});
router.post('/add',function(req,res){
    var params={
        name:req.body.name,
        user:req.body.user,
        brief:req.body.brief,
        content:req.body.content,
        draft:req.body.draft,
        cinfo:req.body.cinfo,
        category:req.body.category||"",
        date:req.body.date
    }
    console.log(params.cinfo);
    console.log(params.date);
    //res.end(req.body.name);
    async.waterfall([
        async.apply(creatNewArticle, params),
        updatecategory
    ], function (err, result) {
        res.end("插入成功咯");
       // res.redirect("/admin/article/add");
    });
});
//----------------end------------------
router.delete('/delete/:id',function(req,res){
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
router.get('/edit/:id',function(req,res){
    var params={
        "_id":req.params.id
    };
    async.series({
        getCurUser:function(callback){
            commonLib.getCurUser(req,res,User,function(err,user){
                if(err){
                    return;
                }
                callback(null,user);
            });
        },
        getArticles:function(callback){
            Article.findOne(params,function(err,article){
                callback(null,article);
            });
        }
    },function(err,results){
        if(err){
            console.log(err);
        }else{
            res.render('admin/article-edit', { title: '文章编辑',user:results.getCurUser,article:results.getArticles});
        }
    });

    Article.findOne(params,function(err,article){
        if(err){
            console.log(err);
        }else{
            console.log(article);
        }

    });


});
//
router.put('/edit/:id',function(req,res){
    var params={
        "_id":req.params.id
    },update={name:req.body.name,brief:req.body.brief,content:req.body.content,draft:req.body.draft},options={new:true};
    Article.findOneAndUpdate(params,update,options,function(err,article) {
        if(err){
            console.log(err);
        }else{
            res.json({"state":"ok"});
        }
    });
});
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

function updatecategory(arg,callback){
    Category.findById(arg.category,function(err,category){
        category.articles.push(arg.id);
        category.save(function(err,doc){
            //console.log(category);
            if(err){
                console.log(err);
                return;
            }
            callback(null,"ok");
        });
    });
}
module.exports=router;