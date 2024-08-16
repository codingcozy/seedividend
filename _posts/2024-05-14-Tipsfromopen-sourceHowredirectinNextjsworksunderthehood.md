---
title: "오픈 소스로 배우는 팁 Nextjs에서 리다이렉트가 어떻게 작동하는지 살펴보기"
description: ""
coverImage: "/assets/img/2024-05-14-Tipsfromopen-sourceHowredirectinNextjsworksunderthehood_0.png"
date: 2024-05-14 11:04
ogImage: 
  url: /assets/img/2024-05-14-Tipsfromopen-sourceHowredirectinNextjsworksunderthehood_0.png
tag: Tech
originalTitle: "Tips from open-source: How redirect in Next.js works under the hood"
link: "https://medium.com/@ramu.narasinga_61050/tips-from-open-source-how-redirect-in-next-js-works-under-the-hood-da0c489aecb6"
isUpdated: true
---




이 기사에서는 넥스트.js에서 리다이렉션 작동 방식을 살펴보면서 넥스트.js 소스 코드 주변의 리다이렉션 기능에 대해 배우게 됩니다.

# 나의 접근 방식:

- Import를 시작으로
- Redirect 함수를 redirect.ts 파일까지 추적
- redirect.ts 설명
- 에러를 throw 하는 것이 리디렉션이 작동하는 방법
- 전체 맥락을 이해하기 위해 redirect.test.ts 확인
- redirect-boundary.ts에 리다이렉션 기능이 있음

# 1. Import를 시작으로:



리다이렉트 함수는 next/navigation에서 가져온 것입니다. 리다이렉트에 대해 더 알고 싶다면 다음 링크를 확인해보세요: https://nextjs.org/docs/app/api-reference/functions/redirect.

하지만 next/navigation 코드는 어디에서 찾을 수 있을까요? navigation.js 파일에서 이 코드를 찾을 수 있습니다. 이 파일은 기본적으로 navigation.ts를 내보내는데, 이는 /packages/next/src/client/components에 있습니다.

# 2. 리다이렉트 함수를 redirect.ts 파일로 추적하기

현재 이 글을 작성하는 시점에서 navigation.ts에는 272줄의 코드가 있지만, 우리가 관심 있는 것은 파일 끝에 아래와 같이 표시된 "redirect"의 내보내기입니다. 찾고자 하는 것에 집중하세요. 다른 코드에 방해받지 마세요.



"여기 보시다시피, redirect는 navigation.react-server.ts에서 내보내는 것입니다. navigation.react-server.ts 안에 들어가보면, redirect 함수가 실제로 redirect.ts에서 왔다는 것을 알게 될 거에요.

저는 중첩된 내보내기를 몰랐어요. 흥미롭네요."



# 3. Render.ts 설명

“redirect() 함수를 호출하면 NEXT_REDIRECT 오류가 발생하고 발생한 위치의 라우트 세그먼트의 렌더링을 중단합니다." — Nextjs 문서

redirect.ts 파일 내에서 오류를 발생시키는 코드 조각을 살펴봅시다.

![이미지](/assets/img/2024-05-14-Tipsfromopen-sourceHowredirectinNextjsworksunderthehood_2.png)



# 4. 에러를 발생시켜서 리디렉션이 작동하는 방식은 무엇인가요?

리디렉트 함수가 에러를 발생시켜서 에러.digest를 설정하지만, 에러를 발생시켜서 리디렉션이 작동하는 방식이 명확하지 않았습니다.

오랫동안 찾아봤고, 리디렉트가 에러를 발생시킨다는 것을 고려하여 catch 블록을 찾으려고 노력했습니다. 서버 관련 파일을 뒤져봐도 도움이 되지 않았어요.

redirect.test.ts를 살펴보면서 조금씩 이해되기 시작했어요.



# 5. 전체 맥락을 이해하려면 redirect.test.ts를 확인하세요

![image](/assets/img/2024-05-14-Tipsfromopen-sourceHowredirectinNextjsworksunderthehood_3.png)

한 번 어딘가에서 함수의 컨텍스트를 이해하는 데 테스트를 사용할 수 있다고 읽은 적이 있습니다. 그래서 redirect.test.ts에서 코드를 확인한 이유입니다.

테스트 코드에서 getURLFromRedirectError(err) 함수가 호출되는 것이 명백합니다. 이 함수는 react-boundary.ts에서 찾을 수 있습니다.



알겠어요. 테스트에서는 getURLFromRedirectError 함수를 호출하는데 실행 흐름은 어떻게 될까요? 에러가 발생한 후에는 무엇이 일어날까요? getURLFromRedirectError 함수를 기반으로 검색한 결과는 다음과 같아요:

![이미지](/assets/img/2024-05-14-Tipsfromopen-sourceHowredirectinNextjsworksunderthehood_4.png)

## 6. redirect-boundary.ts에는 리디렉션 기능이 있어요

답은 Next.js 리디렉션이 useRouter 훅을 사용하며 리디렉션 유형에 따라 URL을 푸시하거나 교체합니다.



<img src="/assets/img/2024-05-14-Tipsfromopen-sourceHowredirectinNextjsworksunderthehood_5.png" />

이 리다이렉트 경계는 아래에 표시된 앱-라우터 코드의 일부입니다.

<img src="/assets/img/2024-05-14-Tipsfromopen-sourceHowredirectinNextjsworksunderthehood_6.png" />

리다이렉트에서 오류가 발생하면 리다이렉트 경계에서 오류가 catch되고 리다이렉트가 발생합니다. 리다이렉트 함수 자체가 리다이렉트를 수행하지 않고 앱-라우터 내부의 리다이렉트 경계가 라우팅 로직을 처리하는 것이 상당히 흥미로운 점입니다.



# 결론:

나는 이 API가 왜 이런 식으로 설계되었는지 모르겠지만, 여기에 오류를 throw하는 패턴을 사용하고 해당 오류를 catch하고 원하는 작업을 수행하는 boundary 를 사용할 수 있습니다. 이 npm 패키지에서 오류를 throw하는 패턴을 사용하여 해당 오류를 catch하고 원하는 작업을 수행하는 boundary 를 사용해 보세요.

redirect.test.ts 코드를 확인하지 않았다면, redirect 작동 방식을 파악하지 못했을 것입니다. 나는 redirect.ts 에 catch 블록을 찾고 있었지만 그렇지 않았기 때문입니다.

이 글에 대해 궁금한 점이 있으시면 언제든지 ramu.narasinga@gmail.com 으로 연락 주세요.



# 더 많은 자료:

- [navigation.react-server.ts](https://github.com/vercel/next.js/blob/c1f8d9317588e51a8a31240f6add36b5f2c9f9bf/packages/next/src/client/components/navigation.react-server.ts)
- [navigation.js](https://github.com/vercel/next.js/blob/c1f8d9317588e51a8a31240f6add36b5f2c9f9bf/packages/next/navigation.js)
- [redirect.ts](https://github.com/vercel/next.js/blob/c1f8d9317588e51a8a31240f6add36b5f2c9f9bf/packages/next/src/client/components/redirect.ts)
- [redirect.test.ts](https://github.com/vercel/next.js/blob/canary/packages/next/src/client/components/redirect.test.ts)
- [redirect-boundary.tsx](https://github.com/vercel/next.js/blob/c1f8d9317588e51a8a31240f6add36b5f2c9f9bf/packages/next/src/client/components/redirect-boundary.tsx#L8)