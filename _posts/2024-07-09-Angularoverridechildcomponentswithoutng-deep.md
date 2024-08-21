---
title: "Angular ng-deep 없이 자식 컴포넌트 오버라이드하는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-Angularoverridechildcomponentswithoutng-deep_0.png"
date: 2024-07-09 18:51
ogImage:
  url: /assets/img/2024-07-09-Angularoverridechildcomponentswithoutng-deep_0.png
tag: Tech
originalTitle: "Angular: override child components without ng-deep"
link: "https://medium.com/@vugar-005/angular-override-child-components-without-ng-deep-c76e691082d4"
isUpdated: true
---

![Image](/assets/img/2024-07-09-Angularoverridechildcomponentswithoutng-deep_0.png)

자식 컴포넌트의 스타일을 수정하고 싶다고 가정해 봅시다.

✅ ng-deep를 사용하고 싶지 않으므로 깔끔하고 네이티브한 접근 방법을 찾고 있습니다.

✅ 호스트 선택자를 회피하여 자식 컴포넌트 스타일이 불필요하게 커지는 것을 피하고 싶습니다.

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

💎 실시간 데모: [여기를 클릭해주세요](https://stackblitz.com/edit/stackblitz-starters-lvddww)

# 목표:

실제 시나리오를 고려해 봅시다: 스타일을 지정하고자 하는 게시물 카드 구성 요소가 있습니다. 현재 HTML 및 SCSS 구조는 다음과 같습니다:

![이미지](/assets/img/2024-07-09-Angularoverridechildcomponentswithoutng-deep_1.png)

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

다음은 Markdown 형식으로 표시됩니다:

```js
<div class="post">
  <h3 class="post__title">{ title }</h3>
  <button class="post__btn">
    <a [href]="link"> Read More</a>
  </button>
</div>
```

```js
:host {
  display: block;
}

.post {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 600px;
  box-shadow: 0px 1px 7px rgb(34 35 58 / 20%);
  background: #fff;

  &__title {
    padding: 10px;
    font-size: 1.8rem;
    font-weight: 600;
    margin: 0px;
    color: #000;
  }

  &__btn {
    background: #f1c40f;
    border-radius: 4px;
    border: 0;
    padding: 0 16px 0 16px;
    height: 36px;
    margin-left: 10px;
    cursor: pointer;
    a {
      text-decoration: none;
    }
  }
}
```

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

우리는 아래와 같이 포스트 카드 스타일을 전환하려고 합니다:

<img src="/assets/img/2024-07-09-Angularoverridechildcomponentswithoutng-deep_2.png" />

## 해결책 🚀:

우리의 목표는 포스트 카드 컴포넌트의 스타일을 위의 디자인과 비슷하게 변형하는 것입니다. 그러나 중첩된 컴포넌트의 스타일을 직접 코딩하는 대신에 CSS 변수를 사용하여 부모 컴포넌트에서 이러한 변수를 조작할 수 있습니다.

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

새롭고 개선된 post-card의 SCSS 구조입니다:

```js
:host {
  display: block;
}

.post {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 600px;
  box-shadow: 0px 1px 7px rgb(34 35 58 / 20%);
  background: var(--post-card-background, #fff);

  &__title {
    padding: 10px;
    font-size: var(--post-card-title-font-size, 1.8rem);
    font-weight: 600;
    margin: 0px;
    color: var(--post-card-title-color, #000);
  }

  &__btn {
    background: var(--post-card-btn-background, #f1c40f);
    border-radius: 4px;
    border: 0;
    padding: 0 16px 0 16px;
    height: 36px;
    margin-left: 10px;
    cursor: pointer;
    a {
      text-decoration: none;
    }
  }
}
```

그러니까 좀 더 자세히 설명해보겠습니다.

```js
background: var(--post-card-background, #fff);
```

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

위의 코드는 'var( — post-card-background)'를 배경색으로 사용하되 만약 해당 CSS 변수가 없다면 기본값 (#fff)을 사용하도록 하는 것을 의미합니다 😎.

이제 모든 부모 구성 요소에서 이러한 CSS 변수를 재정의할 수 있습니다. 그래서 우리의 부모 post-list 컴포넌트에서는 다음과 같이 할 수 있습니다.

```js
.post-card {
  --post-card-btn-background: #27ae60;
  --post-card-background: #34495e;
  --post-card-title-color: #fff;
}
```

그리고 HTML 구조는 다음과 같습니다:

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
<div class="post-list">
  <post-card class="post-card" />
</div>
```

여기까지입니다. 간결하게 유지하려고 노력했어요. 유용하게 사용하시기 바랍니다 🙂.

💎 소스 코드: https://stackblitz.com/edit/stackblitz-starters-lvddww

제 소개: 저는 주니어 프론트엔드 개발자에요.

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

트위터: https://twitter.com/Vugar005

다른 블로그나 프로젝트도 함께 확인해 보세요 💎:
