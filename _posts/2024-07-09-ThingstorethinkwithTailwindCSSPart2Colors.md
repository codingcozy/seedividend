---
title: "Tailwind CSS에 대해 다시 생각해야 할 것들  2부 색상"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-09-ThingstorethinkwithTailwindCSSPart2Colors_0.png"
date: 2024-07-09 18:49
ogImage:
  url: /assets/img/2024-07-09-ThingstorethinkwithTailwindCSSPart2Colors_0.png
tag: Tech
originalTitle: "Things to rethink with Tailwind CSS — Part 2: Colors"
link: "https://medium.com/@mrtnschndlr/things-to-rethink-with-tailwind-css-part-2-colors-6664c8079cfc"
---

이미 제 공개한 시리즈 "Tailwind CSS로 다시 생각해야 할 것들"의 첫 번째 부분에서 알 수 있듯이, 저는 10년 이상 웹 개발에 종사해왔으며 많은 트렌드, 기술 및 접근 방식이 오고 가는 것을 보았습니다.

새로운 것에 끌리는 이유에 대해 잘 알고 계실 거예요. 그것은 새로운 가능성을 제공하기 때문이거나, 일을 더 쉽게 만들기 때문이거나, 그냥 오래된 지루함을 깨기 때문이죠... 그리고 솔직히 말하자면, Tailwind CSS가 그러한 감정을 일으키게 했던 건 사실입니다. 그렇죠!

이 초기 흥분에 대해 잘 알고 있기에, 이제 몇 달째 열심히 다루어 왔습니다. 그리고 말할 수 있는 건... Tailwind CSS로 작업하는 것은 여전히 제게 매력적입니다! 일부 방법론과 사고 방식은 구식이 되고, 다른 것은 건강한 방향으로 변화하지만, 이는 프로그래머로서의 작업 흐름을 향상시키는 것뿐만 아니라 웹 애플리케이션 자체의 품질을 향상시키기도 합니다.

그래서... "Tailwind CSS로 다시 생각해야 할 것들" 시리즈의 두 번째 부분에 오신 것을 환영합니다. 여기에서, Tailwind CSS와 함께 작업하는 방법에 대한 통찰, 팁 및 제안을 몇 가지 제공하려고 합니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

<img src="/ui-log-2/assets/img/2024-07-09-ThingstorethinkwithTailwindCSSPart2Colors_0.png" />

## 소개

Tailwind CSS에 대해 아직 들어보지 못했다면 아래 공식 웹사이트 링크를 제공해 드리겠습니다:

부트스트랩과 같은 프레임워크와 대조되는 유틸리티 중심의 접근 방식으로 유명한 CSS 프레임워크입니다. HTML에서 레이아웃/디자인을 구현할 때는 마크업에 직접 다양한 CSS 클래스를 조합하여 사용합니다. 한 번 익숙해지면 웹 애플리케이션 프론트엔드를 빠르고 부작용이 적게 구현할 수 있습니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

# 파트 2: 색상

기본적으로 Tailwind CSS는 이미 많은 색 팔레트를 제공합니다. 공식 문서를 참조해주세요. 제공되는 다양한 색상은 빠르게 PoC를 개발하고 구성 노력을 최소화하는 데 이상적입니다. 정말 탁월합니다!

![이미지](/ui-log-2/assets/img/2024-07-09-ThingstorethinkwithTailwindCSSPart2Colors_1.png)

이해하기 쉽고 명확한 네이밍 덕분에 색상은 편리하게 사용되며 서로 조화롭게 조합하고 필요에 따라 쉽게 교체할 수 있습니다. 그리고 Tailwind CSS는 실제로 마크업에서 사용되는 CSS 클래스만 컴파일하기 때문에 사용되지 않는 CSS 코드가 전혀 없습니다. 결국 불만 할 게 없을 것 같네요. 그렇지 않나요?

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

음... 간단한 웹사이트나 빠른 PoC(Concept)의 경우, 이 모든 것이 분명히 목적을 가지고 목표를 향해 나아가는 것으로 이해될 수 있겠네요. 하지만 좀 더 복잡한 맥락에서는 어떨까요? 예를 들어, 개발자 팀이 협업하고 특정 기업의 정체성을 유지해야 하는 전자상거래 프로젝트와 같은 경우에는요?

