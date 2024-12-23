---
title: "도시 연구소 디자인 라이브러리의 진화"
description: ""
coverImage: "/assets/img/2024-06-20-TheEvolutionoftheUrbanInstitutesDesignLibrary_0.png"
date: 2024-06-20 03:16
ogImage:
  url: /assets/img/2024-06-20-TheEvolutionoftheUrbanInstitutesDesignLibrary_0.png
tag: Tech
originalTitle: "The Evolution of the Urban Institute’s Design Library"
link: "https://medium.com/@urban-institute/the-evolution-of-the-urban-institutes-design-library-7c96b1c2aa16"
isUpdated: true
---

1.한 해 동안 여러 웹사이트를 출시한다고 상상해보세요. 각 사이트는 버튼, 아이콘, 이미지, 제목, 요약 및 날짜와 같은 디자인 요소를 여러 페이지에 걸쳐 복제해야 합니다. 이 복제본마다 다른 카드 변형이 필요할 수도 있습니다. 아래 프로젝트를 참고해주세요:

![이미지 0](/assets/img/2024-06-20-TheEvolutionoftheUrbanInstitutesDesignLibrary_0.png)

![이미지 1](/assets/img/2024-06-20-TheEvolutionoftheUrbanInstitutesDesignLibrary_1.png)

![이미지 2](/assets/img/2024-06-20-TheEvolutionoftheUrbanInstitutesDesignLibrary_2.png)

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

지금까지, 저희의 웹 개발 및 디자인 팀은 각 사이트를 개별적으로 프로토타입으로 제작한 후 매번 새로운 프로젝트를 위해 이러한 요소들을 처음부터 다시 만들었습니다. 이 방식은 시간이 많이 소요되며 일관성이 없었으며 종종 완전히 접근 가능하지 않은 사이트가 되거나 최고의 실천 방법을 준수하지 않거나 Urban의 디자인 표준과 일치하지 않는 사이트를 만들어내기도 했습니다.

Urban이 변화를 이끌어가는 사람들과 지역사회 지도자들이 가족과 지역사회의 복지를 향상시키기 위해 신뢰하는 소스인 만큼, 우리는 모든 사용자에게 친화적인 웹 인터페이스를 만들고, 스크린 리더와 음성 인식 등 개인 사용자의 보조 기술과 호환되며, 웹 접근성 표준에 최고의 실천 방법을 준수하는 것이 중요합니다.

그런 이유로 저희는 모든 웹사이트에서 재사용 가능한 컴포넌트를 활용할 수 있는 새로운 시스템이 필요했습니다. 이러한 시스템은 개발자와 디자이너가 혁신적인 솔루션을 개발에 집중할 수 있도록 해줄 뿐만 아니라, 계속해서 코드를 작성하거나 자주 사용되는 요소를 계속해서 프로토타입으로 제작할 필요가 없게 하며, 우리의 웹사이트가 최고 수준의 보안 표준을 준수하고 유지 보수가 용이하며 Urban의 미션과 일치한다는 것을 보장합니다. 이 전략적 전환이 우리의 핵심 가치와 일치하는 혁신적이고 안전한 디지털 콘텐츠를 전달하는 능력을 향상시키는 데 중요했습니다.

# 이전 디자인 라이브러리의 단점 탐색:

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

Urban의 웹 프로젝트는 2017년부터 Atomic 디자인 시스템을 도입하기 시작했습니다. 이 방식은 팀이 재사용 가능한 구성 요소를 만들고 활용할 수 있도록 함으로써 개발 프로세스를 혁신했습니다. 이 구성 요소들은 Drupal 8 사이트의 템플릿에 통합되었고 (일반적으로 Pattern Lab이라고 함), 이를 통해 몇 가지 주요 전략이 강조되었습니다:

- 디자인 프로세스 초기에 협업을 강조하여 개발자와 디자이너가 공유 토큰 및 구성 요소 카탈로그를 편집할 수 있도록 함

- 코딩 프로세스를 간소화하고 새로운 사이트 기능에 대해 구성 요소를 재사용함

- 디자인 시스템을 Drupal과 별도로 유지하여 더 쉽고 유지하기 쉬운 형태로 관리함

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

