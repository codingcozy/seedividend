---
title: "리액트, Nextjs 및 Tailwind CSS를 사용하여 반응형 애니메이션 사이드바 만들기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Create a Responsive Animated Sidebar Using React   Nextjs and Tailwind CSS"
link: "https://medium.com/designly/create-a-responsive-animated-sidebar-using-react-next-js-and-tailwind-css-bd5a0f42f103"
isUpdated: true
---





![CreateaResponsiveAnimatedSidebarUsingReact-NextjsandTailwindCSS](/assets/img/CreateaResponsiveAnimatedSidebarUsingReact-NextjsandTailwindCSS_0.png)

대부분의 디자인 시스템에는 Material UI와 Ant Design와 같이 애니메이션 슬라이딩 사이드바를 만들 수 있는 드로어 유사 요소가 있지만, 많은 사람들, 그 중에는 저도 포함하여 이러한 디자인 시스템이 제한적이라고 생각합니다. 또한 이러한 시스템은 종속성 코드 베이스에서 많은 오버헤드를 도입합니다.

웹 개발 프로젝트 중 어디에서든, 저는 항상 계층 추상화와 종속성을 제거할 수 있는 곳을 찾고 있습니다, 특히 추상화 계층이 생성하는 기본 작업이 비교적 간단한 경우에는 더욱 그렇습니다. 잘하는 소식은, 반응형 사이드바가 그 중 하나라는 것입니다! 🤗

이 튜토리얼에서는 Tailwind CSS와 Next.js의 파워를 활용하여 다른 종속성 없이도 휴대폰에 반응하는 간단하고 우아한 사이드바를 만드는 방법을 안내하겠습니다. (이 예제에서는 react-icons를 사용하지만 다른 것을 사용해도 됩니다.)

<div class="content-ad"></div>

우리가 해야 할 첫 번째 일은 components 폴더 안에 Layout이라는 폴더를 만드는 것입니다. 이 폴더에는 사이드바, 모바일 메뉴 바 및 메인 레이아웃 컴포넌트를 렌더링하는 데 필요한 모든 컴포넌트가 들어갈 것입니다.

다음으로, 사이드바 컴포넌트를 만들어 봅시다:

자, 이제 이 부분을 자세히 살펴보겠습니다. 이 컴포넌트는 show와 setter라는 두 가지 props를 받습니다. 이 props들은 나중에 정의할 HOC Layout에서 전달됩니다. show prop은 사이드바의 가시성 상태를 전환하는 부울 변수입니다. setter prop은 그 상태를 설정하는 함수입니다.

다음으로 우리는 기본 클래스와 appendClass라는 또 다른 변수를 정의합니다. 이 변수는 show 상태 변수에 따라 조건부로 렌더링될 것입니다. show가 false인 경우 왼쪽 여백을 -250px로 설정하지만, 중간 화면 이상인 경우 0으로 설정합니다. base 클래스에는 우리의 base 클래스에 transition 속성을 [margin-left]라는 사용자 정의 값으로 설정합니다. 이는 브라우저가 사이드바를 슬라이드 애니메이션으로 자동으로 표현하도록 만드는 마법 같은 기능입니다! 😁

<div class="content-ad"></div>

그럼 `MenuItem`이라는 하위 구성 요소를 정의해보겠습니다. 이 구성 요소는 링크에 사용될 것입니다. `next/router`를 사용하여 활성 상태인 링크를 결정합니다. 또한 메뉴 항목을 클릭하면 사이드바를 닫도록 설정하는 함수를 토글합니다. 이것은 이 앱이 싱글 페이지 앱이기 때문에 링크를 클릭할 때 사이드바가 열려 있으면 귀찮을 것이기 때문입니다.

마지막으로 `ModalOverlay`가 있습니다. 이 구성 요소는 두 가지 목적을 제공합니다: 1.) 사이드바가 열려 있는 동안 배경을 클릭하는 것을 방지하고, 2.) 사이드바의 닫기 버튼 역할을 합니다. 추가로 별도의 보이는 닫기 버튼을 추가할 수도 있지만, 저는 터치 기능이 모바일 UI의 외부 경계 영역에서 자연스럽고 직관적인 기능이기 때문에 포함하지 않기로 결정했습니다.

자, 이제 중간 브레이크포인트보다 작은 화면에서만 표시되는 모바일 메뉴 바 구성 요소를 만들어보겠습니다:

이 구성 요소는 모바일 장치에서만 화면 위쪽에 고정된 위치를 가집니다. 주로 사이드바 열기 버튼으로 사용됩니다. 로그인 버튼을 그냥 예시로 대칭을 맞추기 위해 거기에 놓았습니다. 이 구성 요소에는 우리의 `showSidebar` 상태의 setter 함수만 전달하면 됩니다.

<div class="content-ad"></div>

마지막으로, 모든 것을 함께 묶는 레이아웃 컴포넌트를 생성해 봅시다:

여기서 showSidebar 상태 변수를 정의하는 곳입니다. 그런 다음에 우리는 `MenuBarMobile`과 `Sidebar`로 전달합니다.

제 글을 읽어주셔서 감사합니다. 유용하게 찾아주셨으면 좋겠네요 (적어도 조금은 재미있었길 바랍니다). 웹 개발, 시스템 관리 및 클라우드 컴퓨팅에 대한 더 많은 유용한 정보를 원하시면 Designly 블로그를 방문해보세요. 댓글을 남겨주시면 정말 기쁠 거예요! 독자들의 생각을 듣는 것을 좋아합니다.

저는 내 고객들의 웹사이트를 호스팅하기 위해 Hostinger를 사용하고 있어요. 비즈니스 계정으로 100개의 웹사이트를 $3.99/월에 호스팅할 수 있는데, 최대 48개월까지 잠길 수 있어요! 최고의 딜이에요. 서비스로는 PHP 호스팅 (확장 포함), MySQL, 워드프레스 및 이메일 서비스가 포함되어 있습니다.

<div class="content-ad"></div>

웹 개발자를 찾고 있나요? 고용 가능합니다! 문의 사항이 있으시면 연락 양식을 작성해주세요.

이 튜토리얼을 위한 자료:

- GitHub 저장소
- 데모 페이지
