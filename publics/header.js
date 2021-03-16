$(window).scroll(function () {
    var sticky = $('#my-header'),
        nav = $('.classy-navbar'),
        scroll = $(window).scrollTop();

    if (scroll >= 50) {
        sticky.addClass('fixed');
        nav.css({ 'height': '70px' });
    }
    else {
        sticky.removeClass('fixed');
        nav.css({ 'height': '100px' });
    }
});
$(document).ready(function () {
    var url = window.location;
    // Will only work if string in href matches with location
    $('#my-header #nav li a[href="' + url + '"]').parent().addClass('active');

    // Will also work for relative and absolute hrefs
    $('#my-header #nav li a').filter(function () {
        return this.href == url;
    }).parent().addClass('active').parent().parent().addClass('active');
});