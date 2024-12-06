---
title: "HTML 및 CSS에서 호버 가능한 드롭다운  사용자 정의 디자인"
description: ""
coverImage: "/assets/img/2024-12-06-HoverableDropdowninHTMLandCSSCustomDesign_0.png"
date: 2024-12-06 18:25
ogImage: 
  url: /assets/img/2024-12-06-HoverableDropdowninHTMLandCSSCustomDesign_0.png
tag: Tech
originalTitle: "Hoverable Dropdown in HTML and CSS  Custom Design"
link: "https://medium.com/dev-genius/hoverable-dropdown-in-html-and-css-custom-design-619766d92854"
isUpdated: false
---


드롭다운은 트리거될 때 옵션 목록을 보여주는 기본 UI 구성 요소입니다. 드롭다운은 다재다능하고 사용자 친화적이며 현대 웹 디자인에서 필수적인 요소입니다.

<img src="/assets/img/2024-12-06-HoverableDropdowninHTMLandCSSCustomDesign_0.png" />

이 가이드는 HTML과 CSS만 사용하여 기본 드롭다운을 만들고 이를 호버 가능한 드롭다운으로 사용자화하는 방법을 안내합니다. 단, 자바스크립트 코드는 사용하지 않습니다.

## 드롭다운이란 무엇인가요?

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

드롭다운은 클릭이나 호버 액션과 같은 트리거로 실행될 때 링크나 옵션 목록을 표시하는 UI 요소입니다. 관련된 링크를 간결하게 그룹화함으로써 드롭다운은 네비게이션을 쉽게 하고 사용자 경험을 향상시킬 수 있습니다.

## 기본 드롭다운

`select` 태그는 드롭다운 목록을 생성하며, `option` 태그는 선택 가능한 값을 정의합니다. 선택 요소의 기본값은 필요한 옵션에서 'selected' 속성을 사용하여 설정할 수 있습니다. 이 속성은 불리언 속성입니다. 'selected' 속성이 있는 옵션이 드롭다운 목록에서 기본적으로 표시됩니다.

```html
<!DOCTYPE html>
<html>

<head>
    <title>HTML 및 CSS의 기본 드롭다운</title>
</head>

<body>
    <p>아래에서 요금제를 선택하세요:</p>

    <select name="plan" id="plan">
        <option value="none" selected disabled hidden>옵션 선택</option>
        <option value="free">무료</option>
        <option value="starter">시작하기</option>
        <option value="professional">전문가</option>
        <option value="corporate">기업</option>
    </select>
</body>

</html>
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

브라우저(엣지, 사파리, 크롬 등) 자체에서 기본 드롭다운의 스타일을 정의하기 때문에 각 브라우저마다 다르게 보입니다. 아래와 같이 보일 것입니다:

<img src="/assets/img/2024-12-06-HoverableDropdowninHTMLandCSSCustomDesign_1.png" />

## 사용자 정의 호버 가능 드롭다운

호버 가능 드롭다운은 사용자가 버튼 위에 마우스를 올릴 때 메뉴를 표시함으로써 클릭을 할 필요를 없애줍니다. 아래는 사용자 정의 호버 가능 드롭다운 코드에 대한 자세한 설명입니다:

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

## HTML

HTML 구조는 매우 간단합니다. `dropdown` 클래스를 가진 `div`는 다음을 포함합니다:

- .dropbtn으로 스타일이 적용된 버튼으로, 호버 트리거 역할을 합니다.
- 메뉴 항목을 담고 있는 `dropdown-content` 클래스를 가진 `div`, 각 항목은 외부 리소스에 링크된 `a` 태그입니다.

```js
<div class="dropdown">
  <button class="dropbtn">🧑‍🦱</button>
  <div class="dropdown-content">
    <a target="_blank" href="https://medium.com/@tajammalmaqbool11">미디엄에서 팔로우하기</a>
    <a target="_blank" href="https://patreon.com/TajammalMaqbool">패트리온에서 팔로우하기</a>
    <a target="_blank" href="https://tajammalmaqbool.com">웹사이트 방문하기</a>
    <a target="_blank" href="mailto:tajammalmaqbool11@gmail.com">지금 메일하기</a>
  </div>
</div>
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

## CSS

`.dropbtn`은 초록색 배경, 흰색 텍스트, 그리고 시각적으로 매력적으로 보이도록 패딩을 가지고 있습니다. 마우스를 올렸을 때 버튼의 배경이 더 어두운 초록색으로 바뀌는 호버 효과가 있습니다.

`.dropdown-content`는 처음에 `display: none`으로 숨겨져 있으며 버튼 아래에 절대 위치로 설정되어 있습니다. 부드러운 그림자와 패딩을 추가하여 세련된 외관을 위해 연한 배경으로 스타일링되었습니다.

선택자 `.dropdown:hover .dropdown-content`는 사용자가 드롭다운 컨테이너 위에 마우스를 올렸을 때 메뉴가 나타나도록 (디스플레이: 블록) 해줍니다. 추가적인 호버 효과인 `.dropdown-content a`는 상호작용을 더욱 좋게 하기 위해 배경색을 변경합니다.

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

안녕하세요! 아래의 코드를 복사해서 붙여넣으면 멋진 드롭다운 메뉴를 볼 수 있어요.

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hoverable Dropdown in HTML and CSS</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }

    .dropdown {
      position: relative;
      display: inline-block;
    }

    .dropbtn {
      background-color: #4CAF50;
      color: white;
      padding: 10px;
      font-size: 32px;
      border: none;
      cursor: pointer;
    }

    .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
      z-index: 1;
      min-width: 200px;
    }

    .dropdown-content a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
    }

    .dropdown-content a:hover {
      background-color: #f1f1f1;
    }

    .dropdown:hover .dropdown-content {
      display: block;
    }

    .dropdown:hover .dropbtn {
      background-color: #3e8e41;
    }
  </style>
</head>

<body>
  <p>HTML과 CSS만으로 만든 커스텀 호버 가능한 드롭다운</p>
  <div class="dropdown">
    <button class="dropbtn">🧑‍🦱</button>
    <div class="dropdown-content">
      <a target="_blank" href="https://medium.com/@tajammalmaqbool11">미디엄에서 팔로우하기</a>
      <a target="_blank" href="https://patreon.com/TajammalMaqbool?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink">페이 트리온에서 팔로우하기</a>
      <a target="_blank" href="https://tajammalmaqbool.com">웹사이트 방문하기</a>
      <a target="_blank" href="mailto:tajammalmaqbool11@gmail.com">메일 보내기</a>
    </div>
  </div>
</body>

</html>
```

즐거운 코딩 되세요! 😊

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

It will look like this:

![Hoverable Dropdown Example](https://example.com/assets/img/2024-12-06-HoverableDropdowninHTMLandCSSCustomDesign_2.png)

## Conclusion

이 호버 가능한 드롭다운은 간단하지만 효과적이며, 매끄러운 사용자 경험을 제공합니다. JavaScript에 의존하지 않고도 인터랙티브한 웹 컴포넌트를 만드는 데 필요한 기본 CSS와 HTML의 힘을 보여줍니다. 제 웹사이트를 방문해 주세요: [tajammalmaqbool.com](https://tajammalmaqbool.com)