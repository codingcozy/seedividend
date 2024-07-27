---
title: "라이프사이클 후크Lifecycle Hooks에 대한 LWC"
description: ""
coverImage: "/assets/img/2024-05-14-LifecycleHooksinLWC_0.png"
date: 2024-05-14 12:48
ogImage: 
  url: /assets/img/2024-05-14-LifecycleHooksinLWC_0.png
tag: Tech
originalTitle: "Lifecycle Hooks in LWC"
link: "https://medium.com/@saurabh.samirs/lifecycle-hooks-in-lwc-752811011988"
---



![Lifecycle Hooks in LWC](/assets/img/2024-05-14-LifecycleHooksinLWC_0.png)

라이프사이클 훅은 라이트닝 웹 컴포넌트(LWC)를 개발하는 여정에서 굉장히 중요한 부분입니다. 이들은 컴포넌트의 라이프사이클의 다양한 단계를 제어하고 응답하는 능력을 제공하여 Salesforce 생태계에서 웹 컴포넌트를 구축하는데 더 효율적이고 세밀한 접근법을 가능하게 합니다.

이 블로그에서는 LWC 라이프사이클 훅의 세계에 대해 자세히 살펴보겠습니다. 이 훅이 무엇이고 왜 중요한지, 그리고 동적이고 반응성 있는 컴포넌트를 만들기 위해 효과적으로 활용하는 방법에 대해 탐구할 것입니다. LWC 여정을 시작한 지 얼마 안 된 분들이거나 기술을 향상하려는 분들, 이러한 훅을 이해하는 것이 강력하고 효율적인 라이트닝 웹 컴포넌트를 만드는 데 중요합니다.

이 블로그를 통해 LWC에서 사용 가능한 다양한 라이프사이클 훅을 자세히 살펴보고, 이들의 구체적인 사용 사례를 논의하며, 실용적인 예제를 제공하여 실제 응용 가능한 내용을 파악하는 데 도움을 드리겠습니다. 이 여정의 끝에는 컴포넌트 라이프사이클 관리의 기술을 숙달하여 LWC의 전체 잠재력을 활용할 수 있는 지식을 갖추게 될 것입니다.



Lifecycle Hooks in LWC: Managing the Journey of a Lightning Web Component

라이트닝 웹 컴포넌트(LWC)의 라이프사이클 훅

라이트닝 웹 컴포넌트(LWC)는 Salesforce 플랫폼 내에서 동적이고 인터랙티브한 사용자 인터페이스의 구성 요소입니다. 그들의 잠재력을 완벽하게 활용하려면, 개발자들은 이러한 구성 요소들이 라이프사이클 동안 거치는 복잡한 단계를 이해해야 합니다. 이것이 바로 "라이프사이클 훅(Lifecycle Hooks)"의 세계입니다.

# 라이프사이클 훅이란?

LWC의 라이프사이클 훅은 개발자들이 컴포넌트의 여정의 다른 단계에서 개입할 수 있는 미리 정의된 메소드들입니다. 이러한 훅들은 컴포넌트의 라이프사이클에서 발생하는 특정 이벤트와 전환에 대응하고 제어하고 최적화할 수 있는 능력을 제공합니다. 이러한 훅들을 이해하고 효과적으로 사용하는 것이 견고하고 반응적인 컴포넌트를 만드는 핵심입니다.



여기 몇 가지 중요한 라이프사이클 후크에 대한 간단한 개요입니다:

- constructor(): 컴포넌트가 초기화되는 곳입니다. 기본값을 설정하고 일회성 설정을 수행할 수 있습니다.
- connectedCallback(): 컴포넌트가 DOM에 추가된 후에 실행되는 후크입니다. DOM 조작 및 데이터 검색에 좋은 장소입니다.
- renderedCallback(): 렌더링 후에 트리거되는 후크입니다. 렌더링된 DOM에 대한 지식이 필요한 작업에 이상적입니다.
- disconnectedCallback(): 컴포넌트가 DOM에서 제거될 때 호출되는 후크입니다. 정리 작업 및 리소스 해제에 사용하세요.
- errorCallback(): 렌더링 중에 오류가 발생하면 호출되는 후크입니다. 오류를 우아하게 처리할 기회입니다.

