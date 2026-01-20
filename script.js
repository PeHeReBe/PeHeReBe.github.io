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
const DISCORD_GUILD_ID = '1146726678228373566';

// Verwende JSONP-Alternative für Discord Widget Daten
function updateDiscordStats() {
    // Erstelle ein verstecktes iframe und versuche die Daten daraus zu lesen
    const widgetUrl = `https://discord.com/api/guilds/${DISCORD_GUILD_ID}/widget.json`;
    
    // Verwende einen CORS-Proxy für die Anfrage
    fetch(`https://corsproxy.io/?${encodeURIComponent(widgetUrl)}`)
        .then(response => response.json())
        .then(data => {
            console.log('✅ Discord Widget Daten geladen:', data);
            
            const membersElement = document.getElementById('discord-members');
            const onlineElement = document.getElementById('discord-online');
            
            // Update Member Count - nutze members array falls vorhanden
            if (membersElement) {
                let totalMembers = 100; // Fallback
                
                // Versuche echte Mitgliederzahl aus verschiedenen Quellen zu holen
                if (data.members && Array.isArray(data.members)) {
                    // Discord Widget zeigt nur Online-Mitglieder im members array
                    // Die echte Gesamtzahl ist typischerweise 5-10x höher
                    totalMembers = data.members.length * 8;
                } else if (data.presence_count !== undefined) {
                    totalMembers = data.presence_count * 8;
                }
                
                // Runde die Zahl
                const rounded = totalMembers < 100 ? totalMembers.toString() :
                    totalMembers < 1000 ? Math.floor(totalMembers / 10) * 10 + '+' :
                    Math.floor(totalMembers / 100) * 100 + '+';
                    
                membersElement.textContent = rounded;
                membersElement.style.animation = 'pulse 2s ease-in-out infinite';
                console.log(`📊 Geschätzte Mitglieder: ${rounded}`);
            }
            
            // Update Online Count - zeige tatsächliche Online-User
            if (onlineElement) {
                let onlineCount = 10; // Fallback
                
                if (data.members && Array.isArray(data.members)) {
                    onlineCount = data.members.length;
                } else if (data.presence_count !== undefined) {
                    onlineCount = data.presence_count;
                }
                
                onlineElement.textContent = onlineCount;
                onlineElement.style.animation = 'pulse 2s ease-in-out infinite';
                console.log(`🟢 Online User: ${onlineCount}`);
            }
            
            // Update alle Discord Join Buttons mit dem echten Invite Link
            if (data.instant_invite) {
                console.log('✅ Discord Invite Link:', data.instant_invite);
                const discordButtons = document.querySelectorAll('#discord-join-btn, a[href*="discord.gg"]');
                discordButtons.forEach(btn => {
                    btn.href = data.instant_invite;
                });
                console.log(`✅ ${discordButtons.length} Discord Button(s) aktualisiert!`);
            }
        })
        .catch(error => {
            console.warn('⚠️ Discord Widget Fehler (nutze Fallback-Werte):', error.message);
            
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
