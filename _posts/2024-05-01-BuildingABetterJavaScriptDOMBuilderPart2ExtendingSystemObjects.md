---
title: "시스템 객체 확장으로 자바스크립트 DOM 빌더를 개선하는 방법"
description: ""
coverImage: "/assets/img/2024-05-01-BuildingABetterJavaScriptDOMBuilderPart2ExtendingSystemObjects_0.png"
date: 2024-05-01 23:02
ogImage: 
  url: /assets/img/2024-05-01-BuildingABetterJavaScriptDOMBuilderPart2ExtendingSystemObjects_0.png
tag: Tech
originalTitle: "Building A Better JavaScript DOM Builder : Part 2 Extending System Objects"
link: "https://medium.com/codex/building-a-better-javascript-dom-builder-part-2-extending-system-objects-ec159349c864"
---


<img src="/assets/img/2024-05-01-BuildingABetterJavaScriptDOMBuilderPart2ExtendingSystemObjects_0.png" />

첫 번째 부분에서는 DOM-JON 개념을 소개했습니다. HTML을 JSON 스타일의 네임스페이스로 재구성하고, 이를 DOM에 직접 번역하는 과정을 간단하게 소개하며, InnerHTML을 통해 작업하는 대신에 바로 DOM으로 이동하는 이유를 다뤘습니다.

간단한 사이드 노트, 이 기사의 목적은 여러분에게 이것을 사용하는 방법을 가르치는 것이 아니라, 제가 이를 구축하는 과정에서의 사고 과정을 공유하는 것입니다. 실시간으로 말이에요. 피드백을 받기 위해 내 머릿속에 정리하기 위해 글로 써내리기도! 문서화 및 전체 웹사이트는 나중에 제작될 예정입니다.

이번에는 기존 엘리먼트에 여러 노드를 쉽게 적용할 수 있도록하고, 이전 "make" 루틴의 "attach" 부분에 대한 액세스를 독립적으로 제공하고, 속성 처리를 더 견고하게 만들고자 합니다.

<div class="content-ad"></div>

'원인은 몇 가지 부족한 것이 있기 때문이죠. Element.style 나 Element.dataset과 같은 속성은 Object.assign을 통해 요소에 적용할 수 없습니다. 속성에 직접 적용해야 합니다. 또한 DOM-JON 구조의 "속성 객체"를 사용하여 요소를 "배치"하는 방법과 같은 다른 정보를 전달할 수 있다면 좋겠어요.

이 부분을 간단히 하는 가장 좋은 방법은 무엇일까요?

# 시스템 객체 확장

기본적으로, 저는 기존 Document, Object, Node 및 Element 객체에 내 방법을 추가할 것입니다. 부모 클래스에 대한 정적 값 및 프로토타입에 대해서도 추가할 겁니다.

<div class="content-ad"></div>

이제 이 일에 대해 너무 많은 공포가 있어요. 마치 JavaScript의 강력하고 다용도 객체 모델을 수정하면 안 된다는 것처럼 말이죠. "결코 하지 말아야 한다!" 라고 하는 분들은 충분한 이유 없이 말하는 경우가 많아요. 하지만 합당한 우려가 세 가지 있습니다.

- IE 7 / 이전 버전은 기존 객체에 프로토 타입 변경을 상속하지 않습니다.
- 우리 자신의 함수와 언어의 미래 변경 사이에 이름 충돌의 문을 열어둡니다.
- 변경할 수 있는 객체를 실수로 덮어쓰고, 이들을 열거할 수 있을 경우에 덮어쓸 수 있습니다.

그 첫 번째 우려는 어질어질해요! 이제는 2024년이에요. 우리는 전혀 구식이 아닌 JavaScript를 쓰고 있어요. nullish coalescing, for..of, IE 어떤 버전에서도 작동하지 않는 spread / rest 연산자 등을 사용하고 있어요. 심지어 "화살표 함수"가 있으면 익스플로러의 JSCRIPT 엔진이 즉시 다운될 정도에요.

두 번째로, 이 문제는 네이밍 규칙을 사용하여 쉽게 해결할 수 있어요. 이런 경우에는 lodash의 방식을 가져와서 모든 사용자 지정 메서드와 속성의 시작에 이중 밑줄을 사용할 거에요. 누군가가 비슷한 기교를 사용하지 않는 한 문제없을 거예요.

