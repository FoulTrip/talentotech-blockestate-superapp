export default {
    load: async () => {
        const response = await fetch('/views/contact.html');
        return await response.text();
    },

    afterRender: () => {
        const btn = document.getElementById('contact-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                alert('Funcionalidad de contacto - Puedes agregar tu lógica aquí');
            });
        }
    }
};