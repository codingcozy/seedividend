---
title: "HTML과 CSS로 간단한 싱글 페이지 웹사이트 만드는 방법"
description: ""
coverImage: "/assets/img/2024-06-23-CreateaSimpleSinglePageWebsiteUsingHTMLandCSS_0.png"
date: 2024-06-23 14:26
ogImage: 
  url: /assets/img/2024-06-23-CreateaSimpleSinglePageWebsiteUsingHTMLandCSS_0.png
tag: Tech
originalTitle: "Create a Simple Single Page Website Using HTML and CSS"
link: "https://medium.com/@genotechies/create-a-simple-single-page-website-using-html-and-css-456e3f0f16c8"
---


## HTML과 CSS를 사용한 간단한 웹사이트 디자인

![이미지](/assets/img/2024-06-23-CreateaSimpleSinglePageWebsiteUsingHTMLandCSS_0.png)

웹 개발자가 되기 위해서는 먼저 HTML과 CSS를 배워야 합니다. 하지만, HTML과 CSS를 완전히 배울 수 없습니다. 당신이 할 수 있는 것은 기본 구문을 배우고 과제를 수행하여 시험에 통과하는 것뿐입니다. 진정한 경험과 지식을 얻는 것은 현장에서 웹사이트를 디자인할 때입니다. 웹 개발에 초보이거나 HTML과 CSS와 관련된 과제를 해결해야 하는 경우, 이 글을 따라가보세요. 5~10분 안에 단일 페이지 웹사이트를 만들 수 있습니다. 지식 습득을 위해 모든 태그와 다른 내용을 설명해 두었습니다.

# 필수 준비사항

<div class="content-ad"></div>

- VS 코드

Visual Studio Code은 내가 선호하는 통합 개발 환경입니다. 파일을 편집하는 데에는 다른 IDE를 사용할 수도 있습니다. 또는 여기서 VS 코드 편집기를 다운로드할 수도 있습니다.

- VS 코드에 Live Server 확장 프로그램을 설치하세요.

브라우저에서 변경 사항을 확인하고 실행하기 위해, Live Server를 VS 코드에 설치했습니다. 이제 웹 페이지를 개발할 때 변경 사항을 한 번의 클릭으로 확인할 수 있습니다. 또는 선호하는 다른 방법으로 파일을 실행할 수도 있습니다. Live Server를 설치하려면 VSCode를 열고 ctrl + P를 입력하여 ext install ritwickdey.liveserver를 입력하고 엔터를 누르면 됩니다.

<div class="content-ad"></div>

그럼 구현 방법을 살펴보겠습니다. 아래 단계를 따라야 합니다.

## 단계 01

컴퓨터 어디에서나 genotechies라는 폴더를 만들고 에디터를 통해 해당 폴더를 엽니다. 해당 폴더 내부에 index.html 파일을 생성하세요.

![이미지](/assets/img/2024-06-23-CreateaSimpleSinglePageWebsiteUsingHTMLandCSS_1.png)

<div class="content-ad"></div>

- Live server를 사용하여 index.html 파일을 실행할 수 있어요. index.html 파일에 마우스 오른쪽 버튼을 클릭하고 Live Server로 열기 옵션을 선택해주세요. 그러면 즐겨 사용하는 브라우저에서 페이지가 열릴 거에요.

![image](/assets/img/2024-06-23-CreateaSimpleSinglePageWebsiteUsingHTMLandCSS_2.png)

# 단계 02

이것은 HTML 페이지의 기본 템플릿이에요. 먼저 해당 내용을 index.html 파일로 복사했어요. 그래서 우리는 이 템플릿에 모든 다른 구성 요소들을 추가할 거에요.

<div class="content-ad"></div>


<!DOCTYPE html>
<html lang="en">
<head>
<title>Page Title</title>
</head>
<body>
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
</body>
</html>


# Step 03: Add meta tags and edit the title in the head tag

The `meta` tag defines metadata about an HTML document. Metadata describes the data contained inside the web page.

