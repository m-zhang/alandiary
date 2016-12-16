var express = require('express');
var mongoose=require('mongoose');
var router = express.Router();
var async=require('async');
var component=require('../../common');
var md = require('marked');
var User=mongoose.model('users');
var Article=mongoose.model('articles');
var Label=mongoose.model('labels');

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
        }
    },function(err,results){
        if(err){
            console.log(err);
        }else{
            res.render('index', { title: 'Express',articles:results.getArticles,md:md,imgUrl:component.config.imgUrl});
        }
    });
});
router.get('/tech', function(req, res, next) {
    //Label.find({name:"技术宅"},function(err,label){
    //    res.json(label);
    //});
    Label.find({name:"技术宅"}).populate({
        path:"articles",
        model:Article,
        populate: {
            path: 'user',
            model: User
        }
    }).exec(function(err,docs){
        res.render("index-origin",{title:"技术分享",c:docs,md:md});
    });
});
router.get('/design', function(req, res, next) {
    //Label.find({name:"技术宅"},function(err,label){
    //    res.json(label);
    //});
    Label.find({name:"技术宅"}).populate({
        path:"articles",
        model:Article,
        populate: {
            path: 'user',
            model: User
        }
    }).exec(function(err,docs){
        res.render("index-origin",{title:"设计分享",c:docs,md:md});
    });
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
    //Label.find({name:"技术宅"},function(err,label){
    //    res.json(label);
    //});
    Article.find(function(err,articles){
        res.json(articles.map(function(item){return item.id}));
    });

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
