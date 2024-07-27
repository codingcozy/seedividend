---
title: "HTML 기본 개념 정리 및 시작 가이드"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-09-HTMLBasics_0.png"
date: 2024-07-09 08:57
ogImage:
  url: /assets/img/2024-07-09-HTMLBasics_0.png
tag: Tech
originalTitle: "HTML Basics"
link: "https://medium.com/@damon.ryon/html-basics-890e8d414b23"
---

코딩에 관심이 있는 경우 HTML을 배우는 것은 좋은 시작점입니다. HTML은 태그로 이루어진 간단한 언어이지만 특정한 방식으로 구조화되어야 합니다.

MDN은 개발자에게 꼭 필요한 자료입니다! 해당 페이지를 즐겨찾기로 등록하는 것을 강력히 추천합니다. 여기에는 필요한 모든 문서가 포함되어 있습니다. 처음에는 읽고 이해하기가 조금 어려울 수 있지만, 그래서 제가 여기 있는 거죠 :)

다음은 MDN의 HTML 페이지 링크입니다.

원하는 이름으로 첫 번째 프로젝트에 대한 폴더를 컴퓨터에 만든 다음 VS Code에서 열어보세요.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

그럼 해당 디렉토리 내에 2개의 파일을 생성하게 됩니다. 하나는 index.html이고, 다른 하나는 style.css입니다. 이 때까지 모든 것을 올바르게 수행했다면 다음과 같은 화면이 나타날 것입니다:

![image](/ui-log-2/assets/img/2024-07-09-HTMLBasics_0.png)

index.html 파일에 1행에 html:5를 입력한 후 TAB을 누르세요. VS Code가 다음과 같이 기본 구조를 생성해줄 것입니다:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이는 모든 웹사이트의 시작점입니다. 1행과 2행은 컴퓨터에게 이것이 HTML 파일이며 영어로 작성되었음을 알려줍니다. 3행에는 head 태그가 열려 있습니다. 7행에 있는 `/head`는 닫힌 head 태그를 나타냅니다.

"head" 섹션은 "상자"라는 것을 주의해야 합니다. 이 "상자" 내부에 다른 상자들을 만들 수 있습니다. "head 상자" 안에는 두 개의 meta 상자와 하나의 title 상자가 있습니다. 이러한 방식으로 HTML을 생각하면 웹페이지 스타일링에 대해 이야기할 때 도움이 될 것입니다.

다음은 이를 더 잘 설명하는 코드 예시입니다:

```js
 <div class="pic-gallery">
      <div class="icon">
        <img src="./assets/portfolio/portfolio-one.png" alt="">
        <div class="icon-text">
          <h3>Soluta esse molestie</h3>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Minus, eveniet placeat? Vitae dignissimos, nulla quod voluptatum
            ad accusantium minus doloribus pariatur tempora alias. Dignissimos
            doloribus deserunt tempore quo excepturi cumque dolore. Enim
            beatae saepe dolore dicta omnis assumenda amet quasi, eius quas
            voluptatum fugit quo fugiat distinctio unde sunt quia!
            </span>
        </div>
      </div>
      <div class="icon">
        <img src="./assets/portfolio/portfolio-two.png" alt="">
        <div class="icon-text">
          <h3>Dolore feugial nulla</h3>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Cupiditate natus nulla neque est illo repellat iure illum consectetur
            repudiandae provident enim ut voluptates ipsum explicabo, suscipit
            non qui soluta modi dignissimos. Laboriosam delectus veniam nihil
            earum incidunt tempora a veritatis quia corporis maiores odit voluptate,
            fugit architecto magni sint id?
          </span>
        </div>
      </div>
      <div class="icon">
        <img src="./assets/portfolio/portfolio-three.png" alt="">
        <div class="icon-text">
          <h3>Consequat vel illum</h3>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            natus officiis magni necessitatibus dolore saepe consequatur rem praesentium
            laudantium quas enim est facere odio velit libero, reiciendis ullam similique,
            tempore repudiandae quo illo fugiat ducimus possimus veniam? Temporibus,
            officiis repudiandae nam fugit, explicabo doloremque quam autem consequatur
            debitis, earum quasi.
          </span>
        </div>
      </div>
    </div>
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

많아 보일 수 있지만, 하나씩 살펴볼까요? "div" 태그는 상자를 만드는 데 사용됩니다. 큰 상자는 "pic-gallery" 클래스가 지정된 div입니다. 위의 모든 코드는 해당 상자 안에 있습니다. "pic-gallery" 상자 안에 세 개의 상자가 있습니다. 이들은 모두 "icon" 클래스가 지정되었습니다. 이 항목들 모두에게 동일한 클래스가 할당되었기 때문에 같은 스타일이 적용됩니다. 정렬과 같이 어떤 부분에서 차이가 있을 경우, 다른 클래스 이름을 부여할 수 있습니다. 그렇게 하면 스타일 시트에서 개별적으로 호출할 수 있습니다. 각 "icon 상자" 안에 이미지가 있고, 그 다음에 "icon-text" 상자가 있습니다. 이 상자 안에는 헤더(h3)와 span 태그가 포함되어 있습니다. span 태그란 무엇인가요?

이제 HTML의 기본적이고 적절한 구조를 설명했습니다. 코딩을 배우고자 한다면, 문제에 대한 해답을 찾는 법을 배워야 합니다. MDN 문서를 읽는 시간을 가지고, 코드 작성에 도전해 보세요!
