---
title: "웹사이트 만들 때 유용한 html 팁 5가지 "
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "5 Simple Coding Website Tricks"
link: "https://medium.com/@elysiarolivia/5-simple-coding-website-tricks-0a67fbad780f"
isUpdated: true
---





<img src="/assets/img/5SimpleCodingWebsiteTricks_0.png" />

이전에 사용해 온 몇 가지 웹사이트 트릭을 공유하고 싶어요. 이 트릭들이 여러분에게 도움이 되기를 바래요.

# 1. Div 가운데 정렬하는 방법

```js
/*css-grid*/
  {
    display grid;
    place-items: center;
  }
/*css-flexbox*/
  {
    display: flex;
    align-items: center;
    justify-content: center;
  }
/*css-position*/
  {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
```

<div class="content-ad"></div>

# 2. 간단한 라이트/다크 모드 버튼

```js
/* HTML : */
<Button onclick="myFunction()">여기를 클릭해주세요</button>

/* CSS: */
.dark-mode{
  background-color: black;
  color: white;
  font-family: montserrat;
}

/* JS: */
function myFunction(){
  var element = document.body;
  element.classList.toggle("dark-mode");
}
```

# 3. 자바스크립트 복사 붙여넣기

```js
/* HTML: */
<button onclick="copy('여기에 텍스트')">텍스트 복사</button>;

/* JS: */
function copy(text) {
  navigator.clipboard.writeText(text);
}
copy("여기에 텍스트");
```

<div class="content-ad"></div>

# 4. HTML 목록

```js
<h3>순서 있는 목록</h3>
<ol type="A">
 <li>사과</li>
 <li>망고</li>
 <li>바나나</li>
<ol>

<h3>순서 없는 목록</h3>
<ul type="circle">
 <li>사과</li>
 <li>망고</li>
 <li>바나나</li>
</ul>

<h3>설명 목록</h3>
<dl>
 <dt>사과</dt>
 <dd>- 건강에 좋음</dd>
 <dt>망고</dt>
 <dd>- 좋아해요</dd>
 <dt>바나나</dt>
 <dd>- 체중 증가에 좋음</dd>
</dl>
```

# 5. 맨 위로 스크롤 이동 효과

```js
/*HTML :*/
<button onclick="scrollToTop()" id="myBtn" title="맨 위로 이동">
  위로
</button>;

/*JS :*/
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
```

<div class="content-ad"></div>

P.S.: 저는 예전 노트에서 이 코드를 찾았어요. 정확히 설명드리진 못하지만 궁금한 점이 있으시면 댓글란에 남겨주세요.
