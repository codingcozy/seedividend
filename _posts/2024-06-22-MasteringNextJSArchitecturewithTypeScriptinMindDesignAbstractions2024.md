---
title: "TypeScript로 NextJS 아키텍처 마스터하기  2024 디자인 추상화 방법"
description: ""
coverImage: "/assets/img/2024-06-22-MasteringNextJSArchitecturewithTypeScriptinMindDesignAbstractions2024_0.png"
date: 2024-06-22 14:39
ogImage: 
  url: /assets/img/2024-06-22-MasteringNextJSArchitecturewithTypeScriptinMindDesignAbstractions2024_0.png
tag: Tech
originalTitle: "Mastering NextJS Architecture with TypeScript in Mind | Design Abstractions 2024"
link: "https://medium.com/@sviat-kuzhelev/mastering-nextjs-architecture-with-typescript-in-mind-design-abstractions-2024-a6f9612300d1"
---


<img src="/assets/img/2024-06-22-MasteringNextJSArchitecturewithTypeScriptinMindDesignAbstractions2024_0.png" />

Next.js는 React 애플리케이션을 구축하기 위한 강력한 프레임워크이며 TypeScript와 결합하면 견고한 타입 체크 및 도구가 제공되어 개발 경험을 크게 향상시킬 수 있습니다.

저는 몇 년 동안 Next.js를 사용해왔는데, 대규모 웹 앱을 개발할 때 Create React App과 비교해도 우수한 도구라고 생각합니다.

이 글을 읽으시면서 GitHub 프로젝트 링크를 남겨두었으니 걱정 말고 이 링크로 들어가서 포크하고 놀아보세요:

<div class="content-ad"></div>

https://github.com/BiosBoy/my-social-app

지난 몇 년 동안 NextJS는 내부에서 추상화를 확장하는 정도만큼 진화해 왔어요. 여러 앱을 만드는 동안 가장 가치 있는 점은 코드를 적절히 추상화하는 방법이었습니다.

"Hello World" 앱을 만드는 방법에 대한 설명서를 찾는 것은 그리 어렵지 않죠. 설명이 잘 되어 있을지라도 이러한 종류의 이야기에서 가장 큰 병목 현상은 실제로 작업을 시작해야 할 때 발생할 수 있어요.

NextJS 앱을 빌드하도록 요청 받으면 인증, 다양한 API, 서비스, 데이터 구조를 포함한 실제 세계의 작업과는 "Hello World"에서와는 아예 다른 일이라는 것을 깨달을 거예요.

<div class="content-ad"></div>

이 기사에서는 TypeScript와 함께 Next.js 프로젝트를 설정하고, 내비게이션 처리, 회원가입/로그인/로그아웃 관리, 그리고 SVG 자산을 효과적으로 다루는 방법에 대해 안내할 것입니다. 이 모든 것은 실제로 제품에 사용할 수 있는 방식으로 설명될 것이에요.

# 준비물

그래서 이 이야기에서는 풀스택 소셜 읽기 클럽 앱을 복제하려고 할 것입니다. 백엔드 부분에는 다루지 않을 것이지만, 브라우저의 LocalStorage와 SessionStorage를 사용하여 마치 백엔드를 사용하는 것처럼 속이도록 할 것입니다.

그래서 백엔드를 따로 준비해야 할 때에는 Rails를 나중에 nodeJS + MongoDB/PostgresDB로 쉽게 전환할 수 있을 것입니다. 어쨌든, 시작해봅시다.

<div class="content-ad"></div>

우리의 경우를 상상해보면 요청된대로 다음을 수행해야 합니다:
- 필요한 페이지 생성: /, /feed, /signup, /signin, /signout, /:username, /friends.
- 반응형 디자인을 염두에 두고 내비게이션 메뉴 생성.
- 사용자 인증/로그아웃 흐름 통합하여 내부 소셜 데이터를 노출하지 않도록 함.
- 사용자 게시물 및 친구 목록 관리를 위한 CRUD 작업 추가.
- 앱을 기본 색 테마와 전체적인 스타일링으로 꾸미기.

상당히 간단하게 보이나요? 실제로도 그런 것 같네요. 아주 복잡한 예제에 집중할 필요는 없으니까 아키텍처 설계에 실제적인 접근을 해보죠. 위 요구 사항 집합이 실제 앱에서 다뤄야 할 것들입니다, 그래서 마스터하기 위해 노력해봅시다.

# TypeScript으로 Next.js 프로젝트 설정하기

먼저, TypeScript와 함께 새 Next.js 프로젝트를 초기화해보죠. 터미널을 열고 다음 명령어를 실행하여 새 Next.js 프로젝트를 생성하고 프로젝트 디렉토리로 이동하세요:

<div class="content-ad"></div>

