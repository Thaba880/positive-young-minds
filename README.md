# Positive Young Minds — Premium Refinement (Same Site, Elevated Design)

## What changed (design only, functionality preserved)
- Same pages, same features, same brand colours (#22293A, #E84393, #FFF9F2, #58B368, #2D9CDB, #00A9A5, #FF7A29) — used with intention, not everywhere at once.
- Premium design system: editorial hero, split layouts, alternating backgrounds, pillars, distinct programme cards, proper opportunity cards, event date blocks, polished forms, hover/focus states, consistent spacing/shadows/radii.
- Pages, not endless scroll: Home / About / Programmes / Leadership / Opportunities / Volunteer / Events / Gallery / Contact / Login — each is its own page view, with active nav state and 'You are on:' indicator.
- Responsive: desktop, laptop, tablet, mobile — no horizontal overflow, mobile nav collapses, grids stack.
- Security (Section 11): NO passwords are printed on the public site or in the public code. Auth uses SHA-256 hashes only. Demo accounts still work — use the private credentials provided separately (NOT in this repo). Do NOT upload any file containing passwords to GitHub.
- No backend introduced — GitHub Pages compatible. Data is stored in this browser (localStorage) for demonstration. For true production, auth + applications must move to a server + database (Node/.NET + Postgres/SQL Server, bcrypt + salt, server sessions, email verification, 2FA for Admin, server-side lockout, backups, POPIA).

## Files to upload to GitHub
- index.html (whole site — all CSS + JS inline, cannot break from missing shared.js)
- assets/img/logo.jpg (real PYM logo)
- README.md (this file)
DO NOT upload any file containing passwords.

## Real PYM details
7 Rex Street, Roodepoort, 1724, Johannesburg | positiveyoungmindsoffice@gmail.com | 066 563 2663 | @positiveyoungminds2025 | Executive Director: Mandilakhe Cqaka | Services: Mental Health Awareness and Youth Empowerment Conferences | Always open

## How to use
1. Upload all files in this folder to GitHub repo (overwrite index.html).
2. Wait 1 min, hard-refresh Ctrl+Shift+R.
3. Test: Home -> About -> Opportunities (filter/search/apply) -> Login -> Dashboard -> Provider submit -> Admin approve -> Volunteer -> Events RSVP -> Contact -> Dark Mode.
