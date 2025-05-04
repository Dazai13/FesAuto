document.addEventListener("DOMContentLoaded", function() {
  // Проверка подключения jQuery и Slick Slider
  if (typeof jQuery === 'undefined' || typeof jQuery.fn.slick === 'undefined') {
    console.error('Ошибка: jQuery или Slick Slider не подключены!');
    return;
  }

  // Общие переменные
  const $ = jQuery;
  const warning = document.getElementById('warning');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuToggle = document.getElementById('menu-toggle');

  // Инициализация всех компонентов
  initQuiz();
  initSliders();
  initPopups();
  initAccordions();
  initScrollLinks();
  initMobileMenu();
  initCalculators();

  // 1. Квиз-система
  function initQuiz() {
    const steps = document.querySelectorAll('.quiz-step');
    if (!steps.length) return;

    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const progress = document.querySelector('.progress');
    const quiznavtext = document.querySelector('.quiz-text');
    const questionCount = document.getElementById('questionCount');
    let currentStep = 0;

    function showStep(index) {
      steps.forEach((step, i) => {
        step.classList.toggle('active', i === index);
      });

      if (progress) progress.style.width = `${((index + 1) / steps.length) * 100}%`;
      if (questionCount) questionCount.textContent = `${index + 1} вопрос из ${steps.length}`;
      if (prevBtn) prevBtn.disabled = index === 0;

      const inputs = steps[index].querySelectorAll('input');
      const isAnswered = Array.from(inputs).some(input => input.checked);
      if (nextBtn) nextBtn.disabled = !isAnswered;

      if (nextBtn) nextBtn.style.display = index === steps.length - 1 ? 'none' : 'inline-block';
      if (quiznavtext) quiznavtext.style.display = index === steps.length - 1 ? 'none' : 'flex';

      inputs.forEach(input => {
        input.addEventListener('change', () => {
          if (nextBtn) nextBtn.disabled = false;
          if (warning) warning.style.display = 'none';
        });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const selected = steps[currentStep].querySelector('input:checked');
        if (!selected) {
          if (warning) warning.style.display = 'block';
          return;
        }

        console.log(`Ответ на ${currentStep + 1}: ${selected.value}`);

        currentStep++;
        if (currentStep < steps.length) {
          showStep(currentStep);
        } else {
          const quizRight = document.querySelector('.quiz-right');
          if (quizRight) {
            quizRight.innerHTML = `
              <h2>Спасибо за прохождение теста!</h2>
              <p>Мы свяжемся с вами для подбора автомобиля.</p>
            `;
          }
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
          currentStep--;
          showStep(currentStep);
        }
      });
    }

    showStep(currentStep);
  }

  // 2. Адаптивные слайдеры
  function initSliders() {
    const sliders = {
      '.car_list_slider': {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        prevArrow: $('.car_list_slider_button_prev'),
        nextArrow: $('.car_list_slider_button_next'),
      },
      '.video_cases': {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        centerMode: true,
        dots: true,
        infinite: false,
        responsive: [
          {
            breakpoint: 1199,
            settings: "unslick" // или можно указать другие настройки
          }
        ]
      },
      '.process_slides_mob': {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        infinite: true,
        responsive: [
          {
            breakpoint: 1199,
            settings: "unslick"
          }
        ]
      },
      '.about_slider': {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        responsive: [
          {
            breakpoint: 1199,
            settings: "unslick"
          }
        ]
      },
      '.reviews_slides': {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        centerMode: true,
        centerPadding: '9px',
        dots: true,
        infinite: false,
        variableWidth: true,
        responsive: [
          {
            breakpoint: 1199,
            settings: "unslick"
          }
        ]
      },
      '.benefit_slider': {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        loop: true,
        prevArrow: $('.benefit_arrow_prev'),
        nextArrow: $('.benefit_arrow_next'),
        responsive: [
          {
            breakpoint: 1199,
            settings: "unslick"
          }
        ]
      },
      '.benefit_slider_mob': {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        padding: "10px",
        prevArrow: $('.benefit_arrow_prev_mob'),
        nextArrow: $('.benefit_arrow_next_mob')
      }
    };
  
    // Инициализация всех слайдеров
    Object.entries(sliders).forEach(([selector, config]) => {
      const $slider = $(selector);
      if ($slider.length && !$slider.hasClass('slick-initialized')) {
        $slider.slick(config);
      }
    });
  
    // Обработчик ресайза теперь не нужен, так как Slick сам обрабатывает breakpoints
  }

  // 3. Попапы
  function initPopups() {
    const popups = [
      { id: 'popup', videoId: 'video1' },
      { id: 'popup1', videoId: 'video2' },
      { id: 'popup2', videoId: 'video3' }
    ];

    popups.forEach(popup => {
      const openBtn = document.querySelector(`[onclick*="openPopup${popup.id === 'popup' ? '' : popup.id.slice(-1)}"]`);
      if (openBtn) {
        openBtn.onclick = () => {
          const popupElement = document.getElementById(popup.id);
          if (popupElement) popupElement.classList.add('active');
          document.body.style.overflow = 'hidden';
        };
      }

      const closeBtn = document.querySelector(`[onclick*="closePopup${popup.id === 'popup' ? '' : popup.id.slice(-1)}"]`);
      if (closeBtn) {
        closeBtn.onclick = () => {
          const popupElement = document.getElementById(popup.id);
          if (popupElement) popupElement.classList.remove('active');
          document.body.style.overflow = '';
          
          const video = document.getElementById(popup.videoId);
          if (video) {
            video.pause();
            video.currentTime = 0;
          }
        };
      }
    });
  }

  // 4. Аккордеоны
  function initAccordions() {
    document.querySelectorAll('.accordion').forEach(acc => {
      acc.addEventListener('click', function() {
        // Закрываем все, кроме текущего
        document.querySelectorAll('.accordion').forEach(item => {
          if (item !== this) {
            item.classList.remove('active');
            const panel = item.nextElementSibling;
            if (panel) panel.style.maxHeight = null;
          }
        });

        // Переключаем текущий
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        if (!panel) return;

        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });
  }

  // 5. Плавные скроллы
  function initScrollLinks() {
    document.querySelectorAll('.scroll-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.dataset.target;
        if (!target) return;

        const element = document.getElementById(target);
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
    });
  }

  // 6. Мобильное меню
  function initMobileMenu() {
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
      });
    }
  }

  // 7. Калькуляторы
  function initCalculators() {
    // Форматирование чисел
    function formatCurrency(value) {
      return value.toLocaleString('ru-RU') + ' руб.';
    }

    function formatAmountLabel(value) {
      if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(1)} млн руб.`;
      } else {
        return `${(value / 1000).toFixed(0)} тыс. руб.`;
      }
    }

    // Калькулятор с процентной ставкой
    const amountInput = document.getElementById('amountRange');
    const termInput = document.getElementById('termRange');
    const amountDisplay = document.querySelectorAll('.range-label')[0];
    const termDisplay = document.querySelectorAll('.range-label')[1];
    const monthlyAmount = document.querySelector('.amount');

    if (amountInput && termInput && amountDisplay && termDisplay && monthlyAmount) {
      const interestRate = 9.9;

      function calculatePayment() {
        const S = parseFloat(amountInput.value) || 0;
        const n = parseInt(termInput.value) || 1;
        const r = (interestRate / 100) / 12;

        const monthly = S * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        monthlyAmount.textContent = formatCurrency(Math.round(monthly));
        amountDisplay.textContent = formatAmountLabel(S);
        termDisplay.textContent = `${n} мес.`;
      }

      amountInput.addEventListener('input', calculatePayment);
      termInput.addEventListener('input', calculatePayment);
      calculatePayment();
    }

    // Калькулятор с 0%
    const amount0 = document.getElementById('amountRange0');
    const term0 = document.getElementById('termRange0');
    const amountLabel0 = document.getElementById('amountLabel0');
    const termLabel0 = document.getElementById('termLabel0');
    const payment0 = document.getElementById('payment0');

    if (amount0 && term0 && amountLabel0 && termLabel0 && payment0) {
      function calcZeroPercent() {
        const s = parseFloat(amount0.value) || 0;
        const n = parseInt(term0.value) || 1;
        const result = s / n;

        amountLabel0.textContent = formatAmountLabel(s);
        termLabel0.textContent = `${n} мес.`;
        payment0.textContent = formatCurrency(Math.round(result));
      }

      amount0.addEventListener('input', calcZeroPercent);
      term0.addEventListener('input', calcZeroPercent);
      amount0.value = 300000;
      term0.value = 24;
      calcZeroPercent();
    }
  }

  // 8. Toggle для блока с преимуществами
  window.toggleBenefit = function(button) {
    if (!button) return;
    
    const block = button.closest('.benefit_block');
    if (!block) return;

    const content = block.querySelector('.benefit_hidden_content');
    const mobileBtn = block.querySelector('.benefit_btn_mob');
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    // Закрываем все другие открытые блоки
    if (!isExpanded) {
        document.querySelectorAll('.benefit_block').forEach(otherBlock => {
            if (otherBlock !== block) {
                const otherButton = otherBlock.querySelector('[aria-expanded="true"]');
                if (otherButton) {
                    const otherContent = otherBlock.querySelector('.benefit_hidden_content');
                    const otherMobileBtn = otherBlock.querySelector('.benefit_btn_mob');
                    
                    otherButton.setAttribute('aria-expanded', 'false');
                    if (otherContent) {
                        otherContent.style.height = '0';
                        otherContent.addEventListener('transitionend', () => {
                            otherContent.style.display = 'none';
                            otherContent.style.height = '';
                        }, { once: true });
                    }
                    if (otherMobileBtn) otherMobileBtn.style.display = 'block';
                }
            }
        });
    }
    
    button.setAttribute('aria-expanded', !isExpanded);
    if (content) content.hidden = isExpanded;
    if (mobileBtn) mobileBtn.style.display = isExpanded ? 'block' : 'none';
    
    if (!isExpanded && content) {
        content.style.display = 'block';
        const height = content.scrollHeight;
        content.style.height = '0';
        setTimeout(() => {
            content.style.height = `${height}px`;
        }, 10);
    } else if (content) {
        content.style.height = '0';
        content.addEventListener('transitionend', () => {
            content.style.display = 'none';
            content.style.height = '';
        }, { once: true });
    }
};

// Функция для закрытия всех блоков
function collapseAllBenefits() {
    document.querySelectorAll('.benefit_block').forEach(block => {
        const button = block.querySelector('[aria-expanded="true"]');
        if (button) {
            const content = block.querySelector('.benefit_hidden_content');
            const mobileBtn = block.querySelector('.benefit_btn_mob');
            
            button.setAttribute('aria-expanded', 'false');
            if (content) {
                content.style.height = '0';
                content.addEventListener('transitionend', () => {
                    content.style.display = 'none';
                    content.style.height = '';
                }, { once: true });
            }
            if (mobileBtn) mobileBtn.style.display = 'block';
        }
    });
}

// Обработчики для стрелок
document.addEventListener('click', function(e) {
    if (e.target.closest('.benefit_arrow_prev_mob') || 
        e.target.closest('.benefit_arrow_next_mob')) {
        collapseAllBenefits();
    }
});
// Lazy Load для всех изображений на странице (автономная версия)
document.addEventListener('DOMContentLoaded', function() {
  // 1. Находим все изображения на странице
  const allImages = document.querySelectorAll('img');
  
  // 2. Создаем Intersection Observer если поддерживается
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          loadImage(img);
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '300px 0px', // Начинаем загружать за 300px до появления
      threshold: 0.01
    });

    // 3. Наблюдаем за всеми изображениями
    allImages.forEach(img => {
      // Пропускаем изображения без src или уже загруженные
      if (!img.src || img.complete) return;
      
      // Сохраняем оригинальный src в data-атрибут
      if (!img.dataset.originalSrc) {
        img.dataset.originalSrc = img.src;
        img.src = ''; // Очищаем src
      }
      
      observer.observe(img);
      
      // Добавляем стили для плавного появления
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
    });
  } 
  // 4. Фолбэк для старых браузеров - загружаем все сразу
  else {
    allImages.forEach(img => {
      if (img.dataset.originalSrc) {
        img.src = img.dataset.originalSrc;
      }
    });
  }

  // 5. Функция загрузки изображения
  function loadImage(img) {
    if (img.dataset.originalSrc && !img.src) {
      img.src = img.dataset.originalSrc;
      
      img.onload = function() {
        // Плавное появление
        img.style.opacity = '1';
        
        // Удаляем стили после анимации
        setTimeout(() => {
          img.style.opacity = '';
          img.style.transition = '';
        }, 500);
      };
    }
  }

  // 6. Обработка динамически добавленных изображений
  if (typeof MutationObserver !== 'undefined') {
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === 'IMG') {
            if (!node.src && !node.dataset.originalSrc && node.src) {
              node.dataset.originalSrc = node.src;
              node.src = '';
            }
          } else if (node.querySelectorAll) {
            node.querySelectorAll('img').forEach(img => {
              if (!img.src && !img.dataset.originalSrc && img.src) {
                img.dataset.originalSrc = img.src;
                img.src = '';
              }
            });
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
});
});
document.addEventListener('DOMContentLoaded', function() {
  // Функция для применения маски телефона
  function applyPhoneMask(input) {
    input.addEventListener('input', function(e) {
      // Сохраняем значение до форматирования
      const previousValue = this.value;
      const cursorPosition = this.selectionStart;
      
      // Удаляем все нецифровые символы
      let numbers = this.value.replace(/\D/g, '');
      
      // Форматируем номер
      let formattedValue = '';
      if (numbers.length > 0) {
        // Всегда начинаем с +7
        numbers = '7' + numbers.substring(numbers.startsWith('7') ? 1 : 0);
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
      
      // Устанавливаем отформатированное значение
      this.value = formattedValue;
      
      // Всегда перемещаем курсор в конец
      this.setSelectionRange(formattedValue.length, formattedValue.length);
    });
    
    // Обработчик для удаления символов
    input.addEventListener('keydown', function(e) {
      // Если нажата Backspace или Delete и курсор в начале
      if ((e.key === 'Backspace' || e.key === 'Delete') && this.selectionStart <= 3) {
        e.preventDefault();
      }
    });
  }

  // Применяем маски ко всем полям телефонов
  const phoneInputs = document.querySelectorAll('input[type="tel"], input[placeholder*="телефона"]');
  phoneInputs.forEach(function(input) {
    if (input.type !== 'tel') input.type = 'tel';
    applyPhoneMask(input);
    
    // Инициализируем поле с +7
    input.value = '+7';
  });

  // Остальной код валидации форм...
  const forms = document.querySelectorAll('form');
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Проверка чекбокса
      const checkbox = form.querySelector('input[type="checkbox"]');
      if (checkbox && !checkbox.checked) {
        alert('Пожалуйста, дайте согласие на обработку персональных данных');
        checkbox.focus();
        return false;
      }
      
      // Проверка валидности
      let isValid = true;
      form.querySelectorAll('input[required]').forEach(function(input) {
        if (!input.checkValidity()) {
          isValid = false;
          input.classList.add('invalid');
        }
      });
      
      if (isValid) {
        alert('Форма успешно отправлена!');
        form.reset();
        // Возвращаем +7 в поле телефона после сброса
        form.querySelector('input[type="tel"]').value = '+7';
      }
    });
  });
});

// Стили для невалидных полей
const style = document.createElement('style');
style.textContent = `
  input.invalid {
    border-color: red !important;
    box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
  }
`;
document.head.appendChild(style);
