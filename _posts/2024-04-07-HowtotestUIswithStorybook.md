---
title: "Storybook으로 UI 테스트하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "How to test UIs with Storybook"
link: "https://storybook.js.org/docs/writing-tests"
isUpdated: true
---






Storybook은 구성 요소를 격리하여 테스트할 수 있는 깨끗한 환경을 제공합니다. 스토리를 통해 복잡한 구성 요소의 모든 변형을 탐색하는 것이 쉬워집니다.

즉, 스토리는 UI 테스트 전략의 개방적인 시작점이 됩니다. 이미 UI 개발의 자연스러운 부분으로 스토리를 작성하고, 해당 스토리를 테스트하는 것은 시간이 지나면서 UI 버그를 방지하는 데 낮은 노력을 들이는 방법입니다.

가장 간단한 테스트 방법은 수동 "스팟 체크"입니다. 로컬에서 Storybook을 실행한 다음, 모든 스토리를 직접 확인하여 외관과 동작을 확인합니다. 온라인에 Storybook을 게시하여 복제본을 공유하고 팀원들을 참여시키세요.

<video autoplay playsinline loop>
  <source src="@source/docs/Tech/2024-04-07-HowtotestUIswithStorybook/img/HowtotestUIswithStorybook_0.mp4" type="video/mp4">
</video>




컴포넌트를 독립적으로 테스트하려면 종종 데이터, 의존성 또는 심지어 네트워크 요청을 모의해야 할 수 있습니다. 더 많은 정보를 원한다면 Storybook에서 모의에 대한 가이드를 확인해보세요.

Storybook는 또한 UI 테스트 범위를 확장하기 위해 자바스크립트 생태계와의 편리한 통합, 테스트 실행기 및 도구도 제공합니다. 이 문서에서는 Storybook를 사용하여 UI 테스트를 하는 방법에 대해 자세히 설명합니다.

- 테스트 실행기로 Storybook 전체를 자동으로 테스트하여 문제가 있는 스토리를 찾습니다.
- 시각적 테스트는 각 스토리의 스크린샷을 캡처한 다음 기준과 비교하여 모양과 통합 문제를 감지합니다.
- 접근성 테스트는 시각, 청각, 이동, 인지, 발화 또는 신경 장애와 관련된 사용 가능성 문제를 감지합니다.
- 상호작용 테스트는 사용자 동작을 시뮬레이션하고 이벤트를 발생시키며 상태가 예상대로 업데이트되는지 확인하여 구성 요소 기능을 검증합니다.
- 커버리지 테스트는 코드의 얼마나 많이 테스트되었는지 측정합니다.
- 스냅샷 테스트는 렌더된 마크업의 변경을 감지하여 렌더링 오류나 경고를 노출합니다.
- 실제 사용자 시나리오를 시뮬레이션하기 위한 종단 간 테스트
- 기능에 대한 단위 테스트