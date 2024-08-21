---
title: "React의 Fiber 조정기는 어떻게 동작하나요"
description: ""
coverImage: "/assets/img/2024-06-19-HowdoestheReactfiberreconcilerwork_0.png"
date: 2024-06-19 23:48
ogImage:
  url: /assets/img/2024-06-19-HowdoestheReactfiberreconcilerwork_0.png
tag: Tech
originalTitle: "How does the React fiber reconciler work?"
link: "https://medium.com/@maxtsh/how-does-the-react-fiber-reconciler-work-77c3650127da"
isUpdated: true
---

<img src="/assets/img/2024-06-19-HowdoestheReactfiberreconcilerwork_0.png" />

이 글에서는 React 세상에 대해 심층 탐구하고 React의 핵심 가치 제안, React 조정자가 무엇이고 버전 16 이전에 어떻게 작동했는지, 오늘은 어떻게 작동하는지 살펴볼 것입니다!

1- 조정이 도대체 무엇입니까?

우선, 조정이란 무엇인지 보겠습니다. 번역에 따르면 이를 의미합니다:

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

\*\*"다른 뷰나 믿음을 함께 어우러지게 만드는 행위"

이것은 싱글 페이지 애플리케이션에서 React의 주요 목적을 나타냅니다. 이전에는 SPA 이전에 브라우저가 페이지 전환이 처리되는 속도가 느렸고 이를 개선하기 위해 React가 가상 DOM이라는 새로운 방식으로 웹 애플리케이션의 라우팅을 처리하도록 도입했습니다.

기존의 브라우저 라우팅 및 네비게이션 대신, 우리는 그 모든 것을 자바스크립트 메모리에 유지하고 페이지 및 라우팅을 처리하기 위해 자바스크립트를 사용하며 그 결과로 페이지 전환은 훨씬 빨라집니다.

이 목표를 달성하기 위해 React 팀은 가상 DOM과 스택 조정기를 도입하여 메모리에 있는 가상 DOM 트리를 처리하고 변경 사항을 실제 DOM에 선언적으로 적용하는 방법을 소개했습니다."\*\*

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

2- 스택 조정기와 역사 수업!

자, 리액트 훅을 도입하기 전 몇 년 전으로 돌아가서 리액트가 DOM 트리를 어떻게 구축했는지 살펴봅시다.
아래는 리액트 15 버전 및 이전 버전에서 스택 조정기라고 불리는 조정기가 있었는데, 이것은 LIFO 데이터 구조로 작업을 선택하고 결과를 반환하는 역할을 했으며 마치 JavaScript 호출 스택이 작동하는 방식과 유사합니다.

![이미지](/assets/img/2024-06-19-HowdoestheReactfiberreconcilerwork_1.png)

이 방식은 이미 혁신적인 접근이었지만 여러 문제점이 있었습니다. 주요 문제는 스택 조정기가 동기적이고 순차적이었기 때문에 병렬 또는 동시에 여러 단위의 작업을 처리할 기회가 전혀 없었다는 것이었습니다.

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

예를 들어, 사용자가 UI와의 아래 상호 작용을 가정해 봅니다:

![React Fiber Reconciler](/assets/img/2024-06-19-HowdoestheReactfiberreconcilerwork_2.png)

스택 조정기에서 비응답 UI의 문제

아래와 같이 스택 조정기의 동기 및 순차적인 순서로, 사용자가 텍스트 입력란에 무언가를 입력하려고 하면, 사용자에 대한 응답이 지연되고 반응이 없을 수 있습니다. 이것은 렌더링 순서에서 고우선순위이지만 스택에게 이를 더 높은 우선순위로 처리하라고 요청할 방법이 없기 때문입니다. 또 다른 문제는 이 과정 중에 오류가 발생하면 어디서 발생했는지, 어떤 스택 트레이스인지 찾을 방법이 없어서 어려울 수 있습니다.

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

크고 복잡한 어플리케이션은 너무 많은 상태와 작업을 다루기 때문에 혼돈스러워질 수 있고 사용자 경험이 파괴될 수 있습니다.

3- Fiber Reconciler, 그것이 우리가 찾던 것이었습니다!

React 버전 16 이상에서 React 팀은 새로운 방식인 Fiber Reconciler라는 새 메타를 사용하여 작업 단위와 가상 DOM 트리를 처리하는 새로운 방법을 소개했습니다. 이로써 두 가지 주요 도전 과제인 다음을 해결할 수 있습니다:

1- 작업 단위를 동기적으로 처리하는 방식
2- 작업 단위의 우선순위와 동시성 처리

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

현재의 React Fiber Reconciler는 많은 Fiber 노드로 구성되어 있으며, 이러한 노드들은 작업을 처리하기 위한 많은 속성을 갖춘 일반적인 JavaScript 객체들입니다.

Fiber = ' 많은 속성 또는 작업 단위를 갖춘 JavaScript 객체 '.

Fiber Reconciler = Fiber 객체 또는 작업 단위를 기반으로 하는 현재의 React 조정자입니다.

작업 단위란 무엇인가요?

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

리액트에서의 작업 단위는 props나 state의 변경, 또는 DOM 업데이트와 같이 화면 출력을 변경할 수 있는 모든 것입니다.

파이버는 컴포넌트 인스턴스, DOM 노드 등과 1 대 1 관계를 가지고 있습니다. 파이버 객체의 타입은 태그에 저장되어 있습니다. 타입의 가능성은 다음과 같습니다:

