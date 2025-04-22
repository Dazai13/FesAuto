const steps = document.querySelectorAll('.quiz-step');
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

  progress.style.width = `${((index + 1) / steps.length) * 100}%`;
  questionCount.textContent = `${index + 1} вопрос из ${steps.length}`;

  prevBtn.disabled = index === 0;

  const inputs = steps[index].querySelectorAll('input');
  const isAnswered = Array.from(inputs).some(input => input.checked);
  nextBtn.disabled = !isAnswered;

  nextBtn.style.display = index === steps.length - 1 ? 'none' : 'inline-block';
  quiznavtext.style.display = index === steps.length - 1 ? 'none' : 'flex'

  inputs.forEach(input => {
    input.addEventListener('change', () => {
      nextBtn.disabled = false;
      warning.style.display = 'none';
    });
  });
}

nextBtn.addEventListener('click', () => {
  const selected = steps[currentStep].querySelector('input:checked');
  if (!selected) {
    warning.style.display = 'block';
    return;
  }

  console.log(`Ответ на ${currentStep + 1}: ${selected.value}`);


  currentStep++;
  if (currentStep < steps.length) {
    showStep(currentStep);
  } else {
    document.querySelector('.quiz-right').innerHTML = `
      <h2>Спасибо за прохождение теста!</h2>
      <p>Мы свяжемся с вами для подбора автомобиля.</p>
    `;
  }
});

prevBtn.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});

showStep(currentStep);
$(document).ready(function(){
  $('.car_list_slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '40px',
    infinite: true,
    arrows: true,
    prevArrow: $('.car_list_slider_button_prev'),
    nextArrow: $('.car_list_slider_button_next'),
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        }
      }
    ]
  });
});

function openPopup() {
  const popup = document.getElementById('popup');
  popup.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePopup() {
  const popup = document.getElementById('popup');
  popup.classList.remove('active');
  document.body.style.overflow = '';

  const video = document.getElementById('video1');
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
}

function openPopup1() {
  const popup = document.getElementById('popup1');
  popup.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePopup1() {
  const popup = document.getElementById('popup1');
  popup.classList.remove('active');
  document.body.style.overflow = '';

  const video = document.getElementById('video2');
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
}

function openPopup2() {
  const popup = document.getElementById('popup2');
  popup.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePopup2() {
  const popup = document.getElementById('popup2');
  popup.classList.remove('active');
  document.body.style.overflow = '';

  const video = document.getElementById('video3');
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
}

$(document).ready(function () {
  const isMobile = window.innerWidth <= 1199;

  if (isMobile && !$('.video_cases').hasClass('slick-initialized')) {
    $('.video_cases').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      centerMode: true,
      dots: true,
      infinite:false,
    });
  }
});





$(document).ready(function () {
  if (!$('.process_slides_mob').hasClass('slick-initialized')) {
    $('.process_slides_mob').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      infinite: true,
    });
  }
});



$(document).ready(function(){
  $('.benefit_slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    loop: true,
    prevArrow: $('.benefit_arrow_prev'),
    nextArrow: $('.benefit_arrow_next')
  });
});







document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll(".scroll-link").forEach((t=>{t.addEventListener("click",(function(t){t.preventDefault();const e=this.dataset.target,n=document.getElementById(e);if(n){n.scrollIntoView({behavior:"smooth",block:"start"}),history.pushState?history.pushState(null,null,window.location.pathname):window.location.hash="";const t=document.querySelector(".mobile-menu");t&&t.classList.contains("active")&&t.classList.remove("active")}}))}));const t=document.getElementById("menu-toggle"),e=document.querySelector(".mobile-menu");t&&e&&t.addEventListener("click",(function(){e.classList.toggle("active")}))}));

var acc = document.getElementsByClassName("accordion");
var i;

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    // Закрываем все, кроме текущего
    for (let j = 0; j < acc.length; j++) {
      if (acc[j] !== this) {
        acc[j].classList.remove("active");
        acc[j].nextElementSibling.style.maxHeight = null;
      }
    }

    // Переключаем текущий
    this.classList.toggle("active");
    var panel = this.nextElementSibling;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}














  const amountInput = document.getElementById('amountRange');
  const termInput = document.getElementById('termRange');
  const amountDisplay = document.querySelectorAll('.range-label')[0];
  const termDisplay = document.querySelectorAll('.range-label')[1];
  const monthlyAmount = document.querySelector('.amount');

  const interestRate = 9.9; // ставка по умолчанию

  function formatCurrency(value) {
    return value.toLocaleString('ru-RU') + ' руб.';
  }

  function calculatePayment() {
    const S = parseFloat(amountInput.value);        // сумма кредита
    const n = parseInt(termInput.value);            // срок в месяцах
    const r = (interestRate / 100) / 12;            // месячная процентная ставка

    const monthly =
      S * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    monthlyAmount.textContent = formatCurrency(Math.round(monthly));
    amountDisplay.textContent = `${(S / 1000).toFixed(0)} тыс. руб.`;
    termDisplay.textContent = `${n} мес.`;
  }

  amountInput.addEventListener('input', calculatePayment);
  termInput.addEventListener('input', calculatePayment);

  // Первичный расчёт при загрузке страницы
  calculatePayment();

  const amount0 = document.getElementById('amountRange0');
  const term0 = document.getElementById('termRange0');
  const amountLabel0 = document.getElementById('amountLabel0');
  const termLabel0 = document.getElementById('termLabel0');
  const payment0 = document.getElementById('payment0');

  function formatCurrency(val) {
    return val.toLocaleString('ru-RU') + ' руб.';
  }

  function calcZeroPercent() {
    const s = parseFloat(amount0.value);
    const n = parseInt(term0.value);
    const result = s / n;

    amountLabel0.textContent = `${(s / 1000).toFixed(0)} тыс. руб.`;
    termLabel0.textContent = `${n} мес.`;
    payment0.textContent = formatCurrency(Math.round(result));
  }

  amount0.addEventListener('input', calcZeroPercent);
  term0.addEventListener('input', calcZeroPercent);

  // стартовое значение
  amount0.value = 300000;
  term0.value = 24;
  calcZeroPercent();






  






  