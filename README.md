# Positive Young Minds — Professional Folder (Same Site, Proper Structure)

## Structure
- index.html — Home
- pages/ — about, programmes, leadership, opportunities, volunteer, events, gallery, contact, login, register
- dashboards/ — youth.html, provider.html, admin.html (each role, guarded)
- css/ — main.css, dashboards.css, auth.css
- js/ — utils.js, store.js, auth.js, opportunities.js, applications.js, dashboards.js, main.js
- data/seed.json — seed shape
- assets/img/logo.jpg — real PYM logo
- docs/ — TESTING-MATRIX.md

## Roles (existing demo accounts, passwords NOT in public code — hashes only)
- Youth, Provider, Admin. Volunteer is a Youth action (volunteer application), not a separate login role — see TESTING-MATRIX.
- Login redirects: Youth→dashboards/youth.html, Provider→dashboards/provider.html, Admin→dashboards/admin.html
- Guards: requireRole() in js/auth.js — wrong role is bounced to their own dashboard, no login is bounced to login.html with a message.
- Logout clears sessionStorage and returns to Home. Refresh does NOT leak previous user's data — dashboards re-check role on every load.

## Security / Real-world readiness
- NO plaintext passwords in public code or pages. SHA-256 hashes only (demo). For production: server + DB + bcrypt + salt + server sessions + email verification + 2FA for Admin + POPIA.
- Data is localStorage in THIS browser only — NOT synced across devices. Do not claim central storage.
- Do NOT upload any file containing passwords. Private credentials are in PRIVATE-CREDENTIALS-DO-NOT-UPLOAD.txt — keep on laptop only.

## Deploy to GitHub Pages
Upload EVERYTHING in this folder (all subfolders) to the repo root, overwrite old files, delete old single-file leftovers if any. Wait 1 min, hard-refresh Ctrl+Shift+R. Home is index.html at repo root.

## Real PYM details
7 Rex Street, Roodepoort, 1724 | positiveyoungmindsoffice@gmail.com | 066 563 2663 | @positiveyoungminds2025 | Executive Director: Mandilakhe Cqaka
