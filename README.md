# Koperen Passer O1-03 Artevelde — statische website

Volledige statische site: 10 pagina's, één stylesheet, één scriptbestand. Geen build nodig.

## Structuur
- index.html — homepagina
- over-ons.html — onze club (clubvoorstelling, historiek, bestuur)
- activiteiten.html — komende activiteiten en kalender
- activiteit-industriemuseum.html — voorbeeld activiteitsdetailpagina
- nieuws.html — nieuws en terugblikken
- fotos.html — portfolio van fotogalerijen
- nieuwsartikel-5000ste-lid.html — voorbeeld nieuwsartikel
- word-lid.html — lid worden
- contact.html — contactformulier
- leden.html — ledenomgeving (demo: kalender, ledenlijst, documenten, profiel)
- style.css / script.js / img/

## Navigatie
Vijf hoofdingangen: Home · Onze club · Activiteiten & nieuws · Lid worden & contact · Leden (loginknop).
Subnavigatie verschijnt bij hover/focus op desktop en staat uitgeklapt in het mobiele menu.

## Publiceren
Zet de map op eender welke statische host (GitHub Pages, Netlify, …).
Formulieren en de ledenomgeving zijn demo's: er is geen echte login of verzending.

De hero- en terugblikfoto's staan in img/hero-mannen.jpg, img/wandeling-mannen.jpg en img/stam-mannen.jpg;
vervang die bestanden (zelfde naam) om andere foto's te gebruiken. Via de knop "Eigen foto kiezen" kan het
ook in de browser, maar dat blijft lokaal (localStorage) en zit niet in de bestanden.

Lettertypes (EB Garamond, Archivo) laden via Google Fonts en vereisen internet.
