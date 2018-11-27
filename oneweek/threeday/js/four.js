
$("html").mousemove(function(e) {
    $("#screenX").html(e.screenX);
    $("#screenY").html(e.screenY);
    $("#clientX").html(e.clientX);
    $("#clientY").html(e.clientY);
});
