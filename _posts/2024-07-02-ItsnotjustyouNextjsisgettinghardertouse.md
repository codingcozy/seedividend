---
title: "Nextjs 사용이 점점 더 어려워지는 이유"
description: ""
coverImage: "/TIL/assets/img/2024-07-02-ItsnotjustyouNextjsisgettinghardertouse_0.png"
date: 2024-07-02 21:52
ogImage:
  url: /TIL/assets/img/2024-07-02-ItsnotjustyouNextjsisgettinghardertouse_0.png
tag: Tech
originalTitle: "It’s not just you, Next.js is getting harder to use"
link: "https://medium.com/@PropelAuth/its-not-just-you-next-js-is-getting-harder-to-use-5ab30a24282a"
---

![image 1](/TIL/assets/img/2024-07-02-ItsnotjustyouNextjsisgettinghardertouse_0.png)

이전에 언급한 것처럼, Next.js 미들웨어를 사용하면 서버 컴포넌트가 부과한 일부 제한을 해결하는 데 유용할 수 있다는 블로그 글을 썼어요. 이에 대한 토론으로 인해 Next.js 개발 경험이 좋지 않다는 의견이 나왔어요.

![image 2](/TIL/assets/img/2024-07-02-ItsnotjustyouNextjsisgettinghardertouse_1.png)

저의 관점에서, Next.js 의 앱 라우터에는 채택하기 어렵게 만드는 두 가지 주요 문제가 있어요:

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

- 보통 기초적인 작업을 하려면 내부 동작에 대해 많은 것을 이해해야 합니다.
- 옵트인(opt-in)이 아닌 옵트아웃(opt-out)인 방식으로 발을 쏘기 쉬운 많은 방법이 있습니다.

더 잘 이해하려면, 이전 버전인 Pages Router를 살펴보겠습니다.

# Pages Router 간단히 살펴보기

Next.js에 대해 처음 알게 되었을 때, 주요 "경쟁자"는 Create React App (CRA)였습니다. 나는 모든 프로젝트에 CRA를 사용했지만 두 가지 이유로 Next.js로 전환했습니다:

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

- 파일 기반 라우팅이 마음에 들었어요. 왜냐하면 보일러플레이트 코드를 적게 작성할 수 있어서요.
- 개발 서버를 실행할 때마다 CRA는 빠르게 짜증나는 http://localhost:3000을 열었는데, Next.js는 그렇지 않았어요.

두 번째 이유는 조금 어리석게 들릴 수 있지만, 나에게는 Next.js가 였어요:

더 나은 기본 설정이 있는 React.

그리고 그게 내가 정말 원했던 것이었어요. 후에 Next.js가 갖고 있는 다른 기능을 발견했을 때에는 꽤 놀랐어요. API 라우트는 추가 인프라를 설정할 필요 없이 서버리스 함수를 제공해주어서 "Contact Us" 양식 같은 것을 만드는 것에 아주 유용했어요. getServerSideProps를 사용하면 페이지가 로드되기 전에 서버에서 기본 함수를 실행할 수 있었어요.

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

그 개념들은 강력하지만 동시에 간단하기도 했어요.

API route는 다른 라우트 핸들러와 매우 비슷하게 보였고 동작했어요. Express나 Cloudflare Workers를 사용해봤다면 라우트 핸들러를 자세히 보면 이미 알고 있던 개념들이 그대로 적용돼 있는 걸 느낄 수 있어요. getServerSideProps는 약간 다르긴 했지만, 한번 요청을 받는 방법과 응답 형식을 이해하면 꽤 간단한 거라는 걸 알게 되었어요.

# 앱 라우터 릴리스

Next 13 릴리스에서는 앱 라우터를 도입했고 많은 새로운 기능들이 추가됐어요. 서버 컴포넌트를 사용하면 React 컴포넌트를 서버에서 렌더링하고 클라이언트에 전달해야하는 데이터 양을 줄일 수 있어요.

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

