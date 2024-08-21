---
title: "프로젝트에 Nextjs 14를 더이상 사용하면 안되는 이유"
description: ""
coverImage: "/assets/img/2024-05-27-StopUsingNextjs14_0.png"
date: 2024-05-27 18:42
ogImage:
  url: /assets/img/2024-05-27-StopUsingNextjs14_0.png
tag: Tech
originalTitle: "Stop Using Next.js 14"
link: "https://medium.com/gitconnected/stop-using-next-js-14-538f35404ea4"
isUpdated: true
---

![Next.js](/assets/img/2024-05-27-StopUsingNextjs14_0.png)

Next.js는 여전히 가장 훌륭한 풀스택 프레임워크 중 하나로 손꼽힙니다.

하지만, 우리에게는 Next.js 버전 14 사용을 중단할 시간이 될 수도 있습니다…

왜냐하면 Next.js 15 릴리스 후보 (RC) 버전이 출시되었기 때문입니다!

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

Next.js 15 RC에는 많은 흥미로운 새로운 기능이 약속되어 있어요. 오늘은 그 중 4가지를 살펴볼 거에요!

그럼 이제... 바로 시작해 봅시다!

## 1. 부분 사전 렌더링

부분 사전 렌더링 (PPR)은 Next.js 14에서 소개된 특별한 기능으로, 정적 및 동적 페이지 콘텐츠가 완벽하게 공존할 수 있도록 해줘요.

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

PPR 작동 방식에 대해 더 알고 싶다면, 이 문서를 자유롭게 확인해 보세요.

하지만 Next.js 15에서는 PPR의 점진적 적용이 마침내 가능해졌습니다!

이는 experimental_ppr 플래그를 true로 설정하여 특정 page.tsx 및 layout.tsx 파일을 PPR에 선택적으로 선택할 수 있다는 의미입니다.

```js
import { Suspense } from "react"
import { StaticComponent, DynamicComponent } from "@/app/ui"

// 이 페이지만 PPR로 선택
export const experimental_ppr = true

export default function Page() {
  return {
     <>
      <StaticComponent />
      <Suspense fallback={...}>
       <DynamicComponent />
      </Suspense>
     </>
  };
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

다음으로 next.config.js 파일에서 experimental.ppr 구성을 'incremental'로 설정하세요:

```js
const nextConfig = {
  experimental: {
    ppr: "incremental",
  },
};

module.exports = nextConfig;
```

# 2. next/after

next/after은 응답 스트리밍이 종료된 후 작업을 예약할 수 있는 새로운 API입니다.

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

다시 말해, 서버리스 함수가 계산을 마치면, 이제 새로운 after() 함수 내에서 추가 코드를 실행할 수 있습니다.

![이미지](/assets/img/2024-05-27-StopUsingNextjs14_1.png)

이것은 후속 fetch 로깅 및 분석에 매우 유용합니다.

지금 next/after를 사용하려면, next.config.js 파일에 다음과 같이 experimental.after 설정을 추가할 수 있습니다:

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

아래는 Next.js 서버 액션 내에서 `after()` 함수를 사용하는 예시입니다:

```js
"use server";

function next_after() {
  // 여러분의 함수 로직...
  const something = true;

  // 보조 작업 - 데이터가 반환된 후에 데이터를 로깅합니다.
  after(() => {
    console.log(something);
  });

  // 주요 작업 - 데이터를 반환합니다.
  return something;
}
```

# 3. 캐싱

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

The Next.js 팀이 우리의 의견을 들어주었어요!

- fetch 요청
- GET 핸들러
- 그리고 클라이언트 네비게이션...

기본적으로 더 이상 캐시되지 않아요!

이 변화는 기다리고 있던 변화였고, Next.js 15가 이를 마침내 구현했어요.

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

# 4. 리액트 19 지원

공식으로, Next.js 15 RC는 리액트 19 RC와 완벽하게 호환됩니다!

리액트 19 릴리스에 대해 들은 적이 없다면, 여기 리액트의 공식 트윗이 있습니다.

더 알아보기 위해 여기에서 리액트 컨퍼런스 키노트를 시청할 수 있습니다.

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

# 결론

이 글이 Next.js 14 시대를 떠나 Next.js 15에 흥분하게 만들었으면 좋겠어요.

Next.js 15는 무수히 많은 흥미로운 변화를 가져왔으며, 오늘 우리는 그 중 4가지를 상세히 다뤘습니다.

# 제휴사

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

- 올인원 SaaS 프로젝트 템플릿
- Figma 홈: 제가 모든 프로젝트에서 사용하는 UI 디자인 도구입니다.
- Figma 프로페셔널: 당신이 필요로 할 유일한 UI 디자인 도구입니다.
- FigJam: 직관적인 다이어그램 및 브레인스토밍으로 마음을 펼쳐 보세요.
- 노션: 제 인생 전체를 조직하는 데 사용되는 도구입니다.
- Notion AI: ChatGPT를 뛰어넘고 노션 워크플로우를 견고하게 만들어 줄 AI 도구입니다.

# 참고 자료

- https://nextjs.org/blog/next-15-rc
