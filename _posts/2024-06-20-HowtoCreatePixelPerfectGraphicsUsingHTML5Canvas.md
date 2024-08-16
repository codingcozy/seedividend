---
title: "HTML5 캔버스를 사용하여 픽셀 완벽한 그래픽 만들기 방법"
description: ""
coverImage: "/assets/img/2024-06-20-HowtoCreatePixelPerfectGraphicsUsingHTML5Canvas_0.png"
date: 2024-06-20 06:07
ogImage: 
  url: /assets/img/2024-06-20-HowtoCreatePixelPerfectGraphicsUsingHTML5Canvas_0.png
tag: Tech
originalTitle: "How to Create Pixel Perfect Graphics Using HTML5 Canvas"
link: "https://medium.com/@oscar.lindberg/how-to-create-pixel-perfect-graphics-using-html5-canvas-3750eb5f1dc9"
isUpdated: true
---




진짜 8비트 시각을 위한 캔버스 그래픽 마스터링 단계별 안내서입니다.

이 포스트에서는 픽셀 완벽한 웹 게임을 만들기 위한 기반을 구축할 것입니다. "픽셀 완벽"이란 모든 픽셀이 선명하고 흐릿하지 않다는 것을 의미합니다. 이 자습서를 완료하면 픽셀화된 별 배경 위에 두 개의 이동하는 직사각형을 애니메이션하는 단일 HTML 파일이 생깁니다.

다음 세 단계로 진행하겠습니다:

1. 캔버스가 올바르게 크기 조정되는 기본 HTML 구조 설정

<div class="content-ad"></div>

# 직사각형과 별을 그려보세요

# 이미지 흐림 방지, 모든 픽셀을 선명하게 설정

# 크기 조절 가능한 캔버스

한 가지 HTML5 캔버스를 가진 간단한 HTML 페이지를 만들 것입니다. 이 캔버스는 브라우저 창 크기가 변경될 때 동적으로 크기가 조정됩니다. 정수 스케일링 상수를 사용하여 스케일링이 균일한 픽셀 크기를 유지하는지 제어할 수 있습니다. 정수 스케일링을 true로 설정하면 모든 픽셀이 동일한 크기를 유지합니다. 단점은 정수 스케일링으로 인해 일부 브라우저 창 크기에 따라 캔버스 주변에 더 큰 테두리가 생길 수 있다는 점입니다.

<div class="content-ad"></div>

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>빈 크기 조절 캔버스</title>
    <style>
      html,
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin: 0;
        background-color: #887ecb;
      }
    
      .canvas-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }

      #gameCanvas {
        background-color: #50459b;
        max-width: 100%;
        max-height: 100%;
      }
    </style>
  </head>
  <body>
    <div class="canvas-container">
      <canvas id="gameCanvas" width="64" height="36"></canvas>
    </div>
    <script>
      const INTEGER_SCALING = true;

      const canvas = document.getElementById("gameCanvas");

      function resizeCanvas() {
        let scale = Math.min(
          window.innerWidth / canvas.width,
          window.innerHeight / canvas.height
        );
        if (INTEGER_SCALING) {
          scale = Math.floor(scale);
        }
        canvas.style.width = `${Math.round(scale * canvas.width)}px`;
        canvas.style.height = `${Math.round(scale * canvas.height)}px`;
      }

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
    </script>
  </body>
</html>
```

위 코드의 주요 포인트는 크기 조절 이벤트에 등록하고 이벤트가 발생할 때마다 페이지의 캔버스 크기를 변경하는 것입니다. 스케일은 내부 캔버스 크기가 화면에 가장 적은 수의 배에 맞도록 계산됩니다. 이는 다른 방향으로 테두리를 유발할 수 있지만 내부 캔버스 크기의 종횡비를 유지합니다.

창의 크기를 조정하면 캔버스 크기가 변경되는 것을 확인할 수 있습니다. 또한 INTEGER_SCALING 값을 false로 변경하여 캔버스가 항상 창을 가로 또는 세로로 채우는 방법을 확인해보세요.

# 캔버스에 그리기


<div class="content-ad"></div>

캔버스에 그리기 위해서는 먼저 캔버스의 컨텍스트를 가져와야 합니다. 투명한 픽셀을 남기지 않을 것이기 때문에 알파값을 false로 설정합니다.

```js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d", { alpha: false });
```

간단하게 유지하기 위해 이 게시물에서는 사각형만 그릴 것입니다.

```js
function drawRectangle(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}
```

<div class="content-ad"></div>

그럼 우리는 배경을 위해 200개의 별을 만듭니다. 별은 색에 따라 정렬되어 있으므로 덜 밝은 별이 더 밝은 별 위에 그려지지 않습니다.

```js
function createStar() {
  const color = Math.floor(Math.random() * 256);
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    color: color,
    fillStyle: `rgb(${color}, ${color}, ${color})`,
  }; 
}