<div class="content-ad"></div>

저 세 번째 코드는 대부분 사람들이 바보같은 일을 하는 경우에 발생한 것이에요:

```js
Element.prototype.__make = function(tagName, ...attach) {}
```

해야 할 것은 다음과 같아요:

```js
Object.defineProperty(
  Element.prototype,
  "__make",
  { value : function(tagName, ...attach) {} }
);
```

<div class="content-ad"></div>

Object.definePropert[ies | y]는 우리의 친구입니다... 그리고 JavaScript의 가장 안타깝게도 under-used한 부분 중 하나입니다. 전체 새 클래스를 만들지 않고 기존 Object에 추가하는 능력은 엄청 유용합니다. 시스템 객체가 이미 존재하기 때문에 전역 네임스페이스에 추가하는 것처럼 보이지 않습니다. 기본적으로 이러한 메서드에 의해 추가된 객체 속성 - 네, 속성, "속성"이 아니라. 그렇습니다, 심지어 DOM에 있는 경우도! - 객체에 대해 열거할 수 없게 만듭니다. 시스템 메서드만큼 "숨겨진" 것입니다. 현대 클래스에서 #을 접두사로 붙일 때와 같습니다. 필요할 경우에는 열거 가능하게 만들기 위해 인수 객체에 enumerable:true를 추가할 수도 있습니다.

# Object.definepropert[ies|y] 개선하기

이 함수들을 좋아하지만, 문법에는 약간 번잡한 부분이 있어 불필요하게 장황하게 느끼게 할 수 있습니다. 이전 기사에서처럼 "타입"을 가로채서 요소의 "타입"을 확인하여 일반 객체를 전달하면 defineProperty과 같이 동작하지만, 다른 값 유형은 자동으로 가장 일반적으로 사용하는 기술인 객체 `{` value `}`에 래핑하게 할 수 있습니다.

이를 돕기 위해 - 특히 일반 Object를 후손으로부터 격리하기 위해 - 나만의 Object.__type 루틴을 추가합니다. JavaScript에서 가장 큰 고통 중 하나는 범용 "데이터 유형" 객체를 다른 객체와 구분하는 간편한 메커니즘이 없다는 것입니다. 일부 후손은 typeof == "Object"를 반환하고 이는 원하는 바가 아닐 수 있습니다... 그리고 배열 같은 것들이 instanceof와 같은 것을 사용해야 할 수 있습니다.

<div class="content-ad"></div>

목적을 달성하기 위해 Object.prototype에 이것을 적용하고 있어요.

```js
    __type : { get : function() {

      let value = Object.prototype
        .toString
        .call(this)
        .split(" ", 2)
        [1].slice(0, -1);

      this.__define("__type", value);
      return value;
    } } // Object.prototype.__type
```

toString 메서드에는 실제 Object 클래스 이름이 포함되어 있어서 대부분 Array에는 Array라고, Node에는 Node라고, 일반 객체에는 Object라고 등등 표시될 거에요. 문자열 처리면에서 해당 값을 가져오는 것이 약간 무겁지만, Object.__type을 두 번 이상 요청하면 루틴이 두 번 호출되는 대신 define이 반환되도록 타입을 재정의할 수 있어요.

그러나 "boolean"과 같은 소수의 Object에 대해 이것은 작동하지 않습니다. 이것은 명백히 Object인데도 Object.prototype에서 상속받지 않기 때문이에요. (프로토타입이 있는) Element 등 특정 하위 클래스를 알 필요가없는 다른 객체들이 있을 수 있어요. Element 인지 여부를 알고 싶은데 HTMLTableElement인지를 알아야 할 필요는 없는 것이죠.

<div class="content-ad"></div>

따라서 미리 값의 값을 먼저 선언해야 합니다:

```js
 for (let value of [
   "Array", "Boolean", "Date", "Element",
   "Error", "Function", "Map", "Node",
   "Number", "RegExp", "Set", "String",
   "Symbol", "Text"
 ]) Object.defineProperty(
   window[value].prototype, "__type", { value }
 );
```

