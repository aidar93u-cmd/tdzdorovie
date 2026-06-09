document.addEventListener('DOMContentLoaded', function() {

    /* ---- Form Mask & Validation ---- */

    var phoneInput = document.querySelector('input[name="phone"]');
    var phoneMask = null;
    if (phoneInput && typeof IMask !== 'undefined') {
        phoneMask = IMask(phoneInput, {
            mask: '+{7} (000) 000-00-00'
        });
    }

    var form = document.getElementById('cta-form');
    if (form && typeof validate !== 'undefined') {
        var constraints = {
            name: { presence: { message: 'Введите имя' } },
            phone: {
                presence: { message: 'Введите телефон' },
                format: {
                    pattern: '\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}',
                    message: 'Номер заполнен не полностью'
                }
            },
            email: {
                presence: { message: 'Введите email' },
                email: { message: 'Некорректный email' }
            },
            consent: { presence: { message: 'Подтвердите согласие' } }
        };

        function clearErrors() {
            form.querySelectorAll('.franchise-cta__error').forEach(function(el) {
                el.textContent = '';
            });
            form.querySelectorAll('.franchise-cta__field').forEach(function(el) {
                el.classList.remove('franchise-cta__field--error');
            });
        }

        function showErrors(errors) {
            clearErrors();
            Object.keys(errors).forEach(function(field) {
                var errEl = form.querySelector('[data-error="' + field + '"]');
                var fieldEl = form.querySelector('[name="' + field + '"]');
                if (errEl) errEl.textContent = errors[field][0];
                if (fieldEl) {
                    var wrapper = fieldEl.closest('.franchise-cta__field');
                    if (wrapper) wrapper.classList.add('franchise-cta__field--error');
                }
            });
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            clearErrors();

            var formValues = {
                name: form.querySelector('[name="name"]').value.trim(),
                phone: phoneMask ? phoneMask.unmaskedValue : form.querySelector('[name="phone"]').value,
                email: form.querySelector('[name="email"]').value.trim(),
                consent: form.querySelector('[name="consent"]').checked ? 'yes' : undefined
            };

            var errors = validate(formValues, constraints);
            if (errors) {
                showErrors(errors);
                return;
            }

            alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
            form.reset();
            if (phoneMask) phoneMask.value = '';
        });
    }
});

/* ---- AOS ---- */

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
window.addEventListener('load', function() { if (typeof AOS !== 'undefined') AOS.refresh() })

gsap.registerPlugin(ScrollTrigger)

document.addEventListener('DOMContentLoaded', () => {
	const cards = gsap.utils.toArray('.franchise-catalog__card')
	const list = document.querySelector('.franchise-catalog__list')

	if (!cards.length || !list) {
		return
	}

	ScrollTrigger.matchMedia({
		'(min-width: 768px)': function () {
			cards.forEach((card, index) => {
				gsap.set(card, {
					zIndex: cards.length + index,
				})

				ScrollTrigger.create({
					trigger: card,
					start: `top top+=${100 + index * 10}`,
					endTrigger: list,
					end: 'bottom center+=150',
					pin: true,
					pinSpacing: false,
					invalidateOnRefresh: true,
					anticipatePin: 0,
				})
			})
		},

		// --- МОБИЛЬНЫЕ (ширина экрана < 768px) ---
		'(max-width: 767.98px)': function () {
		},
	})

	/* ===== Consultation Popup Form ===== */

	Fancybox.bind('[data-fancybox]', {
		animated: false,
		dragToClose: true,
		closeButton: false,
	})

	var form = document.getElementById('consultation-form')
	if (form && typeof validate !== 'undefined') {
		var constraints = {
			surname: { presence: { message: 'Введите фамилию' } },
			name: { presence: { message: 'Введите имя' } },
			email: {
				presence: { message: 'Введите email' },
				email: { message: 'Некорректный email' },
			},
			consent: { presence: { message: 'Подтвердите согласие' } },
		}

		function clearPopupErrors() {
			form.querySelectorAll('.popup-form__field').forEach(function (el) {
				el.classList.remove('popup-form__field--error')
			})
		}

		function showPopupErrors(errors) {
			clearPopupErrors()
			Object.keys(errors).forEach(function (field) {
				var fieldEl = form.querySelector('[name="' + field + '"]')
				if (fieldEl) {
					var wrapper = fieldEl.closest('.popup-form__field')
					if (wrapper) wrapper.classList.add('popup-form__field--error')
				}
			})
		}

		form.addEventListener('submit', function (e) {
			e.preventDefault()
			clearPopupErrors()

			var formValues = {
				surname: form.querySelector('[name="surname"]').value.trim(),
				name: form.querySelector('[name="name"]').value.trim(),
				email: form.querySelector('[name="email"]').value.trim(),
				consent: form.querySelector('[name="consent"]').checked ? 'yes' : undefined,
			}

			var errors = validate(formValues, constraints)
			if (errors) {
				showPopupErrors(errors)
				return
			}

			var submitBtn = document.getElementById('consultation-submit')
			submitBtn.classList.add('popup-form__submit--loading')
			submitBtn.disabled = true

			setTimeout(function () {
				submitBtn.classList.remove('popup-form__submit--loading')
				submitBtn.disabled = false

				document.querySelector('.popup-form').classList.add('popup-form--success')
				form.reset()
			}, 1500)
		})
	}
})