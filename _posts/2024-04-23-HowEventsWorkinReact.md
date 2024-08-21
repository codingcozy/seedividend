---
title: "리액트에서 이벤트 처리하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "How Events Work in React"
link: "https://medium.com/stackademic/how-events-work-in-react-795dc02b23b6"
isUpdated: true
---

<img src="/assets/img/HowEventsWorkinReact_0.png" />

그래서 이 강의에서는 React가 이벤트를 처리하는 방법과 그 배후에서 어떻게 작동하는지 배울 것입니다. 그런데 DOM에서 이벤트 전파와 이벤트 위임이 어떻게 작동하는지 간단히 복습한 다음에 시작하겠습니다. 왜냐하면 React가 어떻게 작동하는지 이해하는 데 중요하고, 게다가 많은 사람들이 실제로 브라우저에서 이벤트가 어떻게 작동하는지를 잘 이해하지 못한다고 믿기 때문입니다. 그래서 이 DOM 요소 트리를 고려해보겠습니다. 이것은 정말 DOM 트리이며, 파이버 트리나 React 요소 트리가 아닙니다.

![image](https://miro.medium.com/v2/resize:fit:1400/1*WXQBB8M504NfFZjcYuMX7w.gif)

그럼 지금, 세 개의 버튼 중 하나를 클릭하는 등 어떤 이벤트가 발생한다고 가정해봅시다. 그러면 브라우저에서 어떤 일이 일어날지 살펴보겠습니다. 이벤트가 발생하면 곧바로 새로운 이벤트 객체가 생성됩니다. 그러나 이 객체는 클릭이 실제로 발생한 곳에 생성되지 않습니다. 대신, 객체는 문서의 루트에서 생성됩니다. 즉, 트리의 맨 위에서 생성됩니다. 거기서 이벤트는 "캡처링" 단계 동안 전체 트리를 따라 아래로 이동합니다. 그리고 그 이벤트는 대상 요소에 도달하는데, 대상 요소는 사실 이벤트가 실제로 처음으로 트리거된 요소입니다. 따라서 대상에서이 이벤트를 처리하기 위해 일반적으로 이 요소에 이벤트 핸들러 함수를 배치할 수 있습니다.

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

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*7478CY5Lj47cZY45VAOCeQ.gif)

그런 다음, 대상 요소에 도달하면 이벤트 개체는 뒤늦게 버블링 단계 중에 전체 트리를 거슬러 올라갑니다.

이 과정에 대해 이해해야 할 두 가지 매우 중요한 점이 있습니다. 첫 번째는 캡처링 및 버블링 단계 동안 실제로 이벤트가 모든 자식 및 부모 요소를 하나씩 통과한다는 것입니다. 사실, 이러한 DOM 요소 각각에서 이벤트가 발생했다고 생각할 수 있습니다.

두 번째 중요한 점은 기본적으로 이벤트 핸들러가 대상 요소뿐만 아니라 버블링 단계에서도 이벤트를 수신한다는 것입니다. 그러면 이 두 가지를 결합하면 부모 요소의 모든 이벤트 핸들러가 대상 요소와 같은 유형의 이벤트를 수신하는 동안 버블링 단계에서 실행된다는 것을 의미합니다. 예를 들어, 헤더 요소에 다른 클릭 이벤트 핸들러를 추가하면이 전체 프로세스 중에 클릭이 발생할 때 대상 및 헤더 요소의 핸들러가 모두 실행됩니다.

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

![HowEventsWorkinReact_3](/assets/img/HowEventsWorkinReact_3.png)

가끔 우리는 실제로 이 동작을 원하지 않을 수 있습니다. 그런 경우에는 이벤트가 더 이상 버블링되지 않도록 간단히 이벤트 객체의 stopPropagation 메서드를 호출함으로써 이를 방지할 수 있습니다. 이는 바닐라 JavaScript에서도 동작하며 React에서도 동작하지만 실제로는 매우 드물게 필요한 경우이므로 다른 해결책이 없는 경우에만 사용하세요. 그래서 이것이 브라우저에서 이벤트가 동작하는 방식입니다.

![HowEventsWorkinReact_4](/assets/img/HowEventsWorkinReact_4.png)

이렇게 이벤트가 버블링되는 사실은 개발자가 이벤트 위임(Event Delegation)이라는 매우 일반적이고 유용한 기술을 구현할 수 있게 해줍니다. 이벤트 위임을 사용하면 여러 요소의 이벤트를 한 곳인 부모 요소 중 하나에서 처리할 수 있습니다. 예를 들어 세 개의 버튼 대신 1,000개의 버튼이 있다고 상상해보세요. 이들 모두에게 이벤트를 처리하려면 각 버튼마다 고유한 이벤트 핸들러 함수를 가지고 있어야 하는데, 이는 앱의 성능과 메모리 사용에 문제가 될 수 있습니다. 그 대신 이벤트 위임을 사용하면 이 버튼들의 첫 번째 부모 요소에 하나의 핸들러 함수만 추가하면 됩니다. 그런 다음 버튼 중 하나에서 클릭이 발생하면, 이벤트는 이 예제에서 옵션 div까지 버블링되고, 그 때 우리는 버튼 중 하나에서 이벤트가 발생했는지 확인하기 위해 이벤트 대상 속성을 사용할 수 있습니다. 그리고 그렇게 하면 중앙 이벤트 핸들러 함수에서 이벤트를 처리할 수 있습니다.

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

