# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Galileo Capital's website - a Next.js 14 application for a fintech company based in Costa Rica. The site is a modern landing page showcasing their financial services and digital asset management platform.

## Common Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# No test scripts are configured in this project
```

## Architecture

### Framework & Technology Stack
- **Next.js 14** with App Router
- **React 18** with client-side components
- **Tailwind CSS** for styling
- **TypeScript/JavaScript** mixed codebase (primarily JSX)

### Key Dependencies
- **AOS (Animate On Scroll)** - Animation library initialized in main page component
- **react-i18next** - Internationalization (Spanish/English)
- **react-slick** - Carousel/slider components
- **lottie-web & react-lottie** - Animation components
- **react-icons** - Icon library

### Project Structure
```
src/
├── app/
│   ├── components/          # Reusable React components
│   │   ├── navbar.jsx      # Main navigation with i18n
│   │   ├── Hero.jsx        # Hero section
│   │   ├── Features.jsx    # Features showcase
│   │   ├── Footer.jsx      # Site footer
│   │   └── ...             # Other page sections
│   ├── layout.js           # Root layout with SEO metadata
│   ├── page.js             # Main landing page
│   ├── globals.css         # Global styles
│   └── sitemap.js          # Dynamic sitemap generation
├── lib/
│   └── i18n.js             # i18next configuration
└── locales/
    ├── en/common.json      # English translations
    └── es/common.json      # Spanish translations
```

### Component Architecture
- **Single-page application** structure with section-based components
- All components are **client-side** ("use client" directive)
- Main page assembles components in a specific order with AOS animations
- **Responsive design** with mobile-first approach using Tailwind classes

### Internationalization
- **Two languages**: English (en) and Spanish (es)
- Default language: English, fallback: English
- Translation files in `src/locales/[lang]/common.json`
- Language toggle in navbar component
- SEO metadata configured for Spanish Costa Rica locale

### Styling System
- **Tailwind CSS** as primary styling solution
- Custom fonts: Inter (primary) and Poppins (extended)
- Custom color scheme with brand colors (e.g., `#3B10D8` for primary actions)
- **AOS animations** with 1000ms duration, 100px offset, once: true
- Background image integration using Next.js optimized images

### SEO & Performance
- Comprehensive metadata in layout.js with OpenGraph and Twitter cards
- Schema.org structured data for organization
- Optimized images with Next.js Image component
- Preconnect to Google Fonts
- Proper favicon and manifest setup

## Development Notes

### Component Conventions
- Use `.jsx` extension for components
- All components are functional components with hooks
- Use Next.js Image component for optimized images
- Assets stored in `/public/assets/` directory
- Translation keys follow dot notation (e.g., `t('nav.about')`)

### State Management
- Local state management with React hooks (useState, useEffect)
- i18next for language state management
- No global state management library (Redux, Zustand, etc.)

### Routing
- Next.js App Router with file-based routing
- Hash-based navigation for single-page sections (#about, #features, etc.)
- Dynamic sitemap and robots.txt generation

### Important Files
- `src/app/layout.js` - Contains all SEO metadata and site configuration
- `src/app/page.js` - Main landing page component orchestration
- `src/lib/i18n.js` - Internationalization setup and configuration
- `tailwind.config.js` - Tailwind customization including fonts and content paths