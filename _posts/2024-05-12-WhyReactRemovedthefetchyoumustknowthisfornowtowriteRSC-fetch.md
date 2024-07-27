---
title: "리액트가 fetch를 왜 제거했는지 지금 RSC-fetch를 작성하기 위해 반드시 알아야 하는 내용"
description: ""
coverImage: "/assets/img/2024-05-12-WhyReactRemovedthefetchyoumustknowthisfornowtowriteRSC-fetch_0.png"
date: 2024-05-12 20:17
ogImage: 
  url: /assets/img/2024-05-12-WhyReactRemovedthefetchyoumustknowthisfornowtowriteRSC-fetch_0.png
tag: Tech
originalTitle: "Why React Removed the fetch (you must know this for now to write RSC-fetch)"
link: "https://medium.com/@codewithmee/why-react-removed-the-fetch-cache-you-must-know-this-for-now-to-write-rsc-fetch-17b4dfb9c006"
---


<img src="/assets/img/2024-05-12-WhyReactRemovedthefetchyoumustknowthisfornowtowriteRSC-fetch_0.png" />

몇 일 전, React 팀이 암시적인 fetch 캐시를 제거했습니다. 그리고 fetch 요청의 결과를 명시적으로 캐시하는 데 `React.cache`를 사용하는 것을 제안했습니다. 새로운 `React.cache` API의 장점을 최대한 활용하려면 RSC에서 fetch 호출을 작성하는 새로운 방법을 이해하는 것이 중요합니다. 그러나 새로운 방법에 대한 이해에 접어들기 전에, 개발자가 캐시를 명시적으로 관리하는 것이 왜 유익한지 먼저 이해해 봅시다.

암시적 캐싱의 위험성

캐싱은 전반적으로 유익해 보이지만, 브라우저나 프레임워크가 개발자의 제어 없이 자동으로 데이터를 캐시하는 암시적 캐싱은 예상치 못한 동작과 버그를 일으킬 수 있습니다. 여기에 이유가 있습니다:



- 만료된 데이터: API 응답이 자주 변경되는 경우, 암시적으로 캐싱을 하면 사용자에게는 오래된 정보가 제공될 수 있어서 보여지는 데이터와 실제 상태 사이에 불일치가 발생할 수 있습니다.
- 일관성이 없음: 다른 브라우저나 브라우저 설정은 캐싱을 다르게 구현할 수 있어 사용자 경험 사이에 불일치가 생길 수 있습니다.
- 디버깅 문제: 만료된 데이터로 인한 문제가 발생할 때, 캐싱 메커니즘을 명시적으로 제어하지 않는 경우 원인을 파악하기 어려울 수 있습니다.

성능과 유지보수성을 위한 명시적 제어

명시적 캐싱을 선택함으로써, 개발자가 데이터가 어떻게 그리고 언제 캐싱되는지에 대한 소유권을 갖도록 장려합니다. 이를 통해 우리는 다음과 같은 이점을 가질 수 있습니다:

- 캐싱 전략 정의: 데이터의 특성과 업데이트 빈도에 기반하여 적절한 캐싱 전략을 선택할 수 있습니다. 예를 들어, 정적 데이터는 무기한 캐싱될 수 있으며, 자주 변경되는 데이터는 유효성 검사 메커니즘이 필요할 수 있습니다.
- 무효화 처리: 캐시 만료 시간이나 무효화 리스너와 같은 기술을 구현하여 캐시가 적합하고 오래된 정보를 제공하지 않도록 할 수 있습니다.
- 개선된 디버깅: 캐싱을 명시적으로 제어함으로써 데이터 흐름을 쉽게 이해하고 캐싱 문제의 원인을 식별할 수 있어 개발자들이 문제 해결을 용이하게 할 수 있습니다.



React fetch 캐시는 무엇인가요?

fetch 호출을 하면 React가 fetch 결과를 캐싱했습니다. 다른 컴포넌트들이 동일한 데이터를 필요로 하여 동일한 fetch 호출을 하면, React는 엔드포인트로 새로운 요청을 보내지 않고 대신에 캐시로부터 데이터를 다른 컴포넌트에 제공합니다. 이는 성능을 위해 좋지만, 예상치 못한 동작을 일으킬 수도 있습니다. 예를 들어, 아래 코드에서 다섯 개의 컴포넌트가 fetch 호출을 하고 모두 동일한 데이터가 필요합니다. 이렇게 요청을 만들 경우에 React는 결과를 캐시하지 않고 동일한 엔드포인트에 다섯 번의 요청을 보냅니다. 여기서 `React.cache` API가 캐시를 명시적으로 관리하기 위해 등장합니다.



**Reach.cache()** 새로운 방법으로 fetch 호출 작성하기

이제는 동일한 데이터가 필요한 다른 컴포넌트가 있다면 새로운 요청을 수행하지 않도록 fetch 호출을 React.cache로 래핑해야 합니다. 이것은 한 번의 요청만을 수행합니다.

```js
import React from "react"

const getMessiStats = React.cache(async () => {
    const stats = await fetch('https://api.football-data.org/v2/players/52')
    return stats.json()
})

async function MessiStats() {
    const data = await getMessiStats()
    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}

export async function RSCFetch() {
    const stats = await getMessiStats()
    return (
        <>
            <div>{JSON.stringify(stats)}</div>
            <MessiStats />
            <MessiStats />
            <MessiStats />
            <MessiStats />
        </>
    )
}
```