## 리액트 앱에서는 이 기술을 사용하는 것이 실제로 그리 흔하지 않지만, 만약 이게 리액트에서 실제로 중요하지 않다면, 왜 우리가 심지어 이에 대해 이야기하고 있는지 궁금하게 될 수도 있어요.

이에 대해 두 가지 이유가 있어요. 첫째, 때로는 애플리케이션에서 이벤트와 관련된 일부 이상한 동작을 발견할 수 있는데, 이는 실제로 이벤트 버블링과 관련이 있을 수 있습니다. 그래서 좋은 리액트 개발자로서 이 문제를 해결하기 위해 항상 무슨 일이 벌어지고 있는지 정확히 이해하고 싶어해요. 둘째로, 이것이 실제로 리액트가 이벤트와 함께 무슨 일을 하는지이기 때문에 우리가 그것을 살펴볼게요.

![이미지](/assets/img/HowEventsWorkinReact_5.png)

그래서 동일한 DOM 트리를 고려해보고, 다시 한 번 버튼 중 하나 또는 다른 DOM 요소에 이벤트 핸들러를 추가하고 싶다고 가정해 봅시다. 리액트 코드에서 이것이 어떻게 보일지 살펴봅시다. 그래서 우리는 간단히 onClick 프롭을 사용하여 클릭 이벤트를 기다리고, 그에 대해 함수를 전달합니다. 정말 쉬운 거죠? 이제, 리액트가 실제로 이러한 이벤트 핸들러를 내부적으로 등록하는 방법에 대해 생각해보면, 리액트가 엘리먼트를 선택하고, 그 엘리먼트에 이벤트 처리기를 추가할 것으로 생각할지도 모릅니다. 그렇기 때문에 이것은 꽤 논리적으로 들릴 수 있어요. 그러나 사실은 리액트가 내부적으로 이렇게 처리하지는 않는단 말이죠.

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

![이미지](/assets/img/HowEventsWorkinReact_6.png)

대신에, React가 실제로 하는 것은 이 및 모든 다른 이벤트 핸들러 함수를 루트 DOM 컨테이너에 등록하는 것이며, 해당 루트 컨테이너는 React 앱이 표시되는 DOM 요소입니다. Create React App의 기본값을 사용하는 경우, 일반적으로 ID가 root로 설정된 div 요소입니다. 따라서 실제로 이벤트 핸들러를 배치한 버튼을 선택하는 대신, 우리는 React가 루트 요소를 선택하고 모든 이벤트 핸들러를 해당 요소에 추가한다고 상상할 수 있습니다. React가 이 모든 작업을 하는 방식은 실제로 이보다 훨씬 복잡하지만, 여기서 깊이 파기할 가치가 없습니다.

알아둬야 할 유일한 것은 React가 이벤트 유형 당 하나의 이벤트 핸들러 함수를 물리적으로 등록하며, 렌더 단계에서 피버 트리의 루트 노드에 그렇게 한다는 것입니다. 즉, 코드에 여러 개의 onClick 핸들러가 있는 경우, React는 실제로 모두 번들로 묶어서 하나의 큰 onClick 핸들러를 피버 트리의 루트 노드에 추가하게 됩니다. 따라서 이것은 피버 트리의 또 다른 중요한 기능인데, 어쨌든, 이것은 React가 실제로 모든 이벤트에 대해 이벤트 위임을 수행한다는 것을 의미합니다. 즉, React가 모든 이벤트를 루트 DOM 컨테이너로 위임한다고 말할 수 있습니다. 왜냐하면 실제로 처리되는 곳은 우리가 등록했다고 생각한 곳이 아니라 위치에서가 아니라 그 곳입니다. 이는 이전 슬라이드에서 배운 내용과 정확히 일치합니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*Vz0IKlu2zRyNciihY_1WMg.gif)

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

그래서 다시 한 번 버튼을 클릭하면 새로운 이벤트 객체가 발생되고, 그 후 DOM 트리를 따라 이벤트가 대상 요소에 도달할 때까지 이동합니다. 그런 다음 이벤트는 다시 위로 버블링됩니다. 그리고 React가 모든 핸들러를 등록한 루트 컨테이너에 이벤트가 도달하면 해당 이벤트는 실제로 이벤트와 대상 요소에 일치하는 핸들러에 따라 처리됩니다. 마침내 이 모든 작업이 완료되면 이벤트는 물론 사라질 때까지 계속해서 위로 버블링됩니다. 이 과정은 모두 자동적으로 처리되며 우리의 React 앱을 조금 더 성능 향상시키기 위해 눈에 보이지 않게 발생하는 것입니다.

![how-events-work-in-react_8](/assets/img/HowEventsWorkinReact_8.png)