# 라이프사이클 후크 흐름

먼저 부모 constructor가 호출되고, 부모 connectedCallBack가 실행된 후, 자식 컴포넌트가 있으면 자식 constructor → connectedCallback → renderedCallback 순으로 진행되고 다시 부모 renderedCallback로 이동합니다.



![이미지](/assets/img/2024-05-14-LifecycleHooksinLWC_1.png)

1. 생성:

- `constructor()`: 컴포넌트 인스턴스가 생성될 때 실행되는 첫 번째 후크입니다. 변수를 초기화하고 기본 값 설정하는 곳입니다.

주의하세요!



생성자()

- 컴포넌트의 인스턴스가 생성될 때 호출됩니다(init()와 비슷합니다).
- 부모 컴포넌트에서 먼저 발생하며 부모에서 자식으로 흘러갑니다.
- 부모 클래스 생성자인 LightningElement를 호출하려면 먼저 super()를 호출해야 합니다.
- 컴포넌트 템플릿에서 요소에 액세스하려면 this.template을 사용하세요.

```js
import { LightningElement } from 'lwc';
 
export default class LifeCycleHookParent extends LightningElement {
  constructor() {
    super(); // LightningElement 클래스 생성자를 호출합니다. console.log('Parent Constructor Called');
    let con = this.template // 호스트 요소에 액세스합니다.
    console.log(con);
  }
}
```

2. 초기화:



- `connectedCallback()`: 컴포넌트가 초기화된 후에 이 훅이 호출됩니다. DOM 조작 및 데이터 검색에 이상적인 위치입니다.

주의!

connectedCallback()

- 컴포넌트가 DOM에 삽입될 때 호출됩니다.
- 부모에서 자식으로 흐릅니다.
- 데이터를 가져오고 캐시를 설정하며 이벤트를 수신하는 초기화 작업을 수행하는 데 사용됩니다.
- 컴포넌트가 DOM에 연결되어 있는지 확인하려면 isConnected 메서드를 사용하세요.



```js
connectedCallback(){
  console.log('Parent Connected Call Back called');
  let cb = this.template
  console.log('is connected=> ' + cb.isConnected);
}
```

3. 렌더링:

- `renderedCallback()`: 이 훅은 컴포넌트의 초기 렌더링 후에 트리거됩니다. 요소와 상호 작용하는 것과 같은 렌더링된 DOM에 대한 지식이 필요한 작업에 적합합니다.

주의하세요!




renderedCallback()

- 컴포넌트가 렌더링 프레임워크를 완료한 후에 로직을 수행할 때 사용합니다. 이는 컴포넌트가 UI에 완전히 렌더링된 후에 호출됩니다.
- 자식 컴포넌트에서 부모 컴포넌트로 흐름이 됩니다.
- 컴포넌트는 여러 번 렌더링되어 렌더링 콜백을 추적하려면 isRendered 불리언 필드를 사용하세요.
- 렌더링된 콜백 내에서 무한 루프로 이어지는 속성을 조심하세요.

```js
import { LightningElement } from 'lwc';
export default class LifeCycleHookParent extends LightningElement {
  isRendered = true // 컴포넌트가 렌더링되었는지 확인하기 위한 변수
  renderedCallback() {
    if (this.isRendered) {
      console.log('부모 컴포넌트의 렌더링 콜백이 호출되었습니다');
      this.isRendered = false
    }
  ?
 }
```

4. Reactivity:



- 컴포넌트 내의 속성 또는 변수가 변경될 때마다 반응성 주기가 트리거될 수 있습니다. 이 주기 중에는 컴포넌트가 속성 변화를 확인하며, 변화가 감지되면 다시 렌더링되고 `renderedCallback`을 다시 호출합니다.

