---
title: "현대 웹을 위해 새롭게 탄생한 자동완성 상자"
description: ""
coverImage: "/assets/img/2024-05-12-TheAutoCompleteboxreinventedfortheModernWeb_0.png"
date: 2024-05-12 23:31
ogImage: 
  url: /assets/img/2024-05-12-TheAutoCompleteboxreinventedfortheModernWeb_0.png
tag: Tech
originalTitle: "The AutoComplete box, reinvented for the Modern Web"
link: "https://medium.com/cto-as-a-service/the-autocomplete-box-reinvented-for-the-modern-web-2848430df1e9"
---


## 모든 곳에서 작동하며 의존성이 전혀 없는 다재다능한 접근 가능한 자동완성 웹 구성 요소.

![이미지](/assets/img/2024-05-12-TheAutoCompleteboxreinventedfortheModernWeb_0.png)

생각해 보면, 텍스트 상자에서의 자동완성은 일종의 상용품이 되어가고 있고, 수많은 UI 프레임워크가 자체적인 구현을 제공하고 있습니다.

큰 프레임워크를 사용하지 않거나 자동완성 UI 구성 요소를 포함한 기존 디자인 시스템을 사용하지 않고 현대적인 웹 앱을 구축할 때, 우리는 혼자서 해결해야 합니다.



지금까지.
제가 AutoComplete ECMAScript 클래스를 작성했고 해당 클래스를 구현하는 `omni-box`라는 표준 기반 웹 컴포넌트를 만들었습니다.

# OmniBox

AutoComplete 클래스는 모든 기본 로직을 호스팅하며, 텍스트 기반 HTML 입력 요소에 자동 완성 로직을 연결하는 데 사용할 수 있습니다.



OmniBox 웹 컴포넌트는 검색 입력을 생성하고 AutoComplete 컴포넌트를 연결합니다.

## 왜 OmniBox를 사용해야 하는가?

이는 의존성이 전혀 없는 매우 다재다능한 자동완성 컴포넌트로, 모든 브라우저에서 실행되며 웹 컴포넌트로 구현되었습니다. OmniBox라는 이름은 이 컴포넌트로 간단한 자동완성 시나리오를 용이하게 할 수 있을 뿐만 아니라 LinkedIn, Facebook 또는 Office.com에서 보는 것처럼 복잡한 다중 소스 시스템도 구현할 수 있다는 사실을 나타냅니다.

자동완성 결과는 고정(Array) 데이터에서 가져올 수 있지만, REST API와 같은 여러 소스와 연동해야 하는 더 복잡한 상황에서도 작업할 수 있습니다. 여러 호출 결과를 집계해야 하는 상황도 다룰 수 있습니다.



또한 자동 완성 결과 항목을 선택할 때 단순히 입력란을 채우는 대신 사용자 정의 작업을 호출하도록 구성할 수도 있습니다.

# 기능

- 표준 기반의 웹 컴포넌트.
- 의존성 없음.
- 타입하는 대로 자동 완성 결과가 집계되는 구성 가능한 자동 완성 카테고리.
- 각 카테고리에는 Array, Function 또는 Promise를 반환할 수 있는 'getItems' 속성이 있습니다.
- 각 카테고리에는 정렬 색인이 있습니다.
- 각 카테고리에는 'getItems'가 호출되는 시점을 결정하는 트리거 함수가 있습니다.
- 각 카테고리에는 항목 선택을 위해 정의된 사용자 정의 작업을 가질 수 있습니다.

# CodePen



아래 Markdown 형식을 사용하여 CodePen에서 컴포넌트를 살펴보세요:

# 더 많은 표준 기반의 유용한 것들

다음의 탭 스트립도 확인해보세요. Marc van Neerven 저, CTO-as-a-Service 블로그의 The TabStrip, reinvented for the Modern Web 기사에서도 볼 수 있습니다.

## PurePWA



저는 PurePWA를 소개하는 "웹 개발의 급격한 전환"의 저자입니다. 이 책에서는 시맨틱 HTML과 ECMAScript를 사용하여 현대적인 PWA를 구축할 때 프레임워크, 빌드 시스템 또는 기타 종속성 없이 어떤 가능성이 있는지 탐구하고 있어요.

🔗 LinkedIn에서 제 소식을 받아보세요