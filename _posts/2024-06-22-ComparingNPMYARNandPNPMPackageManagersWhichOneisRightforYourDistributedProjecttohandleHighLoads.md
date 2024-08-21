---
title: "NPM, YARN, PNPM 패키지 매니저 비교 고부하 분산 프로젝트에 알맞은 선택은"
description: ""
coverImage: "/assets/img/2024-06-22-ComparingNPMYARNandPNPMPackageManagersWhichOneisRightforYourDistributedProjecttohandleHighLoads_0.png"
date: 2024-06-22 14:01
ogImage:
  url: /assets/img/2024-06-22-ComparingNPMYARNandPNPMPackageManagersWhichOneisRightforYourDistributedProjecttohandleHighLoads_0.png
tag: Tech
originalTitle: "Comparing NPM, YARN, and PNPM Package Managers: Which One is Right for Your Distributed Project to handle High Loads?"
link: "https://medium.com/@romanglushach/comparing-npm-yarn-and-pnpm-package-managers-which-one-is-right-for-your-distributed-project-to-4d7de2f0db8e"
isUpdated: true
---

![Image](/assets/img/2024-06-22-ComparingNPMYARNandPNPMPackageManagersWhichOneisRightforYourDistributedProjecttohandleHighLoads_0.png)

만약 Frontend 또는 Full Stack 개발자라면, 아마도 NPM, YARN, PNPM 중 하나 이상을 사용해 보았을 것입니다. 이들은 프로젝트의 의존성을 관리하는데 도움이 되는 도구인데요, 라이브러리, 프레임워크, 유틸리티와 같은 것들을 관리할 수 있습니다.

각 패키지 매니저에 대해 간단히 소개해 보겠습니다.

# NPM

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

NPM은 Node Package Manager의 약자입니다. JavaScript를 위한 기본이자 가장 인기 있는 패키지 매니저입니다. 2009년 Isaac Schlueter에 의해 만들어졌으며 Node.js 프로젝트에서 코드를 공유하고 재사용하는 방법으로 시작되었습니다. 그 이후로, 약 200만 개가 넘는 패키지로 구성된 거대한 저장소로 성장했습니다. 이 패키지는 프론트엔드와 백엔드 개발에 사용할 수 있습니다.

NPM은 간단하고 직관적인 명령줄 인터페이스를 제공하여 패키지를 설치, 업데이트, 제거 및 게시할 수 있습니다. 또한 npmjs.com이라는 웹사이트도 있어 패키지를 탐색, 검색 및 다운로드할 수 있습니다. NPM은 프로젝트의 메타데이터(이름, 버전, 의존성, 스크립트 등)을 저장하는 package.json이라는 파일을 사용합니다. 또한 설치된 패키지를 저장하는 node_modules라는 폴더를 생성합니다.

## 장점

- JavaScript 커뮤니티에서 널리 사용되며 지원되고 있습니다.
- 거의 모든 사용 사례에 대한 다양하고 방대한 패키지 컬렉션이 있습니다.
- 프로젝트를 사용자 정의하는 데 유용한 다양한 기능과 옵션이 있습니다.
- 종속성에서 취약점을 확인하는 내장된 보안 감사 도구가 있습니다.

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

## 단점

- 패키지를 설치하거나 업데이트할 때 느리고 비효율적일 수 있습니다.
- 중복된 또는 중첩된 종속성을 만들어 디스크 공간을 차지하고 충돌을 일으킬 수 있습니다.
- 다른 환경 간에 패키지 버전이 일관되지 않거나 오래된 경우가 있을 수 있습니다.

# YARN

YARN은 Yet Another Resource Negotiator의 약자입니다. 이는 2016년 페이스북, 구글, 익스포넌트, Tilde에 의해 만들어진 JavaScript의 대체 패키지 매니저입니다. 이는 NPM의 속도, 신뢰성 및 보안과 같은 몇 가지 문제와 한계를 해결하기 위해 설계되었습니다.

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

YARN은 NPM과 유사한 명령줄 인터페이스를 가지고 있지만 일부 차이점과 개선 사항이 있습니다. 그리고 NPM과 동일한 package.json 파일을 사용하지만 종속성의 정확한 버전을 잠그는 yarn.lock이라는 추가 파일이 있습니다. 또한 설치된 패키지를 저장하는 node_modules 폴더를 생성합니다.

## 장점

- 패키지를 설치하거나 업데이트할 때 NPM보다 빠르고 효율적입니다
- 중복이나 패키지의 중첩을 피하는 평면적인 종속성 구조를 사용합니다
- 로컬 캐시에서 패키지를 오프라인으로 설치할 수 있습니다
- 일관된 및 결정적인 버전의 패키지를 다른 환경에서 보장하는 더 나은 해결 알고리즘을 제공합니다

## 단점

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

- JavaScript 커뮤니티에서 NPM만큼 널리 사용되거나 지원되는 것은 아닙니다.
- 일부 NPM 패키지나 기능과 호환되지 않을 수 있습니다.
- 아직 수정되지 않거나 해결되지 않은 버그나 문제가 있을 수 있습니다.

# PNPM

PNPM은 Performant Node Package Manager의 약자입니다. 2016년 Zoltan Kochan에 의해 만들어진 JavaScript용 대체 패키지 관리자입니다. NPM과 YARN보다 빠르고 가벼우며 더 안전하도록 설계되었습니다.

PNPM은 NPM과 YARN과 유사한 명령줄 인터페이스를 가지고 있지만 일부 차이점과 개선점이 있습니다. 또한 NPM과 YARN과 동일한 package.json 파일을 사용하지만 의존성의 정확한 버전을 잠그는 pnpm-lock.yaml이라는 파일을 추가합니다. 또한 설치된 패키지를 저장하는 node_modules 폴더를 생성합니다.

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

## 장점

- 패키지 설치 또는 업데이트 시 NPM 및 YARN보다 빠르고 가벼움
- 글로벌 저장소에서 하드 링크 또는 심볼릭 링크를 사용하여 패키지를 node_modules 폴더에 복사하는 대신 연결함
- 패키지가 package.json 파일에 선언되지 않은 모듈에 액세스하는 것을 방지하는 엄격한 의존성 격리를 지원
- 종속성 내의 취약점을 확인하는 내장된 보안 감사 도구를 제공

## 단점

- 자바스크립트 커뮤니티에서 NPM 또는 YARN만큼 널리 사용되거나 지원되지 않음
- 일부 NPM 또는 YARN 패키지 또는 기능과 호환되지 않을 수 있음
- 아직 수정되지 않거나 해결되지 않은 버그나 문제가 있을 수 있음

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

# 비교

## 요약

## 성능

패키지 관리자의 가장 중요한 측면 중 하나는 프로젝트의 종속성을 빠르게 설치하고 업데이트하는 데 얼마나 빠른지입니다. 이는 개발 워크플로우 및 배포 프로세스에 영향을 줄 수 있습니다. NPM, YARN 및 PNPM의 성능을 측정하기 위해 약 1000개의 종속성이 포함된 샘플 프로젝트를 사용하여 벤치마크를 실행했습니다. 여기에 결과가 있습니다:

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

PNPM이 가장 빠른 패키지 매니저인 것을 보실 수 있습니다. 그 다음으로 YARN, 그리고 NPM이 따릅니다. PNPM은 "symlinked node_modules"라는 혁신적인 접근 방식을 사용하여 각 프로젝트로 패키지를 복사하는 대신 전역 저장소에 대한 하드 링크를 생성합니다. 이렇게 하면 디스크 공간을 절약하고 중복을 줄일 수 있습니다. YARN도 전역 캐시를 사용하지만 여전히 각 프로젝트로 패키지를 복사합니다. NPM은 캐싱 메커니즘을 사용하지 않기 때문에 매 번 패키지를 다운로드하고 설치합니다.

## 특징

패키지 매니저의 또 다른 측면은 개발자로서 더 쉽게 일할 수 있도록 어떤 기능을 제공하느냐입니다. 제가 중요하게 생각하는 기능 중 일부는 다음과 같습니다:

- Workspaces: 이 기능을 통해 단일 저장소 내에서 여러 하위 프로젝트를 관리하고 서로 의존성을 공유할 수 있습니다. 서로 의존하는 여러 패키지가 있는 monorepo 아키텍처에 유용합니다.
- Lockfiles: 이 기능은 레지스트리나 package.json 파일의 변경과 무관하게 매번 정확한 버전의 종속성이 설치되도록 보장합니다. 빌드의 재현성과 신뢰성을 향상시킵니다.
- Scripts: 이 기능을 사용하면 종속성을 설치하거나 업데이트하기 전이나 후에 컴파일, 테스트 또는 코드 린팅과 같은 사용자 지정 명령을 실행할 수 있습니다.
- Hooks: 이 기능을 통해 패키지 매니저의 라이프사이클의 특정 이벤트 중에 사용자 지정 로직을 실행할 수 있습니다. 종속성을 해결하거나 가져오거나 링크 또는 감사하는 경우가 여기에 해당합니다.
- Audit: 이 기능을 사용하면 종속성을 알려진 취약점이나 문제점을 확인하고 해결 방법에 대한 권장 사항을 받을 수 있습니다.

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

세 가지 패키지 관리자 모두 워크스페이스, 락파일, 스크립트 및 감사 기능을 지원합니다. 그러나 YARN과 PNPM만 후크를 지원하는데, 이를 통해 의존성 관리 프로세스를 유연하고 효율적으로 제어할 수 있습니다. 반면에 NPM과 YARN만 감사 기능을 지원하는데, 이를 통해 코드의 보안성과 품질을 향상시킬 수 있습니다.

## 호환성

패키지 관리자의 또 다른 측면은 프로젝트에서 사용할 수 있는 다른 도구 및 플랫폼과 얼마나 호환성이 있는지입니다. 호환성에 영향을 미치는 몇 가지 요소는 다음과 같습니다:

- 레지스트리: 이는 패키지 관리자가 의존성을 설치하고 업데이트하는 데 사용하는 패키지의 원본입니다. 가장 일반적인 레지스트리는 npmjs.com인데, 이는 JavaScript 및 Node.js용으로 2백만 개 이상의 패키지를 호스팅합니다. 그러나 다른 목적으로 사용할 수 있는 개인 또는 범위가 지정된 패키지와 같은 다른 레지스트리도 있을 수 있습니다.
- CLI: 이는 패키지 관리자가 상호 작용할 수 있도록 제공하는 명령줄 인터페이스입니다. 가장 일반적인 CLI는 Node.js와 함께 제공되는 npm-cli인데, 그러나 별도로 설치할 수 있도록 제공되는 standalone 도구인 yarn-cli나 일부 추가 기능을 추가하는 npm-cli 래퍼인 pnpm-cli와 같은 다른 CLI도 있을 수 있습니다.
- 생태계: 이는 패키지 관리자가 통합하거나 지원하는 도구 및 플랫폼 세트입니다. 웹팩, 바벨, eslint, 모카, 익스프레스 또는 AWS와 같은 도구들을 포함하는 Node.js 생태계가 가장 보편적인데, 그러나 browserify, rollup, typescript, prettier, jest, react, 또는 firebase와 같은 도구를 포함하는 브라우저 생태계와 같이 다른 목적으로 사용할 수 있는 다른 생태계도 있을 수 있습니다.

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

세 가지 패키지 관리자는 동일한 레지스트리와 생태계와 호환됩니다. 그러나 각각이 제공하는 다른 CLI를 통해 서로 다른 명령어와 옵션을 제공합니다. 예를 들어, YARN에는 작업 공간을 더 쉽게 관리할 수 있도록 해주는 "yarn workspaces"라는 명령어가 있습니다. PNPM에는 여러 하위 프로젝트에서 명령어를 한 번에 실행할 수 있도록 하는 "pnpm recursive"라는 명령어가 있습니다.

## 보안

비교할 패키지 관리자의 한 가지 더 중요한 측면은 얼마나 안전한지입니다. 보안은 종속성이 악의적인 코드나 취약점을 포함할 수 있어 프로젝트나 사용자를 위협할 수 있기 때문에 중요합니다. 패키지 관리자가 보안을 향상시키기 위해 취할 수 있는 조치 중 일부는 다음과 같습니다:

- 확인: 이는 설치하거나 업데이트할 패키지의 무결성과 신뢰성을 확인하는 과정입니다. 이를 통해 변조나 위조 공격을 예방할 수 있으며, 패키지를 악의적인 것으로 대체하거나 변경하는 것을 방지할 수 있습니다.
- 격리: 이는 설치하거나 업데이트하는 패키지의 액세스 및 권한을 제한하는 과정입니다. 이를 통해 특권 상승이나 코드 삽입 공격을 방지하여 시스템이나 사용자의 시스템에서 악의적인 코드가 실행되는 것을 방지할 수 있습니다.
- 해결: 이는 설치하거나 업데이트하는 패키지의 최상의 버전을 선택하는 과정입니다. 이를 통해 종속성 지옥이나 충돌 문제를 방지하여 프로젝트가 손상되거나 예기치 않게 동작하는 것을 방지할 수 있습니다.

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

세 가지 패키지 관리자는 모두 패키지의 무결성과 신뢰성을 보장하기 위한 형태의 확인을 사용합니다. 그러나 PNPM은 YARN(SHA-1)보다 더 강력한 알고리즘(SHA-512)을 사용하여 충돌 및 무차별 공격에 더 저항력을 가집니다. NPM과 YARN은 PNPM과 동일한 알고리즘(SHA-512)을 사용합니다.

