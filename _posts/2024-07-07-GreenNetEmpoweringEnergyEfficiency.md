---
title: "GreenNet 에너지 효율성을 높이는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-GreenNetEmpoweringEnergyEfficiency_0.png"
date: 2024-07-07 02:28
ogImage:
  url: /assets/img/2024-07-07-GreenNetEmpoweringEnergyEfficiency_0.png
tag: Tech
originalTitle: "GreenNet: Empowering Energy Efficiency"
link: "https://medium.com/@x17-green/greennet-4287c9a49fc7"
---

# 소개

![이미지](/TIL/assets/img/2024-07-07-GreenNetEmpoweringEnergyEfficiency_0.png)

저는 대규모 에너지 소비 관리 시스템의 중요 구성 요소 중 하나인 독립형 마이크로 서비스 프로젝트에 참여할 기회가 있었습니다. 우리 프로젝트는 다양한 엔지니어가 다양한 구성 요소에 작업하는 이 대규모 이니셔티브의 한 부분이었습니다.

이 프로젝트의 개념은 원래 ALX에서 나의 동료가 고안하여 에너지 소비를 관리하는 포괄적인 시스템을 상상했습니다.

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

이 프로젝트는 Engineer 2:가 주도하였고, 꽉 끼인 3주의 일정 내에 완료되었습니다.

## 프로젝트 세분화: 세그먼트 및 엔지니어

아래는 각 프로젝트를 담당한 다른 세그먼트 및 엔지니어에 대한 개요입니다:

## 세그먼트:

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

- 에너지 소비 추적기: 에너지 소비 데이터를 수집하고 처리하여 에너지 사용에 대한 통찰과 분석을 제공하며, 에너지 소비 임계값 및 장치 오작동에 대한 사용자 알림을 전송합니다.
- 그린넷: 에너지 관리를 위한 안전한 사용자 인증 및 장치 모니터링.
- 챗펄스: 사용자와 관리자 간의 커뮤니케이션을 통한 실시간 사용자 지원 및 참여.

## 엔지니어:

- 엔지니어 1 (Okoyen Ebisine Precious): 그린넷을 위한 사용자 관리 및 장치 관리 마이크로서비스 개발.
- 엔지니어 2 (Joshua Benjamin): 에너지 소비 및 알림 마이크로서비스 개발을 위한 엔지지 소비 추적기.
- 엔지니어 3 (Benedict Akosa): 모니터링 및 커뮤니케이션 마이크로서비스, 그리고 실시간 커뮤니케이션과 지원을 위한 챗펄스 챗 마이크로서비스를 담당합니다.

저는 개인적으로 팀 엔지니어 1로서 견고하고 확장 가능한 인증 시스템을 설계하고 구현하는 데 초점을 맞추었습니다. 엔지니어 팀 2는 에너지 소비 분석 모듈을 개발하였으며, 엔지니어 팀 3은 실시간 커뮤니케이션과 지원을 위한 마이크로서비스를 구현하는 데 초점을 맞추었습니다.

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

# 그린넷으로의 여정

그린넷을 만들기 위한 여정을 되돌아보면, 몇 주 전에 겪었던 어려움이 생생하게 떠오릅니다. 학습 일정에서 뒤처지고 있었고, 프로젝트를 맡아야 한다는 생각이 겁나기 시작했습니다. 자신에게 의심이 들고, 복잡한 작업에 도전할 준비가 되어있는지 의문이 들었습니다.

![GreenNet](/TIL/assets/img/2024-07-07-GreenNetEmpoweringEnergyEfficiency_1.png)

하지만, 친구 Chymezy(Engineer 2)와 나눈 대화가 모든 것을 바꿨습니다. 그가 제시한 아이디어는 나에게 와닿았습니다. '보안을 최우선으로 하는 프로젝트를 만들면 어떨까?' 라는 생각이 날 것 같습니다. 생각을 많이 해보니, 나에게는 이 어려움을 극복하고 의미 있는 것을 만들어낼 기회가 된다는 것을 깨달았습니다.

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

# 프로젝트 성과

저희의 프로젝트인 GreenNet의 결과를 공유해 드리게 되어 정말 기쁩니다. GreenNet은 안전한 사용자 인증 및 에너지 관리에서 기기 모니터링을 제공하기 위해 설계된 마이크로 서비스 기반 플랫폼입니다.

## 아키텍처 다이어그램

아래는 GreenNet의 아키텍처 다이어그램입니다. 응용 프로그램을 통해 데이터가 어떻게 흘러가는지를 보여줍니다:

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

![GreenNet](/TIL/assets/img/2024-07-07-GreenNetEmpoweringEnergyEfficiency_2.png)

## 사용된 기술

GreenNet을 만들기 위해 견고하고 확장 가능한 애플리케이션을 구축하는 데 중점을 두기 위해 다양한 기술을 결합했습니다.

백엔드에서는 Python을 선택했습니다. 그 이유는 간단함, 유연성 및 다양한 라이브러리 때문입니다. 이를 통해 빠르게 안전한 사용자 인증 시스템을 개발할 수 있었습니다. Node.js를 선택할 수도 있었지만, Python의 사용 편의성과 다양성으로 인해 이상적인 선택이었습니다.

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

