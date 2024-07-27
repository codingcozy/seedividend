---
title: "DOM-JON으로 더 나은 JS DOM 구축하기"
description: ""
coverImage: "/assets/img/2024-05-01-BetterJSDOMBuildingWithDOM-JONPart3TheStateObject_0.png"
date: 2024-05-01 22:39
ogImage: 
  url: /assets/img/2024-05-01-BetterJSDOMBuildingWithDOM-JONPart3TheStateObject_0.png
tag: Tech
originalTitle: "Better JS DOM Building With DOM-JON — Part 3 : The State Object"
link: "https://medium.com/codex/better-js-dom-buildingwith-dom-jon-part-3-the-state-object-7f3ec5fc2b7a"
---


이번에는 현재 베타 릴리스와 몇 가지 예제를 함께 보여드릴 거에요. 지금부터 머니 샷으로 뛰어들겠습니다. 이것은 '기능 완료'로 베타 버전이에요. 이제 "기본 기능"으로 원했던 모든 것이 완료되었고 작동하는 것 같아요. 이제 안정성 테스트의 즐거움이 남아 있군요.

다음은 현재 베타 버전 링크에요.
https://cutcodedown.com/for_others/domjon/domjon.beta1.js

그리고 여기에 압축된 버전이 있어요:
https://cutcodedown.com/for_others/domjon/domjon.beta1.min.js

압축은 불필요한 공백을 제거한 간단한 방식이에요. 요즘의 많은 JS 기술/방법과 내 방법론은 대부분의 기존 "멋진" 압축과 호환되지 않는 것 같아요. 단순히 불필요한 공백을 제거하면, 압축 및 gzip을 걸친 라이브러리가 5k 미만이 된다면 괜찮아요.

<div class="content-ad"></div>

코미디 킹은 구글의 "Closure Compiler"가 "불필요한" 중괄호를 제거하면서 실제로 "IIFE를 대체하는 let/const" 기법을 망친다는 점입니다! 그들의 이른바 "화이트스페이스만" 설정에서조차... 그곳에는 화이트스페이스가 아닌 다수의 것들을 제거하고 변경합니다. "노력끈내보자"에 대해 얘기할 때입니다.

어쨌든, 여러분은 어떻게 생각하시는지 모르겠지만 저는 예시를 통해 더 잘 배웁니다.

# 예시 #1, 간단한 상태 모니터링

DOM-JON 시스템의 "상태" 객체는 자신에 대한 "속성", "필터", 그리고 "모니터"를 정의하는 메서드를 가지는 클래스입니다.

<div class="content-ad"></div>

상태의 속성은 값이 할당될 때 '필터' 콜백을 호출하는 getter/setter입니다. 이를 통해 값의 유효성을 검사하거나 변환할 수 있습니다.

"모니터"는 세터에 첨부할 수 있는 노드로, textNode.data, Element.textContent 또는 Element.value(요소 유형에 따라 다름)가 속성에 할당된 값과 일치하도록 변경됩니다. 이러한 "모니터"에는 자체 필터 콜백을 적용할 수도 있습니다.

INPUT 또는 TEXTAREA 태그로 모니터를 생성하면 해당 값이 변경될 때(oninput), 상태에도 값이 변경됩니다. 따라서 이러한 모니터는 양방향입니다. 체크박스 및 라디오 요소는 설정되거나 해제될 때 HTMLInputElement.value나 null을 상태의 값으로 설정합니다.

위의 데모에서 간단한 모니터의 작동 방식을 확인할 수 있습니다.

<div class="content-ad"></div>

"State" 객체는 전역 범위에 노출되지 않았거나 Export를 위해 설정되지 않았습니다. 대신, "document" 객체의 메서드를 호출하는 오래된 JS 관습을 따릅니다. 이 경우 document.__createState입니다. 초기 상태를 설정하기 위한 key/value 쌍을 포함하는 객체를 매개변수로 받습니다.

```js
const spectres = document.__createState({
  "Kanan Jarrus" : 1,
  "Hera Syndulla" : 2,
  "Chopper" : 3,
  "Garazeb Orrelios" : 4,
  "Sabine Wren" : 5,
  "Jacen Syndulla" : "-"
});
```

이 방법으로 실행함으로써 모듈 및 비모듈 기반 코드와 호환되도록 했습니다. domjon.beta1.js를 모듈로 또는 일반적으로 로드할 수 있습니다.

데모에서는 우리의 행을 담을 TBODY를 생성합니다. 나중에 그것을 가져오려고 애쓰지 않아도 되도록 따로 만들었습니다.

<div class="content-ad"></div>

```js
tbody = document.createElement("tbody");
```

특별히 어떤 것도 할당하지 않았기 때문에, DOM-JON을 사용하여 시간을 낭비하지 않습니다. 그것은 데이터를 표시하는 테이블을 구성할 때 사용합니다.

```js
document.getElementById("process").__make(
 "table@beforebegin.spectres",
 spectres,
 [ "caption", "Spectres" ],
 [ "thead",
    [ "tr",
      [ "th_col", "Name" ],
      [ "th_col", "Callsign" ],
      [ "th_col", "Notes" ]
    ]
 ],
 tbody,
 [ "tfoot",
    [ "tr",
      [ "td", { colspan : 3}, 
        [ "button_button",
          "Click to empty table",
          { onclick : (event) => {
            tbody.__make(
              "tr@replaceChildren",
              [ "td", { colSpan : 3 }, "Empty" ]
            );
          } }
        ]
      ]
  ]
 ]
);
```

나는 process ID를 잡아서 표는 그 앞에 삽입되고, 거기에 "specters" 클래스가 있는 것으로 설정합니다. 그 이후에는 보통의 표를 사용하며, `_` 연산자를 사용하여 `th` scope를 설정하고, 속성 객체를 사용하여 colspan을 설정합니다.

<div class="content-ad"></div>

그리고 `tfoot`에는 `tr`과 함께 `tbody`의 내용을 지울 버튼이 있습니다. Domjon.js에서 새로운 기능인 "replaceChildren"과 "replaceWith"가 소개되었어요. 후자는 DOM에서 부모 요소를 대체하고, 전자는 부모의 모든 자식 노드를 대체합니다.

그 중요한 점은 "spectres" State Object가 DOM-JON 인수로 전달된다는 것이에요. 이렇게 전달된 상태는 Element.__state로 첨부되며, 자식 요소는 Element.__closestState getter를 사용하여 가져올 수 있어요.

그런 다음 "spectres" State Object를 반복하여 `tbody`를 채워요:

```js
spectres.__forEachEnumerable(
  (name, callsign) => tbody.__make(
   "tr",
    [ "th_row", name ],
    [ `td&${name}`, callsign ],
    [ `td&note ${name}` ]
  )
);
```

<div class="content-ad"></div>

domjon.js에 추가된 새로운 "for each enumerable" 메서드를 소개합니다. "foreach" 스타일 메서드를 크게 선호하는 편은 아니지만, 편리함을 인정하며 제 입장만 생각하는 것은 아니라는 것도 인지하고 있어요.

