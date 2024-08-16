---
title: "CSS의 가장 기본적인 개념"
description: ""
coverImage: "/assets/img/2024-07-07-TheMostFundamentalConceptInCSS_0.png"
date: 2024-07-07 02:16
ogImage: 
  url: /assets/img/2024-07-07-TheMostFundamentalConceptInCSS_0.png
tag: Tech
originalTitle: "The Most Fundamental Concept In CSS."
link: "https://medium.com/@sai-mishra/the-most-fundamental-concept-in-css-90f6f975bdee"
isUpdated: true
---



상자 모델은 CSS의 가장 기본적인 개념 중 하나입니다. 심지어 가장 중요한 개념 중 하나로 꼽을 정도이며, CSS를 배울 때 가장 먼저 배워야 할 것입니다. 그래서 상자 모델에 대한 좋은 이해는 CSS 마스터가 되고 싶다면 필수적입니다. 오늘은 CSS에서 상자 모델을 몇 분 안에 가르쳐 드릴 거에요. 그러니 시작해볼까요?

![TheMostFundamentalConceptInCSS](/assets/img/2024-07-07-TheMostFundamentalConceptInCSS_0.png)

CSS는 Cascading Style Sheets의 약자입니다. 이름에서 알 수 있듯이 문서를 스타일링하는 데 사용됩니다. 인터넷에서 방문하는 대부분의 웹사이트에는 CSS 코드가 포함되어 있습니다. 그렇지 않다면, 웹사이트가 말썽스럽게 보일거에요. 직접 확인해보고 싶으신가요? 그럼, 한 번 보여드릴게요.

제가 직접 만든 웹사이트의 예시를 보여드릴게요(원하시면 링크를 참고하세요):

<div class="content-ad"></div>

웹 사이트가 일반적으로 보입니다:

![Image 1](/assets/img/2024-07-07-TheMostFundamentalConceptInCSS_1.png)

![Image 2](/assets/img/2024-07-07-TheMostFundamentalConceptInCSS_2.png)

![Image 3](/assets/img/2024-07-07-TheMostFundamentalConceptInCSS_3.png)

<div class="content-ad"></div>

![Without CSS 1](/assets/img/2024-07-07-TheMostFundamentalConceptInCSS_5.png)
![Without CSS 2](/assets/img/2024-07-07-TheMostFundamentalConceptInCSS_6.png)

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-07-TheMostFundamentalConceptInCSS_7.png)

그렇죠, 그렇게 심각해요. 이제 CSS의 힘과 멋진 웹사이트를 만드는 데 얼마나 중요한지 알게 되었으니, 이제 박스 모델이라 불리는 것을 배워봅시다.

![이미지](/assets/img/2024-07-07-TheMostFundamentalConceptInCSS_8.png)

이 이미지 자체가 박스 모델을 잘 설명하고 있어요.

<div class="content-ad"></div>

상자 모델에서 이해해야 할 네 가지가 있어요:

## 1. 내용, 2. 테두리, 3. 안쪽 여백, 4. 바깥 여백

각 HTML 요소는 상자로 표현됩니다. 문단부터 div까지 모든 요소가 상자로 렌더링돼요. 보여 드릴게요.

HTML 코드:

<div class="content-ad"></div>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>

<body>
    <p>
        This is a paragraph tag!
    </p>
    <div>
        This is a div tag!
    </div>
    <section>
        This is a section tag!
    </section>
</body>

</html>

CSS Code:

```css
* {
  margin: 0;
  padding: 0;
}

p {
  background-color: red;
}

div {
  background-color: blue;
}

section {
  background-color: grey;
}
```

<div class="content-ad"></div>

![2024-07-07-TheMostFundamentalConceptInCSS_9](/assets/img/2024-07-07-TheMostFundamentalConceptInCSS_9.png)

이제 HTML에서 모든 것이 상자라는 것을 보실 수 있습니다. 각 상자마다 너비와 높이가 있습니다(이를 변경할 수 있습니다). 이러한 상자 안에는 콘텐츠가 있습니다. p 태그 안에서 콘텐츠는 “This is a paragraph tag!”이고, div 태그 안에서는 “This is a div tag!”이며, section 태그 안에서는 “This is a section tag!”입니다(참고: 콘텐츠는 어떤 것이든 될 수 있으며 항상 텍스트일 필요는 없습니다). 테두리는 기본적으로 상자의 테두리입니다. 시각적으로 표현하면 다음과 같습니다:

![2024-07-07-TheMostFundamentalConceptInCSS_10](/assets/img/2024-07-07-TheMostFundamentalConceptInCSS_10.png)

보시다시피 이제 각 요소 상자의 가장자리에 테두리가 있습니다(마지막 코드를 제공할 것입니다). 안쪽 여백은 상자의 테두리와 콘텐츠 사이의 공간입니다. 아래에서 최종 코드를 제공할게요:

<div class="content-ad"></div>

![image](/assets/img/2024-07-07-TheMostFundamentalConceptInCSS_11.png)

As you can see, there is now a gap between the content and the border of the boxes. You can think of padding as internal space. Now, for the last part, margin. Margin is the external space between two distinct boxes.

You can think of margin as the opposite of padding, it is external space.

![image](/assets/img/2024-07-07-TheMostFundamentalConceptInCSS_12.png)

<div class="content-ad"></div>

요런, 이제 상자들이 분리되었고 훨씬 더 멋있어 보여요.

최종 CSS 코드:

```js
* {
    margin: 0;
    padding: 0;
}

p {
    background-color: red;
    border: 4px solid black;
    padding: 10px;
    margin: 10px;
}

div {
    background-color: blue;
    border: 4px solid black;
    padding: 10px;
    margin: 10px;
}

section {
    background-color: grey;
    padding: 10px;
    border: 4px solid black;
    margin: 10px;
}
```

그럼, 여기까지입니다. 이것이 CSS 박스 모델에 대해 알아야 할 모든 것이에요. 이 개념이 분명하다면 CSS를 정복하는 길에 올라섰다고 볼 수 있어요.

<div class="content-ad"></div>

행운을 빌어요!
