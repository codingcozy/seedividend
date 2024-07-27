---
title: "Javascript scrollIntoView 메소드 사용 방법"
description: ""
coverImage: "/assets/img/2024-06-22-JavascriptscrollIntoViewmethod_0.png"
date: 2024-06-22 15:32
ogImage: 
  url: /assets/img/2024-06-22-JavascriptscrollIntoViewmethod_0.png
tag: Tech
originalTitle: "Javascript scrollIntoView() method"
link: "https://medium.com/@twinkal189/javascript-scrollintoview-method-198436f81648"
---



![scrollIntoView method](/assets/img/2024-06-22-JavascriptscrollIntoViewmethod_0.png)

scrollIntoView는 요소를 뷰포트 안으로 부드럽게 스크롤할 수 있는 자바스크립트 메소드입니다. 이 메소드는 이미 보이는 뷰포트에 요소가 없다면 요소를 보이게 만듭니다. 사용자가 어떤 작업을 수행하거나 애니메이션 효과로 요소를 보여줄 때 유용합니다.

scrollIntoView 메소드는 문서 객체 모델(DOM)의 Element 인터페이스의 일부입니다.

element.scrollIntoView();
element.scrollIntoView([scrollIntoViewOptions]);

<div class="content-ad"></div>

scrollIntoView의 문법에는 2 가지 유형이 있습니다.

이 메소드는 기본 옵션으로 요소를 보이도록 스크롤하는 데 사용됩니다.

이는 요소가 이미 보이지 않은 경우 요소가 포함되어 있는 요소의 맨 위나 뷰포트로 스크롤됩니다.

scrollIntoViewOptions는 뷰포트에서 요소를 스크롤하는 여러 옵션을 지정하는 선택적 객체 속성입니다.

<div class="content-ad"></div>

다음과 같은 속성이 있습니다.

이 속성은 아래 유형을 통해 스크롤의 동작을 정의하는 데 사용됩니다.

가능한 값은

- auto(기본값): 스크롤 동작에 따라 요소를 스크롤합니다.
- smooth: 부드럽고 애니메이션 효과로 요소를 스크롤합니다.
- instant: 즉시 요소를 스크롤하여 단일 점프와 동일합니다.

<div class="content-ad"></div>

이 속성은 가시 영역 내 요소의 수직 정렬을 정의하는 데 사용됩니다.

가능한 값은

- start(기본): 요소를 시작 위치에 스크롤합니다.
- center: 요소를 중앙에 스크롤합니다.
- end: 요소를 끝에 스크롤합니다.
- nearest: 수직으로 가장 가까운 가장자리로 스크롤합니다.

이 속성은 가시 영역 내 요소의 수평 정렬을 정의하는 데 사용됩니다.

<div class="content-ad"></div>

다음은 가능한 값들입니다

- start(기본): 요소를 시작 위치에 스크롤합니다.
- center: 요소를 중앙에 스크롤합니다.
- end: 요소를 끝에 스크롤합니다.
- nearest: 수평으로 가장 가까운 가장자리로 스크롤합니다.

## 예시

여기에 scrollIntoView의 다양한 속성 조합에 따라 생성된 3가지 예시가 있습니다.

<div class="content-ad"></div>

# 1. scrollIntoView() 기본

이것은 요소를 보이는 뷰포인트로 스크롤합니다.

<!DOCTYPE html>
<html>
    <style>
        #container {
            height: 250px;
            overflow: auto;
        }
        #scroll-div {
            margin: 500px;
            height: 800px;
            background-color: pink;
        }
    </style>

    <body>
        <h1>Javascript scrollIntoView</h1>

        <button onclick="myFunction()">요소로 스크롤하려면 클릭</button>

        <div id="container">
            <div id="scroll-div">
                <p>텍스트1</p>
                <p>텍스트2</p>
                <p>텍스트3</p>
            </div>
        </div>

        <script>
            function myFunction() {
                const element = document.getElementById('scroll-div');
                element.scrollIntoView();
            }
        </script>
    </body>
</html>

# 2. scrollIntoView() 수직으로

<div class="content-ad"></div>

아래 코드는 요소를 수직으로 화면 안에 스크롤합니다.

<!DOCTYPE html>
<html>
    <style>
        #scroll-div {
            margin-top: 100px;
            padding-right: 100%;
            height: 800px;
            background-color: pink;
            overflow: auto;
        }
    </style>

    <body>
        <h1>Javascript scrollIntoView</h1>

        <button onclick="myFunction()">요소를 스크롤하려면 클릭하세요</button>

        <div id="scroll-div">텍스트</div>

        <script>
            function myFunction() {
                const element = document.getElementById('scroll-div');
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest',
                });
            }
        </script>
    </body>
</html>

# 3 .scrollIntoView() 수평 방향

이것은 요소를 수평으로 화면 안에 스크롤합니다.

<div class="content-ad"></div>

<!DOCTYPE html>
<html>
    <style>
        #scroll-div {
            margin-left: 100%;
            padding-right: 100%;
            height: 800px;
            background-color: pink;
            overflow: auto;
        }
    </style>

    <body>
        <h1>Javascript scrollIntoView</h1>

        <button onclick="myFunction()">Click to scroll the element</button>

        <div id="scroll-div">Text</div>

        <script>
            function myFunction() {
                const element = document.getElementById('scroll-div');
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'start',
                });
            }
        </script>
    </body>
</html>

참고: scrollIntoView 메서드는 요소의 CSS에 많이 의존합니다. 요소에 대한 스크롤 간격에 대한 유효한 CSS를 제공했을 경우에만 예상대로 작동합니다.

이 글을 읽어주셔서 감사합니다. 이 글이 요소 스크롤에 도움이 되기를 바랍니다.