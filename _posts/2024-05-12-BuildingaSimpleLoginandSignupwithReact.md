---
title: "React를 사용하여 간단한 로그인 및 가입 페이지 만들기"
description: ""
coverImage: "/assets/img/2024-05-12-BuildingaSimpleLoginandSignupwithReact_0.png"
date: 2024-05-12 19:49
ogImage: 
  url: /assets/img/2024-05-12-BuildingaSimpleLoginandSignupwithReact_0.png
tag: Tech
originalTitle: "Building a Simple Login and Signup with React"
link: "https://medium.com/@thirdmarch0303/building-a-simple-login-and-signup-with-react-773ad5444fbc"
---


이 블로그 포스트에서는 React를 더 깊게 다루며, 웹 애플리케이션을 위한 기본적인 로그인 및 회원가입 기능을 만드는 방법을 보여드릴 거에요. 이것들은 대부분의 웹 애플리케이션에 필수적인 기능이에요.

시작하기 전에, 이전 블로그 포스트에서 언급된 설정을 완료했는지 확인해 주세요. Node.js를 설치하고 React 프로젝트를 생성하지 않았다면, 이전 포스트의 “시작하기" 섹션을 참고해 주세요.

React의 컴포넌트 기반 구조, 상태 관리, 그리고 클라이언트 사이드 라우팅을 활용하여 로그인 및 회원가입 기능을 구현하는 방법을 알아보겠습니다.

## 단계 1.



프로젝트 설정하기
터미널이나 명령 프롬프트를 열고 로그인 및 가입 앱을 생성할 디렉토리로 이동하세요. 다음 명령어를 실행하여 새로운 React 프로젝트를 생성합니다.

```js
$ npx create-react-app login-signup-app
$ cd login-signup-app
$ npm start
```

## 단계 2.

프로젝트 구조
생성된 React 프로젝트에는 필수 파일과 폴더가 미리 정의된 구조로 포함되어 있습니다. 우리 앱에서 주로 작업할 파일은 src/App.js 및 src/App.css 파일입니다. 또한 로그인 및 가입에 필요한 파일을 만들기 위해 components 폴더를 src에 생성합니다.



## 단계 3.

src/components 폴더에 로그인 및 가입 컴포넌트 만들기 새로운 두 개의 파일을 만드세요:

3-1. Login.js 컴포넌트

Login.js는 로그인 폼과 인증을 관리합니다. useState 훅을 사용하여 상태 변수인 이메일과 비밀번호를 생성합니다. handleLogin 함수는 폼 제출 시 트리거되며 입력된 이메일과 비밀번호를 기록합니다.



![이미지](/assets/img/2024-05-12-BuildingaSimpleLoginandSignupwithReact_0.png)

3-2. Signup.js 컴포넌트

Signup.js는 사용자 등록을 위한 Login.js와 유사합니다. useState 훅을 사용하여 상태 변수 이메일, 비밀번호, 확인 비밀번호를 관리합니다. handleSignup 함수는 등록 로직을 처리하며, 폼 제출 시 트리거됩니다.

![이미지](/assets/img/2024-05-12-BuildingaSimpleLoginandSignupwithReact_1.png)



## 단계 4.

React Router를 사용하여 클라이언트 사이드 라우팅을 설정하세요.

- React Router 설치하기:

```js
$ npm install react-router-dom
```



이제 src/App.js를 업데이트해주세요

![Building a Simple Login and Signup with React](/assets/img/2024-01-12-BuildingaSimpleLoginandSignupwithReact_2.png)

## 단계 5.

앱 스타일링하기 src/App.css에서 앱을 시각적으로 매력적으로 만들기 위해 기본 스타일을 추가하세요:



<img src="/assets/img/2024-05-12-BuildingaSimpleLoginandSignupwithReact_3.png" />

## 단계 6.

앱 테스트 변경 사항을 저장하고 개발 서버가 실행 중인지 확인하세요. 웹 브라우저를 열고 http://localhost:3000으로 이동합니다.

<img src="/assets/img/2024-05-12-BuildingaSimpleLoginandSignupwithReact_4.png" />



![이미지](/assets/img/2024-05-12-BuildingaSimpleLoginandSignupwithReact_5.png)

먼저 로그인 양식을 볼 수 있어야 하며, 네비게이션에서 “가입" 링크를 클릭하면 회원 가입 양식으로 이동됩니다.

# 결론

이 블로그 포스트에서 React를 사용하여 간단한 로그인 및 회원 가입 기능을 구현하는 방법을 보여주었습니다. React Router를 사용하여 이러한 페이지 간에 쉽게 전환할 수 있습니다. 이 데모는 기본 구현이지만, 데이터 지속성, 유효성 검사 및 현실적인 사용자 인증과 같은 추가 기능을 추가하여 확장할 수 있습니다.