그러나 PNPM만이 패키지의 액세스 및 권한을 제한하기 위해 격리를 사용합니다. 이를 위해 각 패키지마다 별도의 node_modules 폴더를 생성하고 심볼릭 링크를 사용하여 이들을 함께 연결합니다. 이렇게 함으로써 패키지가 명시적인 허가 없이 다른 패키지의 파일 또는 모듈에 액세스하거나 수정하는 것을 방지합니다. NPM과 YARN은 격리 메커니즘을 사용하지 않기 때문에 패키지가 node_modules 폴더 내의 모든 파일 또는 모듈에 액세스하거나 수정할 수 있습니다.

더불어, PNPM만이 엄격한 해상도를 사용하여 최상의 버전을 선택합니다. 이를 위해 package.json 파일에서 지정된 정확한 버전을 따르고 평평한 종속성 트리를 생성합니다. 이렇게 함으로써 중복되거나 호환되지 않는 버전의 패키지가 설치되거나 업데이트되는 것을 방지합니다. NPM과 YARN은 범위 또는 수정자에 따라 버전을 선택하는 semver 해상도를 사용하며 이로 인해 중복되거나 호환되지 않는 버전의 패키지가 설치되거나 업데이트 될 수 있습니다.

# 최적의 방법

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

- 프로젝트 요구 사항, 기호 및 제약 사항에 가장 적합한 패키지 관리자를 선택해보세요. 일반 해결책은 없으며, 각 패키지 관리자는 각자의 장단점을 가지고 있습니다. 필요하다면 다른 패키지 관리자로 전환할 수도 있습니다. 그러나 다른 패키지 관리자로 설치하기 전에 기존 node_modules 폴더와 lockfile을 삭제해야 합니다.
- 서로 다른 기기 및 환경에서 재현 가능한 설치를 보장하기 위해 로크 파일을 사용하세요. 로크 파일은 프로젝트가 의존하는 패키지의 정확한 버전과 출처를 기록한 파일로, 매번 일관되게 설치할 수 있도록 도와줍니다. NPM은 package-lock.json 파일을 사용하고, Yarn은 yarn.lock 파일을 사용하며, PNPM은 pnpm-lock.yaml 파일을 사용합니다. 이 파일들을 버전 관리 시스템에 커밋하고 패키지를 추가, 제거 또는 업데이트할 때마다 업데이트해야 합니다.
- 패키지 관리자의 동작과 설정을 구성하기 위해 .npmrc 파일을 사용하세요. .npmrc 파일은 패키지 관리자의 구성 옵션인 레지스트리 URL, 프록시 설정, 캐시 위치 등의 키-값 쌍을 포함하는 파일입니다. 이 파일을 프로젝트의 루트 디렉토리나 홈 디렉토리에 생성하여 구성을 전역적으로 또는 로컬적으로 적용할 수 있습니다. 또한 환경 변수나 명령줄 플래그를 사용하여 구성 옵션을 재정의할 수도 있습니다.
- 패키지 관리자와 자주 사용하는 작업 및 워크플로우를 자동화하기 위해 스크립트를 사용하세요. 스크립트는 "scripts" 속성 아래에 정의된 커맨드로, "start", "test", "build" 등과 같은 명령이 포함됩니다. 그런 다음 패키지 관리자의 CLI를 통해 이러한 스크립트를 실행할 수 있습니다. 예를 들어 npm run start, yarn start 또는 pnpm start와 같이 실행할 수 있습니다. 또한 pre- 및 post- 훅을 사용하여 다른 스크립트 전 또는 후에 스크립트를 실행할 수도 있습니다. 예를 들어 pretest 또는 postbuild와 같이 실행할 수 있습니다.
- 하나의 저장소 내에서 여러 프로젝트 또는 패키지를 관리하기 위해 워크스페이스를 사용하세요. 워크스페이스는 자체의 package.json 파일과 종속성을 포함하는 폴더로, 공통 node_modules 폴더와 root 수준의 lockfile을 공유합니다. 이렇게 하면 중복을 피하고 프로젝트 또는 패키지 간의 종속성 관리를 간소화할 수 있습니다. NPM은 버전 7부터 워크스페이스를 지원하고, Yarn은 버전 1부터 워크스페이스를 지원하며, PNPM은 버전 2부터 워크스페이스를 지원합니다.

# 결론

각 패키지 관리자에는 각자의 장단점이 있습니다.

NPM은 널리 사용되며 쉽지만 Yarn과 PNPM보다 느립니다.

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

야드는 NPM보다 더 빠르고 멋진 새로운 기능을 갖추고 있지만, NPM과 동일한 평평해진 node_modules 디렉토리를 사용합니다.

PNPM은 가장 빠르고 가장 디스크 공간을 효율적으로 사용하는 패키지 매니저지만, 일부 패키지와의 호환성 문제가 있을 수 있습니다.

프로젝트 요구사항에 가장 잘 맞는 패키지 매니저를 선택해보세요.
