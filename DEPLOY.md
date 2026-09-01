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

1. `apps.json`에 항목 추가
2. `privacy-ko.html` · `privacy-en.html` 부록에 `<h3>` 블록 추가
3. `index.html` 앱 목록 갱신