- Atomic 디자인 원칙을 적용하여 디자인 시스템의 각 요소 프로토타입화하기

기존 디자인 시스템의 장점에도 불구하고, 상당한 단점이 있었습니다. 각 새로운 Drupal 사이트를 만들 때마다 전체 디자인 시스템을 처음부터 재작성해야 했는데, 이는 시간이 많이 소요되고 비효율적이었습니다. 재사용 가능한 구성 요소는 Drupal 템플릿 시스템에만 제한되어 있었기 때문에, 이를 통해 비-Drupal 웹 프로젝트에서 활용을 제한되어 있었고, 디자인 시스템의 전체 잠재력을 이뤄내지 못하게 되었습니다.

Urban의 메인 사이트를 새롭게 업데이트하기 시작할 때, 우리는 Atomic 디자인 원칙을 준수하고 Drupal뿐만 아니라 모든 웹 응용 프로그램에서 사용할 수 있는 보다 유연한 디자인 시스템을 만들기 위한 기회를 가졌습니다. 우리 내부 디자인 팀은 프론트엔드 스타일링을 위해 Tailwind CSS를 구현하기 시작했고, 2019년까지 현재 디자인 시스템을 구성하는 버튼, 폰트 스케일, 간격, 색상 및 다양한 사용자 인터페이스 구성 요소를 개발했습니다.

그러나 몇 가지 도전이 남아 있었습니다. 간격은 오로지 Tailwind CSS 값에만 기반하고 있었습니다. 이러한 남아 있는 구성 요소를 도입하기 위해, 우리 디자인 팀은 Urban의 지침과 기술적 프레임워크와 동기화하는 개선된 디자인 시스템을 만들었습니다. 이 협업적 접근 방식은 2021년 Lyndon의 생성으로 이어졌습니다.

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

# 우리의 Lyndon 디자인 라이브러리를 소개합니다

Urban Institute가 설립된 린든 B. 존슨 전 대통령의 이름을 딴 Lyndon은 이제 Urban의 디자인 표준을 보유하고 다양한 프로젝트를 통해 디지털 경험을 통합합니다. 강력한 Stencil JavaScript 프레임워크를 기반으로 한 Lyndon은 성능 및 크로스 플랫폼 호환성을 최적화한 웹 컴포넌트를 생성합니다. 이 이니셔티브는 Lyndon을 우리 디자이너 및 웹 개발팀에게 유연하고 동적인 툴킷으로 만들어줍니다. 팀은 우수하고 효율적인 디지털 경험을 만들 수 있도록 지원합니다.

Lyndon은 Figma에서 제작되어 일관된 컴포넌트, 색상, 간격 및 타이포그래피 스위트를 개발할 수 있었습니다. 프론트엔드 개발팀은 모든 컴포넌트를 Figma에서 Storybook으로 정확하게 이전하고 정렬했습니다. Storybook 통합을 통해 작업 흐름을 최적화하고 디자인 일관성을 향상시켰습니다. 이는 디자이너들이 더 복잡한 창의적 작업에 집중할 수 있도록 돕고 모형 및 프로토타입 작성을 효율적으로 만들어줍니다. 아래 이미지는 이 통합을 보여줍니다. 상단 이미지는 Figma에서 텍스트 스타일을 표시하고, 하단 이미지는 해당 Storybook 컴포넌트를 보여줍니다. 이 통합은 사이트에서 사용할 수 있는 일관된 텍스트 스타일을 확실히 보장합니다.

![이미지](/assets/img/2024-06-20-TheEvolutionoftheUrbanInstitutesDesignLibrary_3.png)

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

![이미지](/assets/img/2024-06-20-TheEvolutionoftheUrbanInstitutesDesignLibrary_4.png)

Storybook은 접근성이 좋고 직관적인 레이아웃에서 전체 컴포넌트 라이브러리를 제공하여 개발 도구로서 작용하며 디자인 시스템의 살아있는 문서 역할을 합니다. 색상, 간격과 같은 디자인 토큰부터 타이틀과 같은 원자화된 컴포넌트까지, Storybook은 사용자 인터페이스 요소와의 동적 실험을 위한 대화형 컨트롤을 제공합니다. Storybook은 이러한 컴포넌트를 개발, 테스트 및 품질 보증 과정에서 사용할 수 있는 이야기로 보존합니다.

