---
title: "React Router 6에서 useNavigate 사용하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Using useNavigate in React Router 6 A Complete Guide"
link: "https://medium.com/@bobjunior542/using-usenavigate-in-react-router-6-a-complete-guide-46f51403f430"
isUpdated: true
---

![이미지](/assets/img/UsinguseNavigateinReactRouter6ACompleteGuide_0.png)

React Router은 React 애플리케이션을 위한 인기 있는 라우팅 라이브러리입니다. 라우팅을 위한 선언적 API를 제공하여 페이지 간 탐색 및 URL 변경을 쉽게 처리할 수 있습니다. React Router의 6버전에서 useHistory와 useLocation 훅을 대체하는 useNavigate라는 새로운 훅이 소개되었습니다. 이 글에서 React 애플리케이션에서 페이지 간 탐색을 어떻게 처리하는지 알아보겠습니다.

# useNavigate란 무엇인가요?

useNavigate 훅은 React Router 6의 새로운 기능입니다. 이전 버전의 React Router에서 useHistory와 useLocation 훅을 대체합니다. useNavigate 훅은 React 애플리케이션에서 페이지 간 탐색을 위한 간단하고 직관적인 API를 제공합니다. 함수형 컴포넌트와 훅과 함께 사용할 수 있도록 설계되었으며, 애플리케이션에서 URL 변경을 처리하는 과정을 간소화합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# React 애플리케이션에서 useNavigate 사용 방법

useNavigate를 사용하려면 먼저 React Router 6를 설치하고 프로젝트에 추가해야 합니다:

```js
npm install react-router-dom
```

React Router 6를 설치한 후에는 react-router-dom 패키지에서 useNavigate 훅을 가져올 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import { useNavigate } from "react-router-dom";
```

함수 컴포넌트 내에서 페이지를 이동할 수 있는 useNavigate 훅을 사용할 수 있습니다:

```js
function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/other-page");
  };

  return <button onClick={handleClick}>다른 페이지로 이동</button>;
}
```

이 예제에서는 useNavigate 훅을 사용하여 다른 페이지로 이동할 수 있는 navigate 함수를 생성합니다. 그리고 버튼을 클릭했을 때 handleClick 함수 내에서 /other-page URL로 이동하도록 navigate 함수를 사용합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

navigate 함수는 두 번째 매개변수로 옵션 객체를 전달받아 네비게이션 동작을 제어할 수도 있습니다. 예를 들어, replace 옵션을 사용하여 현재 URL을 히스토리 스택에 새 항목을 추가하는 대신 바꿀 수 있습니다:

```js
function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/other-page", { replace: true });
  };

  return <button onClick={handleClick}>다른 페이지로 이동</button>;
}
```

이 예제에서는 replace 옵션을 사용하여 현재 URL을 히스토리 스택에 새 항목을 추가하는 대신 교체합니다. 이 방법은 새 항목을 히스토리 스택에 추가하지 않고 새 페이지로 이동하고 싶을 때 유용합니다.

# 결론

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

`useNavigate` 훅은 React 애플리케이션에서 페이지 간 이동하는 강력하고 직관적인 방법입니다. URL 변경을 처리하는 과정을 간소화하고 페이지 간 이동을 위한 일관된 API를 제공합니다. `useNavigate` 훅을 사용하면 애플리케이션의 사용자 경험을 개선하고 라우팅 코드를 유지하기 쉽게 만들 수 있습니다.

---

나의 설정:

💻 Apple 2023 맥북 프로 M2 — https://amzn.to/3N4uuQA

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

⌨️ Apple Magic Keyboard — https://amzn.to/40yo8vM

🖱 Apple Magic Mouse — https://amzn.to/40szCkx

🎧 Beats by Dr. Dre Studio3 — https://amzn.to/3mUxgx8
