---
title: "프론트엔드 개발자라면 반드시 알아야 하는 HTML 태그 30가지"
description: ""
coverImage: "/assets/img/2024-05-01-30HTMLTagstoknow_0.png"
date: 2024-05-01 23:09
ogImage: 
  url: /assets/img/2024-05-01-30HTMLTagstoknow_0.png
tag: Tech
originalTitle: "30 HTML Tags to know"
link: "https://medium.com/@zmactavish/30-html-tags-to-know-b0a85b122ded"
---


<img src="/assets/img/2024-05-01-30HTMLTagstoknow_0.png" />

저번 글에서 HTML 5로 시작하는 방법을 설명했어요. 시작하는 중이신 분들은 여기를 읽어보세요. 이번 글에서는 앞으로 제가 사용할 30가지 태그를 소개할 거예요.

- Doctype
문서 유형 선언은 HTML 파일의 첫 줄로, 우리 웹사이트가 어떤 버전의 HTML을 사용하는지 알려줍니다. 아래 단순한 한 줄로 HTML 파일을 시작할 수 있어요.

```js
<!DOCTYPE> 
```

<div class="content-ad"></div>

2. HTML
HTML 요소는 다큐먼트 선언 후에 작성되며 모든 HTML 코드를 감싸는 역할을 합니다. 때로는 루트 요소로도 알려져 있어요.

```js
<html>
```

3. Head
Head 요소는 HTML 페이지에서 뷰어에게 표시되는 콘텐츠가 아닌 모든 것을 감싸는 데 사용됩니다. 이에는 검색 결과에 나타날 키워드와 페이지 설명, 콘텐츠를 스타일링하는 CSS, 문자 세트 선언 등이 포함됩니다.

```js
<head></head>
```

<div class="content-ad"></div>

4. 제목
이것은 페이지의 제목을 설정합니다. 이는 페이지가 로드된 브라우저 탭에 표시되는 제목입니다. 페이지 제목은 북마크될 때 페이지를 설명하는 데도 사용됩니다. 이 문장을 Head 요소 안에 아래와 같이 작성할 수 있어요.

```js
<title>
```

5. 본문
body 태그에는 웹페이지에 나타날 모든 내용이 포함됩니다. 이에는 텍스트, 이미지, 비디오, 게임, 재생 가능한 오디오 트랙 또는 기타 모든 것이 포함됩니다. Head 태그로 둘러싸인 모든 콘텐츠 아래에 body 태그를 작성할 수 있어요.

```js
<body>
```

<div class="content-ad"></div>

6. H1부터 H6
HTML에서는 머리글을 6단계로 나눌 수 있습니다. H1로 표시하면 웹 브라우저가 이 정보가 페이지에서 가장 중요한 부분임을 인식합니다. H2는 그 다음으로 중요한 정보이며, 이와 같이 H6까지 계속됩니다. 글꼴 크기는 CSS로 결정하는 것이 좋으며, 정보 계층구조의 중요성을 웹 브라우저에 명확히 전달하기 위해 HTML 태그를 사용하는 것이 좋습니다.


7. P
P 태그는 문단을 의미합니다. 이 태그 사이에는 정보의 문단을 저장합니다.



<div class="content-ad"></div>

8. 줄 바꿈
줄 바꿈 태그는 단락이나 제목 텍스트에서 줄 바꿈을 생성하는데 사용됩니다.

```html
<br>
```

9. HTML 코드 주석 처리하기
HTML 코드에 주석을 달아주는 것은 파일이 어떻게 구성되어 있는지 다른 개발자들에게 전달하는 중요한 단계입니다. 이 코드는 브라우저에 나타나지 않습니다. 주석을 사용하는 것은 코드를 읽기 쉽게 유지하기 위한 프로그래밍 전반에 걸쳐 중요한 단계입니다. 주석을 달기 위해 양쪽에 각각 두 개의 대시로 작성합니다.

```html
<!--이렇게 코드에 주석을 달 수 있습니다--> 
```

<div class="content-ad"></div>

10. 굵게 
텍스트를 굵게 표시합니다.

```js
<strong>굵은 텍스트</strong>
```

11. Div
Division 태그는 아마도 HTML에서 가장 많이 사용되는 태그 중 하나입니다. 콘텐츠 섹션을 감싸기 위해 사용됩니다. Div 요소는 페이지 요소의 블록 레벨 조직 및 스타일링에 사용됩니다.

```js
<div></div>
```

<div class="content-ad"></div>

12. 헤더
헤더 요소는 소개 콘텐츠나 탐색 링크 모음을 담는 컨테이너를 나타냅니다.

```js
<header></header>
```

13. 푸터
푸터 요소는 저작자 정보, 저작권 정보, 연락처 정보, 사이트맵, 맨 위로 가기 링크 및 관련 문서와 같은 정보를 담는 컨테이너를 나타냅니다.

```js
<footer></footer>
```

<div class="content-ad"></div>

14. Main
문서의 주요 콘텐츠를 지정합니다.

```js
<main></main>
```

15. Details
사용자가 볼 수 있거나 숨길 수 있는 추가 정보를 정의합니다. 클릭하면 더 많은 정보를 공유하는 드롭다운 상자를 만듭니다.

```js
<details></details>
```

<div class="content-ad"></div>

