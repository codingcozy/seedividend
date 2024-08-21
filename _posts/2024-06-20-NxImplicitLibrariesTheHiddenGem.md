---
title: "Nx 암시적 라이브러리 숨겨진 보물 "
description: ""
coverImage: "/assets/img/2024-06-20-NxImplicitLibrariesTheHiddenGem_0.png"
date: 2024-06-20 01:19
ogImage:
  url: /assets/img/2024-06-20-NxImplicitLibrariesTheHiddenGem_0.png
tag: Tech
originalTitle: "Nx Implicit Libraries: The Hidden Gem 💎"
link: "https://medium.com/marmicode/nx-implicit-libraries-the-hidden-gem-d965d5118ecd"
isUpdated: true
---

Nx가 제공하는 엄청난 기능을 활용하기 위해, 여러 라이브러리로 애플리케이션을 분할하는 것이 일반적입니다. 사실, 애플리케이션을 라이브러리로 분리하는 것은 관심사와 경계를 명확히 분리하고, Nx의 캐싱, 그래프 및 병렬화 덕분에 빠른 작업 실행을 제공한다는 장점 중 하나입니다.

그러나 여러 라이브러리를 만들면 각 라이브러리 사이에 일부 중복된 구성이 있음을 알 수 있을 것입니다.

이러한 파일들은 작업 공간을 혼란스럽게 만들고 더 많은 라이브러리를 생성하는 것을 꺼리게 할 수 있습니다.

다음은 최근 생성된 웹 라이브러리의 예시입니다:

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
libs
└── web
    └── catalog
        └── ui
            ├── README.md
            ├── src
            │   ├── index.ts
            │   └── lib
            │       ├── catalog.spec.ts
            │       └── catalog.ts
            ├── eslint.config.js
            ├── project.json
            ├── tsconfig.json
            ├── tsconfig.lib.json
            ├── tsconfig.spec.json
            ├── vite.config.ts
            └── vitest.config.ts
