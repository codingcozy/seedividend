---
title: "useState와 useRef 훅을 언제 사용하는지 이해하기"
description: ""
coverImage: "/assets/img/2024-06-22-UnderstandingofwhentouseuseStateanduseRefhooks_0.png"
date: 2024-06-22 03:02
ogImage: 
  url: /assets/img/2024-06-22-UnderstandingofwhentouseuseStateanduseRefhooks_0.png
tag: Tech
originalTitle: "Understanding of when to use useState() and useRef() hooks"
link: "https://medium.com/@rdhamnaskar11/understanding-of-when-to-use-usestate-and-useref-hooks-6f7f60f79c82"
---


<img src="/assets/img/2024-06-22-UnderstandingofwhentouseuseStateanduseRefhooks_0.png" />

React는 사용자 인터페이스를 구축하기 위한 자바스크립트 라이브러리입니다. 선언적이고 효율적이며 유연합니다. React는 컴포넌트 기반 접근 방식을 사용하여 인터랙티브한 UI를 쉽게 생성할 수 있습니다.

React에서 Hook은 클래스 컴포넌트를 생성하지 않고도 상태 및 기타 React 기능을 사용하는 방법입니다. 가장 자주 사용되는 Hook 중 하나는 useState()이지만 때로는 useRef()를 사용하는 것이 더 나은 방법으로 상태를 관리할 수 있습니다.

이 글에서는 useState() 훅 이외에 useRef() 훅을 사용할 때에 대해 배우게 됩니다.

<div class="content-ad"></div>

## 사용법 useState():

폼 입력 필드를 처리할 때 주로 사용되는 경우는 제출 버튼이 클릭될 때입니다. 예를 들어, 다음 코드 조각을 살펴보겠습니다:

![화면 캡처 이미지](/assets/img/2024-06-22-UnderstandingofwhentouseuseStateanduseRefhooks_1.png)

위의 예에서는 이메일과 비밀번호 두 가지 입력 필드가 있습니다. 제출 버튼을 클릭하면 두 입력 필드의 값이 콘솔에 기록됩니다. useState() 훅을 사용하여 두 입력 필드의 상태를 관리합니다. 그러나 입력 필드가 변경될 때마다 컴포넌트가 다시 렌더링되도록 합니다.

<div class="content-ad"></div>


![Image](https://miro.medium.com/v2/resize:fit:1400/1*0mz26TiXCcMdstgoUx73ug.gif)

이걸 보면 우리가 onSubmit 안에서만 이 상태 변수들을 사용한다는 것을 알 수 있어요. 즉, 이 상태 변수들이 변경되는 값을 우리는 신경 쓰지 않습니다. 우리는 submit 버튼을 눌렀을 때 상태 변수들의 값만을 신경 씁니다. 

이 예시에서는 문제가 되지 않지만, 보다 복잡한 어플리케이션에서는 성능 문제를 일으킬 수 있어요.

## 이를 피하려면, useState() 대신 useRef()를 사용할 수 있습니다.


<div class="content-ad"></div>

## useRef 사용:

![image](/assets/img/2024-06-22-UnderstandingofwhentouseuseStateanduseRefhooks_2.png)

위 예시에서 useRef를 사용하여 ref를 생성하고 input 필드에 할당합니다. 버튼을 클릭하면 handleSubmit 함수가 실행되고 사용자의 이메일 및 비밀번호를 얻을 수 있습니다.

![image](https://miro.medium.com/v2/resize:fit:1400/1*W-14Q7gk6Cvyre6b_fGalQ.gif)

<div class="content-ad"></div>

보시는 대로, 이메일 및 비밀번호 필드를 변경할 때 컴포넌트가 다시 렌더링되지 않았습니다. 그리고 이를 위해 상태 값이 사용되지 않았습니다.

다음은 useState() 대신 useRef()를 사용해야 하는 경우의 몇 가지 예시입니다:

- 업데이트될 때 다시 렌더링을 트리거하지 않는 값을 저장해야 할 때
- 렌더링 방법에서 사용되지 않는 값을 저장해야 할 때
- 컴포넌트의 수명 동안 지속되어야 하는 값을 저장해야 할 때

# 결론:

<div class="content-ad"></div>

이 기사에서는 useRef와 useState가 React에서 모두 중요한 훅이지만 서로 다른 목적을 가지고 있다는 것을 배웠습니다. useRef는 DOM에 직접 액세스하고 조작할 수 있게 해주는 훅입니다. 요소에 대한 참조를 제공하지만 내용이 변경될 때 다시 렌더링을 트리거하지 않습니다. useState는 컴포넌트의 상태를 관리할 수 있게 해주는 훅입니다. 상태가 변경되면 새로운 상태로 컴포넌트가 다시 렌더링됩니다.

# 읽어 주셔서 감사합니다

이 기사가 유용하게 느껴졌으면 좋겠습니다. 궁금한 점이나 제안 사항이 있으시면 댓글을 남겨 주세요. 피드백은 제게 더 나아질 수 있게 도와줍니다.