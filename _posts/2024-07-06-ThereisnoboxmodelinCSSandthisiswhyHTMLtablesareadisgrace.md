---
title: "CSS에 박스 모델은 없고, HTML 테이블이 한심한 이유"
description: ""
coverImage: "/ui-log-2/assets/no-image.jpg"
date: 2024-07-06 10:20
ogImage: 
  url: /ui-log-2/assets/no-image.jpg
tag: Tech
originalTitle: "There is no box model in CSS — and this is why HTML tables are a disgrace"
link: "https://medium.com/@decketts/there-is-no-box-model-in-css-and-this-is-why-html-tables-are-a-disgrace-9407dfbce823"
---


## 자바스크립트 UI — 개발 블로그 #9

이것은 CSS "박스" 모델이 얼마나 근본적으로 망가졌는지를 인식시키기 위한 미니 시리즈의 세 번째이자 마지막 설치입니다. 첫 번째 글에서는 간단한 테두리를 사용하여 이를 시연했고, 두 번째 글에서는 시각적 레이어를 사용하여 시연했으며, 세 번째 글에서는 HTML/CSS 테이블을 사용하여 시연하겠습니다.

## 우리 실험 대상

이번 시연을 위해 간단한 테이블을 구축할 것입니다. 항상 그렇듯이, 아무것도 파격적이거나 고급스러운 것이 아니라 간단하고 기본적인 예제입니다:

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

우리는 패딩과 둥근 모서리가 있는 연한 회색 배경을 가지고 있습니다. 헤더 행에는 구분선으로서 하단 테두리가 있고, 6개의 일반 행에는 번갈아가는 배경이 있습니다.

조금 더 구체적으로 말하자면, 우리는 테이블에 50px 패딩이 필요하며, 각 행의 높이는 40px이며 행의 시작과 끝, 그리고 열 사이에는 10px 간격이 있습니다. 아래는 우리의 주석이 달린 레이아웃입니다:

그래서, HTML/CSS를 사용하여 "box" 모델을 구축해 보고 무엇이 무엇인지 살펴봅시다.

# 첫 번째 단계 — 뼈대 만들기

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

첫 번째 단계는 HTML에서 동일한 시각적 계층 구조를 만들고 일부 스타일 및 레이아웃 정보를 추가하는 것입니다:

```js
<body style="font-family: Inter; font-size: 14px; color: rgb(102, 102, 102); width: 1000px; height: 500px; background-color: rgb(102, 102, 102); display: flex; flex-direction: row; justify-content: center; border: 1px solid red;">
  ![Markdown 형식의 표]
    ![Markdown 형식의 표]
</body>
```

현재 코드는 제대로 읽을 수 없습니다. JavaScriptUI에 대해 학습하는 우리에게 JavaScriptUI 구문을 사용하겠습니다. JavaScriptUI는 인라인 스타일이 적용된 HTML 트리와 정확히 동일하게 작동하지만 훨씬 더 읽기 쉬운 경험을 제공합니다. 그래서 동일한 예제는 다음과 같습니다:

```js
Body(
    Table(
        Row(
            Cell("Character"),
            Cell("First seen in"),
            Cell("Allegiance")
        )
            .borderBottom("1px solid #B3B3B3")
            .height(40),
        Row(
            Cell("Space Beth"),
            Cell("S4 E10"),
            Cell("friend")
        )
            .backgroundColor("#FFFFFF")
            .height(40),
        Row(
            Cell("Pencilvester"),
            Cell("S2 E4"),
            Cell("foe")
        )
            .backgroundColor("#CCCCCC")
            .height(40),
        
        //나머지 행은 생략되었습니다

    )
        .padding(50)
        .cornerRadius(30)
        .backgroundColor("#E6E6E6")
)
  .width(1000)
  .height(500)
  .backgroundColor("#666666")
  .display("flex")
  .border("1px solid red"); //일시적으로 디버깅 목적으로 추가된 것
```

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

그리고 우리 아름다운 결과물은 이렇습니다:

어떤 이유 때문인지, 이것이 기본 flexbox 동작입니다. 왼쪽 정렬은 어느 정도 예상되지만, 이 미친 듯한 세로 스트레칭은 꽤 이상하며, 특히 하단 오버플로우는 매우 이상합니다. 그리고 모든 행에 명시적인 높이를 설정했음에도 불구하고, CSS는 이를 레이아웃 규칙으로 생각하는 것이 아니라 제안으로 여기는 것으로 보입니다.

