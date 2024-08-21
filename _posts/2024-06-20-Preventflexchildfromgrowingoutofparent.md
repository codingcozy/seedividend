---
title: "부모 요소를 벗어나는 플렉스 자식 요소 크기 조절 방법"
description: ""
coverImage: "/assets/img/2024-06-20-Preventflexchildfromgrowingoutofparent_0.png"
date: 2024-06-20 06:00
ogImage:
  url: /assets/img/2024-06-20-Preventflexchildfromgrowingoutofparent_0.png
tag: Tech
originalTitle: "Prevent flex child from growing out of parent"
link: "https://medium.com/@adeli.farhad/prevent-flex-child-from-growing-out-of-parent-c2d55ebd079a"
isUpdated: true
---

부모 요소 내에 맞춰 콘텐츠 크기를 줄이고 싶어요.

콘텐츠(이 경우 비디오)는 축소되어 스크롤 막대가 허용되어야 합니다.

정적 높이 값을 설정하지 않고 절대 위치를 지정하지 않고, 녹색 상자가 빨간 상자 내에 포함되도록 어떻게 해야 할까요?

![이미지](/assets/img/2024-06-20-Preventflexchildfromgrowingoutofparent_0.png)

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
.my-box {
  height: 300px;
  width: 600px;
  background: red;
  padding: 5px;
}
.content-box {
  background: blue;
}
.col {
  display: flex;
  flex-direction: column;
  justify-content: space-between
}
.box-shrink {
  flex: 0 1 auto;
  background: green;
  padding: 5px;
  margin: 5px;
}
.box-grow {
  flex: 1;
  background: green;
  padding: 5px;
  margin: 5px;
}
video {
  max-height: 100%;
  max-width: 100%;
  margin: auto;
  display: block;
}
```

```js
<div class="my-box col">
  <div class="box-shrink">
    작은 크기의 정적 콘텐츠
  </div>
  <div class="content-box box-grow">
    <video controls>
      <source src="http://techslides.com/demos/sample-videos/small.webm" type="video/webm">
    </video>
  </div>
  <div class="box-shrink">
    작은 크기의 정적 콘텐츠
  </div>
</div>
```

# 해결책 #1 — 스크롤 없이

비디오 컨테이너의 flex: 1 0 auto 대신에 flex: 1을 사용하십시오. 이는 항목을 내용의 내재 높이가 아닌 사용 가능한 공간에 기반하여 크기를 결정합니다.

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

그러면 flex 항목은 내용보다 작아질 수 없습니다. min-height: auto는 기본값이므로 min-height: 0을 추가하여 항목이 컨테이너 내에 들어갈 수 있도록 합니다.

```js
.box-grow {
  flex: 1; /* 이전에는 flex: 1 0 auto; */
  background: green;
  padding: 5px;
  margin: 5px;
  min-height: 0; /* 새로운 속성 */
}
```

# 해결책 #2 — 스크롤 기능 추가

또는 비디오 컨테이너에 overflow: auto를 지정하여 위와 동일한 효과를 얻을 수 있지만 비디오를 전체 너비로 유지합니다. 이 기능을 활성화하려면 flex-shrink를 활성화해야 합니다.

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
.box-grow {
  flex: 1 1 auto; /* 이전에는 flex: 1 0 auto; 였습니다. */
  background: green;
  padding: 5px;
  margin: 5px;
  overflow: auto; /* 새로 추가된 스타일 */
}
```

# 해결책 #3

컨텐츠(이 경우 비디오)가 줄어들 수 있고 스크롤바가 허용되는 경우입니다. .box-grow 클래스에 overflow:auto;를 적용하고 flex-shrink: 1;를 설정해보는 것은 어떨까요? flex: 1 1 auto;와 같이 설정하면 됩니다. 또는 flex: 1 1 100%;로 설정하면 비디오가 .box-grow 클래스가 중앙에 맞게 표시되며, overflow:auto도 필요합니다.

