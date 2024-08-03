---
title: "스토리북 프레임워크에 기여하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Contributing a Storybook framework"
link: "https://storybook.js.org/docs/contribute/framework"
---




Storybook 프레임워크는 노드 패키지로, 기본 지원을 제공하여 메타프레임워크(Next.js, NuxtJS, SvelteKit) 또는 빌더(Webpack, Vite)와 렌더러(React, Angular, Vue 3, 웹 컴포넌트 등)의 조합에서 작동할 수 있도록 합니다.

메타프레임워크의 경우, Storybook 프레임워크는 또한 Storybook이 메타프레임워크로 생성된 앱과 유사하게 동작하도록 필요한 추가 구성을 다룹니다. 예를 들어, @storybook/nextjs는 Next.js 앱의 다양한 기능을 Storybook 내에서 재현하거나 모방합니다.

참고로, 전체 소스 코드와 문서를 포함한 모든 공식 Storybook 프레임워크를 확인할 수 있습니다.

## 프레임워크 만드는 방법



### 1. 패키지 이름 결정하기

이름은 storybook-framework-로 시작하여 프레임워크가 지원하는 내용과 일치해야 합니다. 예를 들어, SvelteKit을 대상으로 하는 프레임워크의 이름은 storybook-framework-svelte-kit이고, Vite와 함께 Stencil을 대상으로 하는 프레임워크의 이름은 storybook-framework-stencil-vite입니다. 메타프레임워크를 대상으로 하지 않을 때의 네이밍 규칙은 storybook-framework-`renderer`-`builder`입니다.

### 2. 프레임워크가 해야 할 일 고려하기

목표는 Storybook이 대상으로 하는 메타프레임워크 또는 빌더-렌더러 조합과 가능한 유사하게 '즉시 사용 가능'하게 동작하도록 하는 것입니다.



메타프레임워크의 경우, 이는 메타프레임워크에서 제공하는 빌더나 바벨 구성을 재현하려는 것을 의미합니다. 가능한 한 기존 프로젝트 구성을 존중하며 이를 수행해 보아야 합니다.

귀하의 프레임워크가 지원하는 라이브러리나 라이브러리는 다양한 주요 버전을 가질 수 있습니다. 프레임워크가 지원할 각 라이브러리 버전을 고려해 보세요. 이러한 다른 버전 내의 변경 사항을 고려하거나 프레임워크를 각 라이브러리 버전을 지원하기 위해 다른 버전/패키지로 분할해야 할 수도 있습니다. 유지보수 속도를 높이기 위해, 귀하의 프레임워크가 지원하는 다양한 라이브러리 버전에 대한 통합 테스트를 추가하는 것을 고려해 주세요.

### 3. 문서 작성

코드를 작성하기 전에, 설치 지침과 사용 가능한 기능 목록이 포함된 유용한 README를 작성해 보세요. @storybook/nextjs의 README를 참고할 수 있습니다. 문서를 먼저 작성함으로써 다른 작업을 안내하는 데 도움이 됩니다.



### 4. 자체 프레임워크 작성하기

프레임워크는 다음과 같은 부분을 포함할 수 있습니다:

#### package.json (예시)

프레임워크는 노드 패키지이기 때문에 package.json 파일이 포함되어 있어야 합니다. 다음은 시작을 위해 사용할 수 있는 템플릿입니다:



#### preset.js (예시)

프리셋 API는 Storybook 코어를 구성할 수 있는 곳입니다 (어떤 빌더와 렌더러가 당신의 프레임워크에서 사용되는지), 빌더 (webpackFinal 또는 viteFinal export를 통해), babel (babel export를 통해), 필요한 애드온 및 당신의 프레임워크에 대한 가능한 옵션들을 구성할 수 있습니다.

#### preview.js (예시)

(선택 사항) 프리뷰 API는 스토리들의 렌더링을 구성할 수 있는 곳입니다. 전역 장식자나 프레임워크가 예상대로 작동하기 위해 필요한 런타임 설정을 초기화하는 것과 같은 작업을 할 수 있습니다. 만약 당신의 프레임워크가 이 파일을 필요로 한다면, preset.js에서 previewAnnotations를 구성해야 함을 주의해야 합니다.



#### types.ts (예시)

만약 TypeScript로 당신의 프레임워크를 개발 중이라면 (권장), 당신의 프레임워크에서 사용 가능한 옵션을 반영한 StorybookConfig 타입을 export해야 합니다.

### 5. 당신의 프레임워크를 테스트해보세요

가능한 한 당신의 프레임워크에 가까운 설정으로 Storybook이 설정된 새 프로젝트에서 테스트해보세요. 예를 들어, React와 Webpack5를 사용하는 @storybook/nextjs의 경우, @storybook/react 및 @storybook/builder-webpack5를 사용하는 프로젝트를 시작점으로 삼으세요. README에서의 설치 지침을 따르고 모든 것이 예상대로 작동하는지 확인하세요. 지원하는 라이브러리의 다양한 버전, 설정 및 옵션을 테스트하는 것을 잊지 마세요.



### 6. 알려주세요!

프레임워크가 완전히 테스트되고 릴리스되면, #showcase Discord 채널에서 발표하거나 @storybookjs를 멘션하여 트윗으로 공유해주세요. 잘 만들어진 커뮤니티 프레임워크가 최종적으로 Storybook 코드베이스로 이동하여 "공식적으로" 지원되기를 희망합니다.

Storybook에 기여하는 방법에 대해 자세히 알아보세요.

- 기능 요청 작성을 위한 RFC 프로세스
- 기능 및 버그 수정을 위한 코드
- 새로운 프레임워크로 시작하는 방법
- 문서 개선, 오타 수정 및 명료화를 위한 문서
- 새로운 코드 스니펫 및 예제에 대한 예제