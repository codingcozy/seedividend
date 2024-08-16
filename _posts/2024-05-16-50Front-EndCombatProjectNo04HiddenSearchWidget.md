---
title: "프론트엔드 전투 프로젝트 No04 숨겨진 검색 위젯"
description: ""
coverImage: "/assets/img/2024-05-16-50Front-EndCombatProjectNo04HiddenSearchWidget_0.png"
date: 2024-05-16 16:39
ogImage: 
  url: /assets/img/2024-05-16-50Front-EndCombatProjectNo04HiddenSearchWidget_0.png
tag: Tech
originalTitle: "50 Front-End Combat Project No.04: Hidden Search Widget"
link: "https://medium.com/@cendz/50-front-end-combat-project-no-04-hidden-search-widget-aab92bb9285f"
isUpdated: true
---




![image1](/assets/img/2024-05-16-50Front-EndCombatProjectNo04HiddenSearchWidget_0.png)

# 프로젝트 소개

이 프로젝트는 간단하고 유용한 숨은 검색 위젯을 보여줍니다. 검색 버튼을 클릭하면 검색 창이 확장되고 입력 상자가 자동으로 포커스되어 사용자가 검색 콘텐츠를 입력하기 쉬워집니다.

![image2](/assets/img/2024-05-16-50Front-EndCombatProjectNo04HiddenSearchWidget_1.png)

<div class="content-ad"></div>

# 구현

- HTML 구조는 검색 창의 레이아웃을 정의하며, 입력 상자와 버튼을 포함합니다.
- CSS 스타일은 검색 창의 초기 모양, 확장된 상태에서의 모습 및 버튼 이동 방식을 정의합니다.
- JavaScript 코드는 버튼 클릭 이벤트를 감지하고, 활성 클래스의 상태에 따라 검색 창의 확장/축소를 제어하며, 입력 상자에 포커스를 설정합니다.

# 핵심 코드

- .search 컨테이너에는 검색 창을 위한 입력 상자와 버튼이 포함되어 있습니다.
- .input 입력 상자는 검색어를 입력하는 데 사용됩니다.
- .btn 버튼은 검색 창을 확장하거나 축소하는 데 사용됩니다.

<div class="content-ad"></div>

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" crossorigin="anonymous" />
    <link rel="stylesheet" href="style.css" />
    <title>Hidden Search</title>
  </head>
  <body>
    <div class="search">
      <input type="text" class="input" placeholder="Search...">
      <button class="btn">
        <i class="fas fa-search"></i>
      </button>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

- `.search`의 `position: relative` 속성은 자식 요소를 위치시키는 데 사용됩니다.
- `.input` 및 `.btn`의 스타일은 초기 모양 및 크기를 정의합니다.
- `.search.active .input` 및 `.search.active .btn` 가상 클래스는 검색 창이 확장될 때 스타일을 제어합니다.

```js
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-image: linear-gradient(90deg, #7d5fff, #7158e2);
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.search {
  position: relative;
  height: 50px;
}

.search .input {
  background-color: #fff;
  border: 0;
  font-size: 18px;
  padding: 15px;
  height: 50px;
  width: 50px;
  transition: width 0.3s ease;
}

.btn {
  background-color: #fff;
  border: 0;
  cursor: pointer;
  font-size: 24px;
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  width: 50px;
  transition: transform 0.3s ease;
}

.btn:focus,
.input:focus {
  outline: none;
}

.search.active .input {
  width: 200px;
}

.search.active .btn {
  transform: translateX(198px);
}
```

- 검색 바, 버튼 및 입력 상자의 DOM 요소 참조 가져오기.
- 버튼 클릭 이벤트 핸들러:
— `.search` 요소의 `active` 클래스를 토글하여 검색 바의 확장/축소를 제어합니다.
— 검색 바가 확장되면 자동으로 입력 상자로 포커스가 이동됩니다.

<div class="content-ad"></div>

```js
const search = document.querySelector('.search')
const btn = document.querySelector('.btn')
const input = document.querySelector('.input')

btn.addEventListener('click', () => {
    search.classList.toggle('active')
    input.focus()
})
```

# 에필로그

이 프로젝트의 코드를 이해하면 HTML, CSS 및 JavaScript를 사용하여 대화형 검색 위젯을 만드는 방법을 배울 수 있습니다. 필요에 따라 프로젝트의 스타일 및 기능을 수정하여 검색 힌트, 검색 기록 등을 추가하여 더 유용한 검색 경험을 만들 수 있습니다.

GIF의 과정 전체가 표시됩니다:


<div class="content-ad"></div>

<img src="/assets/img/2024-05-16-50Front-EndCombatProjectNo04HiddenSearchWidget_2.png" />

마침내, 이 이야기를 읽은 후에 도움이 될 것이라고 생각된다면, 동의하고 팔로우해주시기 바랍니다. 공유해주세요. 혹시 당신의 리트윗이 다른 이들에게 영감을 줄 수도 있습니다. 또한, 제안 사항이 있으면 아래에 제안해주시면 감사하겠습니다. 앞으로 기술에 관한 더 많은 글을 공유하겠습니다. 감사합니다!