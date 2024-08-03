---
title: "HTML과 CSS로 작은 전자상거래 웹사이트 만드는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-CreatingasmallE-CommercewebsiteusingHTMLandCSS_0.png"
date: 2024-07-09 18:30
ogImage:
  url: /assets/img/2024-07-09-CreatingasmallE-CommercewebsiteusingHTMLandCSS_0.png
tag: Tech
originalTitle: "Creating a small E-Commerce website using HTML and CSS"
link: "https://medium.com/@amashashalindi/creating-a-small-e-commerce-website-using-html-and-css-df799808d12"
---

그렇게 어렵지 않아요😉

![이미지](/assets/img/2024-07-09-CreatingasmallE-CommercewebsiteusingHTMLandCSS_0.png)

# 안녕하세요 모두😃

저는 미디엄에서 처음으로 글을 써봅니다. 오늘은 HTML과 CSS를 사용하여 작은 전자 상거래 웹사이트를 만드는 방법에 대해 이야기해보려고 해요.

<div class="content-ad"></div>

전자 상거래 웹 사이트는 인터넷을 통해 다양한 제품을 구매하고 판매할 수 있는 온라인 상점입니다. 저희는 HTML을 사용하여 웹페이지의 구조와 내용을 만듭니다. 사용자들의 마음을 사로잡기 위해 CSS를 사용해야 합니다. CSS는 다양한 색상, 레이아웃 및 글꼴을 사용하여 웹사이트를 눈에 띄게 만들어줍니다.

# 제 웹사이트가 어떻게 생겼는지 확인해볼까요? 😃

제 웹페이지의 데모를 함께 살펴봅시다.

# 제 코드를 살펴보세요! 😃

<div class="content-ad"></div>

웹 페이지는 모두 세 가지 주요 섹션으로 나뉩니다 — `HEADER`, `BODY`, `FOOTER`. 각 섹션마다 HTML 태그 사이의 텍스트를 간단히 변경할 수 있어요.

# 헤더에 대한 설명🤔

<img src="/assets/img/2024-07-09-CreatingasmallE-CommercewebsiteusingHTMLandCSS_1.png" />

<img src="/assets/img/2024-07-09-CreatingasmallE-CommercewebsiteusingHTMLandCSS_2.png" />

<div class="content-ad"></div>

`header` 태그는 소개 콘텐츠나 탐색 링크 세트의 컨테이너로 사용됩니다. `nav` 태그는 주요 탐색 링크 블록에만 사용합니다.

`img` 태그는 HTML 페이지에 이미지를 삽입하는 데 사용됩니다. "src"를 사용하여 이미지 경로를 지정합니다. 여기서는 웹 페이지 로고를 표시하려고 합니다. CSS 기능을 적용하려면 그것을 명시적으로 인식해야 합니다. 이를 위해 "logob"라는 클래스를 정의했습니다.

`ul` 태그는 정렬되지 않은 목록을 정의하는 데 사용됩니다. 목록 항목을 `li` 태그로 시작합니다. `a` 태그의 "href" 속성을 사용하여 웹 페이지나 URL이 주소할 수 있는 항목에 대한 하이퍼링크를 생성합니다. `a` 태그는 링크의 대상을 나타내어야 합니다.

`div` 태그는 HTML 요소의 컨테이너로 사용됩니다. 여기서 "intro"라는 div 클래스를 정의했습니다. `h1`부터 `h3` 태그는 제목을 정의합니다.

<div class="content-ad"></div>

![2024-07-09-CreatingasmallE-CommercewebsiteusingHTMLandCSS_3.png](/assets/img/2024-07-09-CreatingasmallE-CommercewebsiteusingHTMLandCSS_3.png)

HTML 문서에 CSS를 추가하는 방법은 3가지가 있어요. 바로 인라인, 내부 및 외부 CSS에요. 저는 외부 CSS 파일을 사용했어요. 클래스 선택자는 특정 클래스 속성을 가진 HTML 요소를 선택해요. 클래스 이름 뒤에 (.) 문자를 사용해요.

