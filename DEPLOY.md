# devpyo.github.io 배포

## 방법 A — 웹 Import (CLI 없이, devpyo 브라우저 로그인)

1. **devpyo** 계정으로 GitHub 로그인
2. https://github.com/new/import?name=devpyo.github.io&url=https%3A%2F%2Fgithub.com%2FMizelan%2Fdevpyo-legal-staging
3. Owner: **devpyo**, Repository name: **devpyo.github.io** 확인 → **Begin import**
4. 완료 후 https://devpyo.github.io/privacy.html 접속 확인
5. (선택) 임시 저장소 `Mizelan/devpyo-legal-staging` 삭제

## 방법 B — GitHub CLI

```bash
cd /Users/mizelan/Documents/GitHub/devpyo.github.io
unset GITHUB_TOKEN
gh auth login -h github.com -p https -w   # devpyo 계정 선택
bash scripts/deploy.sh
```

## ASC URL

```
https://devpyo.github.io/privacy.html
```
