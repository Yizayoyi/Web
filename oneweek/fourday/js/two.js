
$("nav>div").hide();

$("nav>a").bind("click", function() {
    $(this).next().toggle();
    if ($(this).find('span').eq(0).html() == "+") {
        $(this).find('span').eq(0).html("-");
    } else {
        $(this).find('span').eq(0).html("+");
    }
});
