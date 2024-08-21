---
title: "NinjaCart SDE 2 프론트엔드 인터뷰 경험"
description: ""
coverImage: "/assets/img/2024-05-18-NinjaCartSDE2frontendInterviewExp_0.png"
date: 2024-05-18 21:40
ogImage:
  url: /assets/img/2024-05-18-NinjaCartSDE2frontendInterviewExp_0.png
tag: Tech
originalTitle: "NinjaCart SDE 2 frontend Interview Exp"
link: "https://medium.com/@prikshit8/ninjacart-sde-2-frontend-interview-exp-d84801a02e5c"
isUpdated: true
---

친구로부터 닌자카트 인재영입 담당자의 전화번호를 받았어요

# 면접 1 — 기본 JS 이해

1번 질문 — 디바운싱과 쓰로틀링에 관련된 질문입니다. 이 두 기술의 차이 및 실제 적용법을 말해주세요.

2번 질문 — 프로미스와 setTimeout을 활용한 출력 관련 질문입니다.

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
console.log(1);

setTimeout(function () {
  console.log(2);
}, 0);

Promise.resolve()
  .then(function () {
    console.log(3);
  })
  .then(function () {
    console.log(4);
  });
```

3번 문제 — 클로저 및 setTimeout을 기반으로 한 출력 문제

```js
for (var index = 1; index <= 3; index++) {
  setTimeout(function () {
    console.log("after " + index + " second(s):" + index);
  }, index * 1000);
}
```

4번 문제 — 중첩된 배열을 평평하게 만드는 함수를 작성하십시오.

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

5번 질문 — useEffect와 useMemo를 기반으로 함

# 2차 인터뷰 — 머신 코딩 및 문제 해결

1번 질문 — 사용자 정의 React 탭 컴포넌트 만들기
해결책

2번 질문 — 실패하면 프라미스를 다시 시도하는 함수 만들기 (질문 링크)

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

# 3차 면접 — 매니저 면접

매니저는 하르야나 출신이셔서 저희는 그냥 평범한 대화를 나눴어요 (아버지의 친구와 얘기하는 느낌이었어요 😂)
