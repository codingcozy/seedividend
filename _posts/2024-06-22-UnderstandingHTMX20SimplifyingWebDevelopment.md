---
title: "HTMX 20 이해하기 웹 개발을 단순화하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-UnderstandingHTMX20SimplifyingWebDevelopment_0.png"
date: 2024-06-22 15:34
ogImage:
  url: /assets/img/2024-06-22-UnderstandingHTMX20SimplifyingWebDevelopment_0.png
tag: Tech
originalTitle: "Understanding HTMX 2.0: Simplifying Web Development"
link: "https://medium.com/@jayprakashj/understanding-htmx-2-0-simplifying-web-development-87c56c937ade"
isUpdated: true
---

<img src="/assets/img/2024-06-22-UnderstandingHTMX20SimplifyingWebDevelopment_0.png" />

HTMX 2.0 최근 릴리즈로 인해 복잡한 JavaScript 프레임워크를 쉽게 이해할 수 있는 HTML 속성으로 대체할 수 있는 잠재력에 대한 관심을 끌었습니다. 이 새로운 버전은 웹 개발을 간단하게 만들어 개발자들이 JavaScript에 심취하지 않고도 동적이고 상호작용이 가능한 웹 애플리케이션을 만들 수 있도록 하는 것을 목표로 합니다.

## HTMX란?

HTMX는 개발자들이 AJAX, CSS 전환, 웹소켓 및 서버-보낸 이벤트에 HTML 속성을 통해 직접 액세스 할 수 있도록 하는 라이브러리입니다. 주요 목표는 상호작용을 HTML에서 직접 처리함으로써 JavaScript의 필요성을 줄이고 웹 개발을 더 간단하게 만드는 것입니다.

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

## HTMX 2.0의 주요 기능

- 향상된 HTML 속성: HTMX는 JavaScript를 작성하지 않고도 HTML 속성을 사용하여 클라이언트 측 상호작용(예: HTTP 요청)을 트리거합니다. 이 접근 방식은 코드를 더 쉽게 읽고 유지보수하기 쉽게 만듭니다.
- WebSockets 및 SSE 지원: HTMX 2.0은 WebSockets 및 Server-Sent Events (SSE)를 내장 지원하여 실시간 데이터 업데이트 및 클라이언트와 서버 간 통신을 가능하게 합니다.
- 점진적 향상: HTMX는 점진적 향상의 원칙을 따라 JavaScript가 비활성화되거나 사용자의 브라우저에서 완전히 지원되지 않아도 웹 페이지가 작동하도록 보장합니다.
- 성능 향상: 클라이언트 측 로직의 많은 부분을 서버로 옮기고 필요한 JavaScript의 양을 줄이면 HTMX는 성능을 향상시키고 더 빠른 로드 시간을 제공할 수 있습니다.

## HTMX 작동 방식

HTMX는 요소의 동작을 정의하기 위해 HTML 속성을 이용합니다. 다음은 일반적인 HTMX 속성 몇 가지입니다:

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

- hx-get: 요소를 트리거했을 때 지정된 URL로 GET 요청을 보냄.
- hx-post: 지정된 URL로 POST 요청을 보냄.
- hx-trigger: 클릭, 마우스 오버 또는 제출과 같이 요청을 트리거하는 이벤트를 정의함.
- hx-swap: 응답이 DOM에 삽입되는 방식을 결정함. innerHTML, outerHTML, beforebegin, afterbegin, beforeend, afterend과 같은 옵션이 있음.

예시

HTMX를 활용한 간단한 예시입니다:

```js
<!DOCTYPE html>
<html>
<head>
    <title>HTMX 예시</title>
    <script src="https://unpkg.com/htmx.org"></script>
</head>
<body>
    <button hx-get="/hello" hx-trigger="click" hx-swap="innerHTML">
        Click me
    </button>
    <div id="content"></div>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            htmx.on('htmx:beforeRequest', function(evt) {
                console.log('요청을 보내기 전:', evt.detail);
            });
        });
    </script>
</body>
</html>
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

이 예에서는 버튼을 클릭하면 /hello로 AJAX GET 요청이 전송됩니다. 서버에서의 응답이 버튼의 내부 HTML을 대체합니다. 이 설정을 통해, AJAX 호출 및 DOM 조작을 처리하기 위한 추가 JavaScript 작성이 필요하지 않습니다.

## HTMX 사용의 장점

- 복잡성 감소: 상호 작용 로직을 HTML로 이동함으로써, HTMX는 JavaScript 중심의 프레임워크와 관련된 복잡성을 줄입니다.
- 유지보수 용이성: 코드는 HTML에서 요소의 동작이 명확하게 정의되므로 유지보수 및 가독성이 향상됩니다.
- 성능 향상: 더 많은 작업을 서버로 옮기고 클라이언트 측 JavaScript를 줄이면 성능이 향상되고 로드 시간이 줄어듭니다.
- 사용자 경험 향상: WebSockets 및 SSE를 통한 실시간 업데이트는 웹 애플리케이션의 응답성과 상호 작용성을 개선합니다.

## Laravel과의 통합

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

HTMX를 Laravel 애플리케이션에 신속하게 통합하여 동적 동작을 개선할 수 있습니다. 상당한 복잡성을 추가하지 않고 사용할 수 있어요. 아래는 Laravel 프로젝트에 HTMX를 설정하는 방법에 대한 간략한 개요입니다:

- 설정: Laravel Blade 템플릿에 HTMX 라이브러리를 포함시킵니다.
- 라우트와 컨트롤러: HTMX가 수행하는 AJAX 요청을 처리하기 위한 라우트 및 컨트롤러를 정의하세요.
- Blade 템플릿: Blade 템플릿에서 HTMX 속성을 사용하여 AJAX 요청을 트리거하고 페이지 일부를 동적으로 업데이트하세요.

라라벨 예시

다음은 Laravel에서 HTMX를 사용하는 예시입니다:

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

Blade Template (resources/views/welcome.blade.php)

```js
<!DOCTYPE html>
<html>
<head>
    <title>Laravel with HTMX</title>
    <script src="https://unpkg.com/htmx.org"></script>
</head>
<body>
    <button hx-get="{ route('getData') }" hx-trigger="click" hx-target="#content" hx-swap="innerHTML">
        Get Data
    </button>
    <div id="content"></div>
</body>
</html>
```

Route (routes/web.php)

```js
Route::get('/getData', function () {
    return response()->json(['message' => 'Hello, World!']);
})->name('getData');
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

이 설정은 버튼 클릭이 AJAX 요청을 트리거하여 Laravel 라우트에 전달하고 응답이 추가 JavaScript를 작성하지 않고 div의 내용을 업데이트하는 방법을 보여줍니다.

# 결론

HTMX 2.0은 작업 흐름을 간소화하고 응용 프로그램 성능을 향상시키려는 웹 개발자들에게 흥미로운 개발을 제공합니다. 클라이언트 측 상호 작용을 처리하기 위해 HTML 속성을 활용함으로써, HTMX는 복잡한 JavaScript 프레임워크에 대한 필요성을 줄이고 유지 보수성을 향상시킵니다.

더 많은 독해 및 고급 사용법을 위해서 HTMX 문서를 참조하고 최신 릴리스 및 기능을 확인해 주세요.
