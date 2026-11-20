# SECURITY LAB GUIDE — FOR INSTRUCTOR ONLY
Give these credentials to cybersecurity students for testing. Do NOT publish them publicly.
They are NOT in the code - only SHA-256 hashes are in assets/js/shared.js.

## Lab Accounts
- Admin: admin@positiveyoungminds.org.za / PYM-Admin-2026!
  - NOTE: Admin last changed 2026-10-15 = 36 days ago, so Admin WILL see forced password change on first login (30-day rule). That is intentional - test it, change it, then continue.
- Youth: youth@positiveyoungminds.org.za / PYM-Youth-2026!
- Provider: provider@positiveyoungminds.org.za / PYM-Provider-2026!

## Suggested Test Tasks (no exploit steps given)
1. Try to read a password from the code / localStorage. What do you find? Why is a hash not a password?
2. Try 6 wrong passwords. What happens? Clear localStorage and try again - what does that prove about client-side lockout?
3. Try to access dashboard.html / admin.html without logging in. What happens?
4. Try to submit <script>alert(1)</script> as an opportunity title / application. What happens? (Should be escaped)
5. Try to approve your own Pending opportunity as Provider (without Admin). Can you?
6. Try to use an old Admin session after logout. Can you?
7. Check audit log after each action. What is logged / not logged?
8. Write a report: for each finding, state Impact (Low/Med/High) and Production Fix (see SECURITY.md).

## Grading note
A good report does NOT say 'site is unhackable'. It says 'harder than demo, but still front-end-only, so production needs server-side controls'.