`meta` tags always go inside the `head` element and are typically used to specify the character set, keywords, page description, author of the document, and viewport settings.


<div class="content-ad"></div>

```js
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Genotechies Website Design</title>
</head>
```

# 단계 04: 이미지 폴더 및 기타 파일 생성

body 태그를 편집하기 전에 동일한 디렉토리에 이미지 폴더와 style.css 파일을 생성해야 합니다. 필요할 때마다 이미지를 추가해야 합니다. 그리고 CSS 파일을 업데이트해야 합니다.

# 단계 05: 본문 상단에 컨테이너 추가하기


<div class="content-ad"></div>

먼저, 상단 컨테이너를 추가합니다. 로고, 검색 바, 이미지, 제목 및 소셜 아이콘을 포함했습니다.

```js
  <div class="container">
        <div class="logo">
            <img src="Images/logo.png" alt="Programming PEN">
        </div>
        <div class="sectionSearch">
            <div class="searchBox">
                <i class="fas fa-search"></i>
                <input type="search" placeholder="검색">
            </div>
        </div>
        <div class="firstSectinImage">
            <img src="Images/photo01.jpg" alt="" srcset="">
        </div>
        <div class="firstSectionHeading">
            <h1><span>여름</span> 특별행사</h1>
            <h1 class="letterSpacing"> 컬렉션 <span>할인혜택 포함</span></h1>
            <button class="btnBuyNow">지금 구매</button>
        </div>
        <div class="mediaIcons">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-youtube"></i></a>
        </div>
    </div>
    <script src="https://kit.fontawesome.com/9e5a623fa6.js" crossorigin="anonymous"></script>
```

여기서 container, logo, sectionSearch, firstSectinImage, firstSectionHeading, letterSpacing, btnBuyNow 및 mediaIcons 클래스를 지정했습니다. 따라서 해당 클래스에 스타일을 적용하려면 해당 클래스 이름을 참조하십시오.

```js
* {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
.container {
  width: 100%;
  height: 100vh;
}
.logo {
  position: absolute;
  top: 50px;
  left: 90px;
}
.sectionSearch {
  position: fixed;
  top: 50px;
  right: 90px;
  width: 170px;
  height: 45px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10% 10% 10% 10% / 50% 50% 50% 50%;
  box-shadow: 2px 2px 30px rgba(167, 158, 245, 0.2);
  box-sizing: border-box;
  z-index: 1;
  border: 1px solid rgba(167, 158, 245, 0.1);
}
.searchBox input {
  width: 90px;
  height: 20px;
  border: none;
  outline: none;
  background-color: transparent;
  color: #1f1f1f;
  font-size: 1rem;
  padding: 0px 10px;
}
firstSectinImage {
  position: absolute;
  left: 15%;
  top: 50%;
  transform: translate(-15%, -50%);
}
firstSectinImage img {
  height: 400px;
}
firstSectionHeading {
  position: absolute;
  top: 50%;
  left: 70%;
  transform: translate(-40%, -50%);
}
firstSectionHeading h1 {
  font-family: roboto, arial, helvetica;
  font-weight: bold;
  margin: 0px;
  line-height: 60px;
  font-size: 2.4rem;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
  color: #3d3d4a;
  text-transform: uppercase;
}
.letterSpacing {
  letter-spacing: 7px;
}
.firstSectionHeading span {
  color: #5b53ff;
}
.btnBuyNow {
  width: 150px;
  height: 40px;
  background-color: #2f2e41;
  box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10% 10% 10% 10% / 50% 50% 50% 50%;
  margin-top: 20px;
  color: #fff;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-weight: 600;
  letter-spacing: 0.5px;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
  border: transparent !important;
}
.btnBuyNow:hover {
  color: #fff;
  background-color: #5b53ff;
  transition: all ease 0.5s;
}
mediaIcons {
  position: fixed;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.2);
  padding: 1px 2px;
  z-index: 1;
}
mediaIcons a {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 15px;
  text-decoration: none;
}
mediaIcons a i {
  color: rgba(39, 39, 39, 0.8);
}
mediaIcons a:hover .fa-facebook-f {
  color: #5078cf;
}
mediaIcons a:hover .fa-twitter {
  color: #00acee;
}
mediaIcons a:hover .fa-instagram {
  color: #fd9217;
}
mediaIcons a:hover .fa-youtube {
  color: #ff0000;
}
```

