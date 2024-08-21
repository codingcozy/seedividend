---
title: "Reactime v25, 개발자 도구를 더욱 잘 활용하는 방법"
description: ""
coverImage: "/assets/img/2024-05-17-Reactimev25Thetimetoreactisnow_0.png"
date: 2024-05-17 20:58
ogImage:
  url: /assets/img/2024-05-17-Reactimev25Thetimetoreactisnow_0.png
tag: Tech
originalTitle: "Reactime v25: The time to react is now!"
link: "https://medium.com/@loganjnelsen/reactime-v25-the-time-to-react-is-now-ace90e45a9c7"
isUpdated: true
---

강력한 개발자 도구가 더욱 강력하고 직관적으로 업그레이드되었습니다.

공동 저술자: Haider Ali, Mel Koppens, Jose Luis Sanchez

Reactime이란?

React는 여전히 최고입니다! React는 2023년에 가장 인기 있는 자바스크립트 프론트엔드 프레임워크였으며 어떤 언어의 프론트엔드 프레임워크 중 가장 많이 사용되는 프레임워크 중 하나입니다. 그러나 혁신을 위한 여지는 항상 존재합니다.

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

큰 복잡한 코드베이스를 다룰 때 문제가 생길 수 있습니다 — React는 대화식이고 확장 가능한 애플리케이션을 만들 때 보편적으로 사용되는 점을 고려할 때 매우 중요합니다. React 개발자들은 컴포넌트 아키텍처, 상태, 그리고 프로그래밍 중 불가피하게 발생하는 버그들을 고려해야 합니다. Reactime은 이러한 난관을 완화하는 데 도움이 되어서 무엇이 일어나고 있는지 빠르게 확인하고 효과적으로 빌드할 수 있도록 돕습니다.

간단히 말해서, Reactime은 React 애플리케이션을 위해 설계된 오픈 소스 타임 트래블 디버깅 도구입니다. 이 도구는 컴포넌트 트리의 동적 그래픽 표현, 컴포넌트 상태(현재 및 이력), 다양한 메트릭 등을 포함하여 많은 기능을 제공합니다. 이러한 기능들은 숙련된 개발자들에게 훌륭한 도구로 만들어주며, 새로운 개발자들이 React를 배우는 데 훌륭한 도구로 만드는 새로워진 UI도 제공합니다!

버전 25.0을 소개합니다!

