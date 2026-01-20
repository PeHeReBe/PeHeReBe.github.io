// Server Page Renderer - Lädt Template und füllt es mit Config-Daten

async function renderServerPage() {
    try {
        // Lade das Server-Template
        const response = await fetch('../components/server-template.html');
        const template = await response.text();
        
        // Setze Template ins Main-Element
        const main = document.querySelector('main');
        if (!main) {
            console.error('Main-Element nicht gefunden');
            return;
        }
        
        main.innerHTML = template;
        
        // Befülle das Template mit den Config-Daten
        fillTemplate(serverConfig);
        
        // Führe Custom Scripts aus (z.B. Minecraft Status Update)
        if (serverConfig.customScripts && serverConfig.customScripts.onLoad) {
            serverConfig.customScripts.onLoad();
        }
        
    } catch (error) {
        console.error('Fehler beim Rendern der Server-Seite:', error);
    }
}

function fillTemplate(config) {
    // Befülle einfache Text-Inhalte
    document.querySelectorAll('[data-content]').forEach(element => {
        const key = element.getAttribute('data-content');
        const value = config[key];
        
        if (value !== undefined && value !== '') {
            element.textContent = value;
        } else if (element.hasAttribute('data-hide-if-empty')) {
            element.style.display = 'none';
        }
    });
    
    // Render Buttons
    const buttonsContainer = document.querySelector('[data-render="buttons"]');
    if (buttonsContainer && config.buttons) {
        buttonsContainer.innerHTML = config.buttons.map(btn => {
            const disabled = btn.disabled ? 'disabled' : '';
            const style = btn.style ? `style="${btn.style}"` : '';
            
            if (btn.href) {
                return `
                    <a href="${btn.href}" target="_blank" class="btn btn-${btn.type}" ${style}>
                        ${btn.icon || ''}
                        ${btn.text}
                    </a>
                `;
            } else if (btn.action === 'copyIP') {
                return `
                    <button class="btn btn-${btn.type}" onclick="copyServerIP()" ${disabled} ${style}>
                        ${btn.icon || ''}
                        ${btn.text}
                    </button>
                `;
            } else {
                return `
                    <button class="btn btn-${btn.type}" ${disabled} ${style}>
                        ${btn.icon || ''}
                        ${btn.text}
                    </button>
                `;
            }
        }).join('');
    }
    
    // Render Features
    const featuresContainer = document.querySelector('[data-render="features"]');
    if (featuresContainer && config.features) {
        featuresContainer.innerHTML = config.features.map(feature => `
            <div class="about-card">
                <div class="card-icon">${feature.icon}</div>
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            </div>
        `).join('');
    }
    
    // Render Info Items
    const infoContainer = document.querySelector('[data-render="infoItems"]');
    if (infoContainer && config.infoItems) {
        infoContainer.innerHTML = config.infoItems.map(item => `
            <div class="info-item">
                <h4>${item.label}</h4>
                <p${item.id ? ` id="${item.id}"` : ''}>${item.value}</p>
            </div>
        `).join('');
    }
    
    // Render Extra Content
    const extraContainer = document.querySelector('[data-render="extraContent"]');
    if (extraContainer && config.extraContent) {
        extraContainer.innerHTML = config.extraContent;
    }
}

// Copy Server IP Funktion (global verfügbar)
function copyServerIP() {
    const serverIP = serverConfig.serverIP;
    navigator.clipboard.writeText(serverIP).then(() => {
        const btn = event.currentTarget;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Kopiert!';
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 2000);
    });
}

// Minecraft Server Status Update (für Minecraft-Seite)
function updateMinecraftStatus() {
    const serverIP = serverConfig.serverIP;
    if (!serverIP) return;
    
    const apiUrl = `https://api.mcsrvstat.us/3/${serverIP}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('✅ Minecraft Server Daten:', data);
            
            const versionElement = document.getElementById('mc-version');
            const playersElement = document.getElementById('mc-players');
            const statusElement = document.getElementById('mc-status');
            
            if (data.online) {
                if (versionElement && data.version) {
                    versionElement.textContent = `${data.version} (Java Edition)`;
                }
                
                if (playersElement && data.players) {
                    const online = data.players.online || 0;
                    const max = data.players.max || 999;
                    playersElement.textContent = `${online} / ${max}`;
                }
                
                if (statusElement) {
                    statusElement.textContent = '🟢 Online';
                    statusElement.style.color = 'var(--accent-primary)';
                }
            } else {
                if (statusElement) {
                    statusElement.textContent = '🔴 Offline';
                    statusElement.style.color = '#ff4444';
                }
                
                if (playersElement) {
                    playersElement.textContent = '0 / 999';
                }
            }
        })
        .catch(error => {
            console.warn('⚠️ Minecraft API Fehler:', error);
        });
}

// Seite rendern, sobald DOM bereit ist
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderServerPage);
} else {
    renderServerPage();
}
