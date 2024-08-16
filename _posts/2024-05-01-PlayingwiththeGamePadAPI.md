---
title: "게임패드 API로 놀아보기"
description: ""
coverImage: "/assets/img/2024-05-01-PlayingwiththeGamePadAPI_0.png"
date: 2024-05-01 23:18
ogImage: 
  url: /assets/img/2024-05-01-PlayingwiththeGamePadAPI_0.png
tag: Tech
originalTitle: "Playing with the GamePad API"
link: "https://medium.com/gitconnected/playing-with-the-gamepad-api-c46858c38cb1"
isUpdated: true
---




![게임패드API](/assets/img/2024-05-01-PlayingwiththeGamePadAPI_0.png)

저는 게이머가 아닙니다. 한 때 인생에서 일종의 게이머였을 수도 있지만 더 이상 그렇지 않습니다. 그때조차도 제 능력은 그다지 대단하지 않았죠. 그럼에도 불구하고, 컴퓨터에서 게임패드를 사용하도록 나를 격려한 두 가지 사건이 있었습니다. 첫 번째는 90년대/2000년 초반의 비디오 게임을 하면서 느꼈던 향수로, 라즈베리 파이, 케이스와 몇 개의 컨트롤러를 구입하여 RetroPie를 만들어 가는 개인 프로젝트로 이어졌습니다.

두 번째는 "심심함"의 오후였습니다. 무언가 개발하고 싶었지만 아이디어가 바닥나 있었죠. 그래서 새로운 것을 탐험하기로 결심했습니다. MDN의 웹 API 페이지로 이동해보니, g로 시작하는 항목 가운데 뭔가 눈에 띄는 것이 있었습니다: 게임패드 API.

# 호기심은 고양이를 죽인다...

<div class="content-ad"></div>

게임패드를 액세스하고 제어하기 위한 표준 API? 그리고 "실험적으로" 나열되어 있더라도 모든 주요 브라우저에서 지원된다고? 예상치 못했지만 흥미로운 일이네요. 제 호기심을 자극했어요.

컴퓨터, 게임 컨트롤러, 자바스크립트 지식, 그리고 몇 시간의 여유시간이 있었어요... 무얼 잃을까요?

첫 페이지를 읽은 후에, 굉장히 간단해 보였어요: 상호작용, 이벤트, 그리고 메소드로 놀 수 있는 수줄. 제가 다룰 수 없는 것은 없다고 생각했죠...라고 생각했어요. MDN 튜토리얼로 이동해서 첫 코드 예제를 조금 단순화했어요:

```js
window.addEventListener("gamepadconnected", function() {
  console.log("게임패드가 연결되었습니다");
});
```

<div class="content-ad"></div>

페이지가 브라우저에 로드되었고, 기분 좋게 RetroPie 컨트롤러를 컴퓨터에 연결했는데...

아무 반응이 없었어요.

게임패드를 뽑았다가 다시 꽂아보았지만...

아무 반응이 없네요.

<div class="content-ad"></div>

언플러그. 다시 연결했어요.

아무 변화가 없더라구요.

게임패드를 콘솔 옆 올바른 위치로 되돌리려던 찰나에 다른 작업으로 넘어가기 전에 몇 개의 버튼을 눌렀더니, 무언가 일어났어요. 콘솔에 메시지가 표시되었죠:

```js
게임패드가 연결되었습니다
```

<div class="content-ad"></div>

페이지를 새로고침하고 버튼을 눌렀더니 콘솔에 다시 "게임패드 연결됨" 메시지가 나타났어요. 게임패드 API에 대해 많은 교훈 중 첫 번째를 배웠어요: 모든 컨트롤러가 컴퓨터에 연결되자마자 브라우저에 연결되는 것은 아니라는 거죠. 대부분은 버튼을 누르거나 조이스틱을 움직이지 않으면 활성화되지 않아요.

# 시작하기: 무엇이 지원되나요?

지금 Chrome이 지원하는 Gamepad API를 알았으니, 다음 단계는 다른 브라우저 운영체제에서 테스트해보는 거예요. 맥과 윈도우, 다른 브라우저, 다른 운영체제에서 같은 브라우저까지 시도해봤는데, 실험적인 API인데도 널리 지원되고 있어요. 심지어 윈도우의 Edge에서도 작동돼요!

![게임패드 API 사용](/assets/img/2024-05-01-PlayingwiththeGamePadAPI_1.png)

<div class="content-ad"></div>

일부 기능은 이전 버전에서도 사용할 수 있을 수도 있어요. 그럼에도 불구하고, 이 글에서 언급된 모든 기능은 위 표에 나타난 브라우저를 필요로 해요 (진동을 제외한 경우, 지원이 일관되지 않을 수 있습니다. 곧 자세히 살펴볼게요).

다음으로 생각한 것은: 이를 어떤 컨트롤러와 함께 사용할 수 있을까요? 나는 RetroPie와 함께 제공된 후조품 게임패드를 사용해봤지만, PS1, PS2, PS3, 그리고 Xbox One용 컨트롤러도 있었어요. (사실, 게이머가 아니라고 주장하는 사람으로서 너무 많은 콘솔을 가지고 있군요.) 원래 콘솔 컨트롤러도 작동할까요?

간단한 대답: 네.

자세한 대답: 일부는 작동하고, 일부는 작동하지 않아요. 예를 들어, PlayStation 컨트롤러(버전에 상관없이)나 닌텐도 스위치 컨트롤러는 문제가 없었어요. 몇몇 친구들이 Wii 컨트롤러도 데모 페이지에서 테스트해보고, 그것도 원활하게 작동했어요. 그러나 Xbox 컨트롤러는 다른 이야기였어요. 그들이 더 많은 전원이 필요할 수도 있고, 우리가 테스트한 버전이 올바르지 않았을 수도 있어요. 하지만, 우리는 그 중 어떤 것도 작동시키지 못했어요.

<div class="content-ad"></div>

... 흥미로운 사실이죠. 모조 게임패드는 모두 훌륭하게 작동했는데, 나중에 설명할 몇 가지 주의할 점이 있어요.

# 게임패드 인터페이스

다음 단계는 예제를 확장하고 게임패드 인터페이스를 탐색하는 것이었어요. gamepadconnected 이벤트가 연결된 게임패드 정보를 콜백 함수의 매개변수로 전달한다는 것을 알았죠. 이 정보를 볼 수 있게 객체를 기록해봤어요:

```js
window.addEventListener("gamepadconnected", function(e) {
  console.log("게임패드가 연결되었습니다.");
  console.log(e.gamepad);
});
```

<div class="content-ad"></div>

게임패드 인터페이스의 정의와 일치하는 결과를 기대했었어요:

```js
interface Gamepad {
  id: String,
  index: Long,
  connected: Boolean,
  timestamp: Timestamp,
  mapping: enum("standard", ""),
  axes: Array<double>,
  buttons: Array<GamepadButton>
}
```

하지만 결과물에는 약간 희망적으로 보이는 추가 정보가 포함되어 있었어요:

```js
{
  id: "USB 게임패드            (제조사: 081f 제품: e401)",
  index: 0,
  connected: true,
  timestamp: "2007.0849999901839"
  mapping: "",
  vibrationActuator: null,
  axes: [-0.003921568393707275, -0.003921568393707275],
  buttons: [
    {pressed: false, touched: false, value: 0},
    {pressed: true, touched: true, value: 1},
    {pressed: false, touched: false, value: 0},
    {pressed: false, touched: false, value: 0},
    {pressed: false, touched: false, value: 0},
    {pressed: false, touched: false, value: 0},
    {pressed: false, touched: false, value: 0},
    {pressed: false, touched: false, value: 0},
    {pressed: false, touched: false, value: 0},
    {pressed: false, touched: false, value: 0}
  ]
}
```

<div class="content-ad"></div>

아래와 같은 표에서 찾을 수 있습니다:

- id는 컨트롤러의 모델/유형을 식별하는 문자열입니다.
- index는 연결 시 할당된 게임패드의 고유 식별자입니다 (기본적으로 연결된 순서).
- connected는 게임패드의 상태를 나타냅니다.
- timestamp는 게임패드가 연결된 시간이 아니라 게임패드 데이터가 마지막으로 업데이트된 시간을 나타냅니다.
- mapping은 버튼 매핑이 표준인지 아닌지를 지정하는데, 다음 섹션에서 자세히 설명하겠습니다.
- axes는 게임패드의 다양한 축/조이스틱의 값이 들어 있는 배열입니다. 나중에 설명하겠습니다.
- buttons는 버튼들의 배열입니다.

아직 명확히 알지 못한 것들도 있었습니다: 연결된 게임패드에는 10개의 버튼과 2개의 축이 나타났지만, 물리적 장치를 보니 12개의 버튼과 축이 없었습니다. 조금 이상했습니다. 곧 왜 이런 일이 발생했는지 알게 되겠죠.

한편, 게임패드 인터페이스에 익숙해지던 중 재미있는 부분에 대비했습니다.

<div class="content-ad"></div>

# 버튼

게임패드가 연결되었거나 연결이 해제되었을 때를 감지하고 그 값과 속성을 읽어낼 수 있어요. 하지만 그 자체로는 실용적이지 않아요. 더 흥미로운 것으로 넘어갈 거예요.

방금 Gamepad 객체에는 버튼들의 배열을 포함하는 buttons 속성이 있다는 것을 보았어요. 이 버튼들은 자체 인터페이스(GamepadButton)를 가지고 있는데, 이는 세 가지 읽기 전용 값이 있는 개체입니다:

```js
interface GamepadButton {
  pressed: Boolean,
  touched: Boolean,
  value: Double
}
```

<div class="content-ad"></div>

그들은 대개 스스로 설명되어 있어요:

- pressed는 버튼이 눌렸는지 여부를 나타냅니다. 버튼이 눌린 동안에는 true가 됩니다.
- touched는 버튼이 터치되었는지 여부를 나타냅니다. (모든 게임패드에 이 기능이 있는 것은 아닙니다.)
- value는 아날로그 센서가 있는 버튼에 대한 것입니다. 이것은 버튼에 가해지는 압력의 양을 나타냅니다: 0.0은 전혀 눌리지 않음을 의미하고, 1.0은 완전히 눌린 것을 의미합니다.

버튼은 아래 다이어그램에서 정의된 중요도 순서대로 배열에 정렬되어 있어서 쉽게 매핑할 수 있습니다:

![다이어그램](/assets/img/2024-05-01-PlayingwiththeGamePadAPI_2.png)

<div class="content-ad"></div>

하지만 모든 게임패드가 동일한 버튼/축 패턴을 따르지는 않아요. 그래서 버튼 매핑에 대해 알고 있어야 하는 것이 중요해요.

## 매핑

매핑은 브라우저가 컨트롤러를 올바르게 식별하고 매핑할 수 있는지를 나타내는 Gamepad 인터페이스의 속성이에요. 이 경우 매핑의 값은 "standard"가 될 거예요.

제가 시험하고 작업한 대부분의 오리지널 컨트롤러들은 표준 매핑을 가졌어요. 내가 시도한 대부분의 짝퉁들은 표준 매핑을 갖지 않았어요. 이러한 경우에는 개발자가 눌린 버튼이 사용자의 기대와 일치하는지 확인해야 해요.

<div class="content-ad"></div>

하지만 뭔가가 빠져 있는 것 같았어요. 버튼 중 하나를 눌렀을 때 트리거되는 이벤트를 볼 수 없었어요. 문서에도(오직 두 개의 이벤트만 나열되어 있는)나, 게임패드 객체에도 없었어요. 이제 튜토리얼과 문서를 계속 읽어봐야 할 시간이에요.

# 이벤트 청취 vs 이벤트 쿼링

이것은 제가 조금 더 이해하는 데 시간이 좀 걸렸던 부분 중 하나에요. 이미 Gamepad API 정의에서 두 가지 이벤트만 있는 걸 봤죠(gamepadconnected 및 gamepaddisconnected). 그리고 버튼에 이와 관련된 이벤트가 없어요... 그렇다면, 이벤트는 어떻게 작동할까요?

