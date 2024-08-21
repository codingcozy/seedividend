---
title: "웹 콘텐츠를 더 빠르게 전달하는 새로운 패러다임들"
description: ""
coverImage: "/assets/img/2024-06-19-TheEmergingParadigmsforDeliveringWebContentFaster_0.png"
date: 2024-06-19 22:38
ogImage:
  url: /assets/img/2024-06-19-TheEmergingParadigmsforDeliveringWebContentFaster_0.png
tag: Tech
originalTitle: "The Emerging Paradigms for Delivering Web Content Faster"
link: "https://medium.com/better-programming/the-emerging-paradigms-for-delivering-content-faster-6b9927d317d2"
isUpdated: true
---

![TheEmergingParadigmsforDeliveringWebContentFaster_0](/assets/img/2024-06-19-TheEmergingParadigmsforDeliveringWebContentFaster_0.png)

React, Svelte, Vue 등 구성 요소 기반 프레임워크가 나오기 전에는 모든 콘텐츠를 서버에서 렌더링하는 것이 보편적이었습니다. 그때는 웹 사이트를 탐색하는 것이 서버로 여러 요청을 하게 되어 HTML, CSS 및 JS로 렌더링된 내용을 다시 웹 브라우저로 보내는 것이었습니다. 이를 서버 사이드 렌더링 (SSR)이라고 합니다.

![TheEmergingParadigmsforDeliveringWebContentFaster_1](/assets/img/2024-06-19-TheEmergingParadigmsforDeliveringWebContentFaster_1.png)

이후 React 및 다른 구성 요소 기반 프레임워크들이 나오면서 조금 덜 일반적인 클라이언트 사이드 렌더링 (CSR) 방법이 개발자들의 가장 선호하는 선택이 되었습니다. 개발자들은 싱글 페이지 애플리케이션을 만들고, 렌더링 콘텐츠의 책임을 서버에서 브라우저로 옮기는 경향을 보였습니다.

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

![TheEmergingParadigmsforDeliveringWebContentFaster_2](/assets/img/2024-06-19-TheEmergingParadigmsforDeliveringWebContentFaster_2.png)

이러한 유형의 CSR은 시간이 지남에 따라 지나치게 발전되었습니다. 웹 사이트에서 애플리케이션의 모든 렌더링 논리를 브라우저로 보내는 것이 드문 일이 아닙니다. 문제는 JavaScript가 바이트 단위로 볼 때 브라우저에서 가장 느린 파일을 불러오는 것입니다. 서버는 사용자에게 정적 HTML로 콘텐츠를 렌더링하는 데 더 많은 리소스를 활용할 수 있으며 해당 콘텐츠를 더 빠르게 받을 수 있습니다. 제가 Islands Architecture에 대한 내 문서를 읽었다면 다른 옵션 몇 가지를 이미 알고 있을 것입니다.

그러나 클라우드 컴퓨팅의 등장으로 인해, 클라이언트와 애플리케이션 서버만 고려해야 하는 것보다 더 많은 고려해야 할 사항이 있습니다. 정적 콘텐츠의 전달 속도를 높이는 데 도움이 되는 다른 글로벌 사용 가능한 기술이 있습니다.

이 기사에서는 클라우드를 활용하여 정적 및 동적 콘텐츠의 캐싱 및 렌더링을 가속화하는 최근의 패러다임 중 하나인 정적 사이트 생성, 컨텐츠 전송 네트워크 및 Edge Computing에 대해 자세히 살펴보겠습니다.

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

# 정적 사이트 생성 (SSG)

SSR 및 CSR과 마찬가지로, 정적 사이트 생성은 웹 사이트를 HTML 콘텐츠로 렌더링하는 또 다른 방법입니다.

## SSG란?

SSG는 클라이언트 요청을 받기 전에 HTML을 미리 렌더링하는 방법입니다. SSG는 서버사이드 렌더링과 대조적으로 페이지가 빌드 타임에 정적으로 렌더링되므로 클라이언트가 서버에 요청할 때가 아닙니다.

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

