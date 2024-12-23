---
title: "완벽한 TS monorepo를 만드는 방법"
description: ""
coverImage: "/assets/img/2024-05-17-MyquestfortheperfectTSmonorepo_0.png"
date: 2024-05-17 21:06
ogImage:
  url: /assets/img/2024-05-17-MyquestfortheperfectTSmonorepo_0.png
tag: Tech
originalTitle: "My quest for the perfect TS monorepo"
link: "https://medium.com/@thijs-koerselman/my-quest-for-the-perfect-ts-monorepo-62653d3047eb"
isUpdated: true
---

![이미지](/assets/img/2024-05-17-MyquestfortheperfectTSmonorepo_0.png)

올해에 도구 및 모노 레포와 관련된 이해력을 개선하기 위해 부단히 시간을 보냈습니다. 제가 한 일 중 일부를 공유해볼 테니, 혹시 필요하신 분들께 도움이 되길 바라겠습니다.

도구와 모노 레포에 대한 향상된 지원이 지난 몇 년 동안 JavaScript/TypeScript 생태계를 엄청나게 성장시켰지만, 모든 것이 어떻게 연결되는지 완전히 이해하지 않으면 여전히 많은 문제를 겪을 수 있다는 사실에 놀라실 지도 모릅니다.

도구와 모노 레포는 모두 매우 지루한 주제이기 때문에 내용을 간결하게 유지하려 노력하겠습니다. 가능한 한 외부 소스에 링크를 걸겠지만, 글이 짧지는 않을 것입니다. 다루어야 할 것들이 많거든요.

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

# 실제 예시

바로 시작하고 싶다면 여기가 좋아요. PNPM (메인), NPM 및 Yarn의 클래식 및 모던 버전에 대한 병렬 브랜치가 있습니다.

저는 훌륭한 Turborepo 스타터 및 그들의 "주방 싱크" 예제 코드로 많은 것을 배웠으므로 그들을 확인하고 모노레포에 대해 처음이라면 그들의 모노레포 핸드북도 읽어보시는 것을 추천합니다.

이 기사는 좀 더 심층적으로 다가가며 정보 조각들을 결합하여 모든 고려 사항과 일반적인 함정을 명확하게 개요하고자 합니다.

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

# 배경 이야기

지난 6년 동안 나는 두 개의 중간 규모 프로젝트에 대부분의 전문적 시간을 할애했어요. 그 두 프로젝트는 서로 다른 회사들을 위해 만들어졌지만, 둘 다 동일한 플랫폼 위에 구축되어 있어요.

스택 자체는 이 글에서 논의하는 문제와 해결책과는 크게 관련이 없지만, 참고로 다음과 같아요:

- Firebase와 Google Cloud Platform을 기반으로 한 Node.js 백엔드
- Vercel에서 호스팅되는 Next.js를 기반으로 한 React.js 클라이언트
- 데이터를 위해 Firestore와 Redis 사용
- TypeScript

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

이 프로젝트 중 첫 번째는 2017년 9월에 시작되었습니다. 그 때는 모노레포에 대한 경험이 부족하고 사용 가능한 도구가 납득할 만하지 않았기 때문에 저는 추가 복잡성을 피하기로 하고 모든 것을 함께 묶기로 선택했습니다.

두 번째 프로젝트는 2019년 6월에 시작되었습니다. 그 때에는 모노레포가 여러 플랫폼에 배포할 때 매우 중요하다는 것을 알 수 있었지만, 여전히 모든 것을 간단하게 유지하고 싶어서 Yarn 워크스페이스를 적용했습니다.

## 답답함

두 번째 설정은 얼마 동안 만족스러웠지만, 일부 측면은 분명히 최적이 아니거나 심지어 답답했습니다. 저는 패키지의 빌드 순서를 수동으로 관리하고 있었고, 그러다가 가끔 사소한 것들을 잊거나 중복 빌드를 일으키기도 했는데, 모든 것이 최신 상태임을 확인하려고 했기 때문입니다.

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

나중에 다른 프로젝트의 팀 환경에서 비슷한 설정을 사용하게 되면, 구성원들이 패키지 중 하나를 (다시) 빌드하는 것을 잊어서 문제에 부딪히게 될 때가 많아졌습니다.

