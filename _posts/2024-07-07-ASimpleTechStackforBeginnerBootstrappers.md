---
title: "초보 부트스트래퍼를 위한 간단한 기술 스택 추천"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-ASimpleTechStackforBeginnerBootstrappers_0.png"
date: 2024-07-07 21:59
ogImage:
  url: /assets/img/2024-07-07-ASimpleTechStackforBeginnerBootstrappers_0.png
tag: Tech
originalTitle: "A Simple Tech Stack for Beginner Bootstrappers"
link: "https://medium.com/gitconnected/a-simple-tech-stack-for-beginner-bootstrappers-2f3b9a44c587"
---

최근에 테이블 화면 클립을 CSV 파일로 변환하는 도구를 만들어서 론칭했어요.

이 도구는 이메일 인증과 Stripe를 이용한 실제 결제 기능을 갖춘 기능적인 앱이에요.

여기에는 해당 도구를 구축하기 위해 사용한 기술 스택을 공유해봤어요. 입문자 루트 개발자들에게 완벽한 간단한 스택이라고 생각해요 (초보에서 중급 프로그래머들 😉).

![image](/TIL/assets/img/2024-07-07-ASimpleTechStackforBeginnerBootstrappers_0.png)

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

# 메인 애플리케이션 (Next.js)

도구의 핵심은 Next.js 애플리케이션입니다. Next.js는 React로 구축된 풀스택 프레임워크입니다.

웹 애플리케이션을 시작하는 데 Next.js를 사용하는 것을 좋아하는 몇 가지 이유가 있습니다:

- JavaScript / TypeScript로 모든 것을 작성할 수 있는 풀스택 지원.
- 현대적인 App Router 접근 방식을 통해 앱의 아키텍처를 쉽게 설계할 수 있습니다. 디렉토리와 페이지를 추가하면 라우팅이 자동으로 처리됩니다.
- 문서는 초보자에게도 잘 구성되어 있고 쉽게 접근할 수 있습니다.
- Vercel도 함께 사용하면 배포도 매우 쉽습니다.

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

# 미리 알았더라면 좋았을 것들

## 서버 및 클라이언트 컴포넌트에 대해 문서를 읽는 데 시간을 보내세요.

이 모델에 익숙해지는 데 시간이 걸립니다. 하지만 결국 직관적이 되어 이 현대 웹 애플리케이션의 방향이 왜 그런지 볼 수 있습니다.

- 모든 컴포넌트는 기본적으로 서버 컴포넌트입니다. 이는 로딩 시간, 보안 및 SEO에 이점이 있습니다.
- 클라이언트 컴포넌트는 가져와서 서버 컴포넌트에서 사용할 수 있습니다.
- 서버 컴포넌트는 클라이언트 컴포넌트로 가져올 수 없습니다. 그러나 프롭스로 전달할 수 있습니다.
- 그 결과로 클라이언트 컴포넌트는 인터랙티브한 기능이 필요한 곳으로 컴포넌트 트리 아래로 밀어 넣어야 합니다 (예: 폼 및 버튼).

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

이 컴포넌트가 어떻게 조합되는지를 잘 익히면 Next.js를 사용한 생산성이 크게 향상될 것입니다.

## 컴포넌트를 어떻게 구성할지에 대한 초기 결정을 내리세요

나는 세 가지 주요 방법이 있다고 생각해요.

- 'page.tsx' 파일 옆의 라우트 디렉터리 내에 컴포넌트를 위치시킵니다.
- 별도의 'components' 디렉터리에 컴포넌트를 위치시킵니다.
- 방법 1과 2를 혼합해서 사용합니다.

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

내 도구를 개발할 때 여러 접근 방법을 시도해 보았고, 결국 2번째 방법으로 정착했습니다.

라우트 디렉토리 내에서 구성 요소를 찾는 것은 금방 번거로워지는 반면, 한 디렉토리에 모든 것을 찾아야 했기 때문에 구성 요소의 재사용성에 대해 더 신중히 고민해야 했습니다.

## 컴포넌트 라이브러리 사용

컴포넌트 라이브러리를 사용하면 많은 시간을 절약할 수 있습니다. 하지만 그러면 다음 문제는 어떤 컴포넌트 라이브러리를 사용해야 할지입니다.

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

저는 shadcn/ui를 좋아해요. CLI를 사용하면 컴포넌트의 전체 코드가 프로젝트에 자동으로 붙여지기 때문이에요.

컴포넌트들은 합리적인 스타일링 기본 설정을 가지고 시작할 때 편리하며, 코드를 쉽게 검사할 수 있는 능력은 (제 경우처럼) 견고한 재사용 가능한 컴포넌트가 어떻게 만들어지는지 배우고자 하는 분들에겐 좋은 기회가 되요.

# 유용한 링크

- React 소개
- Next.js 소개
- ByteGrad에서 제공하는 Next.js 관련 멋진 튜토리얼 비디오
- Next.js와 shadcn/ui 설정하는 방법

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

# 데이터베이스 (Supabase)

데이터베이스로 Supabase를 사용했어요. 선택한 이유는 다음과 같아요:

- Next.js 애플리케이션과 매우 잘 통합돼요.
- 인증 제공자로 사용할 수 있어요.
- 오픈 소스에요.
- 문서가 매우 훌륭해요 ✨.

# 미리 알았더라면 좋았을 것들

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

## Next.js와 Supabase 스타터 프로젝트 사용하기

어플리케이션을 처음부터 만들어가던 중 Next.js와 Supabase가 기본 인증이 구축된 스타터 프로젝트로 협업한 것을 발견했어요.

내 제안은 이 스타터를 사용하되 코드를 익히면서 작동 방식을 배우는 거예요.

스타터를 사용하면 Vercel 마법사를 사용해 설정하면 좋아요. 그러면 대부분의 배포 구성이 이미 완료된 프로젝트로 시작할 수 있어요 (아래 링크 참조).

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

# 유용한 링크

- Next.js와 Supabase 시작 프로젝트 배포하기

# 결제 (Stripe)

제 알기로는 애플리케이션을 구축할 때 Stripe가 결제 분야의 사실상 표준이라고 생각됩니다 (다르게 생각하시면 말씀해주세요).

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

Stripe 문서에는 시작하는 데 도움이되는 꽤 좋은 정보와 보일러플레이트 코드가 있습니다.

# 처음에 알았으면 하는 것들

## 결제 링크를 사용하여 체크아웃 세션을 시작하십시오

Stripe 결제 링크는 Stripe를 사용하여 결제를 받는 가장 쉬운 방법입니다. Stripe 대시 보드 내에서 코딩없이 구성할 수 있습니다. 그런 다음 앱 내의 버튼이나 다른 구성요소가 사용자를 결제 링크로 안내하면 됩니다.

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

## 결제 링크로 클라이언트 참조를 전달할 수 있습니다.

사용자를 결제 링크로 이동시킬 때 클라이언트 참조 ID를 전달할 수 있습니다. 인증된 Supabase 사용자 ID를 전달하면 결제가 완료된 후에 해당 사용자와 조정할 수 있습니다.

## 사용자가 결제를 완료한 후 로직에 웹훅을 사용하세요

사용자가 결제 프로세스를 진행할 때 Stripe는 결제 의도 설정이나 체크아웃 세션 완료와 같이 다양한 '이벤트'를 생성합니다.

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

Stripe는 업데이트를 수신하는 앱을 알 수 있도록 해당 이벤트를 보낼 대상을 필요로 합니다. 이 대상을 웹훅의 형태로 제공합니다.

당신의 앱의 웹훅은 Stripe 이벤트를 '청취'합니다. 그런 다음 통과하는 다양한 이벤트를 어떻게 처리할지 결정합니다.

가장 중요한 이벤트는 'checkout.session.completed'로, 이는 결제 프로세스가 원활하게 완료되었음을 의미합니다.

# 유용한 링크

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

- Stripe 결제링크 개요
- 클라이언트 참조 ID를 결제 링크에 전달하는 방법
- Next.js와 Stripe를 사용하는 Vercel 기사 - 이 기사는 stripe checkout 세션을 사용하는 방법에 대한 것이며 (결제링크보다 복잡함), Stripe 웹훅을 위한 유용한 보일러플레이트 코드도 포함되어 있습니다.

# 이메일 제공업체 (재전송)

대부분의 애플리케이션은 사용자에게 어느 시점에서라도 이메일을 보내야 할 필요가 있습니다. 예를 들어 사용자가 가입한 경우 이메일 주소를 확인하는 이메일로 이메일을 확인할 수 있습니다.

Resend는 Supabase의 권장사항 중 하나였습니다. 합리적인 무료 티어를 갖추고 있으며 통합이 매우 원활하다고 생각했습니다.

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

# 미리 알았더라면 좋았을 것들

## Supabase 이메일 인증이 제한되어 있습니다

Supabase 이메일 인증 설정은 간단한데, 제작용으로 설계되어 있지 않다는 점을 알아두세요. 애플리케이션을 배포할 때 당신을 위해 이메일을 보낼 수 있는 SMTP (Simple Mail Transfer Protocol) 제공업체가 필요합니다.

# 유용한 링크

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

- Resend와 Next.js
- Supabase에서 사용자 정의 SMTP 구성

여기에 있습니다! 부트스트랩된 애플리케이션을 위한 로드맵과 간단한 기술 스택이에요. 만약 간단한 도구에 대한 아이디어가 있다면, 이 아키텍처를 사용하여 시작할 수 있어요. 저가 일찍 알았으면 하는 몇 가지를 공유해드려서 유용하고 프로세스를 가속화할 수 있기를 바랍니다.

떠나실 때!

만약 이 이야기를 즐겁게 읽었다면 몇 손가락 운동을 하셔서 이 게시물을 좋아요 👏🏻 를 눌러주시겠어요? 읽고 싶어하시는 내용을 쓰고 있는지를 알려주어서 도움이 돼요.

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

기술 활용과 온라인 존재감 구축에 관한 더 많은 이야기를 듣고 싶다면 저를 팔로우해주세요. (저는 막 시작한 입장이니, 함께 배우세요.)

다음에 만나요! 감사합니다! 🙏🏻
