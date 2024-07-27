---
title: "HTML dialog 태그가 혁신적인 이유 분석"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-07-HTMLdialogTagaGameChanger_0.png"
date: 2024-07-07 02:20
ogImage:
  url: /assets/img/2024-07-07-HTMLdialogTagaGameChanger_0.png
tag: Tech
originalTitle: "HTML <dialog> Tag a Game Changer"
link: "https://medium.com/@developwithmi/html-dialog-tag-a-game-changer-bdd06d8c0317"
---

HTML5의 `dialog` 태그 소개는 개발자가 웹 페이지에서 모달과 대화 상자를 만들고 관리하는 방식을 혁신적으로 나타냅니다. `dialog` 태그 도입 이전에는 모달을 구현하는 데 HTML, CSS, JavaScript의 조합이나 jQuery UI 또는 Bootstrap과 같은 타사 라이브러리가 필요했지만, `dialog` 태그를 사용하면 이제 모달을 생성하는 것이 네이티브 HTML5 경험이 되어 프로세스가 간소화되고 보다 효율적인 접근 방식을 제공합니다. 다음은 작동 방법을 간략히 살펴보겠습니다:

![html dialog tag screenshot](/ui-log-2/assets/img/2024-07-07-HTMLdialogTagaGameChanger_0.png)

`dialog` 사용 전:

```html
<div class="modal">
  <div class="modal-content">
    <span class="close-button">&times;</span>
    <p>This is a modal!</p>
  </div>
</div>
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

```js
.modal {
  display: none;
  /* 더 많은 스타일링 */
}
.modal-content {
  /* 스타일링 */
}
```

```js
document.querySelector(".close-button").addEventListener("click", function () {
  document.querySelector(".modal").style.display = "none";
});
```

`dialog` 뒤:

```js
<dialog id="myDialog">
  <p>이것은 대화 상자입니다!</p>
  <button id="closeButton">닫기</button>
</dialog>
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

```js
const dialog = document.getElementById("myDialog");
const closeButton = document.getElementById("closeButton");

dialog.showModal();

closeButton.addEventListener("click", () => {
  dialog.close();
});
```

# 자동으로 대화 상자 열기

페이지가 로드될 때 대화 상자를 자동으로 열려면 JavaScript 코드 내에서 show() 또는 showModal() 메서드를 사용할 수 있습니다. showModal() 메서드는 대화 상자를 모달로 만들어 페이지의 나머지 부분과 상호작용을 방지합니다.

```js
document.addEventListener("DOMContentLoaded", () => {
  const dialog = document.getElementById("myDialog");
  dialog.showModal();
});
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이 코드 조각은 DOM이 완전히 로드될 때 대화상자가 열리도록 보장합니다.

대신, 페이지를 열자마자 대화상자를 열어두기 위해 open 속성을 사용할 수도 있습니다:

```js
<dialog id="myDialog" open>
  <p>This dialog is open from the start!</p>
  <button id="closeButton">Close</button>
</dialog>
```

# 자동 닫힘 버튼

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

`dialog` 요소에 자동 닫기 버튼을 추가하는 것은 간단합니다. dialog를 닫으려면 close() 메서드를 사용할 수 있어요.

```js
<dialog id="myDialog">
  <p>아래 버튼을 클릭하면 이 대화상자가 닫힙니다.</p>
  <button id="autoCloseButton">닫기</button>
</dialog>
```

```js
const dialog = document.getElementById("myDialog");
const autoCloseButton = document.getElementById("autoCloseButton");

autoCloseButton.addEventListener("click", () => {
  dialog.close();
});
```

# 올바른 방법으로 `dialog` 스타일링하기

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

`dialog` 요소를 스타일링하는 것은 다른 HTML 요소를 스타일링하는 것과 유사합니다. 직접 CSS 규칙을 적용할 수 있어요.

```js
dialog {
  border: none;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

`::backdrop` 으사선 유사하게 모달 대화 상자의 배경을 스타일링할 수 있어요. 대화 상자가 열릴 때 어둡게 표시되는 대화 상자 뒤쪽 영역을 말해요.

```js
dialog::backdrop {
  background: rgba(0, 0, 0, 0.8);
}
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이 CSS 스니펫은 배경을 어둡게 만들어 대화 상자와 페이지의 나머지 부분 간의 대비를 뚜렷하게 만듭니다.

# 결론

`dialog` 태그는 개발자가 웹 페이지에서 대화 상자를 만들고 관리하는 방식을 혁신했습니다. 코드를 간소화하고 모달에 대한 네이티브 지원을 제공함으로써 외부 라이브러리에 대한 의존성을 줄이고 전체적인 사용자 경험을 향상시킵니다. 자동으로 대화 상자를 열거나 자동으로 닫기 버튼을 추가하거나 쉽게 스타일을 지정하는 경우, `dialog` 태그는 현대 웹 개발에서 게임 체인저입니다.
