---
title: "CSS position 속성 absolute와 relative 차이점 알아보기"
description: ""
coverImage: "/assets/img/2024-07-09-Differencebetweencsspositionabsoluteversusrelative_0.png"
date: 2024-07-09 17:55
ogImage:
  url: /assets/img/2024-07-09-Differencebetweencsspositionabsoluteversusrelative_0.png
tag: Tech
originalTitle: "Difference between css position absolute versus relative"
link: "https://medium.com/@leannezhang/difference-between-css-position-absolute-versus-relative-35f064384c6"
---

어떤 시간을 들여서 '절대 위치 지정'과 '상대 위치 지정'의 차이를 이해해 보았어요. 이 주제가 혼란스러웠는데, 그래서 그들의 차이를 그림으로 설명하기로 결정했죠.

더 나아가기 전에, 어떤 위치 속성도 지정하지 않았을 때 위치의 기본 동작에 대해 알아야 해요.

## position: static

## position: relative

<div class="content-ad"></div>

## 절대 위치

# 예제 살펴보기

먼저 4개의 상자가 나란히 있는 부모 컨테이너를 만들어 보세요.

![이미지](/assets/img/2024-07-09-Differencebetweencsspositionabsoluteversusrelative_0.png)

<div class="content-ad"></div>

index.html

```js
<div class=”parent”>
 <div class=”box” id=”one”>One</div>
 <div class=”box” id=”two”>Two</div>
 <div class=”box” id=”three”>Three</div>
 <div class=”box” id=”four”>Four</div>
</div>
```

style.css

```js
.parent {
 border: 2px black dotted;
 display: inline-block;
}
.box {
 display: inline-block;
 background: red;
 width: 100px;
 height: 100px;
}
#two {
  background: green;
}
```

<div class="content-ad"></div>

라이브 코드: JsBin

기본적으로 position은 static으로 설정됩니다. 이는 흐름에 따라 레이아웃을 기준으로 위치를 결정합니다.

## GreenBox를 이동하고 주변 레이아웃에 영향을 미치고 싶지 않을 때는 어떻게 해야 할까요?

![이미지](/assets/img/2024-07-09-Differencebetweencsspositionabsoluteversusrelative_1.png)

<div class="content-ad"></div>

여기서 position relative가 필요합니다. 현재 위치로부터 녹색 상자를 왼쪽으로 20픽셀, 위쪽으로 20픽셀 이동시키세요. 주변 레이아웃을 변경하지 않고 남겨두어야 합니다. 따라서 position이 없는 경우와 같은 위치에 녹색 상자의 갭을 남겨두세요.

```css
#two {
  top: 20px;
  left: 20px;
  background: green;
  position: relative;
}
```

라이브 코드: JsBin

## Position: absolute는 그 반대입니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-07-09-Differencebetweencsspositionabsoluteversusrelative_2.png" />

GreenBox에 position: absolute를 적용하면, 예상되는 공간을 남기지 않습니다. GreenBox의 위치는 부모 위치(점선 테두리)를 기준으로 합니다. 따라서, 점선 테두리의 좌측 상단 기준에서 왼쪽으로 20px, 아래로 20px 이동합니다.

```js
#two {
  top: 20px;
  left: 20px;
  background: green;
  position: absolute;
}
```

실시간 코드 작성 및 실행: JsBin

<div class="content-ad"></div>

# 요약하면 …

`position: relative`은 요소를 현재 위치를 기준으로 배치하고 주변 레이아웃을 변경하지 않습니다. 반면, `position: absolute`는 요소를 해당 부모 요소의 위치를 기준으로 배치하며 주변 레이아웃을 변경합니다.

[참고 이미지](/assets/img/2024-07-09-Differencebetweencsspositionabsoluteversusrelative_3.png)
