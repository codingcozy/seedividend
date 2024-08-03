---
title: "Nextjs 사이트 성능 측정을 위한 OpenTelemetry"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# Nextjs 사이트 성능 측정을 위한 OpenTelemetry

> 좋은 정보: 이 기능은 실험적이며, 다음과 같이 experimental.instrumentationHook = true;을 제공하여 명시적으로 참여해야 합니다.  
> Next.js 앱의 동작과 성능을 이해하고 최적화하는 데 관측 가능성은 중요합니다.  
> 응용 프로그램이 더 복잡해지면 발생할 수 있는 문제를 식별하고 진단하기가 점점 어려워집니다. 로깅 및 메트릭과 같은 관측 도구를 활용함으로써 개발자는 응용 프로그램의 동작에 대한 통찰력을 얻고 최적화할 수 있는 영역을 식별할 수 있습니다. 관측 가능성을 통해 개발자는 문제가 심각한 문제가 되기 전에 문제에 대처하고 사용자 경험을 향상시킬 수 있습니다. 따라서 Next.js 애플리케이션에서 관측 가능성을 사용하여 성능을 향상시키고 자원을 최적화하며 사용자 경험을 향상시키는 것이 매우 권장됩니다.

<div class="content-ad"></div>

앱을 계측할 때 OpenTelemetry를 사용하는 것을 권장합니다. 이는 코드를 변경하지 않고 관찰성 제공자를 변경할 수 있는 플랫폼에 구애받지 않는 방법입니다. OpenTelemetry 및 작동 방식에 대한 자세한 내용은 공식 OpenTelemetry 문서를 참조하세요.
이 문서에서는 OpenTelemetry Observe Primer에 나오는 Span, Trace 또는 Exporter와 같은 용어를 사용합니다.
Next.js는 기본적으로 OpenTelemetry 계측을 지원하며, 따라서 Next.js 자체가 이미 계측되어 있습니다. OpenTelemetry를 활성화하면 getStaticProps와 같은 코드를 자동으로 도우미 속성이 포함된 span으로 래핑합니다.

## 시작하기

<div class="content-ad"></div>

OpenTelemetry은 확장 가능하지만 올바르게 설정하는 것은 다소 많은 양의 작업이 필요할 수 있습니다. 그래서 우리는 빠르게 시작할 수 있도록 도와주는 @vercel/otel 패키지를 준비했습니다.

### @vercel/otel 사용하기

시작하려면, 반드시 @vercel/otel을 설치해야 합니다:

```js
npm install @vercel/otel
```

<div class="content-ad"></div>

다음으로, 프로젝트의 루트 디렉토리에 사용자 정의 instrumentation.ts (또는 .js) 파일을 만들어 주세요 (src 폴더를 사용 중이라면 src 폴더 안에 저장해도 됩니다):

```typescript
import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel({ serviceName: "next-app" });
}
```

추가 구성 옵션에 대한 @vercel/otel 문서를 확인하세요.

> 알아두면 좋은 사항
> Instrumentation 파일은 프로젝트의 루트에 있어야 하며 앱이나 페이지 디렉토리 안에 위치하지 않아야 합니다. src 폴더를 사용하는 경우 파일을 페이지와 앱과 동일한 위치인 src 내에 저장해 주세요.
> suffix를 추가하기 위해 pageExtensions 구성 옵션을 사용하는 경우, instrumentation 파일 이름도 일치하도록 업데이트해야 합니다.
> with-opentelemetry 예제를 만들어 두었으니 참고해 주세요.

<div class="content-ad"></div>

### 수동 OpenTelemetry 구성

@vercel/otel 패키지는 많은 구성 옵션을 제공하며 일반적인 사용 사례를 대부분 해결해야 합니다. 그러나 여러분의 요구에 맞지 않는 경우 OpenTelemetry를 수동으로 구성할 수 있습니다.
먼저 OpenTelemetry 패키지를 설치해야 합니다:

```js
npm install @opentelemetry/sdk-node @opentelemetry/resources @opentelemetry/semantic-conventions @opentelemetry/sdk-trace-node @opentelemetry/exporter-trace-otlp-http
```

<div class="content-ad"></div>

이제 instrumentation.ts에서 NodeSDK를 초기화할 수 있습니다. @vercel/otel과 달리 NodeSDK는 엣지 런타임과 호환되지 않으므로 process.env.NEXT_RUNTIME === `nodejs` 일 때에만 가져오도록 해야 합니다. Node를 사용할 때에만 조건부로 import하는 instrumentation.node.ts 파일을 만드는 것을 권장합니다:

```typescript
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./instrumentation.node.ts");
  }
}
```

```typescript
import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource } from "@opentelemetry/resources";
import { SEMRESATTRS_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-node";

const sdk = new NodeSDK({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: "next-app",
  }),
  spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter()),
});
sdk.start();
```

이렇게하면 @vercel/otel을 사용하는 것과 동등한 효과를 얻을 수 있지만, @vercel/otel에서 노출되지 않는 일부 기능을 수정하고 확장할 수 있습니다. 엣지 런타임 지원이 필요한 경우 @vercel/otel을 사용해야 합니다.

<div class="content-ad"></div>

## OpenTelemetry 도구 테스트 중

로컬에서 OpenTelemetry 추적을 테스트하려면 호환되는 백엔드가있는 OpenTelemetry 수집기가 필요합니다. 저희 OpenTelemetry 개발 환경을 사용하는 것을 권장합니다.

모든 것이 잘 작동하면 GET /requested/pathname으로 레이블이 지정된 루트 서버 스패닝을 볼 수 있어야합니다.해당 추적에서 다른 모든 스패닝은 해당 스패닝 하위에 중첩됩니다.
기본값으로 전송되는 것보다 Next.js는 더 많은 스패닝을 추적합니다. 더 많은 스패닝을 보려면 NEXT_OTEL_VERBOSE=1을 설정해야합니다.

<div class="content-ad"></div>

## 배포

### OpenTelemetry Collector 사용

OpenTelemetry Collector를 사용하여 배포할 때 @vercel/otel을 사용할 수 있습니다. Vercel 및 자체 호스팅 환경에서 모두 작동합니다.

#### Vercel에 배포하기

<div class="content-ad"></div>

저희는 OpenTelemetry가 Vercel에서 즉시 작동되도록 확인했습니다.
Vercel 문서를 따라
프로젝트를 관찰성 제공 업체에 연결하실 수 있습니다.

#### Self-hosting

다른 플랫폼으로 배포하는 것도 간단합니다. Next.js 앱에서 전송된 텔레미터 데이터를 수신하고 처리하기 위해 자체 OpenTelemetry 수신기를 구동해야 합니다.

<div class="content-ad"></div>

이 작업을 하려면 OpenTelemetry Collector 시작 가이드를 따르세요. 이 가이드는 수집기를 설정하고 Next.js 앱에서 데이터를 수신하도록 구성하는 방법을 안내해줍니다. 수집기를 설정하고 실행한 후, 선택한 플랫폼에 Next.js 앱을 배포할 수 있습니다.

### 사용자 지정 익스포터

OpenTelemetry Collector가 필수적이지는 않습니다. @vercel/otel을 사용하거나 수동으로 OpenTelemetry 구성을 할 수 있는 사용자 지정 OpenTelemetry 익스포터를 사용할 수 있습니다.

<div class="content-ad"></div>

## 사용자 지정 Span

오픈텔레미트 API를 사용하여 사용자 지정 span을 추가할 수 있습니다.

```js
npm install @opentelemetry/api
```

다음 예시는 GitHub 별점을 가져오고 사용자 정의 fetchGithubStars span을 추가하여 가져온 요청의 결과를 추적하는 함수를 보여줍니다:

<div class="content-ad"></div>

```js
import { trace } from "@opentelemetry/api";

export async function fetchGithubStars() {
  return await trace.getTracer("nextjs-example").startActiveSpan("fetchGithubStars", async (span) => {
    try {
      return await getValue();
    } finally {
      span.end();
    }
  });
}
```

register 함수는 새로운 환경에서 코드 실행 전에 실행됩니다. 새로운 spans을 생성할 수 있고, 그들은 내보낸 trace에 정확히 추가되어야 합니다.

## Next.js의 기본 spans

Next.js는 여러분의 애플리케이션 성능에 유용한 통찰을 제공하기 위해 여러 spans에 대한 자동 설정을 수행합니다.

<div class="content-ad"></div>

스팬에 대한 속성은 OpenTelemetry 의 의미 체계를 따릅니다. 또한 다음 네임 스페이스 아래의 몇 가지 사용자 정의 속성을 추가합니다.

- next.span_name - 스팬 이름을 복제합니다.
- next.span_type - 각 스팬 유형에는 고유 식별자가 있습니다.
- next.route - 요청의 라우트 패턴(예: /[param]/user).
- next.rsc (true/false) - 요청이 RSC 요청(예: prefetch와 같은)인지 여부입니다.
- next.page
  이것은 앱 라우터에서 사용되는 내부 값입니다.
  특수 파일로의 경로로 생각할 수 있습니다. (예: page.ts, layout.ts, loading.ts 등)
  next.route와 짝을 이룰 때에만 고유 식별자로 사용될 수 있으며, /layout은 /(groupA)/layout.ts 및 /(groupB)/layout.ts를 모두 식별하는 데 사용될 수 있습니다.
