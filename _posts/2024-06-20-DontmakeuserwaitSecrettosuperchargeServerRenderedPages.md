---
title: "사용자를 기다리게 하지 마세요 서버 렌더링 페이지를 강화하는 비결"
description: ""
coverImage: "/assets/img/2024-06-20-DontmakeuserwaitSecrettosuperchargeServerRenderedPages_0.png"
date: 2024-06-20 01:11
ogImage: 
  url: /assets/img/2024-06-20-DontmakeuserwaitSecrettosuperchargeServerRenderedPages_0.png
tag: Tech
originalTitle: "Don’t make user wait: Secret to supercharge Server Rendered Pages"
link: "https://medium.com/angel-tech/dont-make-user-wait-secret-to-supercharge-server-rendered-pages-9f7cb50d0124"
---


<img src="/assets/img/2024-06-20-DontmakeuserwaitSecrettosuperchargeServerRenderedPages_0.png" />

우리는 빠르게 움직이는 디지털 시대에 살고 있습니다. 사용자들은 내용에 즉시 접근하길 원하기 때문에 웹 사이트의 성능은 매우 중요합니다. 페이지가 느리게 로딩되면 사용자들은 답답함을 느끼고 잠재적인 고객을 놓칠 수 있습니다. 서버 측 렌더링(SSR)은 서버 측에서 HTML을 생성하여 사용자 경험에 부근을 가져다주는 축복처럼 나타났지만, 핵심적으로 최적화되어야 합니다.

# 속도에 대한 필요성

연구는 항상 느린 페이지가 사용자 참여와 전환율에 심각한 영향을 미친다는 것을 발견해왔습니다.

<div class="content-ad"></div>

온라인 소비자들은 판단을 빨리 내립니다. 연구에 따르면, 88%의 사용자는 나쁜 경험 후 웹사이트로 다시 돌아오기를 더욱 꺼립니다.

![이미지](/assets/img/2024-06-20-DontmakeuserwaitSecrettosuperchargeServerRenderedPages_1.png)

또 다른 연구에 따르면, 모바일 페이지 로드 시간을 0.1초 줄이면 소매 사이트의 전환율이 8.4% 상승하고 여행 사이트의 경우 10.1% 증가했습니다.

![이미지](/assets/img/2024-06-20-DontmakeuserwaitSecrettosuperchargeServerRenderedPages_2.png)

<div class="content-ad"></div>

이거 엄청 커. 그렇기 때문에 웹 성능을 무시할 수 없어요.

# Angelone SSR 아키텍처

우리는 주요 UI 기술 스택으로 Sveltekit과 tailwind css를 선택했어요.

사용자는 3가지 방법으로 웹 앱에 접근할 수 있어요.

<div class="content-ad"></div>

- Angelone Android 네이티브 앱
- Angelone iOS 네이티브 앱
- 웹 브라우저

네이티브 앱의 경우 웹 앱을 웹뷰 내에서 열고 있습니다.

따라서 앱 내 다양한 부분을 이동할 때 사용자가 연결이 끊어졌다고 느끼지 않도록 성능이 더욱 중요합니다.

# 병목 현상 식별 및 해결

<div class="content-ad"></div>

초기의 SSR 슈퍼차징 단계는 성능 제한 요인을 식별하는 것입니다. 이러한 제한 요인은 서버 측과 브라우저 측에서 발생할 수 있습니다.

서버 측 제한 요인:

- 비효율적인 코드 및 데이터 처리: 최적화되지 않은 코드와 비효율적인 알고리즘은 서버가 HTML을 생성하는 데 느릴 수 있습니다. 분석 및 코드 리팩토링을 통해 이러한 문제를 식별하고 해결할 수 있습니다.
- 비효율적인 캐싱 전략: SSR에서 캐싱은 중요한 역할을 합니다. 올바르게 구성되지 않은 캐시는 불필요한 재랜더링과 지연을 초래할 수 있습니다. 효율적인 캐싱 메커니즘을 구현하면 성능을 크게 향상시킬 수 있습니다.
- 네트워크 지연: 서버와 사용자 브라우저 간 데이터 전송에 소요되는 시간은 페이지 로드 시간에 큰 영향을 미칠 수 있습니다. 콘텐츠 전달 네트워크(CDN) 및 엣지 서버를 활용하여 콘텐츠를 사용자에게 더 근접하게 배포하고 지연을 줄일 수 있습니다.

브라우저 측 제한 요인:

<div class="content-ad"></div>

