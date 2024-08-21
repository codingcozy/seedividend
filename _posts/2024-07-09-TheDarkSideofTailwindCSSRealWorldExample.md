---
title: "TailwindCSS의 어두운 면 실전 예시"
description: ""
coverImage: "/assets/img/2024-07-09-TheDarkSideofTailwindCSSRealWorldExample_0.png"
date: 2024-07-09 08:54
ogImage:
  url: /assets/img/2024-07-09-TheDarkSideofTailwindCSSRealWorldExample_0.png
tag: Tech
originalTitle: "The Dark Side of TailwindCSS: Real World Example!"
link: "https://medium.com/@masihtak/the-dark-side-of-tailwindcss-real-world-example-249b1064b89c"
isUpdated: true
---

전문 개발자로서, 항상 워크플로우를 향상시킬 수 있는 도구와 라이브러리를 찾고 있어요. 그러나 인기가 가끔은 속은 것일 수도 있어요. 많은 경험이 풍부한 개발자들이 TailwindCSS 사용에 대한 단점을 블로그 글이나 동영상을 통해 공유해 왔어요. 특히, 유명한 YouTube 동영상에서 만든이가 “TailwindCSS는 존재하지 않는 문제를 해결한다!”라는 비판적인 발언을 했어요. 내 의견으로는, 이것은 실제 문제를 해결하지 못할 뿐만 아니라 더 많은 문제를 야기한다고 봐요.

# 🔥 새로운 트렌드를 맹목적으로 받아들이는 문제점

## 1. 🤯 복잡성 과부하

TailwindCSS와 같은 안티-패턴 라이브러리는 종종 다양한 유틸리티 클래스를 도입해요. 편의성을 약속하지만, 이는 코드베이스를 빨리 혼란스럽게 만들고 스타일을 이해하는 데 어렵게 만들어요. 이 복잡성 과부하는 즉각적인 가독성뿐만 아니라 장기적인 유지보수 및 성능에도 영향을 미쳐요.

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

## 2. 🚨관심사의 분리

CSS의 핵심 원칙 중 하나는 관심사의 분리입니다. TailwindCSS는 HTML 클래스 이름에 스타일 규칙을 직접 삽입하여 이 원칙을 위반합니다. 이러한 방식은 코드의 가독성과 유지 관리성을 현저하게 저하시켜 디버깅과 업데이트를 어렵게 만듭니다.

## 3. 🤢코드 부풀임

TailwindCSS는 HTML 파일에 불필요한 부풀림을 도입하여 웹 사이트의 속도와 성능을 저하시킬 수 있습니다.🐌
이는 원하는 디자인을 달성하기 위해 추가 DOM 요소가 필요할 때 "과도한 DOM 크기"의 문제를 악화시킬 수 있습니다.

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

## 4. 📈 과도한 CSS

TailwindCSS는 종종 많은 양의 CSS 코드를 생성합니다 (purge 옵션을 사용해도), 이 중 많은 부분이 여분이며, 따라서 로딩 시간과 대역폭 사용량이 증가할 수 있습니다. 이러한 과도한 CSS는 페이지 로드 시간을 늦추고 사용자 경험에 부정적인 영향을 줄 수 있는 부담이 될 수 있습니다.

## 5. 🎨창의성 제한

TailwindCSS를 사용하면 창의적 표현이 제한될 수 있어 독특하고 맞춤형 웹사이트를 디자인하는 능력이 제약될 수 있습니다. 미리 정의된 유틸리티 클래스에 의존하는 것은 혁신을 억누르고 균일한 웹 디자인 환경으로 이끌 수 있습니다.

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

# 💻기술적 세부 정보: 성능 영향

TailwindCSS 사용은 원하는 디자인과 일치하는 더 많은 DOM 요소를 생성해야 하므로 성능에 영향을 줄 수 있습니다. 이러한 창의성 부족으로 인해 Google Lighthouse 성능 보고서에서 "과도한 DOM 크기를 피하십시오" 섹션에 기록됩니다.

