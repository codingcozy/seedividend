---
title: "HTML에서 클래스 이름을 정하는 방법  클린 코드 가이드"
description: ""
coverImage: "/assets/img/2024-07-09-HowshouldclassnamingbeinHTMLCleanCode_0.png"
date: 2024-07-09 18:38
ogImage:
  url: /assets/img/2024-07-09-HowshouldclassnamingbeinHTMLCleanCode_0.png
tag: Tech
originalTitle: "How should class naming be in HTML? — Clean Code."
link: "https://medium.com/@erennaktas/how-should-class-naming-be-in-html-clean-code-8703425a1c3e"
---

<img src="/assets/img/2024-07-09-HowshouldclassnamingbeinHTMLCleanCode_0.png" />

많은 개발자들이 개발 단계에서 네이밍에 상당한 시간을 할애할 수 있습니다. 사실, 어떤 사람들에게는 코딩 자체보다 네이밍에 더 많은 시간을 쏟게 되는 상황이 될 수도 있습니다. 클래스, 아이디, 함수, 변수 및 파일과 같은 요소들을 네이밍할 때 프로젝트 내의 목적을 정확하게 반영하는 서술적이고 의미 있는, 간결하고 일관된 이름을 사용하는 것이 매우 중요하기 때문입니다.

하지만 왜 이렇게 이름을 지어야 할까요?

- 작성된 코드가 더 읽기 쉽고 이해하기 쉬워진다. 우리 팀원이나 다른 팀의 개발자들도 코드 블록을 쉽게 이해할 수 있어 협업과 유지보수 과정이 개선됩니다.
- 적절한 네이밍은 프로젝트 내에서 일관성을 유지함으로써 프로젝트가 성장할수록 네이밍 프로세스를 간편화합니다.
- CSS 파일이 더 조직화되어 관리 및 의미 있는 이름이 붙은 클래스를 찾는 것이 더 편리해집니다.
- 외부 라이브러리를 사용할 때 네이밍 충돌을 방지합니다.
- SEO(검색 엔진 최적화) 및 접근성에 도움이 됩니다.
- DRY(중복을 배제하자) 원칙을 준수하여 코드 중복을 방지합니다.
- 대규모 프로젝트에서는 새로운 영역, 기능 및 디자인 개선을 계속해서 추가합니다. 적절한 네이밍은 이러한 변경에 대한 더 나은 적응을 용이하게 하며 코드 업데이트의 원활한 진행을 보장합니다.

<div class="content-ad"></div>

소프트웨어 개발에서 '클린 코드'라는 중요한 개념이 있습니다. 이는 코드의 가독성, 이해하기 쉬움, 유지보수성 및 조직화를 강조합니다. 적절한 명명은 클린 코드의 중요한 부분이며 클린 코드 원칙을 준수하는 것은 정확한 명명으로 시작합니다.

그래서 웹 사이트의 프레임워크를 구축할 수 있는 HTML 클래스를 어떻게 명명해야 할까요?

- 클래스 이름은 소문자로 작성되어야 하며 하이픈(-)이나 언더스코어(\_)로 구분되어야 합니다.

```js
<div class=”header-block”></div>
<div class="header_block"></div>

<!-- 하이픈(-)으로 구분되지 않은 경우, 이것들은 두 개의 별도 클래스 이름으로 정의됩니다. -->

<div class="header block"></div>

<!-- 이 세 개의 div는 완전히 서로 다릅니다. -->
```

<div class="content-ad"></div>

- 영어 외의 다른 언어는 사용하지 말아주세요. 또한 camelCase 명명 규칙을 피해주세요. CamelCase는 단어의 첫 글자가 소문자이고, 이후 단어들의 첫 글자가 대문자인 명명규칙입니다.

```js
<div class=”başlık-alanı”></div>
<div class="headerBlock"></div>
<div class="başlıkAlanı"></div>

<!-- 위 예제처럼 사용해서는 절대 안 됩니다. -->

<!-- 올바른 사용법은 다음과 같습니다: -->

<div class="header-block"></div>
```

- CamelCase 명명 규칙은 필요한 HTML 요소에 ID를 할당할 때 사용됩니다.

```js
<div id=”sendButton”></div>
```

<div class="content-ad"></div>

- 특정하고 설명적이어야 하며, 적용된 영역의 목적을 명확히 정의해야 합니다.

<article class="article-content"></article>
<nav class="menu-block"></nav>
<div class="post-date"></div>

- 지나치게 긴 네이밍 규칙을 피하고 간결하고 명확하게 유지해야 합니다.

<div class="authentication-block-container-area"></div>
<div class="frequently-asked-questions-area"></div>

<!-- 다음과 같이 사용하는 것이 더 적절합니다:  -->

<div class="authentication-block"></div>
<div class="auth-block"></div>
<div class="faq-area"></div>

<div class="content-ad"></div>

- 다른 문맥의 개발자들이 이해하기 어렵다고 판단할 정도로 너무 짧은 명명 규칙은 피하세요.

```js
<div class="lg-cn"></div>
<div class="ar-co"></div>

<!-- 다음과 같은 형태로 사용할 수 있습니다: -->

<div class="login-content"></div>
<div class="article-content"></div>
```

- 여러 곳에서 사용될 수 있는 일반적인 이름은 단독으로 사용하면 안됩니다.

```js
<div class="blue"></div>
<div class="right"></div>
<div class="back"></div>

<!-- 다음과 같은 방식으로 사용하는 것이 더 적절합니다: -->

<div class="blue-btn"></div>
<div class="content-right"></div>
<div class="back-item"></div>
```

<div class="content-ad"></div>

그래서 이런 권장 내용의 근간이 뭘까요? 왜 이런 방식으로 요소들을 명명해야 할까요?

- 어떤 브라우저나 플랫폼에서는 대소문자를 구분하는 차이가 발생할 수 있습니다. 따라서 클래스 이름에 소문자를 일관되게 사용하면 잠재적인, 예기치 못한 문제를 방지할 수 있습니다.
- 소프트웨어 언어는 보편적이고 영어이기 때문에 터키어로 명명하지 않습니다. 영어 이외의 언어를 사용하면 언어 및 대소문자에 기반한 문자 차이로 인한 문제가 발생할 수 있습니다. 이전에 언급된 문제와 유사한 문제가 생길 수 있습니다.
- CamelCase는 널리 받아들여진 명명 규칙이며, 클래스 이름뿐만 아니라 ID, 변수, 함수 이름에서도 선호됩니다.
- 특히 대형 프로젝트에서 CSS와 함께 사용될 때, 긴 명명 규칙은 파일 크기를 증가시키고, 성능에 부정적인 영향을 미칠 수 있습니다. 또한, 긴 이름은 코드를 이해하기 어렵게 만들고 개발 과정을 늦출 수 있습니다.
- 매우 짧은 이름은 혼란을 야기하고 문자 수가 적어 사용성이 제한되어 개발 과정에서 일관성이 떨어지게 됩니다.
- ".left .red"와 같은 명명 규칙은 단독으로 사용할 때는 의미가 명확하지 않습니다. 게다가 이를 서로 다른 맥락에서 사용할 수 있으며, 이로 인해 CSS 코드가 복잡해질 수 있습니다.

위에서 언급된 상황들은 웹 개발 커뮤니티의 습관, 구체적 라이브러리 기대치 및 HTML, CSS 표준을 준수하여 설정된 규칙입니다. 일반적인 사용은 이러한 규칙에 맞지만, 강제되는 것은 아닙니다.

명명 규칙은 코드 가독성을 향상시키고, 프로젝트 내 일관성 유지, 조직을 제공하며, 오류 발생 가능성을 감소시키고, 팀 내 효율적인 협업을 용이하게 합니다.

<div class="content-ad"></div>

W3C 문서에 액세스해서 웹 세계의 표준을 정의한 HTML과 관련된 문서를 확인할 수 있습니다.

이 모든 것을 설명한 후, 간단한 예제 코드 블록으로 이 기사를 마무리하겠습니다.

```js
<header class="header-container">
  <div class="logo-block">
    <h1>World of the Web</h1>
  </div>
  <nav class="menu-block">
    <ul>
      <li>
        <a href="/">Subscribe</a>
      </li>
      <li>
        <a href="/">My</a>
      </li>
      <li>
        <a href="youtube.com/@worldoftheweb">Youtube</a>
      </li>
      <li>
        <a href="/">Channel</a>
      </li>
    </ul>
  </nav>
  <div class="login-btn">
    <span>Subscribe</span>
  </div>
</header>
```

웹 개발에 관한 통찰력 있는 콘텐츠를 공유할 뿐만 아니라 계속 발전하는 웹 세계의 매력적인 동태와 기술을 탐험하는 내 YouTube 채널에 모두 따뜻하게 초대합니다.

<div class="content-ad"></div>

Twitter - Linkedin - Youtube

저희 기사에서 참고한 소스는:

W3C

Freecodecamp

<div class="content-ad"></div>

웹의 세계

사용 가능 여부
