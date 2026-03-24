# Story Tree

## Summary
A visual story tree displays chapter branching using React Flow and Dagre layout.

## User Flow
- View the story tree inside a story detail page.
- Click a chapter node to open its detail view.
- Click "Add Chapter" on any node to branch the story.

## Key Behaviors
- Layout is computed with Dagre for readable branching structure.
- Edges are styled in pink to match the brand.
- Mini map and controls are enabled for navigation.

## Related Files
- `src/shared/StoryTree/StoryTree.jsx`
