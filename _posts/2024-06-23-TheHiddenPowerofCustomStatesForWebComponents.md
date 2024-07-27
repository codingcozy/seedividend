---
title: "웹 컴포넌트에서 커스텀 상태의 숨겨진 힘"
description: ""
coverImage: "/assets/img/2024-06-23-TheHiddenPowerofCustomStatesForWebComponents_0.png"
date: 2024-06-23 13:03
ogImage: 
  url: /assets/img/2024-06-23-TheHiddenPowerofCustomStatesForWebComponents_0.png
tag: Tech
originalTitle: "The Hidden Power of Custom States For Web Components"
link: "https://medium.com/itnext/the-hidden-power-of-custom-states-for-web-components-dcae5b048e20"
---


사용자 정의 요소의 진화 과정에서 중요한 단계

![image](/assets/img/2024-06-23-TheHiddenPowerofCustomStatesForWebComponents_0.png)

이전에 썼던 "웹 컴포넌트가 이제 네이티브 폼 요소가 될 수 있게 되었고"와 "웹 컴포넌트의 네이티브 폼 유효성 검사"라는 기사에서, ElementInternals 속성에 대해 설명했었어요. 이 속성을 통해 사용자 정의 요소가 양식과 관련되도록 할 수 있게 되었죠.

이 인터페이스는 또한 개발자들이 사용자 정의 상태와 사용자 정의 요소를 연관시킬 수 있도록 하며, 이 상태에 기반하여 스타일을 입힐 수 있게 해줍니다.

<div class="content-ad"></div>

ElementInternals의 states 속성은 사용자 지정 요소가 있는 상태를 나타내는 CustomStateSet을 반환합니다. 이 CustomStateSet은 집합에 추가 및 제거를 가능하게 합니다.

집합의 각 상태는 문자열로 표시되며 현재 그에는 두 가지 유형의 구문이 있습니다:

- 이전 구문: --mystate (향후 지원 중단 예정)
- 새로운 구문: mystate

이러한 상태는 내장된 상태와 마찬가지로 사용자 지정 상태 가상 클래스를 사용하여 CSS에서 액세스할 수 있습니다.

<div class="content-ad"></div>

예를 들어, 선택된 체크박스는 내장된 :checked 가상 클래스를 사용하여 CSS에서 액세스할 수 있습니다.

```js
input[type=”checkbox”]:checked {
 outline: solid green;
}
```

다른 예로, 비활성화된 버튼은 :disabled 가상 클래스를 사용하여 CSS에서 액세스할 수 있습니다.

```js
button:disabled {
 cursor: not-allowed;
}
```

<div class="content-ad"></div>

비슷하게, 사용자 정의 상태를 포함하는 요소는 다음과 같은 방식으로 CSS에서 액세스할 수 있습니다:

```js
/* 이전 구문 */
my-element:--mystate {
  color: red;
}

/* 새 구문 */
my-element:state(mystate) {
  color: red;
}
```

# 사용자 정의 상태의 사용 사례

사용자 정의 상태는 강력한 기능을 해제합니다.

<div class="content-ad"></div>

내부 상태에 기반을 둔 Web Components의 스타일링을 지원하기 때문에 이러한 상태를 반영하기 위해 컴포넌트에 속성이나 클래스를 추가할 필요가 없어요. 따라서 완전히 내부적으로 유지됩니다.

예를 들어, `video-player` 컴포넌트가 있고 이 컴포넌트는 비디오를 재생하는 데 사용되는 재생 버튼을 표시합니다.

재생 버튼을 클릭하면 비디오가 재생되고, 이 때 재생 버튼이 숨겨지고 일시 정지 버튼이 표시되기를 원합니다.

그런 후 일시 정지 버튼을 클릭하면 이 버튼이 숨겨지고 재생 버튼이 다시 표시되어야 합니다.

<div class="content-ad"></div>


