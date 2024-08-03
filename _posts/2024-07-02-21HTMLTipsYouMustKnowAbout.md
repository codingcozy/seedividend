---
title: "당신이 꼭 알아야 할 21가지 HTML 팁"
description: ""
coverImage: "/assets/img/2024-07-02-21HTMLTipsYouMustKnowAbout_0.png"
date: 2024-07-02 21:37
ogImage:
  url: /assets/img/2024-07-02-21HTMLTipsYouMustKnowAbout_0.png
tag: Tech
originalTitle: "21 HTML Tips You Must Know About"
link: "https://medium.com/stackademic/21-html-tips-you-must-know-about-f771c05713c0"
---

<img src="/assets/img/2024-07-02-21HTMLTipsYouMustKnowAbout_0.png" />

이 게시물에서는 코딩 스킬을 향상시킬 수 있는 코드 조각이 포함된 21가지 HTML 팁을 공유할 거에요.

자, 시작해볼까요? 🚀

# 연락 링크 만들기



<div class="content-ad"></div>
[Send Email](mailto:name@example.com)

[Call Us](tel:+1234567890)

[Send SMS](sms:+1234567890)

# Creating Collapsible Content

You can use the `details` and `summary` tags when you want to include collapsible content on your web page.



<div class="content-ad"></div>
`details` 태그는 숨겨진 콘텐츠를 담는 컨테이너를 만들고, `summary` 태그는 해당 콘텐츠의 가시성을 토글하기 위한 클릭 가능한 레이블을 제공합니다.

```js
<details>
  <summary>확장하려면 클릭</summary>
  <p>이 콘텐츠는 확장하거나 축소할 수 있습니다.</p>
</details>
```

# 의미 있는 요소 활용하기

웹사이트에서 비의미적 요소 대신 의미적 요소를 선택하세요. 이는 코드를 의미 있게 만들고 구조, 접근성, SEO를 개선합니다.



<div class="content-ad"></div>
<img src="/assets/img/2024-07-02-21HTMLTipsYouMustKnowAbout_1.png" />

# Form Elements Grouping

폼안에서 관련된 요소들을 그룹화하기 위해 `fieldset` 태그를 사용하고, `fieldset` 태그에 `legend` 태그를 함께 사용하여 `fieldset` 태그에 대한 제목을 정의하세요.

더 효율적이고 접근성 있는 폼을 만드는 데 유용합니다.



<div class="content-ad"></div>
```js
<form>
  <fieldset>
    <legend>개인 정보</legend>
    <label for="firstname">이름:</label>
    <input type="text" id="firstname" name="firstname" />
    <label for="email">이메일:</label>
    <input type="email" id="email" name="email" />
    <label for="contact">연락처:</label>
    <input type="text" id="contact" name="contact" />
    <input type="button" value="제출" />
  </fieldset>
</form>
```

# 드롭다운 메뉴 향상하기

`optgroup` 태그를 사용하여 `select` HTML 태그에 관련 옵션을 그룹화할 수 있습니다.

이 기능은 큰 드롭다운 메뉴나 긴 옵션 목록을 사용할 때 유용합니다.



<div class="content-ad"></div>
```js
<select>
  <optgroup label="과일">
    <option>사과</option>
    <option>바나나</option>
    <option>망고</option>
  </optgroup>
  <optgroup label="채소">
    <option>토마토</option>
    <option>브로콜리</option>
    <option>당근</option>
  </optgroup>
</select>
```

# 비디오 프레젠테이션 개선

`video` 요소와 함께 poster 속성을 사용하여 사용자가 비디오를 재생할 때까지 이미지를 표시할 수 있습니다.

```js
<video controls poster="image.png" width="500">
  <source src="video.mp4" type="video/mp4" />
</video>
```



<div class="content-ad"></div>
# 여러 선택지 지원하기

`input`과 `select` 요소에 multiple 속성을 사용하여 사용자가 한 번에 여러 값을 선택/입력할 수 있습니다.

```js
<input type="file" multiple />
<select multiple>
    <option value="java">Java</option>
    <option value="javascript">JavaScript</option>
    <option value="typescript">TypeScript</option>
    <option value="rust">Rust</option>
</select>
```

# 텍스트를 아래첨자 및 위첨자로 표시하기



<div class="content-ad"></div>
`sub`과 `sup` 요소는 텍스트를 아래 첨자 및 위 첨자로 표시하는 데 사용될 수 있습니다.

![Supplemental Image](/assets/img/2024-07-02-21HTMLTipsYouMustKnowAbout_2.png)

## 다운로드 링크 만들기

사용자가 링크를 클릭할 때 연결된 리소스를 탐색하는 대신 다운로드해야 한다고 지정하려면 `a` 요소와 함께 다운로드 속성을 사용할 수 있습니다.