DSS(구분자 선택기 문자열)에서의 & 기호는(있는 경우) 상위 상태의 어떤 속성에 요소를 감시기로 첨부할 지를 나타냅니다. 따라서 spectres[name]의 값을 변경하면 해당 TD의 textContent가 마법처럼 해당 값으로 변경됩니다. 따라서 기존 이름에 연결하고 곧 사용할 `note ${name}`을 만들어냅니다.

상태에서 이름이 존재하지 않는 경우 새 이름이 생성됩니다.

이제 데이터를 아는 분들은 누군가 빠졌다는 것을 알게 되었겠죠. 그래서 에즈라 브리저를 추가해 보겠습니다.

<div class="content-ad"></div>

```js
tbody.lastElementChild.__make(
  "tr@beforeBegin",
  [ "th_row", "Ezra Bridger" ],
  [ `td&Ezra Bridger`, 6 ],
  [ `td&note Ezra Bridger` ]
);
```

방금 새로운 TR을 생성하고, tbody의 마지막 자식 앞에 삽입하여 순서에 맞게 Ezra를 Jacen 앞에 두었습니다. 여기에 노트를 설정할 수도 있었지만, 상태값을 변경하면 관련된 모니터 요소의 텍스트 내용이 변경되는 것을 보여주기 위해 수동으로 설정할 거에요:

```js
spectres["note Ezra Bridger"] = "이 레코드는 나머지 뒤에 추가되었습니다";
```

Jacen은 분명히 "스펙터 7"입니다만, 거기에 하이픈이 있어요. 이건 쉽게 수정 가능하고, 거기에 노트도 추가해 봅시다.

<div class="content-ad"></div>

```js
spectres["Jacen Syndulla"] = 7;
spectres["note Jacen Syndulla"] = "이 레코드의 값이 '-'에서 '7'로 변경되었습니다.";
```

와씨, 상태 객체의 속성을 변경했더니 자동으로 관련된 요소 노드의 내용이 업데이트되었어요.

이쁜 표가 이렇게 생겼습니다:

<img src="/assets/img/2024-05-01-BetterJSDOMBuildingWithDOM-JONPart3TheStateObject_0.png" />

<div class="content-ad"></div>

상대적으로 간단한 예제를 통해 스크립트만 사용하여 DOM 요소를 생성하고 상태를 만들고 상태의 값을 수정하는 방법을 보여드리겠습니다.

# 예제 #2, 필터를 사용하여 수준 높이기

상태 처리의 장점은 위의 값 변경을 바로 DOM으로 변경할 수 없는 이유가 명확하지 않을 수 있습니다. 그러나 작업이 더 복잡해지면 일관된 흐름을 만들기 위해 머리가 너무 아플 수 있습니다.

따라서 다음 예제인 시계에서 필터를 구현하는 방법을 보여드리겠습니다. 이를 통해 모든 "로직" 코드가 Date의 getSeconds, getMinutes 및 getSeconds를 변수에 저장하고 필터가 style.rotate의 각도로 변환하는 작업을 처리한다는 것을 보여드리겠습니다.

<div class="content-ad"></div>

시계 바늘은 필터를 가진 것들입니다. DOM-JON 속성 객체에서 "__filters"는 콜백일 수도 있고 getter에 연결할 여러 콜백의 배열일 수도 있습니다. 이러한 방법은 NODE에만 적용됩니다.

<div class="content-ad"></div>

만약 필터 메소드가 null (값이 없는 경우의 기본값)이나 정의되지 않은 값을 반환한다면? 일반 노드 지정 핸들러(텍스트영역/data/value)가 호출되지 않습니다. 만약 실제 값 대신 사용할 값을 반환한다면, 값을 "필터링"하는 것이 가능합니다. 이는 toLocaleFormat를 통해 숫자를 서식화하는 등 유용할 수 있습니다.

이 경우 함수가 아무것도 반환하지 않도록하고, 사용 중인 단위(시간, 분, 초)에서 곱한 값으로 회전 값을 할당하려고 합니다.

버튼은 "부드러운(smoth)"이라는 새로운 상태 속성을 생성하는데, 체크박스가 선택되었는지에 따라 null 또는 "1"이 됩니다.

그 결과, 시계의 전체 "로직"은 다음과 같습니다:

<div class="content-ad"></div>

```js
function clockUpdate() {
  
  const
    now = new Date(),
    hours = now.getHours(),
    ms = (
      clock.smooth ?
      now.getMilliseconds() / 1000 :
      Math.max(0, (now.getMilliseconds() - 940) / 60)
    );
    
  clock.seconds = now.getSeconds() + ms;
  clock.minutes = now.getMinutes();
  clock.hours = hours % 12;
  clock.amPm = hours >= 12 ? "PM" : "AM";
  
  requestAnimationFrame(clockUpdate);
  
} // clockUpdate

clockUpdate();
```

clockUpdate 함수는 시간을 가져와서 "hours"를 분리하고, "hours"와 AM/PM을 모두 setting하는 데 여러번 호출하기 때문에, clock.smooth가 느슨한 true인지 확인하고, 그렇다면 ms를 리터럴 값을 1000으로 나눈 것으로 설정하여 초에 추가합니다. Math.max와 간단한 수학을 사용하여, 마지막 60ms에서만 두드리는 두 번째 손을 움직일 수 있습니다.

값을 state에 연결하고, state가 시계로의 변환을 처리합니다. 이 점이 좋은 점은 논리와 외관을 구분할 수 있으므로 논리를 건드리지 않고 외관을 계속 변경할 수 있다는 것입니다.

이것을 생각해보세요. 고려해보세요:

<div class="content-ad"></div>

```js
시계.시간 = 8;
시계.분 = 30;
시계.초 = 0;
시계.오전오후 = "오후";
```

이것만으로 시계를 8:30:00 PM으로 설정할 수 있어요. 그저 이것뿐입니다. 나머지는 모두 DOM에서 "템플릿"이에요.

참고로, setInterval 대신 requestAnimationFrame을 사용하는 이유는 setInterval이 종종 초를 "건너뛰기" 때문에 부드러운 애니메이션이 되게 하고 싶기 때문이에요. "실제 세계"에서는 아마 CSS를 사용해서 애니메이션을 구현할 텐데, 상태 속성이 어떻게 작동하는지 보여주고 싶어서 이렇게 했어요.

# 구현

<div class="content-ad"></div>

새 "State" 객체는 domjon.js의 나머지 부분에서 몇 가지 구현 변경이 필요합니다. 이 기사의 이 부분은 새로운 코드를 대략적으로 설명하면서 매우 지루해질 것입니다. 지루한 걸 좋아하지 않나요? 그렇다면 위에 대해 만족하고 다음 기사를 기다리세요.

먼저 DOM-JON 메소드, 속성 및 변수에 대해 이야기해 봅시다. "internal"로 표시된 것들은 최종 개발자에게 노출되지 않습니다.

