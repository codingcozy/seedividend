---
title: "초보 퍼블리셔를 위한 HTML 완벽 가이드"
description: ""
coverImage: "/assets/img/2024-05-02-AComprehensiveGuidetoHTMLforBeginners_0.png"
date: 2024-05-02 00:58
ogImage: 
  url: /assets/img/2024-05-02-AComprehensiveGuidetoHTMLforBeginners_0.png
tag: Tech
originalTitle: "A Comprehensive Guide to HTML for Beginners"
link: "https://medium.com/@4csanctuary/a-comprehensive-guide-to-html-for-beginners-2e44180c887b"
isUpdated: true
---




<img src="/assets/img/2024-05-02-AComprehensiveGuidetoHTMLforBeginners_0.png" />

# 목차

- 소개
- HTML이란 무엇인가?
- HTML 작성 방법
- HTML 문서 구조
- HTML 요소의 구성
- 일반적인 HTML 태그
- 일반적인 HTML 속성
- 첫 번째 HTML 파일 만들기
- 추가 학습 자료
- 결론

# 소개

<div class="content-ad"></div>

개발자 여정을 시작하면 웹사이트의 기본 구조를 만드는 데 도움이 되는 HTML을 이해하는 것이 중요합니다. HTML은 온라인 리소스 간의 링크 지원을 위해 만들어졌으며 이는 웹을 구축하는 혁명적인 단계로 작용했습니다.

그러나 웹 개발의 맥락에서 HTML은 웹사이트의 내용과 관련이 있습니다. 웹페이지에 뼈대와 구조를 제공하는 뼈대 역할을 수행한다고 생각해보세요. HTML을 잘 이해하면 CSS로 스타일을 지정하고 JavaScript로 조작할 수 있는 기능적인 웹사이트를 만들 수 있습니다.

2024년 현재 95% 이상의 웹사이트가 HTML을 사용하고 있습니다.

본 문서는 HTML에 대한 포괄적인 안내서 역할을 하며, HTML의 기본 개념, HTML 작성 방법, 일반적인 태그와 속성, HTML 파일 작성 및 HTML 코딩에 사용되는 일반 텍스트 편집기에 대한 안내, 마지막으로 HTML 학습에 도움이 되는 추가 자료를 제공할 것입니다.

<div class="content-ad"></div>

# HTML은 정확히 무엇인가요?

1989년 팀 버너스-리에 의해 만들어진 HTML은 월드 와이드 웹의 핵심 언어로 작동합니다. HyperText Markup Language의 약자인 HTML은 하이퍼링크를 통해 다른 웹사이트 간에 탐색할 수 있도록 하는 웹의 중심 요소입니다.

마크업 언어로서, HTML은 HTML 파일 내의 주석을 사용하여 페이지를 표시합니다. 이러한 주석은 브라우저에 렌더링되지 않지만 내부적으로 작동하여 콘텐츠를 일반 대중에게 표시하는 방법을 브라우저에 알려줍니다.

집을 짓기 시작할 때, 튼튼한 기초가 마련되어야 하며 구조적으로 견고하게 유지되어야 합니다. 마찬가지로 HTML은 웹사이트를 구축하는 데 필요한 기초로, 웹상에서 콘텐츠를 제시하기 위한 구조와 의미를 제공합니다.

<div class="content-ad"></div>

계속하기 전에 HTML이 주로 프로그래밍 언어가 아닌 마크업 언어로 간주된다는 점을 참고하세요. HTML은 구조적인 목적을 제공하므로 프로그래밍 언어로 간주되지 않는다는 주장이 있습니다.

# HTML 작성 방법

HTML 문서는 브라우저에 렌더링할 내용을 알려주는 요소로 구성된 표준 구조를 따릅니다.

기본 HTML 요소에는 시작 태그와 종료 태그, 내용이 포함되어 있고 속성과 값이 포함될 수 있습니다.

<div class="content-ad"></div>

사람들처럼 적절한 HTML 구조는 `head`와 `body`를 갖추고 있어야 합니다. `head` 요소에는 메타데이터를 추가하고, `body`에는 웹페이지에 표시될 정보가 포함됩니다. `body` 태그에는 페이지에 표시할 내용만 넣어야 하며, 그 외의 모든 것은 `body` 안에 들여쓰기해야 합니다.

# HTML 문서 구조

기본 HTML 구조는 다음과 같습니다:

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- 여기에 메타데이터를 삽입합니다 -->
    <!-- 메타데이터에는 웹페이지에 대한 정보가 포함됩니다 -->
    <title></title>
  </head>
  <body>
    <!-- body에는 웹페이지 내에서 표시될 내용이 포함됩니다 -->
  </body>
