import authService from '../services/auth.js';
import { navigateTo } from '../router.js';

export default {
  load: async () => {
    const userData = authService.getUserData();

    return `
      <div class="page">
        <div class="profile-container">
          <div class="profile-header">
            <div class="avatar-large">${userData.email.charAt(0).toUpperCase()}</div>
            <h1>Mi Perfil</h1>
            <p class="subtitle">Información de tu cuenta en BlockEstate</p>
          </div>

          <div class="profile-content">
            <div class="card">
              <h3>Información de la cuenta</h3>
              <div class="info-grid">
                <div class="info-item">
                  <label>Email</label>
                  <p>${userData.email}</p>
                </div>
                <div class="info-item">
                  <label>ID de Usuario</label>
                  <p>${userData.userId}</p>
                </div>
              </div>
            </div>

            <div class="card">
              <h3>Acciones</h3>
              <div class="actions-grid">
                <button id="logout-btn" class="btn btn-secondary">
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  afterRender: () => {
    const logoutBtn = document.getElementById('logout-btn');

    logoutBtn.addEventListener('click', () => {
      if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
        authService.logout();
      }
    });
  }
};
