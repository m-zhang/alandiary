var express = require('express');
var mongoose=require('mongoose');
var router = express.Router();
var async=require('async');
var component=require('../../common');
var md = require('marked');
var User=mongoose.model('users');
var Article=mongoose.model('articles');

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
            res.render('index', { title: 'Express',articles:results.getArticles,md:md});
        }
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

router.get('/logout',component.logout);

module.exports = router;
