---
title: "리액트 앱을 Vite로 만드는 방법"
description: ""
coverImage: "/assets/img/2024-06-19-HowToCreateaReactAppwithVite_0.png"
date: 2024-06-19 23:57
ogImage:
  url: /assets/img/2024-06-19-HowToCreateaReactAppwithVite_0.png
tag: Tech
originalTitle: "How To Create a React App with Vite"
link: "https://medium.com/@miahossain8888/how-to-create-a-react-app-with-vite-571883b100ef"
isUpdated: true
---

![이미지](/assets/img/2024-06-19-HowToCreateaReactAppwithVite_0.png)

이 튜토리얼은 처음으로 Vite를 사용하여 React 프로젝트를 만들고 싶어하는 분들을 위한 것입니다. React 프로젝트를 만드는 다양한 방법이 있지만, 이 튜토리얼에서는 Vite와 npm 패키지 매니저를 사용하여 React 프로젝트를 생성하는 방법을 안내하겠습니다. yarn과 같은 다른 패키지 매니저도 사용할 수 있습니다.

# 준비 사항

- Node 버전 ≥ 18
- NPM 버전 8

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

Vite는 Node.js 버전 ≥ 18과 npm 버전 8을 필요로 합니다. 그러나 일부 템플릿은 작동하려면 더 높은 Node.js 버전이 필요합니다.

# Vite 프로젝트 만들기

Vite를 사용하여 React 프로젝트를 만들려면 먼저 터미널을 사용하여 원하는 폴더로 이동해야 합니다.

여기서 두 가지 다른 방법을 보여드리겠습니다.

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

## 방법 1:

다음 명령어를 실행해보세요

```js
npm create vite@latest
```

![이미지](/assets/img/2024-06-19-HowToCreateaReactAppwithVite_1.png)

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

여기에 프로젝트 이름을 지정해주세요. 해당 이름은 프로젝트 폴더의 이름이 됩니다.

![프로젝트 이미지](/assets/img/2024-06-19-HowToCreateaReactAppwithVite_2.png)

제 경우에는 프로젝트 이름이 my-app입니다.

![프로젝트 이미지](/assets/img/2024-06-19-HowToCreateaReactAppwithVite_3.png)

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

키보드 화살표를 사용하여 React를 선택한 후 엔터키를 눌러주세요.

![React image](/assets/img/2024-06-19-HowToCreateaReactAppwithVite_4.png)

타입스크립트 또는 자바스크립트 중 원하는 것을 선택해주세요. 저는 자바스크립트를 선택했습니다. 그리고 엔터키를 눌러주세요.

![JavaScript image](/assets/img/2024-06-19-HowToCreateaReactAppwithVite_5.png)

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

해결되었습니다.

## 접근법 2:

또한, 한 번의 명령으로 Vite를 사용하여 React 프로젝트를 생성할 수 있습니다.

```js
npm create vite@latest my-app -- --template react
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

<img src="/assets/img/2024-06-19-HowToCreateaReactAppwithVite_6.png" />

완료되었습니다.

## 의존성 설치 및 프로젝트 실행

```js
cd my-app
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

이제 프로젝트 폴더로 이동하세요.

```js
npm install
```

의존성을 설치하기 위해 실행하세요.

```js
npm run dev
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

마침내, 프로젝트를 시작해보세요.

![이미지](/assets/img/2024-06-19-HowToCreateaReactAppwithVite_7.png)

현재 저의 경우, 애플리케이션이 http://localhost:5173 에서 실행되고 있습니다. 다른 사람들이 이미 사용 중일 때에는 포트 번호가 다를 수 있습니다.

# 결론

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

이 기사에서는 Vite를 사용하여 React 프로젝트를 만드는 방법을 보여드렸어요.
공식 문서는 여기서 확인할 수 있어요.
