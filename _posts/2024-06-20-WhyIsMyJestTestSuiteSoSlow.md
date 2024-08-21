---
title: "제스트 테스트 스위트가 왜 느릴까요"
description: ""
coverImage: "/assets/img/2024-06-20-WhyIsMyJestTestSuiteSoSlow_0.png"
date: 2024-06-20 00:16
ogImage:
  url: /assets/img/2024-06-20-WhyIsMyJestTestSuiteSoSlow_0.png
tag: Tech
originalTitle: "Why Is My Jest Test Suite So Slow?"
link: "https://medium.com/bitsrc/why-is-my-jest-suite-so-slow-2a4859bb9ac0"
isUpdated: true
---

우리 팀은 새 애플리케이션을 개발하고 있습니다. 현재 유닛 테스트 240개를 수행하는데 46초가 소요됩니다. 아직까지는 이 시간이 과도하지는 않지만 테스트의 개수에 비례해 증가하고 있습니다. 몇 달 뒤면 테스트 실행에 몇 분이 걸릴 것으로 예상됩니다.

저희는 Jest가 빠른 성능으로 유명하다는 이유로 놀랐습니다. 그러나 Jest는 각 테스트가 40ms로 보고되었지만, 실제 각 테스트의 전체 실행 시간은 6초에 가깝다고 보고했습니다.

우리의 레거시 응용 프로그램 중 하나에 대한 통합 테스트는 더 나쁘게 나타난다. 단일 테스트에 약 35초가 소요됩니다. 이 시간은 집중력을 잃기 시작하는 구간을 넘어서고, 테스트를 개발하는 데 집중하기 어렵습니다. 각 실제 테스트는 약 1초가 소요되는데, 추가 시간이 어디로 가는지 궁금합니다.

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

지난 몇 주 동안 우리의 테스트 스위트가 왜 느린지 알아내기 위해 꽤 많은 시간을 삽질했었습니다. 불행히도 많은 아이디어들이 있었지만 거의 영향을 미치지 못했습니다. 게다가 우리의 테스트가 얼마나 빨라야 하는지에 대한 공감대조차 없는 것 같았습니다.

이 조사 결과로 단위 테스트의 소요 시간이 46초에서 13초로 줄었습니다. 통합 테스트도 유사한 개선을 보였는데, 그들의 시간은 35초에서 15초로 감소했습니다. 더욱 중요한 것은 저는 별도의 글에서 다루는 파이프라인의 개선을 보았습니다.

본 글에서는 가장 큰 차이를 만들어낸 개선 사항들을 공유하고, Jest의 성능을 저해하는 가능성 있는 잘못된 구성 및 남용에 대해 살펴보고자 합니다.

다음 예시는 간단해 보여서 빠르게 실행될 것 같지만, 우리의 테스트를 지연시키는 의외로 매우 흔한 구성이 숨어 있습니다.

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
// TestComponent.tsx
import { Button } from "@mui/material";

export const TestComponent = () => {
  return <Button>Hello World!</Button>;
};

// ComponentB.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { TestComponent } from "./TestComponent";

