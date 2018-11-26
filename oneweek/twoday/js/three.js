
var menu = '<p><img src="images/threemenu.png"><span>美食图片&nbsp;...01</span></p>';

$(".menu-l").each(function() {
    for (var i = 0; i < 9; i++) {
        $(this).append(menu);
    }
});
