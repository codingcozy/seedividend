---
title: "이메일 보내기가 쉬워졌어요 Reactjs와 Nodemailer를 통합해보세요"
description: ""
coverImage: "/assets/img/2024-05-14-SendingEmailsMadeEasyIntegratingNodemailerwithReactjs_0.png"
date: 2024-05-14 10:43
ogImage: 
  url: /assets/img/2024-05-14-SendingEmailsMadeEasyIntegratingNodemailerwithReactjs_0.png
tag: Tech
originalTitle: "Sending Emails Made Easy Integrating Nodemailer with Reactjs"
link: "https://medium.com/@Scofield_Idehen/sending-emails-made-easy-integrating-nodemailer-with-reactjs-e8d0d04a595e"
isUpdated: true
---




<img src="/assets/img/2024-05-14-SendingEmailsMadeEasyIntegratingNodemailerwithReactjs_0.png" />

이메일 기능은 현재 대부분의 웹 애플리케이션의 중요한 부분입니다. 사용자들은 애플리케이션으로부터 이메일 확인, 알림, 영수증 등을 기대합니다.

React.js는 사용자 인터페이스를 구축하는 인기있는 JavaScript 라이브러리로, 기능이 풍부한 웹 앱을 개발하는 데 자주 사용됩니다. React.js 앱에서 강력한 이메일 기능을 활성화하려면 인기 있는 Node.js 이메일 전송 모듈인 Nodemailer를 신속하게 통합할 수 있습니다.

이 포껠 한이 gu이 Nodemailer를 React.js와 통합하는 것을 안내해 React 구성 요소에서 바로 이메일을 보낼 수 있는 기능을 제공합니다.



Nodemailer에 대한 더 많은 정보를 확인하려면 이 안내서를 참조하세요: JavaScript 프레임워크와 Nodemailer 통합하기.

마지막에는 다음을 이해할 것입니다:

- Nodemailer 구성 및 작업하는 방법
- Nodemailer를 사용하여 React 앱에서 이메일 보내기
- 템플릿, 오류, 테스트 및 모범 사례 처리

그럼 시작해봅시다!



# React.js 소개

2013년에 출시된 React.js(React)는 상호작용이 가능한 사용자 인터페이스를 구축하는 데 가장 인기 있는 JavaScript 라이브러리 중 하나로 등장했습니다. 페이스북과 개발자 커뮤니티에 의해 유지보수되는 React는 컴포넌트 개념을 중심으로 구축되어 있습니다.

컴포넌트는 재사용 가능한 모듈식 UI 조각으로, 복잡한 UI를 구성하는 데 사용할 수 있습니다. React는 선언적 패러다임을 사용하여 일반적인 JavaScript와 비교하여 UI 로직 코딩을 간단하게 만듭니다.

다른 주목할 만한 React 기능으로는 가상 DOM, 우수한 조정 알고리즘 성능, 통합 디버깅 개발 도구, 그리고 Node.js와 같은 프레임워크와의 쉬운 통합이 있습니다.



이러한 기능의 조합으로 인해 React.js가 현재 현대적인 웹 애플리케이션을 만들기 위한 최상의 선택지로 떠오르면서, 넷플릭스, 에어비앤비, 우버이츠와 같은 대형 기업부터 작은 스타트업 앱까지 다양한 앱을 구동하고 있습니다.

# React 애플리케이션 설정

외부 라이브러리인 Nodemailer와 같은 라이브러리를 통합하기 전에 React 프로젝트를 준비해야 합니다. 새로운 React 앱을 만드는 것은 단 한 줄의 명령어로 간단히 할 수 있습니다:

```js
npx create-react-app my-app
```



아래는 모두 빌드 구성 및 폴더 구조가 설정된 my-app이라는 React 프로젝트를 생성합니다:

- Public — 이미지 및 index.html과 같은 정적 자산을 보관합니다
- Src
- JS 컴포넌트를 보관합니다
- Index.js — 진입 파일
- Package.json — 의존성을 나열합니다
- 다양한 구성 파일들

