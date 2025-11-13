export default {
    load: async () => {
        const response = await fetch('/views/about.html');
        return await response.text();
    },

    afterRender: () => {
        console.log('Página About cargada');
    }
};