시간이 지나며 커뮤니티에서 ESM 채택이 증가함에 따라 순수 ESM인 종속성 업데이트를 겪게 되었습니다. 우리의 코드베이스와 잘 어울리도록 하려고 여러 차례 시도했지만 성공하지 못했으며, 결과적으로 일부를 이전 버전으로 고정시켰는데 이는 지속 가능한 해결책이 아닙니다.

첫 번째 프로젝트의 설정은 여러 플랫폼의 모든 종속성을 단일 패키지 매니페스트에 모아놓은 것으로 ESM 채택을 더 어렵게 만들고 있었습니다. 게다가 더 느린 서버 배포 및 시작 시간과 같은 다른 문제를 초래하기 시작했습니다.

두 프로젝트를 동시에 진행하는 것만으로도 어렵기 때문에 도구 및 작업에 에너지와 시간을 낭비할 필요가 없습니다. 정신을 차리기 위해, 이러한 문제들을 한 번에 처리하고 모든 것이 어떻게 작동하며 어떻게 연결되는지 확신할 필요가 있었습니다.

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

저는 프로젝트에 필수적인 모든 측면을 다루기 위해 mono-ts 보일러플레이트를 개발하기 시작했습니다. 이 보일러플레이트는 이 글에서 다루는 모든 개념의 작동 예제를 제공하므로, 이해하기 어려운 부분이 있을 때 참고해 주세요.

# 주요 주제

좋은 모노레포 설정의 중추는 다음과 같습니다:

- 빠르고 결정적인 빌드 및 작업 조작
- 원하는 곳에서 ESM을 사용하고 생성
- 패키지를 독립적으로 배포할 수 있는 능력
- 코드 및 유형에 대한 IDE 정의로 이동
- 개발 중에 라이브 코드 업데이트

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

배포에 관한 도전은 대부분의 개발자가 마주치는 문제는 아니며, 이는 주로 사용하는 플랫폼에 따라 다릅니다. 우리의 경우에는 Firebase와 관련이 있으며, 현재 해당 도구가 모노 리포를 원산지로 지원하지 않는다는 점이 문제입니다.

# 빌드 및 작업 조정

Turborepo가 출시되자마자, 저는 그것이 내가 오랫동안 염원했던 것임을 즉시 알았지만, 그것은 그 종류의 첫 번째 해결책은 아니었습니다. Nx와 Rush는 이미 오랜 시간 동안 존재했기 때문에, 그것들을 여기서 언급하는 것은 공정한 일일 뿐이며, 다른 노력들도 있을 것으로 추측됩니다. Turborepo와 Nx는 여러 측면에서 유사해 보이지만, Nx에 대한 실제 경험이 없기 때문에 자세히 다루지는 않겠습니다.

간단히 말하면, Turborepo는 빌드, 린팅, 개발 서버 시작과 같은 개별 작업 단위로 각 패키지가 서로에게 어떻게 의존하는지 구성하는 방식으로 작동합니다. 각 작업에 대해 필요한 입력 및 출력을 정의하여 중간 결과를 캐시하고 입력 매개변수가 변경된 경우에만 계산합니다.

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

또한 Vercel은 프로젝트를 위해 Turborepo를 위한 공유 클라우드 캐시를 선택적으로 제공합니다. 따라서 여러분이 자신의 기기에서 실행한 작업은 곧 동료의 기기나 CI 파이프라인에서 실행하는 작업의 속도를 높일 수 있습니다. 이것이 대규모 프로젝트에 매우 강력할 수 있다는 것을 상상하기 어렵지 않습니다.

# 내부 패키지; 빌드할까 말까

모노 리포 설정을 선택하는 가장 흔한 이유는 공유 코드를 분리하고 여러 앱 및 서버 배포에서 재사용할 수 있게 하려는 것입니다. 이는 의존성을 명확히 유지하고 역할의 분리를 촉진합니다.

예를 들어, 여러분은 동일한 UI 구성 요소 세트를 사용하는 여러 웹 애플리케이션이 있거나, 서버 및 클라이언트 코드가 일부 동일한 유형 및 비즈니스 로직을 사용하는 경우가 있을 수 있습니다.

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

일반적으로 내부 패키지들은 소스 코드가 비공개이기 때문에 NPM에 이러한 내부 패키지를 게시하려는 의도가 없습니다. 또한 이러한 패키지는 이 저장소의 컨텍스트에서만 사용하게될 가능성이 높습니다.

