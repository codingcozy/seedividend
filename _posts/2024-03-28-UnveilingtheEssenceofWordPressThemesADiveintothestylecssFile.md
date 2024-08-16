---
title: "워드프레스 테마 stylecss 파일 커스텀 하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Unveiling the Essence of WordPress Themes A Dive into the stylecss File"
link: "https://medium.com/@andisyafrianda/unveiling-the-essence-of-wordpress-themes-a-dive-into-the-style-css-file-4095236ca548"
isUpdated: true
---





![이미지](/assets/img/UnveilingtheEssenceofWordPressThemesADiveintothestylecssFile_0.png)

안녕하세요! 워드프레스 테마의 핵심인 style.css 파일로의 여정에 오신 것을 환영합니다. 이 파일은 여러분의 테마의 중요 데이터를 설정하는 데 사용되며 워드프레스 생태계 내에서 테마의 정체성을 설정하는 데도 귀중한 역할을 합니다. 오늘은 style.css 파일 헤더를 마스터하고, 우리가 사용할 수 있는 다양한 헤더 필드의 보물창고를 발견하며, 자식 테마를 원본과 원활하게 연결하는 퀘스트에 돌입할 것입니다. 함께 깊이 들어가볼 준비가 되셨나요? 시작해봐요.

style.css 파일 헤더 작성: 테마의 여권

모든 워드프레스 테마의 핵심에는 style.css 파일이 있습니다. 이 파일은 워드프레스와 사용자에게 테마를 소개하는 필수 스타일시트입니다. 이 파일의 시작 주석 안에서 마법이 일어납니다. 여기에서 테마의 DNA를 설명합니다. 우리는 기본 워드프레스 2024 테마의 style.css 헤더를 살펴볼 것입니다:

<div class="content-ad"></div>

```js
/*
테마 이름: Twenty Twenty-Four
테마 URI: http://example.com/twentytwentyfour/
제작자: 워드프레스 팀
제작자 URI: https://wordpress.org/
설명: 깔끔하고 현대적이며 매우 사용자 정의 가능한 새로운 워드프레스 테마입니다.
버전: 1.0
라이센스: GNU 일반 공중 사용 허가서 v2 이상
라이센스 URI: http://www.gnu.org/licenses/gpl-2.0.html
텍스트 도메인: twentytwentyfour
태그: 한 열, 두 열, 오른쪽 사이드바, 유연한 헤더
*/
```

워드프레스 대시보드로 이동하여 "외관 `테마`" 섹션에 진입하면 우리의 style.css 헤더에 있는 각 정보가 테마 상세 정보 뷰에서 우리의 테마에 대한 자세한 설명을 그려냅니다. 테마 이름부터 설명 및 태그에 이르기까지 각 필드가 목적을 가지고 있습니다.

style.css 헤더 필드 해독

style.css 파일의 헤더 필드를 이해하는 것은 소설을 쓰기 전 알파벳을 마스터하는 것과 유사합니다. 여기 해설입니다.

<div class="content-ad"></div>

- 테마 이름: 당신의 테마의 고유 식별자. 신중하게 선택하세요; 사용자가 처음으로 보는 것입니다.
- 테마 URI: 당신의 테마에 대한 자세한 내용이 담긴 웹페이지의 URL.
- 저자: 당신이에요! 또는 당신의 이름이나 팀 이름.
- 저자 URI: 저자에 대한 더 많은 통찰력을 제공하는 URL.
- 설명: 당신의 테마가 제공하는 매력적인 요약.
- 적어도 필요한 버전: 당신의 테마가 지원하는 최소한의 WordPress 버전.
- 최대로 테스트된 버전: 당신이 테마를 테스트한 최신의 WordPress 버전.
- 필요한 PHP: 당신의 테마가 필요로 하는 최소 PHP 버전.
- 버전: 당신의 테마의 현재 버전.
- 라이선스 및 라이선스 URI: 당신의 테마 라이선싱에 대한 세부 정보.
- 텍스트 도메인: 번역에 사용됨; 소문자로 유지하세요.
- 태그: 당신의 테마 기능을 보여주는 쉼표로 구분된 목록.

부모-자식 테마 관계 육성

자식 테마로 진출하면 테마 개발의 섬세한 계층을 소개하여 부모 테마의 기능을 상속하고 확장할 수 있는 기회를 제공합니다. 이 계보를 수립하려면 자식 테마의 style.css에 Template 헤더 필드를 추가해야 합니다:

```js
/*
 Theme Name:   Twenty Twenty-Four Child
 Description:  Twenty Twenty-Four 테마의 자식 테마
 Author:       당신의 이름
 Template:     twentytwentyfour
*/
```

<div class="content-ad"></div>

이 중요한 줄은 부모 테마의 유산을 우아하게 계승하고 강화하여 자식 테마가 연결되도록합니다.
