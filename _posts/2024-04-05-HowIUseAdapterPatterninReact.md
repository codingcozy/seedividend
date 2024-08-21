---
title: "리액트에서 어댑터 패턴을 활용하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "How I Use Adapter Pattern in React"
link: "https://medium.com/javascript-in-plain-english/how-i-use-adapter-pattern-in-reactjs-cb331e9bef0c"
isUpdated: true
---

리액트 개발 중 어려운 점 중 하나는 백엔드 응답과 컴포넌트 데이터 구조를 잘 맞추는 것입니다.

일반적으로, 백엔드 API 응답과 리액트 컴포넌트 간에 엄격한 API 계약을 가지는 것으로 이 문제를 해결할 수 있습니다.

프론트엔드와 백엔드 개발은 별개로 진행되므로, 데이터 구조가 일치하지 않을 수 있는 것은 불가피합니다.

여기서 우리는 '어댑터'라는 디자인 패턴을 적용할 수 있습니다.

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

어댑터는 특정 객체를 다른 객체의 구조에 "적응"할 수 있게 해주는 디자인 패턴입니다.

이 디자인 패턴을 적용하는 여러 가지 구현 방법이 있습니다. 그래서 당신이 선호하는 방식으로 진행하는 것이 괜찮아요. 입력을 수용하고 새로운 출력물을 생성하는 것이 주된 목적이라면 괜찮습니다!

# 🤔 문제

어떻게 이 디자인 패턴을 적용할지에 대한 여러 가지 구현 사례가 있고, 저는 빌더 디자인 패턴에서 영감을 받아 그에 기반한 작업을 하고 싶었습니다.

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

우리가 다음과 같은 백엔드 API 응답을 받았다고 가정해 봅시다:

그런 다음 다양한 props를 수락하는 이 React 컴포넌트가 있습니다.

![이미지](/assets/img/HowIUseAdapterPatterninReact_0.png)

이 예시에서 Notification 컴포넌트는 다른 prop 이름을 수락하며 `statusText`와 `typeText`에서는 다른 값을 기대합니다.

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

어떻게 많은 리팩토링 없이 컴포넌트나 백엔드 API 응답을 변경하지 않고 일치시킬 수 있을까요?

# 💡 적응하기

백엔드 API 응답에서 React 컴포넌트를 일치시키거나 적응하기 위해서, 어댑터를 만들 방법을 여기에 설명하겠습니다.

위에서 언급했듯이, 저는 빌더 디자인 패턴에서 영감을 받았고, 그 결과물이 이겁니다!

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

그리고 여기에 알림 어댑터가 있습니다:

보시다시피, 우리는 이제 백엔드 API 응답을 알림 컴포넌트와 맞도록 "적응"하고 있습니다.

우리는 `statusText`, `typeText`와 같은 FE 목적을 위한 추가 논리 매핑도 추가했습니다.

그리고 여기에 react-query와 함께 사용하는 방법이 있습니다! 우리는 react-query의 select 메소드를 사용하여 원시 데이터에서 화면에서 필요한 것으로 "적응"합니다.

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

이것은 React-Query에만 해당되는 것이 아니며, 백엔드에서 데이터를 가져오는 데 사용하는 간단한 fetch API 호출이나 다른 방법에도 적용할 수 있습니다!

컴포넌트 수준에서 너무 많이 산만해지지 않고 매핑을 처리하는 유연하고 조직적인 방법입니다.

# 🚀 결론

Adapter 디자인 패턴은 항상 존재했습니다. 여러분은 여러분의 프로젝트나 업무에서 이미 사용하고 있을 것이며, 다만 다른 방식으로 구현했을 뿐입니다.

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

"테이블" 태그를 Markdown 형식으로 변경하실 수 있나요?

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

탐험하고 호기심을 가지고 계속 진행하면 다양한 가능성이 열릴 거에요!

읽어 주셔서 감사합니다. 여러분의 여정에 도움이 되기를 바라요! ❤️

# PlainEnglish.io 🚀

'In Plain English' 커뮤니티에 함께해 주셔서 감사합니다! 떠나시기 전에:

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

- 작성자에게 박수를 보내고 팔로우하세요️
- In Plain English에 글을 쓰는 방법을 배워보세요️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture
