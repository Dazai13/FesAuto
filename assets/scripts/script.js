document.addEventListener("DOMContentLoaded", function () {
    // Скролл по якорной ссылке
    document.querySelectorAll('.scroll-link').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.dataset.target;
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Убираем якорь из URL
          if (history.pushState) {
            history.pushState(null, null, window.location.pathname);
          } else {
            window.location.hash = '';
          }

          // Закрываем мобильное меню
          const mobileMenu = document.querySelector('.mobile-menu');
          if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
          }
        }
      });
    });

    // Открытие/закрытие меню по кнопке
    const toggleBtn = document.getElementById("menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (toggleBtn && mobileMenu) {
      toggleBtn.addEventListener("click", function () {
        mobileMenu.classList.toggle("active");
      });
    }
  });