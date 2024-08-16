---
title: "리액트 모달 컴포넌트에서 포커스 트래핑 구현하기"
description: ""
coverImage: "/assets/img/2024-05-12-AchievingFocusTrappinginaReactModalComponent_0.png"
date: 2024-05-12 21:41
ogImage: 
  url: /assets/img/2024-05-12-AchievingFocusTrappinginaReactModalComponent_0.png
tag: Tech
originalTitle: "Achieving Focus Trapping in a React Modal Component"
link: "https://medium.com/cstech/achieving-focus-trapping-in-a-react-modal-component-3f28f596f35b"
isUpdated: true
---



<img src="/assets/img/2024-05-12-AchievingFocusTrappinginaReactModalComponent_0.png" />

포커스 포획은 웹 개발에서 필수적인 기술로, 모달이나 대화 상자와 같은 특정 영역 내에서 키보드 포커스가 유지되어 사용자에 대한 접근성과 사용 편의성을 향상시킵니다. 이 글에서는 외부 라이브러리에 의존하지 않고 사용자 정의 React 모달 구성 요소에서 포커스 포획을 구현하는 방법을 살펴보겠습니다.

# 포커스 포획 이해하기

React에서 모달 구성 요소를 설계하는 과정에는 여러 가지 고려 사항이 포함됩니다. 이러한 고려 사항 중 하나는 적절한 포커스 관리를 보장하는 것입니다. 포커스 포획은 이 프로세스에서 중요한 역할을 하는 기술입니다.

모달이 열린 상태에서는 모달 자체의 경계 내에서 키보드 포커스가 제한되는 것이 중요합니다. 이렇게 함으로써 사용자가 실수로 모달 외부의 요소인 버튼, 링크 또는 폼 입력란과 같은 요소로 이동하는 것을 방지할 수 있습니다.

이 예시에서 사용자가 샌드박스 환경을 벗어나 탭 키로 브라우저 내의 다른 포커스 가능한 요소에 의도치 않게 도달하는 것을 확인할 수 있습니다.

포커스 강제로 구현함으로써 사용자가 키보드만 사용하여 모달 콘텐츠와 효율적으로 상호 작용할 수 있는 제어된 환경을 만들어냅니다. 이를 통해 전반적인 사용자 경험과 애플리케이션의 접근성을 향상시킬 수 있습니다.

포커스 트래핑은 모달 내에서 포커스 순서를 조작하고 특정 키보드 이벤트를 가로채어 구현됩니다. 포커스 순서를 관리하여 사용자가 상호 작용 요소를 탐색하기 위해 "Tab" 키를 누를 때, 포커스는 모달 내에 유지되고 포커스 가능한 요소 사이를 순환하게 됩니다.

또한, 포커스 트래핑은 특정 키보드 이벤트를 가로채어 특별한 상황을 처리하는 것을 포함합니다. 예를 들어, 사용자가 모달 내의 마지막 포커스 가능한 요소에 도달하고 계속 "Tab" 키를 누르는 경우, 포커스가 첫 번째 요소로 순환되어 원활한 순환 네비게이션 경험을 만들어야 합니다.

또 다른 일반적인 시나리오는 모달을 닫기 위해 "Escape" 키 입력을 처리하는 것입니다. 모달이 열려 있고 사용자가 "Escape" 키를 누르면 모달이 닫혀야 하며, 포커스는 모달을 열었던 요소로 돌아가야 합니다.

우리의 사용자 정의 React 모달 컴포넌트에서는 useRef와 useEffect 훅의 조합을 사용하여 포커스 트래핑을 구현할 것입니다. 모달 요소에 ref를 할당함으로써 해당 요소의 포커스 관련 속성에 액세스하고 조작할 수 있습니다. useEffect 훅을 사용하여 모달이 열린 상태에서 키보드 이벤트에 대한 이벤트 리스너를 설정하고 필요한 포커스 조작을 수행할 수 있습니다.

모달 컴포넌트 내에서 포커스 관리를 하는 것으로, 원활하고 직관적인 사용자 경험을 만들어냅니다. 우리가 구현 중인 포커스 포획 논리 덕분에 키보드 사용자들은 예상치 못한 포커스 변화나 중단 없이 모달 컴포넌트의 콘텐츠를 탐색하고 상호작용할 수 있습니다.

# 모달 컴포넌트 구성

React 모달에서 포커스 포획을 보여주기 위해, 우리는 사용자 정의 Modal 컴포넌트를 만들 것입니다. 포커스 포획 논리만을 보여주기 위해, 이 컴포넌트는 최소한의 스타일로 구현될 것입니다.

다음 섹션에서는 우리의 사용자 정의 React 모달 컴포넌트의 구현 세부 사항에 대해 살펴보고 포커스 포획을 어떻게 달성하는지 탐구할 것입니다.

