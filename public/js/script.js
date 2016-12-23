/* public script.js */
/*
window.onload=function(){
    var tObj=document.getElementById("area");
    tObj.addEventListener('keydown',function(e){
        if(e.keyCode===9){       //tab was pressed
            //get caret position/selection
            var start =this.selectionStart;
            var end =this.selectionEnd;

            var target= e.target;
            var value=target.value;

            target.value=value.substring(0,start)+"\t"+value.substring(end);

            // put caret at right position again (add one for the tab)
            this.selectionStart = this.selectionEnd = start+1;
            // prevent the focus lose
            e.preventDefault();

        }
    });
}*/
(function($){
    $.fn.justifyGallery=function(opts){
        var dfs={
            colCount:5,
            space:2

        },params= $.extend({},dfs,opts),_target=$(this),t=$(this).width(),l=_target.find("li").length;
        return this.each(function(){

        });
    }
})(jQuery);
$(function(){
    if($('#world-map').length>0){
        $('#world-map').vectorMap({
            map: 'cn_mill_en',
            backgroundColor:"#9bc4d6"
        });
    }
    // 后台新建子类分类
    $(".cr-btn").on("click",function(){
        var _that=$(this);
        $("#leaf1").val(_that.data("leaf"));
        $("#pid1").val(_that.data("pid"));
    });
    $(".crd-btn").on("click",function(){
        var _that=$(this);
        $("#leaf2").val(_that.data("leaf"));
        $("#pid2").val(_that.data("pid"));
        $("#confirm-delete").find("form").attr("action","/admin/category/delete/"+_that.data("oid")+"?_method=DELETE");
    });
    $('#myModal').on('hidden.bs.modal', function (e) {
        $("input[name='leaf']").val(0);
        $("#inputLable").val("");
    })
});

