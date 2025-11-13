// Utilidades para manejo de almacenamiento local

const STORAGE_KEYS = {
  TOKEN: 'blockestate_token',
  USER: 'blockestate_user'
};

export const storage = {
  // Token management
  setToken(token) {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  },

  getToken() {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  removeToken() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  // User management
  setUser(user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  getUser() {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  removeUser() {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Clear all
  clearAll() {
    this.removeToken();
    this.removeUser();
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  }
};
