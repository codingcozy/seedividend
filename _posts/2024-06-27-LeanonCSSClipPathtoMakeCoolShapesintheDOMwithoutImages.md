---
title: "이미지 없이 CSS Clip Path로 DOM에 멋진 모양 만드는 방법"
description: ""
coverImage: "/assets/img/2024-06-27-LeanonCSSClipPathtoMakeCoolShapesintheDOMwithoutImages_0.png"
date: 2024-06-27 18:02
ogImage:
  url: /assets/img/2024-06-27-LeanonCSSClipPathtoMakeCoolShapesintheDOMwithoutImages_0.png
tag: Tech
originalTitle: "Lean on CSS Clip Path to Make Cool Shapes in the DOM without Images"
link: "https://medium.com/itnext/lean-on-css-clip-path-to-make-cool-shapes-in-the-dom-without-images-209d4e7b067a"
isUpdated: true
---

## 하트, 별, 그리고 마법의 부적 - 아니면 추가로 화려한 다각형도 괜찮아요.

![shape](/assets/img/2024-06-27-LeanonCSSClipPathtoMakeCoolShapesintheDOMwithoutImages_0.png)

# 소개

몇 년 전까지, 웹사이트의 배경 모양이나 섹션이 직사각형이 아닌 것들을 원한다면 대부분 디자이너에게 필요한 정적 PNG 또는 JPEG 이미지를 제공받아야 했을 것입니다. 그러나 이후로 CSS는 나아졌어요, 친구들아.

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

웹사이트를 업데이트하던 중 페이지 내용을 순수한 흰색과 부드러운 회색이 번갈아가며 나타나는 다른 색상의 배경 섹션으로 분할하는 디자인 변경 작업을 하고 있었어요. 제 디자인 모형에는 일반 블록 요소처럼 페이지를 가로지르는 것이 아니라 오른쪽 위쪽으로 기울어지고 있는 섹션이 하나 포함되어 있었어요.

이제 제가 디자이너에게 배경 이미지를 만들어 달라고 요청할 수도 있었지만, 대신 CSS의 clip-path를 사용하여 나 혼자서 할 수 있는지 확인해 보고 싶었어요. 그리고 놀랍게도 CSS clip-path로 가능했어요.

DOM에서 흥미로운 모양과 시각 요소는 더 이상 디자이너만의 전유물이 아니에요. CSS clip-path와 같은 도구를 이용해 개발자들도 요소를 재구성할 수 있게 되었고, 어떻게 하는지 여러분께 보여드릴게요.

# CSS clip-path

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

CSS clip-path 속성에 익숙하지 않은 경우에는 저와 같이 하나씩 알아가면서 그 클리핑 영역을 만들어 낼 수 있습니다. 요소의 어떤 부분이 표시되어야 하는지 설정하는 클리핑 영역을 생성합니다. 영역 내에 있는 부분은 표시되고, 외부에 있는 부분은 숨깁니다.

![이미지](/assets/img/2024-06-27-LeanonCSSClipPathtoMakeCoolShapesintheDOMwithoutImages_1.png)

clip-path 속성은 다양한 값들을 받아들일 수 있습니다:

- `clip-source`: SVG 요소 url 같은 값을 받아들입니다.
- `geometry-box`: margin-box나 border-box와 같은 값들을 받아들입니다.
- `basic-shape`: circle()나 rect()와 같은 값을 받아들입니다.
- global-values: 상속받은 값이나 되돌아가는(revert) 값을 받아들입니다.

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

`geometry-box` 및 `basic-shape` 값을 마찬가지로 한 clip-path에 결합할 수도 있습니다.

```js
/* 이 CSS는 두 가지 다른 클립 경로 속성을 결합합니다 */
clip-path: padding-box circle(50px at 0 100px);
```

`basic-shape` 속성 중 하나인 clip-path는 polygon()을 수용하며, 이것이 내가 기울어진 배경 섹션에 필요한 솔루션이 되었습니다.

# CSS로 재생성해야 하는 다각형

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

![사진](/assets/img/2024-06-27-LeanonCSSClipPathtoMakeCoolShapesintheDOMwithoutImages_2.png)

위의 이미지는 CSS clip-path의 polygon() 속성을 사용하여 재현해야 했던 회색 배경 섹션의 스크린샷입니다. 그리고 제가 처음으로 해야 했던 것은 CSS를 적용할 몇 가지 HTML 요소를 만드는 것이었습니다.

## HTML 및 CSS 설정

제가 작업한 사이트는 정적 사이트 생성기 Hugo, Go 기반 프레임워크를 사용했습니다. Hugo는 템플릿을 사용하여 사이트의 HTML을 렌더링하므로 아래 예시 코드는 HTML을 알고 있다면 상당히 익숙할 것입니다.

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

여기는 페이지의 “퍼즐 섹션”이라고 내가 지은 별명으로 불리는 코드입니다. 왜냐하면 이 섹션 전면에 퍼즐 조각이 있기 때문이에요. 이 기사를 명확하게 하기 위해, 템플릿에 주입된 Go 변수를 생성된 HTML로 대체했어요.

single.html

```html
<div class="about-body">
  <!-- 위쪽에 더 많은 HTML 요소들 있음  -->

  <section class="puzzle-section section">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6 col-lg-6">
          <h4 class="mb-3">Lorem ipsum dolor</h4>
          <p class="mb-5">
            Sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Ipsum dolor sit amet consectetur adipiscing elit pellentesque.
          </p>
          <h4 class="mb-3">Duis aute irure dolor in reprehenderit</h4>
          <p class="mb-5">
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Consectetur adipiscing elit
            pellentesque habitant morbi tristique senectus et.
          </p>
        </div>
        <div class="col-sm-8 offset-sm-2 col-md-6 offset-md-0 col-lg-6 offset-lg-0">
          <img class="img-fluid" src="/images/about/puzzle-pieces.png" alt="Puzzle pieces" />
        </div>
      </div>
    </div>
  </section>

  <!-- 아래에 더 많은 HTML 요소들 있음  -->
</div>
```

