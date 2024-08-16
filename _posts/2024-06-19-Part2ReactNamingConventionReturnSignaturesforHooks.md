---
title: "제목 파트 2 리액트  훅의 명명 규칙 및 반환 형식"
description: ""
coverImage: "/assets/img/2024-06-19-Part2ReactNamingConventionReturnSignaturesforHooks_0.png"
date: 2024-06-20 00:00
ogImage: 
  url: /assets/img/2024-06-19-Part2ReactNamingConventionReturnSignaturesforHooks_0.png
tag: Tech
originalTitle: "Part 2: React — Naming Convention + Return Signatures for Hooks"
link: "https://medium.com/javascript-in-plain-english/part-2-react-naming-convention-return-signatures-for-hooks-b9e31f5e7f58"
isUpdated: true
---




<img src="/assets/img/2024-06-19-Part2ReactNamingConventionReturnSignaturesforHooks_0.png" />

# 📖 이전 파트

Part 1은 여기에서 찾을 수 있어요: https://medium.com/p/e6af2696089a

React 훅은 함수형 컴포넌트에서 상태와 다른 React 기능을 사용할 수 있게 해주는 JavaScript 함수들입니다. 이 함수들의 이름은 use로 시작하는 것들이에요.

<div class="content-ad"></div>

React 문서에서 인용한 내용입니다:

React 훅에 대해 기사를 작성해야 하는 이유가 궁금할 수 있습니다. 실은 전통적인 방식에는 문제가 없지만 몇몇 사람들은 더 나은 가독성과 이해를 위해 훅에 접근하는 방법을 발견했다는 것을 알게 되었거든요.

이 기사를 작성하게 된 동기 중 하나는 저를 다른 방식으로 훅을 개선하는 방법을 보여준 존 마이클 도로이입니다. 이 기사에서는 우리의 방식을 공유하겠습니다.

# 📜 사용자 지정 훅의 전통적인 구조

<div class="content-ad"></div>

Markdown 형식으로 테이블 태그를 변경해주세요.

<div class="content-ad"></div>

![이미지](/assets/img/2024-06-19-Part2ReactNamingConventionReturnSignaturesforHooks_2.png)

두 번째로 소개할 것은 창 크기를 반환하는 사용자 정의 훅입니다. 이 훅의 이름은 useWindow입니다.

이전에 말씀드렸듯이, 이 네이밍 규칙에는 문제가 없습니다. 하지만 이 네이밍 규칙을 어떻게 개선할 수 있는지 살펴봅시다.

# 📝 제안된 네이밍 규칙 및 반환 형식

<div class="content-ad"></div>

내 이용 수칙 중 하나는 후크 이름에 접두사나 접미사를 추가하여 해당 후크의 유형을 나타내는 것입니다.

첫 번째 예로, 후크를 useTheme 대신 useThemeContext로 지정할 수 있습니다. 이렇게 하면 해당 후크가 컨텍스트에서 테마를 반환한다는 것을 쉽게 식별할 수 있습니다.

두 번째 예로, 첫 번째 제안과 유사하게 후크의 이름을 useWindow 대신 useWindowSize로 지정할 수 있습니다. 마찬가지 이유로 해당 후크가 무엇을 하는지 쉽게 식별할 수 있습니다!

해당 후크 이름을 더 구체적으로 지정하여 해당 작업이 무엇인지 이해하기 쉽게 하고 싶습니다.

<div class="content-ad"></div>

훅의 이름을 자명하게 만들어서 구현을 보지 않아도 훅이 하는 일을 이해할 수 있는 것을 선호해요.

이제, 반환 시그니처로 넘어가 봅시다. 반환 시그니처는 함수가 반환하는 값입니다.

훅의 반환 시그니처를 어떻게 개선할 수 있을지 생각해보세요.

현재 훅은 값을 직접 반환하고 있습니다. 그렇다면 갑자기 다른 값을 반환해야 한다면 어떻게 해야 할까요?

<div class="content-ad"></div>

갑작스럽게 훅의 반환 시그니처를 변경하면 훅을 사용하는 컴포넌트에서 변경 사항이 발생할 수 있습니다.

