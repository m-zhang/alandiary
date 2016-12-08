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
            initCss:{

            }
        },params= $.extend({},dfs,opts),_target=$(this);
        console.log(11111111);
        console.log($(this).width());
        this.init=function(){

        }
        return this.each(function(){
            console.log(_target);
        });
    }
})(jQuery);
$(function(){
    $('#world-map').vectorMap({
        map: 'cn_mill_en',
        backgroundColor:"#9bc4d6"
    });
    $('.img-gallery').justifyGallery();
    //$('.gallery').justifyGallery({
    //    'maxRowHeight': '100px',
    //    'spacing': 2,
    //    'resizeCSS': {'min-width': '0',
    //        'min-height': '0',
    //        'height': 'auto',
    //        'width': 'auto',
    //        'max-width': '200px',
    //        'max-height': 'none'}
    //});

});

