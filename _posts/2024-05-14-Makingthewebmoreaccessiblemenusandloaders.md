---
title: "웹을 더 접근성 있게 만들기 메뉴와 로더"
description: ""
coverImage: "/assets/img/2024-05-14-Makingthewebmoreaccessiblemenusandloaders_0.png"
date: 2024-05-14 15:03
ogImage: 
  url: /assets/img/2024-05-14-Makingthewebmoreaccessiblemenusandloaders_0.png
tag: Tech
originalTitle: "Making the web more accessible: menus and loaders"
link: "https://medium.com/gitconnected/making-the-web-more-accessible-menus-and-loaders-98468199bb8a"
---


웹 애플리케이션을 개발할 때 종종 접근성이 간과되곤 합니다. 하지만 이는 인터넷을 더 포용적인 공간으로 만드는 데 큰 도움이 됩니다.

대부분의 개발자들은 특히 처음 시작할 때 접근성에 집중하지 않는데, 접근성과 관련된 매우 기본적인 인터뷰 질문을 클리어하는 데 주로 관심을 가집니다.

그러므로 시작해 보겠습니다. 웹에서 자주 마주치는 아주 흔한 시나리오를 살펴보겠습니다:

- 메뉴 열기
- 항목 클릭
- 클릭한 항목이 로드될 때 까지 기다리기



접근성을 생각할 때, 이 행동을 웹사이트를 사용하는 사람의 관점에서 더 자세히 살펴봅니다. 예를 들어 사용자는 메뉴와 메뉴 항목에 대해 상호작용하는 것을 알아야 하며, 메뉴에 몇 개의 항목이 있는지 알아야 하며, 항목에 다른 하위 메뉴가 있는지 등을 알아야 합니다.

사용 사례 및 UI 상호작용의 복잡성에 따라 단계가 더욱 세심해질 수 있습니다.

## 메뉴 만들기

메뉴를 만들기 위해 먼저 로컬 HTML 파일에 다음의 시작 코드를 복사하여 붙여넣을 수 있습니다:



```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>문서</title>
  <style>
    body {
      margin: 0 auto;
    }

    .navbar {
      display: flex;
      background-color: #ccc;
      font-family: Arial;
    }

    .navbar>ul {
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0;
      padding: 10px;
      width: 100%;
    }

    .navbar li {
      font-size: 16px;
      color: black;
      text-align: center;
      padding: 10px;
      border-radius: 5px;
      text-decoration: none;
    }

    .dropdown {
      overflow: hidden;
    }

    .dropdown .dropbtn {
      font-size: 16px;
      border: none;
      color: black;
      background-color: inherit;
      font-family: inherit;
      margin: 0;
    }

    .navbar li:hover,
    .dropdown:hover .dropbtn {
      background-color: #e6e6e6;
    }

    .navbar .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 1;
    }

    .dropdown-content li {
      color: black;
      text-decoration: none;
      display: block;
      text-align: left;
    }

    .dropdown-content li:hover {
      background-color: #ddd;
    }

    .dropdown:hover .dropdown-content {
      display: flex;
      flex-direction: column;
      padding: 10px;
    }

    .loader-wrapper {
      display: none;
    }

    .content-wrapper .show-loader-wrapper {
      display: block;
      margin: 0 auto;
      margin-top: 200px;
      text-align: center;
    }

    .loader {
      border: 16px solid #f3f3f3;
      margin: 0 auto;
      border-top: 16px solid #3498db;
      border-radius: 50%;
      width: 120px;
      height: 120px;
      animation: spin 2s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  </style>
  <script>
    function doSomething() {
      document.getElementById('main-loader').classList.add('show-loader-wrapper');
      let timer = 0;
      const timerInterval = setInterval(() => {
        if (timer === 99) {
          clearInterval(timerInterval);
        }
        timer += 1;
        document.querySelector('.loader-progress').innerHTML = `${timer} %`;
      }, 400);

    }
  </script>
</head>

<body>
  <main class="content-wrapper">
    <nav class="navbar">
      <ul>
        <li><a onclick="doSomething()">홈</a></li>
        <li class="dropdown">
          <div class="dropbtn">
            드롭다운
            <i class="fa fa-caret-down"></i>
          </div>
          <ul class="dropdown-content">
            <li><a onclick="doSomething()">링크 1</a></li>
            <li><a onclick="doSomething()">링크 2</a></li>
            <li><a onclick="doSomething()">링크 3</a></li>
          </ul>
        </li>
        <li><a onclick="doSomething()">뉴스</a></li>
      </ul>
    </nav>
    <div class="loader-wrapper" id="main-loader">
      <div class="loader">
      </div>
      <div class="loader-progress-container">로딩 중 <span class="loader-progress"></span></div>
    </div>
  </main>
</body>

</html>
```



