/* public script.js */
$(function(){
    $('#world-map').vectorMap({
        map: 'cn_mill_en',
        backgroundColor:"#9bc4d6"
    });
    $("#tagcloud").tx3TagCloud({
        multiplier: 5
    });

});

