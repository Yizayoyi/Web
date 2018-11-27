
$("nav>div").hide();

$("nav>a").hover(function() {
    var x = $(this)[0].offsetLeft;
    var y = 60;
    $(this).next().css("top", y);
    $(this).next().css("left", x);
    $(this).next().css("width", $(this)[0].clientWidth);
    $(this).next().show();
}, function() {
    if (!$(this).next().is(":hover")) {
        $(this).next().hide();
    }
});

$("nav>div").hover(function() {
    $(this).show();
}, function() {
    $(this).hide();
});