이 코드 섹션은 비교적 간결하지만, 논의할 가치가 있어요. HTML 요소들 외에도, 다양한 CSS 클래스가 있습니다. 이 CSS 클래스들은 반응형 웹 디자인을 위한 최초의 오픈 소스 CSS 프레임워크 중 하나인 부트스트랩 라이브러리에서 제공됐어요.

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

about-body와 같이 사용하여 사용자 정의 스타일을 추가한 사용자 정의 클래스 중 container, row, col-12 또는 col-md-6, mb-5, mb-3과 같은 클래스가 있습니다.

후자의 클래스들은 모두 Bootstrap 클래스인데, 이는 뷰포트의 폭이 일정 이상인 경우 텍스트 및 이미지 요소가 페이지 폭을 공유하도록 하거나 `p` 태그에 특정 양만큼의 하단 여백을 적용하는 역할을 합니다 (col-md-6, mb-3 또는 mb-5).

그러나이 게시물에서는 Bootstrap 클래스는 중요하지 않습니다. 여기서 주목해야 할 클래스는 모든 텍스트와 퍼즐 조각 이미지를 감싸는 puzzle-section입니다.

이 puzzle-section 클래스에는 우리가 clip-path 속성을 추가하여 텍스트와 이미지 뒤에 연한 회색 배경을 표시하고 약간 기울어진 오른쪽 위의 디자인을 나타낼 것입니다.

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

## CSS clip-path를 사용하여 퍼즐 섹션의 모양을 변경해 보세요!

일반적인 직사각형 `div`를 균형 잡히지 않은 모양으로 스타일링하는 방법에 대해 잘 몰랐기 때문에 온라인에서 솔루션을 찾기 시작했습니다. 그러더니 유용한 인터랙티브 clip-path 중심 사이트인 CSS clip-path maker를 발견했어요.

![CSS Clip Path](/assets/img/2024-06-27-LeanonCSSClipPathtoMakeCoolShapesintheDOMwithoutImages_3.png)

이 CSS clip-path maker 웹사이트는 다양한 미리 설정된 모양, 조정 가능한 이미지 크기 및 배경, 그리고 현재 표시된 이미지의 꼭짓점을 원하는 형태로 끌어서 조합할 수 있는 기능을 제공합니다. 화면 하단의 가로선은 정확한 clip-path CSS 값들을 보여주며, 이를 복사하여 개인 프로젝트의 CSS에 붙여넣을 수 있어요.

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

저는 시작점으로 평행사변형 프리셋 모양을 선택했고, 그 후에 코너를 끌어서 원래부터 다시 만들려고 했던 배경 섹션의 각도와 일치시켰어요. 정확해 보였을 때, 페이지 아래의 CSS 라인을 클립보드에 복사했어요.

내 프로젝트의 SCSS 파일에, 복사한 클립패스 CSS를 추가하여 연한 회색 배경색 속성과 텍스트 및 퍼즐 조각 이미지가 페이지에서 숨쉴 공간을 가질 수 있도록 일부 패딩을 주었어요.

about.scss

```js
about-body {
  // 이 화이트는 전체 웹페이지의 흰 배경색을 설정해요
  background-color: white;

  .puzzle-section {
    // 클립패스 메이커 웹사이트에서 복사한 클립패스 코드
    clip-path: polygon(0 0, 100% 0%, 100% 75%, 0% 100%);
    background-color: light-grey;
    padding: 2rem 0 10rem 0;
  }
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

clip-path에 대한 조금의 CSS만 있으면 정사각형 DOM 요소가 완벽하지 않은 다각형으로 변하는 데 필요한 모든 것이었습니다. 꽤 준수한 작업이네요!

# 결론

CSS는 이미지, 비디오 및 사용자 정의 디자인 요소에 자주 의존하지 않고 웹 개발자들이 할 수 있는 것의 한계를 넓히고 있습니다. 그리고 혼자서 멋진 디자인 작업을 어떻게 수행할지 찾아내는 만족감은 꽤 도전적인 일처럼 느껴집니다.

최근 이것의 한 예는 CSS clip-path 속성을 사용하여 텍스트와 이미지를 위한 배경 상자를 만들어 아래쪽 가장자리가 불규칙한 박스를 만드는 것이었습니다. 모든 모양과 크기의 clip-path를 해독하는 데 전념한 대화형 웹 사이트의 도움으로, 약간 기울어진 이 다각형을 빠르게 처리할 수 있었습니다.

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

그리고 작은 사이트나 코드 조각을 제공하여 다른 개발자가 매우 특정한 문제를 해결할 때 도움이 되는 분들을 진심으로 감사하게 생각합니다. 여러분 덕분에 인터넷이 더 나아지고 있어요.

몇 주 후에 다시 방문해주세요. 더 많은 JavaScript, React, IoT 또는 웹 개발 관련 내용을 공유할 거예요.

제 글을 절대 놓치고 싶지 않으시면 제 뉴스레터에 가입해주세요: https://paigeniedringhaus.substack.com

읽어주셔서 감사합니다. CSS의 힘만으로 DOM에서 요소의 모양을 바꾸는 법을 배우는 것이 여러분에게 도움이 되었기를 바라며 저도 큰 도움이 되었던 것처럼요.

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

# 참고 자료 및 추가 자료

- MDN 문서, CSS clip-path
- CSS clip-path 생성기 웹사이트

원문: https://www.paigeniedringhaus.com.
