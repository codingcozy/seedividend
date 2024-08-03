---
title: "웹사이트 개발에 SVG 스프라이트 이미지 사용하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Complete guide to SVG sprites"
link: "https://medium.com/@hayavuk/complete-guide-to-svg-sprites-7e202e215d34"
---



## 프론트엔드 프로젝트에서 SVG 아이콘 스프라이트를 만들고 사용하기

<img src="/assets/img/CompleteguidetoSVGsprites_0.png" />

페이지에 아이콘을 추가하는 두 가지 일반적인 방법이 있습니다. 오래된 방법인 웹 폰트를 사용하는 것과 SVG를 사용하는 방법입니다.

SVG는 HTML 마크업 내에 직접 배치될 수 있지만, 불필요한 코드로 마크업을 부풀리며, 동일한 아이콘을 여러 번 반복적으로 사용할 경우 효율적이지 않습니다. 또한 SVG 아이콘에 `img` 태그를 사용할 수도 있지만, 모양을 제어하는 데 많은 제어권을 잃게 됩니다.

<div class="content-ad"></div>

SVG 스프라이트를 사용하는 대안 방법이 있습니다. 이 기사에서는 SVG 아이콘을 내보내는 방법과 이를 단일 SVG 스프라이트 파일로 만드는 방법을 보여 드리겠습니다. 또한 문서에서 그들이 어떻게 사용되는지, 그리고 외관과 필요 대역폭을 제어할 수 있는 몇 가지 멋진 트릭을 보여 드리겠습니다.

일부 섹션에는 디자인 도구와 관련된 정보가 포함되어 있습니다. 디자이너가 아니더라도, 출력 파일이 잘못된 경우 디자이너에게 알릴 수 있도록 이 정보를 알고 있으면 유용할 수 있습니다.

# 웹 폰트 vs SVG

SVG는 아이콘의 크기와 외관을 다양한 상황에서 더 잘 제어할 수 있는 뚜렷한 장점을 가지고 있습니다. 또한 웹 폰트에서는 불가능한 다중 색상 아이콘을 사용할 수 있습니다. 또 하나의 주요 장점은 SVG를 간단한 텍스트 편집기로 조작할 수 있지만, 폰트는 전문 도구가 필요합니다.

<div class="content-ad"></div>

웹 폰트의 유일한 장점은 HTML에서 약간 덜 마크업이 필요하다는 것이지만, 그만큼 CSS가 더 많이 필요합니다. 예를 들어 다음과 같은 차이가 있습니다:

```js
<span class="icon-folder"></span>
```

그리고

```js
<svg class="icon"><use href="img/icons.svg#folder"></svg>
```

<div class="content-ad"></div>

아이콘이 많이 사용된다면, 아이콘 폰트를 사용하면 대역폭을 조금 더 절약할 수 있어요.

웹 폰트와 SVG 간 파일 크기의 차이를 언급하는 사람도 있지만, 저는 개인적으로 그런 차이를 관찰한 적이 없어요. 결과는 상황에 따라 다를 수 있어요.

# 아이콘 만들기

먼저 아이콘 제작에 대해 다뤄볼게요. 그래픽의 잘 정리된 세트를 준비하는 것은 성공으로 향하는 첫걸음이에요.

<div class="content-ad"></div>

## 아트보드 사용하기

현대의 벡터 그리기 도구(예: Figma)는 디자이너가 디자인의 여러 부분에 대해 별도의 영역을 정의할 수 있게 해주는 일종의 아트보드를 갖추고 있습니다. 모든 아이콘이 동일한 크기의 아트보드를 사용하도록 해야 합니다. 이는 내보낼 때 아이콘의 다른 요소들의 좌표가 아트보드를 기준으로 상대적으로 표현되기 때문입니다.

아트보드를 사용하면 하나의 문서에서 여러 아이콘을 만들 수 있으며, 이는 서로 다른 아이콘 간에 색상과 스트로크 너비와 같은 디자인 요소를 동기화하는 데도 도움이 됩니다. 일부 디자인 도구는 한 번에 여러 아이콘을 내보낼 수 있도록 해줍니다.

## 일관된 채우기와 스트로크 색상

<div class="content-ad"></div>

SVG를 사용하면 페이지에서 사용할 때 그래픽의 색상, 선 굵기 및 기타 속성을 매우 세밀하게 제어할 수 있어요. 선 굵기, 색상 및 기타 요소를 일관성 있게 정의하는 것이 매우 중요해요.

디자인에 색상 채우기를 사용하는 경우 일관된 색상 계획을 사용해야 해요. 색상 일관성을 보장하는 좋은 방법은 문서 팔레트, 색상 프리셋 및 유사한 도구를 사용하는 거예요. 이렇게 하면 그래픽을 나중에 쉽게 수정할 수도 있어요(예: 모든 아이콘의 강조 색상 변경).

