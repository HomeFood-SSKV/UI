

$(function () {
    "use strict";

    $(window).on('load', function (e) {
        //$('body').addClass('loaded');
        $('.loader').fadeOut("slow");
        ;
    });
    loadscroler();

    /*Banner Slider Script Code Start*/
    $('.slideshow').owlCarousel({
        items: 1,
        autoplay: 5000,
        singleItem: true,
        navigation: false,
        pagination: false,
        loop: true,
    });
    /*Banner Slider Script Code End*/

    /* Sticky header Start */
    $(window).on('scroll', function (e) {
        if ($(window).width() > 767) {
            if ($(window).scrollTop() >= 30) {
                $('header').addClass('fixed-header');
            } else {
                $('header').removeClass('fixed-header');
            }
        }
    });
    /* Sticky header End */

});

/*Function for Add Go to up arrow Start */
function loadscroler() {
    $('body').prepend('<a href="#" class="bottom-top"><i class="icofont icofont-bubble-up"></i></a>');
    var amountScrolled = 300;
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.bottom-top').fadeIn('slow');
        } else {
            $('a.bottom-top').fadeOut('slow');
        }
    });
    $('a.bottom-top').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 700);
        return false;
    });
}
/*Function for Add Go to up arrow End */
