---
title: "리액트만 사용하지 마세요"
description: ""
coverImage: "/assets/img/2024-06-20-DontusejustReact_0.png"
date: 2024-06-20 02:19
ogImage:
  url: /assets/img/2024-06-20-DontusejustReact_0.png
tag: Tech
originalTitle: "Don’t use just React"
link: "https://medium.com/enlear-academy/dont-use-just-react-680c093986bb"
isUpdated: true
---

## Next.js 초보자를 위한 소개

앗, 뭐라고요😠. 미쳤나요😡. 그렇게 생각하고 있던 거죠?😅 죄송해요. 제가 본 원문을 적는 게 필요하지 않다고 생각했던 블로그인데요😅😂, 대부분이 React보다 뛰어난 옵션이 있다는 걸 알기 때문에요🤩. 그냥 보통의 React만 있는 게 아니에요. 그래도 여전히 초보자들이 React 프레임워크 없이 프로젝트를 시작하려고 하는 걸 보곤 해요. 그래서 그냥 보통의 React를 사용하지 말고, React와 함께 사용할 수 있는 옵션을 안내해 드릴게요🤩.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*2VtlJwEiapSHoivvgMI-Yw.gif)

알았어요 친구, 당신은 Next.js가 놀라운 것으로 화려하게 말하고 있군요😅😅 그리고 그냥 React를 사용하지 말라고 말해요. 왜 그래야 하는 거죠? 그것에 이유를 좀 알려주세요. 🌝

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

## 한 가지씩 살펴보며 Next.js가 얼마나 강력한지 이해해 보자🤩.

## 1. 서버 측 렌더링 (SSR) 및 정적 사이트 생성 (SSG)

아이고, 이 기술 용어가 뭔지 모르겠다! 음, 기다려봐. 설명해줄게. Next.js에는 두 가지 종류의 컴포넌트가 있어;

- 서버 컴포넌트
- 클라이언트 컴포넌트.

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

넥스트.js 13에서 서버 구성 요소가 등장했습니다. 서버 구성 요소는 서버에서 실행되어 정적 콘텐츠만 브라우저로 전송합니다. 이러한 서버 구성 요소에서 데이터를 가져오면 앱이 빠릅니다. 사용자 상호 작용에 필요한 경우 클라이언트 구성 요소를 사용해야 합니다. 즉, 마우스 오버 이벤트가 발생할 때 어떤 작업을 수행해야 하는 경우 클라이언트 구성 요소에서 수행해야 합니다. 이러한 방식으로 제공되는 추가적인 기능이 있습니다🤩.

- 더 나은 SEO: SSR 및 SSG로 검색 엔진이 페이지를 크롤링하고 색인화하기 쉬워져 검색 엔진 순위가 높아집니다.
- 빠른 로드 시간: 사전 렌더링된 페이지는 사용자에게 빠르게 제공되어 부드러운 경험을 제공합니다.

## 2. 파일 기반 라우팅

![이미지](/assets/img/2024-06-20-DontusejustReact_0.png)

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

Next.js는 전통적인 React Router보다 직관적이고 관리하기 쉬운 파일 기반 라우팅 시스템을 소개합니다. Next.js에서는 애플리케이션의 페이지들이 파일 시스템에 자동으로 매핑되어 경로를 간편하게 생성할 수 있습니다.

라우터에는 두 가지 유형이 있으며, Next.js 13에서 새롭게 나온 것은 App 라우터입니다.

- 간소화된 라우팅: 폴더 구조만 유지하면 됩니다 😘.
- 동적 라우팅: 파일 및 폴더 명명 규칙을 활용해 동적 경로를 쉽게 처리할 수 있습니다 😘.

## 3. API Routes

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

Next.js를 사용하면 동일한 프로젝트 내에서 API 엔드포인트를 생성할 수 있습니다. 이는 Next.js 애플리케이션 내에서 직접 서버리스 함수로 풀 스택 애플리케이션을 구축할 수 있다는 것을 의미합니다🫡.

그러나 Next.js에서 백엔드 지원을 받고 싶지 않다면 다른 언어로 자체 백엔드를 개발할 수도 있습니다. 완전히 당신의 선택이에요😏.

- 통합된 백엔드: 별도의 백엔드 서버 설정 없이 데이터 검색, 폼 처리, 인증 등을 위한 엔드포인트를 쉽게 생성할 수 있습니다🥱.
- 서버리스 함수: 이러한 엔드포인트를 서버리스 함수로 배포하여, 자동으로 확장되고 서버 유지 관리가 줄어듭니다🥱.

## 4. 이미지 최적화

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

Next.js는 이미지 구성 요소를 포함하고 있어요. 이 구성 요소는 자동으로 이미지를 최적화하여 사용자의 장치에 최상의 품질로 효율적으로 로드합니다🤩.

- 자동 이미지 크기 조정: 사용자의 장치 및 뷰포트에 기반하여 적절한 크기의 이미지 제공🫡.
- 레이지 로딩: 이미지가 뷰포트에 진입할 때에만 로드하여 성능을 향상시킵니다🫡.

## 5. 커뮤니티 및 생태계

Next.js는 웹 애플리케이션의 성능과 사용자 경험을 향상시키는 데 중점을 둔 회사인 Vercel의 지지를 받고 있어요. 이 프레임워크에는 큰 커뮤니티🤩와 다양한 플러그인, 확장 프로그램 및 도구가 있습니다.

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

- 활발한 커뮤니티: 다수의 개발자 커뮤니티의 지원과 기여를 받아보세요.
- 다양한 생태계: Next.js를 위해 특별히 개발된 다양한 플러그인, 확장 프로그램 및 도구를 활용하세요.

## 6. 내장 CSS, Tailwind 및 Sass 지원

Next.js에서 스타일링은 CSS, Tailwind 및 Sass를 내장 지원하여 간편합니다. styled components 또는 Emotion과 같은 CSS-in-JS 솔루션을 선호한다면 사용할 수도 있습니다.

- 전역 및 모듈식 CSS: 전역 스타일을 쉽게 적용하거나 개별 구성 요소에 CSS를 스코프로 적용할 수 있으며 이름 충돌에 대해 걱정할 필요가 없습니다.
- Sass 지원: 최소 구성으로 보다 복잡한 스타일링 요구를 위해 Sass의 기능을 활용하세요.

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

## 7. TypeScript 지원

Next.js는 기본적으로 훌륭한 TypeScript 지원을 제공합니다. 추가 구성 없이도 프로젝트를 TS로 설정할 수 있습니다. 간단한 구성으로 TypeScript를 사용하여 타입 오류를 미리 잡고 코드베이스의 유지 보수성을 향상시킬 수 있습니다.

- 타입 안전성: 개발 중 타입 관련 오류를 잡아 버그를 줄입니다.
- 개발자 경험 향상: TypeScript의 강력한 도구 및 자동완성 기능을 활용하세요.

요약하면, React만으로도 강력한 UI 라이브러리이지만, Next.js는 추가적인 기능을 제공하여 React를 더욱 향상시킵니다.🤩

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

- 개발을 효율적으로 진행합니다.
- 성능을 향상시킵니다.
- 개발자들에게 더 나은 경험을 제공합니다.

제가 강조하고 싶은 부분을 이해하셨길 바랍니다. Next.js를 사용해보세요. 다른 방식으로 React를 사용하는 것에 대해 언급했네요 😁😜.

다음 블로그에서 뵙겠습니다. 👋👋👋👋
