$(function () {
    //二、获取用户信息，渲染到页面
    $.ajax({
        type: 'get',
        url: BigNew.user_info,
        //设置请求头
        headers: {
            Authorization: window.localStorage.getItem('token')
            //需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
        },
        success: function (backData) {
            console.log(backData);
            if (backData.code == 200) {
                $('.user_info>img').attr('src', backData.data.userPic);
                $('.user_info>span>i').text(backData.data.nickname);
                $('.user_center_link>img').attr('src', backData.data.userPic)
            }

        }
    });
    // 点击退出
    $('.logout').on('click', function () {
        window.localStorage.removeItem('token')
         window.location.href='./login.html'
    });
    // 左侧导航栏添加 active 类
    $('div.level01').on('click',function(){
        $(this).addClass('active').siblings('div').removeClass('active')
        // 二级菜单张开闭合
        if($(this).index()==1){
            $('ul.level02').slideToggle();
             // 展开动画
            $(this).find('b').toggleClass('rotate0')
            // 默认显示第一个二级菜单
            $('ul.level02>li:eq(0)>a')[0].click()
            // jQuery对象的click()事件他只会触发js的单击事件，而不会触发a标签的默认跳转事件 jQuery转dom 加  [0]
            // dom对象click()事件不仅会触发单击事件还会触发a标签的默认跳转事件
        }
    })
    // 点击二级菜单
    $('ul.level02>li').on('click',function(){
        $(this).addClass('active').siblings('li').removeClass('active')

    })

    
})