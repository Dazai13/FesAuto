$(document).ready(function(){
  $('.car_list_slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '40px',
    arrows: true,
    loop: true,
    infinite: true,
    prevArrow: $('.car_list_slider_button_prev'),
    nextArrow: $('.car_list_slider_button_next'),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
});

$(document).ready(function(){
  $('.benefit_slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    loop: true,
    infinite: true,
    prevArrow: $('.car_list_slider_button_prev'),
    nextArrow: $('.car_list_slider_button_next'),
  });
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



















const steps = document.querySelectorAll('.quiz-step');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const warning = document.getElementById('warning');
const progress = document.querySelector('.progress');
const questionCount = document.getElementById('questionCount');

let currentStep = 0;

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === index);
  });

  progress.style.width = `${((index + 1) / steps.length) * 100}%`;
  questionCount.textContent = `${index + 1} вопрос из ${steps.length}`;

  prevBtn.disabled = index === 0;
  warning.style.display = 'none';

  const inputs = steps[index].querySelectorAll('input');
  const isAnswered = Array.from(inputs).some(input => input.checked);
  nextBtn.disabled = !isAnswered;

  // 👇 Показываем или скрываем кнопку "Далее" в зависимости от шага
  nextBtn.style.display = index === steps.length - 1 ? 'none' : 'inline-block';

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





  