## 일관된 선 굵기

모든 선은 동일한 굵기여야 해요. 서로 다른 선 굵기가 필요한 경우(권장되지 않음) 다른 굵기의 수를 제한하고 미리 정의해야 해요. 선 굵기를 제멋대로 사용하는 것은 결코 바람직하지 않아요.

<div class="content-ad"></div>

## 레이어와 아트보드 명명

아트보드와 레이어에 이름을 지정할 수 있습니다. SVG 내보내기 중에 프로그램에서는 이러한 이름을 사용하여 SVG 태그에 일부 식별자를 지정할 수 있습니다. 이러한 식별자는 프로그래머가 아이콘을 선택하는 데 사용되므로 특별한 주의가 필요합니다.

일반적으로 프로젝트가 시작되기 전에 디자이너와 개발자 간의 협업을 통해 명명 규칙이 설정되어야 합니다. 좋은 지침은 스페이스를 포함하지 않는 이름을 사용하는 것입니다. 대신 대시나 밑줄을 사용하거나 단어의 첫 글자를 대문자로 쓰는 것이 좋습니다. 다음은 개발자 친화적인 이름의 몇 가지 예시입니다:

- new-folder
- new_folder
- newFolder
- NewFolder

<div class="content-ad"></div>

표 태그를 Markdown 형식으로 변경해주세요.

일부 소프트웨어는 문제가 되는 문자를 자동으로 변환합니다. 이 동작은 초기에 테스트하고 개발자와 함께 논의해야 합니다. 편리한 커뮤니케이션을 위해 자동 변환에 의존하지 않는 것이 좋습니다. 개발자와 디자이너가 아이콘에 동일한 이름을 사용하면 문제 해결을 위해 빠르게 식별할 수 있습니다.

또한, 아이콘 아트보드가 아닌 레이어는 이름을 가져서는 안 되며, 불필요한 이름은 불필요한 디자인 요소를 선택할 수 있게 만들 수 있고 이로 인해 스프라이트가 엉망이 될 수 있거나 이러한 식별자를 정리하기 위해 필요 이상으로 노력해야 할 수 있습니다.

## 윤곽선은 윤곽선으로 유지하기

<div class="content-ad"></div>

웹 폰트를 다룬 적이 있다면, 획(Stroke)를 확장(변환하여 채운 외곽선으로)해야 하는지 알고 계실 것입니다. 이 작업은 SVG에서는 필요하지 않으며, 사실 불필요합니다. 획은 획 그대로 유지될 수 있습니다.

# 아이콘 SVG 내보내기

대부분의 그래픽 디자인 도구에는 SVG 내보내기를 위한 다양한 옵션이 제공됩니다. 그리고 잘못된 옵션 선택은 때때로 어려움을 겪게 할 수 있습니다. 본 섹션에서는 이러한 문제를 피할 수 있는 도구별 옵션에 대해 다룰 것입니다.

## Figma

<div class="content-ad"></div>

피그마는 다양한 옵션이 없어요. 기억해야 할 중요한 점은 전체 아트보드를 내보내야 하며, 그 안의 그래픽만 내보내는 것이 아니라는 것입니다. 또한 아트보드에 채우기가 없어야 해요.

## 일러스트레이터

Adobe 일러스트레이터에서 SVG를 내보내는 두 가지 방법이 있어요. "내보내기" 옵션은 조금 더 간단하지만 내보내고 싶은 아트보드를 쉽게 제어할 수 없어요. 새로운 "화면용으로 내보내기" 옵션은 좀 더 많은 제어를 제공할 거에요. 하지만 SVG를 내보내는 데는 둘 다 동일한 옵션이 있어요.

"내보내기" 옵션을 사용할 때 "아트보드 사용" 옵션이 선택되어 있는지 확인하세요.

<div class="content-ad"></div>

![CompleteguidetoSVGsprites_1](/assets/img/CompleteguidetoSVGsprites_1.png)

폴더 및 파일 이름을 선택한 후 내보내기 옵션을 지정할 수 있습니다.

"화면용으로 내보내기" 기능을 사용하면 내보내고 싶은 아트보드를 시각적으로 선택할 수 있습니다.

![CompleteguidetoSVGsprites_2](/assets/img/CompleteguidetoSVGsprites_2.png)

<div class="content-ad"></div>

각 아트보드의 형식이 "SVG"로 되어 있는지 확인해야 해요.

내보내기 옵션은 "iOS"와 "Android" 버튼 옆에 있는 작은 톱니바퀴 아이콘을 사용하여 선택합니다.