test("TestComponent", () => {
  render(<TestComponent />);
  expect(screen.getByText("Hello World!")).toBeInTheDocument();
});
```

그리고 테스트를 실행하면 다음과 같은 결과가 나옵니다:

```js
PASS src/components/testComponent/TestComponent.test.tsx
√ TestComponent - 1 (34 ms)
테스트 스위트: 통과 1, 총 1
테스트: 통과 1, 총 1
시간: 3.497 s
```

성능을 향상시키기 전에 Jest가 시간을 어디에 쓰고 있는지 이해해야 합니다. 테스트를 실행하는 데 34ms가 소요되는 것은 합리적이지만, 나머지 3.463초가 어디로 가는지 명확하지 않습니다.

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

Jest가 하는 일을 이해하지 않으면 잘못된 것을 최적화하려는 데 시간을 낭비할 수 있습니다. 예를 들어, TypeScript 컴파일 시간을 개선하기 위해 ts-jest나 babel-jest를 빠른 컴파일러로 교체하는 것이 일반적인 제안입니다.

그러나 Jest는 캐싱을 많이 활용하므로 첫 번째 실행 후에는 TypeScript 컴파일의 영향이 미미합니다.

## 1. Jest 시작 시간

테스트 실행을 시작할 때 Jest는 자체를 로드하고 테스트 환경(jest-environment-jsdom과 같은)을 로드해야 합니다. Jest는 파일 간 종속성 맵을 빌드하고 테스트 순서에 대한 일부 결정을 내리며 플러그인을 로드하고 추가 스레드를 실행합니다.

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

이 모든 작업은 대략 1초 정도 소요되지만, Jest에 완전히 달려있고 우리 애플리케이션과 크게 독립적이기 때문에 우리가 할 수 있는 것은 별로 없습니다. 또한, 이 설정은 쓰레드 당 한 번 발생하기 때문에 테스트와 테스트 파일 수가 증가함에 따라 확장되지 않습니다.

Jest가 시작될 때 무슨 작업을 하는지 궁금한 사람을 위해 해당 주제에 대한 자세한 비디오가 있습니다.

## 2. 캐시 채우기

애플리케이션에서 테스트를 처음 실행할 때, Jest는 캐시된 데이터를 활용할 수 없기 때문에 처음 실행할 때는 조금 더 오랜 시간이 걸릴 수 있습니다. Jest는 처음 실행할 때 대부분 시간을 TypeScript를 변환하는 데 사용합니다.

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

처음 실행 후 TypeScript 파일을 다시 변환해야 하는 파일이 소수 있을 수 있지만, 그 외에는 Jest는 주로 캐시된 값만 사용합니다. 캐시되지 않은 시나리오는 드물며 성능 최적화에 중요한 영향을 미치지 않습니다.

## 3. 테스트 파일 로드하기

Jest가 테스트 파일을 실행하기 전에 테스트 파일과 setupTests.ts에서 참조하는 모든 종속 항목을 로드하거나 모의(mock)해야 합니다. 이 단계는 테스트 실행 시간에 상당한 부하를 추가할 수 있으며, 테스트 성능을 크게 향상시킬 수 있는 부분입니다.

## 4. 실제 테스트 성능

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

테스트가 단 34밀리초만에 완료되었고, 여기서 더 최적화할 부분은 거의 없습니다.

다행히도, 위 작업 각각에 테스트하는 데 Jest가 얼마나 시간을 소요하는지 추측할 필요가 없습니다. Chrome의 DevTools를 사용하여 테스트 실행을 프로파일링할 수 있으며, 각 실행이 무엇을 하는지 확인할 수 있습니다.

먼저, 브라우저에서 chrome:inspect로 이동한 다음 "Node를 위한 전용 DevTools 열기"를 클릭하여 DevTools를 엽니다.

그런 다음, 터미널에서 다음 명령을 실행하세요: node --inspect-brk ./node_modules/jest/bin/jest.js src/components/testComponent/TestComponent.test.tsx --runInBand. Chrome에서 DevTools의 기본 중단점에 도달하면, 프로파일링 탭으로 이동하고 녹화를 시작하세요. 테스트가 완료되면, 프로파일러를 중지하고 녹화를 보고 "차트" 보기를 선택하세요.

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

![2024-06-20-WhyIsMyJestTestSuiteSoSlow_1](/assets/img/2024-06-20-WhyIsMyJestTestSuiteSoSlow_1.png)

이 차트를 해석할 때 몇 가지 주의할 점이 있습니다:

- 프로파일러의 존재로 인해 테스트의 성능이 약 30% 감소할 수 있습니다. 그러나 여전히 시간이 어디에 소비되는지를 비례적으로 잘 알 수 있습니다.
- 의존성에 처음 접속하는 첫 번째 파일은 항상 가장 나쁜 성능을 보일 것입니다. 왜냐하면 Jest가 해당 의존성을 캐시하기 때문에 같은 스레드에서 같은 실행 동안 다른 테스트에 대해서도 사용합니다. (다른 실행 간에는 캐시되지 않음). 만약 TestComponent를 포함한 두 번째 테스트 파일을 포함한다면 해당 의존성을 로드하는 시간이 절반 정도 소요됩니다. 그러나 여전히 줄일 수 있는 시간이며, 물론 개발 중에 한 번에 하나의 파일만 실행하는 흔한 시나리오에서 첫 실행 성능이 매우 중요합니다.

![2024-06-20-WhyIsMyJestTestSuiteSoSlow_2](/assets/img/2024-06-20-WhyIsMyJestTestSuiteSoSlow_2.png)

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

## Barrel 파일

지금 검사 자가 연결되어 있기 때문에, 우리는 문제를 즉시 볼 수 있습니다 — 테스트 파일을 로드하는 대부분의 시간이 @mui/material 라이브러리를 로드하는 데 걸립니다. 우리가 필요로 하는 버튼 구성 요소만 로드하는 대신에 Jest는 전체 라이브러리를 처리하고 있습니다.

![이미지](/assets/img/2024-06-20-WhyIsMyJestTestSuiteSoSlow_3.png)

왜 이게 문제인지 이해하려면 Barrel 파일에 대해 좀 더 알아야 합니다. Barrel 파일은 여러 내보내기를 한 파일에 모아둔 접근 방식으로, 보통 index.ts라고 불립니다.

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

컴포넌트의 외부 인터페이스를 제어하고 모듈의 내부 구조와 구현에 대해 걱정할 필요 없도록 barrel 파일을 사용합니다. 대부분의 라이브러리는 일반적으로 내보내는 모든 것을 포함한 루트 디렉토리에 있는 barrel 파일을 가지고 있습니다.

```js
// @mui-material/index.ts
export * from './Accordion';
export * from './Alert';
export * from './AppBar';
...
```

문제는 Jest가 우리가 가져오는 컴포넌트가 어디에 위치해 있는지 모르는 것입니다. barrel 파일은 그 사실을 의도적으로 숨겼습니다. 그래서 Jest가 barrel 파일에 도달하면 그 안에 참조된 모든 내보내기를 로드해야 합니다. 이 동작은 주로 @mui/material과 같은 대규모 라이브러리에 대해 신속하게 처리할 수 없습니다.

우리는 단순히 하나의 버튼을 찾으려고 하는데 수백 개의 추가적인 파일을 로드하게 됩니다.

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

다행히도, Jest가 Button 컴포넌트를 정확히 어디에서 찾아야 하는지 알 수 있도록 임포트 구조를 업데이트하여이 문제를 쉽게 해결할 수 있습니다.

```js
// 이전
import { Button } from "@mui/material";
// 이후
import Button from "@mui/material/Button";
```

![Jest 테스트 스위트가 왜 느린가요?](/assets/img/2024-06-20-WhyIsMyJestTestSuiteSoSlow_4.png)

eslint를 사용하여 미래에 더 이상 이러한 임포트가 추가되는 것을 막기 위해 구성 파일에 다음 규칙을 추가할 수 있습니다.

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
rules: {
    "no-restricted-imports": [
        "error",
        {
            "name": "@mui/material",
            "message": "대신 \"import foo from '@mui/material/foo'\"를 사용해주세요."
        }
    ]
}
```

