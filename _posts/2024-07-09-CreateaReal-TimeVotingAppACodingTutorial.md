---
title: "실시간 투표 앱 만들기 튜토리얼 코드 예제 포함"
description: ""
coverImage: "/assets/img/2024-07-09-CreateaReal-TimeVotingAppACodingTutorial_0.png"
date: 2024-07-09 13:59
ogImage: 
  url: /assets/img/2024-07-09-CreateaReal-TimeVotingAppACodingTutorial_0.png
tag: Tech
originalTitle: "Create a Real-Time Voting App: A Coding Tutorial"
link: "https://medium.com/@learntocodetoday/create-a-real-time-voting-app-a-coding-tutorial-55ef0f2629da"
isUpdated: true
---



![Tutorial Image](/assets/img/2024-07-09-CreateaReal-TimeVotingAppACodingTutorial_0.png)

Building a real-time voting app is a great way to learn about web development, real-time communication, and database management. In this tutorial, we will use Node.js, Express, and Socket.io to create a voting app that allows users to vote on options and see the results in real-time.

## Prerequisites

Before you start, ensure you have:

<div class="content-ad"></div>

- HTML, CSS, 그리고 JavaScript에 대한 기본 지식이 있어야 합니다.
- 컴퓨터에 Node.js와 npm(Node Package Manager)가 설치되어 있어야 합니다.
- 텍스트 편집기(예: VSCode, Sublime Text, 또는 Atom)가 필요합니다.

# 단계 1: 프로젝트 설정하기

프로젝트를 위한 새 디렉토리를 만들고 새로운 Node.js 프로젝트를 초기화하세요:

```js
mkdir real-time-voting-app
cd real-time-voting-app
npm init -y
```

<div class="content-ad"></div>

필요한 종속성을 설치해주세요:

```js
npm install express socket.io
```

# 단계 2: 프로젝트 구조 설정

프로젝트를 위해 다음 디렉토리와 파일을 생성해주세요:

<div class="content-ad"></div>

프로젝트 구조:

```js
real-time-voting-app/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── index.html
├── server.js…
```