자, 이제 우리는 이를 접근성 있게 만드는 방법은 무엇인가요?

## 내비게이션 메뉴를 접근성 있게 만드는 방법

우리는 사용자들이 마우스나 다른 포인터 장치를 사용하지 못하거나 서로 다른 색상을 구별하지 못하는 등의 다양한 도전에 직면할 수 있음을 고려해야 합니다.

이는 예를 들어 학술 환경에서 사용되는 웹사이트를 만드는 경우 특히 중요해집니다. 거기에는 기술을 사용할 때 다양한 도전에 직면하는 많은 사용자들이 있을 수 있기 때문입니다.



현재 상태에서 네브바를 확인해 보겠습니다. 먼저 고려사항 중 하나인 마우스나 다른 포인터 장치를 사용하지 않고 네비게이션을 하는 것을 검증할 겁니다.

이를 위해 Tab 키를 사용하여 페이지의 다음 항목으로 이동하고 Shift + Tab 키를 사용하여 이전 항목으로 이동할 것입니다.

우리 웹페이지에서 시도해 보겠습니다. 페이지의 빈 영역을 클릭한 후 Tab 키를 눌러주세요.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*JwlfxSNzMs_IYp2zWhG9wQ.gif)



당신은 메뉴를 탭 키로 전혀 탐색할 수 없다는 것을 알게 될 거에요. 우리가 모든 것을 올바르게 했음에도 불구하고요.

키보드 탐색에 관해서, 일부 요소는 브라우저에 의해 0으로 설정된 tabindex가 자동으로 할당됩니다.

버튼, 입력 필드, 선택 상자, 텍스트 영역과 같은 익숙한 요소 몇 가지는 이렇게 자동으로 할당됩니다. 그리고 앵커 태그도요.

하지만, 앵커 태그를 사용하는 우리도 똑같죠?



앵커 태그에 연결된 href가 없는 경우 tabindex가 자동으로 할당되지 않습니다.

"Home" 목록 항목에 href를 연결하고 확인해보세요:

```js
<li><a onclick="doSomething()" href="#">Home</a></li>
```

위와 같은 결과를 확인할 수 있어야 합니다. "Home" 버튼은 이제 Tab 키를 눌러 접근할 수 있을 것입니다. 외곽선은 중요하며 곧 볼 대비 기준이 있을 것입니다:



다른 옵션은 모든 앵커 태그를 버튼으로 변환하는 것입니다. 실제 링크로 이동하는 대신 함수를 호출하고 있으므로 지금 그렇게 하겠습니다.

```js
<body>
  <main class="content-wrapper">
    <nav class="navbar">
      <ul>
        <li><button onclick="doSomething()" href="#">홈</button></li>
        <li class="dropdown">
          <div class="dropbtn">
            <button>드롭다운</button>
            <i class="fa fa-caret-down"></i>
          </div>
          <ul class="dropdown-content">
            <li><button onclick="doSomething()">링크 1</button></li>
            <li><button onclick="doSomething()">링크 2</button></li>
            <li><button onclick="doSomething()">링크 3</button></li>
          </ul>
        </li>
        <li><button onclick="doSomething()">뉴스</button></li>
      </ul>
    </nav>
    <div class="loader-wrapper" id="main-loader">
      <div class="loader">
      </div>
      <div class="loader-progress-container">로딩 중 <span class="loader-progress"></span></div>
    </div>
  </main>
</body>
```

