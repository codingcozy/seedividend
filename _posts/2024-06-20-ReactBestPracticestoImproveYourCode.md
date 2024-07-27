---
title: "React 코드 향상을 위한 최상의 실천 방법"
description: ""
coverImage: "/assets/img/2024-06-20-ReactBestPracticestoImproveYourCode_0.png"
date: 2024-06-20 00:04
ogImage: 
  url: /assets/img/2024-06-20-ReactBestPracticestoImproveYourCode_0.png
tag: Tech
originalTitle: "React Best Practices to Improve Your Code"
link: "https://medium.com/@onix_react/react-best-practices-to-improve-your-code-a4c68962d5dd"
---


<img src="/assets/img/2024-06-20-ReactBestPracticestoImproveYourCode_0.png" />

리액트는 현대 웹 개발에서 중심 역할을 하며, 개발자들에게 비교할 수 없는 효율로 동적이고 인터랙티브한 사용자 인터페이스를 만들 수 있는 기회를 제공합니다. 그러나 리액트의 전체 잠재력을 활용하려면 기본적인 친숙함 이상이 필요합니다. 이 기사에서는 리액트 코딩 능력을 향상시키기 위한 포괄적인 다양한 모범 사례를 탐구하겠습니다. 이 원칙을 준수하면 튼튼하고 확장 가능하며 유지보수가 쉬운 어플리케이션을 만들 수 있습니다.

# 1. 클래스 컴포넌트 대신 함수형 컴포넌트를 사용하세요

- 가독성과 간결성: 클래스 기반 컴포넌트 대비 함수와 훅을 사용하면 더 간단하고 간결한 구문을 얻을 수 있습니다. 함수로 전환하면 클래스 없이 함수형 컴포넌트를 만들 수 있어 코드의 가독성과 이해도를 향상시킬 수 있습니다. 함수는 'this' 키워드, 생성자 및 라이프사이클 함수를 관리하는 복잡성을 제거하여 더 깔끔한 코드를 제공합니다.
- 코드 재사용성: 여러 컴포넌트에서 로직을 추출하고 재사용할 수 있도록 허용함으로써 훅은 코드 재사용성을 향상시킵니다. 고차 컴포넌트나 렌더 속성을 사용하지 않고도 사용자 정의 훅으로 상태 변화와 상호작용할 수 있습니다.
- 미래에 대한 유연성: 최근 몇 년간 리액트는 컴포넌트 작성의 주요 방법으로 훅의 널리 퍼지는 사용을 옹호해왔습니다. 리액트 팀은 함수를 사용하여 컴포넌트를 만드는 것을 권장하며 계속해서 능력을 향상하고 확장하기 위한 투자를 계속하고 있습니다.
- 성능 향상: 훅을 사용하면 성능을 개선하기가 더 쉬워집니다. useCallback 및 useMemo와 같은 훅을 활용하면 함수와 값을 캐시하여 추가 렌더링 반복이 필요 없게 하고 컴포넌트 성능을 향상시킬 수 있습니다.

<div class="content-ad"></div>

```js
// Counter.js
import React, { Component } from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }

    incrementCount() {
        this.setState({
            count: this.state.count + 1,
        });
    }

    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={() => this.incrementCount()}>
                    Increment
                </button>
            </div>
        );
    }
}

export default Counter;
```

함수 구성 요소를 사용하면 더 명확하고 간단하게 재사용 가능하고 모듈식 코드를 개발할 수 있습니다.

```js
// Hook
import React, { useState } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);

    const incrementCount = () => {
        setCount(prevCount => prevCount + 1);
    };

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={incrementCount}>
                Increment
            </button>
        </div>
    );
};

export default Counter;
```

# 2. 구성 요소 조합


<div class="content-ad"></div>

리액트에서 컴포넌트 구성은 더 작은 컴포넌트를 조합하여 재사용 가능한 UI 컴포넌트를 생성하는 실천을 말합니다. 이를 통해 개발자들은 복잡한 UI를 작은, 더 관리하기 쉬운 부분으로 분해하여 응용 프로그램의 다른 부분에서 쉽게 재사용할 수 있게 됩니다.

