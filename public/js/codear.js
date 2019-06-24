// Get the video
var video = document.getElementById("myVideo");

// Get the button
var btn = document.getElementById("myBtn");

// Pause and play the video, and change the button text
function myFunction() {
    if (video.paused) {
        video.play();
        btn.innerHTML = "Pause";
    } else {
        video.pause();
        btn.innerHTML = "Play";
    }
}
let flagside = 1;
let schit = $('div.schit');
setInterval(function () {
    flagside *= -1;
    if (flagside > 0) {
        schit.attr('style', '');
    } else {
        schit.css({left: '10px'});
    }
    schit.attr('class', '');
    tmr = Date.now();
    console.log(tmr, Date.now());
    setTimeout(function () {
        console.log(tmr - Date.now());
        schit.attr('class', 'schit animated bounceInDown');
    }, 6000);
    setTimeout(function () {
        console.log(tmr - Date.now());
        schit.attr('class', 'schit animated bounceInDown');
    }, 9000);
}, 10000);


setTimeout(function () {
    $('.promo').addClass( 'animated bounceInUp').show();
}, 2000);