---
title: "CSS 배경 속성 9가지 완벽 정리"
description: ""
coverImage: "/assets/img/2024-06-23-Engineering9BackgroundpropertiesinCSS_0.png"
date: 2024-06-23 14:24
ogImage: 
  url: /assets/img/2024-06-23-Engineering9BackgroundpropertiesinCSS_0.png
tag: Tech
originalTitle: "Engineering: 9 Background properties in CSS"
link: "https://medium.com/@naqvishahwar120/engineering-9-background-properties-in-css-c9be68206ffe"
isUpdated: true
---




공학 (CSS)

![Engineering9BackgroundpropertiesinCSS_0](/assets/img/2024-06-23-Engineering9BackgroundpropertiesinCSS_0.png)

# 어떤 속성들이 있을까요?

- background-color
- background-image
- background-repeat
- background-position
- background-size
- background-attachment
- background-origin
- background-clip
- background (shorthand)

<div class="content-ad"></div>

# 배경색:

- 요소의 배경색을 설정합니다.

![Engineering9BackgroundpropertiesinCSS_1](/assets/img/2024-06-23-Engineering9BackgroundpropertiesinCSS_1.png)

![Engineering9BackgroundpropertiesinCSS_2](/assets/img/2024-06-23-Engineering9BackgroundpropertiesinCSS_2.png)

<div class="content-ad"></div>

# 배경 이미지:

- 요소의 배경 이미지를 설정합니다.

![배경 이미지](/assets/img/2024-06-23-Engineering9BackgroundpropertiesinCSS_3.png)

- 이미지 링크는 어디서 가져왔나요?

<div class="content-ad"></div>


![output](/assets/img/2024-06-23-Engineering9BackgroundpropertiesinCSS_4.png)

- 결과물은 무엇입니까?

![output](/assets/img/2024-06-23-Engineering9BackgroundpropertiesinCSS_5.png)

- 반복된 부분이 있습니다. 다음 속성으로 넘어가 봅시다.


<div class="content-ad"></div>

# background-repeat

- 배경 이미지가 반복되는 방식을 지정합니다.
- 다음 중 하나가 할당될 수 있습니다: background-repeat: repeat|repeat-x|repeat-y|no-repeat|space|round;
- 몇 가지를 살펴봅시다.

![image1](/assets/img/2024-06-23-Engineering9BackgroundpropertiesinCSS_6.png)

![image2](/assets/img/2024-06-23-Engineering9BackgroundpropertiesinCSS_7.png)

<div class="content-ad"></div>


![Engineering9BackgroundpropertiesinCSS_8](/assets/img/2024-06-23-Engineering9BackgroundpropertiesinCSS_8.png)

![Engineering9BackgroundpropertiesinCSS_9](/assets/img/2024-06-23-Engineering9BackgroundpropertiesinCSS_9.png)

![Engineering9BackgroundpropertiesinCSS_10](/assets/img/2024-06-23-Engineering9BackgroundpropertiesinCSS_10.png)

![Engineering9BackgroundpropertiesinCSS_11](/assets/img/2024-06-23-Engineering9BackgroundpropertiesinCSS_11.png)


<div class="content-ad"></div>

# 배경 위치

- 배경 이미지의 초기 위치를 설정합니다.
- 값:
  - 키워드: top, bottom, left, right, center
  - 길이 값: px, em 등
  - 백분율 값: 50% 50% (수평 수직)

![이미지1](/assets/img/2024-06-23-Engineering9BackgroundpropertiesinCSS_12.png)

![이미지2](/assets/img/2024-06-23-Engineering9BackgroundpropertiesinCSS_13.png)

<div class="content-ad"></div>


![Engineering9BackgroundpropertiesinCSS_14](/assets/img/2024-06-23-Engineering9BackgroundpropertiesinCSS_14.png)

![Engineering9BackgroundpropertiesinCSS_15](/assets/img/2024-06-23-Engineering9BackgroundpropertiesinCSS_15.png)

![Engineering9BackgroundpropertiesinCSS_16](/assets/img/2024-06-23-Engineering9BackgroundpropertiesinCSS_16.png)

![Engineering9BackgroundpropertiesinCSS_17](/assets/img/2024-06-23-Engineering9BackgroundpropertiesinCSS_17.png)


<div class="content-ad"></div>

# 배경 크기:

- 배경 이미지의 크기를 지정합니다.

```js
background-size: 너비 높이;
```

- 값:
  - auto (기본값): 원본 크기 유지
  - cover: 이미지를 가능한 한 크게 확대하여 배경 영역을 완전히 덮음
  - contain: 이미지를 너비와 높이가 콘텐츠 영역에 모두 맞을 수 있는 가장 큰 크기로 조절
  - 길이 값: px, em 등
  - 백분율 값: 100% 50% (너비 높이)
  
- 예시:

<div class="content-ad"></div>

```js
배경 크기: cover;
배경 크기: 100px 50px;
배경 크기: 50% 50%;
```

# 배경 첨부:

- 배경 이미지가 고정되어 있는지 아니면 페이지의 나머지와 함께 스크롤되는지를 지정합니다.

```js
배경 첨부: scroll|fixed|local;
```

<div class="content-ad"></div>

- 값:
  - scroll (기본값): 배경 이미지가 콘텐츠와 함께 스크롤됩니다.
  - fixed: 배경 이미지가 뷰포트에 대해 고정됩니다.
  - local: 배경 이미지가 요소 콘텐츠와 함께 스크롤됩니다.
- 예시,

```js
background-attachment: fixed;
```

# background-origin:

- 배경 이미지의 위치 지정 영역을 지정합니다.
- 값:
  - padding-box (기본값): 배경이 패딩 상자에 상대적으로 위치합니다.
  - border-box: 배경이 테두리 상자에 상대적으로 위치합니다.
  - content-box: 배경이 콘텐츠 상자에 상대적으로 위치합니다.
- 문법 및 예시,

<div class="content-ad"></div>

```js
background-origin: padding-box|border-box|content-box;
```

# background-clip:

- 배경의 그리기 영역을 지정합니다.
- 예시

<img src="/assets/img/2024-06-23-Engineering9BackgroundpropertiesinCSS_18.png" />

<div class="content-ad"></div>


![Engineering Background](/assets/img/2024-06-23-Engineering9BackgroundpropertiesinCSS_19.png)

# background:

- The background property is a shorthand for setting all background properties in one declaration.
- background: color image position/size repeat attachment origin clip;
- Example,

```js
background: #ff0000 url('background.jpg') no-repeat center/cover fixed content-box border-box;
``` 
