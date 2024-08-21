---
title: "2024년에는 React Server Components를 사용해야 하는 이유"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Its 2024, you should be using React Server Components already"
link: "https://medium.com/itnext/its-2024-you-should-be-using-react-server-components-already-6cb24a7140a1"
isUpdated: true
---

## 모든 프로젝트에서 실제로 RSC를 사용해야 하는 3가지 이유

![이미지](/assets/img/Its2024youshouldbeusingReactServerComponentsalready_0.png)

이것을 직시합시다. React Server Components는 Next나 React의 가장 인기 있는 기능은 아닙니다. 많은 개발자들이 실제로 이러한 기능을 정신적으로 차단하고 모든 컴포넌트 위에 use client를 추가하여 존재하지 않는 것처럼 속이기로 결정했습니다.

하지만 그것만이 아니라, 그들은 많은 혜택을 놓치고 있습니다.

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

이 글에서는 여러분에게 그들을 사용하도록 설득하려고 해요. 그러니 시작해볼까요?

## React 서버 컴포넌트는 어떻게 작동할까요?

이러한 "새로운" 컴포넌트가 어떻게 작동하는지 이해하려면 먼저 그 혜택을 이해해야 합니다.

만약 여러분이 항상 프런트엔드 개발자였다면, 이것이 실제로 여러분이 필요한 빠진 조각일 수도 있으니 주의 깊게 읽어보세요.

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

RSC는 서버에서 실행됩니다 (따라서 이름에 "서버" 부분이 포함되어 있습니다). 하지만 이게 정확히 무슨 의미를 가지는 걸까요?

이것은 프레임워크 (예를 들어 NextJS)가 다음을 수행할 것을 의미합니다:

- 페이지 내부의 구성 요소 중에서 실제로 서버 구성 요소인 것을 찾아낼 것입니다.
- 각각의 구성 요소에 대해 React의 서버 버전을 로드하고 실행할 것입니다.
- 이러한 구성 요소 각각은 결과로 HTML을 출력하며, 그 HTML은 브라우저로 전달되는 번들 내에 자리를 차지합니다.

이 번들은 React Server Component Payload라고 불리며, 그 안에는 브라우저가 다음을 찾을 수 있습니다:

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

- 각 RSC를 실행하여 생성된 실제 HTML.
- 브라우저에서 활성화되어야 하는 클라이언트 구성 요소를 위한 HTML 내부 플레이스홀더.
- 선택적으로, 서버 구성 요소에서 클라이언트 구성 요소로 전달된 속성이 페이로드 내부에 포함됩니다.

그게 다에요.

## RSC가 SSR과 같은가요?

이것은 주변에서 자주 묻는 질문입니다. 혼동을 이해합니다만, 아니요, RSC와 SSR은 같은 것이 아닙니다.

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

SSR (서버 사이드 렌더링)은 전체 애플리케이션을 서버에서 렌더링한 다음 그것을 클라이언트로 보내 하이드레이션이 발생하는 반면, RSC는 단일 구성 요소에만 집중합니다. 그들은 렌더링 프로세스를 최적화하지만 더 세분화된 수준에서 이루어집니다.

그래서 이제 "왜 RSC를 사용해야 하는가" 에 대해 이어서 알아보겠습니다.

# 이유 1: 데이터 가져오기 작업이 더 빠르고 쉽습니다.

React 구성 요소에서 데이터 가져오기를 하다가 곤란했던 적이 있나요?

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

일반적으로 다음과 같이 진행됩니다:

- 데이터 가져오기 로직을 작성하여 직접 데이터 소스를 쿼리하는 경우가 있습니다(예: 외부 API).
- 또는 서버 측에서 내부 엔드포인트를 생성하여 실제로 데이터 소스를 쿼리하고 데이터 가져오기 로직을 내부 엔드포인트에 요청하는 방법도 있습니다.

#1로 진행하는 경우 단점은 다음과 같습니다:

- 브라우저에서 외부 API를 쿼리하는 경우 CORS 문제가 발생할 수 있습니다.
- 데이터베이스와 같은 데이터 소스나 디스크에서 파일을 읽는 등 특정 데이터 소스를 쿼리할 수 없습니다.
- 사용자에게 데이터 가져오기 로직이 노출되어, 코드와 로직이 최종 사용자(또는 잠재적 공격자)에게 노출될 수 있습니다.
- 데이터 소스의 오류 처리 로직이 UI 구성 요소와 결합되는 문제가 발생할 수 있습니다.

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

만약 대신 옵션 2를 선택하게 되면, 그것의 보안 측면을 해결하게 되지만, 데이터 가져오기 오류 처리 로직을 UI 컴포넌트에 결합하지 않아도 된다는 것이 사실입니다. 그러나 내부 API 엔드포인트를 생성하는 추가 코드 작성 작업을 계속해야 합니다.

그렇다면 두 마리 토끼를 다 잡을 수 있는 방법이 있다면 어떨까요? 바로 RSC가 그 역할을 합니다!

React Server Component를 이용하면 다음과 같은 구성 요소를 작성할 수 있습니다:

```js
async function getUserData() {
  // 데이터 가져오기 로직을 여기에 작성합니다...
}

async function MyComponent() {
  let data = await getUserData();

  if (!data) {
    return <div className="error-msg">사용자를 찾을 수 없습니다!</div>;
  }

  return (
    <div>
      {data.username}
      <DeleteUserButton id={data.id} />
    </div>
  );
}
```

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

그래서, 거기에 무엇이 있나요? 한 번 자세히 살펴보죠:

- 상호작용하는 코드를 사용하지 않는 컴포넌트가 있습니다(DOM API, 이벤트 핸들러, 브라우저 API 등이 없음).
- 부작용이나 상태를 사용하지 않는 컴포넌트가 있습니다(useEffect나 useState 훅을 호출하지 않음).
- 단순히 일반 함수를 호출하여 데이터를 가져오고, 그 데이터를 간단한 HTML 태그를 사용하여 표시하는 컴포넌트가 있습니다.
- 또한 결과 부재를 확인하고 다른 HTML을 반환하는 컴포넌트가 있습니다.
- 마지막으로, onClick 핸들러와 같은 이벤트 핸들러를 가지는 DeleteUserButton이라는 다른 컴포넌트를 호출하는 컴포넌트가 있습니다.

우리의 서버 컴포넌트가 다룬 대안들 보다 간단한 이유는 다음과 같습니다:

- 새로운 내부 API 엔드포인트를 만들 필요가 없었습니다.
- 오류 처리 논리를 UI 컴포넌트에 결합할 필요가 없었습니다(이는 백엔드 컴포넌트입니다).
- 이 방법을 사용하면 CORS 문제에 부딪힐 위험도 없습니다.
- getUserData 함수에서 어떤 데이터 소스든 실제로 쿼리할 수 있습니다. 데이터베이스, 외부 API 또는 로컬 텍스트 파일이든지, 어디서든 원하는 데이터를 가져올 수 있죠.

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

그래서 모두 결론적으로 지금까지 큰 성과를 거뒀네요. 하지만 계속해서 나아가요!

# 이유 2: 더 빠른 UI 및 더 나은 UX

먼저 주의: 이것은 '올바르게' 작업하는 경우에만 작동합니다. 아직 엉망을 만드는 경우에는 클라이언트 컴포넌트를 사용하더라도 RSC만 사용한다고해서 성능이 향상되지 않을 거예요.

그럼 이유가 무엇을 의미하는지 알아봐요.

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

RSC는 서버에서 렌더링되므로 브라우저가 DOM의 일부를 렌더링하는 데 필요한 작업을 하지 않아도 된다는 점이 가장 먼저 눈에 띕니다. 예, 서버에서 해당 노드를 받아 전체 트리에 추가해야하지만 코드를 구문 분석하고 HTML 요소를 동적으로 생성한 후에야 DOM을 업데이트하는 데 관여하는 JavaScript가 없습니다.

이 모델을 사용하면 코드를 렌더링하는 데 필요한 처리량을 서버로 옮길 수 있습니다. 이것은 대부분의 구성 요소를 서버 구성 요소로 전환할 수있는 매우 복잡한 응용 프로그램에 특히 유용합니다.

브라우저에서 더 이상 수행하지 않아도 되는 추가 작업으로부터 추가 혜택은 UI가 더 빨리 로드되고 최종 사용자에게 정보를 조금 더 빨리 표시하기 시작할 수 있다는 점입니다. 따라서 사용자 경험(UX)이 개선된 것으로 간주할 수 있습니다. 사용자는 브라우저가 사용자에게 의미 있는 내용을 표시하기 시작할 때 발생하는 첫 번째 콘텐츠로드까지 기다려야 하는 시간이 줄어들었습니다.

# 이유 #3: 더 간단한 UI 코드

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

RSC를 사용하기 시작하는 또 다른 매우 타당한 이유는 클라이언트 구성 요소의 로직을 간단화할 수 있다는 것입니다.

다시 말해, 이제 클라이언트 구성 요소를 UI 비즈니스 로직을 저장해야 하는 유일한 위치로 생각할 필요가 없어졌습니다.

대신에 이제는 "무거운 작업"(데이터 가져오기 및 데이터 처리와 같은 작업)의 많은 부분을 RSC로 옮기고 클라이언트 구성 요소가 실제 표현(즉, UI)만 처리하도록 할 수 있습니다.

이렇게 하면 클라이언트 구성 요소의 크기를 줄일 수 있어서 새로운 구성 요소가 렌더링되어야 할 때 클라이언트로 전송되는 번들의 크기도 줄일 수 있습니다.

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

서버 컴포넌트를 추가함으로써 이제 클라이언트 전용 컴포넌트 내에 있던 코드를 분리할 수 있게 되었습니다. UI와 관련이 없는 논리를 수행하던 불필요한 코드를 제거하고, 렌더링 부분은 건드리지 않고 서버로 이동할 수 있습니다.

동적 기능이 필요하지 않은 전체 UI 컴포넌트(예를 들어 푸터)도 제거하여 서버에서 렌더링하도록할 수 있습니다. 이제 UI 코드베이스가 크게 축소되었죠.

이것 또한 큰 이득이에요!

요약하자면, 리액트 서버 컴포넌트는 나쁜 것이 아니라 사실상 좋습니다. 단, 과거에 백엔드 코딩 경험이 없었다면 처음에는 많은 생각의 전환이 필요할 수 있습니다.

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

웹 개발 업무에 많은 개선 사항을 가져다 주지만, 제가 발견한 주요 사항은 다음과 같아요:

- 데이터 가져오기 및 처리가 더 쉬워지고 (보안도 높아져요).
- 작은 변경으로 사용자에게 더 나은 UI/UX를 제공할 수 있는 도구를 사용하고 계세요.
- 비 UI 코드를 클라이언트 구성 요소에서 제거함으로써 UI 코드베이스의 복잡성을 줄이고 있어요.

React Server Components에 대해 더 알고 싶다면, RSC 및 클라이언트 구성 요소를 사용하여 상태를 공유하는 방법을 가르치는 신선한 새로운 강좌가 있어요. 한 번 확인해 보시는 건 어떨까요?

그 동안 이 앱에서 RSC 사용을 거부했나요? 왜 그랬는지 궁금해요. 그리고 이제는 시도해 보고 싶은 마음이 생겼나요?
