!function($){

	$('.main-slider__in').slick({
		dots: true,
		arrows : true,
		infinite: true,
		speed: 1150,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade : true
	});

	$('.why2__slider-in').slick({
		dots: true,
		arrows : true,
		infinite: true,
		speed: 1150,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade : true,
		asNavFor: '.why2__video-slider-in'
	});

	$(".why2__video-slider-in").slick({
		dots : false,
		arrows : false,
		infinite : true,
		slidesToShow : 1,
		speed : 1150,
		fade  : true,
		asNavFor: '.why2__slider-in'
	});

	$('.projects__slider-in').slick({
		dots: true,
		arrows : true,
		infinite: true,
		speed: 1150,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade : true
	});


	$('.about__slider-in').slick({
		dots: true,
		arrows : true,
		infinite: true,
		speed: 1150,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade : true
	});

	$('.orange-slider__in').slick({
		dots: true,
		arrows : true,
		infinite: true,
		speed: 1150,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade : true
	});

	$('.item').each(function(){

		var el = this;

		var $big = $('.item__slider-big', el);
		var $small = $('.item__slider-small', el);

		$big.slick({
			dots : false, arrows : true, infinite : true, slidesToShow : 1, speed : 1150, fade : true, asNavFor : $small.get(0)
		});

		$small.slick({
			dots : false, arrows : false, infinite : true, slidesToShow : 3, speed : 500, fade : false, asNavFor : $big.get(0), focusOnSelect: true
		});


		$(".item__slider-small", el).on('click', 'a', function(e){
			e.preventDefault();
			$('.item__slider-big', el).slick('slickGoTo', $(this).index());
		});


		$(".item__list", el).on('click', '.item__list-li', function(e){

			e.preventDefault();

			$(this.getAttribute('data-target')).show(800).find('.slick-slider').slick('setPosition');

			$(
				$(this).siblings('.item__list-li--active').attr('data-target')			
			).hide(800);

		});

	});

	$('.item-desc__slider').slick({
		dots : true,
		arrows : true,
		infinite : true,
		slidesToShow : 1,
		speed : 1150,
		fade : true,
		asNavFor: '.item-desc__video-slider'
	});

	$(".item-desc__video-slider").slick({
		dots : false,
		arrows : false,
		infinite : true,
		slidesToShow : 1,
		speed : 1150,
		fade  : true,
		asNavFor: '.item-desc__slider'
	});

	$(".header--hidden").each(function(){

		let header = this;

		$(window).on('scroll', function(){

			let height = header.getBoundingClientRect();
			height = (height.bottom - height.top);

			$(header).toggleClass('header--hidden', window.pageYOffset < height * 2);

		});


	});

				// Здесь начало карты

	!function(){

		$(".map__select").on('click', function(e){
			e.preventDefault();
			$(this).toggleClass('map__select--active');
		});

		$('.map__select').on('click', '.map__select-list-item', function(e){
			$(e.delegateTarget).find('.map__select-name').text($(this).text());
			$('.map__list').hide();
			$('.map__list[data-town-id="' + $(this).attr('data-id') + '"]')
				.show()
				.find('.map__list-item:first')
				.trigger('click');
		});


		window.addEventListener('load', function(){

			ymaps.ready(function(){

				var items = $(".map__list-item"),
				    ymap = $(".map__target").get(0)
				;
				
				ymaps.behavior.storage.remove("scrollZoom");
				let widthCheck = true;
				if ( window.innerWidth < 961) widthCheck = false
				var myMap = new ymaps.Map(ymap, {
					    center: [0, 0],
					    zoom: 10
				    },
						{
							balloonPanelMaxMapArea: 0,							
							suppressMapOpenBlock: widthCheck
						} 
						);	
				myMap.controls.remove('geolocationControl');
				myMap.controls.remove('searchControl');
				myMap.controls.remove('trafficControl');
				myMap.controls.remove('typeSelector');
				myMap.controls.remove('fullscreenControl');
				myMap.controls.remove('rulerControl');
				myMap.controls.remove('zoomControl');
				myMap.controls.add('zoomControl' , 	{ position: {top: 75, right: 15} });
				myMap.behaviors.disable(['scrollZoom']);

				items.each(function () {

					let x = +$(this).attr('data-x'),
							y = +$(this).attr('data-y'),
					    address = $(this).text().split('+')[0],
							title = $(this).attr('data-title');	
					    // address = $(this).text(),
					    // title = $(this).attr('data-title');
					myMap.geoObjects.add(new ymaps.Placemark([x, y],
						{
							balloonContentHeader: (

								'<img src=" assets/images/develop/logo.svg" style="width: 100px;display: block;margin: 0 auto 8px;">' +
								'<p style="text-align: center; font-family: Montserrat;">' + title + '</p>'
							),
							balloonContent : address.substr(address.indexOf('.') + 1)
						},
						{
							iconLayout: 'default#image',
							iconImageHref: 'assets/images/develop/map.png',
							iconImageSize: [1, 1],
							iconImageOffset: [-115 / 2, -32]
						}
					));

				});
				$('.map__list').on('click', '.map__list-item', function(){

					let x = +$(this).attr('data-x'),
							y = +$(this).attr('data-y'),
					    address = $(this).text().split('+')[0],
							title = $(this).attr('data-title');	
							
					items.removeClass('map__list-item--active');
					$(this).addClass('map__list-item--active');
					
			
					myMap.panTo([x, y]).then(function () {
						myMap.panTo([x, y]);
						myMap.setZoom(12.5);
					});
		
					for (let i = 0; i < 3; i++) {
						setTimeout(() => {
						myMap.balloon.open([x,y], 
							{
											
								content : '<img src="/wp-content/themes/ggs/assets/images/develop/logo.svg" style="width: 100px;display: block;">' +
								'<p style="text-align: left; font-family: Montserrat;">' + '<b>' + title + '</b>' + '</p>' + '<span style="font-family: Montserrat;">' + address.substr(address.indexOf('.') + 1) + '</span>',
								iconLayout: 'default#image'
							}
						);
						myMap.panTo([x, y]);
					}, 500);
					}
				});
				$('.map__select')
					.trigger('click')
					.find('.map__select-list-item:first')
					.trigger('click');

			});

		});

	}();
	!function(){

		$(document).on("click", ".open-popup", function(e){

			e.preventDefault();

			$('#popup-' + this.getAttribute('data-popup')).fadeIn(200);
			
			$('#popup-wrap-' + this.getAttribute('data-popup')).fadeIn(200);
		});

		$(document).on("click", '.popup__close', function(e){

			e.preventDefault();

			$(this).closest('.popup').fadeOut(200);
			jQuery("iframe").each(function() {
				jQuery(this)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*') //stop modal youtube player
			});
			$('.popup__wrap').fadeOut(200);
			
		});

	}();

	!function(){

		// youtube box

		$(document).on('click', '.youtube-box', function(e){

			e.preventDefault();
			var href = this.getAttribute('href');
			href = href.split('v=');
			href = href[1].split('&');
			href = href[0];

			// 

			$('#youtube-box').attr('src', 'https://www.youtube.com/embed/' + href + '?enablejsapi=1' + '&disablekb=1' + '&controls=0' + '&loop=1'); 

		});

	}();

		// 25 symbols
		let txt25 = $('.gradient-border-mini__text');
		setInterval(function() {
			if (txt25.text().length > 25) {
				txt25.parent().css('text-align', 'left');
			}
		}, 1000);
		
		// anim lines + bullets
		$(window).scroll(function() {
			if ($(this).scrollTop() > (this.innerHeight) * 0.7) {
				$('.bAnim').addClass('borderAnim');
				$('.bulAnim').addClass('bulletAnim');
				$('.iAnim').addClass('imgAnim');				
			}
		});
	
	// media 
	let mobBtn = $('.mobileBtn'), 
			mobLines = $('.mobileBtn__lines'),
			menuNF = $('.header__menu-nf');
	mobBtn.click(function(e) {
		e.preventDefault();
		mobLines.toggleClass('mobileBtn__lines-active');
		menuNF.toggleClass('header__menu-nf-active');
		});
	document.querySelectorAll('.header__menu-a[href="#contact"]').forEach(function(elem) {	
		console.log(document.querySelectorAll('.header__menu-a[href="#contact"]'));			
		elem.addEventListener('click', function(e) {		
			mobLines.toggleClass('mobileBtn__lines-active');
			menuNF.toggleClass('header__menu-nf-active');
			
		})			
	})
	//stop scrolling
	$.fn.scrollEnd = function(callback, timeout) {          
		$(this).scroll(function(){
			var $this = $(this);
			if ($this.data('scrollTimeout')) {
				clearTimeout($this.data('scrollTimeout'));
			}
			$this.data('scrollTimeout', setTimeout(callback,timeout));
		});
	};
	$(window).scroll(function() {
		$('.header--fixed').removeClass('header--fixed-active');
	})
	// how to call it (with a 1000ms timeout):
	$(window).scrollEnd(function(){
		$('.header--fixed').toggleClass('header--fixed-active');
	}, 600);
	
	setTimeout(function() {
		$('.header--fixed').toggleClass('header--fixed-active');
	}, 600);
	let btnNext = $('.slick-next');
	let btnPrev = $('.slick-prev');
	for (let i = 0; i < btnNext.length; i++) {
		const btnN = btnNext[i];
		const btnP = btnPrev[i];
		btnN.addEventListener('mouseover', function() {
			$('.grayscale').addClass('grayscale-hover');
		});
		btnP.addEventListener('mouseover', function() {
			$('.grayscale').addClass('grayscale-hover');
		});
		btnN.addEventListener('mouseleave', function() {
			$('.grayscale').removeClass('grayscale-hover');
		});
		btnP.addEventListener('mouseleave', function() {
			$('.grayscale').removeClass('grayscale-hover');
		});
	}
	if (window.innerWidth < 961) {
		if (document.querySelector('.item__forMob') != null) {
			document.querySelector('.item__forMob').style.bottom = '-150vw';
			const count = document.querySelectorAll('.item__forMob br').length * 6;
			console.log(count);
			const countLinks = document.querySelectorAll('.item__links-a').length * 8;
			let bottomLinks = 220 + countLinks; 
			document.querySelector('.item__forMob').style.bottom = '-' + (150 + count) + 'vw';
			document.querySelector('.item__links').style.bottom = '-' + bottomLinks +  'vw';
			document.querySelector('.item__links').style.bottom = '-' + (bottomLinks + (count/2)) + 'vw';
			// document.querySelector('.item-mob-4').style.height = (365 + count) + 'vw';
			document.querySelector('.item-mob-4').style.height = (270 + count + (countLinks/2)) + 'vw';
		}
	} 
	
}(jQuery);