</html>
```

<div class="content-ad"></div>

- `!DOCTYPE html`: 이것은 HTML에서의 첫 번째 코드 줄입니다. HTML 버전을 명시하며 선언으로 알려져 있습니다. 브라우저가 산업 표준을 준수하도록 합니다.

- html lang="en"``/html``: 이는 HTML 문서의 시작과 끝 태그입니다. 'lang' 속성을 포함하고 있으며 이는 'en' 값으로 추가되어 페이지 언어를 영어로 지정합니다.

- `head``/head`: 이는 페이지에 대한 메타데이터를 포함합니다.

- `title``/title`: 이는 브라우저의 제목 표시줄에 표시될 페이지 제목을 포함합니다.

<div class="content-ad"></div>


**body**: 웹페이지에서 보이는 내용을 포함합니다.

# HTML 요소의 구조

![HTML 요소 구조](/assets/img/2024-05-02-AComprehensiveGuidetoHTMLforBeginners_1.png)

다양한 HTML 요소는 웹 브라우저에 정보를 전달하는 데 도움이 됩니다. 위 다이어그램에서 HTML 요소는 태그(시작 태그와 종료 태그)로 지정됨을 볼 수 있습니다. *몇몇 요소는 종료 태그가 필요하지 않을 수도 있습니다.

<div class="content-ad"></div>

속성은 요소에 추가 정보를 제공하는 반면 값은 추가된 속성에 대한 추가 정보를 제공합니다. 예를 들어 앵커 요소를 살펴보겠습니다:

```js
<a href="링크 주소">내용</a>

<!-- 여는 <a>는 여는 태그를 나타냅니다 -->
<!-- href는 앵커 태그의 하이퍼텍스트 참조를 나타내는 속성입니다 -->
<!-- 링크 주소가 값입니다 -->
<!-- 닫는 </a>는 종료 태그를 나타냅니다 -->
```

# 흔한 HTML 태그

총 142개가 넘는 HTML 태그가 존재하며, 각각이 HTML 문서 내에서 다른 수준에서 역할을 수행합니다. HTML 코딩 중 대부분 마주치게 되는 필수 요소들을 정리했습니다.

<div class="content-ad"></div>

대부분의 HTML 요소는 여는 태그와 닫는 태그를 가지고 있어요.

여는 태그에는`<`와 `>` 사이에 요소가 들어가요. 그에 반해, 닫는 태그(해당하는 경우)는 요소 이름 앞에 슬래시(`/`)가 있는 `<`와 `>`로 묶인 요소를 포함하고 있어요.

중요한 HTML 태그들은 다음과 같아요:

- 제목(H1 — H6): 제목은 웹페이지의 컨텐츠 계층을 정의하며, `h1`이 가장 중요하고 `h6`가 가장 중요하지 않아요. 문서에 낮은 계층의 제목 요소를 추가하는 것은 새로운 하위 섹션을 시작한다는 것을 의미해요.

<div class="content-ad"></div>

```js
<h1>Hello World</h1> <!-- 가장 중요한 제목 -->
 <h6>hello world</h6> <!-- 하위 제목 -->
```

2. 단락(p): 명시적인 문서를 제시하는 데 도움이 되는 단락을 추가할 수 있습니다.

```js
<p>This is your paragraph content</p>
```

3. 링크(a): 앵커 요소는 하이퍼링크를 만들어줍니다. 이를 통해 웹 페이지 간 또는 동일 페이지의 섹션 간을 이동할 수 있습니다.

<div class="content-ad"></div>

이미지를 HTML 문서에 추가하려면 `img` 태그를 사용할 수 있어요. 지금까지 보신 태그들과는 달리 이미지 태그는 자체적으로 닫는 태그이기 때문에 별도의 종료 태그가 필요하지 않아요.

이미지 요소에는 이미지 원본을 지정하는 (src) 속성이 반드시 필요해요. 이미지가 로드되지 않을 경우 화면 낭독기의 접근성을 향상시키기 위해 (alt) 속성을 추가하는 것도 도움이 돼요.

```js
<img src="blah.jpg" alt="blah doing blah" />
 <!-- alt 속성은 이미지에 대한 중요한 메타데이터를 제공하여 구글 검색 결과 페이지 순위를 높이는 데 도움이 돼요 -->
