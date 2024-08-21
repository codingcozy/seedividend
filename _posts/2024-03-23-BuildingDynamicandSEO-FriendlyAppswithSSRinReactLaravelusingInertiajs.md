---
title: "React Laravel을 사용한 SEO 친화적인 SSR 앱 만들기 - Inertiajs 사용법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Building Dynamic and SEO-Friendly Apps with SSR in React  Laravel using Inertiajs"
link: "https://medium.com/@mohammed.poolwala_1888/building-dynamic-and-seo-friendly-apps-with-ssr-in-react-laravel-using-inertia-js-1051b04838df"
isUpdated: true
---

<img src="/assets/img/Building-Dynamic-and-SEO-Friendly-Apps-with-SSR-in-React-+-Laravel-using-Inertia.js_0.png" />

요즘 웹 개발 환경에서 빠르고 상호작용이 가능하며 SEO 친화적인 사용자 경험을 제공하는 것이 매우 중요합니다. 이 글은 React와 Laravel을 사용한 서버 사이드 렌더링(SSR)의 장점을 살펴보고, 이를 간소화하는 Inertia.js를 탐구합니다. 우리는 설치 과정, 주요 기능, 그리고 폼 제출, 라우팅 및 실시간 데이터 업데이트에 대한 실제 예시를 제공할 것입니다. 또한 강력한 SSR 구현을 위한 성능 최적화와 테스트 고려 사항에 대해 논의할 것입니다.

서버 사이드 렌더링의 힘

기존에는 React와 같은 프레임워크로 구축된 싱글 페이지 애플리케이션(SPA)은 브라우저로 JavaScript 코드를 전송하는 것에 의존하였습니다. 그러면 이 코드가 클라이언트 측에서 동적으로 HTML을 생성합니다. 이 접근 방식은 매끄러운 싱글 페이지 경험을 제공하지만 몇 가지 단점이 있을 수 있습니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 초기 로드 성능: 사용자는 클라이언트 측 JavaScript가 초기 콘텐츠를 다운로드하고 렌더링하는 동안 지연이 있는 것으로 인식할 수 있습니다.
- 검색 엔진 최적화 (SEO): 검색 엔진은 종종 동적으로 생성된 콘텐츠를 색인화하는 데 어려움을 겪어 발견성을 방해할 수 있습니다.

SSR은 서버 측에서 초기 HTML을 완전한 콘텐츠로 렌더링하여 이 간극을 좁힙니다. 이 사전 렌더링된 HTML은 브라우저로 전송되어 초기 로드 시간을 크게 개선합니다. 검색 엔진 또한 내용을 쉽게 색인화할 수 있어 SEO 결과를 향상시킵니다.

Inertia.js의 장점

SSR을 수동으로 구현하는 것은 가능하지만 복잡할 수 있습니다. Inertia.js는 Laravel(백엔드)과 React(프론트엔드) 간에 원활한 통신을 구축하는 가벼우면서 효율적인 솔루션으로 등장합니다. Inertia.js를 사용하는 주요 장점은 다음과 같습니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 힘들지 않은 서버 측 렌더링: Inertia.js는 React 컴포넌트로 서버 측에 렌더링된 HTML을 효율적으로 생성하며 SSR 프로세스를 간소화합니다.
- 데이터 공유가 원활: Inertia의 share 메서드를 사용하여 Laravel 컨트롤러와 React 컴포넌트 간에 데이터를 손쉽게 교환할 수 있습니다.
- 자동 수화: Inertia.js는 서버 측에 렌더링된 HTML을 상호 작용 가능한 React 컴포넌트로 자동으로 수화시켜 사용자에게 부드러운 전환을 제공합니다.
- 컴포넌트 발견: Inertia.js는 미리 정의된 루트 디렉토리에서 React 컴포넌트를 자동으로 발견하여 통합을 간소화합니다.
- 라우팅 통합: Inertia.js는 Laravel의 견고한 라우팅 시스템과 원활하게 통합되어 응용 프로그램 내에서 원활한 네비게이션을 가능하게 합니다.

Laravel 및 React에서 Inertia.js 시작하기

다음 단계는 React 및 Laravel 프로젝트에서 Inertia.js를 설치하고 구성하는 포괄적인 안내서를 제공합니다:

1. 라라벨 설정:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- "laravel new your-project-name"을 사용하여 새 Laravel 프로젝트를 만듭니다.
- Composer require inertia/inertia를 사용하여 Inertia.js 패키지를 설치합니다.

2. React 설정:

- 프로젝트의 루트 디렉토리로 이동합니다.
- npx create-react-app react-app을 사용하여 새 React 프로젝트를 초기화합니다.
- 통합을 위해 @inertiajs/inertia-react를 설치합니다: cd react-app && npm install @inertiajs/inertia-react.

