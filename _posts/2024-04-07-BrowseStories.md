---
title: "스토리북에서 stories 만드는 방법 "
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Browse Stories"
link: "https://storybook.js.org/docs/get-started/browse-stories"
isUpdated: true
---






지난 장에서 우리는 이야기가 개별 구성 요소 상태와 일치한다는 것을 배웠어요. 이 장에서는 Storybook을 구성 요소를 만들기 위한 작업실로 사용하는 방법을 보여줄 거예요.

## 사이드바와 캔버스

*.stories.js 파일은 구성 요소의 모든 이야기를 정의해요. 각 이야기에는 대응하는 사이드바 항목이 있어요. 이야기를 클릭하면 캔버스에서 고립된 미리보기 iframe로 렌더링돼요.

<video autoplay playsinline loop>
  <source src="@source/docs/Tech/2024-04-07-BrowseStories/img/BrowseStories_0.mp4" type="video/mp4">
</video>



스토리 사이를 이동하려면 사이드바에서 클릭해보세요. 사이드바 검색을 이용하여 이름으로 스토리를 찾을 수도 있어요.

또는 키보드 단축키를 사용하세요. Storybook의 메뉴를 클릭하여 사용 가능한 단축키 목록을 확인할 수 있어요.

<img src="/assets/img/BrowseStories_0.png" />

## 툴바



Storybook은 시간을 절약할 수 있는 도구를 기본으로 제공합니다. 툴바에는 Canvas에서 스토리가 렌더링되는 방식을 조정할 수 있는 도구가 포함되어 있어요:

- 🔍 줌인 기능은 구성 요소를 시각적으로 확대하여 세부 사항을 확인할 수 있어요.
- 🖼 배경 변경은 구성 요소 뒤에 렌더링되는 배경을 변경하여 다양한 시각적 맥락에서 구성 요소가 어떻게 렌더링되는지 확인할 수 있어요.
- 📐 그리드는 구성 요소를 그리드 레이아웃 위에 렌더링하여 구성 요소가 올바르게 정렬되어 있는지 확인할 수 있어요.
- 📏 측정은 구성 요소의 차원을 검사하는 데 도움이 되는 측정 오버레이를 토글합니다.
- 🎚️ 윤곽선은 구성 요소의 경계 상자를 표시하여 구성 요소가 올바른 위치에 있는지 확인할 수 있어요.
- 📱 뷰포트는 구성 요소를 다양한 차원과 방향으로 렌더링합니다. 구성 요소의 반응 형을 확인하는 데 이상적입니다.

<video autoplay playsinline loop>
  <source src="@source/docs/Tech/2024-04-07-BrowseStories/img/BrowseStories_1.mp4" type="video/mp4">
</video>

“Docs” 페이지에는 컴포넌트에 대한 자동 생성된 문서가 표시됩니다(소스 코드로부터 추론됨). 사용 문서화는 재사용 가능한 컴포넌트를 팀과 공유할 때 유용합니다. 예를 들어, 애플리케이션에서요.



<img src="/assets/img/BrowseStories_1.png" />

툴바는 사용자 맞춤 설정이 가능합니다. 글로벌을 사용하여 테마 및 언어를 쉽게 전환할 수 있습니다. 또는 커뮤니티에서 Storybook 툴바 애드온을 설치하여 고급 워크플로우를 활성화할 수 있습니다.

## 애드온

애드온은 Storybook의 핵심 기능을 확장하는 플러그인입니다. 애드온은 애드온 패널에서 찾을 수 있으며, 이 패널은 캔버스 아래 Storybook UI의 예약된 위치입니다. 각 탭은 애드온에 의해 선택된 스토리의 생성된 메타데이터, 로그 또는 정적 분석을 보여줍니다.



![이미지](/assets/img/BrowseStories_2.png)

- **Controls**를 사용하면 컴포넌트의 args(입력)와 상호 작용할 수 있습니다. 컴포넌트의 대안 구성을 실험하여 엣지 케이스를 발견해보세요.
- **Actions**은 콜백을 통해 상호 작용이 올바른 출력을 생성하는지 확인하는 데 도움을 줍니다. 예를 들어, Header 컴포넌트의 "Logged In" 스토리를 보고 "Log out" 버튼을 클릭하면 Header를 사용하는 컴포넌트에서 필요한 onLogout 콜백이 트리거되는지 확인할 수 있습니다.
- **Interactions**은 play 함수를 사용하여 상호 작용 테스트를 디버깅할 때 유용한 사용자 인터페이스를 제공합니다.
- **Visual Tests**를 사용하면 로컬 개발 환경에서 UI 버그를 즉시 확인하여 피드백을 받을 수 있습니다.

<video autoplay playsinline loop>
  <source src="@source/docs/Tech/2024-04-07-BrowseStories/img/BrowseStories_2.mp4" type="video/mp4">
</video>

Storybook은 확장 가능합니다. 풍부한 애드온 생태계를 통해 이야기를 테스트, 문서화 및 최적화할 수 있습니다. 또한 워크플로 요구 사항을 충족시키기 위한 애드온을 만들 수도 있습니다. 자세한 내용은 애드온 섹션을 참조하세요.



다음 장에서는 Storybook에서 구성 요소를 렌더링하여 구성 요소 개발에 엄청난 힘을 불어넣을 예정입니다.

## 스토리를 사용하여 UI 구축하기

앱을 개발할 때 가장 큰 어려움 중 하나는 코드베이스에 이미 존재하는 UI 조각을 찾고 새로운 기능에 활용하는 방법을 찾는 것입니다.

Storybook은 모든 구성 요소와 사용 사례를 카탈로그화합니다. 따라서 찾고 있는 내용을 빠르게 찾아볼 수 있습니다.



여기 작업흐름을 살펴보세요:

- 🗃 사이드바를 사용하여 적합한 컴포넌트를 찾습니다.
- 👀 해당 컴포넌트의 스토리를 검토하여 필요에 맞는 변형을 선택합니다.
- 📝 스토리 정의를 앱 코드로 복사/붙여넣기하고 데이터와 연결합니다.

스토리 정의는 stories 파일에서 확인하거나 Storysource 애드온이나 Docs 애드온을 사용하여 Storybook에 공개할 수 있습니다.

![스토리 찾기](/assets/img/BrowseStories_3.png)