// Component Loader - Lädt Navigation und Footer dynamisch
async function loadComponents() {
    // Lade Navigation
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        try {
            const response = await fetch('/components/nav.html');
            const html = await response.text();
            navPlaceholder.innerHTML = html;
        } catch (error) {
            console.error('Navigation konnte nicht geladen werden:', error);
        }
    }
    
    // Lade Footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        try {
            const response = await fetch('/components/footer.html');
            const html = await response.text();
            footerPlaceholder.innerHTML = html;
        } catch (error) {
            console.error('Footer konnte nicht geladen werden:', error);
        }
    }
}

// Lade Components beim Seitenstart
document.addEventListener('DOMContentLoaded', loadComponents);
