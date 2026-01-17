# DualClaude Website

An interactive website showcasing distributed AI collaboration between two Claude instances (T and Z) using file synchronization.

## Phase 1 MVP Features

1. **Landing Page** (/) - Hero section, stats, elevator pitch
2. **Protocol Simulator** (/simulator) - Interactive message flow demo
3. **Timeline** (/timeline) - Development story with incident cards
4. **Technical** (/technical) - How it works, architecture, mobile challenges
5. **About** (/about) - T & Z profiles, collaboration philosophy

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing

## Design System

**Color Palette:**
- T (Windows Claude): Cyan (#00D9FF)
- Z (Phone Claude): Orange (#FF8C42)
- Gradient: Cyan → Orange for sync/collaboration elements

**Visual Philosophy:**
Dual-perspective split-screen aesthetic showing both agents' environments.

## Development

### Install Dependencies

```bash
npm install
```

### Run Dev Server

```bash
npm run dev
```

Opens at http://localhost:3000

### Build for Production

```bash
npm run build
```

Output in `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
website/
├── src/
│   ├── components/    # Shared components (Navigation, etc.)
│   ├── pages/         # Page components (Landing, Simulator, etc.)
│   ├── styles/        # CSS files
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Main app with routing
│   └── main.jsx       # Entry point
├── public/            # Static assets
├── dist/              # Build output (git-ignored)
├── index.html         # HTML template
└── package.json       # Dependencies
```

## Division of Labor

**T (Windows Claude) owns:**
- Site architecture and routing
- Protocol Simulator backend logic
- Technical documentation content
- Code syntax highlighting
- Infrastructure setup

**Z (Phone Claude) owns:**
- Visual design system
- Mobile responsiveness
- Protocol Simulator UI/animations
- Timeline storytelling
- Interactive diagrams

**Collaborative:**
- Landing page (T: structure, Z: polish)
- About page (T: technical, Z: creative)
- Gallery curation

## Current Status

✅ **Completed:**
- Initial project structure
- React + Vite + Tailwind setup
- Basic routing for 5 core pages
- Navigation component
- Landing page MVP (placeholder content)
- Color system (cyan/orange dual perspective)
- Build verified working

⏳ **In Progress:**
- Waiting for Z's design system document
- Landing page content refinement

📋 **Next:**
- Collaborate on landing page with Z
- Build Protocol Simulator
- Build Timeline page
- Build Technical page
- Build About page

## Notes

- Base path set to `/dualclaude/` for GitHub Pages deployment
- Mobile-first responsive design
- All pages have placeholder content ready for iteration
- Built using the same collaboration protocol documented on the site

## Development Workflow

1. **T** creates architecture, routing, logic
2. **Z** adds visual design, animations, polish
3. **Ping-pong edits** for collaborative pages
4. **Test** on both desktop (T) and mobile (Z)
5. **Iterate** until page is MVP-complete
6. **Move to next page**

---

Built collaboratively by T and Z.
