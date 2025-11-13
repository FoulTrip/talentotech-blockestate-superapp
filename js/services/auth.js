// Servicio de autenticación
import { storage } from '../utils/storage.js';
import { API_CONFIG, buildUrl } from '../config/api.js';

const API_URL = API_CONFIG.BASE_URL;

class AuthService {
  /**
   * Registra un nuevo usuario
   * @param {Object} userData - Datos del usuario
   * @param {string} userData.name - Nombre completo
   * @param {string} userData.email - Correo electrónico
   * @param {string} userData.password - Contraseña
   * @param {number} userData.age - Edad
   * @param {string} userData.city - Ciudad
   * @returns {Promise<Object>} Token y datos del usuario
   */
  async register(userData) {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar usuario');
      }

      // Guardar token en localStorage
      if (data.token) {
        storage.setToken(data.token);
      }

      return {
        success: true,
        token: data.token,
        message: 'Usuario registrado exitosamente'
      };
    } catch (error) {
      console.error('Error en registro:', error);
      return {
        success: false,
        message: error.message || 'Error al registrar usuario'
      };
    }
  }

  /**
   * Inicia sesión de un usuario
   * @param {Object} credentials - Credenciales del usuario
   * @param {string} credentials.email - Correo electrónico
   * @param {string} credentials.password - Contraseña
   * @returns {Promise<Object>} Token y datos del usuario
   */
  async login(credentials) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Credenciales incorrectas');
        }
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      // Guardar token en localStorage
      if (data.token) {
        storage.setToken(data.token);
      }

      return {
        success: true,
        token: data.token,
        message: 'Sesión iniciada exitosamente'
      };
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        message: error.message || 'Error al iniciar sesión'
      };
    }
  }

  /**
   * Cierra la sesión del usuario
   */
  logout() {
    storage.clearAll();
    window.location.href = '/';
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns {boolean}
   */
  isAuthenticated() {
    return storage.isAuthenticated();
  }

  /**
   * Obtiene el token del usuario
   * @returns {string|null}
   */
  getToken() {
    return storage.getToken();
  }

  /**
   * Decodifica el token JWT (básico, sin validación)
   * @returns {Object|null}
   */
  decodeToken() {
    const token = this.getToken();
    if (!token) return null;

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decodificando token:', error);
      return null;
    }
  }

  /**
   * Obtiene los datos del usuario desde el token
   * @returns {Object|null}
   */
  getUserData() {
    const decoded = this.decodeToken();
    return decoded ? {
      userId: decoded.userId,
      email: decoded.email
    } : null;
  }
}

export default new AuthService();
