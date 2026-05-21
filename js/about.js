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
        var image = document.querySelector('.about-advantages__image');
        var overline = document.querySelector('.about-advantages__overline');
        var title = document.querySelector('.about-advantages__title');
        if (!list || !image || !overline || !title) return;

        var items = list.querySelectorAll('.about-advantages__item');

        function activate(item) {
            items.forEach(function (el) { el.classList.remove('about-advantages__item--active'); });
            item.classList.add('about-advantages__item--active');
            var src = item.getAttribute('data-image');
            if (src) image.style.backgroundImage = 'url(' + src + ')';
            var o = item.getAttribute('data-overline');
            if (o) overline.textContent = o;
            var t = item.getAttribute('data-title');
            if (t) title.innerHTML = t;
        }

        items.forEach(function (item) {
            item.addEventListener('mouseenter', function () { activate(item); });
        });

        list.addEventListener('mouseleave', function () {
            activate(items[0]);
        });
    })();
});
