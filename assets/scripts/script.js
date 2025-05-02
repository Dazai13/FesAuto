// Универсальный обработчик готовности документа
(function() {
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState !== 'loading') {
          fn();
        }
      });
    }
  }

  // Проверка наличия jQuery
  function checkJQuery(callback) {
    if (window.jQuery) {
      callback(jQuery);
    } else {
      var script = document.createElement('script');
      script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
      script.onload = function() {
        callback(jQuery.noConflict(true));
      };
      script.onerror = function() {
        console.error('Ошибка загрузки jQuery');
      };
      document.head.appendChild(script);
    }
  }

  ready(function() {
    checkJQuery(function($) {
      // Проверка Slick Slider
      if (typeof $.fn.slick === 'undefined') {
        console.error('Slick Slider не подключен');
        return;
      }

      // Общие переменные с проверкой
      var warning = document.getElementById('warning');
      var mobileMenu = document.querySelector('.mobile-menu');
      var menuToggle = document.getElementById('menu-toggle');

      // Инициализация компонентов
      initQuiz();
      initSliders();
      initPopups();
      initAccordions();
      initScrollLinks();
      initMobileMenu();
      initCalculators();
      initPhoneMasks();
      initLazyLoad();

      /***** 1. Квиз-система *****/
      function initQuiz() {
        var steps = document.querySelectorAll('.quiz-step');
        if (!steps.length) return;

        var nextBtn = document.getElementById('nextBtn');
        var prevBtn = document.getElementById('prevBtn');
        var progress = document.querySelector('.progress');
        var quiznavtext = document.querySelector('.quiz-text');
        var questionCount = document.getElementById('questionCount');
        var currentStep = 0;

        function showStep(index) {
          for (var i = 0; i < steps.length; i++) {
            steps[i].classList.toggle('active', i === index);
          }

          if (progress) progress.style.width = ((index + 1) / steps.length) * 100 + '%';
          if (questionCount) questionCount.textContent = (index + 1) + ' вопрос из ' + steps.length;
          if (prevBtn) prevBtn.disabled = index === 0;

          var inputs = steps[index].querySelectorAll('input');
          var isAnswered = false;
          for (var j = 0; j < inputs.length; j++) {
            if (inputs[j].checked) {
              isAnswered = true;
              break;
            }
          }
          if (nextBtn) nextBtn.disabled = !isAnswered;

          if (nextBtn) nextBtn.style.display = index === steps.length - 1 ? 'none' : 'inline-block';
          if (quiznavtext) quiznavtext.style.display = index === steps.length - 1 ? 'none' : 'flex';

          for (var k = 0; k < inputs.length; k++) {
            inputs[k].addEventListener('change', function() {
              if (nextBtn) nextBtn.disabled = false;
              if (warning) warning.style.display = 'none';
            });
          }
        }

        if (nextBtn) {
          nextBtn.addEventListener('click', function() {
            var selected = steps[currentStep].querySelector('input:checked');
            if (!selected) {
              if (warning) warning.style.display = 'block';
              return;
            }

            console.log('Ответ на ' + (currentStep + 1) + ': ' + selected.value);

            currentStep++;
            if (currentStep < steps.length) {
              showStep(currentStep);
            } else {
              var quizRight = document.querySelector('.quiz-right');
              if (quizRight) {
                quizRight.innerHTML = '<h2>Спасибо за прохождение теста!</h2><p>Мы свяжемся с вами для подбора автомобиля.</p>';
              }
            }
          });
        }

        if (prevBtn) {
          prevBtn.addEventListener('click', function() {
            if (currentStep > 0) {
              currentStep--;
              showStep(currentStep);
            }
          });
        }

        showStep(currentStep);
      }

      /***** 2. Адаптивные слайдеры *****/
      function initSliders() {
        var sliders = {
          '.car_list_slider': {
            desktop: {
              slidesToShow: 3,
              slidesToScroll: 1,
              centerMode: true,
              centerPadding: '40px',
              infinite: true,
              arrows: true,
              prevArrow: $('.car_list_slider_button_prev'),
              nextArrow: $('.car_list_slider_button_next')
            },
            mobile: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: true
            }
          },
          // ... остальные слайдеры
        };

        function handleSliders() {
          var isMobile = window.innerWidth <= 1199;

          for (var selector in sliders) {
            if (sliders.hasOwnProperty(selector)) {
              var $slider = $(selector);
              if (!$slider.length) continue;

              var settings = isMobile ? sliders[selector].mobile : sliders[selector].desktop;

              if (settings) {
                if (!$slider.hasClass('slick-initialized')) {
                  $slider.slick(settings);
                }
              } else {
                if ($slider.hasClass('slick-initialized')) {
                  $slider.slick('unslick');
                }
              }
            }
          }
        }

        var resizeTimer;
        window.addEventListener('resize', function() {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(handleSliders, 250);
        });

        handleSliders();
      }

      /***** 3. Попапы *****/
      function initPopups() {
        var popups = [
          { id: 'popup', videoId: 'video1' },
          { id: 'popup1', videoId: 'video2' },
          { id: 'popup2', videoId: 'video3' }
        ];

        popups.forEach(function(popup) {
          var openBtn = document.querySelector('[onclick*="openPopup' + (popup.id === 'popup' ? '' : popup.id.slice(-1)) + '"]');
          if (openBtn) {
            openBtn.onclick = function() {
              var popupElement = document.getElementById(popup.id);
              if (popupElement) popupElement.classList.add('active');
              document.body.style.overflow = 'hidden';
            };
          }

          var closeBtn = document.querySelector('[onclick*="closePopup' + (popup.id === 'popup' ? '' : popup.id.slice(-1)) + '"]');
          if (closeBtn) {
            closeBtn.onclick = function() {
              var popupElement = document.getElementById(popup.id);
              if (popupElement) popupElement.classList.remove('active');
              document.body.style.overflow = '';
              
              var video = document.getElementById(popup.videoId);
              if (video) {
                video.pause();
                video.currentTime = 0;
              }
            };
          }
        });
      }

      /***** 4. Аккордеоны *****/
      function initAccordions() {
        var accordions = document.querySelectorAll('.accordion');
        for (var i = 0; i < accordions.length; i++) {
          accordions[i].addEventListener('click', function() {
            // Закрываем все, кроме текущего
            for (var j = 0; j < accordions.length; j++) {
              if (accordions[j] !== this) {
                accordions[j].classList.remove('active');
                var panel = accordions[j].nextElementSibling;
                if (panel) panel.style.maxHeight = null;
              }
            }

            // Переключаем текущий
            this.classList.toggle('active');
            var panel = this.nextElementSibling;
            if (!panel) return;

            if (panel.style.maxHeight) {
              panel.style.maxHeight = null;
            } else {
              panel.style.maxHeight = panel.scrollHeight + 'px';
            }
          });
        }
      }

      /***** 5. Плавные скроллы *****/
      function initScrollLinks() {
        var scrollLinks = document.querySelectorAll('.scroll-link');
        for (var i = 0; i < scrollLinks.length; i++) {
          scrollLinks[i].addEventListener('click', function(e) {
            e.preventDefault();
            var target = this.dataset.target;
            if (!target) return;

            var element = document.getElementById(target);
            if (!element) return;

            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            if (history.pushState) {
              history.pushState(null, null, window.location.pathname);
            } else {
              window.location.hash = '';
            }
            
            if (mobileMenu && mobileMenu.classList.contains('active')) {
              mobileMenu.classList.remove('active');
            }
          });
        }
      }

      /***** 6. Мобильное меню *****/
      function initMobileMenu() {
        if (menuToggle && mobileMenu) {
          menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
          });
        }
      }

      /***** 7. Калькуляторы *****/
      function initCalculators() {
        // Форматирование чисел
        function formatCurrency(value) {
          return value.toLocaleString('ru-RU') + ' руб.';
        }

        function formatAmountLabel(value) {
          if (value >= 1000000) {
            return (value / 1000000).toFixed(1) + ' млн руб.';
          } else {
            return (value / 1000).toFixed(0) + ' тыс. руб.';
          }
        }

        // Калькулятор с процентной ставкой
        var amountInput = document.getElementById('amountRange');
        var termInput = document.getElementById('termRange');
        var amountDisplay = document.querySelectorAll('.range-label')[0];
        var termDisplay = document.querySelectorAll('.range-label')[1];
        var monthlyAmount = document.querySelector('.amount');

        if (amountInput && termInput && amountDisplay && termDisplay && monthlyAmount) {
          var interestRate = 9.9;

          function calculatePayment() {
            var S = parseFloat(amountInput.value) || 0;
            var n = parseInt(termInput.value) || 1;
            var r = (interestRate / 100) / 12;

            var monthly = S * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

            monthlyAmount.textContent = formatCurrency(Math.round(monthly));
            amountDisplay.textContent = formatAmountLabel(S);
            termDisplay.textContent = n + ' мес.';
          }

          amountInput.addEventListener('input', calculatePayment);
          termInput.addEventListener('input', calculatePayment);
          calculatePayment();
        }

        // Калькулятор с 0%
        var amount0 = document.getElementById('amountRange0');
        var term0 = document.getElementById('termRange0');
        var amountLabel0 = document.getElementById('amountLabel0');
        var termLabel0 = document.getElementById('termLabel0');
        var payment0 = document.getElementById('payment0');

        if (amount0 && term0 && amountLabel0 && termLabel0 && payment0) {
          function calcZeroPercent() {
            var s = parseFloat(amount0.value) || 0;
            var n = parseInt(term0.value) || 1;
            var result = s / n;

            amountLabel0.textContent = formatAmountLabel(s);
            termLabel0.textContent = n + ' мес.';
            payment0.textContent = formatCurrency(Math.round(result));
          }

          amount0.addEventListener('input', calcZeroPercent);
          term0.addEventListener('input', calcZeroPercent);
          amount0.value = 300000;
          term0.value = 24;
          calcZeroPercent();
        }
      }

      /***** 8. Маски для телефонов *****/
      function initPhoneMasks() {
        function applyPhoneMask(input) {
          input.addEventListener('input', function(e) {
            var previousValue = this.value;
            var cursorPosition = this.selectionStart;
            
            var numbers = this.value.replace(/\D/g, '');
            
            var formattedValue = '';
            if (numbers.length > 0) {
              numbers = '7' + numbers.substring(numbers.indexOf('7') === 0 ? 1 : 0);
              formattedValue = '+7';
              
              if (numbers.length > 1) {
                formattedValue += ' ' + numbers.substring(1, 4);
              }
              if (numbers.length > 4) {
                formattedValue += ' ' + numbers.substring(4, 7);
              }
              if (numbers.length > 7) {
                formattedValue += '-' + numbers.substring(7, 9);
              }
              if (numbers.length > 9) {
                formattedValue += '-' + numbers.substring(9, 11);
              }
            }
            
            this.value = formattedValue;
            this.setSelectionRange(formattedValue.length, formattedValue.length);
          });
          
          input.addEventListener('keydown', function(e) {
            if ((e.key === 'Backspace' || e.key === 'Delete') && this.selectionStart <= 3) {
              e.preventDefault();
            }
          });
        }

        var phoneInputs = document.querySelectorAll('input[type="tel"], input[placeholder*="телефона"]');
        for (var i = 0; i < phoneInputs.length; i++) {
          if (phoneInputs[i].type !== 'tel') phoneInputs[i].type = 'tel';
          applyPhoneMask(phoneInputs[i]);
          phoneInputs[i].value = '+7';
        }
      }

      /***** 9. Ленивая загрузка изображений *****/
      function initLazyLoad() {
        if ('IntersectionObserver' in window) {
          var lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                var lazyImage = entry.target;
                if (lazyImage.dataset.originalSrc) {
                  lazyImage.src = lazyImage.dataset.originalSrc;
                  lazyImage.onload = function() {
                    lazyImage.style.opacity = '1';
                  };
                }
                lazyImageObserver.unobserve(lazyImage);
              }
            });
          });

          var lazyImages = document.querySelectorAll('img[data-original-src]');
          for (var i = 0; i < lazyImages.length; i++) {
            lazyImages[i].style.opacity = '0';
            lazyImages[i].style.transition = 'opacity 0.5s ease';
            lazyImageObserver.observe(lazyImages[i]);
          }
        } else {
          // Фолбэк для старых браузеров
          var lazyImages = document.querySelectorAll('img[data-original-src]');
          for (var i = 0; i < lazyImages.length; i++) {
            if (lazyImages[i].dataset.originalSrc) {
              lazyImages[i].src = lazyImages[i].dataset.originalSrc;
            }
          }
        }
      }
    });
  });
})();