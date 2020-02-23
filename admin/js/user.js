$(function(){
    // 进入个人中心页面获取个人信息
    $.ajax({
        type:'get',
        url:BigNew.user_detail,
        success:function(backData){
            console.log(backData)
            if(backData.code==200){
                // $('input.username').val(backData.data.username)
                // $('input.nickname').val(backData.data.nickname)
                // $('input.passward').val(backData.data.passward)
                // $('input.email').val(backData.data.email)
                for(var key in backData.data){
                    $('input.'+key).val(backData.data[key])
                }
                $('img.user_pic').attr('src',backData.data.userPic)
            }
        }
    })
    // 图片预览
    $('#exampleInputFile').on('change',function(){
        var filesIcon =   this.files[0];// 获取文件
        var url = URL.createObjectURL(filesIcon) // 生成图片链接
        $('img.user_pic').attr('src',url)
    })

    // 修改
    $('.btn-edit').on('click',function(e){
        e.preventDefault()
        var fd = new FormData($('#form')[0])
        $.ajax({
            url:BigNew.user_edit,
            data:fd,
            type:'post',
            //  formdata发请求必写以下俩个
            contentType:false,
            processData:false,
            success:function(backData){
                // console.log(backData)
                if(backData.code==200){
                    // 刷新 父级iframe 窗口
                    parent.window.location.reload()
                }
            }
        })
    })
})