![이미지](/assets/img/CompleteguidetoSVGsprites_3.png)

어떤 내보내기 방법을 사용하든 SVG 출력과 관련된 옵션은 동일합니다.

<div class="content-ad"></div>

"인라인 스타일" 옵션을 선택해 주세요. 이렇게 하면 스타일 정보가 스타일 속성으로 출력됩니다. 이는 SVG 스프라이트에 중요합니다. (이 외에도 "내부 CSS"말고 두 가지 옵션 중 하나를 사용할 수 있습니다.)

! [이미지] (/assets/img/CompleteguidetoSVGsprites_4.png)

"객체 ID" 옵션을 "계층 이름"으로 설정해야 합니다. 앞서 언급한 대로, 계층 이름은 관련된 SVG 태그의 id 속성으로 사용됩니다.

다른 옵션들은 그대로 두어도 됩니다.

<div class="content-ad"></div>

## Affinity Designer

Affinity Designer에서 SVG를 내보내려면, Export persona 또는 "파일" 메뉴 아래의 "내보내기" 옵션을 사용할 수 있어요. 옵션들은 동일해요. Export persona를 사용하는 것이 여러 아이콘을 한 번에 내보낼 수 있어서 더 좋을지도 몰라요.

"파일" 메뉴를 이용해 내보낼 때, "영역" 드롭다운에서 개별 아트보드가 선택되어 있는지 확인해야 해요.

![이미지](/assets/img/CompleteguidetoSVGsprites_5.png)

<div class="content-ad"></div>

Export 페르소나에서 아트보드를 선택하면 "Export Options" 패널에서 일부 익스포트 옵션을 얻을 수 있습니다.

파일 포맷은 "SVG"여야 합니다. 중요한 옵션은 익스포트 해상도입니다. "문서 해상도 사용"으로 설정되어야 합니다.

<img src="/assets/img/CompleteguidetoSVGsprites_6.png" />

추가로 다음 옵션은 켜져 있어야 합니다:

<div class="content-ad"></div>

- "상대 좌표 사용"
- "16진수 색상 사용"
- "변환 평평하게 만들기"
- "뷰박스 설정"

"줄 바꿈 추가" 옵션을 사용하면 출력물의 관련 부분을 추출하기가 더 쉬워지므로 유지하는 것이 좋습니다.

내보내기 개인 정보 설정에서 옵션은 모든 선택한 아트보드에 동시에 설정할 수 있습니다.

# 스프라이트 파일

<div class="content-ad"></div>

SVG를 내보내면 스프라이트 SVG 파일을 준비할 수 있습니다.

빈 SVG 스프라이트 파일은 다음과 같습니다:

```js
<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 여기에 아이콘이 들어갑니다 -->
  </defs>
</svg>
```

`defs` 태그에는 여러 `symbol` 태그가 들어갈 것입니다. `defs` 태그는 이후에 사용할 그래픽의 라이브러리를 포함하고 있습니다. 아이콘 스프라이트는 이 라이브러리의 일부이며 뷰어에서 SVG 파일을 열거나 페이지에 직접 사용할 때 그려지지 않습니다.

<div class="content-ad"></div>

`svg` 태그에 viewBox 속성이 없다는 것을 알려드립니다. 다른 예제에서 사용된 적이 있을 수 있지만, 아이콘 스프라이트에는 필요하지 않으므로 생략해도 됩니다.

# 심볼 정의

이제 각 아이콘에 대한 심볼을 정의하기 시작할 시간입니다.

각 아이콘은 `symbol` 태그 내에 포함되어 있습니다. 일반적으로 다음과 같이 보입니다:

<div class="content-ad"></div>

```js
<symbol id="my-icon" viewBox="0 0 24 24">
  <!-- 아이콘 내용 -->
</symbol>
```

이 아이디는 아이콘의 식별자입니다. HTML 문서에서 참조할 때 사용되므로 매우 중요합니다.

SVG가 페이지에 그려질 때, 자체적인 뷰포트를 받으며 실제 화면에서의 물리적 크기는 CSS와 페이지 레이아웃에 의해 정의됩니다. viewBox 속성은 해당 뷰포트 내의 그래픽의 크기와 위치를 정의합니다. 이 속성은 네 개의 숫자로 구성되어 있습니다. 처음 두 숫자는 그래픽의 왼쪽 상단 모서리의 x와 y 좌표를 나타냅니다. 다른 두 숫자는 각각 너비와 높이를 나타냅니다. 브라우저가 그래픽을 렌더링할 때, x와 y 값으로 그래픽을 이동시키며 너비와 높이 내의 부분만을 렌더링합니다. 그런 다음 렌더링된 이미지를 페이지 내의 물리적 뷰포트에 비례하여 확대 또는 축소하여 완전히 뷰포트에 맞게 매핑합니다. 뷰포트가 그래픽보다 클 경우, 그래픽은 확대되고 그 반대의 경우도 동일합니다.

