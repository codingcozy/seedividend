---
title: "자바스크립트에서 이미지 lazy loading 하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: ""
link: ""
isUpdated: true
---

# JS 이미지 lazy loading 하는 방법 기초부터 심화까지

이미지 lazy loading은 웹사이트의 로딩 속도를 크게 향상시킬 수 있는 간단한 방법입니다. Lazy loading의 기본 구현은 단 한 줄의 코드를 추가하는 것만으로 이루어집니다. 그러나 lazy loading 경험을 향상시킬 수 있는 더 심화된 기술들도 있습니다. 이러한 기술들을 사용하면 흐릿한 플레이스홀더를 표시하고 플레이스홀더 이미지에서 전체 이미지로의 부드러운 전환을 달성할 수 있습니다. 이 글에서는 lazy loading에 대해 알아야 할 모든 것과 고급 lazy loading 효과를 생성하는 방법에 대해 설명하겠습니다.

<img src="/assets/img/Lazy-Loading-Images-Basics-to-Advanced_0.png" />

<img src="/assets/img/Lazy-Loading-Images-Basics-to-Advanced_1.png" />

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

# 그런데 Lazy Loading이 뭔가요?

Lazy loading은 이미지와 같은 특정 자산의 로딩을 실제로 필요한 시점까지 지연시키는 기술입니다. 특히 이미지에 대해 말하자면, lazy loading은 사용자가 화면에서 이미지가 실제로 보이게 되는 지점까지 스크롤할 때까지 이미지를 다운로드하지 않도록 합니다. 이 접근 방식은 사이트 성능 측면에서 중요한 이점을 제공합니다. 왜냐하면 사용자가 실제로 볼 이미지만 다운로드하기 때문입니다.

Lazy loading은 많은 이미지를 포함하는 웹사이트에 특히 유용합니다. 왜냐하면 사용자가 즉시 보이지 않는 이미지의 불필요한 다운로드를 피함으로써 대역폭을 절약할 수 있기 때문입니다. 빠른 인터넷 연결을 가지고 있거나 일반적으로 작고 최적화된 이미지를 가진 사이트를 브라우징하는 경우에는 lazy loading의 이점을 완전히 이해하기 어려울 수 있습니다. 그러나 많은 사용자들에게는 lazy loading이 게임 체인저가 될 수 있습니다. 특히 인터넷 연결이 느린 사용자들에게 말이죠. 이미지는 사용자가 다운로드해야 하는 가장 큰 자산이기 때문에 빠른 연결이 있더라도 lazy loading 이미지는 웹사이트의 전체 로딩 시간을 줄이는 데 상당한 차이를 만들어 낼 수 있습니다.

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

# 간단한 Lazy Loading

이미 언급했듯이 이미지에 대한 lazy loading을 구현하는 것은 매우 간단합니다. 이미지 태그에 단일 속성을 추가하는 것만 필요합니다. 해당 이미지의 "loading" 속성을 "lazy"로 설정하여 lazy loading을 활성화합니다. 그러면 브라우저가 화면의 보이는 부분과의 근접성을 기준으로 이미지를 다운로드할 최적의 시기를 결정합니다.

```js
<img src="image.jpg" loading="lazy" />
```

단점 - 이 기본적인 lazy loading의 가장 큰 단점은 이미지가 완전히 다운로드될 때까지 사용자가 이미지가 있어야 할 자리에 빈 공간을 보게 된다는 것입니다.

앞서 설명한 기본적인 lazy loading 기술은 이미지가 완전히 다운로드될 때까지 사용자가 이미지가 있어야 할 자리에 빈 공간을 보게 되므로 사용자 경험이 좋지 않을 수 있습니다. 사용자 경험을 향상시키기 위해 이어지는 부분에서는 lazy loading을 활용하여 흐릿한 플레이스홀더 이미지를 표시하고 전체 이미지가 다운로드될 때까지 사용자에게 이미지의 시각적 표현을 제공하는 방법에 대해 설명하겠습니다. 이렇게 하면 사용자에게 더 매력적이고 무결점인 경험을 제공할 수 있습니다.

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

# 고급 Lazy Loading

# 흐릿한 플레이스홀더 이미지 사용하기

흐릿한 플레이스홀더 이미지를 생성하기 위해서는 원본 이미지의 저해상도 버전을 만들면 됩니다. 이를 달성하는 여러 가지 방법이 있습니다. 예를 들어, BlurHash와 같은 서비스를 사용하거나 Figma와 같은 디자인 도구를 사용하여 이미지의 크기를 수동으로 조정하거나 ffmpeg와 같은 자동화 도구를 사용할 수 있습니다. 이 글에서는 유연성과 쉬운 자동화를 제공하는 ffmpeg를 사용하겠습니다. 플레이스홀더 이미지를 생성하기 위해 다음 명령을 명령줄에서 실행하면 됩니다. 이미지가 위치한 디렉토리에 있는지 확인하세요.

```js
ffmpeg -i imageName.jpg -vf scale=20:-1 imageName-small.jpg
```

이 명령에서 "imageName.jpg"는 원본 이미지 파일의 이름을 나타내며 "imageName-small.jpg"는 생성된 플레이스홀더 이미지 파일의 이름을 나타냅니다. "scale=20:-1" 인

수는 플레이스홀더 이미지의 너비가 20픽셀이 되도록하면서 원본 이미지의 가로세로비를 유지하도록 지정합니다. 너비를 원하는대로 조정할 수 있지만 일반적으로 대부분의 이미지에 대해 20픽셀의 너비가 잘 작동하고 느린 인터넷 연결에서도 거의 즉시 로딩되도록 보장합니다. 이 방법으로 생성된 플레이스홀더 이미지의 크기는 일반적으로 1kB 미만입니다.

