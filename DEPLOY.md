# 배포

로컬 경로: `/Users/mizelan/Documents/GitHub/devpyo.github.io`

## URL (배포 후)

| 문서 | URL |
| --- | --- |
| 한국어 (ASC) | https://devpyo.github.io/privacy-ko.html |
| English | https://devpyo.github.io/privacy-en.html |
| 기본 (→ KO) | https://devpyo.github.io/privacy.html |

## devpyo 계정에 새로 올리기

```bash
cd /Users/mizelan/Documents/GitHub/devpyo.github.io
unset GITHUB_TOKEN
gh auth login    # devpyo
bash scripts/deploy.sh
```

또는 GitHub 웹에서 `devpyo.github.io` 저장소를 만들고 `main`에 푸시.

## 새 앱 추가

방침 본문은 모든 앱에 공통 적용됩니다. SDK·기능이 달라지면 `privacy-ko.html` · `privacy-en.html` 본문을 갱신하고 시행일을 수정하세요.
