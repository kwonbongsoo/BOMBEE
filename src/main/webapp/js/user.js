$(function() {
	moment().format();
	$('.header').load('../main/header.html')

	getPromotionName(trano)
	generateTemplate();
	date(current);
	dateClick();
	slideDate();

});
var trano = (location.href).split('=')[1].split('#')[0]
console.log(trano)

var filenames = $('#filenames');
var othername = -1
var mymno = -1
var othermno = -1
var today,
mealkcal = $('.food-kcal'),
mealname = $('.food-name'),
alreadymealname = $('.already-food-name'),
alreadymealkcal = $('.already-food-kcal'),
mealtype,
mealno;
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

console.log($(window))


function getPromotionName(no) {
  $.getJSON('promotion-user-name.json', {'trainingNo': no}, function(result) {
    console.log(result)
    mymno = result.data.tno
    $('.user').text(result.data.promotionTitle)
  })
}

$('#files').fileupload({
	url: '/management/usermeal-add.json',        // 서버에 요청할 URL
	dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
	sequentialUploads: false,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
	singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
	autoUpload: false,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
	disableImageResize: /Android(?!.*Chrome)|Opera/
	.test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
	previewMaxWidth: 340,   // 미리보기 이미지 너비
	previewMaxHeight: 312,  // 미리보기 이미지 높이 
	previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
	processalways: function(e, data) {
		console.log('fileuploadprocessalways()...');
		console.log(data.files);
		var imagesDiv = $('#inputfiles');
		imagesDiv.html("");
		try {
			if (data.files[0].preview.toDataURL) {
				$("<img>").attr('src', data.files[0].preview.toDataURL()).css('width', '332.72px').appendTo(imagesDiv);
			}
		} catch (err) {}
		console.log(trano)
		$('#foodAddBtn').unbind("click");
		$('#foodAddBtn').click(function() {
			data.submit();
		});
	}, 
	submit: function (e, data) { // 서버에 전송하기 직전에 호출된다.
		data.formData = {
				'mealkcal': mealkcal.val(), 
				'mealname': mealname.val(), 
				'mealtype': mealtype,
				'day': today,
				'trainingNo': trano
		}
		console.log('submit()...');
	}, 
	done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
		console.log(data.result);
		var type
		if(othername != -1 && mymno != -1 && othermno != -1){
			if(mealtype == 'breakfast' || mealtype == 'lunch' || mealtype == 'dinner') {
			  if(mealtype == 'breakfast')
			    type= '아침 식사 등록'
			  else if (mealtype == 'lunch')
			    type= '점심 식사 등록'
			  else if (mealtype == 'dinner')
			    type = '저녁 식사 등록'
			  ajaxNode(2, othername, mymno, type, othermno)
			}
		}
		location.reload()
	}

});

$('#already-files').fileupload({
	url: '/management/usermeal-update.json',        // 서버에 요청할 URL
	dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
	sequentialUploads: false,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
	singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
	autoUpload: false,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
	disableImageResize: /Android(?!.*Chrome)|Opera/
	.test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
	previewMaxWidth: 340,   // 미리보기 이미지 너비
	previewMaxHeight: 312,  // 미리보기 이미지 높이 
	previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
	processalways: function(e, data) {
		console.log('fileuploadprocessalways()...');
		console.log(data.files);
		var imagesDiv = $('#updatefiles');
		imagesDiv.html("");
		try {
			if (data.files[0].preview.toDataURL) {
				$("<img>").attr('src', data.files[0].preview.toDataURL()).css('width', '332.72px').appendTo(imagesDiv);
			}
		} catch (err) {}
		$('#foodUpdateBtn').unbind("click");
		$('#foodUpdateBtn').click(function() {
			console.log('눌렸다')
			data.submit();
		});
	}, 
	submit: function (e, data) { // 서버에 전송하기 직전에 호출된다.
		data.formData = {
				'mealno' : mealno,
				'mealkcal': alreadymealkcal.val(), 
				'mealname': alreadymealname.val(), 
				'mealtype': mealtype,
				'day': today,
        'trainingNo': trano
		}
		console.log('submit()...');
	}, 
	done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
		console.log(data.result);
		location.reload()
	}
});

$('#foodDeleteBtn').on('click', function() {
	$.get('/management/usermeal-delete.json', {'mealno': mealno}, function(result) {
		location.reload()
	})
})

$('#foodUpdateBtn').on('click', function() {
	var iphone
	if(phoneWidth == 6)
		iphone = '_340.png'
	else if (phoneWidth == 5)
		iphone = '_310.png'
	else if (phoneWidth == 4)
		iphone = '_263.png'
	$.post('/management/nopicmeal-update.json', {
		'mealpicture': $('#updatefiles img').attr('src').split(iphone)[0],
		'mealno' : mealno,
		'mealkcal': alreadymealkcal.val(), 
		'mealname': alreadymealname.val(), 
		'mealtype': mealtype,
		'day': today,
		'trainingNo': trano
	}, function(result) {
	  location.reload()
	}, 'json')
})

var startDate,
endDate, totalKcal = 0;

