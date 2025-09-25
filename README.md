# Animation – Le premier jour d'école

Une animation web automatique (21s) en HTML/CSS/JS, style doux et pastel.

## Lancer localement

1. Servez le dossier avec n'importe quel serveur statique.
   - Python 3: `python3 -m http.server 8000`
   - Node: `npx serve . --single`
2. Ouvrez `http://localhost:8000` dans votre navigateur.

## Accessibilité
- Zones marquées avec `aria-hidden` pour n'exposer qu'une scène à la fois.
- Respecte `prefers-reduced-motion` (animations atténuées).

## Structure
- `index.html` – scènes et sprites SVG
- `styles.css` – thème pastel et animations
- `script.js` – timeline automatique (3s par scène)

Aucun suivi d'analytics, pas d'emojis — uniquement des SVG personnalisés.
