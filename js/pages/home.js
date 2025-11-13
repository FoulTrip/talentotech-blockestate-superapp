export default {
  load: async () => {
    const response = await fetch('/views/home.html');
    return await response.text();
  },
  
  afterRender: () => {
    console.log('Página Home cargada');
  }
};