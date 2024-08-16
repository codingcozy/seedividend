---
title: "Nextjs 13 - OpenTelemetry 사용 방법 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "br태그를 Markdown 형식으로 변경해주실 수 있나요"
link: "undefined"
isUpdated: true
---





# 오픈텔레미트

> 알아두면 좋은 점: 이 기능은 실험적이며, 다음과 같이 experimental.instrumentationHook = true;를 제공하여 명시적으로 참여해야 합니다.

옵저버빌리티는 Next.js 앱의 동작과 성능을 이해하고 최적화하는 데 중요합니다.

응용 프로그램이 점점 더 복잡해지면 발생할 수 있는 문제를 식별하고 진단하는 것이 점점 어려워집니다. 로깅 및 메트릭과 같은 옵저버빌리티 도구를 활용하여 개발자는 응용 프로그램의 동작에 대한 통찰을 얻고 최적화할 수 있는 영역을 식별할 수 있습니다. 옵저버빌리티를 통해 개발자는 심각한 문제가 되기 전에 문제에 대처하고 더 나은 사용자 경험을 제공할 수 있습니다. 따라서 Next.js 응용 프로그램에서 옵저버빌리티를 사용하여 성능을 향상시키고 리소스를 최적화하며 사용자 경험을 향상시키는 것이 매우 권장됩니다.

<div class="content-ad"></div>

우리는 당신이 앱을 계측하는 데 OpenTelemetry를 사용하는 것을 권장합니다. 이것은 당신의 코드를 변경하지 않고도 관찰성 제공업체를 변경할 수 있는 플랫폼에 무방한 방식으로 앱을 계측할 수 있게 해줍니다. OpenTelemetry 및 작동 방식에 대한 자세한 내용을 확인하려면 공식 OpenTelemetry 문서를 읽어보세요.

이 문서에서는 Span, Trace 또는 Exporter와 같은 용어를 사용합니다. 이러한 모든 용어는 OpenTelemetry 관측성 기초에서 찾을 수 있습니다.

Next.js는 OpenTelemetry 계측을 기본으로 지원하며, 따라서 이미 Next.js 자체가 계측되어 있습니다. OpenTelemetry를 활성화하면 getStaticProps와 같은 코드를 자동으로 감싸서 유용한 속성이 있는 span에 포함시킬 것입니다.

## 시작하기

<div class="content-ad"></div>

OpenTelemetry은 확장 가능하지만 제대로 설정하려면 상당히 많은 내용을 작성해야 합니다. 그래서 저희는 빠르게 시작할 수 있도록 도와주는 @vercel/otel 패키지를 준비했어요.

### @vercel/otel 사용하기

시작하려면 먼저 @vercel/otel을 설치해야 합니다:

```js
npm install @vercel/otel
```

<div class="content-ad"></div>

다음으로, project의 root 디렉토리에 (또는 사용 중인 경우 src 폴더 안에) `instrumentation.ts` (또는 .js) 파일을 만들어주세요:

```typescript
import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel({ serviceName: "next-app" });
}
```

추가적인 구성 옵션에 대한 정보는 @vercel/otel 문서를 참조해주세요.

> 알아두면 좋은 점

- instrumentation 파일은 프로젝트의 root에 있어야하며, 앱이나 페이지 디렉토리 안에 있으면 안 됩니다. src 폴더를 사용하는 경우에는, 파일을 페이지와 앱과 같이 src 안에 넣어야 합니다.
- pageExtensions 구성 옵션을 사용하여 접미사를 추가한 경우, instrumentation 파일 이름도 일치하도록 업데이트해야 합니다.
- 우리는 사용할 수 있는 기본적인 with-opentelemetry 예제를 만들어 두었습니다.

<div class="content-ad"></div>

### 수동 OpenTelemetry 구성

@vercel/otel 패키지는 많은 구성 옵션을 제공하며 대부분의 일반적인 사용 사례를 해결할 수 있습니다. 하지만 사용자의 요구에 맞지 않는 경우 OpenTelemetry를 수동으로 구성할 수 있습니다.

먼저 OpenTelemetry 패키지를 설치해야 합니다:

```js
npm install @opentelemetry/sdk-node @opentelemetry/resources @opentelemetry/semantic-conventions @opentelemetry/sdk-trace-node @opentelemetry/exporter-trace-otlp-http
```

