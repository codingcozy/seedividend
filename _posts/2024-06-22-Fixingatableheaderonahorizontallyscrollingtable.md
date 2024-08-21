---
title: "가로 스크롤 테이블에서 테이블 헤더 고정하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-Fixingatableheaderonahorizontallyscrollingtable_0.png"
date: 2024-06-22 03:45
ogImage:
  url: /assets/img/2024-06-22-Fixingatableheaderonahorizontallyscrollingtable_0.png
tag: Tech
originalTitle: "Fixing a table header on a horizontally scrolling table"
link: "https://medium.com/neocoast/fixing-a-table-header-on-a-horizontally-scrolling-table-de3364610957"
isUpdated: true
---

![image](/assets/img/2024-06-22-Fixingatableheaderonahorizontallyscrollingtable_0.png)

You would think this is easy. But it really isn’t.

# Chapter 0: The environment

This entire post is based on a React application, so while it’s not mandatory, it would help if you had at least basic knowledge of React and React Hooks.

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

# 장 1: 초기 문제

저희가 최근 작업한 프로젝트에서 맞닥뜨린 매우 구체적인 문제가 있었습니다: 클라이언트가 대형 테이블을 원했습니다.

대형이라고 무슨 뜻일까요? 제가 본 테이블 중에는 15개 이상의 열이 있는 것도 있고 화면보다 훨씬 더 넓은 것도 있었습니다. 운이 좋게도 이번에 다룬 테이블은 그중 하나는 아니었지만, 사용 가능한 공간보다는 더 넓었습니다.

![이미지](/assets/img/2024-06-22-Fixingatableheaderonahorizontallyscrollingtable_1.png)

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

이와 더불어, 표에 쉽게 스크롤할 수 있는 버튼이 필요했습니다.

이를 달성하기 위해 표를 화면의 너비의 일정 비율(예: 화면 너비의 80%)로 고정한 `div`로 감싼 다음, 버튼 몇 개와 스크롤링 기능을 추가했습니다. 스크롤링 함수는 래퍼(wrapper)의 스크롤 위치를 변경하는 방식으로 작동합니다. 스크롤링 함수는 다음과 같이 보였습니다:

<img src="/assets/img/2024-06-22-Fixingatableheaderonahorizontallyscrollingtable_2.png" />

이를 통해 가로 스크롤이 가능하고 터치패드가 없는 경우에도 스크롤할 수 있는 버튼이 있는 멋진 표가 만들어졌습니다.

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

![Image](https://miro.medium.com/v2/resize:fit:1400/1*6xTzUdpHHNCkKTkS5PWENQ.gif)

This was good, and working as expected.

# Chapter 2: 새로운 요구 사항이 발생하다

이 상태의 표가 승인되고 운영 환경에 배포되었습니다. 사용자 중 일부가 헤더를 상단에 고정하여 스크롤할 때 헤더를 유지하도록 요청하기 시작했습니다. 이렇게 하면 각 값을 확인하기 위해 열 이름을 왔다갔다 스크롤할 필요 없이 어떤 값인지 쉽게 인식할 수 있을 것입니다.

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

우리의 첫 번째 충동은 대부분의 사람들이 할 것이라고 생각하는 것이었습니다: 테이블의 thead 요소에 position: sticky를 추가했습니다.

![이미지](/assets/img/2024-06-22-Fixingatableheaderonahorizontallyscrollingtable_3.png)

이게 정말 이렇게 간단할 수 있나 싶으신가요? 그것은 그렇습니다. 이렇게 할 때 어떤 일이 벌어지는지 확인해보세요:

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*KBjRnzusCS-VdO3C-doD9A.gif)

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

테이블 요소들은 효과적으로 position: sticky 속성을 갖고 있지만 조금 스크롤하면 화면을 벗어냅니다.

CSS 사양에 따르면:

여기서 문제는 다음과 같습니다:

- .layout\_\_content이 스크롤됩니다.
- .table\_\_wrapper는 스크롤되지 않습니다.
- .table thead는 .table_wrapper에 대해 sticky 속성을 갖습니다.

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

우리가 원했던 것은 .table thead가 .layout**content에 대해 sticky하게 되는 것이었습니다. 이것은 불가능한데, .table**wrapper에는 오직 overflow-x만 지정되어 있어도 여전히 overflow 속성이 있기 때문에 .table thead가 그것에 붙어버립니다.

# Chapter 3: 첫 번째 접근 방식

그래서 명세를 고려하여, .layout\_\_content에서 overflow-x를 제거해보고 결과를 확인해봅시다.

<img src="/assets/img/2024-06-22-Fixingatableheaderonahorizontallyscrollingtable_4.png" />

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

그럼 무엇이 일어날까요?