레이아웃은 여러 경로에서 공유되는 UI의 측면을 정의할 수 있어서 매번 탐색할 때마다 다시 렌더링할 필요가 없었습니다.

캐싱 기능이... 더욱 정교해졌습니다.

이러한 기능들이 흥미로웠지만, 가장 큰 손실은 간단함이었습니다.

# 프레임워크가 생각했던대로 동작하지 않을 때

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

개발자로서 머리를 벽에 쿵쿵 치며 "왜 이게 작동하지 않지?" 하고 외치는 것은 상당히 보편적인 경험입니다.

모두가 다 그런 적이 있고, 항상 짜증이 납니다. 제 경우, 코드에 버그가 아니라 어떻게 작동해야 하는지 잘 몰랐을 때가 더 고통스러웠습니다.

이제 더 이상 "왜 이게 작동하지 않지?" 라고 말하지 않고, "왜 이게 저렇게 작동하지?" 라고 이제 말할 것입니다.

앱 라우터는 안타깝게도 이러한 섬세한 점들로 가득합니다.

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

내 원래 문제를 다시 살펴보겠어요: 서버 컴포넌트에서 URL을 얻고 싶었어요. 주제에 대한 인기 있는 Github 이슈에 대한 답변을 준비했는데, 그 중 일부를 여기에 올려볼게요:

이 응답은 정말 대단하다고 생각해요. 잘 쓰여졌고, 많은 기본적인 문제들을 이해하는데 도움이 되며, 저는 전혀 고려하지 못한 다양한 접근 방식과 관련된 절충안에 대한 통찰력을 얻게 되었어요.

하지만 말해야 할 한 가지는, 개발자이고 서버 컴포넌트에서 URL을 얻으려는 것이라면, 아마도 이것을 읽은 후에 아마도 코드를 다시 구조화해야 한다는 것을 깨달을 때까지 5가지 더 찾아보고 있을 것이라는 것이죠.

이 글은 나의 느낌을 요약한 것 같아요:

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

![image](/TIL/assets/img/2024-07-02-ItsnotjustyouNextjsisgettinghardertouse_2.png)

그것이 반드시 잘못된 것은 아니라는 점을 유의하십시오.

원문에는 몇 가지 미묘한 점도 언급되어 있습니다. 하나의 보편적인 함정은 쿠키 처리 방식에 있습니다. 어디에서든 cookies().set("key", "value")를 호출할 수 있고 이것은 타입 체크가 가능하지만, 일부 경우에는 런타임에서 실패할 수 있습니다.

서버에서 거의 모든 것을 할 수 있었던 "옛" 방식과 비교하면, 복잡성이 증가했다고 말할 수 있습니다.

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

제가 말씀드리고 싶은 것은 "기본으로 켜진 캐싱"은 다소 거친 경험이라는 점입니다. 많은 사람들이 캐싱에 동의하기를 기대하는 것이 오히려 캐싱 비활성화 방법을 찾기 위해 많은 문서를 살펴야 한다고 생각합니다.

다른 회사들도 우리와 유사한 문제를 겪었을 거라고 확신합니다. PropelAuth에서 종종 버그 신고를 받는데, 그것들은 실제로 버그가 아니라 "API 호출을 한 줄로 생각했지만 실제로는 호출하지 않았고, 캐시된 결과만 읽고 있는 것"이라고 할 수 있습니다.

그리고 이 모든 것은 다시 한 번 질문을 던집니다. 이러한 기능과 최적화는 과연 누구를 위한 것인가요?

# 모두에게 맞는 제품을 만드는 것은 매우 어려운 일입니다

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

너가 너무 복잡하다고 느끼는 기능들은 실제로 몇몇 사람에겐 중요할 수 있어요. 예를 들어 전자상거래 플랫폼을 개발 중이라면, 이 기능들이 정말 유용할 거예요.

작은 양의 데이터를 클라이언트에 전달하기 때문에 페이지가 빨리 로드됩니다. 모든 것이 강력하게 캐시되어 있어 페이지가 빨리 로드됩니다. 사용자가 새로운 페이지로 이동할 때 페이지의 일부만 다시 렌더링해야 하기 때문에 페이지가 더 빨리 로드됩니다. 전자상거래 세계에서 페이지가 빠르게 로드될수록 더 많은 수익이 발생하니, 이런 기능들을 위해 좀 더 복잡한 프레임워크를 사용하겠죠.

하지만 SaaS 애플리케이션용 대시보드를 개발 중이라면… 이런 부분에 별로 신경 쓰지 않을 거예요. 기능을 빠르게 출시하는 속도를 더 중요하게 생각하고, 복잡성은 개발 팀에 부담이 될 거예요.

제 개인적인 경험과 App Router에 대한 답답함은 다른 사람의 것과 다를 수 있어요. 제품, 사용 사례, 그리고 리소스가 모두 다르기 때문이에요. B2B SaaS 애플리케이션을 많이 작성하고 다른 사람들이 그것을 작성할 때 도와주는 사람으로서 말씀드리면, App Router DX는 Pages Router보다 한 단계 아래 수준이에요.

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

# 프레임워크가 성장함에 따라 불가피한가요?

제품/프레임워크가 성장하면 복잡해지는 경향이 있습니다. 고객들이 더 많은 것을 요청합니다. 대규모 고객들은 더 구체적인 것을 요청합니다. 대규모 고객들이 더 많은 금액을 지불하기 때문에 특정 기능을 우선적으로 개발합니다.

이전에 모든 것의 간단함을 좋아했던 고객들은 일부 복잡한 점을 다루어야 한다고 느끼기 시작하고... 오, 보세요, 더 간단한 새로운 프레임워크가 나타났네요. 우리는 그것으로 모두 변경해야 합니다!

이러한 상황을 피하는 것은 어려울 수 있지만, 일부 사람들이 필요로 하는 복잡성을 모두의 문제로 만들지 않는 방법 중 하나입니다.

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

# 그저 뭔가가 추천된다고 해서, 그게 당신에게 맞는 것은 아니라는 뜻은 아니에요

앱 라우터를 사용함에 있어서 제가 겪은 가장 큰 문제 중 하나는 딱 이거였어요:

![이미지](/TIL/assets/img/2024-07-02-ItsnotjustyouNextjsisgettinghardertouse_3.png)

Next.js는 제품으로 충분히 준비되기 전부터 공식적으로 앱 라우터를 사용할 것을 권장해 왔어요. Next.js는 TypeScript, ESLint, Tailwind가 프로젝트에 적합한지 여부에 대한 권장사항을 갖고 있지 않아요 (TS/ESLint에는 기본 값으로 Yes, Tailwind에는 No를 제공하지만, Tailwind 팬들에게는 죄송합니다). 그러나, Next.js는 분명히 당신이 앱 라우터를 사용해야 한다고 믿고 있어요.

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

공식 React 문서는 같은 의견을 공유하지 않습니다. 현재 그들은 페이지 라우터를 권장하고 앱 라우터를 "최신형 React 프레임워크"로 설명하고 있습니다.

그 렌즈를 통해 앱 라우터를 바라볼 때, 더 많은 의미를 부여할 수 있습니다. React에 대한 권장 기본값으로 생각하는 대신, 베타 릴리스로 생각할 수 있습니다. 사용 경험이 더 복잡해지며, 몇 가지 쉬웠던 것들이 지금은 어려워지거나 불가능해졌습니다. 하지만 "최신형"인 것으로부터 무엇을 기대하겠습니까?

따라서 다음 프로젝트를 위해 프레임워크를 선택할 때, 앱 라우터에는 여전히 많은 가공되지 않은 점이 있음을 인식하는 것이 중요합니다. 당신의 사용 사례에 더 적합한 다른 도구를 찾는 것이 더 나은 결과를 가져올 수도 있습니다.