구체적으로 설명하자면, 32px 네모아이콘에 2px 스트로크 두께가 있는 경우를 가정해 봅시다. SVG의 뷰포트도 32px 네모인 경우, 아이콘은 어떤 확대도 없이 그려집니다. 뷰포트가 2배 큰 경우, 아이콘은 64px 네모에 그려지며 스트로크는 4px가 됩니다. 만약 뷰포트가 16px 네모인 경우, 아이콘도 16px로 그려지고 스트로크는 1px에 불과합니다.```

<div class="content-ad"></div>

```
<img src="/assets/img/CompleteguidetoSVGsprites_7.png" />

하지만 `symbol`에 viewBox가 없을 때 어떻게 되는지 궁금해요? viewBox 속성이 지정되지 않으면 브라우저는 SVG를 viewbox와 viewport가 일치하는 것으로 처리합니다. 그 경우 32px 아이콘은 항상 32px로 그려집니다. SVG viewport 크기가 64px 정사각형인 경우, 아이콘은 32px 정사각형으로 항상 왼쪽 상단 모서리에 그려집니다. 만약 viewport가 16px 정사각형인 경우, 아이콘의 왼쪽 상단 1/4만 viewport 내에 그려집니다.

<img src="/assets/img/CompleteguidetoSVGsprites_8.png" />

요약하자면, `symbol` 태그에 올바른 viewBox를 항상 포함해야 합니다.
```

<div class="content-ad"></div>

# 소스 SVG 변환하기

다양한 디자인 도구의 출력물이 다르기 때문에 구체적인 예시를 보며 변환에 대해 논의할 것입니다.

## Figma SVG 변환

다음은 Figma에서 출력한 예시입니다.

<div class="content-ad"></div>

```js
<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <symbol id="folder-add" viewBox="0 0 24 24">
    <path
      d="M9 8.5C9.27614 8.5 9.5 8.27614 9.5 8V5.5H19.5V18.5H4.5V8.5H9Z"
      fill="#E7CA62"
      stroke="black"
      stroke-linejoin="round"
    />
    <path d="M15 12V16M13 14H17" stroke="black" stroke-linecap="round" />
  </symbol>
</svg>
```

<div class="content-ad"></div>

## Illustrator SVG 변환

다음은 Illustrator에서 나온 예시 출력입니다:

```js
<?xml version="1.0" encoding="UTF-8"?>
<svg id="folder-add" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="m9.5,8v-2.5h10v13H4.5v-10h4.5c.28,0,.5-.22.5-.5Z" style="fill: #e7ca62; stroke: #000; stroke-linejoin: round;"/>
  <path d="m15,12v4m-2-2h4" style="fill: none; stroke: #000; stroke-linecap: round;"/>
</svg>
```

변환된 기호는 다음과 같이 보입니다:

<div class="content-ad"></div>

```js
<symbol id="folder-add" viewBox="0 0 24 24">
  <path
    d="m9.5,8v-2.5h10v13H4.5v-10h4.5c.28,0,.5-.22.5-.5Z"
    style="fill: #e7ca62; stroke: #000; stroke-linejoin: round;"
  />
  <path
    d="m15,12v4m-2-2h4"
    style="fill: none; stroke: #000; stroke-linecap: round;"
  />
</symbol>
```

우리는 `svg` 태그를 `symbol` 태그로 변경하고 id와 viewBox 속성을 유지하고 나머지는 제거했습니다.

## Affinity Designer SVG 변환

다음은 Affinity Designer에서의 예시 출력입니다:

<div class="content-ad"></div>

```js
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;">
    <rect id="folder-add" x="0" y="0" width="24" height="24" style="fill:none;"/>
</svg>
```

변환된 기호는 다음과 같습니다:

```js
<symbol id="folder-add" viewBox="0 0 24 24">
  <path
    d="M9.5,8l0,-2.5l10,0l0,13l-15,0l0,-10l4.5,0c0.276,0 0.5,-0.224 0.5,-0.5Z"
    style="fill:#e7ca62;fill-rule:nonzero;stroke:#000;stroke-width:1px;"
  />
  <path
    d="M15,12l0,4m-2,-2l4,0"
    style="fill:none;fill-rule:nonzero;stroke:#000;stroke-width:1px;stroke-linecap:round;stroke-linejoin:miter;"
  />