이 작업을 간단히 수행하는 방법은 플레이 속성을 소개하고 해당 속성을 반영하고 :host 가상 클래스를 사용하여 버튼을 표시하거나 숨기는 것입니다.

```js
class VideoPlayer extends HTMLElement {

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 300px;
          height: 300px;
          border: 2px solid red;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: transparent;
        }

        #pause {
          display: none;
        }

        :host([playing]) #play {
          display: none;
        }

        :host([playing]) #pause {
          display: block;
        }
      </style>

      <button id="play" type="button">Play</button>
      <button id="pause" type="button">Pause</button
    `;
  }

  connectedCallback() {
    const playButton = this.shadowRoot.querySelector('#play');
    const pauseButton = this.shadowRoot.querySelector('#pause');

    playButton.addEventListener('click', () => {
      this.playing = true;
    });

    pauseButton.addEventListener('click', () => {
      this.playing = false;
    });
  }

  get playing() {
    return this.hasAttribute('playing');
  }

  set playing(isPlaying) {
    if(isPlaying) {
      this.setAttribute('playing', '');
    }
    else {
      this.removeAttribute('playing');
    }
  }
}
```

기본적으로 재생 버튼이 표시됩니다. 플레이 속성을 위한 설정자가 정의되어 해당 속성을 설정하거나 제거하며 CSS 규칙은 :host 가상 클래스를 사용하여 버튼을 표시하거나 숨기는 역할을 합니다.

아래에 작동하는 예제가 있습니다:


<div class="content-ad"></div>

이 방법은 잘 작동하지만 이 구현에 잠재적인 문제가 있을 수 있어요.

이렇게 내부 속성을 속성으로 노출하는 것은 항상 바람직하지 않을 수 있고 캡슐화를 깨버릴 수 있어요.

이 경우 playing 속성을 노출하는 것은 나쁜 생각은 아닐 수 있지만, 이는 사용자가 그냥 속성을 추가함으로써 컴포넌트를 재생 상태로 수동 설정할 수 있지만, 실제로 비디오가 재생되는 것은 아니라는 점이에요.

이 속성을 노출함으로써 사용자가 playing 속성을 추가하기만 하면 비디오를 재생할 수 있다는 기대감조차 줄 수 있어요.

<div class="content-ad"></div>

사실 특정 상태의 웹 컴포넌트를 설정하기 위해 속성을 추가하는 것은 해당 상태를 설정하는 것이 아니기 때문에 playing 속성을 true로 설정하지 않습니다. playing 속성에 playing 속성을 추가하는 것만으로 playing 속성을 true로 설정하지는 않습니다.

이 경우 실제로 심각한 피해를 입히지는 않겠지만 내부 속성을 노출하는 것이 좋지 않은 경우가 항상 있을 수 있습니다.

이것은 사용자 정의 상태에 대한 완벽한 사용 사례입니다. 속성은 노출되지 않지만 이러한 상태에 기반한 CSS 스타일을 사용하여 컴포넌트를 여전히 스타일링할 수 있습니다.

# 사용자 정의 상태 추가 및 제거

<div class="content-ad"></div>

언급한 바와 같이 모든 사용자 지정 상태는 ElementInternals 인터페이스의 states 속성에 저장된 CustomStateSet 객체에 저장됩니다.

상태를 추가하고 제거하는 데 사용되는 add 및 delete 메서드와 요소가 특정 상태를 갖고 있는지 확인하는 has 메서드가 있습니다.

다른 주목할 만한 메서드로는 모든 상태를 지우는 clear 및 요소의 모든 상태를 반복하는 forEach가 있습니다:

```js
// 내부 구현 부착
this.internals = this.attachInternals();

// 상태 추가 예전 문법
this.internals.states.add('--foo');

// 상태 추가 새 문법
this.internals.states.add('bar');

// 상태 반복
this.internals.states.forEach(state => {
 console.log(state); // foo bar
});

// 상태 제거 예전 문법
this.internals.states.delete('--bar');