```js
npx create-next-app@latest my-nextjs-app --typescript
cd my-nextjs-app
```

여기에 따라, NextJS 프레임워크를 초기화하고 그 안에 TypeScript를 추가하게 될 거야. 이것은 우리의 향후 애플리케이션을 개발하기 위한 스타터 킷 환경을 만들어 줄 거야.

package.json이나 tsconfig.json 파일들은 기본적으로 제공되기 때문에 이 파일들에 대한 정보는 인터넷을 통해 쉽게 찾을 수 있어요. 따라서 이미 이 파일들이 어떻게 작동하는지 알고 있다고 가정해볼게요.

이제 아키텍처로 들어가 봅시다.

<div class="content-ad"></div>

# 앱 아키텍처 디자인

그래서, 이 이야기의 맨 처음 단계는 올바른 폴더 구조를 선택하는 것입니다.

일부 폴더(예: /pages)는 기본적으로 정의되어 있지만, 우리는 나머지 필요한 항목을 직접 설계해야 합니다. 그러나 지금은 먼저 페이지에 대해 논의해 봅시다.

## 📁 ./app

<div class="content-ad"></div>

NextJS의 핵심 폴더입니다. 대부분의 경우 가능한 한 간단하게 유지할 수 있습니다. 대부분의 시간에는 핵심 로직을 설정하고 싶어하는 곳입니다.

![image](/assets/img/2024-06-22-MasteringNextJSArchitecturewithTypeScriptinMindDesignAbstractions2024_1.png)

favicon.ico — 브라우저 탭의 시각적 디자인을 위한 .ico 기반 파일입니다.

layout.tsx — 내부 NextJS 애플리케이션으로, SSR 또는 SSG 렌더링을 위한 진입점으로 사용됩니다. 하지만, 우리의 경우는 현재 CSR에 초점을 맞추고 있습니다.

<div class="content-ad"></div>

## 📁 ./pages

기본적으로 NextJS는 페이지 개발을 위한 멋진 추상화를 제공합니다. 필요한 페이지만 해당 폴더에 채우면 됩니다.

따라서 우리의 디자인은 다음과 같습니다:

![NextJS Architecture](/assets/img/2024-06-22-MasteringNextJSArchitecturewithTypeScriptinMindDesignAbstractions2024_2.png)

<div class="content-ad"></div>

_app.tsx은 NextJS 프로젝트의 주요 진입점입니다. 전체 애플리케이션을 포함하여 실행 중에 서버에서 사용될 것입니다.

feed/friends/home/signin/signout/signup.tsx은 동적 동작 없이 화면에 표시해야 하는 페이지를 나타내는 정적 페이지입니다.

[username].tsx은 “동적 동작”이라고 부르는 것입니다. 좀 더 복잡한 앱 로직이 있는 경우, 사용자 ID나 다른 동적 값이 있는 정적 페이지에서 동적 콘텐츠를 표시하고 싶어할 것입니다.

## 📁 ./components

<div class="content-ad"></div>

여기에서는 앱의 재사용 가능한 각 구성 요소를 저장할 수 있습니다. 여러 영역/페이지에서 사용할 수 있는 것들에게 가장 적합한 장소입니다.

![마스터링 Next.js 아키텍처와 TypeScript를 떠올리며 디자인 추상화 2024_3](/assets/img/2024-06-22-MasteringNextJSArchitecturewithTypeScriptinMindDesignAbstractions2024_3.png)

AddPostModal.tsx — 나중에 우리 앱에서 사용할 것으로, 사용자가 요청에 따라 새 게시물을 추가할 수 있는 기능을 제공합니다.

Header.tsx — 웹 앱 디자인에서 핵심적인 역할을 할 재사용 가능한 헤더입니다.

<div class="content-ad"></div>

NavBar.tsx는 앱 내에서 탐색을 표현할 수 있는 또 다른 재사용 가능한 컴포넌트입니다.

## 📁 ./auth

이 폴더는 앱의 핵심 로직을 포함하며 사용자가 로그인했는지 여부를 확인하는 데 도움이 됩니다.

![이미지](/assets/img/2024-06-22-MasteringNextJSArchitecturewithTypeScriptinMindDesignAbstractions2024_4.png)

<div class="content-ad"></div>

`AuthContext.tsx` 파일에는 사용자의 인증 정보가 저장됩니다. 사용자가 시스템에 로그인한 후에 사용자의 정적 데이터를 관리하기 위해 React Context를 사용할 것입니다.

`withAuth.tsx` 파일은 앱 전체에 사용자 데이터를 공유하는 데 도움이 되는 HOC 함수입니다.

## 📁 ./api

앱의 다른 레이어(표현/비즈니스 등)와 작업할 때 서로를 혼동하지 않는 것이 항상 중요합니다.

