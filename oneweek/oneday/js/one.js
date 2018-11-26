
$(".strong").hide();

$("#form").submit(function () {
    if ($("p").length > 0) {
        layer.msg("请填写正确的信息", { icon: 5 });
    } else {
        var username = $("input[name='username']").val();
        var password = $("input[name='password1']").val();
        var name = $("input[name='name']").val();
        var sex = $("input[name='sex']").val();
        var birthday = $("input[name='birthday']").val();
        var address = $("input[name='address']").val();
        layer.alert("用户名:" + username + "<br>密码:" + password + "<br>姓名:" + name + "<br>性别:" + sex + "<br>生日:" + birthday + "<br>地址:" + address + "<br>", { title: "您输入的信息如下" });
    } 
    return false;
});

var clearStrong = function () {
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

var setStrong = function (strong) {
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

$("input[name='username'], input[name='password1']").bind('input propertychange', function () {
    var zm = /[a-z]/i; // 字母
    var sz = /[0-9]/; // 数字
    var username = $(this).val();
    var tip = "密码";
    if ($(this).attr("type") == "text") {
        tip = "用户名";
    }
    if (!(username.length > 6 && zm.test(username) && sz.test(username))) {
        if ($(this).next()[0].tagName != "P") {
            $(this).after("<p>* " + tip + "不合法 请输入数字字母组合 并且大于6位</p>");
        }
    } else {
        if ($(this).next()[0].tagName == "P") {
            $(this).next().remove();
        }
    }
});

$("input[name='password2']").bind('input propertychange', function () {
    var password1 = $("input[name='password1']").val();
    var password2 = $("input[name='password2']").val();
    if (password1 != password2) {
        if ($(this).next()[0].tagName != "P") {
            $(this).after("<p>* 两次密码不一致</p>");
        }
    } else {
        if ($(this).next()[0].tagName == "P") {
            $(this).next().remove();
        }
    }
});
