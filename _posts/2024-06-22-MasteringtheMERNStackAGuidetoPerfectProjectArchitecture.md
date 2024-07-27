---
title: "MERN 스택 완벽 정복 최적의 프로젝트 아키텍처 가이드"
description: ""
coverImage: "/assets/img/2024-06-22-MasteringtheMERNStackAGuidetoPerfectProjectArchitecture_0.png"
date: 2024-06-22 05:57
ogImage: 
  url: /assets/img/2024-06-22-MasteringtheMERNStackAGuidetoPerfectProjectArchitecture_0.png
tag: Tech
originalTitle: "Mastering the MERN Stack: A Guide to Perfect Project Architecture"
link: "https://medium.com/@ahmad_mahmood/mastering-the-mern-stack-a-guide-to-perfect-project-architecture-020605828ad0"
---


MERN 스택은 MongoDB, Express, React 및 Node.js로 구성된 인기있는 웹 개발 프레임워크입니다. MongoDB는 유연한 JSON과 유사한 문서에 데이터를 저장하는 NoSQL 데이터베이스입니다. Express는 Node.js에서 웹 애플리케이션을 구축하기 위한 가벼운 프레임워크입니다. React는 동적 사용자 인터페이스를 구축하기 위한 강력한 프런트엔드 라이브러리이며, Node.js는 서버 측 코드를 실행할 수 있게 해주는 JavaScript 런타임입니다.

![MERN Stack](/assets/img/2024-06-22-MasteringtheMERNStackAGuidetoPerfectProjectArchitecture_0.png)

잘 구성된 프로젝트 구조는 코드 가독성, 확장성 및 협업의 용이성을 유지하는 데 중요합니다. 개발자가 빠르게 파일을 찾고 응용 프로그램 흐름을 이해할 수 있도록 도와줌으로써 디버깅에 소요되는 시간을 줄이고 생산성을 향상시킵니다.

# 개발 환경 설정하기

<div class="content-ad"></div>

먼저, 모든 애플리케이션 코드를 보관할 주요 폴더를 생성합니다. 이 폴더 내에서 Frontend 및 Backend이라는 두 개의 디렉터리를 생성할 것입니다. Frontend은 npm create vite@latest 명령어를 통해 만들고, Backend은 백엔드를 위한 익스프레스 서버를 설정하기 위해 npm init -y 명령어를 통해 초기화할 것입니다. 이 구분은 React가 백엔드 논리를 직접적으로 프론트엔드 코드와 함께 구현하는 것을 지원하지 않기 때문에 필요합니다. 또한, 이 구조는 프로젝트 조직을 깔끔하고 이해하기 쉽게 유지하는 데 도움이 됩니다.

Frontend 폴더에서 다음 명령어를 아래 스크린샷에 표시된 대로 실행해주세요:

![이미지](/assets/img/2024-06-22-MasteringtheMERNStackAGuidetoPerfectProjectArchitecture_1.png)

다음으로, Backend 폴더로 이동하여 npm init -y를 실행하여 프로젝트를 초기화합니다. 이는 package.json 파일을 생성할 것입니다.

<div class="content-ad"></div>


![Mastering the MERN Stack: A Guide to Perfect Project Architecture](/assets/img/2024-06-22-MasteringtheMERNStackAGuidetoPerfectProjectArchitecture_2.png)

Now we will install dependencies which will be required for setting up the backend server.

![Mastering the MERN Stack: A Guide to Perfect Project Architecture](/assets/img/2024-06-22-MasteringtheMERNStackAGuidetoPerfectProjectArchitecture_3.png)

Why are we using these libraries?


<div class="content-ad"></div>

- express: Node.js 웹 애플리케이션을 빌드하기 위한 최소한이면서 유연한 웹 애플리케이션 프레임워크입니다.
- mongoose: MongoDB와 Node.js를 위한 ODM(Object Data Modeling) 라이브러리로, 응용 프로그램 데이터 모델링을 위한 스키마 기반 솔루션을 제공합니다.
- body-parser: 수신 요청 바디를 구문 분석하는 미들웨어로, req.body 속성 하에 사용할 수 있습니다.
- cors: 다른 도메인에서 리소스를 요청할 수 있도록 하는 Cross-Origin Resource Sharing을 활성화하는 미들웨어입니다.
- bcrypt: bcrypt 해싱 알고리즘을 사용하여 비밀번호를 안전하게 해싱하고 비교하는 라이브러리입니다.

이제 우리는 요구 사항이 확장 될 경우에도 우리의 프로젝트를 쉽게 찾고 코딩 할 수 있는 확장 가능한 프로젝트 구조를 위해 여러 폴더를 생성할 것입니다.

![Mastering the MERN Stack: A Guide to Perfect Project Architecture](/assets/img/2024-06-22-MasteringtheMERNStackAGuidetoPerfectProjectArchitecture_4.png)

- controllers: 다양한 애플리케이션 엔드포인트의 백엔드 로직과 구현을 처리합니다.
- middleware: 컨트롤러에 도달하기 전에 요청을 처리하는 함수들입니다.
- models: 데이터베이스의 구조를 나타내고 데이터 상호 작용을 처리합니다.
- node_modules: 프로젝트에 설치된 모든 종속성을 포함하는 디렉토리입니다.
- routes: 애플리케이션 엔드포인트를 정의하고 컨트롤러 함수에 연결합니다.
- .env: 환경별 변수와 구성을 저장하는 파일입니다.
- index.js: 어플리케이션의 주진입점으로, 서버를 초기화하고 실행합니다.
- .gitignore: Git이 무시하고 추적하지 않아야 하는 파일과 디렉토리를 지정합니다.
- package-lock.json: 종속성의 정확한 버전을 잠그어 일관된 설치를 보장하는 파일입니다.
- package.json: 프로젝트의 종속성과 스크립트 목록, 프로젝트 이름 및 버전과 같은 메타데이터를 나열하는 파일입니다.

<div class="content-ad"></div>

# 백엔드 폴더 아키텍처를 왜 선택했나요?

소프트웨어 개발에서 프로젝트를 구체적인 파일과 폴더로 구성하는 것은 여러 가지 중요한 목적을 제공합니다. 컨트롤러, 미들웨어, 라우트 및 모델과 같은 폴더로 코드베이스를 분리함으로써 애플리케이션의 유지보수성과 확장성을 향상시킵니다. 각 폴더는 특정 기능을 캡슐화합니다: 컨트롤러는 애플리케이션 로직을 관리하고 응답을 처리하며, 미들웨어는 주요 로직에 도달하기 전에 요청을 가로채고 처리합니다, 라우트는 엔드포인트를 정의하고 해당 컨트롤러에 연결하며, 모델은 데이터베이스와의 구조 및 상호 작용을 나타냅니다.