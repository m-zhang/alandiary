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
$(function(){
    if($('#world-map').length>0){
        $('#world-map').vectorMap({
            map: 'cn_mill_en',
            backgroundColor:"#9bc4d6"
        });
    }
});

