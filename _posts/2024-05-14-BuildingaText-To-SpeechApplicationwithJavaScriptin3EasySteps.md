---
title: "JavaScript로 간단히 3단계로 텍스트 음성 변환 애플리케이션 만들기"
description: ""
coverImage: "/assets/img/2024-05-14-BuildingaText-To-SpeechApplicationwithJavaScriptin3EasySteps_0.png"
date: 2024-05-14 16:04
ogImage: 
  url: /assets/img/2024-05-14-BuildingaText-To-SpeechApplicationwithJavaScriptin3EasySteps_0.png
tag: Tech
originalTitle: "Building a Text-To-Speech Application with JavaScript in 3 Easy Steps"
link: "https://medium.com/bitsrc/building-a-text-to-speech-application-with-javascript-in-3-easy-steps-fdf6aeddfb68"
isUpdated: true
---




![이미지](/assets/img/2024-05-14-BuildingaText-To-SpeechApplicationwithJavaScriptin3EasySteps_0.png)

## 프론트엔드 개발

# 텍스트를 음성으로 변환하기

![이미지](/assets/img/2024-05-14-BuildingaText-To-SpeechApplicationwithJavaScriptin3EasySteps_1.png)



## 자바스크립트로 텍스트 음성 변환 앱 만드는 간단한 안내서

안녕하세요! 코딩과 기술을 좋아하는 미디엄 친구 여러분!

미디엄에서 텍스트 음성 변환 기능을 시도해 보신 적이 있나요? 정말 멋진 기능이죠, 그렇죠? 버튼을 누르기만 하면 글을 읽는 대신에 들을 수 있어요. 그렇게 하면 내용을 즐기면서 다른 일을 할 수도 있어요.

![이미지](/assets/img/2024-05-14-BuildingaText-To-SpeechApplicationwithJavaScriptin3EasySteps_2.png)



이 기능 덕분에 새로운 기사 아이디어가 떠올랐어요. 그래서 이 기능이 어떻게 작동하는지 보여주고 여러분께 자신만의 기능을 만드는 방법을 가르쳐주기로 결심했어요.

이 기사에서는 JavaScript와 Web Speech API만을 사용하여 어떻게 재미있는 텍스트 음성 변환 앱을 만들 수 있는지 단계별로 보여드릴 거에요. 끝나면 브라우저에서 어떤 텍스트든 음성으로 변환할 수 있게 되며 음성과 속도를 선택할 수도 있을 거예요.

준비됐나요? 시작해볼까요?

# JavaScript로 텍스트 음성 변환 애플리케이션 만들기



<img src="/assets/img/2024-05-14-BuildingaText-To-SpeechApplicationwithJavaScriptin3EasySteps_3.png" />

텍스트 음성 변환 (TTS) 시스템은 일반 언어 텍스트를 음성으로 변환합니다.

이제 JavaScript를 사용하여 간단한 텍스트 음성 변환 애플리케이션을 만들어 보겠습니다. 구체적으로는 Web Speech API의 Speech Synthesis 인터페이스를 사용할 것입니다. 이 인터페이스는 거의 모든 최신 브라우저에서 지원되며 우리의 애플리케이션에 완벽합니다.

시작하기 전에 JavaScript와 HTML의 기본적인 이해와 ES6 기능에 대한 친숙함이 있으면 더 좋을 것입니다.



## 단계 1: HTML 구조 설정

새 HTML 파일을 만들고 index.html로 저장하세요.

먼저 텍스트를 입력하고 음성 기능을 실행할 수 있는 간단한 사용자 인터페이스를 설정해보겠습니다.

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript 텍스트 음성 변환</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
        }

        .container {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <textarea id="text" rows="5" cols="30"></textarea>
        <button id="speak">음성 변환</button>
    </div>

    <script src="app.js"></script>
</body>

</html>
```



HTML 코드에서 사용자 입력을 받을 수 있는 텍스트 영역과 텍스트를 음성으로 변환하는 버튼을 추가했고, 다음 단계에서 생성할 'app.js'라는 JavaScript 파일을 링크했습니다.

![이미지](/assets/img/2024-05-14-BuildingaText-To-SpeechApplicationwithJavaScriptin3EasySteps_4.png)

## 단계 2: JavaScript 구현하기

이제 기능을 추가해봅시다. HTML 파일과 동일한 디렉토리에 새 JavaScript 파일을 만들어 'app.js'로 이름짓어주세요.



스피치 합성 API는 window.speechSynthesis 객체를 통해 노출됩니다. 다음은 기본 구현입니다:

```js
const textarea = document.getElementById('text');
const speakButton = document.getElementById('speak');

speakButton.addEventListener('click', () => {
    let text = textarea.value;
    let utterance = new SpeechSynthesisUtterance(text);

    speechSynthesis.speak(utterance);
});
```

이 스크립트는 다음을 수행합니다:

- DOM에서 textarea와 버튼 엘리먼트를 선택합니다.
- 버튼에 클릭 이벤트 리스너를 추가합니다. 버튼을 클릭하면 이벤트 리스너가:
- 텍스트 영역의 현재 값 가져옵니다.
- 텍스트 영역의 값으로 새로운 SpeechSynthesisUtterance 객체를 생성합니다.
- 이 SpeechSynthesisUtterance를 speechSynthesis.speak 메서드에 전달하여 음성 합성을 시작합니다.



## 단계 3: 음성 및 발화 속도 사용자화

SpeechSynthesisUtterance 객체를 통해 음성, 음조, 발화 속도 등의 속성을 변경할 수 있습니다. 그러나 이를 구현하는 방법을 살펴보겠습니다.

먼저, 음성 선택 및 발화 속도 제어를 위한 새로운 요소를 추가하기 위해 HTML을 수정해주세요:

```js
<!-- ...기존 HTML... -->
<div class="container">
    <textarea id="text" rows="5" cols="30"></textarea>
    <select id="voices"></select>
    <input id="rate" type="range" min="0.5" max="2" value="1" step="0.1" />
    <button id="speak">말하기</button>
</div>
<!-- ...기존 HTML... -->
```



그럼 app.js를 다음과 같이 업데이트하세요:

```js
const textarea = document.getElementById('text');
const speakButton = document.getElementById('speak');
const voicesSelect = document.getElementById('voices');
const rateInput = document.getElementById('rate');

let voices = [];

function populateVoices() {
    voices = speechSynthesis.getVoices();
    voices.forEach((voice, i) => {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = `${voice.name} (${voice.lang})`;
        voicesSelect.appendChild(option);
    });
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);

speakButton.addEventListener('click', () => {
    let text = textarea.value;
    let utterance = new SpeechSynthesisUtterance(text);

    // 선택한 음성 가져오기
    let selectedVoiceIndex = voicesSelect.value;
    utterance.voice = voices[selectedVoiceIndex];

    // 속도 가져오기
    utterance.rate = rateInput.value;

    speechSynthesis.speak(utterance);
});
```

여기서는 모든 사용 가능한 음성으로 select 요소를 채우는 populateVoices 함수를 추가했으며, 'voiceschanged' 이벤트가 트리거될 때 이 함수를 호출합니다. 'voiceschanged' 이벤트는 speechSynthesis.getVoices() 메소드가 반환할 SpeechSynthesisVoice 객체 목록이 변경되었을 때 발생합니다.

음성 합성을 트리거할 때 우리는 선택한 음성과 속도를 DOM에서 가져와서 SpeechSynthesisUtterance 객체에 설정합니다.



![이미지](/assets/img/2024-05-14-BuildingaText-To-SpeechApplicationwithJavaScriptin3EasySteps_5.png)

이제 위의 사진에 나와 있는 대로 작동하는 텍스트 음성 변환 애플리케이션이 준비되었어요: 텍스트 영역에 원하는 텍스트를 입력하고, 음성을 선택하고 말 속도를 조절한 다음 "음성 출력"을 클릭하면 말이 들릴 거예요!

![이미지](https://miro.medium.com/v2/resize:fit:732/1*EImZrlDQ1zrxaKe9FBPPmA.gif)

## 더 알아보기:



# 마무리

![text-to-speech-app](/assets/img/2024-05-14-BuildingaText-To-SpeechApplicationwithJavaScriptin3EasySteps_6.png)

그러면 JavaScript와 Web Speech API를 사용하여 몇 분 안에 만든 간단하고 재미있는 텍스트 음성 변환 앱이 준비됐어요!

이것은 사용자들이 콘텐츠를 독특하고 접근성 있게 소비하는 것과 같이 Medium이 하는 대로 당신의 웹 애플리케이션의 사용자 경험을 향상시키는 멋진 방법이 될 수 있어요.



만약 JavaScript와 웹 개발의 다른 측면을 더 탐구하고 싶다면, 내 다른 기사들을 꼭 확인해보시길 권해드립니다.

텍스트 음성 변환에 대해 이야기할 때, 이제 텍스트 강조 기능을 구현해보는 것이 좋겠네요. "AWS Polly를 활용한 클라우드 기반 텍스트 음성 변환 및 텍스트 강조 생성 애플리케이션 구축"에 해당하는 제 기사를 참고해보세요. 이 기사는 클라우드 기술을 통해 진보된, 확장 가능하고 이용하기 쉬운 텍스트 음성 변환 솔루션을 만드는 방법을 안내합니다. 그리고 AWS Polly는 친근하고 쉬운 도구입니다.

반면에 UI 게임을 업그레이드하고 싶다면, “UI 디자인 마스터하기: 최고의 실천 지침 완전 가이드"를 놓치지 마세요. 이 포괄적인 안내서는 UI 디자인의 힘을 발휘하며, 웹 및 모바일 플랫폼을 위한 직관적이고 사용자 친화적, 매력적인 인터페이스를 만드는 통찰을 제공합니다.

<img src="/assets/img/2024-05-14-BuildingaText-To-SpeechApplicationwithJavaScriptin3EasySteps_7.png" />



# 리고처럼 재사용 가능한 구성 요소로 애플리케이션 만들기

![이미지](/assets/img/2024-05-14-BuildingaText-To-SpeechApplicationwithJavaScriptin3EasySteps_8.png)

Bit의 오픈 소스 도구는 25만 명 이상의 개발자들이 구성 요소로 애플리케이션을 만들 수 있게 도와줍니다.

어떤 UI, 기능 또는 페이지든 재사용 가능한 구성 요소로 변환하고 애플리케이션 간에 공유하세요. 협업이 더 쉬워지고 더 빠르게 개발할 수 있습니다.



→ 더 많은 정보 알아보기

앱을 구성 요소로 분할하여 앱 개발을 더 쉽게 만들고, 원하는 워크플로에 대해 최상의 경험을 누려보세요:

# → 미크로 프론트엔드

# → 디자인 시스템



# → 코드 공유 및 재사용

# → 단일 저장소

# Learn more: