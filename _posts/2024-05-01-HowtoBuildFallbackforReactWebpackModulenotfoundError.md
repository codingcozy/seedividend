---
title: "React Webpack에 대한 Fallback 구축 방법 -  Module not found Error"
description: ""
coverImage: "/assets/img/2024-05-01-HowtoBuildFallbackforReactWebpackModulenotfoundError_0.png"
date: 2024-05-01 17:50
ogImage:
  url: /assets/img/2024-05-01-HowtoBuildFallbackforReactWebpackModulenotfoundError_0.png
tag: Tech
originalTitle: "How to Build Fallback for React Webpack: Module not found Error"
link: "https://medium.com/@dpericich/how-to-build-fallback-for-react-webpack-module-not-found-error-de2438a8697c"
isUpdated: true
---

<img src="/assets/img/2024-05-01-HowtoBuildFallbackforReactWebpackModulenotfoundError_0.png" />

리액트 프로젝트에 google-sheets npm 패키지를 통합하려고 했는데 "모듈을 찾을 수 없음: 오류 ..."라는 오류 메시지가 나타났어요. 스택 추적을 통해 여러 종속성을 설치하면이 문제를 해결할 수 있다는 정보를 얻었지만, 그렇게 해도 여전히 이 오류가 발생했어요. 이 오류를 해결하려면 모듈을 찾을 수 없는 오류를 방지하기 위해 종속성과 대체값을 포함해야 합니다.

## 우리의 오류 주요 부분

