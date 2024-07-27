---
title: "React로 카운트다운 타이머 만드는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-BuildingaCountdownTimerinReact_0.png"
date: 2024-06-22 15:35
ogImage: 
  url: /assets/img/2024-06-22-BuildingaCountdownTimerinReact_0.png
tag: Tech
originalTitle: "Building a Countdown Timer in React"
link: "https://medium.com/@primaramadhanip/building-a-countdown-timer-in-react-db93167157b7"
---



![Countdown Timer](/assets/img/2024-06-22-BuildingaCountdownTimerinReact_0.png)

React 애플리케이션에 동적 카운트다운 타이머를 추가해보고 싶었나요? 생산성 앱을 만들고 있거나 라이브 이벤트를 진행하거나 웹사이트를 화려하게 꾸미고 싶은 경우, 카운트다운 타이머는 매력적이고 기능적인 추가물이 될 수 있습니다. 이 기사에서는 React.js를 사용하여 간단하면서도 강력한 1시간 카운트다운 타이머를 구축하는 방법에 대해 살펴보겠습니다.

# 시작하기

코드에 들어가기 전에, 우리가 달성하려는 목표를 명확히 해 봅시다. 우리의 목표는 실시간으로 업데이트되는 시각적으로 매력적인 카운트다운 타이머를 만드는 것입니다. 이 타이머는 1시간부터 0까지 카운트다운됩니다. 이를 달성하기 위해 우리는 인기 있는 React 라이브러리와 useState 및 useEffect 훅을 활용할 것입니다.


<div class="content-ad"></div>

# 카운트다운 컴포넌트

시작해봅시다. 카운트다운 타이머 컴포넌트를 만들어봅시다. 이 컴포넌트는 카운트다운 논리와 렌더링을 캡슐화할 것입니다.

```js
import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  // 초기 시간 (1시간 단위)
  const initialTime = 60 * 60;
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          // 타이머가 0이 되면 수행할 작업
          console.log('카운트다운 완료!');
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    // 컴포넌트가 언마운트될 때 인터벌 정리
    return () => clearInterval(timerInterval);
  }, []); // 빈 의존성 배열은 효과가 마운트 시에 한 번만 실행되도록 함

  // 초를 시간, 분, 초로 변환
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  return (
    <div>
      <p>카운트다운 타이머:</p>
      <p>{`${hours}시간 ${minutes}분 ${seconds}초`}</p>
    </div>
  );
};

export default CountdownTimer;
```

# 카운트다운타이머 컴포넌트 사용하기

<div class="content-ad"></div>

```js
import React from 'react';
import CountdownTimer from './CountdownTimer';

const App = () => {
  return (
    <div>
      <h1>React Countdown Timer</h1>
      <CountdownTimer />
    </div>
  );
};

export default App;
```

# 결론

React와 해당 훅을 이용하여, 유연하고 매력적인 카운트다운 타이머를 제작했습니다. 이를 프로젝트에 손쉽게 통합할 수 있습니다. 스타일링을 맞춤화하거나 음향 효과를 추가하거나, 애플리케이션의 요구 사항에 기반한 추가 기능을 통합하는 자유를 누려보세요.

자, 이제 다음 React 프로젝트에서 시간을 효율적으로 활용해 보세요. 즐거운 코딩되세요!
