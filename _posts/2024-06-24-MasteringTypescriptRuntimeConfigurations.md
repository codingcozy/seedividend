---
title: "Typescript 런타임 설정 완벽 마스터하는 방법"
description: ""
coverImage: "/assets/img/2024-06-24-MasteringTypescriptRuntimeConfigurations_0.png"
date: 2024-06-24 02:24
ogImage: 
  url: /assets/img/2024-06-24-MasteringTypescriptRuntimeConfigurations_0.png
tag: Tech
originalTitle: "Mastering Typescript Runtime Configurations"
link: "https://medium.com/@assorium/mastering-typescript-runtime-configurations-5dbfec90be87"
isUpdated: true
---




모든 사람이 경력 초반에 배우는 구성은 중요합니다. 대부분의 사람들은 처음에 배운 방법을 고수합니다. 저는 웹 개발을 10년 이상 해왔고, 무수히 많은 구성 방법을 보았습니다. 오늘은 여러분의 앱 구성을 좀 더 쉽게 만들어드리고, 물론 제 새로운 패키지 https://github.com/mrspartak/config 를 홍보하기 위해 여기에 왔습니다.

![이미지](/assets/img/2024-06-24-MasteringTypescriptRuntimeConfigurations_0.png)

저는 풀 스택 개발자이지만, 백엔드와 프론트엔드 구성을 실제로 구분하지 않습니다. 둘 다 빌드 시간 및 실행 시간 구성을 사용할 수 있기 때문에 유사합니다. 우리는 컨테이너화 시대에 살고 있으므로, 주로 이 유형의 배포에 초점을 맞출 것입니다. 다음 섹션에 있는 통찰은 매우 주관적이므로, 다른 의견이 있으면 댓글로 의견을 공유해 주시면 감사하겠습니다.

## 빌드 시간 구성.

<div class="content-ad"></div>

백엔드에서는 빌드 시간 구성이 그리 흔하지는 않지만, 프론트엔드에서는 상당히 인기 있는 방식입니다. 여기에서는 구성 값을 패키지나 이미지에 포함하여 응용 프로그램을 실행하는 데 충분하게 활용합니다. 제게는 빌드 시간에 환경과 관련된 모든 것을 처리하는 것이 합리적으로 보입니다. 이는 코드에서의 IO 작업 동작에 영향을 주는 구체적인 테스트, 스테이징 및 프로덕션 환경 구성을 포함합니다.

