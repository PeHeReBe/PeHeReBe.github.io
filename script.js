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
const DISCORD_GUILD_ID = '1146726678228373566'; // Ersetze mit deiner Discord Server ID

function roundNumber(num) {
    if (num < 100) return num.toString();
    if (num < 1000) {
        return Math.floor(num / 10) * 10 + '+';
    }
    return Math.floor(num / 100) * 100 + '+';
}

function updateDiscordStats() {
    // Discord Widget API
    fetch(`https://discord.com/api/guilds/${DISCORD_GUILD_ID}/widget.json`)
        .then(response => response.json())
        .then(data => {
            const membersElement = document.getElementById('discord-members');
            const onlineElement = document.getElementById('discord-online');
            
            if (membersElement && data.presence_count) {
                const approximateMembers = data.presence_count * 3; // Approximation
                membersElement.textContent = roundNumber(approximateMembers);
                membersElement.style.animation = 'fadeIn 0.5s ease-out';
            }
            
            if (onlineElement && data.presence_count) {
                onlineElement.textContent = data.presence_count;
                onlineElement.style.animation = 'fadeIn 0.5s ease-out';
            }
            
            // Update alle Discord-Links mit dem instant_invite
            if (data.instant_invite) {
                const discordLinks = document.querySelectorAll('a[href*="discord.gg"], a[href="https://discord.gg/DEIN_DISCORD_LINK"], a[href="#"]');
                let updatedCount = 0;
                discordLinks.forEach(link => {
                    // Nur Links die zu Discord führen sollen aktualisieren (nicht alle # Links)
                    if (link.href.includes('discord.gg') || link.href.includes('DEIN_DISCORD_LINK') || 
                        (link.closest('.dropdown-content') && link.textContent.includes('Discord'))) {
                        link.href = data.instant_invite;
                        updatedCount++;
                    }
                });
                if (updatedCount > 0) {
                    console.log(`✅ ${updatedCount} Discord Einladungslink(s) automatisch aktualisiert!`);
                }
            } else {
                console.log('⚠️ Kein instant_invite im Widget verfügbar. Bitte aktiviere "Instant Invite" in den Discord Widget-Einstellungen.');
            }
        })
        .catch(error => {
            console.log('Discord Widget nicht verfügbar. Bitte aktiviere das Widget in den Discord Servereinstellungen.');
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
    // Update every 60 seconds
    setInterval(updateDiscordStats, 60000);
}