## 높이?

행들에 max-height를 설정하거나 셀에 높이 및/또는 max-height를 설정해 봐도, 아무 일도 일어나지 않습니다. CSS는 이러한 값을 기본적으로 무시할 것입니다. 그러나 높이는 다시 테이블 요소에서 작동합니다. 그러나 기적적으로 이것은 명시적인 값이 필요하지 않은 유일한 곳입니다.

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

"아마도 '상자' 모델과 CSS 전반에서 나의 가장 큰 문제는 그것의 불투명성입니다. 40px의 명확한 높이를 설정했다면, 그 엘리먼트가 어떤 경우에도 40px가 될 것으로 기대합니다. height: auto, height: max-content, height: lollipop처럼 높이가 동적으로 변할 수 있음을 말할 수 있겠지만, height: 40px로 설정했다면, 특히 max-height: 40px도 설정했을 때, 높이가 40px가 아니라면, 이것은 단지 가파른 학습 곡선이 아니라 원칙적으로 고장난 언어입니다.

'상자 모델'을 '제안 모델'로 또는 심지어 '벽돌 벽과 대화하는 모델'로 이름을 바꾸는 것이 더 정확해 보입니다.

<img src="https://miro.medium.com/v2/resize:fit:1008/1*DQmW9kwOUsIgZjPS8hxZVA.gif" />

어쨌든, flex 컨테이너에서 제공되는 수직 및 수평 정렬을 사용하는 것이 최선의 선택입니다."

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

```js
Body(/*...*/)
  .width(1000)
  .height(500)
  .border("1px solid red")
  .backgroundColor("#666666")
  .display("flex")
  .justifyContent("center") //수평 정렬
  .alignItems("center"); //수직 정렬
```

이 코드는 올바른 정렬과 크기를 산출합니다.

와우. 심지어 테이블 부분도 아직 시작하지 않았는데요.

# 단계 2 — 행 간 여백 제거하기

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

현재 결과를 확인해 보면 기본적으로 행과 열 사이에 2px의 간격이 있는 것을 알 수 있어요. 원본 디자인에서는 열 사이에 10px 간격을 정의하고 행 사이에는 간격을 0으로 설정했었기 때문에 이를 조정해야 해요. 먼저, 행 사이의 기본 간격을 어떻게 제거할 수 있는지 살펴보죠.

## 여백, 테두리 또는 안쪽 여백?

첫 번째 문서에서 CSS "박스" 모델에는 여백 "박스", 테두리 "박스" 및 안쪽 여백 "박스"라는 세 가지 "박스"가 있다고 언급했습니다. 그러나 여러분의 요소 중 하나에 여백, 테두리 또는 안쪽 여백을 설정하려 하지 마세요. 이들 중 어느 것도 이러한 간격을 제거하는 데 도움이 되지 않아요. 사실, 여백, 테두리 및 안쪽 여백은 테이블 행(뿐만 아니라 테이블 열에도)에 대해 완전히 무시되며, 헤더 행 아래의 누락된 구분선에서 볼 수 있듯이 테이블 셀에 대해서도 여백이 무시됩니다. 게다가 셀에 테두리를 설정하면 이중 테두리가 생기죠.

이 정말 아름다운 것들, 그렇죠?

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

## Border-box?

하지만 기다려봐요, 이미 "박스" 모델에서 테두리에 대한 예외가 있어요. 만약 box-sizing을 content-box에서 border-box로 변경한다면 문제가 해결될까요? 물론 아뇨. 표(table)에서는 box-sizing 속성이 무시되는데, 마치 margin, border, padding이 테이블 행과 열에 적용되지 않는 것처럼 무시될 뿐이에요.

## 갭?

그렇다면 행 갭(row gap)은 어떨까요? 이 속성이 가장 타당해 보일 것 같아요. 왜냐하면 이 갭들은 행 사이에 있으며, 그러므로 이웃 행 중 어느 하나에 속하는 것이 아니기 때문이에요. 또한, CSS의 다른 레이아웃인 멀티컬럼, 플렉스, 그리드도 이 속성을 사용하고 있어요. 그러나, 유감스럽게도 이유는 CSS가 하는 일이 아니에요. 표(table)에는 row-gap 속성이 없습니다(심지어 column-gap 또한 사실상 없음), 이를 설정해도 아무 일도 일어나지 않을 거에요.

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