- 큰 JavaScript 번들: JavaScript는 상호 작용에 필수적이지만, 큰 번들은 페이지 렌더링을 지연시킬 수 있습니다. 코드 분할과 최소화를 통해 JavaScript 파일의 크기를 줄이고 로드 시간을 개선할 수 있습니다.
- 최적화되지 않은 DOM 조작: 문서 객체 모델(DOM)의 과도하거나 비효율적인 조작은 성능 문제로 이어질 수 있습니다. DOM 업데이트를 신중히 최적화하면 렌더링 속도를 향상시킬 수 있습니다.
- 최적화되지 않은 에셋: 큰 이미지, CSS 파일 및 폰트도 페이지 로드 시간을 늦출 수 있습니다. 이러한 에셋을 압축 및 최적화하면 상당한 차이를 만들 수 있습니다.

# 웹 비탈스(Web Vitals)로 성능 모니터링하기

Google의 웹 비탈스는 웹 페이지에서 사용자 경험을 측정하고 추적하기 위한 표준화된 메트릭을 제공합니다.

![이미지](/assets/img/2024-06-20-DontmakeuserwaitSecrettosuperchargeServerRenderedPages_3.png)

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-DontmakeuserwaitSecrettosuperchargeServerRenderedPages_4.png" />

여기서 페이지 로드 지표는 다음과 같습니다:

- 가장 큰 콘텐츠 페인트 (LCP): 페이지에서 가장 큰 콘텐츠 요소가 보이기 시작하는 데 걸리는 시간을 측정합니다.
- 첫 번째 콘텐츠 페인트 (FCP): 사용자가 페이지로 처음 이동한 시점부터 화면에 콘텐츠의 일부가 렌더링되기 시작하는 시간을 측정합니다.
- 첫 번째 바이트까지의 시간 (TTFB): 리소스 요청과 응답의 첫 번째 바이트가 도착하기 시작하는 시간을 측정하는 지표입니다.

이러한 지표를 모니터링하면 최적화가 필요한 영역을 식별하고 노력의 영향을 추적할 수 있습니다.

<div class="content-ad"></div>

# 전문가 도구

SSR 최적화 여정을 돕기 위한 여러 도구들이 있습니다:

- Lighthouse: 웹 사이트 성능, 접근성 등에 대한 포괄적인 통찰을 제공하는 구글의 오픈소스 도구입니다.
- PageSpeed Insights: 페이지 속도 분석과 최적화 제안을 제공하는 또 다른 구글 도구입니다.
- WebPageTest: 다양한 조건 하에서 웹 사이트 성능을 측정하는 강력한 도구입니다.
- 실제 사용자 모니터링(RUM) 데이터: 실제 사용자들이 웹 사이트를 경험하는 방식에 대한 데이터를 수집하여 소중한 현실 세계의 통찰을 제공합니다.

# 최적화 전략

<div class="content-ad"></div>

SSR 페이지를 업그레이드하기 위한 주요 최적화 전략 몇 가지를 소개해 드릴게요:

캐싱에 대해 언급할 때, 세 가지 방법으로 구현할 수 있어요

- 단기 - 몇 분
- 중기 - 몇 시간
- 장기 - 몇 일

우리는 초기 페이지 렌더링에 필요한 API 목록을 식별했고, 자주 변경되지 않는 데이터에 대한 단기 메모리 API 캐싱을 구현했어요.

<div class="content-ad"></div>

아래는 마크다운 형식으로 변경한 내용입니다.


![Image 1](/assets/img/2024-06-20-DontmakeuserwaitSecrettosuperchargeServerRenderedPages_5.png)

우리가 이 변경 사항을 배포한 후에는 Backend API에 대한 히트가 급격히 감소했습니다.

![Image 2](/assets/img/2024-06-20-DontmakeuserwaitSecrettosuperchargeServerRenderedPages_6.png)

이는 이제 Backend 서버가 다른 중요 사항에 더 많은 시간을 할애하고 더 적은 부하로 인해 더 빠르고 지연 시간이 낮아질 것을 의미합니다.


<div class="content-ad"></div>

우리의 프런트엔드 서버와 백엔드 서버는 같은 가상 사설 클라우드(VPC) 안에 있어요. 이 설정을 활용해서 백엔드 API의 내부 엔드포인트를 호출하기 시작했어요.

![이미지](/assets/img/2024-06-20-DontmakeuserwaitSecrettosuperchargeServerRenderedPages_7.png)

장점:
- 성능: 내부 API는 외부 엔드포인트를 통과하는 것보다 더 빠를 수 있어요.
- 신뢰성: 내부 API는 덜 고장이 날 가능성이 높기 때문에 믿을 만해요.

<div class="content-ad"></div>

사용자가 즉시 볼 수 있는 콘텐츠 렌더링을 우선시하세요.

![image](/assets/img/2024-06-20-DontmakeuserwaitSecrettosuperchargeServerRenderedPages_8.png)

혜택:

- html, javascript 및 이미지를 포함한 데이터 양을 줄여 데이터 전송 양을 줄임
- 즉 브라우저가 더 적은 작업을 해야 하므로 콘텐츠를 보다 빠르게 렌더링할 수 있습니다.

<div class="content-ad"></div>

로딩 프로세스 중에 필수 리소스를 미리 가져오세요.

이렇게 하면 스타일이 적용되지 않은 텍스트(Flash of unstyled text, FOUT)가 방지됩니다.

![image1](/assets/img/2024-06-20-DontmakeuserwaitSecrettosuperchargeServerRenderedPages_9.png)

![image2](/assets/img/2024-06-20-DontmakeuserwaitSecrettosuperchargeServerRenderedPages_10.png)

<div class="content-ad"></div>

Pre-connect은 페이지 상단 콘텐츠가 제 3자 또는 CDN 네트워크에서 에셋이나 이미지를 필요로 하는 경우에 유용합니다.


![이미지](/assets/img/2024-06-20-DontmakeuserwaitSecrettosuperchargeServerRenderedPages_11.png)


Pre-connect를 사용하지 않으면 브라우저는 우선 콘텐츠를 다운로드한 후, 다른 출처에 대한 에셋에 따라 특정 콘텐츠를 찾으면, 먼저 제 3자와 연결을 시도한 뒤 연결이 확립되면 콘텐츠를 다운로드하므로 중요한 시간이 소비됩니다.

Pre-connect를 사용하면 브라우저는 우선 콘텐츠를 다운로드하는 동안 제 3자와 연결을 설정하고 필요한 다운로드가 즉시 시작됩니다.

<div class="content-ad"></div>

폰트는 두 가지 방법으로 사용할 수 있어요.

- 구글 폰트, 폰트 어썸 등과 같은 타사 서비스 사용
- 폰트 자체 호스팅

데이터에 따르면 웹 페이지의 20%만이 자체 호스팅된 폰트를 사용하는데, 나머지는 자체 호스팅 + 타사 혹은 단독으로 타사 폰트를 사용하고 있어요.

이전에는 브라우저의 공유 캐시 때문에 타사 폰트를 사용하는 것에 성능상의 이점이 있었어요.

<div class="content-ad"></div>

하지만 Chrome 버전 85부터 Chrome 팀이 캐시 파티션을 도입했는데, 이는 한 웹사이트의 캐시된 리소스를 다른 웹사이트가 사용할 수 없다는 뜻입니다. 따라서 성능 상의 이점이 없어졌습니다.

이에 더해, 써드파티 원본과의 사전 연결(pre-connect)에 대한 추가적인 부담이 있습니다. 이는 고가 소요됩니다.

![이미지](/assets/img/2024-06-20-DontmakeuserwaitSecrettosuperchargeServerRenderedPages_12.png)

하지만 자체 호스팅 폰트를 사용하면 도전이 발생합니다. 모든 자체 호스팅 폰트의 제 75 백분위수 크기는 75KB로 매우 큽니다. 이는 폰트가 많은 언어와 문자를 포함하기 때문인데, 대부분의 경우 사이트에서 실제로 필요하지 않은 것입니다.

<div class="content-ad"></div>

저희는 온라인으로 글꼴을 다운로드 받아서 (크기는 63kb였습니다) 모든 불필요한 문자를 제거하여 글꼴 크기를 7.2kb로 줄였어요. 이는 Yellow Lab 도구의 도움으로 88% 감소했습니다.

![이미지](/assets/img/2024-06-20-DontmakeuserwaitSecrettosuperchargeServerRenderedPages_13.png)

# 최적화의 영향

다행히도, SSR을 최대한 최적화하는 투자는 매우 좋은 수확을 낼 수 있습니다.

<div class="content-ad"></div>

엔젤 원을 예로 들어보면, FCP 숫자를 1500ms 대신 1230ms로 개선했더니 전환율이 최대 30%까지 상승했습니다.

![이미지](/assets/img/2024-06-20-DontmakeuserwaitSecrettosuperchargeServerRenderedPages_14.png)

작은 개선조치라도 비즈니스 결과로 이어질 수 있는 좋은 예시입니다.

# 결론

<div class="content-ad"></div>

요약하자면, 서버 측 렌더링의 최적화는 현대 웹에서 모두에게 이상적인 경험을 제공하기 위해 반드시 해야 합니다.

성능 병목 현상을 최적화하고 웹 핵심 지표를 모니터링하며 적절한 최적화 전략을 활용하면 SSR 페이지를 빠르게 만들어 사용자 참여도를 높이고 전환율을 높이는데 도움이 됩니다.

https://www.youtube.com/watch?v=xUMgwaKkDg4&ab_channel=DeveloperSummit