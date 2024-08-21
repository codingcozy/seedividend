---
title: "모노레포 vs 비모노레포 어떤 것이 더 나은 선택일까"
description: ""
coverImage: "/assets/img/2024-06-23-MonorepoorNotMonorepo_0.png"
date: 2024-06-23 13:51
ogImage:
  url: /assets/img/2024-06-23-MonorepoorNotMonorepo_0.png
tag: Tech
originalTitle: "Monorepo or Not Monorepo"
link: "https://medium.com/@parsakhosravani/monorepo-or-not-monorepo-ba2a4e3b2b84"
isUpdated: true
---

소프트웨어 아키텍처를 결정할 때입니다. 점진적인 방식이 좋을까요, 아니면 처음부터 최상의 디자인을 찾아야 할까요? 우리는 모두 완벽을 추구합니다 — 최고의 라이브러리, 최고의 도구 등을. 하지만 “best”는 상대적인 개념이며, 선한 사람이 되는 것과 같이 주관적이며 상황에 따라 달라집니다. 좋은 소프트웨어를 설계할 때 여러 매개변수가 의사결정에 영향을 미치고 변화할 수 있다는 것을 염두에 두세요.

과도한 설계는 피해야 합니다. 더 가치 있는 것을 만들기 위해서는 더 많은 지식과 경험이 필요하지만, 아키텍처를 너무 복잡하게 만들지 않는 것이 중요합니다. 모노 레포와 이 방식을 채택할지 결정하는 데 고려해야 할 사항을 살펴봅시다.

# 모노 레포란 무엇인가요?

모노 레포는 “단일 저장소”를 줄인 용어로, 여러 프로젝트의 코드가 단일 저장소에 위치하는 버전 컨트롤 전략입니다. 이 방식은 각 프로젝트가 자체 저장소를 가지는 폴리 레포 모델과 대조됩니다.

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

# Monorepos의 장점

1. 통합된 코드베이스: Monorepo를 사용하면 모든 코드가 한 곳에 있어 다른 프로젝트 간에 코드를 쉽게 공유하고 재사용할 수 있습니다.
2. 단순화된 의존성 관리: 모든 프로젝트가 같은 저장소를 공유하기 때문에 의존성 관리가 더 간단해집니다.
3. 일관된 도구 및 구성: 단일 저장소를 통해 모든 프로젝트에서 도구와 구성을 일관되게 사용할 수 있습니다.
4. 더 나은 협업: Monorepo에서 작업하는 팀은 모든 프로젝트의 변경 사항을 볼 수 있어 소통과 협업이 개선됩니다.

# Monorepos의 도전과제

1. 확장성 문제: 코드베이스가 커지면 저장소가 다루기 어려워져 관리가 더 어려워질 수 있습니다.
2. 복잡한 빌드 프로세스: 한 부분의 변경이 다른 부분에 영향을 줄 수 있어 빌드 및 테스트가 더 복잡해질 수 있습니다.
3. 접근 제어: 액세스 및 권한 관리는 특히 여러 팀이 있는 대규모 조직에서 도전적일 수 있습니다.

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

코드 예제: TurboRepo를 이용한 단일저장소 설정

TurboRepo는 JavaScript 및 TypeScript 코드베이스를 위한 고성능 빌드 시스템으로, 단일 저장소에 이상적입니다. 다음은 기본적인 설정 방법입니다:

1. 설치:

```js
npx create-turbo@latest
cd my-turbo-repo
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

2. 애플리케이션과 패키지 추가하기:

```js
 npx turbo run create next-app apps/myapp
 npx turbo run create react-lib packages/mylib
```

3. 프로젝트 간 코드 공유하기:

```js
// packages/mylib/src/index.ts
export function greet(name: string) {
return `Hello, ${name}!`;
 }

// apps/myapp/pages/index.tsx
import { greet } from 'mylib';

const Home = () => {
 return <div>{greet(‘World’)}</div>;
 }

export default Home;
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

4. TurboRepo 구성:

```js
 // turbo.json
 {
   "pipeline": {
     "build": {
       "dependsOn": ["^build"],
       "outputs": ["dist/**"]
     },
     "lint": {},
     "test": {}
   }
 }
```

5. TurboRepo 실행:

```js
npx turbo run build
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

# 증분 빌드 및 캐싱

TurboRepo는 대규모 코드베이스에 효율적인 증분 빌드와 캐싱을 제공하여 뛰어납니다.

1. TurboRepo 캐싱:

sa

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

 // turbo.json
 {
   "pipeline": {
     "build": {
       "dependsOn": ["^build"],
       "outputs": ["dist/**"],
       "cache": true
     },
     "lint": {
       "cache": true
     },
     "test": {
       "cache": true
     }
   }
 }
```

## 단일 저장소(monorepo)를 사용해야 하는 경우

- 꽉 결합: 프로젝트가 빈번하게 코드를 공유하고 서로 강하게 결합되어 있는 경우, 단일 저장소(monorepo)는 의존성 관리와 통합을 간소화할 수 있습니다.
- 소규모부터 중간 규모의 팀: 의사소통이 간단한 작은 팀에서는 단일 저장소(monorepo)가 더 관리하기 쉬울 수 있습니다.
- 일관된 표준: 프로젝트 간 일관된 코딩 표준, 도구 및 관행을 유지하는 것이 우선시되는 경우.

## 단일 저장소(monorepo)를 피해야 하는 경우

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

- 대규모 다양한 팀: 서로 느슨하게 결합된 프로젝트에 참여하는 대규모 팀은 모노 레포를 사용하기 어려울 수 있습니다.
- 독립적인 배포: 프로젝트가 서로에게 영향을 미치지 않고 독립적으로 배포되어야 하는 경우, 폴리 레포가 더 적합할 수 있습니다.
- 확장성 고려: 코드베이스가 크게 성장할 것으로 예상된다면, 모노 레포가 그 규모를 처리할 수 있는지 고려해야 합니다.

# 결론

소프트웨어 아키텍처에서 모노 레포와 폴리 레포 중 어떤 것을 선택할지 결정하는 것은 중요한 결정입니다. 각 접근 방식의 장단점을 여러분의 특정 요구 사항과 맥락에 대비해 고려하는 것이 중요합니다. 요구 사항을 충족시키면서 솔루션을 가능한 한 간단하게 유지함으로써 과도한 엔지니어링을 피할 수 있습니다. 모노 레포를 선택하든 말든, 주요한 것은 유연하고 유지 가능하며 확장 가능한 아키텍처를 구축하는 것입니다.

글의 비전에 보다 잘 맞게 각 섹션을 조정하거나 확장해도 괜찮습니다!
