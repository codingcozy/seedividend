---
title: "React와 Vite 앱을 Netlify에 배포하는 방법"
description: ""
coverImage: "/assets/img/2024-05-12-HowtoDeployaReactandViteApptoNetlify_0.png"
date: 2024-05-12 19:48
ogImage: 
  url: /assets/img/2024-05-12-HowtoDeployaReactandViteApptoNetlify_0.png
tag: Tech
originalTitle: "How to Deploy a React and Vite App to Netlify"
link: "https://medium.com/@lucasrosvall/how-to-deploy-a-react-and-vite-app-to-netlify-9bcf57890d10"
isUpdated: true
---




<img src="/assets/img/2024-05-12-HowtoDeployaReactandViteApptoNetlify_0.png" />

오늘은 새로운 React 앱을 Vite를 사용하여 Netlify에 푸시하다가 몇 가지 오류를 만났는데, 그것이 이 기사를 쓰게 된 계기입니다.

여기에서는 Netlify에 React와 Vite 앱을 설정하고 배포하고 디버깅하는 과정을 안내할 텐데, 이를 통해 더 원할하게 진행하실 수 있도록 도와드리겠습니다.

# 프로젝트 설정하기



먼저 React 프로젝트를 생성해야 합니다. Vite는 빠른 빌드 시간과 기본적인 최적화 기능으로 인해 점점 더 인기를 얻고 있어요.

Vite를 사용하여 새로운 React 프로젝트를 설정하려면 간단히 다음을 실행하세요:

```js
npm create vite@latest my-react-app --template react
```

프로젝트를 생성한 후에는 새로운 디렉토리로 이동하고 다음 명령을 사용하여 필요한 종속성을 설치하세요:



```js
npm install
```

이제 `npm run dev`를 실행하고 http://localhost:5173/ 로 이동하여 프로젝트를 확인할 수 있습니다.

대단해요, 이제 작동하는 React 및 Vite 앱을 갖게 되었어요.

일반적으로 앱을 배포하기 전에 앱을 개발하는 것이 다음 단계입니다. 하지만 이 기사는 배포 프로세스에 초점을 맞추고 있으므로, Netlify로의 배포를 준비하는 과정으로 들어가 봅시다.



# React 앱을 Netlify에 배포하기

Netlify는 다양한 프론트엔드 애플리케이션을 배포하는 데에 좋은 도구입니다. GitHub 저장소를 Netlify에 연결하면, 주요 브랜치에 변경 내용을 푸시할 때마다 업데이트를 배포해줍니다.

GitHub 저장소를 Netlify에 연결하는 것도 매우 간단합니다.

보통 Vite 프로젝트의 경우 npm run build와 같은 빌드 명령어를 설정하고, 공개 디렉토리를 dist/로 선택하면 됩니다. 이렇게 하면 Netlify가 프로젝트를 빌드하는 방법과 게시할 파일을 어디에서 가져올지 알 수 있습니다.



<img src="/assets/img/2024-05-12-HowtoDeployaReactandViteApptoNetlify_1.png" />

## Netlify 배포 설정하기:

- GitHub 저장소 연결: Netlify 대시보드로 이동하여 "Git에서 새 사이트 만들기"를 클릭하여 GitHub 계정을 연결하고 프로젝트가 저장된 저장소를 선택할 수 있습니다.
- 빌드 설정 구성: 설정 중에 Netlify는 빌드 명령어와 게시할 디렉토리를 요청합니다. 여기에 빌드 명령어인 npm run build와 디렉토리 dist/를 입력합니다.
- 배포: 빌드 설정을 구성한 후, "사이트 배포" 버튼을 클릭하여 사이트를 배포합니다.

모든 작업이 순조롭게 진행되면 몇 분 내에 사이트가 라이브 상태가 됩니다. Netlify에서 제공하는 링크를 클릭하여 배포된 사이트를 확인할 수 있습니다.



# 일반적인 오류 및 해결책

배포 중에 여러 오류를 겪었습니다. 한 가지 흔한 문제는 Netlify에서 환경 변수가 제대로 구성되지 않아 빌드에 실패한 것이었습니다.

이를 해결하기 위해 Netlify UI에서 '사이트 설정 - 빌드 및 배포 - 환경 변수'에서 이러한 변수를 수동으로 추가해야했습니다.

다른 오류는 하위 페이지를 다시로드할 때 404 페이지를 찾을 수 없습니다는 라우팅 문제가 있었습니다.



<h2>이 문제는 public 디렉토리에 다음 내용을 포함하는 _redirects 파일을 추가함으로써 해결되었습니다:</h2>

```js
/*    /index.html   200
```

이를 통해 모든 라우팅이 Netlify의 서버가 아닌 React Router로 처리되도록 보장됩니다.



읽어주셔서 감사합니다!