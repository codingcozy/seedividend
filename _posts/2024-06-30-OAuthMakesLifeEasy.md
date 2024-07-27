---
title: "OAuth는 삶을 쉽게 만들어 준다 사용 방법, 이점 및 실전 예제"
description: ""
coverImage: "/assets/img/2024-06-30-OAuthMakesLifeEasy_0.png"
date: 2024-06-30 18:28
ogImage: 
  url: /assets/img/2024-06-30-OAuthMakesLifeEasy_0.png
tag: Tech
originalTitle: "OAuth Makes Life Easy"
link: "https://medium.com/@igmarvvvi/oauth-makes-life-easy-bf66d8df81de"
---


저와 같이 기술의 발전으로 게으를 갖고 있는 분이세요? 솔직히 말씀드리자면, 스트레스 받을 건 전혀 가망이 없죠. 보안은 기술에서 매우 중요한 측면이며, 진지하게 고려해야 합니다. 그러나 솔직히 말해요, 우리 중 얼마나 많은 사람들이 안전한 암호를 생성하고 안전하게 보관하는 필요한 단계를 취하는 것을 선호할까요? 이 세대의 기술 사용자들은 그래 할 만큼 게으르죠.

이전에 사람들이 일반적으로 했던 방식은 하나의 강력한 암호를 생성하여 모든 웹 사이트에 사용하는 것이었습니다. 그러나 한 사이트가 침해당한다면, 암호가 노출됩니다. 중요한 사람인 경우, 해커들은 그를 활용하여 소셜 미디어에 로그인할 수 있습니다. 만약 은행 앱에도 같은 암호를 사용하는 무모한 짓을 하려한다면? — "Otilor"(요르바어로 "사라졌거나 망했다"는 뜻)입니다.

그렇다면, 저와 같이 게으른 사람들에게 좋은 대안은 무엇일까요? 그 대답은 OAuth(Open Authorization)입니다.

OAuth(Open Authorization)란 무엇인가요?

<div class="content-ad"></div>

OAuth은 Google, Facebook 또는 GitHub과 같은 신뢰할 수 있는 플랫폼을 사용하여 인증할 수 있도록 합니다. 이러한 대표적인 사이트들은 보안에 수십억을 투자하고 있습니다. 만약 해커가 Google 또는 Facebook을 성공적으로 해킹할 수 있다면, 나의 계정을 해킹해도 된다고 생각할 수도 있겠지만, 그건 농담이에요. 하지만 사실은 이들에게 우리의 보안을 맡길 수 있다는 것이죠. 그래서 내가 해야 할 일은 구글에 로그인하는 것 뿐이에요. 적어도 그건 하나의 비밀번호일 뿐이니까, 이건 안전하게 지킬 수 있어야겠죠.

구글, Facebook 또는 GitHub에 로그인한 후, 다른 웹사이트에게 내 이름, 프로필 사진 및 계정에서 사용 가능한 기타 정보와 같은 몇 가지 사용자 정보에 대한 접근 권한을 부여할 수 있어요. 이렇게 하면 해당 웹사이트가 나의 인증을 수행할 수 있어요.

OAuth 유형

더 나아가기 전에, Open Authorization에는 OAuth 1.0과 OAuth 2.0 두 가지 유형이 있다는 것을 간략히 언급하고 싶어요. 오늘날 가장 일반적으로 사용되는 버전인 OAuth 2.0은 더 간단하고 유연성이 더 높은 기능을 제공합니다.

<div class="content-ad"></div>

테이블 태그를 Markdown 형식으로 변경해주세요.

<div class="content-ad"></div>

2. 필요한 npm 패키지를 설치해주세요:


npm install express passport passport-google-oauth20 express-session


3. index.js 파일을 만들고 Express 애플리케이션을 설정해주세요:

```javascript
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
```

<div class="content-ad"></div>

```javascript
const app = express();

app.use(session({
    secret: 'your_secret_key', // Replace with a secure key
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Configure Passport to use Google OAuth
passport.use(new GoogleStrategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback'
},
function(token, tokenSecret, profile, done) {
    return done(null, profile);
}));
```

<div class="content-ad"></div>

```javascript
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Define routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  });
```

<div class="content-ad"></div>


app.get('/', (req, res) => {
  res.send(`<h1>Home</h1><a href="/auth/google">Login with Google</a>`);
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});

4. Start your Node.js server with “node index.js”. Open your browser and go to http://localhost:3000. Click on "Login with Google" to start the OAuth process.

To get the Google Client ID and Secret, follow these steps:


<div class="content-ad"></div>

- Google Cloud Console로 이동하세요.
- 새 프로젝트를 만들거나 기존 프로젝트를 선택하세요.
- API 및 서비스 `자격 증명` 페이지로 이동하세요.
- `자격 증명 만들기`를 클릭하고 OAuth 클라이언트 ID를 선택하세요.
- 필수 필드를 작성하여 동의 화면을 구성하세요.
- 애플리케이션 유형으로 웹 애플리케이션을 선택하세요.
- http://localhost:3000/auth/google/secrets와 같은 승인된 리디렉션 URI를 추가하세요.
- 생성을 클릭하여 클라이언트 ID 및 시크릿을 가져오세요.

![OAuthMakesLifeEasy](/assets/img/2024-06-30-OAuthMakesLifeEasy_0.png)

만약 기술에 미숙하다면, 위의 기술 용어에 머리 아프지 마세요. 다음에 "Google로 가입"을 보면 안전하니 그냥 사용하세요. 요약하면 이렇습니다. 어쩌다 이런 글을 써야 했네요. HNG 인턴십은 나이지리아와 아프리카의 떠오르는 기술인들에게 흥미로운 기회입니다. HNG 웹사이트를 통해 HNG 인턴십, HNG 채용, 또는 HNG 프리미엄을 확인할 수 있습니다. 안녕히 가세요!