var express=require("express");
var mongoose=require('mongoose');
var router=express.Router();
var async=require('async');
var commonLib=require("../../common");
var Category=mongoose.model('categorys');
var User=mongoose.model('users');
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
        getAllCategorys:getAllCategorys
    },function(err,results){
        if(err){
            console.log(err);
        }else{
            res.render('admin/category', { title: '分类管理',user:results.getCurUser,categorys:results.getAllCategorys});
        }
    });
});
router.post('/add',function(req,res){
    var params={
        name:req.body.name,
        leaf:parseInt(req.body.leaf),
        articles:[],
        subCategory:[]
        }
    Category.create(params,function(err){
        if(err){
            //console.log(err);
            res.render('error', {
                message: err.message,
                error: err
            });
        }else{
            var docs = Array.prototype.slice.call(arguments, 1);
            if(parseInt(req.body.leaf)!==0){
                Category.findById(req.body.pid,function(err,category){
                    category.subCategory.push(docs[0].id);
                    category.save(function(err,category){
                        if(err){
                            console.log("更新分类子集报错");
                        }
                        res.redirect('/admin/category');
                    });
                });
            }else{
                res.redirect('/admin/category');
            }

        }
    });
});
router.delete('/delete/:id',function(req,res){
    var params={
        "_id":req.params.id
    }
    Category.findOneAndRemove(params,function(err,category){
        if(err){
            console.log("删除分类报错");
        }else{
            if(parseInt(req.body.leaf)===0){
                if(category.subCategory.length===0){
                    res.redirect("/admin/category");
                }else{
                    Category.remove({"_id":{$in:category.subCategory}},function(err,docs){
                        if(err){
                            console.log("cuocuocuo");
                        }else{
                            res.redirect("/admin/category");
                        }
                    });
                }

            }else{
                //res.redirect("/admin/category");
                Category.update({"_id":req.body.pid},{"$pull":{"subCategory":req.params.id}},function(err,d2){
                    res.redirect("/admin/category");
                });
            }

        }
    });
});
function getAllCategorys(callback){
    //  定义 分类不能超过二级
    Category.find({leaf:0}).sort({"date":1}).populate({
        path:"subCategory",
        model:Category
    }).exec(function(err,docs){
        callback(null,docs);
    });
}
module.exports=router;