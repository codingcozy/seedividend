---
title: "TailwindCSS를 사용해 유니크한 모양 만드는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-HowtomakeUniqueshapesusingTailwindCSS_0.png"
date: 2024-06-22 15:20
ogImage:
  url: /assets/img/2024-06-22-HowtomakeUniqueshapesusingTailwindCSS_0.png
tag: Tech
originalTitle: "How to make Unique shapes using TailwindCSS"
link: "https://medium.com/canopas/how-to-make-unique-shapes-using-tailwindcss-18a85523bc15"
isUpdated: true
---

![Unique shapes using Tailwind CSS](/assets/img/2024-06-22-HowtomakeUniqueshapesusingTailwindCSS_0.png)

# 배경

개발자로서, 우리는 자주 요소들을 스타일링하는 데 상당한 시간을 소비합니다. 우리는 많은 CSS를 사용하지 않으면 간단한 웹사이트나 복잡한 애플리케이션을 훌륭하게 만들 수 없습니다.

이 모든 것이 항상 쉽지는 않고 일부 작업은 꽤 까다로울 수 있습니다. 그러나 올바른 기술을 보유하고 있다면 이러한 문제를 상대적으로 빨리 해결할 수 있습니다. 그래서 말이야 연습이 완벽을 만든다고 합니다.

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

CSS는 단순히 요소를 스타일링하는 데에 그치지 않습니다. CSS 모양을 사용하면 웹 디자이너가 삼각형, 원, 다각형과 같은 사용자 정의 경로를 만들 수 있습니다. ⚪️, 🔷, 🔺, ⭐️, ◾️.

따라서 투명 배경의 부유 이미지를 삽입하여 주위에 직사각형 상자가 만들어지는 실망을 피할 필요가 없습니다.

이 기사에서는 TailwindCSS를 사용하여 다양한 모양과 일부 기능적 모양 및 값들을 디자인할 것입니다.

# 목차

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

- 소개
- 코드로 모양 예시
  1. 무한대
  2. 인피니티
  3. 계란
  4. 하트
  5. 다이아몬드
  6. 타원
  7. 우측 삼각형
  8. 상단 삼각형
- 결론

# 후원

일상적인 습관이 미래를 결정짓습니다. 올바르게 시작해서 미래를 바꿔보세요!

# 소개

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

테일윈드 CSS를 사용하면 미리 정의된 클래스를 활용하여 다양한 모양을 만들 수 있어요.

라운드된 모양을 위해 .rounded-_ 클래스와 너비 및 높이를 위해 .w-_ 및 .h-\* 클래스를 활용하여 원, 사각형, 삼각형 등 다양한 모양을 만들 수 있어요.

또한, :before 및 :after 가상 요소를 활용하여 content 속성을 빈 문자열로 설정하고 border 속성을 통해 원하는 모양을 만들 수 있어요.

자신의 기술을 향상시키고 꾸준히 연습한다면 이처럼 간단한 작업도 얼마든지 할 수 있을 거예요.

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

시작해볼까요? 도형 스타일링부터 시작해봅시다! 👉

# 무한대

가상 요소를 사용하여 도형의 양쪽을 모두 만들어 필요한 출력물을 얻을 수 있습니다.
이 솔루션은 모든 브라우저에서 잘 작동할 것입니다.

## 단계:

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

- w-*와 h-*를 사용하여 상대적 div를 생성하세요.
- box content를 사용하여 요소의 상자 크기를 content-box로 설정하면 브라우저가 요소의 지정된 너비나 높이에 테두리와 패딩을 추가하도록 지시됩니다.
- :before 및 :after 의 가상 속성을 사용하여 absolute, top, left, rounded, rotate 속성을 포함해 동일한 값을 갖도록 설정하세요.
- 여기서 유일한 차이는 :before의 rounded-l-[50px]와 :after의 rounded-l-0입니다. 여기가 바로 우리의 무한성입니다 😎.

<img src="/assets/img/2024-06-22-HowtomakeUniqueshapesusingTailwindCSS_1.png" />

```js
<div class="bg-yellow-400 p-20">
  <div
    class="relative w-[212px] h-[100px] box-content 

before:content-[''] before:absolute before:top-0 before:left-0
before:h-[60px] before:w-[60px] before:border-[20px] 
before:border-black before:border-solid before:rounded-t-[50px]
before:rounded-tr-[50px] before:rounded-b-0 before:rounded-l-[50px] 
before:-rotate-45 before:box-content 

after:content-[''] after:absolute after-top-0 after:right-0 
after:left-auto after:h-[60px] after:w-[60px] after:border-[20px] 
after:border-black after:border-solid after:rounded-t-[50px] 
after:rounded-r-[50px] after:rounded-b-0 after:rounded-l-0 
after:rotate-45 after:box-content"
  ></div>
</div>
```

