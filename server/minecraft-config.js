// Server-Konfiguration für Minecraft
const serverConfig = {
    title: 'Minecraft',
    subtitle: 'Dein Survival-Abenteuer wartet auf dich!',
    serverIP: 'afkingdom.de',
    
    buttons: [
        {
            type: 'primary',
            text: 'Server IP kopieren',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',
            action: 'copyIP'
        },
        {
            type: 'secondary',
            text: 'Server Panel',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
            href: 'https://pelican.afkingdom.de/server/bc4a4794'
        },
        {
            type: 'secondary',
            text: 'Discord beitreten',
            href: 'https://discord.gg/HpWG5puTBQ'
        }
    ],
    
    featuresTitle: 'Server Features',
    features: [
        {
            icon: '⛏️',
            title: 'Survival',
            description: 'Klassisches Survival-Erlebnis mit Freunden in einer freundlichen Community'
        },
        {
            icon: '🏰',
            title: 'Vanilla friendly',
            description: 'Baue frei und kreativ in unserer Vanilla-Welt'
        },
        {
            icon: '💎',
            title: 'Economy',
            description: 'Verdiene Geld, handel mit Spielern und baue dein Imperium auf'
        }
    ],
    
    infoTitle: 'Server Informationen',
    infoItems: [
        {
            label: 'Version',
            value: '1.21.10 (Java Edition)',
            id: 'mc-version'
        },
        {
            label: 'Spieler Online',
            value: '0 / 999',
            id: 'mc-players'
        },
        {
            label: 'Status',
            value: '🟢 Online',
            id: 'mc-status'
        },
        {
            label: 'Server IP',
            value: 'afkingdom.de'
        }
    ],
    
    // Spezielle Funktionen für Minecraft
    customScripts: {
        onLoad: function() {
            updateMinecraftStatus();
            setInterval(updateMinecraftStatus, 30000);
        }
    }
};
