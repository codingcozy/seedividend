---
title: "React와 TypeScript를 사용하여 높이가 변하는 Textarea 만들기"
description: ""
coverImage: "/assets/img/2024-05-02-CreatingaTextareawithdynamicheightusingReactandTypescript_0.png"
date: 2024-05-02 00:27
ogImage:
  url: /assets/img/2024-05-02-CreatingaTextareawithdynamicheightusingReactandTypescript_0.png
tag: Tech
originalTitle: "Creating a Textarea with dynamic height using React and Typescript"
link: "https://medium.com/@oherterich/creating-a-textarea-with-dynamic-height-using-react-and-typescript-5ed2d78d9848"
isUpdated: true
---

<img src="/assets/img/2024-05-02-CreatingaTextareawithdynamicheightusingReactandTypescript_0.png" />

# 소개

이 글에서는 내용에 따라 자동으로 커지고 작아지는 `textarea`를 만드는 방법을 보여드리겠습니다. 이 솔루션은 React Hook으로 추출하여 여러 구성 요소 및 프로젝트에서 쉽게 재사용할 수 있습니다.

<img src="https://miro.medium.com/v2/resize:fit:744/1*y6pw2_PMeE8fLGdxRgOEyA.gif" />

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

# 배경

자바스크립트를 사용하여 `textarea` 요소의 자동 크기 조정에 대해 여러 기술이 있습니다. 이 중 일부는 다음과 같습니다:

- 다른 HTML 요소에 contenteditable 속성 추가.
- 줄 바꿈 수를 계산하고 줄 높이에 곱하여 전체 높이를 얻기.
- `textarea` 내부 콘텐츠를 기반으로 요소 크기를 업데이트하는 가상 요소 사용.

내 의견으로는 상기 해결책 모두 상당한 무역 오프와 불필요한 버그 및 구현에서 발생할 수 있는 이상한 점이 있을 수 있습니다.

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

# 리액트의 장점을 살리기

hack해결책에 의존하는 대신, 리액트를 활용해 보는 게 좋겠죠. 이를 실현하는 한 가지 방법은 `textarea`를 제어 컴포넌트로 만드는 것입니다. 이렇게 하면 React가 엘리먼트의 내용 값에 대한 유일한 진리원천이 될 수 있습니다. 결과적으로, useEffect 훅을 사용해서 그 값을 기다릴 수 있고, 그에 따른 올바른 높이를 계산할 수 있게 됩니다.

# 높이 조절하기

여기서 비밀은 `textarea`의 scrollHeight를 사용해 정확한 높이를 구하는 것입니다. 그것을 위해서는 `textarea`의 높이를 잠깐 0으로 설정하여 scrollHeight가 엘리먼트의 고유한 높이와 같도록 강제해야 합니다.

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

그 값을 얻으면, 간단히 스타일 속성을 사용하여 요소의 높이를 설정할 수 있습니다. 이렇게 하면 `textarea`가 내용의 높이를 차지하도록 할 수 있습니다.

이 모든 작업은 동일한 useEffect 훅 내에서 수행해야 한다는 점을 염두에 두세요. state 또는 refs를 사용하여 scrollHeight를 저장하려고 하면 이 트릭이 작동하지 않습니다.

참고: `textarea`의 rows 속성이 1로 설정되어 있는지 확인하세요(기본값은 2입니다). 이렇게 하면 요소의 초기 높이가 올바르게 설정됩니다.

# 재사용 가능한 훅 만들기

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

저는 재사용 가능한 후크인 useAutosizeTextArea로 이 로직을 추출했어요. 이건 반드시 필요한 건 아니지만, 앞으로 다른 컴포넌트에 이 기능을 쉽고 간결한 방법으로 가져올 수 있을 거라고 생각했어요.

이 후크를 사용하려면, 컴포넌트 내에서 호출하고 `textarea`의 ref와 현재 값(current value)을 전달하면 돼요.

# 예시
