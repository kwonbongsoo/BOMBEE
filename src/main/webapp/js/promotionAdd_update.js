$(function() {
	$("#datepicker-start,#datepicker-end").datepicker({
		dayNamesMin: ['월', '화', '수', '목', '금', '토', '일'],
		monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		dateFormat: "yy-mm-dd",
		buttonText: "달력"
	});
	$('.header').load('../main/header.html')
	$('.projectAdd-textArea').css('height', textHeight+'px');

	var textHeight = screen.availHeight-355-100;

	$('#datepicker-start').on("change", function(){
		$('.arrowStart').css('display','none')
	});

	$('#datepicker-end').on("change", function(){
		$('.arrowEnd').css('display','none')
	});

	// 업데이트 색상 변경
	$('.titleInput-updateColor').on('click', function(){
		$(this).css('color', 'black')
	})

	$('.dateStart-updateColor').on('change', function(){
		$(this).css('color', 'black')
	})

	$('.dateEnd-updateColor').on('change', function(){
		$(this).css('color', 'black')
	})

	$('.priceIn-updateColor').on('click', function(){
		$(this).css('color', 'black')
	})

	$('.promotionText-updateColor').on('click', function(){
		$(this).css('color', 'black')
	})

});

var addrInput = $('#address')
var addrComp = $('#company')

var textHeight = screen.availHeight-355-100;
var title = $('.titleInput')
var pric = $('.priceIn')
var content = $('.promotionText')
var sdt = $('.dateStart')
var edt = $('.dateEnd')
var tno = 0
var lat = 0
var lng = 0
var spono = 0
var selDiv = "";
var storedFiles = [];
var delImage = [];
var pno
var count = 0
var titlePic
var titleSelectPic
var beforeTitle
var beforePic = []
var titleIndex = -1
var index_pic // 1 =  업로드 안했지만 전타이틀 사진과 같을 때  
//2 = 업로드 안했지만 타이틀이 바뀜 
//3 = 새로 업로드된 사진이 타이틀 사진일때
//4 = 새로 업로드 됬지만 전타이틀 사진과 같을때 
//5 = 새로 업로드 됬지만 전타이틀 사진과 다르고, 전에 올린사진 중에 하나가 타이틀 일때.


//다음맵: 주소 -> 위도, 경도
var geocoder = new daum.maps.services.Geocoder();
var callback = function(result, status) {
	if (status === daum.maps.services.Status.OK) {
		lat = result[0].y
		lng = result[0].x
	}
};


$(document).ready(function() {
	$('.priceIn').on('keyup', function() {
		if($(this).val().length >= 11) {
			$(this).val($(this).val().substring(0, 11));
		}
	});

	$("#image_upload").on("change", handleFileSelect);

	selDiv = $("#selectedFiles");
	// $("#myForm").on("submit", handleForm);

	$("body").on("click", ".selFile", removeFile);
});
var files
function handleFileSelect(e) {
	files = e.target.files
	console.log("e.target.files:" + e.target.files)
	var filesArr = Array.prototype.slice.call(files);
	filesArr.forEach(function(f) {

		if(!f.type.match("image.*")) {
			return;
		}
		storedFiles.push(f);
		console.log(storedFiles)
		var reader = new FileReader();

		reader.onload = function (e) {

			var html = "<div class='imageAdd-image swiper-slide'>" +
			"<img src=\"" + e.target.result + "\" data-file='"+f.name+"' value='"+f.name+"' class='title-image' title='Click to remove'>" +
			"<p><i class='fa fa-times selFile' aria-hidden='true' value="+ f.name +"></i></p>" +
			"</div>";

			selDiv.append(html);

			titlePic = $('.title-image')
			titlePicF()

		}
		reader.readAsDataURL(f);
	});
}


function titlePicF() {
	titlePic.click(function() {
		titlePic.parent().removeClass('title-select')
		$(this).parent().addClass('title-select')
	})
}

function removeFile(e) {
	e.preventDefault();
	var file = $(this).attr("value");
	delImage.push(file);
	for(var i=0;i<storedFiles.length;i++) {
		if(storedFiles[i].name === file) {
			storedFiles.splice(i,1);
			break;
		}
	}
	$(this).parent().parent().remove();
}

