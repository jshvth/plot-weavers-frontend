# Story Creation

## Summary
Logged-in users can create a new story, including title, genre, description, and an optional cover image upload.

## User Flow
- Go to `/create` and fill out the form.
- Optionally upload a cover image and preview it.
- Submit to create the story and navigate to its detail page.

## Key Behaviors
- Requires a valid auth token; otherwise shows a message.
- Uploads cover images to the backend and stores the returned URL.
- Resets the form after successful creation.

## Related Files
- `src/pages/CreatePage/CreatePage.jsx`
- `src/api/stories.js`