## Border-spacing?

표는 이러한 간격을 설정할 수 있는 특별하고 독특한 속성을 가지고 있습니다. 그 속성은 border-spacing이라고 불리며, 이 속성을 이용하여 행과 열 간의 수직 및 수평 간격을 설정할 수 있습니다.

그래서, 셀 테두리를 제거하고 표에 수평 및 수직 간격을 설정해 보겠습니다:

```js
Body(
    Table(/*...*/)
        .padding(50)
        .cornerRadius(30)
        .backgroundColor("#E6E6E6")
        .borderSpacing(10, 0) // 수평 및 수직 간격 설정
)
    .width(1000)
    .height(500)
    .backgroundColor("#666666")
    .display("flex")
    .justifyContent("center")
    .alignItems("center");
```

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

그리고 결과는 다음과 같습니다:

우리 레이아웃의 세로 부분은 거의 끝났어요. 헤더 행 아래에 구분선이 남아 있긴 하지만요. 그건 나중에 다시 다룰게요.

# 단계 3 — 열 사이에 간격 추가하기

이제 진짜 혼란이 시작돼요. border-spacing에 관한 문제는 두 가지로 구성돼 있어요:

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

- 먼저, 첫 번째 행/열 앞뒤에 여백이 추가되었습니다 (leading/trailing 또는 outer spacing)
- 둘째로, 여백에는 테두리와 배경이 없으며 이를 수정할 방법이 없습니다.

## 앞뒤 테두리 간격

flex 또는 grid 컨테이너의 갭과 달리, border-spacing은 앞뒤로 여백을 주입합니다. 갭 속성과 비교했을 때 이것은 또 다른 변칙에 그치는 것이 아니라 나쁜 디자인입니다. 외부와 내부 간격에 서로 다른 값을 설정할 수 없게 막아버리기 때문입니다. 테이블에 패딩을 적게 주어 이를 보완해 볼 수 있지만, 이 방법은 테이블 패딩의 크기보다 더 큰 내부 간격이 필요할 때 소진됩니다.

이 과장된 예제를 살펴보세요. 테이블 주위에 50px 패딩이 필요하며 열 사이에 120px 여백이 필요한 상황입니다. 패딩 해킹을 사용해 우리는 50px 왼쪽/오른쪽 패딩에서 추가 앞뒤 여백을 보정하기 위해 120px의 border-spacing을 추출했습니다. 그러나 결국 음의 패딩 값이 생성되어 잘못된 값이 됩니다:

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

```js
//50px 왼쪽 여백 - 120px 테두리 간격 = -70px 왼쪽 여백 (잘못된 값)

Body(
    Table(/*...*/)
        .padding(50, -70, 50, -70) //음수 패딩은 유효하지 않습니다
        .cornerRadius(30)
        .backgroundColor("#E6E6E6")
        .borderSpacing(120, 0) //수평 및 수직 테두리 간격
)
    .width(1000)
    .height(500)
    .backgroundColor("#666666")
    .display("flex")
    .justifyContent("center")
    .alignItems("center");
```

CSS에서 음수 값을 추가하려고 하면 패딩이 0px으로 고정되기 때문에 다음과 같이 됩니다:

## 테두리? 배경?

하지만 더 큰 문제는 헤더 행에 대한 테두리와 모든 일반 행에 대한 배경색을 명시적으로 설정했음에도 불구하고 이 간격에 대한 테두리와 배경이 없다는 것입니다. 이 문제에 대한 해결책은 없습니다. 유일한 해결책은 테두리 간격을 0으로 설정하고 셀 간의 간격을 추가하는 대안적인 방법을 찾는 것뿐입니다:

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

## 열은 안 됩니다!

테이블의 border-spacing으로 적절한 열 간격을 추가할 수 없는 경우 `col` 요소를 사용해 볼까요? 그 요소에 마진, 테두리 또는 안쪽 여백을 설정할 수 있을까요?

