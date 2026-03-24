# Story Detail

## Summary
The story detail page shows a full story view with cover image, description, chapter tree, favorites, comments, and management actions.

## User Flow
- Open a story from the list.
- Read description and cover image.
- Add/remove favorites, create chapters, and manage comments.
- Admins can delete a story.

## Key Behaviors
- Loads story, chapters, and comments from the backend.
- Favorites toggle is stored in localStorage and synced with the backend.
- Story deletion prompts for confirmation.

## Related Files
- `src/pages/StoryDetailPage/StoryDetailPage.jsx`
- `src/shared/StoryTree/StoryTree.jsx`
- `src/api/stories.js`
- `src/api/chapters.js`
- `src/api/favorites.js`
- `src/api/comments.js`
