---
title: "라이브러리나 커스텀 알고리즘 없이 모던 컬러 스케일 만드는 방법"
description: ""
coverImage: "/assets/img/2024-06-23-Moderncolorscaleswithoutanylibrariesorcustomalgorithms_0.png"
date: 2024-06-23 14:14
ogImage: 
  url: /assets/img/2024-06-23-Moderncolorscaleswithoutanylibrariesorcustomalgorithms_0.png
tag: Tech
originalTitle: "Modern color scales without any libraries or custom algorithms"
link: "https://medium.com/@marian-caikovski/modern-color-scales-without-any-libraries-or-custom-algorithms-12e2267c7068"
isUpdated: true
---




![이미지](/assets/img/2024-06-23-Moderncolorscaleswithoutanylibrariesorcustomalgorithms_0.png)

## 왜 색상 척도를 사용해야 하는가?

웹 애플리케이션에서 숫자를 단순히 숫자로만 표시하는 것보다 숫자에 해당하는 색상으로 숫자를 표현하는 것이 좋은 아이디어일 수 있습니다. 색상 척도에서 값의 위치에 해당하는 색상으로 채워진 숫자로만 수치적인 값을 전달하는 것이 더 쉽습니다. 모든게 빨간색으로 되어 있으면 상황을 이해하기 위해 숫자를 읽을 필요가 없을 수도 있습니다.

텍스트의 색상도 유용할 수 있습니다. 예를 들어, 텍스트 분류 작업에서는 사용자가 입력 텍스트의 각 단어가 예측된 레이블에 미치는 기여도를 보는 것을 좋아합니다. 색상 척도는 각 단어의 점수를 시각적으로 나타내는 효과적인 수단입니다. 프랑스 명사의 끝과 성별 간 상관 관계에 대한 이전에 공유된 게시물에서 접미사의 양적 여성성과 남성성을 시각화하기 위해 분홍-파랑 척도를 사용했습니다.

<div class="content-ad"></div>

의미 있는 색상으로 값을 강조하려면 두 가지 도구가 필요합니다:

- 숫자 범위에 시각적으로 해당하는 균일한 색상 범위를 생성하는 함수
- 사용된 범위 내에서 주어진 위치에 해당하는 색상을 반환하는 함수

## 두 색상 사이에 선형 그라데이션을 생성하는 여러 가지 방법

두 가지 다른 색상 사이의 경로는 완전히 다른 색이거나 심지어 자연적으로 관련이 없는 색 또는 한계 색의 음영일 수 있는 다른 색상을 통해 지나갑니다. 위의 이미지에서 확인할 수 있습니다. 경로상의 색상은 모든 가능한 색상이 계산 중에 어떻게 배열되는지에 따라 달라집니다. 현대 CSS는 15가지 색 공간을 지원합니다. 그 중 4가지는 극좌표입니다. 극좌표 공간의 두 색상 사이의 경로는 짧을 수도 있고 길 수도 있습니다. 따라서 브라우저는 CSS 함수 linear-gradient()를 사용하여 어떤 두 색상 사이의 19가지 서로 다른 경로를 생성할 수 있습니다:

<div class="content-ad"></div>

```js
background: linear-gradient(in hsl shorter hue, limegreen, red);
```

일부 알고리즘의 결과는 매우 다른 이름을 갖고 있더라도 상당히 유사합니다. Limegreen과 red 사이의 모든 가능한 그라데이션을 담은 상단 이미지에서, 익숙한 노란색을 중간에 통과해야 하는 경우 hsl 또는 hwb의 더 짧은 방식을 선택할 수 있습니다. display-p3, a98-rgb, prophoto-rgb 또는 rec2020 방법을 사용하면 녹색에서 붉은색으로의 전이도 중간쯤에서 발생하지만 노란색 조합은 없습니다.

그러나 red가 springgreen과 섞이면 19개의 방법 중 어느 것도 완벽한 그라데이션을 생성하지 못합니다. 같은 방법으로 생성된 그라데이션에서의 녹색에서 붉은색으로의 전환은 50% 아래로 보입니다. hsl 또는 hwb의 더 짧은 방식으로 생성된 그라데이션에서 노란색은 바로 40%에 위치합니다. 나에게는 srgb-linear 그라데이션이 가장 좋아 보입니다.

<img src="/assets/img/2024-06-23-Moderncolorscaleswithoutanylibrariesorcustomalgorithms_1.png" />


<div class="content-ad"></div>

그래서 기본적으로 두 색상 사이의 점진적인 전환을 계산하는 다양한 방법이 있습니다. 그러나 모든 가능한 색상 조합에 대해 시각적으로 일정한 그라데이션을 만들어내는 보편적인 방법은 없습니다. 특정 두 색상을 균일하게 섞는 것이 항상 가능한 것도 아닙니다. 색상 척도를 만들려면 약간의 시도와 실험을 통해 두 색상을 선택하고 이를 균일하게 섞는 방법을 선택해야 합니다.

## 숫자 값과 그라데이션 내 색상 매핑

오늘날, 그라데이션의 특정 위치에 해당하는 색상을 검색할 수 있는 새로운 CSS 함수 color-mix()가 있습니다. 이 함수는 모든 브라우저에서 지원됩니다. 이 함수는 지정된 두 색상의 지정된 백분율을 사용하여 어떤 방법으로든 두 색상을 섞은 결과인 색상을 반환합니다. 다시 말해, 이 함수는 선형 그라데이션의 지정된 위치에 해당하는 색상을 반환합니다. 위치는 한 색상의 백분율로 지정되며, 두 번째 색상의 백분율은 100%에서 남은 값입니다. 예를 들어, hsl 더 긴색채에 대한 20의 색상 값을 사용할 때:

```js
color: color-mix(in hsl longer hue, limegreen, 20%, red)
```

<div class="content-ad"></div>

## 요약

위의 화려한 백분율이 있는 그림들은 새로운 CSS 기능인 color-mix()에 의해 활성화됩니다. 색상 라벨, 그리드 라인 및 그라데이션은 쉬운 CSS를 사용하여 색상 스케일로 배열할 수 있습니다.

전체 코드를 다음 페이지에서 확인할 수 있습니다: [링크](https://marianc000.github.io/colorScales/), 또는 [여기](https://github.com/marianc000/colorScales)에서 다운로드할 수 있습니다.