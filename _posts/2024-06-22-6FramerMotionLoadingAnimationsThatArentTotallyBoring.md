---
title: "지루하지 않은 6가지 Framer Motion 로딩 애니메이션"
description: ""
coverImage: "/assets/img/2024-06-22-6FramerMotionLoadingAnimationsThatArentTotallyBoring_0.png"
date: 2024-06-22 15:17
ogImage: 
  url: /assets/img/2024-06-22-6FramerMotionLoadingAnimationsThatArentTotallyBoring_0.png
tag: Tech
originalTitle: "6 Framer Motion Loading Animations That Aren’t Totally Boring"
link: "https://medium.com/@ezhai24/6-framer-motion-loading-animations-that-arent-totally-boring-0d50beedc0d0"
---


<img src="/assets/img/2024-06-22-6FramerMotionLoadingAnimationsThatArentTotallyBoring_0.png" />

2023년이 왔어요! 광섬유 인터넷, CDN, SSR, 그리고 WebP 이미지 압축 시대에 오신 걸 환영합니다. 웹페이지가 로딩되기를 기다려야 했던 날들은 사라졌습니다. 응? 아니에요. 그게 아니에요?

90년대 이후 웹 인프라는 확실하게 발전해 왔습니다. 하지만, 무엇이든 그렇듯이, 더 많은 용량은 더 많은 수요를 가져오게 됩니다. 4K 비디오, 3D 그래픽, 복잡한 상호작용, 몰입형 게임 플레이, 그리고 대량 데이터 시각화와 같은 기능들이 웹사이트에서 점점 더 흔해지고 있습니다. 페이지네이션, 캐싱, 최소화 등과 같은 전략들이 있지만, 로딩 시간은 우리가 실제로 완전히 피할 수 있는 것은 아니라고 생각해요.

이것은 제게 기회로 다가오는 것 같아요. 기다릴 수밖에 없는 현실에서, 기다리는 시간은 최소한 통일된 브랜드 경험이 되어야 한다고 생각해요—특히 이것이 사용자가 웹사이트와 처음으로 마주하는 경험인 경우가 많을 때 말이에요. 그렇다면, 왜 아직도 2000년대 초부터 사용해 온 동일한 일반적인 점, 블록, 그리고 원형 단락을 사용하고 있는 걸까요?

<div class="content-ad"></div>

독특하고 신중하게 디자인된 로딩 애니메이션을 만들 때에는 방대한 노력이나 복잡한 과정이 필요하지 않아요. Framer Motion을 사용하면 웹 페이지 주변의 요소들을 조율하는 것이 간단하고 쉽습니다. 필요한 건 창의성과 스타일 뿐이에요! 영감을 주기 위해, 저는 이번 주말에 Framer Motion을 사용해 만든 재미있는 6가지 로딩 애니메이션을 소개할게요. 다음 프로젝트에 활용하거나 자신만의 애니메이션으로 리믹스해보세요!

# Tetris — 위치 및 회전 애니메이션

이 테트리스 애니메이션은 다소 복잡할 수 있지만, 사실은 투명도, 위치, 회전 애니메이션의 선형 시퀀스일 뿐이에요. 이 애니메이션의 핵심 원리를 이해하면, 가능성은 무궁무진해요.

리믹스하는 방법:

<div class="content-ad"></div>

- 점을 먹는 팩맨
- 뉴턴의 집게
- The Office DVD 로고

유용한 참고 자료

- Framer Motion에서 애니메이션 시퀀싱
- Framer Motion으로 변형 속성 애니메이션화
- 사용자 정의 컴포넌트를 모션 컴포넌트로 변환
- CSS Grid 기초

# 로고 — SVG 애니메이션화

<div class="content-ad"></div>

로고는 본질적으로 브랜드화되어 있고 독특합니다. 로고를 애니메이션하는 것은 로딩 경험이 매끄럽고 특별하게 만드는 간단한 방법입니다.

이것을 바꾸는 방법

- 필체로 단어 쓰기
- 아이콘 또는 이미지 그리기

유용한 참고 자료

<div class="content-ad"></div>

- 인크스케이프(오픈 소스 백터 그래픽 편집기!)에 대한 신속한 안내
- CSS 블렌드 모드를 활용한 하이라이트
- Framer Motion으로 SVG 경로 애니메이션화
- 팁: .svg 파일을 코드 편집기에서 열어 HTML 소스 코드에 액세스하세요

# 주요 포인트 — CSS 블렌드 모드 활용

CSS 블렌드 모드는 겹치는 픽셀이 어떻게 혼합되어야 하는지를 설명합니다. 초기 및 결과 컨텐츠의 차이를 애니메이션화하면 흥미로운 효과를 얻을 수 있습니다. 아래에는 서로 다른 결과를 생성하기 위해 서로 다른 색상 레이어를 사용하는 두 가지 동일한 애니메이션이 나와 있습니다.

이를 리믹스하는 방법

<div class="content-ad"></div>

- 그레이스케일 이미지 위에 전체 컬러 섹션을 애니메이트하세요.
- 다른 이미지 "필터" (블렌드 모드) 간 전환하기

유용한 참고 자료

- CSS 블렌드 모드 소개
- Framer Motion에서 모션 컴포넌트 사용하기

# 스피너 — 고전 재구성

<div class="content-ad"></div>

아, 강력한 스피너. 수십 년 동안 고전적인 아이템이었습니다. 하지만 그것이 일반적이어야 한다는 뜻은 아닙니다. 최근에 Paula Scher-식 텍스트를 시각적으로 디자인하는 스타일이 웹 형식에서 부활하고 있습니다. 이것으로 인해 타이포그래피가 로딩 애니메이션을 포함한 웹사이트 전체에 스타일을 삽입하는 매우 트렌디한 방법이 되었습니다. 아래의 두 가지 로더는 서로 다른 글꼴 얼굴, 크기 및 색상을 사용하여 두 가지 매우 다른 시각적 정체성을 나타냅니다.

이것을 리믹스하는 방법

- 룬 문자를 사용하여 Lorestone을 애니메이션화
- 그래픽을 회전시키기 (피자 조각? 스피너?)

유용한 참고 자료

<div class="content-ad"></div>

- 구글 글꼴 관련 안내서
- Framer Motion을 사용한 변형 속성 애니메이션

이상으로 요약할게요! 멋진 것을 만들어보세요!