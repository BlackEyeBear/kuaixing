/**
 * Created by cff on 2017/11/11.
 */
/**
 * 请求json数据
 * @param url  json地址
 * @param success 请求成功回调
 * @param fail   请求失败回调
 */
function getJson(url, success, fail) {
    //1.创建请求
    var request = new XMLHttpRequest();
    //2.配置请求
    request.open('GET', url, true);
    //3.发送请求
    request.send(null);
    //4.监听状态
    request.onreadystatechange = function () {
        //判断是否请求成功
        if (request.readyState == 4 && request.status == 200) {
            //请求成功
            // console.log(request.responseText);
            var obj = JSON.parse(request.responseText);
            if (success) {
                success(obj)
            }
        } else {
            //请求失败
            if (fail) {
                fail(request.status);
            }
        }
    }
}
/**
 * 缓慢回到顶部代码
 * @param btn  只需传一个按钮
 */
function scrollTopEffect(btn) {
    var timer = null;
    var isTop = true;
    //获取页面可视区高度
    var clientHeight = document.documentElement.clientHeight;

    //滚动条滚动时触发
    window.onscroll = function () {
        //显示回到顶部按钮
        var osTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (osTop >= clientHeight) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
        //回到顶部过程中用户滚动滚动条，停止定时器
        if (!isTop) {
            clearInterval(timer);
        };
        isTop = false;

    };

    btn.onclick = function () {
        //设置定时器
        timer = setInterval(function () {
            //获取滚动条距离顶部高度
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            var isPeed = Math.floor(-osTop / 7);

            document.documentElement.scrollTop = document.body.scrollTop = osTop + isPeed;
            //到达顶部，清除定时器
            if (osTop == 0) {
                clearInterval(timer);
            }
            isTop = true;

        }, 30);
    };
}
/**
 * 移动函数
 * @param obj     需要移动的对象
 * @param attr    向上下左右移动(left,right,top,bottom值)调用属性写引号
 * @param dir     速度
 * @param target  目标值
 * @param endFn   回调函数
 */
function doMove(obj, attr, dir, target, endFn) {
    // 判断方向,判断目标值与现在的值的大小决定dir的正负,为正就是向前,为负就是向后
    dir = parseInt(getStyle(obj, attr)) < target ? dir : -dir;

    //清除定时器,为了代码简介
    clearInterval(obj.timer);

    obj.timer = setInterval(function () {
        var speed = parseInt(getStyle(obj, attr)) + dir;

        if (speed > target && dir > 0 || speed < target && dir < 0) {
            speed = target;
        }
        obj.style[attr] = speed + 'px';
        if (speed == target) {
            clearInterval(obj.timer);
            // if (endFn){endFn();} 与下面等价
            endFn && endFn();//如果endFn为真就调用函数endFn
        }
    }, 30);
}