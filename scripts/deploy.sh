#!/usr/bin/env bash
# Deploy to https://github.com/devpyo/devpyo.github.io (Pages: https://devpyo.github.io/)
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

unset GITHUB_TOKEN

user="$(gh api user --jq .login 2>/dev/null || true)"
if [[ "$user" != "devpyo" ]]; then
  echo "devpyo 계정으로 로그인 필요:" >&2
  echo "  unset GITHUB_TOKEN" >&2
  echo "  gh auth login -h github.com -p https -w" >&2
  exit 1
fi

if gh repo view devpyo/devpyo.github.io >/dev/null 2>&1; then
  git remote remove origin 2>/dev/null || true
  git remote add origin "https://github.com/devpyo/devpyo.github.io.git"
  git push -u origin main
else
  gh repo create devpyo.github.io --public --description "Legal pages for devpyo apps" --source=. --remote=origin --push
fi

echo "Done. Privacy URL: https://devpyo.github.io/privacy.html"
