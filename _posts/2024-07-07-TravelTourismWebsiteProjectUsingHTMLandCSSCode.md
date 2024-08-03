---
title: "HTML과 CSS 코드로 여행 관광 웹사이트 프로젝트 만들기"
description: ""
coverImage: "/assets/img/2024-07-07-TravelTourismWebsiteProjectUsingHTMLandCSSCode_0.png"
date: 2024-07-07 21:22
ogImage:
  url: /assets/img/2024-07-07-TravelTourismWebsiteProjectUsingHTMLandCSSCode_0.png
tag: Tech
originalTitle: "Travel Tourism Website Project Using HTML and CSS Code"
link: "https://medium.com/@codewithrandomartical/travel-tourism-website-project-using-html-and-css-code-c711cf0b1545"
---

# HTML 및 CSS 코드를 사용하여 여행/관광 웹사이트 프로젝트 만들기

안녕하세요, 개발자 여러분! 이 포스트에서는 HTML과 CSS 코드를 사용하여 여행/관광 웹사이트 프로젝트를 만드는 방법을 알려드릴 거예요. 이 글에서 공유할 웹페이지는 여행에 관한 것이에요. 꽤 간단하고, 이 글을 마치면 여러분만의 여행 관광 웹사이트를 가질 수 있을 거예요.

![Travel/Tourism Website](/assets/img/2024-07-07-TravelTourismWebsiteProjectUsingHTMLandCSSCode_0.png)

여행 웹사이트란 무엇인가요?

<div class="content-ad"></div>

여행 웹사이트는 고객에게 여행 관련 서비스를 제공하는 비즈니스 종류입니다. 이 산업의 미래에 대해 여러 측면이 소비자가 휴가를 계획하는 방식에 영향을 미칠 것입니다. 휴대 전화 사용 증가, 더 많은 경쟁, 고객 기대 변화가 이러한 요인 중 하나입니다. 여행 웹사이트 생성자는 관광객에게 이상적인 도구입니다.

50+ HTML, CSS 및 JavaScript 프로젝트 소스 코드 포함

예를 들어, 사람들은 여행 중에 점점 더 모바일 기기를 사용하고 있습니다. 그 결과로 기업은 자사 웹사이트가 모바일 친화적임을 보장해야 합니다. 소기업을 위한 쉬운 웹사이트 생성기를 이용하여 수익을 증대시키기도 합니다. 또한 온라인 예약 사이트 간의 경쟁이 점점 더 치열해지고 있음을 알아야 합니다.

이제 프로젝트가 무엇을 포함하는지 대략적으로 알게 되었을 것입니다. 이 프로젝트를 단계별로 살펴볼 것입니다.

<div class="content-ad"></div>

# 단계1: 구조 설정하기 (HTML)

여행/관광 프로젝트를 시작해봅시다. 웹사이트 레이아웃을 담을 새로운 하위 디렉토리에 새 index.html 파일을 만들어주세요. 아래 제공된 HTML 코드를 복사하여 HTML 파일에 붙여넣어 주세요.

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Go Trip</title>
</head>

<body>

    <!--===========Nav Bar=================-->
    <section class="nav-bar">
        <div class="logo">Go Trip</div>
        <ul class="menu">
            <li><a href="#">home</a></li>
            <li><a href="#">tours</a></li>
            <li><a href="#">package</a></li>
            <li><a href="#">blog</a></li>
            <li><a href="#">about us</a></li>
            <li><a href="#">contact us</a></li>
        </ul>
        </div>

    </section>
    <!--===============Banner================-->
    <section class="banner">
        <div class="banner-text-item">
            <div class="banner-heading">
                <h1>Find your Next tour!</h1>
            </div>
            <form class="form">
                <input type="text" list="mylist" placeholder="Where would you like to go?">
                <datalist id="mylist">
                    <option>London</option>
                    <option>Canada</option>
                    <option>Monaco</option>
                    <option>France</option>
                    <option>Japan</option>
                    <option>Switzerland</option>
                    <option>Seoul</option>
                </datalist>
                <input type="date" class="date">
                <a href="#" class="book">book</a>
            </form>
        </div>
    </section>

    <!--=========Services===============-->
    <section class="services">
        <div class="service-item">
            <img src="https://res.cloudinary.com/dxssqb6l8/image/upload/v1605293634/tour-guide_onzla9.png">
            <h2>8000+ Our Local Guides</h2>
        </div>
        <!-- 이하 생략 -->
    </section>
    <!-- 이하 생략 -->

</body>

