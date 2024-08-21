---
title: "당신의 웹사이트를 향상시키는 10가지 CSS 트릭"
description: ""
coverImage: "/assets/img/2024-06-23-10CSStricksthatEnhancethelookandfeelofyourwebsite_0.png"
date: 2024-06-23 14:22
ogImage:
  url: /assets/img/2024-06-23-10CSStricksthatEnhancethelookandfeelofyourwebsite_0.png
tag: Tech
originalTitle: "10 CSS tricks that Enhance the look and feel of your website"
link: "https://medium.com/@chandantechie/10-css-tricks-that-enhance-the-look-and-feel-of-your-website-c7dc530ad056"
isUpdated: true
---

`<img src="/assets/img/2024-06-23-10CSStricksthatEnhancethelookandfeelofyourwebsite_0.png" />`

이 웹사이트를 더 멋지고 풍부하게 만들어줄 수 있는 CSS 트릭 10가지를 코드 예제와 함께 소개합니다:

# 1. 그라디언트 배경

색상 간의 부드러운 전환을 추가하기 위해 그라디언트를 사용하세요.

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
body {
    background: linear-gradient(45deg, #ff6b6b, #f06595);
}
```

# 2. Box Shadows

Add depth to your elements using box shadows

```js
.card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
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

# 3. 호버 효과

호버 효과로 상호작용을 향상시킵니다.

```js
.button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.button:hover {
    background-color: #0056b3;
}
```

# 4. 반응형 타이포그래피

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

화면 크기에 반응하는 텍스트를 만듭니다.

```js
h1 {
    font-size: calc(1.5rem + 1vw);
}
```

# 5. Flexbox 중앙 정렬

Flexbox를 사용하여 요소를 쉽게 가운데 정렬할 수 있습니다.

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

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

# 6. 사용자 정의 커서

사이트에 고유한 커서를 추가하세요.

```css
.custom-cursor {
  cursor: url("커서이미지경로.png"), auto;
}
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

# 7. CSS 그리드 레이아웃

CSS 그리드를 사용하여 복잡한 레이아웃을 만드세요.

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.grid-item {
  background-color: #f8f9fa;
  padding: 20px;
  border: 1px solid #dee2e6;
}
```

# 8. 텍스트 그림자

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

그림자로 텍스트에 깊이와 강조를 추가합니다.

```js
h2 {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
```

# 9. 키프레임 애니메이션

키프레임으로 애니메이션을 생성하세요.

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
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-30px);
    }
    60% {
        transform: translateY(-15px);
    }
}

.bouncing-element {
    animation: bounce 2s infinite;
}
```

# 10. 클립 패스 모양

클립 패스를 사용하여 재미있는 모양 만들기.

```js
.clip-shape {
    width: 200px;
    height: 200px;
    background-color: #ff6b6b;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}
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

이 CSS 트릭들은 당신의 웹사이트의 시각적 매력과 사용자 경험을 크게 향상시킬 수 있어요.

감사합니다

찬단
