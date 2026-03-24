# Authentication

## Summary
Login and registration allow users to create accounts, sign in, and access protected areas like the profile page. Tokens are stored in localStorage and used for authenticated requests.

## User Flow
- Register a new account on `/register`.
- Log in on `/login` to receive a token.
- Access protected pages (e.g., `/profile`) after login.

## Key Behaviors
- Auth token is persisted in `localStorage` under `token`.
- Username is stored in `localStorage` under `username`.
- Protected routes redirect to `/login` when no token is present.

## Related Files
- `src/pages/LogInPage/LogInPage.jsx`
- `src/pages/RegisterPage/RegisterPage.jsx`
- `src/shared/ProtectedRoute/ProtectedRoute.jsx`
- `src/api/auth.js`
