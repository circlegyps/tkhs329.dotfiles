$(function() {

    'use strict';

    // website element
    var website = {
            body: $('html,body'),
            window: $(window),
            fade: $('.fade'),
            fCont: $('#food-cont'),
            sCont: $('#shltr-cont'),
            cCont: $('#clth-cont'),
            toTop: $('.to-top')
        },

        // window size
        winW = website.window.width(),
        winH = website.window.height(),
        trigger = {
            show: winH * 0.8,
            hide: winH * 0.2
        },
        y = 0,
        u = 0;

    var eventCtrl = {
        scrlOff: function() {
            website.window.on('mousewheel touchmove', function(e) {
                e.preventDefault();
            });
        },

        scrlOn: function() {
            website.window.off('mousewheel touchmove');
        }
    };

    var format = function() {

        // 60fps > 24fps

        var fps = 24 / 1000,
            slug = {
                resize: false,
                scroll: false
            };

        var resize = function() {
            slug.resize = true;
        };

        var scroll = function() {
            slug.scroll = true;
        };

        var render = function() {

            if (slug.resize) {

                slug.resize = false;
                winW = website.window.width();
                winH = website.window.height();
                trigger = {
                    show: winH * 0.8,
                    hide: winH * 0.05
                };
            }

            if (slug.scroll) {

                slug.scroll = false;
                y = website.window.scrollTop();

                scrlAct();
            }
        };

        var scrlAct = function() {

            website.fade.each(function() {
                var targetPos = $(this).offset().top;
                if (y + trigger.show >= targetPos) {
                    $(this).removeClass('is-btm');
                }
            });

            if (100 < y) {
                website.toTop.addClass('is-in');
            } else {
                website.toTop.removeClass('is-in');
            }

        };

        setInterval(render, fps);
        website.window.on('resize', resize);
        website.window.on('scroll', scroll);
    };

    var loading = function() {

        eventCtrl.scrlOff();

        var loading = {
            load: $('#loading'),
            progBar: $('.progress-bar'),
            imgLoad: imagesLoaded('body'),
            imgLoaded: 0,
            current: 0,
            time: setInterval(update, 1000 / 60)
        };

        var imgTotal = loading.imgLoad.images.length;

        loading.imgLoad.on('progress', function() {
            loading.imgLoaded++;
        });

        function update() {

            var imgs = (loading.imgLoaded / imgTotal) * 100;

            loading.current += (imgs - loading.current) * 0.1;
            loading.progBar.css({
                width: loading.current + '%'
            });

            if (loading.current >= 100) {

                clearInterval(loading.time);
                loading.load.fadeOut(600, function() {
                    init();
                });
            }

            if (loading.current > 99.9) {
                loading.current = 100;
            }
        }
    };

    var slider = function() {

        var slider = $('#slider'),
            slider = {
                tit: slider.find('.cat-tit'),
                place01: slider.find('.place01'),
                place02: slider.find('.place02'),
                wrap: slider.find('.slide-wrap'),
                slide: slider.find('.slide'),
                img: slider.find('.slide-img'),
                indiBtn: slider.find('.indi-btn'),
                prev: slider.find('.prev'),
                next: slider.find('.next'),
                interval: 6000,
                duration: 1000
            };

        var current = 0,
            len = slider.slide.length - 1,
            n = 0,
            p = 0,
            b = 0,
            oldTit,
            oldPlace01,
            oldPlace02,
            titles = ['FOOD', 'FOOD', 'SHELTER', 'SHELTER', 'CLOTHING', 'CLOTHING'],
            places01 = ['house in', 'at JAPAN', 'house in', 'at JAPAN', 'house in', 'at JAPAN'],
            places02 = ['LONDON', '山田真萬さんの陶器市へ', 'LONDON', '松本民芸家具の秘密', 'LONDON', '久留米絣を買い付け'];

        var pageChange = {

            prevAct: function() {
                oldTit = slider.slide.eq(current).attr('data-tit');
                oldPlace01 = slider.slide.eq(current).attr('data-place-one');
                oldPlace02 = slider.slide.eq(current).attr('data-place-two');

                if (0 === current) {
                    slider.indiBtn.removeClass('is-current');
                    slider.indiBtn.last().addClass('is-current');
                    current = len;
                    currentFade(current);
                    titChange(current);

                    return;

                } else {

                    slider.indiBtn.removeClass('is-current');
                    slider.indiBtn.eq(current - 1).addClass('is-current');
                    current--;
                    currentFade(current);
                    titChange(current);

                    return;
                }
            },

            nextAct: function() {
                oldTit = slider.slide.eq(current).attr('data-tit');
                oldPlace01 = slider.slide.eq(current).attr('data-place-one');
                oldPlace02 = slider.slide.eq(current).attr('data-place-two');

                if (len - 1 < current) {
                    slider.indiBtn.removeClass('is-current');
                    slider.indiBtn.first().addClass('is-current');
                    current = 0;
                    currentFade(current);
                    titChange(current);

                    return;

                } else {
                    slider.indiBtn.removeClass('is-current');
                    slider.indiBtn.eq(current + 1).addClass('is-current');
                    current++;
                    currentFade(current);
                    titChange(current);

                    return;
                }
            }
        };

        var titChange = function(current) {

            if (oldTit !== titles[current]) {

                if (current === 4 || current === 5) {
                    n = 2;
                } else if (current === 2 || current === 3) {
                    n = 1;
                } else if (current === 0 || current === 1) {
                    n = 0;
                }

                slider.tit.removeClass('is-in');
                slider.tit.eq(n).addClass('is-in');

            }

            if (oldPlace01 !== places01[current]) {
                slider.place01.removeClass('is-in');
                slider.place01.eq(current % 2).addClass('is-in');
            }

            if (oldPlace02 !== places02[current]) {

                if (current === 0 || current === 2 || current === 4) {
                    p = 0;
                } else if (current === 1) {
                    p = 1;
                } else if (current === 3) {
                    p = 2;
                } else if (current === 5) {
                    p = 3;
                }

                slider.place02.removeClass('is-in');
                slider.place02.eq(p).addClass('is-in');
            }

        };

        var currentFade = function(current) {

            if (b !== current) {
                slider.img.fadeOut(slider.duration);
                slider.img.eq(current).fadeIn(slider.duration);
                clearInterval(autoSlide);
                autoSlide = setInterval(pageChange.nextAct, slider.interval);
                b = current;
            } else {
                return;
            }
        };

        var autoSlide = setInterval(pageChange.nextAct, slider.interval);

        slider.prev.click(function() {
            pageChange.prevAct();
        });

        slider.next.click(function() {
            pageChange.nextAct();
        });

        // インジケータークリック時
        slider.indiBtn.click(function(e) {
            (e.preventDefault) ? e.preventDefault(): e.returnValue = false;
            var i = slider.indiBtn.index(this);
            oldTit = slider.slide.eq(current).attr('data-tit');
            oldPlace01 = slider.slide.eq(current).attr('data-place-one');
            oldPlace02 = slider.slide.eq(current).attr('data-place-two');
            slider.indiBtn.removeClass('is-current');
            $(this).addClass('is-current');
            current = i;
            currentFade(current);
            titChange(current);
        });

        var firstAct = function() {
            slider.img.eq(0).fadeIn(slider.duration);
            slider.indiBtn.eq(0).addClass('is-current');
            slider.tit.eq(0).addClass('is-in');
            slider.place01.eq(0).addClass('is-in');
            slider.place02.eq(0).addClass('is-in');
        };

        firstAct();
    };

    var clickAct = function() {

        var dur = 1600,
            flag = true,
            easing = 'easeInOutExpo';

        $('.anchor[href^=#]').click(function(elm) {
            (elm.preventDefault) ? elm.preventDefault(): elm.returnValue = false;

            eventCtrl.scrlOff();

            var elm = $(this);
            move(elm);

        });

        var move = function(elm) {
            var href = elm.attr('href'),
                tgt = $(href === '#' || href === '' ? 'html' : href),
                pos = tgt.offset().top;

            website.body.animate({
                scrollTop: pos - 20
            }, {
                duration: dur,
                easing: easing,
                complete: function() {
                    eventCtrl.scrlOn();
                }
            });
        };
    };

    // initialize
    var init = function() {

        eventCtrl.scrlOn();
        format();
        slider();
        clickAct();
        var s = skrollr.init();
        return init;

    };

    loading();

});