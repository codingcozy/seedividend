---
title: "브라우저의 로컬 오버라이드 웹 개발자를 위한 안내"
description: ""
coverImage: "/assets/img/2024-05-17-LocalOverridesintheBrowserGuideforWebDevelopers_0.png"
date: 2024-05-17 21:54
ogImage: 
  url: /assets/img/2024-05-17-LocalOverridesintheBrowserGuideforWebDevelopers_0.png
tag: Tech
originalTitle: "Local Overrides in the Browser: Guide for Web Developers"
link: "https://medium.com/@yaron-galperin/local-overrides-in-the-browser-guide-for-web-developers-aa5fb6b40476"
isUpdated: true
---




때로는 웹 페이지의 내용을 원본 소스 코드에 액세스하지 않고 빠르게 변경해야 할 때가 있습니다. 테스트, 디버깅 또는 브라우징 경험을 사용자 정의하는 경우 등 여러 가지 이유로 그럴 수 있습니다.
이 문서에서는 Local Overrides라는 멋진 도구를 사용하는 방법을 소개하겠습니다.

![Local Overrides in the Browser Guide for Web Developers](/assets/img/2024-05-17-LocalOverridesintheBrowserGuideforWebDevelopers_0.png)

## 그것이 왜 필요한가요?

웹 애플리케이션을 개발할 때 특정 페이지의 다양한 측면을 변경하고 테스트해야 할 때가 있습니다. 변경한 내용을 서빙하기 전에 소스 코드를 수정하고 애플리케이션 파일을 재구축하는 옵션이 있습니다. 또 다른 방법으로는 실시간으로 코드를 수정하고 원하는 결과를 얻을 때까지 코드베이스를 변경하지 않고 변경 사항을 즉시 테스트할 수 있습니다.
이 도구를 사용하면 다음과 같은 작업이 가능합니다:

<div class="content-ad"></div>

- 피드백 — 실제 소스 파일을 수정하거나 웹사이트를 다시 배포할 필요 없이 실시간으로 변경 사항 확인 가능합니다.
- 실험 — 다양한 스타일, 스크립트 및 HTML로 신속한 실험 가능합니다.
- 문제 분리 및 오류 수정 — 브라우저에서 직접 작은 문제를 해결하고 테스트한 후 소스 코드에 적용 가능합니다.
- 데모 관점 — 코드베이스에 영향을주지 않고 데모 중에 고객 요구 사항을 일시적으로 사용자 정의할 수 있습니다.

그리고 그 이외 많은 기능들이 있습니다!

## 이 멋진 도구와 상호 작용하는 방법은 무엇인가요?

시작하려면 모든 파일을 저장할 오버라이드 폴더를 설정해야 합니다. "Sources" 탭을 클릭하고 왼쪽 사이드바에서 "Overrides"를 선택하세요.

<div class="content-ad"></div>


![image 1](/assets/img/2024-05-17-LocalOverridesintheBrowserGuideforWebDevelopers_1.png)

다음 단계는 '오버라이드를 위한 폴더 선택'을 클릭하여 오버라이드 파일을 호스팅할 폴더를 선택하거나 새로 만드는 것입니다. "chrome_overrides"라는 새 폴더를 만들었습니다.
DevTools는 선택한 폴더에 대한 전체 액세스 권한을 요청하여 디스크에 쓰고 해당 폴더 내의 콘텐츠를 저장할 수 있습니다.

![image 2](/assets/img/2024-05-17-LocalOverridesintheBrowserGuideforWebDevelopers_2.png)

참고: Pokemon 웹 사이트에서 보여드리겠지만, 원하는 웹 사이트를 자유롭게 사용해도 괜찮습니다.
링크: https://pokemon-kde6.vercel.app


<div class="content-ad"></div>

웹 사이트의 리소스를 편집하려면 DevTools를 열고 "네트워크" 탭으로 이동하십시오 (네트워크 탭은 단순히 예시입니다. 다른 곳에서도 DevTools 내에서 콘텐츠를 재정의할 수 있습니다. 예를 들어 소스 -` 페이지에서), 그런 다음 편집하려는 리소스를 선택하십시오. 제 경우에는 변경 사항을 적용하기 전에 응용 프로그램에서 시험하고 싶어서 수정을 원합니다. CSS 파일을 선택합니다 (어떤 파일이든 될 수 있지만, CSS 파일을 선택했습니다). 이 파일을 마우스 오른쪽 버튼으로 클릭하고 나타나는 메뉴에서 "콘텐츠 재정의"를 선택하십시오.

![이미지](/assets/img/2024-05-17-LocalOverridesintheBrowserGuideforWebDevelopers_3.png)

"콘텐츠 재정의"를 클릭한 후에는 DevTools의 "네트워크" 탭이 저장된 리소스와 함께 "소스" 탭으로 리디렉션됩니다.

![이미지](/assets/img/2024-05-17-LocalOverridesintheBrowserGuideforWebDevelopers_4.png)

<div class="content-ad"></div>

지금은, 주요 색상을 변경해보려고 해요. 화면에 변경 사항이 반영되는 것을 확인해 볼까요?

Before:

![Image](/assets/img/2024-05-17-LocalOverridesintheBrowserGuideforWebDevelopers_5.png)

After:

<div class="content-ad"></div>


![이미지](/assets/img/2024-05-17-LocalOverridesintheBrowserGuideforWebDevelopers_6.png)

변경 사항이 보이시나요?
참고: 변경을 완료한 후에는 반드시 저장을 잊지 마세요.

페이지를 새로 고칠 때 웹 사이트 파일을 가져오면 재작성된 내용이 우선합니다. 변경 사항이 더 이상 필요하지 않거나 서버에서 원래 파일을 가져오고 싶다면 "로컬 재정의 활성화"를 해제하면 됩니다.

![이미지](/assets/img/2024-05-17-LocalOverridesintheBrowserGuideforWebDevelopers_7.png)

<div class="content-ad"></div>

## 요약:

로컬 오버라이드를 사용하는 것은 여러 가지 이점이 있습니다. 여기에 몇 가지를 살펴보겠습니다:

- 로컬 개발 및 테스트 — 즉각적인 피드백 및 실험.
- 디버깅 및 문제 해결 — 문제 분리와 오류 수정에 도움이 됨.
- 고객 데모용 맞춤화 — 임시 맞춤화로 고객 요구 사항 충족.

이 게시물에 소중한 시간을 투자해 주셔서 감사합니다. 읽으시는 동안 즐거워하셨기를 바랍니다.
즐거운 코딩하세요!