# 포커스 트래핑 구현

모달 컴포넌트에서는 useEffect 훅을 사용하여 모달이 열릴 때 포커스 트래핑을 관리합니다. 구현을 단계별로 살펴보면 다음과 같습니다:

- useRef 훅을 사용하여 modalRef를 정의하여 모달 요소를 참조합니다. 이 컴포넌트는 isOpen 및 setIsOpen 두 가지 props을 받습니다. 자식 요소는 boolean인 isOpen prop에 따라 표시됩니다. 이 boolean 상태의 setter 함수는 setIsOpen prop입니다.

```js
const Modal = ({ isOpen, setIsOpen }) => {
  const modalRef = useRef(null);
};
```

- 다음 단계는 Modal 컴포넌트 내부에 useEffect 훅을 정의하는 것입니다. 그런 다음 isOpen 속성이 true인지 확인합니다. 자식 요소는 boolean isOpen 속성에 따라 표시됩니다. 이 값이 true이면 포커스 트랩 설정을 진행합니다.

```js
useEffect(() => {
  if (isOpen) {
    //...설정
  }
}, [isOpen]);
```

- 이 설정에서는 모달 내부의 모든 포커스 가능한 요소를 querySelectorAll 메서드를 사용하여 쿼리합니다. 이에는 버튼, 링크, 입력란, 선택란, 텍스트영역, 명시적 tabindex 값을 가진 요소가 포함됩니다. 조심스럽게 MDN 웹 문서 HTML 요소 참조를 확인하여 이 목록에 포함해야 할지 여부를 확인하십시오.

```js
const modalElement = modalRef.current;
const focusableElements = modalElement.querySelectorAll(
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
);
```

- 우리는 첫 번째 및 마지막 초점 대상 요소를 각각 firstElement 및 lastElement 변수에 저장합니다.

```js
const firstElement = focusableElements[0];
const lastElement = focusableElements[focusableElements.length - 1];
```

- 우리는 두 개의 이벤트 핸들러 함수를 정의합니다: handleTabKeyPress와 handleEscapeKeyPress. 전자는 "Tab" 키를 누를 때 원형 탐색을 모달 내에서 가능하게 하고, 후자는 "Escape" 키를 눌러 모달을 닫도록 setIsOpen 함수를 호출합니다.
- event.shiftKey 조건은 "Shift" 키가 "Tab" 키와 함께 눌렸는지 여부를 결정하는 데 사용됩니다. 이 조건은 모달 내에서의 원형 초점 탐색을 처리하는 데 도움이 됩니다.
- handleTabKeyPress 이벤트 핸들러는 "Tab" 키가 눌렸을 때 트리거됩니다. event.shiftKey 속성은 "Shift" 키가 이벤트와 동시에 눌렸는지 여부를 나타내는 부울 값입니다.
- "Shift" 키가 눌렸고 (event.shiftKey가 true이고 현재 초점이 맞춰진 요소가 첫 번째 초점 요소인 경우(document.activeElement === firstElement)), 사용자가 첫 번째 요소에서 역방향으로 탐색 중임을 의미합니다. 이 경우, 모달을 벗어나지 않으려고 기본 탭 동작이 방지됩니다 (event.preventDefault()), 초점은 마지막 초점 대상 요소로 설정됩니다 (lastElement.focus()). 이렇게 하면 모달 내에서 원형 초점 탐색이 생성됩니다.
- "Shift" 키가 눌리지 않았고 (event.shiftKey가 false이고 현재 초점이 마지막 초점 요소인 경우(document.activeElement === lastElement)), 사용자가 마지막 요소에서 앞으로 탐색 중임을 의미합니다. 마찬가지로, 기본 탭 동작이 방지되고 초점은 첫 번째 초점 요소로 설정됩니다 (firstElement.focus()), 모달 내에서 원형 탐색이 계속됩니다.
- event.shiftKey 조건을 사용하여, "Tab" 키를 단독 또는 "Shift" 키와 함께 누를 때 모달의 초점 대상 요소 내에서 정상적으로 전진 및 후진 탐색이 작동하도록 로직이 보장됩니다.

```js
const handleTabKeyPress = (event) => {
  if (event.key === "Tab") {
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }
};

const handleEscapeKeyPress = (event) => {
  if (event.key === "Escape") {
    setIsOpen(false);
  }
};
```