그래서 값을 직접 반환하는 대신, 값을 속성으로 가진 객체를 반환하는 것을 제안합니다.

다음은 제안된 명명 규칙과 반환 시그니처로 보이는 훅의 예시입니다:

![React Hooks return signature](/assets/img/2024-06-19-Part2ReactNamingConventionReturnSignaturesforHooks_3.png)

<div class="content-ad"></div>

![Korean](/assets/img/2024-06-19-Part2ReactNamingConventionReturnSignaturesforHooks_4.png)

이렇게 하면 훅을 사용하는 컴포넌트를 변경하지 않고 반환 값에 더 많은 값을 쉽게 추가할 수 있습니다.

작은 변화지만 미래에 더 많은 값을 반환해야 할 때 큰 차이를 만들어 줄 수 있습니다.

# 🤔 반환 시그니처 문제를 정말 해결했을까요?

<div class="content-ad"></div>

거의 다 왔어요. 여기에서 John Michael Doroy의 아이디어를 가져오되 다른 예제로 해보려고 해요.

대부분의 경우, 우리는 컴포넌트 내에서 다음과 같이 훅을 사용해요:


<img src="/assets/img/2024-06-19-Part2ReactNamingConventionReturnSignaturesforHooks_5.png" />


당신이 생각하는 것 알아요. 구조 분해를 제거하고 객체를 직접 사용해야 한다고요. 네, 그렇게 할 수 있지만 경우에 따라 객체를 구조 분해하고 이 오류를 만날 수 있어요.

<div class="content-ad"></div>

이제 우리는 훅을 사용할 때 변수 이름을 userSettings와 appSettings로 지정해야 한다는 걸 기억해야 해요. 실제로 괜찮지만, 

하지만, 다른 컴포넌트에서 사용하고 싶다고 가정해봅시다. 다시 변수를 userSettings로 지정해야 한다는걸 기억해야죠.

![Image](/assets/img/2024-06-19-Part2ReactNamingConventionReturnSignaturesforHooks_6.png)

오탈자에 주목했나요? userSetings가 아니라 userSettings가 맞아요. 이게 문제의 핵심이에요!

<div class="content-ad"></div>

제안된 해결책은 후크 이름을 사용 접두사 없이 키로, 값은 값으로 하는 객체를 반환하는 것입니다.

다음은 어떻게 보이는지입니다:

![image](/assets/img/2024-06-19-Part2ReactNamingConventionReturnSignaturesforHooks_7.png)

이렇게 하면 컴포넌트에서 사용된 후크를 쉽게 식별할 수 있습니다. 또한 이전에 만난 오타를 피할 수도 있습니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-19-Part2ReactNamingConventionReturnSignaturesforHooks_8.png" />

충돌이나 오타가 없어질 것입니다. 이 작은 변화가 장기적으로 큰 차이를 만들어냅니다.

- 훅을 더 일관되게 사용할 수 있습니다. 다른 컴포넌트에서 동일한 훅에 대해 다른 변수 이름을 사용하지 않아도 됩니다.
- 오타를 방지할 수 있습니다. 더 이상 userSetings 대신 userSettings를 사용하지 않아도 됩니다.
- 충돌을 피할 수 있습니다. useUserSettings와 useAppSettings에서 가져오는 설정 충돌을 막을 수 있습니다.

# 🎁 추가 혜택: `react-query` 커스텀 훅을 위한 명명 규칙 + 반환 시그니처

<div class="content-ad"></div>

우리는 얼마 전부터 react-query를 사용해오고 있어요. 지금은 우리가 react-query를 위해 훅을 어떻게 이름 짓는지 공유하고자 해요.

이 내용이 문서화되었거나 문서에서 공유되었는지는 확실하지 않아요. 하지만 우리가 react-query를 위해 훅을 어떻게 이름 짓는지 알려드릴게요.

react-query에는 두 가지 유형의 훅이 있어요:

- 쿼리 훅(Query hooks)
- 뮤테이션 훅(Mutation hooks)

<div class="content-ad"></div>