```

<div class="content-ad"></div>

5. `div` 태그: `div` 태그는 유사한 콘텐츠를 그룹화하고 스타일을 적용하기 위한 일반적인 블록 수준 컨테이너 요소입니다. 이 태그는 CSS로 스타일이 적용되거나 JavaScript로 조작되지 않는 이상 문서 내용에 영향을 미치지 않습니다.

일반적으로 HTML 문서는 div들의 모음이라고 말합니다. 다른 태그들이 `div` 요소 내에 중첩될 수도 있고, div들이 다른 div들 안에 중첩될 수도 있습니다. 이것을 ‘HTML 문서 트리’라고 합니다.

아래는 HTML 문서 트리를 보여주며 요소들이 서로 어떻게 중첩되어 있는지 보여주는 다이어그램입니다.

![HTML document tree diagram](/assets/img/2024-05-02-AComprehensiveGuidetoHTMLforBeginners_2.png)

<div class="content-ad"></div>

6. 목록(ul)(ol)(li): 목록은 순서가 있는(ol) 경우와 순서가 없는(ul) 경우가 있습니다. 순서가 있는 목록을 만들려면, 시작하는 `ol` 태그와 닫는 `/ol` 태그를 코딩하세요. 여기에 리스트 항목 태그 `li``/li`를 중첩하여 들여쓰기를 해야 합니다.

글머리 기호(불릿 포인트)를 만들려면, 그냥 순서가 없는 목록 요소에 리스트 항목(li)을 중첩하면 됩니다.

따라서 식료품 목록의 글머리 기호를 작성하려면, 다음과 같이 코딩해야 합니다:

```js
- Eggs
- Butter
- Flour
- Sugar
```


<div class="content-ad"></div>

위 내용을 한글로 번역하면 이렇게 될 거에요:

<img src="/assets/img/2024-05-02-AComprehensiveGuidetoHTMLforBeginners_3.png" />

- 일반적인 HTML 태그를 배웠으니 이제 일반적인 HTML 속성들로 넘어가 봅시다.

# 일반적인 HTML 속성들

<div class="content-ad"></div>

HTML 속성은 콘텐츠에 나타나지 않는 요소에 대한 추가 정보를 제공합니다.

이 속성들은 항상 요소의 시작/열림 태그에서 지정되며 일반적으로 값이 할당됩니다. 이름/값은 속성 쌍입니다. (name="value"). 속성 값은 따옴표로 묶어야 함을 유의하십시오.

또한 모든 HTML 요소가 속성을 필요로 하는 것은 아니며 모든 속성이 값을 필요로 하는 것은 아닙니다(이를 부울 속성이라고 함). HTML 학습을 더 진행하면 이러한 개념들을 이해하는 것이 더 쉬워질 것입니다.

일반적인 HTML 속성은 다음과 같습니다:

<div class="content-ad"></div>

- (src) 속성: source 속성(src)은 이미지 링크를 값으로 하는 `img` 요소에서 유용합니다. `img` 요소에 (src) 속성이 추가되지 않으면 브라우저가 렌더링할 이미지를 알 수 없습니다. `img src="이미지 링크"/`
- (href) 속성: HTML 문서의 하이퍼링크 대상을 정의하며 값은 링크 대상을 지정합니다. 앵커`a` 요소에 (href) 속성이 추가되지 않으면 방문자가 링크를 클릭해도 브라우저에서 어디로도 이동하지 않습니다. `a href="링크"`링크 텍스트`/a`
- (class)와 (id) 속성: 이들은 CSS를 활용한 스타일링과 JavaScript를 활용한 조작을 통해 HTML 요소에 추가 정보와 스타일을 제공합니다.
- (lang) 속성: 웹 페이지의 언어를 지정하는 필수적인 속성으로 `html` 요소의 시작 태그에 추가해야 합니다. 웹 브라우저와 검색 엔진에 도움이 되며, 페이지 언어가 영어인 경우 `html lang="en"``/html`로 지정합니다.
- (alt) 속성: 필수적인 속성은 아니지만 `img` 요소에 (alt)를 추가하는 것은 좋은 HTML 관행으로 간주됩니다. 대체 텍스트를 추가하면 저시력을 가진 방문자 등에게 사이트 접근성을 높이고 이미지가 제대로 렌더링되지 않을 때에도 대비할 수 있습니다. `img src="cat.jpg" alt="고양이 잠자는 모습" /`

더 많은 속성이 있으며, 이를 효과적으로 활용하는 방법을 배우면 HTML 문서를 향상시킬 수 있습니다. 기억해야 할 점은 HTML 속성은 HTML 요소 내부에서 사용되는 특별한 단어로 요소의 동작을 제어합니다.

# 첫 번째 HTML 파일 생성하기

HTML을 사용하기 위해 다음 단계를 따르세요:

<div class="content-ad"></div>

- 텍스트 편집기 다운로드하기: 텍스트 편집기는 텍스트 파일을 변경, 편집, 생성 및 열 수 있는 컴퓨터 프로그램이에요. 기본적으로 코드를 작성하는 데 도움을 줍니다. HTML 코딩용 여러 텍스트 편집기가 있어요. 내가 좋아하는 몇 가지는 Visual Studio Code, Notepad++(Windows), Sublime Text(Mac) 등이 있어요.
- 텍스트 편집기를 다운로드한 후, 열리면 에디터 창이 나타날 거에요. 여기서 첫 번째 HTML 코드를 작성할 거에요.
- `!DOCTYPE html`로 페이지를 선언한 다음, `html lang="en"`로 언어를 영어로 설정하는 `html` 엘리먼트로 시작해보세요.
- `html` 엘리먼트 내에 `head`와 `body` 엘리먼트를 중첩해 주세요.
- `head` 엘리먼트 안에 `title` 엘리먼트를 중첩하고, 콘텐츠를 `My first HTML page`로 설정하여 페이지에 제목을 부여하세요.
- `body` 내부에 `h1`와 `p` 엘리먼트를 중첩하고, 전자에는 "My first Heading", 후자에는 "My first paragraph"를 내용으로 설정해 주세요.

다음과 같은 모습이어야 해요:

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My first HTML page</title>
  </head>
  <body>
    <h1>My first Heading</h1>
    <p>My first paragraph</p>
  </body>
</html>
```