간단히 my-app으로 cd 명령어를 실행하고 npm start를 실행하여 핫 리로딩이 활성화된 개발 서버를 시작할 수 있습니다.

앱이 성장함에 따라 App.js로 컴포넌트를 가져와 index.js를 사용하여 DOM에 렌더링합니다. 이제 앱에 이메일 기능을 추가할 준비가 완료되었습니다!



# Nodemailer 소개 - Node.js 이메일 전송 라이브러리

React 앱에서 이메일을 보내려면 SMTP 및 기타 이메일 프로토콜을 원활하게 처리하는 강력한 라이브러리가 필요합니다.

여기서 Nodemailer가 필요한데요 - Node.js 백엔드 코드에서 이메일을 보내는 데 가장 인기 있는 npm 패키지 중 하나입니다.

Nodemailer의 주요 기능 몇 가지:



- SMTP, sendmail, mailgun 및 기타 전송 방식 지원
- 텍스트, HTML 템플릿 및 첨부 파일을 포함한 이메일 전송
- SMTP 서버를 위한 간편한 인증
- 대량 이메일 발송 지원
- 사용자 정의 스타일 옵션
- 복잡한 이메일 로직 처리

주간 다운로드 수가 1400만건을 넘는 Nodemailer는 Node 기반 백엔드에 전문적인 이메일 기능을 구축하는 도구로 선택되고 있습니다. 그리고 React와 API 호출을 통해 결합하면 프론트 엔드에서 이메일 기능을 활용할 수 있습니다!

# React에서 Nodemailer 이메일 전송 통합

React 앱을 설정하고 Nodemailer 기본 사항을 이해한 후, 두 가지를 결합할 수 있습니다:
아래는 워크플로우 내용입니다:



- 사용자가 React 프런트엔드에서 이메일 양식 작성
- 양식 데이터가 제출되면 Node+Express 백엔드로 전송
- 백엔드에서 Nodemailer 모듈로 API 호출
- Nodemailer가 이메일 발송 프로토콜을 처리
- 사용자에게 성공 또는 실패 알림

아래는이 흐름을 구현하는 자세한 단계입니다:

- React에서 이메일 양식 구성요소 생성

UI 양식은 수신자 주소, 제목, 이메일 본문과 같은 필수 세부 정보를 입력합니다.



```js
// EmailForm.js
```

```js
    import { useState } from 'react'; 
    export default function EmailForm() {
      const [to, setTo] = useState("");  
      const [subject, setSubject] = useState("");
      const [message, setMessage] = useState("");
      const handleSubmit = (e) => {
        // Call API
      };
      return (
        <form onSubmit={handleSubmit}>
          <input 
            type="email"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}  
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}  
          />
          <textarea 
            rows="3"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}  
          ></textarea>
          <button type="submit">Send Email</button>
        </form>
      )
    }
```

- Create Express + Nodemailer Backend

백엔드에는 Express 서버가 필요하며 API 엔드포인트를 노출해야합니다. 필요한 패키지를 설치하세요:



```js
npm install express nodemailer cors
```

엔드포인트 내에서 Nodemailer를 구성하고 이메일을 발송할 수 있습니다:

```js
// server.js
```

```js
    const express = require("express");
    const nodemailer = require("nodemailer");
    const cors = require("cors");
    const app = express();
    app.use(cors());
    app.use(express.json());
    const transporter = nodemailer.createTransport({
      service: "Gmail", 
      auth: {
        user: "mygmail@gmail.com",
        pass: "password"
      }
    });
    app.post("/api/send", (req, res) => {
      const mailOptions = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        html: req.body.message
      };
      transporter.sendMail(mailOptions, (error, info) => {
         if(error){
           return res.status(500).send(error);
         }
         res.status(200).send("이메일이 성공적으로 전송되었습니다");
      });
    });
    const port = 3030;
    app.listen(port, () => console.log(`서버가 포트 ${port}에서 실행 중입니다`));
```



