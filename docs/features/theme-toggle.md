# Theme Toggle (Light/Dark)

## Summary
Users can switch between light and dark themes. The selected theme is persisted and applied globally using the Tailwind `dark` class on the document root.

## User Flow
- Click the sun/moon icon in the navbar to toggle the theme.
- The UI updates instantly across all pages.

## Key Behaviors
- Theme preference is stored in `localStorage` under `theme`.
- The `dark` class is toggled on `document.documentElement`.

## Related Files
- `src/shared/Navbar/Navbar.jsx`
- `src/index.css`
