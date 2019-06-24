(function ($) {
    "use strict";

    var animateAllNames = ['bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'headShake', 'swing', 'tada', 'wobble', 'jello', 'bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight',
        'bounceInUp', 'bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp', 'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig',
        'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig',
        'fadeOutUp', 'fadeOutUpBig', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY', 'lightSpeedIn', 'lightSpeedOut',
        'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight', 'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft',
        'rotateOutUpRight', 'hinge', 'jackInTheBox', 'rollIn', 'rollOut', 'zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp', 'zoomOut', 'zoomOutDown', 'zoomOutLeft',
        'zoomOutRight', 'zoomOutUp', 'slideInDown', 'slideInLeft', 'slideInRight', 'slideInUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight', 'slideOutUp', 'heartBeat'];

    let animateInNames = [];
    let animateOutNames = [];
    var animateNames = [];

    $(animateAllNames).each(function (key, str) {
        console.log(key, str);
        if (str.indexOf('Out') > -1) {
            animateOutNames.push(str);
        } else if (str.indexOf('In') > -1) {
            animateInNames.push(str);
        } else {
            animateNames.push(str);
        }
    })

    var lastScrollTop = 0;

    function hasScrolled() {
        if ($(document).scrollTop() > 60 && !$("#header").hasClass("header--scrolled")) {
            $("#header").addClass("header--scrolled");
        } else if ($(document).scrollTop() <= 60 && $("#header").hasClass("header--scrolled")) {
            $("#header").removeClass("header--scrolled");
        }
    }

    function emailValidation(email_address) {
        var pattern = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        return pattern.test(email_address);
    }

    function contactForm() {
        var contact_form = $('#contact-form');

        contact_form.on('submit', function (e) {

            var input = $(this).find('input, textarea');
            var required_fields = $(this).find('.required');
            var email_field = $('.field--email');
            var contact_name_val = $('.field--name').val();
            var contact_email_val = email_field.val();
            var contact_message_val = $('.field--message').val();
            var contact_notice = $('.form--notice');

            e.preventDefault();

            if (contact_name_val == '' || contact_email_val == '' || contact_message_val == '') {
                contact_notice.stop(true).hide().html(contact_input_error).fadeIn();
                required_fields.each(function () {
                    $(this).addClass("input-error");
                });

            } else if (!emailValidation(contact_email_val)) {
                contact_notice.stop(true).hide().html(contact_email_error).fadeIn();
                email_field.addClass("input-error");
                $('#email').focus();
            } else {
                $.ajax({
                    type: 'POST',
                    url: 'php/contact.php',
                    data: {
                        name: contact_name_val,
                        email: contact_email_val,
                        message: contact_message_val,
                        emailAddress: contact_email
                    },
                    success: function () {
                        contact_notice.stop(true).hide().html(contact_success).fadeIn();
                        contact_form[0].reset();
                        input.blur();
                    }
                });
            }
            return false;

        });
    }

    function processAnimate() {
        let i = 0;
        $('.skills__item div.skills__progress span, .animated-el, h1, h2, h3, h4, h5, h6, [class*=title], input, textarea, .btn, header, footer, p, img')
            .each(function () {
                let target = $(this);
                let targetPos = target.offset().top;
                let winHeight = $(window).height();
                let scrollToElem = targetPos - winHeight + 50;
                let animateName = animateInNames[i];
                i++;
                if (i === animateNames.length) i = 0;

                $(window).scroll(function () {
                    let winScrollTop = $(this).scrollTop();
                    if (winScrollTop > scrollToElem) {
                        target.addClass('animated ' + animateName);
                    } else {
                        target.removeClass('animated ' + animateName);
                    }
                });
            })

    }

    // $('<img src=""/>').attr('src', '/img/road.png').css({position: 'absolute', bottom:0,left:0}).appendTo($('body'));
    // $('<img/>').attr('src', '/img/aroad.png').css({position: 'absolute', top:0,left:0}).appendTo($('body'));

    $.rand = function (arg) {
        if ($.isArray(arg)) {
            return arg[$.rand(arg.length)];
        } else if (typeof arg === "number") {
            return Math.floor(Math.random() * arg);
        } else {
            return 4;  // chosen by fair dice roll
        }
    };

    $('.header__nav-item a').hover(function () {
        let tmpName = $.rand(animateInNames);
        let taga = $(this);
        taga.attr('class', '');
        taga.addClass('header__nav-link text--uppercase');
        console.log(taga);
        taga.addClass('animated ' + tmpName);
    }, function () {});

    // setInterval(function () {
    //     let logoimg = $(".header__logo img");
    //     let outName = $.rand(animateOutNames);
    //     let inName = $.rand(animateInNames);
    //     logoimg.addClass('animated ' + outName);
    //     setTimeout(function () {
    //         logoimg.attr('src', '/img/logo/' + $.rand(logos));
    //         logoimg.addClass(inName);
    //     }, 1000);
    //     setTimeout(function () {
    //         logoimg.attr('class', '');
    //     }, 2000);
    // }, 5000);

    // $(".header__logo img").hover(function () {
    //     $(this).animate({
    //         opacity: 0.25,
    //         left: "+=10",
    //         height: "toggle"
    //     }, 1000, function () {
    //         $(this).attr('src', '/img/logo1a.png');
    //         // Animation complete.
    //     });
    // }, function () {
    //     $(this).animate({
    //         opacity: 1,
    //         left: "-=10",
    //         height: "toggle"
    //     }, 2000, function () {
    //         $(this).attr('src', '/img/logo1b.png');
    //         // Animation complete.
    //     });
    // });


    $(window).scroll(function (event) {
        hasScrolled();
    });

    $(document).ready(function () {
        hasScrolled();
        contactForm();
        processAnimate();

        // menu humburger
        $("#menu-burger").on("change", function () {
            if (this.checked) {
                $("body").addClass("fixed");
                $("html").css("overflow", "hidden");
            } else {
                $("body").removeClass("fixed");
                $("html").css("overflow", "auto");
            }
        });
        $("#header .header__nav-link").on("click", function () {
            $("#menu-burger").prop("checked", false);
            $("body").removeClass("fixed");
            $("html").css("overflow", "auto");
        });

        // slider
        $('#articleSlider').length ? $('#articleSlider').slick({
            dots: true,
            infinite: true,
            speed: 400,
            cssEase: 'linear'
        }) : null;

        // $('.header__logo img').hover(
        //     function () { $(this).attr('src', 'img/logo21_hover.png')},
        //     function () { $(this).attr('src', 'img/logo21.png')});

        // parallax
        if ($(".parallax").length > 0) {
            $.stellar()
        }

    });

})(jQuery);
