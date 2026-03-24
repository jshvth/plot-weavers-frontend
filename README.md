# PlotWeavers Frontend

PlotWeavers is a collaborative manga and story-building experience. This repository contains the React + Vite frontend that powers browsing, creating, and discussing stories.

## Docs
- See `docs/features/README.md` for a full feature catalog and implementation references.

## Features
- Home hero and newest stories
- Story discovery with genre search
- Story creation with optional cover upload
- Story detail view with chapters, comments, and favorites
- Chapter detail and deletion
- Visual story tree (branching chapters)
- User profile with avatar, personal stories, chapters, and favorites
- Authentication (login/register) with protected profile access
- Light/dark theme toggle
- EN/DE localization
- Support contact form
- How-to guide, imprint, and 404 page
- Responsive navigation with mobile menu

## Tech Stack
- React + Vite
- Tailwind CSS
- React Router
- i18next / react-i18next
- React Flow + Dagre
- EmailJS

## Getting Started
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:5173`

## Environment Variables
- `VITE_API_URL`
  - Base URL for backend API requests (required for story creation and uploads).
- `VITE_API_BASE_URL`
  - Optional base used for resolving cover images on the story detail page.
  - Defaults to `https://plot-weavers-backend.onrender.com` if not set.

## Demo
- https://plot-weavers-frontend.vercel.app
