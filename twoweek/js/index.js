
var coin = 0;
var leave = "";
var leave_num = 0;
var data = [];
var shops = [];

var setData = function () {
    $("#coin").html(coin);
    $("#leave").html(leave);
    for (var i in data) {
        if (parseInt(data[i].leave) > 0) {
            $(".item").eq(i).html(shops[parseInt(data[i].leave) - 1].name);
        }
    }
    
}

var update = function () {
    $.post("./api/update.php", {
        file: "user",
        data: JSON.stringify({coin: coin, leave: leave_num})
    }, function () {});
    $.post("./api/update.php", {
        file: "leave",
        data: JSON.stringify(shops)
    }, function () {});
    $.post("./api/update.php", {
        file: "data",
        data: JSON.stringify(data)
    }, function () {});
    setTimeout('update()', 10000);
}

var load = layer.msg('正在初始化...', {icon: 16, shade: 0.3, time: 10000});
$.post("./api/get.php", {
    action: "leave"
}, function (res) {
    shops = JSON.parse(res);
    $.post("./api/get.php", {
        action: "user"
    }, function (res) {
        res = JSON.parse(res);
        coin = res.coin;
        leave_num = parseInt(res.leave);
        leave = shops[leave_num - 1].name;
        $.post("./api/get.php", {
            action: "data"
        }, function (res) {
            data = JSON.parse(res);
            setData();
            layer.close(load);
            start();
            update();
        });
    });
});

var start = function () {
    for (var i in data) {
        if (parseInt(data[i].leave) > 0) {
            coin += parseInt(shops[parseInt(data[i].leave) - 1].income);
        }
    }
    setData();
    setTimeout('start()', 1000);
}

