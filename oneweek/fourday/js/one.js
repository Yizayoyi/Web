
var getY = function () {
    return Math.floor((Math.random() * 500));
}

var getSpeed = function () {
    return Math.floor((Math.random() * 100) + 30);
}

var maxX = $(document).width() - 150;
var maxY = $(document).height() - 135;
var minX = 0;
var minY = 0;
var step = 10;

var start = function ($img, speed, dir = "rd") {
    var x = $img[0].x;
    var y = $img[0].y;
    var d = dir;
    if (d == "ru" && y <= minY) {
        d = "rd"
    }
    if (d == "ru" && x >= maxX) {
        d = "lu"
    }
    if (d == "rd" && x >= maxX) {
        d = "ld"
    }
    if (d == "rd" && y >= maxY) {
        d = "ru"
    }
    if (d == "lu" && y <= minY) {
        d = "ld"
    }
    if (d == "lu" && x <= minX) {
        d = "ru"
    }
    if (d == "ld" && y >= maxY) {
        d = "lu"
    }
    if (d == "ld" && x <= minX) {
        d = "rd"
    }
    if (dir == "rd") {
        x += step;
        y += step;
    }
    if (dir == "ru") {
        x += step;
        y -= step;
    }
    if (dir == "lu") {
        x -= step;
        y -= step;
    }
    if (dir == "ld") {
        x -= step;
        y += step;
    }
   
    $img.css("top", y);
    $img.css("left", x);
    setTimeout(function() {
        start($img, speed, d);
    }, speed);
}

$("button").bind("click", function () {
    $("body").prepend("<img src='images/onead.png'>");
    var $img = $("img").eq(0);
    $img.css("top", getY());
    start($img, getSpeed());
});
