---
title: "리액트 JS란 무엇인가요 왜 사용하나요"
description: ""
coverImage: "/assets/img/2024-05-12-WHATISREACTJSWHYWEUSEIT_0.png"
date: 2024-05-12 22:02
ogImage: 
  url: /assets/img/2024-05-12-WHATISREACTJSWHYWEUSEIT_0.png
tag: Tech
originalTitle: "WHAT IS REACT JS ?WHY WE USE IT?"
link: "https://medium.com/@syntaxsynchub/what-is-react-js-why-we-use-it-da860b2dcbbe"
isUpdated: true
---




![React.js](/assets/img/2024-05-12-WHATISREACTJSWHYWEUSEIT_0.png)

# React.js가 무엇인가요?

React.js 또는 간단히 React는 Facebook에서 개발한 오픈 소스 JavaScript 라이브러리입니다. 이는 사용자 인터페이스를 구축하는 데 사용되며 특히 단일 페이지 애플리케이션(SPA)의 경우 UI가 매우 동적이고 반응적이어야 할 때 사용됩니다.

React.js의 핵심은 선언적이고 컴포넌트 기반의 UI 구축 방식을 제공합니다. 이는 개발자가 상태를 관리하는 캡슐화된 컴포넌트를 생성할 수 있으며, 데이터가 변경될 때 React가 효율적으로 업데이트하고 렌더링하는 컴포넌트를 관리할 수 있습니다. React는 가상 DOM(Document Object Model)을 사용하여 렌더링 성능을 최적화하며 필요한 컴포넌트만 업데이트하고 전체 페이지를 다시 렌더링하지 않도록합니다.



# React.js를 사용해야 하는 이유

React.js가 개발자들 사이에서 엄청 인기를 얻은 몇 가지 이유가 있어요:

- 컴포넌트 기반 아키텍처: React의 컴포넌트 기반 아키텍처는 재사용성과 모듈성을 장려해요. 개발자들은 작고 독립적인 컴포넌트를 만들고 이를 조합하여 복잡한 UI를 구축할 수 있어서 유지 및 확장이 쉽습니다.
- 가상 DOM: React는 가상 DOM을 사용하여 UI를 메모리에 나타내어 효율적으로 업데이트하고 렌더링할 수 있어요. 브라우저의 DOM을 직접 조작하는 대신, React는 실제 DOM을 업데이트하는 가장 효율적인 방법을 계산하여 성능을 향상시킵니다.
- 선언형 구문: React는 선언형 구문을 사용하는데, 개발자들이 현재 애플리케이션 상태에 기반하여 UI가 어떻게 보일지를 설명합니다. 이는 명령형 방식에 비해 코드를 이해하고 추론하기 쉽게 만들어줘요.
- 일방향 데이터 바인딩: React는 단방향 데이터 흐름을 따르는데, 데이터가 부모에서 자식 컴포넌트로 props를 통해 흐릅니다. 데이터 변경을 추적하고 디버깅하기 쉬워져서 예상치 못한 부작용이 발생할 가능성을 줄입니다.
- 큰 생태계: React는 핵심 기능을 보완하는 라이브러리, 도구 및 확장 프로그램들이 풍부한 생태계를 가지고 있어요. 이는 Redux와 같은 상태 관리 라이브러리, React Router와 같은 라우팅 솔루션, Jest와 React Testing Library와 같은 테스팅 프레임워크를 포함합니다.
- 커뮤니티 지원: React에는 지속적인 개발에 기여하는 개발자들의 활성화된 커뮤니티가 있어요. 이들은 포럼, 블로그, 소셜 미디어를 통해 지식을 공유하고 튜토리얼, 코스, 플러그인과 같은 가치 있는 리소스를 만듭니다.

# React.js 역사와 배경



리액트.js는 처음 Facebook의 소프트웨어 엔지니어인 Jordan Walke에 의해 개발되었고, 2011년 Facebook의 뉴스피드에서 처음으로 배포되었습니다. 이후 2013년에 오픈 소스로 공개되어 Facebook 외부의 개발자들이 라이브러리를 사용하고 기여할 수 있게 되었습니다.

릴리스 이후 리액트.js는 큰 변화를 거쳐 사용자 인터페이스를 구축하는 데 가장 인기 있는 JavaScript 라이브러리 중 하나가 되었습니다. Facebook, Instagram, Netflix, Airbnb 등과 같은 대규모 기업들을 포함해 모든 규모의 기업에서 널리 채택되고 있습니다.

리액트의 성공은 리액트 네이티브(React Native)의 개발로 이어졌습니다. React Native는 React.js 원칙을 활용하여 크로스 플랫폼 모바일 애플리케이션을 개발하기 위한 프레임워크입니다. React Native를 사용하면 JavaScript로 모바일 앱을 작성하면서 네이티브 플랫폼 기능을 활용할 수 있어, 웹 개발 이상으로 React의 영향력을 확장하고 있습니다.