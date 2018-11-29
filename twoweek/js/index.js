
/**
 * 添加元素
 */
for (var i = 0; i < 3; i++) {
    $(".main").prepend(div);
    var $row = $(".main").find("div").eq(0);
    $row.addClass("row");
    for (var j = 0; j < 4; j++) {
        $row.prepend(div);
        $flex = $row.find("div").eq(0);
        $flex.addClass("flex1");
        $flex.append(div);
        $item = $flex.find("div").eq(0);
        $item.addClass("item");
        $item.append(span);
    }
}


/**
 * 基础数据
 * coin: 金币
 * leave：当前等级
 * leave_num：当前等级的数字
 * data：拥有的数据
 * shops：商店数据和等级数据
 */
var coin = 0;
var leave = "";
var leave_num = 0;
var data = [];
var shops = [];


/**
 * 将数据显示在页面
 */
var setData = function () {
    coin = parseInt(coin);
    $("#coin").html(coin);
    $("#leave").html(leave);
    for (var i in data) {
        if (parseInt(data[i].leave) > 0) {
            $(".item").eq(i).find("span").eq(0).html(shops[parseInt(data[i].leave) - 1].name);
        }
    }

}


/**
 * 每10s上传一次数据
 */
var update = function () {
    $.post("./api/update.php", {
        file: "user",
        data: JSON.stringify({ coin: coin, leave: leave_num })
    }, function () { });
    $.post("./api/update.php", {
        file: "leave",
        data: JSON.stringify(shops)
    }, function () { });
    $.post("./api/update.php", {
        file: "data",
        data: JSON.stringify(data)
    }, function () { });
    setTimeout('update()', 10000);
}


/**
 * 程序开始
 * 开始计算收益
 */
var start = function () {
    for (var i in data) {
        if (parseInt(data[i].leave) > 0) {
            coin += parseInt(shops[parseInt(data[i].leave) - 1].income);
        }
    }
    setData();
    setTimeout('start()', 1000);
}


/**
 * 请求数据
 */
var load = layer.msg('正在初始化...', { icon: 16, shade: 0.3, time: 10000 });
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


/**
 * 寻找空位子
 */
var findEmpty = function () {
    var empty = -1;
    for (var i in data) {
        if (data[i].leave == 0) {
            empty = i;
            break;
        }
    }
    return empty;
}


/**
 * 清商店
 */
var clearShop = function () {
    $(".shop-cont").empty();
}


/**
 * 关闭商店
 */
$(".shop-close").bind("click", function() {
    $("#shade, .shop").hide();
});


/**
 * 加载商店
 */
var loadShop = function () {
    for (var i in shops) {
        $(".shop-cont").append(div);
        $div = $(".shop-cont").find("div").eq($(".shop-cont").find("div").length - 1);
        $div.addClass("shop-item");
        $div.prepend(div);
        $div.find("div").eq(0).html("购买");
        $div.find("div").eq(0).attr("data-index", i);
        if (shops[i].buy == 0) {
            $div.find("div").eq(0).addClass("disable");
        } else {
            $div.find("div").eq(0).addClass("able");
            /**
             * 购买
             */
            $div.find("div").eq(0).bind("click", function (e) {
                var index = e.target.dataset.index;
                var empty = findEmpty();
                if (empty < 0) {
                    layer.msg("位置已满", {icon: 5});
                } else {
                    if (coin < shops[index].price) {
                        layer.msg("金币不足", {icon: 5});
                    } else {
                        coin -= shops[index].price;
                        shops[index].price += shops[index].price * speed;
                        shops[index].price = parseInt(shops[index].price);
                        data[empty].leave = shops[index].leave;
                        layer.msg("购买成功", {icon: 6, time: 1000});
                        clearShop();
                        loadShop();
                    }
                }
            });
        }
        $div.prepend(div);
        $div.find("div").eq(0).html("￥");
        $div.find("div").eq(0).append(span);
        if (shops[i].buy == 0) {
            $div.find("div").eq(0).find("span").eq(0).html("???");
        } else {
            $div.find("div").eq(0).find("span").eq(0).html(shops[i].price);
        }
        $div.prepend(div);
        $div.find("div").eq(0).html(shops[i].name);
    }
}

/**
 * 打开商店
 */
$("#shop").bind("click", function() {
    clearShop();
    loadShop();
    $("#shade, .shop").show();
});