대형 DOM 트리는 다음과 같은 여러 가지 방법으로 페이지 성능을 저하시킬 수 있습니다:

- 네트워크 효율성 및 로드 성능:
  대형 DOM 트리에는 사용자가 페이지를 처음로드할 때 보이지 않는 많은 노드가 포함되어 있어 사용자의 데이터 비용이 증가하고 로드 시간이 느려집니다.
- 실행 시 성능:
  사용자 및 스크립트가 페이지와 상호 작용할 때 브라우저는 계속해서 노드의 위치 및 스타일을 재계산해야 합니다. 복잡한 스타일 규칙과 결합된 대형 DOM 트리는 렌더링을 심하게 늦추게 할 수 있습니다.
- Reflow 및 Repaint 시간이 더 오래 걸립니다:
  브라우저는 DOM에 변경 사항이 있을 때 페이지를 다시 배치하고 다시 그립니다. 더 많은 요소를 처리해야 하는 대형 DOM은 이러한 작업에 필요한 시간을 더욱 증가시키므로 느린 성능과 좋지 않은 사용자 경험을 초래할 수 있습니다.
- 메모리 성능:

1. 메모리 사용량 증가: 각 DOM 노드는 메모리를 사용합니다. DOM 크기가 커지면 이러한 노드를 저장하고 관리하기 위해 더 많은 메모리가 필요합니다. 일반적으로 데스크톱에 비해 메모리가 적은 모바일 장치는 대형 DOM을 처리하기 어려워져 충돌이나 느린 성능을 야기할 수 있습니다.
2. 분리된 요소: DOM에서 제거되었지만 JavaScript에서 여전히 참조되는 요소는 "분리된 요소"가 됩니다. 이러한 요소는 가비지 컬렉션이 되지 않기 때문에 계속 메모리를 소비합니다. 이는 시간이 지나면 메모리 누수와 메모리 사용량 증가로 이어질 수 있습니다.
3. 빈번한 가비지 수집: 대형 DOM은 브라우저에게 빈번한 가비지 수집을 수행하도록 유도하여 메모리를 해제합니다. 이 프로세스는 자원 집약적일 수 있고 성능 저하로 이어질 수 있습니다.

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

# 실세계 비교

영향을 설명하기 위해 실제 GitHub 코드베이스에서 가져온 간단한 CSS 코드와 TailwindCSS 코드를 사용한 비교 이미지를 만들었습니다.

![비교 이미지](/assets/img/2024-07-09-TheDarkSideofTailwindCSSRealWorldExample_0.png)

이 비교를 고려해 봅시다: 한쪽에는 아름답게 구조화된 HTML 스니펫이 있어 깔끔하고 간결하며 유지보수가 쉽습니다. 반면 다른 한편에는 긴 CSS 클래스의 혼란스러운 코드가 있는데, 이는 안티 패턴 라이브러리 (커흠흠, TailwindCSS) 사용의 전형적인 특징입니다.

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

# 🔄 TailwindCSS를 의미 있는 CSS로 변환해보세요

언급된 문제를 피하기 위해 온라인 도구인 Vanilla Breeze와 같은 도구를 사용하여 TailwindCSS를 의미 있는 CSS로 변환해보는 것을 고려해보세요. 이러한 변환은 최선의 방법을 준수하며 코드 부풀림을 완화하고 가독성을 향상시키며 성능을 향상시킵니다.

# 🌟 결론: 현명하게 선택하세요

TailwindCSS가 인기가 있을지라도 인기만으로는 깔끔하고 유지보수 가능한 코드를 보장해주지는 않습니다. 어떤 라이브러리를 채택하기 전에 스스로에게 물어보세요:

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

- 최적의 사례와 일치하는가요?
- 가독성을 높여주나요?
- 업무 흐름을 간단하게 만들어 주며, 복잡하게 만드나요?

양보다는 질을 중시하세요. 시간에 견딜 수 있는 견고하고 유지보수 가능한 코드베이스를 구축합시다! 💪
