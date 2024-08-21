---
title: "create-next-app으로 Nextjs 프로젝트 만드는 방법"
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

# create-next-app

Next.js를 시작하는 가장 쉬운 방법은 create-next-app을 사용하는 것입니다. 이 CLI 도구를 사용하면 새로운 Next.js 애플리케이션을 빠르게 만들 수 있습니다. 모든 것이 이미 설정되어 있습니다.

기본 Next.js 템플릿을 사용하거나 공식 Next.js 예제 중 하나를 사용하여 새 앱을 만들 수 있습니다.

### 대화형

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

새 프로젝트를 대화식으로 만들려면 다음을 실행하세요:

```js
npx create-next-app@latest
```

```js
yarn create next-app
```

```js
pnpm create next-app
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

```js
bunx create-next-app
```

다음과 같은 프롬프트가 표시됩니다:

```js
프로젝트 이름은 무엇인가요?  my-app
TypeScript를 사용하시겠습니까?  No / Yes
ESLint를 사용하시겠습니까?  No / Yes
Tailwind CSS를 사용하시겠습니까?  No / Yes
`src/` 디렉토리를 사용하시겠습니까?  No / Yes
App Router를 사용하시겠습니까? (권장)  No / Yes
기본 import 별칭을 사용자 정의하시겠습니까? (@/*)?  No / Yes
```

프롬프트에 답변한 후, 답변에 따라 올바른 구성을 갖춘 새 프로젝트가 생성됩니다.

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

### 비대화형

새 프로젝트를 비대화형으로 설정하려면 명령줄 인수를 전달할 수 있어요.

또한 기본 옵션을 부정할 수도 있어요. --no- 접두사와 함께 사용하세요(e.g. --no-eslint).

create-next-app --help을 확인하세요:

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
사용법: create-next-app <프로젝트-디렉토리> [옵션]

옵션:
  -V, --version                        버전 번호 출력
  --ts, --typescript

    TypeScript 프로젝트로 초기화합니다. (기본값)

  --js, --javascript

    JavaScript 프로젝트로 초기화합니다.

  --tailwind

    Tailwind CSS 설정으로 초기화합니다. (기본값)

  --eslint

    ESLint 설정으로 초기화합니다.

  --app

    App Router 프로젝트로 초기화합니다.

  --src-dir

    `src/` 디렉토리 내부에서 초기화합니다.

  --import-alias <설정할-별칭>

    사용할 import 별칭을 지정합니다 (기본값 "@/*").

  --use-npm

    명시적으로 CLI에게 npm을 사용하여 앱을 부트스트랩하도록 지시합니다

  --use-pnpm

    명시적으로 CLI에게 pnpm을 사용하여 앱을 부트스트랩하도록 지시합니다

  --use-yarn

    명시적으로 CLI에게 Yarn을 사용하여 앱을 부트스트랩하도록 지시합니다

  --use-bun

    명시적으로 CLI에게 Bun을 사용하여 앱을 부트스트랩하도록 지시합니다

  -e, --example [이름]|[깃허브-URL]

    앱을 부트스트랩하는 데 사용할 예제입니다. 공식 Next.js 저장소에서 예제 이름을
    사용하거나 공개 깃허브 URL을 사용할 수 있습니다. URL은 모든 브랜치 및/또는
    서브디렉터리를 사용할 수 있습니다

  --example-path <예제-경로>

    가끔씩 깃허브 URL에 슬래시가 포함된 브랜치 이름(예: bug/fix-1)과
    예제 경로(예: foo/bar)가 있는 경우에는 예제 경로를 별도로 지정해야 합니다:
    --example-path foo/bar

  --reset-preferences

    CLI에게 저장된 선호 설정을 재설정하도록 명시합니다

  -h, --help                           사용 방법 출력
```

### Create Next App를 사용하는 이유

create-next-app을 사용하면 몇 초만에 새로운 Next.js 앱을 생성할 수 있습니다. Next.js의 개발자가 직접 유지보수하며 여러 가지 이점이 포함되어 있습니다:

- 대화형 경험: 인터랙티브한 경험을 제공하여 프로젝트 설정을 안내하는 npx create-next-app@latest (인수 없이 실행)을 실행할 수 있습니다.
- 종속성 없음: 프로젝트 초기화는 1초만에 끝납니다. Create Next App에는 종속성이 없습니다.
- 오프라인 지원: Create Next App은 자동으로 오프라인 상태인지 감지하고 로컬 패키지 캐시를 사용하여 프로젝트를 부트스트랩합니다.
- 예제 지원: Next.js 예제 컬렉션(예: npx create-next-app --example api-routes) 또는 공개 깃허브 저장소에서 예제를 사용하여 애플리케이션을 부트스트랩할 수 있습니다.
- 테스트 완료: 이 패키지는 Next.js 모노리포의 일부이며 Next.js 자체와 동일한 통합 테스트 스위트를 사용하여 테스트되므로 모든 릴리스에서 예상대로 작동됩니다.

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
