---
title: "CSS 프로그래스 바 완벽 이해하기 2024 최신 가이드"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-07-06 10:12
ogImage: 
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "Understanding CSS Progress Bars"
link: "https://medium.com/@code-passion/understanding-css-progress-bars-57d39173492a"
---


웹 개발 세계에서 시각적으로 매력적이고 사용자 친화적인 인터페이스를 갖추는 것이 중요합니다. 프로그래스 바는 이 목표를 달성하는 데 중요한 요소입니다. 프로그래스 바는 사용자에게 준비 상태와 피드백 감을 제공할 뿐만 아니라 전체 사용자 경험을 향상시키기도 합니다. 프로그래스 바를 구현하는 다양한 방법이 있지만, CSS는 유연하고 적응성 있는 접근 방식을 제공합니다. 이 포스트에서는 CSS 프로그래스 바에 대해 알아보고, 기능, 스타일 옵션 및 권장 구현 방법에 대해 살펴보겠습니다.

## 원형 CSS 프로그래스 바의 구조

핵심적으로 프로그래스 바는 작업이나 프로세스의 완료 상태를 그래픽으로 나타낸 것입니다. CSS를 이용하면 개발자들은 복잡한 JavaScript 도구나 프레임워크에 의존하지 않고 간단한 마크업과 스타일 기법으로 프로그래스 바를 만들 수 있습니다. CSS 변수인 너비, 배경색 및 테두리 반지름과 같은 것들을 활용하여 개발자들은 프로그래스 바의 모양을 자신의 디자인 취향과 브랜딩 요구 사항에 맞게 조정할 수 있습니다. (프로그래스 바 예제 읽기)

## 원형 프로그래스 바 작동 방식

<div class="content-ad"></div>

원형 프로그레스 바는 사용자 인터페이스에서 작업이나 프로세스의 상태를 표시하는 데 사용되는 시각적 인디케이터입니다. 원형 프로그레스 바는 좌에서 우로가 아니라 시계방향으로 원 주위를 채우는 방식으로 동작합니다.

# 놀라운 CSS 프로그레스 바 예시

## 세련된 CSS 원형 프로그레스 바: 시간이 지남에 따라 채워지는 빨간색부터 검은색까지의 그라데이션을 가진 원형 영역

이 코드는 동적인 빨간색부터 검은색까지의 그라데이션으로 채워지는 시각적으로 매력적인 프로그레스 인디케이터를 생성하며, 진행 퍼센트를 표시하는 텍스트가 함께 제공됩니다.

<div class="content-ad"></div>

아래는 Markdown 형식으로 테이블 태그를 변경한 코드입니다.


<img src="https://miro.medium.com/v2/resize:fit:1400/1*LAVuedx3wsRkqbRDhDAGQw.gif" />

자세히 살펴보겠습니다:

```js
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Progress Indicator with Red to Black Gradient</title>
<style>
  body
  {
    width: 500px;
    margin: 0 auto;
    margin-top: 200px;
  }
  .progress {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    position: relative;
    background: #f3f3f3;
    overflow: hidden;
  }

  .progress::before {
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: conic-gradient(from -90deg, red, black);
    position: absolute;
    top: 0;
    left: 0;
    animation: animate 5s linear infinite;
  }

  .inner-circle {
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #f3f3f3;
  }

  .progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    color: #0c0c0c; /* Text color */
  }

  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
</head>
<body>
<div class="progress">
  <div class="inner-circle"></div>
  <div class="progress-text">75%</div>
</div>
</body>
</html>
```


<div class="content-ad"></div>

- 원형 진행 표시기: 진행 표시기는 .progress 클래스를 사용하여 지정된 너비와 높이로 원형 요소로 디자인되었습니다.
- 빨간색에서 검정색 그라데이션 애니메이션: 이 진행 표시기의 주요 매력은 conic-gradient를 사용하여 .progress::before 의 유사요소를 통해 달성된 빨간색에서 검정색 그라데이션 애니메이션입니다. 이것은 로딩 막대와 유사한 시각적으로 매력적인 효과를 만듭니다.
- 텍스트 표시: 진행 표시기의 중앙에 완료된 비율이 .progress-text 클래스를 사용하여 표시됩니다.
- 애니메이션: 애니메이션은 0에서 360도까지 그라데이션을 회전시키고 부드러운 루핑 효과를 만드는 @keyframes animate를 사용하여 정의됩니다. (자세한 내용 보기)

# 결론

CSS 진행 막대는 개발자가 시각적으로 매력적이고 작동하는 사용자 경험을 디자인하는 데 도움이 되는 유용한 도구입니다. 개발자는 진행 막대의 모양과 동작을 자신의 디자인 선호도에 맞게 사용자 정의할 수 있으며, 전반적인 사용자 경험을 향상시킬 수 있습니다. 실행 시 최상의 모범 사례를 준수하면 개발자는 진행 막대가 웹 앱에 원활하게 통합되고 접근 가능하며 성능이 우수하다고 보장할 수 있습니다. 이 책으로 CSS 진행 막대를 충분히 숙지하고 웹 개발 프로젝트를 높은 수준으로 이끌 준비가 될 것입니다.