![Fiber 타입](/assets/img/2024-06-19-HowdoestheReactfiberreconcilerwork_3.png)

리액트-DOM 라이브러리의 소스 코드에서는 다음과 같이 명명된 함수들을 찾을 수 있습니다:

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

createFiberFromtText();
createFiberFromElement();
createFiberFromPortal();

Fibers는 DOM과 React 생태계에서 거의 모든 옵션에서 만들 수 있음을 보여줍니다. 이제 새로운 React Fiber Reconciler가 어떻게 작동하는지 알아봅시다!

React는 DOM 조작을 처리하는 선언적인 방법으로, 화면에 표시하길 원하는 내용을 알려주면 React가 하부에서 역할을 수행하여 비즈니스 로직 및 비즈니스에 필요한 중요한 부분에 집중할 수 있습니다.

아래에는 페이지의 간단한 예시가 있습니다:

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

![이미지](/assets/img/2024-06-19-HowdoestheReactfiberreconcilerwork_4.png)

이제 React 피버 reconciler에서 어떻게 처리되는지 살펴보겠습니다:

위 그림에서 보시는 대로, React Fiber Reconciler는 메모리 내에서 DOM 요소 트리(Virtual DOM)를 구성하고 실제 DOM의 청사진도 유지하여 실제 DOM에서 작업하고 Virtual DOM에 대한 업데이트를 렌더링한 다음 해당 변경 사항을 실제 DOM에 적용합니다.

이 프로세스에는 두 단계가 있습니다:

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

1- 렌더 단계 (비동기)
2- 커밋 단계 (동기)

당신의 애플리케이션에서 업데이트가 발생할 때, Fiber 조정자는 실제 DOM에 있는 현재 트리, 진행 중인 작업 트리, 및 렌더링 레인을 매개변수로 사용하는 beginWork 함수를 호출하여 작업을 시작합니다.

이 프로세스는 훨씬 더 복잡하지만 React 조정자 내부에서 무슨 일이 일어나는지에 대한 개요는 아래와 같습니다. 단순한 버튼 클릭 및 상태 변경 예시에서 어떻게 진행되는지 확인해보세요:

1- 사용자가 버튼을 클릭하면 beginWork(currentTree, workInProgressTree, lanes)를 호출하여 트리를 위에서 아래로 재귀적으로 확인하며 형제 및 자식 노드까지 내려가는 과정이 시작됩니다.

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

2- 작업이 필요한 동안에는 프롭스나 상태에 변경 사항이 발생하는지를 확인하여 노드를 업데이트해야 한다는 업데이트 플래그를 사용하여 노드를 표시합니다.

3- Fiber 유닛 작업이 완료되면 업데이트를 표시하고 완료 가능한 작업을 completeWork(currentTree, workInProgressTree, lanes) 함수를 호출하여 작업 트리를 올라가는 역할을 수행합니다.

4- 작업 완료는 또한 메모리에서 화면 밖에서 업데이트를 기반으로한 실제 DOM에 표시될 HTML 요소 트리를 작성합니다.

5- 모든 작업이 완료되면 fiber가 작업을 마치고 더 이상 할 일이 없다면, 새롭게 구성된 DOM 트리를 실제 DOM에 반영하여 화면에 표시되는 변경 사항을 반영합니다.

렌더링 단계와 메모리에서 DOM 트리에서 작업하는 것은 완전히 화면 밖 및 비동기적이므로 프로세스 중간에 업데이트나 중단이 발생하더라도 프로세스가 대기할 수 있거나 중단하여 다른 프로세스로 전환하여 다시 작업을 시작할 수 있습니다. 우선 순위를 매기거나 지연시킬 수 있으며 취소할 수도 있으며 동시에 여러 작업을 동시에 병렬로 수행할 수 있습니다. 이것은 이전에 스택 조정자의 문제를 해결하기 위해 찾던 해결책입니다.

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

파이버 조정기를 사용하여 이제 우리는 동시 렌더링, 중단 기능 및 렌더링 단계 오류를 잡아 사용자에게 폴백을 표시하고 전체 앱이 한꺼번에 크래시되지 않게 할 수 있습니다!

이 프로세스에서 효과는 어떻게 작용하며 적용되나요?

매우 좋은 질문입니다. 파이버 트리의 결과는 자체에만 의존하지 않습니다. 실제 DOM에서의 네트워크 요청, 돌연변이, 라이프사이클 메서드 호출 또는 React 생태계 외부에서 발생하는 모든 것과 같이 React 상태와 동기화해야 하는 효과 목록도 있습니다.

커밋 단계에서 React는 모든 효과를 모든 컴포넌트 인스턴스에 적용하고 결과를 사용자에게 표시합니다. React는 이 모든 작업을 단일 패스로 처리합니다.

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

지금 우리는 모든 것을 다루고 있어요! 멋지지 않았나요? React를 사용할 때 내부에서 무슨 일이 일어나는지 알면 React 생태계를 이해하고 프로세스와 DOM을 어떻게 처리하는지 알 수 있어요.

즐겁게 즐겼으면 좋겠어요. 미래에 더 많은 기사를 보고 싶다면 저를 팔로우해주세요. 안녕히 가세요! 즐거운 코딩하세요.

자료:

[유튜브 링크](https://www.youtube.com/watch?v=0ympFIwQFJw)

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

https://www.youtube.com/watch?v=rKk4XJYzSQA&t=9s

https://www.youtube.com/watch?v=Zan16X8VvGM
