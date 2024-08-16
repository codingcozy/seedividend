---
title: "자바스크립트 구글 면접 문제 - Stringify와 Parse의 Polyfill"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "JavaScript Google Interview Question  Polyfill of Stringify and Parse"
link: "https://medium.com/gitconnected/javascript-google-interview-question-polyfill-of-stringify-and-parse-c9b370b11027"
isUpdated: true
---





# 다루는 주제:

프론트엔드 인터뷰 질문: 내 유튜브 채널을 구독해주세요: https://www.youtube.com/channel/UC-elmWUfbcbmvuhlS12nCtg

# stringify(myObject)의 폴리필을 작성하여 myObject를 JSON 문자열로 변환하십시오.

해결 방법:

<div class="content-ad"></div>

- 값이 null인 경우 문자열 "null"을 반환합니다.
- 값이 숫자 또는 부울인 경우 문자열로 변환하여 반환합니다.
- 값이 문자열인 경우 이를 쌍따옴표로 둘러싸 반환합니다.
- 값이 배열인 경우 각 요소에 대해 재귀적으로 stringify를 호출하고 결과 문자열을 쉼표와 함께 결합하여 대괄호로 둘러싸 반환합니다.
- 값이 순수한 객체인 경우 (함수가 아닌 경우 등) 각 값을 재귀적으로 stringify를 호출하고 undefined 및 함수 등 직렬화할 수 없는 값을 무시하며 각 키-값 쌍을 중괄호로 둘러싸 문자열을 구성합니다.

입력:

```js
// 사용 예:
var myObject = {
  name: "Alice",
  age: 30,
  isStudent: false,
  hobbies: ["reading", "gaming", "hiking"],
  details: {
    hair: "brown",
    height: 165,
  },
  // 직렬화할 수 없는 속성(함수)은 출력에서 무시됩니다
  greet: function () {
    return `Hello, my name is ${this.name}`;
  },
};
```

구현:

<div class="content-ad"></div>

```js
function stringify(value) {
  // 만약 값이 null이면 "null" 문자열을 반환합니다
  if (value === null) {
    return "null";
  }

  // 값이 숫자이거나 boolean이면 문자열로 변환하여 반환합니다
  if (typeof value === "number" || typeof value === "boolean") {
    return value.toString();
  }

  // 값이 문자열이면 쌍따옴표로 둘러싸인 문자열을 반환합니다
  if (typeof value === "string") {
    return `"${value}"`;
  }

  // 값이 배열이면 각 요소에 대해 재귀적으로 stringify를 호출하여
  // 결과 문자열을 콤마로 연결하고 대괄호로 둘러싸여 반환합니다
  if (Array.isArray(value)) {
    const arrayContents = value.map((element) => stringify(element)).join(",");
    return `[${arrayContents}]`;
  }

  // 값이 함수가 아닌 일반 객체인 경우, 각 값에 대해 재귀적으로 호출하여
  // 직렬화할 수 없는 값(예: undefined 및 함수)은 무시하고 각 키-값 쌍을 중괄호로 둘러싸인 문자열로 구성합니다
  if (typeof value === "object") {
    const keys = Object.keys(value);
    const keyValuePairStrings = keys
      .map((key) => {
        const valString = stringify(value[key]);
        if (valString === undefined || typeof value[key] === "function") {
          // 직렬화할 수 없는 값인 undefined 및 함수를 건너뜁니다 (올바른 JSON이 아니기 때문에)
          return "";
        }
        return `"${key}":${valString}`;
      })
      .filter(Boolean); // 직렬화할 수 없는 값에 의한 undefined 값 제거
    return `{${keyValuePairStrings.join(",")}`;
  }

  // JSON으로 직렬화할 수 없는 다른 모든 형식(예: undefined 또는 함수)의 경우,
  // 객체 케이스에서 필터링되어 반환될 것입니다
  return undefined;
}

console.log(stringify(myObject)); // myObject의 JSON 문자열 표현을 출력합니다
```

# parse()의 폴리필 작성 - JSON 문자열을 자바스크립트 객체로 변환하는 함수

입력:

```js
var jsonString = '{"name":"Alice","age":30,"isStudent":false}';
```

<div class="content-ad"></div>

구현:

이 예시는 eval을 사용하는데, 이 함수는 임의의 JavaScript 코드를 실행시킬 수 있는 위험한 함수입니다. JSON을 구문 분석하기 위해 eval을 사용하는 것은 좋은 생각이 아닙니다. JSON 문자열이 제대로 살균되지 않으면 코드 주입 공격을 초래할 수 있습니다.

```js
function parse(jsonString) {
  // 입력이 문자열인지 확인하기 위한 간단한 체크
  if (typeof jsonString !== "string") {
    throw new Error("입력값은 문자열이어야 합니다");
  }

  // eval을 사용한 기본 구현은 안전하지 않으며 권장되지 않습니다
  // 실제 시나리오에서는 보안 문제를 피하기 위해 적절한 구문 분석 기술을 사용해야 합니다
  try {
    const json = eval("(" + jsonString + ")");
    return json;
  } catch (e) {
    throw new SyntaxError("문자열을 JSON으로 구문 분석할 수 없습니다");
  }
}

// 사용 예시:
var jsonString = '{"name":"Alice","age":30,"isStudent":false}';
try {
  var parsedObject = parse(jsonString);
  console.log(parsedObject); // JSON 문자열에서 구문 분석된 개체를 출력
} catch (e) {
  console.error(e.message); // 구문 분석 오류 처리
}
```

OR

<div class="content-ad"></div>

```js
function parse(jsonString) {
  // 현재 문자 인덱스
  let at = 0;
  // 현재 문자
  let ch = " ";

  // 입력 문자열에서 다음 문자로 이동하는 함수
  const next = function () {
    ch = jsonString.charAt(at);
    at += 1;
    return ch;
  };

  // 숫자 값을 구문 분석하는 함수
  const number = function () {
    let string = "";
    if (ch === "-") {
      string = "-";
      next();
    }
    while (ch >= "0" && ch <= "9") {
      string += ch;
      next();
    }
    if (ch === ".") {
      string += ".";
      while (next() && ch >= "0" && ch <= "9") {
        string += ch;
      }
    }
    return parseFloat(string);
  };

  // 문자열 값 구문 분석하는 함수
  const string = function () {
    let string = "";
    if (ch === '"') {
      while (next()) {
        if (ch === '"') {
          next();
          return string;
        }
        string += ch;
      }
    }
    throw new SyntaxError("잘못된 문자열");
  };

  // JSON 값 구문 분석하는 함수
  const value = function () {
    white();
    switch (ch) {
      case "{":
        return object();
      case "[":
        return array();
      case '"':
        return string();
      case "-":
        return number();
      default:
        return ch >= "0" && ch <= "9" ? number() : word();
    }
  };

  // 입력 문자열에서 공백을 건너뛰는 함수
  const white = function () {
    while (ch && ch <= " ") {
      next();
    }
  };

  // true, false, null과 같은 리터럴을 구문 분석하는 함수
  const word = function () {
    switch (ch) {
      case "t":
        next();
        next();
        next(); // true
        return true;
      case "f":
        next();
        next();
        next();
        next(); // false
        return false;
      case "n":
        next();
        next();
        next(); // null
        return null;
    }
    throw new SyntaxError("예기치 않은 '" + ch + "'");
  };

  // 배열을 구문 분석하는 함수
  const array = function () {
    const array = [];
    if (ch === "[") {
      next();
      white();
      if (ch === "]") {
        next();
        return array; // 빈 배열
      }
      while (ch) {
        array.push(value());
        white();
        if (ch === "]") {
          next();
          return array;
        }
        next();
      }
    }
    throw new SyntaxError("잘못된 배열");
  };

  // 객체를 구문 분석하는 함수
  const object = function () {
    const obj = {};
    if (ch === "{") {
      next();
      white();
      if (ch === "}") {
        next();
        return obj; // 빈 객체
      }
      while (ch) {
        const key = string();
        white();
        if (ch !== ":") {
          throw new SyntaxError("잘못된 객체");
        }
        next();
        obj[key] = value();
        white();
        if (ch === "}") {
          next();
          return obj;
        }
        next();
      }
    }
    throw new SyntaxError("잘못된 객체");
  };

  // 초기 값을 구문 분석한 후 남은 문자를 확인하여 구문 분석 시작
  const result = value();
  white();
  if (ch) {
    throw new SyntaxError("구문 오류");
  }
  // 구문 분석 결과를 반환
  return result;
}

// 사용 예시:
var jsonString = '{"name":"Alice","age":30,"isStudent":false}';
try {
  var parsedObject = parse(jsonString);
  console.log(parsedObject); // JSON 문자열에서 구문 분석된 객체 출력
} catch (e) {
  console.error(e.message); // 구문 분석 오류 처리
}
```

YouTube 채널 구독해주셔서 감사합니다: FrontEnd Interview Preparation: https://www.youtube.com/channel/UC-elmWUfbcbmvuhlS12nCtg

# 읽어주셔서 감사합니다

- 장기 멘토십을 위해 Preplaced.com에서 연락해요!

<div class="content-ad"></div>

**무료 체험 수업 예약하기!** — [여기를 클릭하세요](https://www.preplaced.in/profile/sonika-maheshwari)

📰 코딩 및 디자인 라운드 면접에 대한 더 많은 콘텐츠 보기 - [여기를 클릭하세요](https://sonikamaheshwari067.medium.com/)

🔔 팔로우하기: LinkedIn! — [여기를 클릭하세요](https://www.linkedin.com/in/sonika-maheshwari-81542220/)

항상 개선할 점이 있다는 것을 알고 있어요. 의견을 자유롭게 공유해주세요.
