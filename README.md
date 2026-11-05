# SAR LOOP — System of Reality Authorization

Interaktywna aplikacja webowa mapująca koncepcję **SAR LOOP** autorstwa **Pawła Suski**
(White Paper v1.0 / Generation A.G.I.) — framework opisujący, jak w warunkach Przemysłu 5.0
ustalać, co i kto jest prawdziwy.

Aplikacja jest demonstracją i mapą koncepcji. **Nie jest wdrożeniem systemu weryfikacji**
i nie zawiera żadnej realnej biometrii ani kryptografii.

## Co zawiera

| Widok | Zawartość |
|---|---|
| **Pętla** | Sześć kroków Layer II na okręgu: SCAN → ANALYZE → REALITY CHECK → LEGITIMIZE → OPERATE → PROVE & FEEDBACK. Kliknięcie etapu pokazuje wejście, wyjście i warunek przejścia. |
| **Filary** | Layer I — Trust Infrastructure: BODY, COMPUTE, TWIN. |
| **Symulator** | Cztery warunki autoryzacji z wagami; pętla domyka się dopiero przy 100%, inaczej pokazuje, na którym etapie żądanie zostało zatrzymane. |
| **O projekcie** | Czym jest koncepcja, jak czytać aplikację i jaki jest jej status. |

## Struktura

```
index.html    widok i nawigacja (zakładki)
styles.css    warstwa wizualna (ciemny HUD, siatka, akcent cyjan)
app.js        dane koncepcji + logika pętli i symulatora
```

## Uruchomienie

Otwórz `index.html` w przeglądarce — aplikacja nie wymaga serwera, budowania ani zależności.

## Status koncepcji

Framework odwołuje się do realnych regulacji i standardów (eIDAS 2.0 / EUDI Wallet,
C2PA, W3C DID, kontrola eksportu ECCN 3A090), ale jako całość pozostaje autorską hipotezą
badawczą publikowaną w kanałach autora — bez niezależnej weryfikacji i bez wdrożenia.

Motto: *Technology may act. Humanity must remain in control.*
