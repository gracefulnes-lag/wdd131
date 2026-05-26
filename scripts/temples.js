document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('current-year');
    const modifiedElement = document.getElementById('lastModified');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    if (modifiedElement) {
        modifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }

    const menuToggle = document.getElementById('menuToggle');
    const siteNav = document.getElementById('site-nav');

    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', String(!isOpen));
            siteNav.classList.toggle('open');
            menuToggle.textContent = isOpen ? '☰' : '✕';
        });
    }
});
