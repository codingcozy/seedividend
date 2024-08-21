---
title: "HTML과 CSS를 사용하여 반응형 헤더를 만드는 방법"
description: ""
coverImage: "/assets/img/2024-06-19-HowtocreatearesponsiveheaderusingHTMLandCSS_0.png"
date: 2024-06-19 22:43
ogImage:
  url: /assets/img/2024-06-19-HowtocreatearesponsiveheaderusingHTMLandCSS_0.png
tag: Tech
originalTitle: "How to create a ‘responsive header’ using HTML and CSS ?"
link: "https://medium.com/@ilhanbal577/how-to-create-a-responsive-header-using-html-and-css-929b087e38d0"
isUpdated: true
---

<img src="/assets/img/2024-06-19-HowtocreatearesponsiveheaderusingHTMLandCSS_0.png" />

안녕하세요, 이 기사에서는 웹사이트 구축시 필수 요소 중 하나 인 반응형 헤더를 만드는 방법에 대해 이야기하겠습니다. 이 기사에서 모든 코드와 세부 정보를 찾을 수 있습니다.

```js
<div class="hero">
  <nav>
    <nav>
      <h2 class="logo">
        İlhan <span>Bal</span>
      </h2>
    </nav>
  </nav>
</div>
```

우선, 코드를 body 태그 사이에 작성합니다. 첫 번째 단계에서 고유한 클래스 이름을 가진 div 태그를 만듭니다. 이 div 태그 내부에 2개의 nav 태그를 엽니다. 두 번째 nav 태그 내에서 로고를 추가하기 위해 고유한 클래스 이름을 가진 h2인 서브 태그를 생성합니다. 여기서 h2 태그를 사용했지만, 선호하는 경우 h1, h3 등을 사용할 수 있습니다.

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

![이미지](/assets/img/2024-06-19-HowtocreatearesponsiveheaderusingHTMLandCSS_1.png)

다음으로 진행하기 전에, 코드 블록에 요소들을 포함해야 합니다. 이를 위해 정렬되지 않은 목록 태그인 ul을 사용할 것입니다.

```js
<div class="hero">
  <nav>
    <nav>
      <h2 class="logo">
        İlhan <span>Bal</span>
      </h2>
    </nav>
    <ul>
      <li class>
        <a href="yeni.html">Home</a>
      </li>
      <li class>
        <a href="about.html">About</a>
      </li>
      <li class>
        <a href="contact.html">Contact</a>
      </li>
      <li class>
        <a href="galeri.html">Gallery</a>
      </li>
    </ul>
  </nav>
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

위의 코드 블록에서 볼 수 있듯이, 우리는 ul 클래스를 생성하고 요소를 추가했습니다. 우리의 요소는 홈, 소개, 연락처 및 갤러리입니다. 사용자가 마우스로 클릭하면 이러한 페이지로 이동하기 위해 요소 수만큼의 HTML 사본을 만들고 요소 이름에 따라 이름을 지정합니다. 그런 다음 href="about.html"과 같이 링크를 제공합니다.

![이미지](/assets/img/2024-06-19-HowtocreatearesponsiveheaderusingHTMLandCSS_2.png)

우리의 출력물은 이렇게 보여야 합니다.

페이지 오른쪽 상단에 있는 버튼과 같은 버튼을 만들려면 “button” 클래스 이름을 가진 버튼을 생성합니다.

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

Our HTML code block is completed. Now we can use CSS to enhance the appearance of our page.

In the second step, create a file with a .css extension. To link our existing HTML file with the CSS file we created, place the following code block between the head tags of our HTML page.

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>İlhan Bal</title>

  <link rel="stylesheet" href="app.css" />
</head>
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

이렇게 하면 CSS 파일에서의 업데이트가 페이지에 반영되는 것을 확인할 수 있습니다.

```js
*{
    margin: 0;
    padding:0;
    box-sizing: border-box;
    font-family: 'Poppins' , sans-serif;
}
.hero{
    height: 100vh;
    width: 100%;
    padding-right: 111px;
}
nav{
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
    padding-left: 5%;
    padding-right: 10%;
}
.logo{
    color: white;
    font-size: 32px;
    margin-top: 0px;
}
span{
    color: #4070f4;
}
nav ul li{
    margin-top: 32px;
    display:inline-block;
    list-style-type: none;
    padding: 10px 20px;
}
nav ul li a{
    color: white;
    text-decoration: none;
    font-weight: bold;
    align-items: center;
}

button{
    margin-top: 32px;
    border: none;
    background: #4070f4;
    padding: 2px 30px;
    border-radius: 30px;
    color: white;
    font-weight: bold;
    font-size: 15px;
    transition: .4s;
}
```

홈, 소개, 연락처 및 갤러리 요소 위에 마우스를 올리면 텍스트 색상과 커서를 변경하는 추가 단계를 적용해야 하며, 구독 버튼 위에 마우스를 올리면 커질 수 있도록 하고 다시 작아져야 합니다.

```js
nav ul li a:hover{
    color: #4070f4;
    transition: .3s;
}

button:hover{
    transform: scale(1.1);
    cursor: pointer;
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

프로젝트가 완료되었습니다. HTML과 CSS를 사용하여 반응형 헤더를 완성했습니다. 이제 라이브 미리보기를 확인해보세요.

이 튜토리얼은 여기까지입니다. 유용하게 활용하셨기를 바라겠습니다.

이제 HTML과 CSS를 사용하여 성공적으로 반응형 헤더를 만들었습니다. 이 프로젝트를 직접 사용하려면 IDE에 복사하세요. 프로젝트를 이해했기를 바라며, 의문이 있으시면 언제든지 댓글을 달아주세요!

독자 여러분, 읽어주셔서 감사합니다!

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

태그를 마크다운 형식으로 바꿔보세요.

| follow : @ilhanbal577

| Written By : İlhan Bal

| Code by : İlhan Bal

# 웹사이트 안에 헤더 섹션을 넣는 장점은 무엇인가요?

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

- 헤더는 웹 사이트의 여러 섹션을 이동하는 데 사용될 수 있습니다.
- 헤더는 다른 섹션 링크를 포함하는 컨테이너입니다.
- 사용 편의성을 제공합니다.
- 시간을 절약할 수 있습니다.

## 헤더는 반응형인가요?

네, 헤더는 반응형으로서 화면 크기에 따라 헤더의 크기를 조절합니다.

## 웹 사이트 내에서 헤더의 목적은 무엇인가요?

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

헤더는 사용자 상호작용을 촉진하고 편안한 환경을 제공합니다.
