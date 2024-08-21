---
title: "타입스크립트 런타임 설정 완전 정복하는 방법"
description: ""
coverImage: "/assets/img/2024-06-23-MasteringTypescriptRuntimeConfigurations_0.png"
date: 2024-06-23 13:49
ogImage:
  url: /assets/img/2024-06-23-MasteringTypescriptRuntimeConfigurations_0.png
tag: Tech
originalTitle: "Mastering Typescript Runtime Configurations"
link: "https://medium.com/@assorium/mastering-typescript-runtime-configurations-5dbfec90be87"
isUpdated: true
---

대부분의 사람들이 경력 초기에 배우는 것 중 하나가 구성(configuration)입니다. 그리고 대부분의 사람들이 처음에 배운 방법을 계속 사용합니다. 저는 10년 이상 웹 개발을 해 왔는데, 끊임없이 다양한 구성 접근 방식을 보았습니다. 오늘은 여러분이 앱을 구성하는 것을 조금 더 쉽게 만들어 드리려고 왔습니다. 물론, 새롭게 출시한 제 패키지 https://github.com/mrspartak/config 도 소개할 예정이에요.

![image](/assets/img/2024-06-23-MasteringTypescriptRuntimeConfigurations_0.png)

저는 풀스택 개발자이지만, 백엔드와 프론트엔드 구성을 구분하지는 않습니다. 빌드 시간 및 실행 시간 구성을 모두 사용할 수 있기 때문에 유사하다고 생각하기 때문이죠. 우리는 컨테이너화 시대에 살고 있으므로, 주로 이 유형의 배포에 초점을 맞출 거예요. 아래 섹션에서 제공하는 통찰력은 꽤 주관적일 수 있으므로, 만약 여러분의 의견이 다르다면 댓글로 의견을 나누고 싶어요.

## 빌드 시간 구성(Build-time configuration)

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

빌드 시간 구성은 백엔드에서는 덜 흔하지만 프론트엔드에서는 꽤 인기 있는 접근 방식입니다. 여기서 구성 값을 패키지나 이미지에 포함하여 애플리케이션을 실행하는 데 충분할 수 있습니다. 저에게는 빌드 시간에 환경과 관련된 모든 것을 처리하는 것이 합리적으로 보입니다. 이는 코드에서 IO 작업이 어떻게 동작하는지에 영향을 미치는 구체적인 테스트, 스테이징 및 프로덕션 환경 구성을 포함합니다.

