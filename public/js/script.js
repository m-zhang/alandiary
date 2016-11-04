/* public script.js */

window.onload=function(){
    var converter=new showdown.Converter();
    var pad=document.getElementById('pad');
    var markdownArea=document.getElementById('markdown');
    var previousMarkdownValue;

    /**
     * The last issue we need to resolve is forcing our tab button to act as we would expect a tab button to act in our textarea.
     * Currently if we press the tab button in our textarea, it will make us lose focus. This is terrible.
     * Let¡¯s add a function for our textarea that fixes this tab issue.
     */
    pad.addEventListener('keydown',function(e){
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
    var convertTextAreaToMarkdown=function(){
        var markdownText=pad.value;
        previousMarkdownValue=markdownText;
        var html=converter.makeHtml(markdownText);
        markdownArea.innerHTML=html;
    }
    var didChangeOccur=function(){
        if(previousMarkdownValue != pad.value){
            return true;
        }
        return false;
    }

    setInterval(function(){
        if(didChangeOccur()){
            convertTextAreaToMarkdown();
        }
    },1000);

    pad.addEventListener('input',convertTextAreaToMarkdown);

    convertTextAreaToMarkdown();
}


