import authService from '../services/auth.js';
import { navigateTo } from '../router.js';

export default {
  load: async () => {
    return `
      <div class="auth-container page">
        <div class="auth-card">
          <h1>Iniciar sesión</h1>
          <p class="subtitle">Ingresa a tu cuenta de BlockEstate</p>

          <form id="login-form">
            <div id="error-message" class="error-message" style="display: none;"></div>

            <div class="form-group">
              <label for="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="tu@email.com"
                autocomplete="email"
              >
            </div>

            <div class="form-group">
              <label for="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="••••••••"
                autocomplete="current-password"
              >
            </div>

            <button type="submit" class="btn-submit" id="submit-btn">
              Iniciar sesión
            </button>
          </form>

          <div class="auth-switch">
            ¿No tienes una cuenta? <a href="/register" data-link>Regístrate aquí</a>
          </div>
        </div>
      </div>
    `;
  },

  afterRender: () => {
    const form = document.getElementById('login-form');
    const submitBtn = document.getElementById('submit-btn');
    const errorMessage = document.getElementById('error-message');

    // Función para mostrar errores
    const showError = (message) => {
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';
      setTimeout(() => {
        errorMessage.style.display = 'none';
      }, 5000);
    };

    // Función para mostrar mensaje de éxito
    const showSuccess = (message) => {
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';
      errorMessage.style.backgroundColor = '#d4edda';
      errorMessage.style.color = '#155724';
      errorMessage.style.borderColor = '#c3e6cb';
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const credentials = {
        email: formData.get('email'),
        password: formData.get('password')
      };

      // Deshabilitar botón durante la petición
      submitBtn.disabled = true;
      submitBtn.textContent = 'Iniciando sesión...';

      try {
        // Llamar al servicio de autenticación
        const result = await authService.login(credentials);

        if (result.success) {
          showSuccess('¡Login exitoso! Redirigiendo...');

          // Redirigir al usuario después de 1 segundo
          setTimeout(() => {
            navigateTo('/');
          }, 1000);
        } else {
          showError(result.message);
          submitBtn.disabled = false;
          submitBtn.textContent = 'Iniciar sesión';
        }
      } catch (error) {
        showError('Error al conectar con el servidor');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Iniciar sesión';
      }
    });
  }
};