5. 소멸:

- `disconnectedCallback()`: 컴포넌트가 DOM에서 제거될 때 이 후크가 호출됩니다. 정리 작업이나 이벤트 리스너와 같은 리소스 해제에 뛰어난 장소입니다.

주의하세요!




disconnectedCallback()

- 문서에서 요소가 제거될 때 호출됩니다 (이벤트 리스너 제거, 시간 간격 제거 등).
- Parent에서 Child로 이어집니다.
- connectedCallback()에서 수행한 작업 정리에 disconnectedCallback()을 사용하십시오. 예를 들어, 이벤트 리스너 제거 등.
- 메시지 채널 구독 취소 등에도 이 후크를 사용할 수 있습니다.

6. 오류 처리:

- `errorCallback()`: 렌더링 중 오류가 발생하면 이 후크가 호출됩니다. 오류를 우아하게 처리하고 적절한 메시지를 표시할 수 있는 기회를 제공합니다.




알아두세요!

errorCallback()

이것을 구현하여 하위 컴포넌트의 모든 오류를 캡처하는 오류 경계 컴포넌트를 만드세요.

하위 컴포넌트의 라이프사이클 훅 또는 HTML 템플릿에서 선언된 이벤트 핸들러 중 발생한 오류를 캡처합니다.



- 자식(하위) 컴포넌트에서 오류가 발생했을 때 호출됩니다.
- errorCallback(error, stack) 함수에 두 가지 아규먼트가 전달됩니다. error 아규먼트는 JavaScript 네이티브 오류 객체이며, stack 아규먼트는 문자열입니다.

```js
//Child Component
connectedCallback(){
  console.log('Child Connected Call Back called');
  throw new Error('problem in child component connectedCallback')
  }
```

```js
//Parent component
errorCallback(error, stack){
  console.log(error 메시지);
  console.log('Stack: - ' + stack);
}
```

이 플로우를 이해하고 각 후크의 사용법을 파악하는 것은 Salesforce 생태계에서 반응형, 효율적이고 인터랙티브 웹 컴포넌트를 효과적으로 관리하고 최적화하는 데 중요합니다.



# 라이프사이클 훅이 왜 중요한가요?

라이프사이클 훅은 여러 이점을 제공합니다:

- 최적화: 적절한 시간에 개입하여 컴포넌트 렌더링을 최적화함으로써 성능과 응답성을 향상시킬 수 있습니다.
- 상호작용: 적절한 라이프사이클 단계에서 사용자 작업에 응답함으로써 상호작용형 컴포넌트를 만들 수 있습니다.
- 자원 관리: 라이프사이클 훅을 사용하여 효율적인 자원 관리가 가능해지며, 컴포넌트가 더 이상 필요하지 않을 때 이벤트 리스너를 해제하고 타이머를 정리할 수 있습니다.

예시: 실용적인 사용 사례



간단한 예제로 라이프사이클 훅의 중요성을 설명해보겠습니다. 카운트다운 타이머 컴포넌트를 구축 중이라고 상상해보세요. 라이프사이클 훅을 사용하는 방법은 다음과 같습니다:

```js
export default class CountdownTimer extends LightningElement {
    seconds = 10;

    connectedCallback() {
        this.timer = setInterval(() => {
            if (this.seconds > 0) {
                this.seconds--;
            }
        }, 1000);
    }

    renderedCallback() {
        if (this.seconds === 0) {
            clearInterval(this.timer);
        }
    }

    disconnectedCallback() {
        clearInterval(this.timer);
    }
}
```

이 예시에서 `connectedCallback`은 타이머를 설정하고, `renderedCallback`은 타이머가 0에 도달했을 때 UI를 업데이트하며, `disconnectedCallback`은 컴포넌트가 제거될 때 타이머가 중지되도록 보장합니다.

자세한 내용은 아래 링크를 참조해주세요:



읽어 주셔서 감사합니다 ☺️