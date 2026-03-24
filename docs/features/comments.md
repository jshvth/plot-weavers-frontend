# Comments

## Summary
Users can add comments to stories and remove their comments (admin can remove any).

## User Flow
- Enter a comment on a story detail page.
- Submit to post the comment to the backend.
- Delete a comment via the delete icon.

## Key Behaviors
- Requires login; shows alerts when unauthenticated.
- Uses the current user ID from localStorage.
- Comments are loaded and rendered with timestamps.

## Related Files
- `src/pages/StoryDetailPage/StoryDetailPage.jsx`
- `src/api/comments.js`
