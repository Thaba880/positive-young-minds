# TESTING MATRIX — Honest Audit (code-inspected + logic-verified, see §10)

## A. Accounts tested
| Account | Role | Login | Destination | Dashboard | Logout |
|---|---|---|---|---|---|
| youth@positiveyoungminds.org.za | Youth | ✅ hash matches | dashboards/youth.html | Apps, Saved, Vols, RSVPs, Docs, Profile, Notifications | ✅ clears session → Home |
| provider@positiveyoungminds.org.za | Provider | ✅ hash matches | dashboards/provider.html | My Submissions (own only), Submit, Edit/Delete Pending, Apps for mine, Notifications | ✅ |
| admin@positiveyoungminds.org.za | Admin | ✅ hash matches + 30-day password-age warning (warning only) | dashboards/admin.html | Pending Approve/Reject, Stats, All Apps, Vols, Users (delete non-admin), RSVPs, Audit, Change Password, Notifications | ✅ |
| New register (Youth/Provider) | Youth/Provider | ✅ min 8+number, valid email, duplicate blocked | login → own dashboard | Same as role above | ✅ |
| Wrong password / unknown email | — | ❌ 'Invalid email or password' (no info leak) | stays on login | — | — |
| Admin creation via register | — | ❌ Blocked — role dropdown has no Admin | — | — | — |

## B. Login & Routing
- Every login calls doLogin() → sha(password) vs passHash → setCurrent() (sessionStorage) → dashboardFor(role) → redirect. No role goes to the same dashboard.
- Guards: dashboards call requireRole('Youth'/'Provider'/'Admin') on load. No login → login.html + message. Wrong role → toast + bounce to THEIR dashboard in 900ms. Verified by code inspection (js/auth.js, js/dashboards.js).
- Refresh: sessionStorage persists in same tab, dashboards re-run requireRole() — previous user's data cannot leak because every render filters by current().email / provider.

## C. Dashboard functionality (verified in code)
- Youth: apps filtered by email, saved by email, vols by email, RSVPs by email, docs by email, profile edit (name+province), notifications by email.
- Provider: opps filtered by provider===email ONLY — cannot see other providers' Pending. Edit/Delete only if status==='Pending' + own. Applications for my opps only.
- Admin: pending list, approve→Approved+notify provider, reject→Rejected+notify provider, users list + delete non-admin (Admin protected), all apps/vols/RSVPs, audit, change password (hash).
- Volunteer: there is NO separate Volunteer login role in the original project. Volunteer = Youth submits volunteer application (pages/volunteer.html) → status in Youth dashboard → Admin sees it in Admin dashboard. Stated honestly, not invented.

## D. Features tested (code + journey walkthrough)
Home, About, Programmes, Leadership, Opportunities (filter/search/save/apply), Volunteer, Events (RSVP), Gallery (photo slots, no fake stock), Contact, Login/Register, Dark Mode, Eligibility, Documents, Notifications, Provider submit/edit/delete, Admin approve/reject/user mgmt, Logout, Reset Data.

## E. Issues found in previous build
1. Login stayed on login page (no redirect) — FIXED: redirect to role dashboard.
2. Dashboard was a box under login form — FIXED: separate dashboards/*.html pages.
3. Single-file, no folder structure — FIXED: professional folders.
4. No guards — Youth could type admin URL — FIXED: requireRole().
5. No saved, no notifications, no profile, no provider edit, no admin user mgmt — FIXED: all added.
6. Plaintext passwords in public code — FIXED: hashes only.
7. Dashboard pages missing in one intermediate zip (build step lost) — FIXED: this build creates all files in ONE step and lists them below.

## F. Fixes implemented — see E + js/auth.js, js/dashboards.js, js/applications.js

## G. Retesting
- Code audit: every onclick maps to a defined function (grep). Every dashboard file exists (file list below). Hashes verified: sha256 of demo passwords matches store.js hashes.
- Manual testing still required by YOU (see H): click-through in browser is the final proof — I cannot run your browser here.

## H. Outstanding / Requires backend / Manual testing
- NOT production auth: needs server, bcrypt, email verification, 2FA, rate-limit, POPIA. Do NOT use for real personal data.
- Data is browser-only, not synced across devices/users.
- No real email sending — notifications are in-app only.
- Manual browser click-through by you is still required to confirm visual rendering on your device (I verified code, not your screen).

## I. Readiness
- ✅ Ready for DEMONSTRATION and limited testing (class / WIL demo).
- ❌ NOT ready for PUBLIC USE with real users / real personal data (needs backend, see H).
