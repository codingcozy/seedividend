---
title: "세션 고정이란 무엇인가요 Nodejs에서 방지하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-WhatisSessionFixationandHowtoPreventitinNodejs_0.png"
date: 2024-06-22 05:31
ogImage: 
  url: /assets/img/2024-06-22-WhatisSessionFixationandHowtoPreventitinNodejs_0.png
tag: Tech
originalTitle: "What is Session Fixation and How to Prevent it in Node.js"
link: "https://medium.com/gitconnected/what-is-session-fixation-and-how-to-prevent-it-in-node-js-03580b6acd67"
---


세션 고정(Session Fixation) 공격자는 유효한 사용자 세션을 탈취할 수 있으므로 이 취약점과 그에 대한 보호에 대해 알아야 합니다.

![이미지](/assets/img/2024-06-22-WhatisSessionFixationandHowtoPreventitinNodejs_0.png)

이를 알아가기 전에 세션이란 무엇이고 세션 인증이 어떻게 작동하는지 알아야 합니다. 이미 알고 계시다면 "세션 고정이란 무엇이며 세션 고정을 방지하는 방법" 부분으로 건너뛸 수 있습니다.

# 세션이란 무엇인가요?

<div class="content-ad"></div>

HTTP 요청이 상태를 유지하지 않는다는 것을 알고 계셨을 것입니다. 즉, 로그인 요청을 보내고 유효한 사용자 이름과 비밀번호가 있는 경우, 다음 요청을 보내는 같은 사람임을 알 수 있는 기본 메커니즘이 없습니다. 이 문제를 해결하고 요청을 상태 유지할 수 있도록 하는 방법으로 쿠키, 숨김 폼 필드, URL 매개변수, HTML5 웹 스토리지, JWT 및 세션과 같은 제안된 방법이 있습니다. 이 문서에서는 세션에 초점을 맞추었습니다.

세션은 서버에 저장된 데이터입니다. 각 클라이언트는 서버에 있는 이 데이터와 관련된 고유한 식별자를 받습니다. 클라이언트는 각 요청에 이 고유한 식별자를 보내야 합니다. 이를 통해 누가 이 요청을 보내는지 알 수 있습니다. 이 식별자는 쿠키나 URL 매개변수로 전송될 수 있습니다.

expressjs 애플리케이션에서 세션과 식별자 (세션 ID)를 표시하는 간단한 예제입니다:

```js
const app = require('express')();
const session = require('express-session');
app.use(require('cookie-parser')());
app.use(require('body-parser').json());

app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    name: 'sessionId'
}));

app.get('/', (req, res) => {
    res.send('ping');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

<div class="content-ad"></div>

처음 요청을 보낼 때 express-session 미들웨어는 새로운 고유 식별자를 생성하고 이를 쿠키로 설정한 후 어딘가에 저장합니다(이 경우에는 메모리에 저장되지만 사용자 정의 저장소도 전달할 수 있습니다). 세션 미들웨어의 옵션에서 sessionId를 우리가 이 고유 식별자를 저장하는 키의 이름으로 사용했기 때문에 요청을 보내면 다음과 같은 결과를 볼 수 있습니다:

![이미지](/assets/img/2024-06-22-WhatisSessionFixationandHowtoPreventitinNodejs_1.png)

이제 브라우저는 이 쿠키를 설정하고 나중 요청을 위해 자동으로 저장합니다. 유효한 세션을 포함하는 요청을 보내면(세션은 세션 저장소에 존재함 - 이 경우에는 메모리에) 응답에 Set-Cookie 헤더가 반환되지 않습니다:

![이미지](/assets/img/2024-06-22-WhatisSessionFixationandHowtoPreventitinNodejs_2.png)

<div class="content-ad"></div>

사용자가 로그인하면 사용자 정보를 쿠키에 저장(직렬화)하거나 데이터베이스에 저장하고 데이터를 세션 ID와 연결할 수 있습니다. 우리는 맵을 데이터베이스로 사용해 보겠습니다:

```js
const db = new Map();
app.get('/me', (req, res) => {
    const user = db.get(req.sessionID);
    res.json({ mySessionId: req.sessionID, me: user ? user : 'anonymous' });
});
const users = [{ name: 'bob', age: 19 }, { name: 'joe', age: 20 }];
app.post('/login', (req, res) => {
    const { name } = req.body;
    const user = users.find(u => u.name === name);
    if (user) {
        db.set(req.sessionID, user);
        res.send('ok');
    } else {
        res.send('try again');
    }
});
```

로그인한 다음 쿠키를 사용하여 /me로 다른 요청을 보내면 다음 결과를 얻습니다:

![이미지](/assets/img/2024-06-22-WhatisSessionFixationandHowtoPreventitinNodejs_3.png)

<div class="content-ad"></div>

이것은 세션을 사용해야 하는 이유와 그 방법을 간단히 요약한 것이었습니다.

## 공격자가 유효한 세션 ID를 생성할 수 있나요?

Express-session을 사용하고 있는 경우에는 세션 미들웨어에 secret를 전달했음을 보았습니다. 이 secret는 쿠키 값에 서명을 하는 데 사용됩니다. 이것은 단순히 sessionId를 생성한 것이 우리임을 확신할 수 있도록 합니다. 클라이언트로 서명된 값을 보내고 있다면, 공격자가 세션 ID를 생성하는 것은 불가능합니다.

세션의 샘플:
sessionId=s%3AL6j4T8hBwMk1ulJqGoisZbAxUOkOuQqP.x5UxPQEtKrj3sWrIy6S01CQRjAtp4biVs4H2zgqmSs

<div class="content-ad"></div>

첫 번째 부분: s%3A는 단순히 s:이라는 것을 의미합니다. 이는 우리의 쿠키-세션이 서명되었음을 나타내는 접두사입니다!

두 번째 부분: L6j4T8hBwMk1ulJqGoisZbAxUOkOuQqP 이것은 세션 ID입니다. 데이터를 연관시키기 위해 데이터베이스에서 사용하고 있습니다.

세 번째 부분: 이 부분은 세 번째 부분입니다. x5UxPQEtKrj3sWrIy6S01CQRjAtp4biVs4H2zgqmSs 이것은 서명 부분입니다. 이 텍스트는 우리의 비밀 정보를 사용하여 생성했으므로, 이 쿠키가 우리에 의해 생성되었음을 확신할 수 있습니다.

우리는 이 서명을 간단히 다시 생성하고 이게 유효한지 확인할 수 있습니다:

<div class="content-ad"></div>

```js
const crypto = require('crypto');
const secret = 'secret';
const sessionId = 'L6j4T8hBwMk1ulJqGoisZbAxUOkOuQqP';
const hmac = crypto.createHmac('sha256', secret);
hmac.update(sessionId);
const signature = hmac.digest('base64').replace(/\=+$/, '');
console.log(signature); // x5UxPQEtKrj3sWrIy6S01CQRjAtp4biVs4H2zgqmSs
```

이렇게 express-session이 확인하는 것이에요.

# 세션 고정이란?

세션 고정 공격에서 공격자는 유효한 사용자 세션을 탈취합니다. 쿠키를 서명하여 다른 사용자의 유효한 세션을 탈취할 수 없도록 하는 걸로 말씀드렸죠. 그런데 만약 공격자가 자신의 유효한 세션을 가지고 또 다른 사용자와 연관시키려고 한다면 어떨까요? 이 경우에 공격자는 피해자를 대신하여 작업을 수행할 수 있어요.

<div class="content-ad"></div>

문제는 로그인과 같은 작업에서 새로운 sessionId(고유 식별자)를 생성하지 않는 경우 발생합니다.

## 공격자가 이를 어떻게 할 수 있을까요?

공격자가 컴퓨터에 물리적으로 접근할 수 있는 경우가 있습니다. 예를 들어 공격자로서 대학에 가서 공유 컴퓨터 중 하나를 선택하고 취약한 웹사이트(vulnerablewebsite.com)에 내 계정으로 로그인한 다음 로그아웃을 하지 않고(일반적으로 서버 스토어에서 세션을 제거하는 작업), 취약한 웹사이트(vulnerablewebsite.com)에 로그인 페이지를 열어둔 채로, 그 전에 유효한 sessionId를 복사해야 합니다. 이제 피해자가 이 컴퓨터를 사용하고 있고 피해자가 로그인하면 공격자의 sessionId가 피해자의 계정에 연결됩니다. 복잡해 보일 수 있지만 전혀 그렇지 않습니다, 이를 실제로 확인해 봅시다.

첫 번째 사용자인 Bob(공격자)로 로그인해 봅시다:

<div class="content-ad"></div>


![이미지](/assets/img/2024-06-22-WhatisSessionFixationandHowtoPreventitinNodejs_4.png)

이제 브라우저는이 웹 사이트에 대해 이 쿠키를 설정합니다. 다른 사람이 로그인 요청을 보내려고 시도하면 express-session이 새로운 세션 ID를 생성하지 않고 기존 세션 ID를 덮어쓰는 것을 의미합니다.

Joe(피해자)가 이 공유 컴퓨터를 사용하기로 결정하면, Bob의 쿠키와 유효한 세션이 함께 전송된다:

![이미지](/assets/img/2024-06-22-WhatisSessionFixationandHowtoPreventitinNodejs_5.png)


<div class="content-ad"></div>

우리는 새 세션이나 쿠키를 받지 못했어요!

이런 일이 일어나버렸어요. 이제는 밥의 세션 ID가 조의 사용자와 연관되어 있어요. 그래서, 공격자(밥)가 /me로 요청을 보내면 조의 데이터를 돌려받게 될 거에요:

![이미지](/assets/img/2024-06-22-WhatisSessionFixationandHowtoPreventitinNodejs_6.png)

밥의 세션을 이용해서 조의 데이터를 얻는 데 성공했어요. 이 예시에서 공격자는 물리적 접근이 있었지만, XSS와 같은 다른 취약점이 있는 경우 물리적 접근 없이도 이를 할 수 있어요.

<div class="content-ad"></div>

일부 웹사이트는 요청 시 URL 매개변수로 sessionId를 전달합니다. 이 경우, 공격자가 URL 매개변수에 자신의 sessionId를 포함한 로그인 페이지 링크를 제공하면 악용 가능성이 있습니다.

![이미지](/assets/img/2024-06-22-WhatisSessionFixationandHowtoPreventitinNodejs_7.png)

이 방법의 보안 도전 과제에 대해 더 알고 싶다면, 스택 익스체인지 질문에서 확인하세요.

# 세션 고정 방지 방법

<div class="content-ad"></div>

## 로그인 시 새 세션 생성!

메인 솔루션은 정말 쉬운데, 그렇게 하면 항상 이 세션 덮어쓰기가 발생하지 않는지 확신할 수 있어요!

우리 코드를 다음과 같이 변경해요:

```js
app.post('/login', (req, res) => {
    const { name } = req.body;
    req.session.regenerate(err => {
        if (err) {
            res.send('error');
        } else {
            const user = users.find(u => u.name === name);
            if (user) {
                db.set(req.sessionID, user);
                res.send('ok');
            } else {
                res.send('try again');
            }
        }
    });
});
```

<div class="content-ad"></div>

로그인할 때마다 새로운 세션을 할당하기 위해 regenerate 함수를 사용할 수 있습니다. 이제 세션 쿠키를 전달하든 말든 상관없이 새로운 세션 ID를 생성하여 Set-Cookie 헤더를 통해 클라이언트에게 전송합니다.

![이미지](/assets/img/2024-06-22-WhatisSessionFixationandHowtoPreventitinNodejs_8.png)

## 오직 HTTP Only 쿠키를 사용하세요

HTTP Only를 사용하면 서버만 Set-Cookie 헤더를 통해 쿠키를 설정할 수 있고 클라이언트 측 (브라우저 JavaScript)는 변경할 수 없습니다. 따라서 앱에 XSS 취약점이 있는 경우에도 공격자는 세션 ID (쿠키)를 변경할 수 없습니다.

<div class="content-ad"></div>

## XSS 공격으로부터 보호하기

세션 고정을 XSS 공격과 결합하여 더 효과적으로 사용할 수 있으므로 세션 고정에 대해 걱정한다면 XSS 공격에도 심각하게 대응하는 것이 좋습니다.

## 합리적인 세션 만료 시간

세션 만료 시간은 애플리케이션의 특정 요구 사항과 일치해야 합니다. 보안에 더 많은 관심을 가진다면 짧게 설정하는 것이 좋습니다. 반대로, 그렇지 않다면 더 길게 설정할 수 있습니다.

<div class="content-ad"></div>

## 올바른 로그아웃 구현

로그아웃 시 기존 세션을 올바르게 제거하여 관련 데이터와의 연결을 끊어야 합니다. 그렇지 않으면 로그아웃 이후에도 이 세션을 사용할 수 있습니다. (클라이언트 브라우저에서 쿠키를 제거하는 것만으로는 충분하지 않습니다!)

# Passportjs가 세션 결정에 취약했나요?

네, 0.6.0 버전 이전에는 이 문제가 있었습니다. Passport 개발자들은 세션 재생성을 애플리케이션 측에서 수행해야 한다고 생각했지만, 얼마 지나지 않아 이 문제의 중요성을 깨달았고 0.6.0 버전에서 수정되었습니다. 이 수정의 자세한 내용에 관심이 있다면 여기에서 자세한 내용을 읽을 수 있습니다.

<div class="content-ad"></div>

# 결론

세션 고정이 발생할 수 있습니다. 기존 세션 ID를 다른 사용자 데이터로 덮어쓸 경우 발생할 수 있습니다. 이 문제를 해결하는 방법은 매번 누군가 로그인할 때마다 새 세션을 생성하고, HTTP Only 쿠키를 사용하며, 적절한 만료 시간을 설정하고, 올바른 로그아웃을 구현하는 것입니다.

# 참고 자료

[OWASP - 세션 고정](https://owasp.org/www-community/attacks/Session_fixation#)

<div class="content-ad"></div>

https://developer.mozilla.org/ko/docs/Web/Security/Types_of_attacks#session_fixation