<div class="content-ad"></div>

이제 instrumentation.ts에서 NodeSDK를 초기화할 수 있습니다. @vercel/otel과 달리 NodeSDK는 엣지 런타임과 호환되지 않으므로 process.env.NEXT_RUNTIME === `nodejs` 일 때에만 임포트하는지 확인해야 합니다. Node를 사용할 때만 조건부로 임포트하는 새 파일인 instrumentation.node.ts를 만드는 것을 권장합니다:

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

이렇게 함으로써 @vercel/otel을 사용하는 것과 같은 효과를 얻을 수 있지만, @vercel/otel에서 노출되지 않는 기능을 수정하고 확장할 수 있습니다. 엣지 런타임 지원이 필요한 경우, @vercel/otel을 사용해야 합니다.

<div class="content-ad"></div>

## OpenTelemetry 기기의 테스트

로컬에서 OpenTelemetry 추적을 테스트하려면 호환되는 백엔드를 가진 OpenTelemetry 수집기가 필요합니다. 저희 OpenTelemetry 개발 환경을 사용하는 것을 추천합니다.

모든 것이 잘 작동하면 루트 서버 스패닝이 GET /requested/pathname로 레이블이 지정된 것을 볼 수 있습니다. 해당 추적에서 생성된 다른 모든 스팬은 이 하위에 중첩될 것입니다.

Next.js는 기본적으로 발생하는 스팬보다 더 많은 스팬을 추적합니다. 더 많은 스팬을 보려면 NEXT_OTEL_VERBOSE=1을 설정해야 합니다.

<div class="content-ad"></div>

## 배포

### 오픈텔레메트리 컬렉터 사용

오픈텔레메트리 컬렉터를 사용하여 배포할 때는 @vercel/otel을 사용할 수 있습니다. Vercel 또는 자체 호스트에서 모두 작동할 것입니다.

#### Vercel에 배포하기

<div class="content-ad"></div>

오픈텔레멘트리가 Vercel에서 기본 설정으로 작동하도록 확인했습니다.