<img src="/assets/img/Lazy-Loading-Images-Basics-to-Advanced_2.png" />

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

작은 플레이스홀더 이미지를 생성한 후, 다음 단계는 `<div>` 요소를 생성하고 그 배경 이미지를 이전에 생성한 매우 작은 이미지로 설정하는 것입니다. 이 `<div>`는 전체 이미지가 다운로드될 때까지 표시되는 플레이스홀더 이미지로 작동합니다. 다음은 예제 코드 스니펫입니다:

```js
<div class="blurred-img"></div>
```

CSS에서 .blurred-img 클래스의 스타일링을 정의하여 배경 이미지를 설정하고 모양을 조정하고 올바르게 표시합니다:

```js
.blurred-img {
  background-image: url(imageName-small.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}
```

ㄹ이 코드에서 imageName-small.jpg는 ffmpeg 또는 다른 방법을 사용하여 생성한 작은 플레이스홀더 이미지의 파일 이름을 나타냅니다. background-repeat: no-repeat; 속성은 이미지가 반복되지 않도록하고 background-size: cover; 속성은 이미지가 전체 `<div>` 요소를 커버하도록합니다.

```js
<div class="blurred-img">
  <img src="imageName.jpg" loading="lazy" />
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

이 CSS에서는 이미지가 로드될 때까지 `<img>`의 투명도를 0으로 설정하여 숨깁니다:

```js
.blurred-img img {
  opacity: 0;
}
```

브라우저가 이미지를 확대시키므로 흐릿한 효과가 자동으로 발생합니다. 더 많은 흐림이 필요한 경우 CSS 필터 속성을 사용하여 .blurred-img 클래스에 흐림 필터를 적용할 수 있습니다. 그러나 이 경우에는 추가적인 흐림이 필요하지 않을 수도 있습니다.

```js
.blurred-img {
  filter: blur(10px);
}
```

로딩 효과를 더 향상시키려면 플레이스홀더 이미지에 펄스 애니메이션을 추가할 수 있습니다. 이렇게하면 이미지가 로드되고 있다는 것이 더욱 뚜렷해집니다.

```js
.blurred-img::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  animation: pulse 2.5s infinite;
  background-color: white;
}

@keyframes pulse {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 0;
  }
}
```

위의 CSS 코드를 추가하면 플레이스홀더 이미지에 펄스 애니메이션이 적용되어 서서히 나타났다가 사라지는 효과가 생깁니다.

이미지가 로드되면 전체 이미지를 페이드 인시키기 위해 JavaScript 코드를 추가해야합니다. 아래는 코드의 분해 과정입니다:

```js
<div class="blurred-img">
  <img src="imageName.jpg" loading="lazy" />
</div>
```

COPY

```js
const blurredImageDiv = document.querySelector(".blurred-image");
const img = blurredImageDiv.querySelector("img");
```

```js
function loaded() {
  blurredImageDiv.classList.add("loaded");
}
if (img.complete) {
  loaded();
} else {
  img.addEventListener("load", loaded);
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

JavaScript 코드에서 .blurred-img div와 그 안의 `<img>` 요소를 선택합니다. 이미지가 이미로드되었는지 확인하기 위해 이미지의 complete 속성을 확인합니다. 로드되었다면 loaded() 함수를 직접 호출합니다. 그렇지 않으면 이미지에 로드 이벤트를 위한 이벤트 리스너를 추가합니다. 로드 이벤트는 이미지가 로드될 때 발생하며 이미지가 로드되면 loaded() 함수가 호출됩니다. 이 함수는 .blurred-img div에 loaded 클래스를 추가합니다.

```js
.blurred-img {
  background-repeat: no-repeat;
  background-size: cover;
}

.blurred-img::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  animation: pulse 2.5s infinite;
  background-color: var(--text-color);
}

@keyframes pulse {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 0;
  }
}

.blurred-img.loaded::before {
  animation: none;
  content: none;
}

.blurred-img img {
  opacity: 0;
  transition: opacity 250ms ease-in-out;
}

.blurred-img.loaded img {
  opacity: 1;
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

CSS 코드에서 몇 가지 변경 사항을 만듭니다. 이미지가 로드되면 .blurred-img::before 요소에서 애니메이션과 콘텐츠를 제거하여 펄스 애니메이션을 중지합니다. 또한 .blurred-img img 요소에 트랜지션 속성을 추가하여 loaded 클래스가 .blurred-img div에 추가되면 이미지가 부드럽게 페이드 인되도록합니다. 마지막으로 .blurred-img img의 투명도를 1

로 설정하여 로드되면 이미지가 표시되도록합니다.

이러한 변경 사항을 적용하면 최종 결과는 흐릿한 플레이스홀더 이미지가 로드된 후 전체 이미지가 페이드 인되는 것입니다. 개발자 도구에서 네트워크 속도를 조정하여 로딩 애니메이션을 확인할 수 있습니다.

# 마무리

이미지 lazy loading은 웹사이트의 사용자 경험을 개선하는 간단한 기술입니다. 이미지를 필요한 시점까지 로딩을 지연시킴으로써 대역폭을 절약하고 성능을 최적화할 수 있습니다. 단 한 줄의 코드로 기본적인 lazy loading을 구현할 수 있습니다. 또한 저해상도 플레이스홀더 이미지를 생성하고 흐릿한 효과나 애니메이션과 같은 시각적 효과를 추가하여 로딩 프로세스를 향상시킬 수 있습니다. 부드러운 전환을 위해 JavaScript를 사용하여 전체 이미지가 로드된 후에 이미지를 페이드 인할 수 있습니다. 이러한 기술을 적용하여 효율적인 이미지 로딩과 웹사이트에서의 긍정적인 사용자 경험을 보장할 수 있습니다.
