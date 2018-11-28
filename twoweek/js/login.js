
$(".reg").hide();

$(".tab-item").bind("click", function (e) {
    var func = e.target.dataset.func;
    if (func == "login") {
        $(".reg").hide();
        $(".login").show();
        $(".tab-item").eq(1).removeClass("tab-action");
        $(".tab-item").eq(0).addClass("tab-action");
    } else {
        $(".login").hide();
        $(".reg").show();
        $(".tab-item").eq(0).removeClass("tab-action");
        $(".tab-item").eq(1).addClass("tab-action");
    }
});
