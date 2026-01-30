# কাস্টম হুক জেনারেটর (Custom Hook Generator)

A web application for generating custom quiz captions and hashtags for social media posts. This tool helps create engaging quiz content with auto-generated hashtags and captions in Bengali.

## Features

- 📚 Multiple subject support (ইতিহাস, ভূগোল, Indian Polity, অর্থনীতি, Tripura GK, শিশু বিকাশ)
- 🎯 Category-based caption templates (Exam & Knowledge, Challenge, Curiosity, Urgency, Fun & Social)
- 🎨 Color-coded category navigation buttons
- 🔄 Random order display with re-randomization after copy
- 📋 One-click copy functionality (click row or button)
- 🌓 Dark/Light theme toggle
- 📱 Fully responsive design
- ⚡ Fast and lightweight (pure HTML/CSS/JavaScript)

## Project Structure

```
Custom_hooks_Generator/
├── caption genarator.html    # Main HTML file
├── data/
│   ├── hashtagData.js        # Subject and topic hashtags
│   ├── generalHashtags.js    # General hashtags
│   └── hookTemplates/        # Caption templates by category
│       ├── exam-knowledge.js
│       ├── challenge.js
│       ├── curiosity.js
│       ├── urgency.js
│       ├── fun-social.js
│       └── index.js
└── js/
    ├── app.js                 # Main application logic
    └── theme.js               # Theme toggle functionality
```

## Getting Started

### Local Development

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Custom_hooks_Generator
```

2. Open `caption genarator.html` in a web browser
   - Simply double-click the file, or
   - Use a local server: `python -m http.server 8000` then visit `http://localhost:8000`

### Deployment

#### Option 1: GitHub Pages (Free)

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select branch (usually `main` or `master`)
4. Select `/ (root)` as source
5. Your site will be available at `https://<username>.github.io/<repo-name>`

**Note:** Rename `caption genarator.html` to `index.html` for GitHub Pages to work automatically.

#### Option 2: Netlify (Free)

1. Sign up at [Netlify](https://www.netlify.com)
2. Drag and drop your project folder, or
3. Connect your GitHub repository
4. Netlify will auto-deploy

#### Option 3: Vercel (Free)

1. Sign up at [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-detect and deploy

#### Option 4: Any Static Hosting

Upload all files to any static hosting service:
- AWS S3 + CloudFront
- Firebase Hosting
- Surge.sh
- Any web server

## Usage

1. Select a **Subject** (বিষয়)
2. Choose a **Topic** (টপিক) or type custom hashtag
3. Select **Target/Exam** (টার্গেট)
4. Filter by **Caption Category** using tabs or dropdown
5. Click on any row or the copy button to copy caption + hashtags
6. Paste in your social media post!

## Customization

### Adding New Subjects

Edit `data/hashtagData.js`:
```javascript
const hashtagData = {
  "New Subject": {
    primaryTag: "#NewSubjectQuiz",
    topics: ["#topic1", "#topic2"]
  }
};
```

### Adding New Caption Templates

Edit the appropriate file in `data/hookTemplates/`:
```javascript
const examKnowledgeTemplates = [
  {
    id: 999,
    template: "Your new template with {{Subject}} placeholder",
    type: "🧠 Exam & Knowledge",
  }
];
```

### Changing Colors

Edit category colors in `js/app.js` → `initializeCategoryTabs()` function.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Bootstrap 5.3.3
- Lucide Icons

## License

[Add your license here]

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Author

[Your Name/Organization]

---

Made with ❤️ for quiz content creators