## Object.__forEachEnumerable

```js
  __forEachEnumerable : { value : function(callback, thisArg, ...args) {
    for (const [key, value] of this.__entries) {
      callback.call(thisArg, key, value, ...args);
    }
    return this;
  } }, // Object.prototype.__forEachEnumerable
```

<div class="content-ad"></div>

객체의 열거 가능한 키/값 쌍을 통해 반복하기 위한 foreach. "myObject.__entries.foreach"를 직접 입력할 수도 있지만, 저는 이것이 별도의 함수로 만들어지기를 정말로 원합니다.

내부에서 사용할 텍스트(const texts)

코드 전반에 걸쳐 텍스트/핸들러를 모두 놓고 다니는 대신, 나중에 다른 언어를 구현하고 싶을 때 많은 작업이 이미 설정되어 있고 준비되어 있는 지역 객체로 넣었습니다.

## 폭탄 (내부, Error를 확장함)

<div class="content-ad"></div>

```js
// 어떤 누군가가 우리에게 폭탄을 설치했습니다.
Bomb = class extends Error {
  constructor(name, method, ...args) {
    super(`${method} - ` + texts.bomb[name](...args));
    this.name = 'DOMJON.JS';
  }
}, // 폭탄
```

"DOMJON.JS" 일부로 식별하는 오류를 "던질" 수 있는 오류입니다. 적절한 텍스트 콜백을 호출하고 원하는 인수를 전달합니다.

## 폭탄 처리 함수 (내부)

값에 대해 많이 하는 "표준" 확인이 많이 있습니다. JavaScript가 마구 진행하게 두는 대신에 오류를 던지는 것이 편리합니다. 프로그램에서 할 수 있는 가장 좋은 오류 처리는 포기하고 "넌 지나갈 수 없어!!!" 라고 말하는 것이라고 저는 굳게 믿습니다. 유감스럽게도 JavaScript와 HTML은 이런 면에서 너무나 관대합니다.

<div class="content-ad"></div>

`throw`은 너의 친구야, 자주 사용해. 정말 많이.

```js
    bombIfNullish = (value, ...args) => {
      if (null != value) return value;
      throw new Bomb(...args);
    }, // state.#bombIfNullish

    bombLengthMismatch = (value1, value2, method) => {
      if (value1.length == value2.length) return;
      throw new Bomb("lengthMismatch", method, value1.length, value2.length);
    }, // bombLengthMismatch

    bombTypeMismatch = (value, types, method) => {
      if (
        ("undefined" !== value) ||
        ( ("Array" == types.__type) && types.includes(value.__type) ) ||
        ( types === value.__type )
      ) return value;
      throw new Bomb("typeMismatch", method, types, value.__type);
    }, // bombTypeMismatch
```

bombTypeMismatch 함수의 "types" 매개변수는 타입명을 포함한 문자열이거나 유효한 타입명을 포함하는 배열이어야 합니다.

어리석은 생각이지만, 아마 이것들을 확장된 Bomb 클래스의 정적 메소드로 만들어야 할지도 모르겠네? 좀 더 고민을 해봐야겠다.

<div class="content-ad"></div>

또 기억해야 할 점은 myVar != null은 null과 undefined 둘 다에 대해 true이라는 것입니다. (그리고 다른 경우는 없습니다). 알아 두면 유용하며, 약삭빠진 전문가들에게는 "너무 어려워"라며 초보자들을 현혹시키는 데 사용합니다. 계속 말하듯이, 느슨한 형변환을 활용하는 대신 싸우는 대신 느슨한 형변환을 활용하면 일이 훨씬 쉬워집니다.

## warn 함수 (내부 정보)

console.warn을 래핑하여 적절한 "texts" 메서드를 호출합니다.

```js
warn = (messageName, ...args) => {
  console.warn(texts.warn[messageName], ...args);
}, // warn
```

<div class="content-ad"></div>

## makeData.delimiters (내부)

우리는 DSS에 "＆"을 "__stateName"으로 정의하였습니다.

```js
     delimiters : [
        [ "=", "data",   "value" ],
        [ "?", "attr",   "name" ],
        [ ".", "attr",   "className" ],
        [ "#", "attr",   "id" ],
        [ "&", "define", "__stateName" ],
        [ "@", "define", "__makePlace" ],
        [ ":", "data",   "namespace" ],
        [ "_", "data",   "special" ]
      ], // makeData.delimiters
```

## document.__make

<div class="content-ad"></div>

document.__make의 책임에 대한 많은 변화가 있었어요. Element.__make의 "부담"을 덜어 주기 위해서요.

```js
document.__defineProps( {

    __createState : (initialProps) => new State(initialProps),

    __make : (selector, ...attach) => {

      let
        parts = { attr : {}, data : {}, define : {} },
        value;

      for (const [ delimiter, typeName, attrName ] of makeData.delimiters) {
        [selector, value] = selector.split(delimiter, 2);
        if (value) parts[typeName][attrName] = value;
      }

      const
        tagName = (selector || "span").toLowerCase(),
        namespace = (
          parts.data.namespace ? (
            (parts.data.namespace.indexOf("http://") === 0) ?
            parts.data.namespace :
            (
              makeData.namespaces[parts.data.namsspace.toUpperCase()] ??
              makeData.namespaces.HTML
            )
          ) : makeData.namespaces.HTML
        ),
        element = Object.assign(
          document.createElementNS(namespace, tagName),
          parts.attr
        );

      if (!parts.define.__empty) {
        parts.define.__forEachEnumerable(element.__define, element);
      }

      if (parts.data.value) element.setAttribute(
        makeData.values[tagName] ?? "value",
        parts.data.value
      );

      if (parts.data.special) {
        const attrName = makeData.special[tagName];
        if (attrName) element.setAttribute(attrName, parts.data.special);
        else warn("underscoreNotSupported", tagName, parts.data.special);
      }
      
      if (attach) element.__attach(...attach);
      
      if (element.__stateName) element.__closestState.addMonitor(
        element.__stateName,
        element.value ?? element.textContent ?? "",
        element
      );
      
      if (element.__makeFilters) {
        element.__addFilters(element.__makeFilters);
      }

      if (element.__makeParent) {
        if (!element.__makePlace) element.__define("__makePlace", "beforeend");
        // f*** case sensitivity
        switch (element.__makePlace.toLowerCase()) {

          case "replacechildren":
            element.__makeParent.replaceChildren(element);
            break;

          case "replacewith":
            element.__makeParent.replaceWith(element);
            break;

          default:
            element.__makeParent.insertAdjacentElement( (
              element.__makePlace ?
              element.__makePlace.toLowerCase() :
              "beforeend"
            ), element);

        }
      }

      return element;

    } // document.__make

  } ); // document extensions
```

큰 변화는 다음과 같아요:

- "warn"이 warn() 함수를 사용하도록 변경되어서 저의 texts() 조회를 사용하도록 했어요.
- 새 Element에 __stateName이 설정되었다면, 이 노드를 상태에 연결해요.
- __stateFilters가 설정되었다면 (__attach에 의해), 그 노드 필터를 추가해요. 이를 적용하기 위해서는 노드가 할당된 후에 해야 해요. 그래야 이 객체에 상태가 할당되었다면, __closestState가 그것을 찾을 수 있어요.
- 부모에 추가하는 작업은 여기서 이루어져요. Element.__make에서 매개변수로 __makeParent를 전달하는 것보다 여기서 해요. __makeParent는 또한 Element.__closestState 내에서 사용되어 부모 노드로 이동할 수 있어요. DOM이 연결/조립되기 전에 부모에 추가하지요.
- ReplaceChildren과 RepalceWith가 추가되었고, insertAdjacentHTML 전에 switch/case를 통해 가로채졌어요.
- 명확성을 위해 변수 이름을 "e"에서 "element"로 바꾼 거에요. 여기에는 최소주의와 "바이트 집착" 사이의 차이가 있지만, 저는 정말 전자를 선호해요.

<div class="content-ad"></div>

내가 항상 말하는 것처럼:

## elementData.canType

이 셋은 Element.__attach 내에서 특정 canAttach 유형을 처리하기 위해 사용됩니다. "Bomb"와 그와 관련된 함수를 사용하도록 다시 작성되었습니다.

```js
    canType : {

      "Array" : (target, arg, canAttach) => {

        bombTypeMismatch(arg, "Array", `<${target.tagName}>.__attach`);
        bombLengthMismatch(arg, canAttach, `<${target.tagName}>.__attach`);
        for (let i = 0, iLen = args.length; i < iLen; i++) {
          this.setAttribute(canAttach[i], args[i]);
        }

      }, // elementData.canType.Array

      "String" : (target, arg, canAttach) => {

        bombTypeMismatch(
          arg,
          [ "Number", "String" ],
          `<${target.tagName}>.__attach`
        );
        target.setAttribute(canAttach, arg);

      } // elementData.canType.String

    }, // elementData.canType
```

<div class="content-ad"></div>

테이블 태그를 마크다운 형식으로 변경하세요.

## elementData.argType

"State" 타입이 정의로 추가되는 것을 처리했습니다:

```js
    argType : {

      "Array" : (target, arg) => target.__make(...arg),

      "State" : (target, arg) => target.__define("__state", arg)

    }, // elementData.argType
```

<div class="content-ad"></div>

## elementData.eachAttr

이 함수는 `forEachEnumerable`을 통해 사용되는 콜백이며, "call" 설정을 통해 Element가 조작되는 "thisArg"로 설정됩니다. 따라서 아래의 "this"는 Element 객체를 가리킵니다.

```js
   eachAttr : function(key, value) {

      switch (key) {

        case "__filters":
          this.__define("__makeFilters", value);
          return;

        case "__stateName":
        case "__makePlace":
        case "__makeParent":
          this.__define(key, value);
          return;

        case "dataset":
          bombTypeMismatch(
            value,
            "Object",
            "Element.prototype.__setAttr - setting 'dataset'"
          );
          Object.assign(this.dataset, value);
          return;

        case "style":
          this.__setStyle(value);
          return;

      }
      
      switch (value.__type) {
        case "Array":
        case "Function":
        case "Object":
          this[key] = value;
          return;
      }

      this.setAttribute(key, value);

    }, // elementData.eachAttr
```

여러 가지 값들을 테스트하고 비교의 다대일을 테스트하기 때문에, 스위치/케이스는 객체나 맵 조회보다 더 깔끔합니다. 몇몇 과격한 사람들이 반대 의견을 내지르더라도, 중요한건 아니에요.

<div class="content-ad"></div>

짧은 회로 중단 반환의 사용은 코드를 더 깔끔하게 만든다고 생각해요.

스위치/케이스/리턴을 사용해 위의 것을 "너무 복잡하다"거나 "이해하기 어렵다"고 말하는 사람들이 실제로 있다는 것에 정말 경악스럽고 화나요.

## elementData.eachStyle

__forEachEnumerable 내부에서 요소에 "this"를 적용하는 간단한 래퍼

<div class="content-ad"></div>

```js
    eachStyle : function(key, value) {

      this.style.setProperty(key, value);

    } // elementData.eachStyle
```

이 부분은 "의미 없는" 것처럼 보일 수 있지만, 스타일 속성을 객체에 할당하지 않고 직접 변경하는 이유는 객체화할 수 없는 유효한 속성들이 있기 때문입니다. 이 중 하나가 "사용자 정의 속성" (즉, CSS 변수) 입니다.

예를 들어, " — rotateHand:20deg;" 와 같은 값을 설정하고 싶다고 해봅시다.

```js
myElement.style["--rotateHand"] = "20deg"; // 잘못된 문장

Object.assign(myElement.style, { "--rotateHand" : "20deg"; }); // X

myElement.style.setProperty("--rotateHand", "20deg"); // 동작함
```

<div class="content-ad"></div>

이걸 무시하고 강제로 해야하는 것은 별로 좋아하지 않지만, 솔직히 스크립트에서 스타일을 설정하는 빈도가 충분히 낮아 추가적인 오버헤드가 성능에 영향을 미치지 않을 만큼 희박한 것 같아요.

## Element.prototype.__addFilters

노드 필터를 이 객체를 가리키는 노드 필터를 연결된 상태에 추가합니다.

```js
    __addFilters : function(filters, state) {
      
      if (!this.__stateName) throw new Bomb(
        "filterNoStateName",
        "Element.prototype.__addFilters",
        this.tagName
      );

      state = state ?? this.__closestState;
      if (!state) throw new Bomb(
        "filterNoStateObject",
        "Element.prototype.__addFilters",
        this.tagName
      );

      if ("Array" !== filters.__type) filters = [ filters ];
      for (const callback of filters) {
        state.addNodeFilter(this.__stateName, this, callback);
      }

    }, // Element.prototype.__addFilters
```

<div class="content-ad"></div>

상태가 없으면 폭탄을 설치합니다. 모든 상태는 우리에게 속해 있어요. 필터가 배열이 아니라면 배열로 넣어서 같은 루프/세트를 공유할 수 있도록 해주세요. 그런 다음 루프를 돌고 해당 상태의 setter를 호출하세요.

## Element.prototype.__attach

기능의 대부분이 하위 함수로 분리되어 있기 때문에, 이 핵심 부분은 알파 버전에서 크게 변경되지 않았어요.

