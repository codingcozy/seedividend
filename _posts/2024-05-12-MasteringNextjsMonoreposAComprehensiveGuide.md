---
title: "Nextjs Monorepo 마스터하기 포괄적인 안내"
description: ""
coverImage: "/assets/img/2024-05-12-MasteringNextjsMonoreposAComprehensiveGuide_0.png"
date: 2024-05-12 21:12
ogImage: 
  url: /assets/img/2024-05-12-MasteringNextjsMonoreposAComprehensiveGuide_0.png
tag: Tech
originalTitle: "Mastering Next.js Monorepos: A Comprehensive Guide"
link: "https://medium.com/@omar.shiriniani/mastering-next-js-monorepos-a-comprehensive-guide-15f59f5ef615"
isUpdated: true
---




웹 개발의 세계에서 Next.js는 서버 측 렌더링 및 정적 생성 웹 애플리케이션을 구축하기 위한 강력하고 다재다능한 프레임워크로 등장했습니다. 프로젝트가 커지면 여러 패키지와 종속성을 관리하는 것이 어려운 작업이 될 수 있습니다. 이때 모노레포가 필요해집니다. 모노레포(“monolithic repository"의 줄임말)는 여러 프로젝트, 라이브러리 및 패키지를 수용하는 단일 저장소입니다. 이 글에서는 Next.js와 함께 모노레포를 사용하는 이점을 살펴보고 설정하는 방법에 대한 단계별 가이드를 제공할 것입니다.

Next.js와 함께 모노레포를 사용하는 이유는 다음과 같습니다:

- 간소화된 종속성 관리: 모노레포를 사용하면 모든 프로젝트의 종속성을 한 곳에서 관리할 수 있어 추적하고 업데이트하기 쉬워집니다.
- 코드 재사용성: 단일 저장소에 여러 프로젝트를 담음으로써 프로젝트 간에 코드를 쉽게 공유하고 재사용할 수 있어 중복 코드의 양을 줄이고 유지보수성을 향상시킬 수 있습니다.
- 개발 과정 단순화: 모노레포를 사용하면 여러 프로젝트를 동시에 개발하고 테스트할 수 있어 한 프로젝트의 변경이 다른 프로젝트를 깨뜨리지 않도록 보다 쉽게 확인할 수 있습니다.
- 개선된 협업: 모노레포를 통해 개발자들은 여러 프로젝트에서 작업할 수 있어 여러 저장소 간에 전환할 필요가 없어 협업을 간소화하고 생산성을 향상시킬 수 있습니다.



Next.js 모노레포 설정하기
Next.js 모노레포를 설정하려면 Turborepo라는 인기있는 도구를 사용할 것입니다. Turborepo는 JavaScript 및 TypeScript 모노레포용 고성능 빌드 시스템입니다.

단계 1: Turborepo 설치하기
먼저 시스템에 Node.js와 npm이 설치되어 있는지 확인하세요. 그런 다음 다음 명령을 실행하여 Turborepo를 전역으로 설치하세요:

```js
npm install -g turborepo
```

단계 2: 새 모노레포 만들기
다음으로, 모노레포를 위한 새 디렉토리를 만들고 해당 디렉토리로 이동하세요:



```js
mkdir nextjs-monorepo
cd nextjs-monorepo
```

이제 다음 명령어를 실행하여 새 Turborepo를 생성하세요:

```js
npx create-turbo@latest
```

프롬프트에 따라 답변해주세요. Next.js 프리셋을 선택할 수 있습니다.



**단계 3:** Next.js 앱 만들기
모노레포를 설정한 후, 이제 모노레포 내에서 새 Next.js 앱을 만들 수 있습니다. 앱 디렉토리로 이동한 다음 다음 명령어를 실행하세요:

```js
cd apps
npx create-next-app@latest my-next-app
```

`my-next-app`을 앱에 원하는 이름으로 바꿔주세요.

**단계 4:** 모노레포 구성
TurboRepo는 모노레포의 빌드 및 작업 구성을 정의하기 위해 turbo.json 파일을 사용합니다. turbo.json 파일을 열고 pipeline 섹션을 업데이트하여 Next.js 앱을 포함하도록 설정하세요:



```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**"]
    },
    "dev": {
      "cache": false
    },
    "start": {},
    "lint": {
      "outputs": []
    },
    "test": {
      "outputs": []
    }
  },
  "globalDependencies": {
    "my-next-app": []
  }
}
```

Step 5: 이제 Next.js 앱을 실행하세요. Next.js 앱이 모노레포에 설정되었으므로 다음 명령어를 사용하여 실행할 수 있습니다:

```json
npm run dev --filter=my-next-app
```

my-next-app를 여러분의 Next.js 앱의 이름으로 바꿔주세요.



이 기사에서는 Next.js를 사용한 모노 레포의 장점을 탐색하고, Turborepo를 사용하여 설정하는 방법에 대한 단계별 가이드를 제공했습니다. 모노 레포를 활용하면 의존성 관리를 간소화하고, 코드 재사용성을 향상시키며, 개발을 간소화하고, 팀 간 협업을 향상시킬 수 있습니다.