페이지가 로드될 때 몇 가지 레이아웃 이동이 생길 수 있어요. 이를 방지하기 위해 너비와 높이 속성을 설정해요. "cursor" 속성은 요소 위로 마우스 커서를 올릴 때 표시되는 마우스 커서를 강조해 줘요.

![2024-07-09-CreatingasmallE-CommercewebsiteusingHTMLandCSS_4.png](/assets/img/2024-07-09-CreatingasmallE-CommercewebsiteusingHTMLandCSS_4.png)

<div class="content-ad"></div>

위 코드 부분은 "intro" div 클래스에 CSS 기능을 사용한 방법을 보여줍니다. 요소의 콘텐츠가 지정된 영역에 맞지 않을 때 콘텐츠를 클립할지 스크롤바를 추가할지를 지정하기 위해 "overflow" 속성을 사용합니다. 여기서 값으로 "hidden"을 사용했습니다. 이는 오버플로가 클리핑되어 나머지 콘텐츠가 보이지 않게 됨을 의미합니다. "position"은 요소에 사용된 위치 지정 방법을 강조하는 데 사용됩니다. 여기서는 배경 이미지를 사용하고 속성을 선호에 따라 변경했습니다.

일부 요소 위를 마우스로 이동할 때 색상이 변경되는 것을 주목한 적이 있나요? 🤔

<img src="/assets/img/2024-07-09-CreatingasmallE-CommercewebsiteusingHTMLandCSS_5.png" />

우리는 ":hover"를 사용하여 마우스를 요소 위로 올릴 때 해당 요소를 선택합니다. 여기서 컬러 속성을 사용하여 내비게이션 요소를 클릭했음을 알 수 있도록 했습니다.

<div class="content-ad"></div>

이 버튼을 만드는 방법을 알고 싶나요?😉

![이미지1](/assets/img/2024-07-09-CreatingasmallE-CommercewebsiteusingHTMLandCSS_6.png)

![이미지2](/assets/img/2024-07-09-CreatingasmallE-CommercewebsiteusingHTMLandCSS_7.png)

"display: inline"과 비교할 때, "display: inline-block"의 주요 차이점은 요소에 너비와 높이를 설정할 수 있다는 것입니다. "border-radius" 속성을 사용하여 요소의 모퉁이 반지름을 정의합니다. 버튼의 배경색으로 주황색을 사용했어요. "box-shadow" 속성은 요소에 하나 이상의 그림자를 부착합니다. "padding" 속성을 사용하여 요소 콘텐츠 주변 또는 테두리 내부에 여백을 만듭니다. "font-weight" 속성은 문자가 얼마나 굵거나 가느냐를 지정합니다.

<div class="content-ad"></div>

# 웹사이트의 본문을 엿보아 볼까요! 😃

![이미지](/assets/img/2024-07-09-CreatingasmallE-CommercewebsiteusingHTMLandCSS_8.png)

아이콘을 어떻게 만드는지 궁금하셨죠? 간단해요. 코드를 살펴봐요.

![이미지](/assets/img/2024-07-09-CreatingasmallE-CommercewebsiteusingHTMLandCSS_9.png)

<div class="content-ad"></div>

"benefit-center box"라는 div 클래스를 정의한 "section benefits" 섹션을 만들었습니다. 그 아래에 "benefit"이라는 div 클래스를 정의했습니다. 또한 "icon"이라는 span 클래스를 정의했습니다. 여기에는 상자 아이콘을 가져왔습니다.

<img src="/assets/img/2024-07-09-CreatingasmallE-CommercewebsiteusingHTMLandCSS_10.png" />