7. 다음으로, 컴퓨터에 방금 생성한 파일을 저장하고 (.html) 확장자를 할당해 주세요.

<div class="content-ad"></div>

8. 완성된 파일을 보려면 저장된 파일을 더블 클릭하여 열어주세요. 그러면 기본 브라우저에서 열릴 거에요. 추가한 HTML 파일에 따라 웹 페이지가 표시될 거에요.

9. 축하해요, 친구야! 첫 번째 HTML 파일을 만들었어, 정말 자랑스러워!

![image](/assets/img/2024-05-02-AComprehensiveGuidetoHTMLforBeginners_4.png)

10. 보이는 대로, 꽤 기본적인 페이지에요. 마음대로 편집해봐도 돼. 텍스트 편집기에서 파일을 수정하여 이미지, 양식, 링크 및 기타 요소를 추가해 동적인 웹 페이지를 만들 수 있어. 변경 사항을 저장하지 않으면 브라우저에 반영되지 않으니 주의해주세요.

<div class="content-ad"></div>

# 더 배우기 위한 자료

HTML 마스터링 여정을 계속하려면, 내가 개발자 여정에서 도움을 받은 몇 가지 가치 있는 자원들이 있어요:

- freeCodeCamp: freeCodeCamp의 '반응형 웹 디자인' 과정은 개발 경력을 가속화하는 데 도움이 되었어요. 이름에서 알 수 있듯이 무료이며 계정 생성만 필요해요.
- Per Borgen의 HTML과 CSS: 저에게 항상 초심자에게 추천하는 동영상이에요. Per가 개념을 단순하게 설명하고 듣는 이를 참여시키는 데 뛰어난 일을 했어요.
- The Odin Project: 컴퓨터 기초, HTML, CSS, Flexbox 등에 대한 실전 소개가 있어요.

온라인 튜토리얼이나 추천 도서 중 어느 쪽을 선호하든, HTML을 배울 수 있는 방법에 부족함이 없어요. 당신에게 가장 적합한 자원을 선택하기 위해 조사를 하고 선택해보세요!

<div class="content-ad"></div>

# 결론

HTML은 웹의 언어이며 개발자 여정에 발을 딛을 때 HTML에 대한 좋은 이해는 디지털 랜드스케이프에서 유용하고 보람찬 것으로 입증될 것입니다.

HTML만을 이용하여 간단한 웹사이트를 제작할 수 있지만, 아름답고 기능적인 웹사이트를 만들기 위해서는 CSS와 JavaScript에 대한 좋은 이해가 미래에 필수적일 것입니다. 인간과 같이, HTML은 뼈대에 비유할 수 있고, CSS는 피부에, JavaScript는 웹사이트의 두뇌에 비유할 수 있습니다.

원하는 것을 배울 때에는 연습과 인내가 중요하다는 것을 기억하세요. HTML은 동적이고 상호작용적인 웹 경험을 만들어내기 위한 흥미진진한 모험의 시작에 불과합니다. 개발자 여정에서 행운이 함께 하길 바랍니다.

<div class="content-ad"></div>

행복한 코딩 친구들!