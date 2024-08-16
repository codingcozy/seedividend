---
title: "캔버스의 마법을 해제해 보세요"
description: ""
coverImage: "/assets/img/2024-05-14-UnlockingtheMagicofCanvas_0.png"
date: 2024-05-14 15:01
ogImage: 
  url: /assets/img/2024-05-14-UnlockingtheMagicofCanvas_0.png
tag: Tech
originalTitle: "Unlocking the Magic of Canvas"
link: "https://medium.com/gitconnected/unlocking-the-magic-of-canvas-4a8ec6f63c5"
isUpdated: true
---




## 예술이 코드와 만나는 곳

# 캔버스란?

캔버스는 HTML5 스위트 내에서 놀라운 기능으로, 웹 브라우저 안에서 예술적 및 계산적 가능성을 펼칠 수 있도록 설계되었습니다. 그래픽 콘텐츠와 애니메이션에 대한 강력한 플레이그라운드로서, 개발자들이 제3자 플러그인이나 라이브러리가 필요 없이 자신의 창의성과 기술을 펼칠 수 있도록 초대합니다.

![캔버스 이미지](/assets/img/2024-05-14-UnlockingtheMagicofCanvas_0.png)



# 캔버스의 탁월한 기능들

- 유연성: 캔버스는 예술가를 위한 빈 캔버스와 같습니다; 다양한 그래픽 및 애니메이션을 만들기 위한 절대적인 유연성을 제공합니다.
- 클라이언트 측 렌더링: 캔버스의 놀라운 점 중 하나는 모든 렌더링 작업이 클라이언트 측에서 수행되어 서버 부하를 줄이고 더 빠르고 효율적인 실행을 보장한다는 것입니다.
- 고성능: 하드웨어 가속을 통해 캔버스는 유동적인 애니메이션 및 복잡한 그래픽 작업에 대한 빠른 옵션으로 빛납니다.
- 다재다능한 렌더링: 2D 또는 WebGL이든, 캔버스는 프로젝트의 필요에 맞는 다양한 렌더링 옵션을 제공합니다.
- JavaScript와의 깊은 통합: 포괄적인 JavaScript API로, 캔버스는 복잡한 작업 및 조작을 손쉽게 수행할 수 있게 합니다.

# 다양한 응용 분야

- 데이터 시각화: 인터랙티브 그래프, 상세한 지도, 실시간 분석 대시보드 등을 상상해보세요.
- 게임 개발: 캔버스 덕분에 웹 기반 게임이 살아나고 있습니다.
- 이미지 처리: 사진 편집부터 필터 적용까지, 가능성은 무한합니다.
- 인터랙티브 애니메이션: 시각적으로 매력적인 UI 및 애니메이션 스토리텔링을 구축하는 데 중요한 역할을 합니다.
- 실시간 렌더링: 음악 파형, 실시간 데이터 시각화 - 무엇이든, 캔버스가 처리할 수 있습니다.



# 훌륭한 예시

여기에 당신을 위한 CodePen 샌드박스가 있어요. 페이지를 클릭해서 즐겁게 놀아보세요!

# 코드 설명

## HTML 구조



우리는 HTML에서 `canvas` 태그를 정의하고 ID를 할당하여, 그래픽 가능성의 세계로의 게이트웨이 역할을 하도록 시작합니다.

```html
<div class="page" >
  <canvas id="canvas" class="canvas"></canvas>
</div>
```

## 스타일링하기

CSS에서는 Canvas가 정말 빛날 수 있는 세련된 환경을 설정합니다.



```js
.page {
  /* 페이지 콘텐츠를 가운데 정렬 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
.canvas {
  /* Canvas를 전체 화면으로 설정하고 가장 하단 레이어에 위치시킴 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: #000;
}
```

## JavaScript 생태계

여기서 우아한 두 가지 클래스인 StarrySky와 Particle을 소개합니다.

```js
class StarrySky {
    canvas;
    ctx;
    particles;
    count;
    actions;
    action;

    constructor() {
        this.canvas = document.getElementById('canvas');
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        this.canvas.style.zIndex = '-1';
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.count = 300;

        this.actions = ['right', 'left', 'up', 'down', 'around'];
        this.action = 0;
    }

    init() {
        this.animate();
        this.event();
    }

    event() {
        document.body.addEventListener('click', () => {
            this.action += Math.floor(Math.random() * this.actions.length) || 1;
            this.action = this.action % this.actions.length;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.particles.length < this.count) {
            this.particles.push(
                new Particle(this.canvas.width, this.canvas.height, this.ctx)
            );
        }
        for (let i in this.particles) {
            const p = this.particles[i];
            p.update(this.actions[this.action]);
            p.draw();
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.draw();
    }

}

class Particle {
    x;
    y;
    vx;
    w;
    h;
    ctx;

    constructor(width, height, ctx) {
        this.w = width;
        this.h = height;
        this.ctx = ctx;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = Math.random();
    }

    update(direction = 'right') {
        switch (direction) {
            case 'right':
                this.x += this.vx * 3;
                if (this.x > this.w) this.x = 0;
                break;
            case 'left':
                this.x -= this.vx * 3;
                if (this.x < 0) this.x = this.w;
                break;
            case 'up':
                this.y -= this.vx * 3;
                if (this.y < 0) this.y = this.h;
                break;
            case 'down':
                this.y += this.vx * 3;
                if (this.y > this.h) this.y = 0;
                break;
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 1 + this.vx, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.vx})`;
        this.ctx.fill();
    }
}
```



- StarrySky: 캔버스와 입자 객체를 초기화하고 관리하는 역할을 맡습니다.
- Particle: 개별 입자의 렌더링 및 업데이트에 초점을 맞춥니다.

```js
// 초기화
const starrySky = new StarrySky();
window.onload = () => {
  starrySky.init();
};
window.onresize = () => {
  starrySky.canvas.width = innerWidth;
  starrySky.canvas.height = innerHeight;
};
```

페이지가 로드될 때 우리는 StarrySky 클래스의 경이로운 힘을 소환합니다. 또한, 창 크기가 조정될 때 캔버스의 크기를 동적으로 조정하여 항상 매혹적인 경험을 제공합니다.

## 코드 자세히 설명



- 캔버스와 컨텍스트: this.canvas = document.getElementById(`canvas`); 및 this.ctx = this.canvas.getContext(`2d`); 라인을 사용하여 캔버스의 우주와 2D 그리기 공간에 접근합니다.
- 입자 이동: this.actions = [`right`, `left`, `up`, `down`, `around`]; 라인에서는 클릭으로 입자가 날아갈 방향을 조절할 수 있는 능력을 제공합니다.
- 애니메이션 루프: requestAnimationFrame(() =` this.animate()); 라인은 매혹적이고 끝없는 애니메이션 루프를 제공합니다.
- 이벤트 리스너: document.body.addEventListener(`click`, () =` ' ... ');를 통해 각 클릭이 입자 행동을 변화시켜 애니메이션을 더 인터랙티브하고 동적으로 만듭니다.
- 입자 업데이트 및 렌더링: this.particles.push(new Particle(...));을 통해 새로운 우주 입자를 생성하고 p.update() 및 p.draw()를 통해 이동과 외관을 업데이트합니다.

캔버스는 웹 개발 세계에서 놀라운 기술로 자리 잡고 있습니다. 데이터 시각화부터 대규모 웹 기반 게임 제작까지, 응용 분야는 여러분의 상상력만큼 무한합니다. 이 가이드는 캔버스에 대한 이해를 풍성하게 하고 멋진 프로젝트를 시작할 자극을 드리기 위해 노력합니다. 그러니 할 수 있어요, 캔버스가 여러분의 타작게요!

만약 이 글을 좋아한다면, 박수를 보내주세요. 여러분의 응원이 제 창의적 엔진을 충전합니다. 건배하며 백만 번 감사합니다!

<img src="/assets/img/2024-05-14-UnlockingtheMagicofCanvas_1.png" />