---
title: "Angular 번들을 분석하는 방법"
description: ""
coverImage: "/assets/img/2024-06-20-HowToAnalyzeAngularBundle_0.png"
date: 2024-06-20 03:01
ogImage:
  url: /assets/img/2024-06-20-HowToAnalyzeAngularBundle_0.png
tag: Tech
originalTitle: "How To Analyze Angular Bundle"
link: "https://medium.com/gitconnected/how-to-analyze-angular-bundle-42529aa22cc4"
isUpdated: true
---

## 세 가지 간단한 도구를 사용하여 Angular 번들 크기를 분석해 보세요

만약 당신의 Angular 애플리케이션의 번들 크기를 알고 싶다면 단순히 `ng build`를 실행하고 터미널에서 결과를 확인할 수 있습니다. 다음과 같은 결과를 얻게 될 것입니다:

![분석 이미지](/assets/img/2024-06-20-HowToAnalyzeAngularBundle_0.png)

이 경우에 원본 크기는 1.02 MB이고 예상 전송 크기는 245.35 kB입니다.

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

안녕하세요!

결과 아래에는 애플리케이션 번들 크기의 구성 요소가 가장 큰 것부터 가장 작은 것까지 나열되어 있습니다.

요령으로 Angular 번들을 살펴볼 수 있는 빠른 방법이겠죠.

이제 이것을 시각화해보고 싶다면 어떻게 할까요? 적어도 몇 가지 방법이 있습니다:

- Webpack Bundle Analyzer (클래식)
- Source Map Explorer
- Esbuild Analyze (Angular `17)

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

# 웹팩 번들 분석기

웹팩 번들 분석기는 "웹팩 출력 파일의 크기를 대화식 확대/축소 트리맵으로 시각화하는 매우 인기 있는 방법"입니다. 그냥 설치하면 바로 사용할 수 있고 충분히 좋을 수도 있습니다.

다음 명령어로 웹팩 번들 분석기를 설치하세요:

```js
npm install --save-dev webpack-bundle-analyzer
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

번들 내용을 시각화하는 가장 쉬운 방법은 package.json에 스크립트를 추가하는 것입니다. 예를 들어:

```js
// package.json

{
    "name": "your-app-name",
    "scripts": {
        "ng": "ng",
        "e2e": "ng e2e",
        "analyze-webpack": "ng build --stats-json && webpack-bundle-analyzer dist/your-app-name/stats.json"
    },
    ...
}
```

그래서 다음 명령을 실행하면

```js
npm run analyze-webpack
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

Angular은 여러분의 앱을 빌드하고 새롭게 생성된 dist/your-app-name 폴더 내에 stats.json 파일을 만듭니다.

마지막으로 webpack-bundle-analyzer는 기본 주소인 http://127.0.0.1:8888/에서 새 탭을 자동으로 엽니다.

Webpack Bundle Analyzer 문서에 나와 있는 대로 번들을 보기 쉽고 간단하게 확인할 수 있습니다.

![Webpack Bundle Analyzer](https://miro.medium.com/v2/resize:fit:1400/0*wsCwLvr_n3lt96pc.gif)

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

덤으로, Webpack Bundle Analyzer는 청크를 필터링할 수 있는 편리한 사이드바를 제공합니다. 가장 큰 부분에 집중하기에 매우 유용합니다.

![이미지](/assets/img/2024-06-20-HowToAnalyzeAngularBundle_1.png)

내 결론: Webpack Bundle Analyzer는 제 요구에 완벽하게 작동합니다. 그러나 2020년에 Angular 팀은 이 빌드 정보가 정확하지 않을 수 있다고 제안했습니다.

해결책으로는 소스 맵 익스플로러를 권장했습니다.

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

# 소스 맵 익스플로러

소스 맵 익스플로러는 코드의 원본을 파악하고 디버깅하는 데 도움을 주는 트리 맵 시각화를 제공합니다.

문서를 따라 설치하려면 전역으로 다음을 실행하세요:

```js
npm install -g source-map-explorer
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

번들 내용을 가장 쉽게 시각화하는 방법은 package.json에 스크립트를 추가하는 것입니다. 예를 들어,

```js
// package.json

{
    "name": "your-app-name",
    "scripts": {
        "ng": "ng",
        "e2e": "ng e2e",
        "analyze-webpack": "ng build --stats-json && webpack-bundle-analyzer dist/your-app-name/stats.json",
        "analyze-sourcemap": "ng build --source-map && source-map-explorer dist/your-app-name/main.js"
    },
    ...
}
```

그래서 다음을 실행하면

```js
npm run analyze-sourcemap
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

안녕하세요! Angular 애플리케이션을 개발하실 예정이시군요. 소스 맵이 함께 제공되어 Source Map Explorer에서 분석할 수 있습니다.

위 스크립트는 main.js를 분석하고 "덜 화려하고" 최소한의 방식으로 시각화할 것입니다. 조금은 슬픕니다.

하지만 상호작용성이 뛰어나고 사용하기 쉽습니다.

![이미지](/assets/img/2024-06-20-HowToAnalyzeAngularBundle_2.png)

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

저의 경우에는 Webpack Bundle Analyzer와 Source Map Explorer로 보고된 정보 사이에 일부 차이점을 발견할 수 있어요. main.js의 크기는 다음과 같습니다:

- Webpack Bundle Analyzer — 630.38 KB
- Source Map Explorer — 630.45 KB

# Esbuild Analyze

Angular v17부터 2024년에는 번들 크기를 검사할 수 있는 esbuild analyze 또는 esbuild-visualizer를 사용할 수 있어요.

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

Angular 문서에 따르면 다음과 같습니다.

![image](/assets/img/2024-06-20-HowToAnalyzeAngularBundle_3.png)

ng build your-app-name --stats-json 명령을 실행하면 응용 프로그램의 루트 폴더 안에 stats.json 파일이 생성됩니다.

그러나 문서에서 제안하는 대로 새로 생성된 stats.json을 esbuild 번들 크기 분석기에 가져오려고 시도하면 작동하지 않는데, 그 이유는 stats.json이 분석기에서 요구하는 메타데이터 JSON 형식과 일치하지 않기 때문입니다.

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

약간 실망스럽네요. 제가 기대했던대로 쉽게 작동될 줄 알았는데요.

그래서 "https://esbuild.github.io/analyze/"으로 분석할 수 있는 'stats.json' 파일을 생성한다는 말은 반 정도 맞습니다. 파일은 받을 수 있지만 사용할 수는 없죠.

아래는 구석통을 설치하는 방법입니다:

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
npm install --save-exact --save-dev esbuild
```

그런 다음 다음과 같은 명령을 루트 폴더의 터미널에서 실행하세요:

```js
./node_modules/.bin/esbuild src/main.ts --bundle --metafile=meta.json --outfile=out.js
```

이렇게 길고 이상한 명령을 한 번에 실행하려면 package.json에 스크립트를 만들었습니다:

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
// packjage.json

{
   "name": "your-app-name",
    "scripts": {
        "ng": "ng",
        "e2e": "ng e2e",
        "analyze-webpack": "ng build --stats-json && webpack-bundle-analyzer dist/your-app-name/stats.json",
        "analyze-sourcemap": "ng build --source-map && source-map-explorer dist/your-app-name/main.js",
        "analyze-esbuild": "ng build && esbuild dist/your-app-name/main.js --bundle --metafile=dist/your-app-name/meta.json --outfile=out.js"
    },
    "dependencies": { ... },
    "devDependencies": { ... },
}
```

따라서,

```js
npm run analyze-esbuild
```

을 실행하면, 애플리케이션 루트 폴더에 meta.json 파일이 생성됩니다. 그런 다음 meta.json을 esbuild 번들 크기 분석기에서 사용하여 번들을 시각화할 수 있습니다.

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

아래 시각화는 썬버스트 차트이지만 다른 유형으로 이동할 수 있어요.

![Sunburst Chart](/assets/img/2024-06-20-HowToAnalyzeAngularBundle_5.png)

## 결론

대부분은 당신의 요구에 따라 다릅니다.

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

내 의견으로는, 대부분의 사용자들이 ng build에서 출력된 원본 크기를 확인하는 것이 도움이 될 것이라고 생각합니다. 원본 크기가 "너무 크다"고 판단될 경우, 어떤 의미인지 논의할 수 있지만 번들 분석 도구를 활용해보는 것이 좋습니다.

내 의견으로는 가장 빠른 해결책은 webpack-bundle-analyzer입니다. 그러나 esbuild-analyze와 비교했을 때 시각화 가능성 면에서 약간 부족하다고 생각합니다.
