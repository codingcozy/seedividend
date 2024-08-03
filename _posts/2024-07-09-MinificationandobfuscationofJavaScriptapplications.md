---
title: "자바스크립트 애플리케이션의 Minification과 Obfuscation 사용 방법"
description: ""
coverImage: "/assets/img/2024-07-09-MinificationandobfuscationofJavaScriptapplications_0.png"
date: 2024-07-09 18:39
ogImage:
  url: /assets/img/2024-07-09-MinificationandobfuscationofJavaScriptapplications_0.png
tag: Tech
originalTitle: "Minification and obfuscation of JavaScript applications"
link: "https://medium.com/@ajit.singh252504/minification-and-obfuscation-of-javascript-applications-0d84711ffaf6"
---

# JavaScript 코드 난독화란 무엇인가요?

JavaScript 코드 난독화는 코드를 덜 읽기 쉽고 이해하기 어려운 형태로 변환하는 기술로, 미인가된 개인들이 코드를 역공학화하거나 조작하는 것을 어렵게 만듭니다.

![image](/assets/img/2024-07-09-MinificationandobfuscationofJavaScriptapplications_0.png)

본질적으로, 난독화는 사람들이 이해하기 어렵게 코드를 변형하는 과정이지만, 기계가 여전히 기능적인 형태로 유지할 수 있도록 하는 것입니다. JavaScript의 맥락에서는 소스 코드를 변형하여 기능을 유지한 채 숨기는 것을 의미합니다. 목표는 잠재적인 적들이 원래 코드의 논리를 역공학화하거나 이해하는 것을 어렵게 만드는 것입니다.

<div class="content-ad"></div>

암호화는 절대적인 보안이나 암호화를 제공하지는 않는다는 것을 명심해주세요. 대신, 암호화는 악의적인 공격자들에 대한 억제요소로 작용하여 공격자들의 장벽을 높이고 그들의 노력을 덜 가치 있게 만듭니다. 결연한 해커들은 여전히 암호화된 코드를 역공학으로 해독할 수 있지만, 암호화는 그들의 속도를 늦추고 경제적으로 덜 유리하게 만들 수 있습니다.

# JavaScript 코드를 암호화하는 이유

## 1. 지적 재산권 보호

JavaScript 코드를 암호화하는 주된 동기 중 하나는 지적 재산을 보호하는 것입니다. 기업들은 혁신적인 알고리즘과 논리를 개발하는 데 상당한 시간, 노력 및 자원을 투자합니다. 암호화는 경쟁 업체가 이러한 귀중한 자산을 복사하거나 이해하는 것을 더 어렵게 만듭니다.

<div class="content-ad"></div>

## 2. 코드 조작 방지

난독화는 자바스크립트 코드를 악의적으로 조작하는 것을 방지하는 데 도움이 될 수 있습니다. 코드를 난독화하면 공격자가 해로운 스크립트나 악용을 삽입할 취약 지점을 쉽게 식별하지 못할 수 있습니다.

## 3. 라이선스 강제

상용 소프트웨어의 경우, 개발자는 라이선스 조항을 강제하기 위해 난독화를 사용할 수 있습니다. 라이선스 확인을 수정하거나 제거하기 어렵게 만들면, 개발자는 소프트웨어에 대한 액세스를 더 잘 제어할 수 있습니다.

<div class="content-ad"></div>

## 4. 코드 도난 방지

난독화는 다른 사람이 당신의 코드를 훔치는 것을 더 어렵게 만들 수 있습니다. 누군가가 당신의 코드를 훔치게 되더라도 이해하기 어려워져서 사용하기도 더 어려워질 것입니다.

## 5. 대역폭 사용량 감소

난독화 과정에 종종 포함되는 최소화(minification)는 코드 크기를 줄여 대역폭 사용량을 줄이고 웹 애플리케이션의 빠른 로드 시간을 이끌어냅니다.

<div class="content-ad"></div>

# JavaScript 코드를 난독화하는 기술

## 1. 최소화

최소화는 난독화 과정 중 첫 번째 단계입니다. 이는 코드에서 공백을 제거하고 변수 및 함수 이름을 줄이며 주석을 제거하는 것을 포함합니다. 이 기술은 코드를 실제로 난독화하지는 않지만 사람들에게는 덜 읽기 쉽도록 만듭니다. UglifyJS나 Terser와 같은 여러 도구를 사용하여 JavaScript 최소화를 수행할 수 있습니다.