const stars = Array.from({ length: 200 }, createStar).sort(
  (a, b) => a.color - b.color
);
```

우리는 requestAnimationFrame을 사용하여 게임 루프가 필요한 매 프레임마다 발생하도록 만듭니다. gameLoop이 호출될 속도는 "일반적으로 디스플레이 새로고침 속도와 일치"합니다. 많은 경우에 초당 60프레임인 경우가 많지만 다를 수도 있습니다. `now` 매개변수는 이전 프레임 렌더링의 밀리초를 나타냅니다. 애니메이션 중에 이 시간을 사용하는 것이 중요하며 일정한 프레임 속도를 가정하는 대신 해당 시간을 사용해야 합니다.

```js
function gameLoop(now) {
  draw(now);
  requestAnimationFrame(gameLoop);
}
gameLoop();
```

<div class="content-ad"></div>

이제 재미있는 부분이 시작됩니다 — 캔버스에 그림을 그리는 것! 이전 프레임의 그래픽을 지우기 위해 캔버스를 지우는 것으로 시작합니다. 그런 다음, 모든 별과 두 개의 사각형을 그리는데, 이는 일정한 사인 및 코사인 패턴에 따라 움직입니다.

```js
function draw(t) {
  drawRectangle(0, 0, canvas.width, canvas.height, "#000");

  stars.forEach((star) => {
    drawRectangle(star.x, star.y, 1, 1, star.fillStyle);
    star.x = (star.x - star.color / 5000 + canvas.width) % canvas.width;
  });
  drawRectangle(
    canvas.width / 4,
    canvas.height / 4 + (canvas.width / 10) * Math.sin(t / 500),
    canvas.width / 2,
    canvas.height / 2,
    "#008"
  );
  drawRectangle(
    canvas.width / 2 + (canvas.width / 4) * Math.cos(t / 1000) - 4,
    canvas.height / 2 + (canvas.height / 4) * Math.sin(t / 1000) - 4,
    8,
    8,
    "#00c"
  );
}
```

그리고 이렇게 보입니다.

이 코드펜에서 실행 중인 애니메이션을 확인해보세요:

<div class="content-ad"></div>

그게 많이 8-bit스럽지 않네요, 맞죠? 우리가 마주한 두 가지 문제는 스케일링할 때 픽셀 보간과 그릴 때 안티앨리어싱입니다.

# Unblur

## 픽셀 보간 끄기

브라우저는 캔버스를 확대할 때 픽셀을 보간하고 있습니다. 이는 합리적인 표준 동작이지만 픽셀 그래픽에 적합하지 않습니다. 대신 css에서 픽셀화된 스케일링을 사용하도록 브라우저에 지시합니다:

<div class="content-ad"></div>

```css
canvas {
  background-color: #50459b;
  max-width: 100%;
  max-height: 100%;
  image-rendering: pixelated;
}
```

## 안티앨리어싱 피하기

또 다른 흐림 현상을 일으키는 문제는 정수가 아닌 값을 그릴 때 발생합니다. 별이 픽셀 사이에 위치할 때 브라우저는 일관성있게 만들려고 노력합니다. 해결책은 간단합니다. 우리는 좌표를 모두 정수로 반올림하면 됩니다. 이 해결책을 drawRectangle 함수에 넣어서 어디서든 무언가를 그릴 때마다 생각할 필요가 없게 만듭니다:

```js
function drawRectangle(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(
    Math.round(x),
    Math.round(y),
    Math.round(width),
    Math.round(height)
  );
}
```

<div class="content-ad"></div>

다음은 정리된 버전에 대한 코드펜입니다:

여기 정리된 버전에 대한 전체 소스입니다:

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pixel perfect canvas</title>
    <style>
      html,
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin: 0;
        background-color: #887ecb;
      }

      .canvas-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }

      canvas {
        background-color: #50459b;
        max-width: 100%;
        max-height: 100%;
        image-rendering: pixelated;
      }
    </style>
  </head>
  <body>
    <div class="canvas-container">
      <canvas id="gameCanvas" width="64" height="36"></canvas>
    </div>
    <script>
      const INTEGER_SCALING = true;

      const canvas = document.getElementById("gameCanvas");
      const ctx = canvas.getContext("2d");

      function createStar() {
        const color = Math.floor(Math.random() * 256);
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          color: color,
          fillStyle: `rgb(${color}, ${color}, ${color})`,
        };
      }

      const stars = Array.from({ length: 200 }, createStar).sort(
        (a, b) => a.color - b.color
      );

      function resizeCanvas() {
        let scale = Math.min(
          window.innerWidth / canvas.width,
          window.innerHeight / canvas.height
        );
        if (INTEGER_SCALING) {
          scale = Math.floor(scale);
        }
        canvas.style.width = `${Math.round(scale * canvas.width)}px`;
        canvas.style.height = `${Math.round(scale * canvas.height)}px`;
      }

      function drawRectangle(x, y, width, height, color) {
        ctx.fillStyle = color;
        ctx.fillRect(
          Math.round(x),
          Math.round(y),
          Math.round(width),
          Math.round(height)
        );
      }

      function gameLoop(now) {
        draw(now);
        requestAnimationFrame(gameLoop);
      }

      function draw(t) {
        drawRectangle(0, 0, canvas.width, canvas.height, "#000");

        stars.forEach((star) => {
          drawRectangle(star.x, star.y, 1, 1, star.fillStyle);
          star.x = (star.x - star.color / 5000 + canvas.width) % canvas.width;
        });
        drawRectangle(
          canvas.width / 4,
          canvas.height / 4 + (canvas.width / 10) * Math.sin(t / 500),
          canvas.width / 2,
          canvas.height / 2,
          "#008"
        );
        drawRectangle(
          canvas.width / 2 + (canvas.width / 4) * Math.cos(t / 1000) - 4,
          canvas.height / 2 + (canvas.height / 4) * Math.sin(t / 1000) - 4,
          8,
          8,
          "#00c"
        );
      }

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      gameLoop();
    </script>
  </body>
</html>
```

<div class="content-ad"></div>

이제 기초가 마련되었습니다 - 브라우저에서 픽셀 완벽한 그래픽을 애니메이트할 수 있는 코드 조각이 있습니다! 다음에는 몇 가지 스프라이트를 애니메이션화할 것입니다!