```js
    __attach : function() {

      // 루프 밖에서 this를 가져와요!
      const canAttach = (
        elementData.canAttach[this.namespaceURI.toLowerCase()] ??
        elementData.canAttach.HTML
      )[this.tagName.toLowerCase()] || true;

      for (let arg of arguments) {

        // undefined == null이지만 0/false/""은 아니에요
        bombIfNullish(
          arg,
          "undefinedAttachment",
          "Element.prototype.__attach",
          this.tagName
        );

        // 이 두 인수 유형은 모든 Element에 할당될 수 있어요
        switch (arg.__type) {

          case "Object":
            this.__setAttr(arg);
            continue;

          case "Function":
            arg = arg(this);
            if (null == arg) continue;
            // 그렇지 않으면 아래로 이동해요

        }

        // 그러나 이 인수는 비보이드 또는 특수 보이드 유형에서만 수행할 수 있어요
        if (canAttach) {
          (
            elementData.canType[canAttach.__type] ??
            elementData.argType[arg.__type] ??
            elementData.append
          )(this, arg, canAttach);
          continue;
        }
        // 그리고 진지해요: nullish 코얼리싱에 모두 찬사를!

        throw new Bomb(
          "sterile",
          "Element.prototype.__attach",
          this.tagName
        );

      }

      return this;

    }, // Element.prototype.__attach
```

<div class="content-ad"></div>

대부분은 일반 오류가 발생하는 대신 Bomb으로 바뀝니다.

## Element.prototype.__closestState

```js
   __closestState : {

      get : function() {
        let walk = this;
        do {
          if (walk.__state instanceof State) return walk.__state;
        } while (walk = walk.parentNode ?? walk.__makeParent);
        throw new Bomb(
          "noClosestState",
          "Element.prototype.__closestState",
          this.tagName
        );
      }

    }, // Element.prototype.__closestState
```

가장 가까운 요소를 찾기 위해 DOM을 탐색합니다. __state 속성을 포함하는 요소를 찾을 때까지 계속 합니다. 상태를 찾지 못하면 Bomb이 발생합니다. 만약 parentNode가 없는 경우 DOM 탐색은 Element.__makeParent로 fallback되어, 실제 첨부를 수행하기 전에 연결된 상태를 찾을 수 있습니다.

<div class="content-ad"></div>

요소가 실제로 살아있기 전에 요소의 모든 속성을 설정하는 것이 이론적으로 더 빠르고 효율적이며 (이론상의?) 머리 아픈 문제를 피할 수 있습니다. 라이브 DOM에 대한 "전문가" 의견 중 얼마나 사실인지 더 테스트해봐야겠죠. 이미 그 중 상당 부분은 알고 있지만, 우리가 얼마나 더 빠진 부분들을 알아야 할지는 궁금합니다.

제가 자바스크립트의 getter와 setter를 얼마나 좋아하는지 언급했었나요?

## Element.prototype.\_\_make

이것은 단순한 래퍼(wrapper)로 다시 만들어졌습니다.

<div class="content-ad"></div>


```js
   __make : function(selector, ...args) {

      return document.__make(
        selector,
        { __makeParent : this },
        ...args
      );

    }, // Element.prototype.__make
```

새 Element가 첨부될 때 자신을 __makeParent로 추가합니다. 그 외에도 무엇인가요? (아직은 많이 없습니다.)

## Element.prototype.__setAttr

elementData.eachAttr를 사용하여 속성과 속성을 설정합니다.

<div class="content-ad"></div>

```js
    __setAttr : function(attr) {

      bombTypeMismatch(attr, "Object", "Element.prototype.__setAttr");
      attr.__forEachEnumerable(elementData.eachAttr, this, this);
      return this;

    }, // Element.prototype.__setAttr
```

당연히 `__type`에 따라 일반 객체가 아닌 경우에는 폭탄 터질 겁니다.

## Element.prototype.__setStyle

일반 객체(key/value 쌍)에서 스타일을 "this"에 설정합니다. 확장된 객체는 폭탄 터질 겁니다. 기능적으로 `__setAttr`과 유사합니다.

<div class="content-ad"></div>

```js
__setStyle : function(style) {

  bombTypeMismatch(style, "Object", "Element.prototype.__setStyle");
  style.__forEachEnumerable(elementData.eachStyle, this);
  return this;

} // Element.prototype.__setStyle
```

## StateRender (내부용)

이 **정적 클래스**는 DOM 업데이트를 대기열에 넣는 데 사용됩니다. 그들이 발생하는 대로 렌더링하는 대신, 한꺼번에 적용할 수 있도록 일괄 처리합니다. 더 간단한 프로그램에서는 오버헤드가 발생할 수 있지만, 프로젝트가 커지면 스크립팅이 해제될 때까지 DOM을 지속적으로 변경하지 않는 것이 더 성능이 좋을 수 있습니다. 그리고 솔직히 말하자면, 이것이 부정적인 영향을 미칠만큼 프로젝트가 작다면, 아마도 그 정도의 부담을 충당할 수 있을 겁니다!

```js
StateRender = class {

  static pending = false;
  static renders = new Set();

  static renderUpdate(state) {

    state.renders.forEach( (store) => {
      store.nodes.forEach( (nodeData, node) => {
        let value = store.value;
        nodeData.filters.forEach(
          (filter) => value = filter(value, node)
        );
        if (value != null) node[nodeData.method] = value;
      } )
    } );
    state.renders.clear();
    state.pending = false;

  } // StateRender.#renderUpdate

  static queUpdate(store) {

    this.renders.add(store);
    if (!this.pending) {
      this.pending = setTimeout(this.renderUpdate, 0, this);
    }

  } // StateRender.queUpdate

}, // StateRender
```

<div class="content-ad"></div>

거기 중요한 것은 filter() 메커니즘이 null 결과를 만나면 Node에 값을 설정하지 않는다는 것입니다. 이 방법은 작동하지만 여러 개의 "노드 필터"가 필요한 경우 문제를 일으킬 수 있습니다. 이 메커니즘을 강화해야 할 필요가 있다고 생각하지만 어떻게 해야할지 확실히는 모르겠어요. filter의 인수 개수를 늘리고 배열이나 객체를 반환하여 원래 값도 전달하게 할까요? 아니면 "설정하지 말기" 부울 값을 추가할까요? 잘 생각해보고 내일 답을 드릴게요.

![BetterJSDOMBuildingWithDOM](/assets/img/2024-05-01-BetterJSDOMBuildingWithDOM-JONPart3TheStateObject_1.png)

스크립팅 실행의 해제를 가로채는 것은 "tricky"합니다. 그래서 저는 제로 타임아웃을 설정하여 흉물로 해결했어요. 작동은 합니다. 다만 "경합 조건"에 대해 우려되고 있어요.

# 상태 객체

<div class="content-ad"></div>

마침내 여기에 도착했고 준비가 완료되었어요...

### State.#properties

내부 사용 변수로 getter/setter 속성에 관한 모든 데이터를 추적하는 데 사용됩니다. 이것은 key가 속성 이름이고, 값이 getter와 setter에서 사용하는 값을 포함한 "store" 객체인 "Map"입니다.

### State::constructor

<div class="content-ad"></div>

```js
      constructor(initialProps) {

        this.__define("__type", "State");
        this.#properties = new Map();
        if ("undefined" === typeof initialProps) return;

        bombTypeMismatch(initialProps, "Object", "State::constructor");
        initialProps.__forEachEnumerable(
          this.addProperty,
          this
        );

      } // State::constructor
```

__type을 정의해서 (계산 비용이 많이 드는) Object.prototype.__type 메서드를 건너뛸 수 있습니다.

맵을 생성합니다.

만약 초기 프로퍼티를 전달하지 않았다면 간편하게 종료합니다.

<div class="content-ad"></div>

그렇다면 우리가 제네릭 오프젝트를 전달하지 않으면 실패합니다. 만약 제네릭이라면 각 속성을 키/값으로 추가합니다.

여기서 순서를 바꾸겠습니다...

## State.addProperty

이 부분은 상당히 많은 작업이 필요하지만, 설정해야 할 것이 많습니다. 여기서 조각조각 나눠 설명하겠습니다.

<div class="content-ad"></div>

```js
      addProperty(name, data) {
        
        let
          value, setFilters, getFilters,
          store = this.#properties.get(name);
          
        if ("Object" == data.__type) {
          value = data.value;
          getFilters = data.getFilters;
          setFilters = data.setFilters;
        } else value = data;
          
        if ("undefined" !== typeof store) {
          if ("undefined" !== typeof value) store.value = value;
          if (getFilters) store.addGetFilters(getFilters);
          if (setFilters) store.addSetFilters(setFilters);
          return store;
        }
```

만약 이 "name"에 대한 #properties에 "store"가 있으면, 값, setFilters 및 getFilters가 이미 존재할 수 있습니다.

전달된 데이터가 일반 객체인 경우, 값을 및 필터를 추출합니다. 일반 객체가 아니라면 값이어야 합니다. 이렇게 하면 "값"만 또는 정보 객체를 전달할 수 있습니다. set/getFilters도 인수로 전달할 수 있는 기능을 추가해야 할까요?

안타깝게도 객체 구조 분해는 새로운 var/let/const로만 작동하며 기존 변수에서는 작동하지 않습니다. 따라서 이를 억지로 처리해야 합니다. 그렇지 않으면 VAR를 사용하는 것으로 돌아가야 합니다. 아니, 지금 VAR를 사용할지도 모르겠네요.

<div class="content-ad"></div>

실은, let/const의 존재만으로 var을 완전히 사용하지 말아야 하는 이유는 전혀 없어요. 이건 마치 "레이아웃으로 테이블 사용하지 말라"를 "테이블 사용 금지"로 변형한 것과 같거나, "적절한 경우 `em` / `strong` 사용"을 "절대 `b` 나 `i` 사용하지 말라"로 만든 것 같아요. 100% 무지한 헛소리가 들려오는군요.

게다가 이게 제 코드를 작성하는 동안, 글이나 문서를 작성하는 이유가 여기 있어요. 저는 진행하면서 더 나은 방법을 떠올릴 수 있거든요.

```js
addProperty(name, ...args) { // valueOrObj, getFilters, setFilters
  
  let store = this.#properties.get(name); 
  
  if ("Object" == args[0].__type) {
    var { value, getFilters, setFilters } = args[0];
  } else {
    var [ value, getFilters, setFilters ] = args;
  }
```

와우, 좋아요. 보세요, VAR는 함수 레벨 스코프만 필요한 경우에 뛰어날 수 있어요. 이렇게 하면 우리가 원하는 속성의 객체를 args[0]로 전달할 수 있고, 또는 값, getFilters, 그리고 setFilters를 인수로 전달할 수도 있어요.

<div class="content-ad"></div>

반응적인 랜트: 네, '인수(argument)'에 대해 이야기해볼게. 어제 나랑 놀려던 놈이 있었어. '그건 파라미터야, 넌 자기가 지어낸 이름을 쓰고 있는 거잖아!' 라는 식으로 듣기는 했지.

그래도 어찌나 자기가 억지로 만들어낸 것인양 내 탓을 하는 건지. DOM에 있을 때는 여전히 '속성(attributes)'이라고 하면서, 난 '프로퍼티(properties)'와 '메소드(methods)'라는 용어를 만들어냈다고 비웃기도 했지. 입을 털기 전에 좀 배워라, 친구들아.

사실 나는 요즘 여섯 달 동안 '인수(arguments)'라는 용어와 'arguments' 객체를 사용하면서 다른 개발자들과 야박한 논쟁을 자주 일으켰다는 사실에 놀랍다. 뭐지?!?

다음에는, 만약 스토어가 있다면, 새로운 값을 그냥 추가하고 필터를 적용할 수 있어. 나중에 호출된 메소드들은 나중에 다룰게. 실제로 이 부분을 쓸 때는 그 메소드들이 정의되지 않았었거든.

<div class="content-ad"></div>

```js
        if ("undefined" !== typeof store) {
          if ("undefined" !== typeof value) store.value = value;
          if (getFilters) store.addGetFilters(getFilters);
          if (setFilters) store.addSetFilters(setFilters);
          return store;
        }
```

위 코드에서 undefined인지를 확인함으로써 값이 바뀌지 않고 필터를 설정하기 위해 객체를 사용할 수 있습니다. 저는 함정으로 nullish를 사용할 것입니다. 그러나 "null"이 실제로 설정하고자 하는 유효한 값일 수도 있습니다.

옵션!

그리고 이미 store가 있을 경우, 참조를 반환하여 빠져나가면 됩니다.

<div class="content-ad"></div>

여기까지 왔는데 아직 저장소가 없으니 하나를 만들어야 합니다. 먼저 기존의 열거할 수 없는 속성 또는 메서드와 동일한 이름을 가진 getter/setter를 만들고 있는지 확인해 봅시다.

```js
        if ((name in this) && !this.__hasOwn(name)) throw new Bomb(
          "stateReservedKey",
          "State.addProperty",
          name
        );
```

예약어 체크는 중요합니다. 이 체크를 하지 않아서 비슷한 코드가 망가졌던 횟수를 세어보니 많았죠.

이 시점에서 정의되지 않은 이름을 ""로 필터링하세요.

<div class="content-ad"></div>

우리의 store를 만들어 보세요:

```js
store = {
  addGetFilters: function(filters) {
    if (!(filters instanceof Array)) filters = [filters];
    for (const filter of filters) this.getFilters.add(filter);
  },
  addSetFilters: function(filters) {
    if (!(filters instanceof Array)) filters = [filters];
    for (const filter of filters) this.setFilters.add(filter);
  },
  getFilters: new Set(),
  setFilters: new Set(),
  name,
  nodes: new Map(),
  state: this,
  value
};
```

필터를 추가하고 세트와 맵을 만드는 몇 가지 함수들이 있어요.

<div class="content-ad"></div>

저장소(store)에서 State에 대한 참조와 getter/setter 이름 state을 전달해 드립니다. 이는 이벤트 처리에 도움이 될 수 있습니다. 경우에 따라 "this" 범위를 잃을 때입니다. 그리고 기억하세요:
```js
{ name }
```
는 다음과 동일한 기능을 합니다:
```js
{ "name": name }
```
<div class="content-ad"></div>

많은 JS 프로그래머들이 이것을 모르다는 점에 놀랐어요.

"성능"을 위해 "add" 함수들을 독립형으로 이동시켜서 포함을 더 작고/쉽게 만들어보려는 유혹을 겪고 있어요. "베타 정리" 중에 어떻게 진행되는지 보고 RC1으로 진행하기 전에 판단할 거예요.

이제 추가하려는 필터들을 붙여주세요.

```js
if (getFilters) store.addGetFilters(getFilters);
if (setFilters) store.addSetFilters(setFilters);
```

<div class="content-ad"></div>

그리고 "this.#setProperties"에 우리 상점을 넣어주세요.

```js
        this.#properties.set(name, store);
```

마지막으로:

```js
       this.__define(name, {

          enumerable : true,

          get : () => {
            let value = store.value;
            store.getFilters.forEach( (filter) => value = filter(value) );
            return value;
          },

          set : (value) => {
            store.setFilters.forEach( (filter) => value = filter(value) );
            store.value = value;
            StateRender.queUpdate(store);
          }

        } );

        return store;

      } // State.addProperty
```

<div class="content-ad"></div>

This is a new getter/setter, so we need to assign it the handlers. When we iterate through our filters, for the setter, we enqueue an update. Then, we return the store, and we're good to go.

By the way, I'm not a huge fan of Array.forEach, but I'm using it here. I'll use the tools available even if I don't like their implementations and complain about them constantly. It seems like many people don't grasp the idea of criticizing things you actually use.

## State.addNodeFilter

As the name suggests, this function adds a filter to the list that runs when a State property is "set" before applying it to the Node.

<div class="content-ad"></div>

```js
addNodeFilter(name, node, callback) {

  const

    store = bombIfNullish(
      this.#properties.get(name),
      "nameNotDefined", "State.addNodeFilter", name
    ); // store
    
    const nodeData = bombIfNullish(
      store.nodes.get(node),
      "propHasNoNodes", "State.addNodeFilter", name
    ); // nodeData

  bombTypeMismatch(callback, "Function", "State.addNodeFilter");
    
  nodeData.filters.push(callback);

} // State.addNodeFilter
```

저장소를 가져오세요. 저장소에 없으면 에러 발생. 저장소.nodes에 노드 데이터가 없으면 에러 발생. 전달된 콜백이 함수가 아닐 시 에러 발생...

그렇지 않으면 stores.nodes[node].filters Map에 추가합니다.

## State.addGetFilter

<div class="content-ad"></div>

해당 코드는 주어진 이름으로부터 상점을 가져와요. 만약 상점이 존재하지 않으면 오류를 발생시켜요. 그렇지 않으면 해당 필터를 추가해요.

그럼, 나는 지도를 정말로 좋아해.

<div class="content-ad"></div>

첫 번째와 같아. 조금 크고 추한게 그절망적인데.

```js
      addSetFilter(name, filters) {

        const store = bombIfNullish(
          this.#properties.get(name),
          "nameNotdefined", "State.addSetFilter", name
        );
        
        store.addSetFilters(filters);

      } // State.addSetFilter
```

나는 두 메소드가 호출하는 단일한 프라이빗 함수를 만들어 "Set"와 "Get"이 적절한 곳에 교체되도록 하고, 전체 코드 크기/복잡성을 줄이기 위해 이 함수들을 래퍼로만 사용하는 것이 조금 유혹스러운데. 아마도 Beta2의 정리 중에 전체 코드 크기를 줄이는 데 도움이 되도록 이것을 실행할 것 같다. 음... 아마 "Set"을 확장하는 클래스를 만드는 건 어떨까?

## State.addMonitor

<div class="content-ad"></div>

돈을 여기 있어. 우리 __make 루틴이 가장 자주 호출하는 루틴이야. 이것도 작은 조각으로 나눠볼게.

```js
      addMonitor(name, value, node) {

        if (!(node instanceof Node)) {
          if ("undefined" == typeof node) node = new Text();
          else throw new Bomb(
            "notNode",
            "State.addMonitor",
            typeof node
          );
        }
```

만약 노드가 전달되지 않으면, 우리는 우리의 컨테이너로 텍스트 노드를 생성할 거야. 이것은 dom-jon에서 문장 중간에 노드를 추가하고 싶을 때 유용할 수 있어. 생각해보셔:

```js
document.body.__make(
  "p",
  "This is ", myState.addMonitor("isA", "a test"), "!"
);

myState.isA = "the best";

// 이제 그 단락은 "This is the best!" 라고 말해
```

<div class="content-ad"></div>

텍스트 노드를 상태에 연결하기 쉽게 하는 약어나 함정을 추가할 수 있습니다. [ "&isA", "a test" ]와 같이 __make에 의해 가로채집니다.

이것이 노드에서만 작동하므로 정의되지 않았으면 우리는 중단됩니다.

```js
        const
          self = this,
          store = this.addProperty(name, value);
          
        let method = "textContent";
```

저장소가 필요하며, 몇 가지 콜백을 "this"의 사본으로 작동하도록 만들어야 합니다. (나중에 구현을 정리하면 후자가 변경될 수 있음). 마지막으로 textContent(기본값)로 메서드를 설정합니다. 나는 "나는 그걸 싫어" 하고 나도 다시 "var"을 사용할지도 모른다. "method"는 노드 값이 요소에 적용되는 방법입니다. 대부분의 태그는 textContent를 사용하지만, textNode는 "data"가 되고, input/textarea는 value가 될 것입니다. 그러나 type="checkbox"나 type="radio"일 경우 false는 체크 해제되고, true는 선택됩니다.

<div class="content-ad"></div>

다음으로 nodeTypes를 테스트해야 합니다.

```js
        nodeSwitch: switch (node.nodeType) {
     
          case Node.ELEMENT_NODE:
            if ("value" in node) method = "value";
            switch (node.tagName.toLowerCase()) {
```

만약 "value" 속성이 있다면 textContent 대신에 설정되어야 하는 건 당연하죠.

```js
              case "input":
                switch (node.type) {
                  case "checkbox":
                  case "radio":
                    self[name] = node.checked ? node.value : null;
                    node.addEventListener("input", (event) => {
                      // self[name] will trigger the setter
                      self[name] = (
                        event.currentTarget.checked ?
                        event.currentTarget.value :
                        null
                      );
                    } );
                    break nodeSwitch
                }
                // 네, drop-through
```

<div class="content-ad"></div>

입력값으로부터 체크박스와 라디오 버튼의 동작을 감지하고, 해당 지점에서 탈출합니다. 이벤트 리스너를 후킹하여 값이 변경되면 상태 값도 변경되도록 설정합니다.

네, 저는 레이블과 함께 break를 사용하고 있습니다. 이것은 간단하며 스파게티 코드가 아니며, 이것 때문에 미쳐버리는 사람들은 어셈블리어를 쓰는 데 10초도 못 버텨요. 날 물어뜯어봐! 절대로 어셈블리어나 줄 번호가 있는 언어를 한 번도 작성한 적이 없는 사람들이 '스파게티 코드'에 대해 입 밖에 내지 말았으면 좋겠어요. 실제로 본 적도 없었고 대똥에 미쳐봤나봐. 

체크박스가 아니라면 textarea로 이동합니다. 스위치-케이스에 반대하는 사람들을 더 화나게 만듭니다.

```js
              case "textarea":
                node.addEventListener("input", (event) => {
                  // self[name]을 트리거하여 세터를 호출합니다
                  self[name] = node.value;
                } );
            }
            break;
```

<div class="content-ad"></div>

이벤트 리스너를 추가하고, 내부 switch문을 종료하고, 외부 switch문을 탈출합니다.

그런 다음 텍스트 노드를 처리합니다.

```js
          case Node.TEXT_NODE:
            method = "data";
            break;
```

데이터를 "textContent" 또는 "value"로 설정하지 않고 "data"로 설정한 것만 알면 됩니다. 노드에 __value 확장을 추가하여 노드 형식을 자동으로 감지하고 전달된 새 값을 적절하게 적용하는 것에 반박을 느낍니다.

<div class="content-ad"></div>

Node가 아니면, 'Bomb.' 시작하면 해주세요.

```js
          default:
            throw new Bomb(
              "unsupportedState",
              "State.addMonitor",
              node.nodeType
            );
```

위의 모든 작업을 완료하면, 새 노드를 저장소에 설정하고, 필터 배열을 만들고 값 할당에 사용할 "method"를 전달합니다.

```js
        store.nodes.set( node, { filters : [], method });

        return node;

      } // State.addMonitor
```

<div class="content-ad"></div>

… 그리고 그게 전부예요. 전체 State 객체입니다.

# DOM-JON 구조 빠르게 살펴보기

RC가 준비되기 전에 자세히 설명하지는 않겠지만, 일찍부터 이 문서를 읽은 많은 분들이 이를 이해하지 못한 것 같아요... 제 잘못입니다. 그것을 언급하지 않았거든요.

DOM-JON 구조는 항목으로 나뉩니다. 이러한 "항목"들은 __make 함수의 패턴을 따릅니다. 다시 말해:

<div class="content-ad"></div>

**make(dss, …attach)**

DSS(구분자 선택자 문자열)는 CSS와 유사한 식별자를 사용하여 단축 명령으로 요소를 생성하는 것입니다. "div#help.modal" 또는 "input_email?emailAddress="nowhereman@nowhere.land"와 같은 것이 있습니다.

... attach 인수는 다음 중 하나 이상 일 수 있습니다:

- 배열 — __make에 전달할 인수를 모방하는 "entry line"으로, 자식 요소를 생성할 수 있습니다.

<div class="content-ad"></div>

```bash
일반 객체 — 대부분의 키는 setAttribute를 사용하여 할당되지만 __makeParent, __makePlace, __stateName 등과 같은 특별한 값은 가로챕니다. 또한 해당 객체에서 { style : { property : value } }와 같은 것을 제대로 작동하도록 구문 분석하여 Element.style.setProperty를 통해 할당됩니다. 현재 datalist는 Object.assign(Element.datalist)을 사용하여 설정됩니다. 이것이 잘 작동하는지 확인하고 강제로 적용해야 할지 여부를 확인해야 합니다. 또한 함수 값이 element[name]을 통해 할당되므로 이벤트 핸들러와 같은 것을 onvent(예: onlick 또는 onsubmit)과 같이 연결할 수 있도록 주의를 기울여야 합니다.
```

함수 — 해당 함수는 현재 Element(this)에 전달되어 실행되며 결과는 문서에 추가됩니다.

상태 객체 — DOM 트리에 적용할 상태입니다. DSS에서 __stateName이나 & 구분자를 사용하여 자식 요소(및 자체)가 할당된 경우 기존 상태의 getter/setter로 연결되거나 해당 상태에 이미 존재하지 않는다면 생성됩니다.

부울, 요소, 노드, 숫자, 문자열, 기타 객체 유형 — 현재 처리 중인 요소의 끝에 추가됩니다.

<div class="content-ad"></div>

이러한 속성들은 여러 번 반복될 수 있으며, 덮어 쓰기가 가능하지만 순서는 중요하지 않습니다. 유일하게 중요한 것은 DSS가 첫 번째 인수여야 한다는 것입니다.

예를 들어:

```js
document.body.__make(
  "button_button.clearBody=20",
  {
    disabled : true,
    style : { "--icon" : "\uE000" }
  },
  "Click to erase body content",
  { onclick : document.body.__make(
    "p@replaceChildren", "Content Deleted"
  ) }
);
```

그리고:

<div class="content-ad"></div>

```js
document.body.__make(
  "button_button.clearBody=20",
  {
    disabled : true,
    style : { "--icon" : "\uE000" },
    onclick : document.body.__make(
      "p@replaceChildren", "Content Deleted"
    )
  },
  "본문 내용을 지우려면 클릭하세요"
);
```

기능적으로 완전히 동일합니다.

nested 및 스프레드를 통해 적용되는 배열로 make 값을 중첩하여 명시할 수 있기 때문에 배열로 동일한 값들을 표현할 수 있습니다. 이렇게 하면 다음과 같습니다:
```js
const clearButtonDomJon = [
  "button_button.clearBody=20",
  {
    disabled : true,
    style : { "--icon" : "\uE000" },
    onclick : document.body.__make(
      "p@replaceChildren", "Content Deleted"
    )
  },
  "본문 내용을 지우려면 클릭하세요"
];

document.body__attach(clearButtonDomJon);
```

<div class="content-ad"></div>

표 태그를 Markdown 형식으로 변경합니다.

이 또한 기능적으로 동일합니다. 모두가 기본적으로 다음과 같은 것을 만들어냅니다:

```js
<button
  type="button"
  class="clearBody"
  value="20"
  disabled
  style="--icon:'\uE000';"
  onclick="document.body.innerHTML=`<p>Content Deleted</p>`;"
>Click to erase Body Content</button>
```

물론 이것은 DOM에서 직접 작동합니다.

모두 여기까지 이루어지는 것은, 느슨한 형변환과 싸우는 대신 그것을 활용하는 것입니다. "다른 유형을 매개변수로 허용해서는 안 된다"고 말할 때마다 ID 10 T와 상호작용 중이라는 것을 알게 됩니다.

<div class="content-ad"></div>

# 앞으로의 계획

곧 완성을 맞이할 예정입니다. 다음 번에는 beta 2를 준비하고, 이를 사용하여 템플릿을 만드는 방법, JavaScript 모듈과 함께 사용하는 방법, 그리고 현재 제작 중인 데모 앱인 또 다른 계산기를 통해 이 시스템의 참 가능성을 보여줄 것입니다.

Part 1 : 기본 개념
Part 2 : 시스템 객체 확장
Part 3 : 상태 (여기에 있음)
Part 4 : 템플릿 및 모듈 (곧 제공 예정)