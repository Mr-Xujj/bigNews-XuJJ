$(function () {
    //一、登陆页面
    $('.input_sub').on('click', function (e) {
      e.preventDefault();
      var username = $('.input_txt').val().trim();
      var password = $('.input_pass').val().trim();

      if (username == "" || password == "") {
        $("#myModal .modal-body").text("账号和密码不能为空!");
        $("#myModal").modal();//调用模态框
        return;
      };

      $.ajax({
        type: 'post',
        data: {
          username: username,
          password: password
        },
        url: BigNew.user_login,
        success: function (backData) {
          // console.log(backData);
          $("#myModal .modal-body").text(backData.msg);
          $("#myModal").modal();//调用模态框
          if (backData.code == 200) {
            window.localStorage.setItem("token", backData.token);//把token令牌存进本地 ，

            $('#myModal').on('hidden.bs.modal', function (e) {
              window.location.href = './index.html'
            })
          }

        }
      })
    })

  })