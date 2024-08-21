---
title: "리액트 웹사이트 성능 향상 시키는 방법"
description: ""
coverImage: "/assets/img/2024-05-18-performanceinreact_0.png"
date: 2024-05-18 21:42
ogImage:
  url: /assets/img/2024-05-18-performanceinreact_0.png
tag: Tech
originalTitle: "performance in react ⚡"
link: "https://medium.com/@lott.marcos/performance-in-react-e35511d9b21c"
isUpdated: true
---

현대 웹 애플리케이션을 개발할 때 최적의 성능을 달성하는 것이 중요합니다. ReactJS는 개발자가 빠르고 반응이 뛰어나며 효율적인 애플리케이션을 만들 수 있도록 도와주는 강력한 도구와 기술을 제공하지만, 이들을 어떻게 사용해야 하는지 알아야 합니다! 이 글에서는 ReactJS에서 성능을 극대화하기 위한 주요 원칙을 탐구하며, 재렌더링을 최소화하고 DOM과 가상 DOM 간의 차이를 이해하며 불변성을 활용하고 메모이제이션을 구현하는 것에 초점을 맞출 것입니다.

![Image](/assets/img/2024-05-18-performanceinreact_0.png)

React의 성능 최적화의 핵심은 재렌더링을 최소화하는 원칙에 있습니다. 컴포넌트가 재렌더링될 때마다 React는 변경 사항을 조화하고 DOM을 적절히 업데이트해야 합니다. 불필요한 재렌더링을 줄이면 애플리케이션 속도가 향상되는 것뿐만 아니라, 사용자 경험도 부드럽고 반응성 있게 유지할 수 있습니다. 그러나 이를 실현하기 위해서는 상태 관리, 컴포넌트 디자인 및 라이프사이클 메서드에서 모베스트 프랙티스를 이해하고 적용해야 합니다.

# DOM vs. 가상 DOM 🌐

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

DOM 및 가상 DOM과 같은 개념이 성능과 연관이 있는 이유는 React와 같은 프레임워크가 사용자 인터페이스 업데이트를 다루는 방식 때문입니다. 문서 객체 모델(DOM)은 웹 문서를 프로그래밍적으로 다루는 인터페이스로, 웹페이지의 구조를 객체 트리로 표현합니다. 이 트리의 각 노드는 요소, 속성, 텍스트 컨텐츠와 같은 문서의 부분을 나타냅니다. 이것은 기본적으로 브라우저가 HTML 코드를 이해하는 방식입니다:

![Performance in React](/assets/img/2024-05-18-performanceinreact_1.png)

각 재렌더링은 React가 변경 사항을 조율하고 DOM을 업데이트해야 하므로 연산 부하가 발생할 수 있습니다. DOM의 변경마다 브라우저가 스타일을 다시 계산하고 레이아웃을 재구성하며 페이지를 다시 그리게 됩니다. 이는 퍼포먼스에 상당한 영향을 미칠 수 있으며 특히 업데이트가 빈번하고 DOM 트리의 큰 부분을 포함할 때 그 영향이 커집니다.

하지만 React는 어떻게 이를 효율적으로 처리할까요?
React는 실제 DOM의 추상화인 가상 DOM을 생성합니다. 이는 React가 메모리에 유지하는 DOM의 가벼운 사본입니다. React 컴포넌트의 상태가 변경되면 React는 먼저 가상 DOM을 업데이트합니다. 그런 다음에 실제 DOM을 새로운 가상 DOM 상태와 일치하도록 업데이트해야 하는 최소한의 변경 세트를 효율적으로 결정합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 말은 React가 모든 상태 변경에 대해 즉시 DOM을 업데이트하는 대신 변경 사항을 수집하고 한 번에 DOM을 업데이트한다는 것을 의미합니다. 이로써 DOM에 액세스하고 수정하는 횟수가 감소하여 성능이 향상됩니다. 이 프로세스를 reconciliation이라고 합니다.

# 성능 최적화 📈

성능에 대해 논의할수록, 프레임워크의 핵심 원칙에 대해 깊게 이야기하며 데이터와 계산을 효율적으로 처리하는 방식에 영향을 미치는 것에 대해 말하게 됩니다. React에서 두 가지 원칙인 불변성과 메모이제이션은 모두 성능을 향상시키는 데 중요한 역할을 합니다.

## 불변성🔒

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

불변성은 데이터 구조를 생성한 후에 수정하지 않는 실천 방식을 의미합니다. 대신, 모든 수정은 새로운 데이터 구조를 생성합니다. 이 개념은 React에서 아래와 같은 이유로 중요합니다:

