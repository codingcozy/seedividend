---
title: "라라벨에 다크 모드토글 버튼 포함 추가하는 방법"
description: ""
coverImage: "/assets/img/2024-05-15-HowtoadddarkmodeinLaravelwithtogglebutton_0.png"
date: 2024-05-15 15:43
ogImage: 
  url: /assets/img/2024-05-15-HowtoadddarkmodeinLaravelwithtogglebutton_0.png
tag: Tech
originalTitle: "How to add dark mode in Laravel (with toggle button)"
link: "https://medium.com/@marcosklender/dark-mode-in-laravel-breeze-541f79cf1162"
---


첫 번째 미디엄 게시물에 오신 것을 환영합니다! 제가 사랑하는 다크 모드 덕후로서 여러분에게 라라벨 프로젝트에서 라이트 모드와 다크 모드 간 전환을 가능하게 하는 버튼을 소개해 드리겠습니다. 함께 알아보도록 하죠!

![이미지](/assets/img/2024-05-15-HowtoadddarkmodeinLaravelwithtogglebutton_0.png)

# 라라벨 Breeze 설치

먼저 새 프로젝트를 생성해 보세요:



```js
composer create-project laravel/laravel:^10.0 DarkmodeExample
```

이제 디렉토리로 이동하여 Breeze를 설치합니다:

```js
cd DarkmodeExample
composer require laravel/breeze --dev
php artisan breeze:install
```

그런 다음 다음 질문에 답해야합니다:



- 어떤 Breeze 스택을 설치하시겠습니까? Blade with Alpine.
- 다크 모드 지원 여부를 원하시나요? 네 (당연히).
- 선호하는 테스트 프레임워크는 무엇인가요? PHPUnit (현재는 관련 없음).

마이그레이션을 실행하기 전에, .env 파일을 편집하여 데이터베이스를 애플리케이션과 연결하는 것을 잊지 마세요. 이 예제에서는 PostgreSQL을 사용하겠습니다:

```js
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=test_db
DB_USERNAME=marcosklender
DB_PASSWORD=followme
```

작업이 완료되면 아래와 같이 애플리케이션을 실행해 봅시다:



```js
php artisan migrate
npm install
```

```js
php artisan serve
npm run dev
```

모든 것이 제대로 진행되면 프로젝트가 실행될 것입니다. 대시보드 뷰에 접근하려면 우리 자신을 등록해야 합니다.

이제 신뢰할 수 있는 IDE를 사용하여 다음 파일을 편집해 봅시다:




- /tailwind.config.js

```js
...
    plugins: [forms],

    darkMode: 'class' // Just add this line at the bottom.
};
...
```

- /resources/js/app.js

```js
import "./bootstrap";

import Alpine from "alpinejs";

window.Alpine = Alpine;

Alpine.start();

// 다크 모드 토글 버튼
var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
    themeToggleLightIcon.classList.remove("hidden");
} else {
    themeToggleDarkIcon.classList.remove("hidden");
}

var themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", function () {
    themeToggleDarkIcon.classList.toggle("hidden");
    themeToggleLightIcon.classList.toggle("hidden");

    if (localStorage.getItem("color-theme")) {
        if (localStorage.getItem("color-theme") === "light") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("color-theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("color-theme", "light");
        }
    } else {
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("color-theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("color-theme", "dark");
        }
    }
});
```



- /resources/views/layouts/navigation.blade.php

```js
...
<!-- 설정 드롭다운 -->
<div class="hidden sm:flex sm:items-center sm:ms-6">

    <!-- 이 버튼을 여기에 추가하세요 -->
    <button id="theme-toggle" type="button"
        class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
        <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
        <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>
    </button>

    <x-dropdown align="right" width="48">
        <x-slot name="trigger">
...
```

웹 브라우저로 돌아가시면, 전체 앱에 대한 선택을 기억하며 밝은/어두운 모드 사이를 전환할 수 있는 아이콘을 찾을 수 있습니다.

끝까지 오신 것에 감사합니다. 당신과 같은 분들이 저에게 격려를 주어 계속해서 제 경험을 공유하고 싶게 만듭니다. 다음에 또 만나요! 👋🏻



제 LinkedIn을 통해 언제든지 연락 주세요. ✍🏻