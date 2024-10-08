---
title: "다수의 기능을 관리하는 방법"
description: ""
coverImage: "/assets/img/2024-08-17-ManagingMultipleFeatures_0.png"
date: 2024-08-17 01:29
ogImage:
  url: /assets/img/2024-08-17-ManagingMultipleFeatures_0.png
tag: Tech
originalTitle: "Managing Multiple Features"
link: "https://medium.com/@maydin/managing-multiple-features-a101202b0cab"
isUpdated: true
updatedAt: 1723864213017
---

![Managing Multiple Features](/assets/img/2024-08-17-ManagingMultipleFeatures_0.png)

이 블로그 글의 의도는 트렁크 기반 개발에서 영감을 받은 앱에서 동시에 개발된 여러 기능을 관리하는 제안을 제공하는 것입니다.

앱 개발 중에는 동시에 개발되는 다수의 기능이 있을 수 있고, 각 기능마다 다른 릴리스 대상 날짜가 있을 수 있습니다. 트렁크 기반 개발을 사용하지 않는 경우, 특정 릴리스 브랜치 X에 기능 A를 배포해야 하는 경우, 개발자는 메인 브랜치와 releaseX 브랜치에 대한 풀 리퀘스트를 만듭니다. 이것은 서로 다른 릴리스로 배포되지만 개발이 중단되지 않으므로 일부 단점이 있습니다. 동시에 여러 릴리스 브랜치를 관리하는 것은 혼란을 초래할 수 있습니다:

- 특정 릴리스 브랜치로 기능을 병합하는 것을 잊을 수 있음.
- 브랜치 간의 기능을 추적하기 어려울 수 있음.
- 릴리스 브랜치에서 기능을 되돌리려면 풀 리퀘스트가 필요함.

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

# 제안서

이 제안서에서는 트렁크 기반 개발에서 사용되는 두 가지 방법을 소개하겠습니다. 트렁크 기반 개발은 일부 FAANG 회사에서 사용되는 방법론입니다. 주요 목적은 언제나 메인 브랜치를 발행할 준비가 되어 있도록 유지하는 것입니다.

이 제안서에서는 특징 플래그(Feature Flags)와 추상화를 통한 브랜치 전환(Branch by Abstraction) 두 가지 개념이 사용될 것입니다.

# 특징 플래그(Feature Flags)

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

정의: 기능 토글(또는 플래그)은 새로운 코드를 배포하지 않고 응용 프로그램에서 기능을 활성화 또는 비활성화하는 메커니즘입니다.

사용법: 다른 릴리스 유형에서 기능을 활성화/비활성화하고, 제어된 롤아웃, A/B 테스트, 및 원격으로 사용될 경우 점진적 기능 릴리스가 가능합니다.

기능 토글은 원격 또는 로컬일 수 있습니다. 이 제안서에서는 로컬 기능 토글이 사용됩니다. 이 방법론에서, 기능 토글은 로컬 빌드 구성 파일에서 생성 및 관리됩니다. 각 릴리스 대상은 자체 기능 토글 파일을 가집니다.

기능 토글 구성 파일 내용:

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

Release A:

| 기능     | 값    |
| -------- | ----- |
| Feature1 | true  |
| Feature2 | false |
| ...      | ...   |
| FeatureX | false |

Release B:

| 기능     | 값    |
| -------- | ----- |
| Feature1 | true  |
| Feature2 | true  |
| ...      | ...   |
| FeatureX | false |

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

메인:

Feature1 = true
Feature2 = true
…
FeatureX = true

위 예시에서 Feature2는 릴리스 B에서 활성화되었지만 릴리스 A에서는 그렇지 않습니다. 모든 기능은 본 브랜치에서 활성화되며, 프로덕션 환경이 아닌 환경에서 테스트될 것입니다.

이 기능 토글 구성 파일은 코드베이스에 유지됩니다. 새로운 기능이 생성되면 해당 기능을 기능 토글 구성 파일에 추가하고 코드에서 사용해야 합니다. 코드에서 기능 토글을 올바르게 사용하지 않으면 기능이 실수로 활성화될 수 있습니다.

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

# Branch by Abstraction

**정의:** Branch by abstraction은 주 코드베이스에 장애를 일으키지 않으면서 코드 변경을 만들고 병합하는 기술입니다.

**과정:** 새 변경 사항을 기존 구현과 분리하기 위해 추상화 레이어를 도입합니다.

**사용:** 여러 기능이 동시에 개발되는 대규모 프로젝트에서 유용합니다.

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

브랜치 단계별 추상화는 앱의 동작이 변경되는 경우에 사용될 수 있습니다. 이 경우, 현재 기능의 추상화가 생성됩니다. 그런 다음 이 추상화의 두 가지 구현이 생성됩니다. 첫 번째 구현은 기존 구현이 되고, 두 번째 구현은 새로운 것이 될 것입니다. 앱은 기능 토글을 사용하여 브랜치를 만들 것입니다. 해당 기능이 활성화된 경우 새로운 구현이 사용될 것이며, 그렇지 않은 경우 기존 구현이 사용될 것입니다. 이렇게 하면 두 동작이 코드베이스에 공존하고 기능 토글을 사용해 활성화/비활성화할 수 있습니다.

![다이어그램](/assets/img/2024-08-17-ManagingMultipleFeatures_1.png)

# 요약

요약하면, 앱의 동작 변경의 경우, 브랜치 단계별 추상화가 사용될 것을 제안합니다. 이 접근 방식을 통해 여러 구현이 공존하고 기능 토글을 사용하여 쉽게 활성화/비활성화할 수 있습니다. 로컬 기능 토글을 사용하여 기능을 쉽게 활성화/비활성화할 수 있습니다. 원격이 아니기 때문에 백엔드 종속성도 없으므로 쉽게 생성, 변경 또는 삭제할 수 있습니다. 로컬 기능 토글과 브랜치 별 추상화의 도움으로, 개발자들은 릴리스를 위해 여러 브랜치를 관리할 필요가 없습니다. 미완성된 기능도 안전하게 코드베이스로 병합할 수 있습니다. 이는 개발자가 검토 및 병합하기 쉬운 작은 풀 리퀘스트를 만들 수 있도록 도와줍니다.

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

원래는 https://androiddevs.substack.com에 공개되었습니다.
