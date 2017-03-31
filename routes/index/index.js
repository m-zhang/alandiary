var express = require('express');
var mongoose=require('mongoose');
var router = express.Router();
var async=require('async');
var component=require('../../common');
var md = require('marked');
var User=mongoose.model('users');
var Article=mongoose.model('articles');
var Category=mongoose.model('categorys');

/* GET home page. */
router.get('/', function(req, res, next) {
    //获取 当前用户
    async.series({
        getArticles:function(callback){
            Article.find({}).populate({
                path:"user",
                model:User
            }).exec(function(err,docs){
                callback(null,docs);
            });
        },
        getCategorys:function(callback){
            Category.find({leaf:0}).sort({"date":1}).populate({
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
            res.render('index', {
                title: '阿伦日记',
                articles:results.getArticles,
                md:md,
                imgUrl:component.config.imgUrl,
                categorys:results.getCategorys
            });
        }
    });
});
router.get('/category/:id', function(req, res, next) {
    //Category.find({name:"技术宅"},function(err,category){
    //    res.json(category);
    //});
    //排序 存在问题，用文章检索
    Category.findById(req.params.id,function(err,doc){
        Article.find({category:{$in:doc.subCategory}}).sort({date:-1}).populate({
            path: 'user',
            model: User
        }).exec(function(err,ds){
            res.render("index-origin",{cname:doc.name,art:ds,md:md});
        });
    });
    //Category.findById(req.params.id)
    //    .populate({
    //        path:"subCategory",
    //        model:Category,
    //        populate:{
    //            path:"articles",
    //            model:Article,
    //            options:{limit:5, sort: { date: 1 }},
    //            populate: {
    //                path: 'user',
    //                model: User
    //            }
    //        }
    //}).exec(function(err,docs){
    //    //console.log(docs);
    //    //res.json(docs);
    //    res.render("index-origin",{c:docs,md:md});
    //});
});
router.get('/article/:id', function(req, res, next) {
    Article.findOne({_id:req.params.id},function(err,article){
        res.render("article",{article:article,md:md});
    });
});
router.get('/login',function(req,res){
    if(req.session.loggedIn){
        console.log(req.session.loggedIn);
        res.redirect('/admin');
    }else{
        res.render('login',{title:'欢迎登陆'});
    }

});
router.post('/login',function(req,res){
    if(req.body.email&&req.body.password){
        User.findOne({ email: req.body.email,password:req.body.password},function(err,user){
            if(err){
                console.log(err);
            }else{
                if(user){
                    req.session.loggedIn=true;
                    req.session.curMail=user.email;
                    res.redirect('/admin');
                }else{
                    res.redirect("/login");
                }
            }
        });
    }else{
        res.redirect("/login");
    }
});
// 测试api
router.get('/getArticles', function(req, res, next) {
    //Category.find({name:"技术宅"},function(err,category){
    //    res.json(category);
    //});
    Article.find(function(err,articles){
        res.json(articles.map(function(item){return item.id}));
    });

});

// 关于我
router.get('/about/alan', function(req, res, next) {
    res.render("about",{title:"关于我"});
});
//router.get('/async-until', function(req, res, next) {
//    var count = 0;
//
//    async.during(
//        function (callback) {
//            //console.log(1);
//            return callback(null, count < 5);
//        },
//        function (callback) {
//            console.log(count);
//            count++;
//            setTimeout(callback, 1000);
//        },
//        function (err) {
//            // 5 seconds have passed
//            console.log(10);
//        }
//    );
//});


router.get('/logout',component.logout);

module.exports = router;