<img src="/assets/img/2024-06-19-TheEmergingParadigmsforDeliveringWebContentFaster_3.png" />

이 방법에는 몇 가지 장점이 있습니다. 클라이언트가 서버로부터 웹페이지를 요청할 때, 자동적으로 해당 콘텐츠로 응답할 수 있습니다. 렌더링이 필요하지 않습니다. JavaScript는 이미 정적 HTML로 변환되어 클라이언트로 직접 전송할 수 있습니다.

## CSR 및 SSR의 단점 해결

정적 사이트 생성은 SSR과 CSR의 문제를 해결하기 위한 솔루션으로 등장했습니다. SSR은 Time to First Byte (TTFB)가 낮다는 문제가 있습니다. 간단히 말해서, SSR 웹사이트를 요청하는 경우 서버에서 해당 웹페이지를 각 요청에 대해 렌더링해야 하므로 서버에서 느린 응답을 받을 수 있습니다. 반면에 CSR은 브라우저가 웹페이지 콘텐츠를 생성하는 데 걸리는 시간과 해당 생성된 콘텐츠가 상호작용 가능해지는 데 걸리는 시간인 First Contentful Paint (FCP), Largest Contentful Paint (LCP), Time to Interactive (TTI)가 더욱 느릴 수 있습니다. 이러한 지표는 브라우저가 웹페이지 콘텐츠를 생성하는 데 얼마나 오래 걸리는지 및 생성된 콘텐츠가 상호작용 가능해지기까지 얼마나 걸리는지를 측정합니다.

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

<img src="/assets/img/2024-06-19-TheEmergingParadigmsforDeliveringWebContentFaster_4.png" />

SSG란 각 웹 사이트 경로에 대해 미리 HTML 파일을 생성하여 FCP, LCP 및 TTI가 빨라지도록 하는 것입니다. 내용은 이미 렌더링되어 있으며 요청이 발생할 때 서버에서 로직을 수행할 필요가 없어 TTFB가 더 빨라집니다. 내용은 서버나 CDN에 캐시될 수도 있어 매우 빠른 응답이 가능합니다. SSG는 자주 변경되지 않는 정적 콘텐츠에 이상적입니다. FAQ나 About 페이지와 같은 내용에 적합합니다.

## SSG의 함정

정적 사이트 생성은 데이터가 필요한 페이지에도 적용 가능합니다. 이 데이터는 빌드 시간에 HTML에 통합됩니다. 뉴스 기사나 블로그 게시물을 다루는 웹 사이트에서 해당될 수 있습니다. 안타깝게도, 이러한 경우는 SSG의 주요 단점 중 하나인 것을 강조합니다: 변경이 발생할 때마다 전체 페이지를 재구축해야 하며 캐시된 HTML 파일이 무효화됩니다. 이는 SSG가 매우 동적인 콘텐츠에 대해 최상의 선택이 아닐 수 있다는 것을 의미합니다.

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

![이미지](/assets/img/2024-06-19-TheEmergingParadigmsforDeliveringWebContentFaster_5.png)

또한, 사이트의 경로가 많다면 많은 사전 렌더링된 HTML 사이트가 필요할 수 있습니다. 예를 들어, 모든 블로그 게시물을 SSG를 통해 렌더링하는 경우 많은 HTML 파일을 저장할 수 있습니다. 기본 코드베이스에 변경 사항이 발생할 때마다 전체 사이트를 재구축하고 다시 배포해야 한다는 점을 기억하세요. 오타를 수정해야 할 때마다 사이트를 다시 배포해야 한다고 상상해보세요.

## 증분 정적 사이트 생성 (iSSG)

Next.js와 같은 프레임워크에서 제공하는 증분 정적 사이트 생성 (iSSG)을 사용하여 이러한 문제 중 일부를 해결할 수 있습니다. iSSG를 사용하면 서버가 백그라운드에서 사이트에 페이지를 업데이트하고 추가할 수 있으면서도 클라이언트 요청을 처리할 수 있습니다.

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

![이미지](/assets/img/2024-06-19-TheEmergingParadigmsforDeliveringWebContentFaster_6.png)

iSSG를 사용하면 페이지가 빌드 시간이 아닌 첫 요청 시 생성됩니다. 첫 번째 사용자는 서버가 페이지를 빌드할 때 약간의 지연된 응답을 받습니다. 그런 다음 서버는 페이지를 캐시합니다. 그 후의 요청은 이미 빌드되어 있기 때문에 캐시된 사전 렌더링된 HTML 페이지를 보다 빠르게 받을 수 있습니다. 이는 한 형태의 레이지 로딩입니다.

iSSG를 사용하면 만료 시간을 설정해야 합니다. 이후 서버가 페이지를 백그라운드에서 다시 생성합니다. 페이지가 재생성된 후에는 이전의 사전 렌더링된 HTML 복사본이 캐시에서 삭제되고 새 복사본이 이후 요청에 제공됩니다. 이는 상태 갱신 중 사용자가 백그라운드에서 HTML을 재생성하는 동안 사용자에게 이전 페이지가 제공되는 'stale-while-revalidate' 전략의 한 예입니다.

# 컨텐츠 전송 네트워크 (CDN)

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

콘텐츠 전달 네트워크인 CDN은 정적 웹 콘텐츠의 전달을 혁신적으로 개선했습니다.

## CDN이란?

![CDN](/assets/img/2024-06-19-TheEmergingParadigmsforDeliveringWebContentFaster_7.png)

CDN은 매우 간단한 개념입니다. 지리적으로 분산된 서버 네트워크로, 빠르게 콘텐츠를 최종 사용자에게 제공할 수 있습니다. 네트워크 작업을 하는 사람이라면 거리가 요청-응답 주기의 속도에 가장 큰 장애물 중 하나라는 것을 알고 있습니다. CDN은 클라이언트와 콘텐츠 사이의 거리를 제한합니다. 이는 서버가 전 세계 여러 데이터 센터에 존재하기 때문입니다. 이러한 센터들은 정적 콘텐츠를 메모리에 캐시하고, 그런 다음 요청 시 전달하며, 보통 소액의 요금으로 이용 가능합니다. Amazon CloudFront, Akamai, CloudFlare와 같은 예시가 있습니다.

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

## SSG, iSSG 및 CDNs

SSG 및 iSSG로 만든 정적 웹 콘텐츠는 CDN에 이상적이며 글로벌 규모에서도 콘텐츠를 전달하는 데 다음 수준의 속도를 제공할 수 있습니다.

SSG 및 CDN을 사용한 전통적인 배포에서는 오리진 서버가 정적 페이지를 빌드하고 CDN으로 캐시할 것을 보냅니다. 사이트가 재구축될 때마다 CDN 캐시를 업데이트해야 합니다.

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

iSSG를 사용하면 CDN이 클라이언트 요청시 오리진 서버와 더 직접적으로 상호작용합니다. iSSG를 사용하면 페이지는 첫 요청시 빌드되며 만료될 때 백그라운드에서 다시 빌드됩니다. 클라이언트가 요청하면 CDN이 해당 페이지가 캐시되어 있는지 확인합니다. 캐시되어 있다면 해당 페이지를 클라이언트에 제공합니다. 그렇지 않으면 오리진 서버에서 페이지를 요청하고, 서버가 페이지를 빌드하면 해당 페이지가 CDN에 캐시되어 사용자에게 제공됩니다.

첫 번째 사용자만 느린 응답을 받을 수 있습니다. 그 이후에는 일부 사용자가 지난 페이지에 대해 만료된 후 상태 정보를 받을 수 있습니다. 만료는 캐시 제어 HTTP 헤더의 max-age 속성을 사용하여 설정됩니다. Express.js를 사용하여 문서의 최대 나이를 설정하는 예시를 보여드리겠습니다:

```js
res.set("Cache-Control", "public, max-age=120");
```

max-age는 초 단위로 설정됩니다. 위 예시에서는 2분 후에 캐시된 사전 렌더링된 HTML을 무효화합니다. 그 후에는 iSSG를 통해 CDN이 새로운 페이지를 요청하지만, 오리진 서버가 백그라운드에서 요청을 처리함에 따라 만료된 페이지를 계속 제공합니다. 사용자는 일부 만료된 정보를 받을 수 있지만, CDN의 응답은 정적 및 동적 콘텐츠 모두에 대해 매우 빠릅니다.

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

# 엣지 컴퓨팅

지금까지 SSG와 iSSG가 CDN 캐시에서 빠르게 제공될 수 있는 정적, 사전 렌더링된 HTML 페이지를 만들 수 있다는 것을 살펴보았습니다. 그러나 이러한 예제에서는 클라이언트 요청이 여전히 원본 서버와 간접적으로 상호작용하고 있습니다. 페이지는 여전히 원본 서버에서 렌더링되고 CDN에서 제공됩니다. 중간 단계 없이 진행할 수 없을까요? 이 접근 방식을 유지하면서 CDN의 전역 아키텍처를 최적화할 수 있을까요?

네, 가능합니다. 답은 엣지 컴퓨팅이라고 불리는 것에 있습니다.

## 엣지 컴퓨팅이란 무엇인가요?

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

![Edge computing](/assets/img/2024-06-19-TheEmergingParadigmsforDeliveringWebContentFaster_9.png)

에지 컴퓨팅은 IoT와 웹 애플리케이션 개발에서 부상하고 있는 패러다임입니다. 사용자에 가까운 위치에 컴퓨팅 로직과 데이터를 가져오려고 노력합니다. 클라우드와 마찬가지로 글로벌 아키텍처를 추구합니다. 그러나 클라우드와 달리 응용프로그램을 위한 상태 없는 분산 컴퓨팅 성능을 추구합니다.

CDN 서버가 이 패러다임에 완벽하게 들어맞는 모습을 볼 수 있습니다. 이 서버들은 거의 웹 서버처럼 작동하여 클라이언트 요청에 응답하지만 많은 데이터 센터에 전 세계적으로 배치되어 정적 콘텐츠를 최대한 사용자에게 가까이 가져옵니다. CDN 서버의 근접성은 요청과 응답이 웹 페이지를 렌더링하는 데 필요한 거리를 줄이므로 전송 속도에 막대한 혜택을 제공합니다.

![CDN servers](/assets/img/2024-06-19-TheEmergingParadigmsforDeliveringWebContentFaster_10.png)

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

에지 컴퓨팅은, 애플리케이션 서버에 의해 점진적으로 업데이트되어야 하는 정적 콘텐츠를 넘어보며 개발자들이 에지 서버에서 자체 코드를 실행할 수 있게 합니다. 예를 들어, 정적 콘텐츠는 미리 렌더링되어 CDN 캐시에 저장될 수 있고 CDN의 에지 서버에서 실행할 수 있는 스크립트와 함께 저장될 수 있으며 먼 오리진 서버가 아닌 CDN의 에지 서버에서 실행될 수 있어 클라이언트 요청에 따라 진정한 동적 콘텐츠가 생성될 수 있습니다. 이것은 동적 콘텐츠를 캐싱하는 한 가지 방법입니다.

에지는 CDN에만 한정되지 않습니다. 사용자의 기기나 로컬 네트워크에서 데이터를 처리하는 것이나 클라우드가 아닌 곳에서 처리하는 것이 될 수 있습니다. 이에는 사용자의 휴대폰이나 여러 IoT 장치가 포함될 수 있습니다.

## 장단점

에지 컴퓨팅은 정적 및 동적 콘텐츠를 사용자에게 최적화하는 방법이 많이 있습니다. 이러한 성능상의 이점은 이미 분명합니다 - 에지 위치의 근접성으로 인해 사용자가 응답을 받는 데 걸리는 시간이 줄어듭니다.

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

<img src="/assets/img/2024-06-19-TheEmergingParadigmsforDeliveringWebContentFaster_11.png" />

성능 향상뿐만 아니라 이 패러다임은 비용 절감과 증가하는 보안을 제공합니다. 특히 IoT 기기로 콘텐츠를 전달하거나 데이터를 처리할 때 더욱 그렇습니다. 현재 전 세계 가정에 설치된 750억 개 이상의 IoT 기기로 인해 이전보다 훨씬 많은 데이터가 생성되고 있습니다. 모든 이 데이터를 원본 서버로 전송하여 처리하는 것은 시간이 오래 걸리고 비용이 많이 드는 작업일 것입니다. 이 데이터 중 일부는 민감할 수도 있고 시간이 중요한 경우도 있습니다. 엣지 컴퓨팅을 통해 사용자가 생성한 데이터와 가능한 가까운 곳에 유지할 수 있습니다. 사용자나 비즈니스 데이터의 실시간 처리도 가능합니다.

그러나 기본 웹 콘텐츠의 전달에 엣지 컴퓨팅이 최적의 선택이라고 할 수는 없습니다. 이는 신흥 분야이며 엣지에서 일부 기술이 다른 기술(예: 서버리스 함수 등) 대비 40%의 속도 향상을 보여주기는 했지만, 여전히 단점도 있습니다. 예를 들어 데이터베이스를 쿼리해야 하는 경우 엣지에서 요청하는 것이 지연을 증가시킬 수 있습니다. 이는 데이터베이스가 원본 서버보다 엣지 위치에서 더 멀리 있을 수 있기 때문입니다. 이 차이를 줄이기 위한 몇 가지 엣지 데이터베이스는 이미 있지만, 이러한 기술들은 아직 초기 단계에 있습니다.

<img src="/assets/img/2024-06-19-TheEmergingParadigmsforDeliveringWebContentFaster_12.png" />

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

게다가, 엣지 컴퓨팅은 민감한 데이터가 네트워크를 통해 전송되는 양을 줄이는 것으로 일부 보안 이점을 가질 수 있지만, 더 많은 공격 대상을 노출시킬 수도 있습니다. IoT 장치는 특히 공격에 취약한데, 이는 그들의 창조자들이 항상 보안을 최우선으로 하지 않기 때문입니다. 우리는 모두 해커들이 가정용 보안 카메라나 베이비 모니터를 해킹하는 동영상을 본 적이 있습니다. 이러한 공격은 특히 경고적이지만, 많은 민감한 데이터의 보안 침해가 IoT 장치에서 발생하고 완전히 눈에 띄지 않을 수 있습니다. 이러한 공격은 사용자의 개인 정보에도 심각한 피해를 줄 수 있습니다. 침해된 장치는 심지어 봇넷을 생성하고 웹 서버에 DDOS 공격을 발동할 수도 있습니다.

# 신흥 패러다임

현대 사회에서 분권화는 커지는 추세인 것으로 보입니다. 웹 콘텐츠 전달은 기술의 분권화의 다음 단계일 수 있습니다. 결국, 우리는 엔드 사용자에 가능한 한 가까운 곳에 있는 엣지 데이터베이스에 저장된 사용자 데이터가 엣지 서버와 상호 작용하여 개인화된 콘텐츠를 생성하는 것을 볼 수 있을 겁니다. 이러한 사용자 경험은 더 빠르고 더 상호 작용적이며, 희망적으로 더 안전할 것입니다.

지금 당장, 개발자이면 CDNs와 기본적인 엣지 컴퓨팅을 탐험해보는 것이 좋습니다. 이미 사용 가능한 옵션인 Lambda@Edge나 Vercel Edge Functions과 같은 것은 동적 콘텐츠를 엔드 사용자에게 더 가까운 곳에 캐싱함으로써 성능과 보안을 향상시키고 비용을 절감하는 데 도움이 될 수 있습니다.

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

SSG 또는 iSSG에 대해 더 알고 싶다면, patterns.dev를 방문해보세요. 그곳에서 이 주제에 대해 더 깊이 파고들어 설명하고 있어요. Edge 컴퓨팅에 대해 더 알고 싶다면, Vercel Edge Functions나 AWS의 Lambda@Edge를 살펴보세요.
