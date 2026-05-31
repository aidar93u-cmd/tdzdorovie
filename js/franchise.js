document.addEventListener('DOMContentLoaded', function() {
    var COEFFS = {
        city: { msk: 1.0, spb: 0.85, big: 0.7, small: 0.55 },
        area: { '8': 1.0, '10': 1.15 }
    };

    var BASE = {
        investment: 3200000,
        revenue: 1500000,
        profit: 225760
    };

    function getChecked(name) {
        var el = document.querySelector('input[name="' + name + '"]:checked');
        return el ? el.value : null;
    }

    function getNum(id) {
        return parseFloat(document.getElementById(id).value);
    }

    function formatLarge(val) {
        if (val >= 1000000) {
            return (val / 1000000).toFixed(1).replace('.', ',') + ' млн \u20BD';
        }
        return Math.round(val).toLocaleString('ru-RU') + ' \u20BD';
    }

    function formatMedium(val) {
        return Math.round(val).toLocaleString('ru-RU') + ' \u20BD';
    }

    function formatMonths(val) {
        return Math.round(val) + ' \u043C\u0435\u0441';
    }

    function calculate() {
        var city = getChecked('city');
        var area = getChecked('area');
        var checks = getNum('checks-range');
        var avgCheck = getNum('avgcheck-range');

        var cityCoeff = COEFFS.city[city] || 1.0;
        var areaCoeff = COEFFS.area[area] || 1.0;
        var checksRatio = checks / 10;
        var checkRatio = avgCheck / 2000;

        var revenue = BASE.revenue * cityCoeff * areaCoeff * checksRatio * checkRatio;
        var profit = BASE.profit * cityCoeff * areaCoeff * checksRatio * checkRatio;
        var investment = BASE.investment * cityCoeff * areaCoeff;
        var payback = profit > 0 ? investment / profit : 0;

        document.getElementById('result-investment').textContent = formatLarge(investment);
        document.getElementById('result-payback').textContent = formatMonths(payback);
        document.getElementById('result-revenue').textContent = formatLarge(revenue);
        document.getElementById('result-profit').textContent = formatMedium(profit);

        document.getElementById('checks-value').textContent = checks;
        document.getElementById('avgcheck-value').textContent = avgCheck.toLocaleString('ru-RU') + ' \u20BD';

        document.querySelectorAll('.franchise-calc__range').forEach(function(r) {
            var pct = ((r.value - r.min) / (r.max - r.min)) * 100;
            r.style.background = 'linear-gradient(to right, #353535 ' + pct + '%, #e6e6e6 ' + pct + '%)';
        });
    }

    document.querySelectorAll('input[data-param]').forEach(function(input) {
        input.addEventListener('change', function() {
            if (this.type === 'radio') {
                var group = this.closest('[data-group]');
                if (group) {
                    group.querySelectorAll('.franchise-calc__radio').forEach(function(lbl) {
                        lbl.classList.remove('franchise-calc__radio--active');
                    });
                }
                var label = this.closest('.franchise-calc__radio');
                if (label) label.classList.add('franchise-calc__radio--active');
            }
            calculate();
        });
    });

    document.querySelectorAll('.franchise-calc__range').forEach(function(input) {
        input.addEventListener('input', calculate);
    });

    var btn = document.querySelector('.franchise-calc__result-btn');
   

    calculate();

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