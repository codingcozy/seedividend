---
title: "미디어 쿼리에서 CSS 색상 변수를 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-EngineeringCSSColorVariablesinMediaQueries_0.png"
date: 2024-06-22 03:43
ogImage:
  url: /assets/img/2024-06-22-EngineeringCSSColorVariablesinMediaQueries_0.png
tag: Tech
originalTitle: "Engineering: CSS Color Variables in Media Queries"
link: "https://medium.com/@naqvishahwar120/engineering-css-color-variables-in-media-queries-7015fcfcccd6"
isUpdated: true
---

공학 (CSS)

![EngineeringCSS](/assets/img/2024-06-22-EngineeringCSSColorVariablesinMediaQueries_0.png)

# 미디어 쿼리에서 CSS 변수 사용하기

- 미디어 쿼리를 사용하면 장치의 특성에 따라 너비, 높이 등을 기준으로 다른 스타일을 적용할 수 있습니다. CSS 변수와 미디어 쿼리를 결합하여 변수의 값들을 동적으로 변경하여 반응형 디자인을 만들 수 있습니다.

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

# 예시

![EngineeringCSSColorVariablesinMediaQueries_1](/assets/img/2024-06-22-EngineeringCSSColorVariablesinMediaQueries_1.png)

![media queries](https://miro.medium.com/v2/resize:fit:1200/1*VUoWXkS1fU3pKCBe7jX7Tg.gif)

- 미디어 쿼리에 초점을 맞추면,

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

```js
@media (min-width: 600px) {
            :root {
                --alam-bg-color: #06c0ee;
            }
        }

@media (min-width: 900px) {
            :root {
                --alam-bg-color: #A3FF36
            }
}
```

- 뷰포트 너비에 따라 --alam-bg-color 값이 변경되는 미디어 쿼리를 두 개 정의했습니다. 600px와 900px입니다.

600px 이상을 위한 미디어 쿼리:

- 뷰포트 너비가 600px 이상일 때, --alam-bg-color 변수가 #06c0ee (라이트 블루)로 재정의됩니다.
- 이는 body의 배경 색상이 라이트 블루로 변경됨을 의미합니다.

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

900px 이상의 미디어 쿼리:

- 뷰포트 너비가 적어도 900px 이상일 때, --alam-bg-color 변수가 다시 #A3FF36 (라이트 그린) 으로 재정의됩니다.
- 본문의 배경색이 라이트 그린으로 변경됩니다.

600px 미만인 경우?

- 너비가 600px 미만일 경우, 배경색은 기본 alam-yellow로 설정됩니다.

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

![image 1](/assets/img/2024-06-22-EngineeringCSSColorVariablesinMediaQueries_2.png)

![image 2](/assets/img/2024-06-22-EngineeringCSSColorVariablesinMediaQueries_3.png)
