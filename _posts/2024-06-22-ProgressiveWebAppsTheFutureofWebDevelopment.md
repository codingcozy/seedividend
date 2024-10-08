---
title: "프로그레시브 웹 앱 웹 개발의 미래"
description: ""
coverImage: "/assets/img/2024-06-22-ProgressiveWebAppsTheFutureofWebDevelopment_0.png"
date: 2024-06-22 15:21
ogImage:
  url: /assets/img/2024-06-22-ProgressiveWebAppsTheFutureofWebDevelopment_0.png
tag: Tech
originalTitle: "Progressive Web Apps: The Future of Web Development"
link: "https://medium.com/@kanerika/progressive-web-apps-the-future-of-web-development-8f1e0bf28c7b"
isUpdated: true
---

Progressive Web Apps (PWAs)은 디지턈 랜드스케이프를 변화시키고 있습니다. 웹 및 모바일 앱 기능을 혼합한 형태를 제공합니다. 앱 스토어에는 500만 개 이상(그 수는 계속 늘어나고 있습니다)의 앱이 있지만, PWAs는 저장 공간이 부족하거나 불규칙하게 사용되는 일반적인 제약을 제거하는 색다른 대안을 제공합니다. 네이티브 앱의 속도와 오프라인 기능을 웹 앱의 접근성과 편리함과 결합시킨 것으로, 다운로드가 필요하지 않습니다.

이러한 웹 애플리케이션은 서비스 워커(Service Workers) 및 React와 같은 현대 기술을 사용하여 구축되어 다양한 운영 체제 간에 작동하고 장치 하드웨어와 상호 작용할 수 있습니다. PWAs는 향상된 보안 기능과 쉬운 유지보수를 제공하여, 서버에 호스팅되고 URL을 통해 액세스되기 때문에 정기적인 업데이트가 필요 없습니다. 서비스 워커 기반 캐싱을 사용하여 오프라인에서 작동할 수 있는 PWAs는 웹 기술에서 상당한 발전을 이루었으며, 연결이 약한 지역에서도 중단 없이 액세스할 수 있습니다.

PWAs는 사용자 경험을 최적화할 뿐만 아니라 기업에도 상당한 혜택을 제공합니다. 사용자 참여와 전환율을 높이고 개발 시간과 비용을 줄입니다.

# 프로그레시브 웹 앱이란?

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

점진적 웹 앱(PWAs)은 네이티브 앱처럼 작동하지만 웹 브라우저를 통해 액세스되는 웹 애플리케이션입니다. 사용자에게 오프라인 사용, 푸시 알림, 장치 하드웨어 액세스와 같은 최고의 모바일 앱 기능을 제공하지만 다운로드나 설치가 필요하지 않습니다. PWAs는 HTML, CSS 및 JavaScript와 같은 최신 웹 기술을 사용하여 개발되며 오프라인 기능을 활성화하기 위해 서비스 워커를 사용합니다.

PWAs는 서버에 호스팅되고 URL을 통해 액세스되어 내부 저장 공간을 소비하는 설치와 업데이트가 필요하지 않습니다. 다양한 브라우저, 화면 크기 및 장치 사양에 매끄럽게 적응하도록 설계되어 있어서 앱스토어 배포의 번거로움 없이 모든 장치에서 사이트나 앱을 전달하는 올인원 솔루션으로 사용할 수 있습니다.

PWAs의 가장 큰 장점 중 하나는 오프라인에서 작동할 수 있는 점입니다. 사용자가 리소스를 요청하면 서비스 워커를 통해 전달되며, 서비스 워커는 캐시에서 일치하는 항목을 검색합니다. 일치하는 항목이 있으면 PWA는 캐시된 리소스로 응답하고, 그렇지 않으면 리소스가 일반적으로 요청됩니다. 리소스를 캐싱함으로써 PWA는 네트워크 요청을 피하고 오프라인 작동이 가능합니다. 사전 캐싱은 PWA의 디자인 핵심으로, 오프라인에서도 탁월한 성능을 보여줍니다.

PWAs는 안전하게 설계되어 있으며, HTTPS 호스팅을 통해 보안을 보장합니다. 홈 화면에 저장하고 시작 메뉴나 작업 표시줄에 추가할 수 있으며, 네이티브 앱처럼 운영 체계 파일 관리자에서 파일을 처리할 수 있습니다.

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

PWA는 사용자 참여도와 전환이 증가하고, 여러 코드베이스에서 디자인하는 것을 피함으로써 개발 시간과 예산을 절약할 수 있습니다. 이러한 앱은 비용 효율적이며, 개발에 소요되는 시간이 적고 널리 사용할 수 있습니다.