TypeScript로 작업할 때는 이러한 공유 내부 패키지를 연결하는 두 가지 다른 패턴 중에서 선택할 수 있습니다.

## 1. 기존 빌드 패키지 접근 방식

이 패턴에서는 TS 코드를 JavaScript로 빌드하고 선택적으로 번들할 수 있습니다. 패키지 매니페스트를 정의하여 컴파일된 JS 출력을 가리키도록 설정합니다. 이 방식은 NPM에 패키지를 게시하려는 경우와 정확히 동일합니다.

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

이 접근 방식의 몇 가지 이점은 다음과 같습니다:

- 각 패키지는 개별적으로 빌드되며, Turborepo와 같은 도구를 사용하면 효율적으로 캐시할 수 있습니다.
- TypeScript 경로 별칭을 사용하기 쉽습니다. (기본적으로) 번들러가 결과물에서 이를 제거하기 때문입니다. 결과물은 노드 모듈에서만 가져오며 코드는 하나 이상의 독립된 파일로 결합됩니다.
- .js 및 /index.js 접미사와 같은 형식에서 필요한 엄격한 가져오기 규칙을 사용하지 않고도 ESM 모듈을 생성할 수 있습니다. 기존의 큰 CJS 코드베이스가 ESM 출력을 생성해야 하는 경우에 유용할 수 있습니다. 경로 별칭과 유사한 이유로 번들된 출력 파일에 상대적인 가져오기가 포함되지 않습니다.
- ESM 및 CJS와 같은 다양한 형식을 동시에 출력할 수 있습니다. 요즘은 ESM을 지원하지 않는 도구를 사용하는 경우에 주로 유용할 것입니다.

이 접근 방식의 몇 가지 단점은 다음과 같습니다:

- 더 많은 구성과 필요에 따라 도구를 사용해야 합니다.
- 번들러를 사용하는 경우 결과물을 소스 코드 및 IDE의 정의로 맵핑하는 데 약간의 과정을 거쳐야 할 수 있습니다.
- 개발 환경에서 실시간 코드 업데이트를 생성하는 감시 작업을 진행하기 위해 더 많은 구성이 필요합니다.

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

ESM, 번들링 및 감시 작업에 대한 이러한 포인트들에 대해 돌아올 거에요, 그러니 조금만 기다려 주세요.

## 2. "내부 패키지" 접근 방식

이 용어는 Turborepo의 Jared Palmer에 의해 만들어졌어요. 이 경우 빌드 단계를 생략하고, 패키지 매니페스트를 구성하여 Typescript 소스 파일을 직접 가리키게 해요.

이 접근 방식의 몇 가지 이점은 다음과 같아요:

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

- 구성이 거의 없어 따르기 쉽습니다.
- Next.js 같은 개발 서버를 사용하는 환경에 대한 기본적인 실시간 코드 업데이트
- 소스 파일 및 유형에 대한 기본 IDE 이동 정의

이 방법의 일부 단점은:

- 대규모 저장소에 대해 효율적이지 않습니다. 컴파일 및 번들링을 소비 환경에 남겨 두면 일부 패키지가 변경될 때 모든 것이 다시 빌드되어야 합니다. Turborepo는 중간 결과를 캐시할 수 없기 때문에 빌드 시간이 증가할 것입니다.
- TypeScript 경로 별명을 사용하려면 각 패키지에 대해 고유한 별칭을 구성해야 합니다. 그렇지 않으면 컴파일러가 혼란스러워집니다. 저는 별칭을 사용하는 것을 좋아하지만 내부 패키지에는 깊게 중첩된 파일 구조가 아니기 때문에 필수적이지 않다고 생각합니다.
- 패키지를 NPM에 발행할 수 없습니다. 왜냐하면 매니페스트가 TypeScript와 번들러를 가정하기 때문입니다.

이러한 일부 단점에 대해 Turborepo 블로그 게시물에서 논의되기도 합니다.

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

## 내 선호도

현재 내부 패키지를 모두 빌드하는 것을 선호합니다. 이렇게 하면 확장 문제 없이 확장이 가능하기 때문에 좋아합니다. 그러나 복잡성을 줄일 수있는 경우에는 좋아합니다. 그래서 이 부분은 변할 수 있습니다. 보일러플레이트에는 두 가지 접근 방식이 모두 테스트에 포함되어 있습니다.

