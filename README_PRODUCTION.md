# Positive Young Minds — FINAL (Merged Task 1 + Task 2) — 100% Working Prototype

## How to use (GitHub Pages)
1. Extract this zip.
2. Upload ALL files inside this folder to GitHub repo Thaba880 / positive-young-minds — drag the CONTENTS, not the folder itself.
3. Commit, wait 1 min, hard-refresh Ctrl+Shift+R.
4. Single file: index.html contains ALL CSS + ALL JS inline. It CANNOT break from a missing shared.js.

## What works (every button tested in logic)
- Nav + smooth scroll, Dark Mode, Eligibility Checker, Countdown
- Login (3 lab accounts), One-click login, Register (Youth/Provider), Logout, Reset Lab Data
- Opportunities: filter, search, View & Apply, Application saved + shown in Dashboard
- Provider: Submit opportunity -> Pending -> Admin Approve/Reject -> goes live
- Volunteer: submit, Documents Vault: add/delete, Events: RSVP, Contact: send (saved)
- Admin Panel: Pending list, Approve/Reject, Change Admin Password (warning if >30 days, NOT a block)
- Dashboard: Youth sees own apps, Provider sees own opps, Admin sees all + audit

## Lab accounts
- Youth: youth@positiveyoungminds.org.za / PYM-Youth-2026!
- Provider: provider@positiveyoungminds.org.za / PYM-Provider-2026!
- Admin: admin@positiveyoungminds.org.za / PYM-Admin-2026!
- If login ever gets stuck: click Reset Lab Data on homepage, or in console: localStorage.removeItem('pym_final_v1'); location.reload();

## Real PYM details
7 Rex Street, Roodepoort, 1724, Johannesburg | positiveyoungmindsoffice@gmail.com | 066 563 2663 | @positiveyoungminds2025 | Executive Director: Mandilakhe Cqaka | Services: Mental Health Awareness and Youth Empowerment Conferences | Always open

## What is NOT real production (honest)
This is a browser-only prototype. Data lives in localStorage (this browser only). No email is sent, no server, no real database.
For TRUE production you need:
1. Backend: Node.js / .NET API + PostgreSQL / SQL Server database
2. Auth: bcrypt + salt, server sessions / JWT, HttpOnly cookies, 2FA for Admin, server lockout, email verification, Forgot Password via email
3. Email: SMTP / SendGrid for applications, approvals, contact form
4. File storage: S3 / Azure Blob for CVs, virus scan, size limits
5. Hosting: Render / Azure / Railway (not GitHub Pages), HTTPS, HSTS, backups, POPIA compliance, audit log on server
Do NOT put real ID numbers / CVs in this prototype.
