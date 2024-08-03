---
title: "스토리북 interaction 관련 addon 소개"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Introduction to addons"
link: "https://storybook.js.org/docs/addons"
---




애드온은 코어에 내장되어 있지 않은 기능 및 통합을 Storybook에 추가합니다. 대부분의 Storybook 기능은 애드온으로 구현됩니다. 예를 들어 문서 작성, 접근성 테스트, 상호 작용 컨트롤 등이 있습니다. 애드온 API를 통해 Storybook을 새로운 방식으로 구성하고 사용자 정의할 수 있습니다. 커뮤니티에 만들어진 수많은 애드온은 시간을 절약하는 작업 흐름을 개방합니다.

기존 애드온을 설치하거나 자신의 애드온에 영감을 얻기 위해 애드온 카탈로그를 참조해보세요.

## Storybook 기본

첫 애드온을 작성하기 전에, Storybook 아키텍처의 기본을 살펴봅시다. Storybook은 통합된 사용자 인터페이스를 제공하지만 하부에서는 Manager와 Preview로 중분되어 있습니다.



테이블 태그를 Markdown 형식으로 변경해주세요.

The Manager is the UI responsible for rendering the:

- 🔍 Search
- 🧭 Navigation
- 🔗 Toolbars
- 📦 Addons

The Preview area is an iframe where your stories are rendered.

![Introductiontoaddons_0](/assets/img/Introductiontoaddons_0.png)



두 요소가 각각 자체 iframe에서 실행되기 때문에 동기화를 유지하기 위해 통신 채널을 사용합니다. 예를 들어, 매니저에서 이야기를 선택하면 이벤트가 채널을 통해 전파되어 미리보기에게 해당 이야기를 렌더링하도록 알립니다.

## 애드온의 구조

Storybook 애드온을 사용하면 Storybook으로 가능한 것을 확장할 수 있습니다. 사용자 인터페이스부터 API까지 모든 것이 가능합니다. 각각은 두 가지 더 넓은 범주로 분류됩니다.

### UI 기반 애드온



UI 기반 애드온은 개발 흐름을 확장하기 위해 Storybook의 사용자 인터페이스를 사용자 정의하는 데 초점을 맞춥니다. UI 기반 애드온의 예시로는 Controls, Docs 및 Accessibility가 있습니다.

애드온 작성 방법을 배우세요 »

### 프리셋 애드온

프리셋 애드온은 Storybook을 다른 기술 및 라이브러리와 통합하는 데 도움이 됩니다. 프리셋 애드온의 예시로는 preset-create-react-app이 있습니다.



프리셋 애드온을 작성하는 방법을 배워보세요!