<div class="content-ad"></div>
```js
<a href="document.pdf" download="document.pdf">
  {" "}
  Download PDF{" "}
</a>
```

# 상대 링크를 위한 기본 URL 정의

`base` 태그를 사용하여 웹 페이지의 모든 상대 URL에 대한 기본 URL을 정의할 수 있습니다.

웹 페이지의 모든 상대 URL에 대한 공통 시작점을 만들고, 리소스를 쉽게 찾아서 로드하기 위해 유용합니다.



<div class="content-ad"></div>
<head>
   <base href="https://shefali.dev" target="_blank" />
</head>
<body>
   <a href="/blog">블로그</a>
   <a href="/get-in-touch">문의</a>
</body>

# 이미지 로딩 제어하기

이미지 요소의 loading 속성을 사용하여 브라우저가 이미지를 로드하는 방식을 제어할 수 있습니다. "eager", "lazy", "auto" 세 가지 값이 있습니다.

```js
<img src="picture.jpg" loading="lazy">
```



<div class="content-ad"></div>
# 번역 기능 관리하기

브라우저의 번역 기능을 사용하여 요소의 내용을 번역할지 여부를 지정하기 위해 translate 속성을 사용할 수 있습니다.

```js
<p translate="no">이 텍스트는 번역되지 않아야 합니다.</p>
```

# 최대 입력 길이 설정하기



<div class="content-ad"></div>
maxlength 속성을 사용하면 입력 필드에 사용자가 입력하는 최대 문자 수를 설정할 수 있어요.

```js
<input type="text" maxlength="4">
```

# 최소 입력 길이 설정하기

minlength 속성을 사용하면 입력 필드에 사용자가 입력하는 최소 문자 수를 설정할 수 있어요.



<div class="content-ad"></div>
<input type="text" minlength="3">

# 내용 편집 활성화

contenteditable 속성을 사용하여 요소의 내용을 편집할 수 있는지 여부를 지정합니다.

사용자가 요소 내의 내용을 수정할 수 있도록 합니다.



<div class="content-ad"></div>
```js
<div contenteditable="true">내용을 편집할 수 있어요.</div>
```

# 스펠 체크 제어

`input` 요소, 내용 편집 가능한 요소, `textarea` 요소에 `spellcheck` 속성을 사용하여 브라우저에서 스펠 체크를 활성화 또는 비활성화할 수 있어요.

```js
<input type="text" spellcheck="true" />
```



<div class="content-ad"></div>
# 접근성 확보하기

alt 속성은 이미지가 표시되지 않을 때 이미지에 대한 대체 텍스트를 지정합니다.

접근성과 SEO를 높이기 위해 항상 이미지에 설명적인 alt 속성을 포함하세요.

```js
<img src="picture.jpg" alt="이미지에 대한 설명">
```



<div class="content-ad"></div>
# 링크를 위한 대상 동작 정의

링크된 리소스가 클릭되었을 때 표시될 위치를 지정하기 위해 target 속성을 사용할 수 있습니다.

```js
<!-- 같은 프레임 내에서 열립니다 -->
<a href="https://shefali.dev" target="_self">열기</a>

<!-- 새 창이나 탭에서 열립니다 -->
<a href="https://shefali.dev" target="_blank">열기</a>

<!-- 부모 프레임에서 열립니다 -->
<a href="https://shefali.dev" target="_parent">열기</a>

<!-- 창의 전체 본문에서 열립니다 -->
<a href="https://shefali.dev" target="_top">열기</a>

<!-- 이름이 지정된 프레임에서 열립니다 -->
<a href="https://shefali.dev" target="framename">열기</a>
```

# 추가 정보 제공



<div class="content-ad"></div>
테이블 태그를 마크다운 형식으로 변경해주세요.



<div class="content-ad"></div>
```js
<input type="file" accept="image/png, image/jpeg" />
```

# 비디오 로딩 최적화

보다 부드러운 재생을 위해 preload 속성을 `video` 요소와 함께 사용하여 비디오 파일을 더 빨리 로드할 수 있습니다.

```js
<video src="video.mp4" preload="auto">
  브라우저에서 비디오 태그를 지원하지 않습니다.
</video>
```



<div class="content-ad"></div>
오늘은 여기까지입니다.

도움이 되셨기를 바라요.

읽어 주셔서 감사합니다.

더 많은 이런 내용을 보시려면 여기를 클릭해주세요.



<div class="content-ad"></div>
마크다운 형식으로 테이블 태그를 변경할 수도 있어요.

계속 코딩해요!!

![Image](/assets/img/2024-07-02-21HTMLTipsYouMustKnowAbout_3.png)
