# John Conway's game of Life

Dit is een implementatie van Conway's Game of Life, gebouwd met HTML, CSS, JavaScript en gestyled met Tailwind CSS. Het spel simuleert het gedrag van cellen in een 2D-grid volgens een reeks eenvoudige regels. Elke cel kan levend of dood zijn, en de staat van elke cel in de volgende generatie hangt af van het aantal levende buren.

## Inleiding

Conway's Game of Life is een cellulair automaton, bedacht door de wiskundige John Conway. Het spel bestaat uit een tweedimensionaal raster van vierkante cellen, waarbij elke cel zich in een van twee mogelijke toestanden bevindt: "levend" of "dood". De toestand van het raster evolueert in generaties volgens eenvoudige regels, die verrassend complexe en interessante patronen kunnen creëren.

## Installatie

1. Clone de repository:

    ```bash
    git clone https://github.com/jouw-gebruikersnaam/bit-game-of-life
    ```
    
2. Open het project in je favoriete editor en start een lokale server (bijv. met VSCode's Live Server of een andere methode naar keuze).

3. Open `index.html` in je browser om het spel te starten.

## Gebruik

Na het openen van het project in je browser wordt de initiële generatie van het grid weergegeven. Door op een cel te klikken, kun je de staat van die cel veranderen (levend of dood). Gebruik de knoppen om het spel te starten, te pauzeren of de generaties automatisch te laten evolueren.

## Spelregels

Het spel wordt gespeeld op een eindige 2D-raster van cellen. Elke cel heeft acht buren, en de toestand van elke cel in de volgende generatie wordt bepaald door de volgende regels:

- **Onderbevolking:** Een levende cel met minder dan twee levende buren sterft in de volgende generatie.
- **Overbevolking:** Een levende cel met meer dan drie levende buren sterft in de volgende generatie.
- **Overleven:** Een levende cel met twee of drie levende buren blijft leven in de volgende generatie.
- **Voortplanting:** Een dode cel met precies drie levende buren komt tot leven in de volgende generatie.

## Voorbeelden

![example]([https://assets.digitalocean.com/articles/alligator/boo.svg](https://lh3.googleusercontent.com/C6HkzTZOrAtlLPkY6tHcUQMX1BoahTG_Gt4ueO_G0dV-J6dqSbT7ElD6Ddg_vg2cNI1D9cIBQMUNaPWIkPrqGVpbE9RY_9Q3Fn0k)

## Licentie

Dit project is gelicentieerd onder de MIT-licentie. Zie het [LICENSE](LICENSE) bestand voor meer informatie.
