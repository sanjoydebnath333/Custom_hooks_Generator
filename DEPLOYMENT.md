# Deployment Guide

This guide will help you deploy the Custom Hook Generator website to various platforms.

## Quick Deploy Options

### 1. GitHub Pages (Recommended - Free)

**Steps:**
1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. Go to your repository on GitHub
3. Click **Settings** → **Pages**
4. Under **Source**, select:
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
5. Click **Save**
6. Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

**Note:** The repository already includes `index.html` which GitHub Pages will serve automatically.

### 2. Netlify (Free - Easiest)

**Option A: Drag & Drop**
1. Go to [app.netlify.com](https://app.netlify.com)
2. Sign up/Login
3. Drag and drop your project folder
4. Done! You'll get a URL like `https://random-name-123.netlify.app`

**Option B: GitHub Integration**
1. Connect your GitHub account to Netlify
2. Select your repository
3. Netlify auto-detects settings (already configured in `netlify.toml`)
4. Click **Deploy**

### 3. Vercel (Free)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click **New Project**
4. Import your repository
5. Vercel auto-detects settings (already configured in `vercel.json`)
6. Click **Deploy**

### 4. Surge.sh (Free - Command Line)

```bash
# Install Surge (requires Node.js)
npm install -g surge

# Deploy
cd "C:\Users\USER\Documents\testpreps resources\facebook contents\Quiz\Custom_hooks_Generator"
surge

# Follow prompts:
# - Enter email
# - Enter password (or create account)
# - Enter domain (or use auto-generated)
```

### 5. Firebase Hosting (Free)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy
```

## Custom Domain Setup

### GitHub Pages
1. Add `CNAME` file in root with your domain:
   ```
   yourdomain.com
   ```
2. Update DNS records at your domain provider

### Netlify/Vercel
- Add custom domain in dashboard
- Follow DNS configuration instructions

## File Structure for Deployment

Make sure these files are included:
```
✅ index.html (main file)
✅ data/ (all data files)
✅ js/ (all JavaScript files)
✅ .gitignore
✅ README.md
```

## Testing Before Deployment

1. Test locally:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx serve
   
   # PHP
   php -S localhost:8000
   ```

2. Visit `http://localhost:8000` in browser
3. Test all features work correctly
4. Check responsive design on mobile

## Troubleshooting

### GitHub Pages not showing
- Ensure `index.html` exists in root
- Check branch is set to `main` or `master`
- Wait a few minutes for deployment

### Scripts not loading
- Check file paths are relative (not absolute)
- Ensure all files are committed to Git
- Check browser console for errors

### CORS Issues
- All files should be on same domain
- No need for CORS headers for static files

## Continuous Deployment

The repository includes GitHub Actions workflow (`.github/workflows/deploy.yml`) that will automatically deploy to GitHub Pages when you push to main branch.

## Need Help?

- Check browser console for errors
- Verify all file paths are correct
- Ensure all dependencies (Bootstrap, Lucide) load from CDN
- Test in incognito mode to avoid cache issues
