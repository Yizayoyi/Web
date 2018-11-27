
var getA = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

$("#div1, #div2").hide();

var username = getA("username");
var email = getA("email");
var birthday = getA("birthday");
var endyear = getA("endyear");
var workyear = getA("workyear");
var home = getA("home");

if (username == null) {
    $("#div1").show();
} else {
    $("#username").html(username);
    $("#email").html(email);
    $("#birthday").html(birthday);
    $("#endyear").html(endyear);
    $("#workyear").html(workyear);
    $("#home").html(home);
    $("#div2").show();
}