이제 주목해야 할 작은 세부사항 하나가 있는데, 여기서 중요한 것은 컴포넌트 트리가 아니라 DOM 트리입니다. 따라서 한 컴포넌트가 다른 컴포넌트의 자식인 경우라도, 표시된 DOM 트리에서 동일하다는 것을 의미하지는 않습니다. React 애플리케이션에서 버블링을 생각할 때 이 점을 염두에 두세요.

자, 그래서 우리는 이벤트와 이벤트 객체에 대해 많이 이야기했으니, 이제 이 이벤트 객체들이 실제로 어떻게 작동하는지 살펴보겠습니다.

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

![HowEventsWorkinReact_9](/assets/img/HowEventsWorkinReact_9.png)

따라서 우리가 이와 같은 이벤트 핸들러를 선언할 때마다, React는 생성된 이벤트 객체에 대한 액세스 권한을 제공합니다. 바닐라 JavaScript와 마찬가지로 이벤트 객체에 액세스할 수 있지만 React에서는 실제로 이벤트 객체가 다릅니다.

![HowEventsWorkinReact_10](/assets/img/HowEventsWorkinReact_10.png)

그래서 바닐라 JavaScript에서는 간단히 원시 DOM 이벤트 객체에 액세스할 수 있지만, React에서는 Synthetic 이벤트라는 것을 제공합니다. Synthetic 이벤트는 기본적으로 DOM의 원시 이벤트 객체 주위에 얇은 래퍼이며, 래퍼란 간단히 말해 Synthetic 이벤트가 원시 이벤트 객체와 매우 유사하지만 그 위에 일부 기능을 추가하거나 변경한다는 것입니다. 따라서 이러한 Synthetic 이벤트는 원시 이벤트 객체와 동일한 인터페이스를 갖고 있으며, 중요한 메소드 중 하나인 stopPropagation 및 preventDefault를 포함합니다.

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

하지만 합성 이벤트가 특별한 점이 뭘까요? 리액트 팀이 그것들을 구현하기로 결정한 이유 중 하나는 브라우저의 일관성 문제를 해결하고, 모든 브라우저에서 이벤트가 완전히 동일한 방식으로 작동하도록 만든다는 점입니다. 리액트 팀은 또한 모든 중요한 합성 이벤트가 실제로 버블링되도록 결정했습니다. 포커스, 블러 및 변경 이벤트와 같은 이벤트는 일반적으로 버블링되지 않지만 해당 이벤트들은 리액트에서는 버블링됩니다. 여기서 유일한 예외는 스크롤 이벤트인데, 리액트에서도 버블링되지 않습니다.

![이미지](/assets/img/HowEventsWorkinReact_11.png)

자, 마지막으로, 리액트와 순수 자바스크립트에서 이벤트 핸들러의 작동 방식에는 어떤 차이가 있는지 간단히 언급하고 싶습니다. 첫 번째로, 리액트에서 이벤트 핸들러를 연결하기 위한 속성 이름은 camelCase를 사용하여 작성됩니다. 따라서 onClick과 같이 대문자 C로 된 속성 이름이 사용됩니다. 반면 HTML에서는 모두 소문자인 onclick이며, 순수 자바스크립트의 addEventListener를 사용하면 이벤트가 단순히 click이라는 이름으로 호출됩니다.

이제 순수 자바스크립트에서 브라우저의 기본 동작을 중지하려면 이벤트 핸들러 함수에서 false를 반환할 수 있습니다. 예를 들어, 양식을 제출할 때 브라우저가 자동으로 페이지를 다시로드하는 것이 대표적인 예입니다. 그러나 리액트 이벤트 핸들러에서 false를 반환하려고 하면 작동하지 않습니다. 따라서 리액트에서 브라우저의 기본 동작을 방지하는 유일한 방법은 합성 이벤트 객체에서 preventDefault를 호출하는 것입니다.

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

마지막으로, 버블링 단계가 아닌 캡처링 단계에서 이벤트를 처리해야 하는 경우가 매우 드물지만, 그럴 때는 이벤트 핸들러 이름에 Capture를 달아주면 됩니다. 예를 들어 onClick 대신에 onClickCapture를 사용하면 됩니다. 하지만 실제로 이를 사용할 일은 거의 없을 것이므로, 그냥 머리 속 어딘가에 이 정보를 기억해 두세요.

자, 이 슬라이드에서 배운 것은 React에서 이벤트를 성공적으로 처리하기 위해 실무에서 알아야 할 모든 것입니다. 나머지는 모두 화면 뒤에서 자동으로 처리되지만, 다른 강의 내용도 흥미로우셨기를 바라며, 이를 통해 여러분의 애플리케이션에서 이벤트 처리에 대한 더 큰 자신감을 얻었으면 좋겠습니다.

# Stackademic 🎓

끝까지 읽어주셔서 감사합니다. 가기 전에:

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

- 작가를 박수 치고 팔로우 해주세요! 👏
- 팔로우하기 X | 링크드인 | 유튜브 | 디스코드
- 다른 플랫폼 방문하기: In Plain English | CoFeed | Venture | Cubed
- Stackademic.com에서 더 많은 콘텐츠를 만나보세요.
