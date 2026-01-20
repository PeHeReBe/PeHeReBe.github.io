// Component Loader - Lädt Navigation und Footer dynamisch
async function loadComponents() {
    const navPlaceholder = document.getElementById('nav-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    const tasks = [];

    // Lade Navigation
    if (navPlaceholder) {
        tasks.push(
            fetch('/components/nav.html')
                .then((response) => response.text())
                .then((html) => {
                    navPlaceholder.innerHTML = html;
                })
                .catch((error) => {
                    console.error('Navigation konnte nicht geladen werden:', error);
                })
        );
    }

    // Lade Footer
    if (footerPlaceholder) {
        tasks.push(
            fetch('/components/footer.html')
                .then((response) => response.text())
                .then((html) => {
                    footerPlaceholder.innerHTML = html;
                })
                .catch((error) => {
                    console.error('Footer konnte nicht geladen werden:', error);
                })
        );
    }

    await Promise.all(tasks);

    // Signal: Komponenten sind im DOM
    document.dispatchEvent(new CustomEvent('components:loaded'));
}

// Lade Components beim Seitenstart
document.addEventListener('DOMContentLoaded', loadComponents);
