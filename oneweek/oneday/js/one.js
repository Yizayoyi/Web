
$(".strong").hide();

$("#form").submit(function() {
    var username = $("input[name='username']").val();
    var password1 = $("input[name='password1']").val();
    var password2 = $("input[name='password2']").val();
    return false;
});

var clearStrong = function() {
    $("#strong-one").removeClass("strong-one");
    $("#strong-two").removeClass("strong-one");
    $("#strong-three").removeClass("strong-one");
    $("#strong-one").removeClass("strong-two");
    $("#strong-two").removeClass("strong-two");
    $("#strong-three").removeClass("strong-two");
    $("#strong-one").removeClass("strong-three");
    $("#strong-two").removeClass("strong-three");
    $("#strong-three").removeClass("strong-three");
}

var setStrong = function(strong) {
    clearStrong();
    if (strong == 1) {
        $("#strong-one").addClass("strong-one");
    }
    if (strong == 2) {
        $("#strong-one").addClass("strong-two");
        $("#strong-two").addClass("strong-two");
    }
    if (strong == 3) {
        $("#strong-one").addClass("strong-three");
        $("#strong-two").addClass("strong-three");
        $("#strong-three").addClass("strong-three");
    }
}

$("input[name='password1']").bind('input propertychange', function () {
    var password = $(this).val();
    var xzm = /[a-z]/; // 小写字母
    var dzm = /[A-Z]/; // 大写字母
    var sz = /[0-9]/; // 数字
    var qt = /[#^$@%&!?%*\.]/gi; // 其他字符
    if (password.length > 6 && (xzm.test(password) || dzm.test(password)) && sz.test(password)) {
        $(".strong").show();
        setStrong(1);
        if (xzm.test(password) && dzm.test(password)) {
            setStrong(2);
        }
        if (qt.test(password)) {
            setStrong(3);
        }
    } else {
        setStrong(0);
    }
});

$("input[name='username']").bind('input propertychange', function () {
    var zm = /[a-z]/i; // 字母
    var sz = /[0-9]/; // 数字
    var username = $(this).val();
    console.log($(this).next()[0]).tagName;
    if (!(username.length > 6 && zm.test(username) && sz.test(username))) {
        if ($(this).next().tagName != "p") {
            $(this).after("<p>* 用户名不合法 请输入数字字母组合 并且大于6位</p>");
        }
    } else {
        if ($(this).next().tagName == "p") {
            $(this).next().remove();
        }
    }
});
