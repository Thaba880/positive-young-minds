SECURITY LAB GUIDE — FOR INSTRUCTOR ONLY
Lab accounts (see README_PRODUCTION.md). Do NOT publish with public link.
Admin: admin@positiveyoungminds.org.za / PYM-Admin-2026!
Youth: youth@positiveyoungminds.org.za / PYM-Youth-2026!
Provider: provider@positiveyoungminds.org.za / PYM-Provider-2026!

This is front-end only. Passwords are compared in JS in this final prototype for reliability on GitHub Pages (no backend). For production, move auth to server with bcrypt + salt (see README_PRODUCTION.md).
Test: try wrong password, try accessing Admin without login, try XSS <script>alert(1)</script> in application (should be escaped), try approving own Pending as Provider (should be blocked unless Admin), try Reset Lab Data.
