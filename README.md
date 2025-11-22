# NewsFlow - RSS Feed Landing Page

A modern, responsive landing page built with React and TypeScript that showcases an RSS feed reader application. Features a compelling hero section, benefits, testimonials, and a live demo of the RSS reader functionality.

## Landing Page Features

- 🎯 **Hero Section**: Compelling headline with gradient background and dual CTAs
- ⚡ **Features Section**: Three key benefits with icons and descriptions
- 📊 **Stats Section**: Impressive metrics (50K+ users, 1M+ articles read)
- 💬 **Testimonials**: Social proof from satisfied users
- 📧 **Email Capture**: Lead generation form for early access
- 🎨 **Modern Design**: Clean, professional layout with blue gradient theme

## RSS Demo Features

- 📰 **RSS Feed Support**: Load articles from any RSS feed URL
- 🎨 **Beautiful Card Layout**: Clean, modern design matching the reference image
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🖼️ **Image Support**: Automatically extracts and displays article images
- ⚡ **Fast Loading**: Optimized performance with sample data for quick demos
- 🎯 **Category Tags**: Colorful category labels for easy content identification

## Design Features

The article cards match the design from your reference image:
- **Date Display**: Shows publication date in "NOV 21" format
- **Category Tags**: Blue, uppercase category labels (GEMINI APP, AI, SHOPPING, etc.)
- **Title & Description**: Clean typography with proper hierarchy
- **Thumbnail Images**: 96x96px rounded images on the right side of cards
- **Hover Effects**: Subtle shadow transitions on card hover
- **Grid Layout**: 3-column grid on desktop, responsive on smaller screens

## Getting Started

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   Navigate to `http://localhost:5175`

3. **Explore the Landing Page:**
   - View the hero section with compelling headline
   - Check out features, testimonials, and stats
   - Sign up with your email for early access

4. **Try the RSS Demo:**
   - Click "Try Live Demo" to access the RSS reader
   - **Sample Data**: Click "Load Sample Data" to see demo articles
   - **Custom RSS**: Enter any RSS feed URL and click "Load Feed"

## Usage Examples

### Popular RSS Feeds to Try:
- **Tech News**: `https://feeds.feedburner.com/oreilly/radar`
- **Google Blog**: `https://blog.google/technology/ai/rss/`
- **TechCrunch**: `https://techcrunch.com/feed/`
- **BBC News**: `http://feeds.bbci.co.uk/news/technology/rss.xml`

### Sample Data
The app includes sample data that matches the articles from your reference image:
- Gemini app updates
- Holiday planning tips
- AI shopping recommendations
- Public policy articles
- Learning & education content

## Technical Details

### Built With
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **date-fns** for date formatting
- **RSS2JSON API** for CORS-friendly RSS parsing

### Key Components
- `ArticleCard.tsx`: Individual article card component
- `Home.tsx`: Main page with RSS input and article grid
- `rss-parser.ts`: RSS feed parsing utilities

### Styling
- Uses Tailwind CSS with custom utilities
- Responsive grid layout (1 column mobile, 2 tablet, 3 desktop)
- Consistent spacing and typography
- Professional color scheme with blue accents

## Browser Support

Works in all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers

## Performance

- Optimized for fast loading
- Image lazy loading
- Efficient re-renders with React hooks
- Minimal dependencies

## Customization

You can easily customize:
- Colors in `tailwind.config.js`
- Card layout in `ArticleCard.tsx`
- Grid breakpoints in the main page
- Sample data in `rss-parser.ts`