<div class="content-ad"></div>

또한 API 관련 코드를 별도의 폴더로 이동하는 것이 좋은 실천 방법입니다.

![마스터링 Next.js 아키텍처와 TypeScript로 설계 추상화](/assets/img/2024-06-22-MasteringNextJSArchitecturewithTypeScriptinMindDesignAbstractions2024_5.png)

getCurrentUser.ts — SessionStorage에서 로그인한 사용자 데이터를 검색하는 GET 요청입니다.

getPosts.ts — 사용자가 게시한 사용 가능한 게시물을 검색하는 GET 요청입니다.

<div class="content-ad"></div>

getUsers.ts - 시스템에 등록된 모든 사용자를 검색하기 위한 GET 요청입니다.

setCurrentUser.ts - 사용자가 성공적으로 로그인/가입한 후 사용자 데이터를 설정하기 위한 POST 요청입니다.

setUsers/setPosts.ts - 앱 초기화를 위해 LocalStorage에 데이터를 채우기 위한 POST 요청입니다.

## 📁 ./hooks

<div class="content-ad"></div>

React의 세계에서 (특히 훅에 대해 말할 때) UI 로직과 비즈니스 로직을 섞지 않는 것이 항상 가장 좋은 실천법입니다. 구성 요소를 설계할 때 항상 UI 레이어를 가능한 한 단순하게 유지하는 방법을 생각해 보세요.

이 경우에는 비동기 요청 중 하나를 분할하여 자체 캡슐화된 범위에 넣어 UI 구성 요소를 작고 깨끗하게 유지할 수 있습니다.

![image](/assets/img/2024-06-22-MasteringNextJSArchitecturewithTypeScriptinMindDesignAbstractions2024_6.png)

useDataInitialize.ts — 앱 실행을 위해 목 데이터 세트를 초기화하는 주요 파일입니다.

<div class="content-ad"></div>

usePosts/useFriends.ts — 이 훅들을 사용하면 우리는 친구/게시물 API 응답을 캡슐화된 방식으로 검색할 수 있게 될 거에요.

useSignup/useSignin/useSignout.ts — 이 훅들은 사용자 인증 플로우를 기능적으로 관리하는 데 도움이 될 거에요.

## 📁 ./helpers

여기 우리 사용자 정의 작업에 대해 도와줄 귀여운 녀석이 있어요. 이 폴더에는 데이터 무작위화와 같은 특정 사용 사례에만 사용되는 몇 가지 항목을 넣는 것이 항상 좋아요.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-22-MasteringNextJSArchitecturewithTypeScriptinMindDesignAbstractions2024_7.png" />

dataRandomizer.ts — 이 파일은 앱을 랜덤한 게시물/사용자 데이터로 채우는 주요 도우미입니다.

## 📁 ./utils

이 폴더는 앱 전체에서 여러 차례 유용하고 재사용 가능한 것들을 결합하여 앱의 재사용성을 높이는 데 도움이 될 것입니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-22-MasteringNextJSArchitecturewithTypeScriptinMindDesignAbstractions2024_8.png" />

sortByDate.ts - 특정 타임스탬프별로 데이터 배열을 정렬하는 데 도움을 주는 파일입니다.

## 📁 ./interfaces

TypeScript를 언급할 때는 종종 타입과 인터페이스를 다루어야 합니다. 일반적인 Hello World 앱의 경우, 이들은 코드 안에 자연스럽게 위치해야 하는 아주 작은 부분이어야 합니다.

<div class="content-ad"></div>

하지만 실제 앱에서는 이것들을 분리하므로 라인 수는 그렇지 않으면 많아질 수 있습니다.

![이미지](/assets/img/2024-06-22-MasteringNextJSArchitecturewithTypeScriptinMindDesignAbstractions2024_9.png)

data.ts — 데이터 구조를 위한 인터페이스들입니다. 현재 하나만 있지만 미래에는 더 많아질 것입니다.

## 📁 ./static

<div class="content-ad"></div>

이 작은 폴더는 앱 안에 포함하고 싶은 아이콘/이미지/gif/비디오 등과 같은 정적 데이터를 나타냅니다.

`<img src="/assets/img/2024-06-22-MasteringNextJSArchitecturewithTypeScriptinMindDesignAbstractions2024_10.png" />`

logo.svg — 메인 앱 로고.

## 📁 ./styles

<div class="content-ad"></div>

마지막으로 유명한 스타일 폴더입니다. CSS 모듈을 사용하여 코드를 격리하고 반복하지 않도록 권장합니다. 그럼에도 불구하고 일부 코드는 중앙에 유지되어 전체 사이트에서 초기화해야 합니다. 이러한 것들을 저장하는 장소가 이곳이며 globals/등이 있습니다.

