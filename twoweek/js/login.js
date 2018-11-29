
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

$("#login").submit(function () {
    var username = login.username.value;
    var password = login.password.value;
    if (username == "" || password == "") {
        layer.msg("用户名或密码不能为空", { icon: 5 });
    } else {
        var load = layer.load(0, { shade: 0.3 });
        $.post("api/login.php", {
            action: "login",
            username: username,
            password: password
        }, function (res) {
            layer.close(load);
            var data = JSON.parse(res);
            if (data.state == "success") {
                document.location.href = "/";
            }
            if (data.state == "fail") {
                layer.msg("用户名或密码错误", { icon: 5 });
            }
        });
    }
    return false;
});

$("#reg").submit(function () {
    var username = reg.username.value;
    var password1 = reg.password1.value;
    var password2 = reg.password2.value;
    if (username == "" || password1 == "") {
        layer.msg("用户名或密码不能为空", { icon: 5 });
    } else if (password1 != password2) {
        layer.msg("两次密码不一致", { icon: 5 });
    } else {
        var load = layer.load(0, { shade: 0.3 });
        $.post("api/login.php", {
            action: "reg",
            username: username,
            password: password1
        }, function (res) {
            layer.close(load);
            var data = JSON.parse(res);
            if (data.state == "success") {
                document.location.href = "/";
            }
            if (data.state == "fail") {
                layer.msg("该用户名已存在", { icon: 5 });
            }
        });
    }
    return false;
});
