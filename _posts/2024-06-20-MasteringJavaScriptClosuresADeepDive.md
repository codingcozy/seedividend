---
title: "자바스크립트 클로저 마스터하기 심층 탐험 "
description: ""
coverImage: "/assets/img/2024-06-20-MasteringJavaScriptClosuresADeepDive_0.png"
date: 2024-06-20 01:23
ogImage: 
  url: /assets/img/2024-06-20-MasteringJavaScriptClosuresADeepDive_0.png
tag: Tech
originalTitle: "Mastering JavaScript Closures: A Deep Dive ✨"
link: "https://medium.com/@bhaskar-pandey/mastering-javascript-closures-a-deep-dive-3e347d95aea8"
isUpdated: true
---




자바스크립트 클로저는 이해하기 어려운 개념 중 하나입니다. 코드에서 클로저를 많이 사용할 수 있지만 그것을 사용하고 있다는 것을 깨닫지 못할 수도 있습니다.

![이미지](/assets/img/2024-06-20-MasteringJavaScriptClosuresADeepDive_0.png)

클로저에 대한 큰 영광은 Will Sentance와 Frontend master가 제공하는 JavaScript: The Hard Parts 강좌에 갑니다.

클로저를 이해하기 위해 먼저 실행 컨텍스트를 이해해야 합니다.

<div class="content-ad"></div>

# 실행 컨텍스트란 무엇인가요?

- 실행 컨텍스트: JavaScript에서 "실행 컨텍스트"란 코드가 실행되는 환경을 말합니다. 실행 컨텍스트에는 코드가 실행되는 동안 접근할 수 있는 변수, 함수, 객체 및 기타 데이터가 포함되어 있습니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*9mMAag-MhCw8FKNtIP5WDA.gif)

# 실행 컨텍스트의 종류:

<div class="content-ad"></div>

- 전역 실행 컨텍스트: 이것은 기본 또는 가장 바깥에 있는 실행 컨텍스트입니다. 스크립트가 실행될 때 생성되며, 함수 내부에 없는 코드가 실행되는 곳입니다. 웹 브라우저에서는 전역 실행 컨텍스트가 윈도우 객체와 관련됩니다.
- 함수 실행 컨텍스트: 함수가 호출될 때마다 해당 함수를 위한 새로운 실행 컨텍스트가 생성됩니다. 이 컨텍스트에는 함수 내에서 정의된 모든 변수, 객체 및 함수가 포함됩니다. 함수 실행이 완료되면 해당 실행 컨텍스트가 실행 스택(호출 스택)에서 제거됩니다.

# 함수 실행 개요

함수가 호출될 때, JavaScript는 함수가 올바르게 실행되도록 일련의 명확하게 정의된 단계를 수행합니다. 다음은 프로세스의 자세한 설명입니다:

- 시작: 실행 컨텍스트 생성

<div class="content-ad"></div>

- 실행 컨텍스트: 함수가 호출될 때 JavaScript는 해당 함수를 위해 새로운 실행 컨텍스트를 생성합니다. 이 컨텍스트에는 필요한 모든 매개변수, 변수 및 함수의 코드가 포함됩니다.
- 호출 스택: 이 새로운 실행 컨텍스트는 호출 스택에 푸시됩니다. 이는 JavaScript가 함수 호출 순서를 관리하는 메커니즘입니다.

- 실행: 라인별 처리

- 라인별 실행: 함수의 실행 컨텍스트 내에서 JavaScript는 함수의 코드를 한 줄씩 처리합니다. 이는 변수 처리, 계산 수행 및 함수 내에서 정의된 다른 작업 실행을 포함합니다.
- 스코프 체인과 클로저: 실행 중에 함수는 클로저 덕분에 자체 지역 변수, 전달된 매개변수 및 외부 범위의 변수에 액세스할 수 있습니다.

- 종료: 정리 및 컨텍스트 제거

<div class="content-ad"></div>

- 함수 호출 스택에서 팝업: 함수가 실행을 완료하면 해당 실행 컨텍스트가 호출 스택에서 팝업됩니다. 이는 컨텍스트가 제거되어 JavaScript가 함수가 호출된 위치에서 코드를 계속 실행하게 됨을 의미합니다.
- 지역 변수 정리: 함수의 실행 컨텍스트 내에서 정의된 지역 변수와 매개변수는 제거되어 메모리와 리소스를 해제합니다.