불행하게도, 테이블 행 요소와 마찬가지로 열 요소에도 마진, 테두리 또는 안쪽 여백이 적용되지 않습니다. 이러한 속성은 무시됩니다. 열 요소에서 작동하는 것으로 보이는 유일한 속성은 너비 속성이지만, 이것은 여기에서 도와주지 못할 것입니다.

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

우리의 최후 수단 중 하나는 무차별 공격입니다. 각 셀에 적절한 여백을 설정하여 수평 간격을 가짜로 만들 수 있습니다. 그 단점은 CSS 클래스를 사용해도 세심하고, 열 간격을 반으로 나눠 첫 번째 셀에 반을 적용하고 두 번째 셀에 다른 반을 적용해야 한다는 것입니다. 이 해킹 방법으로 CSS는 말 그대로 발을 쏘아부립니다. 중요한 점은 설정을 가능한 한 중앙에 집중시켜 반복을 피하는 것인데, 그럼에도 불구하고 CSS는 행이나 열 또는 심지어 테이블의 중앙에 갭 설정을 제공하지 않습니다.

또한, 이 해결책은 절대 의미론적이지 않으며 작업하기 굉장히 괴롭습니다. 그러나 이것이 CSS가 제공할 수 있는 최선의 방법입니다.

```js
// 이것은 각 행의 각 셀에 필요합니다

행(
    셀("캐릭터")
      .왼쪽여백(10)
      .오른쪽여백(5), // 반
    셀("처음 출연한 회")
      .왼쪽여백(5) // 반
      .오른쪽여백(5), // 반
    셀("동맹")
      .왼쪽여백(5) // 반
      .오른쪽여백(10)
)
    .아래테두리("1px solid #B3B3B3")
    .높이(40)
```

## 공간 확보?

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

마지막 수단으로 상황을 다루는 브루트 포스 방법을 어느 정도 단순화하기 위해 스페이서 열을 사용하는 것입니다. 이 해결책에서는 반쪽 안쪽 여백을 사용하여 간격을 가장합니다. 대신 공백 열을 삽입하여 간격의 전체 너비로 가장하게 됩니다. 그러나 이 방법에도 문제가 있습니다.

첫째, 일정한 너비의 열을 추가할 수 없습니다. 'col' 요소는 기존 열에 스타일만 적용할 수 있습니다. 따라서 열 간격을 모방하려면 빈 셀을 추가해야 합니다:

```js
Row(
    Cell().width(10), // 가장 앞쪽 간격을 가장하기
    Cell("캐릭터"),
    Cell().width(10), // 열 간격을 가장하기
    Cell("처음 등장한 에피소드"),
    Cell().width(10), // 열 간격을 가장하기
    Cell("동맹"),
    Cell().width(10) // 뒷쪽 간격을 가장하기
)
    .borderBottom("1px solid #B3B3B3")
    .height(40)
```

둘째, 테이블에 데이터를 직접로드하는 기능을 잃게 됩니다. 레이아웃이 무너지지 않도록 빈 셀을 수동으로 삽입해야 하기 때문입니다.

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

그리고 마지막으로, 빠진 셀이 있다면 테이블 전체가 이동되므로 실제로 공백 셀이 빠진다면 전체 테이블이 망가지게 되요 (저희의 공백 셀은 실제로 일반 셀입니다):

```js
Row(
    //Cell().width(10), //가짜 시작 공백, 실수로 빠짐
    Cell("캐릭터"),
    Cell().width(10), //가짜 열 공백
    Cell("처음 등장한 시기"),
    Cell().width(10), //가짜 열 공백
    Cell("몰락"),
    Cell().width(10) //가짜 끝 공백
)
    .borderBottom("1px solid #B3B3B3")
    .height(40)
```

하지만 긍정적인 면으로는, 무언가 잘못되었다는 것을 확실히 알 수 있을 거예요:

반의 패딩을 사용하건 풀 스페이서를 사용하건, 최소한 이제 어느 정도 올바른 디자인을 갖추게 되었네요:

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

헤더와 첫 번째 행 사이의 구분선이 없다는 점만 빠졌어요. 그것을 위해 우리는 CSS 지옥의 제일 깊은 곳까지 들어가야 합니다.

# 단계 네 — 구분선 추가하기

행과 열의 구분선은 행과 열 간격과 매우 유사합니다 (이웃에 속하지 않아야 합니다), 그러나 이런 이유로 CSS에서 행과 열 간격만큼이나 망가져 있습니다.