Component Composition을 사용하는 여러 이점이 있습니다:

- 재사용성: 컴포넌트는 응용 프로그램의 다른 부분에서 쉽게 재사용할 수 있어 UI를 유지하고 업데이트하기 쉽게 만듭니다.
- 모듈성: UI를 더 작고 관리하기 쉬운 컴포넌트로 분해하면 특히 크고 복잡한 응용 프로그램에 대해 이해하고 작업하기가 쉬워집니다.
- 관심사의 분리: UI를 더 작은 컴포넌트로 분리함으로써 각 컴포넌트가 자체 특정 기능에 집중할 수 있어 테스트하고 디버깅하기가 쉬워집니다.
- 코드 유지보수성: 이해하고 유지 관리하기 쉬운 작은 컴포넌트를 사용하면 시간이 흐른 후 응용 프로그램을 업데이트하고 변경하기가 쉬워집니다.

```js
import React from ‘react’;
import { PropTypes } from “prop-types”;

const Button = (props) => {
  return (
    <div>
      <button type=“button”>Handler</button>
    </div>
  )
};
```

<div class="content-ad"></div>

React PropTypes는 React 애플리케이션에서 코드 품질, 유지 관리성 및 개발자 생산성을 향상시키는 데 중요한 런타임 유형 검사, 문서화, 디버깅 지원 및 API 정의 기능을 제공합니다.

# 3. 인라인 스타일 사용을 피하세요

인라인 스타일의 가장 큰 문제점 중 하나는 코드 유지와 업데이트가 어려워진다는 것입니다. 웹 페이지의 모양을 변경하려면 스타일 속성이 있는 모든 요소를 수정해야 하며, 하나의 외부 또는 내부 스타일 시트를 수정하는 대신 수정해야 합니다. 이렇게 되면 복잡성이 증가하고 효율성이 감소하며, 웹 애플리케이션 스타일을 변경할 때 오류가 발생할 가능성이 더 높아집니다.

```js
import React from "react";

const styles = {
  width: 200,
  height: 50,
  backgroundColor: 'red'
};

const Button = () => (
  <button style={styles}>My Button</button>
)
```

<div class="content-ad"></div>

# 4. Arrow 함수 사용하기

Arrow 함수를 사용하면 일반 함수 표현식과 비교하여 더 간결한 구문을 제공할 뿐만 아니라 코드 가독성을 향상시키고 작은 함수(예: 이벤트 핸들러 또는 콜백 함수)에 대해 불필요한 말을 줄일 수 있습니다. 이들의 간결한 구문은 코드베이스의 명확성을 유지하고 전반적인 가독성을 향상시키는 데 도움이 됩니다. 더불어 arrow 함수는 주변 코드의 렉시컬 스코프를 상속받아 특정 상황에서 명시적으로 'this'를 바인딩할 필요가 없게 하므로 더 깔끔하고 직관적인 코드를 작성할 수 있습니다. Arrow 함수를 활용하면 코드 유지 관리성을 향상시키고 개발 프로세스를 간소화하여 더 효율적이고 읽기 쉬운 코드를 작성할 수 있습니다.

```js
const App = () => (
  <Container>
    {/* 앱 코드의 나머지 부분 */}
  </Container>
);
``` 

# 5. lazy()와 Suspense() 함수 사용하기

<div class="content-ad"></div>

React에서는 lazy() 함수와 component를 사용하여 코드 분할과 로딩 상태 처리를 조절하며, 특히 초기 로드 시간을 최적화하고 사용자 경험을 향상시키는 데 유용합니다. 이는 로딩 인디케이터를 표시함으로써 대규모 응용 프로그램에서 특히 유용합니다.

- lazy() 사용:

lazy() 함수를 사용하면 컴포넌트를 동적으로 가져올 수 있습니다. 이는 컴포넌트가 실제로 필요할 때만 로드되어 초기 렌더링 중에 미리 로드되지 않습니다. 특히 대규모 컴포넌트나 즉시 필요하지 않은 컴포넌트에 유용합니다.

- `Suspense` 사용:

<div class="content-ad"></div>

