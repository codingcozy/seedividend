---
title: "Node.js 애플리케이션을 디버깅하는 방법"
description: ""
coverImage: "/assets/img/2024-05-01-HowtoDebugNodejsApplicationsUsingthedebuggerStatementEasiestWay_0.png"
date: 2024-05-01 17:44
ogImage: 
  url: /assets/img/2024-05-01-HowtoDebugNodejsApplicationsUsingthedebuggerStatementEasiestWay_0.png
tag: Tech
originalTitle: "How to Debug Node.js Applications Using the debugger; Statement — Easiest Way"
link: "https://medium.com/gitconnected/how-to-debug-node-js-applications-using-the-debugger-statement-easiest-way-8902124a162e"
---


<img src="/assets/img/2024-05-01-HowtoDebugNodejsApplicationsUsingthedebuggerStatementEasiestWay_0.png" />

이 튜토리얼에서는 Node.js 애플리케이션 코드를 디버깅하는 가장 쉽고 효율적인 방법을 배웁니다.

그럼 시작해봅시다.

이 튜토리얼의 비디오 버전을 보고 싶나요? 아래 비디오를 확인해보세요:

<div class="content-ad"></div>

# 일반적으로 우리가 Node.js 애플리케이션을 디버깅하는 방법

만약 우리가 어떤 Node.js 애플리케이션을 디버깅하고 싶다면, 보통 디버깅하려는 코드에 console.log 문을 추가하여 어떤 변수의 값을 찾아내려고 합니다.

이 방법은 작동하지만 출력한 값을 보려면 계속 콘솔 로그를 확인해야 합니다.

하지만 콘솔에 출력된 데이터가 중첩 객체를 포함하거나 많은 데이터인 경우 console.log를 사용하는 것은 실용적이지 않습니다.

<div class="content-ad"></div>

더 좋은 방법이 있어요.

# 코드 디버깅을 위해 Debugger 추가하기

대신에 우리는 디버그하고 싶은 코드에 debugger; 문을 추가할 수 있어요.

아래 코드에서 보듯이 Express.js API 라우트를 가지고 사용자를 등록하는 경우를 가정해봅시다:

<div class="content-ad"></div>

```js
// controllers/auth.js

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      return res.status(400).send('이미 등록된 사용자가 해당 이메일로 존재합니다');
    }
    // 추가 코드
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send('새 사용자 등록 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
  }
};

module.exports = { register };

// routes/auth.js
const { register } = require('../controllers/auth');

const Router = express.Router();

Router.post('/api/register', register);
```

그리고 사용자 등록시 문제가 발생하여 register 함수 코드를 디버그하려고 합니다.

이 경우, 다음과 같이 register 함수 코드 내에 debugger; 문을 추가하면됩니다:

```js
const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    debugger;
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      return res.status(400).send('이미 등록된 사용자가 해당 이메일로 존재합니다');
    }
    // 추가 코드
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send('새 사용자 등록 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
  }
};
```

<div class="content-ad"></div>

# 디버깅을 위한 애플리케이션 실행 방법

일반적으로, Node.js 애플리케이션을 실행하려면 다음 명령을 실행합니다:

```js
node index.js
```

하지만 대신에, 다음 명령을 실행할 수 있습니다:

<div class="content-ad"></div>

```js
노드를 검사하려면 index.js를 입력하세요.
```

여기에서는 단순히 inspect 키워드를 추가했습니다.

위 명령을 실행하면 다음과 같이 출력이 표시됩니다:

<img src="/assets/img/2024-05-01-HowtoDebugNodejsApplicationsUsingthedebuggerStatementEasiestWay_1.png" />


<div class="content-ad"></div>

위의 출력에서 디버거가 연결된 것을 확인할 수 있어요, 이제 코드 디버깅을 시작할 수 있어요.

크롬 브라우저를 열고 브라우저 URL에 chrome://inspect를 입력하세요.

아래와 같은 출력이 나타날 거에요:

![이미지](/assets/img/2024-05-01-HowtoDebugNodejsApplicationsUsingthedebuggerStatementEasiestWay_2.png)

<div class="content-ad"></div>

우리가 `node inspect index.js` 명령을 실행하여 inspecting을 시작했으니, 원격 대상 섹션 아래에 새로운 대상 항목이 표시된 것을 볼 수 있어요.

그럼, 표시된 파란색 inspect 링크를 클릭하면 아래 이미지처럼 새로운 브라우저 개발 도구가 열릴 거에요:

![이미지](/assets/img/2024-05-01-HowtoDebugNodejsApplicationsUsingthedebuggerStatementEasiestWay_3.png)