# 명확성을 위한 예시:

다음 함수의 실행을 자세히 살펴봅시다:

```js
1: const num = 3;
2: function multiplyBy2(inputNumber) {
3:   const result = inputNumber * 2;
4:   return result;
5: }
6: const output = multiplyBy2(num);
7: const newOutput = multiplyBy2(10);
8: console.log(output);
9: console.log(newOutput);
```

<div class="content-ad"></div>

- 1행: 전역 실행 컨텍스트에서 새로운 상수 변수 num을 선언하고 숫자 3을 할당합니다.
- 2~5행: 여기서는 multiplyBy2라는 새로운 함수를 선언합니다. 전역 실행 컨텍스트에 multiplyBy2라는 새 변수를 생성하고 이에 함수 정의를 할당합니다. 이 함수는 inputNumber 매개변수를 받아들이고 그 값을 2배로 곱한 후 결과를 변수 result에 저장하고 반환합니다. 이 함수 내의 코드는 아직 평가되지 않았으며 나중 사용을 위해 저장됩니다.
- 6행: 이 행은 간단해 보이지만 많은 일이 벌어집니다. 먼저, 전역 실행 컨텍스트에 새 변수를 선언하고 output이라고 이름 붙입니다. 이 변수는 처음에는 정의되지 않은 상태입니다.
- 6행 (계속): 함수 multiplyBy2를 호출하여 output에 새 값을 할당할 것입니다. JavaScript 엔진은 전역 실행 컨텍스트에서 multiplyBy2를 찾아 함수 정의를 찾은 후 이를 실행할 준비를 합니다. 변수 num을 인자로 전달합니다. 엔진은 전역 실행 컨텍스트에서 값이 3인 num을 찾고 이 값을 함수에 전달합니다.
- multiplyBy2를 위한 새 실행 컨텍스트: 새로운 로컬 실행 컨텍스트가 생성되어 여기에 multiplyBy2 실행 컨텍스트라고 부르겠습니다. 이 컨텍스트가 호출 스택에 푸시됩니다. 여기서 첫 번째 할 일은 함수 매개변수를 처리하는 것입니다. 이 로컬 실행 컨텍스트에서 새 변수 inputNumber가 선언되고 전달된 값인 3이 할당됩니다.
- 3행: 로컬 실행 컨텍스트 내에서 새로운 상수 변수 result를 선언합니다. 처음에 result는 정의되지 않은 상태입니다. 그런 다음, 식 inputNumber * 2가 평가됩니다. 엔진은 inputNumber를 찾아 이 값을 3으로 가진 로컬 실행 컨텍스트에서 찾은 후 이를 2배로 곱하여 6을 얻습니다. 이 값은 result에 할당됩니다.
- 4행: 결과 값인 6을 반환합니다. 로컬 실행 컨텍스트가 여기서 종료됩니다. 변수 inputNumber와 result는 파괴됩니다. 컨텍스트가 호출 스택에서 팝되고 반환 값 6이 호출 컨텍스트인 전역 실행 컨텍스트에 반환됩니다.
- 6행 (계속): 반환된 값인 6이 output에 할당됩니다.
- 7행: 비슷하게, 전역 실행 컨텍스트에서 다른 변수인 newOutput을 선언하고 인수 10을 사용하여 multiplyBy2를 호출한 결과를 할당합니다. 엔진은 다시 multiplyBy2를 찾고 호출하며 인수로 10을 전달합니다.
- multiplyBy2를 위한 새 실행 컨텍스트 (두 번째 호출): 새로운 로컬 실행 컨텍스트가 생성되어 호출 스택에 푸시됩니다. 매개변수 inputNumber에 값 10이 할당됩니다.
- 3행: 이 로컬 실행 컨텍스트에서 새로운 상수 변수 result를 선언하고 undefined로 초기화합니다. 식 inputNumber * 2가 평가됩니다. 엔진은 값이 10인 inputNumber를 찾아 2배로 곱한 후 20을 얻고 이 값을 result에 할당합니다.
- 4행: 함수는 결과값인 20을 반환합니다. 로컬 실행 컨텍스트가 종료되고 변수 inputNumber와 result가 파괴됩니다. 컨텍스트가 호출 스택에서 팝되어 반환값 20이 호출 컨텍스트로 반환됩니다.
- 7행 (계속): 반환된 값인 20이 newOutput에 할당됩니다.
- 8행: output 값을 콘솔에 출력합니다. 콘솔에는 6이 표시됩니다.
- 9행: newOutput 값을 콘솔에 출력합니다. 콘솔에는 20이 표시됩니다.

