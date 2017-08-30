$(document).ready(function() {
  $('.header').load('../main/header.html')

})

//우편번호 찾기 화면을 넣을 element
var element_layer

function closeDaumPostcode() {
  // iframe을 넣은 element를 안보이게 한다.
  element_layer.style.display = 'none';
}

function sample2_execDaumPostcode() {
  element_layer = document.getElementById('layer');
  console.log(element_layer.style)
  new daum.Postcode({
    oncomplete: function(data) {
      // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var fullAddr = data.address; // 최종 주소 변수
      var extraAddr = ''; // 조합형 주소 변수

      // 기본 주소가 도로명 타입일때 조합한다.
      if(data.addressType === 'R'){
        //법정동명이 있을 경우 추가한다.
        if(data.bname !== ''){
          extraAddr += data.bname;
        }
        // 건물명이 있을 경우 추가한다.
        if(data.buildingName !== ''){
          extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
        fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById('sample2_postcode').value = data.zonecode; //5자리 새우편번호 사용
      document.getElementById('sample2_address').value = fullAddr;

      // iframe을 넣은 element를 안보이게 한다.
      // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
      element_layer.style.display = 'none';
    },
    width : '100%',
    height : '100%',
    maxSuggestItems : 5
  }).embed(element_layer);

  // iframe을 넣은 element를 보이게 한다.
//element_layer = document.getElementById('layer');
//console.log(element_layer.style)
  element_layer.style.display = 'block';

  // iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
  initLayerPosition();
}



//브라우저의 크기 변경에 따라 레이어를 가운데로 이동시키고자 하실때에는
//resize이벤트나, orientationchange이벤트를 이용하여 값이 변경될때마다 아래 함수를 실행 시켜 주시거나,
//직접 element_layer의 top,left값을 수정해 주시면 됩니다.
function initLayerPosition(){
  var width = 100; //우편번호서비스가 들어갈 element의 width
  var height = 417; //우편번호서비스가 들어갈 element의 height
  var borderWidth = 2; //샘플에서 사용하는 border의 두께

  // 위에서 선언한 값들을 실제 element에 넣는다.
  element_layer.style.width = width + '%';
  element_layer.style.height = height + 'px';
  element_layer.style.border = borderWidth + 'px solid';
  // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
  element_layer.style.left = 0+'px';
  element_layer.style.top = 80 + 'px';
}
var fiSpono,
fiName,
fiComname,
fiZipcode,
fiComaddr,
fiComdetailaddr,
fiIntroduction
var spono,
saveBtn = $('.save-btn')

var phoneWidth

if($(window)[0].innerWidth > 375 && $(window)[0].innerWidth <= 414) 
	phoneWidth = 6
else if($(window)[0].innerWidth > 320 && $(window)[0].innerWidth <= 375) 
	phoneWidth = 5
else if($(window)[0].innerWidth <= 320)
	phoneWidth = 4
	// 사진업데이트할때 폰해상도에 맡게 짜르기위한 아이폰5,6,6+ 구분 변수
	// 숫자 4  = 아이폰5
	// 숫자 5 = 아이폰6
	// 숫자 6 = 아이폰6+


$.getJSON('/auth/userinfo.json', function(result) {
  no = result.data.no
  getData()
})

function getData() {
  $.getJSON('/trainer/detail.json', {no}, function(result) {
    console.log(result.data.spono)
    console.log(result.data)
    var templateFn = Handlebars.compile($('#profile-template').text())
    var generatedHTML = templateFn(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
    var container = $('.profile-container')

    var html = container.html()
    container.html(html + generatedHTML)
    
    fiSpono = $('.spono')
    fiComname = $('.company')
    fiZipcode = $('.zip-code')
    fiComaddr = $('.address')
    fiComdetailaddr = $('.address-detail')
    fiIntroduction = $('.introduction')
    $('#pro-select').on('change',function() {
      spono = $('#pro-select option:selected').val()
      console.log(spono)
    })
    switch (result.data.spono){
    case "1" :
      console.log(1, "요가")
      $('#spono1').attr('selected', 'selected')
      spono = $('#pro-select option:selected').val()
      break;
    case "2" :
      console.log(2, "헬스")
      $('#spono2').attr('selected', 'selected')
      spono = $('#pro-select option:selected').val()
      break;
    case "3" :
      console.log(3, "스피닝")
      $('#spono3').attr('selected', 'selected')
      spono = $('#pro-select option:selected').val()
      break;
    case "4" :
      console.log(4, "필라테스")
      $('#spono4').attr('selected', 'selected')
      spono = $('#pro-select option:selected').val()
      break;
    default :
      console.log("선택하세요")
      $('#spono').attr('selected', 'selected')
      spono = $('#pro-select option:selected').val()
    }

    $('#profile-filess').fileupload({
      url: '/trainer/alreadyUpdate.json',        // 서버에 요청할 URL
      dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
      sequentialUploads: false,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
      singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
      autoUpload: false,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
      disableImageResize: /Android(?!.*Chrome)|Opera/
        .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
        previewMaxWidth: 415,   // 미리보기 이미지 너비
        previewMaxHeight: 312,  // 미리보기 이미지 높이
        previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
        processalways: function(e, data) {
          console.log('fileuploadprocessalways()...');
          console.log(data.files);
          var imagesDiv = $('#box1');
          imagesDiv.html("");
          console.log(data.files[0])
          try {
            if (data.files[0].preview.toDataURL) {
              $("#box1").attr('src', data.files[0].preview.toDataURL());
            }
          } catch (err) {}
          saveBtn.unbind("click");
          saveBtn.click(function() {
            console.log('눌렸다')
            data.submit();
          });
        },
        submit: function (e, data) { // 서버에 전송하기 직전에 호출된다.
          data.formData = {
              'spono': spono,
              'comname':fiComname.val(),
              'zipcode': fiZipcode.val(),
              'comaddr': fiComaddr.val(),
              'comdetailaddr': fiComdetailaddr.val(),
              'introduction': fiIntroduction.val(),
              'tno': no
          }
          console.log('submit()...');
        },
        done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
          console.log(data.result);
          location.reload()
        }
    });
  })


}
saveBtn.on('click', function() {
  console.log("클릭클릭")
  console.log($('#box1').attr('src').split("_190.png")[0])
  $.post('/trainer/update.json', {
    'tcherpic' : $('#box1').attr('src').split("_190.png")[0],
    'spono': spono,
    'comname':fiComname.val(),
    'zipcode': fiZipcode.val(),
    'comaddr': fiComaddr.val(),
    'comdetailaddr': fiComdetailaddr.val(),
    'introduction': fiIntroduction.val(),
    'tno': no
  }, function(result) {
    location.href = '../profile/schedule.html'

  }, 'json')

})