여기서는 주로 @mui/material을 타겟으로 잡았어요. 인기 있는 대형 라이브러리라서요. 그래도, 최적화되지 않은 방식으로 import하는 라이브러리가 많았어요.

@mui/material-icons, lodash-es, 그리고 @mui-x-date-picker로부터 import를 수정해야 했고, 그 외에도 내부 라이브러리에서 import를 고쳐야 했어요. 이런 모든 import를 업데이트하는 데 걸리는 시간이 테스트 수행 시간의 약 50%를 절약할 수 있었어요.

## setupTests.ts 확인하기

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

jest.config.js 파일에서 setupFilesAfterEnv에 대해 설정된 파일로 가는 유혹이 있습니다. 이 파일은 모든 테스트 파일에 원하지 않는 일회성 및 특이 케이스가 모두 이어지는 경향이 있습니다.

이 파일이 모든 테스트보다 한 번 실행된다는 오해에서 비롯된 것으로 의심됩니다. 그러나 Jest가 각 테스트 파일을 제대로 격리할 수 있도록 이 파일의 내용은 실제로 각 테스트 파일 앞에서 실행됩니다.

setupTests.ts 파일의 영향을 확인하면 이전 단계에서의 flame 차트를 볼 수 있습니다. setupTests.ts에서 비싼 동작을 발견할 수 있으며, 해당 동작은 관련 테스트 파일로 다시 이동할 수 있습니다.

<img src="/assets/img/2024-06-20-WhyIsMyJestTestSuiteSoSlow_5.png" />

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

## 테스트 실행에서 타입 체크 제거하기