- 이것은 앱 라우터에서 사용되는 내부 값입니다.
- 특수 파일로의 경로로 생각할 수 있습니다. (예: page.ts, layout.ts, loading.ts 등)
- 다음 경로와 함께 짝을 이룰 때에만 고유 식별자로 사용될 수 있습니다. /layout은 /(groupA)/layout.ts 및 /(groupB)/layout.ts를 모두 식별하는 데 사용됩니다.

### [http.method] [next.route]

- next.span_type: BaseServer.handleRequest

<div class="content-ad"></div>

이 span은 Next.js 애플리케이션으로 들어오는 각 요청의 루트 span을 나타냅니다. 요청의 HTTP 메서드, 경로, 대상 및 상태 코드를 추적합니다.
속성:

- 일반적인 HTTP 속성
  http.method
  http.status_code
- http.method
- http.status_code
- 서버 HTTP 속성
  http.route
  http.target
- http.route
- http.target
- next.span_name
- next.span_type
- next.route

### 렌더 라우트 (앱) [next.route]

<div class="content-ad"></div>

- next.span_type: AppRender.getBodyResult.
  이 span은 앱 라우터에서 경로를 렌더링하는 과정을 나타냅니다.
  특성:
- next.span_name
- next.span_type
- next.route

<div class="content-ad"></div>

### fetch [http.method] [http.url]

- next.span_type: AppRender.fetch
  이 span은 코드에서 실행된 fetch 요청을 나타냅니다.
  속성:

<div class="content-ad"></div>

- 일반적인 HTTP 속성
  - http.method
- 클라이언트 HTTP 속성
  - http.url
  - net.peer.name
  - net.peer.port (지정된 경우에만)
  - http.url
  - net.peer.name
  - net.peer.port (지정된 경우에만)
  - next.span_name
  - next.span_type
    이 span은 환경 변수 NEXT_OTEL_FETCH_DISABLED=1을 설정하여 끌 수 있습니다. 사용자 정의 fetch instrumentation 라이브러리를 사용하고 싶을 때 유용합니다.

### api route 실행 중 (앱) [next.route]

- next.span_type: AppRouteRouteHandlers.runHandler.

<div class="content-ad"></div>

이 span은 앱 라우터에서 API 라우트 핸들러의 실행을 나타냅니다.
속성:

- next.span_name
- next.span_type
- next.route

### getServerSideProps [next.route]

<div class="content-ad"></div>

- next.span_type: Render.getServerSideProps.
  이 span은 특정 경로의 getServerSideProps 실행을 나타냅니다.
  속성:
- next.span_name
- next.span_type
- next.route

<div class="content-ad"></div>

### getStaticProps [next.route]

- next.span_type: Render.getStaticProps.
  특정 라우트에 대한 getStaticProps 실행을 나타냅니다.
  속성:

<div class="content-ad"></div>

- next.span_name
- next.span_type
- next.route

### 렌더링 라우트 (페이지) [next.route]

- next.span_type: Render.renderDocument.
  이 span은 특정 경로에 대한 문서를 렌더링하는 과정을 나타냅니다.

<div class="content-ad"></div>

속성:

- next.span_name
- next.span_type
- next.route

### generateMetadata [next.page]

- next.span_type: ResolveMetadata.generateMetadata.

<div class="content-ad"></div>

이 span은 특정 페이지에 대한 메타데이터를 생성하는 과정을 나타냅니다 (단일 경로에는 여러 span이 있을 수 있습니다).
속성:

- next.span_name
- next.span_type
- next.page

### 페이지 구성 요소 해결

<div class="content-ad"></div>

- next.span_type: NextNodeServer.findPageComponents.
  이 span은 특정 페이지의 페이지 구성 요소를 해결하는 과정을 나타냅니다.
  속성:
- next.span_name
- next.span_type
- next.route

<div class="content-ad"></div>

### 세그먼트 모듈 해결

- next.span_type: NextNodeServer.getLayoutOrPageModule.
  이 span은 레이아웃이나 페이지용 코드 모듈을 로드하는 것을 나타냅니다.
  속성:

<div class="content-ad"></div>

- next.span_name
- next.span_type
- next.segment

### 응답 시작

- next.span_type: NextNodeServer.startResponse.
  이 길이가 0인 span은 응답에서 첫 번째 바이트가 전송된 시간을 나타냅니다.

<div class="content-ad"></div>
