export default {
    load: async () => {
        const response = await fetch('/views/404.html');
        return await response.text();
    },

    afterRender: () => {
        console.log('Página 404 mostrada');
    }
};