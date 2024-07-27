---
title: "Vite와 함께 하는 동적 모듈 연맹"
description: ""
coverImage: "/assets/img/2024-05-15-DynamicModuleFederationwithVite_0.png"
date: 2024-05-15 10:38
ogImage: 
  url: /assets/img/2024-05-15-DynamicModuleFederationwithVite_0.png
tag: Tech
originalTitle: "Dynamic Module Federation with Vite"
link: "https://medium.com/@lester.sconyers/dynamic-module-federation-with-vite-0bce2bfcc517"
---


<img src="/assets/img/2024-05-15-DynamicModuleFederationwithVite_0.png" />

요즘은 Vite를 통해 React 마이크로 프론트엔드를 빌드하는 작업을 맡게 되었어요. 이 솔루션은 런타임에서 원격 모듈 URL을 동적으로 결정해야 했어요. 컴파일 시간이 아니라요.

동적 모듈 연합은 새로운 도전이 아니에요. 웹팩으로 여러 번 구현되어 왔기 때문에 Vite로도 이를 하는 것이 더 쉬울 것이라고 생각했어요. 그러나 이 기능이 지원되지 않거나 문서화되지 않았다는 것에 놀랐어요.

몇 일 동안 검색한 끝에 좋은 긴 GitHub 토론을 발견했는데 막다른 곳처럼 보였어요. 그렇지만 흥미로워서 계속 읽다가 어쩌면 해결책이 있어요.



다이내믹 모듈 연합이 도움이 되는 여러 시나리오가 있습니다. 예를 들어, A/B 테스팅입니다. 집단에 영향을 주지 않고 일부 사용자를 위한 새 레이아웃을 테스트하고 싶은 경우를 상상해보세요. 이 작업을 수행하는 React 앱을 만들어 봅시다. 앞서 진행하고 싶은 사람들을 위해 작동하는 예제가 여기 있어요. https://github.com/lestersconyers/react-apps/tree/main/dynamic-module-federation

## 설정

이 예제에서는 호스트 앱과 A와 B의 2개의 원격 앱을 갖게 됩니다. 사용자가 사이트를 방문할 때, 어떤 원격 앱 콘텐츠를 표시할지 결정하기 위해 일부 최상급 로직을 사용할 것입니다.

- 보통처럼 원격 앱 모듈 연합을 설정합니다. Vite와 함께의 표준 모듈 연합은 상당히 잘 문서화되어 있으므로 인터넷을 중복하지는 않겠습니다. 다만 여기에 설정 파일이 있어요.



2. 호스트 앱의 App.tsx 파일에서 __federation__ 모듈에서 함수를 가져와주세요. 여기에서 마법이 일어납니다!

3. setRemote를 사용하여 url을 반환하는 프로미스를 만들고, getRemote를 사용하여 해당 프로미스를 반환하세요. 이 프로미스는 런타임 시에 해결됩니다.

4. 동적 원격 앱을 사용하세요.

5. 마지막으로 호스트 앱의 vite.config.ts 파일에 더미 원격 항목을 추가하여 런타임 오류를 피하세요.



모두 완료했습니다!