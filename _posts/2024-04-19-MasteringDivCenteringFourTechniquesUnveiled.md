---
title: "Div를 중앙 정렬하는 4가지 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Mastering Div Centering Four Techniques Unveiled"
link: "https://medium.com/@nathananteneh2019/mastering-div-centering-four-techniques-unveiled-cb5e57715442"
---



![MasteringDivCenteringFourTechniquesUnveiled_0](/assets/img/MasteringDivCenteringFourTechniquesUnveiled_0.png)

## 시니어 개발자처럼 div를 가운데 정렬하는 4가지 방법

![MasteringDivCenteringFourTechniquesUnveiled_1](/assets/img/MasteringDivCenteringFourTechniquesUnveiled_1.png)

플렉스박스와 그리드와 같은 클래식한 방법부터, 절대 위치 지정과 마진 트릭과 같은 변칙적인 접근법까지 알아보세요. 당신이 프론트엔드 전문가이든 백엔드 마스터이든, 이러한 기술을 숙달하면 웹 개발 능력이 향상될 것입니다. 지금 시작해서 당신의 div 가운데 정렬 잠재력을 발견해보세요.

<div class="content-ad"></div>

아래 예시에서는 HTML과 CSS 보일러플레이트를 사용할 것입니다.

```js
<!-- index.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Center 'em all</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="container">
        <div class="content"></div>
    </div>

</body>
</html>
```

```js
/* style.css */

.container{
    width: 400px;
    height: 400px;
    background: #E9E3D5;
    border-radius: 20px;
    /* the methods start from here */

}

.content{
    width: 100px;
    height: 100px;
    background: #0A7273;
    border-radius: 10px;
    /* the methods start from here */

}
```

# 방법 1. flex 박스 사용하기:

<div class="content-ad"></div>

이는 div 또는 어떤 요소를 가운데 정렬하는 더 일반적이고 효율적인 방법입니다. 이 방법을 많이 볼 수 있을 것입니다.

이 방법을 사용하려면 컨테이너의 display 속성을 flex로 설정해야 합니다. 기본 스타일 때문에 content div는 top-left 모퉁이에 위치하게 됩니다.

```js
display: flex;
```

그런 다음 justify-content 속성을 center로 설정하면 (기본값은 "start"입니다), x축 또는 수평으로 content를 가운데 위치시킵니다. 이후 수직으로 가운데 정렬하려면 align-item 속성을 center로 설정하면 됩니다. (기본값은 "stretch"입니다) 그러면 content가 아주 잘 가운데 정렬될 것입니다.

<div class="content-ad"></div>

최종 CSS는 다음과 같을 것입니다:

```js
.container{
    width: 400px;
    height: 400px;
    background: #E9E3D5;
    border-radius: 20px;

    /* 여기부터 메소드 시작 */
    display: flex;
    justify-content: center;
    align-items: center;
}

.content{
    width: 100px;
    height: 100px;
    background: #0A7273;
    border-radius: 10px;
    /* 여기부터 메소드 시작 */
}
```

# 메소드 2. 그리드 사용하기:

그리드 역시 효과적입니다. 주로 콘텐츠를 그리드 형식으로 구조화해야 할 때 사용됩니다. 해당 메소드를 달성하려면 container의 표시(display) 속성을 그리드로 설정해야 합니다. 이렇게 하면 기본 스타일 때문에 콘텐츠가 왼쪽 상단에 배치됩니다.

<div class="content-ad"></div>

```css
display: grid;
```

이제 내용을 가운데로 정렬하려면 place-items 속성을 center로 설정하면 됩니다.
(CSS Grid에서 place-content 속성의 기본값은 normal입니다. normal 값은 align-content를 stretch로, justify-content를 start로 설정하는 shorthand 속성입니다). 그럼 이제 다 끝났어요.

최종 CSS는 다음과 같을 것입니다:

```css
.container {
  width: 400px;
  height: 400px;
  background: #e9e3d5;
  border-radius: 20px;

  /* 여기부터 메소드가 시작됩니다 */
  display: grid;
  place-items: center;
}

.content {
  width: 100px;
  height: 100px;
  background: #0a7273;
  border-radius: 10px;
  /* 여기부터 메소드가 시작됩니다 */
}
```

<div class="content-ad"></div>

# 방법 3. 절대 위치 사용하기:

절대 위치 지정은 유용한 속성이지만 div나 다른 요소를 가운데 정렬하는 데 사용하는 것은 좋은 습관이 아닙니다. 그래도 알아두는 것이 좋습니다.

따라서 이 방법을 사용하려면 먼저 컨테이너 div의 position 속성을 relative로 설정해야 합니다. 이렇게 하면 레이아웃에 변경이 없습니다.

```js
position: relative;
```

<div class="content-ad"></div>

이제 컨텐츠의 위치 속성을 절대 위치로 설정해야 합니다.

```js
position: absolute;
```

이제 이 속성(top, right, left, bottom)을 사용하여 컨텐츠의 위치를 조절할 수 있습니다.

이제 컨텐츠 클래스 내부에 top을 50%, left를 50%로 설정하면 요소가 중간에 위치하지만 정확히 중앙에는 위치하지 않습니다.

<div class="content-ad"></div>

```js
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
```

따라서 우리는 변환 속성을 사용하여 x축은 -50%, y축은 -50%로 변환하여 해결할 수 있습니다.

최종 CSS는 다음과 같습니다:

<div class="content-ad"></div>

```js
.container{
    width: 400px;
    height: 400px;
    background: #E9E3D5;
    border-radius: 20px;

    /* 여기부터 메소드 시작 */
    position: relative;
}

.content{
    width: 100px;
    height: 100px;
    background: #0A7273;
    border-radius: 10px;

    /* 여기부터 메소드 시작 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

# 메소드 4. 마진 사용:

마진을 사용하여 가운데 정렬하는 방법은 요소를 가운데 정렬하는 데 사용하는 것이 최후의 선택이어야 합니다. 이 방법은 수평으로만 가운데로 정렬하며, 요소를 가운데로 정렬하기 위해 사용하는 것은 좋지 않은 방법입니다. 메소드 1과 2를 사용하는 것을 추천합니다. 하지만 지식을 쌓는 차원에서 어떻게 하는지 알려드리겠습니다:

컨텐츠의 마진 왼쪽과 오른쪽을 모두 자동으로 설정하세요.

<div class="content-ad"></div>

```js
margin-left: auto;
margin-right: auto;
```

최종 CSS는 다음과 같을 것입니다:

```js
.container{
    width: 400px;
    height: 400px;
    background: #E9E3D5;
    border-radius: 20px;

    /* 여기에서 메서드 시작 */
}

.content{
    width: 100px;
    height: 100px;
    background: #0A7273;
    border-radius: 10px;

    /* 여기에서 메서드 시작 */
    margin-left: auto;
    margin-right: auto;
}
```

축하합니다! 이제 div를 가운데 정렬하는 좋은 3가지 방법을 마스터했습니다. 이제 백엔드 개발자 친구들에게 여러분의 기술을 자랑할 수 있어요.
