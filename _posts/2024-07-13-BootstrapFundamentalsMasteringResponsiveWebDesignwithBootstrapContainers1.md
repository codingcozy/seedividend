---
title: "부트스트랩 기본  부트스트랩 컨테이너로 반응형 웹 디자인 마스터하기 1"
description: ""
coverImage: "/assets/img/2024-07-13-BootstrapFundamentalsMasteringResponsiveWebDesignwithBootstrapContainers1_0.png"
date: 2024-07-13 18:50
ogImage: 
  url: /assets/img/2024-07-13-BootstrapFundamentalsMasteringResponsiveWebDesignwithBootstrapContainers1_0.png
tag: Tech
originalTitle: "Bootstrap Fundamentals — Mastering Responsive Web Design with Bootstrap Containers #1"
link: "https://medium.com/towardsdev/bootstrap-fundamentals-mastering-responsive-web-design-with-bootstrap-containers-1-0dd1253a4a33"
isUpdated: true
---





![Bootstrap Fundamentals](/assets/img/2024-07-13-BootstrapFundamentalsMasteringResponsiveWebDesignwithBootstrapContainers1_0.png)

부트스트랩이 제공하는 기능을 살펴볼 거에요. HTML 구성 요소에 대한 미리 제작된 스타일로 잘 알려져 있지만, 유틸리티 클래스도 많이 제공해요.

이 시리즈에서 사용할 기본 구조를 정의하는 것으로 시작해봐요.

```js
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>부트스트랩 기초</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>
<!-- 여기에 코드를 삽입하세요 -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
</body>
</html>
```

<div class="content-ad"></div>

## 컨테이너란 무엇인가요?

현대적인 웹 디자인에서는 웹 사이트가 모든 화면 크기에서 잘 보이도록 하는 것이 중요합니다. 여기에서 부트스트랩의 컨테이너 클래스가 중요한 역할을 합니다. 컨테이너는 웹 페이지의 콘텐츠를 고정 너비나 반응형 너비로 감싸고 포함하는 데 사용되는 클래스입니다.

대부분의 현대 웹 사이트에서 브라우저를 끌어서 넓혀보면 - 예를 들어 5000 픽셀로 넓히면 - 대부분의 웹 사이트는 레이아웃이 어색해지지 않도록 컨테이너 내에 유지됩니다. 이것은 웹 사이트의 미학과 사용성을 다양한 기기에서 유지하는 데 중요한 기능입니다.

## 컨테이너의 종류

<div class="content-ad"></div>

우리는 7가지 유형의 컨테이너가 있어요. container-fluid는 항상 100%로 늘어나지만, 다른 것들은 창의 특정 너비에서 늘어나는 것을 멈추게 돼요. 아래 이미지를 살펴봅시다.

![container image](/assets/img/2024-07-13-BootstrapFundamentalsMasteringResponsiveWebDesignwithBootstrapContainers1_1.png)

## 코드

다른 컨테이너 클래스를 가진 div 요소들을 추가해봅시다. 창의 너비를 늘리거나 줄일 때, 지정된 브레이크포인트에서 100%로 늘어나는 것이 멈춘다는 것을 볼 수 있어요.

<div class="content-ad"></div>

## 컨테이너

```js
<div class="container">
    <h3>컨테이너</h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
        similique porro praesentium quo. Aperiam officiis eos atque iure quo
        nostrum voluptate laudantium distinctio! Hic pariatur in exercitationem
        eaque ducimus aperiam.
    </p>
</div>
```

## 컨테이너-소

```js
<div class="container-sm">
    <h3>작은 컨테이너</h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
        similique porro praesentium quo. Aperiam officiis eos atque iure quo
        nostrum voluptate laudantium distinctio! Hic pariatur in exercitationem
        eaque ducimus aperiam.
    </p>
</div>
```

<div class="content-ad"></div>

## container-md

```js
<div class="container-md">
    <h3>중간 컨테이너</h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
        similique porro praesentium quo. Aperiam officiis eos atque iure quo
        nostrum voluptate laudantium distinctio! Hic pariatur in exercitationem
        eaque ducimus aperiam.
    </p>
</div>
```

## container-lg

```js
<div class="container-lg">
    <h3>큰 컨테이너</h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
        similique porro praesentium quo. Aperiam officiis eos atque iure quo
        nostrum voluptate laudantium distinctio! Hic pariatur in exercitationem
        eaque ducimus aperiam.
    </p>
</div>
```

<div class="content-ad"></div>

## container-xl


<div class="container-xl">
    <h3>Container Extra Large</h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
        similique porro praesentium quo. Aperiam officiis eos atque iure quo
        nostrum voluptate laudantium distinctio! Hic pariatur in exercitationem
        eaque ducimus aperiam.
    </p>
</div>


## container-xxl


<div class="container-xxl">
    <h3>Container Extra Extra Large</h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
        similique porro praesentium quo. Aperiam officiis eos atque iure quo
        nostrum voluptate laudantium distinctio! Hic pariatur in exercitationem
        eaque ducimus aperiam.
    </p>
</div>


<div class="content-ad"></div>

## container-fluid

```js
<div class="container-fluid">
    <h3>Container Fluid</h3>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
        similique porro praesentium quo. Aperiam officiis eos atque iure quo
        nostrum voluptate laudantium distinctio! Hic pariatur in exercitationem
        eaque ducimus aperiam.
    </p>
</div>
```

## Example

<img src="/assets/img/2024-07-13-BootstrapFundamentalsMasteringResponsiveWebDesignwithBootstrapContainers1_2.png" />

<div class="content-ad"></div>

`![image](https://miro.medium.com/v2/resize:fit:400/0*dd3WcgJcMPN7E59D.gif)`