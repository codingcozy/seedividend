---
title: "칼닷컴을 리액트를 이용하여 웹사이트에 통합하는 단계별 안내"
description: ""
coverImage: "/assets/img/2024-05-12-IntegratingCalcomIntoYourWebsiteUsingReactAStep-by-StepGuide_0.png"
date: 2024-05-12 22:44
ogImage: 
  url: /assets/img/2024-05-12-IntegratingCalcomIntoYourWebsiteUsingReactAStep-by-StepGuide_0.png
tag: Tech
originalTitle: "Integrating Cal.com Into Your Website Using React: A Step-by-Step Guide"
link: "https://medium.com/@hamzael550/integrating-cal-com-into-your-website-using-react-a-step-by-step-guide-b9886b8e175f"
---


현재의 빠르게 변화하는 세상에서 비즈니스 및 전문가들이 시간을 효율적으로 관리하기 위해 필수적인 효율적인 일정 관리 도구들이 되었습니다. Cal.com은 회의와 약속을 일정 잡는 과정을 간소화하여 사용자들이 회의를 설정하는 데 자주 발생하는 번복된 소통을 최소화하고 시간을 절약할 수 있는 도구 중 하나입니다. 이 블로그 포스트에서는 React를 사용하여 웹 사이트에 Cal.com을 원활하게 임베드하는 방법에 대해 살펴보겠습니다. React는 사용자 인터페이스를 구축하는 데 가장 인기있는 JavaScript 라이브러리 중 하나입니다.

# 단계 1: Cal.com 계정 등록

Cal.com을 웹 사이트에 임베드하려면 먼저 Cal.com에 계정을 등록해야 합니다. 다행히도 이 과정은 간단하며 몇 분 정도 소요됩니다. 등록이 완료되면 Cal.com 대시보드에 접속하여 일정 설정 기본 사항을 사용자 정의하고, 임베드 가능한 일정 링크를 생성할 수 있게 됩니다.



# 단계 2: React 설치하기

이미 진행하지 않았다면 Cal.com을 웹사이트에 통합하기 위해 React 프로젝트를 설정해야 합니다. create-react-app을 사용하거나 React 프로젝트를 초기화하는 선호하는 방법을 사용하여 새로운 React 프로젝트를 만들 수 있습니다.

# 단계 3: Cal.com 위젯 패키지 설치하기 (방법 1)

Cal.com은 React 위젯 패키지를 제공하여 React 애플리케이션에 일정 기능을 쉽게 포함시킬 수 있습니다. Cal.com 위젯 패키지를 설치하려면 npm을 사용할 수 있습니다:



```js
npm install @calcom/react-widget
```

Cal.com 위젯 패키지를 설치한 후 Cal.com 위젯 컴포넌트를 React 애플리케이션에 추가할 수 있습니다. CalcomWidget 컴포넌트를 React 컴포넌트로 가져와 JSX 마크업 내에서 사용하세요:

```js
import React from 'react';
import { CalcomWidget } from '@calcom/react-widget';

const App = () => {
  return (
    <div>
      <h1>내 웹사이트에 오신 것을 환영합니다</h1>
      <CalcomWidget
        schedulingLink="여기에 당신의 일정 관리 링크를 입력하세요"
        buttonText="내 Cal 예약하기"
        
      />
    </div>
  );
}

export default App;
```

"여기에 당신의 일정 관리 링크를 입력하세요"를 Cal.com 대시보드에서 생성된 일정 관리 링크로 대체하세요. 원하는대로 버튼 텍스트를 사용자화할 수 있습니다.



Cal.com 위젯 컴포넌트는 당신의 웹사이트와 일치하도록 커스터마이징할 수 있어요. CalcomWidget 컴포넌트에 props를 전달하여 버튼 텍스트, 버튼 색상, 위젯 크기 등을 다양하게 사용자화할 수 있어요.

당신의 웹사이트는 이렇게 보일 거에요:

![Cal.com Widget Example](/assets/img/2024-05-12-IntegratingCalcomIntoYourWebsiteUsingReactAStep-by-StepGuide_1.png)

# 단계 3: Cal.com 임베드 패키지 설치 (방법 2)



Cal.com은 React 임베드 패키지도 제공합니다. npm을 사용하여 패키지를 설치할 수 있어요:

```js
npm install @calcom/embed-react
```

패키지를 설치한 후에는 React 애플리케이션에 Cal.com 임베드 컴포넌트를 추가할 수 있어요. React 컴포넌트에서 Cal 컴포넌트를 가져와 JSX 마크업 안에서 사용하세요:

```js
import React from 'react';
import Cal from "@calcom/embed-react";

export default function App() {
  return (
    <div className="App">
      <h1>다음은 인라인 cal.com 임베드입니다</h1>
      <Cal calLink="rick/get-rick-rolled"></Cal>
    </div>
  );
}
```



Cal 컴포넌트는 calLink라는 속성과 함께 사용됩니다. 이 속성은 삽입할 Cal.com 일정 링크를 지정합니다. 이 경우 "rick/get-rick-rolled"이 예제 링크로 제공됩니다. 이를 Cal.com 대시보드에서 생성된 실제 Cal.com 일정 링크로 교체해야 합니다.

당신의 웹사이트는 다음과 같이 보일 것입니다:

![Image](/assets/img/2024-05-12-IntegratingCalcomIntoYourWebsiteUsingReactAStep-by-StepGuide_2.png)

# Method 1과 Method 2 사이의 차이는 무엇인가요?



두 코드 스니펫은 모두 Cal.com 일정을 React 애플리케이션에 삽입하는 동일한 목표를 달성합니다.

요약하면, 메소드 1은 상세한 지침과 사용자 정의 옵션을 제공하는 포괄적인 가이드를 제공하며, 메소드 2는 빠른 통합을 위한 간단하고 사용 준비가 된 코드 스니펫을 제공합니다. 두 가지 방법 중 선택은 사용자의 선호도, React에 대한 익숙함 및 통합에 필요한 사용자 지정 수준에 달려 있습니다.

# 단계 6: 웹사이트 테스트 및 배포하기

React 애플리케이션에 Cal.com을 통합한 후에는 모든 것이 올바르게 작동하는지 확인하기 위해 기능을 테스트하는 것이 중요합니다. 누군가가 약속을 예약하면 제어판이 표시됩니다:




![image](/assets/img/2024-05-12-IntegratingCalcomIntoYourWebsiteUsingReactAStep-by-StepGuide_3.png)