---
title: "Storybook Measure, outline addon 사용 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Measure , outline"
link: "https://storybook.js.org/docs/essentials/measure-and-outline"
---




Storybook의 Measure 및 Outline 애드온은 이야기 내에서 CSS 레이아웃 및 정렬 문제를 시각적으로 디버깅할 수 있도록 필요한 기능을 제공합니다. 개발 중에 UI 버그를 미리 발견하는 데 도움이 됩니다.

## Measure 애드온

복합 구성 요소나 페이지 레이아웃을 다룰 때는 공백(margin, padding, border) 및 개별 구성 요소의 측정이 상당히 번거로울 수 있습니다. 브라우저 개발 도구를 열고 문제 및 UI 버그를 수동으로 검사해야 할 수 있습니다.

Storybook의 Measure 애드온을 사용하면 Storybook 툴바에서 한 번 클릭으로 각 구성 요소의 측정 값을 빠르게 시각화할 수 있습니다.



<video autoplay playsinline loop>
  <source src="@source/docs/Tech/2024-04-07-Measureoutline/img/Measureoutline_0.mp4" type="video/mp4">
</video>

## Outline addon

레이아웃을 작성할 때 모든 구성 요소의 시각적 정렬을 확인하는 것은 상당히 복잡할 수 있습니다. 특히 구성 요소가 퍼져 있거나 고유한 모양을 가지고 있는 경우 더욱 그렇습니다.

Storybook의 아웃라인 애드온을 사용하면 UI 요소와 관련된 윤곽선을 토글할 수 있어서 버튼을 클릭하면 즉시 버그 및 깨진 레이아웃을 확인할 수 있습니다.





## API

### Parameters

This addon contributes the following parameters to Storybook, under the measure or outline namespace:



#### 비활성화

유형: 부울(boolean)

이 애드온의 동작을 비활성화합니다. 전체 스토리북에서 이 애드온을 비활성화하려면 애드온-에센셜을 등록할 때 이렇게 해야 합니다. 추가 정보는 필수 애드온의 문서를 참조하세요.

이 매개변수는 더 구체적인 수준에서 재정의를 허용하는 데 가장 유용합니다. 예를 들어 프로젝트 수준에서이 매개변수를 true로 설정하면 메타(컴포넌트) 또는 스토리 수준에서 false로 설정하여 다시 활성화할 수 있습니다.