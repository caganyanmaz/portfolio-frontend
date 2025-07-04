# Portfolio Website

A modern, responsive portfolio website built with Next.js 15 and designed to showcase projects, skills, and experience. The frontend is built with React and TypeScript, while the backend uses Strapi CMS for content management.

## Features

- **Modern Design**: Clean, professional design with smooth animations using Framer Motion
- **Responsive**: Fully responsive design that works on all devices
- **Content Management**: Strapi CMS integration for easy content updates
- **Performance**: Built with Next.js 15 and optimized for speed
- **TypeScript**: Full TypeScript support for better development experience
- **Animations**: Smooth scroll animations and staggered effects
- **Contact Form**: Functional contact form with backend integration

## Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client for API calls

### Backend

- **Strapi CMS** - Headless CMS for content management
- **REST API** - Content delivery and management

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog page
│   ├── contact/           # Contact page
│   ├── projects/          # Projects page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── Navigation.tsx     # Navigation component
│   └── ScrollAnimation.tsx # Animation components
├── lib/                   # Utility libraries
│   ├── api.ts            # Base API configuration
│   └── portfolio-api.ts  # Portfolio-specific API functions
└── types/                # TypeScript type definitions
    └── strapi.ts         # Strapi content types
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Strapi backend running (see backend setup)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd portfolio-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=your_api_token_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Content Management

The website integrates with Strapi CMS for content management. The following content types are supported:

- **Personal Info** - Name, title, bio, contact information
- **Projects** - Project details, images, technologies, links
- **Skills** - Technical skills with categories and proficiency levels
- **Experience** - Work experience and internships
- **Education** - Academic background
- **Contact Messages** - Contact form submissions

## Configuration

### Strapi Integration

The frontend communicates with Strapi through the API layer in `src/lib/`. The main API functions are:

- `portfolioApi.getPersonalInfo()` - Get personal information
- `portfolioApi.getAllProjects()` - Get all projects
- `portfolioApi.getFeaturedProjects()` - Get featured projects
- `portfolioApi.getAllSkills()` - Get all skills
- `portfolioApi.getAllExperience()` - Get work experience
- `portfolioApi.submitContactForm()` - Submit contact form

### Customization

1. **Styling**: Modify `src/app/globals.css` and component styles
2. **Content**: Update content through Strapi admin panel
3. **Animations**: Customize animations in `src/components/ScrollAnimation.tsx`
4. **Layout**: Modify `src/app/layout.tsx` for global layout changes

## Pages

- **Home** (`/`) - Hero section, featured projects, skills overview
- **Projects** (`/projects`) - Complete project portfolio
- **Blog** (`/blog`) - Blog posts and articles
- **Contact** (`/contact`) - Contact form and information

## Features in Detail

### Animations

- Smooth scroll-triggered animations using Framer Motion
- Staggered animations for lists and grids
- Hover effects and transitions

### Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Adaptive typography and spacing

### Performance

- Next.js 15 with App Router
- Optimized images and assets
- Efficient API calls with caching

## Author

**Cagan Yanmaz**

- CS & Mathematics Student at University of Oxford
- GitHub: [@caganyanmaz](https://github.com/caganyanmaz)

## Links

- [Live Demo](https://your-portfolio-url.com)
- [Backend Repository](https://github.com/your-username/portfolio-backend)
- [Strapi Documentation
  ](https://docs.strapi.io/)

---

© 2024 Cagan Yanmaz. All rights reserved.