다행히도 모든 것이 window의 하위 요소이므로 window[value]를 사용하여 모든 이름을 배열에서 대상으로 할 수 있습니다. 매번 일일이 선언할 필요 없이 또는 [name, Object]와 같이 어리석고 무의미한 객체를 만들 필요가 없습니다.

자바스크립트를 잘 몰라도 되는 분들을 위해,  value는 `{` "value": value `}`와 기능적으로 동일합니다. 객체 선언에서 변수를 그냥 넣으면 변수의 이름이 속성의 이름이 됩니다.

<div class="content-ad"></div>

지금은 우리가 __define 루틴을 만들 수 있게 했습니다.

```js
    __define : { value : function(name, value) {
      /*
        Object.defineProperty를 통해 속성을 할당합니다.
        일반적인 Object가 전달되면 변경하지 않을 것이지만,
        타입 지정된 Object나 다른 값이 전달되면 새 속성의 값을
        할당할 Object로 이스케이프됩니다.
        
        전달된 객체대신 "this"를 반환하며, 내 의견으로는
        훨씬 더 유용한 값입니다.
      */
      return Object.defineProperty(this, name,
        "Object" == value.__type ? value : { value }
      );
    } }, // Object.prototype.__define
```

그리고 여러 속성을 설정하기 위한 __defineProps도 있습니다.

```js
    __defineProps : { value : function() {
      for (const props of arguments) {
        for (const [name, value] of Object.entries(props)) {
          this.__define(name, value);
        }
      }
      return this;
    } }, // Object.prototype.__defineProps
```

<div class="content-ad"></div>

저는 이것이 단지 구문 설탕을 구현하는 것이라는 것을 알지만, 괜찮습니다.

그들이 "this"를 반환한다는 것에 주목하세요. 이는 정의나 속성을 쉽게 연결할 수 있게 해줍니다. 수정된 객체 대신 적용된 객체를 반환하는 것은 많은 내장 JS 함수의 어리석은 부분 중 하나이며, 사용자 정의 메서드로 "감싸는" 또 다른 좋은 이유입니다.

구문 설탕에 관해서 말씀드리면... 몇몇 흔히 사용되는 Object 메서드에 대한 별칭을 제공하고 있습니다. 많은 방법이 Object에 정적인 메서드인 것은, 조작된 객체를 전달해야 하는 번거로움을 초래합니다. JS의 대부분이 Object의 형식을 갖춘 객체임을 감안하면, 이것은 약간 어리석은 것처럼 보일 수 있습니다. "Object.entries(myObject)" 대신에 그냥 "myObject.entries"로 간단히 작성할 수 있어야 하는 부분에 대해 지금 까지 많이 타이핑하는 것이 싫어졌습니다.

```js
  /*
    다음 속성들은 Object 클래스에서 혼란스럽게 정적입니다.
    이는 타입 캐스팅을 강제로 이용하는 데 편리하지만,
    이미 객체인 것을 알고 있을 때는 복잡하다고 생각할 수 있습니다!

    그래서 우리는 몇 가지 별칭을 만들어 보겠습니다.
  */
  const makeAliasWrapper = (method, name) => {
    Object.prototype.__define(
      `__${name}`,
      { [method] : function() {
        return Object[name](this, ...arguments)
      } }
    );
  }; // makeAliasWrapper
  
  for (const [ method, names ] of [
    [ "get",
      [ "entries", "isFrozen", "isSealed", "isExtensible", "keys", "values" ]
    ],
    [ "value",
      [ "assign", "freeze", "hasOwn", "is", "seal", "preventExtensions" ]
    ]
  ]) for (name of names) makeAliasWrapper(method, name);
```

<div class="content-ad"></div>

저는 객체에 열거 가능한 키가 있는지 확인하는 "__empty" 게터도 만듭니다. 대부분의 경우, 이렇게 하는 이유는 제 기억력이 좋지 않아서 그런데요, "__empty"가 "Object.keys(target).length == 0" 또는 "!target.__keys.length"보다 기억하기 쉽거든요. 저의 별칭을 사용해서요.

