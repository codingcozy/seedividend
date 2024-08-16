---
title: "Nextjs 14 instrumentation 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
isUpdated: true
---





# Nextjs 14 instrumentation 정리

계측은 코드를 사용하여 모니터링 및 로깅 도구를 응용 프로그램에 통합하는 프로세스입니다. 이를 통해 응용 프로그램의 성능과 동작을 추적하고 프로덕션 환경에서 문제를 해결할 수 있습니다.

## 규칙

계측을 설정하려면 프로젝트의 루트 디렉토리에 instrumentation.ts|js 파일을 만드세요 (또는 사용 중인 경우 src 폴더 안에).

<div class="content-ad"></div>

파일에서 등록 함수를 내보내세요. 이 함수는 새로운 Next.js 서버 인스턴스가 시작될 때 한 번 호출됩니다.
예를 들어, Next.js를 OpenTelemetry와 @vercel/otel로 사용하려면:

```typescript
import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel("next-app");
}
```

전체 구현 예제인 Next.js with OpenTelemetry를 참조하세요.

<div class="content-ad"></div>

> 유용한 정보
> 이 기능은 실험적입니다. 사용하려면 next.config.js에서 experimental.instrumentationHook = true;를 명시적으로 정의해야 합니다.
> 계측 파일은 프로젝트의 루트에 있어야 하며 응용 프로그램이나 페이지 디렉토리 내부에 위치해서는 안됩니다. src 폴더를 사용하는 경우 파일을 pages와 app과 함께 src 내부에 배치해야 합니다.
> 파일 확장자 config 옵션을 사용하여 접미사를 추가하는 경우 계측 파일 이름도 일치하도록 업데이트해야 합니다.

## 예시

### 사이드 이펙트가 있는 파일 가져오기

가끔 코드에서 파일을 가져와야 하는 경우가 있습니다. 이는 파일이 일으키는 사이드 이펙트 때문일 수 있습니다. 예를 들어, 전역 변수 집합을 정의하는 파일을 가져올 수 있지만 코드에서 해당 가져온 파일을 명시적으로 사용하지 않을 수 있습니다. 그래도 이렇게 한다면 패키지에서 선언한 전역 변수에 액세스할 수 있습니다.

<div class="content-ad"></div>

제안드리는 대로, 등록 함수 내에서 JavaScript import 구문을 사용하여 파일을 가져오는 것이 좋습니다. 아래 예시는 등록 함수에서 import의 기본적인 사용법을 보여줍니다:

```typescript
export async function register() {
  await import("package-with-side-effect");
}
```

> 알아 두면 좋은 점:
> 파일을 파일 상단이 아닌 등록 함수 내부에서 가져오는 것을 권장합니다. 이렇게 함으로써 코드 내에서 사이드 이펙트를 한 곳에 함께 배치하고 파일 상단에서 전역으로 가져오는 것으로 인한 의도치 않은 결과를 피할 수 있습니다.

### 런타임 특정 코드 가져오기

<div class="content-ad"></div>

Next.js에서는 모든 환경에서 레지스터를 호출하므로 특정 런타임(예: Edge 또는 Node.js)을 지원하지 않는 코드를 조건부로 가져와야 합니다. 현재 환경을 얻으려면 NEXT_RUNTIME 환경 변수를 사용할 수 있습니다:

```typescript
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./instrumentation-node");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./instrumentation-edge");
  }
}
```

<div class="content-ad"></div>
