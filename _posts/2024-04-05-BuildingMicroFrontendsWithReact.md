---
title: "React로 마이크로 프론트엔드 만들기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Building Micro Frontends With React"
link: "https://medium.com/@kunalznk/building-micro-frontends-with-react-7f5a21a99825"
isUpdated: true
---

리액트로 마이크로 애플리케이션의 힘을 발휘해보세요: 단계별 안내

지난 섹션에서 마이크로 프론트엔드에 대한 개요를 제공했습니다. 이제 여기서는 React를 사용하여 독립적인 마이크로 프론트엔드 애플리케이션을 구축하는 방법을 자세히 살펴보겠습니다.

모노리식 전자 상거래 애플리케이션을 고려해봅시다. 사용자 상호작용을 위해 다음 페이지가 포함되어 있습니다:

- 제품 검색
- 제품 세부 정보
- 구매 흐름
- 주문 모니터링
- 배송 추적

![BuildingMicroFrontendsWithReact_0.png](/assets/img/BuildingMicroFrontendsWithReact_0.png)

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

이전 섹션에서는 Micro Frontend 애플리케이션의 통합에 대해 간략히 다뤘습니다. 이제 더 자세히 통합 방법에 대해 알아볼 것입니다. 통합을 위해 주로 세 가지 방법을 따를 수 있습니다: 서버 측 통합, 클라이언트 측 통합 및 빌드 시간 통합.

서버 측 통합은 프런트엔드 및 서버 백엔드 애플리케이션을 서버 측에서 통합하고 클라이언트에 전송하는 것을 의미합니다. 이 방식은 서버에 상당한 부담을 주는 경우가 있습니다.

한편 빌드 시간 통합은 빌드 프로세스 중에 통합이 발생하도록 하는 것을 의미합니다. 예를 들어, 주 애플리케이션을 빌드할 때 모든 Micro Frontend 앱을 포함시키는 것입니다. 이를 위해 각 Micro Frontend 애플리케이션을 npm 패키지로 게시하고 주 애플리케이션에서 사용하는 방법을 사용할 수 있습니다. 이렇게 하면 모든 Micro Frontend 애플리케이션이 주 애플리케이션과 함께 빌드됩니다.

우리의 Micro Frontend에서는 Runtime 통합을 사용할 것입니다. 이는 필요한 Micro Frontend 애플리케이션이 클라이언트로 다운로드되고 실행 중에 통합되는 것을 의미합니다. 이를 통해 초기 로드 시간을 줄일 수 있습니다. Runtime 통합을 위해 Webpack 5와 Module Federation을 사용할 것입니다.

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

이제 `create-mf-app` 도구를 사용하여 세 개의 Micro Frontend 애플리케이션을 만들어 보겠습니다. 이 도구는 Webpack과 React를 포함한 최소 구성으로 Create React App을 설정합니다.

Micro Frontend 애플리케이션을 만들려면 다음 명령을 실행하세요:

![이미지](/assets/img/BuildingMicroFrontendsWithReact_1.png)

다음 정보를 제공하십시오:

- 앱 이름 선택: "product" // 앱 이름
- 프로젝트 유형: 어플리케이션
- 포트 번호: 9001
- 프레임워크: React
- 언어: JavaScript
- CSS: Tailwind

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

상기 세부 내역을 제공한 후 '제품' 프로젝트가 실행 준비될 것입니다.

제품 애플리케이션에서는 두 개의 페이지가 있을 것입니다: 제품을 검색하는 "/products" 페이지와 제품 세부 정보를 표시하는 "/product/prodId" 페이지입니다. 먼저, 다음 명령을 사용하여 필요한 종속 항목인 axios와 react-router-dom을 설치해 보겠습니다:

```js
npm i axios react-router-dom
```

다음으로, 애플리케이션에 라우팅을 추가해야 합니다. 여기서 basename 속성은 루트 경로로 간주되어 모든 링크가 "/products"로 시작함을 의미합니다. 이를 통해 애플리케이션이 "/products"에서 렌더링되고 "/"가 아닌 곳에 렌더링됨이 보장됩니다.

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

제품 마이크로 앱의 전체 코드를 확인하려면 여기를 확인해보세요.

우리 제품 마이크로 앱의 마지막 단계는 다른 앱 및 주 응용 프로그램에서 사용할 수 있는 일부 컴포넌트를 노출하거나 공유하는 것입니다. 이를 위해 src/webpack.config.js 파일을 수정해야 합니다. 다음 줄을 추가하여 "product" 모듈을 노출합니다:

![product module](/assets/img/BuildingMicroFrontendsWithReact_2.png)

이 변경으로 제품 마이크로 앱을 성공적으로 완료했습니다. 다른 마이크로 앱의 코드를 여기에서 확인할 수 있습니다.

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

다음 게시물로 넘어가기 전에 코드를 완전히 모아놓으셨는지 확인해주세요. 블로그 글이 지나치게 길어져서 지나쳤던 것에 대해 사과드립니다. 그래도 이런 일이 발생하지 않도록 잠들지 않게 하려고 했어요! 😫😪

다음 게시물에서는 모든 마이크로 애플리케이션들을 통합할 거에요. 지금은 React와 유사한 다른 마이크로 앱들을 살펴보는 걸 적극 권유합니다. 완전히 이해하지 못하셨더라도 걱정하지 마세요. 다음 게시물에서 더 분명해질 거라고 확신합니다.

소통을 이어가요! 의견이나 질문을 공유해주세요.

다음 게시물에서는 모든 마이크로 애플리케이션을 하나로 통합할 거예요. 다른 React와 유사한 마이크로 앱을 이해하지 못해도 걱정하지 마세요. 다음 게시물에서 꼭 이해하실 거에요.
