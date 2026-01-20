// Server-Konfiguration für ARK: Survival Evolved
const serverConfig = {
    pageTitle: 'ARK - AFKingdom',
    title: 'Ark: Survival Evolved',
    subtitle: 'Überlebe, züchte Dinosaurier und erobere die Insel!',
    serverIP: '',  // Wird später hinzugefügt
    
    buttons: [
        {
            type: 'primary',
            text: 'Bald verfügbar',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
            disabled: true,
            style: 'opacity: 0.6;'
        },
        {
            type: 'secondary',
            text: 'Discord beitreten',
            href: 'https://discord.gg/HpWG5puTBQ'
        }
    ],
    
    featuresTitle: 'Geplante Features',
    features: [
        {
            icon: '🦖',
            title: 'Dinosaurier zähmen',
            description: 'Zähme über 100+ verschiedene Kreaturen, von kleinen Dodos bis zu riesigen T-Rex'
        },
        {
            icon: '🏗️',
            title: 'Basen bauen',
            description: 'Errichte massive Basen und verteidige sie gegen wilde Kreaturen und andere Spieler'
        },
        {
            icon: '⚔️',
            title: 'PvE & PvP',
            description: 'Wähle zwischen friedlichem PvE oder spannendem PvP-Gameplay'
        }
    ],
    
    infoTitle: 'Server Informationen',
    infoItems: [
        {
            label: 'Status',
            value: 'In Planung'
        },
        {
            label: 'Spielmodus',
            value: 'PvE/PvP'
        },
        {
            label: 'Map',
            value: 'Ragnarok'
        },
        {
            label: 'Mods',
            value: 'Vanilla'
        }
    ],
    
    extraContent: `
        <div style="text-align: center; margin-top: 3rem; padding: 2rem; background: var(--bg-card); border-radius: 20px; border: 1px solid rgba(124, 58, 237, 0.2);">
            <h3 style="color: var(--accent-secondary); margin-bottom: 1rem;">🦕 ARK Server kommt bald!</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
                Wir planen einen ARK: Survival Evolved Server mit optimierten Einstellungen für ein ausgewogenes Spielerlebnis. Tritt unserem Discord bei, um bei der Server-Konfiguration mitzubestimmen!
            </p>
            <a href="https://discord.gg/HpWG5puTBQ" target="_blank" class="btn btn-primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Zum Discord
            </a>
        </div>
    `
};
