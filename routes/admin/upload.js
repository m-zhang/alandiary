/*
*  延伸阅读 http://www.cnblogs.com/kongxianghai/archive/2015/02/15/4293139.html
* */

var express=require("express");
var router=express.Router();
var multer  = require('multer');
var path=require('path');

/*文件上传相关设置*/
var fileObj={},fileArr=[];
//var storage = multer.diskStorage({
//    destination: function (req, file, cb) {
//        cb(null, './public/uploads')
//    },
//    filename: function (req, file, cb) {
//        fileObj.name=Date.now()+path.extname(file.originalname);
//        fileObj.date=commonLib.now();
//        cb(null,fileObj.name);
//    }
//});
//var upload=multer({ storage:storage });
//router.get("/",function(req,res){
//    upload.array('pictures',8)(req,res,function(err){
//        if(err){
//            console.log(err);
//            return;
//        }
//        if(req.files.length>0){
//            new File(fileObj).save(function(err,file){
//                if(err){
//                    console.log(err);
//                }else{
//                    console.log(file);
//                }
//            });
//        }
//        res.redirect('/admin/upload');
//    });
//    File.find(function(err,files){
//        if(err){
//            console.log(err);
//        }else{
//            res.render('admin/file-upload',{title:'文件上传',files:files});
//        }
//
//    });
//});
module.exports=router;