- React Form을 API와 연결하기

axios 또는 fetch를 사용하여 양식을 제출할 때 API를 호출합니다:

```js
// EmailForm.js
```

```js
    import axios from "axios";
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post("/api/send", {
          from: "my@email.com",  
          to,
          subject,
          message
        });
        alert("이메일이 전송되었습니다!");
      } catch(err) {
        alert(err);
      }
    };
```



그것으로 통합이 완료되었습니다! 사용자는 React 프론트엔드와 Nodemailer 백엔드가 제공하는 이메일 알림을 받을 수 있습니다.

# 고급 사용법과 모범 사례

기본적인 내용은 간단하지만, 좀 더 복잡한 사용 사례는 확장성, 오류 처리, 그리고 최적화를 위한 계획이 필요합니다.

React에서 Nodemailer를 사용할 때 몇 가지 모범 사례:



- 이메일 템플릿

올바르게 포맷된 HTML 이메일을 보내는 것이 중요합니다. Nodemailer은 Handlebars, Pug, EJS 등 다양한 템플릿 엔진과 잘 작동하여 응답성이 좋고 매력적인 이메일 본문을 만들 수 있습니다.

이메일에는 동적 매개변수가 포함될 수 있으므로 템플릿 생성 논리를 백엔드에 유지하면서 React 프론트엔드에서 사용자 정의를 허용하세요.

- 대기열 및 대량 발송



대량 이메일을 처리하는 데 큐를 사용하면 직접 발송보다 발신 가능성과 신뢰성이 향상됩니다.

BeeQueue, Bull Queue, 또는 Agenda.js와 같은 솔루션은 배치 처리, 자동 재시도, 콜백 제공 등을 통해 수천 개의 이메일을 보낼 때 오류를 최소화하는 데 도움이 됩니다.

- 캡차 및 스팸 방지

스팸 가입 방지를 위해 이메일 양식 제출을 허용하기 전에 reCAPTCHA와 기타 확인 작업을 통합하세요. 속도 제한을 통해 이메일 엔드포인트 남용을 방지할 수도 있습니다.



- 분석 및 통찰

중요한 측정 항목을 추적하여 이메일 발송, 전송 상태, 웹훅 클릭 또는 콜백과 같은 정보를 얻으세요. 분석 소프트웨어를 통합하여 캠페인 성과를 시각화하세요.

- 테스트 및 디버깅

이메일 흐름을 관리하는 구성 요소를 철저히 테스트하세요.



- 리액트 양식 유효성 검사 로직 단위 테스트
- API 호출을 통한 통합 테스트
- 이메일 발송 프로세스 로드 테스트
- 요청 검사를 통한 문제 해결
## 결론

믿을만한 이메일 기능을 구현하는 데는 작업이 필요하지만 참여도를 높일 수 있습니다. 직관적인 UI를 위해 React를 결합하고 강력한 배송을 위해 Nodemailer를 사용하여 훌륭한 경험을 제공할 수 있습니다.

이 가이드를 활용하여 기본 통합을 시작하고 필요에 맞게 최고의 실천 방법을 발전시키세요.

사용 가능한 많은 가능성이 있습니다. 사용자 정의 스타일링, 고급 인증, A/B 테스트 이메일 및 인기 있는 라이브러리 통합 등이 있습니다. 이메일 기능을 활용하여 React 편안 영역을 넓히는 동안 다음 웹 앱을 업그레이드할 수 있습니다.



만약 이 포스트가 흥미롭다면, Learnhub 블로그에서 이와 같은 흥미로운 포스트를 더 찾아보세요! 우리는 클라우드 컴퓨팅부터 프론트엔드 개발, 사이버 보안, AI 및 블록체인까지 모든 기술에 대해 다룹니다.

# 자료

- NodeMailer 초급 가이드
- NodeMailer로 이메일 보내는 방법
- JavaScript 이메일 프레임워크 4가지
- Node 문서