---
title: "마이크로 프론트엔드 Vite를 이용한 React용 모듈 페더레이션"
description: ""
coverImage: "/assets/img/2024-05-14-MicroFrontendModuleFederationwithViteforReact_0.png"
date: 2024-05-14 12:00
ogImage: 
  url: /assets/img/2024-05-14-MicroFrontendModuleFederationwithViteforReact_0.png
tag: Tech
originalTitle: "[Micro Frontend] Module Federation with Vite for React"
link: "https://medium.com/@nipunamarcus/micro-frontend-module-federation-with-vite-for-react-d2a8edad7f14"
---


![image](/assets/img/2024-05-14-MicroFrontendModuleFederationwithViteforReact_0.png)

백엔드 개발자를 위한 마이크로서비스 아키텍처 소개 후, 우리는 프론트엔드 애플리케이션을 위한 비슷한 아키텍처인 '마이크로 프론트엔드'를 개발하고자 합니다. 이 아키텍처는 마이크로서비스와 비슷한 이점과 단점을 가지고 있습니다. 이 아키텍처를 구현하는 방법 중 하나는 웹팩과 Vite와 같은 번들링 도구에서 제공되는 '모듈 페데레이션'입니다.

# 모듈 페데레이션이란?

모듈 페데레이션은 다양한 빌드가 하나의 애플리케이션을 구성하기 위해 함께 동작하는 개념입니다. 대부분의 경우 하나는 모든 다른 원격 구성 요소를 가져와 공유할 수 있도록 구축된 호스트 애플리케이션일 것입니다.



<img src="/assets/img/2024-05-14-MicroFrontendModuleFederationwithViteforReact_1.png" />

위의 도식은 작동 방식에 대한 간략한 설명을 보여줍니다. 호스트 애플리케이션에는 각 원격 컴포넌트에 대한 참조가 가져오기(import)나 Lazy Loaded 모듈로 포함됩니다. 각각 "홈페이지 앱"과 "결제 앱"이 호스팅된 원격 서버에서 공유 컴포넌트는 자바스크립트 모듈로 패키징되어 빌드된 자바스크립트 파일로써 공개적으로 사용 가능합니다(위의 예제에서 "homepage.js"와 "payment.js"로 확인됨). 그런 다음 호스트 애플리케이션에서 이러한 원격 컴포넌트들을 런타임에 자바스크립트 모듈로 가져와서 호스팅된 애플리케이션에서 컴포넌트로 처리됩니다.

모듈 페더레이션에 대한 더 자세한 내용은 여기서 확인할 수 있습니다.

# Vite에서 모듈 페더레이션을 사용하는 방법?



모듈 연합 기능을 얻으려면 Vite에 플러그인을 추가해야 합니다. 플러그인은 다음에서 찾을 수 있어요!

모듈 연합 기능을 얻기 위해 설정해야 할 최소한 두 군데가 항상 있어요. 하나는 공유할 컴포넌트가 있는 원격 어플리케이션에 적용돼야 해요. 이 곳에서 Vite에게 어떤 컴포넌트가 모듈로 공유될지, 빌드를 위한 진입점 이름이 무엇인지 알려주는 것이에요. 다른 설정은 모듈 연합을 사용할 호스트 어플리케이션에서 적용돼야 해요.

양쪽에 적용해야 할 구성은 다음과 같아요.

## 원격 어플리케이션 기본 구성



```js
export default defineConfig({
    plugins: [
        react(),
        federation({
             name: 'remotecomponent1',
             filename: 'remotecomponent1.js',
             exposes: {
                 './Button': './src/components/buttons.tsx'
             },
             shared: ['react', 'react-dom', 'react-router-dom'],
        }),
    ]
});
```

패더레이션 플러그인의 각 필드를 살펴봅시다.

Name: 공유 컴포넌트를 포함한 JavaScript 모듈에 할당할 모듈 이름입니다. 필수입니다. 자세한 내용은 여기에서 확인할 수 있습니다.

FileName: JavaScript 모듈의 진입 파일의 파일 이름입니다. 이 필드는 필수가 아니며, 기본값은 `remoteEntry.js`입니다. 자세한 내용은 여기에서 확인할 수 있습니다.



공개합니다: 원격 모듈로 공개할 구성 요소를 나열해야 하는 곳입니다. 자세한 내용은 여기에서 찾을 수 있습니다.

참고: 모든 노출 구성 요소는 리액트 구성 요소를 기본 내보내기로 내보내야 합니다. 그렇지 않으면 호스트 응용 프로그램 측에서 문제없이 통합할 수 없습니다. 리액트 구성 요소에서 개별 내보내기를 가져올만한 충분한 세부 정보가 없기 때문입니다.

공유: 이것은 조금 복잡한 속성입니다. 라이브러리와 관련하여 리액트와 같은 경우 모든 라이브러리 사이에서 상태를 처리하기 위해 모든 라이브러리 사이에서 하나의 인스턴스를 공유해야 합니다. 따라서 원격 모듈을 사용할 때 리액트 인스턴스를 원격 모듈과 호스트 응용프로그램 모두에서 사용하는 방법이 필요합니다. 이를 위해 호스트 측 구성 및 원격 응용 프로그램 측 구성에 이 속성을 추가하고 공유할 라이브러리 목록을 양쪽에 모두 추가하면 됩니다. 무엇을 공유할지 알리려면 이 속성을 사용하면 됩니다. 자세한 내용은 여기에서 확인할 수 있습니다.

# 호스트 응용 프로그램 기본 구성



호스트 애플리케이션을 구성하는 두 가지 방법이 있습니다. 하나는 원격 모듈 진입 파일의 URL을 직접 참조하는 것이고, 다른 하나는 동적으로 참조를 채우는 것입니다. 두 가지 모두 원격 측에 대한 속성 세트가 비슷하지만 remotes 속성을 제외하고는 동일한 Name과 Shared 속성이 있습니다. 이에 대한 설명은 다음과 같습니다.

Remotes: 원격 모듈의 진입 파일에 대한 참조를 보관합니다. 아래는 remotes 속성을 사용하는 예시입니다. 더 많은 세부 정보는 여기에서 찾을 수 있습니다.

## URL을 사용하여 원격 컴포넌트 가져오기

```js
export default defineConfig({
    plugins: [
        react(),
        federation({
             name: 'remotecomponent1',
             remotes: {
                 sharedComp: 'http://localhost:3001/assets/remotecomponent1.js',
             },
             shared: ['react', 'react-dom', 'react-router-dom'],
        }),
    ]
});
```



## URL을 동적으로 적용하여 Remote 컴포넌트 가져오기

```js
export default defineConfig({
    plugins: [
        react(),
        federation({
             name: 'remotecomponent1',
             remotes: [
                 {
                     sharedComp: {
                         external: `Promise.resolve(window.remoteURL)`,
                         from: 'vite',
                         externalType: 'promise',
                     },
                 },
             ],
             shared: ['react', 'react-dom', 'react-router-dom'],
        }),
    ]
});
```

외부: 원격 모듈의 주소가 될 수 있으며, 기본적으로 URL 또는 `string` 형식의 Promise일 수 있습니다. 더 많은 세부 정보는 여기에서 확인할 수 있습니다.

From: 원격 모듈이 어디에서 오는지 Vite가 알 수 있도록 하는 속성입니다. Webpack 또는 Vite에서 오는지 여부를 나타냅니다. 더 많은 세부 정보는 여기에서 확인할 수 있습니다.



ExternalType:는 외부 속성에서 사용할 외부 참조 유형을 설정합니다. 이 값은 url 또는 promise가 될 수 있습니다. 자세한 내용은 여기에서 확인할 수 있습니다.