여기에는 특정 위험 요인이 존재한다고 생각해봅니다:

- 다양한 색상과 음영이 많기 때문에, 개발자가 잘못된 색조를 선택해버리고 엉뚱한 디자인을 만들어내버릴 가능성이 큽니다. 이는 기업의 정체성을 훼손할 수도 있습니다! 게다가 관리 가능성이나 교환 가능성에 대한 노력도 증가할 수 있습니다.
- 텍스트 색상, 배경 색상, 테두리 색상, 스트로크 및 채우기 색상, 그림자 색상 등 Tailwind CSS의 기본 색상과 음영이 모두 제공됩니다. 대규모 프로젝트와 개발자 팀에서 모든 것을 추적할 담당자가 누구일까요?
- 마지막으로, 가능한 색상 중에서 올바른 색상을 계속해서 선택하는 데 많은 시간이 걸릴 것을 상상해보세요. 이는 작업 흐름을 늦추는 것뿐만 아니라 귀중한 시간을 낭비하는 결과를 초래할 수 있습니다.

그리고 이 모든 것이 아직 충분하지 않다면, 원하는 대로 더 많은 색상을 구성할 수도 있습니다. 색상이 지나치게 많아지는 꼴입니다!

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

```js
// tailwind.config.js

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#17275c",
        },
      },
    },
  },
};
```

## 내 추천: 색상 구성을 다시 생각해 보세요

일반적으로 디자이너가 제공한 레이아웃이 이미 구체적인 색상 팔레트로 이어지기 때문에, 이미 일종의 구체적인 색상 팔레트가 된다. 주요 색상, 색상 변형, 프레임 색상, 텍스트 색상 등은 구체적으로 정의할 수 있으며, 사실상 Tailwind CSS의 색상 구성의 기초로도 사용할 수 있다.

모든 사용자 정의 색상 제거
그러므로 기본색상의 무수히 많은 세트를 불필요하게 확장하지 않고, Tailwind CSS의 색상 구성을 완전히 교체하고 실제로 프로젝트에서 필요한 색상만 구성하는 것이 좋은 아이디어입니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

```js
// tailwind.config.js

module.exports = {
  theme: {
    colors: {
      primary: {
        DEFAULT: '#17275c',
      },
      ...
    }
  },
}
```

이렇게 하면 필요한 색상을 쉽게 찾을 수 있을 뿐만 아니라 올바른 선택을 한 것임을 확신할 수 있습니다. 또한 필요 시 색상 코드(예: HEX 코드)를 특정 지점에서 조정할 수 있고 이 변경 사항을 전체 프로젝트에 적용할 수 있습니다.

색상 이름이 승리
최근 몇 달 동안 저에게 큰 도움이 된 것 중 하나는 색상을 올바르게 명명하는 것입니다. 솔직히 말하자면, 지난 몇 년 동안 “primary”, “secondary”, “warning”, “danger” 등을 사용한 사람이 많이 있지 않나요? 어느 정도로 이러한 표현은 이미 “음성적”이었습니다. 그럼에도 불구하고, 특히 대규모 프로젝트에서 종종 이러한 표현이 뭔가로 잊혀지고 참조를 잃어버린 것 같은 느낌이 들곤 했어요. 특히 “grey-dark”, “grey-mid”, “grey-light”와 같은 표현이 추가되면 더 혼란스러워질 수 있죠. 정말 헷갈리죠?

해결책은 사전에 합리적이고 추상적이지만 여전히 명확하게 이해할 수 있는 표현을 고려하는 것입니다. 컨텍스트에 맞는 표현으로 색상 코드를 더 이상 교체할 수 없게 만들지 않는 것이죠.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

만약 웹사이트의 배경이 밝고 글씨가 어두운 경우라면, 예를 들어 푸터는 어두운 배경과 밝은 글씨로 만들어야 합니다. “밝은(bright)”과 “어두운(dark)”이 명확하게 어떤 색상을 의미하는지는 실제로 중요하지 않습니다. 그래서 우리는 두 개의 색상을 정의할 수 있다고 말할 수 있습니다:

```js
// tailwind.config.js

module.exports = {
  theme: {
    colors: {
      light: "...",
      dark: "...",
      ...
    }
  },
}
```

해당하는 HTML 마크업은 다음과 같이 보일 수 있습니다:

```js
...
<body class="bg-light text-dark">
  ...
  <footer class="bg-dark text-light">...</footer>
</body>
...
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

지금은 웹사이트에 다크 모드가 추가되어야 합니다. 괜찮아요! 그냥 색상 이름 뒤의 색상 코드를 변경하면 됩니다. 음... 정말요! 너무 빨리 가지 마세요! 이제 콘텐츠면에서 정확한 걸까요? 우리는 CSS 클래스 "bg-light"로 body 태그를 선언하고, 그 후에는 어두운 모드에서 밝은 배경 대신 어두운 배경을 가지게 됩니다. 이상하고 혼란스럽고 정확하지 않습니다!

아마도 색상 지정이 이용 사례에 맞지 않는다는 것을 깨달으셨을 것입니다. 위에서 말했듯이, 이용 시에 개발자가 그 뒤에 무엇이 있는지 이해할 수 있는 의미를 가진 충분히 추상적인 용어를 찾는 것이 중요합니다.

아래에서 더 잘 작동하는 변형을 보여드리겠습니다. 그러나 먼저 Tailwind CSS의 "구성 섹션"에 대해 이야기하고 싶습니다.

각각의 사용 사례에 특정 색상
Tailwind CSS 구성은 소위 섹션으로 나뉩니다. 예를 몇 가지 들자면: colors, fontFamily, spacing, borderRadius 등이 있습니다 (공식 문서를 확인해주세요). 지금까지 위의 코드 예제에서, 저는 항상 "colors" 섹션에서 변경을 가했습니다. 이 섹션에 있는 모든 색상은 자동으로 텍스트 색상, 배경 색상, 테두리 색상 등으로 사용할 수 있습니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

그러나 사용자는 색상을 구성하여 특정 색상이 텍스트 색상으로만 사용되거나 다른 색상은 배경 색상으로만 사용되도록 설정할 수 있습니다. 따라서 위의 예시를 가져와서 색상 라벨과 다크 모드를 함께 사용할 때의 문제를 해결할 수 있습니다.

```js
// tailwind.config.js

module.exports = {
  theme: {
    backgroundColor: {
      normal: "white",
      inverted: "black",
      ...
    },
    textColor: {
      normal: "black",
      inverted: "white",
      ...
    }
  },
}
```

```js
...
<body class="bg-normal text-normal">
  ...
  <footer class="bg-inverted text-inverted">...</footer>
</body>
...
```

간단한 설명: 먼저 구성에서 배경색과 텍스트 색상을 분리합니다. 그런 다음 배경 색상 "normal"과 "inverted"를 정의합니다. 이렇게 하면 개발자가 예를 들어 푸터의 배경색이 본문의 배경색과 정반대로 정의된 것을 즉시 인식할 수 있습니다. 텍스트 색상에 대해서도 같은 작업을 수행하되, 텍스트 색상의 코드는 해당 배경 색상과 반대가 됩니다 (이것이 이제 예시에서 "white"와 "black"을 추가한 이유입니다. 이렇게하면 보다 이해하기 쉽습니다).

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이제 색상 레이블 뒤의 색상 코드를 교체하여 웹 사이트를 다크 모드로 표시할 수 있습니다. 레이블 또는 더 정확히는 해당 CSS 클래스가 여전히 올바름을 유지합니다.

## 결론

요약하면 Tailwind CSS 구성 덕분에 개발자가 특정 사용 사례별로 색상을 정의할 수 있으므로, 다시 말해 개발자는 제한된 옵션 세트만 사용할 수 있어 작업 흐름을 가속화하고 기업 아이덴티티의 고정된 프레임워크 내에서 잘못된 색상 값의 위험을 줄일 수 있습니다.

최적의 색상 표기를 사용하면 두 배로 혜택을 누릴 수 있습니다! 더 쉽게 이해할 수 있을수록, 개발자가 프로젝트를 이해하기 쉬워지고 목표에 빨리 도달할 수 있습니다. 또한, 나중에 쉽게 색상 코드를 교체할 수 있으며 HTML 마크업을 수정할 필요 없이 CSS 클래스가 실제 값과 일치하지 않는 위험을 줄일 수 있습니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이 게시물을 즐겁게 보셨길 바라요! 읽어 주셔서 감사합니다. 즐거운 시간 보내세요!