결과적으로, Lyndon의 가벼운 독립형 컴포넌트는 빠른 로딩 시간과 유연성을 보장합니다. 버튼 컴포넌트를 통해 사용자는 텍스트, 아이콘, 색상 변형, 링크, 사이즈 등을 쉽게 드롭다운 옵션에서 선택하여 사용자 정의할 수 있습니다.

![이미지](/assets/img/2024-06-20-TheEvolutionoftheUrbanInstitutesDesignLibrary_5.png)

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

lbj-button 컴포넌트는 (src/components) 디렉토리 안에 있습니다. 여기에는 프로젝트 전반적인 사용을 위해 기술적인 명명을 보장하기 위해 모든 컴포넌트가 저장되어 있습니다. (우리는 전 대통령 린든 B. 존슨에 경의를 표하기 위해 lbj 접두사를 사용합니다.)

![스크린샷](/assets/img/2024-06-20-TheEvolutionoftheUrbanInstitutesDesignLibrary_6.png)

lbj-button 디렉토리에는 모든 관련 코드가 포함되어 있습니다. lbj-button.tsx TypeScript 파일은 Stencil을 사용하여 컴포넌트를 생성하는데, .tsx 확장자는 개발 중에 JSX와 TypeScript를 사용하고 있음을 나타냅니다. 이 구성은 해당 컴포넌트를 HTML에 사용자 정의 태그로 포함시킬 수 있게 하며, Urban의 주요 색상으로 스타일링된 다운로드 아이콘이 있는 버튼을 렌더링합니다.

![스크린샷](/assets/img/2024-06-20-TheEvolutionoftheUrbanInstitutesDesignLibrary_7.png)

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

# Lyndon의 능력 확장:

.tsx 파일 이외에도, 각 Lyndon 컴포넌트에는 lbj-button.stories.ts와 같은 스토리 파일이 포함되어 있습니다. 이 설정을 통해 팀은 Stencil이 생성한 웹 컴포넌트를 StencilJS와 독립적으로 사용자 인터페이스에서 시각화하고 상호 작용할 수 있습니다. 개발자는 전체 애플리케이션 환경을 로드할 필요가 없어 개발 주기를 빠르게 하고 문제 해결을 쉽게 할 수 있습니다.

Storybook은 단일 컴포넌트에 대해 여러 가지 스토리나 변형을 생성할 수 있도록 하며, 다른 기능 또는 스타일을 나타냅니다. 기존 컴포넌트에 변형을 도입할 때는 기본 컴포넌트를 활용하고 필요에 맞게 수정합니다.

아래 이미지에서, Color Block 컴포넌트는 특정 시나리오에 맞게 디자인된 네 가지 다른 변형과 함께 표시됩니다. 한 가지 변종인 Color Block Minimal은 주로 균일한 배경 색상으로 섹션을 만들기 위해 사용됩니다. 다른 변형인 Featured Text는 페이지나 URL로 연결되는 헤드라인 옵션, 버튼과 같은 상호 작용 요소를 포함하는 다양한 배경 색상을 특징으로 하는 블록 목록을 포함한 더 다이내믹한 사용 사례를 위해 디자인되었습니다.

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

![이미지](/assets/img/2024-06-20-TheEvolutionoftheUrbanInstitutesDesignLibrary_8.png)

웹 디자인 및 개발의 기초를 계속해서 개선 중입니다.

라이든을 통해 더 많은 사용자 정의 옵션 및 더 효율적인 개발을 지원함으로써 우리는 Urban Institute에서 웹 디자인 및 개발에 접근하는 방식을 현격히 변화시켰습니다. 이 강력한 디자인 시스템을 구현함으로써, 모든 디지털 플랫폼에서 더욱 일관된 경험을 제공하고 있습니다. 구체적으로 개선된 내용은 다음과 같습니다:

- 효율성 증대: 팀이 새로운 요소를 처음부터 만드는 대신 미리 디자인된 구성 요소를 빠르게 구현할 수 있기 때문에 개발 시간이 단축되었습니다.

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

