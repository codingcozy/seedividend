---
title: "자바스크립트를 사용하여 동적으로 생성된 HTML - 그룹 프로젝트를 활용한 빠른 데모"
description: ""
coverImage: "/assets/img/2024-06-20-DynamicallycreatedHTMLusingJavaScriptAquickdemousingagroupproject_0.png"
date: 2024-06-20 05:59
ogImage:
  url: /assets/img/2024-06-20-DynamicallycreatedHTMLusingJavaScriptAquickdemousingagroupproject_0.png
tag: Tech
originalTitle: "Dynamically created HTML using JavaScript — A quick demo using a group project"
link: "https://medium.com/@jmpresto1/dynamically-created-html-using-javascript-a-quick-demo-using-a-group-project-3a0af111620b"
isUpdated: true
---

JavaScript를 사용하여 HTML 요소를 동적으로 생성하는 것은 당신이 생각하는 것보다 복잡하지 않아요! 중요한 기본 원칙을 기억하면 괜찮아요! 사용자 상호작용 후 페이지 내용이 변경되어야 하는 모든 애플리케이션에는 어떠한 형태의 동적 요소 조작이 필요해요. 여기서는 특히 요소 생성과 "제거" (불완전한 용어로)에 초점을 맞출 거예요.

# 이것을 배워야 하는 이유는?

HTML은 현재 페이지에 있는 내용의 청사진 역할을 할 것이지만, 만약 당신이 그 내용을 버튼을 누르면 변경하고 싶다면 어떻게 할 건가요? 또는 입력을 제출한 후, 입력에 따라 응용 프로그램이 다양한 결과를 반환하길 원한다면 어떡해야 할까요? 최근에 기여한 프로젝트를 예로 들 수 있겠어요.

![image](https://miro.medium.com/v2/resize:fit:1400/1*czD6QBwXt7Oh69m8JXMcvA.gif)

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

요 동적 "주요 칵테일 카드"를 생성하기 위해서 필요한 JavaScript 함수는 실제로 한 가지뿐입니다: element.append().

```js
<section
  id="featured-cocktail"
  class="is-flex-direction-column card py-5 mt-2"
  style="background-color: var(--secondary); color: var(--dark-text)"
></section>
```

```js
const featuredCocktailCard = $("#featured-cocktail");
// ...
featuredCocktailCard.append(content);
```

![이미지](/assets/img/2024-06-20-DynamicallycreatedHTMLusingJavaScriptAquickdemousingagroupproject_0.png)

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

"featuredCocktailCard.append()" 함수 핸들이 호출되면, 괄호 안에 추가된 내용은 선택된 요소(즉, 객체의 이름이 지정된 요소)에 HTML 문서에 삽입됩니다. 이후에는 JavaScript로 작성된 코드지만 HTML 구문과 용어를 따를 것입니다.

```js
featuredCocktailCard.empty().append(`
          <h3 class="is-size-1 card-header-title is-centered">${toTitleCase(cocktailName)}</h3>
          <div id="featuredCocktailSection" class="is-flex is-justify-content-center">
            <div class="columns card-image">`);
```

스크린샷에 캡쳐된 코드 양은 기술적으로 페이지에 추가할 수 있는 HTML의 제한이 없다는 것을 보여줍니다. 그러나, 발생하는 동적 요소 생성을 가능한 경우 여러 함수로 분리하여 더 잘 관리하는 것이 좋습니다. 게다가, 위에서 "append(...)" 앞에 ".empty()"도 있는 것을 알 수 있습니다. ".empty()"는 특징있는 칵테일 카드 ID 내의 모든 요소를 제거하지만, 이를 따라오는 ".append"는 그 후에 콘텐츠를 다시 교체할 것입니다(이 경우 반복 때문에 다른 입력 세트로).

동적 HTML 내에서 사이즈 및 정렬/정렬에 대한 클래스 및 ID 선언이 있음에 유의하십시오. 해당 용어를 알아보셨나요? 요소를 추가하거나 제거하지 않더라도 이것은 알아두어야 할 중요한 옵션입니다: 이제 CSS를 사용하여 동적 요소 조작에 참여할 수 있습니다. HTML을 변경하여 외관을 완전히 변경할 수 있는 새로운 특성 집합을 수용하도록 변경할 수 있습니다!
