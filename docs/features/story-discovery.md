# Story Discovery

## Summary
Users can browse all stories and filter them by genre using a search field.

## User Flow
- Open `/stories` to see all available stories.
- Type a genre keyword to filter the list.
- Click a story card to open the story detail page.

## Key Behaviors
- Stories are loaded from the backend on page load.
- Filtering is done client-side via the genre field.
- Shows an empty state when no stories match.

## Related Files
- `src/pages/StoriesPage/StoriesPage.jsx`
- `src/shared/StoryCard/StoryCard.jsx`
- `src/api/stories.js`
