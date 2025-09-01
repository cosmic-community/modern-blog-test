# Modern Blog Platform

![App Preview](https://imgix.cosmicjs.com/44c900d0-875c-11f0-8dcc-651091f6a7c0-photo-1549144511-f099e773c147-1756749080517.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A sleek, modern blog platform built with Next.js 15 that showcases your existing content in an elegant, reader-friendly interface. Features responsive design, category filtering, author profiles, and optimized performance for an exceptional reading experience.

## ✨ Features

- **Dynamic Blog Posts** - Display all your existing posts with full markdown content rendering
- **Category Filtering** - Browse posts by Technology, Travel, and Lifestyle categories with color-coded badges
- **Author Profiles** - Dedicated pages showcasing author bios, photos, and social links
- **Featured Post System** - Highlight important posts on the homepage
- **Responsive Design** - Optimized for all devices from mobile to desktop
- **SEO Optimized** - Built-in meta tags and structured data for better search visibility
- **Fast Performance** - Server-side rendering with Next.js 15 for optimal loading speeds

<!-- CLONE_PROJECT_BUTTON -->

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS
- **Content Management:** Cosmic CMS
- **Language:** TypeScript
- **Markdown:** react-markdown with syntax highlighting
- **Font:** Inter

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your blog content

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd modern-blog-platform
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Cosmic credentials to `.env.local`:
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Cosmic SDK Examples

### Fetching All Posts
```typescript
import { cosmic } from '@/lib/cosmic'

const posts = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
  .then(response => response.objects)
```

### Getting a Single Post
```typescript
const post = await cosmic.objects
  .findOne({ type: 'posts', slug: 'post-slug' })
  .depth(1)
  .then(response => response.object)
```

### Filtering Posts by Category
```typescript
const techPosts = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.categories': 'category-id'
  })
  .depth(1)
  .then(response => response.objects)
```

## 🌟 Cosmic CMS Integration

This application integrates seamlessly with your Cosmic CMS content:

- **Posts**: Main blog content with markdown, featured images, and metadata
- **Authors**: Writer profiles with bios, photos, and social links
- **Categories**: Topic organization with descriptions and color coding

The app automatically fetches and displays:
- All published blog posts
- Author information with profile pictures
- Category-based filtering and navigation
- Featured post highlighting

## 📱 Deployment Options

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy automatically

### Deploy to Netlify

1. Build the application: `bun run build`
2. Deploy the `out` folder to Netlify
3. Configure environment variables in Netlify settings

### Other Platforms

The application can be deployed to any platform that supports Next.js applications.

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com) and Next.js