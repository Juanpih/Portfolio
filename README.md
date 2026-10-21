# Portfolio — Juan Pablo Ortiz Murillo

React + Vite portfolio with a game-console theme. One home page and six project pages (`/project/:slug`).

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Where to edit

| What | File |
| --- | --- |
| Name, email, summary, links | `src/data/profile.js` |
| Experience, education, skills, process stages | `src/data/profile.js` |
| Projects (titles, text, sections, images) | `src/data/projects.js` |
| Colours, fonts, layout, breakpoints | `src/styles.css` |
| Optimized images | `public/images/<project>/` |

## Resume button

Put your resume at `public/resume.pdf`. The home page's RESUME button opens `/resume.pdf`.

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com, sign in with GitHub → **Add New… → Project** → pick the repo.
3. Keep the defaults (Framework: Vite, build command `npm run build`, output `dist`) and click **Deploy**.

`vercel.json` already rewrites every route to `index.html`, so direct links like `/project/casino` work.
