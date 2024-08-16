---
title: "클라이언트 측 React 문제 해결을 위한 Date API 수정하기"
description: ""
coverImage: "/assets/img/2024-05-14-PatchingtheDateAPItoSolveClient-SideReactIssues_0.png"
date: 2024-05-14 10:25
ogImage: 
  url: /assets/img/2024-05-14-PatchingtheDateAPItoSolveClient-SideReactIssues_0.png
tag: Tech
originalTitle: "Patching the Date API to Solve Client-Side React Issues"
link: "https://medium.com/javascript-in-plain-english/patching-the-date-api-to-solve-client-side-reactjs-issues-cd320c8478af"
isUpdated: true
---




<img src="/assets/img/2024-05-14-PatchingtheDateAPItoSolveClient-SideReactIssues_0.png" />

리액트.js 19 버전이 곧 출시되면서 Next.js를 사용하여 새로운 기능을 활용할 수 있게 되었습니다. 하지만, 특히 자바스크립트의 Date API와 관련된 문제가 발생하는데, 서버에서 생성된 콘텐츠와 클라이언트 측의 동작을 조율하는 것이 주요 도전 과제입니다. 이 기사는 Date API로 인해 발생하는 구체적인 문제와 리액트 코드가 클라이언트 측에서 실행될 때 발생하는 이러한 문제가 웹 애플리케이션에서 예상되는 원활한 사용자 경험을 방해하는 수행 오류로 어떻게 이어질 수 있는지에 대해 다룹니다.

# 클라이언트 측 리액트에서의 Date 문제

클라이언트 측 렌더링에서 리액트의 수분화 메커니즘은 이벤트 리스너 및 기타 상호작용 기능을 서버에서 원래 생성된 정적 HTML에 첨부하도록 설계되어 있습니다. 이 프로세스에서 서버 출력과 클라이언트의 초기 렌더 간의 정확한 대응이 필요합니다. 그러나 JavaScript의 Date 객체 사용은 그 자체의 실행 특성 때문에 이 시스템에서 기본적인 문제를 도입하게 됩니다.



```js
"use client";

export default function DateError() {
  const date = new Date();
  return <div>{date.toLocaleString()}</div>;
}
```

`new Date()`함수는 호출 시점을 기반으로 한 타임스탬프를 생성합니다. 이 코드가 SSR 중인 서버와 이후 클라이언트에서 실행될 때 거의 항상 두 개의 다른 타임스탬프가 생성됩니다. 이러한 불일치는 React에서 "수분 불일치"로 알려져 있습니다. 클라이언트는 서버의 HTML을 기반으로 기대한 내용과 로컬 생성한 내용 사이의 차이를 감지하고, 오류를 발생시키며 때로는 사용자 경험을 망가뜨리기도 합니다.

<img src="/assets/img/2024-05-14-PatchingtheDateAPItoSolveClient-SideReactIssues_1.png" />

# React 코어 팀의 제안하는 해결책




Date 불일치로 인한 지속적인 문제에 대응하여, React 코어 팀이 혁신적인 해결책을 제안했습니다: 서버 측 렌더링(SSR) 및 수분화 중에 Date API를 수정하는 것입니다. 이 방식은 Date 함수의 출력을 서버와 클라이언트 환경에서 표준화하여 두 환경이 동일한 타임스탬프를 렌더링하도록 보장함으로써 수분화 불일치를 제거하는 데 목적을 두고 있습니다.

![이미지](/assets/img/2024-05-14-PatchingtheDateAPItoSolveClient-SideReactIssues_2.png)

제안된 패치는 SSR 및 수분화 중에 Date API의 동작을 변경하여 실행 시간에 따라 새로운 타임스탬프를 생성하는 대신 초기 서버 렌더링 중에 사용된 타임스탬프를 일관되게 반환하도록합니다. 이것은 서버에서 생성된 날짜 및 시간이 클라이언트에서의 수분화 과정 중에 "고정"되어, 클라이언트 측 React 애플리케이션이 실제로 코드를 실행하는 시점에 관계없이 서버에서 렌더링된 시간 값을 보게 하는 것을 의미합니다.

![이미지](/assets/img/2024-05-14-PatchingtheDateAPItoSolveClient-SideReactIssues_3.png)



# 패치 구현이 이루어질 때까지의 임시 해결책

실용적인 접근 방식 중 하나는 서버에서 날짜 생성을 관리한 다음 이 값을 props로 클라이언트에 전달하는 것입니다. 이 전략을 통해 서버와 클라이언트가 동일한 타임스탬프로 작업하므로 하이드레이션 중 불일치를 피할 수 있습니다.

```js
//부모
import DateError from "./components/DateError";

export default function Home() {
  const date = new Date();

  return (
    <main>
      <DateError date={date} />
    </main>
  );
}
```

```js
//자식
"use client";

interface DateErrorProps {
  date: Date;
}
export default function DateError({ date }: DateErrorProps) {
  return <div>{date.toLocaleString()}</div>;
}
```



이 방법은 서버에서 한 번 생성된 날짜를 클라이언트에서 재사용하여, 재렌더링 및 수분을 통해 일관성을 유지함으로써 문제를 효과적으로 우회합니다.

# 결론

해당 패치는 React 개발의 한 측면인 날짜 불일치로 인한 수분 불일치를 해결하기 위해 약속하고 있습니다. 그러나 중요한 변경 사항과 마찬가지로, 네이티브 JavaScript API를 수정하는 최선의 방법에 대한 커뮤니티 내에서 대화를 일으키고 있습니다.

개발자들은 이 토론에 참여하고 이 패치의 진행 상황을 주시하도록 권장받습니다. Twitter에서 Andrew Clark와 같은 거장들의 이야기를 따르면 React 생태계 내에서 이 주제 및 다른 개발에 대한 가치 있는 통찰과 업데이트를 얻을 수 있습니다.

이 글은 Theo의 영감을 받아 작성되었습니다. 더 많은 업데이트 및 React 최신 개발에 대한 심도 있는 토론을 위해 그의 채널을 구독하는 것을 강력히 권장합니다.



마크다운 형식으로 테이블 태그를 변경하실 수 있습니다.