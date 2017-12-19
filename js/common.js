/**
 * Created by cff on 2017/11/15.
 */
//导航点击事件
$('.list-box li a').on('click',function () {

    $(this).addClass('active-list').parent().siblings().find('a').removeClass('active-list')

});
$('.menu-xs').on('click',function () {
    $('.list-xs').slideToggle(300)
});


//底部地图部分
