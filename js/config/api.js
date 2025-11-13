// Configuración de la API

export const API_CONFIG = {
  // URL base del backend
  BASE_URL: 'https://blockestate-e0zo.onrender.com',

  // Endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register'
    }
  },

  // Configuración de headers por defecto
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json'
  },

  // Timeout para peticiones (en ms)
  TIMEOUT: 30000
};

// Helper para construir URLs completas
export const buildUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper para crear headers con autenticación
export const getAuthHeaders = (token) => {
  return {
    ...API_CONFIG.DEFAULT_HEADERS,
    'Authorization': `Bearer ${token}`
  };
};