</symbol>
```

파일로부터 `g` 태그와 해당 내용을 추출하고, `svg` 태그의 viewBox 속성을 복사합니다. 또한 Affinity Designer에서만 사용하는 serif:id 속성을 제거합니다.```

<div class="content-ad"></div>

Affinity Designer은 ID를 숫자로 추가합니다 (이 경우에는 folder-add 대신 folder-add1로 내보냅니다). 필요하지 않은 이 숫자를 제거했습니다.

# 문서에 아이콘 추가하기

스프라이트 파일이 준비되었으므로, 문서에 아이콘을 추가해볼 차례입니다. 이를 위해 인라인 `svg` 태그를 사용하며, 단일 `use/` 태그를 포함해야 합니다. 아이콘 스프라이트가 img/icons.svg에 저장되어 있다고 가정할 때, 다음과 같이 보일 것입니다:

```js
<svg>
  <use href="img/icons.svg#folder-add" />
</svg>
```

<div class="content-ad"></div>

SVG는 XML이기 때문에 `use/`와 같은 자체 닫히는 태그에 대해 /가 필요합니다. (HTML5에서는 브라우저에서 허용되지만 필요하지는 않습니다.)

URL에 fragment 식별자 #folder-add가 포함되어 있으며, 이는 스프라이트 SVG의 심볼 ID와 일치합니다.

우리가 `symbol` 태그에 포함한 viewBox 속성으로 인해 기본적으로 아이콘은 그에 정의된 크기로 렌더링됩니다. 우리는 CSS를 사용하여 아이콘의 렌더링 크기를 지정할 수 있습니다. 이를 위해 페이지의 아이콘 `svg`에 class 속성을 추가하고 그것을 선택할 수 있습니다.

```js
<svg class="icon">
  <use href="img/icons.svg#folder-add" />
</svg>
```

<div class="content-ad"></div>

```css
.icon {
  width: 1.5em;
  height: 1.5em;
}
```

원본 디자인이 24×24픽셀인데, 아이콘 크기로 1.5em을 사용합니다. 기본 브라우저 글꼴 크기가 16px인 경우, 아이콘을 24px로 만들어줍니다. 또한 주변 텍스트와 함께 크기를 조절할 수 있어, icon-large와 같은 여러 가지 크기를 정의할 필요가 없게 됩니다.

# 아이콘 색상 사용자 정의하기

<div class="content-ad"></div>

문맥에 따라 동일한 아이콘이 서로 다른 색상으로 표시될 수 있습니다. 또한 다크 모드를 위한 다양한 색상 스키마를 지원하거나, 예술적 결정에 따라 색상 스키마를 완전히 변경해야 할 수도 있습니다. 스프라이트 자체에 다양한 색상 변형을 포함할 수 있지만, CSS를 통해 단일 변형을 포함하고 색상을 제어하는 것이 더 효율적입니다. 이를 위해 두 가지 방법으로 수행할 수 있습니다.

더 자세히 설명하기 전에, 디자이너가 일반적으로 사용하는 두 가지 아이콘 유형에 대해 간단히 상기시키겠습니다. 아이콘은 선 아트 또는 일반 아이콘 두 가지 유형으로 나뉩니다. 선 아트는 선으로만 이루어져 있고, 일반 아이콘은 채우기와 선을 결합하여 사용합니다.

![image](/assets/img/CompleteguidetoSVGsprites_9.png)

선 아트 아이콘의 경우, 아이콘은 선으로만 이루어져 있습니다. 아이콘 SVG를 심볼로 변환하는 과정에서 현재 색상 키워드(currentColor 또는 소문자로 currentcolor로 표기할 수 있음)로 선 색상을 간단히 바꿀 수 있습니다. 이는 부모 요소의 텍스트 색상( CSS color 속성)을 나타내는 마법 같은 값입니다. 이렇게 함으로써 선은 항상 주변 텍스트의 색상과 동일하게 유지되며, 필요한 곳에서 color 속성을 사용하여 각각의 아이콘에 대해 색상을 변경할 수 있습니다. 예를 들면:

<div class="content-ad"></div>

```js
.alert .icon {
  color: red;
}
```

일반적인 아이콘의 경우, SVG 자체에서 CSS 사용자 지정 속성(CSS 변수)을 사용할 수 있습니다. 구체적인 예제로 살펴보겠습니다:

```js
<symbol id="folder-add" viewBox="0 0 24 24">
  <path
    d="M9.5,8l0,-2.5l10,0l0,13l-15,0l0,-10l4.5,0c0.276,0 0.5,-0.224 0.5,-0.5Z"
    style="fill:#e7ca62;fill-rule:nonzero;stroke:#000;stroke-width:1px;"
  />
  <path
    d="M15,12l0,4m-2,-2l4,0"
    style="fill:none;fill-rule:nonzero;stroke:#000;stroke-width:1px;stroke-linecap:round;stroke-linejoin:miter;"
  />
</symbol>
```