$.getJSON('/auth/userinfo.json', function(result) {
	othername = result.data.name
	othermno = result.data.no
    $('.user').text(result.data.name)
     })

function generateTemplate() {
	startDate = current.startOf('week').format("YYYY-MM-DD")
	endDate = current.endOf('week').format("YYYY-MM-DD")
	$.getJSON('usermeal-list.json', {"startDate": startDate,
		"endDate": endDate, "trainingNo": trano}, function(result) {
			var data = result.data
			// 템플릿 소스를 가지고 템플릿을 처리할 함수를 얻는다.
			arrayData(data)
			console.log(data.mealList)
			var templateFn = Handlebars.compile($('#user-template').text())
			var generatedHTML = templateFn(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
			var container = $('#meal-container')
			container.html("")
			var html = container.html()
			container.html(html + generatedHTML) // 새 tr 태그들로 설정한다.      })

			var templateFn1 = Handlebars.compile($('#meal-template').text())
			var generatedHTML1 = templateFn1(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
			var popcontainer = $('#pop-container')
			popcontainer.html("")
			var html1 = popcontainer.html()
			popcontainer.html(html1 + generatedHTML1)

			date(current)
			autoSelect(moment(current._i))
			
			$('.check').parent().removeClass('update')
			inputMeal()
			
		})
}
function arrayData(data) {

	for (var i = 0; i < 7; i++){
		var sortedMealLists = [];
		for (var dayMealList of data.mealList) {
			switch (dayMealList.day) {
			case "day0":  sortedMealLists[0] = dayMealList; break;
			case "day1":  sortedMealLists[1] = dayMealList; break;
			case "day2":  sortedMealLists[2] = dayMealList; break;
			case "day3":  sortedMealLists[3] = dayMealList; break;
			case "day4":  sortedMealLists[4] = dayMealList; break;
			case "day5":  sortedMealLists[5] = dayMealList; break;
			case "day6":  sortedMealLists[6] = dayMealList; break;
			}
		}
		for (var j = 0; j < 7; j++) {
			if (!sortedMealLists[j]){
				sortedMealLists[j] = {day: 'day' + j, meal: []}
			}
			data.mealList = sortedMealLists
		}
	}

	for (var dayMeal of data.mealList) {
		var sortedMeals = [];
		for (var meal of dayMeal.meal) {
		  console.log(meal)
			switch (meal.mealtype) {
			case "breakfast": sortedMeals[0] = meal; break;
			case "lunch": sortedMeals[1] = meal; break;
			case "dinner": sortedMeals[2] = meal; break;
			}
			if($(window)[0].innerWidth > 375 && $(window)[0].innerWidth <= 414) 
				meal.width = 6
			else if($(window)[0].innerWidth > 320 && $(window)[0].innerWidth <= 375) 
				meal.width = 5
			else if($(window)[0].innerWidth <= 320)
				meal.width = 4
		}

		for (var i = 0; i < 3; i++) {
			if (!sortedMeals[i]) {
				sortedMeals[i] = {index: i};
			}
		}
		
		dayMeal.sortedMeals = sortedMeals;
		console.log(dayMeal.sortedMeals)
	}

	for (var i = 0; i < 7; i++) {
		for (var j = 0; j < 3; j++) {
			if(data.mealList[i].meal[j] == undefined)
				continue;
			totalKcal += parseInt(data.mealList[i].meal[j].mealkcal)
		}
		data.mealList[i].totalKcal = totalKcal
		totalKcal = 0;
//		$('#day' + i).children().children('.kcal-total').text(totalKcal)
	}
}
function dateClick() {
	var tabClick = $(".tab-slider--nav .tab-slider--tabs div")
	tabClick.click(function() {
		$(".tab-slider--body").hide();
		var activeTab = $(this).attr("rel");
		$("#"+activeTab).fadeIn();
		if(activeTab == "day0"){
			sliderDate(0)
		} else if(activeTab == "day1"){
			sliderDate(1)
		} else if(activeTab == "day2"){
			sliderDate(2)
		} else if(activeTab == "day3"){
			sliderDate(3)
		} else if(activeTab == "day4"){
			sliderDate(4)
		} else if(activeTab == "day5"){
			sliderDate(5)
		} else if(activeTab == "day6"){
			sliderDate(6)
		} else {
			$('.tab-slider--tabs')
			.removeClass('slide0 slide1 slide2 slide3 slide4 slide5 slide6');
		}
		tabClick.removeClass("active");
		$(this).addClass("active");
	});

	console.log('dateClick()')
}
function sliderDate(no) {
	$('.tab-slider--tabs').addClass('slide' + no);
}

var months = ["January","February","March",
	"April","May","June","July",
	"August","September","October",
	"November","December"],
	current = moment(new Date());

function autoSelect(moment) {
	var dayNo = moment.weekday()
	$('.tab-slider--tabs').removeClass('slide0 slide1 slide2 slide3 slide4 slide5 slide6');
	$(".tab-slider--body").hide();
	selectDate(dayNo)
}

function selectDate(no) {
	$('.tab-slider--tabs').addClass('slide' + no);
	$('.day'+no).addClass("active");
	$("#day"+no).show();
	if ($('.day' + no).text() == moment(new Date()).format("D")) {
		$('#day' + no).children('.input-meal').addClass("add")
		$('#day' + no).children('.meal').addClass("update")
	}
}

function date(moment) { // get current date
	var sunDate = moment.clone(),
	month = months[current.get('month')];

	sunDate.add('days', -moment.weekday())

	$('.year').html(current.get('year'));
	$('.month').html(month);

	for (var i = 0; i < 7; i++) {
		$('.day' + i).html(sunDate.date())
		sunDate.add('days', 1)
	}
	console.log('date(current)')
}

function nextCalendar() {
	date(current.weekday(7))
	generateTemplate()
}
function prevCalendar() {
	date(current.weekday(-7))
	generateTemplate()
}

var alreadymeal = $('.already-meal'),
addmeal = $('.add-meal'),
backscreen = $('.backscreen');

function inputMeal() {
	$('.update').on('click', function() {
		today = $(this).parent().attr('id')
		mealtype = $(this).children('.meal-type').text()
		mealno = $(this).attr('value')
		var split = $("<img>").attr('src', $(this).children('.img-fix').children().attr('src').split('_')[2]) //원본을 위해만든 개잔머리
		var phone = split.attr('src').split('.')[0]
		if(phone == '190')
			$("<img>").attr('src', $(this).children('.img-fix').children().attr('src').split('_'+split.attr('src'))[0]+'_340.png').addClass("img-size").appendTo($('#updatefiles'));
		else if (phone == '170')
			$("<img>").attr('src', $(this).children('.img-fix').children().attr('src').split('_'+split.attr('src'))[0]+'_310.png').addClass("img-size").appendTo($('#updatefiles'));
		else if(phone == '146')
			$("<img>").attr('src', $(this).children('.img-fix').children().attr('src').split('_'+split.attr('src'))[0]+'_263.png').addClass("img-size").appendTo($('#updatefiles'));
		$('.already-food-name').val($(this).children('.meal-name').text())
		$('.already-food-kcal').val($(this).children('.meal-kcal').attr('value'))

		if(alreadymeal.attr('data-open') == 'close') {
			backscreen.show()
			alreadymeal.show()
			alreadymeal.attr('data-open', 'open')
		}
	})

	$('.add').on('click', function() {
		console.log($('.add-meal').children('.already-food'))
		today = $(this).parent().attr('id')
		if($(this).attr('value') == 0) {
			mealtype = 'breakfast'
		} else if ($(this).attr('value') == 1) {
			mealtype = 'lunch'
		} else if ($(this).attr('value') == 2) {
			mealtype = 'dinner'
		}
		if(addmeal.attr('data-open') == 'close') {
			backscreen.show()
			addmeal.show()
			addmeal.attr('data-open', 'open')
		}
	})
	backscreen.on('click', function() {
		backscreen.hide()
		alreadymeal.hide()
		addmeal.hide()
		alreadymeal.attr('data-open', 'close')
		addmeal.attr('data-open', 'close')
	})
}


var delX;
var delY;
var phWid = parseInt($(".week-container").css("width"));
var shift;

function slideDate() {
	$(".week-container").on("touchstart", function(event) {
//		if (!event.pageX) event.preventDefault();
		var stX = event.pageX || event.originalEvent.touches[0].pageX;
		var stY = event.pageY || event.originalEvent.touches[0].pageY;
		$(".week-container").on("touchmove", function(event) {
			delX = (event.pageX || event.originalEvent.touches[0].pageX) - stX;
			delY = (event.pageY || event.originalEvent.touches[0].pageY) - stY;
		});
	});

	$(document).on("touchend", function() {
		if (delX > delY && delX > phWid / 2) {
			shift = "(" + phWid * 1.5 + "px, 0, 0)";
			prevCalendar();
		} else if (Math.abs(delX) > Math.abs(delY) && delX < -phWid / 2) {
			shift = "(" + (-phWid * 1.5) + "px, 0, 0)";
			nextCalendar();
		}
		delX = 0;
		delY = 0;

	});
}

Handlebars.registerHelper('iphonesix', function(meal ,options) {
	if(meal.width == 6) 
		return options.fn(this);
});

Handlebars.registerHelper('iphonesixs', function(meal ,options) {
	if(meal.width == 5) 
		return options.fn(this);
});

Handlebars.registerHelper('iphonefive', function(meal ,options) {
	if(meal.width == 4) 
		return options.fn(this);
});

function ajaxNode(no, othername, mymno, kinds, othermno){
	$.ajax({
		url: 'http://'+ location.host +':8888/alert/add.json',
		type: 'post',
		data:{
			type: no,
			othername: othername,
			mymno: mymno,
			kinds: kinds,
			othermno: othermno
			},
		dataType:'json',
		success: function(result) {
			console.log(result)
			othername = -1
			mymno = -1
			othermno = -1
			location.reload()
		}
	})
}
Handlebars.registerHelper('confirm', function(confirm ,options) {
  if(confirm == true) 
    return options.fn(this);
  else
    return options.inverse(this);
});