하나의 프로젝트에서 내부 패키지를 빌드 패키지로 사용하여 비공개로 NPM에 발행하여 동일한 회사 내의 다른 저장소와 공유합니다.

# ES Modules

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

자바스크립트 생태계의 많은 사람들이 CommonJS 모듈에서 현대 ES 모듈 형식으로 전환하려는 노력에서 고통과 좌절을 경험했습니다. CommonJS 모듈은 Node.js를 위해 고안되었지만 이제는 자바스크립트 표준의 일부인 현대적인 ES 모듈 형식으로의 전환이 필요해 보입니다.

ESM 및 전환에 대한 여러분의 의견이 무엇이든, 이 형식이 CJS보다 우수하다는 데에는 동의할 수 있을 것이며, 가능하면 빨리 이를 채용해보아야 할 것이라 생각합니다.

저의 개인적인 좌절은 대부분 이해 부족에서 왔다고 생각하며, 결국에는 몇 가지 기본 원칙을 이해하면 현대적인 도구들과의 통합이 복잡하지 않다는 것을 느꼈습니다.

몇 년 전에 비슷한 글을 읽었더라면, 훨씬 많은 시간과 좌절을 절약할 수 있었을 텐데요. 거의 모든 걸 이해하기 까지 시간이 많이 걸린 것 같은데, 부적합한 리소스를 찾은 거나 마찬가지였습니다.

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

## 당신의 TypeScript 코드가 CJS를 출력할 수 있습니다

약간은 당연해 보이지만, 모두가 이를 인식하고 있는 것은 아닙니다. TypeScript 빌드 과정의 출력에 require 문이 포함되어 있다면, 출력 대상이 ESM이 아님을 의미합니다.

TypeScript 소스에서 import/export 문을 사용한다고 해서 ESM 호환 코드를 작성 중이라고 가정하는 것은 잘못된 판단일 수 있습니다.

에디터와 컴파일러는 경고 없이 ESM 모듈을 가져올 수 있게 허용하지만, CJS 출력에서는 런타임 오류를 발생시킬 수 있습니다.

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

## CJS는 상위 레벨에서 ESM을 가져올 수 없습니다

CJS 모듈은 동기적이고, ESM 모듈은 비동기적이기 때문에 CJS에서 상위 레벨에서 ESM 모듈을 직접 가져올 수 없습니다.

CJS 코드에서 ESM 모듈을 가져와야 하는 경우 다음과 같이 동적 임포트를 사용해야 합니다:

```js
const someEsModule = await import from “some-es-module”
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

하지만 CJS 모듈은 최상위 await 문을 가질 수 없기 때문에 다음과 같이 다른 async 함수 내부에서만 실행할 수 있습니다:

```js
async function useSomeModule() {
  const someEsModule = await import from "some-es-module";
  someEsModule.someFun()
}
```

이전에 언급한 대로, 번들러와 TypeScript 컴파일러는 이러한 호환성 문제에 대해 경고하지 않으며 런타임에서만 오류가 발생할 수 있습니다.

참고로 Next.js에는 ESM을 변환해주는 transpilePackages 설정이 있습니다. 다른 현대적인 프론트엔드 프레임워크에도 비슷한 기능이 있을 것으로 예상되지만 이 편의성을 제공하는 서버 프레임워크에 대해서는 알려진 바가 없습니다.

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

## ESM는 CJS에서 가져올 수 있습니다

이것은 문제가 될 것이 없습니다. 왜냐하면 동기적 모듈을 비동기적 컨텍스트에서 가져오는 것이기 때문입니다. 이는 비동기 함수를 사용하는 방법과 유사한 메타모델입니다.

가끔 가져온 CJS 모듈이 기본 내보내기를 얻지 못하고 .default를 사용해야 하는 상황에 직면하는 경우가 있었습니다. 그러나 이는 흔한 일은 아니며 그 원인을 규명하지 못해서 일단 주의해두겠습니다.

## 동적 가져오기는 빌드 도구에 의해 대체될 수 있습니다

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

위에서 설명한대로 동적 가져오기를 사용하고 CJS 대상으로 컴파일하는 경우 도구 체인이 이러한 가져오기를 일반적인 require 문으로 변환할 수 있으므로 여전히 ERR_REQUIRE_ESM런타임 오류와 같은 결과를 얻을 수 있습니다.

firebase-tools 저장소에서 Webpack에 대한 해결책을 찾을 수 있으니 필요하면 다른 번들러에 대해 비슷한 작업을 할 수 있을지도 모릅니다.

## 상대적인 가져오기 경로에서 JS 확장자

ESM은 CJS보다 엄격합니다. 가져올 파일을 추측하려 하지 않으며 이러한 이유로 모든 상대적인 가져오기에 파일 확장자를 추가해야 합니다. 또한 디렉토리를 해당 색인 파일로 해석하지 않습니다.

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

번들러를 사용하면 TS 코드에 확장자가 생략되어 있어도 ESM을 출력하도록 지시할 수 있지만 저는 개인적으로 지금은 코드를 ESM으로 작성하는 것을 선호합니다.

VSCode에서는 아래 설정을 사용하여 수입문에 확장자를 추가하고 있습니다. 대부분의 수입문이 자동으로 이뤄지기 때문에 보통 제가 확장자를 직접 추가하지는 않습니다.

```js
"typescript.preferences.importModuleSpecifier": "shortest",
"javascript.preferences.importModuleSpecifierEnding": "js",
```

## .ts 접미사 사용하기

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

만약 당신이 편집기에서 타입스크립트 코드를 가리키는 import 경로에 .js 확장자를 사용하는 것이 조금 이상하다고 생각한다면, 해결책이 있다는 것을 알아두세요. moduleResolution을 bundler로 설정하면 .ts 확장자를 사용할 수 있게 됩니다.

이 아이디어는 현대적인 번들러들이 정확하게 해석하고 유효한 ESM 코드를 출력하는 방법을 알고 있다는 것입니다. 미래에는 타입스크립트가 자바스크립트의 다음 세대가 될 수도 있기 때문에, 코드를 가져오는 정상적인 방법이 될 수도 있습니다.

하지만 설정 값이 시사하는 대로 번들러를 사용해야 한다는 것에 주의해야 합니다. 타입스크립트 컴파일러는 자신의 출력물을 작성할 때 import 경로를 변경하지 않으며, 경로 별칭을 해결해주지도 않는다는 것과 같은 이유로 그렇습니다.

더 많은 정보를 원하시면 여기를 참고하세요.

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

## ESM 모든 것

ESM은 미래이며 CJS와 쉽게 호환되지만 그 반대는 성립되지 않기 때문에 mono-ts의 모든 패키지는 ES 모듈로 되어 있습니다. 필요에 의해 CJS에 명시적으로 고정된 몇 개의 개별 파일만 있습니다.

# 패키지를 격리하여 배포

## Docker

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

도커 이미지에 대한 Turborepo의 멋진 솔루션이 있습니다. 해당 솔루션은 패키지와 내부 종속성을 복사하고 정리하여 Docker 및 캐싱 레이어를 사용하기에 더 적합하게 만듭니다.

## Firebase

내 프로젝트는 현재 모노 레포를 지원하지 않는 플랫폼에 코드를 배포합니다. Firebase Functions 배포 명령은 NPM 패키지와 유사한 자체 포함 디렉토리를 업로드하고, 그 후에 패키지 설치를 실행하고 매니페스트에 선언된 엔트리 포인트를 실행하는 것을 원합니다.

만약 당신의 코드가 모노 레포에 존재하고 내부 공유 패키지를 사용한다면, 이 작업은 쉽지 않습니다. 사람들은 이 문제를 해결하기 위해 다양한 해킹과 스크립트를 활용해왔지만, 우아한 해결책은 존재하지 않았습니다.

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

내 프로젝트가 크기 때문에 Firebase 배포를 개별 서비스로 나누는 것을 선호합니다. 이렇게 하면 코드 조직화와 배포, 콜드 스타트 시간을 더 개선할 수 있습니다.

Firebase에 대한 도전 과제와 나중에 만든 일반적인 솔루션에 대해 설명한 별도의 기사를 작성했습니다.

분리 프로세스는 대상 패키지를 새로운 격리된 패키지로 변환하고 해당 루트를 갖습니다. 그런 다음 내부 종속성을 복사하고 전용 락 파일을 생성합니다. 이것은 Turborepo 방법보다 더 격렬한 가지치기 형태이며, NPM에 발행되었다면 패키지의 일부가 되었을 파일과 구조만을 출력합니다.

또한 여러 패키지에서 Firebase로 배포할 수 있게 합니다! 💅

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

# IDE Go-To-Definition

모노레포 설정에서 IDE에서 원하는 두 가지 중요한 점이 있습니다:

- 공유 패키지에서 가져온 코드(함수 또는 클래스와 같은)를 클릭할 때, 편집기가 빌드나 번들 출력이 아니라 원본 Typescript 파일로 이동하길 원합니다.
- 공유 패키지에서 가져온 타입을 클릭할 때, 편집기가 생성된 d.ts 출력 파일이 아닌 원본 타입 정의로 이동하길 원합니다.

이전에 설명한 "내부 패키지" 전략을 사용한다면, 이러한 사항들은 기본적으로 작동합니다. 왜냐하면 패키지 매니페스트가 소스 파일로 직접 링크되기 때문입니다.

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

만약 여러분의 패키지를 빌드하거나 번들링한다면, 소스 맵 파일 .js.map 및 유형 정의 맵 파일 .d.ts.map을 통해 이를 니기능을 달성할 수 있습니다.

이를 달성하기 위해서는 여러분이 사용하는 번들러에 따라 추가적인 작업이 필요할 수도 있습니다.

저는 현재 tsup을 사용하고 있습니다. 제가 필요한 것에 가장 적합한 것으로 보이지만, 작성 시점에서는 자체적으로 모든 것을 생성할 수 없다는 것 같습니다.

## 문제

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

"tsup"에 .d.ts 파일을 생성하라고 지시할 수는 있으나, 이러한 파일들은 번들 된 출력을 기반으로 하게 될 것이며, 그런 이유 때문에 "tsup"에서 .d.ts.map 파일을 생성할 수 있는 옵션을 제공하지 않는 것이라고 가정합니다.

## 해결책

우리가 원하는 출력물을 얻기 위해서는, "tsup"에 소스 맵 파일만 출력하도록 지시하고, 번들된 소스 외에 다른 건 무시하도록 할 수 있습니다. 그런 다음 tsc를 사용하여 타입 정의 파일과 그 맵 파일을 동일한 출력 디렉토리에 출력하도록 할 수 있습니다.

명령어는 다음과 같이 보일 것입니다: tsup && tsc --emitDeclarationOnly

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

`--declaration` 플래그를 사용하여 tsc가 타입 선언만을 생성하고 Javascript 코드를 생성하지 않도록 지시할 수 있습니다. 그리고 `tsconfig`에서 `declaration` 및 `declarationMap`을 true로 설정하거나 이를 추가 플래그로 전달하면 원하는 출력물을 얻을 수 있습니다.

타입 파일은 번들된 파일 구조와 일치하지 않지만 여전히 원본 소스 구조를 반영합니다. 다행히도 이는 편집기에는 문제가 되지 않습니다. 편집기는 모든 타입 파일을 찾을 수 있고 각 파일에는 해당 맵이 있어 소스 코드에서 원래 타입 정의로 쉽게 돌아갈 수 있습니다.

# 실시간 코드 업데이트

이전에 언급했듯이 "내부 패키지" 접근 방식을 사용하면 개발 서버를 기본으로 실행하는 환경에서는 실시간 코드 업데이트를 얻을 가능성이 높지만 Javascript로 빌드하거나 번들로 묶은 패키지의 경우 일종의 감시 작업을 사용해야 합니다.

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

안타깝지만 현재 Turborepo에는 파일 변경을 감지하는 메커니즘이 포함되어 있지 않습니다. 그러나 이 문제에 접근하는 두 가지 방법에 대해 이야기해 보겠습니다.

## 번들된 패키지에 대한 병렬 감시 작업 사용

이전 섹션에서 설명한 대로 번들화된 내부 패키지는 자바스크립트 및 유형 선언과 맵 파일을 생성하는 두 개의 별도 명령이 필요할 수 있습니다.

이러한 명령을 순차적으로 실행할 수는 없습니다. 왜냐하면 첫 번째 명령에 감시 작업을 추가하면 해당 명령은 실행을 완료하지 않기 때문입니다. 따라서 두 명령을 병렬로 실행해야 합니다.

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

내가 아는 가장 간단한 해결책은 npm-run-all을 사용하는 것이고, 당신의 패키지 매니페스트 스크립트는 다음과 같이 보일 수 있어요:

```js
"scripts": {
    "bundle": "tsup-node",
    "bundle:watch": "tsup-node --watch",
    "type:gen": "tsc --emitDeclarationOnly",
    "type:gen:watch": "tsc --emitDeclarationOnly --watch",
    "type:check": "tsc --noEmit",
    "build": "run-p bundle type:gen",
    "dev": "run-p bundle:watch type:gen:watch",
    "clean": "del dist tsconfig.tsbuildinfo",
    "test": "vitest",
    "coverage": "vitest run --coverage ",
    "lint": "eslint \"**/*.ts*\""
  },