이미 알았듯이, 행 요소에는 테두리를 추가할 수 없고, 열 요소도 마찬가지이기 때문에 이로 인해 우리에게는 두 가지 옵션이 남습니다:

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

- 같은 행의 모든 셀에 하단 또는 상단 테두리를 추가하거나
- 간격과 같은 배경을 가진 스패서를 추가하여 간격을 가장했던 것처럼

## 다시 테두리?

우리는 이미 “박스” 모델에서 테두리가 레이아웃에 계산된다는 것이 얼마나 나쁜지 알고 있습니다. 그러나 테이블에서는 이 문제가 없다는 것을 발견했습니다. 실제로 셀들은 자신 안에서 테두리를 제대로 표시하며 레이아웃에 영향을 주지 않습니다.

그래서 박스 크기는 테이블 내에서는 아무런 영향을 미치지 않지만 아직 축하할 일이 아닙니다. 여기서의 문제는 인접한 셀이 동일한 테두리를 공유하지 않는다는 것이며 대신 옆으로 옆으로 렌더링됩니다. 헤더 셀에 1px의 검은색 하단 테두리를 추가하고 첫 번째 행의 일반 셀에는 1px의 빨간색 상단 테두리를 추가하십시오:

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

```js
Row(
    Cell()
        .width(10)
        .borderBottom("1px solid black"),
    Cell("Character")
        .borderBottom("1px solid black"),
    Cell()
        .width(10)
        .borderBottom("1px solid black"),
    Cell("First seen in")
        .borderBottom("1px solid black"),
    Cell()
        .width(10)
        .borderBottom("1px solid black"),
    Cell("Allegiance")
        .borderBottom("1px solid black"),
    Cell()
        .width(10)
        .borderBottom("1px solid black")
)
    .borderBottom("1px solid #B3B3B3")
    .height(40),

Row(
    Cell()
        .width(10)
        .borderTop("1px solid red"),
    Cell("Space Beth")
        .borderTop("1px solid red"),
    Cell()
        .width(10)
        .borderTop("1px solid red"),
    Cell("S4 E10")
        .borderTop("1px solid red"),
    Cell()
        .width(10)
        .borderTop("1px solid red"),
    Cell("friend")
        .borderTop("1px solid red"),
    Cell()
        .width(10)
        .borderTop("1px solid red")
)
    .backgroundColor("#FFFFFF")
    .height(40)
```

아래는 위의 디자인을 표시합니다:

이 디자인에는 몇 가지 문제가 있습니다.

먼저, 셀 내부의 테두리는 올바르게 렌더링되지만 여전히 셀의 크기를 변경할 수 있습니다. 테두리의 폭/높이와 텍스트 내용의 크기가 셀에 설정된 명시적 크기보다 크다면, 셀은 크기 설정을 무시하고 계속 커질 것입니다. 이는 감지하기 어려운 레이아웃 이상을 야기할 수 있습니다.


<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

두 번째로 CSS에서 행에 대한 테두리 지원이 부족하므로 모든 셀에 테두리를 추가해야 합니다. 하지만 CSS에는 적절한 열 간격을 지원하지 않기 때문에 가짜 열 간격 셀에도 테두리를 추가해야 하므로 코드가 더 복잡해집니다(위의 코드를 살펴보세요).

세 번째로 CSS는 인접한 테두리를 기본적으로 병합하지 않기 때문에 한 쌍의 테두리 대신 두 개의 테두리가 생성됩니다. 한 세트의 셀에 완전한 테두리를 추가하거나 다른 쪽에 추가할 수 있거나 구분자 폭을 절반으로 줄이고 두 쪽에 추가할 수 있습니다. 이것은 패딩을 사용하여 열 간격을 가장한 것과 동일한 문제입니다. 어떤 방법을 선택하든 결과적으로 코드가 완전히 꼬이게 됩니다.

## 그럼 테두리를 병합합시다

당연한 얘기지만, 그게 어떻게 작동하는지 살펴봅시다. 테이블 전용 속성인 border-collapse라는 속성이 있으며 두 가지 값, separate와 collapse을 가질 수 있습니다. 그래서 이것을 collapse로 설정하고 어떻게 변하는지 살펴봅시다:

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