div와 span 클래스에 각각 CSS를 적용했습니다. 여기에서 그리드 레이아웃을 사용했습니다. CSS의 "그리드 레이아웃"은 행과 열을 가진 그리드 기반 레이아웃 시스템을 제공하여 웹 페이지를 디자인하는 것을 더 쉽게 만듭니다. "flex-direction" 속성은 유연한 항목의 방향을 지정합니다.

<img src="/assets/img/2024-07-09-CreatingasmallE-CommercewebsiteusingHTMLandCSS_11.png" />

<div class="content-ad"></div>

위 사진에서 제품 이름, 별점 및 가격을 언급했습니다. 제품 주위에 마우스 커서를 이동하면 제품이 크기가 커지는 것을 볼 수 있어요. 좀 더 자세한 내용을 이해하려면 코드를 살펴보겠습니다.

![Product Image](/assets/img/2024-07-09-CreatingasmallE-CommercewebsiteusingHTMLandCSS_12.png)

Here I have defined a div class called "ac". Under I have defined a div class called "img-cover". I have inserted an image using the `img src` tag. I have inserted the product description by using a `p` tag. I have used a div class called "rating" to display the stars. I have used a div class called "price" to display the price.

![Product Image](/assets/img/2024-07-09-CreatingasmallE-CommercewebsiteusingHTMLandCSS_13.png)

<div class="content-ad"></div>

위에서 볼 수 있듯이, 저는 div와 span 클래스에 CSS를 적용했습니다. 사용자가 해당 제품 위로 커서를 올리면 제품 크기를 확대하기 위해 ":hover"를 사용합니다. "transition" 효과는 일반적으로 사용자가 요소 위로 커서를 이동할 때 발생할 수 있습니다. "transform" 속성을 사용하면 요소를 회전, 확대, 이동할 수 있습니다.

제품은 그리드 레이아웃을 사용하여 표시합니다. 그리드 레이아웃을 사용한 예제를 살펴보겠습니다.

![이미지](/assets/img/2024-07-09-CreatingasmallE-CommercewebsiteusingHTMLandCSS_14.png)

# 이제 푸터로 이동해 볼까요? 😃

<div class="content-ad"></div>

<img src="/assets/img/2024-07-09-CreatingasmallE-CommercewebsiteusingHTMLandCSS_15.png" />

이것은 제 웹 페이지의 "푸터" 사진입니다. 여기에 몇 가지 링크와 아이콘을 볼 수 있어요. 어떻게 만들었는지 봐요.

<img src="/assets/img/2024-07-09-CreatingasmallE-CommercewebsiteusingHTMLandCSS_16.png" />

"푸터"라는 섹션 id를 정의했어요. 그 아래에서 "foot"라는 div 클래스를 정의했어요. 순서 없는 목록을 얻기 위해 `ul` 태그를 사용했어요. 목록 항목은 `li` 태그로 시작했어요. 웹 페이지로 하이퍼링크를 만들기 위해 `a` 태그를 사용했어요. `a` 태그는 링크의 대상을 나타내야 해요. "social-links"라는 또 다른 div 클래스를 정의했어요. font-awesome 아이콘을 가져왔어요.

<div class="content-ad"></div>

<img src="/assets/img/2024-07-09-CreatingasmallE-CommercewebsiteusingHTMLandCSS_17.png" />

푸터 섹션 및 다른 태그에 CSS 기능을 적용한 것을 확인할 수 있어요.

HTML 및 CSS를 사용하여 작은 웹사이트를 만드는 방법에 대해 모두 다뤄보았습니다. 웹사이트를 만드는 기초적인 지식을 얻으셨다면 좋겠어요. 소중한 시간을 내어 읽어 주셔서 감사합니다.

만약 이 블로그가 여러분의 지식을 풍부하게 해주었다고 생각이 든다면, 박수를 보내주시고 댓글을 남기시고 동료들과 공유해 주세요. 더 많은 흥미로운 기사를 위해 저를 팔로우해 주세요.
