---
title: "단일 저장소  주제에 대해 조금씩"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Monorepo  A little on the subject"
link: "https://medium.com/@davifsroberto/monorepo-a-little-on-the-subject-ccd252a3a171"
isUpdated: true
---

<img src="/assets/img/MonorepoAlittleonthesubject_0.png" />

모노레포는 한 개 또는 여러 애플리케이션의 코드를 하나의 저장소에 그룹화하는 전략입니다.

# 왜 모노레포를 사용해야 할까요?

지금부터 모노레포를 사용하는 목표는 프론트엔드 개발 플랫폼을 만들어 확장 가능하게 하고, 컴포넌트를 더 잘 관리하고, 기존 리소스를 재사용하며, 빠르게 제공하는 것입니다. 더 성능이 우수하고 더 잘 관리되도록하기 위해, 우수한 도구인 Nx(https://nx.dev)를 사용할 것입니다.

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

# 장점

- 쉬운 코드 재사용/공유
- 더 간단한 의존성 관리
- 원자적인 변경. 변경 사항은 모든 적용 가능한 곳에 영향을 줌
- 대규모 리팩터링
- 최상의 실행 관행 강화
- 버전 관리

# 단점 (발생 가능성 및 방지 방법)

- 모든 사람이 폰트에 접근할 수 있기 때문에 개발자가 다른 사람의 코드를 망가뜨리지 않을까요? — 아니요! PR 승인자가 있고, 개발자/팀이 컨텐츠를 변경할 수 있는 위치를 제한하는 것도 가능합니다.
- CI(지속적 통합)에 시간이 오래 걸릴 수 있습니까? 모든 프로젝트에 대한 품질 제어가 실행됩니까? — 아니요. 영향을 받는 부분만 실행할 수 있어 전체 프로젝트를 실행하지 않아도 됩니다.
- 어플리케이션이 다른 곳에서 무언가를 가져올까요? 플랫폼에서 가져오기만 할 것인가요? — 아니요. Nx의 제약 조건 기능을 사용하여 이를 제어할 수 있었습니다.
- 매우 멀리 떨어진 폴더 수준에 있는 컴포넌트를 가져오는 것이 너무 어려울까요? 예: ../../../../../componentABC — 아니요. TSconfig에서 매우 간단히 해결할 수 있습니다. ' @shared/componentABC' 같이 가져오기 가능합니다.

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

# Monorepo를 사용하는 사람들은 누구일까요?

회사 X가 그러한 기술을 사용한다고 해서 우리에게 완벽한 해답이 될 것이라는 보장은 없습니다. Monorepo를 사용하는 시장의 일부분을 보여줌으로써 이 기술이 초기 단계를 벗어난 것을 알 수 있으며, 이는 커뮤니티에서 잘 논의된 주제임을 보여줍니다. 이 정보 이후에는 다음과 같은 업체들이 Monorepo를 사용하고 있습니다:

# 흔한 실수들

구현하기 위해 필요한 지식 부족. Monorepo를 적용하기 전에는 충분한 기술적 지식을 갖추어야 하며, 충분한 연구와 테스트가 필요합니다! Monorepo를 프로젝트에 적용할 준비를 하기 위해 1일 짜리 개념 증명만으로는 충분하지 않습니다. 충분히 공부하고 예측하고 논의하며 질문하고, 코드에 손대는 연습이 많이 필요합니다.

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

팀 개발자들에게 어떻게 진행될 것인지 알려주지 마세요. 새로운 마음가짐이에요! 플랫폼을 사용하여 개발하는 느낌을 팀에게 교육하는 것이 중요해요. 회의에서 이야기하는 것뿐만 아니라 주제를 강화하고 의문을 해소하여 전체가 그것의 정신을 이해할 때까지 이야기해야 해요.
