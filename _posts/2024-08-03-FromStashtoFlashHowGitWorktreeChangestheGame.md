---
title: "Git Worktree 스태시 대신 플래시로 게임을 바꾸는 방법"
description: ""
coverImage: "/assets/img/2024-08-03-FromStashtoFlashHowGitWorktreeChangestheGame_0.png"
date: 2024-08-03 19:03
ogImage: 
  url: /assets/img/2024-08-03-FromStashtoFlashHowGitWorktreeChangestheGame_0.png
tag: Tech
originalTitle: "From Stash to Flash How Git Worktree Changes the Game"
link: "https://medium.com/@deepaksuryas/from-stash-to-flash-how-git-worktree-changes-the-game-67d1fa6e6b8b"
isUpdated: true
---




기존에 깃(Git)에서 여러 브랜치나 변경 사항을 번갈아가며 작업하면서 더 부드러운 경험을 바라본 적이 있나요? 그렇다면 Git Worktree를 소개합니다.

Git Worktree를 사용하면 하나의 저장소 내에서 동시에 여러 브랜치를 확인할 수 있습니다. 이는 여러 브랜치에서 동시에 작업할 수 있어 변경 사항을 숨기거나 컨텍스트를 변경할 필요가 없다는 뜻입니다.

아래와 같이 사용할 수 있습니다:

```js
git worktree add       # 새로운 작업 디렉터리 추가
git worktree list      # 모든 작업 디렉터리 나열
git worktree remove    # 작업 디렉터리 삭제
```

<div class="content-ad"></div>

<img src="/assets/img/2024-08-03-FromStashtoFlashHowGitWorktreeChangestheGame_0.png" />

# Git 워크트리와 Git 스태시 비교

## 진정한 병렬 개발

Git Worktree

<div class="content-ad"></div>

- 여러 디렉토리에서 동시에 여러 브랜치를 체크아웃할 수 있습니다.
- 이렇게 하면 계속해서 컨텍스트를 전환할 필요가 줄어듭니다.
- 파일 시스템이 Git 브랜치 전략을 반영하기 때문에 더 깔끔한 메인트 모델이 됩니다.

```js
project/
├── main/
├── feature-a/
└── bugfix-123/
```

Git Stash

- 변경 사항을 저장하고 브랜치를 전환한 다음 다시 적용해야 하는 번거로움이 있습니다.
- 병렬로 여러 브랜치에서 진정한 작업을 수행할 수 있는 기능이 없습니다.

<div class="content-ad"></div>

## 작업 흐름 및 시간 효율성

**Git Worktree**

- 동시에 여러 기능 또는 버그 수정 작업을 수행해야 하는 경우에 이상적입니다.
- 땀 없이 브랜치 간을 왔다갔다 할 수 있습니다. (Smooth Operator by Sade)
- 주 브랜치 옆에 PR 브랜치를 유지하여 코드 리뷰를 간편하게 만듭니다.

**Git Stash**

<div class="content-ad"></div>

- 빠른 전활을 위해 좋지만 변경 사항을 숨기고 되돌려야 합니다
- 문제가 생길 수 있어요. 업무의 흐름을 막을 수 있어요.

# 메트릭

상상해봐: A 기능에 정신을 집중하고 있지만 B 기능에 있는 버그를 고쳐야 할 때.

Git Worktree

<div class="content-ad"></div>

- 버그 수정을 위한 새 작업트리를 만들고 수정한 후 다시 feature A로 전환하는 데 약 10초가 걸려요. 정말이지!
- 일일 시간: 10초 * 5 = 50초
- 월별 시간 (20일 근무일): 50초 * 20 = 16.67분

Git Stash

- 변경 사항을 숨기고 브랜치를 전환하고 스태시를 팝하는 루틴에 대해 아실 거예요.
- 스태시, 브랜치 전환 및 스태시 팝하는 데 걸리는 시간: 약 1분
- 일일 시간: 1분 * 5 = 5분
- 월별 시간 (20일 근무일): 5분 * 20 = 100분

![이미지](/assets/img/2024-08-03-FromStashtoFlashHowGitWorktreeChangestheGame_1.png)

<div class="content-ad"></div>

다음은 worktree 작업 흐름입니다.

```js
# 새로운 worktree 생성
git worktree add ../feature-branch feature-branch

# 새 worktree 디렉토리로 전환
cd ../feature-branch

# 변경사항을 적용하고 평소처럼 커밋
git add .
git commit -m "새로운 기능 구현"

# 메인 worktree로 돌아가기
cd -

# 모든 worktree 목록 확인
git worktree list

# 더 이상 필요하지 않은 worktree 삭제
git worktree remove ../feature-branch
```

그리고 다음은 stash 작업 흐름입니다.

```js
# 현재 변경사항을 stash에 저장
git stash save "기능 X에 대한 작업 진행 중"

# 브랜치나 컨텍스트 변경
git checkout another-branch

# 일부 작업 수행 후 원래 브랜치로 돌아가기
git checkout original-branch

# stash에 저장한 변경사항 적용
git stash apply

# 또는 stash 적용하고 stash 목록에서 삭제
git stash pop

# 모든 stash 목록 보기
git stash list

# 모든 stash 삭제
git stash clear
```

<div class="content-ad"></div>

# 결론

Git Worktree를 사용하면 여러 브랜치를 번갈아가며 작업할 때 훨씬 많은 시간을 절약할 수 있습니다. Git Stash은 빠른 변경 사항에 유용하지만, Git Worktree는 동시에 여러 작업을 처리하는 효율적인 워크플로우를 제공합니다.

그래서 다음에 브랜치 간을 이동할 때 Git Worktree를 한 번 시도해 보세요. 당신의 생산성을 높일 수 있는 게임 체인저가 될지도 모릅니다.

즐거운 코딩하세요!