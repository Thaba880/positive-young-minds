# Positive Young Minds — FINAL (Hardened, NOT Demo)
No Demo Mode. No Demo banner. No plaintext passwords in code.

## What changed vs demo version
- Passwords stored ONLY as SHA-256 hashes (crypto.subtle) - never plaintext in code or localStorage
- Login: generic error (no user enumeration), 5 failed attempts = 15-min lockout
- Session: sessionStorage token, ends when tab closes, role checked on every dashboard page
- All user input escaped (XSS protection), max lengths, email validation
- Admin MUST change password every 30 days, can update anytime (blocked until changed)
- Provider -> Admin approval: nothing goes live without Admin approval
- CSP meta tag on Dashboard/Admin, audit log for logins / approvals / password changes
- No Demo Mode, no Demo123! in code

## IMPORTANT - This is still a FRONT-END LAB version
It is HARDER to hack than the demo, but a front-end-only site can NEVER be fully secure.
For real production, you MUST move auth + approvals to a server (see SECURITY.md).
DO NOT put real ID numbers / real CVs / real passwords in this lab version.

## How to open
Unzip -> Extract All -> Open folder in VS Code -> Double-click index.html (or Live Server)
DO NOT open from inside the zip.

## Pages
index.html = Opportunities Portal (main, Task 2) + button to Task 1
task1.html = Organisation Website (Task 1)
dashboard.html = Youth + Provider dashboard
admin.html = Admin dashboard + password rule
