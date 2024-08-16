---
title: "앵귤러 애플리케이션 보안 자바스크립트 난독화"
description: ""
coverImage: "/assets/img/2024-05-12-SecuringyourAngularApplicationJavaScriptObfuscation_0.png"
date: 2024-05-12 20:49
ogImage: 
  url: /assets/img/2024-05-12-SecuringyourAngularApplicationJavaScriptObfuscation_0.png
tag: Tech
originalTitle: "Securing your Angular Application : JavaScript Obfuscation"
link: "https://medium.com/@mohanbyte/securing-your-angular-application-javascript-obfuscation-2306fcb24f78"
isUpdated: true
---




<img src="https://miro.medium.com/v2/resize:fit:1400/1*wEYlPHz1sMXAZ6802MPrrw.gif" />

앵귤러는 주로 클라이언트 측 애플리케이션이기 때문에 코드가 사용자에게 노출됩니다. 적절한 기술을 갖추면 애플리케이션을 역공학하거나 내부 로직을 이해할 수 있습니다. 이를 방지하기 위해 코드를 암호화하여 명확함을 줄이고 이해하기 어렵게 만드는 것이 좋습니다.

<img src="/assets/img/2024-05-12-SecuringyourAngularApplicationJavaScriptObfuscation_0.png" />

기본 제공된 앵귤러를 사용할 때 노출되는 것들:



- 서비스
- 구성요소
- 설정

우리 애플리케이션을 안전하게 보호하기 위해 비즈니스 로직을 보호해야 합니다. 데이터를 안전하게 유지하기 위해 코드베이스를 난독화해야 합니다. 그러나 uglifyjs와 같은 도구를 사용할 수 있습니다. 이러한 도구들은 일정한 수준에서 유용하지만, 난독화가 더 나은 결과를 제공합니다.

# 목차

- JavaScript 난독화란 무엇인가요?
- JavaScript 난독화 기법:
- JavaScript 난독화 예시:
- 설치 및 설정
- 빌드 구성 업데이트:
- JavaScript 난독화기에서 제공하는 옵션:
- 결론
- 다음 단계?



# 자바스크립트 난독화란 무엇인가요?

자바스크립트 난독화란 직관적이고 쉽게 읽을 수 있는 자바스크립트 코드를 어렵게 만들어서 이해하기 어렵고 역공학으로 해독하기 어렵도록 변환하는 일련의 코드 변환 기술을 말합니다.

# 자바스크립트 난독화 기술 :

자바스크립트 난독화 기술은 코드를 이해하기 어렵게 하거나 역공학을 어렵게 하거나 변경하기 어렵게 만들기 위해 사용됩니다. 이러한 기술은 코드의 논리와 구조를 흐리게 하면서 기능을 유지하는 것을 목표로 합니다. 여기에 몇 가지 자주 사용되는 자바스크립트 난독화 기술이 있습니다:



변수 이름 변경:

변수 이름을 설명적이지 않거나 짧거나 한 글자로 변경합니다. 이렇게 하면 각 변수의 목적을 이해하기 어려워집니다.

함수 이름 변경:

변수 이름 변경과 마찬가지로 함수의 이름을 변경하여 그 의도된 기능을 숨길 수 있습니다.



문자열 암호화:

코드에서 문자열 리터럴을 암호화하고 런타임에서 복호화하는 것입니다. 이는 코드를 이해하려는 누구에게 추가적인 복잡성을 더합니다.

코드 분할:

코드를 여러 작은 함수 또는 파일로 나눈 다음 동적으로 로딩하거나 결합하는 것을 말합니다. 이렇게 하면 코드 구조가 덜 명백해집니다.



통제 흐름 난독화:

코드의 논리를 혼란스럽게 만들기 위해 불필요하거나 오도하는 제어 흐름 문장(추가 루프 또는 조건문 등)을 도입합니다.

죽은 코드 주입:

사용되지 않거나 관련 없는 코드 조각을 주입하여 혼란을 빚습니다. 이로써 코드의 중요한 부분과 중요하지 않은 부분을 구분하는 것이 어려워집니다.



문자열 연결:

문자열을 분해하고 실행 중에 동적으로 연결하는 것을 말합니다. 이로 인해 코드에서 사용된 실제 문자열을 식별하기 어려워집니다.

인코딩 및 디코딩:

코드의 일부를 인코딩하고 실행 중에 디코딩하는 작업을 의미합니다. 이 과정에는 Base64 인코딩과 같은 기술을 사용합니다.



숫자 변형:

숫자를 수학적 표현이나 다른 숫자 표현으로 대체하여 상수 값을 숨기는 것입니다.

디버깅 방지 기술:

디버거 환경에서 애플리케이션이 실행 중인지 감지하는 코드를 포함하고, 코드의 동작을 이에 맞게 변경하는 것입니다.



# JavaScript 난독화 예제:

다음 코드를 고려해보세요:

```js
function getUserData() {
  if(!user) {
      return {};
    }
    let data = user.auth.providerData[0];
    return {
      name: data.displayName,
      avatar: data.photoURL,
      email: data.email,
      provider: data.providerId,
      uid: user.auth.uid
    };
}
console.log(getUserData());
```

난독화/압축된 코드:



```js
function getUserData() {
  if (!user) return {};
  let e = user.auth.providerData[0];
  return {
    name: e.displayName,
    avatar: e.photoURL,
    email: e.email,
    provider: e.providerId,
    uid: user.auth.uid
  };
}

console.log(getUserData());
```

여기서 코드가 변형되었습니다. 더 자세히 살펴보거나 포매터를 사용하면 코드의 기본 논리를 이해할 수 있습니다.

다른 시나리오에서 억제된 후 :

```js
(function(_0x49e7cc, _0x35d5f6) {
  const _0xdfe59 = _0x3b90,
    _0xd4b26e = _0x49e7cc();

  while (!![]) {
    try {
      const _0x20c64f = parseInt(_0xdfe59(0xf9)) / 0x1 * (-parseInt(_0xdfe59(0xfa)) / 0x2) + -parseInt(_0xdfe59(0xf7)) / 0x3 * (parseInt(_0xdfe59(0xfc)) / 0x4) + parseInt(_0xdfe59(0xee)) / 0x5 * (-parseInt(_0xdfe59(0xf1)) / 0x6) + parseInt(_0xdfe59(0xf5)) / 0x7 + 
        -parseInt(_0xdfe59(0xf4)) / 0x8 + -parseInt(_0xdfe59(0xf2)) / 0x9 + parseInt(_0xdfe59(0xf6)) / 0xa * (parseInt(_0xdfe59(0xf0)) / 0xb);
      
      if (_0x20c64f === _0x35d5f6) break;
      else _0xd4b26e['push'](_0xd4b26e['shift']());
    } catch (_0x29db07) {
      _0xd4b26e['push'](_0xd4b26e['shift']());
    }
  })(_0x53ef, 0xd14a3);

function getUserData() {
  const _0x2d7b7b = _0x3b90;
  if (!user) return {};
  let _0x4c86a3 = user[_0x2d7b7b(0xef)]['providerData'][0x0];
  return {
    'name': _0x4c86a3['displayName'],
    'avatar': _0x4c86a3[_0x2d7b7b(0xfb)],
    'email': _0x4c86a3['email'],
    'provider': _0x4c86a3[_0x2d7b7b(0xf8)],
    'uid': user[_0x2d7b7b(0xef)][_0x2d7b7b(0xf3)]
  };
}

function _0x3b90(_0x40fb4f, _0x21bcc3) {
  const _0x53ef2b = _0x53ef();
  return _0x3b90 = function(_0x3b900f, _0x3ce21b) {
    _0x3b900f = _0x3b900f - 0xee;
    let _0x3732d2 = _0x53ef2b[_0x3b900f];
    return _0x3732d2;
  }, _0x3b90(_0x40fb4f, _0x21bcc3);
}

function _0x53ef() {
  const _0x2e2efd = ['providerId', '254438AtTuWZ', '10GIuQhB', 'photoURL', '4aVsWJI', '20vNbtpg', 'auth', '3729QVEYgK', '340284BhPkpf', '4165182zMXsCd', 'uid', '13082696dHfPHS', '10353784ybaJZp', '98830ItJwbd', '1125051BYspDY'];

  _0x53ef = function() {
    return _0x2e2efd;
  };

  return _0x53ef();
}

console['log'](getUserData());
```



위 코드는 이제 훨씬 복잡하고 이해하기 어려워졌는데, 이는 초기 접근 방식보다 훨씬 나은 결과입니다. 사실 더 많은 난독화 수준을 추가할 수 있으며, 이에 대해 더 이야기할 것입니다.

이제 난독화를 위해 우리의 Angular 애플리케이션을 설정해 봅시다.

# 설치 및 설정:

우리는 javascript-obfuscator 및 wepack-obfuscator 플러그인을 사용하여 코드를 난독화할 것입니다.



귀하는 Angular 어플리케이션에서 위의 패키지들을 다음 명령어를 사용하여 설치할 수 있습니다.

```js
npm install --save-dev javascript-obfuscator webpack-obfuscator
```

웹팩 설정 파일 생성/업데이트 :

위의 플러그인을 설치한 웹팩 설정 파일을 생성하거나 업데이트하려면 기존 웹팩 설정 파일을 다음과 같이 업데이트하실 수 있습니다.



```js
var WebpackObfuscator = require('webpack-obfuscator');
module.exports = {
 module: {
  ...//옵션
  },
```

```js
// Webpack 플러그인 배열
plugins: [
    new WebpackObfuscator ({
       debugProtection: true
    }, ['vendor.js'])
   ]
}
```

우리는 앵귤러 애플리케이션의 빌드/배포를 구성할 것이며, 앞서 작성한 위의 webpack.config를 포함하기 위해 custom-webpack 빌더를 사용하는 angular.json을 업데이트할 것입니다.

## 빌드 구성 업데이트:



아래 명령어를 사용하여 custom-webpack 빌더를 설치하십시오:

- 아래 명령어를 사용하여 앵귤러 커스텀 빌더를 설치하십시오:

```js
npm i @angular-builders/custom-webpack
```

- 아래 코드를 사용하여 angular.json 빌더를 업데이트하십시오.



```js
{
   ...
   "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "customWebpackConfig": {
              "path": "./extra-webpack.config.js",
              "mergeStrategies": {
                "module.rules": "prepend"
              },
            },
            "outputPath": "dist",
            ...          
          }
        }
   }
}
```

이렇게 하면 우리 애플리케이션을 빌드하여 응용 프로그램의 난독화된 코드를 생성할 수 있습니다.

난독화된 빌드 생성:

Angular CLI 옵션을 사용하여 애플리케이션을 빌드하면 됩니다:




```js
ng build
```

빌드 후 우리 애플리케이션에서 노출된 키가 더 이상 보이지 않는 것을 확인할 수 있습니다.

<img src="/assets/img/2024-05-12-SecuringyourAngularApplicationJavaScriptObfuscation_1.png" />

# JavaScript 난독화기에서 제공하는 옵션:



위의 예제에서는 debugProtection을 true로 전달했을 때, 앱 내에서 디버깅을 방지하고 디버거를 활성화한 익명 함수를 삽입하는 결과를 가져옵니다.

![이미지](/assets/img/2024-05-12-SecuringyourAngularApplicationJavaScriptObfuscation_2.png)

주요 옵션 몇 가지:

- stringArray:
문자열 리터럴을 제거하고 특수 배열에 배치합니다. 예를 들어, var m = "Hello World";의 "Hello World" 문자열은 var m = _0x13a678[0x2];와 같은 것으로 대체됩니다.
- stringArrayThreshold:
문자열 리터럴이 stringArray에 삽입될 확률을 조정하는 데 사용할 수 있습니다(0부터 1까지). 기본값은 0.8입니다(1로 유지하면 일부 단계에서 코드가 중단됩니다).
- debugProtection:
위에서 보았듯이 디버깅 보호를 활성화합니다. 활성화된 디버깅 보호 간격(밀리초 단위).
- transformObjectKeys:
객체 키에 대한 변환을 적용할지 여부를 결정합니다(기본값: false).
- forceTransformStrings:
문자열 리터럴 추가가 확률에 기반하기 때문에 특정 키를 강제로 문자열 배열에 추가할 수 있습니다. 정규 표현식 배열을 수락합니다(특수 문자를 포함하는 문자열을 사용할 때 이스케이프 문자를 사용하세요).
- stringArrayEncoding:
문자열 리터럴을 base64 또는 rc4를 사용하여 인코딩합니다. 배열을 수락합니다. 아래 구성에서 stringArray 값은 인코딩되지 않으며 일부 값은 base64 및 rc4 인코딩으로 인코딩됩니다:



```kotlin
stringArrayEncoding: [
    'none',
    'base64',
    'rc4'
]
```

이것들은 유용할 수 있는 몇 가지 인기있는 키들입니다. 관련 정보를 더 읽어보고 여기에서 시도해 볼 수 있어요.

코드 문제가 발생할 경우(정의되지 않은 속성을 가져올 때, 정의되지 않은 속성을 누를 때 또는 prototype이 정의되지 않았을 때 등 몇 가지를 들어봤어요) 아래 구성을 사용해 보세요:

```kotlin
new WebpackObfuscator({
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        debugProtection: false,
        identifierNamesGenerator: 'hexadecimal',
        numbersToExpressions: false,
        renameGlobals: false,
        selfDefending: false,
        simplify: false,
        splitStrings: false,
        stringArray: true,
        transformObjectKeys: false,
        stringArrayCallsTransform: false,
        stringArrayEncoding: [],
        stringArrayIndexShift: false,
        stringArrayRotate: false,
        stringArrayShuffle: false,
        stringArrayWrappersCount: 0,
        stringArrayWrappersChainedCalls: false,
        stringArrayWrappersParametersMaxCount: 2,
        stringArrayWrappersType: 'variable',
        stringArrayThreshold: 1,
        unicodeEscapeSequence: false,
        renamePropertiesMode: 'safe',
        renameProperties: false
    },['vendor.js']),
```



angular 프레임워크 관련 오류를 위해 vendor.js를 포함했어요 (선택 사항입니다). 몇 가지 기본 옵션이 복원되었으며 제거할 수 있어요.

# 결론

우리는 우리의 Angular 코드베이스를 난독화하여 더 안전한 코드로 한 걸음 더 가까워졌어요. 우리가 Angular에 구현했지만, 리액트와 같은 다른 프레임워크에도 구현할 수 있어요.

# 다음은 무엇인가요?



암호화: AES 및 RSA를 사용하여 네트워크 요청을 암호화하여 데이터를 기밀 유지합니다.

참고 문헌: