
$(".num").bind("click", function () {
    $("input").val($("input").val() + $(this).html());
});

$(".fun").bind("click", function () {
    var str = $("input").val();
    var l = str.substr(str.length - 1, 1);
    if (str != "" && l != "+" && l != "-" && l != "×" && l != "÷") {
        $("input").val($("input").val() + $(this).html());
    }
});

$(".clear").bind("click", function () {
    $("input").val("");
    $("#result").html("");
});

$(".calc").bind("click", function () {
    var str = $("input").val();
    if (str == "") {
        $("#result").html("0");
    } else {
        var add = str.split("+");
        for (var i in add) {
            var sub = add[i].split("-");
            for (var j in sub) {
                var mul = sub[j].split("×");
                for (var k in mul) {
                    var div = mul[k].split("÷");
                    if (div.length > 1) {
                        var tem = parseFloat(div[0]);
                        for (var l = 1; l < div.length; l++) {
                            tem /= parseFloat(div[l]);
                        }
                        mul[k] = tem;
                        sub[j] = tem;
                    }

                }
                if (mul.length > 1) {
                    var tem = 1;
                    for (var k in mul) {
                        tem *= parseFloat(mul[k]);
                    }
                    sub[j] = tem;
                    add[i] = tem;
                }
            }
            if (sub.length > 1) {
                var tem = parseFloat(sub[0]);
                for (var k = 1; k < sub.length; k++) {
                    tem -= parseFloat(sub[k]);
                }
                add[i] = tem;
            }
        }
        var tem = parseFloat(add[0]);
        for (var k = 1; k < add.length; k++) {
            tem += parseFloat(add[k]);
        }
        $("#result").html(tem);
    }
});

