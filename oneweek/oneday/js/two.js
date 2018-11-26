
src = "http://139.199.94.141/mv.mp4";
$("body").append("<video></video>");
$video = $("video");
var video = $video[0];
$video.attr({
    controls: "",
    src: src,
    autoplay: ""
});
var speed = video.playbackRate;
var volume = video.volume;
var setWcont = function() {
    $("#speed").html(speed);
    $("#volume").html(volume*100);
    video.playbackRate = speed;
    video.volume = volume;
}
setWcont();
$(".item").eq(0).click(function() {
    if (speed > 0.2) {
        speed -= 0.1;
    }
    setWcont();
});
$(".item").eq(1).click(function() {
    if (speed < 2) {
        speed += 0.1;
    }
    setWcont();
});
$(".item").eq(2).click(function() {
    if (volume > 0.15) {
        volume -= 0.05;
    }
    setWcont();
});
$(".item").eq(3).click(function() {
    if (volume < 1) {
        volume += 0.05;
    }
    setWcont();
});