간단하게 말하면, 작동하지 않아요... 왜냐하면 이벤트가 없기 때문이죠. 다른 API 및 요소들과 달리 연결하고 청취할 수 있는 이벤트가 없기 때문에 Gamepad API는 다르게 작동해요. 청취할 이벤트가 없는 상황에서 개발자는 계속해서 게임패드를 쿼링하여 어떤 변경 사항이 일어났는지 확인해야 해요.

<div class="content-ad"></div>

위 기능을 구현하기 위해서는 Navigator 인터페이스의 확장인 getGamepads 메서드가 있습니다. getGamepads는 연결된 게임패드와 그 상태의 스냅숏을 포함한 배열을 반환할 것입니다:

```js
const gamepads = navigator.getGamepads();
```

나중에 일부 오래된 웹킷 브라우저를 지원하기 위해 오래된 초기화에 대한 대체 방법을 추가했습니다. getGamepads() 메서드가 지원되지 않거나 게임패드가 연결이 해제되었을 경우에는 빈 배열을 반환하여 오류를 방지하는 것이 좋습니다:

```js
let gamepads = [];
if (navigator.getGamepads) gamepads = navigator.getGamepads();
else if (navigator.webkitGetGamepads) gamepads = navigator.webkitGetGamepads();
```

<div class="content-ad"></div>

연결된 게임패드의 상태를 읽을 수는 있었지만, 함수를 호출할 때의 상태 스냅샷이었다. 계속해서 게임패드의 상태를 쿼리해야했습니다! setTimeout이나 setInterval과 같은 것을 사용하는 대신, 화면을 다시 그릴 때마다 함수가 실행되도록 requestAnimationFrame 내에서 함수를 호출해야 했습니다...

...다음과 같은 방식으로:

```js
function checkStatus() {
  // 게임패드의 상태를 읽기
  const gamepads = navigator.getGamepads();

  // 게임패드 작동: 버튼 값 읽기, 동작 수행 등
  // 예: 첫 번째 게임패드의 Start 버튼이 눌렸을 때 메시지 로깅
  if (gamepads[0].buttons[9].pressed) {
    console.log("Start 버튼이 눌렸습니다");
  }

  // 각 애니메이션 프레임마다 함수를 다시 실행
  if (gamepads.length > 0) {
    window.requestAnimationFrame(checkStatus);
  }
}
```

이 함수는 gamepadconnected 이벤트 핸들러에서 호출되어 브라우저에 게임패드가 연결될 때만 쿼리를 시작합니다. 또한, 연결된 게임패드가 없을 경우 중지 조건을 추가하는 것이 중요합니다. 그렇지 않으면 지속적이고 불필요한 쿼리를 수행하여 앱의 효율성이 떨어질 수 있습니다.

<div class="content-ad"></div>

# 조이스틱은 버튼이 아니에요

조이스틱이나 축과 같은 방향 버튼을 다룰 때 새로운 발견을 했어요. 버튼처럼 누름/안 누름, 터치/터치하지 않음처럼 동작할 거라고 예상했는데, Gamepad의 축 속성은 -1.0에서 1.0 범위의 짝수 개수를 갖는 배열이에요. 버튼처럼 보이진 않아요, 벌써부터 뿌리쳐 둔 것 같지 않아요.

이 배열을 두 개씩의 그룹으로 나누는 것이 관건이에요. 각 그룹은 게임패드의 조이스틱/축이 될 거예요:

- 첫 번째 값은 조이스틱의 X 축을 나타내요. -1.0은 왼쪽을, 1.0은 오른쪽을 의미해요.
- 두 번째 값은 조이스틱의 Y 축을 나타내요. -1.0은 위/앞으로, 1.0은 아래/뒤쪽을 의미해요.

<div class="content-ad"></div>

![게임패드 API로 놀아보기](/assets/img/2024-05-01-PlayingwiththeGamePadAPI_3.png)

코드로 번역하면 다음과 같을 것입니다:

```js
// 게임패드의 상태를 읽기
const gamepads = navigator.getGamepads();

// 예시: 첫 번째 게임패드의 방향 조이스틱이 눌렸을 때 로그 메시지 출력
// 가로 이동
if (gamepads[0].axes[0] == 1.0) {
  console.log("오른쪽으로 이동");
} else if (gamepads[0].axes[0] == -1.0) {
  console.log("왼쪽으로 이동");
}

// 세로 이동
if (gamepads[0].axes[1] == 1.0) {
  console.log("아래로 이동");
} else if (gamepads[0].axes[1] == -1.0) {
  console.log("위로 이동");
}
```

## 민감도 임계값

<div class="content-ad"></div>

개발 중인 조이스틱/축을 위해 하는 좋은 일 중 하나는 다양한 감도 임계값을 허용하는 것입니다. 모든 조이스틱이 동등하게 만들어지지는 않으며 모두가 조이스틱의 동작 방식에 대해 동일한 선호도나 필요를 가지고 있는 것이 아닙니다.

축에 대한 값은 -1.0에서 1.0 사이의 double 값이지만, 이는 0.0이 쉬는 상태가 되고 1.0/-1.0이 활성 상태가 되는 것을 의미하는 것은 아닙니다. 제가 시험한 게임패드 중 어느 것도 휴식 상태가 0인 적은 없었습니다. (대부분의 경우 0.0003과 같이 무시할 수 있는 값이 있습니다.) 그래서 왜 1.0/-1.0이 방향 동작을 트리거하는 임계값이어야 하는 건가요?

접근성과 사용 편의성을 고려하여 사용자가 방향 이벤트가 트리거되는 임계값을 변경할 수 있도록 고려해보세요. 위의 예시에서 수정된 코드 스니펫:

```js
const threshold = 0.5;

// 수직 이동 (전체 이동이 아닌 "절반"에서 작동)
if (gamepads[0].axes[1] >= threshold) {
  console.log("아래로 이동");
} else if (gamepads[0].axes[1] == -threshold) {
  console.log("위로 이동");
}
```

<div class="content-ad"></div>

# 진동

게임패드 API에는 사용 가능할 때 컨트롤러 진동을 허용하는 확장 기능이 있습니다. API 자체가 실험적인 경우, 이 확장 기능은 제곱형 실험적으로 간주될 수 있습니다.

게임패드가 연결될 때 콘솔 메시지를 확인했다면, Gamepad 인터페이스의 일부로 설명되지 않은 속성인 vibrationActuator를 발견할 수 있습니다. 이 속성은 게임 컨트롤러를 진동시킬 수 있게 해주는 playEffect() 메서드를 갖고 있습니다.

다만, 큰 문제가 있습니다: 이것은 진동을 제어하기 위한 표준 확장이 아니라 크롬에서 사용 가능한 확장입니다. 표준 방법은 hapticActuators를 사용하는 것이며, 이는 주목할 만한 다른 브라우저, 특히 파이어폭스에서 사용할 수 있습니다.

<div class="content-ad"></div>

이 예제에서는 표준 hapticActuators에만 초점을 맞추겠습니다.

hapticActuators는 현재 하나의 값만 허용합니다("진동") 그리고 진폭과 지속 시간을 지정하여 진동을 트리거할 수 있는 pulse 메서드가 포함되어 있습니다:

```js
// 첫 번째 게임패드를 읽기
const gamepads = navigator.getGamepads();
const myGamepad = gamepads[0];

// 1.5초 동안 최대 진폭 진동 트리거
myGamepad.hapticActuator[0].pulse(1.0, 1500);
```

hapticActuators에 대한 한 가지 까다로운 점은 표준에서 정의된대로 GamepadHapticActuators 배열이 아니라 해당 유형의 단일 객체였다는 것입니다. 구현은 여전히 브라우저에 매우 의존적입니다. 개발자 주의해야 합니다.

<div class="content-ad"></div>

# 라이브러리 개발

Gamepad API는 비교적 쉽지만 귀찮은 것을 알아차렸을 것입니다. 모든 작업에는 여러 단계가 필요합니다. 더 탐구하고 더 즐기고 싶다면 경험을 단순화해야 합니다.

