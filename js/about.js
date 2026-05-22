function initAOS() {
	if (typeof AOS === 'undefined') return

	AOS.init({
		duration: 400,
		easing: 'ease-in-out',
		offset: 0,
		once: true,
	})
}

document.addEventListener('DOMContentLoaded', initAOS)

document.addEventListener('DOMContentLoaded', function () {
    var heroSwiper = new Swiper('.about-hero__swiper', {
        loop: true,
        speed: 600,
        navigation: {
            prevEl: '.about-hero__prev',
            nextEl: '.about-hero__next',
        },
        on: {
            slideChange: function () {
                var current = this.realIndex + 1;
                var total = this.slides.length - (this.loopedSlides || 0);
                var counter = document.querySelector('.about-hero__counter-current');
                if (counter) {
                    counter.textContent = String(current).padStart(2, '0');
                }
            },
            init: function () {
                var total = this.slides.length;
                var counter = document.querySelector('.about-hero__counter-current');
                if (counter) {
                    counter.textContent = '01';
                }
            }
        }
    });

    (function () {
        var list = document.querySelector('.about-advantages__list');
        var blocks = document.querySelector('.about-advantages__blocks');
        var images = document.querySelectorAll('.about-advantages__image, .about-advantages__image-mobile');
        if (!list || !blocks) return;

        var items = list.querySelectorAll('.about-advantages__item');
        var blockList = blocks.querySelectorAll('.about-advantages__block');

        function activate(idx) {
            items.forEach(function (el, i) {
                el.classList.toggle('about-advantages__item--active', i === idx);
            });
            blockList.forEach(function (el, i) {
                el.classList.toggle('about-advantages__block--active', i === idx);
            });
            images.forEach(function (imgBlock) {
                var imgs = imgBlock.querySelectorAll('.about-advantages__image-img');
                imgs.forEach(function (el, i) {
                    el.classList.toggle('about-advantages__image-img--active', i === idx);
                });
            });
        }

        items.forEach(function (item, i) {
            item.addEventListener('mouseenter', function () { activate(i); });
        });

        list.addEventListener('mouseleave', function () {
            activate(0);
        });
    })();

    (function () {
        var nums = document.querySelectorAll('.about-stats__number');
        var section = document.querySelector('.about-stats');
        if (!nums.length || !section) return;

        var targets = [], suffixes = [];
        nums.forEach(function (el) {
            var text = el.textContent.trim();
            var m = text.match(/^(\d+)(.*)$/);
            targets.push(m ? parseInt(m[1], 10) : 0);
            suffixes.push(m ? (m[2] || '') : '');
        });

        var done = false;

        function animate() {
            if (done) return;
            done = true;
            var start = performance.now(), duration = 2000;

            function step(now) {
                var p = Math.min((now - start) / duration, 1);
                nums.forEach(function (el, i) {
                    el.textContent = Math.round(p * targets[i]) + suffixes[i];
                });
                if (p < 1) requestAnimationFrame(step);
                else nums.forEach(function (el, i) { el.textContent = targets[i] + suffixes[i]; });
            }
            requestAnimationFrame(step);
        }

        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) { if (e.isIntersecting) { animate(); obs.disconnect(); } });
        }, { threshold: 0.3 });
        obs.observe(section);
    })();

    new Swiper('.about-press__grid', {
        slidesPerView: 4,
        spaceBetween: 20,
        speed: 600,
        grabCursor: true,
        breakpoints: {
            0: { slidesPerView: 2.1, spaceBetween: 12 },
            769: { slidesPerView: 4, spaceBetween: 20 }
        }
    });

    new Swiper('.about-reviews__cards', {
        slidesPerView: 3,
        spaceBetween: 22,
        loop: true,
        speed: 600,
        grabCursor: true,
        breakpoints: {
            0: { slidesPerView: 1, spaceBetween: 12 },
            769: { slidesPerView: 2, spaceBetween: 16 },
            1201: { slidesPerView: 3, spaceBetween: 22 }
        }
    });
});