![image](https://miro.medium.com/v2/resize:fit:1200/1*WIXN4ZkEhqUXVOfalToyAg.gif)

그러나 어떤 사람들은 API 엔드포인트, 인증 키 등 외부 구성 요소를 빌드 시간에 포함하는 것이 너무 멀리간다고 생각합니다. 이 방식은 작동하지만, 각 환경별로 패키지 또는 이미지를 다시 빌드하고 테스트해야 하므로 빌드 사이에 불일치가 발생할 수 있습니다.

## 런타임 구성.

<div class="content-ad"></div>

이 곳이 백엔드의 진정한 빛이 나오는 곳입니다. 그러나 SSR (서버 측 렌더링) 및 SPA (단일 페이지 어플리케이션) 프론트 엔드에서 런타임 구성을 자주 사용합니다. 앱이 로드되는 가장 처음에 실행 구성 정보가 로드됩니다. 런타임 구성은 모든 외부 구성을 포함해야 하며, 환경에 따라 크게 다를 수 있습니다. 여기서 일회성 환경의 장점이 발휘되며, 더 큰 유연성과 적응성을 제공합니다.

## 어떻게 구성하나요?

그래서 구성이 정확히 무엇인가요? 네, 당신은 `.env` 파일을 알고 계시죠... 또는 `.toml`. 아마도 `.json` 또는 `.ini`도요? 음, 그냥 `.ts` 파일을 만들고 그 안에서 객체를 내보내겠습니다. 하지만 기다려주세요. 그 파일을 git에 커밋해야 할까요? 각 환경 당 파일을 만들어 비밀 데이터를 커밋해야 할까요?

![이미지](https://miro.medium.com/v2/resize:fit:960/1*7S4sjloFaBx5isjqi_OAXw.gif)

<div class="content-ad"></div>

우리는 어떤 형식이 가장 좋은지를 두고 전쟁을 일으킬 수 있지만, 사실 별로 중요하지 않아요. 읽기 쉽고 확장 가능하며 텍스트로 저장할 수 있는 형식이라면 충분하죠. 당신이 사용하기 편한 형식으로 선택하세요. 하지만 저장 및 사용 전략은 상당히 중요합니다.

저장 측면에서, Kubernetes (k8s), Docker Swarm 또는 순수한 Docker를 사용한다면 아마도 설정 및 비밀키에 익숙할 것입니다. 이를 통해 코드와 함께 실행 중인 컨테이너에 어떤 파일이나 폴더를 첨부할 수 있어요. 대부분의 어려움은 개발 환경이나 프로덕션 환경으로 새 구성을 배포할 때 발생한다고 보아요.

## 유효성 검사, 유효성 검사, 유효성 검사

구성은 선언부터 시작돼요. 정말 간단하죠. 백엔드에서 데이터베이스를 호출해야 한다면, 해당 데이터베이스에 인증하는 데 필요한 것을 파악하고 구성 선언에 넣으세요. 그 결과로 얻는 것은 - 어플리케이션이 다운될 때입니다. 하지만 이것이 우리가 원하는 것이에요. 이를 통해 누락되거나 잘못된 구성을 조기에 식별할 수 있어요.

<div class="content-ad"></div>

<img src="https://miro.medium.com/v2/resize:fit:960/1*hDRj2PnNe94Krj76Az67lQ.gif" />

그 다음으로, 물론 구성 파일에 필요한 필드를 추가하시게 됩니다. 여러분은 어떤 유효성 검사 라이브러리든 사용하시거나, 더 좋은 방법으로는 (몰래 광고 주의!) 제 라이브러리를 사용하여 유효성을 처리할 수 있습니다.

## 병합은 때로는 시간을 절약할 수 있습니다

기본 PORT를 설정하는 것을 잊었을 때 항상 기본값이 있는데요, 어떻게 하면 좋을까요? 당연히 그 기본값을 정의하겠죠. 그렇다면 이후에 그들을 어떻게 병합할까요? 단순히 lodash를 사용하시거나, 더 좋은 방법으로는 (무언가를 여러 차례 언급하면 짜증나는 것에서 당신이 생각하는 방식으로 변화한다고 들었습니다) 제 라이브러리를 사용하세요.

<div class="content-ad"></div>

## 개발자에게 무엇을 할 수 있을까요? 더 좋은 것을 받을 수 있을까요?

물론 가능합니다. 물어주셔서 감사합니다. 저의 메인 언어(도움을 부탁드려요)가 TypeScript인 지금, 제게 제일 잘 맞는 것을 얻고 싶어해요. 상상해보세요! 전체 구성이 타이핑된 채로 보일 수 있어요. 와우. 예를 들어 Zod로 유효성을 검사하는 사람들은 이미 이 훌륭한 삶을 살고 있어요. 제 라이브러리는 어떤 유효성 검사 라이브러리든 가져다 사용할 수 있게 해주고, 그것들은 모두 Out of the box로 작동할 거예요.

trpc의 개발자에게 큰 칭찬을 보내요 - 그는 천재에요. 유효성 검사의 결과로 구성을 추론하기 위해 그의 코드를 그대로 복사하거나 도용할 수 있어요. 마법 같죠.

![이미지](https://miro.medium.com/v2/resize:fit:960/1*7sjOuoIpBuH3KTlkUFt1QQ.gif)

<div class="content-ad"></div>

## 개발 환경을 언급하셨군요. 커밋할까요?

아니요. 절대 그러지 마세요. 제가 바로 OPENAPI_KEY를 훔쳐갈 거에요. 일주일 후면 길거리에서 구걸하게 될 거에요. 비밀 보관 솔루션을 사용해주세요. 1Password, Google Cloud, Amazon, Infisical, dotenv.org 및 다른 멋진 프로젝트들이 안전하게 비밀을 보관하고 공유할 수 있게 해줍니다.

패키지.json에 설치 스크립트를 포함하여 정확한 버전의 비밀을 다운로드할 수 있게 하세요. 또한 업로드 스크립트도 추가해서 버전을 업그레이드하고 git에서 충돌을 피할 수 있도록 해주세요. 나중에 감사의 인사를 드릴게요. 저는 이 방법을 여러 년간 사용해왔고 로컬 구성을 USB 드라이브나 Slack을 통해 공유하는 것으로는 돌아갈 수 없을 거에요.

![이미지](https://miro.medium.com/v2/resize:fit:960/1*CR7GClSquXaYgsn6gmGv6Q.gif)

<div class="content-ad"></div>

## 알겠어요, 이제 다른 부풀린 npm 패키지에 대해 이야기해 주세요

사실, 이 패키지는 의존성이 전혀 없으며 TypeScript를 사용하고 아마도 번들러를 사용한다고 가정합니다. 일반적으로 이 패키지는 위에서 언급한 모든 문제를 해결합니다 (물론 개발 환경은 제외하고), 아래와 같은 기능을 제공합니다:

- 3가지 데이터 소스 옵션: JSON 파일, JSON URL 및 객체를 지원하여 대부분의 사용 사례를 처리합니다.
- 런타임 유효성 검사: Zod, Superstruct, Yup 등과 같은 인기있는 라이브러리와 호환됩니다.
- TypeScript IntelliSense: 유효성 검사 라이브러리에서의 변환기를 고려하고 해결된 유효성 검사에 대한 모든 힌트를 제공합니다.
- 병합: 왜냐하면 가능한 이유가 있잖아요? 디폴트를 분리하여 가지고 있으면 상당히 멋집니다. 항상 유효성 검사자 스키마에 기본값을 넣을 수 있지만, 그러면 코드에 저장됩니다.
- 완전히 테스트됨: 프로덕션에 사용할 준비가 되어 있으며 이미 여러 응용 프로그램에서 사용 중입니다.
- 백엔드 및 프론트엔드 친화적: 두 환경 모두에서 원활하게 작동합니다.

```js
// 파일: state/config.ts
import { fromJSONFile } from "@mrspartak/config";
import * as z from "zod"

const config = await fromJSONFile({
  path: ["../config/default.json", "../config/runtime.json"],
  schema: z.object({
    db: z.object({
      host: z.string(),
      port: z.number(),
      username: z.string(),
      password: z.string()
    }),
    app: z.object({
      port: z.number().optional().default(3000)
    })
  }),
});

export default config



// 파일: index.ts
// 해결된 구성을 가져오세요
import config from './state/config.js';

// 응용 프로그램에서 구성을 사용하세요
import db from 'some-db-provider';
const dbClient = db(config.db); // 여기서 IntelliSense를 즐기세요!
```

<div class="content-ad"></div>

## 그런데 JSON 지원만 보여요. system crap 환경 변수를 아름답게 하려면 어떻게 하죠?

객체와 함께 작업을 지원하므로 env 객체를 함수에 전달하면 됩니다. 다른 .env 파서를 다시 작성하는 것이 이상할 것입니다. 이미 시험된 많은 파서가 시장에 있으니까요

```js
// 파일: state/config.ts
import { fromObject } from "@mrspartak/config";
import * as z from "zod"

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
  schema
})

export default config

// 파일 index.ts
import 'dotenv/config'
// ! dotenv 이후에 설정이 로드되어야 하므로 process.env가 채워질 겁니다
import config from './state/config.js';

// 애플리케이션에서 구성을 사용하세요
import db from 'some-db-provider';
const dbClient = db(config.db); // 여기서 IntelliSense를 즐기세요!
```

## frontend를 언급했는데 node 파일 API를 확실히 사용했기 때문에 빌드가 중단될 것입니다.

<div class="content-ad"></div>

네, 당신이 요청한 작업을 수행해드릴 수 있어요. (만약 더 나은 해결책을 아시는 분이 계시다면, 연락주세요)

```js
// 파일: state/config.ts
import { fromObject } from "@mrspartak/config/web"; // 라이브러리의 별도 빌드
import * as z from "zod"

const schema = z
  .object({
    API_URL: z.string(),
  })

const config = await fromObject({
  data: import.meta.env, // vite를 사용한 예시 
  schema
})

export default config
```

![](https://miro.medium.com/v2/resize:fit:960/1*ipkgq4adHLjucIErFR2buA.gif)