```js
    __empty : { get : function() {
      /*
        객체에 열거 가능한 키가 있는지 편리하게
        보고합니다.
      */
      return !this.__keys.length;
    } }, // Object.prototype.__empty
```

그리고 이것으로 좋은 베이스라인 "헬퍼" 라이브러리가 완성됩니다.

그리고, 네, 전 "arrow" 대신 전체 함수를 사용하고 있습니다. 이유는 실제로 뒤집는 객체인 "this"에 액세스해야 하기 때문이에요. "this"를 창으로 설정하는 화살표 함수는 정말 많은 시나리오에서 아무 쓸모가 없거든요.

<div class="content-ad"></div>

# "첨부"와 "setAttr"

실제로 make 루틴을 구현하기 전에, 자식 요소들과 속성 객체의 "attach"를 별도의 함수로 분리하고 싶어요. 여러 하위 루틴들을 구현하고 있기 때문에, 우리의 지역 범위에 있는 "attachData" 객체 내부에 룩업 테이블/객체를 만들고 있어요.

우선은 "sterile / void / empty" 요소들에 대한 오류 감지를 해야해요. 이러한 요소에 속성을 첨부할 수 있지만 자식 노드는 첨부할 수 없어요. 나는 한 걸음 더 나아가서 특정 속성으로 String/Number 콘텐츠를 추가하는 것을 허용해요. 그러므로 우리는 다음을 할 수 있을 거에요:

```js
[ "img=images/test.png", "Test Image" ]
```

<div class="content-ad"></div>

아래의 코드조각을 Markdown포맷으로 표현하면 다음과 같습니다:

```js
<img src="images/test.png" alt="Test Image">
```

나는 어떤 함수나 배열을 통한 속성 처리도 허용한다.

```js
canAttach: {
    /*
        null          첨부할 수 없음 (빈 태그)
        Boolean true  첨부할 수 있음 (기본값으로 기재되지 않은 경우)
        Array         인수 키에 할당할 값
        Function      콜백 함수(element, value)을 처리함
        String        this.setAttribute로 첨부
    */
    area     : "alt",
    img      : "alt",
    meta     : "content",
    path     : "content",
    track    : "label",
    input    : "value",
    base     : null,
    br       : null,
    col      : null,
    embed    : null,
    hr       : null,
    link     : null,
    param    : null,
    source   : null,
    wbr      : null,
    // 재밌는 목적으로 일부 SVG를 포함
    polygon  : "points",
    polyline : "points",
    circle   : [ "cx", "cy", "r" ],
    ellipse  : [ "cx", "cy", "rx", "ry" ],
    line     : [ "x1", "y1", "x2", "y2" ],
    path     : [ "x1", "y1", "x2", "y2" ],
    rect     : [ "x", "y", "width", "height" ]
}, // attachData.canAttach
```

<div class="content-ad"></div>

그것은 우리에게 입력 값 설정하는 두 가지 방법을 제공한다는 걸 확인할 수 있어요. 다시 한번 말하지만, 저는 괜찮아요. 옵션은 좋은거죠.

canAttach의 유형은 각각 다른 루틴을 사용해요. 제가 선택한 방법은 switch/case보다는 Object 룩업을 사용하는 것이에요. 옵션 체이닝 덕분에 attach 루틴 자체를 크게 간소화할 거에요.

```js
    canType : {

      "Array" : (target, arg, canAttach) => {
        
        if ("Array" !== arg.__type) throw new Error(
          `<${this.tagName}>.__attach는 배열을 비-속성 인수로만 첨부할 수 있어요. "${arg.__type} 대신에 입력했네요.`
        );
        
        if (arg.length !== canAttach.length) throw new Error(
          `<${this.tagName}>.__attach는 어떤 배열 인수에도 ${canAttach.length}개의 값이 필요해요. "${arg.length} 대신 입력했네요.`
        );
        
        Object.assign(this, Object.__fromKeyValuePairs(canAttach, args));
        
      }, // attachData.canType.Array

      "String" : (target, arg, canAttach) => {
        
          switch (arg.__type) {
            case "Number":
            case "String":
              target.setAttribute(canAttach, arg);
              return;
          }
          
          throw new Error(
            `<${this.tagName}>.__attach는 문자열 또는 숫자 비-속성 인수만 첨부할 수 있어요. "${arg.__type} 대신 입력했네요.`
          );
          
      } // attachData.canType.String

    }, // // attachData.canType
