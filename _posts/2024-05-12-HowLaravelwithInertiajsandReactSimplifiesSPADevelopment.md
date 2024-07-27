---
title: "라라벨Laravel과 이너시아Inertiajs 그리고 리액트React를 활용하여 SPA 개발을 어떻게 간소화할 수 있는지"
description: ""
coverImage: "/assets/img/2024-05-12-HowLaravelwithInertiajsandReactSimplifiesSPADevelopment_0.png"
date: 2024-05-12 22:29
ogImage: 
  url: /assets/img/2024-05-12-HowLaravelwithInertiajsandReactSimplifiesSPADevelopment_0.png
tag: Tech
originalTitle: "How Laravel with Inertia.js and React Simplifies SPA Development"
link: "https://medium.com/@kamruljpi/how-laravel-with-inertia-js-and-react-simplifies-spa-development-0d5e93f6c5ee"
---


![이미지](/assets/img/2024-05-12-HowLaravelwithInertiajsandReactSimplifiesSPADevelopment_0.png)

과거에는 백엔드로 라라벨을, 프론트엔드로 리액트를 사용하여 Single Page Applications (SPA)를 개발하는 것이 독특한 문제를 제기했습니다. 이분법은 개발자가 Laravel API와 React 프로젝트 두 개의 별도 코드베이스를 유지해야 했기에 개발 프로세스를 복잡하게 만들었습니다. 이러한 분리는 개발 과정을 복잡하게 만들 뿐만 아니라 유지보수, 효율성, 그리고 원활한 통합 측면에서도 중요한 장애물이었습니다.

전통적인 SPA 개발은 주로 React 프론트엔드에서 Laravel 백엔드로 API 호출을 수행해야 했으며 두 곳 사이의 신중한 조율이 필요했습니다. 개발자는 CORS (Cross-Origin Resource Sharing) 문제를 관리하고, API 인증을 처리하며, 효율적인 데이터 직렬화와 역직렬화를 보장해야 했습니다. 게다가 새로운 기능을 구현하거나 업데이트 중일 때, 특히 프론트엔드와 백엔드를 동기화하는 것은 계속된 고민이었습니다.

또 다른 중요한 도전은 양 끝에서 작업하는 개발자들이 학습 곡선과 컨텍스트 전환이었습니다. Laravel 개발자들은 React 생태계를, 그 반대로도 익혀야 했기에 생산성이 감소하고 프로젝트 일정이 증가하게 되었습니다.



Inertia.js의 소개는 이 작업 방식을 혁신적으로 바꿨어요. Laravel과 React 사이에 원활한 다리 역할을 하면서 API 기반 접근법의 복잡성 없이 SPA(단일 페이지 어플리케이션)를 개발할 수 있게 했죠. Inertia.js는 Laravel 컨트롤러에서 직접 데이터를 React 컴포넌트로 보낼 수 있게 해주어, 많은 경우에 API 레이어가 필요하지 않게 되었어요. 이 통합은 개발 프로세스를 간소화시키고 비용을 절감하며, Laravel의 서버 측 렌더링과 React의 동적 사용자 인터페이스의 전체 기능을 일치시키는 일관된 생태계 내에서 개발자가 효과적으로 활용할 수 있게 했어요.

본 블로그에서는 Laravel을 Inertia.js와 React와 통합하여 이러한 도전 과제를 해결하고 SPA 개발을 간소화하는 방법에 대해 탐구해 볼 거에요. 이 강력한 세트를 구현하여 효율적이고 견고하며 유지보수가 쉬운 애플리케이션을 만드는 전체 가이드를 제공하고, 현대 웹 개발에서 큰 발전을 이루는 중요한 한 걸음을 내딛을 거에요.

# 전제조건

시작하기 전에 다음을 확인해주세요:



- Laravel, React 및 JavaScript에 대한 기본적인 이해가 필요합니다.
- 시스템에 Laravel과 Node.js가 설치되어 있어야 합니다.
- 의존성을 관리하기 위해 Composer 및 npm 또는 yarn이 필요합니다.

# 단계 1: Laravel 설정

먼저 새로운 Laravel 프로젝트를 생성하거나 기존 프로젝트로 이동하세요. Composer를 사용하여 새로운 Laravel 프로젝트를 만들 수 있습니다:

```js
composer create-project --prefer-dist laravel/laravel laravel-inertia-react
```



라라벨을 설정한 후에는 .env 파일에서 특히 데이터베이스 설정이 올바르게 구성되었는지 확인하세요.

# 단계 2: Inertia.js 설치

Inertia.js는 패키지가 아닌 프로토콜이기 때문에 별도의 설치가 필요하지 않습니다. 그러나 라라벨을 위한 서버 측 어댑터와 React를 위한 클라이언트 측 어댑터를 설치해야 합니다. 다음 명령어를 실행하세요:

```js
composer require inertiajs/inertia-laravel
npm install @inertiajs/inertia @inertiajs/inertia-react
```



# 단계 3: Inertia.js 구성하기

필요한 패키지를 설치한 후에는 Laravel에서 Inertia.js를 설정하십시오. 다음을 사용하여 Inertia.js 구성 파일을 발행하십시오:

```js
php artisan inertia:middleware
```

이 명령은 Inertia 미들웨어를 만들어주며, 이를 앱/Http/Kernel.php 파일의 $middlewareGroups에 추가해야 합니다.



# 단계 4: React 설정하기

React를 사용하려면 Laravel Mix 또는 Vite를 설정해야 합니다. React를 컴파일하기 위해 webpack.mix.js 파일의 내용을 다음과 같이 바꿉니다:

```js
const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
    .react()
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]);
```

## Vite.js 설정하기



라라벨 믹스 대신 Vite.js를 사용할 수도 있어요. 먼저 Vite를 설치하세요:

```js
npm create vite@latest
```

템플릿으로 react를 선택해주세요. 이렇게 하면 Vite.js로 관리되는 React 환경이 설정됩니다.

생성된 Vite 프로젝트의 내용(node_modules, vite.config.js 및 package.json 제외)을 resources/js로 이동하세요.



그럼 Laravel과 함께 작동하도록 vite.config.js를 업데이트해 보세요:

```js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
});
```

그리고 React와 React DOM을 설치하세요:

```js
npm install react react-dom
```



# 단계 5: 첫 번째 페이지 생성하기

resources/js/Pages에 새 파일을 만들어 첫 번째 React 페이지를 만들어보세요 (이 디렉토리를 생성해야 할 수도 있습니다). 예를 들어, Welcome.js:

```js
import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

export default function Welcome(props) {
    return (
        <div>
            <h1>Welcome to Laravel Inertia React!</h1>
            <InertiaLink href='/about'>About</InertiaLink>
        </div>
    );
}
```

# 단계 6: 라우트 및 컨트롤러 업데이트하기



로컬 Laravel routes(일반적으로 routes/web.php에서)에서 Inertia를 사용하여 React 컴포넌트를 렌더링하실 수 있습니다:

```js
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});
```

# 단계 7: 자산 컴파일

아래 명령어를 실행하여 자산을 컴파일하세요:



```js
npm run dev
```

이제 Inertia.js와 React를 사용하여 Laravel 프로젝트를 성공적으로 설정했습니다. 이 스택은 Laravel의 강력함과 React의 견고함을 함께 활용하려는 개발자들에게 매끄러운 경험을 제공합니다.

이 단계를 따라 Laravel, Inertia.js 및 React의 강점을 활용하여 동적이고 반응형 웹 애플리케이션을 만들 수 있습니다. 즐거운 코딩하세요!