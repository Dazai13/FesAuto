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


















const questions = [
    {
      text: "Автомобиль в каком кузове вы хотите?",
      options: [
        { value: "Седан", label: "Седан", img: "sedan.png" },
        { value: "Хэтчбек", label: "Хэтчбек", img: "hatchback.png" },
        { value: "Кроссовер", label: "Кроссовер", img: "crossover.png" },
        { value: "Минивэн", label: "Минивэн / Микроавтобус", img: "minivan.png" },
        { value: "Внедорожник", label: "Внедорожник / Пикап", img: "suv.png" }
      ]
    },
    {
      text: "Какой бюджет вы планируете?",
      options: [
        { value: "до 1 млн", label: "До 1 млн", img: "budget1.png" },
        { value: "1-1.5 млн", label: "1 - 1.5 млн", img: "budget2.png" },
        { value: "1.5-2 млн", label: "1.5 - 2 млн", img: "budget3.png" },
        { value: "2-3 млн", label: "2 - 3 млн", img: "budget4.png" }
      ]
    },
    {
      text: "Какой тип топлива предпочитаете?",
      options: [
        { value: "Бензин", label: "Бензин", img: "fuel1.png" },
        { value: "Дизель", label: "Дизель", img: "fuel2.png" },
        { value: "Гибрид", label: "Гибрид", img: "fuel3.png" },
        { value: "Электро", label: "Электро", img: "fuel4.png" }
      ]
    },
    {
      text: "Планируете ли обмен по Trade-in?",
      options: [
        { value: "Да", label: "Да", img: "yes.png" },
        { value: "Нет", label: "Нет", img: "no.png" }
      ]
    }
  ];
  
  let currentStep = 0;
  const questionEl = document.querySelector('.quiz-question');
  const optionsEl = document.querySelector('.quiz-options');
  const progressEl = document.querySelector('.progress');
  const nextBtn = document.getElementById('nextBtn');
  const warning = document.getElementById('warning');
  
  function renderQuestion(step) {
    const question = questions[step];
  
    questionEl.textContent = question.text;
  
    optionsEl.innerHTML = '';
    question.options.forEach(opt => {
      const label = document.createElement('label');
      label.className = 'option';
  
      label.innerHTML = `
        <input type="radio" name="question${step}" value="${opt.value}">
        <img src="${opt.img}" alt="${opt.label}">
        <span>${opt.label}</span>
      `;
  
      optionsEl.appendChild(label);
    });
  
    // слушатели на каждый input
    const radios = optionsEl.querySelectorAll('input');
    radios.forEach(r => {
      r.addEventListener('change', () => {
        nextBtn.disabled = false;
        warning.style.display = 'none';
      });
    });
  
    nextBtn.disabled = true;
    progressEl.style.width = `${((step + 1) / questions.length) * 100}%`;
  }
  
  nextBtn.addEventListener('click', () => {
    const selected = optionsEl.querySelector('input:checked');
    if (!selected) {
      warning.style.display = 'block';
      return;
    }
  
    // Сохраняем ответ, если нужно
    console.log(`Ответ на вопрос ${currentStep + 1}: ${selected.value}`);
  
    currentStep++;
  
    if (currentStep < questions.length) {
      renderQuestion(currentStep);
    } else {
      // Конец теста
      questionEl.textContent = 'Спасибо за прохождение теста!';
      optionsEl.innerHTML = '<p style="font-size: 16px;">Мы свяжемся с вами для подбора автомобиля.</p>';
      nextBtn.style.display = 'none';
      document.getElementById('prevBtn').style.display = 'none';
      progressEl.style.width = '100%';
    }
  });
  
  // начальная загрузка
  renderQuestion(currentStep);