만약 우리가 테스트용으로 TypeScript를 컴파일하는 데 ts-jest를 사용하고 있다면, 해당 도구의 기본 동작은 테스트 실행이 TypeScript 컴파일러의 타입 체크도 함께 실행하는 것입니다.

이 동작은 TypeScript 컴파일러가 이미 빌드 과정 중에 그 역할을 수행하고 있기 때문에 중복됩니다. 이 추가적인 체크를 포함시키면 테스트 실행에 훨씬 더 많은 시간이 소요되는데, 특히 Jest가 별도로 TypeScript 컴파일러를 켜야 할 필요가 없는 경우입니다.

이 동작을 비활성화하려면 jest.config.js 파일에서 다음 속성을 설정할 수 있습니다. isolatedModules 속성에 대한 자세한 설명은 ts-jest 문서에 있습니다.

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
module.exports = {
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
        isolatedModules: false,
      },
    ],
  },
};
```

`isolatedModules` 설정에 대한 제 경험은 다양했어요. 이 설정을 업데이트하면 일부 레거시 애플리케이션에서 성능이 두 배로 향상되었지만, 작은 create-react-app 애플리케이션에서는 차이가 없었어요. 다시 한 번, 플레임 차트를 통해 이 추가 작업이 어떤 영향을 미치는지 확인할 수 있어요.

![WhyIsMyJestTestSuiteSoSlow_6](/assets/img/2024-06-20-WhyIsMyJestTestSuiteSoSlow_6.png)

## misconfigurations을 점검하기

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

성능 향상은 코드베이스를 개선하는 것만으로 이루어질 필요가 없어요. 책임 일부는 개발자들이 도구를 어떻게 활용하느냐에 달려 있답니다. package.json의 스크립트는 타이핑을 절약하고 복잡성을 숨기며, 프로젝트의 모든 사람들에게 최상의 CLI 구성을 공유하는 데 도움이 될 수 있어요.

하지만 이들에는 심각한 단점이 따라와요. 시간이 지남에 따라 팀원들이 공통 도구의 CLI를 어떻게 사용해야 하는지를 잊고 기존 스크립트가 이미 최적의 구성인 것으로 무조건 믿는 문제가 생길 수 있어요. 제가 참여한 대부분의 프로젝트에서 package.json의 스크립트에는 중요한 설정 오류가 몇 개 있었고, 많은 시간이 낭비되었어요.

사람들은 지속적 통합 파이프라인을 위해 원래 의도된 스크립트를 로컬 개발 환경에 맞는 스크립트로 혼동하기도 해요. 스크립트가 새로운 기능이나 도구의 변경에 대해 업데이트되지 않았을 수도 있고, 아니면 항상 잘못되었을 수도 있어요.

Jest의 경우 로컬 환경에서 실행하는 테스트에 피해야 할 몇 가지 플래그가 있어요:

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

- --maxWorkers=2라는 옵션은 Jest가 두 개의 스레드에서만 실행되도록 제한합니다. CI 빌드 에이전트에서 유용하지만 개발용 강력한 머신에서는 Jest를 5개 이상 또는 6개 이상의 스레드로 실행할 수 있습니다.
- --runInBand 옵션은 마찬가지로 Jest가 스레드를 전혀 사용하지 못하도록 합니다. Jest는 스레드가 필요없는 상황(예: 단일 테스트 파일 실행)을 스스로 인식할 수 있는 똑똑한 기능을 갖추고 있습니다.
- --no-cache, --cache=false, --clearCache 옵션은 Jest가 실행 사이에 데이터를 캐싱하는 것을 방지합니다. Jest 문서에 따르면 캐시를 비활성화하면 Jest가 적어도 두 배 이상 느려질 수 있습니다.
- --coverage 옵션은 대부분의 로컬 테스트 실행에서 코드 커버리지 보고서를 생성할 필요가 없습니다. 필요하지 않은 경우 이 단계를 건너뜁시켜 몇 초를 절약할 수 있습니다.

Jest에는 많은 설정이 있지만 대부분의 경우 기본 설정이 잘 작동할 것입니다. package.json 파일의 스크립트에 추가 플래그의 목적을 이해하는 것이 중요합니다.

## 기본값은 watch 모드 사용

로컬에서 애플리케이션을 실행할 때는 대부분 watch 모드를 사용하는 것으로 익숙하지만 테스트를 실행할 때는 그렇지 않을 수 있습니다. 빌드와 마찬가지로 테스트를 watch 모드에서 실행하면 다시 계산할 필요가 없는 많은 데이터를 우리의 도구에 저장할 수 있어 좋습니다.

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

Jest의 대부분의 지연은 테스트 실행보다는 시작 시간에 있습니다. watch 모드를 사용하면 이를 건너뛸 수 있습니다.

![2024-06-20-WhyIsMyJestTestSuiteSoSlow_7.png](/assets/img/2024-06-20-WhyIsMyJestTestSuiteSoSlow_7.png)

저는 개발자들이 IDE의 인터페이스 때문에 watch 모드의 장점을 충분히 활용하지 못하는 경우가 많다고 생각합니다.

테스트 파일을 작업할 때, 각 테스트 케이스 옆의 작은 녹색 "테스트 실행" 화살표를 클릭하여 테스트 실행을 시작하는 데 익숙합니다. 이들은 모든 테스트 실행하거나 일부 테스트를 실행하는 구문을 기억하려고 하는 것보다 편리하고 빠릅니다.

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

더 나아가서, 그들은 테스트 결과를 우리 IDE의 테스트 결과 패널 안에 표시해줍니다. 이는 콘솔에 덤핑된 로그보다 더 유용합니다.

![이미지](/assets/img/2024-06-20-WhyIsMyJestTestSuiteSoSlow_8.png)

WebStorm을 사용하면 "테스트 실행" 바로 가기에 사용되는 실행 구성을 업데이트할 수 있어, 이를 사용하여 워치 모드에서 테스트를 실행할 수 있습니다. Jest의 실행 템플릿도 업데이트하여 기본적으로 "테스트 실행" 바로 가기를 모두 워치 모드로 사용할 수 있습니다.

## 우리는 모든 테스트를 실행할 필요가 없습니다

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

개발자들이 특정 테스트 파일에서 작업 중이 아닐 경우 대부분 모든 테스트를 실행하는 경향이 있다는 점을 알아챘어요. 이 행동은 보통 Jest가 변경된 파일을 기반으로 실행해야 할 테스트 하위 집합을 구별할 수 있기 때문에 중복될 수 있어요.

테스트 스위트가 점점 커지면 전체 스위트를 실행하는 것은 시간이 낭비일 수 있어요. 하지만 이 기사의 조언이 정상적으로 통제를 도와줄 것을 희망합니다.

jest를 직접 호출하는 대신 jest --onlyChanged 또는 jest --changedSince을 사용하는 것이 좋아요. 100% 신뢰할 수 없지만, master 브랜치에 직접 커밋하지 않는 한 Jest가 테스트를 놓치는 예외적인 상황을 잡아내는 Continuous Integration 파이프라인이 있을 거에요.

![이미지](/assets/img/2024-06-20-WhyIsMyJestTestSuiteSoSlow_9.png)

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

테스트 스위트는 거의 정적이지 않습니다; 애플리케이션과 함께 점점 커집니다. 느린 테스트 스위트는 더 느려질 것입니다. 다행히도, 소량의 작업으로 각 테스트의 소요 시간을 절반 이상 줄일 수 있습니다. 이 작업은 지금 시간을 절약할 뿐만 아니라 테스트 스위트의 소요 시간과 품질 전반의 궤적을 바꿉니다.

# 레고처럼 재사용 가능한 구성 요소로 앱 빌드하기

![이미지 설명](/assets/img/2024-06-20-WhyIsMyJestTestSuiteSoSlow_10.png)

Bit의 오픈 소스 도구는 25만 명 이상의 개발자들이 구성 요소로 앱을 빌드할 수 있도록 도와줍니다.

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

어떤 UI, 기능 또는 페이지를 재사용 가능한 구성 요소로 만들어 여러 응용 프로그램 간에 공유하세요. 협업이 더 쉬워지고 빠르게 구축할 수 있어요.

→ 자세히 알아보기

앱을 구성 요소로 분할하여 응용 프로그램 개발을 쉽게 만들고 원하는 워크플로에 대한 최상의 경험을 누리세요:

## → 마이크로 프론트엔드

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

## → 디자인 시스템

## → 코드 공유 및 재사용

## → 모노 리포

# 더 알아보기
