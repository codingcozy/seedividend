---
title: "Nextjs 13 저장소의 Instrumentation 방법 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "기관화"
link: "undefined"
isUpdated: true
---

# Instrumentation

Instrumentation(계측)은 코드를 사용하여 모니터링 및 로깅 도구를 응용 프로그램에 통합하는 과정입니다. 이를 통해 응용 프로그램의 성능 및 동작을 추적하고, 프로덕션 환경에서 문제를 디버깅할 수 있습니다.

## 규칙

계측을 설정하려면 프로젝트의 루트 디렉토리에 instrumentation.ts|js 파일을 만드세요 (사용 중인 경우 src 폴더 내부에 위치).

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

그럼, 파일에 등록 함수를 내보내세요. 이 함수는 새로운 Next.js 서버 인스턴스가 초기화될 때 한 번 호출됩니다.

예를 들어, OpenTelemetry와 @vercel/otel을 사용하는 경우:

```typescript
import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel("next-app");
}
```

전체 구현 사례를 보려면 OpenTelemetry 예제를 참조하세요.

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

> 좋아 알아두세요
> 이 기능은 실험적입니다. 사용하려면 experimental.instrumentationHook = true;를 next.config.js 파일에서 명시적으로 정의해야 합니다.
> 계측 파일은 프로젝트의 루트에 있어야 하며 앱이나 페이지 디렉토리 안에 있으면 안 됩니다. src 폴더를 사용하는 경우 파일을 src 폴더 안에 페이지(pages) 및 앱(app)과 함께 배치하십시오.
> pageExtensions 구성 옵션을 사용하여 접미사를 추가하는 경우 계측 파일 이름도 일치하도록 업데이트해야 합니다.

## 예시

### 부작용이 있는 파일 가져오기

가끔은 코드에서 파일을 가져오는 것이 유용할 수 있습니다. 이는 부작용 때문일 수 있습니다. 예를 들어, 전역 변수 집합을 정의하는 파일을 가져올 수 있지만 코드에서 해당 가져온 파일을 명시적으로 사용하지 않을 수도 있습니다. 이렇게 하면 패키지에서 선언한 전역 변수에 여전히 액세스할 수 있습니다.

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

JavaScript import 구문을 사용하여 파일을 불러오는 것을 권장합니다. 아래 예제는 register 함수 내에서 import를 기본적으로 사용하는 방법을 보여줍니다:

```typescript
export async function register() {
  await import("package-with-side-effect");
}
```

> 알아두면 좋은 사항:
> 파일을 파일 상단이 아닌 register 함수 내에서 불러오는 것을 권장합니다. 이렇게 하면 코드 내의 모든 부수 효과를 한 곳에서 함께 정렬할 수 있고, 파일 상단에서 전역적으로 불러오는 것으로 인한 의도하지 않은 부작용을 피할 수 있습니다.

### 런타임별 코드 불러오기

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

Next.js는 모든 환경에서 register를 호출하므로 특정 런타임(예: Edge 또는 Node.js)을 지원하지 않는 코드를 조건부로 가져오는 것이 중요합니다. 현재 환경을 확인하려면 NEXT_RUNTIME 환경 변수를 사용할 수 있습니다:

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
