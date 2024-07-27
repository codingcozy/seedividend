---
title: "리액트의 새로운 훅 useActionState 내용 정리"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-06-useActionStateANewHookinReact_0.png"
date: 2024-07-06 00:02
ogImage:
  url: /ui-log-2/assets/img/2024-07-06-useActionStateANewHookinReact_0.png
tag: Tech
originalTitle: "useActionState — A New Hook in React 🎉"
link: "https://dev.to/random_ti/useactionstate-a-new-hook-in-react-5blm"
---

안녕하세요 개발자 여러분 👋,

저는 여러분의 친구인 Md Taqui Imam입니다. 오늘은 React에서 새롭고 흥미로운 hook인 useActionState에 대해 설명해 드리도록 하겠습니다.

Github에서 저를 팔로우해 주세요⭐

## useActionState란 무엇인가요?

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

useActionState는 새로운 React 훅입니다. 이 훅은 양식 작업의 결과에 기반하여 상태를 업데이트하는 데 도움을 줍니다.

이는 우리를 위해 기억해주고, 양식을 제출할 때 변경할 수 있는 스마트한 도우미와 같습니다.

공식 문서를 확인해보세요🚀

## useActionState를 사용하는 방법은?

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 훅을 사용하려면 먼저 React에서 해당 훅을 import해야 합니다:

```javascript
import ' useActionState ' from `react`;
```

그런 다음, 다음과 같이 컴포넌트에서 사용할 수 있습니다:

```javascript
const [state, formAction, isPending] = useActionState(actionFunction, initialState);
```

각 부분이 의미하는 것은 다음과 같습니다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

'상태'는 현재 양식 상태입니다.
'formAction'은 양식에서 사용할 새로운 작업입니다.
'actionFunction'은 양식 제출 시 실행되는 함수입니다.
'initialState'은 상태의 초기값입니다.

## useActionState를 사용하는 시점:

서버 컴포넌트를 사용하고 더 빠른 응답을 원할 때, 특히 양식 제출을 기반으로 상태를 업데이트하려고 할 때 이 후크를 사용하십시오.

예:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

간단한 카운터 양식을 만들어 보겠습니다. useActionState를 사용해주세요:

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

이 예제에서는 버튼을 클릭할 때마다 숫자가 1씩 증가합니다. useActionState 훅은 양식이 제출될 때 상태를 업데이트하는 역할을 합니다.

## 더 자세한 내용과 예제는 다음 비디오를 확인해주세요 👇

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 이게 다에요 😅

기억해두세요, 배우는 가장 좋은 방법은 경험을 통해 배우는 것입니다.

그래서 useActionState가 보다 널리 사용 가능해지면, 여러분의 프로젝트에서 시도해 보고 어떻게 양식을 개선할 수 있는지 확인해 보세요!

## 경고 ⚠️

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

제 새 문서를 확인하지 않도록 잊지 마세요! 🫡

![이미지](/ui-log-2/assets/img/2024-07-06-useActionStateANewHookinReact_0.png)

여기를 클릭해 주세요! 👋

...

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 즐거운 코딩!

![image1](/ui-log-2/assets/img/2024-07-06-useActionStateANewHookinReact_1.png)
![image2](/ui-log-2/assets/img/2024-07-06-useActionStateANewHookinReact_2.png)
![image3](/ui-log-2/assets/img/2024-07-06-useActionStateANewHookinReact_3.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>


![2024-07-06-useActionStateANewHookinReact_4](/ui-log-2/assets/img/2024-07-06-useActionStateANewHookinReact_4.png)

