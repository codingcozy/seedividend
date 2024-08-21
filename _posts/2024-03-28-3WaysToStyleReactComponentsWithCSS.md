---
title: "React 컴포넌트에 CSS 스타일링하는 3가지 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "3 Ways To Style React Components With CSS"
link: "https://medium.com/towardsdev/3-ways-to-style-react-components-with-css-7411c23c1cbe"
isUpdated: true
---

![React 컴포넌트에 CSS를 적용하는 3가지 방법](/assets/img/3WaysToStyleReactComponentsWithCSS_0.png)

방금 React Js에서 첫 번째 컴포넌트를 만들었고 이제 스타일을 입히고 싶어하지만, 이전에 일반적인 방법으로 평소처럼 index.html 파일을 스타일링하는 것과는 다른 방법임을 깨달았네요 ☹. 이 기사에서 React Js 컴포넌트를 스타일링하는 3가지 다른 방법을 공유하겠습니다.

# 외부 CSS

React 컴포넌트를 스타일링하는 이 방법은 프로젝트 전체에 전역 스타일을 적용하는 데 사용됩니다. 설정 방법은 index.html 파일을 스타일링하는 평소 방법과 상당히 유사합니다. 전역 CSS 파일을 만들어서 그 안에 모든 CSS 스타일을 작성합니다. 그런 다음 index.html 파일의 head 태그 내에서 전통적인 방식을 사용할 겁니다.—

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
<link rel="stylesheet" href="./index.css" />
```

하지만 이를 작동시키기 위해서는 CSS 파일에서 선택자로 사용할 클래스가 컴포넌트에 정의되어 있어야 합니다. 예를 들면 —

```js
function Header() {
  return (
    <header class="header">
      <h1 class="title">My React App</h1>
      <ul class="nav-bar">
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
      </ul>
    </header>
  );
}
export default Header;
```

```js
.header{
 color: red;
 background: #444444;
 padding: 1rem;
 display: flex;
 align-items: center;
 }

.title{font-size: 1.25rem;}
.nav-bar{
 display: flex;
 align-items: center;
 }
```

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

위 방법을 사용하면 모든 CSS 스타일을 하나의 파일에 쉽게 작성할 수 있으며 모든 React 구성 요소에 적용할 수 있습니다. 이 방법은 CSS를 많이 작성하지 않을 작은 프로젝트에 유용합니다. 그러나 많은 구성 요소가 있는 대규모 프로젝트에는 적합하지 않습니다. 왜냐하면 CSS 파일을 유지하는 것이 어렵고 클래스 네이밍으로 시작하고 싶지 않을 겁니다 🤧.

# 모듈형 CSS

이 방법은 구성 요소에 대한 전용 스타일 시트입니다. React 구성 요소를 스타일링하는 가장 일반적인 방법이며 많은 React JS 개발자들이 이 스타일링 방법을 사용합니다. 이 방법은 프로젝트의 각 구성 요소에 대해 별도의 CSS 파일을 생성하는 것을 포함합니다. 위의 헤더 구성 요소를 예로 들면 스타일을 적용하려면 단순히 "Header.module.css"와 같은 CSS 파일을 만들어서 구성 요소 파일 내에서 다음과 같이 스타일을 가져와야 합니다 —

```js
import styles from "./Header.module.css";
```

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

그럼 컴포넌트 함수 내 각 구성 요소에 스타일을 적용하려면 클래스 이름을 “styles.className”으로 바꿔야 합니다. 예를 들어

```js
import styles from "./Button.modules.css";

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>My React App</h1>
      <ul className={styles.navbar}>
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
      </ul>
    </header>
  );
}
export default Header;
```

이 스타일링 방법을 사용하면 해시를 통해 생성된 고유한 클래스 이름으로 인해 네이밍 충돌을 피할 수 있습니다. 이것이 무슨 말인지 알아보려면 브라우저에서 요소를 검사해보세요.

# 인라인 CSS

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

작은 구성 요소에 최소한의 스타일이 적용된 것으로, "좋아요 👍 버튼"과 같은 것에 사용됩니다. 물론 이 내용으로부터 어떤 것을 얻고 있다면 많은 박수 👏👏를 주시면 고맙겠습니다 😏.

CSS 스타일은 구성 요소 함수 내에 작성되며, "background-color"를 "backgroundColor"로 다시 작성하는 등 다른 구문을 사용합니다. 그리고 값은 문자열로 작성됩니다. 예시

```js
function Button() {
  const styles = {
    backgroundColor: "blue",
    color: "gray",
    border: "none",
    borderRadius: "1rem",
    padding: "2rem",
  };
  return <button style={styles}> Click me</button>;
}
export default Button;
```

이 방법은 버튼과 같은 작은 구성 요소에 유용합니다. CSS에서의 이름 충돌을 방지하는 데 도움이 됩니다. 그러나 큰 구성 요소에는 이 방법을 사용하는 것이 권장되지 않습니다. 코드 가독성이 저하될 수 있습니다.

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

제목: React Js 컴포넌트를 CSS로 스타일링하는 3가지 방법

본문: 이렇게 React Js 컴포넌트를 CSS로 스타일링할 수 있는 3가지 방법이었습니다. 이런 글 더 보고 싶으시면 좋아요와 팔로우 눌러주세요.