처음으로 이것을 볼 때, 웃음을 참을 수 없었어요. 이 속성의 "디자이너"들이 무슨 생각을 하고 있었는지 모르겠지만 정말 정말 그들에게 물어보고 싶어져요. 이건 웃기거나 넘어갈만한 수준을 넘어선걸요. border-collapse를 collapse로 설정하면 모든 테두리가 사라져 버려요. 인접한 셀 간 뿐 아니라 셀 테두리와 함께 테이블 테두리도 사라진답니다. 이게 뜻하는 건 CSS가 이제는 테이블에 패딩을 이해하지 못한다는 거죠. 추가로, 둥근 모서리가 테이블 셀의 배경을 둥글게 못 만든다는 것을 보여줍니다 (예제에서 아랫쪽 두 꼭지점도 둥글게 처리하게 되어, 그냥 셀의 마지막 행 밑에 그려지는 겁니다).

그런데 이제 이 질문이 남아있는데요: 두 셀 또는 셀과 테이블 자체에 모두 테두리를 설정하면, 누가 이길까요? CSS에서는 뒤에 정의된 요소가 앞에 정의된 요소 위에 렌더링됩니다. 그런데 이 경우엔 헤더 셀에 검은 테두리가 보입니다. 그리고 그 테두리 색상은 첫 번째 행 앞에 명확히 정의된 상태죠. 그보다 더 나쁜 일은, 빨간 테두리를 검은 테두리보다 두껍게 설정하면, 빨간 테두리가 이긴다는 거예요. 참 멋지게 돌아가죠.

이제 알아요, 가끔 뼈 있는 말을 하지만 이 속성 이름과 값 역시 말도 안 되게 어색하다는 걸 지적해야겠어요. 이건 테두리가 축소되는지 아닌지를 정의하는 불리언 토글인데, CSS는 적절한 타입을 정말 싫어해요. 그래서 우리는 두 개의 문자열 값을 가진 열거형으로 갇혀있어요. 하지만, "border collapse is separate" 또는 "border collapse is collapse"라고 하는 건 정말 어색하다고 생각돼요. 다음 두 옵션 중 하나를 가질 수 있었는데, 그렇지 않았어요:

- border-collapse: true/false
- border-handling: separate/collapse

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

## 공간이 또 필요해요?

만약 테이블 안에 간격을 넣는 것이 중요하지 않고(아마 이미 다른 컨테이너를 갖고 있을 수도 있습니다) 테두리를 사용하는 것을 선호한다면 border-collapse를 이용해보세요. 하지만 그것 이외에 다른 방법을 원한다면, 우리의 마지막 옵션은 열 간격을 가짜 구분자로 만들어보는 것입니다. 이때 열 간격을 만드는 것처럼 빈 행으로 구분자를 만들어야 합니다. 단점은 이제 테이블의 높이가 늘어난다는 것입니다(border-sizing이 content로 설정된 상태에서 "박스" 모델이 작동하는 방식과 유사합니다).

이것이 이를 달성하기 위한 우리의 코드입니다:

```js
Row(
    Cell()
        .width(10),
    Cell("Character"),
    Cell()
        .width(10),
    Cell("First seen in"),
    Cell()
        .width(10),
    Cell("Allegiance"),
    Cell()
        .width(10)
)
    .height(40),

//구분자 추가
Row()
    .height(1)
    .backgroundColor("black"),

Row(
    Cell()
        .width(10),
    Cell("Space Beth"),
    Cell()
        .width(10),
    Cell("S4 E10"),
    Cell()
        .width(10),
    Cell("friend"),
    Cell()
        .width(10)
)
    .backgroundColor("#FFFFFF")
    .height(40)

//나머지 행들...
```

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

그리고 우리의 결과입니다:

호호! 이것이 작동할 것으로 생각했나요? 하지만 빈 행을 무시하는 것이 알려진 사실이죠. 명세서를 읽지 않았나요?

장난은 그만두고, 안타깝게도 이 방법은 작동하지 않습니다. 빈 행에서 높이가 무시될 때가 아니라 행이 실제로 존재하며 표의 높이가 증가한 것 때문입니다. 그러나 행에 배경색을 설정할 수 없기 때문에 작동하지 않습니다. 그러나 헤더 행의 배경색을 변경하면(배경 없이 셀만 있는 행), 실제로 전체 행의 배경색을 설정할 수 있습니다:

```js
//셀에 어떤 배경도 없다고 가정
Row(
    Cell()
        .width(10),
    Cell("Character"),
    Cell()
        .width(10),
    Cell("First seen in"),
    Cell()
        .width(10),
    Cell("Allegiance"),
    Cell()
        .width(10)
)
    .backgroundColor("coral") //행에만 배경색 설정
    .height(40)
```

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

아래 결과입니다:

우리의 옵션은 제한되어 있습니다: 우리는 모든 이상한 부분을 갖춘 테두리를 다시 사용하거나, 빈 행에 빈 셀을 추가하여 가짜 행의 배경색을 활성화할 수 있습니다:

```js
Row(
    Cell()
        .width(10),
    Cell("Character"),
    Cell()
        .width(10),
    Cell("First seen in"),
    Cell()
        .width(10),
    Cell("Allegiance"),
    Cell()
        .width(10)
)
    .height(40),

//가짜 행
Row(
    Cell("") //가짜 셀
)
    .height(1)
    .backgroundColor("black"),

Row(
    Cell()
        .width(10),
    Cell("Space Beth"),
    Cell()
        .width(10),
    Cell("S4 E10"),
    Cell()
        .width(10),
    Cell("friend"),
    Cell()
        .width(10)
)
    .backgroundColor("#FFFFFF")
    .height(40)

//나머지 행들...
```

다시 트릭! 여전히 작동하지 않습니다, 왜냐하면 행 배경은 셀이 있는 곳에만 렌더링되기 때문입니다. 그래서 추가된 행으로 단일 분리선을 그리려면, 정규 행과 빈 셀의 수가 동일한 수로 채워주어야 합니다. 요렇게 말입니다:

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

```js
//가짜 행
행(
    셀(""), //가짜 셀로 가짜 선행 열 간격
    셀(""), //첫 번째 열을 위한 가짜 셀
    셀(""), //가짜 열 간격을 위한 가짜 셀
    셀(""), //두 번째 열을 위한 가짜 셀
    셀(""), //가짜 열 간격을 위한 가짜 셀
    셀(""), //세 번째 열을 위한 가짜 셀
    셀("") //가짜 후행 열 간격을 위한 가짜 셀
)
    .height(1)
    .backgroundColor("black")
```

그리고 여전히 이 분리 기호 행의 높이가 1px이 아닌 2px임을 알 수 있을 것입니다. 이는 CSS의 빈 셀에는 모든 방향으로 기본 1px 패딩이 있기 때문에 명시적으로 설정한 행 높이인 1px을 재정의하여 2px 셀 높이가 되기 때문입니다. 이를 고려하여 최종 코드는 다음과 같습니다:

```js
//가짜 행
행(
    셀("") //가짜 선행 열 간격을 위한 가짜 셀
        .padding(0),
    셀("") //첫 번째 열을 위한 가짜 셀
        .padding(0),
    셀("") //가짜 열 간격을 위한 가짜 셀
        .padding(0),
    셀("") //두 번째 열을 위한 가짜 셀
        .padding(0),
    셀("") //가짜 열 간격을 위한 가짜 셀
        .padding(0),
    셀("") //세 번째 열을 위한 가짜 셀
        .padding(0),
    셀("") //가짜 후행 열 간격을 위한 가짜 셀
        .padding(0)
)
    .height(1)
    .backgroundColor("black")
```

그리고 최종 결과는 아래와 같습니다:


<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

지금 당신이 생각하는 것은 아마도 이것이 인라인 스타일이 왜 나쁜지이며, 이 코드가 최소한 일부 CSS 클래스를 사용하는 것이 더 나아 보일 것이라는 것인데, 나는 이에 동의하지 않습니다. 이러한 CSS 도구를 사용하면 이러한 문제를 더욱 잘 알아보기 어려워집니다. 테이블 행에는 (물론 테이블 열에도) 하나의 테두리 속성만 있다면, 이 코드는 JavaScriptUI에서도 HTML에서도 CSS에서도 존재하지 않을 것입니다. 외부 CSS 코드나 CSS 클래스, 또는 다른 것들이 필요하지 않을 것입니다.

이렇게 한 줄만을 위해, 이렇게: Row().borderBottom(“1px solid black”).

