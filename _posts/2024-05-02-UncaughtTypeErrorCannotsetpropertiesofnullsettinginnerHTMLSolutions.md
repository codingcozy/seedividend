---
title: "Uncaught TypeError: Cannot set properties of null (setting ‘inner HTML’) 해결방법"
description: ""
coverImage: ""
date: 2024-05-02 00:26
ogImage: 
  url: 
tag: Tech
originalTitle: "Uncaught TypeError: Cannot set properties of null (setting ‘inner HTML’) Solutions"
link: "https://medium.com/@madhav201singh/uncaught-typeerror-cannot-set-properties-of-null-setting-inner-html-solutions-41726496d355"
isUpdated: true
---



# "Uncaught TypeError: Cannot set properties of null (setting 'innerHTML')" 오류 수정하기

"Uncaught TypeError: Cannot set properties of null (setting 'innerHTML')"라는 오류 메시지는 JavaScript에서 자주 발생하는 오류로, null 객체의 `innerHTML` 속성을 설정하려고 할 때 발생합니다. 보통 이 오류는 DOM(Document Object Model)에 로드되지 않거나 존재하지 않는 요소의 HTML 내용을 조작하려고 시도할 때 발생합니다.

이 오류를 해결하려면, `innerHTML`을 통해 대상 요소를 지정하기 전에 해당 요소가 실제로 DOM에 있는지 확인해야 합니다. 이 문제를 해결하고 해결하기 위해 다음과 같은 몇 가지 단계를 따를 수 있습니다:

## 1. DOM에 요소가 있는지 확인하기

<div class="content-ad"></div>

먼저 `innerHTML`로 조작하려는 요소가 DOM에 있는지 확인하세요. 브라우저 개발자 도구를 사용하여 HTML 구조를 검사하여 확인할 수 있습니다. 자바스크립트 코드에서 요소가 null이 되도록 하는 오타나 잘못된 ID 또는 클래스 이름을 찾아보세요.

## 2. 요소에 액세스하기 전에 요소가 로드되었는지 확인

JavaScript 코드를 실행하기 전에 요소가 로드되지 않은 상태에서 코드를 실행하는 경우 이 오류가 발생할 수 있습니다. 요소에 액세스하기 전에 DOM에 요소가 있는지 확인하려면 다음 방법 중 하나를 사용할 수 있습니다:

### a. 스크립트를 요소 뒤에 배치하기

<div class="content-ad"></div>

자바스크립트 코드를 수정된 innerHTML 속성을 변경하는 것을 HTML 코드 이후에 배치하십시오. 이렇게 함으로써 스크립트가 해당 요소를 조작하기 전에 요소가로드되고 접근 가능하게 합니다.

```html
<!-- HTML 코드 -->
<div id="myElement"></div>

<!-- JavaScript 코드 -->
<script>
  // 이 스크립트가 HTML 구조 내 요소 이후에 위치하도록 하십시오
  var element = document.getElementById("myElement");
  element.innerHTML = "새로운 내용";
</script>
```

### b. 코드를 이벤트 리스너로 래핑하기

<div class="content-ad"></div>

웹 페이지가 로드되는 동안 발생하는 이벤트를 활용하여 JavaScript 코드를 실행하도록 이벤트 리스너로 감싸보세요. 이렇게 하면 원하는 요소를 조작하기 전에 해당 요소가 존재하는지 확인할 수 있습니다. `DOMContentLoaded` 이벤트를 대기하는 것이 일반적입니다.

```html
<!-- HTML 코드 -->
<div id="myElement"></div>

<!-- JavaScript 코드 -->
<script>
  document.addEventListener("DOMContentLoaded", function () {
    var element = document.getElementById("myElement");
    if (element) {
      element.innerHTML = "새로운 내용";
    } else {
      console.log("요소를 찾을 수 없습니다.");
    }
  });
</script>
```

<div class="content-ad"></div>

만약 대상이 되는 요소가 DOM에 존재하지 않는 경우에 대비하여 이 상황을 우아하게 처리하기 위해 추가적인 확인을 추가할 수 있습니다. `innerHTML`을 수정하기 전에 요소가 null 또는 undefined인지 확인하고 오류를 피하기 위해 적절한 조치를 취하세요.

```javascript
var element = document.getElementById("myElement");
if (element) {
element.innerHTML = "새 콘텐츠";
} else {
console.error("DOM에서 요소를 찾을 수 없습니다.");
}
```

이러한 확인을 통해 요소가 사용할 수 없을 때 발생하는 "Uncaught TypeError: Cannot set properties of null (setting ‘innerHTML’)" 오류를 방지하고 JavaScript 코드에서 올바른 요소를 대상으로 하는 경우에 대비할 수 있습니다.

코드를 다시 확인하고 요소 ID나 클래스 이름이 올바른지 확인하고 JavaScript 코드에서 올바른 요소를 대상으로 지정하도록 주의하세요.

<div class="content-ad"></div>

"다음 단계를 따라하면 'Uncaught TypeError: Cannot set properties of null (setting 'innerHTML')' 오류를 해결하고 JavaScript 코드에서 HTML 요소의 내용을 성공적으로 조작할 수 있을 겁니다."
