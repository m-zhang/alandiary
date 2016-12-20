var express=require("express");
var router=express.Router();
//var Category=mongoose.model('categorys');
//router.post('/add',function(req,res){
//    var params={
//        name:req.body.label,
//        articles:req.body.article||[],
//        subCategory:req.body.subCategory||[]
//    }
//    Category.create(params,function(err){
//        if(err){
//            //console.log(err);
//            res.render('error', {
//                message: err.message,
//                error: err
//            });
//        }else{
//            var docs = Array.prototype.slice.call(arguments, 1);
//            console.log(docs);
//            res.redirect('/admin/article');
//        }
//    });
//});
module.exports=router;