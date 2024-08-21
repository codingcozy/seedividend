---
title: "HTML <dialog> 요소를 사용한 JavaScript와 React에서의 모달(dialog)"
description: ""
coverImage: "/assets/img/2024-05-02-ModalswithHTMLdialogelementinJavaScriptandReact_0.png"
date: 2024-05-02 00:07
ogImage:
  url: /assets/img/2024-05-02-ModalswithHTMLdialogelementinJavaScriptandReact_0.png
tag: Tech
originalTitle: "Modals with HTML <dialog> element in JavaScript and React"
link: "https://medium.com/@dimterion/modals-with-html-dialog-element-in-javascript-and-react-fb23c885d62e"
isUpdated: true
---

![image](/assets/img/2024-05-02-ModalswithHTMLdialogelementinJavaScriptandReact_0.png)

다이얼로그 태그는 모달과 같은 컴포넌트를 만드는 좋은 방법입니다. 여기에는 구현하는 몇 가지 방법이 있습니다.

일반적으로 `dialog`는 상호 작용 컴포넌트를 만들며, 간단한 대화상자나 모달로 변환할 수 있습니다. 전자는 컴포넌트를 단순히 열고, 후자는 모달이 열려 있는 동안 페이지의 나머지 콘텐츠를 비활성화하는 것입니다.

모달의 예시는 다음과 같을 수 있습니다:

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
<!-- Modal - HTML -->
<dialog id="modal">
  <h1>이것은 모달입니다.</h1>
  <button id="closeModal">모달 닫기</button>
</dialog>
<button id="openModal">모달 보이기</button>
```

```js
// Modal - JavaScript
const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});
```

다이얼로그 예시는 다음과 같을 수 있습니다:

```js
<!-- Dialog - HTML -->
<dialog id="dialog">
  <h1>이것은 다이얼로그입니다.</h1>
  <button id="closeDialog">다이얼로그 닫기</button>
</dialog>
<button id="openDialog">다이얼로그 보이기</button>
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
// 다이얼로그 - JavaScript
const dialog = document.getElementById("dialog");
const openDialog = document.getElementById("openDialog");
const closeDialog = document.getElementById("closeDialog");

openDialog.addEventListener("click", () => {
  dialog.show();
});

closeDialog.addEventListener("click", () => {
  dialog.close();
});
```

두 가지 사이의 유일한 차이점은 그들을 열기 위한 함수입니다. 모달의 경우 showModal() 메소드를 사용해야 하고 간단한 다이얼로그의 경우 show()를 사용해야 합니다. 코드의 나머지 부분은 동일합니다.

`dialog`은 보이는 다이얼로그를 보여주는 open 속성이 있습니다 (설정된 경우). 예를 들어:

```js
<dialog open>
  <h1>This dialog will always be shown.</h1>
</dialog>
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

표시를 켜거나 끄기 위해 true/false로 설정할 수도 있습니다 (예를 들어 React의 useState와 함께 사용할 수 있습니다). 그러나 이 경우에는 항상 비모달(non-modal)로 설정되므로 showModal()/show() 메서드를 사용하는 것이 좋습니다.

React에서 이 작업을 수행하는 한 가지 방법은 useEffect와 useRef를 사용하는 것입니다:

```js
// Modal을 별도의 컴포넌트로 만들기
import { useEffect, useRef } from "react";

function Modal({ openModal, closeModal, children }) {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog ref={ref} onCancel={closeModal}>
      {children}
      <button onClick={closeModal}>닫기</button>
    </dialog>
  );
}

export default MenuModal;
```

여기서 useRef는 렌더링 용도로 값을 참조하고, useEffect는 열기/닫기 상태를 확인하는 데 사용됩니다(이는 props를 통해 전달됩니다). 또한 올바르게 ESC 키를 사용하기 위해 onCancel 속성도 있습니다(키보드로 모달을 닫으려는 경우 사용할 수 있습니다).

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

그럼 모달 구성 요소를 페이지 구성 요소에 추가하고 useState로 상태를 설정해야 합니다. 모달을 열거나 닫으려면 다음을 추가하십시오:

```js
// 페이지 구성 요소
import { useState } from "react";
import { Modal } from "./Modal";

function PageComponent() {
  const [modal, setModal] = useState(false);

  return (
    <button
      onClick={() => setModal(true)}
    >
      모달 열기
    </button>
    <Modal
      openModal={modal}
      closeModal={() => setModal(false)}
    >
      모달 내용.
    </Modal>
  )

export default PageComponent;
```

위의 React 예시에서 showModal() 메서드를 show()로 변경하면 모달 대신 간단한 대화상자를 사용합니다. 이 경우 대화상자를 기타 요소 위에 표시하려는 경우 CSS 파일에서 z-index를 추가로 설정해야 할 수 있습니다 (대화상자가 열렸을 때 다른 요소에 접근할 수 있게 합니다).

CSS에 대한 추가 설정으로는 모달에 대한 ::backdrop 가상 요소를 설정하는 것이 있습니다. 예를 들어 배경을 어둡게 하려면 (기본 변형보다 더 어둡게) 다음과 같이 설정할 수 있습니다:

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
.modalClassName::backdrop {
  background: rgba(0, 0, 0, 0.5);
}
```

다음은 `dialog` 요소를 사용하는 몇 가지 가능한 방법입니다. `div`와 같은 변종을 사용하는 대신 모달/대화 상자에 적절한 태그를 가지고 있는 것은 좋은 점이지만 물론 항상 다른 접근 방식이 있습니다.

읽어 주셔서 감사합니다.