```

# 💎 프로젝트 크리스탈

버전 18부터 (사실 그 전부터 조금씩), Nx는 프로젝트 구조를 기반으로 작업을 추론할 수 있게 되었습니다. 이는 Nx 플러그인이 새로운 대상을 자동으로 추가할 수 있게 해줍니다(예: Vitest 구성 파일을 감지하면 적절한 구성으로 테스트 대상을 암시적으로 추가). 이것을 프로젝트 크리스탈이라고 합니다.

이를 통해 project.json 파일에서의 중복이 줄어들고 더 중앙 집중화된 구성이 가능해집니다.

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

## 프로젝트 크리스털 이전

![이미지](/assets/img/2024-06-20-NxImplicitLibrariesTheHiddenGem_0.png)

## 프로젝트 크리스털 이후

![이미지](/assets/img/2024-06-20-NxImplicitLibrariesTheHiddenGem_1.png)

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

# 🪄 암시적 라이브러리

프로젝트 Crystal은 프로젝트.json 파일에서 중복 구성을 줄입니다. 그런데 만약 프로젝트.json 파일을 완전히 제거할 수 있다면 어떨까요?

Nx 추론을 사용하면 Nx 그래프에 노드를 추가하거나 기존 노드를 보강하는 플러그인을 만들 수 있습니다 (예: 라이브러리 선언 노드 추가) 또는 기존 노드를 보강할 수도 있습니다. 프로젝트.json 파일에 남아 있는 정보는 프로젝트 구조에서 쉽게 유도할 수 있기 때문에 (관례가 있다고 가정할 때), 프로젝트.json 파일에서 남은 정보를 추론하고 이 파일을 간단히 제거할 수 있습니다.

![이미지](/assets/img/2024-06-20-NxImplicitLibrariesTheHiddenGem_2.png)

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

# 📂 공유 설정

프로젝트의 json 파일을 라이브러리에서 제거하는 데 성공했지만, eslint.config.js, tsconfig.json, vite.config.ts, vitest.config.ts 등 다른 구성 파일은 어떨까요?

이러한 파일들을 완전히 제거하는 것이 유혹적일 수 있지만, 다른 도구와 IDE(예: IDE lint 플러그인, WallabyJS와 같은 테스트 러너 등)에 여전히 유용하므로 그대로 두는 것이 좋습니다.

그러나 특정 그룹 내의 대부분의 라이브러리가 유사한 구성을 공유하기 때문에 이러한 구성 파일을 상위 그룹 디렉토리로 이동시킬 수 있습니다. 이전 예에서는 libs/web 디렉토리가 해당됩니다. 이렇게 하면 IDE 및 다른 도구가 여전히 구성을 인식할 수 있습니다.

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

# 🎯 암시적 라이브러리의 대상

프로젝트.json을 제거하고 구성 파일을 공유 구성으로 교체한 후, 대부분의 Nx 내장 플러그인은 대상 구성을 자동으로 추정할 수 없게 됩니다.

Implicit Libraries 플러그인을 수정하여 라이브러리를 생성하는 것뿐만 아니라 필요한 대상을 추가해야합니다.

<img src="/assets/img/2024-06-20-NxImplicitLibrariesTheHiddenGem_3.png" />

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

공유된 구성 및 대상을 제대로 설정하여 작업이 라이브러리 파일에서만 실행되도록 해야 합니다.

언급할 가치가 있는 점은 일부 도구(Eslint 및 Vitest 등)가 라이브러리의 루트를 현재 작업 디렉토리로 실행해야 합니다:

```js
{
  ...,
  targets: {
    lint: {
      command: 'eslint',
      options: {cwd: projectRoot},
      ...
    },
    ...
  }
}
```

# 🏷️ 추론된 태그

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

당신의 Implicit Libraries 플러그인은 당신의 프로젝트 구조와 규칙을 인식합니다. 이는 경계를 강제하거나 작업을 실행할 때 필터링하기 쉽도록 태그를 추가할 수 있습니다.

이는 라이브러리가 잘못 태그되는 것을 방지하고 프로젝트 구조가 라이브러리 카테고리를 반영하도록 보장합니다.

![Implicit Libraries](/assets/img/2024-06-20-NxImplicitLibrariesTheHiddenGem_4.png)

# 🏗️ Implicit Libraries Generators

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

생성기가 Implicit Libraries에 대해 쓸모없어 보일 수 있지만, tsconfig.base.json의 경로를 업데이트하는 데 사용될 수 있어 유용합니다. 개발자에게 올바른 카테고리(예: 플랫폼, 범위, 유형)를 제공하여 유효한 라이브러리 경로를 생성할 수 있습니다.

# 🧩 도전과 주의할 점

Implicit Libraries는 워크스페이스의 구성 파일 수를 줄이고 개발자가 더 많은 라이브러리를 생성하도록 장려하는 좋은 방법이지만, 다음과 같은 관련 도전에 대해 인식해야 합니다:

- 대부분의 Nx 내장 플러그인은 project.json 파일을 사용하여 대상 구성을 추론합니다. 이는 Implicit Libraries 플러그인을 수정하여 필요한 대상을 추가해야 한다는 것을 의미합니다.
- 대상 옵션을 사용하여 도구의 모든 옵션을 항상 쉽게 제어할 수 있는 것은 아닙니다. 예를 들어, 현재 Vitest 옵션에는 캐시 디렉토리를 재정의할 수 있는 방법이 없습니다. 해결책은 현재 작업 디렉토리를 사용하여 계산하는 것이지만, 이는 Nx 일괄 처리 모드와 간섭할 수 있습니다.

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

# 📖 Marmicode Cookbook

만약 Nx 및 다른 내용에 대해 더 알고 싶다면, Marmicode Cookbook을 확인해보세요!

![image](/assets/img/2024-06-20-NxImplicitLibrariesTheHiddenGem_5.png)

# 📚 추가 자료

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

- 💻 암시적 라이브러리 예제
- 📝 Nx 암시적 라이브러리 | Marmicode Cookbook
- 📝 Nx 프로젝트 크리스탈의 매력 발견하기 | 조나단 젤린
- 📺 프로젝트 크리스탈 | Nx
- 📺 Nx로 프로젝트 재정의: 새로운 추론 API 탐구 | 크레이거리 코폴라