이 문제를 해결하기 전에 스택 추적에서 몇 가지 항목을 이해해야 합니다. 오류 메시지의 첫 번째이자 가장 중요한 부분은 다음 줄입니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
중요 변경 사항: webpack < 5는 기본적으로 node.js 핵심 모듈을 위한 폴리필을 포함했었습니다. 이제는 그렇지 않습니다. 이 모듈이 필요한지 확인하고 그에 대한 폴리필을 구성하세요.
```

이 줄은 이 문제를 해결하는 데 필요한 모든 맥락을 제공하지만, webpack은 무엇이며 폴리필은 무엇인지, 그리고 중요 변경이란 무엇인지 등 궁금증을 불러일으킵니다. 먼저 webpack이 무엇인지 알아보겠습니다.

## Webpack이란?

UI / UX에 대한 중요한 디자인 고려 사항 중 하나는 속도입니다. 사용자들은 페이지의 구조나 자산이로드되기를 기다리고 싶어하지 않습니다. 첫 콘텐츠 렌더링 시간을 줄이고, 네트워크 트래픽을 감소시키고 사용자 경험을 향상시킬 수 있는 모든 방법을 고려해야 합니다. 이를 돕기 위해 우리는 webpack을 사용합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

웹팩은 자바스크립트 모듈, CSS 스타일, HTML 코드 및 기타 자산을 가져와 서버에서 요청하는 클라이언트로 최적화되어 전송되는 방식을 최적화하는 모듈 번들러입니다. 의존성 그래프를 생성하여 이러한 자산 및 코드가 클라이언트로 전송될 때 결합되는 방식을 최적화하는 데 도움이 됩니다.

![Webpack Image](/assets/img/2024-05-01-HowtoBuildFallbackforReactWebpackModulenotfoundError_1.png)

이미지에는 여러 .js, .css 및 .png 파일이 몇 가지 항목으로 컴파일되어 클라이언트와 공유됩니다. 이것은 SPA(싱글 페이지 애플리케이션)를 빠르게 만드는 방식으로 코드를 구성하는 데 도움이 되어 React와 같은 프론트엔드 프레임워크에서 인기 있는 도구입니다.

## 무엇이 중요한 변경 사항인가요?

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

중요한 변경 사항을 이해하기 위해서는 소프트웨어 버전 관리를 이해해야 합니다. 소프트웨어는 비트와 바이트, 1과 0으로 이루어져 있죠. 이 원자적인 단위를 넘어, 소프트웨어는 살아 숨 쉬는 존재입니다. 개발자들은 소프트웨어 코드를 수정합니다. 새로운 기능을 추가하고 기존 기능을 업데이트합니다. 변경되고 업데이트되는 의존성에 대응하여 엔드 사용자들에게 스무스한 경험을 제공하기 위해 노력합니다.

하지만 모든 변경이 안전한 것은 아닙니다. 그래서 소프트웨어는 버전 관리 방법을 갖고 있습니다. 아니, 우리는 물건을 '내 패키지 1', '내 패키지 2'와 같이 이름 붙이는 것이 아니에요. 대신 다음과 같은 3자리 숫자 형식을 사용합니다:

![이미지](/assets/img/2024-05-01-HowtoBuildFallbackforReactWebpackModulenotfoundError_2.png)

왼쪽에서 오른쪽으로 읽을 때, 첫 번째 숫자는 주요 버전입니다. 이 숫자는 주요 소프트웨어 변경 사항이 발생할 때마다 올라갑니다. 이 변경 사항은 의존하는 프로그램에 영향을 미칠 것으로 확신되는 변경 사항이기 때문에 '중요한 변경 사항'이라 불립니다. 변경 사항에는 리소스나 메서드에 대한 다른 이름이나 기존 프로그램이 데이터를 찾지 못하게 만들 수 있는 API 구조의 변화 등이 포함될 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

가운데 숫자는 마이너 버전 변경을 나타냅니다. 이는 새로운 기능을 도입할 수 있지만, 소프트웨어 내의 기존 기능에는 영향을 미치지 않아야 합니다. 마지막 숫자는 패치 버전 변경이며, 기능을 확장하지는 않고 오직 고장난 코드를 수정하는 버그 수정을 의미합니다.

오류 메시지에서 볼 수 있듯이, Webpack 5보다 큰 모든 주요 버전에서 중단 변경이 발생했습니다.

## 폴리필이란 무엇인가요?

소프트웨어는 정적이 아니며, 프로그램의 각 버전이나 그것에 액세스하는 도구는 예기치 못한 효과를 초래할 수 있습니다. 웹 개발자들은 HTML5 및 CSS3 코드를 사용할 때 발생하는 브라우저 문제에 대해 이 문제를 알고 있습니다. 이것이 caniuse.com과 같은 웹 사이트가 인기 있는 이유입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

ECMAScript 버전은 HTML5와 CSS3처럼 작동하여, 새로운 버전에서는 오래된 JavaScript 버전과 호환되지 않는 기능이 추가됩니다. ECMAScript의 새로운 버전은 개발자들에게 개발을 더 쉽게 만들어주는 내장 메소드와 구조를 제공하지만, 클라이언트가 해당 코드를 지원하지 않을 경우에는 오작동한 코드를 유발할 수 있습니다. 이때 폴리필이 도움이 됩니다.

폴리필은 웹 브라우저에서 해당 기능을 지원하지 않는 경우에 해당 기능의 기능성을 구현하는 코드 조각입니다. 이를 통해 개발자들은 최신 웹 기능을 사용할 수 있으면서도 프로그램이 오래된 브라우저에서도 작동하는 것을 보장할 수 있습니다.

우리가 보고 있는 오류를 해결하려면 의존성 후폭풍을 추가할 수 있습니다. 우리의 코드가 webpack 5에서 제외된 내장 노드.js 모듈을 찾을 때, 실패하는 대신에, 우리가 제공하고 대신 사용할 대체 패키지를 찾을 것입니다.

## NPM과 폴리필을 사용하여 모듈을 찾을 수 없는 오류를 어떻게 해결할 수 있을까요?

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

웹팩이 무엇인지, 소프트웨어 버전 관리 방법 및 폴리필이 무엇인지에 대해 이야기했습니다. 이제 모듈을 찾을 수 없는 오류를 해결할 준비가 되었습니다. 브라우저 JavaScript와 서버 JavaScript는 사용할 수 있는 패키지가 다르기 때문에, 누락된 모듈 오류를 해결하기 위해 필요한 패키지를 다운로드해야할 수 있습니다.

이 오류를 해결하기 위해 해결해야 할 문제가 두 가지 있습니다:

- 프로젝트에 필요한 npm 패키지가 포함되어 있지 않음
- 클라이언트 친화적인 패키지를 사용하고, 노드 패키지를 웹 패키지로 매핑해야 함

오류 메시지에서 필요한 모든 정보를 얻을 수 있습니다. 첫 번째 단계는 누락된 패키지를 포함해야 합니다. 예를 들어 path 패키지를 살펴보겠습니다. 이것은 표준 노드 패키지이지만 클라이언트 친화적이지 않습니다. 우리의 React 앱에 필요한 것은 path-browserify 패키지입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

우리는 path-browserify를 npm install할 수 있지만, 이것은 첫 번째 단계만 해결합니다. 앱을 작동시키기 위해서는 webpack에게 path 대신 path-browserify를 찾도록 해야 합니다. webpack.config.js 파일로 이동할 수 있습니다:

```bash
/node_modules/react_scripts/config/webpack.config.js
```

이 파일은 로컬 서버를 react 스크립트 명령(npm start dev)으로 시작할 때 webpack 설정을 다룹니다. 우리는 이전 의존성인 path를 새 의존성인 path-browserify로 매핑하고자 합니다. 이 매핑에 대한 예외 처리 또는 catch 문을 사용하고 있으므로 이를 명확히 해주어야 합니다.

만약 파일에서 "fallback: "을 검색하면, 모듈에 대한 여러 예외 매핑을 넣을 수 있는 해시를 찾을 수 있습니다. 에러 문구에서 코드를 복사하여 다음과 같이 해시에 넣어주세요:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

![이미지](/assets/img/2024-05-01-HowtoBuildFallbackforReactWebpackModulenotfoundError_3.png)

서버를 재시작해야 할 수도 있지만, 종속성을 설치하고 폴백 경로를 추가하면 오류가 해결될 것입니다!
