---
title: "Docker 이미지를 빌드하고 GitHub Actions를 사용하여 Docker Hub에 푸시하기"
description: ""
coverImage: "/assets/img/2024-05-17-BuildPushtheDockerimagetoDockerHubusingGitHubActions_0.png"
date: 2024-05-17 03:47
ogImage: 
  url: /assets/img/2024-05-17-BuildPushtheDockerimagetoDockerHubusingGitHubActions_0.png
tag: Tech
originalTitle: "Build , Push the Docker image to Docker Hub using GitHub Actions"
link: "https://medium.com/overcast-blog/build-push-the-docker-image-to-docker-hub-using-github-actions-74f20d47c483"
isUpdated: true
---




<img src="/assets/img/2024-05-17-BuildPushtheDockerimagetoDockerHubusingGitHubActions_0.png" />

여기서는 GitHub actions workflow를 사용하여 도커 이미지를 빌드하고 도커 허브에 푸시하는 방법을 알아보겠습니다.

## 단계 1: 도커 파일 만들기

- 도커 이미지를 빌드하려면 도커 파일을 만들어야 합니다.
- 이 튜토리얼에서는 매우 기본적인 도커 파일을 만들고 해당 파일을 사용하여 이미지를 빌드할 것입니다.
- Dockerfile을 만들고 아래 코드를 추가하세요.

<div class="content-ad"></div>

```js
# Docker Hub에서 공식 Apache HTTP 서버 이미지를 사용하세요
FROM httpd:latest

# 호스팅을 위해 사용자 정의 'index.html'을 Apache 서버의 루트 디렉토리에 복사하세요
COPY ./index.html /usr/local/apache2/htdocs/
```

- 위의 코드는 다음 단계에서 생성할 사용자 정의 index.html을 사용하여 Apache 이미지 위에 이미지를 빌드합니다.

## 단계 2: index.html 파일 생성

- index.html 파일을 생성하고 아래 코드를 추가하세요.

<div class="content-ad"></div>

```js
<!DOCTYPE html>
<html>
<head>
    <title>Hello World</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is a simple HTML page served from an Apache server in a Docker container.</p>
</body>
</html>
```

### 단계 3: 도커 허브 자격 증명 저장

- 도커 이미지를 도커 허브로 푸시하려면 먼저 도커 허브에 로그인해야 합니다. 따라서 해당 자격 증명을 시크릿에 저장해야 합니다.
- 귀하의 저장소에서 자격 증명을 시크릿에 저장하세요.

![이미지](/assets/img/2024-05-17-BuildPushtheDockerimagetoDockerHubusingGitHubActions_1.png)
  

<div class="content-ad"></div>

## 단계 4: GitHub 액션 워크플로우 생성하기

- 이제 .github/workflow/image-build.yml 파일을 만들고 아래 코드를 추가하세요.

```js
name: Build Docker Image
on:
  push:
    branches:
      - main
jobs:
    build:
      name: push docker image to docker hub
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v2
        - name: login to docker hub
          id: docker-hub
          env:
            username: ${secrets.DOCKERHUB_USERNAME}
            password: ${secrets.DOCKERHUB_PASSWORD}
          run: |
            docker login -u $username -p $password 
        - name: build the docker image
          id: build-docker-image
          run: |
            ls -la 
            docker build . -f Dockerfile -t dhruvin30/demo-image-test:latest
        - name: push the docker image
          id: push-docker-image
          run: docker push ${secrets.DOCKERHUB_USERNAME}/demo-image-test:latest
```

- 위 워크플로우는 main 브랜치에 커밋할 때마다 트리거됩니다.
- 워크플로우는 secrets(사용자 이름 및 비밀번호)를 사용하여 docker hub에 로그인합니다.

<div class="content-ad"></div>

## 단계 5: 코드를 커밋합니다

- 이제 코드를 GitHub 저장소에 커밋하고 커밋하자마자 워크플로가 실행되는 것을 볼 수 있습니다.

![이미지](/assets/img/2024-05-17-BuildPushtheDockerimagetoDockerHubusingGitHubActions_2.png)

## 단계 6: 변경 사항 확인하기

<div class="content-ad"></div>

- 한 번 Workflow가 성공적으로 실행되면 이미지가 도커 허브에 표시될 것입니다.

![이미지](/assets/img/2024-05-17-BuildPushtheDockerimagetoDockerHubusingGitHubActions_3.png)

오늘은 여기까지입니다. GitHub Actions를 사용하여 도커 이미지를 빌드하고 푸시하는 방법을 배웠습니다. 이제 코드를 수정하고 실험해보세요.

LinkedIn에서 팔로우해주세요.

<div class="content-ad"></div>

더 이런 이야기를 보고 싶다면 팔로우해 주세요 😁