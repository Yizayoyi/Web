<?php require_once './function/checkAdmin.php';?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>后台用户管理</title>
    <style>
        html,
        body {
            margin: 0;
            width: 100%;
            height: 100%;
            background: whitesmoke;
        }

        main {
            width: 95%;
            padding-top: 30px;
            margin: 0 auto 0;
        }

        .item {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
                -ms-flex-direction: row;
                    flex-direction: row;
            -webkit-box-align: center;
                -ms-flex-align: center;
                    align-items: center;
            -webkit-box-pack: center;
                -ms-flex-pack: center;
                    justify-content: center;
            background: white;
        }

        .item>div {
            -webkit-box-flex: 1;
                -ms-flex: 1;
                    flex: 1;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
                -ms-flex-direction: row;
                    flex-direction: row;
            -webkit-box-align: center;
                -ms-flex-align: center;
                    align-items: center;
            -webkit-box-pack: center;
                -ms-flex-pack: center;
                    justify-content: center;
            border: 1px solid whitesmoke;
            height: 60px;
        }

        input {
            height: 30px;
            line-height: 30px;
            outline: none;
            border: 0;
            border-radius: 30px;
            padding: 0 15px;
            background: whitesmoke;
        }

        input[type='button'] {
            cursor: pointer;
        }

        input:focus,
        input:hover {
            background: skyblue;
            color: white;
        }
    </style>
</head>

<body>
    <main></main>
</body>
<script src="js/jquery.js"></script>
<script src="js/layer/layer.js"></script>
<script>
    var div = "<div><div>";
    var div_item = '<div class="item"></div>';
    var input_text = '<input type="text" placeholder="新密码">';
    var input_number = '<input type="number" placeholder="金币数量">';
    var input_button = '<input type="button">';
    var load = layer.msg('数据加载中...', { icon: 16, shade: 0.3, time: 10000 });
    var delData = function () {
        $("main").empty();
    }
    var loadData = function () {
        $.post("./api/admin_act.php", {
            action: "get"
        }, function (res) {
            var data = JSON.parse(res);
            layer.close(load);
            var $main = $("main").eq(0);
            for (var i in data) {
                $main.prepend(div_item);
                var $item = $(".item").eq(0);
                $item.prepend(div);
                var $div = $item.find('div').eq(0);
                $div.prepend(input_button);
                var $input = $div.find('input').eq(0);
                $input.attr("value", "删除用户");
                $input.attr("data-user", data[i].username);
                /**
                 * 绑定删除用户事件
                 */
                $input.bind("click", function (e) {
                    var username = e.target.dataset.user;
                    $.post("./api/admin_act.php", {
                        action: "del",
                        username: username
                    }, function () {
                        layer.msg("删除成功", { icon: 6, time: 1000 });
                        delData();
                        loadData();
                    });
                });
                $item.prepend(div);
                $div = $item.find('div').eq(0);
                $div.prepend(input_button);
                $input = $div.find('input').eq(0);
                $input.attr("value", "修改密码");
                $input.attr("data-user", data[i].username);
                /**
                 * 绑定修改密码事件
                 */
                $input.bind("click", function (e) {
                    var username = e.target.dataset.user;
                    $.post("./api/admin_act.php", {
                        action: "change",
                        username: username,
                        data: $(this).prev().val()
                    }, function () {
                        layer.msg("修改成功", { icon: 6, time: 1000 });
                        delData();
                        loadData();
                    });
                });
                $div.prepend(input_text);
                $item.prepend(div);
                $div = $item.find('div').eq(0);
                $div.prepend(input_button);
                $input = $div.find('input').eq(0);
                $input.attr("value", "增加金币");
                $input.attr("data-user", data[i].username);
                /**
                 * 绑定增加金币事件
                 */
                $input.bind("click", function (e) {
                    var username = e.target.dataset.user;
                    $.post("./api/admin_act.php", {
                        action: "add",
                        username: username,
                        data: $(this).prev().val()
                    }, function () {
                        layer.msg("增加成功", { icon: 6, time: 1000 });
                        delData();
                        loadData();
                    });
                });
                $div.prepend(input_number);
                $item.prepend(div);
                $div = $item.find('div').eq(0);
                $div.html(data[i].time);
                $item.prepend(div);
                $div = $item.find('div').eq(0);
                $div.html(data[i].leave);
                $item.prepend(div);
                $div = $item.find('div').eq(0);
                $div.html(data[i].coin);
                $item.prepend(div);
                $div = $item.find('div').eq(0);
                $div.html(data[i].username);
            }
        });
    }
    loadData();
</script>

</html>