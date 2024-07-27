---
title: "사파리 호환 React 날짜 범위 선택기"
description: ""
coverImage: "/assets/img/2024-05-15-Safari-CompatibleReactDateRangePicker_0.png"
date: 2024-05-15 15:27
ogImage: 
  url: /assets/img/2024-05-15-Safari-CompatibleReactDateRangePicker_0.png
tag: Tech
originalTitle: "Safari-Compatible React Date Range Picker"
link: "https://medium.com/nonstopio/safari-compatible-react-date-range-picker-ae310ccf214f"
---


![Safari-Compatible React DateRangePicker](/assets/img/2024-05-15-Safari-CompatibleReactDateRangePicker_0.png)

Safari를 포함한 모든 브라우저에서 작동하는 호환 가능한 날짜 선택기

최근 프로젝트를 진행하면서 날짜 범위 선택기를 구현해야 하는 요구 사항이 있었습니다. 처음에는 MUI CSS 프레임워크를 사용하고 있기 때문에 MUI 날짜 선택기를 사용하기로 결정했습니다. 그러나 Safari에서 예기치 않은 동작을 보여주는 문제가 발생하여 고민이 되었습니다. 다양한 패키지를 사용하여 여러 Proof of Concept (POC)를 수행한 결과, 이 날짜 선택기를 사용하기로 결정했습니다.

같은 문제를 겪고 있다면, 이 블로그가 시간과 노력을 절약해 줄 것입니다. 웹 디자인의 복잡성을 탐험하는 초보자든 믿을 만한 솔루션을 찾아다니는 숙련된 개발자든, 이 블로그는 여러분에게 이상적인 날짜 선택기를 찾는 길잡이 역할을 합니다. 그러니 시작해 봅시다!



이 문제를 해결하기 위해 react-datepicker을 사용했어요. 이 패키지는 Safari를 포함한 모든 브라우저를 지원하며 특히 Safari에서 잘 작동하며 모든 요구 사항을 충족합니다. 이 패키지는 구현이 매우 쉽습니다. 이 패키지를 어떻게 구현하는지 알아보겠습니다.

터미널에서 루트 프로젝트 디렉토리를 열고 아래 명령을 하나씩 입력하세요. 이 패키지는 구성을 필요로 하지 않아요.

```js
npm install react-datepicker --save

---OR---

yarn add react-datepicker
```

데이트 피커를 사용하려면 라이브러리에서 데이트 피커를 가져와서 아래 코드처럼 속성 몇 가지를 지정하세요. 이렇게 하면 기본적인 데이트 피커가 준비되어요.



```js
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Example = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker 
     selected={startDate} 
     onChange={(date) => setStartDate(date)}
     />
  );
};
```

일부 다른 속성을 추가할 수 있습니다. 예를 들어 dateFormat="dd/MM/yyyy" 및 placeholderText="DD/MM/YYYY". minDate='new Date()'을 사용하여 현재 날짜를 시작 날짜로 설정할 수 있습니다. 아래에서 이 예시를 확인해 보세요.

# 이제 범위 선택기로 사용하는 방법을 살펴봅시다

범위 선택기를 만들려면 DatePicker 구성 요소를 두 번 사용하고 몇 가지 상태를 관리해야 합니다. datePicker를 범위 선택기로 설정하려면 selectsStart 및 selectsEnd를 지정하여 유형을 지정해야 합니다.




여기 있습니다. 크로스 브라우저 지원을 제공하는 날짜 범위 선택기가 있습니다. 날짜 선택기의 공식 문서를 확인해보세요. 많은 사용자 정의 옵션을 제공합니다. 이 블로그가 유용하길 바랍니다. 개발자 친구들과 공유하고 좋아요를 눌러주세요.