[Vercel 문서](https://vercel.com/docs)
를 따라 프로젝트를 관측성 제공 업체에 연결하세요.

#### 셀프 호스팅

다른 플랫폼으로 배포하는 것도 간단합니다. 여러분은 Next.js 앱에서 유래되고 처리된 텔레메트리 데이터를 받기 위해 직접 오픈텔레멘트리 수집기를 실행해야 합니다.

<div class="content-ad"></div>

위 작업을 하려면 OpenTelemetry Collector 시작 가이드를 따르세요. 이 가이드는 수집기를 설정하고 Next.js 앱에서 데이터를 수신하도록 구성하는 방법을 안내해 줍니다.

수집기가 작동하면 선택한 플랫폼에 Next.js 앱을 배포할 수 있습니다. 각각의 배포 가이드를 따르세요.

### 사용자 지정 내보내기자

OpenTelemetry Collector는 필수가 아닙니다. @vercel/otel 또는 수동 OpenTelemetry 구성을 사용하여 사용자 지정 OpenTelemetry 내보내기자를 사용할 수 있습니다.

<div class="content-ad"></div>

## 사용자 지정 Span

OpenTelemetry API를 사용하여 사용자 정의 Span을 추가할 수 있어요.

```js
npm install @opentelemetry/api
```

다음 예시는 GitHub 스타 수를 가져오는 함수를 보여줍니다. 이 함수는 fetch 요청 결과를 추적하기 위해 사용자 정의 fetchGithubStars span을 추가해요:

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

register 함수는 새로운 환경에서 코드가 실행되기 전에 실행됩니다. 새로운 스팬을 만들고 시작하면 내보낸 추적에 정확히 추가되어야 합니다.

## Next.js의 기본 스팬

Next.js는 여러분의 응용프로그램 성능에 유용한 통찰을 제공하기 위해 여러 스팬을 자동으로 측정합니다.

<div class="content-ad"></div>

`<span>` 요소의 속성은 OpenTelemetry 시맨틱 규칙을 따릅니다. 또한 다음 네임스페이스의 사용자 정의 속성을 추가합니다:

- next.span_name - 스팬 이름 복제
- next.span_type - 각 스팬 유형에는 고유 식별자가 있음
- next.route - 요청의 route 패턴 (예: /[param]/user).
- next.rsc (true/false) - 요청이 RSC 요청인지 여부, 예를 들면 prefetch.
- next.page
  앱 라우터에서 사용하는 내부 값입니다. 이것은 특별한 파일로의 route로 생각할 수 있습니다 (예: page.ts, layout.ts, loading.ts 등). 이 것은 next.route와만 짝지어서 사용될 때만 고유 식별자로 사용할 수 있습니다. 예를 들어 /layout은 /(groupA)/layout.ts와 /(groupB)/layout.ts를 모두 식별할 수 있습니다.

### [http.method] [next.route]

- next.span_type: BaseServer.handleRequest

<div class="content-ad"></div>

이 span은 Next.js 애플리케이션으로 들어오는 각 요청의 루트 span을 나타냅니다. 요청의 HTTP 메서드, 라우트, 대상 및 상태 코드를 추적합니다.

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

### 렌더 라우트(앱) [next.route]

<div class="content-ad"></div>

- next.span_type: AppRender.getBodyResult.

이 span은 앱 라우터에서 라우트를 렌더링하는 과정을 나타냅니다.

속성:

- next.span_name
- next.span_type
- next.route

<div class="content-ad"></div>

### fetch [http.method] [http.url]

- next.span_type: AppRender.fetch

이 span은 코드에서 실행된 fetch 요청을 나타냅니다.

속성:

<div class="content-ad"></div>

- Common HTTP attributes  
  http.method
- http.method
- Client HTTP attributes  
  http.url  
  net.peer.name  
  net.peer.port (only if specified)
- http.url
- net.peer.name
- net.peer.port (only if specified)
- next.span_name
- next.span_type

이 span을 사용하지 않도록 설정하려면 환경 변수에 NEXT_OTEL_FETCH_DISABLED=1을 설정하면 됩니다. 사용자 정의 fetch instrumentation 라이브러리를 사용하고 싶을 때 유용합니다.

### 실행 중인 api route (app) [next.route]

- next.span_type: AppRouteRouteHandlers.runHandler.

<div class="content-ad"></div>

이 span은 앱 라우터에서 API 라우트 핸들러를 실행하는 것을 나타냅니다.

속성:

- next.span_name
- next.span_type
- next.route

### getServerSideProps [next.route]

<div class="content-ad"></div>

- 다음.span_type: Render.getServerSideProps.

이 span은 특정 경로에 대한 getServerSideProps의 실행을 나타냅니다.

속성:

- next.span_name
- next.span_type
- next.route

<div class="content-ad"></div>

### getStaticProps [next.route]

- next.span_type: Render.getStaticProps.

이 span은 특정 경로에 대한 getStaticProps 실행을 나타냅니다.

속성:

<div class="content-ad"></div>

- next.span_name
- next.span_type
- next.route

### render route (pages) [next.route]

- next.span_type: Render.renderDocument.

이 span은 특정 경로에 대한 문서 렌더링 프로세스를 나타냅니다.

<div class="content-ad"></div>

특성:

- next.span_name
- next.span_type
- next.route

### generateMetadata [next.page]

- next.span_type: ResolveMetadata.generateMetadata.

<div class="content-ad"></div>

이 span은 특정 페이지에 대한 메타데이터를 생성하는 과정을 나타냅니다 (단일 루트에는 여러 개의 이러한 span이 있을 수 있습니다).

속성:

- next.span_name
- next.span_type
- next.page

### 페이지 구성 해결

<div class="content-ad"></div>

- 다음.span_type: NextNodeServer.findPageComponents.

이 span은 특정 페이지의 페이지 구성 요소를 해결하는 프로세스를 나타냅니다.

속성:

- next.span_name
- next.span_type
- next.route

<div class="content-ad"></div>

### 세그먼트 모듈 해결

- next.span_type: NextNodeServer.getLayoutOrPageModule.

이 span은 레이아웃 또는 페이지에 대한 코드 모듈을 로드하는 것을 나타냅니다.

속성:

<div class="content-ad"></div>

- next.span_name
- next.span_type
- next.segment

### 시작 응답

- next.span_type: NextNodeServer.startResponse.

이 zero-length span은 응답에서 첫 번째 바이트가 전송된 시간을 나타냅니다.

<div class="content-ad"></div>