# 음양

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

<img src="/assets/img/2024-06-22-HowtomakeUniqueshapesusingTailwindCSS_2.png" />

가상 클래스 및 다양한 테두리 속성을 사용하는 방법을 살펴보겠습니다.

## 단계:

## 1. 도형 생성

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

우리의 인연 체형의 두 부분을 구별하기 위해 원 형태를 만들고 검은색과 흰색을 사용해야 합니다.

1. 요소 내부에 더 많은 모양을 추가하려면 position: relative를 사용할 것입니다.

2. 까다로운 부분은 너비를 50px로 지정했으며 테두리 폭은 2px 50px 2px 2px로 설정한 것입니다.

3. 이제 우리는 정사각형을 가지고 있으므로 테두리 반경을 50%로 설정하여 이를 원으로 바꿀 것입니다.

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

배경 속성 때문에 왼쪽은 흰색이고, 테두리 색상이 검정으로 설정되어 오른쪽은 검은색입니다.

```js
<div
  class="w-[96px] box-content h-[48px] bg-[#eee] border-solid 
border-[#000] border-x-2 border-t-2 border-b-[50px] 
rounded-full relative"
></div>
```

## 2. 내부 원

두 원 모두 같은 아이디어로 이루어져 있습니다. 이를 CSS 가상 요소인 :before와 :after를 사용하여 수행할 것입니다. 가상 요소를 사용하면 DOM이 아닌 요소를 생성하고 요소 내용의 특정 부분을 스타일링할 수 있습니다.

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

- 주요 속성은 content-none, box-content, absolute, border, rounded, left, top, height 및 width입니다.

2. 다음 단계는 아래 원을 만드는 과정을 반복하는 것입니다. 유일한 차이점은 :after 가상 요소를 사용하여 색상을 반전시켜 흰 테두리가 있는 검은색 원을 만든다는 점입니다.

3. 그리고 나서 before:left-0을 설정하고, after:left-[50%]을 설정하세요.

