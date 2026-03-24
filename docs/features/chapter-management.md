# Chapter Management

## Summary
Chapters can be added to stories, including branching from existing chapters. Each chapter has a dedicated detail view with delete actions.

## User Flow
- From a story detail page, add a new chapter (optionally linked to a parent).
- Open a chapter from the story tree or profile list.
- Delete a chapter from its detail page.

## Key Behaviors
- Non-admin users must keep chapter word count between 300 and 1500 words.
- Chapters are created via the backend and appended to the story tree.
- Chapter deletion redirects back to the parent story.

## Related Files
- `src/pages/StoryDetailPage/StoryDetailPage.jsx`
- `src/pages/ChapterDetailPage.jsx/ChapterDetailPage.jsx`
- `src/api/chapters.js`