// 상태 제거 새 문법
this.internals.states.delete('bar');

// 상태 존재 여부 확인 예전 문법
this.internals.states.has('--foo'); // true
this.internals.states.has('--bar'); // false

// 상태 존재 여부 확인 새 문법
this.internals.states.has('foo'); // true
this.internals.states.has('bar'); // false
```

<div class="content-ad"></div>

브라우저에서 오래된 구문만 지원하는 경우 --로 시작하지 않는 상태를 추가하려고 할 때 오류가 발생합니다:

```js
this.internals = this.attachInternals();
this.internals.states.add('foo'); // 오류, '--'로 시작하지 않음 (오래된 구문만 지원)
```

이전 예제가 사용자 정의 상태와 함께 작동하도록 하려면 `playing` 속성의 게터 및 세터를 상태와 함께 작동하도록 변경해야 합니다. 이를 오래된 및 새로운 구문을 지원하는 브라우저에서 작동하도록 하려면 --없이 상태를 설정하는 것은 try/catch 블록으로 감싸야 합니다:

```js
get playing() {
  return this.internals.states.has('--playing') || this.#internals.states.has('playing');
}

set playing(isPlaying) {
  if(isPlaying) {
    try {
      this.internals.states.add('playing');
    }
    catch(e) {
      this.internals.states.add('--playing');
    }
  }
  else {
   this.internals.states.delete('playing');
   this.internals.states.delete('--playing');
  }
}
```

<div class="content-ad"></div>

테이블 태그를 마크다운 형식으로 변경했습니다.

```js
/* 이전 구문 */
host(:--playing) #play {
  display: none;
}

/* 이전 구문 */
:host(:--playing) #pause {
  display: block;
}

/* 새로운 구문 */
host(:state(playing)) #play {
  display: none;
}

/* 새로운 구문 */
:host(:state(playing)) #pause {
  display: block;
}
```

내부 속성이 속성으로 노출되지 않도록 하는 것은 좋지만, 여전히 소비자가 내부 속성을 통해 상태에 액세스하고 add 및 delete 메서드를 호출하여 상태를 추가하거나 제거할 수 있습니다:

```js
const player = document.querySelector('video-player');

// 이전 구문
player.internals.states.add('--playing');

// 새로운 구문
player.internals.states.add('playing');
```

<div class="content-ad"></div>

더 좋지 않은 점은 소비자가 내부 상태를 변경하기 위해 playing의 setter를 호출할 수 있다는 것입니다.

이를 수정하여 getter와 setter 및 내부 속성을 모두 #으로 접두사를 붙여 private로 만들 수 있습니다:

```js
// internals is now private
this.#internals = this.attachInternals();

get playing() {
  return this.#internals.states.has('--playing') || this.#internals.states.has('playing');
}

set playing(isPlaying) {
  if(isPlaying) {
    try {
      this.#internals.states.add('playing');
    }
    catch(e) {
      this.#internals.states.add('--playing');
    }
        
  }
  else {
   this.#internals.states.delete('playing');
   this.#internals.states.delete('--playing');
  }
}
```

private 속성에 대한 getter와 setter 쌍을 작성하는 것이 직관적이지 않을 수 있지만, 이것이 실제로 작동한다는 것에 주목하세요.

<div class="content-ad"></div>

비록 playing에 getter와 setter가 정의되어 있지만, 여전히 private이며 클래스 내에서만 접근 가능합니다.

값을 할당하면 setter가 호출되고 값을 읽으면 getter가 호출됩니다.

아래에 전체 코드가 있습니다:

```js
class VideoPlayer extends HTMLElement {
  #internals;  // private property를 필요로 하는 클래스 필드

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    this.#internals = this.attachInternals();

    shadowRoot.innerHTML = `
      <style>
        :host {
          width: 300px;
          height: 300px;
          border: 2px solid red;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: transparent;
        }

        #pause {
          display: none;
        }

        /* 예전 문법 */
        :host(:--playing) #play {
          display: none;
        }

        :host(:--playing) #pause {
          display: block;
        }

        /* 새로운 문법 */
        :host(:state(playing)) #play {
          display: none;
        }

        :host(:state(playing)) #pause {
          display: block;
        }
      </style>

      <button id="play" type="button">재생</button>
      <button id="pause" type="button">일시정지</button>
    `;
  }

  connectedCallback() {
    const playButton = this.shadowRoot.querySelector('#play');
    const pauseButton = this.shadowRoot.querySelector('#pause');

    playButton.addEventListener('click', () => {
      this.#playing = true;
    });

    pauseButton.addEventListener('click', () => {
      this.#playing = false;
    });
  }

  get playing() {
    return this.#internals.states.has('--playing') || this.#internals.states.has('playing');
  }

  set playing(isPlaying) {
    if(isPlaying) {
      try {
        this.#internals.states.add('playing');
      }
      catch(e) {
        this.#internals.states.add('--playing');
      }
    }
    else {
      this.#internals.states.delete('playing');
      this.#internals.states.delete('--playing');
    }
  }
}
```

<div class="content-ad"></div>

그리고 여기에는 오래된 구문과 새 구문 둘 다 작동하는 작동 예제가 있습니다:

이 예제들은 커스텀 상태에 기반하여 커스텀 요소를 내부 컴포넌트 내에서 :host 가상 클래스를 사용하여 스타일링하는 방법을 보여줍니다.

커스텀 요소는 사용자 정의 상태에 기반하여 외부에서 스타일링될 수도 있습니다.

이 스타일링은 :checked나 :hover와 같은 내장 상태에 기반하여 구성 요소를 스타일링하는 것과 동일한 형태를 가지고 있습니다.

<div class="content-ad"></div>

```js
/* 예전 구문 */
video-player:--playing {
  border: 1px solid red;
}

/* 새로운 구문 */
video-player:state(playing) {
  border: 1px solid red;
}
```

같은 CSS 속성에 대한 사용자 지정 상태를 기반으로 스타일 지정이 내부와 외부에서 모두 정의된 경우, 외부에서 정의된 스타일이 우선합니다.

다음 예제에서 컴포넌트는 --playing/playing 사용자 지정 상태일 때 녹색 테두리가 추가됩니다.

--playing/playing 상태에 대해 컴포넌트 내부에서 정의된 파란색 테두리는 덮어씌워집니다:


<div class="content-ad"></div>

```js
// 컴포넌트 외부에서 정의된 스타일
// 이렇게 하면 컴포넌트에 녹색 테두리가 우선적으로 적용됩니다.
// 이전 구문
video-player:--playing {
  border: 2px solid green;
}

// 새로운 구문
video-player:state(playing) {
  border: 2px solid green;
}

// 컴포넌트 내부에서 정의된 스타일
// 외부에서 정의된 스타일에 덮어씌워지게 됩니다.
// 이전 구문
:host(:--playing) {
  border: 2px solid blue;
}

// 새로운 구문
:host(:state(playing)) {
  border: 2px solid blue;
}
```

# 결론

사용자 정의 상태(Custom States)는 웹 컴포넌트의 진화를 위한 중요한 단계입니다.

이를 통해 컴포넌트의 상태를 속성이나 클래스를 추가하지 않고도 스타일링할 수 있어 외부에서 상태를 조작할 수 없도록 유지할 수 있습니다.


<div class="content-ad"></div>

커스텀 상태는 Chrome, Edge, Safari Tech Preview 187에서는 CustomStateSet 기능 플래그가 활성화되어 있고, Firefox 122에서는 dom.element.customstateset.enabled가 true로 설정되어 있을 때 지원됩니다.

현대 웹 플랫폼, 웹 컴포넌트, 그리고 Progressive Web Apps에 관한 제 주간 뉴스레터 'Modern Web Weekly'에 가입해보세요.