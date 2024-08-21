---
title: "HTML과 CSS만으로 햄버거 메뉴 만들기 방법"
description: ""
coverImage: "/assets/img/2024-07-09-HamburgerMenuHTMLandCSSonly_0.png"
date: 2024-07-09 18:41
ogImage:
  url: /assets/img/2024-07-09-HamburgerMenuHTMLandCSSonly_0.png
tag: Tech
originalTitle: "Hamburger Menu — HTML and CSS only"
link: "https://medium.com/@mateus2050/hamburguer-menu-html-and-css-only-c06364fa9bfd"
isUpdated: true
---

![이미지](/assets/img/2024-07-09-HamburgerMenuHTMLandCSSonly_0.png)

# 개요

본 문서는 HTML과 CSS만을 사용하여 햄버거 메뉴를 만드는 단계별 안내를 제공합니다. 햄버거 메뉴는 웹사이트에서 모바일 친화적인 네비게이션을 만드는 인기 있는 방법이며, 본 안내서는 JavaScript 없이 사이트에 구현하는 간단하고 효과적인 방법을 제공합니다.

이 문서는 HTML과 CSS를 사용하여 모바일 친화적인 네비게이션 메뉴를 만들고자 하는 웹 개발자들에게 훌륭한 자료입니다. 단계별 안내와 실용적인 코드 예제를 통해, 모든 기기에서 멋지게 보이고 매끄럽게 작동하는 햄버거 메뉴를 만드는 간단하고 효과적인 접근 방식을 제공합니다.

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

## 주요 HTML

```js
<div id="menuToggle">
  <input type="checkbox" />
  <span></span>
  <span></span>
  <span></span>
</div>
```

- 코드는 "menuToggle"이라는 ID를 가진 div 요소로 시작됩니다: `div id="menuToggle"`
- div 요소 내부에 "checkbox" 타입을 가진 input 요소가 있습니다: `input type="checkbox" /`
- input 요소 다음에는 세 개의 span 요소가 있습니다. 이 span 요소들은 햄버거 메뉴 아이콘을 구성하는 세 줄을 만들기 위해 사용됩니다. span 요소들은 비어 있습니다: ` span``/span `
- "checkbox" 타입을 가진 input 요소는 메뉴의 가시성을 전환하기 위해 사용됩니다. 체크박스가 선택되면 메뉴가 표시되고 선택이 해제되면 메뉴가 숨겨집니다.

## 주요 CSS

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

- 먼저 menuToggle div의 위치를 상대 위치로 설정하고 z-index를 1로 설정합니다.

```js
#menuToggle {
  position: relative;
  z-index: 1;
}
```

2. 두 번째로 체크박스를 숨기고 햄버거 메뉴 위에 배치할 것입니다. 체크박스의 불투명도(opacity)를 0으로 설정하여 체크박스를 숨길 수 있지만 여전히 기능을 사용할 수 있습니다. 또한, 체크박스의 z-index가 햄버거 메뉴의 z-index보다 큰지 확인하여 여전히 체크박스를 클릭할 수 있도록 합니다.

```js
#menuToggle input {
  position: absolute;
  width: 40px;
  cursor: pointer;
  opacity: 0;
  z-index: 2; /* 체크박스를 햄버거 메뉴 위에 배치하기 위해 */
  -webkit-touch-callout: none;
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

3. #menuToggle div 요소 내의 input 요소에 -webkit-touch-callout: none이 적용됩니다. 이는 사용자가 햄버거 메뉴 아이콘을 터치하고 누르면 콜아웃이 나타나지 않도록 하기 위해 수행됩니다.

4. 이제 span 태그를 스타일링할 것입니다.

```js
#menuToggle span {
  display: block; /* 각 span 요소가 자체 라인을 차지하도록 함. */
  width: 33px;
  height: 4px;
  margin-bottom: 5px; /* span 요소 사이에 간격 생성. */
  position: relative; /* 부모 div에 대한 위치 변경을 허용. */
  background: #cdcdcd;
  border-radius: 3px;
  z-index: 1; /* span 요소가 체크박스 아래에 있도록 보장. */
}
```

## 애니메이션 CSS

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

- #menuToggle span에 transform-origin 및 transition 속성을 추가할 예정입니다. transition 속성은 cubic-bezier 타이밍 함수를 사용하여 0.5초 동안 transform, 배경 및 opacity 속성의 변화를 애니메이션화합니다.

```js
#menuToggle span {
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
    background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
  transform-origin: 4px 0px; /* 위의 transform 속성의 회전 중심을 지정하려면 4px 0px로 설정합니다. */
}
```

2. 각 span 태그를 애니메이션화하기 위해 각각을 하나씩 살펴볼 것입니다. 요소에 45도 회전과 좌로 -2픽셀, 상으로 -1픽셀의 이동 변환을 적용하여 닫기 버튼처럼 보이도록 만들 것입니다.

```js
#menuToggle span:first-child {
  transform-origin: 0% 0%; /* transform 속성의 원점을 요소의 좌상단으로 설정합니다. */
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

```js
#menuToggle span:nth-last-child(2) {
  transform-origin: 0% 100%; /*transform 속성의 원점을 요소의 왼쪽 하단 모서리로 설정합니다.*/
}
```

```js
#menuToggle input:checked ~ span {/* #menuToggle 요소 내에서 체크된 input 요소 뒤에 오는 모든 span 요소를 선택합니다. */
  opacity: 1;
  transform: rotate(45deg) translate(-2px, -1px);
  background: #232323;
}
#menuToggle input:checked ~ span:nth-last-child(2) {
  transform: rotate(-45deg) translate(0, -1px);
}
```

3. 햄버거 메뉴를 클릭했을 때 span 요소를 닫기 버튼으로 변환하므로, 한 span을 제거해야 합니다.

```js
#menuToggle input:checked ~ span:nth-last-child(3) { /* #menuToggle 요소 내에서 체크된 input 요소 뒤에 오는 마지막 세 번째 span 요소를 선택합니다. */
  opacity: 0; /* 요소의 투명도를 0으로 설정하여 보이지 않게 합니다. */
  transform: rotate(0deg) scale(0.2, 0.2); /* 요소에 0도 회전과 0.2의 크기로 변환을 적용하여 매우 작고 보이지 않게 합니다. */
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

## HTML 목록

- menuToggle div에 다음 코드를 추가하십시오. 이것은 거품 메뉴를 클릭할 때 팝업되는 메뉴입니다.

```js
<div id="menuToggle">
  <input type="checkbox" />
  <span></span>
  <span></span>
  <span></span>
  <ul id="menu">
    <a href="#">
      <li>홈</li>
    </a>
    <a href="#">
      <li>쇼핑</li>
    </a>
    <a href="#">
      <li>교환</li>
    </a>
    <a href="#">
      <li>연락처</li>
    </a>
    <a href="#">
      <li>소개</li>
    </a>
    <a href="#">
      <li>로그인 / 회원가입</li>
    </a>
    <a href="#">
      <li>보기 카트</li>
    </a>
  </ul>
</div>
```

## 목록 스타일링

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

- 목록을 스타일링하기 위해 먼저 위치를 절대값으로 설정하고 왼쪽 가장자리와 #menuToggle div의 왼쪽 가장자리 사이의 거리를 설정합니다. -300px의 값은 메뉴를 뷰포트 왼쪽 가장자리 외부에 숨깁니다.
- 그런 다음 왼쪽 속성에 대한 전환 효과를 추가합니다. 이렇게 하면 메뉴가 왼쪽에서 슬라이드되어 들어올 때 부드러운 애니메이션이 생성됩니다.

```js
#menu {
  position: absolute; /* 메뉴를 콘텐츠 위에 배치할 수 있습니다. */
  left: -300px; /* 이 속성은 메뉴를 뷰포트 외부로 이동시킵니다. */
  top: 80px; /* 이 속성은 메뉴의 상단 가장자리와 #menuToggle div의 상단 가장자리 사이의 거리를 설정합니다. */
  width: 200px;
  margin: -100px 0 0 -50px; /* 음수 마진 값은 메뉴를 위쪽 및 왼쪽으로 이동하여 #menuToggle div 내에서 수직 및 수평 중앙에 배치하는 데 사용됩니다. */
  padding: 50px;
  padding-top: 125px;
  background: #ededed;
  list-style-type: none; /* 목록의 기본 글머리 기호를 제거합니다. */
  -webkit-font-smoothing: antialiased; /* 웹킷 브라우저의 글꼴 부드럽게 표시를 설정합니다. */

  transition: left 0.5s; /* 왼쪽 속성에 대한 전환 효과를 설정합니다. 이렇게 하면 메뉴가 왼쪽에서 슬라이드되어 나타날 때 부드러운 애니메이션이 생성됩니다. */
}

#menu li {
  padding: 10px 0;
  font-size: 22px;
}
```

3. 마지막으로 #menuToggle 컨테이너 내부의 ulelement에 대한 스타일 규칙을 추가합니다. 이 규칙은 #menuToggle 내부의 입력 요소가 확인될 때에만 적용됩니다. 이 규칙은 ulelement의 left 속성을 40px로 설정하여 이전에 적용된 left를 취소합니다. 이전 left(-300px)는 메뉴를 뷰포트 왼쪽 가장자리로 이동시키기 위해 사용되었습니다. 입력 요소가 확인되면(해당 햄버거 메뉴를 클릭했다는 것을 의미), 새 규칙은 left를 기본 값인 40px로 다시 설정하여 메뉴가 화면에 표시됩니다. 전환 속성도 사용되어 메뉴의 나타남을 부드럽게 애니메이션화하여 0.5초 동안 부드럽게 슬라이드되게 합니다.

```js
#menuToggle input:checked ~ ul {
  left: 40px;
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

# 결과

- 결론적으로, HTML과 CSS만을 사용하여 햄버거 메뉴를 만드는 것은 웹사이트의 사용자 경험을 개선하는 간단하고 효과적인 방법입니다. 이 글에서 안내된 단계별 지침에 따라, 쉽게 데스크톱 및 모바일 기기에서 모두 잘 작동하는 기능적이고 세련된 메뉴를 만들 수 있습니다.
- 메뉴를 더욱 더 멋지고 세련되게 만들기 위해 웹사이트 디자인에 맞게 스타일을 사용자 정의할 수 있습니다. 또한 각 메뉴 항목에 이미지와 아이콘을 추가하여 시각적으로 매력적으로 만들 수 있습니다.

![이미지](/assets/img/2024-07-09-HamburgerMenuHTMLandCSSonly_1.png)
