---
title: "사용자 경험 향상을 위한 사용자 정의 JavaScript 활용하기 Div 바깥에서의 클릭 처리하기"
description: ""
coverImage: "/assets/img/2024-05-12-TitleLeveragingCustomJavaScripttoEnhanceUserExperienceHandlingClicksOutsideaDiv_0.png"
date: 2024-05-12 20:00
ogImage: 
  url: /assets/img/2024-05-12-TitleLeveragingCustomJavaScripttoEnhanceUserExperienceHandlingClicksOutsideaDiv_0.png
tag: Tech
originalTitle: "Title: Leveraging Custom JavaScript to Enhance User Experience: Handling Clicks Outside a Div"
link: "https://medium.com/@hridoymahmud/title-leveraging-custom-javascript-to-enhance-user-experience-handling-clicks-outside-a-div-c71af16a1f64"
isUpdated: true
---




<img src="/assets/img/2024-05-12-TitleLeveragingCustomJavaScripttoEnhanceUserExperienceHandlingClicksOutsideaDiv_0.png" />

현대 웹 개발에서 사용자가 직관적이고 원활한 경험을 할 수 있도록 만들어주는 것이 매우 중요합니다. 개발자들이 자주 마주치는 상황 중 하나는 드롭다운 메뉴, 모달 또는 페이지의 다른 곳을 클릭했을 때 해당 요소가 닫혀야 하는 경우입니다. 이 글에서는 이 요구 사항을 우아하게 처리하기 위한 사용자 정의 JavaScript 솔루션을 알아보겠습니다.

문제 이해하기:

사용자 정의 JavaScript 소개:



이번 도전에 대처하기 위해 JavaScript에서 클릭이 지정된 요소 외부에서 발생하는지 감지하는 재사용 가능한 사용자 지정 후크(custom hook)를 만들 것입니다. 이 후크는 사용자 인터페이스를 구축하기 위한 인기 있는 JavaScript 라이브러리인 React를 활용하여 우리의 프론트엔드 코드베이스와 시킬 것입니다.

ClickOutsideWrapper.js

```js
//필요한 종속성을 가져옵니다.
import React, { useRef, useEffect } from 'react';

//지정된 요소 외부에서 클릭을 처리하는 사용자 정의 후크
const useClickOutside = (handler) => {
  const ref = useRef();

  //요소 외부 클릭을 처리하는 함수
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target) && typeof handler === 'function') {
      handler();
    }
  };

  useEffect(() => {
    //마우스 다운 이벤트에 대한 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      //컴포넌트 해제 시 이벤트 리스너 제거
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler]); //의존성 배열에 핸들러를 포함

  return ref;
};

//useClickOutside 후크를 활용하는 래퍼 컴포넌트
const ClickOutsideWrapper = ({ children, onClickOutside }) => {
  const wrapperRef = useClickOutside(onClickOutside);
  return <div ref={wrapperRef}>{children}</div>;
};

export default ClickOutsideWrapper;
```

구현 탐색:



- useClickOutside 훅: 이 사용자 정의 훅은 지정된 요소 외부의 클릭을 감지하는 로직을 캡슐화합니다. 콜백 함수 핸들러를 인수로 사용하며, 해당 요소 외부를 클릭할 때 호출됩니다.
- handleClickOutside 함수: 이 함수는 ref로 참조된 요소 외부에서 클릭이 발생했는지 확인합니다. 그리고 유효한 핸들러 함수가 제공되었고, 클릭이 요소 외부에서 발생했다면 핸들러를 실행합니다.
- useEffect 훅: 이 훅은 요소 외부의 클릭을 감지하는 이벤트 리스너를 추가하고 제거하는 역할을 담당합니다. 컴포넌트가 언마운트될 때 이벤트 리스너가 제대로 정리되도록 하여 메모리 누수를 예방합니다.
- ClickOutsideWrapper 컴포넌트: 이 컴포넌트는 해당 요소 외부의 클릭을 감지해야 하는 요소 주위에 래퍼 역할을 합니다. useClickOutside 훅을 활용하고 onClickOutside 콜백 프롭을 전달합니다.

실용적인 사용 사례:

- 드롭다운 메뉴: 사용자가 메뉴 외부를 클릭하면 드롭다운 메뉴를 닫습니다.
- 모달: 사용자가 모달 외부 요소와 상호 작용할 때 모달을 닫습니다.
- 컨텍스트 메뉴: 페이지의 다른 곳을 클릭하면 컨텍스트 메뉴를 숨깁니다.
- 팝오버 및 툴팁: 연관된 요소 외부를 클릭하면 팝오버와 툴팁을 닫습니다.

컴포넌트에서 사용:



```js
import React, { useState } from 'react';
import ClickOutsideWrapper from './ClickOutsideWrapper';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown menu visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown menu when clicked outside
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      {/* 버튼을 클릭하여 메뉴 표시 여부를 전환합니다. */}
      <button onClick={toggleMenu}>메뉴 전환</button>
      
      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <ClickOutsideWrapper onClickOutside={closeMenu}>
          <div className="menu">
            <ul>
              <li>옵션 1</li>
              <li>옵션 2</li>
              <li>옵션 3</li>
            </ul>
          </div>
        </ClickOutsideWrapper>
      )}
    </div>
  );
};

export default DropdownMenu;
```

이 예제에서:

- DropdownMenu 컴포넌트를 가지고 있으며 버튼을 렌더링하여 메뉴의 가시성을 토글합니다.
- 버튼을 클릭하면 isOpen 상태가 토글되고, 이는 메뉴가 표시되는지 여부를 제어합니다.
- DropdownMenu 컴포넌트 내에서 isOpen 상태를 사용하여 드롭다운 메뉴를 조건부로 렌더링합니다.
- 드롭다운 메뉴는 ClickOutsideWrapper 컴포넌트로 래핑되어 있으며 onClickOutside 프롭을 가지고 있습니다. 이 프롭은 메뉴 외부를 클릭했을 때 메뉴를 닫는 closeMenu 함수로 설정됩니다.
- 사용자가 드롭다운 메뉴 외부 요소와 상호 작용할 때 ClickOutsideWrapper 컴포넌트를 사용하여 메뉴가 자동으로 닫히도록 하여 매끄러운 사용자 경험을 제공합니다.



NPM 패키지:

패키지 링크: [click-outside-wrapper](https://www.npmjs.com/package/click-outside-wrapper)

결론:

여기서 소개된 것과 같이 사용자 정의 JavaScript 솔루션을 활용함으로써 개발자들은 웹 애플리케이션의 사용성을 향상시킬 수 있습니다. 특정 요소 외부의 클릭을 감지하는 능력은 개발자들이 더 직관적이고 사용자 친화적인 인터페이스를 만들 수 있도록 돕습니다. 드롭다운 메뉴, 모달 또는 기타 상호 작용 요소일지라도 클릭 외부 기능을 구현하면 웹 개발자에게 귀중한 도구가 됩니다.