$('#image_upload').fileupload({
	traditional : true,
	url: '/promotion/update.json',        // 서버에 요청할 URL
	dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
	sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
	singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
	add: function (e, data) {
		console.log('update()...');
		count = 1
		data.files = storedFiles
		$.each(data.files, function (index, file) {
			console.log('Added file: ' + file.name);
		});

		// 1 =  업로드 안했지만 전타이틀 사진과 같을 때  
		// 2 = 업로드 안했지만 타이틀이 바뀜 
		// 3 = 새로 업로드된 사진이 타이틀 사진일때
		// 4 = 새로 업로드 됬지만 전의 사진이 타이틀 일때
		// 5 = 새로 업로드 됬지만 전타이틀 사진과 다르고, 전에 올린사진 중에 하나가 타이틀 일때.
		$('.save').click(function() {
			if(count != 0){
				if (beforeTitle == $('.title-select').children().attr('value')) 
					index_pic = 4
					else {
						for (var i = 0; i < beforePic.length; i++) {
							if(beforePic[i] === $('.title-select').children().attr('value')) {
								index_pic = 5
								break;
							}else 
								index_pic = 3

						}
					}
				console.log(index_pic)
				console.log($('.title-select').children().attr('value'))
				titleSelectPic = $('.title-select').children().attr('value')
				if(titleSelectPic == undefined){
					swal({
						title:"대표 이미지를 선택해주세요.",
						type: "warning",
						animation: false,
						showConfirmButton:false,
						timer: 1500
					})
				} else
					data.submit();

			}
		});
	},
	done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
		console.log('done()...');
		console.log(data.result);
		console.log(titleSelectPic)
		console.log('서버갔다옴.')
		location.href = '../promotion/promotionControl.html'
			count = 0
	},
	submit: function (e, data) {
		console.log('submit()...');
		// data 객체의 formData 프로퍼티에 일반 파라미터 값을 설정한다.

		console.log(titleSelectPic)
		data.formData = {
			title : title.val(),
			pric : pric.val(),
			content : content.val(),
			sdt : sdt.val(),
			edt : edt.val(),
			tno : tno,
			lat : lat,
			lng : lng,
			spono : spono,
			pno : pno,
			delImage:delImage,
			titlePic: titleSelectPic,
			indexPic: index_pic
		}; 

	}
}
);
//1 =  업로드 안했지만 전타이틀 사진과 같을 때  
//2 = 업로드 안했지만 타이틀이 바뀜 
$('.save').click(function() {
	if (count == 0) {
		if(title.val() == '' ||
				pric.val() =='' ||
				content.val() =='' || 
				sdt.val() =='' || 
				edt.val() =='' ){
			console.log("모든 입력 값 필요")
			console.log('beforePic:' + beforePic)
			swal({
				title:"필수 입력란이 비었습니다.",
				type: "warning",
				animation: false,
				showConfirmButton:false,
				timer: 1500
			}
			);
		} else {
			console.log("모든 입력값 있음.")


			if (beforeTitle == $('.title-select').children().attr('value')) 
				index_pic = 1
				else {
					for (var i = 0; i < beforePic.length; i++) {
						if(beforePic[i] == $('.title-select').children().attr('value')) 
							index_pic = 2
					}
				}
			if($('.title-select').children().attr('value') == undefined){
				swal({
					title:"대표 이미지를 선택해주세요.",
					type: "warning",
					animation: false,
					showConfirmButton:false,
					timer: 1500
				})
			} else {
				jQuery.ajaxSettings.traditional = true,
				$.getJSON('/promotion/update.json', {
					title : title.val(),
					pric : pric.val(),
					content : content.val(),
					sdt : sdt.val(),
					edt : edt.val(),
					tno : tno,
					lat : lat,
					lng : lng,
					spono : spono,
					pno : pno,
					delImage:delImage,
					titlePic: $('.title-select').children().attr('value'),
					indexPic: index_pic
				},function(result) {
					location.href = '../promotion/promotionControl.html'
				}
				)
			}
		} // 입력값 확인 else
	} 
})

//swiper
var swiper = new Swiper('.swiper-container', {
	scrollbar: '.swiper-scrollbar',
	scrollbarHide: true,
	slidesPerView: 'auto',
	/* centeredSlides: true, */
	spaceBetween: 8,
	grabCursor: true,
	observer:true
//	onSlideChangeEnd: function(){alert("onSlideChangeEnd")}

});

$.getJSON('/auth/userinfo.json', function(result) {
	if(result.data.membertype == 1){
		location.href = '../auth/login.html'
	}else {
		addrInput.text(result.data.comaddr)
		addrComp.text(result.data.comname)
		geocoder.addressSearch(result.data.comaddr, callback);
		tno = result.data.no
		spono = result.data.spono
	}
})

var no = 0

try {
	no = location.href.split('?')[1].substring(3)
	pno = no
} catch (err) {}

$.getJSON('/promotion/detail.json', {'no' : no}, function(result) {
	var currentTitle = result.data.promotion.tiPic
	beforeTitle = result.data.promotion.tiPic
	beforePic = result.data.promotion.promotionList[0].photoList
	$('.titleInput').val(result.data.promotion.title)
	$('.dateStart').val(result.data.promotion.sdt)
	$('.dateEnd').val(result.data.promotion.edt)
	$('.priceIn').val(result.data.promotion.pric)
	$('.promotionText').text(result.data.promotion.content)

	var templateFn = Handlebars.compile($('#update-template').text())
	var generatedHTML = templateFn(result.data.promotion) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
	var container = $('#selectedFiles')
	var html = container.html()
	container.html(html + generatedHTML) // 새 tr 태그들로 설정한다.

	titlePic = $('.title-image')
	titlePicF()


	$('#' + currentTitle).parent().addClass('title-select')


}
)

//x alert 창
$('.topClose').click(function(){
	swal({
		text:"프로모션수정을 취소 하시겠습니까?",
		type: "warning",
		showCancelButton: true,
		cancelButtonText: "취 소",
		confirmButtonText: "확 인",
		confirmButtonColor: '#F7AC1A',
		closeOnConfirm: true,
		closeOnCancel: true,
		animation: false,
		preConfirm: function() {
			location.href='../promotion/promotionControl.html'
		}
	}
	);
})
