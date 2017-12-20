(function ($) {

	var phpUrl = "http://192.168.128.118:8202/";
	var imgLoadNum = 0,
		controlTag = false,
		bannerArea = $('#J-banner-area'),
		siderBarDom = $('#sliderBar'),
		heightNum = $(window).height(),
		length = siderBarDom.children('a').length,
		tagDom = siderBarDom.find('a');

	// isIe69 = function() {
	// 	return BrowserDetect['browser'] == 'Explorer' && BrowserDetect['version'] < 10;
	// };

	halt = function (e) {
		e.preventDefault();
		e.stopPropagation();
	};

	//滑鼠滾動
	bannerArea.mousewheel(function (event, delta, delyaX, delyaY) {
		windowScroll(this, event, event.deltaY);
		halt(event);
	});


	//手機觸碰滑動 --start
	var lastY,
		idx = 0,
		currentIdx,
		up = 0,
		down = 0;

	$(document).bind('touchstart', function (e) {
		lastY = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY;
		currentIdx = siderBarDom.find('a.current').index();
	});

	$(document).bind('touchmove', function (e) {
		var currentY = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY;
		if (currentY > lastY) {
			up += 1;
		} else {
			down += 1;
		}
	});

	$(document).bind('touchend', function (e) {
		if (up > 0 && currentIdx > 0)
			idx = currentIdx - 1;
		if (down > 0 && currentIdx < length)
			idx = currentIdx + 1;

		tagDom.eq(idx).click();
		currentIdx = idx;
		up = 0;
		down = 0;
		console.log('end: ' + idx);
		e.preventDefault()
	});
	//手機觸碰滑動 --end

	//螢幕滾動事件
	windowScroll = function (dom, event, type) {
		// console.log('windowScroll');
		var num = 0,
			speedType = type,
			doms = $(dom),
			chiildDom = doms.children(),
			childSize = chiildDom.size(),
			heightNum = $(window).height(),
			allHeight = childSize * heightNum,
			firstDom = doms.find('div:first'),
			positionTop = Number(doms.attr('data-position'));
		// console.log(positionTop);

		if (firstDom.is(':animated')) {
			return;
		}

		if (speedType > 0) {

			if (Number(positionTop) === 0) {
				return;
			}


			// if (isIe69()) {
			// 	firstDom.animate({
			// 		marginTop: positionTop + heightNum
			// 	}, 1000, 'easeOutCubic');
			// } else {

			if (controlTag) {
				return;
			}

			controlTag = true;

			firstDom.css('marginTop', positionTop + heightNum);

			setTimeout(function () {
				controlTag = false;
			}, 1000);
			// }

			num = -(positionTop + heightNum) / heightNum;
			doms.attr('data-position', positionTop + heightNum);

		} else {

			if (positionTop == -(allHeight - heightNum)) {
				return;
			}

			// if (isIe69()) {
			// 	firstDom.animate({
			// 		marginTop: positionTop - heightNum
			// 	}, 1000, 'easeOutCubic');
			// } else {

			if (controlTag) {
				return;
			}

			controlTag = true;

			firstDom.css('marginTop', positionTop - heightNum);

			setTimeout(function () {
				controlTag = false;
			}, 1000);
			// }

			num = -(positionTop - heightNum) / heightNum;
			doms.attr('data-position', positionTop - heightNum);
		}

		if (!(chiildDom.eq(num).hasClass('current'))) {
			chiildDom.eq(num).addClass('current');
		}
		doms.attr('data-animateid', num);
		siderBalControl(doms.attr('data-position'));
	};

	//滾動動畫切換
	animateScrollTo = function (num, type) {
		var doms = bannerArea,
			chiildDom = doms.children(),
			childSize = chiildDom.size(),
			heightNum = $(window).height(),
			allHeight = childSize * heightNum,
			firstDom = doms.find('div:first'),
			positionTop = Number(doms.attr('data-position'));

		if (type == 'reset') {

			firstDom.stop();
		} else {

			if (firstDom.is(':animated')) {
				return;
			}

			if (num > childSize - 1) {
				return;
			}
		}

		// if (isIe69()) {

		// 	firstDom.animate({
		// 		marginTop: -(num * heightNum)
		// 	}, 1000, 'easeOutCubic');
		// } else {

		if (controlTag && type != 'reset') {
			return;
		}

		controlTag = true;

		firstDom.css('marginTop', -(num * heightNum));

		setTimeout(function () {
			controlTag = false;
		}, 1000);
		// }

		if (!(chiildDom.eq(num).hasClass('current'))) {
			chiildDom.eq(num).addClass('current');
		}
		doms.attr('data-position', -(num * heightNum));
		doms.attr('data-animateid', num);
		siderBalControl(doms.attr('data-position'));
	};

	//點擊側邊攔
	tagDom.bind('click', function () {
		var num = $(this).index();
		animateScrollTo(num);
	});

	//屏幕尺寸改变
	$(window).resize(function (event) {
		animateScrollTo(0, 'reset');
	});

	siderBalControl = function (topNum) {
		var heightNum = $(window).height(),
			num = topNum * -1 / heightNum;

		tagDom.removeClass('current');
		tagDom.eq(num).addClass('current');
	};


	//section6:切換效果
	$(".content ul li").on('mousemove', function (event) {
		var x = event;
		$(".content ul li").find('span').removeClass('current');
		$(this).find('span').addClass('current');

		var _tabImg = $("#tabImg");
		$("#tabImg").attr('class', '');
		$("#tabImg").addClass('tabImg');
		$("#tabImg").addClass('tab' + ($(this).index() + 1));

	});

	//亂數產生驗證碼
	function makeid() {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}

	var WEBAPP = {
		settings: {},
		cache: {},
		init: function () {
			//DOM cache
			this.cache.$form = $('#captcha-form');
			this.cache.$refreshCaptcha = $('#refresh-captcha');
			this.cache.$captchaImg = $('img#captcha');
			this.cache.$captchaInput = $(':input[name="captchaTxt"]');
			this.create_captcha();
			this.Validation();
		},
		create_captcha: function () {
			this.cache.captcha = makeid();
			document.getElementById('captcha').src = phpUrl + "get_captcha_img.php?rnd=" + Math.random() + "&para=" + WEBAPP.cache.captcha;
		},
		Validation: function () {

			$.validator.addMethod("check_captcha", function (value, element, options) {
				var bothEmpty = (value.toLowerCase() == WEBAPP.cache.captcha.toLowerCase());
				return bothEmpty;
			}, "Verication incorrect!");

			WEBAPP.cache.$form.validate({
				onkeyup: false,
				rules: {
					"name": {
						"required": true
					},
					"email": {
						"required": true
					},
					"qq": {
						"required": true
					},
					"comment": {
						"required": true
					},
					"captchaTxt": {
						"required": true,
						"check_captcha": true
					}
				},
				messages: {
					"name": "Required!",
					"email": {
						"required": "Required!",
						"email": "Formate incorrect!"
					},
					"qq": "Required!",
					"comment": "Required!",
					"captchaTxt": {
						"required": "Required!",
						"check_captcha": "Incorrect!"
					}
				},
				submitHandler: function (form) {
					console.log("submit: " + $(form).serialize());
					// $.ajax({
					// 	type: "POST",
					// 	data: $(form).serialize(),
					// 	url: phpUrl + "PHPMailer/mail.php",
					// 	success: function (e) {
					// 		alert('sucess!');
					// 		return false;
					// 	},
					// 	error: function () {
					// 		$('#contact').fadeTo("slow", 0.15, function () {
					// 			$('#error').fadeIn();
					// 			return false;
					// 		});
					// 	}
					// });
					// console.log($(form).serialize());
					return false;
				}
			});
		}
	}

	WEBAPP.init();

	$('#captcha').click(function () {
		WEBAPP.create_captcha();
	});

})(jQuery);