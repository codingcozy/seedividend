---
title: "JavaScript 스크립트에 데이터를 전달하고 스크립트 내에서 검증하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-HowtopassdatatoaJavaScriptscriptandvalidateitwithinthescript_0.png"
date: 2024-06-22 03:56
ogImage: 
  url: /assets/img/2024-06-22-HowtopassdatatoaJavaScriptscriptandvalidateitwithinthescript_0.png
tag: Tech
originalTitle: "How to pass data to a JavaScript script and validate it within the script."
link: "https://medium.com/@oakhtar147/pass-and-validate-attributes-passed-to-a-script-running-in-the-browser-d13d53aa024c"
---


웹 브라우저에서 실행되는 JavaScript 코드를 삽입하기 위해 `script` 태그를 사용합니다. 경우에 따라, 스크립트가 초기화되고 실행될 때 외부 데이터를 전달해야 할 때가 있습니다. 이렇게 데이터를 전달하고 스크립트 내에서 유효성을 검증하는 방법을 알아보겠습니다.

## A/B 테스트 예제

어플리케이션 내에서 두 기능이 연관된 플로우 중 하나를 활성화하는 역할을 하는 ab-testing.js 스크립트가 있다고 상상해보세요. 어떤 기능을 보여줄지를 결정하는 데이터- 어트리뷰트가 예상됩니다. 예를 들면:

```js
<script src="./ab-testing.js" data-variant="a"></script>
```

<div class="content-ad"></div>

이제는 스크립트를 사용하는 모든 클라이언트가 데이터-variant를 정확히 'a' 또는 'b'로 전달해야 합니다.

따라서 스크립트의 진입점에서 그것을 검증할 수 있습니다.

```js
function getFeatureVariantOrThrow() {
  const script = document.currentScript
  const variant = script?.getAttribute("data-variant")

  if (!variant) {
    throw new Error("스크립트 태그에 데이터-variant 속성을 전달해주세요")
  }

  if (["a", "b"].includes(variant)) {
    return variant
  }

  throw new Error(
    'data-variant에 대한 잘못된 값입니다. "a" 또는 "b" 중 하나를 전달해주세요'
  )
}

const variant = getFeatureVariantOrThrow()
```

이렇게 하면 당신의 스크립트를 사용하는 애플리케이션은 정확한 데이터-variant를 제공해야 합니다. 그렇지 않으면 브라우저 콘솔에 오류가 표시됩니다:

<div class="content-ad"></div>

<img src="/assets/img/2024-06-22-HowtopassdatatoaJavaScriptscriptandvalidateitwithinthescript_0.png" />

## 요약

이 짧은 글에서는 데이터 속성을 스크립트로 전달하고 스크립트 내에서 유효성을 검사하는 매우 구체적인 사용 사례에 대해 논의했습니다.

더 많은 내용을 보려면 팔로우하세요:

<div class="content-ad"></div>

- LinkedIn
- GitHub

더 많은 풀스택 엔지니어링 콘텐츠를 보고 싶으시면 좋아요와 팔로우를 해주세요!