이 자세한 설명은 JavaScript가 변수 선언, 함수 정의, 실행 컨텍스트의 생성 및 소멸을 처리하는 방식을 보여줍니다. 아직 클로저에 대해서 다루지는 않았지만, 함수와 스코프가 동작하는 기본적인 내용을 보여줌으로써 이해를 돕습니다.

코드 실행을 확인하려면 JavaScript Visualizer (ui.dev)와 같은 도구를 사용할 수 있습니다.

# 코드를 실행해 보세요:

<div class="content-ad"></div>

이전 예제에서 함수가 어떻게 실행되는지 배웠습니다. 이번 함수를 살펴보고 무슨 일이 일어날지 알아보겠습니다.

```js
1: function createCounter() {
 2:   let counter = 0
 3:   const myFunction = function() {
 4:     counter = counter + 1
 5:     return counter
 6:   }
 7:   return myFunction
 8: }
 9: const increment = createCounter()
10: const c1 = increment()
11: const c2 = increment()
12: const c3 = increment()
13: console.log('example increment', c1, c2, c3)
```

createCounter 함수의 실행을 단계별로 자세히 살펴보겠습니다:

- 1–8행: createCounter라는 함수를 정의합니다. 전역 실행 컨텍스트에서, createCounter라는 새 변수를 선언하고, 1부터 8까지의 함수 정의를 그에 할당합니다. 함수 내의 코드는 아직 실행되지 않고, 나중 사용을 위해 저장됩니다.
- 9행: 전역 실행 컨텍스트에서 새 변수 increment를 선언합니다. 초기에는 이 변수가 정의되지 않습니다.
- 9행(계속): createCounter 함수를 호출하고, 반환된 값을 increment에 할당합니다. JavaScript 엔진은 전역 실행 컨텍스트에서 createCounter를 찾아 함수 정의를 찾아 실행 준비를 합니다.
- createCounter에 대한 새 실행 컨텍스트: createCounter 실행 컨텍스트라는 새로운 로컬 실행 컨텍스트가 생성됩니다. 이 컨텍스트는 호출 스택에 푸시됩니다.
- 2행: 이 로컬 컨텍스트 안에서, 변수 counter를 선언하고 0으로 초기화합니다.
- 3–6행: 새 constant 변수인 myFunction을 선언하고 함수 정의를 할당합니다. 이 함수는 counter 변수를 증가시키고 해당 값을 반환합니다.
- 7행: myFunction 함수가 createCounter에 의해 반환됩니다. createCounter의 로컬 실행 컨텍스트가 종료되고, 컨텍스트는 호출 스택에서 팝됩니다. 변수 counter와 myFunction은 더 이상 이 컨텍스트에 존재하지 않습니다.
- 9행(계속): 반환된 함수(myFunction과 해당 클로저)가 increment 변수에 할당됩니다. 이제 increment에는 myFunction에 저장된 함수 정의가 포함됩니다.
- 10행: 전역 실행 컨텍스트에 새 변수 c1을 선언합니다.
- 10행(계속): increment 함수를 호출하고, 반환 값을 c1에 할당합니다. JavaScript 엔진은 increment를 찾아 함수 정의를 찾아 실행 준비를 합니다.
- increment에 대한 새 실행 컨텍스트: 이 함수 호출을 위한 새 로컬 실행 컨텍스트가 생성됩니다. 이 컨텍스트는 호출 스택에 푸시됩니다.
- 4행: 이 로컬 컨텍스트 안에서, counter를 1만큼 증가시켜 업데이트합니다. 로컬 실행 컨텍스트에서 counter를 찾지만 찾을 수 없습니다. 따라서 전역 컨텍스트에서 찾지만 여전히 counter가 없습니다. JavaScript는 이를 undefined + 1로 해석하여 값이 1인 새로운 로컬 변수 counter를 만듭니다 (undefined가 여기서 0처럼 작동).
- 5행: 함수는 counter의 값인 1을 반환합니다. 이로써 로컬 실행 컨텍스트가 종료되고 counter가 제거됩니다.
- 10행(계속): 반환된 값인 1이 c1에 할당됩니다.
- 11행: c2에 대해 9-14단계를 반복합니다. increment 함수가 다시 호출되고, 이번에도 1이 반환되어 c2에 할당됩니다.
- 12행: c3에 대해 9-14단계를 반복합니다. increment 함수가 다시 호출되고, 이번에도 1이 반환되어 c3에 할당됩니다.
- 13행: 마지막으로, c1, c2 및 c3의 값이 콘솔에 로깅됩니다. 콘솔에는 "example increment 1 1 1"이 표시됩니다.

<div class="content-ad"></div>

위의 설명에 따르면 1, 1, 1을 기대할 수 있지만, 실제로는 1, 2, 3이 출력됩니다. 여기서 무슨 일이 벌어지고 있는 걸까요?

increment 함수가 어떻게 counter의 값을 기억한다는 거죠?

counter가 전역 실행 컨텍스트의 일부인가요? console.log(counter)를 해보면 undefined를 보게 될 것입니다. 그러니 그것도 아닙니다.

increment를 호출할 때, 어떻게 그것이 생성된 함수인 createCounter로 돌아가는 걸까요? 그런데 변수 increment는 함수 정의를 포함하고 있는데, 어떤 컨텍스트에서 왔는지는 포함하고 있지 않습니다. 그러니 그것도 아닙니다.

<div class="content-ad"></div>

여기에는 다른 메카니즘이 작용하고 있을 수 있어요.
그리고 있죠: "클로저"가 있습니다. 이것이 부재한 부분입니다.

작동 방식은 다음과 같습니다. 새 함수를 선언하고 변수에 할당할 때, 함수 정의뿐만 아니라 클로저도 함께 저장됩니다. 클로저는 함수가 생성될 때 범위 내에 있는 모든 변수를 포함합니다. 가방처럼 생각해 보세요. 함수 정의는 모든 변수를 함께 저장하는 작은 가방을 가지고 있습니다. 함수를 호출할 때 increment를 호출하면 함수 정의뿐만 아니라 함수가 정의될 때 범위 내에 있던 변수도 사용됩니다. 따라서 counter는 increment를 호출할 때마다 값을 계속 유지합니다. 이는 전역 실행 컨텍스트의 일부가 아니지만 클로저 덕분에 기억되는 것입니다.

따라서 우리가 위에서 설명한 것은 전혀 틀렸어요. 다시 시도해 보죠, 이번에는 올바르게요.

<div class="content-ad"></div>

```js
1: function createCounter() {
 2:   let counter = 0
 3:   const myFunction = function() {
 4:     counter = counter + 1
 5:     return counter
 6:   }
 7:   return myFunction
 8: }
 9: const increment = createCounter()
10: const c1 = increment()
11: const c2 = increment()
12: const c3 = increment()
13: console.log('example increment', c1, c2, c3)
```

위 코드는 createCounter 함수의 실행을 자세히 살펴보겠습니다.

- 1–8번 줄: createCounter라는 함수를 정의합니다. 전역 실행 컨텍스트에서 createCounter 변수를 선언하고 1부터 8까지의 함수 정의를 할당합니다. 함수 내부의 코드는 아직 실행되지 않고 나중에 사용할 준비만 되어 있습니다.
- 9번 줄: 전역 실행 컨텍스트에서 increment 변수를 초기화합니다.
- 9번 줄 (계속): createCounter 함수를 호출하고 반환된 값을 increment에 할당합니다. JavaScript 엔진은 전역 실행 컨텍스트에서 createCounter를 검색하여 함수 정의를 찾고 실행 준비를 합니다.
- createCounter를 위한 새로운 실행 컨텍스트: createCounter 실행 컨텍스트라는 새로운 로컬 실행 컨텍스트가 생성되고 호출 스택에 푸시됩니다.
- 2번 줄: 이 로컬 컨텍스트 내에서 counter 변수를 선언하고 0으로 초기화합니다.
- 3–6번 줄: 새 상수 변수 myFunction을 선언하고 함수 정의를 할당합니다. 이 함수는 counter 변수를 증가시키고 해당 값을 반환합니다. 여기서 클로저가 생성됩니다. 클로저에는 함수 정의 내부의 counter 변수의 현재 값(0)이 포함됩니다.
- 7번 줄: myFunction 함수(및 클로저)가 createCounter에 의해 반환됩니다. createCounter의 로컬 실행 컨텍스트가 종료되고 컨텍스트가 호출 스택에서 팝됩니다. 이 컨텍스트에는 더 이상 counter 및 myFunction 변수가 존재하지 않습니다. 그러나 myFunction은 클로저를 통해 counter에 대한 액세스 권한을 유지합니다.
- 9번 줄 (계속): 반환된 함수(myFunction 및 클로저)가 increment 변수에 할당됩니다. 이제 increment에는 myFunction에 저장된 함수 정의가 포함되어 있습니다.
- 10번 줄: 전역 실행 컨텍스트에서 새 변수 c1를 선언합니다.
- 10번 줄 (계속): increment 함수를 호출하고 반환 값을 c1에 할당합니다. JavaScript 엔진은 increment를 검색하여 함수 정의를 찾고 실행 준비를 합니다.
- increment를 위한 새로운 실행 컨텍스트: 이 함수 호출을 위한 새로운 로컬 실행 컨텍스트가 생성되어 increment 실행 컨텍스트로 명명됩니다. 이 컨텍스트가 호출 스택에 푸시됩니다. 이 로컬 컨텍스트에서 처음으로 할 일은 클로저를 사용하는 것입니다.
- 4번 줄: 이 로컬 컨텍스트 내에서 counter를 1씩 증가시켜 업데이트합니다. 클로저 내에 counter가 있으므로 해당 값(0)이 검색되어 1로 증가되고 클로저에 업데이트됩니다.
- 5번 줄: 함수는 업데이트된 counter의 값을 반환합니다(1). increment의 로컬 실행 컨텍스트가 종료되어 컨텍스트가 호출 스택에서 팝됩니다.
- 10번 줄 (계속): 반환된 값(1)이 c1에 할당됩니다.
- 11번 줄: c2에 대해 단계 9–14를 반복합니다. increment 함수가 다시 호출되고 클로저의 counter 값(1)이 2로 증가되어 2가 반환되고 c2에 할당됩니다.
- 12번 줄: c3에 대해 단계 9–14를 반복합니다. increment 함수가 다시 호출되고 클로저의 counter 값(2)이 3으로 증가되어 3이 반환되고 c3에 할당됩니다.
- 13번 줄: 마지막으로 c1, c2 및 c3의 값을 콘솔에 로깅합니다. 콘솔은 example increment 1 2 3를 표시합니다.

이런 상황이 벌어지는 이유는 무엇일까요? 함수가 선언될 때 함수 정의뿐만 아니라 클로저도 함께 포함되기 때문입니다. 클로저는 함수가 생성된 시점의 모든 스코프에 있는 변수들의 집합입니다.

<div class="content-ad"></div>

글로벌 범위에서 생성된 함수도 클로저를 가지고 있는지 궁금할 수 있습니다. 그 답은 네입니다. 글로벌 범위에서 생성된 함수도 클로저를 가지고 있지만, 글로벌 범위에서 정의되어 있기 때문에 모든 전역 변수에 접근할 수 있어 클로저 개념이 덜 중요해집니다.

클로저는 함수가 다른 함수를 반환할 때 매우 중요해집니다. 반환된 함수는 글로벌 범위에 없지만 해당 클로저에 존재하는 변수에 접근할 수 있습니다.

요약하면 인크리먼트 함수는 클로저를 통해 카운터의 값을 기억합니다. 인크리먼트를 호출할 때마다 카운터 값을 업데이트하고 반환하여 클로저를 통해 자신의 렉시컬 범위에 대한 액세스를 유지하는 방법을 보여줍니다. 이것이 JavaScript에서의 클로저의 본질입니다: 이들은 함수가 생성된 환경을 "기억"하도록 하여 함수가 그것들을 생성한 함수가 실행을 완료한 후에도 자신의 렉시컬 범위에 대한 액세스를 유지할 수 있도록합니다.

# 결론

<div class="content-ad"></div>

그 수업에서 윌 센튼스가 훌륭한 유사성을 제시했어요:

이제 클로저에 대해 이해하셨으면 좋겠어요. 감사합니다🙌