3. 구성:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 당신의 Laravel 프로젝트에서 php artisan vendor:publish --provider="Inertia\ServiceProvider" 명령을 실행하여 Inertia.js 구성을 공개합니다.
- config/inertia.php 파일을 편집하여 React 애플리케이션의 루트 디렉토리 및 기타 옵션 (예: 버전 관리)을 구성합니다.
- React App.js 파일에서 @inertiajs/inertia-react에서 InertiaApp을 가져와 응용 프로그램을 래핑합니다. 이는 Inertia 상호 작용의 진입점 역할을 합니다.

예: Inertia.js를 사용한 대화형 양식 생성

Inertia.js의 강력함을 보여주기 위해 양식 제출의 기본적인 예제를 만들어 봅시다:

1. Laravel Controller (ContactFormController):

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 폼 제출을 처리하는 컨트롤러 메소드(예: ContactController)를 생성하세요.
- 제출된 데이터를 유효성 검사하는 로직을 구현하세요.
- 서버 측에서 필요한 작업 수행하세요(예: 데이터베이스에 연락처 정보 저장).
- 성공적으로 처리한 후, Inertia::render(`ContactSuccess`, [/* 데이터 */])를 사용하여 뷰와 관련된 데이터를 공유하세요. 이를 통해 제공된 데이터로 랜더링할 React 컴포넌트를 정의할 수 있습니다.

```js
<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormMail;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;

class ContactFormController extends Controller
{
    public function create()
    {
        return Inertia::render('Contact');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'message' => 'required|string',
        ]);

        // 연락처 정보를 이메일로 보내기 (선택 사항)
        Mail::to('your-email@example.com')->send(new ContactFormMail($request->all()));

        // 성공 메시지 플래시 (선택 사항)
        $request->session()->flash('success', '문의해 주셔서 감사합니다!');

        return Inertia::render('ContactSuccess', [
            'message' => '메시지가 성공적으로 전송되었습니다!',
        ]);
    }
}
```

2. React Form Component (ContactForm.jsx):

- 연락처 폼의 사용자 인터페이스를 처리하는 React 컴포넌트(ContactForm)를 생성하세요.
- React의 useState 훅을 사용하여 상태 관리를 하세요.
- 올바른 데이터 입력을 보장하기 위해 폼 유효성 검사를 구현하세요.
- 폼 제출을 처리하기 위해 Inertia의 usePage 훅을 활용하세요.
- 제출 함수 내에서 usePage.post를 호출하여 서버 측에서 폼 처리를 위한 엔드포인트 URL 및 폼 데이터를 제공하세요.
- usePage.post를 사용하여 성공적인 폼 제출 시, Inertia.js가 Laravel 서버와 통신을 처리합니다.
- Laravel 컨트롤러가 데이터를 처리하고 공유된 데이터로 적절한 React 컴포넌트(ContactSuccess)를 렌더링합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import React, { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { post } = usePage();

  const handleSubmit = (event) => {
    event.preventDefault();

    post("/contact", {
      name,
      email,
      message,
    });

    // Clear form fields (optional)
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">이름:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="email">이메일:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="message">메시지:</label>
        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <button type="submit">제출</button>
    </form>
  );
};

export default ContactForm;
```

3. React Success Component (ContactSuccess.jsx):

- 성공 메시지를 표시하기 위한 React 컴포넌트(ContactSuccess)를 생성합니다.
- Laravel 컨트롤러에서 공유된 데이터에 접근하여 정보를 동적으로 표시합니다(예: "문의 주셔서 감사합니다!").

```js
import React from "react";

const ContactSuccess = ({ message }) => {
  return (
    <div className="container">
      <h1>성공!</h1>
      <p>{message}</p>
    </div>
  );
};

export default ContactSuccess;
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

예시: 이너시어.js를 사용한 라우팅

- 라라벨 라우트:

- Route::get(`/contact`, function () { return Inertia::render(`Contact`); });을 사용하여 routes/web.php에 라라벨 라우트를 정의하세요. 이는 특정 이너시어 페이지 뷰용 React 컴포넌트를 렌더링하도록 하는 Inertia::render 메서드를 정의합니다.

- 리액트 내비게이션:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- React 애플리케이션 내에서 편리한 탐색을 위해 Inertia의 usePage 훅을 활용하세요.
- usePage.visit을 사용하여 원하는 경로 이름을 지정하여 다른 경로로 이동할 수 있습니다 (예: usePage.visit(`/contact`)). 이는 해당 React 컴포넌트를 렌더링하기 위해 Laravel 서버와 통신을 시작합니다.

예: Inertia.js를 활용한 실시간 데이터 업데이트 (선택 사항)