위의 SVG는 다음 아이콘을 나타냅니다:

<div class="content-ad"></div>

<img src="/assets/img/CompleteguidetoSVGsprites_10.png" />

이 아이콘에는 검정 테두리와 노란색으로 채워진 부분이 있어요. 이를 위해 CSS에서 이 두 가지 색상에 대한 두 개의 CSS 변수를 정의할 거에요.

```js
:root {
  --icon-fill: #e7ca62;
  --icon-stroke: black;
}
```

일반 아이콘들의 일부 속성에는 currentColor 키워드를 사용할 수도 있어요.

<div class="content-ad"></div>

```css
:root {
  --icon-fill: #e7ca62;
  --icon-stroke: currentColor;
}
```

SVG에서는 이러한 사용자 정의 속성을 활용하기 위해 필요한 조정을 합니다.

```html
<symbol id="folder-add" viewBox="0 0 24 24">
  <path
    d="M9.5,8l0,-2.5l10,0l0,13l-15,0l0,-10l4.5,0c0.276,0 0.5,-0.224 0.5,-0.5Z"
    style="fill:var(--icon-fill);fill-rule:nonzero;stroke:var(--icon-stroke);stroke-width:1px;"
  />
  <path
    d="M15,12l0,4m-2,-2l4,0"
    style="fill:none;fill-rule:nonzero;stroke:var(--icon-stroke);stroke-width:1px;stroke-linecap:round;stroke-linejoin:miter;"
  />
</symbol>
```

나중에 이렇게 아이콘 색상을 사용자 정의할 수 있습니다:```

<div class="content-ad"></div>

```js
.alert .icon {
  --icon-fill: red;
}
```

모든 내용은 그라데이션에도 적용됩니다. 그라데이션은 다색 아이콘으로 취급합니다.

SVG 파일의 값을 교체하는 작업은 스프라이트로 변환된 후에 더 효율적으로 수행할 수 있습니다. 전체 스프라이트 파일 전체에 몇 가지 검색 및 교체 작업을 수행하면 비교적 간단한 작업이 됩니다.

# 테두리 모양 정의하기

<div class="content-ad"></div>

SVG의 스트로크에는 외관을 정의하는 여러 특성이 있어요.

이러한 특성 중 일부는 속성을 통해 개별 그래픽에 포함되어 있지만, 때로는 그렇지 않을 수도 있어요. 예를 들어, Affinity Designer 예제로 돌아가보면, 다음 코드 조각이 그래픽 요소가 아닌 `svg` 요소에서 정의된 것을 알 수 있어요:

```js
<svg ... style="... stroke-linejoin:round;">
```

우리가 `svg` 태그를 유지하지 않기 때문에, 이러한 요소를 어딘가에서 정의하지 않으면 그래픽이 잘못 보일 수 있어요. 이러한 불일치를 다루는 가장 간단한 방법은 CSS에서 처리하는 것이에요.

<div class="content-ad"></div>

```js
.icon {
  stroke-linejoin: round;
}
```

일반적으로 SVG 심볼 별로 이러한 속성들을 완전히 제거할 수 있습니다. 특히 Affinity Designer 파일을 사용하지 않는 경우에도 CSS로 옮겨 대역폭을 절약하고 더 많은 제어권을 얻을 수 있습니다. 이를 통해 디자이너가 그래픽의 다른 부분에 대해 의도적으로 다른 특성을 사용한 상황을 주의해야 합니다.

# 선 굵기 사용자 정의

이전에 설명한 바와 같이 SVG는 렌더링된 뷰포트 크기에 비례하여 확대/축소됩니다. 이는 선의 굵기를 포함합니다. 디자인이 의도한대로 동작하도록 하기 위해서는 이것이 바람직한지 여부를 고려해야 합니다. 예를 들어, 디자이너는 아이콘 크기에 관계없이 선의 굵기가 일정하게 유지되기를 원할 수 있습니다. 이 경우에는 CSS에서 선의 굵기에 대한 완전한 제어권을 원할 것입니다. 이를 위해 두 가지 방법 중 하나로 이를 달성할 수 있습니다.```

<div class="content-ad"></div>

첫 번째 방법은 SVG에서 모든 테두리 너비 선언을 제거하고 CSS에서 단일 전역 선 두께를 추가하는 것입니다:

```js
.icon {
  stroke-width: 1px;
}
```

다른 방법은 CSS 사용자 지정 속성을 사용하는 것입니다.

