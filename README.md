# Game of Life

Dit is een implementatie van Conway's Game of Life in PHP. Het spel simuleert het gedrag van cellen in een 2D-grid volgens een reeks eenvoudige regels. Elke cel kan levend of dood zijn, en de staat van elke cel in de volgende generatie hangt af van het aantal levende buren.

## Inleiding

Conway's Game of Life is een cellulair automaton bedacht door de wiskundige John Conway. Het spel bestaat uit een oneindige tweedimensionale orthogonale raster van vierkante cellen, waarbij elke cel zich in een van twee mogelijke toestanden bevindt, "levend" of "dood". De toestand van het raster evolueert in generaties volgens eenvoudige regels, die verrassend complexe en interessante patronen kunnen produceren.

## Installatie

1. Clone de repository:

    ```bash
    git clone https://github.com/jouw-gebruikersnaam/game-of-life-php.git
    ```

2. Ga naar de directory van het project:

    ```bash
    cd game-of-life-php
    ```

3. Zorg dat PHP is geïnstalleerd:

    Je hebt PHP 7.0 of hoger nodig. Controleer de versie met:

    ```bash
    php -v
    ```

4. Run het script:

    Start het script vanuit de commandoregel:

    ```bash
    php game_of_life.php
    ```

## Gebruik

Na het uitvoeren van het script zal de initiële generatie van het grid worden weergegeven, gevolgd door een aantal opeenvolgende generaties.

Je kunt de grootte van het grid en het aantal generaties dat wordt weergegeven aanpassen door de variabelen `$rows`, `$cols` en `$gen` in het script `game_of_life.php` te wijzigen.

## Spelregels

Het spel wordt gespeeld op een eindige 2D-raster van cellen. Elke cel heeft acht buren, en de toestand van elke cel in de volgende generatie wordt bepaald door de volgende regels:

- **Onderbevolking:** Een levende cel met minder dan twee levende buren sterft in de volgende generatie.
- **Overbevolking:** Een levende cel met meer dan drie levende buren sterft in de volgende generatie.
- **Overleven:** Een levende cel met twee of drie levende buren blijft leven in de volgende generatie.
- **Voortplanting:** Een dode cel met exact drie levende buren komt tot leven in de volgende generatie.

## Voorbeelden

*Voeg hier voorbeelden van uitvoeringen of specifieke patronen toe als dat nodig is.*

## Licentie

Dit project is gelicentieerd onder de MIT-licentie. Zie het [LICENSE](LICENSE) bestand voor meer informatie.