Inertia.js는 초기 렌더링 및 양식 상호작용에서 우수한 성과를 보이지만, 실시간 데이터 업데이트에는 추가적인 고려 사항이 필요합니다. 다음은 선택적인 접근 방식입니다:

1. Laravel WebSockets:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 라라벨은 서버와 클라이언트 간의 실시간 통신을 위해 Pusher(또는 유사한 서비스)를 사용한 내장 WebSocket 지원을 제공합니다.
- 서버 측에서는 라라벨 컨트롤러를 사용하여 Laravel의 브로드캐스팅 기능을 통해 웹소켓을 통해 업데이트를 전파할 수 있습니다.

2. 리액트 웹소켓:

- socket.io-client와 같은 웹소켓 라이브러리를 활용하여 라라벨 서버로부터 이벤트 업데이트를 수신합니다.
- 리액트 컴포넌트 내에서 라이브러리의 API를 사용하여 서버와의 웹소켓 연결을 설정합니다.
- 웹소켓 연결을 통해 업데이트를 수신하면 리액트 컴포넌트 상태를 업데이트하여 최신 데이터를 반영하고 UI를 동적으로 다시 렌더링합니다.

SSR용 성능 최적화

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

SSR을 효율적으로 실행하려면 최적화 전략이 필요합니다:

- 캐싱: 서버 렌더링된 HTML에 대한 캐싱 메커니즘을 구현하세요. Laravel Cache와 같은 프레임워크 또는 서드파티 제공 업체를 활용하여 미리 렌더링된 내용을 저장하고 재사용함으로써 방문할 때의 성능을 크게 향상시킬 수 있습니다.
- 코드 분할: React 애플리케이션을 작은 번들로 분할하여 브라우저가 초기 뷰에 필요한 코드만로드하도록 합니다. react-loadable과 같은 라이브러리를 사용하여 코드 분할을 최적화할 수 있습니다.
- 이미지 최적화: 이미지를 최적화하여(크기 및 형식) 페이로드 크기를 최소화하고 초기 로드 시간을 개선하세요. imagemin이나 온라인 최적화 서비스와 같은 도구를 활용하세요.
- 코드 분석 및 최소화: 잠재적인 병목 현상을 분석하고 JavaScript와 CSS 모두를 최소화(불필요한 문자 제거)하여 페이로드 크기를 줄이세요.

SSR 구현 테스트

강력한 SSR 구현을 위해 철저한 테스트가 필수입니다. 여기 몇 가지 중요 고려 사항이 있습니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 유닛 테스트: Jest 또는 Mocha와 같은 유닛 테스트 라이브러리를 활용하여 React 컴포넌트를 격리시켜 테스트하여 예상대로 작동하는지 확인합니다.
- E2E 테스트: 사용자 상호작용을 시뮬레이션하고 전체 애플리케이션 동작을 확인하기 위해 E2E(End-to-End) 테스트를 수행합니다. Cypress와 같은 프레임워크를 사용하여 자동화된 E2E 테스트를 수행할 수 있습니다.
- 시각적 회귀 테스트: Applitools 또는 Percy.io와 같은 도구를 활용하여 시각적 회귀 테스트를 시행합니다. 이러한 도구는 코드 변경 후 애플리케이션의 스샷을 캡처하고 기준선과 비교함으로써 SSR 구현으로 인한 시각적 회귀가 발생하지 않도록 확인합니다.

결론

Inertia.js를 활용하면 React와 Laravel을 이용하여 서버 사이드 렌더링을 구현하여 동적이고 SEO 친화적인 애플리케이션을 만들 수 있습니다. 이 방식은 사용자 경험을 향상시키고 초기 로드 성능을 개선하며 SEO를 강화합니다. 애플리케이션에 대해 효율적인 최적화와 테스트 권장 사항을 따르면 애플리케이션에 대한 전반적이고 견고한 SSR 구현을 보장할 수 있습니다.

추가 사항:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 고급 Inertia.js 기능: Inertia.js는 파일 업로드, 오류 처리, 그리고 진행 표시 막대와 같은 추가 기능을 제공하여 풍부한 사용자 상호 작용을 가능하게 합니다.
- 서버 측 데이터 가져오기: Inertia.js는 초기 데이터 공유에서 뛰어나지만, 더 복잡한 데이터 요구 사항을 위해 리액트 컴포넌트 내에서 서버 측 데이터 가져오기 기법(예: Laravel의 Eloquent ORM 사용)을 고려할 수 있습니다.
- 고급 라우팅 시나리오: 응용 프로그램 내에서 더 복잡한 탐색 구조를 위해 지연 로딩 및 중첩된 라우트와 같은 기법을 탐색해보세요.