쿼리 후크(Query hooks)에 대해서는 use`동사``도메인`Query와 같이 훅(hook)의 이름을 짓습니다.

다음은 몇 가지 예시입니다:

1. 사용자를 가져오고 싶을 때는 useGetUserQuery라고 이름을 지정합니다.

2. 사용자 목록을 가져오고 싶을 때는 useGetUsersQuery라고 이름을 지정합니다.

<div class="content-ad"></div>

3. 제품 목록을 가져오고 싶을 때, useGetProductsQuery라고 이름을 지정합니다.

변이 훅의 경우, 훅의 이름을 use`동사``도메인`Mutation으로 지정합니다.

여기 몇 가지 예시입니다:

1. 사용자를 만들고 싶을 때, useCreateUserMutation으로 이름을 지정합니다.

<div class="content-ad"></div>

2. 사용자를 업데이트하려면 `useUpdateUserMutation`이라고 이름을 붙입니다.

3. 사용자를 삭제하려면 `useDeleteUserMutation`이라고 이름을 붙입니다.

반환 시그니처에 대해서는, 우리는 훅 이름을 키로 사용접뒤에 `use` 접두사를 제외한 형식으로 객체를 반환하고, 값으로 값이 입력됩니다.

다음과 같은 형식을 가집니다:

<div class="content-ad"></div>

아래는 표를 마크다운 형식으로 변경했습니다.

<img src="/assets/img/2024-06-19-Part2ReactNamingConventionReturnSignaturesforHooks_9.png" />

<img src="/assets/img/2024-06-19-Part2ReactNamingConventionReturnSignaturesforHooks_10.png" />

다음은 이 네이밍 규칙 및 훅 반환 형식을 사용하는 이유입니다:

- 컴포넌트에서 사용 중인 훅의 유형을 식별하는 데 도움이 됩니다.
- 훅을 더 일관된 방법으로 사용할 수 있게 도와줍니다. 다른 컴포넌트에서 동일한 훅에 대해 서로 다른 변수 이름을 사용하지 않게 됩니다.
- 변수 충돌을 피하는 데 도움이 됩니다. 각 훅에 고유한 이름이 있어 해당 훅 이름을 포함하는 객체를 반환하기 때문에 변수 충돌을 방지할 수 있습니다.

<div class="content-ad"></div>

# 🚀 결론

이것을 작성하기 전에, React 문서에서 이미 다뤄진 이 주제가 흔하기 때문에 말할 게 많지 않을 거라고 생각했어요.

하지만 제가 깨달은 건, 우리가 다룰 수 있는 몇 가지 부분이 있고 우리의 경험을 통해 배운 것을 공유할 수 있다는 거예요.

프로그래밍에서 네이밍 규칙과 일반적인 접근 방식은 중요합니다. 일관된 네이밍 규칙과 접근 방식이 없다면 코드베이스를 이해하고 유지 관리하기 어려울 것입니다.

<div class="content-ad"></div>

최종적으로, 사용할 방법은 당신에게 달려있습니다. 저가 공유한 전통적인 방법이나 제안된 방법 중 원하는 방법을 선택할 수 있습니다. 무엇을 선택하든, 선택한 방법을 유지하고 일관되게 사용하는 것이 중요합니다.

당신은 미래의 자신과 팀을 위해 코드를 작성하고 있습니다. 이해하기 쉽고 유지보수하기 쉬운 코드를 작성하는 데 주의해주세요.

언제든지 질문이나 제안이 있으면 아래에 댓글을 남겨 주세요. 당신의 의견을 기다리고 있을게요.

읽어 주셔서 감사합니다. 이 글이 여러분의 여정에 도움이 되길 바랍니다! ❤️

<div class="content-ad"></div>

# 쉽고 이해하기 쉽게 🚀

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:

- 작가를 클랩하고 팔로우해주세요 👏️️
- 팔로우 링크: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문: Stackademic | CoFeed | Venture | Cubed
- 알고리즘 콘텐츠를 다루는 블로깅 플랫폼에 지쳤나요? Differ를 시도해보세요
- PlainEnglish.io에서 더 많은 콘텐츠를 만나보세요