---
title: "Groww 프런트엔드 인턴 면접 경험  오프캠퍼스 채용 2024"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Groww SDE Intern-Frontend Interview Experience  Off-Campus Hiring 2024"
link: "https://medium.com/@aomkarg2003/groww-sde-intern-frontend-interview-experience-off-campus-hiring-2024-92f6243a5344"
isUpdated: true
---

![image](https://miro.medium.com/v2/resize:fit:1400/0*mMZOc4HhktXHlCaA.gif)

링크드인 포스트에서 Groww가 프론트엔드 팀을 위한 인턴을 모집 중이라는 소식을 들었습니다. 빠르게 지원서를 작성하고 다음 단계를 기다리고 있었어요.

Groww는 투자 플랫폼으로, 사용자들이 투자할 최적의 상호펀드를 찾고 수고 없이 돈을 투자할 수 있는 곳이에요. 회사는 2017년에 론칭되었고 현재는 유니콘 기업으로 성장해 인도에서 최고의 핀테크 스타트업 중 하나로 손꼽히고 있어요.

이력서 심사 후에, 3일의 시간 제한 내에 확인 게이트웨이를 만들어야 했던 과제를 받았어요. 주어진 과제에 대한 합리적인 시간이었지만 배포 문제로 인해 과제를 두 날 늦게 제출했습니다. 상황에 맞는 이유와 직면한 문제를 설명해 늦게 제출했어요.

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

과제를 완수하기 위해 필요한 기술 세트는 다음과 같았습니다:

- Next.js
- 상태 관리 도구 (Redux/ContextAPI)
- 반응형 UI 디자인
- 좋은 자바스크립트 지식
- React 라우팅 및 Rest API
- Netlify, Vercel 등에서 호스팅

과제를 제출한 후, 4월 첫째 주쯤에 전화를 받아 과제가 최종 선정되었고 이제 기술 면접 라운드에 진출했습니다. 그 때는 대학의 내부 시험이 진행되는 시기여서 교수님에게 다음 주에 시험을 치뤄달라고 요청했습니다.

기술 면접 준비 기간은 2일이었습니다. 면접은 양쪽에서 일반 소개로 시작되었고 회사에 대해 논의하고 처음에는 편안하게 만들기 위해 몇 가지 기본 질문이 있었습니다.

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

면접관은 지원적이고 친절했어요. 과제 토론으로 시작했는데 (제출한 과제의 코드를 명확히 이해해야 해요), 개선할 점에 대해 물어봤어요. 제 과제에서 특정 기능을 구현하는 대안적인 방법 몇 가지를 지적해주셨고, 배포된 사이트를 안내해달라고 요청도 했어요. 대화와 질문은 이렇게 진행됐어요 —.

- async와 differ의 차이는 무엇인가요?
- CSR과 SSR은 무엇인가요?
- let, var 및 const의 차이점은 무엇인가요?
- lazy loading은 무엇인가요?
- JS 코드 스니펫을 주고 그 출력을 추측하라는 요청을 받았어요. 이는 이벤트 루프와 메시지 큐에 기반한 것이었어요. 나중에는 JS에서 이벤트 루프가 어떻게 동작하는지 설명해보라는 질문도 받았어요.
- 또 다른 JS 코드 스니펫을 주고 출력을 추측하라는 요청을 받았어요. setTimeout 및 JS에서 변수의 범위 차이에 기반한 tricky한 문제였어요.

```js
function snippet() {
  for (var i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i);
    }, 3000);
  }
}
snippet();
```

- 출력을 추측하고 0, 1, 2, 3...이 순서대로 출력되도록 두 가지 접근 방법을 제안해야 했어요.
- 마지막에는 일정 기간 후에 만료되도록 로컬 스토리지에 자격 증명을 저장하는 로그인 기능을 코딩해보라는 요청도 받았어요.

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

이 시점에서 이미 1.5 시간 이상이 소요되었고 모든 질문에 대해 코드 샌드박스에서 코드를 작성해야 했습니다. 화면을 공유하면서 진행되었습니다.

면접은 groww가 사용하는 기술 스택과 현재 작업 중인 기술 스택에 관해 물은 내가 물어본 질문으로 마무리되었습니다.

거의 2-3일 후, HR로부터 기술 면접을 통과했다는 연락을 받았고 마지막 라운드가 예정되었습니다.

그것은 문화 적합성 라운드였습니다. 면접관은 매우 침착했고 서로 대화를 나누며 다음과 같은 질문에 대해 이야기했습니다: -

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

- Groww에 가입하고 싶은 이유는 무엇인가요?
- 이전 라운드에서의 경험은 어땠나요? 어떤 순간이 어려웠나요?
- CRED, Zepto, Groww와 같은 최고 스타트업으로부터 여러 제안을 받았다면 어떤 것을 선택할 것이며 그 이유는 무엇인가요?
- 개발 여정 및 프로젝트에 대해 알려주세요.
- 직장 출근하는 것(WFO)과 재택근무(WFH) 중 어느 쪽을 선호하시나요?

이번 라운드는 약 30분간 진행되었고, 다양한 주제에 대해 이야기했습니다. 대화를 잘 이끌어갈 수 있는 능력이 중요한 것 같아요. 그리고 다음 주에 합격 소식을 듣고 같은 날에 입사 제안서를 받았어요 🥳🎉!!

준비 팁:

- Akshay Saini의 Namaste Javascript 및 Core Javascript Fundaments 유튜브 채널을 꼭 시청해보세요.
- ReactJS에 기반한 인터뷰라면 머신 코딩과 관련된 문제를 연습해보세요.
- 인터뷰 경험과 JS 인터뷰 질문 영상을 살펴보세요.
- 인터뷰 전에 회사에 대해 충분히 조사해보세요.
- 작성한 코드에 자신감을 가져야 합니다.
- 인터뷰에서 질문에 대한 깊이 있는 생각 과정을 설명해야 하며 최종 결과물뿐만 아니라 아이디어를 나누어주세요.
- 답변할 때 참여도를 유지하고 소리내어 생각을 표현해보세요.

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

면접 준비를 잘 하길 바래요! 내가 만든 첫 번째 기사를 준비했어, 도움이 되었으면 좋겠어. 좋았다면 좋아요 눌러주시고, 의견을 댓글로 공유해주세요!
더 많은 팁이 필요하다면 링크드인이나 트위터로 연락해주세요.
읽어 주셔서 감사해요. 건배!

관심 가져주셔서 감사합니다.

- Omkar Anabathula
