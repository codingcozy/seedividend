---
title: "프론트엔드와 백엔드를 한 번에 실행하는 방법"
description: ""
coverImage: "/assets/img/2024-05-12-HowtorunFrontendandBackendwithonecommand_0.png"
date: 2024-05-12 20:56
ogImage: 
  url: /assets/img/2024-05-12-HowtorunFrontendandBackendwithonecommand_0.png
tag: Tech
originalTitle: "How to run Frontend and Backend with one command?"
link: "https://medium.com/@rwijayabandu/how-to-run-frontend-and-backend-with-one-command-55d5f2ce952c"
---


<img src="/assets/img/2024-05-12-HowtorunFrontendandBackendwithonecommand_0.png" />

풀 스택을 개발할 때 각 서버를 수동으로 시작하는 것이 번거롭고 비효율적일 수 있습니다.

일반적으로 새 터미널을 열고 node server 또는 nodemon server 명령을 실행하여 node.js 백엔드를 실행하고, 별도의 터미널을 열어 npm start 명령을 실행하여 React 프론트엔드를 실행하는 것을 가정해 봅시다. 왜 위의 과정 대신 한 번에 두 가지를 실행하지 않을까요?

"concurrently" 라이브러리를 이용하거나 병렬로 여러 npm 스크립트를 실행할 수 있도록 설계된 "npm-run-all" CLI 도구를 사용하는 두 가지 효과적인 방법이 있습니다.



## 동시성 라이브러리

Concurrently 패키지에 대해 알아보겠습니다. Concurrently를 사용하면 단일 터미널에서 여러 명령 또는 스크립트를 동시에 실행하여 더 효율적인 작업 흐름을 제공합니다. 즉, package.json 파일에서 리액트 및 노드 서버를 시작하는 별도의 스크립트를 정의할 수 있고, "concurrently"가 이를 함께 실행할 수 있습니다.

먼저 프로젝트에 "concurrently"를 설치해야 합니다. npm install concurrently 명령어 또는 npm install concurrently --save-dev 명령어를 사용하세요. 보통 개발 목적으로 사용되므로 concurrently를 devDependencies로 추가하는 것이 좋습니다. 프론트엔드와 백엔드를 위한 별도의 폴더를 만들었다면, 루트 폴더에 concurrently를 설치해야 합니다.

```js
npm install concurrently 

npm install concurrently --save-dev
```



패키지. Json 파일의 메인 폴더에 있는 "start" 스크립트를 찾아서 수정해보세요. 기본 구문은 다음과 같습니다:

```js
"start": "concurrently \"script1\" \"script2\""
```

"script1"과 "script2"를 실제 실행하고 싶은 명령어로 대체하세요.

또는 다음과 같이 더 맞춤 설정할 수도 있습니다:



```js
"scripts": {
  "start": "concurrently \"npm run start:frontend\" \"npm run start:backend\"",
  "start:frontend": "cd frontend의 실제 경로 && npm start",
  "start:backend": "cd backend의 실제 경로 && node server"
}
```

"frontend의 실제 경로"와 "backend의 실제 경로"를 실제 경로로 변경하세요.

만약 별도의 frontend와 backend 폴더가 있다면 아래와 같이 적용할 수 있습니다:

```js
"start": "concurrently \"cd frontend && npm start\" \"cd backend && node server\""
```



앗, 이제 npm start를 실행하면 먼저 concurrently를 호출할 거야. 그리고 프론트엔드 코드가 있는 frontend 폴더가 있다면, frontend 디렉토리로 이동해야 해. (cd frontend) (해당 폴더로 이동하기 위한 필요한 명령어 사용) 그리고 npm start 명령어로 frontend를 실행해. 그리고 비슷하게 백엔드 코드가 있는 backend 폴더가 있다면, backend 디렉토리로 이동해야 해. (cd backend) (해당 폴더로 이동하기 위한 필요한 명령어 사용) 그리고 node server를 실행해.

더 많은 명령어를 추가하려면 위의 형식처럼 각 스크립트에 백스플래시와 따옴표를 추가해야 해. 이제 새 터미널을 여시고 주 프로젝트 폴더에서 npm start를 실행하면 프론트엔드와 백엔드를 동시에 실행할 수 있어. 이 효율적인 접근법은 생산성을 향상시키고 빠른 반복을 가능하게 하며, 궁극적으로 더 나은 개발자 경험을 제공해.

npm "concurrently"를 사용하면 여러 작업을 원활하게 관리할 수 있어 개발 워크플로우를 간소화시킬 수 있어. 효율성을 향상시키고 복잡한 프로젝트를 유지보수하기 쉽게 만들어주는 유용한 도구야.



“Concurrently"은 개발 경험을 향상시키기 위해 추가적인 사용자 정의 및 유연성 옵션을 제공합니다. Concurrently에는 개발을 훨씬 쉽게 만드는 더 많은 기능이 있습니다.

![이미지](/assets/img/2024-05-12-HowtorunFrontendandBackendwithonecommand_2.png)

## 1. Named Commands:

```js
"start": "concurrently --names 'FE,BE' \"npm run start:frontend\" \"npm run start:backend\""
```



- --names 옵션을 사용하면 실행되는 명령에 이름을 할당할 수 있어요.
- 이렇게 하면 콘솔 출력이 더 가독성 있고, 어떤 프로세스가 프론트엔드에 해당하는지 쉽게 식별할 수 있어요.

## 2. 에러 시 종료:

기본적으로 명령 중 하나라도 비정상 상태 코드(오류를 나타냄)로 종료되면, concurrently는 다른 모든 명령을 종료할 거에요. 그러나 다음 옵션으로 이 동작을 수정할 수 있어요:

- --kill-others: 한 명령이 실패해도, 이 옵션으로 다른 명령을 종료하는 걸 막을 수 있어요.
- --success first|last: 첫 번째 또는 마지막 명령이 성공하면 전체 실행을 성공으로 간주할지를 지정해요.



이것은 특히 한 곳에서 오류가 발생해도 다른 프로세스를 계속 실행하고 싶을 때 유용할 수 있습니다.

## 3. 색으로 구분된 출력:

각 명령의 출력은 기본적으로 색으로 구분됩니다.

```js
"start": "concurrently -n \"FRONTEND,BACKEND\" -c \"red,blue\" \"npm run start:frontend\" \"npm run start:backend\""
```



- -c "red,blue"는 이름이 지정된 명령에 대한 색상을 지정합니다. 이 경우, frontend 명령은 빨간색 출력을 가지고, backend 명령은 파란색 출력을 가질 것입니다.
- 색으로 구분된 출력은 서로 다른 프로세스를 시각적으로 쉽게 구별할 수 있도록 하여 로그나 오류의 원천을 빠르게 식별하는 데 도움이 됩니다.