프론트엔드에서 반응형 및 사용자 친화적 인터페이스를 구축하기 위해 HTML, CSS 및 JavaScript를 선택했습니다. HTML, CSS 및 JS가 제공하는 유연성과 사용 편의성 때문에 Angular 또는 React와 같은 프레임워크를 사용하지 않기로 결정했습니다. Bootstrap도 UI를 개선하고 일관된 디자인을 제공하는 데 사용되었습니다.

## 완료된 기능

다음은 완료한 주요 기능 몇 가지입니다:

- 안전한 사용자 인증: 안전한 사용자 회원 가입, 로그인 및 로그아웃 기능을 구현하여 사용자 데이터가 보호되고 안전성이 확보되었습니다.
- 반응형 및 사용자 친화적 인터페이스: 프론트엔드 사용자 인터페이스는 HTML, CSS 및 Bootstrap을 사용하여 반응형 및 사용자 친화적인 경험을 제공합니다. JavaScript 스크립트도 UI를 개선하고 동적 기능을 제공하는 데 사용되었습니다.

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

그린넷이 제공하는 이러한 기능들은 그저 시작에 불과해요. 사용자들에게 원활하고 효율적인 경험을 제공하기 위해 이 플랫폼을 계속 발전시키고 개선하는 것을 기대하고 있어요.

# 직면한 기술적인 도전

그린넷 프로젝트 도중, 사용 중이었던 웹 프레임워크인 Flask가 데이터베이스를 초기화하고 이관하는 데 실패하여 중요한 기술적 도전에 직면했어요. 이 문제는 프로젝트 초반에 발생했기 때문에 진행에 상당한 영향을 미쳤고, 이를 해결하기 위해 노력했어요.

![이미지](/TIL/assets/img/2024-07-07-GreenNetEmpoweringEnergyEfficiency_3.png)

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

이 도전을 극복하기 위해 저는 작업 환경을 바꾸고 새 컴퓨터로 전환하기로 결정했습니다. 이 결정은 나에게 프로젝트를 처음부터 다시 시작할 수 있는 기회를 제공하여 결국 큰 도움이 되었습니다. 가져오기 문제를 해결한 후에는 초기보다 두 배 빠른 속도로 작업할 수 있어 생산성이 상당히 향상된 것을 알게 되었습니다.

이 도전을 통해 겪은 경험은 기술적 어려움에 직면했을 때 순응력과 회복력의 중요성을 배울 수 있었습니다. 문제에 직면하여 해결책을 찾아내고, 새로운 에너지와 집중력으로 프로젝트를 계속 개발할 수 있었습니다.

# 배운 교훈과 향후 방향

GreenNet과 함께한 내 여정을 되새기면서, 미래의 소프트웨어 엔지니어링에 대한 접근 방식을 형성할 가치 있는 통찰을 얻었습니다.

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

## 기술적인 포인트

이 프로젝트에서 가장 중요한 기술적 교훈 중 하나는 에너지 관리에서 견고한 사용자 인증과 장치 모니터링의 중요성입니다. Python의 간결함과 유연성을 활용하여 안전하고 확장 가능한 응용 프로그램을 개발할 수 있다는 것을 배웠습니다. 또한 HTML, CSS 및 JavaScript에 대한 경험을 통해 반응형이고 사용자 친화적인 인터페이스를 만들 수 있었습니다.

## 다르게 할 점

아마도 더 안전하고 사용자 친화적인 시스템을 구축하는 데 집중하고, 기기, 위치 또는 연결 여부에 관계없이 최종 사용자가 에너지 사용량을 추적하는 데 원활한 경험을 제공하는 것에 초점을 맞출 것입니다. 모든 사용자가 플랫폼에 접근하고 효율적으로 사용할 수 있도록 혁신적인 솔루션을 탐색하는 것이 포함될 것입니다.

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

GreenNet은 소프트웨어 엔지니어링에서의 다양한 가능성을 내게 보여준 중요한 프로젝트였어요. 사람들의 삶에 영향을 미치는 혁신적인 해결책을 만드는 열정을 다시 한 번 느낄 수 있었어요. 앞으로 나아가면서, 배운 기술과 지식을 활용하여 더 복잡한 문제를 해결하고 저와 업계의 밝은 미래를 만들어가는 것에 기대돼요.

이 프로젝트를 통해 VIM과 Emacs를 비롯한 다양한 도구와 기술을 활용할 수 있는 기회를 가졌어요. 그중에서도 여전히 VIM을 선호하는 편인데, 그 이유는 그 간결함과 사용 편의성 때문이에요.

## 결론

요약하자면, GreenNet과의 경험은 저에게 끈기, 적응력 및 혁신에 관한 소중한 교훈을 전달해 주었어요. 내가 이룬 성과에 자랑스럽고, 앞으로의 프로젝트에 배운 기술과 지식을 적용하는 것에 기대가 되요.

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

# 나에 대해

저는 열정적이고 목표 지향적인 소프트웨어 엔지니어인 오코옌 에비신 프레셔스입니다. 기술을 통해 긍정적인 영향을 줄 수 있는 강한 열망을 가지고 있습니다. 사람들의 삶에 영향을 미칠 수 있는 혁신적인 솔루션을 개발할 기회를 항상 찾고 있습니다. 제 프로젝트인 GreenNet에 대해 더 많은 정보를 GitHub 링크에서 확인할 수 있습니다. 배포된 프로젝트 페이지와 랜딩 페이지는 링크에서 접속할 수 있습니다. 또한 LinkedIn 프로필 링크에서 저와 연락할 수도 있습니다.