![image](https://miro.medium.com/v2/resize:fit:1200/1*WIXN4ZkEhqUXVOfalToyAg.gif)

그러나 일부 사람들은 빌드 시간에 API 엔드포인트, 인증 키 등 외부 구성을 포함하여 이를 지나치게 사용하기도 합니다. 이 방법은 작동하지만 각 환경별로 패키지나 이미지를 재빌드하고 테스트해야 하므로 빌드 간에 불일치를 일으킬 수 있습니다.

## 런타임 구성.

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

백엔드에서 진짜 빛을 발할 때죠. 하지만 나는 SSR (서버 측 렌더링) 및 SPA (단일 페이지 응용 프로그램) 프런트엔드에서 실행시 구성을 자주 사용해요. 앱이 로드되는 처음에 사용되고 외부 구성을 모두 포함해야 하며 환경에 따라 크게 달라질 수 있어요. 여기서 순간적인 환경의 강점이 발휘되어 더 큰 유연성과 적응성을 제공해 줍니다.

## 어떻게 구성하나요?

그래서 정확히 구성(configuration)이 뭔가요? `.env` 파일을 알죠… 아니라면 `.toml`이나 `.json`, `.ini`이 있겠죠? 안돼, 그냥 `.ts` 파일을 만들고 그 안에서 객체를 내보내요. 하지만 기다려봐요. 파일을 git에 커밋해야 하나요? 환경마다 파일을 만들고 비밀 데이터를 숨길까요?

<img src="https://miro.medium.com/v2/resize:fit:960/1*7S4sjloFaBx5isjqi_OAXw.gif" />

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

최고의 형식에 대해 전쟁을 벌일 수 있지만, 사실은 별로 중요하지 않아요. 읽기 쉽고 확장 가능하며 텍스트로 저장할 수 있는 것이면 충분히 좋아요. 당신이 원하는 대로 하세요. 하지만 저장 및 사용 전략은 상당히 중요해요.

저장 측면에서, Kubernetes (k8s), Docker Swarm 또는 일반 Docker를 사용하는 경우, 아마도 configs와 secrets에 익숙할 겁니다. 이를 통해 코드와 실행 중인 컨테이너에 파일이나 폴더를 첨부할 수 있어요. 대부분의 어려움은 개발 환경이나 프로덕션 환경에 새로운 구성을 배포할 때 발생한다고 생각해요.

## 확인, 확인, 확인

설정은 선언부터 시작돼요. 그것만이 필요한 거예요. 백엔드에서 데이터베이스를 호출해야 한다면, 이 데이터베이스에 인증하는 데 필요한 것을 알아내서 설정 선언에 넣어보세요. 그 결과는 무엇일까요? 앱이 충돌하게 되는 거죠 — 이게 바로 좋은 일이에요. 이를 통해 누락된 또는 잘못된 구성을 조기에 확인할 수 있어요.

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

![image](https://miro.medium.com/v2/resize:fit:960/1*hDRj2PnNe94Krj76Az67lQ.gif)

다음으로 필요한 필드를 구성 파일에 추가해야 합니다. 검증 라이브러리를 사용하거나 더 좋은 방법으로 (비밀 광고 경고) 제 라이브러리를 사용하여 검증을 처리하세요.

## 병합, 때때로 시간을 절약합니다

기본 PORT가 항상 설정되어 있는데 설정하지 않을 때는 어떻게 할까요? 당연히 그 기본값을 정의하는 것이 도움이 됩니다. 그런데 그 후에 어떻게 병합하죠? lodash를 사용하거나 더 나은 방법으로 (계속 언급하다 보면 짜증나지 않고 내 생각처럼 되기 시작한다는 말이 있습니다).

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

## 개발자에 대한 생각은 뭐야? 그보다 더 있을까?

물론이죠. 물어주셔서 감사합니다. 제 현재 주 언어는 TypeScript이기 때문에 그것에서 최선을 다해야겠죠. 상상해보세요! 전체 구성이 타입으로 정의된 것을 볼 수 있다면 얼마나 멋진가요. 예를 들어 Zod로 유효성을 검사하는 사람들은 이미 이 편한 삶을 살고 있어요. 제 라이브러리를 사용하면 어떤 유효성 검사 라이브러리라도 손쉽게 적용할 수 있답니다.

trpc 무신, 정말 천재적이에요. 그의 코드를 그냥 복사하여 사용하면 구성을 결과로 유도해낼 수 있어요. 마법 같죠.

![이미지](https://miro.medium.com/v2/resize:fit:960/1*7sjOuoIpBuH3KTlkUFt1QQ.gif)

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

## 개발 환경을 언급했어요. 커밋할까 말까?

안 돼요. 정말로요. OPENAPI_KEY를 즉시 훔치고, 일주일 후엔 길거리에서 구걸하게 될 거에요. 비밀 저장소 솔루션을 사용해주세요. 1Password, Google Cloud, Amazon, Infisical, dotenv.org, 그리고 여러 다른 멋진 프로젝트들이 안전하게 시크릿을 저장하고 공유할 수 있게 해줘요.

package.json에 설정 스크립트를 포함해서 시크릿의 정확한 버전을 다운로드할 수 있게 해주세요. 또한, 충돌을 피하기 위해 버전을 업데이트하고 git에서 충돌을 피하도록 하는 업로드 스크립트도 포함해주세요. 나중에 감사를 말할 거예요. 저는 이 방법을 여러 해 동안 사용해왔고, 로컬 설정을 플래시 드라이브나 Slack을 통해 공유하는 데 돌아갈 수 없을 거예요.

![image](https://miro.medium.com/v2/resize:fit:960/1*CR7GClSquXaYgsn6gmGv6Q.gif)

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

## 좋아 좋아, 이제 다른 무거운 npm 패키지에 대해 말씀드릴게요

실제로, 이 패키지는 종속성이 전혀 없으며 TypeScript를 사용하고 아마도 번들러를 사용해야 합니다. 일반적으로 위에서 언급한 모든 문제를 해결해 줍니다 (물론 개발 환경은 제외하고요). 이 패키지를 사용하면 다음과 같은 장점을 얻을 수 있어요:

- 3가지 소스 옵션: JSON 파일, JSON URL 및 객체를 지원하여 대부분의 사용 사례를 커버합니다.
- 런타임 유효성 검사: Zod, Superstruct, Yup 등 인기있는 라이브러리와 함께 작동합니다.
- TypeScript IntelliSense: 유효성 검사 라이브러리의 변환기를 적용하고 해결된 유효성에 대한 힌트를 제공합니다.
- 병합: 왜냐하면요? 기본값을 분리해서 가지고 있는 것이 상당히 멋지기 때문이죠. 기본값을 항상 유효성 검사 스키마에 넣을 수 있지만, 그러면 코드에 저장되어 있게 됩니다.
- 완전히 테스트된 상태: 상용화 준비가 끝난 상태이며 이미 다수의 응용 프로그램에서 사용되었습니다.
- 백엔드 및 프런트엔드 친화적: 양쪽 환경에서 매끄럽게 작동합니다.

```js
// file: state/config.ts
import { fromJSONFile } from "@mrspartak/config";
import * as z from "zod";

const config = await fromJSONFile({
  path: ["../config/default.json", "../config/runtime.json"],
  schema: z.object({
    db: z.object({
      host: z.string(),
      port: z.number(),
      username: z.string(),
      password: z.string(),
    }),
    app: z.object({
      port: z.number().optional().default(3000),
    }),
  }),
});

export default config;

// file: index.ts
// 해결된 구성을 가져옵니다
import config from "./state/config.js";

// 애플리케이션에서 구성을 사용합니다
import db from "some-db-provider";
const dbClient = db(config.db); // 여기서 IntelliSense를 즐기세요!
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

## 그런데 JSON 지원만 있는 것 같아요. 환경 변수를 사용하는데 무거운 시스템 쓰레기가 많이 들어가지 않은 사랑스러운 방법이 있을까요?

객체와 작업하는 것을 지원하므로 env 객체를 함수에 전달할 수 있어요. 다른 .env 파서를 다시 작성하는 것이 이상할 수 있겠죠. 시장에 이미 테스트된 많은 것들이 있으니까요.

```js
// file: state/config.ts
import { fromObject } from "@mrspartak/config";
import * as z from "zod";

const schema = z
  .object({
    NODE_ENV: z.enum(["development", "production"]),
    DB_HOST: z.string(),
    DB_PORT: z.number(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    APP_PORT: z.number().default(3000),
  })
  .transform((data) => ({
    environment: data.NODE_ENV,
    port: data.APP_PORT,
    db: {
      host: data.DB_HOST,
      port: data.DB_PORT,
      user: data.DB_USER,
      password: data.DB_PASSWORD,
    },
  }));

const config = await fromObject({
  data: process.env,
  schema,
});

export default config;

// file index.ts
import "dotenv/config";
// ! dotenv 이후에 설정이로드되어야 하므로 process.env가 채워집니다.
import config from "./state/config.js";

// 애플리케이션에서 구성 사용하기
import db from "some-db-provider";
const dbClient = db(config.db); // 여기서 IntelliSense를 즐기세요!
```

## 프론트엔드를 언급했는데, 노드 파일 API를 사용한 것 같아요. 빌드가 깨질 거에요.

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

네. 그렇습니다. 따로 내보내는 방법이 있습니다. (만약 다른 더 나은 해결책을 아시면 연락 주세요)

```js
// 파일: state/config.ts
import { fromObject } from "@mrspartak/config/web"; // 라이브러리의 별도 빌드
import * as z from "zod";

const schema = z.object({
  API_URL: z.string(),
});

const config = await fromObject({
  data: import.meta.env, // vite의 예제
  schema,
});

export default config;
```

![이미지](https://miro.medium.com/v2/resize:fit:960/1*ipkgq4adHLjucIErFR2buA.gif)
