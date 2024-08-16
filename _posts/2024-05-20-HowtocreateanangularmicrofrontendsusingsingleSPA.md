---
title: "Angular를 사용하여 단일 SPA로 마이크로 프론트엔드를 만드는 방법"
description: ""
coverImage: "/assets/img/2024-05-20-HowtocreateanangularmicrofrontendsusingsingleSPA_0.png"
date: 2024-05-20 22:23
ogImage: 
  url: /assets/img/2024-05-20-HowtocreateanangularmicrofrontendsusingsingleSPA_0.png
tag: Tech
originalTitle: "How to create an angular micro frontends using single SPA?"
link: "https://medium.com/@ShubhamRout_00/microfrontend-application-using-angular-17-standalone-0e24f50ae062"
isUpdated: true
---




ANGULAR 17을 사용한 마이크로프론트엔드 애플리케이션 (독립형).

Single SPA는 마이크로프론트엔드(MF) 애플리케이션을 만드는 데 도움이 되는 JavaScript 라이브러리입니다. (node.js v18. 13 또는 그 이상)

# Single SPA를 사용하여 Angular 마이크로프론트엔드를 생성하는 방법은?

시작하기 전에 single SPA CLI를 글로벌로 설치해야 합니다. —

<div class="content-ad"></div>

```js
npm i -g create-single-spa
```

설치가 완료되면 첫 번째 마이크로 프론트엔드를 만들 준비가 된 것입니다. JavaScript 라이브러리 중에 사용할 수 있는 MFs 를 만들 수 있습니다. 그러나 여기서는 Angular MFs 를 만들 것입니다. 터미널에서 다음 명령어를 입력하세요.

```js
create-single-spa
```

싱글 스파 프로젝트를 생성하기 위해 아래 데이터를 요청합니다.

<div class="content-ad"></div>

새 프로젝트의 디렉토리 (.): testProject

생성할 유형 선택: 프로젝트를 처음 생성하기 때문에 목록에서 single-spa 루트 구성 옵션을 선택해야 합니다.

어떤 패키지 매니저를 사용하시겠습니까?: Angular 프로젝트를 생성하고 npm 패키지를 사용하므로 매니저로 npm을 선택해야 합니다.

이 프로젝트에서 TypeScript를 사용합니까? (y/N): 당연히 yes

<div class="content-ad"></div>

`프로젝트를 시작할 때 single-spa 레이아웃 엔진을 사용하시겠습니까? (Y/n) -` single-spa 레이아웃 엔진을 사용하려면 Y를 선택하세요. 그렇지 않다면 N을 입력하세요.

`조직 이름 (영문자, 숫자, 대시 또는 언더바 사용 가능) -` 조직 이름을 입력해주세요. 아무 이름이나 상관 없습니다. 루트 구성이 생성 중이며 완료되면 루트 디렉토리에서 npm install을 입력하고 npm start를 실행해주세요.

프로젝트 실행 정보는 터미널 화면에 나타납니다. 대부분의 경우 9000 포트에서 실행되므로 브라우저에서 http://localhost:9000/을 열어서 확인해주세요. 화면에 다음과 같은 내용이 표시됩니다.

![이미지](/assets/img/2024-05-20-HowtocreateanangularmicrofrontendsusingsingleSPA_0.png)

<div class="content-ad"></div>

축하합니다! 앱 루트가 잘 작동하고 있어요. 다음 단계는 Angular MFs를 만드는 것입니다.

만들어진 디렉토리로 이동해서 다음 단계를 따르세요. Angular 앱을 만들기 위해서는 루트 구성 생성 시 묻는 몇 군데의 옵션을 변경해야 합니다.

마이크로프론트엔드를 생성하려면 새 터미널을 열고 아래 명령어를 실행하세요.

```js
create-single-spa
```

<div class="content-ad"></div>

아래 제공된 단계를 따라주세요.

```js
? 새 프로젝트를 위한 디렉토리를 지정하세요.
? 단일-SPA 애플리케이션 / 패럴 생성 유형을 선택하세요.
? 어떤 프레임워크를 사용하시겠습니까? angular
? 프로젝트 이름 (문자, 숫자, 대시 또는 밑줄 사용 가능) login
? 어떤 스타일시트 포맷을 사용하시겠습니까? Sass (SCSS)     [https://sass-lang.com/documentation/syntax#scss]
? 서버 측 렌더링 (SSR) 및 정적 사이트 생성(SSG/프리랜더링)을 활성화하시겠습니까? 
아니요
```

