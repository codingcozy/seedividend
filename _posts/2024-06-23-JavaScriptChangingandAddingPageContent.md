---
title: "JavaScript로 페이지 콘텐츠 변경 및 추가하는 방법"
description: ""
coverImage: "/assets/img/2024-06-23-JavaScriptChangingandAddingPageContent_0.png"
date: 2024-06-23 14:35
ogImage:
  url: /assets/img/2024-06-23-JavaScriptChangingandAddingPageContent_0.png
tag: Tech
originalTitle: "JavaScript — Changing and Adding Page Content"
link: "https://medium.com/@geraldclarkaudio/javascript-changing-and-adding-page-content-deba762969b8"
isUpdated: true
---

![image](/assets/img/2024-06-23-JavaScriptChangingandAddingPageContent_0.png)

이제 우리는 바꾸려는 요소를 DOM에서 쿼리하는 방법을 알게 되었습니다. 이제는 그 요소들로 무엇을 하는지 살펴봅시다.

![image](/assets/img/2024-06-23-JavaScriptChangingandAddingPageContent_1.png)

이 첫 번째 p 태그를 가져와서 그 안의 텍스트를 추출해 봅시다. 그리고 그 내용을 변경해 봅시다.

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

![이미지](/assets/img/2024-06-23-JavaScriptChangingandAddingPageContent_2.png)

여기서는 첫 번째 p 태그를 찾는 document.querySelector 메서드에 대한 참조를 저장하고 있습니다. 그런 다음 para.innerText를 "Yo!"로 설정하고 있습니다. innerText는 메서드가 아닌 속성이기 때문에 괄호를 사용하지 않습니다.

![이미지](/assets/img/2024-06-23-JavaScriptChangingandAddingPageContent_3.png)

한 번에 여러 가지를 변경해 봅시다.

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

![Image 1](/assets/img/2024-06-23-JavaScriptChangingandAddingPageContent_4.png)

Here I'm using querySelectorAll to get all the p tags. Then I'm using the forEach method to simply log out each one.

![Image 2](/assets/img/2024-06-23-JavaScriptChangingandAddingPageContent_5.png)

Now I'm just appending 'new text' to each p tag.

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

무언가의 HTML을 변경하고 싶다면 어떻게 해야 할까요?

첫 번째 단계는 해당 요소에 대한 참조를 가져오는 것입니다.

![image](/assets/img/2024-06-23-JavaScriptChangingandAddingPageContent_6.png)

여기서 content 클래스에 대한 참조를 가져와 innerHTML을 로깅하고 있어요.

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

![image](/assets/img/2024-06-23-JavaScriptChangingandAddingPageContent_7.png)

그런 다음 innerHTML 속성을 사용하여 해당 요소의 실제 HTML을 변경할 수 있습니다.

여기 가정해 봅시다!

우리가 사람들의 데이터베이스를 보고 있는 것으로 상상해 봅시다. 그리고 각 사람에 대해 HTML 템플릿을 만들어 브라우저에 출력하고 싶습니다.

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

![Image](https://miro.medium.com/v2/resize:fit:1400/1*Esh6L4NcymzAF3vIW5MQfw.gif)

여기서 people이라는 배열을 만들고 forEach 메소드를 사용하여 .content 요소의 innerHTML을 변경하고 있습니다. 내용을 추가하므로 브라우저에는 이름 목록과 함께 페이지 요소를 검사할 때 div 내부에 이름 목록이 표시됩니다.