위 이미지의 오른쪽 패널에서 볼 수 있듯이, 디버거 일시 중지 메시지가 표시되고 디버깅 제어가 코드의 첫 줄에 있는 것을 확인할 수 있어요 (하이라이트된 노란색 줄로 확인 가능합니다).

<div class="content-ad"></div>

하지만 코드의 첫 번째 줄부터 디버깅을 시작하려는 것은 원하지 않습니다. 대신, 등록 코드만 디버깅하려고 합니다. 아래 디버거 일시 중지 메시지 위에 표시된 파란 삼각형 아이콘을 클릭해주세요:

![Debug icon](/assets/img/2024-05-01-HowtoDebugNodejsApplicationsUsingthedebuggerStatementEasiestWay_4.png)

지금이 창을 닫지 마세요. 대신에 Postman을 사용하여 응용 프로그램에서 사용자를 등록하거나 API 호출을 해보세요. 그렇게 하면 이전에 추가한 /register route 핸들러 코드가 실행될 것입니다.

![API call](/assets/img/2024-05-01-HowtoDebugNodejsApplicationsUsingthedebuggerStatementEasiestWay_5.png)

<div class="content-ad"></div>

위에서 볼 수 있듯이 새 계정 만들기 버튼을 클릭하면 자동으로 debugger; 문이 추가된 코드로 리디렉션됩니다.

이제 코드를 줄 단위로 디버깅하고 각 변수의 값을 볼 수 있으며 디버깅 중에 문제를 찾아 수정할 수 있습니다.

# 디버깅 중 변수 액세스하기

때로는 디버깅 중에 마우스를 가리키면 실제 값이 표시되는 변수가 너무 길어서 많은 속성을 가진 객체일 수 있습니다. 그래서 간단하게 마우스 오버로는 쉽게 볼 수 없을 수도 있습니다.

<div class="content-ad"></div>

그럼, 디버거가 계속 활성화된 채로 콘솔 탭을 열고 우리가 보고 싶은 변수의 이름을 입력할 수 있어요. 이 과정은 아래 GIF에서 확인할 수 있어요:

![예시 이미지](/assets/img/2024-05-01-HowtoDebugNodejsApplicationsUsingthedebuggerStatementEasiestWay_6.png)

이렇게 우리는 Node.js 어플리케이션 코드를 쉽게 디버깅할 수 있어요.

# 디버깅을 위한 스크립트 작성

<div class="content-ad"></div>

터미널에서 매번 node inspect index.js 명령어를 수동으로 입력하기 싫다면, package.json 파일 안에 아래와 같이 새로운 디버그 스크립트를 생성할 수 있어요:

```js
"scripts": {
    "start": "node index.js",
    "debug": "node inspect index.js",
    "dev": "nodemon index.js"
},
```

그래서 이제 npm run debug 명령어를 실행하여 애플리케이션을 디버그 모드로 시작할 수 있어요.

# 간단한 요약

<div class="content-ad"></div>

Node.js 애플리케이션을 디버깅하려면 다음 단계를 따라야합니다:

- 디버깅하려는 코드 내에 디버거 문을 추가합니다.
- node inspect index.js 또는 node inspect server.js 명령을 실행하여 디버그 모드로 애플리케이션을 시작합니다.
- Chrome 브라우저에서 URL chrome://inspect에 액세스합니다.
- 원격 대상 섹션 아래의 inspect 링크를 클릭합니다.
- index.js 또는 server.js 파일의 첫 줄부터 디버깅을 시작하고 싶지 않다면 파란 삼각형 아이콘을 클릭합니다.
- debugger; 문이 추가된 곳에서 코드를 트리거하는 API 호출 또는 작업을 수행합니다.
- 이렇게하면 코드를 줄 단위로 디버깅하여 문제를 찾을 수 있습니다.

# 읽어 주셔서 감사합니다

이 튜토리얼은 여기까지입니다. 새로운 것을 배우셨기를 바랍니다.

<div class="content-ad"></div>

위 튜토리얼의 비디오 버전을 시청하고 싶으신가요? 이 비디오를 확인해보세요.

만일 자바스크립트, ES6+, 리액트, 그리고 노드.js를 쉽게 이해할 수 있는 내용으로 습득하고 싶다면, 제 유튜브 채널을 확인해보세요. 구독하기를 잊지 마세요.

정기적인 자바스크립트, 리액트, 그리고 노드.js 콘텐츠로 계속해서 최신 소식을 받고 싶다면, 링크드인에서 저를 팔로우하세요.

![이미지](/assets/img/2024-05-01-HowtoDebugNodejsApplicationsUsingthedebuggerStatementEasiestWay_7.png)