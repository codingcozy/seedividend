---
title: "HTML과 CSS로 Marquee 애니메이션을 만드는 방법"
description: ""
coverImage: "/assets/img/2024-06-20-HowtodoaMarqueeAnimationinHTMLandCSS_0.png"
date: 2024-06-20 05:53
ogImage:
  url: /assets/img/2024-06-20-HowtodoaMarqueeAnimationinHTMLandCSS_0.png
tag: Tech
originalTitle: "How to do a Marquee Animation in HTML and CSS"
link: "https://medium.com/javascript-in-plain-english/how-to-do-a-marquee-animation-in-html-and-css-200221fb6d0e"
isUpdated: true
---

![Marquee Animation](https://miro.medium.com/v2/resize:fit:1400/1*u9Rh5cAUft9Hiqdnursjog.gif)

안녕하세요, 코더 여러분! 오늘은 마퀴 애니메이션을 만들어 보려고 해요. 이런 소리를 하는 것도 웃겼네요. 제목을 클릭했다면, 무엇을 구독했는지 이미 알고 계셨겠죠? 저도 바보 같습니다. 이렇게 만들어 볼 것입니다:

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

웹사이트에 많은 매력을 불어넣지만 매우 간단한 애니메이션이에요. "단순함이 뛰어남의 열쇠"라고 말한 사람이 맞았네요. 그런데 그는 브루스 리일테니까요.

## 요구 사항

- HTML 및
- CSS에 대한 기본 지식

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

하대도 충분합니다 우리는 그들을 사용할 것이므로.

- 얘기하는 것도 이제 충분히 했어요, 이제 손을 더럽혀 봅시다.

## 1. 프로젝트 구성하기 📁

우리 프로젝트의 루트 디렉토리에 index.html 파일, assets 폴더(이미지를 넣을 폴더), 그리고 style.css 파일을 만들어 봅시다. 최종 결과물은 다음과 같이 보여야 합니다:

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

<img src="/assets/img/2024-06-20-HowtodoaMarqueeAnimationinHTMLandCSS_1.png" />

## 2. 페이지 구조

index.html 파일에 다음 코드를 붙여넣으세요:

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
      integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Playwrite+NL:wght@100..400&display=swap"
      rel="stylesheet"
    />
    <title>마퀴 애니메이션</title>
  </head>
  <body>
    <h1>마퀴 애니메이션</h1>
    <div class="marquee">
      <div class="marquee__slider">
        <img src="./assets/bmw.jpg" />
        <img src="./assets/apple.png" />
        <img src="./assets/mercedes.jpg" />
        <img src="./assets/tesla.jpg" />
      </div>
      <div class="marquee__slider">
        <img src="./assets/bmw.jpg" />
        <img src="./assets/apple.png" />
        <img src="./assets/mercedes.jpg" />
        <img src="./assets/tesla.jpg" />
      </div>
    </div>
  </body>
</html>
```

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

- 보시는 바와 같이, 우리는 두 개의 marquee\_\_slider 클래스가 포함된 marque 클래스를 가지고 있습니다.
- 이 marquee\_\_slider 클래스들이 같은 이미지를 포함하고 있는 것을 알 수 있습니다.
- 이는 연속적인 애니메이션처럼 보이도록 하기 위한 것입니다. 그렇지 않으면 애니메이션이 끝나고 재시작되기 전에 공백이 생기게 됩니다. 이렇게 보일 것입니다:

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*2i5NoSzmWYqFglWRxZ8y0g.gif)

3. 스타일링 🎨

style.css 파일에 다음 코드를 붙여넣으세요:

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
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  align-items: center;
  background-color: #f7f7f7;
  font-family: "Playwrite NL", cursive;
}

.marquee {
  border: 2px solid black;
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  width: 40%;
}
.marquee__slider {
  display: flex;
  flex-direction: row;
  object-fit: cover;
  padding: 5px;
  animation: marquee linear 5s infinite;
}

img {
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.marquee:hover .marquee__slider {
  animation-play-state: paused;
}

@keyframes marquee {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
}
```

- 우리의 스타일링에서 핵심 부분은 우리가 만든 key frame입니다. 여기서는 marquee\_\_slider를 오른쪽에서 왼쪽으로 이동시키고, 애니메이션이 끝나자마자 애니메이션이 다시 시작하도록 초기 위치로 이동됩니다.
- marquee\_\_slider 클래스의 animation 속성에 주목하세요. animation-name(키프레임 참조), animation-duration, animation-timing-function 및 animation-iteration-count와 같은 다른 속성을 추가합니다.
- hover 상태에서 애니메이션을 일시 중지할 수도 있습니다. 아래와 같은 코드로 가능합니다:

```js
.marquee:hover .marquee__slider {
  animation-play-state: paused;
}
```

## 핫픽 ☀️:

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

- 이 애니메이션이 올바로 작동하려면 항상 marquee_slider 클래스의 너비가 marquee 클래스의 너비보다 커야 합니다. 애니메이션이 끝나면 슬라이더가 다시 0%로 이동되는데, 슬라이더의 크기가 너무 작으면 사용자가 위치로 되돌아가는 것을 알아차리고 애니메이션이 덜 매력적으로 보일 수 있습니다.

이렇게 간단합니다. 부드러운 마퀴를 구현하는 데 성공했습니다. 즐겼다면 박수를 남겨주시고 계속 진행하세요!

# 간단한 영어로 🚀

In Plain English 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

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

- 작가에게 박수를 보내고 팔로우도 하세요! 👏️️
- 저희를 팔로우해주세요: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼도 방문해주세요: CoFeed | Differ
- 더 많은 컨텐츠: PlainEnglish.io
