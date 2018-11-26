
var data = [
    {
        name: "梅菜扣肉",
        src: "images/menus/1.png",
        price: 38,
        num: 1
    },
    {
        name: "宫保鸡丁",
        src: "images/menus/2.png",
        price: 28,
        num: 1
    },
    {
        name: "西红柿炒鸡蛋",
        src: "images/menus/3.png",
        price: 18,
        num: 1
    },
    {
        name: "剁椒鱼头",
        src: "images/menus/4.png",
        price: 38,
        num: 1
    },
    {
        name: "皮蛋豆腐",
        src: "images/menus/5.png",
        price: 18,
        num: 1
    },
    {
        name: "酸甜土豆丝",
        src: "images/menus/6.png",
        price: 8,
        num: 1
    },
    {
        name: "四喜丸子",
        src: "images/menus/7.png",
        price: 28,
        num: 1
    },
    {
        name: "糖醋排骨",
        src: "images/menus/8.png",
        price: 28,
        num: 1
    },
    {
        name: "麻婆豆腐",
        src: "images/menus/9.png",
        price: 18,
        num: 1
    }
];

var a1 = '<tr><td><div class="shop-info"><img src="';
var a2 = '"><div>';
var a3 = '</div></div></td><td>￥';
var a4 = '</td><td><input type="number" value="';
var a5 = '"></td><td><span class="money">￥';
var a6 = '</span></td><td><a href="javascript:layer.msg(\'删除失败\');">删除</a></td></tr>';

for (var i in data) {
    var element = a1 + data[i].src + a2 + data[i].name + a3 + data[i].price + a4 + data[i].num + a5 + (data[i].num*data[i].price) + a6;
    $("tbody").append(element);
}