![image](https://miro.medium.com/v2/resize:fit:1400/1*BN3b0lj6txdVX7w0LsJvgQ.gif)

그래서 작동한 것 같군요... 아니죠?

![image](https://miro.medium.com/v2/resize:fit:1400/1*iQPnhfp3bjC5QGndmaE1Nw.gif)

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

앗, 이런! 스크롤 버튼이 작동을 멈췄네요. 게다가 이제 표를 스크롤하면 제목을 포함한 전체 페이지가 스크롤되는 문제가 발생했어요. 그런 건 예상치 못한 일이에요.

하지만, 어쨌든! 우리의 헤더는 이제 고정되어 있어요!

# Chapter 4: Don’t tell me what to do!

그래서 우리는 문제에 대한 해결책을 찾아 (그리고 머리를 긁으면서) 꽤 오랜 시간을 보냈는데요: 자바스크립트와 CSS를 사용하자는 해결책을 찾았답니다!

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

기본 아이디어는 다음과 같아요:

- 표의 헤더가 어디에 있는지 확인해 봅시다.
- 사용자가 어느 정도 스크롤했는지 확인해 봅시다. a. 사용자가 헤더 시작 부분 아래로 스크롤했다면, thead 요소를 위로 유지하도록 번역합시다. b. 그렇지 않다면, 표 헤더에서 translate 속성을 제거합시다.

이 앱에서 React를 사용했기 때문에 실제 DOM 요소를 추적하기 위해 일부 ref를 활용했어요.

아래처럼 코드를 작성해보았는데요 (재사용성을 위해 훅으로 작성했습니다):

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

<img src="/assets/img/2024-06-22-Fixingatableheaderonahorizontallyscrollingtable_5.png" />

아래 코드를 분해해 봅시다:

우선, 테이블 래퍼(wrapper)용과 테이블 헤더용 두 개의 ref를 선언합니다.

테이블 자체 대신 테이블 래퍼에 대한 ref를 선언하는 이유에 대해 궁금해 할 수 있습니다. 이는 코드 아래쪽에서 사용자가 얼마나 스크롤했는지 계산하기 위해 위치 지정(positioning)을 사용하는데, offsetTop은 부모에 상대적이므로 테이블은 항상 부모에 대해(offsetTop) 0인 값을 갖습니다. 래퍼는 스크롤 요소의 직계 자식이어야 합니다(우리의 경우 layout\_\_content 요소).

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

그럼, 스크롤 요소에 이벤트 리스너를 추가하는 역할을 맡은 useEffect 훅을 작성합니다. 스크롤할 때 적절히 반응할 수 있도록 설정합니다.

그렇다면 '적절히 반응한다'는 무엇을 의미할까요? 헤더의 위치를 스크롤 요소와 비교해야 하지만 이동할 것이기 때문에 실제로 테이블의 위치를 확인해야 합니다. 여기서 테이블 래퍼를 사용하는 것이죠. 해당 요소는 콘텐츠 요소와 비교하여 이동하지 않기 때문입니다. 그 후에 부모 요소가 헤더 위치를 지나쳤는지 확인하여, 그렇다면 해당 스크롤 위치 차이 (스크롤 위치 - 헤더 위치)로 해당 요소를 변환합니다. 스크롤 위치가 헤더 위치보다 위에 있다면 해당 translate 속성을 제거합니다.

또한, 이벤트 리스너를 제거하는 것을 기억하는 것도 중요합니다. 그렇지 않으면 응용 프로그램의 다른 섹션으로 이동한 후 더 이상 존재하지 않는 요소를 참조할 수 있어 응용 프로그램이 크래시할 수 있습니다. 우리의 useEffect 안에 그 작업을 수행하는 함수를 반환하여 이 문제를 해결합니다.

그래서, 작동했나요?

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

![image](https://miro.medium.com/v2/resize:fit:1400/1*51AviR697AWxTnCS6QjquQ.gif)

네! 100% 완벽하지는 않아요, 헤더가 조금씩 점프할 수 있지만, 그건 이 블로그 게시물의 범위를 벗어나는 문제에요.

하지만 개발 도구에서 등장하는 것이 있어요:

![image](/assets/img/2024-06-22-Fixingatableheaderonahorizontallyscrollingtable_6.png)

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

해당 링크를 따라가면 Firefox가 우리가 하는 것에 대해 position: sticky를 사용하는 것을 권장하는 것을 볼 수 있어요.

음, Firefox야, 우리가 원하는대로 작동한다면 position: sticky를 사용할 거에요.

# 최종 생각

이 문제는 작업하기 정말 재미있었지만, CSS 명세가 이를 고려해주면 좋을 것 같아요. "sticky-anchor"라는 속성이 있고 값으로 "ancestor" 또는 "screen"을 사용할 수 있다면 좋을 것 같아요. ancestor는 현재 동작을 유지하고 기본값이 되며, screen은 전체 화면만을 고려할 것 같아요. 그렇다면 우리는 모든 코드를 건너뛰고 다음과 같은 CSS만 가질 수 있을 거에요:

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

아래는 Markdown 형식으로 테이블 태그 변경한 것입니다.

![이미지](/assets/img/2024-06-22-Fixingatableheaderonahorizontallyscrollingtable_7.png)

또한, 이 방법은 가로 스크롤 헤더에서 일부 득독이 발생할 수 있으므로, 100% 완벽한 해결책이 필요한 경우 이벤트 루프 및 애니메이션 루프를 찾아보는 것이 좋습니다.
