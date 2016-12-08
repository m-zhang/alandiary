/**
 * Created by zhangming on 2016/10/9.
 * 公共组件库
 */

var ComponentLib = {
    verifyUser: function (req, res, next) {
        next();
        //if(req.session.loggedIn){
        //    next();
        //}else{
        //    res.redirect('/login');
        //}
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
    config:{
        imgUrl:"http://oht39vaz1.bkt.clouddn.com/"
    }
}

module.exports = ComponentLib;
