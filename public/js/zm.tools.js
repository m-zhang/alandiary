/**
 * Created by zhangming on 2017/4/1.
 */
(function($){
    Date.prototype.getBJDate = function () {
        var d = new Date(), currentDate = new Date(), tmpHours = currentDate.getHours();
        var time_zone = -d.getTimezoneOffset() / 60;
        console.log("time_zone"+time_zone);
        if (time_zone < 0) {
            console.log("xxxxx");
            time_zone = Math.abs(time_zone) + 8; currentDate.setHours(tmpHours + time_zone);
        } else {
            time_zone -= 8; currentDate.setHours(tmpHours - time_zone);
            console.log("yy");
        }
        return currentDate;
    }
})(jQuery);
