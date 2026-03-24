# Localization (EN/DE)

## Summary
The UI supports English and German via `react-i18next`. Language choice persists between sessions.

## User Flow
- Click the translate icon in the navbar to switch between English and German.
- The whole UI updates immediately.

## Key Behaviors
- Default language is English unless a saved language exists.
- Selected language is stored in `localStorage` under `lang`.
- `document.documentElement.lang` is updated on change.

## Related Files
- `src/i18n/i18n.js`
- `src/i18n/locales/en.json`
- `src/i18n/locales/de.json`
- `src/shared/Navbar/Navbar.jsx`
- `src/main.jsx`