그러면 키보드의 Tab 키를 통해 네비게이션 바의 각 항목을 "탭할 수 있는" 상태로 만드는 페이지가 나올 것입니다:

<img src="https://miro.medium.com/v2/resize:fit:1400/1*nQaPuP3mAFVyx63sB4DxtA.gif" />



하지만 버튼들이 조금 못생겼죠? 기본 CSS를 사용하여 이를 수정해 봅시다. 다음 스타일을 추가하여 버튼을 스타일링하세요:

```js
.navbar button {
  background: #e6e6e6;
  border: none;
  padding: 10px;
  border-radius: 5px;
}
```

좋아요! 이제 "Dropdown" 옵션의 하위 메뉴를 키보드로 접근할 수 있도록 만들어 봅시다.

## 키보드로 중첩된 메뉴에 액세스하기



지금은 "Dropdown" 옵션으로 탭을 이동해도 메뉴가 열리지 않는 문제가 있습니다. 심지어 "Enter" 키를 눌러도 열리지 않습니다. 이는 하위 메뉴의 가시성을 css로 제어하고 있기 때문입니다. 

이 문제를 해결하기 위해 Dropdown으로 탭을 이동하면 사용자가 Enter 키와 같은 키를 눌러서 하위 메뉴를 열 수 있어야 합니다. "Dropdown" 버튼에 추가된 onclick을 주목해주세요:

```js
<li class="dropdown">
  <div class="dropbtn">
    <button onclick="openSubmenu()">Dropdown</button>
    <i class="fa fa-caret-down"></i>
  </div>
  <ul class="dropdown-content">
    <li><button onclick="doSomething()">Link 1</button></li>
    <li><button onclick="doSomething()">Link 2</button></li>
    <li><button onclick="doSomething()">Link 3</button></li>
  </ul>
</li>
```

이제 스크립트 태그에 "openSubmenu" 함수를 추가하여 하위 메뉴에 클래스를 추가하고 그 표시 속성을 설정합니다.



```js
<script>
  function doSomething() {
    console.log('로더가 활성화됐어요');
    document.getElementById('main-loader').classList.add('show-loader-wrapper');
    let timer = 0;
    const timerInterval = setInterval(() => {
      if (timer === 99) {
        clearInterval(timerInterval);
      }
      timer += 1;
      document.querySelector('.loader-progress').innerHTML = `${timer} %`;
    }, 400);

  }

  // 새로 추가된 기능
  function openSubmenu() {
    console.log('서브메뉴 열기');
    const submenu = document.querySelector('.dropdown-content');
    submenu.classList.add('show-submenu');
    submenu.getElementsByTagName('button')[0].focus();
  }
</script>
```

그런 다음, 이 클래스에 hover 효과와 동일한 스타일 속성을 부여하기 위해 기존 스타일에 클래스 이름을 추가하여 CSS 선택기를 사용하십시오:

```css
.dropdown:hover .dropdown-content,
.navbar .dropdown-content.show-submenu {
  display: flex;
  flex-direction: column;
  padding: 10px;
}
```

이후에는 키보드로 하위 메뉴에 접근할 수 있게 됩니다. 사용자가 Enter 키를 누르면 "openSubmenu()" 함수에서 다음 줄 때문에 자동으로 포커스가 서브메뉴의 첫 번째 항목으로 이동할 것입니다:




```js
submenu.getElementsByTagName('button')[0].focus();
```