<div class="content-ad"></div>

표 태그를 마크다운 형식으로 변경했어요.

<img src="/assets/img/2024-06-23-CreateaSimpleSinglePageWebsiteUsingHTMLandCSS_3.png" />

# 단계 05: 제품 섹션 추가

`section` 태그는 문서 내의 섹션을 정의합니다. 여기서 몇 가지 섹션을 추가했어요. 먼저, 제품 섹션입니다.

<div class="content-ad"></div>


# 제품 섹션
이곳은 새로운 제품 컬렉션을 소개하는 곳입니다.

- 베이비 걸 드레스
- 남성 블레이저 자켓
- 남성 소프트 플란넬 셔츠
- 여성 코트 테니스화
- 여성 스탠다드 셔츠 자켓
- 남성 패션 시계

각 제품은 각각의 가격과 함께 카트에 담을 수 있는 링크가 제공됩니다.

디자인된 CSS 스타일은 각 클래스 이름을 참조하도록 정의되어 있습니다.

이미지는 마크다운 형식에 맞게 추가되어 있습니다.

자세한 내용은 이미지를 참조해주세요.


<div class="content-ad"></div>

# 단계 05: 어바웃 섹션 추가

비즈니스/회사에 대한 섹션을 추가하는 것이 중요합니다. 따라서 몇 가지 세부 사항을 언급한 다음 섹션을 추가했습니다.

```js
  <section class="aboutCompany">
      <div class="aboutBox">
          <h1>Genotechies Clothes Inc.</h1>
          <h4>세계 모두를 위한 최신 패션 트렌드 <span>지금 구매하세요</span></h4>
          <p>세계 곳곳에 위치한 수천 개의 매장을 보유한 글로브 최대 패션 체인은 남성, 여성 및 아동을 위한 다양한 옷과 액세서리를 제공하기 위해 헌신되어 있습니다...</p>
      </div>
      <div class="aboutBox">
          <img src="Images/photo02.jpg">
      </div>
  </section>
```

```js
.aboutCompany {
    width: 85%;
    display: flex;
    margin: 50px auto;
    justify-content: space-around;
    align-items: center;
    padding: 30px;
    margin-bottom: 100px;
  }
  .aboutCompany span {
    color: #5b53ff;
  }
  .aboutBox {
    width: 40%;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  }
  .aboutBox img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .aboutBox h1 {
    color: #333333;
    font-weight: 700;
    font-size: 3rem;
    margin: 0;
  }
  .aboutBox h4 {
    color: #333333;
    font-weight: 400;
    font-size: 2rem;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .aboutBox p {
    font-size: 1rem;
    color: #bdbdbd;
    letter-spacing: 0.5px;
  }
```

<div class="content-ad"></div>


![Screenshot](/assets/img/2024-06-23-CreateaSimpleSinglePageWebsiteUsingHTMLandCSS_5.png)

# Step 06: 사용자 구독 섹션 추가

사용자들은 제품 업데이트를 받기 위해 웹 사이트의 이메일 주소를 사용하여 구독할 수 있습니다.

```js
    <section class="newsletter">
        <h3>새 제품 업데이트 구독</h3>
        <div class="inputEmail">
            <input type="email" placeholder="이메일을 입력하세요">
            <button type="submit" class="btnSend">전송</button>
        </div>
    </section>
```

<div class="content-ad"></div>

