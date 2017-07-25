
// 햄버거 button, Map button color change
function change_btn_color0() {
  $(".listBtn0").css("background-color","#F7AC1A");
  $(".listBtn1").css("background-color","white");
}

function change_btn_color1() {
  $(".listBtn0").css("background-color","white");
  $(".listBtn1").css("background-color","#F7AC1A");
}

// select border-bottom color change
var sel=$('.selecting');
sel.on('click', function(event){
  event.preventDefault();
  sel.removeClass('sel');
  $(this).addClass('sel');
  console.log('밑줄');
});

// 리스트, 맵 전환 버튼 부분
$('.listBtn0').click(function(){
  console.log('리스트 1번 클릭');
  $(".sportList").css("display","block");
  $(".sportMap").css("display","none");
});

$('.listBtn1').click(function(){
  console.log('리스트 2번 클릭');
  $(".sportList").css("display","none");
  $(".sportMap").css("display","block");
});


// !!리스트 맵 전환

// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
var infowindow = new daum.maps.InfoWindow({zIndex:1});

var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new daum.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 생성합니다
var map = new daum.maps.Map(mapContainer, mapOption);

// 장소 검색 객체를 생성합니다
var ps = new daum.maps.services.Places();


// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB (data, status, pagination) {
    if (status === daum.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new daum.maps.LatLngBounds();
        for (var i=0; i<data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new daum.maps.LatLng(data[i].y, data[i].x));
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    }
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {

    // 마커를 생성하고 지도에 표시합니다
    var marker = new daum.maps.Marker({
        map: map,
        position: new daum.maps.LatLng(place.y, place.x)
    });

    // 마커에 클릭이벤트를 등록합니다
    daum.maps.event.addListener(marker, 'click', function() {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
    });
}


$('.searchBtn').on('click', function(event) {
  event.preventDefault();
  console.log("검색 클릭");
  var inputText = $('.searchInput').val()

  if(inputText == 0){
    inputText='pt'
  }
  // 키워드로 장소를 검색합니다
  ps.keywordSearch(inputText, placesSearchCB);
});


$(".searchInput").keydown((key)=> {
  if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
    inputText = $('.searchInput').val();
    console.log("엔터");
    ps.keywordSearch(inputText, placesSearchCB);
  }
})

// sportList template
$.getJSON('list_detail_h.json', function(result) {
  // 템플릿 소스를 가지고 템플릿을 처리할 함수를 얻는다.
  var templateFn = Handlebars.compile($('#array').text())
  var generatedHTML = templateFn(result) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
  var container = $('#sportList-container')
  var html = container.html()
  container.html(html + generatedHTML) // 새 태그들로 설정한다.
 })

//  시 template



 $.getJSON('http://openapi.nsdi.go.kr/nsdi/eios/service/rest/AdmService/admCodeList.json?authkey=4c3dd139ed40e85475d902', function(result) {
   // 템플릿 소스를 가지고 템플릿을 처리할 함수를 얻는다.
   var templateFn = Handlebars.compile($('#codeList').text())
   var generatedHTML = templateFn(result) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
   var container = $('#code-container')
   var html = container.html()
   container.html(html + generatedHTML) // 새  태그들로 설정한다.
  })

var admCode;
// 시 선택시 구 군 구 나오는 부분
 $( "#code-container" )
   .change(function() {
     admCode=$( "#code-container option:selected").val();
     console.log('admCode: ' + admCode);

     $('').replaceAll('#si-container > option');
     siList();
   })

// 구 군 구 template
 function siList(){
   $.getJSON('http://openapi.nsdi.go.kr/nsdi/eios/service/rest/AdmService/admSiList.json?authkey=a32d52326f4cd3bd8b9654&admCode='+admCode, function(result) {
     var templateFn = Handlebars.compile($('#siList').text())
     var generatedHTML = templateFn(result) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
     var container = $('#si-container')
     var html = container.html()
     container.html(html + generatedHTML) // 새 태그들로 설정한다.
   })
 }
