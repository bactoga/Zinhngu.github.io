# Crimson Collective — Enterprise Team Website

A modern, high-end team introduction website with cloud-tech aesthetic, glassmorphism design, and premium animations.

## ✨ Features

- **Cloud-Tech Design**: Enterprise-grade UI inspired by modern hosting platforms
- **Glassmorphism**: Glass-blur panels with neon glow effects
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Scroll-reveal, parallax effects, hover interactions
- **Logo Showcase**: Dedicated section for multiple logo formats (square, round, transparent, banner)
- **SoundCloud Integration**: Embedded player with play/pause controls
- **No Backend Required**: Pure HTML, CSS, JavaScript — deploy anywhere

## 📁 File Structure

```
.
├── index.html          # Main HTML structure
├── style.css           # Styling, layout, animations
├── script.js           # Interactions, parallax, particle background
├── assets/             # Logo and image files
│   ├── logo-square.png
│   ├── logo-round.png
│   ├── logo-transparent.png
│   └── logo-banner.png
└── README.md           # This file
```

## 🚀 Quick Start

1. **Open the website**: Double-click `index.html` or open it in your browser
2. **No build process needed** — it works immediately
3. **Customize content** in `index.html` (team name, bios, colors)
4. **Add your logos** to the `assets/` folder (replace the placeholder names)

## 🎨 Customization Guide

### Change Brand Colors
Edit the CSS variables in `style.css` (lines 1–11):
```css
:root {
  --accent: #e11d2f;        /* Primary red */
  --accent-2: #ff3b49;      /* Accent red */
  --bg: #0b0b0d;            /* Dark background */
}
```

### Update Team Information
1. **Team Name**: Edit `.team-name` text in `index.html`
2. **Tagline**: Update the `.tagline` paragraph
3. **Team Members**: Modify the member cards in the `#team` section
4. **Services**: Update the service cards with your offerings

### Replace SoundCloud Track
In `index.html`, find the SoundCloud iframe and replace the `src` URL:
```html
<iframe id="sc-iframe"
  src="https://w.soundcloud.com/player/?url=YOUR_TRACK_URL&color=%23e11d2f...">
</iframe>
```
Get your track URL from SoundCloud and replace `YOUR_TRACK_URL`.

### Add Your Logos
1. Place your logo files in the `assets/` folder:
   - `logo-square.png` — 1:1 ratio (app icons, profiles)
   - `logo-round.png` — circular format (social media)
   - `logo-transparent.png` — PNG with transparent background
   - `logo-banner.png` — wide format (headers, emails)

2. The HTML automatically references these files. No code changes needed!

### Adjust Animations
- **Scroll reveal speed**: Edit the `transition` property in `.glass, .member-card, .service-card` (default: `.6s`)
- **Parallax intensity**: Modify the multiplier in `script.js` line 17: `translateY(${y * 0.5}px)` (0.5 = 50% speed)
- **Particle count**: Edit `const count` in `script.js` line 36

## 🌐 Deployment

### GitHub Pages (Free)
1. Push this folder to a GitHub repository
2. Enable GitHub Pages in repo settings
3. Your site goes live at `https://yourusername.github.io/repo-name`

### Netlify (Free, 1-click)
1. Drag & drop your folder into Netlify.com
2. Instant deploy with auto-updates on push

### Traditional Hosting
- Upload all files to your hosting provider
- Ensure `index.html`, `style.css`, `script.js`, and `assets/` folder are in the same directory

## 📋 Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## 💡 Tips & Tricks

- **Logo Formats**: Use PNG for transparency. SVG also works (update `img` tags)
- **Performance**: Optimize logo images (< 100KB each for faster load)
- **Mobile Testing**: Open in browser DevTools (F12) and toggle device toolbar
- **Smooth Scroll**: Works automatically on all modern browsers
- **Dark Theme**: Included by default. To change, modify the color variables in `style.css`

## 📝 License

Free to use and customize for your team or organization.

---

**Built with**: HTML, CSS, JavaScript | **Designed for**: Teams, Startups, Tech Companies

Enjoy! 🚀