참고: 여기 예제에서는 window.remoteURL을 사용하여 url을 가져오고 있습니다. 따라서 이것은 호스트 애플리케이션 시작 시 설정됩니다. 따라서 이 속성은 애플리케이션의 루트 구성 요소인 app.tsx 또는 다른 곳에 설정할 수 있습니다.

# 호스트 애플리케이션 내에서 원격 모듈 사용하는 방법

호스트 애플리케이션의 구성 요소에서 원격 모듈을 사용하는 두 가지 방법이 있습니다.



## 정적 임포트로 사용

리액트 컴포넌트 내에서 원격 모듈을 항상 정적 임포트할 수 있습니다.

```js
import Button from 'sharedComp/Button';

function App() {
  return (
    <div className="App">
      <div className="card">
        <Button />
      </div>
    </div>
  )
}

export default App;
```

이 방법도 좋지만 성능과 신뢰성 측면에서는 가장 유망한 방법은 아닙니다. 이 방법을 사용할 때 몇 가지 문제가 발생했습니다. 또한 이 방법을 사용하면 네트워크 수준의 문제를 처리하기 어렵습니다.



## 레이지로드된 모듈로

이것은 성능을 향상시키고 네트워크 문제를 처리하기 위해 레이지 로딩을 사용하여 원격 모듈을 로드하는 것입니다.

```js
import {lazy, Suspense} from 'react';
const Button = lazy(() => import('sharedComp/Button') as any);
function App() {
  return (
    <div className="App">
      <div className="card">
        <Suspense fallback={<div>Loading...</div>}>
          <Button />
        </Suspense>
      </div>
    </div>
  )
}

export default App;
```

이것은 원격 모듈을 사용하는 권장 방법으로, 이를 통해 네트워크 관련 문제와 성능 관련 문제를 처리할 수 있습니다.



알림: 만약 TypeScript를 사용하여 구현하고 싶다면, 소스 루트에 사용자 정의 타입 선언 파일을 추가하고 remotes 구성의 이름을 모듈로 추가해야 합니다. 파일 이름은 module.d.ts와 같이 지정할 수 있습니다.

```js
declare module 'sharedComp/*' {}
```

# 어플리케이션 실행

호스트 및 원격 어플리케이션을 실행할 때 몇 가지 주의할 점이 있습니다.



- 개발 중일 때 파일 서비스가 작동하려면 개발 모드 대신 미리보기 모드에서 원격 응용 프로그램 및 호스트 응용 프로그램을 실행해야합니다. 그렇지 않으면 파일이 제공되지 않기 때문에 모듈 페더레이션이 개발 모드에서 작동하지 않습니다.
- 또한 구성 요소를 공유할 때 javascript 모듈로 공유되고 응용 프로그램으로 공유되지 않는다는 것을 기억해야합니다. 응용 프로그램의 책임은 공유 모듈을 가져와 사용할 호스트 응용 프로그램에 의해 수행됩니다. 따라서 원격 구성 요소가 환경 변수나 기타 프로세스 관련 데이터를 사용하는 경우 호스트 응용 프로그램을 통해 원격 구성 요소로 전달될 것입니다. 따라서 원격 구성 요소를 사용할 때 항상 호스트 응용 프로그램이 해당 원격 구성 요소가 실행 중인 플랫폼이라는 것을 기억해주셔야 합니다. 외부 서버에서 실행 중이더라도 모듈 페더레이션을 사용할 때 전달되는 것은 파일만이며, 그 이상이 아닙니다. URL을 통해 원격 서버 측 응용 프로그램이 실행 중인 것을 볼 수는 있지만, 호스트 응용 프로그램 측에서는 단지 공유 javascript 모듈 진입 .js 파일을 참조하고 있을 뿐입니다. 따라서 원격 응용 프로그램 측에서 제공되더라도 호스트 응용 프로그램에서 모든 프로세스 관련 데이터를 제공하도록하십시오.

# 지금까지 배운 내용을 기반으로 기본 시나리오를 구현해 봅시다

