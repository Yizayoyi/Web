
var snow = "<div></div>";

var getX = function () {
    return Math.floor(Math.random() * ($(document).width() - 200) + 100);
}

var getY = function () {
    return Math.floor(Math.random() * 100);
}

var getTop = function () {
    return Math.floor(Math.random() * 10);
}

var getLeft = function () {
    if (Math.floor(Math.random() * 100) > 50) {
        return Math.floor(Math.random() * 10);
    } else {
        return -Math.floor(Math.random() * 10);
    }
}

var getSize = function () {
    return Math.floor(Math.random() * 20) + 3;
}

var number = 100;
var speed = 100;

var start = function ($snow) {
    var top = $snow.position().top;
    var left = $snow.position().left;
    top += getTop();
    left += getLeft();
    $snow.css("top", top);
    $snow.css("left", left);
    if (top < $(document).height() - 150) {
        setTimeout(function () {
            start($snow);
        }, speed);
    }
}

var create = function () {
    for (var i = 0; i < number; i++) {
        $("body").prepend(snow);
        var $snow = $("body").find("div").eq(0);
        var size = getSize();
        $snow.css("width", size + "px");
        $snow.css("height", size + "px");
        $snow.css("top", getY() + "px");
        $snow.css("left", getX() + "px");
        start($snow);
    }
    setTimeout("create()", 5000);
}

create();