```

여기에 "throw"를 많이 사용한 것을 주목하세요. 심각한 오류가 발생했을 때는 스크립팅이 멈춰야 한다고 확신을 갖고 있어요. 그 자리에서 멈춰야 해요. HTML과 JavaScript는 이를 처리하기 위한 완벽한 메커니즘을 제공하지만 여전히 너무 관대하다고 생각해요.

<div class="content-ad"></div>

"argument"의 종류에 따라 특별한 처리 사례가 있을 수 있습니다.

```js
    argType : {

      "Array" : (target, arg, canAttach) => target.__make(...arg),

      "Function" : (target, arg, canAttach) => target.append(arg(target))

    }, // // attachData.argType
```

그리고 위의 어떤 경우도 일치하지 않을 때의 대체 방안입니다.

```js
    append : (target, arg, canAttach) => target.append(arg)
```

<div class="content-ad"></div>

위 모든 것이 갖춰진 상태에서 Element.__defineProps를 Element.prototype.__attach 메서드에 적용할 수 있습니다.

```js
 Element.prototype.__defineProps( {

    __attach : function() {

      const canAttach = attachData.canAttach[
        this.tagName.toLowerCase()
      ] || true;

      for (const arg of arguments) {

        if ("Object" === arg.__type) this.__setAttr(arg);

        else if (canAttach) (
          attachData.canType[canAttach.__type] ??
          attachData.argType[arg.__type] ??
          attachData.append
        )(this, arg, canAttach);

        else throw new Error(
          `<${this.tagName}>은(는) 빈 Element이므로 해당 Element.prototype.__attach로 자식요소를 추가할 수 없습니다.`
        );

      }

      return this;

    }, // Element.prototype.__attach
```

Element의 tagName을 룩업했을 때 찾을 수 없다면 대부분의 태그는 첨부 파일을 가질 수 있으므로 true로 기본값으로 설정됩니다.

만약 순수한 객체라면, 속성을 설정하기 위해 해당 객체를 사용합니다. 만약 loose-true라면 널 병합 연산자를 사용하여 올바른 첨부 서브루틴을 선택합니다. 만약 아무것도 작동하지 않으면 자식 요소/데이터를 첨부할 수 없는 요소에서 예외를 발생시킵니다.

<div class="content-ad"></div>

그리고 함수에 전달된 모든 인수를 처리하기 때문에 속성 및 자식 뿐만 아니라 make도 선언할 수 있습니다. 따라서 DOM-JON 항목의 배열이 있다면 attach에서 분해할 수 있습니다.

```js
const test = [
  [ "h2", "테스트 제목" ],
  [ "p", "간단한 테스트 단락" ]
];

document.getElementById("testDIV").__attach(...test);
```

이렇게 하면 실제 JSON 객체를 만들고 쉽게 첨부할 수 있습니다. 이제 HTML을 서버측에서 빌드하지 않고 JSON을 보내는 가능성을 생각해보세요.

이제 이렇게 생긴 "setAttr" 메소드를 호출합니다:

<div class="content-ad"></div>

```js
__setAttr: function (attr) {
  
  for (const [key, value] of Object.entries(attr)) {
    
    switch (key) {
      case "__makePlace":
        this.__define(key, value);
        continue;
      case "dataset":
      case "style":
        if ("Object" !== value.__type) throw new Error(
          `<${this.tagName}>.__setAttr requires a Object when setting "${key}", got "${value.__type}" instead.`
        );
        Object.assign(this[key], value);
        continue;
    }
    
    switch (value.__type) {
      case "Array":
      case "Function":
      case "Object":
        this[key] = value;
        continue;
    }
    
    this.setAttribute(key, value);
    
  }
  
  return this;
  
} // Element.prototype.__setAttr
```

"쉬운" `Object.assign` 대신 손수 속성 객체를 반복해서 순회하는 방법을 사용합니다. 이렇게 하면 정의를 후킹하고, 데이터셋과 스타일을 올바르게 처리할 수 있습니다. 대부분의 속성에는 `setAttribute`를 사용하는 것이 좋지만, 그것은 값들을 문자열로만 설정할 수 있습니다. 배열, 함수 및 객체 기능을 트랩할 수 있어서 이벤트 등을 설정할 수 있게 합니다.

참고로, DOM-JON에서는 className 대신 `{` "class": "myClassName" `}`를 사용해야 합니다. 여러분! className을 수동으로 "class"로 이름을 변경하여 두 가지 방법으로 사용할 수 있도록 할지 고민 중입니다. DSS "dot" 구분 기호를 사용하여 클래스를 설정하는 것이 시간을 들이는 가치가 있는 것일까요?

Element에 이 모든 것을 설정한 후에는 새로운 개선된 `__make`을 사용할 수 있게 됩니다. 이것을 모듈의 일부로 내보내거나 전역 범위에 넣는 것보다는, 저는 문서 객체에 이것을 넣을 것입니다!

<div class="content-ad"></div>

```js
  document.__defineProps( {

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
            parts.data.namespace.indexOf("http://") === 0 ?
            parts.data.namespace :
            (
              makeData.namespaces[parts.data.namsspace.toUpperCase()] ?? 
              makeData.namespaces.HTML
            )
          ) : makeData.namespaces.HTML
        ),
        e = Object.assign(
          document.createElementNS(namespace, tagName),
          parts.attr
        );
      
      if (!parts.define.__empty) {
        for (const [key, value] of parts.define.__entries) {
          e.__define(key, value);
        }
      }

      if (parts.data.value) e.setAttribute(
        makeData.values[tagName] ?? "value",
        parts.data.value
      );

      if (parts.data.special) {
        const attrName = makeData.special[tagName];
        if (attrName) e.setAttribute(attrName, parts.data.special);
        else console.warn(
          `Special underscore property not supported on <${tagName}>, ignoring value "${parts.data.special}"`
        );
      }

      if (attach) e.__attach(...attach);

      return e;

    } // document.__make

  } ); // document extensions
```

큰 변경 중 하나는 이제 "define"을 구분 기준으로 사용한다는 것입니다. 이를 새로운 구분자 조회에서 확인할 수 있습니다:

```js
    /*
      DSS 구분자는 여기 나열된 순서의 역순으로 사용해야 합니다.
      여기 나열된 나중에 있는 문자는 이전 섹션 값들의 값 안에서 사용할 수 없습니다.
      
      예를 들어 ID 내에서 "."을 사용할 수 없습니다.
    */
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

이를 통해 DOM 요소에 변경 불가능하고 열거되지 않는 정의를 만들 수 있어요. 다음 부분에 이르러 성능이 좋아지는데 유용할 것입니다: Element.prototype.__make

<div class="content-ad"></div>

```js
    __make : function() {
      
      const e = document.createElement(...arguments);
      this.insertAdjacentElement(e.__makePlace ?? "beforeend", e);
      return this;
      
    }, // Element.prototype.__make
```

이 버전의 make 함수는 새 Element를 부모 요소와 관련하여 자동으로 첨부합니다. 다음과 같은 코드가 있다고 가정해봅시다:

```js
<div id="test">
  <p>원본 콘텐츠</p>
</div>
```

이 기능을 한 번 시도해보세요 — __attach가 Element.prototype.__make를 호출하므로 둘 다 테스트됩니다.

<div class="content-ad"></div>

```js
document.getElementById("test").__attach(
  [ "h2@afterbegin", "처음에 <h2> 추가됨" ],
  [ "h1@beforebegin", "앞에 <h1> 추가됨" ],
  [ "footer", // beforeend는 기본값
    [ "p", "마지막에 <footer> 추가됨" ]
  ],
  [ "p@afterend", "<p> 뒤에 추가됨" ]
);
```

여기 동작 중인 것이 있는 펜입니다:

전체 DOM-JON 코드베이스를 외부 {}에 넣어 scope isolation을 만들었음을 볼 수 있습니다. 오랜 시간 동안 JS의 let/const가 쓸모 없다고 생각했는데, 그것들을 사용하면 이전에 IIFE에 낭비했던 것들을 대체할 수 있다는 것을 깨달았습니다. 자주 캐시를 비운 첫 로드에서 클라이언트 사이드 파일 수를 나누는 모듈을 사용하지 않아도 됩니다. 이 방법을 사용하면 별도의 스크립트를 연결하여 배포 시 파일 수를 줄일 수 있습니다.

# 새로운 Object 메소드 요약

<div class="content-ad"></div>

그래서 이제 DOM-JON을 다루는 방법에 대해 다음과 같은 메서드가 있습니다:

**method Element.prototype.__attach(...attachments)**
attachment 유형에 따라 노드 또는 속성을 문서에 첨부합니다. 일반적인 객체는 노드 속성 및/또는 특별히 정의된 상태로 적용되며, 배열은 this.__make(Element.prototype__make)에 전달됩니다. 그 외의 경우는 추가됩니다.

**method document.__make(selector, ...attachments)**
DSS를 적용하여 셀렉터로부터 Element를 생성한 다음 첨부를 Element.prototype.__attach에 전달합니다.

**method Element.prototype.__make(selector, ...attachments)**
Document.__make를 호출하여 Element를 생성한 다음, 새 Element의 __makePlace 값에 따라 "this"에 추가되거나, 선언되지 않은 경우 기본값으로 "beforeend"에 추가됩니다.

<div class="content-ad"></div>


method Element.prototype.__setAttr(obj)  
요소에 속성:값 쌍의 일반 객체를 할당합니다. 일부 속성은 __define으로 생성되도록 가로챕니다. 스타일 및 데이터세트와 같은 객체 하위 속성은 정규화되어 작동합니다. 함수, 배열 및 기타 객체는 this[key] = value로 할당되고, 다른 모든 값 유형은 this.setAttribute(key, value)로 할당됩니다.

또한 시스템 객체에 대한 많은 유용한 추가 기능들이 있습니다.

method Object.prototype.__define(name, value)  
Object.defineProperty와 유사하지만 일반 객체를 `{` value `}`로 할당하며 "this"를 반환하고 전달된 값이 아닙니다.

method Object.prototype.__defineProps(...props)  
__define이 defineProperty와 유사하다면, __defineProps는 defineProperties와 유사합니다. 가장 큰 차이점은 여러 다른 이름/속성 쌍의 객체를 수락할 수 있으며 첫 번째 전달된 인수 대신 "this"를 반환한다는 것입니다.

<div class="content-ad"></div>

정적 메서드 Object.__defineMulti(targets, ...props)
여러 대상에 속성을 할당합니다. 대상은 키 배열이어야하며, 그 다음 ...props의 각 객체와 일치해야합니다.

정적 메서드 Object.__fromKeyValueArrays(keys, values)
두 배열에서 객체를 생성합니다.

getter 및/또는 propertyObject.prototype.__type
단일 "유형"을 반환합니다. 마치 통일된 "typeof" 및 "instanceof"처럼 다루기가 훨씬 덜 복잡한 것처럼. 대부분의 객체에 대해 이것은 처음 호출시 getter이지만 절대 수정할 수없는 열거 불가 속성으로 재정의됩니다. 일부 일반 객체 유형도 해당 속성으로 시작됩니다.

이것이 "공개적으로 보이는" 속성과 메서드입니다. 전역 변수나 전역 함수가 필요하지 않습니다.

<div class="content-ad"></div>

그게 이번에는 그게 다야. 13,000 줄의 코드가 있지만 gzip으로 압축하면 겨우 4,400 줄만 남아. 압축 후 최소화하면 3,000 줄도 안 될 것 같아.

이 알파 빌드를 여기서 다운로드할 수 있어:
https://cutcodedown.com/for_others/domjon/domjon.alpha4.js

다음에는 "__make"로 구축된 DOM 구조에 직접 연결할 수 있는 getter 및 setter를 생성하는 "State" 객체를 추가할 거야. 이는 "listeners"가 작동하는 방식과 유사하다.

# 기사 목차

<div class="content-ad"></div>

# 파트 1 : 기본 개념
# 파트 2 : 시스템 객체 확장 (현재 위치)
# 파트 3 : 상태
# 파트 4 : 템플릿 및 모듈 (곧 제공 예정)