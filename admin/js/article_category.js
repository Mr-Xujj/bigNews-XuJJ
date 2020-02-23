    // 进入页面显示所有的文章类别
    $(function () {
        $.ajax({
            url: BigNew.category_list,
            type: 'get',
            success: function (backData) {
                //  console.log(backData)
                var reshtml = template('art_temp', backData)
                $('tbody').html(reshtml)
            }
        })
        //    区分新增或编辑
        // show.bs.modal
        // show 方法调用之后立即触发该事件。
        // 如果是通过点击某个作为触发器的元素，则此元素可以通过事件的 relatedTarget 属性进行访问。
        $('#myModal').on('show.bs.modal', function (e) {
           // console.log(e.relatedTarget) //dom
            if (e.relatedTarget === $('#xinzengfenlei')[0]) {
                //    alert('新增')
                $('#exampleModalLabel').text('新增类别')
                $('#myModal .btn-queRen').text('新增').addClass('btn-success').removeClass('btn-primary')
                //reset() 方法可把表单中的元素重置为它们的默认值。
                $('#myModal form')[0].reset()


            } else {
                // alert('编辑')
                $('#exampleModalLabel').text('修改类别')
                $('#myModal .btn-queRen').text('编辑').addClass('btn-primary').removeClass('btn-success')

                // 把编辑当前的文章类名/别名显示在模态框中
                $('#recipient-name').val($(e.relatedTarget).parent().prev().prev().text())//名称
                $('#message-text').val($(e.relatedTarget).parent().prev().text())//别名
                $('#id').val($(e.relatedTarget).attr('data-id')) // 把id保存
            }
        })

        // 取消按钮事件
        $('#myModal .btn-quxiao').on('click', function () {
            //reset() 方法可把表单中的元素重置为它们的默认值。
            $('#myModal form')[0].reset()
        })

        // 新增/编辑--点击事件
        $('#myModal .btn-queRen').on('click', function () {
            //判断类：btn-success有就是新增
            if ($(this).hasClass('btn-success')) {
                var cateName = $('#recipient-name').val().trim()//名称
                var cateSlug = $('#message-text').val().trim()//别名
                $.ajax({
                    url: BigNew.category_add,
                    type: 'post',
                    data: {
                        name: cateName,
                        slug: cateSlug
                    },
                    success: function (backData) {
                        if (backData.code == 201) {
                            $('#myModal').modal('hide')
                            window.location.reload()
                        }
                    }
                })
            } else {
                //编辑
                // var cateName = $('#recipient-name').val().trim()//名称
                // var cateSlug = $('#message-text').val().trim()//别名
                // var id = $('#id').val().trim()
                // serialize()和fromdata()一样获取form表单name的值 但serialize不需要后端支持
                var data = $("#myModal form").serialize()
                // console.log(data)
                $.ajax({
                    url: BigNew.category_edit,
                    type: 'post',
                    data:data,
                    success: function (backData) {
                        if (backData.code == 200) {
                            $('#myModal').modal('hide')
                            window.location.reload()//刷新页面
                        }
                    }
                })
            }
        })

        //  删除
        $('tbody').on('click', '.btn-delete', function () {
            if (confirm('确定要删？？？')) {
                var id = $(this).attr('data-id')
                $.ajax({
                    url: BigNew.category_delete,
                    type: 'post',
                    data: {
                        id: id
                    },
                    success: function (backData) {
                        if (backData.code == 204) {
                            window.location.reload()//刷新页面
                            getData()
                        }
                    }
                })
            }
        })
    })