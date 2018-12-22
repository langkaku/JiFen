/// <reference path="plug/jquery.min.js" />
$(document).ready(function () {
    $('#mobileMenu').addClass('active');
    $('.footer li').click(function () {
        $(this).addClass('active')
        $(this).siblings().removeClass('active')
    })
})