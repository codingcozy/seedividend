---
title: "내부 HTML을 사용하지 말아야 하는 이유와 대신 사용할 것"
description: ""
coverImage: "/assets/img/2024-06-20-WhyYouShouldntUseinnerHTMLandWhattoUseInstead_0.png"
date: 2024-06-20 03:36
ogImage:
  url: /assets/img/2024-06-20-WhyYouShouldntUseinnerHTMLandWhattoUseInstead_0.png
tag: Tech
originalTitle: "Why You Shouldn’t Use innerHTML and What to Use Instead"
link: "https://medium.com/@verity.carlos/why-you-shouldnt-use-innerhtml-and-what-to-use-instead-ed99d064a416"
isUpdated: true
---

## innerText, textContent, 및 innerHTML

![이미지](/assets/img/2024-06-20-WhyYouShouldntUseinnerHTMLandWhattoUseInstead_0.png)

# 소개

코딩에 입문했고 JavaScript와 HTML의 기본을 알게 되었다면, 이제 DOM을 탐색하기 시작할 준비가 된 것 같네요. JavaScript를 사용하여 HTML 요소를 선택했고, 이제 해당 요소에 콘텐츠를 추가하려고 할 때 innerHTML, textContent, innerText 속성이 모두 도와줄 수 있지만, 어떤 것을 선택해야 할까요?

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

아래와 같이 HTML에 빈 `li` 요소들로 이루어진 순서 없는 목록이 있다고 가정해 봅시다. 우리는 이러한 요소들에 JavaScript를 사용하여 일반 텍스트 내용을 추가하고 싶습니다.

우리가 `li` 요소들에 부여한 id를 활용하여 JavaScript에서 이러한 요소들에 내용을 추가할 수 있고, 세 속성 중 아무것이나 사용해도 거의 동일하게 작동할 것입니다.

여기서 볼 수 있듯이 어떤 속성을 사용하든 우리의 웹페이지에 텍스트가 항목으로 나타날 것입니다.

![이미지](/assets/img/2024-06-20-WhyYouShouldntUseinnerHTMLandWhattoUseInstead_1.png)

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

그래서, 세 개의 속성이 모두 같은 기능을 한다면, 그 목적은 무엇인가요? 각각의 차이와 innerHTML이 해커들에게 취약해지게 하는 방법, 그리고 대신에 사용할 수 있는 것을 알아보려면 계속 읽어보세요.

# 각각의 콘텐츠를 페이지에 렌더하는 방법

이미 존재하는 요소에 일반 텍스트를 추가하는 방법은 위에서 했던 것처럼 상당히 간단하지만, 더 복잡한 코드를 작성하고 있다면 어떨까요. 예를 들어, HTML에 `li` 태그를 입력하지 않고 JavaScript를 사용하여 추가하려고 하는 상황을 생각해보세요. 또 하나의 복잡성을 더해주기 위해, 글을 굵게 표시하기 위해 텍스트 주위에 `strong` 태그를 추가하고 싶다고 가정해 보겠습니다. 이전에 제공했던 "list" id를 통해 `ul` 요소를 선택한 후에, HTML 콘텐츠를 추가하고 일반 텍스트를 넣어놓는 것 역시 시작할 수 있습니다. textContent 속성을 사용하여 목록을 만들어 보겠습니다.

이것이 웹 페이지에 표시되는 결과입니다:

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

<img src="/assets/img/2024-06-20-WhyYouShouldntUseinnerHTMLandWhattoUseInstead_2.png" />

이 부분은 확실히 제대로 보이지 않아요. 만약 'textContent'를 'innerText'로 바꾼다면 어떻게 될까요?

<img src="/assets/img/2024-06-20-WhyYouShouldntUseinnerHTMLandWhattoUseInstead_3.png" />

음... 아무래도 조금 나아졌지만, 여전히 원하는 것과는 다르네요. 아마 'innerText' 대신에 'innerHTML'을 사용하면 우리가 원하는 굵은 목록을 얻을 수 있을 것 같아요.

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

아래는 표입니다.

| 일자     | 카테고리 | 주제             |
| -------- | -------- | ---------------- |
| 6월 20일 | 웹 개발  | innerHTML의 단점 |

내용이 완벽해 보여요! innerHTML이 여기서 멋지게 작동하고 있지만, 웹 페이지에 문제를 일으킬 수 있는 상당히 중요한 단점이 몇 가지 있습니다.

# innerHTML의 단점

## 사이버 보안 문제

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

