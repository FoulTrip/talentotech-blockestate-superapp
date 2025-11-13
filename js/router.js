import homePage from './pages/home.js';
import aboutPage from './pages/about.js';
import servicesPage from './pages/services.js';
import contactPage from './pages/contact.js';
import loginPage from './pages/login.js';
import registerPage from './pages/register.js';
import perfilPage from './pages/perfil.js';
import notFoundPage from './pages/404.js';
import { requireAuth } from './utils/authGuard.js';

const routes = {
    '/': homePage,
    '/about': aboutPage,
    '/services': servicesPage,
    '/contact': contactPage,
    '/login': loginPage,
    '/register': registerPage,
    '/perfil': requireAuth(perfilPage)
};

export function navigateTo(url) {
    history.pushState(null, null, url);
    router();
}

export default async function router() {
    const path = window.location.pathname;
    const page = routes[path] || notFoundPage;

    const app = document.getElementById('app');

    try {
        // Mostrar loading
        app.innerHTML = '<div class="loading">Cargando...</div>';

        // Cargar el HTML
        const html = await page.load();
        app.innerHTML = html;

        // Ejecutar lógica post-render
        if (page.afterRender) {
            page.afterRender();
        }

        // Actualizar navegación
        updateActiveNav(path);
    } catch (error) {
        console.error('Error cargando página:', error);
        app.innerHTML = '<div class="error-page"><h1>Error al cargar la página</h1></div>';
    }
}

function updateActiveNav(path) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        }
    });
}
