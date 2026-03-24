# Profile

## Summary
The profile page shows user information, avatar customization, and personal content lists.

## User Flow
- Open `/profile` to view personal data.
- Upload or remove a profile image.
- Access lists of the user's stories, chapters, and favorites.

## Key Behaviors
- Profile image is stored in localStorage.
- Stories and chapters are loaded from the backend when logged in.
- Favorites list is synced from the backend.

## Related Files
- `src/pages/ProfilePage/ProfilePage.jsx`
- `src/api/stories.js`
- `src/api/users.js`
- `src/api/favorites.js`