```

run-p 명령은 npm-run-all --parallel의 별칭이에요.

위 전략은 개발 작업들을 직접 시작하는 데 의지할 수 있다면 신뢰성 있게 작동할 수 있다고 생각해요. 각 패키지 개발 작업은 계속 되기 때문에 (종료되지 않으므로), turbo.json 파일에서 한 패키지의 개발 작업이 다른 작업에 의존한다고 정의할 수 없어요.

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

최상위 dev 작업을 트리거하면 모든 dev 작업이 동시에 시작됩니다. 그래서 여러분의 패키지의 현재 빌드 상태에 따라 문제가 발생할 수도 있고, 발생하지 않을 수도 있다고 가정합니다. 저에게는 확실한 것 같지 않아요.

지금은 제 프로젝트에는 충분해 보입니다.

## Turbowatch

npm-run-all 방식은 분명 임시 방편일 뿐 실질적인 해결책은 아닙니다. 따라서 복잡한 monorepo에는 충분하지 않을 수도 있습니다.

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

Turbowatch는 Turborepo의 누락된 시계 모드를 채우기 위해 설계되었습니다. 아직 직접 시도해보지 않아서 정확히 언행할 수는 없지만, 여러분이 한번 확인해보시길 권장합니다. Turborepo와 함께 사용할 수 있으며 독립적으로도 사용할 수 있습니다.

## Firebase Emulators

파이어베이스 에뮬레이터를 사용하면 Functions 및 Firestore 등의 코드를 배포하지 않고 실행하여 테스트할 수 있습니다. 분리 패키지 솔루션을 사용하는 경우에는 firebase.json의 source 필드를 분리된 출력에 지정하지만, 에뮬레이터는 동일한 진입점을 사용하므로 일반적으로 얻을 라이브 코드 업데이트가 손상되어 이는 주요 사항입니다.

이 문제를 해결하기 위해 firebase-tools 패키지를 포크하여 배포 시 함수로 실행되도록 분리된 것을 통합해야 했습니다. 이렇게 하면 일반적으로 소스 코드에 에뮬레이터를 실행합니다.

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

파이어베이스 툴의 기능에 큰 변화를 주지 않고, 사전 배포 단계를 추가하는 것 외에는 fork의 기능을 거의 사용하지 않아서 모든 프로젝트에서 안전하게 사용할 수 있다고 생각합니다. 제가 상위 저장소에서 정기적으로 변경 사항을 가져와 동일한 버전으로 업데이트를 게시하여 동기화를 유지할 것입니다.

파이어베이스 팀이 제 솔루션을 채택하기를 기대하거나 모노 리포를 지원할 수 있는 더 나은 방법을 찾기를 바라겠습니다.

# 결론

이렇게 매우 지루한 주제에 대해 이처럼 멋지게 계속 읽어주셔서 영광으로 생각하며, 웃음이나 유머가 전혀 없었던 점에도 이렇게 멀리까지 이어주셨다니 감사합니다.

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

당신이 이런 것을 스스로 파악해야 하는 것보다 더 편리하다고 생각해요, 그래서 가치 있는 것을 배웠으면 좋겠어요.

저는 시간이 흘러 이 기사를 업데이트하려고 노력할 거예요, 보일러플레이트 코드에 대해서도 그렇게 할 계획이에요. 만약 중요한 개선 제안이 있다면, 의견을 남기거나 GitHub 이슈를 만들어 주세요.
