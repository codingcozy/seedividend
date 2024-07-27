---
title: "Vanjs  마법 같은 웹 개발 프레임워크 소개"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-12-Vanjsmagic_0.png"
date: 2024-07-12 19:21
ogImage: 
  url: /ui-log-2/assets/img/2024-07-12-Vanjsmagic_0.png
tag: Tech
originalTitle: "Vanjs — magic!"
link: "https://medium.com/javascript-in-plain-english/vanjs-magic-53734fe52d30"
---



![Vanjs Logo](/ui-log-2/assets/img/2024-07-12-Vanjsmagic_0.png)

jQuery를 그리워하셨나요? $가 DOM을 JavaScript로 조작하는 방법을 기억할 필요 없이 도와줬나요? 시간이 흘러도 계속해서 더 좋아졌지만, 여전히 우아한 라이브러리에 여유 공간이 있습니다. 특히 해당 라이브러리가 130줄 뿐이라면, vanjs에 환영합니다.

다음과 같은 HTML 페이지가 있습니다:

```html
<!doctype html>
<html lang="en">
    <head>
        <title>Welcome</title>
        <script type="importmap">
            {
                "imports": {
                    "vanjs-core": "https://esm.sh/vanjs-core"
                }
            }
        </script>
        <script type="module" src="site.js"></script>
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

그럼 "hello world"가 들어있는 div를 추가해 보겠습니다.

```js
import van from 'vanjs-core'
const {div} = van.tags

van.add(document.body, div('hello world'))
```

마법을 느끼셨나요? 두 번째 줄은 import가 아니라 상수 선언입니다. 그렇습니다, van.tags는 당신이 필요로 할 때 함수를 동적으로 생성합니다. 일반적으로 마법같은 것을 싫어하는 편인데, 자바스크립트는 재미있고 그것을 공개하는 것을 칭찬받아야겠죠 (DOM 구현이 아닌 언어를 가리키고 있습니다). 물론, 아래와 같이 작성할 수도 있습니다:

```js
const div = document.createElement('div')
div.appendChild(document.createTextNode('hello world'))
document.body.appendChild(div)
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

그리고 라이브러리를 추가할 필요가 없어요. 하지만 그런 방법으로는 재미가 덜해요.

```js
const welcome = div({class:"bright"},"hello world")
van.add(document.body, welcome)
```

바닐라 방식으로는…

```js
const div = document.createElement('div')
div.className = 'bright'
div.appendChild(document.createTextNode('hello world'))
document.body.appendChild(div)
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

마크다운 형식으로 표를 변경하였습니다. 위에 있는 어휘들은 다루는 것이 많이 줄어들었죠. 하지만 그게 전부가 아닙니다. 반응 상태도 알고 계신가요? 저희 130줄의 라이브러리에도 그 기능이 있답니다...

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

이 작은 라이브러리에는 동사 두 개가 더 있어요: derive()와 hydrate(). derive()는 watch 유형 함수로, 바디에 참조된 항목에 변경이 발생할 때 호출되는 함수에요. 다른 하나는 서비스 사이드 렌더링(SSR)을 동반하는 것이죠.

Derive는 부차적인 효과를 가능하게 합니다. 예를 들어, 답변에 행복한 얼굴이나 슬픈 얼굴을 동반하고 싶다고 해봅시다. "Yes definitely"보다 큰 모든 답변이 부정적이라는 것을 알 수 있어요...

```js
const emotion = van.derive(() => {
  if (ANSWERS.indexOf(answer.val) > 6) {
    return NEGATIVE;
  }
  return POSITIVE;
});
```

이제 이것을 출력 div에 추가할 수 있어요.

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


js
div(emotion, " ", answer),


해당 페이지가 다음과 같이 보입니다:

<img src="/ui-log-2/assets/img/2024-07-12-Vanjsmagic_1.png" />

작은 호스트에 올려봤어요... 🎱


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

Vue와 Vite을 사용하고 있어요. 코드, 템플릿 및 스타일을 한 파일에 분리할 수 있어서 편리해요. 템플릿은 여전히 xml 형식이고, 코드도 계속해서 더 쉬워지고 좋아져요. 하지만 때로는 작은 라이브러리가 필요할 때가 있고, 그럴 땐 바닐라 자바스크립트가 필요하죠.

여기까지 왔다면 웃을 거리가 있겠죠. ChatGTP가 이 글에 대해 이렇게 생각했다고 해요:

"나는 jQuery를 그리워하지 않아요! AI가 칭찬해준다면 나쁜 것만은 아니겠지요?"

# 간단한 영어로 🚀

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

단어를 사용해주셔서 감사합니다. In Plain English 커뮤니티에 참여해주셔서 감사합니다! 떠나시기 전에:

- 작가를 클랩하고 팔로우해주세요 ️👏️️
- 저희를 팔로우해주세요: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼을 방문해보세요: Stackademic | CoFeed | Venture | Cubed
- 알고리즘 컨텐츠를 다루는 블로깅 플랫폼에 지치셨나요? Differ를 시도해보세요
- PlainEnglish.io에서 더 많은 콘텐츠를 만나보세요