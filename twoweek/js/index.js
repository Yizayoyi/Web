
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
        $item.append(img);
    }
}

/**
 * 添加拖拽事件
 */
$(".item").each(function (index) {
    $(this).attr('data-index', index);
    $(this).attr('ondragover', "allowDrop(event)");
    $(this).attr('ondrop', "drop(event)");
    $(this).find("img").eq(0).attr('draggable', "true");
    $(this).find("img").eq(0).attr('ondragstart', "drag(event)");
});

/**
 * 基础数据
 * coin: 金币
 * leave：当前等级
 * leave_num：当前等级的数字
 * data：拥有的数据
 * shops：商店数据和等级数据
 * time：记录时间
 */
var coin = 0;
var leave = "";
var leave_num = 0;
var data = [];
var shops = [];
var ltime = "";


/**
 * 将数据显示在页面
 */
var setData = function () {
    coin = parseInt(coin);
    $("#coin").html(coin);
    $("#leave").html(leave);
    for (var i in data) {
        if (parseInt(data[i].leave) > 0) {
            $(".item").eq(i).find("img").eq(0).attr("src", shops[parseInt(data[i].leave) - 1].src);
        } else {
            $(".item").eq(i).find("img").eq(0).attr("src", 'images/person/0.png');
        }
    }

}


/**
 * 每10s上传一次数据
 */
var update = function () {
    $.post("./api/update.php", { // 上传用户数据
        file: "user",
        data: JSON.stringify({ coin: coin, leave: leave_num, time: ltime })
    }, function () { });
    $.post("./api/update.php", { // 上传商店信息
        file: "leave",
        data: JSON.stringify(shops)
    }, function () { });
    $.post("./api/update.php", { // 上传用户数据(拥有的士兵)
        file: "data",
        data: JSON.stringify(data)
    }, function () { });
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
    var now = new Date();
    ltime = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    setData();
    update();
    setTimeout('start()', 1000);
}


/**
 * 请求数据
 */
var load = layer.msg('正在初始化...', { icon: 16, shade: 0.3, time: 10000 });
$.post("./api/get.php", { // 获取商店数据
    action: "leave"
}, function (res) {
    shops = JSON.parse(res);
    $.post("./api/get.php", { // 获取用户数据
        action: "user"
    }, function (res) {
        res = JSON.parse(res);
        coin = res.coin;
        leave_num = parseInt(res.leave);
        leave = shops[leave_num - 1].name;
        ltime = res.time;
        $.post("./api/get.php", { // 获取用户数据(拥有的士兵)
            action: "data"
        }, function (res) {
            data = JSON.parse(res);
            setData();
            layer.close(load);
            var now = new Date(); // 开始计算离线收益
            if (ltime == "") {
                ltime = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
            } else {
                var temp_second = new Date() - new Date(ltime);
                temp_second = Math.floor(temp_second / 1000);
                if (temp_second > 60) { // 超过60s为离线状态 计算离线收益
                    temp_second = temp_second > 7200 ? 7200 : temp_second; // 最多7200s离线收益
                    var income = 0;
                    for (var i in data) {
                        if (parseInt(data[i].leave) > 0) {
                            income += parseInt(shops[parseInt(data[i].leave) - 1].income) * temp_second;
                        }
                    }
                    coin += income;
                    layer.alert(income, {
                        title: "离线收益(最高两小时)",
                        icon: 6
                    });
                }
            }
            start();
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
$(".shop-close").bind("click", function () {
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
                    layer.msg("位置已满", { icon: 5 });
                } else {
                    if (coin < shops[index].price) {
                        layer.msg("金币不足", { icon: 5 });
                    } else {
                        coin -= shops[index].price;
                        shops[index].price += shops[index].price * speed;
                        shops[index].price = parseInt(shops[index].price);
                        data[empty].leave = shops[index].leave;
                        layer.msg("购买成功", { icon: 6, time: 1000 });
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
        $div.find("div").eq(0).append(img);
        $div.find("div").eq(0).find("img").eq(0).attr("src", shops[i].src);
    }
}

/**
 * 打开商店
 */
$("#shop").bind("click", function () {
    clearShop();
    loadShop();
    $("#shade, .shop").show();
});