이러한 메소드와 이벤트에 대한 상위 수준의 인터페이스를 제공하는 작은 모듈을 만드는 것이 합리적이었습니다. 모든 작업을 단순화하고 더 표준적인 호출을 가능하게 하는 것이었습니다.

예를 들어, 시작 버튼이 눌렸는지 확인하려면 Gamepad API를 사용해야 했습니다.

<div class="content-ad"></div>

- requestAnimationFrame으로 간격 설정하기
- 각 애니메이션 프레임에서 getGamepad() 호출하기
- 확인하려는 게임패드 식별하기 (이전에 저장된 ID로)
- 버튼 배열 읽기
- 원하는 특정 버튼에 액세스하기 (Start 버튼은 버튼 9)
- 눌린 속성의 값 읽기
- 원하는 작업 수행하기

위 과정마다 몇 줄의 코드가 필요합니다. 이러한 복잡성을 라이브러리/모듈로 이동시키면 jQuery스러운 간단한 모양으로 유사한 작업을 수행할 수 있습니다.

```js
myGamepad.on("start", function() {
  console.log("Start 버튼이 눌렸습니다");
});
```

필요한 모든 코드는 여전히 있지만, 내부적으로는 Gamepad API의 사용을 용이하게 해주며, 다른 이벤트가 쿼리하는 대신 이벤트를 듣는 다른 API처럼 보이게 만듭니다.

<div class="content-ad"></div>

# 게임 개발

라이브러리는 프로세스를 간단화했습니다. 이제 게임패드 기능을 위해 JavaScript에서 더 사용하기 쉬운 인터페이스를 사용하면서 웹 애플리케이션의 다른 부분에 더 집중할 수 있었어요.

개발하기 쉬운 게임 중 하나는 클래식한 Pong이었어요. 컨트롤러와의 상호작용은 간단합니다: 위 또는 아래로 움직입니다. 패들과 공의 충돌을 감지하는 주요 어려움을 다루면서 공의 움직임을 계산하기만 하면 되었어요.

여기에 코드와 데모가 있습니다 (게임패드를 연결하여 플레이하세요):

<div class="content-ad"></div>

컴퓨터에 게임패드가 연결되어 있지 않으면 해당 Codepen이 작동하지 않을 수 있어요. 하지만 키보드 기능도 몇 가지 추가했어요.

# 다음은 무엇인가요?

이 기사에서는 현재 게임패드 API의 대부분 기능을 다뤘어요:

- 게임 컨트롤러 연결을 감지하는 방법
- 버튼과 조이스틱의 차이
- 이벤트 읽는 방법
- 게임패드로 진동 사용하기

<div class="content-ad"></div>

하지만 몇 가지 빠뜨린 것이 있어요: 게임패드 포즈 인터페이스입니다. 이 인터페이스를 통해 게임패드에서 위치, 방향, 속도 및 가속도 (사용 가능한 경우)와 같은 정보를 얻을 수 있습니다. 이는 증강 현실 및 가상 현실 장치에 적합합니다. 불행하게도 이것은 잘 지원되지 않습니다.

또한 API에 새로운 변경 사항이 있을 것입니다. 결국, 이것은 실험적 기술이며 지속적으로 업데이트됩니다. gamepadchange, gamepadaxischange와 같이 새로운 이벤트가 추가될 수 있습니다. 이는 API를 간단하게 만들 수 있고... 그리고 제 라이브러리를 쓸모 없게 만들 수도 있군요.

# 추가 정보: 게임패드 API 전문가 되기!

게임패드 API와 작동하는 다양한 유형의 컨트롤러를 테스트한 후에 한 가지 생각이 들었어요: 만약 내 옛날 PS3 컨트롤러가 작동한다면, 옛날 Rock Band 드럼과 기타는 어떨까요? Dance Dance Revolution 매트는 어떻게 될까요?

<div class="content-ad"></div>

긴 이야기를 짧게 말하자면, 이것이 결과입니다:

그리고 여기에서는 우리만의 버전으로 'Web DDR'을 플레이하고 있습니다:

이 다른 기사에서 JavaScript와 HTML을 사용하여 자신만의 Rock Band 비디오 게임 버전을 만드는 방법에 대한 튜토리얼을 만들었습니다: