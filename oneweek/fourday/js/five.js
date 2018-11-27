
$("form").submit(function (e) {
    var name = $("input[name='name']").val();
    var password = $("input[name='password']").val();
    var zm = /[a-z]/i;
    if (name == "" || zm.test(password) || password.length != 6) {
        if (name == "") {
            layer.msg("姓名不能为空", { icon: 5 });
        } else {
            layer.msg("支付密码应为6位数字", { icon: 5 });
        }
    } else {
        layer.msg("恭喜消费" + $("#money").html() + "元", { icon: 6 });
    }
    return false;
});

$(".pay").bind("click", function () {
    $("form").submit();
});

var money = 0;

var pc = {
    pc1: 680,
    pc2: 2400,
    pc3: 12888
};

var mbps = 25;

var calcMoney = function () {
    money = pc[$("input[name='pc']:checked").val()] + mbps * parseInt($("input[type='range']").val());
}



var setMoney = function () {
    calcMoney();
    $("#money").html(money);
}

setMoney();

$("input[name='pc']").change(function () {
    setMoney();
});
