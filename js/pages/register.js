import authService from '../services/auth.js';
import { navigateTo } from '../router.js';

export default {
  load: async () => {
    return `
      <div class="auth-container page">
        <div class="auth-card">
          <h1>Crear cuenta</h1>
          <p class="subtitle">Únete a BlockEstate hoy</p>

          <form id="register-form">
            <div id="error-message" class="error-message" style="display: none;"></div>

            <div class="form-group">
              <label for="name">Nombre completo</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Juan Pérez"
                autocomplete="name"
              >
            </div>

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
              <label for="age">Edad</label>
              <input
                type="number"
                id="age"
                name="age"
                required
                placeholder="30"
                min="18"
                max="120"
              >
            </div>

            <div class="form-group">
              <label for="city">Ciudad</label>
              <input
                type="text"
                id="city"
                name="city"
                required
                placeholder="Bogotá"
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
                autocomplete="new-password"
                minlength="8"
              >
            </div>

            <div class="form-group">
              <label for="confirm-password">Confirmar contraseña</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                required
                placeholder="••••••••"
                autocomplete="new-password"
                minlength="8"
              >
            </div>

            <button type="submit" class="btn-submit" id="submit-btn">
              Crear cuenta
            </button>
          </form>

          <div class="auth-switch">
            ¿Ya tienes una cuenta? <a href="/login" data-link>Inicia sesión aquí</a>
          </div>
        </div>
      </div>
    `;
  },

  afterRender: () => {
    const form = document.getElementById('register-form');
    const submitBtn = document.getElementById('submit-btn');
    const errorMessage = document.getElementById('error-message');

    // Función para mostrar errores
    const showError = (message) => {
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';
      errorMessage.style.backgroundColor = '#f8d7da';
      errorMessage.style.color = '#721c24';
      errorMessage.style.borderColor = '#f5c6cb';
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
      const password = formData.get('password');
      const confirmPassword = formData.get('confirm-password');

      // Validar que las contraseñas coincidan
      if (password !== confirmPassword) {
        showError('Las contraseñas no coinciden');
        return;
      }

      // Validar longitud mínima de contraseña
      if (password.length < 8) {
        showError('La contraseña debe tener al menos 8 caracteres');
        return;
      }

      // Validar edad
      const age = parseInt(formData.get('age'));
      if (age < 18) {
        showError('Debes ser mayor de 18 años para registrarte');
        return;
      }

      const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: password,
        age: age,
        city: formData.get('city')
      };

      // Deshabilitar botón durante la petición
      submitBtn.disabled = true;
      submitBtn.textContent = 'Creando cuenta...';

      try {
        // Llamar al servicio de autenticación
        const result = await authService.register(userData);

        if (result.success) {
          showSuccess('¡Cuenta creada exitosamente! Redirigiendo...');

          // Redirigir al usuario después de 1 segundo
          setTimeout(() => {
            navigateTo('/');
          }, 1000);
        } else {
          showError(result.message);
          submitBtn.disabled = false;
          submitBtn.textContent = 'Crear cuenta';
        }
      } catch (error) {
        showError('Error al conectar con el servidor');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Crear cuenta';
      }
    });
  }
};
