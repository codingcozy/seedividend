---
title: "프로젝트에 따라 Nodejs의 올바른 버전으로 자동 전환하기"
description: ""
coverImage: "/assets/img/2024-05-12-AutomaticallySwitchtoCorrectVersionofNodeJsBasedonProject_0.png"
date: 2024-05-12 19:36
ogImage: 
  url: /assets/img/2024-05-12-AutomaticallySwitchtoCorrectVersionofNodeJsBasedonProject_0.png
tag: Tech
originalTitle: "Automatically Switch to Correct Version of NodeJs Based on Project"
link: "https://medium.com/@engrmafzaalch/automatically-switch-to-correct-version-of-nodejs-based-on-project-2880fbfef44e"
---


Node.js 개발의 끊임없이 변화하는 풍경 속에서는 다양한 프로젝트 요구 사항과 호환성 문제를 관리하는 것이 부담스러운 작업일 수 있습니다. 이 기사에서는 프로젝트의 요구 사항에 기반하여 Node.js의 올바른 버전으로 자동 전환하는 컨셉을 탐구합니다.

NVM이란 무엇인가요?
NVM, Node Version Manager, 여러 개의 Node.js 설치를 시스템에서 원활하게 관리하는 데 사용되는 go-to 솔루션입니다. 다양한 Node.js 버전 요구 사항을 가진 여러 프로젝트에서 작업하는 개발자이거나 최신 기능과 업데이트를 탐구하고 싶어하는 열정적인 사용자라면, NVM은 몇 가지 간단한 명령어로 다양한 Node.js 버전 간에 간편하게 전환할 수 있도록 해줍니다.

NVM GitHub 레포지토리에서 예시를 확인해보세요

```js
$ nvm use 16
Now using node v16.9.1 (npm v7.21.1)
$ node -v
v16.9.1
$ nvm use 14
Now using node v14.18.0 (npm v6.14.15)
$ node -v
v14.18.0
$ nvm install 12
Now using node v12.22.6 (npm v6.14.5)
$ node -v
v12.22.6
```



.nvmrc이 무엇인가요?

Node.js 생태계에서 .nvmrc 파일은 Node Version Manager(nvm)에서 사용되는 간단한 구성 파일입니다. 이 파일은 일반적으로 프로젝트의 루트 디렉토리에 위치하며 해당 프로젝트에서 작업할 때 사용해야 하는 특정 Node.js 버전을 지정합니다.

![사진](/assets/img/2024-05-12-AutomaticallySwitchtoCorrectVersionofNodeJsBasedonProject_0.png)

.nvmrc 파일 만들기 및 사용하기



"`.nvmrc` 파일을 만들고 사용하는 것은 매우 간단합니다.

1. 프로젝트 디렉토리로 이동합니다.

2. `.nvmrc`라는 새 파일을 만들고 원하는 노드 버전을 입력합니다.

여기 샘플 내용 파일이 있습니다."



```js
v18.18.2
```

3. 터미널에서 nano ~/.bashrc를 입력하여 .bashrc를 엽니다.

4. 이 코드를 .bashrc 파일 끝에 붙여넣고 저장하세요.

```js
# .nvmrc 파일이 있으면 .nvmrc의 노드 버전을 사용합니다.

# 터미널이 시작될 때 호출
if [[ -f .nvmrc ]]
then
  nvm use
fi

# cd 명령어를 통해 디렉토리가 변경될 때 호출
function cd() {
 builtin cd "$@"
  if [[ -f .nvmrc ]]
  then
    nvm use
  fi
}
```



5. 컴퓨터를 다시 부팅하거나 터미널에서 다음 명령어를 입력하여 다시 시작하세요: source .bashrc

6. 이제 .nvmrc 파일이 있는 디렉토리에서 터미널을 열 때마다 터미널이 노드 버전을 자동으로 전환할 것입니다.

이것은 .nvmrc 파일이 있는 모든 프로젝트에 대해 작동할 것입니다.

요약하자면, 다음에 프로젝트를 시작할 때 .nvmrc 파일을 생성하고 버전 관련 문제를 해결하세요.