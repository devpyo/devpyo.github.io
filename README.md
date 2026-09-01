# devpyo.github.io

Public legal pages for all apps published by [devpyo](https://github.com/devpyo/).

## URLs (after deploy)

| Document | URL |
| --- | --- |
| Legal home | https://devpyo.github.io/ |
| Privacy (KO) — **use for ASC C4** | https://devpyo.github.io/privacy.html |
| Privacy (EN) | https://devpyo.github.io/privacy-en.html |

All apps share the same master policy. Per-app differences are in the **Appendix** section and `apps.json`.

## Add a new app

1. Edit `apps.json` — add an entry under `apps`.
2. Add a row to `index.html` (apps table).
3. Add `<h3 id="...">` appendix block to `privacy.html` and `privacy-en.html`.
4. Bump `policy_version` in `apps.json` and the “최종 수정” date in both HTML files.
5. Commit and push (Pages rebuilds automatically).

## Deploy (first time)

Log in as **devpyo** (this machine is currently authenticated as Mizelan only):

```bash
cd /tmp/devpyo.github.io   # or clone after push
gh auth login                # choose devpyo account
git init
git add .
git commit -m "Add generalized privacy policy for devpyo apps"
gh repo create devpyo.github.io --public --source=. --remote=origin --push
```

GitHub Pages enables automatically for `username.github.io` on `main`.

## References used when drafting

- [Apple — App privacy details](https://developer.apple.com/app-store/app-privacy-details/)
- [Firebase — Privacy and Security](https://firebase.google.com/support/privacy)
- [Google AdMob — UMP iOS](https://developers.google.com/admob/ios/privacy)
- [Google — Privacy Policy](https://policies.google.com/privacy)
- Indie checklist patterns (SDK-scoped disclosure, stable URL, label alignment)

Not legal advice. Review before submission.