- addEventListener를 사용하여 모달 요소에 이벤트 리스너를 추가합니다. 그런 다음 useEffect 훅은 isOpen 또는 setIsOpen이 변경될 때마다 실행되도록 설정해야 합니다. isOpen이 변경될 때마다 효과가 다시 트리거됩니다. 그러나 효과 내부의 코드는 isOpen의 값에 따라 이벤트 리스너를 추가하거나 제거하기만 합니다. isOpen 상태 자체를 직접 수정하지는 않습니다.
- 의존성 배열에 해당 상태가 포함된 useEffect 훅 내에서 isOpen 상태를 수정하는 것은 문제가 발생할 수 있습니다. 훅은 관찰 중인 의존성 중 하나가 변경될 때 관련 컴포넌트를 다시 렌더링하도록 강제합니다. 따라서 무한한 재렌더링 루프를 트리거할 수 있습니다. 무한한 재렌더링 루프를 방지하는 주요 요소는 효과가 isOpen 상태에 따라 이벤트 리스너를 추가하거나 제거하지만 isOpen 상태 자체를 수정하지 않는다는 것입니다. 따라서 실행될 때 컴포넌트의 다시 렌더링을 트리거하지 않습니다.

```js
modalElement.addEventListener("keydown", handleTabKeyPress);
modalElement.addEventListener("keydown", handleEscapeKeyPress);
```

- useEffect 훅에서 반환된 클린업 함수 내에서 이벤트 리스너를 제거하여 메모리 누수를 방지합니다.

```js
return () => {
  modalElement.removeEventListener("keydown", handleTabKeyPress);
  modalElement.removeEventListener("keydown", handleEscapeKeyPress);
};
```

모달 컴포넌트의 최종 버전입니다:

```js
import React, { useRef, useEffect } from "react";

const Modal = ({ isOpen, setIsOpen }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const modalElement = modalRef.current;
      // 포커스 가능한 HTML 요소를 포함하고 싶다면 이 문자열에 추가하세요
      const focusableElements = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKeyPress = (event) => {
        if (event.key === "Tab") {
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      };

      const handleEscapeKeyPress = (event) => {
        if (event.key === "Escape") {
          setIsOpen(false);
        }
      };

      modalElement.addEventListener("keydown", handleTabKeyPress);
      modalElement.addEventListener("keydown", handleEscapeKeyPress);

      return () => {
        modalElement.removeEventListener("keydown", handleTabKeyPress);
        modalElement.removeEventListener("keydown", handleEscapeKeyPress);
      };
    }
  }, [isOpen, setIsOpen]);

  return isOpen ? (
    <div className="modal" ref={modalRef}>
      <div className="modal__box">
        <span>Tab 키를 눌러 자식 요소들 사이로 포커스를 이동하세요. Esc 키를 눌러 모달을 닫을 수 있습니다.</span>
        <a className="modal__box__children" href="www.google.com">
          링크
        </a>
        <button className="modal__box__children">모달 버튼</button>
        <input className="modal__box__children"></input>
        <span className="modal__box__children" tabIndex="0">
          포커스 가능한 텍스트
        </span>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
```

마침내, 포커스 트래핑을 구현하여 사용자가 모달 외부로 의도치 않게 이동하지 않도록 보장합니다.

<img src="https://miro.medium.com/v2/resize:fit:1400/1*9jPfh_LYgjYCEKWBTcORow.gif" />

# 결론

이 기사에서는 사용자 정의 React 모달 구성 요소에서 초점 포착을 어떻게 달성하는지 살펴보았습니다. 모달 내에서 초점을 적절하게 관리함으로써 응용 프로그램의 접근성과 사용성을 향상시킬 수 있습니다. 기술의 기본 원리를 이해하고 코드에 구현함으로써, 더 견고하고 사용자 친화적인 응용 프로그램을 개발할 수 있습니다.

이 기사에서 만든 모달 구성 요소의 완전한 코드는 CodeSandbox 데모에서 찾을 수 있습니다.

필요한 초점 포착 로직을 처리하는 외부 라이브러리가 있더라도, 내부 로직을 이해하고 도움말 확인을 직접 만드는 것이 중요하다고 생각합니다. 그러나 특정 필요에 대한 외부 라이브러리를 구현하는 것도 많은 시간을 절약할 수 있습니다. 각 구현 결정의 장단점을 따져 현명하게 작업하는 것이 현명합니다.

One of those external solutions is the accessibility-focused open-source library CactusUI where focus trapping is handled within the FocusTrap component. You may find the source code in the following repository.

![Focus Trap Component](/assets/img/2024-05-12-AchievingFocusTrappinginaReactModalComponent_1.png)

Remember, focus trapping is just one aspect of creating accessible modal components. It’s essential to consider other accessibility practices, such as screen reader compatibility, keyboard navigation, and ARIA attributes, to ensure an inclusive experience for all users.

# 소셜미디어

# Github

# Linkedin

Ogun Akar — 프론트엔드 개발자 @ ÇSTech

# 참고문헌
