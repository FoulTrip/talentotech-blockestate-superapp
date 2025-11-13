import router from './router.js';
import { navigateTo } from './router.js';
import authService from './services/auth.js';

// Función para actualizar el botón de cuenta según autenticación
function updateAccountButton() {
  const btnAccount = document.querySelector('.btn-account');

  if (authService.isAuthenticated()) {
    const userData = authService.getUserData();
    if (userData && userData.email) {
      // Mostrar primer parte del email (antes del @)
      const displayName = userData.email.split('@')[0];
      btnAccount.textContent = displayName;

      // Cambiar href a /perfil
      btnAccount.href = '/perfil';

      // Agregar indicador visual de usuario autenticado
      btnAccount.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  } else {
    btnAccount.textContent = 'Tu cuenta';
    btnAccount.href = '/login';
    btnAccount.style.background = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Actualizar botón de cuenta al cargar
  updateAccountButton();

  // Manejar clicks en links
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);

      // Actualizar botón después de navegar
      setTimeout(updateAccountButton, 100);

      // Cerrar menú móvil al hacer click en un link
      const navLinks = document.getElementById('nav-links');
      const navToggle = document.getElementById('nav-toggle');
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
      }
    }
  });

  // Manejar botones atrás/adelante
  window.addEventListener('popstate', router);

  // Toggle menú móvil
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  // Cerrar menú móvil al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });

  // Cerrar menú móvil al cambiar tamaño de ventana
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });

  // Cargar página inicial
  router();
});