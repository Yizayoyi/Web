
var data = [
    "长大后，才知道我们都被大人给骗了。",
    "小时候，听大人讲故事都是完美结局；"
];

var a1 = '<div class="block"><div class="item">';
var a2 = '</div></div>';

var getDeg_one = function () {
    return Math.floor((Math.random() * 45) - 45);
}

var getDeg_two = function () {
    return Math.floor((Math.random() * 45));
}

var getDeg = function () {
    if (Math.floor((Math.random() * 10)) > 5) {
        return getDeg_one();
    }
    return getDeg_two();
}

for (var i in data) {
    $t = $(".board").prepend(a1 + data[i] + a2);
    $t.find(".item").eq(0).css("transform", "rotate(" + getDeg() + "deg)");
}

var add = function () {
    $("#board").val("");
    layer.open({
        type: 1,
        title: "请输入留言内容",
        skin: 'layui-layer-rim',
        area: ['420px', '240px'],
        content: $("#text")
    });
}

var addBoard = function () {
    layer.closeAll();
    $t = $(".board").prepend(a1 + $("#board").val() + a2);
    $t.find(".item").eq(0).css("transform", "rotate(" + getDeg() + "deg)");
}

