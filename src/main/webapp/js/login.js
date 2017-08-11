$(document).ready(function() {
  Kakao.init('90a2de4be0ff30607f507187d5b8dcb0');})

  $(window).on("load", function() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  })

  $('#kakao').on('click', function() {
    Kakao.Auth.login({
      success: function(authObj) {/* 
    location.href='../ekdma/u-login.html'; */
        console.log(JSON.stringify(authObj));
        Kakao.API.request({
          url: '/v1/user/me',
          success: function(response) {
            console.log(JSON.stringify(response));
            console.log(response.id)

            $.post('/auth/login.json', {
              id: response.id,
              pwd: '1111',
              membertype: 1
              
            }, function(result) {
              console.log('login')

              if (result.data == 'ok')
                window.history.go(-1)

                else {
                  $.post('/member/add.json', {
                    id: response.id,
                    pwd: '1111',
                    email: response.email,
                    name: response.properties.nickname,
                    email: response.kaccount_email,
                    accounttype: 2,
                    membertype: 1

                  }, function(result) {
                    console.log('login')
                    
                    if(result.data == 'ok')
                      window.history.go(-1)

                  }, 'json') // add.json
                }

            }, 'json'); // login.json

          },
          fail: function(err) {
            alert(JSON.stringify(err));
          }
        })
      }
    })
  })


  $('#facebook').on('click', function() {/* 
  location.href='../ekdma/t-login.html' */
    FB.login(function(response) {
      FB.api('/me?fields=id,name,email', function (response) {
        console.log(JSON.stringify(response));

        $.post('/auth/login.json', {
          id : response.id,
          pwd : '1111',
          membertype: 1

        }, function(result) {
          console.log('login')
          
          if(result.data == 'ok')
            window.history.go(-1)

            else {
              $.post('/member/add.json', {
                id: response.id,
                pwd: '1111',
                email: response.email,
                name: response.name,
                membertype: 1,
                accounttype: 1

              }, function(result) {
                console.log('login')
                
                if(result.data == 'ok')
                  window.history.go(-1)

              }, 'json') // add.json
            }
        }, 'json'); // login.json
      }, {scope: 'public_profile,email'});
    })
  })

  $('#logout').on('click', function() {
    Kakao.Auth.logout(function() {
      console.log('응 아니야');
    })
    FB.logout(function(response){
      console.log("로그아웃됬따")
    });
  })
  var loginType = 1;

$('#usertype').click(function() {
  loginType = $(this).val()
})

$('#trainertype').click(function() {
  loginType = $(this).val()
})

$('.send').on('click', function() {
  $.post('/auth/login.json', {
    'id' : $('.id').val(),
    'pwd': $('.pwd').val(),
    'membertype' : loginType

  }, function(result) {
    location.href = '../main/main.html'

  }, 'json')
})








/**/