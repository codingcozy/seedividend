---
title: "Git Clone할 때 Repository not found 에러 해결 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
isUpdated: true
---





# Git Clone Repository not found 에러 해결 방법

<div class="content-ad"></div>

git clone 명령어를 통해서 클론을 할 때 에러가 발생하는 경우가 있다.

```bash
git clone https://github.com/*****
```

```bash
remote: Repository not found
fatal: repository ~~~~ not found
```

github 레포지토리 url도 맞게 입력했는데 이런 에러가 발생했을 때는 아래 처럼 **username**을 추가해주면 된다.

```bash
git clone https://{username}@github.com/*****

```

이렇게 하면 레포지토리 클론을 할 때 발생하는 repository not found 이슈를 해결할 수 있다.