저는 하드 코딩된 값 대신 사용자 지정 속성을 사용할 것을 권장합니다. 이유는 두 가지입니다. 첫째, 하나 이상의 테두리 너비를 처리할 수 있기 때문에(권장되지는 않지만 발생할 수 있음), 둘째, 부모에 정의된 사용자 지정 속성은 모든 하위 항목에 적용되며, 그들이 자체적으로 재정의하는 경우를 제외하면 특정 SVG 요소를 대상으로하지 않아도 다른 테두리 너비를 적용할 필요가 없다는 것입니다.

<div class="content-ad"></div>

우리는 SVG 내에서 직접 사용자 지정 속성을 적용할 수 있습니다. 또한, SVG에서 stroke-width 선언을 제거하고 CSS에서 하나를 적용하는 방법도 있습니다. 후자의 경우는 다음과 같이 수행됩니다:

```js
:root {
  --icon-stroke-w: 1px;
}

.icon {
  stroke-width: var(--icon-stroke-w);
}
```

여기서 기억해야 할 중요한 점은 선 굵기가 페이지의 관점이 아니라 SVG 좌표 시스템에 기반하여 정의된다는 것입니다. SVG 자체의 뷰포트 크기가 viewBox 차원과 일치할 때, 1픽셀의 선 굵기는 CSS에서 그에 해당합니다. 그 외의 경우에는 다르게 렌더링됩니다.

이전에 설명한대로 em 값으로 아이콘 크기를 설정했다고 가정해 봅시다. 이제 아이콘이 폰트 크기가 200%인 요소 내에 있는 경우를 가정해 봅시다. 선은 아이콘 크기와 함께 확대/축소됩니다. 따라서 이제 두 배 넓은 선에 대해 이야기하게 됩니다. 디자이너는 선이 일정해야 한다고 명시했으므로 다시 크기를 조정해야 합니다.

<div class="content-ad"></div>

```json
{
  "project-header": {
    "font-size": "200%",
    "--icon-stroke-w": "0.5px"
  }
}
```

기본 스트로크 너비가 1픽셀이고 200%로 확대되었으므로, 0.5픽셀(반 너비)로 스트로크 너비를 설정해야 200%로 확대할 때 1픽셀로 렌더링됩니다(0.5 × 2 = 1).

# 스프라이트 내에서 심볼 재사용하기

가끔은 동일한 그래픽이 여러 아이콘에서 반복될 수 있습니다. 다음 예시를 살펴봅시다.

<div class="content-ad"></div>

![SVG Sprite](/assets/img/CompleteguidetoSVGsprites_11.png)

동일한 그래픽의 세 가지 변형이 있습니다. 사실상 모든 디자인 도구에서 공통 부분인 노란색 폴더가 세 번 반복됩니다. 이러한 부분이 SVG 스프라이트에서 실제로 반복되지 않도록하여 대역폭을 절약할 수 있습니다.

먼저 리팩터링되지 않은 SVG 스프라이트를 살펴보겠습니다.

```js
<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <symbol id="folder" viewBox="0 0 24 24">
      <path d="M9.5,8l0,-2.5l10,0l0,13l-15,0l0,-10l4.5,0c0.276,0 0.5,-0.224 0.5,-0.5Z" style="fill:#e7ca62;fill-rule:nonzero;stroke:#000;stroke-width:1px;"/>
    </symbol>
    <symbol id="folder-add" viewBox="0 0 24 24">
      <path d="M9.5,8l0,-2.5l10,0l0,13l-15,0l0,-10l4.5,0c0.276,0 0.5,-0.224 0.5,-0.5Z" style="fill:#e7ca62;fill-rule:nonzero;stroke:#000;stroke-width:1px;"/>
      <path d="M15,12l0,4m-2,-2l4,0" style="fill:none;fill-rule:nonzero;stroke:#000;stroke-width:1px;stroke-linecap:round;stroke-linejoin:miter;"/>
    </symbol>
    <symbol id="folder-remove" viewBox="0 0 24 24">
      <path d="M9.5,8l0,-2.5l10,0l0,13l-15,0l0,-10l4.5,0c0.276,0 0.5,-0.224 0.5,-0.5Z" style="fill:#e7ca62;fill-rule:nonzero;stroke:#000;stroke-width:1px;"/>
      <path d="M13,14l4,0" style="fill:none;fill-rule:nonzero;stroke:#000;stroke-width:1px;stroke-linecap:round;stroke-linejoin:miter;"/>
    </symbol>
  </defs>
</svg>
```

<div class="content-ad"></div>

`path d="M9.5,8l0,-2.5l10,0l0,13l..."/`태그가 세 번 반복됩니다. 이를 `use/`태그를 사용하여 요소화할 수 있습니다:

```js
<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <symbol id="folder" viewBox="0 0 24 24">
      <path d="M9.5,8l0,-2.5l10,0l0,13l-15,0l0,-10l4.5,0c0.276,0 0.5,-0.224 0.5,-0.5Z" style="fill:#e7ca62;fill-rule:nonzero;stroke:#000;stroke-width:1px;"/>
    </symbol>
    <symbol id="folder-add" viewBox="0 0 24 24">
      <use href="#folder"/>
      <path d="M15,12l0,4m-2,-2l4,0" style="fill:none;fill-rule:nonzero;stroke:#000;stroke-width:1px;stroke-linecap:round;stroke-linejoin:miter;"/>
    </symbol>
    <symbol id="folder-remove" viewBox="0 0 24 24">
      <use href="#folder"/>
      <path d="M13,14l4,0" style="fill:none;fill-rule:nonzero;stroke:#000;stroke-width:1px;stroke-linecap:round;stroke-linejoin:miter;"/>
    </symbol>
  </defs>
</svg>
```

이제 folder-add와 folder-remove 아이콘들이 그래픽의 일부로 folder 아이콘을 사용하고 있습니다.

`use/`태그는 viewbox 주변에서 이동하는 데 사용할 수 있는 x 및 y 속성을 지원합니다. 이는 반복되는 요소가 아이콘 내에서 항상 동일한 위치에 있지 않을 때에도 이 리팩터링을 사용할 수 있다는 것을 의미합니다.

<div class="content-ad"></div>

# 교차 도메인 문제 다루기

스프라이트 파일을 별도의 도메인(예: CDN)에 호스팅하고 싶다면 작동하지 않음을 알게 될 것입니다. 이는 CORS 제한 때문입니다. 안타깝게도 이를 해결하고 CDN에 스프라이트를 유지하는 좋은 방법은 없습니다.

첫 번째 옵션은 교차 도메인 스프라이트를 사용하지 않는 것입니다. 이것은 가장 쉬운 해결책이지만 중복을 발생시킵니다.

두 번째 옵션은 JavaScript를 사용하여 SVG를 인라인으로 삽입하는 것입니다. 이를 수행하는 코드는 다음과 같을 수 있습니다:

<div class="content-ad"></div>

```js
fetch("https://cdn.my-domain.com/icons.svg")
  .then((res) => res.text())
  .then((svgText) => {
    let svgHider = Object.assign(document.createElement("div"), {
      innerHTML: svgText,
    });
    Object.assign(svgHider.style, {
      position: "absolute",
      width: 0,
      height: 0,
      overflow: hidden,
      pointerEvents: "none",
    });
    document.body.append(svgHider);
  });
```

이 방법을 사용할 때, `use/` 태그에는 전체 URL이 아닌 단순한 fragment 식별자만 포함되어야 합니다:

```js
<svg class="icon">
  <use href="#folder-add" />
</svg>
```

Id는 문서 전체에서 고유해야 합니다. `use/` 태그의 id 참조는 스프라이트 내의 아이콘에만 해당하는 것이 아니라 페이지의 다른 요소에도 해당될 수 있습니다. 따라서 페이지 내의 HTML 요소에 사용되는 id들과 충돌을 피하기 위해 스프라이트 SVG 내의 id를 icon-과 같이 일반적인 접두어로 지정하는 것이 좋습니다.```

<div class="content-ad"></div>

두 번째 옵션은 CDN 상에 스프라이트를 유지하므로 "더 좋을 것" 같아 보일 수 있지만, 실제로는 그렇지 않습니다. 그 이유는 스프라이트가 JavaScript 없이는 작동하지 않기 때문입니다.

# 스프라이트 생성 자동화

이렇게 세부 사항에 주의를 기울여 스프라이트 생성을 자동화하고 싶다면, 죄송합니다만 그런 작업을 수행하는 도구는 알지 못합니다. 디자인 도구 자체가 SVG를 출력하는 표준 방법이 없다는 점을 감안하면 이것은 크게 놀라운 일이 아닙니다.

어떤 도구들은 디자이너가 사용하는 특정 디자인 도구에 대해 충분히 작동할 수 있고, 아이콘에 대한 충분히 좋은 시작점을 제공할 수 있습니다. 사용해보고 결과를 확인해야 할 것입니다.

<div class="content-ad"></div>

그렇다고 해서 이 모든 것을 수동으로 처리하는 것이 어려운 것은 아닙니다. 개인적으로는 최종 결과물이 어떻게 보이는지에 대한 이 수준의 제어를 선호합니다. 완료해야 하는 일은 가끔할 뿐이기 때문에 필요한 계기가 됩니다. 연습이 조금 필요하지만, 그게 문제가 될까요!