```js
.my-box {
    height: 300px;
    width: 600px;
    background: red;
    padding: 5px;
}

.content-box {
    background: blue;
}

.col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.box-shrink {
    flex: 0 1 auto;
    background: green;
    padding: 5px;
    margin: 5px;
}

.box-grow {
    flex: 1 1 auto;  /* 기본값인 shrink 1로 설정합니다. */
    background: green;
    padding: 5px;
    margin: 5px;
    overflow:auto; /* flex:1 1 100%로 설정하면 overflow가 필요합니다. */
}

video {
    max-height: 100%;
    max-width: 100%;
    margin: auto;
    display: block;
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

```js
<div class="my-box col">
    <div class="box-shrink">
        작은 크기의 정적 콘텐츠
    </div>
    <div class="content-box box-grow">
        <video controls>
            <source src="http://techslides.com/demos/sample-videos/small.webm" type="video/webm">
        </video>
    </div>
    <div class="box-shrink">
        작은 크기의 정적 콘텐츠
    </div>
</div>
```

# 왜 플렉스 아이템이 콘텐츠 크기 아래로 줄어들지 않을까요?

## 플렉스 아이템의 자동 최소 크기

이는 플렉스박스의 기본 설정으로 인한 것입니다.

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

주축을 따라 플렉스 항목은 콘텐츠의 크기보다 작을 수 없어요.

기본값은...

- min-width: auto
- min-height: auto

...행 방향 및 열 방향의 플렉스 항목에 대해 각각 적용돼요.

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

여러분은 flex 항목을 다음과 같이 설정하여 기본값을 재정의할 수 있어요:

- min-width: 0
- min-height: 0
- overflow: hidden (또는 다른 값, visible을 제외한)

# Flexbox 명세

auto 값에 대해서는...

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

다시 말해:

- min-width: auto 및 min-height: auto 기본값은 오버플로우가 visible로 설정된 경우에만 적용됩니다.
- 만약 오버플로우 값이 visible이 아닌 경우 min-size 속성의 값은 0이 됩니다.
- 따라서 overflow: hidden은 min-width: 0 및 min-height: 0의 대안이 될 수 있습니다.

그리고...

- 최소 크기 조정 알고리즘은 주요 축에만 적용됩니다.
- 예를 들어, 행 방향 컨테이너 내의 플렉스 항목은 기본적으로 min-height: auto를 적용받지 않습니다.
- 보다 자세한 설명은 다음 게시물을 참조하세요:
- flex-direction: row 및 flex-direction: column일 때 min-width가 다르게 렌더링됨

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

# 브라우저 렌더링 참고 사항

- Chrome 대 Firefox / Edge
  적어도 2017년 이후로 Chrome은 min-width: 0 / min-height: 0 기본값으로 되돌아가거나(1) 특정 상황에서 신비한 알고리즘을 기반으로 0 기본값을 자동으로 적용하는 것으로 보입니다. (이를 개입(intervention)이라고도 할 수 있습니다.) 결과적으로 많은 사람들이 Chrome에서는 레이아웃(특히 원하는 스크롤 바)이 예상대로 작동하지만 Firefox / Edge에서는 그렇지 않다는 것을 알 수 있습니다. 이 문제에 대한 자세한 내용은 여기에서 다루고 있습니다: Firefox와 Chrome 사이의 flex-shrink 불일치
- IE11
  명세서에 명시된 대로, min-width 및 min-height 속성의 auto 값은 "new"입니다. 이는 일부 브라우저가 아직 최신값을 적용하지 않을 수 있음을 의미합니다. 왜냐하면 일부 브라우저는 flex 레이아웃을 업데이트하기 전에 구현했기 때문에 CSS 2.1에서 min-width 및 min-height의 초기값이 0이었기 때문입니다. IE11와 같은 브라우저가 해당됩니다. 다른 브라우저들은 flexbox 명세에 정의된 최신 auto 값으로 업데이트되었습니다.
