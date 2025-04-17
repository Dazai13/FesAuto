const toggleBtn = document.getElementById('menu-toggle');
const menu = document.querySelector('.mobile-menu');
const icon = document.getElementById('menu-icon');
const burgerIcon = 'assets/images/burger.svg';
const closeIcon = 'assets/images/close.svg';
toggleBtn.addEventListener('click', () => {
  const isOpen = !menu.classList.contains('hidden');
  if (isOpen) {
    menu.classList.add('hidden');
    icon.src = burgerIcon;
  } else {
    menu.classList.remove('hidden');
    icon.src = closeIcon;
  }
});