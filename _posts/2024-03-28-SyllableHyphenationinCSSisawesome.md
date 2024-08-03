---
title: "CSS에서 음절로 나누는 방법 hyphens"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Syllable Hyphenation in CSS is awesome"
link: "https://medium.com/gitconnected/syllable-hyphenation-in-css-is-awesome-cf81e9844fd3"
---



## 100% 더 좋아 보이는 텍스트를 만드는 법

![이미지](/assets/img/SyllableHyphenationinCSSisawesome_0.png)

네, 맞아요! CSS에서 음절 분할이 가능하다는 것을 알고 계셨나요? 이 기사에서는 최상의 방법을 보여드리겠습니다.

CSS의 하이픈은 단어가 컨테이너 너비를 초과할 때 어떻게 분리되고 줄바꿈되어야 하는지 지정하는 데 사용됩니다. hyphens: auto와 같은 속성을 활용하여 자동 하이픈을 가능하게 함으로써 긴 단어가 적절한 지점에서 분리되어 불규칙한 간격을 막고 가독성을 개선할 수 있습니다.

<div class="content-ad"></div>

# 자동 음절 분할 활성화

CSS에서 자동 음절 분할을 활성화하려면 해당 속성을 요소에 적용하면 됩니다. 모든 작업이 완료됩니다!

```js
p {
  hyphens: auto;
}
```

# 음절 분할 사용자 정의하기

<div class="content-ad"></div>

자동 음절 분리 결과에 만족스럽지 않다면 사용자 정의할 수 있어요.

이를 위한 방법은 다음과 같은 속성을 적용하는 것입니다:

```js
p {
  hyphens: manual;
}
```

현재는 아무 일도 일어나지 않을 거예요, 왜냐하면 브라우저는 지금 단어를 다음 줄로 나누어야 하는지 모르기 때문이죠. 이제 사용자 정의할 수 있는 두 가지 방법이 있어요. 첫 번째 방법은 “&shy;” HTML 태그를 사용하는 것이에요.

<div class="content-ad"></div>

```js
<p>의사&shy;의사성갑상선기능부족증</p>
```

이 방법은 이미 알고 있는 단어에만 작동하므로 단점을 가지고 있습니다. 예를 들어, 웹 사이트의 제목을 스타일링하는 경우입니다. 동적 텍스트를 표시하면 이 방법을 사용하는 것이 어려워집니다. 다행히 CSS에는 이에 대한 해결책이 있습니다.

고지: caniuse.com에 따르면 73.45%의 브라우저만 "hyphenate-limit-chars"를 지원합니다. 웹 사이트에 구현하려면 대비책을 마련해야 합니다.

```js
p {
  hyphens: manual;
  hyphenate-limit-chars: auto 3;
}
```

<div class="content-ad"></div>

이 속성은 단어의 몇 글자가 다음 줄에 나타날지를 지정합니다. 이 특별한 경우에는 단어의 적어도 세 글자가 다음 줄로 나누어집니다. "auto"를 숫자로 대체하여 적어도 몇 글자가 나누어지기 전에 나타나야 하는지를 지정할 수 있습니다. 이를 통해 단어 끝에 있는 한 두 글자만 나누는 것을 피할 수 있습니다.

하이픈 사용을 제어하는 또 다른 좋은 방법은 다음 속성을 사용하는 것입니다.

```js
p {
  hyphens: manual;
  hyphenate-character: "\2011";
}
```

이는 단어 내에서 줄 바꿈 기회를 나타내는 문자를 지정합니다. 이 예제에서는 비분리 하이픈 문자(U+2011)를 사용하여 텍스트 내에서 하이픈화 기회를 나타내어야 합니다.

<div class="content-ad"></div>