![image](https://miro.medium.com/v2/resize:fit:1400/1*VecBx6iFQ-moyNqkwEOAfw.gif)

지금까지 페이지를 키보드나 보조 기술 장치를 통해 액세스할 수 있게 했습니다. 사용자가 페이지의 요소들 사이를 이동할 수 있는 키를 제공할 수 있는 장치입니다.

이제 사용자가 페이지의 요소들을 적절하게 구별할 수 있게하는 방법에 대해 이야기해 보겠습니다.



## 웹 페이지의 접근성을 높이는 대비의 역할

요소 색상과 음영 사이의 효과적인 대비를 정의하는 몇 가지 지침을 제시했습니다. 이 대비 체커와 같은 유용한 사이트를 사용하여 당사의 버튼 및 내비게이션 바가 이 기준을 충족하는지 확인해 봅시다.

우리의 내비게이션 바의 색상 코드는 #ccc이며, 버튼의 색상은 #e6e6e6입니다.

![이미지](/assets/img/2024-05-14-Makingthewebmoreaccessiblemenusandloaders_0.png)



이 문맥에서 "그래픽 개체 및 사용자 인터페이스 구성요소"에 주의를 기울입니다. WCAG AA에도 실패하는 것을 볼 수 있습니다. 접근성의 최소 수준이어야 하는데요. 같은 도구를 사용하여 이 기준을 충족하는 더 유용한 쉐이드를 찾아봅시다. WCAG는 그러한 요소에 대해 최소 3대 1의 대조 비를 요구합니다.

![이미지](/assets/img/2024-05-14-Makingthewebmoreaccessiblemenusandloaders_1.png)

버튼과 탐색 막대를 비교하고 있으니, 지금은 스크린샷의 마지막 기준에만 신경 쓰겠습니다. 이제 버튼의 배경을 업데이트해봅시다.

```css
.navbar button {
      background: #6e6e6e;
      border: none;
      padding: 10px;
      border-radius: 5px;
}
```



이제 또 다른 문제에 부딪히게 되었어요. 우리의 네비게이션 바는 이렇게 보입니다:

![Navbar](/assets/img/2024-05-14-Makingthewebmoreaccessiblemenusandloaders_2.png)

텍스트가 버튼의 배경과 거의 구분되지 않아요. 다시 대비 확인 도구를 사용해서 텍스트에 어울리는 색상을 선택해 볼까요:

![대비 확인](/assets/img/2024-05-14-Makingthewebmoreaccessiblemenusandloaders_3.png)



우리는 WCAG AAA 지원의 높은 기준을 충족하기 위해 버튼을 약간 어둡게 만들고 버튼 텍스트를 흰색 (#fff)으로 바꿔야 할 것입니다. 이전에 정의한 다음 스타일을 찾아서 아래와 같이 색 속성을 업데이트해 주세요:

```js
.navbar button {
      background: #595959;
      color: #fff;
      border: none;
      padding: 10px;
      border-radius: 5px;
}
```

동시에 키보드로 탭을 눌러 버튼 아웃라인도 강조합니다.

![이미지](/assets/img/2024-05-14-Makingthewebmoreaccessiblemenusandloaders_4.png)



기본 아웃라인의 색상과 스타일을 변경하여 대비 기준을 충족시키는 방법에 대해 생각해 보는 것은 연습으로 남겨두겠습니다.

# 우리의 메뉴는 정말로 접근성이 확보되었을까요?

다음 단계에서는 화면 낭독기와 같은 보조 기술과 호환될 수 있도록 메뉴를 확인해야 합니다.

## 설정



웹 접근성을 고려해 코딩할 때, 스크린 리더와 같은 접근성 도구를 사용하여 테스트하는 것이 좋습니다. 데스크탑에서는 Windows 전용인 무료 NVDA를 사용할 수 있습니다.

맥북에는 내장된 Apple VoiceOver가 함께 제공됩니다. command + f5를 눌러 시작/중지할 수 있어요.

Google 확장 프로그램인 Chrome Vox도 사용 가능하지만, 제 경험에 따르면 다소 어색하게 느껴집니다.

불행히도, 이 블로그에 스크린 리더 비디오를 직접 첨부할 수 없습니다. 그래서 시스템의 VoiceOver 프롬프트를 사용할 거예요. 그것들도 화면 리더에 의해 말해진 내용을 보여줍니다.



시스템에 NVDA를 설치하거나 보이스오버를 사용하여 다음 단계를 따를 수 있어요. 화면 낭독기는 콘텐츠를 읽는 방식이 약간 다를 수 있지만, 사용자에게 웹사이트에 대한 기본적인 이해를 제공할 수 있어야 해요.

## 구현 방법

이제 화면 낭독기를 시작한 후에 페이지로 탭을 이동하면 화면 낭독기가 "홈 버튼, 3개 항목이 있는 목록"과 같은 내용을 말해줄 거예요. 당신이 현재 위치한 버튼을 설명하고 이용 가능한 총 항목 수를 알려줄 거예요.

그러나 "드롭다운" 버튼으로 탭을 이동하면 부 메뉴임을 사용자에게 알리지 않아요. 화면 낭독기는 "목록 항목 2, 드롭다운 버튼"이라고 말하거나 그냥 "드롭다운 버튼"이라고 할 거예요.



사용자가 유용한 정보를 놓치지 않게 하려면 "Dropdown" 버튼이 추가로 사용 가능한 메뉴를 가지고 있다는 것을 알려줄 필요가 있습니다.

이것을 해결해 보겠습니다. 우리가 가지고 있는 WCAG 문서의 가이드라인을 참고하겠습니다.

현재 가이드라인에 따르면, 우리는 이미 button 요소를 사용하고 있기 때문에 button 역할은 이미 다 covered되어 있습니다. 그러나 화면 낭독기와 같은 보조 기술을 돕기 위해 aria-haspopup와 aria-expanded 속성을 업데이트해야 합니다.

또한 "menu" 역할을 적절하게 할당해야 합니다. 하위 메뉴는 사용자가 escape 키를 누르거나 하위 메뉴의 마지막 항목을 벗어날 때 닫혀야 합니다.



지금 이것을 해 봅시다. 먼저 사용자가 하위 메뉴를 닫을 수 있도록 허용해 주겠습니다:

```js
function closeSubmenu() {
  const submenu = document.querySelector(".dropdown-content");
  submenu.classList.remove("show-submenu");
}

function openSubmenu() {
  console.log("하위 메뉴 열기");
  const submenu = document.querySelector(".dropdown-content");
  submenu.classList.add("show-submenu");
  submenu.getElementsByTagName("button")[0].focus();

  // 메뉴를 닫는 핸들러 추가
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && submenu.classList.contains("show-submenu")) {
      closeSubmenu();
      const dropdownBtn = document.querySelector(".dropbtn button");
      dropdownBtn.focus();
    }
  });
}
```

우리는 드롭다운 컨테이너에 메뉴의 역할을 추가하고, 마지막 항목에서 벗어날 때 메뉴를 닫기 위해 마지막 요소에 "onblur"를 추가하고 closeSubmenu 함수를 호출합니다:

```js
<li class="dropdown" role="menu">
  <div class="dropbtn">
    <button onclick="openSubmenu()">드롭다운</button>
    <i class="fa fa-caret-down"></i>
  </div>
  <ul class="dropdown-content">
    <li><button onclick="doSomething()">링크 1</button></li>
    <li><button onclick="doSomething()">링크 2</button></li>
    <li><button onclick="doSomething()" onblur="closeSubmenu()">링크 3</button></li>
  </ul>
</li>
```



이것을 수행하는 방법은 여러 가지가 있습니다. 현재는 이를 위한 매우 간단한 해결책을 사용했습니다. 중요한 것은 메뉴가 닫힌 후에 올바른 요소로 포커스를 돌려주는 것입니다.

이제 이스케이프 키를 사용하여 하위 메뉴를 닫아보세요. 작동해야 합니다.

이제 접근성 도구를 사용하여 메뉴를 테스트해 보죠.

화면 하단의 스크린 리더 안내문을 주목해보세요. 이제 (조금 더) 메뉴 항목으로 식별되는 것을 알 수 있을 겁니다.



위의 기준에 따라 유효한 aria 속성을 설정하도록 더 세부적으로 정제하겠습니다. 또한 여기에 정의된 메뉴 및 메뉴바 기준도 설정하겠습니다.

```js
nav태그에 class="navbar"를 추가합니다:
  - 메뉴바 역할(role)을 가진 ul요소를 추가합니다:
    - Home 버튼에 onclick="doSomething()" href="#"를 추가합니다.
    - dropdown class가 있는 li요소를 추가합니다:
      - dropbtn class를 가진 div에 다음을 추가합니다:
        - dropdown-trigger id를 가진 버튼에 onclick="openSubmenu(true)" onfocus="openSubmenu(false)"을 추가하고,
          aria-controls="dropdown-submenu", aria-haspopup="true", aria-expanded="false"를 추가합니다.
        - fa-caret-down class를 가진 i요소를 추가합니다.
      - dropdown-content class를 가진 ul요소를 추가하고, aria-labelledby="dropdown-trigger", role="menu", id="dropdown-submenu"를 추가합니다:
        - menuitem 역할(role)을 가진 각각의 li요소를 추가하고, aria-owns="dropdown-submenu"를 추가합니다.
          - onclick="doSomething()"를 추가한 버튼을 추가합니다.
    - News 버튼에 onclick="doSomething()"를 추가합니다.
```



위에 한 일들을 확인해 보세요.

또한 스크립트를 수정하여 aria 확장 상태를 업데이트합시다:

```js
function closeSubmenu() {
  const submenu = document.querySelector('.dropdown-content');
  submenu.classList.remove('show-submenu');
}

function openSubmenu(focusOnlistItem) {
  console.log('opening submenu');
  const dropdownBtn = document.querySelector('.dropbtn button');

  // aria 확장 상태 설정
  dropdownBtn.ariaExpanded = true;
  const submenu = document.querySelector('.dropdown-content');
  submenu.classList.add('show-submenu');
  if (focusOnlistItem) {
    submenu.getElementsByTagName('button')[0].focus();
  }
  window.addEventListener("keydown", (event) => {
    if (event.key === 'Escape' && submenu.classList.contains('show-submenu')) {
      closeSubmenu();

      // 닫을 때 aria 확장 상태 재설정
      dropdownBtn.ariaExpanded = false;
      dropdownBtn.focus();
    }
  });
}
```

이제 화면 리더가 알림을 하면서 말하는 내용을 확인해 봅시다.



아래 프롬프트를 보면, 스크린 리더가 메뉴의 "확장된" 상태를 읽어 줍니다.

서브 메뉴도 올바르게 읽혀지며 각 항목들은 적절한 menuitem 역할과 aria-owns 속성을 가지고 부모 메뉴 id를 가리킵니다:

이 모든 것을 보면, 심지어 간단한 내비게이션 메뉴조차 완전히 접근 가능하게 만드는 데 얼마나 많은 것이 필요한지 놀랄 것입니다.

# 접근 가능한 로더 만들기



메뉴를 접근 가능하게 만든 후에 "Enter" 키를 눌러 화면 리더를 켠 채로 로더를 실행해보세요.

이제 로더는 상호 작용 요소는 아니지만, 웹사이트를 제대로 볼 수 없는 사용자에게 페이지의 현재 상태에 대해 알려주어야 합니다. 여기서 몇 가지 잘 알려지지 않은 aria 태그가 유용할 수 있습니다.

이 중 첫 번째는 aria-live입니다. 자세히 설명드리겠습니다. 이 태그는 기본적으로 페이지의 동적인 부분에 대한 정보를 사용자에게 알리는 데 사용됩니다. 화면 리더나 보조 기술이 이 태그를 인식하고 태그에 지정된 값대로 업데이트를 알려줍니다.

"doSomething" 목업 로더 함수에 다음과 같은 변경 사항을 가해보세요:



```js
<script>
    function doSomething() {
      console.log('fireddd');
      document.getElementById('main-loader').classList.add('show-loader-wrapper');
      let timer = 0;
      const timerInterval = setInterval(() => {
        if (timer === 99) {
          clearInterval(timerInterval);
        }
        timer += 1;
        document.querySelector('.loader-progress').innerHTML = 
          `<span aria-live="polite">${timer} % </span>`;
      }, 400);

    }

    function closeSubmenu() {
      ...
    }

    function openSubmenu(focusOnlistItem) {
      ...
    }
</script>
```

위 코드에서 innerHTML에 추가한 특정한 라인을 주목해주세요:

```js
<span aria-live="polite">${timer} % </span>
```

이 라인을 통해 진행 상황을 호출하는 것이 시작될 것입니다.



하지만 또 다른 문제가 있어요. 화면 판독기가 업데이트를 읽어주는 동안 로더는 여러 단위로 진행돼요.

이로 인해 로더의 진행 상황과 실제 진행 상황이 맞지 않게 될 수 있어요.

예를 들어, 아래는 진행 불일치의 스크린샷이에요. 화면 판독기 안내와 실제 로더 진행 상황을 주목해주세요:

로더 진행률은 42%인데, 화면 판독기는 "12%"라고 읽어주는 걸 알 수 있어요. 이는 말로 진행 상황을 명확히 이야기하는 데 걸리는 시간 때문이에요.



이 문제를 해결하기 위해 특정 간격 이후에 진행 상황을 읽어주도록 할 수 있습니다. 이 간격은 예를 들어 10% 진행 후에 발생할 수 있습니다.

이를 위해 true/false로 설정된 aria-busy라는 또 다른 속성을 사용할 것입니다. 여기에는 관련 문서가 있으나, 이것은 true로 설정되어 있는 동안 업데이트를 잠깐 차단할 것입니다.

로더에 대한 HTML 코드를 수정해 봅시다:

```js
<div class="loader-wrapper" id="main-loader">
  <div class="loader">
  </div>
  <div class="loader-progress-container">
    <span class="loader-progress">
      <span id="load-progress" aria-live="polite" aria-busy="true"></span>
    </span>
  </div>
</div>
```



로드 진행률 스팬을 동적으로 스크립트를 통해 생성하는 대신 HTML로 옮겼습니다. 이는 이제 aria-live 및 aria-busy 속성을 추적하여 업데이트해야 하기 때문입니다. 이전에는 매번 새 요소를 생성했습니다. 이제는 요소의 단일 인스턴스가 필요하며 해당 aria 속성만 업데이트해야 합니다.

다음 단계는 업데이트마다(첫 번째 업데이트 포함) 10%씩 읽어 주는 것입니다. 이를 간단히 JS 코드를 사용하여 aria-busy 속성을 true/false로 설정하여 수행할 것입니다:

```js
<script>
    function doSomething() {
      console.log('fireddd');
      document.getElementById('main-loader').classList.add('show-loader-wrapper');
      let timer = 0;
      const timerInterval = setInterval(() => {

        // 로드 진행률 스팬을 가져와 타이머를 업데이트합니다
        const loadProgressElm = document.getElementById("load-progress");
        if (loadProgressElm) {
          if (timer % 10 === 0 || timer === 1) {
            // 음성 업데이트 허용
            loadProgressElm.ariaBusy = "false";
          } else {
            // 음성 업데이트 차단
            loadProgressElm.ariaBusy = "true";
          }
        }

        if (timer === 99) {
          clearInterval(timerInterval);
        }
        timer += 1;
        loadProgressElm.innerHTML = `로딩 중 ${timer} %`;
      }, 400);

    }

    function closeSubmenu() {
      ...
    }

    function openSubmenu(focusOnlistItem) {
      ...
    }
  </script>
```

실시간으로 어떻게 보이는지 확인해보세요. 하단의 프롬프트를 주목하면 마지막 진행 업데이트와 동기화되어 있음을 알 수 있습니다:



그렇게 하면 스크린 리더 및 보조 기술에서 이해하기 쉬운 로더를 얻을 수 있습니다.

## 결론

위에서 살펴본 것을 통해 웹 사이트의 이해를 돕는 중요성에 대해 감을 잡을 수 있습니다. 위의 프로젝트를 더 다듬을 부분과 몇 가지 버그가 있지만, 이는 접근성을 구현하는 효과적인 전략 개요를 제공하는 데 사용된 데모였습니다.

간단한 메뉴/로더 구현만으로도 접근성이 의미 있는 태그와 매우 높은 수준의 aria 속성을 넘어 사용자에게 가장 관련성 있는 업데이트를 제공해야 함을 이해할 수 있습니다.



많은 aria 태그와 이를 구현하는 데 사용할 수 있는 해결책들이 있습니다. MDN에서 읽어보거나 WCAG 가이드라인을 확인해보세요.

언제나 사용자 경험이 접근 가능해야 합니다. 사용하는 의미론적 태그의 수나 알고 있는 aria 속성의 종류와는 무관하게요!