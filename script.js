// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (!hamburger || !navLinks) return;
    if (hamburger.dataset.bound === '1') return;
    hamburger.dataset.bound = '1';

    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

    const closeAllDropdowns = () => {
        navLinks.querySelectorAll('.dropdown.open').forEach((d) => d.classList.remove('open'));
    };

    const closeMenu = () => {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
        closeAllDropdowns();
    };

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        const willOpen = !hamburger.classList.contains('active');
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        if (!willOpen) closeAllDropdowns();
    });

    // Dropdowns on mobile: toggle on click, only one open
    navLinks.querySelectorAll('.dropdown-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            if (!isMobile()) return;
            e.preventDefault();

            const dropdown = btn.closest('.dropdown');
            if (!dropdown) return;

            const isOpen = dropdown.classList.contains('open');
            closeAllDropdowns();
            if (!isOpen) dropdown.classList.add('open');
        });
    });

    // Close menu when clicking a normal link
    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (isMobile()) closeMenu();
        });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!isMobile()) return;
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            closeMenu();
        }
    });

    // Reset state when resizing to desktop
    window.addEventListener('resize', () => {
        if (!isMobile()) closeMenu();
    });
}

document.addEventListener('DOMContentLoaded', initMobileNavigation);
document.addEventListener('components:loaded', initMobileNavigation);

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.about-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.2}s`;
    observer.observe(card);
});

// Dropdown menu for mobile
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');

if (dropdownBtn && window.innerWidth <= 768) {
    dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownContent.style.opacity = dropdownContent.style.opacity === '1' ? '0' : '1';
        dropdownContent.style.visibility = dropdownContent.style.visibility === 'visible' ? 'hidden' : 'visible';
        dropdownContent.style.transform = dropdownContent.style.transform === 'translateY(0px)' ? 'translateY(-10px)' : 'translateY(0px)';
    });
    
    document.addEventListener('click', () => {
        dropdownContent.style.opacity = '0';
        dropdownContent.style.visibility = 'hidden';
        dropdownContent.style.transform = 'translateY(-10px)';
    });
}

// Ambient background light that follows cursor
const ambientLight = document.createElement('div');
ambientLight.style.position = 'fixed';
ambientLight.style.width = '600px';
ambientLight.style.height = '600px';
ambientLight.style.borderRadius = '50%';
ambientLight.style.background = 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)';
ambientLight.style.pointerEvents = 'none';
ambientLight.style.zIndex = '1';
ambientLight.style.transform = 'translate(-50%, -50%)';
ambientLight.style.transition = 'all 0.3s ease';
ambientLight.style.filter = 'blur(60px)';
document.body.appendChild(ambientLight);

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        ambientLight.style.left = e.clientX + 'px';
        ambientLight.style.top = e.clientY + 'px';
    }
});

// Add dynamic text animation for hero title
const heroTitle = document.querySelector('.title-main');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.animation = `fadeInChar 0.5s ease-out ${index * 0.1}s both`;
        heroTitle.appendChild(span);
    });
}

// Add CSS for character animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInChar {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Console message for fun
console.log('%c🎮 Welcome to AFKingdom.de! 🎮', 'color: #7c3aed; font-size: 20px; font-weight: bold;');
console.log('%cLooking for easter eggs? Keep exploring! 🔍', 'color: #a78bfa; font-size: 14px;');

// Discord Server Status
const DISCORD_SERVER_ID = '1175455629537591357'; // Ersetze dies mit deiner tatsächlichen Server-ID

// Verwende Discord Widget API (CORS-freundlich)
function updateDiscordStats() {
    // Discord Widget API - erlaubt CORS!
    const widgetUrl = `https://discord.com/api/guilds/${DISCORD_SERVER_ID}/widget.json`;
    
    fetch(widgetUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: Widget muss auf dem Discord-Server aktiviert sein`);
            }
            return response.json();
        })
        .then(data => {
            console.log('✅ Discord Widget Daten geladen:', data);
            
            const membersElement = document.getElementById('discord-members');
            const onlineElement = document.getElementById('discord-online');
            
            // Update Online Count - Anzahl der online User im Widget
            if (onlineElement && data.presence_count !== undefined) {
                const onlineCount = data.presence_count;
                onlineElement.textContent = onlineCount;
                onlineElement.style.animation = 'pulse 2s ease-in-out infinite';
                console.log(`🟢 Online User: ${onlineCount}`);
            }
            
            // Für Member Count gibt die Widget API leider nicht die Gesamtzahl zurück
            // Daher zeigen wir nur Online-User oder einen festen Wert
            if (membersElement) {
                // Zeige "Viele Mitglieder" oder einen festen geschätzten Wert
                membersElement.textContent = '100+';
                membersElement.style.animation = 'pulse 2s ease-in-out infinite';
                console.log(`📊 Mitglieder: Anzeige mit Fallback-Wert`);
            }
            
            // Server Name loggen
            if (data.name) {
                console.log(`🎮 Server: ${data.name}`);
            }
        })
        .catch(error => {
            console.warn('⚠️ Discord Widget API Fehler:', error.message);
            console.warn('💡 Tipp: Aktiviere das Server Widget in Discord Server-Einstellungen → Widget');
            
            // Fallback Werte
            const membersElement = document.getElementById('discord-members');
            const onlineElement = document.getElementById('discord-online');
            if (membersElement) membersElement.textContent = '100+';
            if (onlineElement) onlineElement.textContent = '10+';
        });
}

// Update Discord stats on page load
if (document.getElementById('discord-members')) {
    updateDiscordStats();
    // Update alle 60 Sekunden
    setInterval(updateDiscordStats, 60000);
}
