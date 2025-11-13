// Guard de autenticación para proteger rutas
import authService from '../services/auth.js';
import { navigateTo } from '../router.js';

/**
 * Middleware para proteger rutas que requieren autenticación
 * @param {Function} pageLoader - Función que carga la página
 * @returns {Function} Página protegida
 */
export const requireAuth = (pageLoader) => {
  return {
    load: async () => {
      if (!authService.isAuthenticated()) {
        // Redirigir a login si no está autenticado
        setTimeout(() => navigateTo('/login'), 0);
        return '<div class="loading">Redirigiendo a login...</div>';
      }
      return pageLoader.load();
    },
    afterRender: () => {
      if (authService.isAuthenticated() && pageLoader.afterRender) {
        pageLoader.afterRender();
      }
    }
  };
};

/**
 * Middleware para redirigir usuarios autenticados (útil para login/register)
 * @param {Function} pageLoader - Función que carga la página
 * @returns {Function} Página que redirige si ya está autenticado
 */
export const guestOnly = (pageLoader) => {
  return {
    load: async () => {
      if (authService.isAuthenticated()) {
        // Redirigir a home si ya está autenticado
        navigateTo('/');
        return '<div class="loading">Ya has iniciado sesión...</div>';
      }
      return pageLoader.load();
    },
    afterRender: pageLoader.afterRender
  };
};

/**
 * Obtiene información del usuario autenticado
 * @returns {Object|null} Datos del usuario o null
 */
export const getCurrentUser = () => {
  if (!authService.isAuthenticated()) {
    return null;
  }
  return authService.getUserData();
};
