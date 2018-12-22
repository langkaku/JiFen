
$(document).ready(function () {
    $('.footer li').addClass('active');
    $('.footer li').click(function () {
        $(this).addClass('active')
        $(this).siblings().removeClass('active')
    })
})