---
title: " 당신의 React 프로젝트를 위한 전화 입력 - react-international-phone"
description: ""
coverImage: "/assets/img/2024-05-12-PhoneinputforyourReactprojectreact-international-phone_0.png"
date: 2024-05-12 19:23
ogImage: 
  url: /assets/img/2024-05-12-PhoneinputforyourReactprojectreact-international-phone_0.png
tag: Tech
originalTitle: "📞 Phone input for your React project — react-international-phone"
link: "https://medium.com/@goveo/phone-input-for-your-react-project-react-international-phone-b3067eac9ed6"
isUpdated: true
---




## React 코드베이스에 멋진 국제 전화번호 입력 컴포넌트를 구현해보세요

## 배경 이야기

저는 React를 UI 빌딩 라이브러리로 사용하는 내 작업 프로젝트 중 하나에서 휴대전화 번호를 입력하는 컴포넌트를 구현하는 문제를 마주쳤어요. 사용하던 한 인기 있는 전화 입력 라이브러리를 사용하는 컴포넌트가 있었지만, 스타일링하기 불편하고 작업하기도 어려웠어요.

일부 npm 패키지를 조사한 후, 제 요구 사항을 충족시키는 라이브러리가 없다는 것을 알게 되었어요:



- 전화 번호 형식은 모든 입력 구성 요소에 쉽게 통합할 수 있어야 합니다 (Material UI, Chakra UI, Ant Design 등과 같은 모든 UI 프레임워크와 통합 가능).
- 쉽게 스타일링할 수 있는 독립적인 전화 번호 입력 구성 요소를 제공해야 합니다.
- 입력 시 편안한 느낌이어야 합니다. 입력 캐럿 위치가 제대로 처리되어야 하며, 복사/붙여넣기/실행 취소/다시 실행이 예상대로 작동해야 합니다.
- 입력된 전화 번호를 확인할 수 있는 방법을 제공해야 합니다.

그래서 이러한 기능을 모두 지원하는 내 라이브러리를 작성하기로 결정했습니다.

# react-international-phone

🎉 react-international-phone을 소개합니다! 🎉



라이브러리는 React 애플리케이션용 전화 입력 컴포넌트를 제공합니다. 국제 지원을 포함한 전화 번호를 위한 사용자 정의 가능하고 쉽게 사용할 수 있는 입력 필드를 제공합니다.

![전화 입력 컴포넌트](https://miro.medium.com/v2/resize:fit:642/1*4NHcF2JMyXfeqVlCRJD9PQ.gif)

react-international-phone의 주요 기능:

- 🌈 입력란 내에서 타이핑, 복사/붙여넣기, 실행취소/다시실행이 자연스럽게 작동
- 🔍 전화 번호 형식(국가 추측과 함께)
- 🏁 국가 깃발 렌더링(Twemoji와 함께)
- ✅ 기본 제공 전화 유효성 검사
- 🔒 제3자 의존성 없음(낮은 번들 크기)
- 🔧 쉽게 사용자 정의 가능합니다



## 기본 사용법

이 라이브러리는 통합하기 매우 쉽습니다. PhoneInput 컴포넌트와 스타일을 가져오기만 하면 됩니다. 다음은 기본 사용법 코드 스니펫입니다:

```js
import { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const App = () => {
  const [phone, setPhone] = useState('');

  return (
    <div>
      <PhoneInput
        defaultCountry="ua"
        value={phone}
        onChange={(phone) => setPhone(phone)}
      />
    </div>
  );
};
```

CodeSandbox에서 라이브 데모를 확인하세요



## UI 라이브러리 통합

react-international-phone은 Material UI, Ant Design, 또는 Chakra UI와 같은 거의 모든 기존 UI 라이브러리와 통합할 수 있습니다.

보통 사용하는 입력 필드와 함께 전화 번호 형식 지정 로직을 제공하는 usePhoneInput 훅을 사용하고, 국가 선택 드롭다운을 제공하는 `CountrySelector/` 하위 구성 요소를 함께 사용할 수 있습니다.

MUI, Chakra, 그리고 Antd를 사용한 라이브러리 사용 예제가 있습니다:



## ✔️ 유효성 검사

이 패키지는 (당연히) 전화번호 유효성 검사를 제공하는 usePhoneValidation 훅을 제공합니다.

```js
const [phone, setPhone] = useState("");
const phoneValidation = usePhoneValidation(phone);

// 이제 `phoneValidation.isValid`를 사용하여 전화번호가 유효한지 확인할 수 있습니다
```

## 🔧 사용자 정의



라이브러리는 전화 입력의 기본 동작과 모양을 사용자 지정하는 방법을 제공합니다. 다음은 가능한 작업의 일부입니다:

- 프롭 또는 CSS를 통해 `PhoneInput/` 컴포넌트의 어떤 부분에도 사용자 정의 스타일 적용
- 다이얼 코드 강제 (선택된 국가 다이얼 코드를 삭제/변경하지 못하도록 함)
- 국가 선택기 드롭다운 숨기기
- 초기 국가 자동 입력 비활성화
- 국가 다이얼 코드 숨기기
- 국가 목록 필터링 및 수정

이러한 사용 사례의 데모를 이 스토리북에서 확인할 수 있습니다:
https://react-international-phone-storybook.vercel.app/

## 📚 문서



아래에 전체 설명서를 찾을 수 있습니다:
https://react-international-phone.vercel.app/

## 🌟 감사합니다

react-international-phone 패키지가 마음에 드시면 GitHub 저장소에 별을 남겨주세요.
문제, 버그, 또는 질문이 있으면 GitHub에 이슈를 열거나 토론을 해주세요.

도움이 되었다면 박수를 잊지 마세요!
즐거운 코딩하세요 👋