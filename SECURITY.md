# Security — What Is Hardened, What Is Still Testable, What Production Needs
## Hardened in this version
1. Passwords: SHA-256 hashes only, via Web Crypto. No plaintext password anywhere in .html/.js/.css
2. Login: generic 'Invalid email or password' - attacker cannot tell if email exists
3. Brute-force: 5 fails = 15-min lockout per email (stored in localStorage)
4. Session: sessionStorage token, role checked on Dashboard/Admin load, logout clears it
5. XSS: all rendered user content escaped via esc(), maxlengths, email regex
6. Admin password: forced change every 30 days, min 8 + number, dashboard blocked until changed
7. Authorisation: Provider can only submit Pending, Admin only can Approve/Reject (in JS)
8. Audit log: every login, application, approval, rejection, password change logged
9. CSP meta on Dashboard/Admin, no external scripts, no tracking
10. No Demo Mode, no demo credentials in code, no bypass button

## Still intentionally testable for Cybersecurity students (LAB)
This is a front-end-only lab. Students SHOULD be able to find (with effort):
- Data is in browser localStorage (they can inspect, but passwords are hashes, not plaintext)
- Lockout is client-side (can be bypassed by clearing localStorage - that IS the lesson: client-side controls are not real security)
- Role check is client-side (same lesson)
- No HTTPS / server validation in this lab build
- Hashes are unsalted SHA-256 (students can discuss why salt + bcrypt/Argon2 is needed in production)
- No rate-limit on server (because there is no server)

## What PRODUCTION would need (for report)
- Real server (Node/.NET) + database, passwords with bcrypt/Argon2 + salt
- Server-side session (HttpOnly Secure cookie), server-side role checks on EVERY request
- HTTPS everywhere, HSTS, secure headers
- Server-side lockout + CAPTCHA, email verification, 2FA for Admin
- Input validation + parameterised queries on server (SQL injection protection)
- File upload scanning, size limits, virus scan for CVs
- Backups, logging to server (not browser), POPIA compliance

## Rules for Cybersecurity testing
- Test ONLY this lab copy, on your own machine. Do NOT test the live PYM site, school systems, or anyone else's site.
- Do NOT upload real personal data. Use lab accounts only.
- Report findings with: vulnerability, impact, evidence (screenshot), fix (see list above).