![MasteringNextJSArchitecturewithTypeScriptinMindDesignAbstractions2024_11](/assets/img/2024-06-22-MasteringNextJSArchitecturewithTypeScriptinMindDesignAbstractions2024_11.png)

global.css — 앱의 핵심 공유 스타일.

# 핵심 아키텍처 원칙

<div class="content-ad"></div>

좋아, 이제 앱 아키텍처를 설계하는 데 문제가 없네요. 이제 우리는 코드 재사용성과 유지 관리에 대해 더 많이 집중할 수 있어요.

## 느슨한 결합, 높은 응집도

![마스터링 Next.js 아키텍처 및 TypeScript로 디자인하는 추상화(2024년 06월 22일)](/assets/img/2024-06-22-MasteringNextJSArchitecturewithTypeScriptinMindDesignAbstractions2024_12.png)

응집도(cohesion)는 모듈/클래스 요소들이 얼마나 잘 어울리는지를 가리키며, 관련된 코드는 서로 가까이 위치하는 것이 좋다는 것을 의미합니다. 높은 응집도를 추구하고 관련 코드를 가능한 한 긴밀히 묶어야 합니다. 이는 모듈/클래스 내부 요소와 관련이 있습니다.

<div class="content-ad"></div>

결합성은 서로 다른 모듈/클래스가 서로 얼마나 의존하는지를 나타내는 정도를 의미합니다. 가능한 한 모든 모듈이 독립적이어야 한다는 것이 권장되며, 이것이 낮은 결합성을 유지해야 하는 이유입니다. 서로 다른 모듈/클래스 간의 요소와 관련이 있습니다.

## 비즈니스 로직은 대표자 밖으로 유지하세요

많은 경우 UI 구성 요소의 범위 내에서 모든 것을 섞으려는 경우를 종종 보았습니다. 한 개 또는 몇 개만 떼어내도, 여전히 병목현상은 UI 또는 비즈니스 로직을 업데이트하려면 둘 다 처리해야 한다는 문제입니다.

리액트에서 우리에게 제시된 코드 유지보수를 간단하게 하기 위한 훅(Hooks)이라는 훨씬 더 나은 접근 방식이 있습니다. 구성 요소 대신에 자신을 대신해서 API 요청을 호출할 때, 이 코드를 따로 폴더/범위로 가져가고 격리된 상태로 관리하는 것이 더 나은 방법이 아닌가요?

<div class="content-ad"></div>

그러면 UI 레이어를 훨씬 멋지게 만들 수 있게 될 거예요:

`![UI 레이어](/assets/img/2024-06-22-MasteringNextJSArchitecturewithTypeScriptinMindDesignAbstractions2024_13.png)`

...그리고 비즈니스 레이어는 아래와 같이:

`![비즈니스 레이어](/assets/img/2024-06-22-MasteringNextJSArchitecturewithTypeScriptinMindDesignAbstractions2024_14.png)`

<div class="content-ad"></div>

여기서 API 호출을 다룬다는 것을 명심해주세요 — getUsers(). 여기에 그 로직을 넣게 될 거라고 상상해봐요... 음, 이걸 모두 한 곳에서 유지하는 것은 약간 복잡할 것 같아요.

그래서 이전에 우리는 핵심 API 로직을 보관할 전용 API 폴더를 설계했어요:

![API Folder](/assets/img/2024-06-22-MasteringNextJSArchitecturewithTypeScriptinMindDesignAbstractions2024_15.png)

그리고 마지막으로 인터페이스... 여기서는 코드에서 그들을 가져와서 공유 가능한 ./interfaces 폴더에 넣어요. 이렇게 하면 API 코드를 훨씬 깔끔하고 이해하기 쉽도록 유지하고 확장할 수 있게 됩니다.

<div class="content-ad"></div>

이것은 NextJS 프로젝트를 위해 잘 설계된 추상화를 작성한 후에 코드를 깔끔하고 효율적으로 작성하는 4단계 Best Practice 입니다. 이전에 논의한 아키텍처로 계속 진행해야 하는 이유가 이제 더 명확해졌기를 바랍니다.

# 마무리

앱을 설계하는 것은 하루 만에 끝나는 작업이 아니기 때문에 아직 다룰 것이 많습니다. 어떤 회사들은 아키텍처 방법을 논의하기 위해 몇 달을 소비한 후에야 앱 아키텍처 작업을 시작합니다.

하지만, 이 작은 실제 예제가 어떻게 미래 앱을 더 잘 설계하고 웹 애플리케이션을 개발할 때 따라야 하는 올바른 추상화에 대한 감각을 제공해 줄 것입니다.

<div class="content-ad"></div>

위에서 언급한 앱의 출처입니다. 원하신다면 여기에서 함께 놀아보세요: https://github.com/BiosBoy/my-social-app.

건배 🍻