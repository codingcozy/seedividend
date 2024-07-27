---
title: "자바스크립트로 인터랙티브 웹 애플리케이션 구축하는 방법"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-09-DeBuildingInteractiveWebApplicationswithJavaScript_0.png"
date: 2024-07-09 14:16
ogImage:
  url: /assets/img/2024-07-09-DeBuildingInteractiveWebApplicationswithJavaScript_0.png
tag: Tech
originalTitle: "DeBuilding Interactive Web Applications with JavaScript"
link: "https://medium.com/@rajataha062/building-interactive-web-applications-with-javascript-c805159d720c"
---

프론트엔드 개발자로서, 최근 나는 JavaScript 스킬을 더 깊게 키우기 위해 두 가지 대화형 웹 애플리케이션을 만들었습니다: GitHub 프로필 웹사이트와 할 일 앱입니다. 이 글에서는 이러한 프로젝트를 구축하는 과정을 안내하면서 JavaScript의 웹 개발에서의 강력함을 보여주는 주요 기능과 기능을 강조하겠습니다.

# GitHub 프로필 웹사이트 - GitHub API 사용

# 개요 및 목표

GitHub 프로필 웹사이트 프로젝트는 GitHub API를 활용하여 사용자 프로필을 동적으로 가져와 표시하는 것을 목표로했습니다. 이를 통해 실시간 데이터를 제공할 뿐만 아니라 비동기 JavaScript, DOM 조작 및 API 통합을 연습할 수 있었습니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

![Image](/ui-log-2/assets/img/2024-07-09-DeBuildingInteractiveWebApplicationswithJavaScript_0.png)

# 주요 구현 사항

- API 통합: GitHub의 REST API를 활용하여 프로필 사진, 소개, 저장소 및 팔로워와 같은 사용자 데이터를 가져옵니다.

```js
async function fetchGitHubProfile(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  return data;
}
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

2. DOM 조작: JavaScript를 사용하여 웹 페이지에 동적으로 가져온 데이터를 렌더링하는 것입니다.

```js
function renderUserProfile(user) {
  // 사용자 프로필 세부 정보를 표시하기 위한 DOM 조작
}
```

3. 반응형 디자인: CSS Grid 및 Flexbox를 사용하여 웹 사이트가 모바일에 적합하고 다양한 화면 크기에 적응하도록 보장하는 것입니다.

# 사용자 경험 및 배운 점

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

깃허브 프로필 웹사이트는 내 기술적 능력을 향상시키는 데 도움이 되었을 뿐만 아니라 프론트엔드 개발에서 사용자 경험(UX) 디자인과 데이터 시각화의 중요성을 강조했습니다. API 응답 처리, 오류 처리, 성능 최적화를 통해 더 부드러운 사용자 상호작용을 위한 통찰력을 제공했습니다.

프로젝트 링크:

Bytewise-MERN-Fellowship/Week-04/Task-03/GitHub Profile App at main · raja-taha/Bytewise-MERN-Fellowship

# 자바스크립트로 한 To-Do 앱

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

# 개요 및 목표

To-Do 앱 프로젝트는 베니라 자바스크립트를 사용하여 간단하면서 기능적인 작업 관리 도구를 만드는 것을 목표로 했습니다. 핵심 기능으로는 할 일 추가, 편집, 삭제, 완료된 작업으로 표시하는 기능이 포함되어 있습니다.

![To-Do App](/ui-log-2/assets/img/2024-07-09-DeBuildingInteractiveWebApplicationswithJavaScript_1.png)

# 구현 핵심내용

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

- 상태 관리: 배열과 객체를 사용하여 애플리케이션 내의 작업 및 상태를 관리합니다.

```js
let tasks = [
  { id: 1, task: "Medium 기사 완료하기", completed: false },
  // 다른 작업들
];
```

2. 이벤트 처리: 사용자 상호작용을 위해 작업 추가, 작업 설명 편집 및 작업 삭제와 같은 이벤트 리스너를 구현합니다.

```js
addTaskButton.addEventListener("click", addTask);
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

3. 로컬 스토리지: 브라우저의 localStorage API를 사용하여 작업 데이터를 로컬에 지속 저장하여 세션 간 데이터 보존을 실현합니다.

```js
localStorage.setItem("tasks", JSON.stringify(tasks));
```

# 사용자 경험과 배운 점

할 일 앱을 개발하면서 JavaScript 함수, 이벤트 주도 프로그래밍, 웹 애플리케이션에서의 접근성과 사용성의 중요성을 보다 명확히 이해하게 되었습니다. 또한 프론트엔드 개발에서 데이터 지속성과 CRUD 작업 등 기본 개념에 대해 알아가는 계기가 되었습니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

프로젝트 링크:

Bytewise-MERN-Fellowship/Week-04/Task-05 at main · raja-taha/Bytewise-MERN-Fellowship (github.com)

# 결론

자바스크립트로 이러한 대화형 웹 애플리케이션을 구축하는 것은 보람 있는 경험이었어요. 여기서 이론적인 지식을 실제 프로젝트에 적용할 수 있어서 좋았습니다. API 통합과 DOM 조작, 반응형 디자인 및 로컬 스토리지까지, 각 프로젝트는 독특한 과제와 학습 기회를 제공했어요. 앞으로는 더 많은 기술을 배우고 새로운 기술을 탐험하여 더 많은 영향력 있는 웹 경험을 만들기를 기대하고 있습니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

만약 이 프로젝트들의 어떤 측면에 대해 더 자세히 알고 싶거나 질문이 있으면 언제든지 연락해주세요! 즐거운 코딩하세요!
