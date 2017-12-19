



var num = 0;
var $li = $('.banner-box li');
var onOff = false;

//自动播放
timer = setInterval(function () {

    $('.next').trigger('click')

},4000);

//鼠标移入移出
$('.banner').on(
    {
        "mouseenter": function () {
            clearInterval(timer)
        },
        "mouseleave": function () {
            timer = setInterval(function () {

                $('.next').trigger('click')

            }, 4000);
        }
    });


//初始化左右点击事件
$('.prv').on('click',function () {
    //异常处理
    if (onOff){
        return
    }
    onOff = true;

    if (num === 0){
        num = $li.length
    }
    num -- ;
    $('.dot span').eq(num).addClass('active').siblings().removeClass('active')
    fadeBanner($li,num)

});
$('.next').on('click',function () {
    //异常处理
    if (onOff){
        return
    }
    onOff = true;

    num ++ ;
    if (num === $li.length){
        num = 0
    }
    $('.dot span').eq(num).addClass('active').siblings().removeClass('active')
    fadeBanner($li,num)

});
//小圆点点击事件
$('.dot span').on('click',function () {
    //异常处理
    if (onOff){
        return
    }
    onOff = true;

    $(this).addClass('active').siblings().removeClass('active')
    fadeBanner($li,$(this).index())

});

function fadeBanner($li,num) {
    $li.eq(num).fadeIn(300,function () {
        $(this).siblings().fadeOut(300);
        $(this).find('.active').fadeIn(600).parent().siblings().find('.active').fadeOut(function () {
            onOff = false;
        })
    })
}


