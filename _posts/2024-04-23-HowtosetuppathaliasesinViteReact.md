---
title: "Vite React에서 경로 alias 설정하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "How to setup path aliases in Vite React"
link: "https://medium.com/@devxprite/how-to-setup-path-aliases-in-vite-df955939ffe8"
isUpdated: true
---





이미 React 프로젝트에서 파일에 대한 올바른 경로를 찾느라 import 문들의 미로에 갇힌 적이 있나요? "../../assets/_" 또는 "../../../assets/_"와 같은 귀찮은 import를 제거할 더 나은 방법이 있을 것이라고 생각해 본 적이 있나요? 그렇다면 혼자가 아닙니다. 다행스럽게도 프로젝트 루트를 참조하기 쉽게 해주는 해결책이 있습니다. 이는 모듈 해결 오류를 해결하고 더 깔끔하고 효율적인 코딩 경험을 위해 궁금증을 자극합니다.

## 경로 별칭 이해:

경로 별칭은 긴 파일 경로에 대한 바로 가기입니다. 파일 또는 모듈을 가져올 때마다 전체 경로를 작성하는 대신, 특정 디렉토리를 나타내는 별칭을 만들 수 있습니다. 이는 코드 가독성을 향상시키고 무수히 많은 import 문을 수정하지 않고도 파일 구조를 업데이트하기 쉽게 만들어 유지 보수를 간소화합니다.

## React Vite 프로젝트 설정하기:

<div class="content-ad"></div>

경로 별칭에 대해 알아보기 전에 React Vite 프로젝트를 설정해 봅시다. 아직 프로젝트를 설정하지 않은 경우 다음 명령을 사용하여 새 프로젝트를 생성할 수 있습니다:

```js
npm create vite my-react-app --template react
cd my-react-app
npm install
```

## 경로 별칭 구성:

절대 경로를 사용하도록 앱을 구성하려면 프로젝트 디렉터리 루트에 있는 vite.config.js 파일에서 별칭을 해결해야 합니다.

<div class="content-ad"></div>

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 코드에서 경로 별칭 활용하기:

이제 경로 별칭이 설정되었으니 코드에서 사용할 수 있습니다. 예를 들어 다음과 같이 작성하는 대신:

```js
import Button from "@/components/Button";
```

<div class="content-ad"></div>

이제 경로 별칭을 사용할 수 있습니다:

```js
import Button from "@/components/Button";
```

## 결론:

이 가이드에서는 React Vite 프로젝트에서 경로 별칭의 힘을 탐색해보았습니다. 경로 별칭을 설정함으로써 코드 가독성을 높이고 유지보수를 간소화하며 개발 작업 흐름을 더 효율적으로 만들 수 있습니다. 이러한 기술을 사용하면 유지보수 가능하고 확장 가능한 React 애플리케이션을 만들 수 있을 것입니다. 즐거운 코딩되세요!