## 2. 변수 및 함수 이름 변경

<div class="content-ad"></div>

의미 있는 변수와 함수 이름은 개발자의 가장 친한 친구입니다. 그러나 그것들은 역공학자들에게 큰 자산이 될 수도 있습니다. 변수와 함수의 이름을 암호화되어 해독하기 어렵고 설명이 없는 이름으로 변경함으로써, 당신의 코드를 이해하려는 누구에게나 복잡함을 더해줄 수 있습니다.

## 3. 문자열 및 함수 암호화

코드 내에서 문자열과 함수를 암호화하는 것을 고려해보세요. 런타임에서 그들을 복호화할 수는 있지만, 잠재적인 공격자들에게 추가적인 어려움을 더할 수 있습니다.

## 4. 코드 분할 및 자체 실행 함수

<div class="content-ad"></div>

여러 파일로 코드를 분할하고 셀프 실행 함수 내에 코드를 포장하세요. 이 기술을 사용하면 성능을 향상시킬뿐만 아니라 공격자가 전체 코드베이스를 파악하는 것을 어렵게 만들 수 있습니다.

## 5. 제어 흐름 난독화

이 방법은 코드의 제어 흐름을 변형하는 것을 포함합니다. 코드를 펴는(code flattening), 루프를 풀어 펴는(loop unrolling), 랜덤 코드 삽입과 같은 기술을 사용하여 실제 실행 순서를 이해하기 어렵게 만듭니다.

## 6. 죽은 코드 삽입

<div class="content-ad"></div>

# 웹팩을 사용하여 JS 애플리케이션의 코드 최소화 및 난독화

ES 모듈을 기반으로 한 애플리케이션을 난독화하는 것은 모듈 및 관련 종속성을 포함한 코드베이스 전체에 JavaScript 난독화를 적용하는 것을 의미합니다. 이를 위해 우리는 널리 사용되는 "terser" 라이브러리를 활용할 것입니다. 이 라이브러리는 JavaScript 애플리케이션의 코드 최소화와 난독화에 인기 있는 선택지입니다. 또한 빌드 도구인 rollup과 같은 도구를 사용하여 빌드 및 난독화 과정을 처리할 것입니다.

ES 모듈을 다루고 코드를 난독화하고자 한다면, 다음 단계를 따라 진행할 수 있습니다:

<div class="content-ad"></div>

단계 1: 클라이언트 사이드 폴더의 루트에서 npm을 초기화하세요:

```js
npm init -y
```

단계 2: 폴더 루트에 필요한 패키지를 설치하세요:

```js
npm i -D webpack webpack-cli terser-webpack-plugin
```

<div class="content-ad"></div>

Step 3: 이제 프로젝트 루트에 webpack 설정 파일인 webpack.config.js를 다음 내용으로 생성해보세요:

```js
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
```

```js
module.exports = {
  mode: "production", // 다양한 webpack 최적화 기능을 활성화합니다.
  entry: {
    app: "./src/index.js", // 프로젝트의 메인 진입 파일
    // 다른 js 자산 파일 추가하기
  },
  output: {
    path: path.resolve(__dirname, "dist"), // 출력 디렉토리
    publicPath: "/dist/", // 공개 URL 경로
    filename: "[name].js", // [name]이 진입 이름으로 대체됩니다.
    chunkFilename: "[name][contenthash].js", // 해시를 포함하는 [name].[contenthash].js 사용
    clean: true, // 각 빌드 전에 출력 디렉토리를 정리합니다.
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          mangle: true, // 변수 이름 난독화 활성화
          compress: {
            drop_console: true, // console.log 문장 제거
            drop_debugger: true,
          },
          output: {
            comments: false, // 주석 제거
          },
        },
      }),
    ],
  },
};
```

예제 프로젝트 메인 진입 파일: src/index.js

<div class="content-ad"></div>

```js
import App from "./app.vue.js";
import router from "./routes/index.js";
```

```js
const { createApp } = Vue;
const app = createApp(App);
app.use(router);
app.mount("#app");
```

Step 4: Add a script ' “build”: “webpack –config webpack.config.js” ', in your package.json file

```js
{
  …
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
   "build": "webpack --config webpack.config.js",
    …
 },
```

<div class="content-ad"></div>

```js
  …
 }
```

자세한 내용은 여기를 클릭해주세요.