여러 팀 간에 나눌 수 있는 다른 구성 요소가있는 사용 사례를 고려해 보겠습니다. E-Commerce 사이트를 시나리오로 삼아보겠습니다. 호스트로 E-Commerce 웹 앱을 개발하고 결제 구성 요소 및 홈페이지 구성 요소를 가져오겠습니다. 기본 시나리오로서 지금은 홈페이지 사용 사례만 구현해 보겠습니다.

나는 react 및 Vite에 대한 vite-plugin-federation 샘플에서 일부 코드를 빌려와 기본 애플리케이션을 가져 와서 모듈 페더레이션의 기본 사용 사례를 보여주는 다음 애플리케이션을 만들었습니다.



이 샘플에서는 웹사이트의 홈페이지를 원격 모듈로 개발했습니다. 이 모듈은 웹사이트(호스트 애플리케이션)에서 참조됩니다. 원격 모듈은 이 샘플(Main 브랜치)에서 정적 임포트로 가져오며, 원격 모듈은 정적 URL을 사용하여 참조됩니다.

따라서 원격 애플리케이션에서 'Button'과 'Home' 두 가지 컴포넌트를 노출시켰습니다. 그리고 이들을 'homepage.js'라는 entry 파일 이름을 가진 모듈에 추가했습니다.

이제 원격 애플리케이션에서 공유된 Home 컴포넌트를 살펴보겠습니다.

여기서 컴포넌트를 자세히 살펴보면 default로 노출된 것을 볼 수 있습니다. 공유된 컴포넌트를 default로 내보내는 것이 중요합니다. 컴포넌트를 default로 내보내지 않으면 호스트 애플리케이션 측에서 이를 참조하는 것이 어려워집니다.



호스트 애플리케이션 측에서 원격 모듈을 사용할 때 정적 임포트를 사용할 수 있습니다.

그리고 각 구성 요소를 가져온 후에는 일반 구성 요소와 마찬가지로 사용할 수 있습니다. 그러나 실제 프로덕션 환경에서는 원격 모듈이 시간에 따라 사용할 수 없을 수 있으므로 정적 임포트 사용 시 문제가 발생할 수 있습니다. 따라서 이러한 모듈에 대한 지연 로딩을 사용하면 네트워크 관련 문제를 처리할 때 도움이 됩니다. 이 브랜치의 지연 로딩 예제를 여기에서 찾을 수 있습니다.

지연 로딩을 사용하면 호스트 애플리케이션 측에서 원격 모듈을 사용하는 방법은 다음과 같습니다.

6행과 7행에서 원격 모듈에서 구성 요소를 지연 로딩했습니다. 그런 다음 Suspense 구성 요소 내에서 해당 구성 요소를 사용하여 비동기로로드하고 로드하는 데 시간이 걸리는 경우 대체 구성 요소를 적용했습니다.



테이블 태그를 Markdown 형식으로 변경해보세요.


Also when importing these from remote modules if you are using typescript remember to add a custom definition file for types. So here in my implementation I have added the custom.d.ts file. This file help you to get rid of the compilation error Module not found .

# Lets look in to implementing a bit advance scenario

Let’s add the payment component in to the story and make this a bit more complicated. Implementation for the advance scenario can be found in this branch.

This adds bit of complexity as this uses two different remote modules to load home and payment pages and also added the complexity of react routing on to the host app. Also in this sample the payment page is loaded using a dynamically set URL which is pushed during the runtime through window object.




호스트 애플리케이션 측에서 이 고급 사용 사례를 위한 Vite 구성은 다음과 같이 보입니다.

여기 구성에서는 결제 및 홈 원격 모듈을로드하기 위해 두 가지 다른 원격 구성을 추가했음을 볼 수 있습니다. 각각에 대해 두 가지 다른 외부 유형을 추가했습니다. 여기서 이전 예제에서 한 것처럼 홈 컴포넌트를 설정된 URL로 로드하고 있지만 결제 모듈을 로드하기 위해 외부 유형인 promise를 사용하고 있습니다. 이것은 빌드 단계에서 결제 리모트 모듈이 호스팅되는 URL이 무엇인지 모른다면 런타임에서 설정할 수 있어야 한다는 것을 보여주기 위해 사용하고 있습니다. 이는 애플리케이션을 호스팅하고 모든 URL을 런타임에 해결하는 경우 유용합니다. 그래서 라인 25에서 결제 리모트 모듈의 URL을 런타임 중에 promise를 사용하여 로드하는 아래 구성을 사용하고 있습니다.

```js
remotes: [
...
{
  payment: {
     external: 'Promise.resolve(window.paymentUrl)',
     from: 'vite',
     externalType: 'promise'
  },
}
...
```

그리고 호스트 애플리케이션의 App.tsx 컴포넌트 내부에 결제 리모트 모듈 URL을 window 객체에 설정하고, 홈 페이지 리모트 모듈에 추가하여 게으르게 로드하고 있습니다.



# 개발 중 발생할 수 있는 오류 및 해결 방법

- React, React Router Dom 및 다른 공유 라이브러리가 정의되지 않은 경우.

확인해야 할 사항

- 원격 앱 Vite 구성 또는 호스트 앱 Vite 구성의 공유 속성에 올바른 공유 라이브러리 목록이 추가되지 않은 경우입니다. 양쪽의 공유 목록이 동일해야 합니다.
- 원격 앱과 호스트 앱 간에 공유해야 하는 모든 것이 공유 목록에 추가되었는지 확인해보세요.



2. 원격 모듈을 로드하지 못했습니다.

![이미지](/assets/img/2024-05-14-MicroFrontendModuleFederationwithViteforReact_2.png)

확인해야 할 사항은 다음과 같습니다.

- 호스트 측 Vite 구성에서 각 원격 모듈 이름이 고유한지 확인하세요.
- 원격 측 Vite 구성에 올바른 컴포넌트 이름이 명시되어 있는지 확인하세요. 구성 내에서 컴포넌트 이름은 공유하려는 컴포넌트와 비슷해야 합니다.
- 원격 애플리케이션 측에서 컴포넌트가 기본으로 내보내졌는지 확인하세요.



3. 만약 모든 패키지가 monorepo 구조에 있다면 npm 호이스팅과 호스트 및 원격 모듈 간의 라이브러리 공유에 문제가 발생합니다.

이는 vite-plugin-federation 쪽에서 열린 이슈입니다. 그러나 모노리포 구조를 유지해야 한다면 위 샘플 프로젝트에서 한 것처럼 각 개별 애플리케이션에서 노드 모듈을 설치해야 합니다.

# 결론

- 원격 모듈을 가져오는 경우 정적 임포트 대신 지연 로딩을 사용하는 것이 좋습니다.
- 원격 호스팅 모듈의 URL을 알고 있다면 구성에서 정적 URL을 사용하고, 실행 중에 동적으로 URL을 해결해야 할 경우 URL을 해결하기 위해 프로미스 방법을 사용하세요.
- 문제없이 작동하도록 하려면 모든 것을 공유 컴포넌트에 추가해야 합니다. 예시: 원격 애플리케이션 루트 수준에서 적용한 프로바이더가 있는 경우 이를 공유 컴포넌트 내에 추가하거나 호스트 애플리케이션 측에서 프로바이더를 생성하여 해당 원격 컴포넌트를 감싸야 합니다(이 방법은 테스트하지 않았음)… 이것은 원격 모듈에 함께 패킹될 컴포넌트 및 해당에 필요한 임포트만 공유되기 때문입니다. 따라서 원격 앱의 루트 컴포넌트에 추가한 내용은 공유 컴포넌트 내에서 사용할 수 없습니다.
- 항상 호스트 및 원격 간에 vue 및 react와 같은 핵심 라이브러리를 공유하세요.