모든 세 속성(textContent, innerText 및 innerHTML)은 빈 요소에 콘텐츠를 추가하는 것뿐만 아니라 기존 콘텐츠를 대체합니다. innerHTML은 단순한 문자열이 아닌 실제 HTML 코드 조각을 포함하는 콘텐츠를 추가할 수 있기 때문에 보안 위험을 야기할 수 있습니다. 예를 들어 innerHTML을 사용하여 웹페이지에 제출 양식을 만들고 누군가 악성 콘텐츠를 제출하면 본인 뿐만 아니라 웹사이트나 프로젝트의 다른 사용자에게 실제 문제가 발생할 수 있습니다. 이러한 이유로 보안 검토를 받을 예정인 사이트나 프로젝트의 경우, innerHTML 사용은 테스트를 통과하지 못하고 거부당할 수 있습니다.

<img src="/assets/img/2024-06-20-WhyYouShouldntUseinnerHTMLandWhattoUseInstead_5.png" />

## 비효율성

또 다른 innerHTML의 단점은 다른 옵션에 비해 느립니다. 예를 들어, 코드에서 이전에 생성한 배열이나 어쩌면 API에서 가져온 수백 개 또는 수천 개의 아이템이 있는 배열에 대해 각 항목에 대해 새 요소를 만들어야 하는 프로젝트를 작업 중이라고 가정해봅시다. innerHTML을 사용하면 이 데이터를 로드하는 데 몇 초가 걸릴 수 있습니다. 오늘날 온라인 사용자에게 속도가 매우 중요한 요소인만큼, 이 몇 초가 빠르게 누적될 수 있습니다. Digital.com의 기사에 따르면 온라인 쇼핑객의 53%가 3초 이상 걸리는 전자상거래 웹사이트를 방문하지 않을 것이라고 합니다 (Leng, 2022). 다행히 JavaScript를 사용해 HTML 요소를 추가할 때 다른 옵션이 있습니다.

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

# 사용 대신할 것

## HTML 추가하기

우리는 innerHTML을 사용하여 한 번에 HTML 요소와 텍스트 문자열을 추가하는 방법을 보았습니다. 또한 이렇게 하는 것의 단점을 살펴보았습니다. 우리의 코드를 안전하고 효율적으로 만드는 좋은 대안은 이러한 작업을 분리하는 것입니다.

위의 그림에서, 우리는 'greetings'라는 배열에 우리의 인사말을 입력했습니다. 그런 다음 이 배열에 대한 'forEach' 루프를 만들었고, 배열의 각 항목에 대해 새로운 li 태그를 만들도록 지시했습니다. 새로운 강조 태그를 만들고, ul 요소를 선택하고, 방금 선택한 ul 요소에 새로 만든 li 태그를 추가하고, 해당 li 태그에 새로 만든 강조 태그를 추가하고, 배열에서 가져온 텍스트 항목을 입력하도록 했습니다. 휴, 많이 보일 수 있지만, 보다 간단하게 쪼개면, 우리는 원하는 HTML 요소를 생성하고, 그 위치를 선택하고, 해당 위치에 추가하고, 텍스트를 추가하는 것입니다.

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

## innerText 대 textContent

만약 HTML을 삽입할 필요가 없는 경우, 콘텐츠를 추가할 요소를 선택하고 innerText 또는 textContent로 텍스트를 입력할 수 있습니다. 일반적으로 messy한 코드를 생성할 수 있는 textContent 대신 innerText를 선택하는 것이 좋습니다. 예를 들어, `li` 태그 아래에 텍스트를 작성하고 세 줄로 나누었다고 가정해 봅시다.

그런 다음 JavaScript에서 innerText와 textContent를 사용하여 해당 텍스트를 콘솔에 출력했습니다.

아래에서 확인할 수 있듯이 innerText는 콘솔에 내용을 표시할 때 페이지에 표시되는 방식과 유사하게 나타내며, textContent는 동일한 콘텐츠를 콘솔에 출력할 때 처음에 HTML에 입력된 방식과 더 유사하게 출력됩니다.

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

<img src="/assets/img/2024-06-20-WhyYouShouldntUseinnerHTMLandWhattoUseInstead_6.png" />

# 결론

간편성 때문에 innerHTML을 사용하기 유혹받을 수 있지만, 웹 페이지의 로딩을 느리게 만들고 보안 위험을 초래할 수 있으므로 innerHTML을 피하고 요소를 생성하고 텍스트를 추가하는 작업을 분리하는 것이 좋습니다. textContent와 innerText 모두 원하는 텍스트를 안전하게 추가할 수 있지만, innerText는 콘솔에서 내용을 더 명확하게 표시하기 때문에 일반적으로 선호됩니다. innerHTML, textContent 및 innerText 간의 차이를 명확히 해주고 어떤 것을 사용할지 결정하는 데 도움이 되었기를 바랍니다. 즐거운 코딩 되세요!

## 출처

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

[Element.innerHTML.](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)

Leng, Allen. [“1 In 2 Visitors Abandon a Website That Takes More than 6 Seconds to Load.”](https://digital.com/1-in-2-visitors-abandon-a-website-that-takes-more-than-6-seconds-to-load/#:~:text=However%2C%20when%20it%20comes%20to,will%20leave%20after%20one%20second.)
