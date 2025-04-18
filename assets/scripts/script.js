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
