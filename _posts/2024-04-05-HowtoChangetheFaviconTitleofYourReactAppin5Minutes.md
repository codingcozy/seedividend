---
title: "React 앱의 파비콘과 타이틀을 변경하는 가장 빠른 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "How to Change the Favicon , Title of Your React App in 5 Minutes"
link: "https://medium.com/@leahcardoz/how-to-change-the-favicon-title-of-your-react-app-in-5-minutes-9163e023b8d2"
---



<img src="/assets/img/HowtoChangetheFavicon-TitleofYourReactAppin5Minutes_0.png" />

제 코딩 부트캠프 프로젝트를 형님이신 시니어 소프트웨어 엔지니어 형에게 보여줬는데, 형이 한 말이 "다음에 파비콘과 제목을 변경해야 해." 였어요.

... 파비콘? 나는 그게 무엇인지 몰랐어요. 빠른 구글 검색으로 알았는데, 브라우저 탭의 파비콘과 제목이 여기에 나타날 수 있다고 하더라구요:

<img src="/assets/img/HowtoChangetheFavicon-TitleofYourReactAppin5Minutes_1.png" />

<div class="content-ad"></div>

원래 제목을 편집하고 React 앱에 기본으로 제공되는 파비콘을 바꾸는 작업은 어렵게 느꼈어요... 하지만 약간의 구글링과 실험 끝에 5분 이내에 둘 다 변경하는 법을 알아내게 됐어요. 여기에 간단히 설명하겠습니다:

## 제목 변경하기

- 코드 에디터에서 index.html 파일 (public/index.html)을 엽니다:

![이미지](/assets/img/HowtoChangetheFavicon-TitleofYourReactAppin5Minutes_2.png)

<div class="content-ad"></div>

2. 헤드 태그 안에서 타이틀 태그를 찾아보세요… 다음과 같아야 합니다:

```js
<title>React App</title>
```

3. 'React App'을 앱에 원하는 제목으로 바꿔주세요. 예를 들어 '할 일 목록'으로:

```js
<title>할 일 목록</title>
```

<div class="content-ad"></div>

4. 변경 사항을 코드 편집기에 저장하고 브라우저 탭을 새로고침하면 새 제목이 표시됩니다!:

![이미지](/assets/img/HowtoChangetheFavicon-TitleofYourReactAppin5Minutes_3.png)

## 파비콘 변경

- 코드 편집기에서 React 앱의 public 폴더에서 파비콘 파일을 찾아보세요... 이름은 'favicon.ico'입니다:

<div class="content-ad"></div>

![파비콘 변경하는 법 - React 앱의 제목을 5분 안에 바꾸는 방법](/assets/img/HowtoChangetheFavicon-TitleofYourReactAppin5Minutes_4.png)

2. 파비콘 파일 삭제하기: ‘favicon.ico’를 우클릭하고 ‘삭제’를 클릭합니다.

3. 기본 React 파비콘을 바꿀 새로운 파비콘 찾기. 아이콘/이모지를 구글 이미지 검색하여 마음에 드는 이미지를 컴퓨터 어딘가에 저장하세요. .png 형식이고 배경이 투명한 이미지를 찾는 것이 좋습니다. 이 ‘할 일 목록’ 예시에서는 녹색 체크 아이콘을 찾아 데스크탑에 저장했습니다.

![파비콘 변경하는 법 - React 앱의 제목을 5분 안에 바꾸는 방법](/assets/img/HowtoChangetheFavicon-TitleofYourReactAppin5Minutes_5.png)

<div class="content-ad"></div>

4. 저장된 이미지를 코드 편집기의 공용 폴더로 끌어다 놓으세요:

![이미지](/assets/img/HowtoChangetheFavicon-TitleofYourReactAppin5Minutes_6.png)

5. 방금 추가한 이미지 파일을 마우스 오른쪽 버튼으로 클릭한 다음 '이름 바꾸기'를 클릭하여 전체 파일 이름(.png 확장자 포함)을 'favicon.ico'로 바꿔주세요:

![이미지](/assets/img/HowtoChangetheFavicon-TitleofYourReactAppin5Minutes_7.png)

<div class="content-ad"></div>

6. 코드 편집기에서 변경 사항을 저장한 후 브라우저 탭을 새로고침하면 새 파비콘과 새 제목이 나타납니다!:

![이미지](/assets/img/HowtoChangetheFavicon-TitleofYourReactAppin5Minutes_8.png)