# PWA의 장점

모바일 앱과 웹의 최상의 기능을 결합하여 앱을 만들기 위한 경제적이고 현실적인 솔루션을 찾고 있다면, PWA(Progressive Web Apps)가 해결책이 될 수 있습니다. 다음은 PWA 사용의 장점 중 일부입니다:

## 1. 빠르고 오프라인 사용

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

Progressive Web Apps (PWAs)는 서비스 워커를 사용하여 오프라인에서 작동할 수 있어 인터넷 연결 없이도 리소스를 캐시하여 액세스할 수 있습니다. 이로 인해 인터넷 사용 가능성이 제한된 사용자들에게 이상적입니다. 또한 PWAs는 로컬에 리소스를 저장하여 느린 네트워크에서도 빠르게 로드됩니다. 더구나, 이러한 앱은 네이티브 앱과 유사한 경험을 제공하며 모든 OS에 설치할 수 있고, 기기 하드웨어에 액세스하며 주기적으로 업데이트를 받을 수 있습니다. PWAs는 사용자 데이터 보호를 위해 안전한 HTTPS 서버에 호스팅되어 보안을 우선시합니다.

## 2. 주기적인 업데이트

PWAs는 주기적인 업데이트를 지원하여 사용자에게 네이티브 앱 경험을 제공합니다. 이를 통해 앱은 최신 기능과 버그 수정으로 업데이트되어 유지될 수 있습니다.

## 3. 최신 웹 기술

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

프로그레시브 웹 앱(PWAs)은 서비스 워커와 리액트 같은 현대 웹 기술을 사용하여 구축된 웹 애플리케이션입니다. 이를 통해 개발하기 쉽고 널리 사용할 수 있습니다.

## 4. 크로스 플랫폼 호환성

PWAs는 모든 운영 체제에 설치할 수 있으며 장치의 하드웨어 기능에 액세스할 수 있어 다양한 사용자에게 접근 가능합니다.

## 5. 점진적 향상

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

PWAs는 점진적 향상을 활용하여 사용자에게 더 나은 경험을 제공합니다. 심지어 장치가 앱의 모든 기능을 지원하지 않을 때에도요.

## 6. 보안

PWAs는 서버에 호스팅되며 URL을 통해 접근되므로 안전합니다. 또한 HTTP를 통해 호스팅되어 추가적인 보안층을 제공합니다.

## 7. 반응형 디자인

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

PWA는 효과적인 반응형 또는 적응형 디자인 덕분에 모든 기기에서 다양한 브라우저, 화면 크기 및 기기 사양에 매끄럽게 적응합니다. 더불어, 이러한 특성 덕분에 클라이언트, 개발자 및 사용자에게 모두 편리한 올인원 솔루션을 제공할 수 있습니다.

## 8. 파일 캐싱

PWA는 네트워크 요청을 피하고 오프라인 상태에서 작동하기 위해 캐싱 리소스를 사용합니다. 사전 캐싱은 PWA 디자인의 핵심 기능으로, 이를 통해 오프라인 환경에서도 작동할 수 있습니다.

## 9. 사용 편의성

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

PWA는 메타데이터 파일(manifest.json)이 있어 홈 화면에 PWA를 편리하게 저장할 수 있습니다. 시작 메뉴나 작업 표시줄에 추가할 수 있고, 운영 체제 파일 관리자에서 파일을 처리하는 등 네이티브 앱과 같이 작동할 수 있습니다.

## 10. 사용자 참여와 전환 증대

PWA는 사용자 참여 및 전환을 증대시킬 수 있어 기업에 유용한 도구가 될 수 있습니다.

# PWA를 활용한 사용자 참여 및 전환

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

프로그레시브 웹 앱(PWAs)은 모바일 앱과 웹 기능을 결합하여 오프라인 사용과 속도를 제공하며 다운로드가 필요하지 않습니다. PWAs는 비용 효율적이며 빠르게 개발할 수 있으며 다양한 화면 크기와 기기 사양에 적응하여 디바이스 및 브라우저 간에 작동합니다. PWAs는 진보적 향상을 통해 사용자 경험을 향상시키며 기능이 제한된 기기에서도 안전하며 HTTPs 서버와 URL을 사용하여 접근합니다.

PWAs는 사용자 참여 및 전환이 향상되며 개발 시간을 절약하고 여러 코드 베이스가 필요한 부담을 줄입니다. 오프라인 액세스를 위한 사전 캐싱을 지원합니다.

주목할만한 예시로는 스타벅스, 우버, 그리고 Microsoft의 Linux용 팀이 있습니다. 스타벅스의 PWA는 iOS 앱보다 훨씬 작아서 웹 사용자 주문이 두 배로 늘었고 오프라인에서도 원활하게 작동합니다. 우버의 PWA는 2G 네트워크에서 효율적으로 작동하여 주요 연결 문제를 해결합니다. Microsoft의 팀 PWA는 Linux 사용자에게 완전한 데스크탑 경험을 제공합니다.

PWAs는 전자 상거래 및 데이터가 비실하고 연결이 제한된 개발도상국에서 특히 유용하며 앱과 웹사이트의 최상의 기능을 제공합니다.

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

# 성공적인 PWA의 현실 세계 예시

최근 몇 년간, Progressive Web Apps(PWAs)는 사용자에게 모바일 앱과 모바일 웹의 장점을 모두 제공할 수 있어서 인기를 얻었습니다. 이 섹션에서는 성공적인 PWA의 현실 세계 예시를 살펴보고, 기업과 사용자 모두에게 어떻게 혜택을 주었는지 알아보겠습니다.

# 스타벅스

스타벅스는 기존의 네이티브 앱과 유사한 PWA 주문 시스템을 구축했습니다. 그들의 PWA 크기는 iOS 앱보다 99.84% 작아져, 저장 공간이 제한된 사용자에게 더 쉽게 접근할 수 있게 되었습니다. 외출 중인 소비자들이 연결 상태를 드나들면서 이동 중 주문을 하게 되어 새로운 PWA로 혜택을 받았습니다. 결과적으로, 스타벅스는 매일 주문하는 웹 사용자 수를 두 배로 늘렸으며, 데스크톱 사용자들이 이제 모바일 사용자들과 동일한 속도로 주문하고 있습니다.

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

# 우버

우버의 PWA 앱은 저속 2G 네트워크에서도 차량 예약이 가능하게 합니다. 단 50kB로 구성된 코어 앱은 2G 네트워크에서 3초 만에 로드될 수 있습니다. 이는 모든 택시 회사의 백만 달러 문제를 해결했으며, 제한된 데이터와 연결이 불안정한 사용자에게 더 접근성이 향상되었습니다.

# 마이크로소프트 Teams

심지어 마이크로소프트도 리눅스 사용자를 위해 최신 기능과 데스크톱 경험을 제공하기 위해 Teams PWA를 출시했습니다. 마이크로소프트의 PWABuilder와 구글의 Bubblewrap은 이제 개발자들이 TWA(Trusted Web Activity)를 사용하여 Progressive Web Apps를 시작하는 안드로이드 어플리케이션을 생성, 빌드 및 업데이트할 수 있도록 함께 작업하고 있습니다.

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

# Flipboard

플립보드는 소셜 뉴스 집계기로, PWA를 출시한 이후 사이트에서 보내는 시간이 3.7배 증가하고 세션 당 방문 페이지 수는 2.8배 증가했습니다. PWA 덕분에 플립보드는 사용자 참여도와 전환율을 높일 수 있었습니다.

# MakeMyTrip

MakeMyTrip은 인도의 선도적인 온라인 여행 회사입니다. 2017년 PWA를 출시한 결과 전환율이 3배 증가하고 사용자 세션도 160% 증가했습니다. PWA 덕분에 MakeMyTrip은 다중 코드 베이스에서의 설계를 피하므로 개발 시간과 예산을 절약할 수 있었습니다.

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

# 핀터레스트

핀터레스트의 PWA는 참여율이 60% 증가하고 사용자 생성 광고 수익은 44% 증가, 그리고 사이트에서 소요되는 시간이 40% 증가했습니다. PWA는 핀터레스트가 사용자 참여율과 변환을 증가시키는 데 도움이 되었습니다.

# 스포티파이

스포티파이의 PWA는 사용자 참여율과 변환을 증가시키는 데 도움이 되었습니다. PWA를 통해 사용자는 오프라인으로 음악 라이브러리와 재생 목록에 액세스할 수 있어 데이터가 제한되거나 연결이 나쁜 사용자에게 더 접근하기 쉬워졌습니다.

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

# 결론

PWA는 두 마리 토끼를 모두 잡는 솔루션이에요. 모바일 앱의 속도와 오프라인 사용성을 결합하면서 웹 기반 응용 프로그램의 가격 대비 효율성과 접근성을 제공합니다.

PWA는 혼잡한 앱 시장에서 돋보이고자 하는 모든 규모의 비즈니스에 실용적인 해결책을 제공합니다. 이해말로, 모바일 앱의 속도와 오프라인 사용성을 결합하면서 웹 기반 응용 프로그램의 가격 대비 효율성과 접근성을 제공합니다.