</html>
```

모든 웹사이트는 헤더(header), 본문(main body), 푸터(footer) 섹션으로 구성됩니다. 이 프로젝트에서도 동일한 방식을 사용할 것입니다. 먼저 헤더 섹션에서 제목을 추가하고, 그 다음 본문 섹션에 주요 내용을 추가할 것입니다.

<div class="content-ad"></div>

포트폴리오 웹사이트 만들기 (소스 코드)

## 여행 웹사이트의 헤더 섹션

우선, 우리 웹사이트의 헤더 섹션에는 `nav` 태그를 사용하여 여행 웹사이트용 네비게이션 바를 추가하고, nav 태그 내부에는 웹사이트 네비게이션 바를 위한 여러 네비게이션 링크를 포함하는 순서 없는 목록을 만들 것입니다.

헤더 섹션 내부에는 "배너"라는 다른 섹션을 추가할 것인데, 그 안에는 `h1` 태그를 사용하여 제목을 추가하고; form 태그를 사용하여 텍스트 입력 상자를 추가하겠습니다; 메뉴 목록에서 국가를 선택할 수 있는 메뉴 목록을 추가할 것이며; 달력에서 날짜를 선택할 수 있는 `date` 유형의 입력을 추가할 것이며; `a` 태그를 사용하여 예약 버튼을 추가할 것입니다.

<div class="content-ad"></div>

## 여행 웹사이트의 본문 부분

본문 섹션에서는 세 가지 섹션을 개발할 것입니다: 서비스, 장소, 그리고 회사 정보입니다. 이 섹션에서는 몇 가지 구조를 소개할 것입니다. 서비스 섹션 안에서는 `div`를 사용하여 서비스 항목을 담을 컨테이너를 만들고, 해당 div 태그 안에 `h2`를 사용하여 이미지 및 부제목을 추가할 것입니다. 그리고 세 가지 이상의 서비스 항목을 추가합니다.

장소 부분에 대해서는 카드 형식으로 위치를 나타냅니다. 장소 섹션에서는 먼저 몇 개의 div 태그를 생성하고, 해당 div 내에 'img' 태그를 사용하여 해당 장소에 대한 이미지를 추가하고, 또 다른 div 태그를 사용하여 해당 장소에 대한 텍스트를 추가할 것입니다. 그 div 내에 'span' 및 'h2' 태그를 사용하여 해당 장소에 대한 평점을 추가하고, 'h2' 태그를 사용하여 해당 장소 항목의 부제목을 추가할 것입니다. 이와 유사한 확대 기능이 포함된 5개의 이미지 카드를 추가합니다.

HTML과 CSS를 사용한 레스토랑 웹사이트

<div class="content-ad"></div>

이제 'about' 섹션 내에서 'section' 태그를 사용하여 'About us'를 위한 또 다른 섹션을 생성할 것이며, 그 안에는 우리의 조직에 대한 디스플레이 이미지를 추가하기 위해 `img` 태그를 사용할 것입니다. 그리고 일반적인 HTML 요소를 사용하여 우리의 웹사이트에 대한 간단한 설명을 제공할 것입니다.

푸터 섹션:

`footer` 태그를 사용하여 푸터 섹션을 만들고 `div` 태그를 사용하여 div 섹션을 생성할 것입니다. &copy 태그를 사용하여 저작권 상표 및 저작권 자료를 추가하고, 웹사이트를 디자인한 사람의 이름을 `p` 태그를 사용하여 추가할 것입니다. 푸터에 링크를 생성하기 위해 순서 없는 목록과 `h3` 태그를 사용할 것입니다. 빠른 링크를 위한 헤딩과 추가 아이템 및 지원을 포함할 것입니다.

이제 웹페이지에 구조를 추가했으니, 한번 살펴보겠습니다.

<div class="content-ad"></div>

![Travel Website](/assets/img/2024-07-07-TravelTourismWebsiteProjectUsingHTMLandCSSCode_1.png)

# Step2: 여행 웹사이트 스타일링하기 (CSS)

우리 웹사이트를 어떻게 스타일링할 수 있는지 집중해 봅시다. 스타일링 시 기억해야 할 몇 가지 중요한 포인트를 강조하겠습니다.

```js
@import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Satisfy&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
}

body,
html {
  margin: 0;
  padding: 0;
}

/*------------------------스크롤바-----------------------*/
::-webkit-scrollbar {
  width: 20px;
}