- 향상된 일관성: 모든 디지털 출력물은 통일된 디자인을 따르므로 브랜드 아이덴티티가 플랫폼과 사이트 전반에 걸쳐 일관성을 유지합니다.

- 더 많은 유연성: Lyndon의 적응형 디자인 시스템은 Drupal을 넘어서 다른 웹 애플리케이션까지 확장됩니다.

- 향상된 확장성: 우리의 디지털 요구사항이 증가함에 따라, Lyndon의 유연한 프레임워크로 기존 구조를 방해하지 않고 더 복잡한 기능을 쉽게 확장하고 통합할 수 있습니다.

# Lyndon의 유연성을 보여주는 것:

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

이미 실무에서 이러한 혜택들을 확인했습니다. 학생 Upward Mobility Initiative 웹사이트의 경우, 프로젝트의 특정 요구사항과 이해관계자들의 요청으로 인해 Urban의 가이드라인을 준수해야 했습니다. 이 요청을 수용하기 위해, 새로운 글꼴 패밀리를 도입한 Lyndon의 새로운 변형을 발표했습니다. 이를 통해 각 구성 요소의 글꼴을 코딩할 필요 없이 새로운 글꼴 패밀리를 통합할 수 있었습니다. 이 변형은 Lyndon 라이브러리에 추가되어 사용자 정의 구성 요소 태그에서 모드 속성을 정의함으로써 글꼴을 렌더링할 수 있게 했습니다. 아래는 이전과 동일한 버튼 구성 요소이지만, 이제는 학생 Upward Mobility Initiative 사이트에서 필요한 새로운 글꼴 패밀리를 사용합니다. 이 프로젝트와 앞으로의 계획에서 Lyndon의 유연성은 각 프로젝트가 독특한 브랜드 아이덴티티를 유지하면서도 Lyndon의 강력한 인프라를 활용할 수 있도록 합니다.

![이미지](/assets/img/2024-06-20-TheEvolutionoftheUrbanInstitutesDesignLibrary_9.png)

"Lyndon의 구성 요소를 사용하면 디자이너와 사이트 프로듀서들이 상상할 수 있는 거의 모든 페이지 레이아웃을 구상하고 실행할 수 있습니다. 이는 그들의 작업을 더 창의적으로 만드는 뿐만 아니라 효율적으로 만들어줍니다."

- Dave Connell, 디지털 커뮤니케이션 선임 이사

저희는 웹 개발의 떠오르는 트렌드와 기술을 충족하는 Lyndon의 진화를 계속할 것을 약속합니다. 저희의 계획에는 아래와 같은 것들이 포함됩니다:

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

- 최신 웹 기술과 사용자 기대에 따라 지속적으로 새로운 구성 요소를 추가하고 업데이트 중입니다.

- 라인든(Lyndon)의 접근성 기능을 향상시켜 디지털 콘텐츠를 더 넓은 관객에게 도달 가능하게 하며 웹 콘텐츠 접근성 지침을 준수하는 기준을 뛰어넘습니다.

# 라인든 앞으로의 발전:

라인든과 함께한 이 여정에서 한 때의 웹 개발 병목 현상을 혁신과 효율을 위한 길로 변모시켰습니다. 디자인 시스템을 한 단계 더 높여 반복적인 디자인 작업의 어려움을 극복함으로써 모든 디지털 산출물을 핵심 미션과 일치시켰습니다. 오늘날, 우리는 강력하고 확장 가능한 기반을 구축하여 미래 웹 기술을 수용하고 웹 접근성 표준을 준수합니다. 사용자 커뮤니티는 이 지속적인 과정에서 중요한 역할을 하며, Urban Institute의 목표를 달성하고 접근 가능한 디지털 연구 플랫폼을 위한 새로운 기준을 설정하는 도구로 라인든을 세밀하게 다듬는 데 도움이 되고 있습니다.

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

웹 개발의 미래가 어떻게 발전할지, 그리고 접근성이 그 중에서 어떤 역할을 할지 궁금하시군요? 귀하의 생각을 나누어주셔서 감사합니다. Lyndon의 발전하는 이야기에 함께해 주세요.

— Farnoosh Johnson

더 많은 정보를 알고 싶으신가요? Data@Urban 뉴스레터에 가입하세요.
