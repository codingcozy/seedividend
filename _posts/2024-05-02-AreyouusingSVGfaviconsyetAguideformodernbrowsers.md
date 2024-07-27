---
title: "이제는 SVG 파비콘을 써야할 시대, PNG 파비콘은 쓰지 마세요"
description: ""
coverImage: "/assets/img/2024-05-02-AreyouusingSVGfaviconsyetAguideformodernbrowsers_0.png"
date: 2024-05-02 00:29
ogImage: 
  url: /assets/img/2024-05-02-AreyouusingSVGfaviconsyetAguideformodernbrowsers_0.png
tag: Tech
originalTitle: "Are you using SVG favicons yet? A guide for modern browsers."
link: "https://medium.com/swlh/are-you-using-svg-favicons-yet-a-guide-for-modern-browsers-836a6aace3df"
---


![이미지](/assets/img/2024-05-02-AreyouusingSVGfaviconsyetAguideformodernbrowsers_0.png)

현재 모든 최신 브라우저에서 SVG 파비콘을 지원하고 있습니다.

그리고 아마 여러 프로젝트에서 복사하고 붙여넣는 이 모든 아이콘 링크와 크기들이 필요 없을지도 모르겠어요. 단어마다 어떤 것이 정말로 필수적인지 알아봅시다.

![이미지](/assets/img/2024-05-02-AreyouusingSVGfaviconsyetAguideformodernbrowsers_1.png)

<div class="content-ad"></div>

# 아이콘

주요 파비콘은 임의 크기의 SVG 파일을 사용할 수 있습니다. type="image/svg+xml"은 필요하지 않습니다.

```js
<link rel="icon" href="favicon.svg">
```

# 마스크 아이콘

<div class="content-ad"></div>

Safari의 경우 조금 다릅니다. mask-icon을 추가해야 합니다. SVG 형식이지만 하나의 색상으로 이루어져 있어야 하며 투명 배경에 배치되어야 합니다. 브라우저가 속성의 색상을 추가합니다.

```js
<link rel="mask-icon" href="mask-icon.svg" color="#000000">
```

# 터치 아이콘

iOS 기기 및 브라우저의 즐겨찾기 새 탭 페이지에 대한 아이콘입니다. 180 x 180 크기만 필요하며 sizes 속성은 불필요합니다.

<div class="content-ad"></div>


<link rel="apple-touch-icon" href="apple-touch-icon.png">


# 매니페스트

manifest.json은 웹 앱이나 웹 사이트에 대한 정보를 제공합니다. 이 줄들은 라이트하우스 테스트를 통과하는 데 필요합니다. 연결된 아이콘은 안드로이드와 크롬에서 사용됩니다. 최대 크기인 512 x 512만 필요합니다.

```js
{
    "name": "Starter",
    "short_name": "Starter",
    "icons": [{
        "src": "google-touch-icon.png",
        "sizes": "512x512"
    }],
    "background_color": "#ffffff",
    "theme_color": "#ffffff",
    "display": "fullscreen"
}
```

<div class="content-ad"></div>

안녕하세요! Android의 Chrome 브라우저 색상을 설정할 때 여전히 theme-color 메타 태그가 필요합니다.

```js
<meta name="theme-color" content="#ffffff">
```

# 완료

현재의 모던 브라우저를 위해 필요한 모든 아이콘들이 여기에 있습니다. 그 외에는 불필요합니다. Windows 타일에 다른 아이콘을 원할 경우에만 msapplication-TileImage를 추가할 수 있지만, 그렇지 않으면 apple-touch-icon이 사용됩니다. TileColor는 더 이상 사용되지 않습니다.

<div class="content-ad"></div>

# 그 외

아쉽게도 아직 모든 사람이 최신 브라우저를 사용하는 것은 아니지만, 웹사이트 루트에 32 x 32 favicon.ico 파일을 추가함으로써 쉽게 해결할 수 있습니다. 이 방법은 어디에서나 작동하며, 심지어 할머니도 사용할 수 있습니다.

![이미지](/assets/img/2024-05-02-AreyouusingSVGfaviconsyetAguideformodernbrowsers_2.png)

# 다크 모드

<div class="content-ad"></div>

끝내는 팁 하나 더 드릴게요. 다크 모드에 대한 조언이에요. SVG 파비콘의 장점 중 하나는 CSS로 색상을 변경할 수 있다는 거예요. prefers-color-scheme 미디어 쿼리를 사용하면 사용자의 다크 또는 라이트 모드에 맞게 파비콘의 색상을 변경할 수 있어요. 하지만 이 방법은 mask-icon에는 동작하지 않아요. 왜냐하면 색상이 해당 속성에 포함되어 있기 때문이죠. Safari는 충분한 대비가 없을 경우 흰색 배경을 추가해줘요.

```js
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
    <style>
        path {
            fill: #000;
        }
        @media (prefers-color-scheme: dark) {
            path {
                fill: #fff;
            }
        }
    </style>
    <path fill-rule="evenodd" d="M0 0h16v16H0z"/>
</svg>
```

<img src="/assets/img/2024-05-02-AreyouusingSVGfaviconsyetAguideformodernbrowsers_3.png" />

# 결과

<div class="content-ad"></div>

여기 최종 결과입니다. 웹사이트의 `head`에 복사하고 루트에 favicon.ico를 두지 않도록 잊지 마세요. ✌️

```js
<meta name="theme-color" content="#ffffff">
<link rel="icon" href="favicon.svg">
<link rel="mask-icon" href="mask-icon.svg" color="#000000">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="manifest" href="manifest.json">
```