---
title: "TypeScript 55 버전에 추가된 3가지 내용 정리"
description: ""
coverImage: "/assets/img/2024-05-17-3ExcitingNewFeaturesinTypeScript55_0.png"
date: 2024-05-17 20:24
ogImage: 
  url: /assets/img/2024-05-17-3ExcitingNewFeaturesinTypeScript55_0.png
tag: Tech
originalTitle: "3 Exciting New Features in TypeScript 5.5"
link: "https://medium.com/gitconnected/3-exciting-new-features-in-typescript-5-5-53b299090d71"
isUpdated: true
---




<img src="/assets/img/2024-05-17-3ExcitingNewFeaturesinTypeScript55_0.png" />

TypeScript 세계에서는 항상 개발자 경험을 업그레이드하기 위해 새로운 기능들이 지속적으로 추가됩니다.

오늘도 예외는 아닙니다. TypeScript 버전 5.5가 공식적으로 발표되었습니다!

이 기사에서는 TypeScript의 이 새로운 장을 준비하는 3가지 혁신적인 기능을 살펴보겠습니다.

<div class="content-ad"></div>

거두 절미하고... 지금 시작해 봐요!

## 1. 추론된 유형 예측

이게 무슨 의미인지 살펴보기 전에, 유형 예측이 무엇인지 정의해 봅시다.

다음은 어떤 입력의 유형을 문자열로 좁히는 유형 예측의 예시입니다:

<div class="content-ad"></div>

```js
let x = "test"

// `is` 키워드로 표시된 타입 예측자.
function isString(variable: any): variable is string {
  return typeof variable === "string"
}

if (isString(x)) {
  console.log(x.trim())
}
```

이제 타입 예측자에 대해 이해했으니, 유추된 부분은 어디에 있는 걸까요?

인덱스 3에 하나의 null 값만 있는 숫자 배열을 상상해보세요.

```js
const nums = [1, 2, 3, null, 5].filter((x) => x !== null)

// nums = [1, 2, 3, 5]
// 하지만 타입은 여전히 (number | null)[] 유지됩니다!
```

<div class="content-ad"></div>

- Null 값을 제외하기 위해 필터 함수를 적용했어요.
- 필터링된 배열에 더 이상 null 값이 없으므로 nums의 타입이 number[]가 되기를 기대합니다.

하지만 아쉽게도 현재 이것은 불가능하여 nums의 타입은 그대로 유지됩니다.

하지만 TypeScript 5.5에서 이 문제가 해결됩니다!

TS 5.5에서는 filter 함수가 결과 배열의 타입을 정확하게 추론하기 위해 암시적으로 타입 예측자를 호출합니다.

<div class="content-ad"></div>

아래는 유형 예측 함수가 실제로 어떻게 보일 수 있는지 예시입니다:

```js
// `filter` 함수 내 각 요소에 대해 호출됨
function isNotNull(x: number | null) {
  return x !== null;
}
```

# 2. 정규식 검사

또 다른 멋진 기능은 TypeScript 유형 검사기를 통해 정규식을 유효성 검사할 수 있는 능력입니다.

<div class="content-ad"></div>

TS 5.5 발표에서 문법 오류가 정규 표현식에서 캐치되는 훌륭한 예시가 있어요:

```js
let myRegex = /@robot(\s+(please|immediately)))? do some task/
//                                            ~
// error!
// Unexpected ')'. Did you mean to escape it with backslash?
```

또한, 이 기능은 구문 분석만이 아닙니다!

네 맞아요, 타입 체커는 이 예시에서 보여준 것처럼 정규 표현식에서 존재하지 않는 역참조와 같은 의미론적 문제도 잡아낼 수 있어요:

<div class="content-ad"></div>

```js
let myRegex = /@typedef \{import\((.+)\)\.([a-zA-Z_]+)\} \3/u;
//                                                        ~
// 오류!
// 이 역참조는 존재하지 않는 그룹을 가리킵니다.
// 이 정규식에는 캡처 그룹이 2개만 있습니다.
```

# 3. 상수 인덱스 액세스 범위 좁히기

이제 TypeScript는 obj[key] 형식의 표현식을 좁힐 수 있습니다. 이는 obj와 key가 상수여야만 가능합니다.

다음은 TypeScript 5.5 공식 발표의 예제를 적용한 것입니다.

<div class="content-ad"></div>

```js
function changeUnkownValue(obj: Record<string, unknown>, key: string) {
  if (typeof obj[key] === "string") {
    // Now okay, previously was error
    obj[key].toUpperCase()
  }
}
```

이전에는 색인 액세스를 사용하여 알 수 없는 Record 값의 유형을 추론할 수 없었습니다.

이 경우 typeof 키워드를 사용하여 알 수없는 타입을 추론하지 못했기 때문에 obj[key].toUpperCase()가 에러를 발생시켰습니다.

TypeScript 5.5에서는 이 문제가 해결되었으며 코드에서 더 이상 문제가 발생하지 않습니다.

<div class="content-ad"></div>

# 결론

TypeScript 5.5에서는 커뮤니티에서 오랫동안 기다려온 많은 흥미로운 기능들이 소개되었습니다.

이러한 기능 중에서 이 3가지를 강조하여 이번에 꼭 필요한 업그레이드의 중요성을 부각했습니다.

# 더 많은 읽기 📖 

<div class="content-ad"></div>

# 제휴사

- All-in-One SaaS 프로젝트 템플릿
- Figma Home: 내 모든 프로젝트에서 사용하는 UI 디자인 도구.
- Figma Professional: 당신이 필요로 하는 유일한 UI 디자인 도구.
- FigJam: 직관적인 다이어그램 및 아이디어 회의로 마음을 자유롭게 발산시킬 수 있습니다.

- Notion: 내 전체 인생을 조직하는 데 사용되는 도구.
- Notion AI: ChatGPT를 능가하는 AI 도구로 Notion 워크플로우를 급속히 향상시킬 것입니다.

# 참고문헌

<div class="content-ad"></div>

- 맷 포콕 쓰레드
- TS 5.5 마이크로소프트 블로그
- 타입 프레디케이트