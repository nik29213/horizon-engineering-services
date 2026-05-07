# Horizon Engineering Services – React Website

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up Web3Forms (Contact Form)
1. Go to https://web3forms.com
2. Enter your email → you'll receive a free **Access Key**
3. Open `src/pages/Contact.js`
4. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your actual key:
   ```js
   const WEB3FORMS_KEY = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
   ```

### 3. Run locally
```bash
npm start
```
Opens at http://localhost:3000

---

## Deploying to GitHub Pages

### 1. Create a GitHub repo
- Go to github.com → New Repository (e.g. `horizon-engineering-services`)
- Do NOT initialise with README

### 2. Update `package.json`
Replace the `homepage` field (currently a dot)with your actual GitHub Pages URL:
```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/horizon-engineering-services"
```

### 3. Push your code
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/horizon-engineering-services.git
git push -u origin main
```

### 4. Deploy
```bash
npm run deploy
```
This runs the build and pushes to the `gh-pages` branch automatically.

### 5. Enable GitHub Pages
- Go to your repo → Settings → Pages
- Source: Deploy from branch → `gh-pages` → `/ (root)`
- Wait ~2 minutes, then visit your URL

### Updating the site
After any changes, just run:
```bash
npm run deploy
```

---

## Customising Social Media Links
In `src/components/Footer.js`, replace the placeholder `href` values:
```jsx
<a href="https://instagram.com/YOUR_HANDLE" ...>
<a href="https://facebook.com/YOUR_PAGE" ...>
<a href="https://linkedin.com/in/YOUR_PROFILE" ...>
```

## Color Theme
Colors are defined in `src/index.css` as CSS variables:
- `--magenta: #9B2D7F` (from logo)
- `--navy: #2B2D7E` (from logo)
- Adjust there to update the whole site.