16. 요약
`details` 요소에 대한 표시 제목을 정의합니다.

```js
<summary></summary>
```

17. 문서
문서를 정의합니다.

```js
<article></article>
```

<div class="content-ad"></div>

18. 약어 또는 두문자어
HTML은 브라우저에게 약어가 무엇을 의미하는지 알려주는 `abbr` 태그를 제공합니다. 이는 접근성이 좋은 웹사이트를 위해 유용합니다. 웹사이트 방문자들은 제목 속성에 있는 텍스트를 보지 못하지만 브라우저, 검색 엔진 및 보조 기술은 이 정보를 사용합니다. 아래 코드는 "이 웹사이트는 HTML에 관한 모든 것입니다"라는 텍스트 줄을 출력합니다.

```js
This website is all about <abbr title="하이퍼텍스트 마크업 언어">HTML</abbr>.
```

19. 주소
`address` 태그는 사람이나 조직의 연락 정보를 나타내는 웹사이트 섹션을 감싸는 데 유용합니다. 만약 `address` 태그가 `body` 태그 내에서 사용되면 문서의 연락 정보를 나타내고, `address` 태그가 `article` 태그 내에서 사용되면 기사의 연락 정보를 나타냅니다.

```js
<address>
기관명: MacTavish Designs <br>
웹 사이트:
<a href="https://zackmactavish.github.io/MacTavish/">
Zack MacTavish</a><br>
포틀랜드, 오레곤
</address>
```

<div class="content-ad"></div>

20. 스팬
스팬은 디브와 비슷하지만, 스팬 요소는 인라인 구성 및 스타일링에 사용됩니다.

```js
<span></span>
```

21. 스크립트
스크립트 태그는 자바스크립트 또는 다른 클라이언트 측 스크립트를 프로젝트에 추가하는 방법입니다.

```js
<script></script>
```

<div class="content-ad"></div>

22. No Script
스크립트를 사용할 수 없는 경우 대체 콘텐츠를 표시하기 위해 no script 태그를 사용합니다.

```js
<noscript>당신의 브라우저는 자바스크립트를 지원하지 않습니다!</noscript>
```

23. Image
img 태그는 브라우저에 이미지를 표시하는 데 사용됩니다. src, alt, height, width와 같은 속성을 추가할 수 있습니다. src 속성은 이미지가 저장된 위치를 가리키고 브라우저에 이미지를 표시하기 위해 가져옵니다. alt 속성은 이미지에 대한 메타 설명 텍스트를 추가할 수 있어 브라우저에 표시되지 않습니다.

```js
<img src = "new.svg" alt = "craft" height = "100px" width = "100px" />
```

<div class="content-ad"></div>

24. 순서 없는 목록
목록 항목을 배치할 수있는 순서 없는 목록을 정의합니다.

```js
<ul></ul>
```

25. 순서 있는 목록
목록 항목을 배치할 수있는 순서 있는 목록을 정의합니다.

```js
<ol></ol>
```

<div class="content-ad"></div>

26. 목록 항목
순서가 없는 목록이나 순서가 있는 목록에 위치할 수 있는 목록 항목을 정의합니다. 아래에 순서가 없는 목록에 애완 동물의 예시를 보여드리겠습니다.

```js
- 강아지
- 고양이
- 거북이
```

27. 하이퍼링크
HTML 페이지에 하이퍼링크를 추가하려면 `a` 태그로 묶어주면 됩니다. 이를 통해 href 속성을 얻어 링크를 지정할 수 있습니다. 만약 하이퍼링크를 새 탭에서 열고 싶다면 target="_blank" 속성을 추가할 수 있습니다.

```js
[a here](https://www.w3schools.comhttps://zackmactavish.github.io/MacTavish/){:target="_blank"}: 내 웹사이트 방문하기!
```

<div class="content-ad"></div>

28. Nav

`nav` 태그는 네비게이션 링크 세트를 정의합니다. 모든 링크가 `nav` 요소 내에 있어야 하는 것은 아님을 주의하세요. `nav` 요소는 주요 네비게이션 링크 블록에만 사용됩니다. 스크린 리더와 같은 브라우저는 이 요소를 사용하여 해당 콘텐츠의 초기 렌더링을 생략할지 여부를 결정할 수 있습니다.


```html
<nav></nav>
```

29. Button

이 태그는 웹 페이지에 클릭 가능한 버튼을 배치합니다.


```html
<button type="button">Click Me!</button>
```

<div class="content-ad"></div>

30. 양식
`form` 태그는 사용자 입력을 위한 HTML 양식을 만들 때 사용됩니다. 이는 설문조사, 로그인 페이지 또는 회원 가입 등 여러 목적으로 사용될 수 있습니다.

```js
<form></form>
```

`form` 요소는 다음과 같은 양식 요소 중 하나 이상을 포함할 수 있습니다:

- `input`
- `textarea`
- `button`
- `select`
- `option`
- `optgroup`
- `fieldset`
- `label`
- `output`

<div class="content-ad"></div>

지금까지 읽어 주셔서 감사합니다! 추가 콘텐츠를 만들어 HTML 페이지를 작성할 것이며, 폼을 만들고 다른 태그를 구현하는 것을 더 살펴볼 것입니다. 저의 향후 포스트를 보려면 구독해주세요!