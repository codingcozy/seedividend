---
title: "useActionState  React의 새로운 Hook "
description: ""
coverImage: "/assets/img/2024-06-30-useActionStateANewHookinReact_0.png"
date: 2024-06-30 18:33
ogImage:
  url: /assets/img/2024-06-30-useActionStateANewHookinReact_0.png
tag: Tech
originalTitle: "useActionState — A New Hook in React 🎉"
link: "https://medium.com/@mdtaqui.jhar/usestateaction-a-new-hook-in-react-1558986bf4df"
isUpdated: true
---

<img src="/assets/img/2024-06-30-useActionStateANewHookinReact_0.png" />

안녕하세요 개발자 여러분 👋, 저는 Md Taqui Imam입니다. 오늘은 React의 새로운 흥미로운 훅인 useActionState에 대해 설명하려고 합니다.

## useActionState란 무엇인가요?

useActionState는 폼 작업의 결과에 기반하여 상태를 업데이트하는 데 도움을 주는 새로운 React 훅입니다.

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

우리를 위해 기억하고 양식을 제출할 때 변경할 수 있는 스마트 도우미 같아요.

공식 문서를 확인해보세요🚀

## useActionState를 사용하는 방법은?

이 훅을 사용하려면 먼저 React에서 가져와야 합니다.

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

```js
import { useActionState } from "react";
```

이제, 우리는 컴포넌트에서 다음과 같이 사용할 수 있어요:

```js
const [state, formAction] = useActionState(actionFunction, initialState);
```

여기서 각 부분이 의미하는 바입니다:

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

- ‘state’은 현재 양식 상태입니다.
- ‘formAction’은 양식에서 사용할 새로운 액션입니다.
- ‘actionFunction’은 양식을 제출할 때 실행되는 함수입니다.
- ‘initialState’은 상태의 초기값입니다.

## useActionState를 사용하는 시기:

이 훅을 사용하면 서버 구성 요소를 사용하며 더 빠른 응답을 원할 때 포르를 제출하여 상태를 업데이트할 때 사용하세요.

예시:

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

간단한 카운터 양식을 useActionState를 사용하여 만들어봅시다:

```js
import { useActionState } from "react";

async function increment(previousState, formData) {
  return previousState + 1;
}

function StatefulForm() {
  const [state, formAction] = useActionState(increment, 0);
  return (
    <form>
      {state}
      <button formAction={formAction}>Increment</button>
    </form>
  );
}
```

이 예시에서 우리가 버튼을 클릭할 때마다 숫자가 하나씩 증가합니다. useActionState 훅이 양식이 제출될 때마다 상태를 업데이트하는 것을 관리해줘요.

## 이게 전부에요 😅

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

기억하세요! 배우는 가장 좋은 방법은 경험하는 것입니다.

그래서 useActionState가 보다 널리 사용 가능해지면, 여러분의 프로젝트에서 사용해보세요. 어떻게 양식을 개선할 수 있는지 확인해 보세요!

코딩 즐기세요!

[사진](/assets/img/2024-06-30-useActionStateANewHookinReact_1.png)
