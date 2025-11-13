export default {
    load: async () => {
        const response = await fetch('/views/services.html');
        return await response.text();
    },

    afterRender: () => {
        console.log('Página Services cargada');
    }
};