그리고... 완료되었습니다. 여기 우리의 YinYang 💁

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
<div before:content-[''] before:absolute before:top-[50%] before:left-0
before:bg-[#000] before:border-[18px] before:border-[#eee]
before:border-solid before:rounded-full before:h-[12px] before:w-[12px]
 before:box-content></div>
```

## 전체 코드

```js
<div class="bg-yellow-400  p-20">
  <div
    class="w-[96px] box-content h-[48px] bg-[#eee] border-solid 
border-[#000] border-x-2 border-t-2 border-b-[50px] rounded-full relative 

before:content-[''] before:absolute before:top-[50%] before:left-0
before:bg-[#000] before:border-[18px] before:border-[#eee] 
before:border-solid before:rounded-full before:h-[12px] before:w-[12px] 
before:box-content 

after:content-[''] after:absolute after:top-[50%] after:left-[50%] 
after:bg-[#eee] after:border-[18px] after:border-[#000] after:border-solid 
after:rounded-full after:h-[12px] after:w-[12px] after:box-content"
  ></div>
</div>
```

# Egg

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

<table> 태그를 Markdown 형식으로 변경해주세요.

You’ll need to manipulate the height , width and sprinkle ⭐️ some colors in it then add rounded[50%/60%_60%_40%_40%] .

Using the value to transform the egg using some shadow, to make it look cool. Easy right?✌️

![image](/assets/img/2024-06-22-HowtomakeUniqueshapesusingTailwindCSS_3.png)

```js
<div class="bg-yellow-400  p-20">
  <div
    class="block w-[192px] h-[280px] bg-black 
 rounded-[50%/60%_60%_40%_40%]drop-shadow-[0px_15px_3px_rgba(0,0,0,0.25)]"
  ></div>
</div>
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

# 하트

하트 모양은 조금 까다로운데, :before와 :after 가상 요소를 사용하여 만들 수 있어요. 다양한 각도에서 회전하는 다른 변형 값을 사용해서 완벽한 하트 모양이 만들어질 때까지 시도해 보세요.

차이는 오직 before에서 left-[50px], before에서 origin-[0_100%]
after에서는 left-0, after에서 origin-[100%_100%] 입니다.

그게 전부에요. 아주 쉽죠~ 😃

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

마침내, 변환의 출발점을 지정하는 transform-origin을 사용할 수 있습니다.

![이미지](/assets/img/2024-06-22-HowtomakeUniqueshapesusingTailwindCSS_4.png)

```js
<div class="bg-yellow-400  p-20">
  <div
    class="relative w-[100px] h-[90px]
before:content-[''] before:absolute before:top-0 before:left-[50px]
before:h-[80px] before:w-[50px] before:rounded-t-[50px] 
before:rounded-r-[50px]before:rounded-b-0 before:rounded-l-0 
before:bg-black before:-rotate-45 before:origin-[0_100%]

after:content-[''] after:absolute after:top-0 after:left-0 after:h-[80px]
after:w-[50px] after:rounded-t-[50px] after:rounded-r-[50px] 
after:rounded-b-0 after:rounded-l-0 after:bg-black after:rotate-45
after:origin-[100%_100%]
"
  ></div>
</div>
```

# 다이아몬드

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

위치를 이용하여 위로 향한 두 삼각형과 아래로 향한 두 삼각형을 조합하여 마름모 모양을 형성해보겠습니다. 네, 이 삼각형들은 테두리 속성을 사용하여 만들 것입니다.

- border-b-[1.25em] 및 border-t-[50px] 설정
- 가상 속성에 after:border-b-[3em] after:border-t-[4.4em] 를 적용합니다.

이미지가 추가되었습니다:
![Diamond Shape](/assets/img/2024-06-22-HowtomakeUniqueshapesusingTailwindCSS_5.png)

```js
<div class="bg-yellow-400 p-20">
  <div
    class="relative top-[-3em] w-0 h-0 border-t-[50px] 
    border-t-transparent border-solid border-x-transparent border-x-[3em]  
    border-b-[1.25em] border-black
    after:content-none after:absolute after:left-[-3em] after:top-[1.25em]
    after:h-0 after:w-0 after:border-b-[3em] after:border-solid 
    after:border-x-transparent after:border-b-transparent after:border-x-[3em] 
    after:border-t-[4.4em] after:border-t-black
  "
  ></div>
</div>
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

# 타원

간단히 말하자면, 정사각형에 모서리 반경을 50%로 설정하면 원이 생성됩니다. 타원을 만들려면 이 과정을 직사각형에 적용하면 됩니다.

![이미지](/assets/img/2024-06-22-HowtomakeUniqueshapesusingTailwindCSS_6.png)

```js
<div class="p-12 h-[50%] mx-auto my-auto bg-yellow-400">
  <div class="h-[50px] w-[100px] bg-[#000] rounded-[50%]"></div>
</div>
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

# 삼각형-우측

해야 할 일은 `div`를 만들고 border-left, border-right, border-bottom, 높이 및 너비를 주는 것뿐입니다.

```js
<div class="h-0 w-0 border-t-[25px] border-l-[55px] border-b-[25px]
border-solid border-t-transparent border-b-transparent border-l-[#555]">
```

<img src="/assets/img/2024-06-22-HowtomakeUniqueshapesusingTailwindCSS_7.png" />

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

# 삼각형 모양 만들기

:before 또는 :after 가상 요소를 사용하여 border, width, height 및 border-color 속성을 설정하여 삼각형 모양을 만들 수 있습니다.

![Triangle-up](/assets/img/2024-06-22-HowtomakeUniqueshapesusingTailwindCSS_8.png)

```html
<div class="bg-yellow-400 mx-auto h-full p-20">
  <div
    class="mx-auto h-0 w-0 border-r-[25px] border-b-[55px] 
border-l-[25px] border-solid border-r-transparent
border-l-transparent border-b-[#000]"
  ></div>
</div>
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

위 문서에서 다룬 내용입니다.

함께 배우고 함께 성장하기 위한 공유된 아이디어와 생각.

# 결론

이제 몇 줄의 코드로 생성할 수 있는 다양한 순수 CSS 이미지에 익숙해져 있을 것입니다. 코드 조작이 어려운 작업이 아닌 만들어 질 수 있게 되었다면, 초고속 웹사이트를 구축할 수 있습니다.

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

가장 좋은 부분은 필요에 따라 다양한 모양과 색상을 조작하여 브랜드의 음성에 공감할 수 있다는 것입니다.

그 결과, 계속 실험하고 CSS만 사용하여 멋진 모양을 그리는 새로운 방법을 탐험해보세요.

# 읽어주셔서 감사합니다!

만약 읽은 내용이 마음에 드신다면, 👏👏👏을 아래에 남겨주시기를 빌며 - 작가로서 그것은 세상을 의미합니다!

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

피드백과 제안은 언제나 환영합니다. 아래 댓글란에 남겨주세요.

흥미로운 기사 업데이트를 받으려면 Canopas를 팔로우해주세요!