해당 컴포넌트는 Lazy-로드되는 컴포넌트가 로드될 때까지 기다리는 동안 로딩 표시기를 지정할 수 있게 해줍니다. 이것은 Lazy-로드되는 컴포넌트를 감싸는 역할을 합니다.

```js
import React, { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

export default App;
```

이 접근법은 실제로 필요할 때만 로드되는 Less Critical 컴포넌트로 인해 응용 프로그램의 초기 번들 크기와 로드 시간을 최적화하는 데 도움이 됩니다. 특히 초기 로드 크기를 줄이는 것이 성능에 중요한 대규모 응용 프로그램에서 특히 유익합니다.

<div class="content-ad"></div>

React 애플리케이션에서 최적의 성능을 유지하기 위해서는 구성 요소 렌더링 효율을 향상시키는 것이 중요합니다, 특히 복잡하고 방대한 사용자 인터페이스를 가진 애플리케이션의 경우입니다. 아래의 전략을 통해 렌더링 성능을 향상시킬 수 있습니다:

React.memo 활용: 고차 컴포넌트인 React.memo를 활용하면 구성 요소 렌더링 결과를 메모화할 수 있습니다. 이를 통해 구성 요소의 props가 변경되지 않은 경우 불필요한 재렌더링을 방지할 수 있습니다.

```js
import React from 'react';

const MyComponent = React.memo(({ prop1, prop2 }) => {
  // 구성 요소 렌더링 로직
});

export default MyComponent;
```

이 최적화 기술을 구현함으로써 React 애플리케이션의 전반적인 성능과 반응성을 크게 향상시킬 수 있습니다.

<div class="content-ad"></div>

# 7. TypeScript 사용하기

TypeScript는 JavaScript의 typed superset으로서 일반 JavaScript로 컴파일됩니다. 클래스, 모듈 및 인터페이스를 제공하여 견고한 구성 요소를 구축하는 데 도움이 됩니다.

```js
import React from 'react';

interface Props {
  name: string;
}

const Hello: React.FC<Props> = ({ name }) => <div>Hello {name}</div>;
```

# 8. 유형 선언 도구 사용하기

<div class="content-ad"></div>

만약 TypeScript를 사용할 수 없는 경우, prop-types나 다른 대안과 같은 타입 체크 도구나 라이브러리를 활용하는 것을 권장합니다. 이러한 도구들은 React 컴포넌트 내에서 타입 체크를 보장하여 각 prop으로 전달된 데이터의 정확성을 확보하는 데 도움을 줍니다. prop-types는 인기 있는 선택지이지만, 현대적인 개발 관행과 더 잘 부합하는 대안 라이브러리를 탐색하는 것이 좋습니다.

- 타입 체크: 이러한 도구들을 사용하여 prop의 예상 데이터 타입을 정의할 수 있어, 타입 제약을 강제함으로써 런타임 오류를 최소화할 수 있습니다.
- 디버깅: 타입 위반이 발생했을 때 경고가 발생하여, 잘못된 prop 사용과 관련된 문제를 식별하고 해결하는 데 도움이 됩니다.
- 문서화: 명시적으로 prop 타입을 지정함으로써, 이러한 도구들은 예상하는 prop 및 각각의 데이터 타입에 대한 문서로서, 개발자들에게 명확한 정보를 제공합니다.
- 코드 유지보수성: 이러한 도구들을 사용함으로써 코드의 가독성과 유지보수성이 향상되어, 개발자들이 구성 요소 인터페이스를 더 잘 이해하고 효과적으로 협업할 수 있습니다.

prop-types가 오랜 기간 사용된 솔루션이긴 하지만, 생태계는 변화하고 있으며, 다른 도구를 탐색하여 현대적인 개발 관행과의 호환성을 확보하는 것이 중요합니다.

# 9. ESLint 사용하기

<div class="content-ad"></div>

ESLint은 React 애플리케이션에서 코드 품질, 일관성, 잠재적인 오류 또는 버그를 확인하는 데 사용되는 인기 있는 도구입니다. ESLint가 React 개발에서 널리 사용되는 이유와 중요한 기능들은 다음과 같습니다:

- 정적 코드 분석: ESLint는 코드를 실행하지 않고 검사하는 정적 분석을 수행합니다. 이렇게 함으로써 ESLint는 개발 프로세스 초기에 오류와 잠재적인 문제를 감지하여 버그를 방지하고 코드 품질을 향상시킬 수 있습니다.
- 사용자 지정 규칙: ESLint를 사용하면 React 개발에 맞게 사용자 정의 규칙을 정의하거나 사전 정의된 규칙 세트를 사용할 수 있습니다. 이러한 규칙은 프로젝트 내에서 코딩 표준, 최상의 실천 방법 및 규칙을 강요합니다. 예를 들어, 특정 React 패턴의 사용을 강제하거나 훅을 올바르게 사용하거나 사용되지 않는 메서드를 피하도록 할 수 있습니다.
- 자동화된 코드 리뷰: ESLint를 CI/CD 파이프라인에 통합하여 개발 워크플로에 자동화된 코드 리뷰를 포함시킬 수 있습니다. 이를 통해 코드 품질 표준이 모든 코드 기여 부분에서 일관되게 유지되도록 보장하고 회귀를 방지할 수 있습니다.
- 코드 일관성: ESLint는 일관된 코딩 스타일을 강요함으로써 코드베이스 전체에서 일관성을 유지하는 데 도움을 줍니다. 이는 여러 개발자가 코드를 기여하는 협업 프로젝트에서 특히 중요합니다. 일관된 코드는 읽기, 이해 및 유지 관리가 쉬워져 전체 프로젝트 품질을 향상시킵니다.

# 10. 테스트 케이스 작성

테스트는 React 개발의 중요한 측면이며 무시해서는 안 되는 부분입니다. 이를 통해 응용 프로그램이 높은 품질, 신뢰성 및 훌륭한 사용자 경험을 제공하는지 확인할 수 있습니다. 이러한 React 컴포넌트의 테스트 케이스는 방대한 수의 React 테스트 케이스를 포함할 수 있습니다.

<div class="content-ad"></div>

리액트 애플리케이션을 테스트하는 데 사용할 수 있는 여러 유형의 테스트가 있습니다.

- 유닛 테스트: 유닛 테스트는 React 애플리케이션의 개별 컴포넌트를 테스트하는 데 사용됩니다. 각 컴포넌트의 기능을 독립적으로 테스트하여 의도한 대로 작동하는지 확인합니다. 유닛 테스트는 일반적으로 Jest 또는 Mocha와 같은 테스트 프레임워크를 사용하여 작성됩니다.
- 통합 테스트: 통합 테스트는 애플리케이션의 다른 컴포넌트가 함께 작동하는 방식을 테스트하는 데 사용됩니다. 컴포넌트 간 상호 작용을 테스트하여 의도한 대로 작동하는지 확인합니다. 통합 테스트는 Cypress 또는 Selenium과 같은 테스트 프레임워크를 사용하여 작성할 수 있습니다.
- End-to-End 테스트: 엔드투엔드 테스트는 전체 애플리케이션을 테스트하는 데 사용됩니다. 사용자의 관점에서 애플리케이션을 테스트하여 의도한 대로 작동하는지 확인합니다. 엔드투엔드 테스트는 Cypress 또는 Selenium과 같은 테스트 프레임워크를 사용하여 작성할 수 있습니다.
- 컴포넌트 테스트: React 컴포넌트는 효율적으로 테스트할 수 있는 작고 재사용 가능한 코드 조각입니다. 이 단계에서는 DOM 상호 작용을 테스트하고자 합니다.

리액트에서 테스트 케이스를 작성하는 것은 코드 신뢰성을 보장하고 코드 품질을 높이며 리팩토링을 용이하게 하며 CI/CD 파이프라인을 지원하고 개발자 신뢰도를 향상시키며 개발팀 간 협업을 촉진하는 데 중요합니다. 이는 리액트 애플리케이션의 총 안정성과 유지보수성에 기여하는 소프트웨어 개발 프로세스의 필수 요소입니다.

Telegram / Instagram / Facebook / Threads / GitHub