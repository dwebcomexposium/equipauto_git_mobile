;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);
	var $header = $('.site-banner');

	// Search visible
	function switchHeader() {
		$('.site-banner').removeClass('search-visible');

		if ($('.global-search-form').hasClass('is-visible')) {
			$('.site-banner').addClass('search-visible');
		}
	}

	// Counters
	function countTo(container) {
        $(container).each(function() {
            var $this = $(this);
            var countFrom = parseInt($this.text(), 10);
            var countTo = parseInt($this.data('count'), 10);

            if (!$this.hasClass('counted')) {
                $({ Counter: countFrom }).animate({ Counter: countTo + 1 }, {
                    duration: 1500,
                    easing: 'swing',
                    step: function () {
                      $this.text(Math.floor(this.Counter).toLocaleString().replace(',', '.'));
                    }
                });
            }

            $this.addClass('counted');
        });
    };

	// Start sliders
	function startSlider($slider, options) {
		$slider.carouFredSel(options);
	}

	// Stop default sliders
	function stopSlider($slider) {
		var $sliderClone = $slider.clone();
		var $sliderParent = $slider.parent();

		$sliderClone.attr('style', '');
		$slider.remove();
		$sliderParent
			.after($sliderClone)
			.remove();

		return $sliderClone;
	}

	// Start homepage sliders
	function prepareSlider($slider) {
		$slider = stopSlider($slider);
		$slider
			.find('.la-item-img')
				.wrap('<div class="la-item-img-container"/>');
	}

	// la-item slider
	if ($('.block-small.list-articles').length) {
		$('.block-small.list-articles .inside').append('<div class="block-slider"></div>');

		$('.block-small.list-articles .la-item')
			.detach()
				.appendTo($('.block-slider'));
	}

	// Sectors numbers
	if ($('.sector').length) {
		$('.sector').each(function(){
			var $this = $(this);
			var indx = $this.index() + 1;

			$this.addClass('sector-' + indx);

			$this
				.find('.sector-icon')
					.append('<span>' + indx + '</span>');
		});
	}

	// Blog title
	$('.block-small.list-articles .block-title').html($('html').attr('lang') == 'en' ? 'From the <strong>blog</strong>' : 'en direct <strong>du blog</strong>');

	// Search is open
	$('.gsf-trigger').on('click', function(e){
		switchHeader();
	});

	$doc.on('click', function(e){
		switchHeader();
	});

	// Dropdown Navigation
	$('.mn-item-has-submenu .mn-link').on('click', function(){
		var $this = $(this);
		var $dropdown = $this.next();

		if ($this.next().hasClass('is-open')) {
			$dropdown.removeClass('is-open');
		} else {
			$('.mn-item-has-submenu .mn-menu-submenu').removeClass('is-open');

			$dropdown.addClass('is-open');	
		}			
	});

	// Exposez page item HTML preparation
	if ($('.block-grid').length) {
		$('.block-grid .block-entry').unwrap();
	}

	// Newsletter 
	if ($('.newsletter-form').length) {
		var $form = $('.newsletter-form');

		$form
			.detach()
			.appendTo('body');
		$form
			.find('.nf-form-input input')
			.attr('placeholder', 'Votre email');
		$form
			.find('.nf-main-content')
			.append('<a href="#" class="form-close"/>');

		$('[href*="#newsletter"]').on('click', function(e){
			e.preventDefault();

			$form.addClass('form-shown');
		});

		$doc.on('click', function(e){
			var $target = $(e.target);

			if (($target.is('.form-close, .form-close *') || !$target.is('.nf-main-content, .nf-main-content *, [href*="#newsletter"], [href*="#newsletter"] *')) && $form.hasClass('form-shown')) {
				e.preventDefault();

				$form.removeClass('form-shown');
			}

			if (!$target.is('.lang-switcher, .lang-switcher * ')) {
				$('.lang-switcher').removeClass('is-visible');
			}
		});

		if (window.location.href.indexOf('#newsletter') >= 0) {
			$form.addClass('form-shown');
		}

	}
	
	$win.on('load', function(){
		// Homepage slider
		if ($('.block.list-articles').length) {
			prepareSlider($('.block.list-articles .slider-content'));

			startSlider($('.block.list-articles .slider-content'), {
				width: '100%',
				responsive: true,
				items: 1,
				scroll: { 
					duration: 600
				},
				auto: 3000,
				infinite: true,
				swipe: {
					onTouch: true
				},
				onCreate: function() {
					$(this).closest('.block').addClass('loaded');
				}
			});
		}

		// Blog slider
		if ($('.block-slider').length) {
			startSlider($('.block-slider'), {
				width: '100%',
				responsive: true,
				items: 1,
				scroll: { 
					duration: 600
				},
				auto: 7000,
				infinite: true,
				swipe: {
					onTouch: true
				}
			});
		}

		// Blog slider
		if ($('.sectors').length) {
			$('.sectors').after('<span class="sector-prev"></span><span class="sector-next"></span>');

			startSlider($('.sectors'), {
				width: '100%',
				responsive: true,
				items: 1,
				scroll: { 
					duration: 600
				},
				auto: 7000,
				infinite: true,
				prev: {
					button: $('.sector-prev')
				},
				next: {
					button: $('.sector-next')
				},
				swipe: {
					onTouch: true
				}
			});
		}

		// Single slider
		if ($('.slider-single').length) {
			$('.slider-single .slide').each(function(){
				var $this = $(this);

				$this.wrapInner('<div class="slide-inner"></div>');

				$this
					.find('.slide-inner')
						.css({
							'backgroundImage': 'url(' + $this.find('img').attr('src') + ')'
						});
			});

			startSlider($('.slider-single .slider-container'), {
				width: '100%',
				responsive: true,
				items: 1,
				scroll: { 
					duration: 600
				},
				auto: 7000,
				infinite: true,
				swipe: {
					onTouch: true
				},
				onCreate: function() {
					$(this).closest('.block').addClass('loaded');
				}
			});
		}

		// Exposzez page item slider
		if ($('.block-grid').length) {
			$('.block-grid .row').after('<span class="grid-prev"></span><span class="grid-next"></span>');

			startSlider($('.block-grid .row'), {
				width: '100%',
				responsive: true,
				items: 1,
				scroll: { 
					duration: 600
				},
				auto: 7000,
				infinite: true,
				prev: {
					button: $('.grid-prev')
				},
				next: {
					button: $('.grid-next')
				},
				swipe: {
					onTouch: true
				}
			});
		}
	}).on('load scroll', function(){
		var winST = $win.scrollTop();

		// Burger button on scroll
		$('.sb-menu-trigger').toggleClass('is-fixed', winST > $header.offset().top + $header.outerHeight());

		if ($('.block-stats').length && winST + ($win.outerHeight() * .9) > $('.block-stats').offset().top) {
			countTo($('.stats-counter'));
		}
	});
})(jQuery, window, document);
