---
title: "Tailwind CSS로 가독성 좋은 웹사이트 만드는 방법"
description: ""
coverImage: "/assets/img/2024-05-20-TipsForWritingMaintainableandReadableCodewithTailwindCSS_0.png"
date: 2024-05-20 23:01
ogImage: 
  url: /assets/img/2024-05-20-TipsForWritingMaintainableandReadableCodewithTailwindCSS_0.png
tag: Tech
originalTitle: "Tips For Writing Maintainable and Readable Code with Tailwind CSS"
link: "https://medium.com/@patrickkarsh/tips-for-writing-maintainable-and-readable-code-with-tailwind-css-f147ab752513"
isUpdated: true
---





![Tips for Writing Maintainable and Readable Code with Tailwind CSS](/assets/img/2024-05-20-TipsForWritingMaintainableandReadableCodewithTailwindCSS_0.png)

웹 개발에서 깔끔하고 확장 가능한 코드베이스를 유지하는 것은 매우 중요합니다. 특히 대규모 프로젝트에서 스타일을 관리할 때는 더욱 그렇습니다. Tailwind CSS는 유용성이 우선인 CSS 프레임워크로, 애플리케이션을 효율적으로 스타일링하는 구조화된 방법을 제공합니다. 그러나 모든 도구와 마찬가지로, Tailwind의 장점을 최대로 발휘하려면 최상의 관행을 준수해야 합니다. 아래에서는 유지보수 가능하고 가독성 있는 Tailwind CSS 코드를 작성하는 핵심 전략에 대해 실용적인 예제를 통해 살펴봅니다.

## 유틸리티 클래스의 일관된 순서

HTML 요소에서 유틸리티 클래스의 일관된 순서를 유지하면 스타일을 쉽게 스캔하고 수정할 수 있습니다. 예를 들어, 표시 속성(display: flex, grid)으로 시작하여 위치 지정 (m, p), 그 다음에 글꼴 (text-, font-), 마지막으로 색상 및 그림자와 같은 코스메틱 스타일로 끝나는 규칙을 정의하세요.


<div class="content-ad"></div>

예시:

이 예시에서는 레이아웃 속성(flex, flex-col)이 먼저 정의되고, 간격(p-4, md:p-8), 배경(bg-white), 그림자(shadow-lg), 그리고 둥근 모서리(rounded-lg)가 따릅니다. 타이포그래피 속성 (text-2xl, font-bold, text-gray-900)은 텍스트 요소에 적용됩니다.

## 반응형 접두사 활용하기

시스템적으로 반응형 접두사를 사용하면 스타일이 기기에 맞게 신속하게 적응합니다. 항상 가장 작은 브레이크포인트부터 시작하여 일관성을 유지하면서 작업해야 합니다.

<div class="content-ad"></div>

예시:

이 `div`는 텍스트 크기를 뷰포트 너비에 따라 조정합니다. 텍스트 크기는 모바일에서 `text-base`부터 태블릿에서 `text-lg`, 데스크톱에서 `text-xl`로 증가합니다.

## 반복되는 유틸리티 패턴에 @apply 활용

다양한 컴포넌트에서 동일한 유틸리티 클래스 조합을 반복적으로 사용할 때, @apply 지시문을 사용하여 CSS 파일에서 이를 결합하여 중복을 줄일 수 있는 사용자 지정 클래스로 만들 수 있습니다.

<div class="content-ad"></div>

예시:

여기서 일반 버튼 스타일링은 .btn-primary 및 .btn-secondary 클래스로 추상화되어 HTML을 깔끔하고 집중할 수 있습니다.

## 복잡한 컴포넌트용 컴포넌트 클래스 구현

더 복잡한 컴포넌트의 경우 특정 컴포넌트 클래스를 만드는 것이 더 실용적일 수 있습니다. 이렇게 하면 세부 스타일을 캡슐화할 수 있으면서도 작은 조정에 유틸리티 클래스를 사용할 수 있습니다.

<div class="content-ad"></div>

예시:

이 예시에서는 .card 클래스가 모든 일반적인 스타일을 다루며, 유틸리티 클래스는 카드 내의 요소에 직접 추가하여 특정 조정을 할 수 있습니다.

## PurgeCSS 통합

PurgeCSS를 빌드 프로세스에 통합하면 실제로 사용되는 스타일만 제작 파일에 포함되어 파일 크기가 크게 줄어듭니다.

<div class="content-ad"></div>

이 구성은 PurgeCSS를 설정하여 HTML 및 Vue 파일을 스캔하여 최종 CSS에서 사용되지 않는 Tailwind 클래스를 제거합니다.

# 결론

Tailwind CSS에 대한 이러한 모범 사례를 채택하면 코드의 가독성과 유지 관리성뿐만 아니라 응용 프로그램의 전반적인 성능도 향상됩니다. 일관된 패턴을 설정하고 내장 유틸리티를 지능적으로 활용하며 깨끗한 코드베이스를 유지하여 개발자는 Tailwind CSS의 강력함을 완전히 활용하여 멋진 효율적인 웹 인터페이스를 만들 수 있습니다.