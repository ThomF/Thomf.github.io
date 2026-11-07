# Thomas — portfolio

Plain HTML/CSS/JS. No build step, no dependencies.

## Run it

Double-click `index.html`, or serve it:

```bash
python3 -m http.server 8000
```

then open http://localhost:8000

## Edit it

- **Text** (bio, experience, projects, links): `index.html` — look for `✏️ EDIT` comments.
- **Colors / fonts**: the variables at the top of `style.css`.
- **Portrait**: replace `assets/face.jpg`, then regenerate the ASCII (macOS, no installs):

  ```bash
  python3 tools/make_ascii.py 140
  ```

  The number is the width in characters — higher = more detail.

## Deploy

It's a static folder: drag it into Netlify Drop, or push to GitHub Pages / Vercel / Cloudflare Pages as-is.
