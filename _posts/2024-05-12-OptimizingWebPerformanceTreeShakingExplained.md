---
title: "웹 성능 최적화 Tree Shaking 설명"
description: ""
coverImage: "/assets/img/2024-05-12-OptimizingWebPerformanceTreeShakingExplained_0.png"
date: 2024-05-12 19:01
ogImage: 
  url: /assets/img/2024-05-12-OptimizingWebPerformanceTreeShakingExplained_0.png
tag: Tech
originalTitle: "Optimizing Web Performance: Tree Shaking Explained"
link: "https://medium.com/@omkarbhavare2406/optimizing-web-performance-tree-shaking-explained-007208163c88"
---


📝 이 블로그에서는 웹 개발에서 중요한 프로세스인 Tree Shaking의 개념을 자세히 살펴볼 것입니다. Tree shaking을 이해하는 것은 코드의 성능을 최적화하고 최종 제품에 필요한 부분만 포함되도록 보장하는 데 중요합니다. 🕵️‍♀️ 이 기술이 무엇이며, 효율적이고 간소화된 애플리케이션을 만드는 데 왜 중요한지 알아보겠습니다.

🤔 먼저 Tree Shaking이 무엇인지 정의해 보겠습니다.

💡 TREE SHAKING은 JavaScript에서 사용되는 기술로, 번들링 프로세스 중에 번들에서 사용되지 않는 코드나 모듈을 제거하는 데 사용됩니다. Tree shaking은 일반적으로 JavaScript 기반 개발의 번들링 프로세스의 일부입니다. JavaScript 코드를 번들링할 때 여러 파일을 최적화된 상태로 묶어 브라우저로 전달하는 것입니다.

📚 여기서 읽기: 번들링: 웹 성능 최적화



🤯 이 예제를 통해 이해해 봅시다.

😀 코드의 큰 트리와 (사용되지 않는 코드인) 가지들이 그것을 무겁게 만든다고 상상해보세요. (즉, 웹 앱 성능을 낮춥니다). Tree shaking은 그 가지를 흔들어서 불필요한 가지들을 놓아버리는 것과 같습니다. 이를 통해 코드를 가볍고 빠르게 만들어줍니다. 🫡

지금 코드로 더 잘 이해해 봅시다 🤩

```js
export function add(num1, num2){
  return num1 + num2;
}

export function sub(num1, num2){
  return num1 - num2;
}

export function mul(num1, num2){
  return num1 * num2;
}

export function div(num1, num2){
  return num1 / num2;
}
```

Main.js

```js
import { mul, add } from './Operators';

console.log(mul(3, 8));

console.log(add(55, 23));
```

🔥 When all these files are bundled together, Here is the final bundled code




```js
// 번들된 연산자

export function add(num1, num2) {
  return num1 + num2;
}

export function mul(num1, num2) {
  return num1 * num2;
}

console.log(mul(3, 8));
console.log(add(55, 23));
```

여기서 sub, div 함수는 우리 애플리케이션에서 사용되지 않으므로 최종 번들에서 제외됩니다. 이는 번들링 프로세스 중에 수행되는 트리 쉐이킹 기술에 의해 수행됩니다.

🤨 알겠어! 하지만 함수가 사용자 입력 [즉, 동적 사용자 입력]에 의존하는 경우 어떻게 되나요? 트리 쉐이킹 기술은 여전히 사용되지 않는 함수의 사용을 제거할까요?

👉 여러 함수가 사용자 입력에 종속되는 시나리오에서는 트리 쉐이킹이 도전을 겪을 수 있으며 효과가 덜 할 수 있습니다. 사용자 입력은 실행 시간까지 알 수 없기 때문에 빌드 도구는 번들에 모든 잠재적으로 관련 있는 함수를 포함할 수 있습니다. 이러한 동적 사용자 의존성의 특성은 트리 쉐이킹이 효과적으로 최적화하는 것을 어렵게 만들며, 개발자들은 이러한 경우에 코드 분할 또는 지연 로딩과 같은 대체 전략을 고려해야 할 수 있습니다.




```js
// Module A
export function add(num1, num2) {
  return num1 + num2;
}

// Module B
export function multiply(num1, num2) {
  return num1 * num2;
}

// Main application file
import { add, multiply } from './modules';

// User input
const userInput = prompt('더하기는 1을 입력하고, 곱하기는 2를 입력하세요:');

let result;

if (userInput === '1') {
  result = add(3, 4);
} else if (userInput === '2') {
  result = multiply(3, 4);
}

console.log(result);
```

이 시나리오에서 사용자의 입력에 따라 'add' 또는 'multiply' 함수가 동적으로 호출되므로 빌드 과정 중 tree shaking이 도전적입니다. Tree shaking을 적용해도 사용자 입력의 동적 성향으로 인해 두 함수 모두 최종 번들에 포함될 수 있으므로 최적의 성능을 위해 개발자가 코드 분할 또는 지연 로딩과 같은 대안을 고려해야 합니다.

😀 장점
1. 번들 크기 축소: 작은 번들은 사용자에게 빠른 다운로드를 제공하여 페이지 로드 시간을 개선합니다.
2. 대역폭 절약: 작은 번들은 네트워크를 통해 전송하는 데 더 적은 대역폭이 필요해 호스팅 비용을 절감하고 웹 응용 프로그램의 전반적인 효율성을 향상시킵니다.

🫣 단점
1. 동적 사용자 입력, 조건부 로딩 등에서 효과적이지 않을 수 있음.
2. 응용 프로그램이 동적 가져오기와 라이브러리 또는 프레임워크가 완전히 호환되지 않을 때 예기치 않은 동작이 발생할 수 있습니다.



💡 결론: 트리 쉐이킹은 자바스크립트에서 사용되지 않는 코드를 번들링 프로세스 중에 제거하는 가치 있는 기술로, 더 작은 번들과 향상된 응용프로그램 성능을 이끌어냅니다. 그러나 동적 사용자 입력, 조건부 로딩 및 특정 라이브러리 또는 프레임워크와의 호환성 문제와 관련하여 그 효과는 손상될 수 있으며, 개발자들이 대체 최적화 전략을 주의 깊게 고려해야 합니다.

📚 이전 포스트:

👉 NPM이 무엇인가요?
👉 의미 있는 버전 관리 해부
👉 Dependencies, DevDependencies 및 PeerDependencies
👉 로컬 대 글로벌 패키지
👉 번들링: 웹 성능 최적화 방법

🔍 다음은:



👉 최소화, 검사
👉 코드 분할, 지연 로딩

더 많은 ReactJs 개발에 대한 통찰력을 기대해주세요! 🚀📦