왜 이런 경우가 되지 않는지는 나에게는 이해할 수 없는 일입니다.

# 다시 한번 요약해보면

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

CSS의 기초는 "박스" 모델인데, 테이블에는 거의 적용되지 않아요. 모든 것이 예외의 예외에 해당합니다. 테이블은 마진, 테두리 및 안쪽 여백을 갖을 수 있지만, 테두리가 축소되면 안쪽 여백은 무시됩니다. 테이블 행에는 전혀 마진, 테두리 또는 안쪽 여백을 설정할 수 없습니다. 배경은 셀이 있을 때만 보이며, 배경이 없는 경우에는 행 배경이 셀 아래에서만 보입니다. 또한, 행에 명시적 높이나 최대 높이를 설정해도 알 수없는 CSS 기능이 이를 암시적으로 무시할 수 있습니다. 테이블 전체에 플렉스 부모를 갖거나 테두리가 있는 셀 또는 기본 안쪽 여백이 있는 빈 셀 등의 특정한 경우에는 이를 재정의할 수 있습니다. 테이블 열은 스타일링에만 사용되며, 마진, 테두리 또는 안쪽 여백을 가질 수 없습니다. 셀에도 마진을 설정할 수 없고, 셀 테두리는 다른 CSS 요소의 테두리와 다르게 동작합니다. 경우에 따라 셀 위에 렌더링되거나 그렇지 않을 수 있습니다. 또한 셀 테두리는 기본적으로 분리되어 있고, 이를 축소하면 테이블의 테두리도 사라지고 미리 지정된 안쪽 여백이 손실됩니다. 축소된 테두리는 기본적인 쌓임 규칙을 따르지 않습니다. 테이블의 테두리를 축소하면 셀에서 나중에 정의한 테두리가 먼저 정의한 테두리를 덮어쓰게 됩니다. 또한, 테이블에는 기본적으로 2px의 열과 행 갭이 있지만, 이는 다중 열, 플렉스 및 그리드 컨테이너와는 달리 box-sizing 속성이나 행/열 갭 속성에 의해 조절되지 않고, border-spacing이라는 추가 속성에 의해 결정됩니다. 이러한 혼돈은 CSS의 분명하지 않은 특성보다도 심각합니다. 무엇보다도, 그저 15년 전만 해도 테이블이 전체 웹사이트의 레이아웃 솔루션이었던 것을 생각하면 더욱 그렇죠.

## 작은 한탄


<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

자, 진정해보려고 애를 쓰고 있긴 한데, 이것은 개발자들, 디자이너들, 프로그래머들, 일반적으로 인류에게 모욕적인 행동입니다. 이따위 쓰레기에 어떻게 대처하는 방법을 배웠든지, 명세서 일 만장일치 읽었든지, 어떤 문제도 없이 멋진 웹사이트를 만들 수 있었다 하더라도, 이런 기본적인 것들이 망가져 있는 것은 용납할 수 없는 일입니다. 만약 이 쓰레기를 책임지는 사람이 이 글을 읽고 있다면, 당신과는 문제가 없다는 걸 알아주셨으면 합니다. 하지만 이것을 바로잡아야 합니다, 왜냐하면 이 쓰레기는 용납할 수 없는 것입니다.

그리고 여전히 웹에서 테이블이 어떻게 작동해야 하는지 완전히 재설계해야 하는지 궁금해하는 분들에게: 오늘 보여준 것들 중 어떠한 것도 주요 접근성 위반입니다. 깨진 테두리, 불규칙한 배경, 불균형한 행 높이, 비대칭적인 간격까지, 정말요? 정말 웹상의 테이블이 해결된 문제라고 생각하십니까?

`/억지심정`

## 결론

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

오늘 여기까지 준비한 내용입니다. 흥미롭게 보셨으면 좋겣고, 이 정도로 긴 기술적인 글을 끝까지 읽어주셔서 감사합니다. 제 작업을 좋아하신다면 박수를 치거나 댓글을 남기고 주변 친구나 동료들과 공유해주시면 감사하겠습니다.

감사합니다, 즐거운 한 주 보내세요.

⬅️ DevBlog #8 — CSS에는 상자 모델이 없다? 시각적 레이어를 다루는 데 어려움을 겪는 이유입니다.