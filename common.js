/**
 * Created by zhangming on 2016/10/9.
 * 公共组件库
 */

var ComponentLib = {
    config:{
        imgUrl:"http://oht39vaz1.bkt.clouddn.com/"
    },
    verifyUser: function (req, res, next) {

        if(req.session.loggedIn){
            next();
        }else{
            res.redirect('/login');
        }
    },
    logout: function (req, res, next) {
        req.session.loggedIn = false;
        req.session.curMail = null;
        res.redirect('/');
    },
    now:function(){
        var d=new Date();
        return d.getFullYear()+"-"+ (parseInt(d.getMonth()+1)>=10?parseInt(d.getMonth()+1):"0"+parseInt(d.getMonth()+1))+"-"+d.getDate();
    },
    getCurUser:function(req,res,model,callback){
        if(req.session.curMail){
            model.findOne({email:req.session.curMail},callback);
        }else{
            res.redirect("/login");
        }
    }

}

module.exports = ComponentLib;