/* 이하 생략 */
```

이런 식으로 CSS 코드를 작성하면 됩니다! 더 궁금한 점이 있다면 물어봐 주세요.

<div class="content-ad"></div>

기본 스타일링:

우리의 여행 웹사이트에 새로운 여러 가지 폰트를 Google의 import 링크를 통해 @import url 함수를 사용하여 가져올 것입니다. 그런 다음 전역 선택자를 사용하여 패딩, 마진 및 상자 크기를 "border-box"로 설정할 것입니다. 우리는 :webkit-scrollbarselector를 사용하여 스크롤바를 스타일링하며, 스크롤바 너비를 20픽셀로, 테두리의 반지름을 10픽셀로 설정하고 노란색 배경을 가지도록 할 것입니다.

HTML, CSS 및 JavaScript를 사용한 날씨 앱 (소스 코드)

내비게이션 바 스타일링:

<div class="content-ad"></div>

우리는 클래스 선택자 (.nav-bar)를 사용하여 "flex"로 디스플레이를 설정할 것입니다. 너비는 100%로 설정하고 높이는 90픽셀로 설정할 것입니다. 배경색을 백색으로 바꾸기 위해 배경색 속성을 사용하고 ul 태그 선택자를 사용하여 네비게이션 바 아이템을 스타일링할 것입니다.

![이미지](/assets/img/2024-07-07-TravelTourismWebsiteProjectUsingHTMLandCSSCode_2.png)

CSS로 할 수 있는 것의 일부이지만, CSS에 대한 심도 깊은 안내서가 필요하다면 저희가 제공해드릴게요. 저희는 여러분을 위해 E-Book을 출시했습니다. 이 E-Book에서는 CSS뿐만 아니라 HTML, Javascript, 그리고 Bootstrap에 대한 학습도 가능합니다. 그리고 여기서 끝나지 않아요! 이 E-Book에는 100개 이상의 프론트엔드 프로젝트와 인터뷰 문제도 포함되어 있습니다. 자세한 내용은 다음 링크에서 확인할 수 있어요 — Master Frontend Development: Zero to Hero

배너 스타일링:

<div class="content-ad"></div>

(.banner) 선택자와 background-image 속성을 사용하여 배경 이미지를 추가할 것입니다. 너비와 높이를 각각 100% 및 100vh로 설정하고, text-align 속성을 사용하여 가운데 정렬할 것입니다. 또한 폼 요소를 스타일링할 것입니다.

![Travel and Tourism](/assets/img/2024-07-07-TravelTourismWebsiteProjectUsingHTMLandCSSCode_3.png)

서비스 및 장소 섹션 스타일링

기본 CSS 개념을 활용할 것입니다; 먼저 클래스 선택자를 사용하여 html 요소를 선택한 다음, 배경 이미지를 추가하고 기본 CSS 스타일링을 사용하여 요소의 너비와 높이를 설정할 것입니다.

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-07-TravelTourismWebsiteProjectUsingHTMLandCSSCode_4.png)

푸터 스타일링:

저희는 푸터에 이미지 배경을 추가하고, 푸터의 너비와 높이를 지정할 것입니다. 이를 할 때는 비순서 목록 태그 선택기를 사용할 거에요. 텍스트에 검은색 배경을 추가하며, 텍스트 색상은 흰색으로 설정할 거에요. 또한 미디어 쿼리 속성을 사용하여 여행 웹사이트에 반응형을 추가할 거에요.

HTML, CSS, & JavaScript를 사용한 전자상거래 웹사이트 (소스 코드)

<div class="content-ad"></div>

![Travel website](/assets/img/2024-07-07-TravelTourismWebsiteProjectUsingHTMLandCSSCode_5.png)

이제 우리는 HTML, CSS를 사용하여 우리의 여행 웹사이트를 완성했습니다. 전체 프로젝트를 이해했으면 좋겠네요. 저희 라이브 미리보기를 한번 살펴보세요.

여행/관광 웹사이트 최종 결과:

# HTML과 CSS를 사용한 여행/관광 웹사이트의 라이브 미리보기:

<div class="content-ad"></div>

10+ HTML CSS 프로젝트 소스 코드

이 블로그가 도움이 되었다면, Front End Projects with Source codes에서 코드를 랜덤으로 구글에서 검색하고 @codewithrandom의 인스타그램 페이지를 팔로우하세요.

팔로우: @codewithrandom

작성자: @Arun

<div class="content-ad"></div>

테이블 태그를 Markdown 형식으로 변경해주세요.

<div class="content-ad"></div>

여행 웹사이트 프로젝트를 시작했습니다. 웹사이트 레이아웃을 담을 새로운 하위 디렉토리에 새 index.html 파일을 생성하십시오. 아래 제시된 HTML 코드를 HTML 파일에 복사하여 붙여넣기하세요.

# 여행 웹사이트란?

여행 웹사이트는 고객에게 여행 관련 서비스를 제공하는 종류의 비즈니스입니다. 이 산업의 미래에 있어서 소비자들이 휴가를 계획하는 방식에는 다양한 측면이 영향을 미칠 것입니다. 모바일 사용량의 증가, 더 많은 경쟁, 그리고 고객 기대의 변화가 이러한 요소 중 일부입니다. 여행자들에게 이상적인 도구는 여행 웹사이트 생성기입니다.

자세히 보기...
