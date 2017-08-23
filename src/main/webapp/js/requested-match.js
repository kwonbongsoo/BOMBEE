$(function() {
  $('.header').load('../menu/new.html')
})

var json = '/auth/userinfo.json'
var no = -1
var trano = -1
getData(json, no)
var sdt =-1
var period = -1

function getData(json, no) {
  $.getJSON(json, {
    'no' : no,
    'sdt':sdt,
    'period':period
  }, function(result) {
    if (json == '/auth/userinfo.json') {
      if (result.data.membertype == 2)
        no = result.data.no
      else
        location.href = '../auth/login.html'
      console.log()
      getData('/friend/addList.json', no)
    } else if (json == '/friend/addList.json') {
      console.log(result)
      var templateFn = Handlebars.compile($('#requested-template').text())
      var generatedHTML = templateFn(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
      var container = $('.requested-container')
      container.html("")
      container.html(generatedHTML)

      btnConnect()
    } else if (json == '/friend/friendDelete.json') {
      console.log(result)
      location.reload()
    } else if (json == '/friend/friendUpdate.json') {
      // 수락 버튼을 눌렀을 때 실행하면 되는데 sdt를 오늘 날짜로 다시 update해줘야함
      // mno 도 날려야함 no는 tno
      location.reload()
      console.log(result)
    }
  })
}
function btnConnect() {
  $('.refuse').click(function() {
    trano = $(this).attr('data-trano')
    getData('/friend/friendDelete.json', trano)
  })
  $('.accept').click(function() {
    trano = $(this).attr('data-trano')
    period=$(this).parent().parent().children('.requested-info').children('.wish-period').attr('value')
    sdt = $(this).parent().parent().children('.requested-info').children('.wish-date').attr('value')
    if(period != -1 || sdt != -1)
      getData('/friend/friendUpdate.json', trano)
    else
      console.log('잘못됨')
  })
  console.log(trano)
}