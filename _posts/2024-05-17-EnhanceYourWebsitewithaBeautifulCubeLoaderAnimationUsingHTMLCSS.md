---
title: "HTML, CSS로 멋진 큐브 로더 애니메이션 만들기"
description: ""
coverImage: "/assets/img/2024-05-17-EnhanceYourWebsitewithaBeautifulCubeLoaderAnimationUsingHTMLCSS_0.png"
date: 2024-05-17 21:33
ogImage:
  url: /assets/img/2024-05-17-EnhanceYourWebsitewithaBeautifulCubeLoaderAnimationUsingHTMLCSS_0.png
tag: Tech
originalTitle: "Enhance Your Website with a Beautiful Cube Loader Animation Using HTML , CSS"
link: "https://medium.com/@withaarzoo/enhance-your-website-with-a-beautiful-cube-loader-animation-using-html-css-cbe6c76bfb4a"
isUpdated: true
---

![Loading Animation](https://miro.medium.com/v2/resize:fit:1200/1*CSMMFDfA44hUID0Shg5rJg.gif)

지루한 로딩 막대를 응시하면서 더 빨리 움직이기를 희망한 적이 있나요? 우리 모두 그런 경험이 있습니다. 그런데 만약 당신의 웹사이트가 뒷 배경에서 콘텐츠를 로딩하는 동안에도 시각적으로 매력적인 애니메이션으로 사용자들을 매료시킬 수 있다면 어떨까요? 그것이 바로 애니메이션 큐브 로더입니다!

이 단계별 가이드는 HTML과 CSS를 사용하여 세련되고 동적인 애니메이션 큐브 로더를 만드는 방법을 안내해줍니다. 이 프로젝트는 제 #100DaysOfCode 챌린지의 일환이며, 정말 멋진 것을 구축하는 동안 프론트엔드 개발 스킬을 연습하기에 최적의 방법입니다.

준비가 되셨나요? 시작해봅시다!

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

# 단계 1: 스타터 코드 다운로드 (선택 사항)

프로젝트를 빠르게 시작하기 위해, 애니메이션된 큐브 로더를 위한 미리 작성된 HTML 및 CSS 코드를 다운로드할 수 있습니다. 이것은 구조를 확인하고 모든 부분이 어떻게 함께 작동하는지 알아보는 좋은 방법입니다.

여기서 소스 코드를 다운로드하세요: [소스 코드](링크)

# 단계 2: HTML 구조 설정

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

HTML 코드는 애니메이션의 기본 구성 요소를 제공합니다. 우리는 큐브의 컨테이너를 만들기 위해 div 요소들의 시리즈를 사용할 것입니다. 그리고 각 큐브 자체를 정의하기 위해 개별 div 요소들을 사용할 것입니다. 각 큐브 요소 안에는 큐브의 여섯 면을 나타내는 자식 div 요소들이 있을 것입니다.

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Metadata와 CSS 파일 링크 -->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Animated Cube Loader</title>
</head>

<body>
    <!-- 큐브 조립을 위한 컨테이너 -->

</body>

</html>
```

```js
    <div class="assembly">
        <!-- 첫 번째 3D 구성 요소 세트 (내부 조립) -->
        <div class="comp-3d comp-3d--i">
            <!-- 각 큐브는 'cube__face' 클래스를 가진 div로 표현된 여섯 면을 가지고 있습니다. -->
            <!-- 첫 번째 큐브 -->
            <div class="cube">
                <div class="cube__face"></div>
                <div class="cube__face"></div>
                <div class="cube__face"></div>
                <div class="cube__face"></div>
                <div class="cube__face"></div>
                <div class="cube__face"></div>
            </div>
            <!-- 추가 큐브들은 동일한 구조를 따릅니다. -->
            <!-- 큐브 2부터 큐브 18까지 (동일한 구조) -->
            <!-- 이하 생략 -->
        </div>

        <!-- 두 번째 3D 구성 요소 세트 (외부 조립) -->
        <div class="comp-3d comp-3d--o">
            <!-- 각 pos 요소는 하나의 큐브를 포함합니다. -->
            <!-- Position 1 -->
            <!-- 이하 생략 -->
        </div>
    </div>
```

# Step 3: Adding Styles with CSS

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

CSS에서 마법이 일어납니다! 여기에 몇 가지 주요 측면을 살펴보겠습니다:

- 일반 설정: 우리는 body 요소에 대한 스타일을 정의할 것입니다. 오버플로우 방지, 높이 설정, 3D 효과를 위한 perspective 생성 등이 포함됩니다.

```js
/* 오버플로우 방지, 마진 제거, 높이 설정 및 perspective 생성을 위한 일반 body 설정 */
body {
    overflow: hidden;
    margin: 0;
    height: 100vh;
    perspective: 32em;
    /* 3D 효과를 위한 perspective 거리 */
    background-image: linear-gradient(to right, #434343 0%, black 100%);
    /* 배경 그라데이션 */
}

/* 모든 div 요소에 대한 일반 설정: 절대 위치 지정 및 3D 변형 보존 */
div {
    position: absolute;
    transform-style: preserve-3d;
    /* 자식 요소가 3D 공간에서 변형되도록 보장 */
}
```

- 조립과 애니메이션: 주요 컨테이너에 스타일을 적용하고, inner 및 outer 큐브 그룹에 대한 애니메이션을 만들기 위해 keyframes를 사용할 것입니다.

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

```js
/* 주 어셈블리 컨테이너 중앙 정렬 및 초기 회전 */
.assembly {
    top: 50%;
    left: 50%;
    transform: rotateX(-45deg) rotateY(-45deg);
    /* 초기 3D 회전 */
}

/* 3D 구성 요소에 대한 공통 애니메이션 설정 */
.comp-3d {
    animation: r 2s ease-in-out infinite;
    /* 이징을 사용한 무한 애니메이션 */
}

/* 내부 어셈블리에 대한 특정 애니메이션 이름 */
.comp-3d--i {
    animation-name: ri;
    /* 'ri' 키프레임 사용 */
}

/* 외부 어셈블리에 대한 특정 애니메이션 이름 */
.comp-3d--o {
    animation-name: ro;
    /* 'ro' 키프레임 사용 */
}

/* 내부 어셈블리 회전을 위한 키프레임 */
@keyframes ri {

    0%,
    20% {
        transform: rotateY(-0.5turn);
        /* Y축 기준 -180도 회전 */
    }

    50% {
        transform: none;
        /* 50%에서 변형 없음 */
    }

    100%,
    80% {
        transform: rotateX(-0.5turn);
        /* X축 기준 -180도 회전 */
    }
}

/* 외부 어셈블리 회전을 위한 키프레임 */
@keyframes ro {

    0%,
    35% {
        transform: rotate(-0.5turn);
        /* -180도 회전 */
    }

    65%,
    100% {
        transform: none;
        /* 65% 및 100%에서 변형 없음 */
    }
}
```

- 큐브 위치 조정: 각 큐브는 scale3d 및 translate3d 속성을 사용하여 3D 공간에 배치됩니다.

```js
/* 서로 다른 위치에 큐브에 대한 변환 */
.pos:nth-child(1) {
    transform: scale3d(1, 1, 1) translate3d(4em, 4em, 4em);
}

:not(.pos)>.cube:nth-child(1) {
    transform: translate3d(-4em, -4em, 0em);
}

.pos:nth-child(2) {
    transform: scale3d(1, 1, -1) translate3d(4em, 4em, 4em);
}

:not(.pos)>.cube:nth-child(2) {
    transform: translate3d(-4em, 0em, -4em);
}

/* 다른 큐브(3-18)에 대한 변환 */
/* 이어서 작성... */
```

- 큐브 면: 큐브의 개별 면을 차원, 그림자, 배경색으로 스타일링합니다.

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

```js
/* 큐브 면에 대한 스타일 */
.cube__face {
    margin: -2em;
    width: 4em;
    height: 4em;
    box-shadow: 0 0 2em rgba(220, 220, 220, 0.5) inset;
    /* 깊이 효과를 위한 내부 그림자 */
    backface-visibility: hidden;
    /* 회전될 때 뒷면 숨김 */
    background: rgb(222, 238, 253);
    /* 연한 파란색 배경 */
}

/* 짝수 번째 면에 대한 약간의 밝기 조정 */
.cube__face:nth-child(2n) {
    filter: brightness(0.97);
}

/* 5번 이상의 인덱스를 가진 면에 대한 약간의 밝기 증가 */
.cube__face:nth-child(n + 5) {
    filter: brightness(1.03);
}

/* 각 면의 위치를 조정하기 위한 변환 */
.cube__face:nth-child(1) {
    transform: rotateY(0deg) translateZ(2em);
    /* 앞면 */
}

.cube__face:nth-child(2) {
    transform: rotateY(90deg) translateZ(2em);
    /* 오른쪽 면 */
}

.cube__face:nth-child(3) {
    transform: rotateY(180deg) translateZ(2em);
    /* 뒷면 */
}

.cube__face:nth-child(4) {
    transform: rotateY(270deg) translateZ(2em);
    /* 왼쪽 면 */
}

.cube__face:nth-child(5) {
    transform: rotateX(90deg) translateZ(2em);
    /* 위쪽 면 */
}

.cube__face:nth-child(6) {
    transform: rotateX(-90deg) translateZ(2em);
    /* 아래쪽 면 */
}
```

- 큐브 이동 애니메이션: 특정 큐브를 어셈블리 내에서 움직일 수 있게 애니메이션을 추가함으로써 동적인 터치를 더할 수 있습니다.

```js
/* 'pos' 요소 내에서 큐브 이동을 위한 키프레임 */
@keyframes m {

    0%,
    5%,
    95%,
    100% {
        transform: none;
        /* 시작, 5%, 95%, 끝에서 변환 없음 */
    }

    15% {
        transform: translate3d(0, 4em, 0);
        /* 4em만큼 위로 이동 */
    }

    25% {
        transform: translate3d(0, 4em, 4em);
        /* 4em만큼 위로 이동하고 앞쪽으로 이동 */
    }

    35%,
    65% {
        transform: translate3d(4em, 4em, 4em);
        /* 대각선으로 위쪽, 앞쪽, 오른쪽으로 이동 */
    }

    75% {
        transform: translate3d(4em, 0, 4em);
        /* 원래 높이에서 아래쪽으로, 앞쪽으로, 오른쪽으로 이동 */
    }

    85% {
        transform: translate3d(4em, 0, 0);
        /* 원래 위치로 이동 */
    }
}
```

# 단계 4: 실행하고 마법을 확인하세요!

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

HTML과 CSS 파일을 설정한 후 웹 브라우저에서 HTML 파일을 열어보세요. 움직이는 큐브 로더가 작동하는 것을 볼 수 있을 거에요! CSS 파일에서 스타일을 실험하여 웹사이트의 색상, 크기 및 애니메이션을 맞춤 설정해보세요.

![애니메이션 큐브로더](https://miro.medium.com/v2/resize:fit:1200/1*cligSzXsdw0TaX5dq5uToA.gif)

# 기본 이상으로:

이것은 출발점에 불과해요! 큐브로더를 더 발전시킬 수도 있어요:

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

- 입체 그림자 효과를 더해보세요.
- 다양한 색상과 그라데이션을 활용하여 더 생생한 느낌을 연출해보세요.
- 사용자에게 추가적인 피드백을 제공하기 위해 로딩 메시지나 진행률 바를 포함해보세요.

# 저와 연락해요

언제든 연락 주세요! 이 프로젝트나 프론트엔드 개발에 대한 질문이 있으시면 언제든 연락주세요.

저와 연락하기: 지금 연락하기

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

# 행복한 코딩!

이 블로그 포스트는 애니메이션 큐브 로더를 만드는 방법을 안내해줍니다. 이를 통해 #100DaysOfCode 챌린지의 일환으로 코딩 여정을 멋지고 유익하게 선보일 수 있는 방법을 제공합니다. 또한 독자들이 코드를 다운로드하거나 추가 학습을 위해 연락할 수 있도록 하는 콜 투 액션도 포함되어 있습니다.