![Reactime](https://miro.medium.com/v2/resize:fit:1400/1*mWtM2Ad_D4rwpHggQv3JYQ.gif)

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

프롭 드릴링 시각화

Reactime 앱의 컴포넌트 맵 디스플레이는 가장 눈에 띄는 기능 중 하나일 수 있습니다. 이는 사용자가 React 앱의 모든 컴포넌트가 어떻게 서로 연결되고 흐르는지를 볼 수 있게 합니다. Reactime 버전 25.0은 이 직관적인 그래픽 사용자 인터페이스를 확장하여 컴포넌트 간에 어떻게 프롭이 전달되는지를 보여줍니다. 부모와 자식 노드를 연결하는 링크의 색상으로 전달된 프롭의 존재와 양을 나타냅니다. 회색 링크 대신에 프롭을 전달하는 링크는 낮은 프롭부터 높은 프롭까지의 범위인 노랑에서 마룬까지의 색상을 가지고 있습니다. 또한 굵은 글씨는 외관을 통합하면서 요소 간에 흐르는 프롭의 양을 직관적으로 나타내어 깔끔한 모습을 유지합니다.

![Reactimev25](/assets/img/2024-05-17-Reactimev25Thetimetoreactisnow_0.png)

개선된 UI: 더 적은 혼잡, 더 많은 사용성

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

이 개발자 도구에 포함된 다양한 개별 도구들은 훌륭하지만, 너무 많은 도구들은 UI를 혼란스럽게 만들고 앱을 탐색하기 어렵게 만들 수 있습니다. 이를 해결하기 위해, 우리는 최상위 컨테이너에서 비탐색 구성 요소를 제거하여 탐색 허브로 변형하고 다른 모든 탐색 버튼을 이동시켰어요. 아, 그리고 우리는 현대적인 스타일도 적용했어요. 이제 Reactime을 사용하는 방법에 대해 고민하는 시간을 줄이고 실제로 사용하는 시간을 늘릴 수 있어요. 추가로, 주 컨테이너는 React fiber tree(또는 해당 컨테이너 내에 표시되는 다른 도구들)에 더 많은 공간을 제공합니다.

![이미지](/assets/img/2024-05-17-Reactimev25Thetimetoreactisnow_1.png)

버그 수정: 이제 더 부드러워요

이전 버전의 Reactime Chrome 확장 프로그램은 가끔 시작할 때 문제를 발생시켜 Chrome 브라우저가 오랫동안 활성화되어 있으면 작동을 중단할 수 있었습니다. 이 문제를 해결하기 위해, 저희 팀은 Chrome API의 비동기성을 처리하기 위한 개선을 구현하여, 브라우저가 오랫동안 활성화되어 있으면 더 부드럽게 작동하도록 보장했어요. 주된 문제는 활성 탭의 속성에 액세스를 시도하기 전에 어떤 탭이 활성인지 확인하지 않았다는 것이었어요. 이 문제는 Chrome API의 비동기적 특성을 부적절하게 처리하여 발생했죠. 이를 해결하기 위해, background.js 파일의 코드를 다시 구성하여 비동기 작업을 올바르게 처리했어요. 이를 위해, 내용 스크립트를 삽입하기 전에 활성 탭을 쿼리하는 로직을 추가하여, 확실한 컨텍스트에서 이동하기 전에 확장 프로그램이 올바른 컨텍스트를 갖도록 했어요. 추가로, 활성 탭이 무엇인지 계속 확인하고 확증하기 위한 구독 서비스가 구현되었어요. 이 접근 방식은 더 많은 리소스를 소비하지만, 브라우저가 오랫동안 활성화되어 있을 때 확장 프로그램이 작동 중단되지 않도록 보장합니다.

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

이러한 개선으로 중요한 긍정적 결과가 나타났습니다. 시작 대기 시간이 약 10초에서 2초 미만으로 줄어 들었습니다. 이전에 8회 중 4회 발생했던 시작 실패는 수정 후 테스트된 5건에서 모두 제거되었습니다. 더불어, 확장 기능이 작동을 중지하기 전의 최대 유휴 시간이 22분에서 테스트된 최대 기간인 3일로 증가했습니다.

Chrome API의 비동기 처리를 해결하고 활성 탭을 추적하는 강력한 메커니즘을 구현함으로써 Reactime 확장의 신뢰성과 성능이 크게 향상되었습니다. 이러한 개선으로, 브라우저가 장기간 유휴 상태에 있더라도 개발자가 가로막힘 없이 작업을 수행할 수 있게 되었습니다.

테스트

오픈 소스 프로젝트를 유지하기 위해서는 미래 기여자가 계속해서 발전시킬 수 있도록 유지 가능해야 합니다. 소프트웨어 테스트는 결함을 감지하고 품질과 성능을 향상시키는 중요한 도구입니다. 이에 우리는 테스트의 타당성을 높이는 데 크게 투자했습니다. 결과는 65%의 테스트 통과율 증가입니다.

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

결론

이미 강력한 디버깅 도구가 더 쉽게 사용할 수 있도록 개선되었으며, 새로운 기능, 시스템 개선 및 스타일 업데이트를 자랑합니다.

Reactime에 기여하거나 실험해 보고 싶다면 GitHub 페이지를 확인해보세요!

Chrome 웹 스토어에서 확장 프로그램을 시도해보세요.

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

# v25 Reactime 팀을 만나보세요:

- Logan Nelsen | [GitHub](GitHub 링크) | [LinkedIn](LinkedIn 링크)
- Haider Ali | [GitHub](GitHub 링크) | [LinkedIn](LinkedIn 링크)
- Mel Koppens | [GitHub](GitHub 링크) | [LinkedIn](LinkedIn 링크)

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

Jose Luis Sanchez | GitHub | LinkedIn

저희 웹사이트를 방문하시고 GitHub에서 별표를 부탁드립니다!
