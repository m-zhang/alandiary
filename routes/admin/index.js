var express = require('express');
var mongoose=require('mongoose');
var async=require('async');
var commonLib=require("../../common");
//后端路由 设置
//var userRoute=require("./user");
var articleRoute=require("./article");
//var uploadRoute=require("./upload");
//var categoryRoute=require("./category");

var router = express.Router();

// 用户管理
//router.use("/user",userRoute);

//文章管理

router.use("/article",articleRoute);

//上传设置
// router.use("/upload",uploadRoute);

//文章分类管理
//router.use("/category",categoryRoute);


//var Article=mongoose.model('articles');
var User=mongoose.model('users');

/* GET home page. */
router.get('/', function(req, res) {
    //获取 当前用户
    async.series({
        getCurUser:function(callback){
            commonLib.getCurUser(req,res,User,function(err,user){
                if(err){
                    return;
                }
                callback(null,user);
            });
        }
    },function(err,results){
        if(err){
            console.log(err);
        }else{
            res.render('admin/index', { title: '后台管理',user:results.getCurUser});
        }
    });
});


module.exports = router;