```js
.newsletter {
  width: 100%;
  height: 250px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid rgba(0, 0, 0, 0.03);
}
.newsletter h3 {
  font-size: 2rem;
  color: #565656;
}
.inputEmail {
  width: 500px;
  background-color: #fff;
  border-radius: 7% 7% 7% 7% / 50% 50% 50% 50%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 20px;
  box-shadow: 2px 5px 30px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
}
.inputEmail input {
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  background-color: transparent;
}
.btnSend {
  width: 120px;
  height: 40px;
  background-color: #202020;
  border-radius: 20px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-weight: bold;
  box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
}
.btnSend:hover {
  background-color: #6b60ec;
  transition: all ease 0.5s;
}
```

![Image](/assets/img/2024-06-23-CreateaSimpleSinglePageWebsiteUsingHTMLandCSS_6.png)

# Step 07: Footer section 추가하기

`footer` 태그는 문서나 섹션의 하단에 푸터를 정의합니다.

<div class="content-ad"></div>

```js
    <!-- Footer Section-->
    <footer class="footerSection">
        <div id="footerContanier">

            <div id="footerLogoLeft">
                GENOTECHIES CLOTHES
            </div>
            <div id="footerSocialIcon">
                <img src="Images/instagram-icon.png">
                <img src="Images/facebook-icon.png">
                <img src="Images/twitter-icon.png">
                <img src="Images/youtube-icon.png">
            </div>

            <div id="footerCenter">

                <h3>Contact Us</h3>
                <p><span>Tel:</span>061 765 342 122</p>
                <p><span>E-Mail:</span>hello@genotechies.com</p>
                <p><span>Web:</span>www.genotechies.com</p>
                <p><span>Adress:</span>427, Brisbain Road, Canel Street, CA, US</p>

            </div>

            <div id="footerRight">
                <h3>About Us</h3>
                <p>Globe biggest fashion chain with its thousands of outlets located world wide is dedicated to offer a wide array of Clothes and Accessories for Men, Women and Children</p>
            </div>
        </div>
    </footer>
```

```js
footer {
    width: 100%;
    height: 200px;
    background-color: #201f1f;
    background-size: cover;
    position: relative;
}

#footerContanier {
    width: 1526px;
    margin: auto;
    position: relative;
}

#footerContanier #footerLogoLeft {
    font-family: 'Pacifico', cursive;
    font-size: 25px;
    font-weight: bold;
    color: #ffffff;
    position: relative;
    left: 60px;
    display: inline-block;
}

#footerContanier #footerSocialIcon {
    position: relative;
    top: 100px;
    left: -220px;
    display: inline-block;
}

#footerContanier #footerSocialIcon img {
    width: 50px;
    height: 50px;
    cursor: pointer;
}

#footerContanier #footerSocialIcon img:hover {
    transform: scale(1.1);
}

#footerContanier #footerCenter {
    width: 430px;
    position: absolute;
    top: -10px;
    left: 545px;
    color: #ffffff;
    text-align: center;
}

#footerContanier #footerCenter h3,
#footerRight h3 {
    font-size: 40px;
    font-family: 'Righteous';
    border-bottom: 2px solid red;
    text-align: center;
    margin-bottom: 10px;
    padding-bottom: 5px;
}

#footerRight input:focus {
    border: 2px solid blue;
}

#footerContanier #footerCenter p {
    line-height: 30px;
}

#footerContanier #footerCenter p span {
    color: red;
    font-weight: 400;
    text-indent: 10px;
    margin-right: 10px;
}

#footerContanier #footerRight {
    width: 400px;
    left: 1030px;
    display: inline-block;
    position: absolute;
    top: -10px;
    color: white;
    text-align: center;
}

#footerContanier #footerRight p {
    padding: 10px;
    line-height: 30px;
    padding-bottom: 20px;
}

#footerContanier #footerRight input {
    margin-top: 10px;
    width: 280px;
    height: 28px;
    text-align: center;
    font-size: 15px;
}
```

<img src="/assets/img/2024-06-23-CreateaSimpleSinglePageWebsiteUsingHTMLandCSS_7.png" />

GitHub에서 이 작은 웹사이트 디자인을 찾아보세요.

<div class="content-ad"></div>

본 게시물이 유용하셨다면 아래의 👏 버튼을 눌러주세요! :)