성공적으로 실행되면, 뼈대 파일이 생성될 것입니다. 그런 다음

앵귤러의 분석 활성화 여부를 물을 것입니다. (귀하는 요구에 따라 선택하십시오)

<div class="content-ad"></div>

```js
? 이 프로젝트에 대한 익명의 사용 데이터를 구글의 개인정보 보호 정책인 Google의 개인정보 처리방침에 따라 구글 Angular 팀과 공유하시겠습니까? 자세한 내용 및 이 설정을 변경하는 방법은 https://angular.io/analytics를 참조하십시오. 예
```

그런 다음 single-spa-angular가 설치됩니다.

```js
single-spa-angular@9.1.2 패키지가 설치되고 실행됩니다.
계속 진행하시겠습니까? 예
```

그런 다음 라우팅 및 포트를 요청합니다.

<div class="content-ad"></div>


```js
? Does your application use Angular routing? Yes
? What port should your project run on? 4200
```

다음 단계는 기능을 활성화하는 것입니다 —

단계 -1 → 루트 디렉토리 내의 src/index.ejs 파일을 열어 앱이 호스팅된 위치를 import 맵 내에 추가합니다. 현재는 로컬 호스트이지만 앞으로는 배포된 서버 위치가 될 것입니다.

![How to create an angular micro frontend using single SPA](/assets/img/2024-05-20-HowtocreateanangularmicrofrontendsusingsingleSPA_1.png)


<div class="content-ad"></div>

Step-2 → Angular 앱을 실행하려면 index.ejs 파일에서 아래 이미지에 표시된 대로 zone 스크립트를 활성화해야 합니다.

![Zone Script](/assets/img/2024-05-20-HowtocreateanangularmicrofrontendsusingsingleSPA_2.png)

Step -3 → microfrontend-layout.html 파일을 열고 다음 사항을 변경하세요 -

route 태그 내부에 새로 생성한 MF의 경로를 라우트 경로로 추가하세요 —

<div class="content-ad"></div>

![image](/assets/img/2024-05-20-HowtocreateanangularmicrofrontendsusingsingleSPA_3.png)

Step -4 → login 폴더 내 angular.json 파일에서 다음 변경 사항을 수행합니다.

![image](/assets/img/2024-05-20-HowtocreateanangularmicrofrontendsusingsingleSPA_4.png)

Step -5 → login/src/main.single-spa.ts로 이동하여 라이프사이클이 AppModule와 구성되어 있는 것을 볼 수 있지만, Angular 17에서는 더 이상 AppModule을 사용하지 않습니다.

<div class="content-ad"></div>

![image](/assets/img/2024-05-20-HowtocreateanangularmicrofrontendsusingsingleSPA_5.png)

그래서 아래 필요한 변경사항을 처리해야 합니다.

- 일단 환경 파일을 제거하고 프로덕션을 활성화하는 조건을 제거합니다. (만약 프로덕션, 개발 및 스테이징을 위해 환경이 필요하다면, login/src/environment에 환경 파일을 생성하고 환경 설정을 해 주세요.)
- AppModule 대신에 AppComponent와 몇 가지 프로바이더 구성을 사용할 것입니다.

![image](/assets/img/2024-05-20-HowtocreateanangularmicrofrontendsusingsingleSPA_6.png)

<div class="content-ad"></div>

최종 단계 -

이제 새로 생성된 앱 터미널에 다음 명령어를 입력해 주세요 —

```js
npm run serve:single-spa:login
```

만약 오류가 발생한다면 npm i를 입력한 뒤 위 명령어를 실행해 주세요.

<div class="content-ad"></div>

지금 브라우저를 열고 microfrontend-layout.html 파일에서 언급된 URL 경로를 변경해주세요. (저희 경우에는 루트 파일의 경우 http://localhost:9000 및 로그인 페이지의 경우 http://localhost:9000/login을 엽니다).

![이미지](/assets/img/2024-05-20-HowtocreateanangularmicrofrontendsusingsingleSPA_7.png)

다시 한번 축하드립니다. Angular 17에서 MF를 성공적으로 생성하였으며 스탠드얼론 애플리케이션에서도 작동 중입니다.