- 예측 가능한 상태 변경: 상태가 불변성을 갖추면 변경 사항이 예측 가능하고 추적 가능해져서 코드의 디버깅과 이해가 간소화됩니다.
- 효율적인 다시 렌더링: React는 이전 상태나 프롭을 현재 상태나 프롭과 비교하여 컴포넌트를 다시 렌더링해야 하는지 빠르게 판단할 수 있습니다. 참조가 다를 경우 React는 변경이 발생했음을 알 수 있습니다. 이 비교는 불변성 데이터 구조를 사용하여 빠르고 효율적입니다.
- 부작용 회피: 불변성은 공유된 가변 상태로 인한 의도하지 않은 부작용을 방지하여 더 신뢰성이 있고 유지보수가 용이한 코드를 만들어냅니다.

하지만 React와 JavaScript는 어떻게 불변성을 활용하여 더 빠르게 렌더링할 수 있을까요?

앞에서 언급했듯이 불변 데이터를 사용하면 React의 diffing 알고리즘이 애플리케이션의 상태 변화를 더 효율적으로 추적할 수 있습니다. 왜냐하면 객체 참조를 간단히 비교함으로써 각 객체의 속성을 깊게 비교할 필요가 없기 때문입니다. JavaScript는 객체 포인터가 다른 메모리 위치에 있는지 확인함으로써 모든 키를 확인하지 않고도 차이점을 확인할 수 있습니다. 이렇게 하면 훨씬 빨라집니다!

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 메모이제이션 🧠

한편, 메모이제이션은 결과를 캐싱하고 같은 입력이 다시 발생할 때 재사용하여 비싼 계산을 최적화하는 데 도움이 됩니다. React에서 memoization은 useMemo 및 useCallback과 같은 훅을 통해 구현될 수 있습니다. 이러한 훅은 값과 함수를 메모이즈하여 불필요한 다시 랜더링과 계산을 막아주는데 도움을 줍니다. 만약 ReactJS 코드를 작성한 적이 있다면 아마 이에 대해 알고 있어야 할 것입니다.

하지만 중요한 것은 메모이제이션과 불변성을 따로 생각하지 않는 것입니다. 이 둘은 밀접한 관련이 있으며 종종 함께 사용하여 성능을 최적화합니다. 이들의 관계를 이해하면 개발자가 더 효율적이고 유지보수가 쉬운 코드를 작성하는 데 도움이 됩니다.

![React 성능 개선 이미지](/assets/img/2024-05-18-performanceinreact_2.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 메모이제이션과 불변성의 관계 🔗

리액트에서 성능 최적화의 맥락에서 메모이제이션과 불변성은 밀접한 관련이 있습니다. 불변성은 안정적인 기반을 제공하여 메모이제이션을 더 효율적이고 신뢰할 수 있도록 만드는데 기여합니다. 다음과 같은 이유로 상태 변화가 예측 가능하고 의존성 추적을 단순화시킵니다:

- 캐시 로직 단순화: 불변 데이터로 인해 메모이제이션 함수의 캐싱 로직이 더 간단해집니다. 데이터가 변할 수 없기 때문에 캐시는 데이터 변화로 인한 무효화를 처리할 필요가 없어져 더 직접적이고 신뢰할 수 있는 메모이제이션이 가능해집니다.
- 부작용 회피: 불변 데이터 구조는 공유된 가변 상태에 의한 부작용을 피하는 데 도움이 됩니다. 이는 메모이제이션 함수가 더 안전하고 예측 가능하게 만들어줍니다. 예상치 못한 변경이 없는 입력값에 의존하기 때문입니다.
- 참조 동등성: 불변성은 데이터 구조들을 참조 동등성을 통해 간단하고 효율적으로 비교할 수 있게 해줍니다 (즉, 두 참조가 동일한 객체를 가리키는지 확인). 이는 메모이제이션에 핵심적인데, 빠르고 효율적인 캐시 조회를 가능하게 합니다. 메모이제이션 함수의 입력이 불변성을 가진다면 함수는 입력값이 변경되었는지 쉽게 참조를 비교함으로써 판단할 수 있습니다.

데이터가 불변하면 메모이제이션 함수나 컴포넌트의 의존성이 안정적으로 유지됩니다. 이 안정성은 메모이제이션 값을 또는 콜백을 필요한 경우에만 다시 계산함으로써 불필요한 계산과 새로고침을 피할 수 있도록 합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

![이미지](/assets/img/2024-05-18-performanceinreact_3.png)

# 결론 📢

이전에 이야기한 대로, 성능에 대해 더 깊이 이야기할수록, 프레임워크의 핵심 원칙에 대해 더 많이 이야기하게 됩니다. React 애플리케이션은 Virtual DOM의 효율적인 차이점 및 업데이팅 기능을 활용하고, 불변 데이터 구조 및 메모이제이션된 계산을 보완하여 번개처럼 빠른 렌더링 및 부드러운 사용자 경험을 달성할 수 있습니다.

React 핵심 개념을 조화롭게 통합함으로써, 개발자들은 응답성이 뛰어나고 성능이 우수한 사용자 경험을 제공하여 응용 프로그램의 최대 잠재력을 발휘할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

음… 그것이 다야!
내 LinkedIn에 연락해 보고 메시지를 보내주세요. 멋진 경험이 될 거에요!

고마워요!! 👋👋
