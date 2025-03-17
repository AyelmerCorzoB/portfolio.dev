function changeLanguage(event) {
    const lang = event.target.value;
    localStorage.setItem('lang', lang);
    window.location.reload(); // Recarga la página con el nuevo idioma
  }
  
  // Establecer el idioma seleccionado al cargar la página
  document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('lang') || 'es';
    const select = document.querySelector('select');
    if (select) {
      select.value = lang;
    }
  });