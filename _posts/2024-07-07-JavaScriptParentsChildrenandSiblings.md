---
title: "자바스크립트  부모, 자식, 형제 요소 다루는 방법"
description: ""
coverImage: "/assets/img/2024-07-07-JavaScriptParentsChildrenandSiblings_0.png"
date: 2024-07-07 02:21
ogImage:
  url: /assets/img/2024-07-07-JavaScriptParentsChildrenandSiblings_0.png
tag: Tech
originalTitle: "JavaScript — Parents, Children and Siblings"
link: "https://medium.com/@geraldclarkaudio/javascript-parents-children-and-siblings-78357ddce5bd"
isUpdated: true
---

![이미지](/assets/img/2024-07-07-JavaScriptParentsChildrenandSiblings_0.png)

지난 몇 개의 기사에서는 html 요소를 조작하는 방법, DOM 쿼리하는 방법 등에 대해 다루었습니다. 좀 더 복잡한 내용으로 넘어가기 전에 다른 기본 주제를 다뤄보려고 합니다. 함께 알아보겠습니다!

노드 관계에 대해 이야기해봅시다.

![이미지](/assets/img/2024-07-07-JavaScriptParentsChildrenandSiblings_1.png)

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

여기서 간단한 노드 트리를 볼 수 있어요. DOM의 간단한 표현이에요.

오른쪽에 있는 h1과 2개의 div 노드를 살펴보세요. 모두 같은 직계 부모를 가지고 있음을 알 수 있어요. 이 노드들은 형제 노드에요. div 노드에서 나오는 p 태그는 형제 노드일 것이고, div 노드는 그들의 부모가 될 거에요.

그래서 이것은 2가지 다른 종류의 노드 관계에요. 이 노드 관계를 사용하여 DOM을 탐색하는 방법의 예를 몇 가지 살펴볼게요. 이를 통해 다양한 요소에 액세스할 수 있어요.

<img src="/assets/img/2024-07-07-JavaScriptParentsChildrenandSiblings_2.png" />

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

여기 간단한 HTML 페이지가 있습니다. Article 태그 안에 여러 p 태그와 div가 있는 기사 태그입니다. 이 기사 안에 있는 모든 요소에 액세스하고 JavaScript를 통해 각 요소에 클래스를 할당해 봅시다.

우리는 이미 이를 긴 방식으로 하는 법을 알고 있습니다. DOM에 대해 3개의 별도 쿼리를 만들 수 있습니다. 하나는 h2를 위해, 하나는 p 태그를 위해, 그리고 하나는 div를 위해, 그러나 이 방법은 실제로 필요한 것보다 훨씬 더 많은 코드를 작성하는 것입니다. 이것은 또한 동적으로 요소를 변경할 때 우리를 제약합니다. 우리가 검색하려는 요소가 실제로 무엇인지 모르는 경우에는 어떨까요?

![JavaScriptParentsChildrenandSiblings_3](/assets/img/2024-07-07-JavaScriptParentsChildrenandSiblings_3.png)

![JavaScriptParentsChildrenandSiblings_4](/assets/img/2024-07-07-JavaScriptParentsChildrenandSiblings_4.png)

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

`.children` 속성을 사용하면 article 요소 내에 있는 모든 요소를 나열하는 HTML 컬렉션을 얻을 수 있습니다.

이전 글에서 언급한 것처럼 HTML 컬렉션에 대해 `forEach`를 사용할 수 없습니다. 그러면 이 요소들을 어떻게 순환할까요?

다음과 같이 요소들을 배열로 변환할 수 있습니다:

![이미지](/assets/img/2024-07-07-JavaScriptParentsChildrenandSiblings_5.png)

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

Array.from()을 사용하면 이를 배열로 변환할 수 있습니다.

![이미지](/assets/img/2024-07-07-JavaScriptParentsChildrenandSiblings_6.png)

좋네요. HTMLCollection이 아니라 배열이 된 것이기 때문에 forEach를 사용할 수 있습니다.

팁: Array.from()을 사용하면 실제로 article.children의 원래 값을 변경하지 않습니다. 이는 비파괴적입니다. 그래서 이 줄 이후에 articleParent.children를 로그로 남긴다면 여전히 HTMLCollection을 반환할 것입니다.

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

![JavaScriptParentsChildrenandSiblings_7](/assets/img/2024-07-07-JavaScriptParentsChildrenandSiblings_7.png)

Here I’m cycling through the array and assigning an ‘article-element’ class to each child.

![JavaScriptParentsChildrenandSiblings_8](/assets/img/2024-07-07-JavaScriptParentsChildrenandSiblings_8.png)

So this is a good use of the relationship between the article node and the nodes within it (children).

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

이제 다른 방법을 보여드리겠어요:

![image 1](/assets/img/2024-07-07-JavaScriptParentsChildrenandSiblings_9.png)

h2의 부모 요소를 찾고 싶다면, .parentElement 속성을 사용합니다.

![image 2](/assets/img/2024-07-07-JavaScriptParentsChildrenandSiblings_10.png)

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

이것은 게시물에서 로그아웃합니다.

![2024-07-07-JavaScriptParentsChildrenandSiblings_11.png](/assets/img/2024-07-07-JavaScriptParentsChildrenandSiblings_11.png)

이 줄을 통해 콘솔에 무엇이 출력될지 예상하십니까?

만약 본문을 예상했다면, 정답입니다!

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

![2024-07-07-JavaScriptParentsChildrenandSiblings_12.png](/assets/img/2024-07-07-JavaScriptParentsChildrenandSiblings_12.png)

Now the sibling relationship:

![2024-07-07-JavaScriptParentsChildrenandSiblings_13.png](/assets/img/2024-07-07-JavaScriptParentsChildrenandSiblings_13.png)

This line gets the eleement next to the one you’ve queried. In this case, the h2. So I should get a p tag.

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

![Image 1](/assets/img/2024-07-07-JavaScriptParentsChildrenandSiblings_14.png)

hayoooooo

![Image 2](/assets/img/2024-07-07-JavaScriptParentsChildrenandSiblings_15.png)

This gets the sibling in the opposite direction. Since my h2 doesn’t have a previous sibling, it returns null, BUT if it did, it would return it.

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

DOM을 탐색하는 매우 유연한 방법이에요. DOM에 대한 한 번의 쿼리로 article 태그 내의 모든 것에 액세스할 수 있어요.

다음 글에서는 몇 가지 이벤트 기본 사항을 다룰 거예요. 실제로 개발한 웹 페이지와 상호 작용할 거에요! 그때 봐요!
