---
title: "Choreo에서 Vite  React 앱을 만들고 배포하는 방법"
description: ""
coverImage: "/assets/img/2024-05-14-HowtoBuildandDeployaViteReactApponChoreo_0.png"
date: 2024-05-14 10:19
ogImage: 
  url: /assets/img/2024-05-14-HowtoBuildandDeployaViteReactApponChoreo_0.png
tag: Tech
originalTitle: "How to Build and Deploy a Vite + React App on Choreo"
link: "https://medium.com/@chamalsena/how-to-build-and-deploy-a-vite-react-app-on-choreo-f87049dcb0ba"
---


더블육을 전에 WSO2가 주굜한 코딩 대회에 참여했어요 (choreo.dev/cybertruck). 거기서 제가 경험해 본 내부 개발자 플랫폼인 Choreo를 탐험할 수 있었어요. 이 챌린지의 목표는 개인 개발자들이 Choreo를 경험할 수 있도록 하는 거에요.

Choreo가 뭔데요?

"Choreo는 디지털 경험을 만드는 방식을 재정의하는 내부 개발자 플랫폼이에요. Choreo는 클라우드 네이티브 애플리케이션을 원활하게 디자인하고 개발하고 배포하고 관리할 수 있게 해 주어 혁신을 불러 일으키면서 시장 진입 시간을 줄여 줘요."

그래서 오늘은 Vite+ React 앱을 Choreo에 빌드하고 배포하는 방법에 대해 설명할게요.



시작하기 전에 다음 사항이 있는지 확인하세요:


- Github 계정
- Choreo 계정(https://console.choreo.dev/로 이동하여 가입하고 조직을 생성하세요.)
 

앱 생성

터미널을 열고 다음 명령어를 실행하세요:



```js
npm create vite@latest my-project -- --template react
```

프로젝트 디렉토리로 이동하여 필요한 종속성을 설치하세요

```js
cd my-project
npm install
```

설치 프로세스를 완료한 후, IDE를 사용하여 프로젝트에 일부 변경을 가하실 수 있습니다. 이 데모에서 제가 한 작업은 다음과 같습니다.



```js
import "./App.css";

function App() {
  return (
    <>
      <h1>Choreo 데모</h1>
    </>
  );
}

export default App;
```

프로젝트를 수정한 후에 GitHub에 새 저장소를 만들고 프로젝트를 푸시하세요. Choreo 무료 평가판에서는 공개 저장소만 배포할 수 있습니다. 따라서 저장소 가시성을 공개로 설정해주세요.

이제 Choreo에서 빌드하고 배포해봅시다.

먼저, 조직 홈페이지를 볼 수 있는 console.choreo.dev로 이동해주세요.




홈페이지에서 + 프로젝트 생성을 클릭하고, 프로젝트 이름을 입력한 후 "새 프로젝트 생성"을 클릭하면 새 프로젝트가 생성됩니다.

프로젝트를 생성한 후, "단일 구성 요소 생성" 섹션 아래의 웹 애플리케이션 카드를 클릭하고 구성 요소의 이름과 설명을 입력하세요.

GitHub 저장소를 이 구성 요소에 연결하려면 "GitHub로 승인"을 클릭하고, 이를 위해 생성한 저장소를 선택하세요.



깃허브 레포지토리를 연결한 후, 데모와 관련된 필수 정보를 선택하십시오.

```js
Buildpack : React
Project directory : /
Build command : npm run build 
Build path : /dist
Node version : 20(또는 사용 중인 버전)
```

<img src="/assets/img/2024-05-14-HowtoBuildandDeployaViteReactApponChoreo_1.png" />

이제 생성 버튼을 클릭하면 컴포넌트가 성공적으로 생성됩니다.



컴포넌트가 성공적으로 생성되면 대시보드의 왼쪽 사이드바에서 빌드 섹션으로 이동하여 '최신 버전 빌드'를 클릭하세요.

![이미지](/assets/img/2024-05-14-HowtoBuildandDeployaViteReactApponChoreo_2.png)

빌드 프로세스가 완료되면 응용 프로그램을 배포할 수 있습니다.

그러려면 배포 섹션으로 이동하여 설정 카드에서 '구성 및 배포'를 클릭하세요.



![이미지](/assets/img/2024-05-14-HowtoBuildandDeployaViteReactApponChoreo_3.png)

이후에 왼쪽에 시트가 열리며 여기에서 파일 마운트와 인증 설정을 추가할 수 있습니다. 본 데모에서는 파일 마운트나 인증을 추가하지 않겠습니다. 이 부분은 건너뛰셔도 됩니다. (인증 패널에서 'Choreo Manage Authentication'을 끄는 것을 잊지 마세요)

이제 배포 버튼을 클릭하여 애플리케이션을 개발 환경에 배포할 수 있습니다. 수 분 후에 배포 상태가 성공적으로 완료되었음을 확인할 수 있습니다.

![이미지](/assets/img/2024-05-14-HowtoBuildandDeployaViteReactApponChoreo_4.png)



웹 애플리케이션을 성공적으로 호스팅했는지 확인하려면 개발 카드의 웹 앱 URL을 클릭해주세요.

이제 Vite + React 앱을 Choreo에 성공적으로 배포했습니다.

원하신다면 개발 환경 카드의 '프로모트' 버튼을 클릭하여 프로덕션 환경으로 승격시킬 수 있습니다. 게다가, 프로덕션 환경에서 애플리케이션에 대한 짧은 URL 접두사를 설정할 수도 있습니다.

![이미지](/assets/img/2024-05-14-HowtoBuildandDeployaViteReactApponChoreo_5.png)



위의 데모에 대한 내 GitHub 레포를 확인해볼 수 있어요:

https://github.com/chamals3n4/Vite-Choreo

간단히 말해서, 오늘은 Vite + React 앱을 Choreo에 빌드하고 배포하는 방법을 배웠어요. Choreo를 사용하면 클라우드 네이티브 앱을 쉽게 배포할 수 있어요.

Choreo에 대한 자세한 정보 및 고급 개념은 그들의 문서에서 찾을 수 있어요.



https://wso2.com/choreo/docs/

본 글을 읽어 주셔서 감사합니다. 즐거운 코딩 하세요!!