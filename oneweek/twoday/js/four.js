
var data = [
    {
        name: "介绍 (Introduction)",
        son: [
            "背景 (Background)",
            "历史 (History)",
            "版本 (Veision)"
        ]
    },
    {
        name: "使用说明 (Manual)",
        son: [
            "基本方法 (Basic)",
            "提高进阶 (Improval)",
            "实际应用 (Application)"
        ]
    },
    {
        name: "标签属性 (Tag)",
        son: [
            "常用标签 (Usual)",
            "特殊标签 (Spec)",
            "新增标签 (New)"
        ]
    },
    {
        name: "参考书籍 (Reference Books)",
        son: [
            "W3C (W3C)",
            "HTML5 (HTML5)",
            "DW (Dreamweaver)"
        ]
    },
    {
        name: "总结 (Summary)",
        son: []
    }
];

$("h3").eq(0).after("<ol></ol>");
var $t = $("ol").eq(0);

for (var i in data) {
    $t.append("<li></li>");
    var $li = $t.find("li").eq($t.find("li").length - 1);
    $li.append("<a></a>");
    var $a = $li.find("a").eq(0);
    $a.html(data[i].name);
    $a.attr("href", "#tag" + i);
    $li.append("<ol></ol>");
    var $ol = $li.find("ol").eq(0);
    for (var j in data[i].son) {
        $ol.append("<li></li>");
        var $olli = $ol.find("li").eq($ol.find("li").length - 1);
        $olli.append("<a></a>");
        var $lia = $olli.find("a").eq(0);
        $lia.html(data[i].son[j]);
        $lia.attr("href", "#tag" + i + "_" + j);
    }
}

var text = "超文本标记语言，标准通用标记语言下的一个应用。“超文本”就是指页面内可以包含图片、链接，甚至音乐、程序等非文字元素。超文本标记语言的结构包括“头”部分（英语：Head）、和“主体”部分（英语：Body），其中“头”部提供关于网页的信息，“主体”部分提供网页的具体内容。";
var $t = $("div").eq(0);
var h21 = '<h2 id="tag';
var h22 = '">';
var h23 = '</h2>';
var h31 = '<h3 id="tag';
var h32 = '">';
var h33 = '</h3>';
var p = "<p>" + text + "</p>";

for (var i in data) {
    var ii = parseInt(i) + 1;
    $t.append(h21 + i + h22 + ii + " " + data[i].name + h23);
    for (var j in data[i].son) {
        var jj = parseInt(j) + 1;
        $t.append(h31 + i + "_" + j + h32 + ii + "." + jj + " " + data[i].son[j] + h33);
        $t.append(p);
    }
}

