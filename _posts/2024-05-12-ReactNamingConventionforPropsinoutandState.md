---
title: "리액트  Props들어오는 값와 State내부값의 명명 규칙"
description: ""
coverImage: "/assets/img/2024-05-12-ReactNamingConventionforPropsinoutandState_0.png"
date: 2024-05-12 20:24
ogImage: 
  url: /assets/img/2024-05-12-ReactNamingConventionforPropsinoutandState_0.png
tag: Tech
originalTitle: "React — Naming Convention for Props (in out) and State"
link: "https://medium.com/javascript-in-plain-english/part-1-react-naming-convention-for-props-in-out-handlers-and-state-e6af2696089a"
---


프로그래밍에서 가장 어려운 일 중 하나가 이름 짓기라고 자주 들어봤을 거예요.

대부분의 경우, 우리는 컴포넌트의 프로퍼티와 상태 변수를 어떻게 명명할지에 대해 많은 생각을 하게 됩니다.

이 자료에서는 React를 사용할 때 내가 사용하는 명명 규칙을 공유하고, 여러분이 프로퍼티와 상태를 어떻게 명명할지 쉽게 결정할 수 있도록 도와드릴 거예요.

# ☯️ 프로퍼티용 명명 규칙



리액트 프롭(prop)을 보는 방식은 입력과 출력 두 가지로 구성되어 있다고 생각해요.

그리고 이 두 가지는 서로 다른 네이밍 규약을 갖고 있어요.

입력 프롭은 부모 컴포넌트에서 자식 컴포넌트로 전달되어 자식 컴포넌트의 동작을 커스터마이즈하는 데 사용돼요.

![React Naming Convention for Props](/assets/img/2024-05-12-ReactNamingConventionforPropsinoutandState_0.png)



출력 props는 입력 props와 거의 동일하지만 그 주요 목적은 이벤트 핸들러로 알려진 것과 같이 자식 컴포넌트가 부모와 통신할 수 있도록 하는 것입니다.

![React-Naming-Convention-for-Props](/assets/img/2024-05-12-ReactNamingConventionforPropsinoutandState_1.png)

이제 입력 및 출력 props 간의 차이를 이해했으므로 네이밍 규칙으로 넘어가 봅시다.

## 입력 props의 네이밍 규칙



입력 프롭스에 대해 다음과 같은 네이밍 규칙을 사용합니다:

- 프롭스가 부울형인 경우 접두사로 is 또는 has를 사용하고 그 뒤에 프롭스의 이름을 붙입니다. 예를 들어: isDisabled, hasError, isActive, isOpen.

- 프롭스가 컴포넌트의 "도메인 값" 또는 "도메인 데이터"인 경우 그것을 값으로 명명합니다. 문자열, 숫자, 배열 또는 객체인지에 상관없이 모두 value로 명명합니다. 네이티브 HTML 요소 속성과 유사합니다. 예를 들어: value, defaultValue, initialValue.

- 컴포넌트 내의 자식 컴포넌트의 스타일인 경우, 자식 컴포넌트의 이름 뒤에 Props를 붙입니다. 예를 들어: textProps, buttonProps, inputProps, switchProps.



- 만약 prop이 ref prop이라면, 접미사 Ref 뒤에 ref의 이름을 사용합니다. 예를 들어, inputRef, buttonRef, textRef와 같이 사용합니다.

## 출력 Props에 대한 네이밍 규칙

출력 Props의 경우, 다음과 같은 네이밍 규칙을 사용합니다:

- 만약 prop이 렌더 prop이라면, 접두사 render를 사용하고 prop의 이름을 뒤에 붙입니다. 예를 들어, renderItem, renderHeader, renderFooter와 같이 사용합니다.



- 만약 prop이 이벤트 핸들러인 경우에는 해당 이벤트의 이름 뒤에 on을 붙입니다. 예를 들어, onClick, onSubmit, onClose, onOpen입니다.

일부 출력 props가 이벤트 핸들러일 때에는 해당 이벤트의 이름 앞에 handleOn을 붙입니다. 예를 들어, handleOnClick, handleOnSubmit, handleOnClose, handleOnOpen입니다.

만약 이벤트가 변경(change) 이벤트인 경우에는 이름 뒤에 Change를 추가합니다. 예를 들어, handleOnChange, handleOnInputChange입니다.

![React props naming convention](/assets/img/2024-05-12-ReactNamingConventionforPropsinoutandState_2.png)



# ⚙️ 상태에 대한 네이밍 규칙

상태 속성은 변수의 네이밍 규칙과 거의 동일합니다.

만약 변수에 대해 이미 네이밍 규칙을 가지고 있고 익숙하다면, 동일한 네이밍 규칙을 상태 변수에 적용할 수 있습니다.

하지만 변수에 대해 네이밍 규칙이 없다면, 다음 네이밍 규칙을 사용할 수 있습니다:



- 만약 상태가 부울(Boolean) 값인 경우, 상태의 이름에 "is" 또는 "has" 접두사를 사용합니다. 예를 들면: [isDisabled, setIsDisabled], [hasError, setHasError], [isActive, setIsActive], [isOpen, setIsOpen].

- 만약 상태가 컴포넌트의 "도메인 값" 또는 "도메인 데이터"인 경우, 값을 value로 지정합니다. 이 값이 문자열, 숫자, 배열 또는 객체든 상관없이 모두 같은 value로 표기합니다. 네이티브 HTML 입력 요소와 유사합니다. 예를 들면: [value, setValue], [defaultValue, setDefaultValue], [initialValue, setInitialValue].

위의 명명 규칙 중 어떤 것이 props와 충돌한다면, 구조분해 할 때 별칭으로 설정하세요.

- 만약 상태가 메모이제이션(memoized)된 값인 경우, 상태/컴포넌트의 이름 뒤에 memoized/Memoized 접두사를 사용합니다.



메모이즈된 값이 컴포넌트가 아닌 경우, 접두사는 소문자로 지정됩니다. 예를 들어: memoizedValue, memoizedSum, memoizedResult.

![이미지1](/assets/img/2024-05-12-ReactNamingConventionforPropsinoutandState_3.png)

메모이즈된 값이 컴포넌트인 경우, 접두사는 대문자로 지정됩니다. 예를 들어: MemoizedButton, MemoizedText, MemoizedHeader.

![이미지2](/assets/img/2024-05-12-ReactNamingConventionforPropsinoutandState_4.png)



# 🚀 결론

이름 짓기는 어렵지만 결정을 돕는 가이드가 있다면 더 쉬울 수 있어요.

React 작업 시 사용하는 이 명명 규칙은 HTML 요소 속성에서 영감을 받았습니다. 비슷한 점을 찾아야 해서 일부 명명 규칙을 재사용하는 것을 좋아해요.

만약 이 중 어떤 것도 도움이 되지 않는다면, 언제든지 여러분, 여러분의 사용 사례 및 팀에 가장 적합한 명명 규칙을 만들 수 있다는 것을 염두에 두세요.



하루 마무리할 때 중요한 것은 일관되게 따를 수 있는 네이밍 규칙을 가지고 있다는 것입니다.

언제든지 궁금한 점이 있거나 제안할 내용이 있다면 아래에 댓글을 남겨주세요. 당신의 의견을 듣는 것을 기쁘게 생각할 거에요.

읽어주셔서 감사합니다. 여러분의 여정에 도움이 되기를 바랍니다! ❤️

# 간단히 표현한 것 🚀



In Plain English 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 작가를 클립하고 팔로우해 주세요 👏
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠를 만나보세요