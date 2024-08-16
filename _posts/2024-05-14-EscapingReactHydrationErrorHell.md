---
title: "리액트 하이드레이션 오류 지옥 탈출하기"
description: ""
coverImage: "/assets/img/2024-05-14-EscapingReactHydrationErrorHell_0.png"
date: 2024-05-14 11:06
ogImage: 
  url: /assets/img/2024-05-14-EscapingReactHydrationErrorHell_0.png
tag: Tech
originalTitle: "Escaping React Hydration Error Hell"
link: "https://medium.com/@craigmorten/how-to-debug-react-hydration-errors-5627f67a6548"
isUpdated: true
---




# 소개

리액트 애플리케이션을 하이드레이션할 때 다음과 같은 오류 메시지가 표시되었을 수 있습니다:

![Error](/assets/img/2024-05-14-EscapingReactHydrationErrorHell_0.png)

이 오류는 서버 측에서 렌더링된 리액트 트리와 브라우저에서 처음 렌더링할 때 클라이언트 측에서 생성된 리액트 트리 간에 차이가 있는 경우 발생합니다. React는 이 둘 간의 차이를 조정할 수 없어서 트리의 UI 및 상호 작용을 제어할 수 없게 됩니다.



여기서는 일반적인 원인, 오류를 디버그하는 방법 및 수화 오류를 피하는 일반적인 해결책을 살펴보겠습니다.

# 원인

수화 오류의 일반적인 원인 몇 가지가 있습니다.

![2024-05-14-EscapingReactHydrationErrorHell_1.png](/assets/img/2024-05-14-EscapingReactHydrationErrorHell_1.png)



## 브라우저 감지 기반 렌더링

컴포넌트가 브라우저에서 렌더링되는지 또는 서버에서 렌더링되는지를 감지하는 로직이 있다면 주의가 필요합니다. 예를 들어:

```js
const isClient = typeof window !== "undefined";
```

다음 가짜 예시를 살펴봅시다:



```js
const IsomorphicContainer = () => {
  const isClient = typeof window !== "undefined";

  return isClient ? <ClientOnlyComponent /> : null;
};
```

여기서 `ClientOnlyComponent /`은 클라이언트 측에서만 사용할 수 있다고 가정합니다. 외부 스크립트와 통합할 때 이런 경우가 흔합니다. 아마도 클라이언트 측 GTM DataLayer 구성 구성 요소인 것 같습니다.

React는 세계의 이해가 동기화되지 않아 발생하는 이슈가 있습니다:

- 서버에서는 isClient 조건이 false로 평가되어 null 값이 렌더링됩니다.
- 수화하기 전 클라이언트 측에선 window가 정의되어 이 표현식이 true로 평가됩니다.
- 수화 후 함수형 컴포넌트가 처음 렌더링되면 `ClientOnlyComponent /`이 결과로 나오는데, 이는 서버 측에서 렌더링된 null 값과 맞지 않습니다.
- 이로 인해 수화 오류가 발생합니다.



## 브레이크포인트 감지 기반 렌더링

브라우저 감지 문제의 확장으로, 특정 브라우저 API의 결과에 따라 기능을 감지하고 조건부로 렌더링하려는 모든 구성 요소가 영향을 받을 수 있습니다. 예를 들어:

```js
const mediaQueryList = window?.matchMedia("(max-width: 768px)") ?? {};
```

다음 가짜 예제를 고려해 봅시다:



```js
import { useMediaQuery } from 'react-responsive';

const BreakpointVaryingCTA = ({ showModel }) => {
  const isMobileOrTablet = useMediaQuery({ maxWidth: 768 });

  return isMobileOrTablet ? <a href="/content">추가 정보</a> : <button type="button" onClick={showModel}>추가 정보</button>
};
```

여기에는 모바일 및 태블릿 장치에서 링크를 렌더링하고, 데스크톱 장치에서는 추가 정보를 위해 모달을 열고자 하는 강제로 설정된 설정이 있습니다.

서버 측에서 미디어 쿼리 후크는 폭이 768px 미만이 아니기 때문에 false로 평가됩니다. 사실, 서버 측에서는 뷰포트 개념이 전혀 없습니다!

클라이언트 측에서 데스크톱에서는 후크가 false로 해결되고 하이드레이션 매치를 얻을 수 있어 운이 좋습니다.




모바일에서 클라이언트 측에서 문제가 발생할 수 있어요. 후크는 true로 해결되고 첫 번째 렌더링은 앵커 요소가 되어 서버에 렌더링된 버튼과 일치하지 않아 오류가 발생합니다.

## 공백

수많은 수많은 습성의 수난과 번거로운 원인 중 하나로 수분상 software나 될 수 있어요. 서버 측에 렌더링된 내용과 클라이언트 측에 렌더링된 내용 사이의 공백 불일치가 발생할 때 오류가 발생하곤 해요.

일부 템플릿 리터럴을 사용하여 만들어진 문자열 보간 코드로 생성된 React 루트 요소의 두 가지 변형을 고려해보세요:



```js
<div id="root">${html}</div>

<div id="root">
  ${html}
</div>
```

후자의 예시는 React 트리 내용을 감싸는 새 줄과 루트 노드 간의 불일치로 인해 수분화 오류가 발생할 가능성이 있습니다:

```js
경고: <div>에서 텍스트 노드 " "을(를) 포함하는 서버 HTML을 기대하지 않았습니다.
```

이와 유사하게 응답 HTML의 공백을 제거하여 압축하면 비슷한 문제가 발생할 수 있습니다.



## 데이터 차이점

사용자에게 컴포넌트를 통해 반영되는 데이터가 서버 렌더링과 클라이언트 렌더링 사이에 시간이나 환경 때문에 다를 수 있다면, 이 또한 불일치를 초래할 수 있습니다.

이 문제의 가장 일반적인 형태는 타임스탬프를 렌더링하는 것입니다:

- 클라이언트 측 타임스탬프가 서버 측과 다르게 나타날 것이며 시간이 흐르기 때문입니다;
- 클라이언트보다 서버의 시간대가 다르다면, 시간대가 출력 값에 고려되지 않는다면 차이가 발생할 수 있습니다.



다른 예시로는 다음과 같은 것들이 있을 수 있습니다:

- 수분화 전에 검색한 API 데이터를 컴포넌트 안에 반영하는 것입니다. 예를 들어, 클라이언트에서 API 데이터를 새로 고치고 나서 수분화하면, 서버 측에서 렌더링한 이후에 API 데이터가 변경된 경우 일치하지 않을 수 있습니다.
- 서버와 클라이언트 모두에서 uuid 패키지를 사용하는 비결정적 ids를 사용하는 것 대신에, React 18 이후 버전을 사용하면 React.useId()를 사용해보세요.
- 문자 인코딩 차이 - 서버와 클라이언트가 일치하는지 확인하세요! 일반적으로 utf-8을 사용하는 것이 좋습니다.

## 잘못된 HTML

일부 요소는 다른 요소 안에 중첩될 수 없습니다. 예를 들어 `a` 요소 안에 다른 `a` 요소를 중첩할 수 없습니다.




![이미지](/assets/img/2024-05-14-EscapingReactHydrationErrorHell_2.png)

브라우저에 따라 이러한 부적절한 요소가 수화 전에 DOM에서 제거될 수 있으며, React가 수화하려고 할 때 불일치가 발생할 수 있습니다.

여기서 중요한 점은 유효한 HTML을 작성하는 것입니다!

## 제삼자의 간섭




알려진 몇 가지 시나리오에는 코드 외의 메커니즘이 서버 응답에 영향을 줄 수 있어 수분화 문제가 발생할 수 있습니다:

- 페이지 조작하는 브라우저 확장 프로그램 — React 이슈를 참조하세요.
- 클라우드 제공업체 / CDN이 HTML 응답을 조작하는 경우 — Cloudflare 문서를 참조하세요.
- 구글 크롬 번역 기능으로 페이지 조작하는 경우 — React 이슈를 참조하세요.
- iOS 형식 감지가 HTML 응답을 조작하는 경우 — NextJS 문서를 참조하세요.
- 수분화 이전에 페이지를 조작하는 조기 실행 타사 스크립트, 예: GTM, HotJar.

# 디버깅

그러면 수분화 경고의 근본 원인을 디버깅할 수 있는 몇 가지 방법을 살펴봅시다!



<img src="/assets/img/2024-05-14-EscapingReactHydrationErrorHell_3.png" />

## React 개발 빌드

React의 개발 빌드를 사용할 때는 개발 도구 콘솔에서 완전하지만 압축되지 않은 수분화 경고를 받을 수 있습니다. 이를 통해 문제가 발생한 구성 요소를 빠르게 식별할 수 있습니다.

거기서 알려진 수분화 오류 원인 중 일부와 구성 요소를 빠르게 매칭하여 문제를 해결할 수 있습니다.



현재 로컬에서 React를 개발 모드로 실행하면서 테스트 또는 프로덕션 환경 API와 통합할 수 없는 경우, 개발자 경험을 향상시키기 위해 팀에서 시간을 투자하는 것이 가치가 있을 수 있습니다.

## 복구 가능한 오류 로그

이 옵션들은 React 18 버전 이후를 사용한다고 가정합니다.

바닐라 React 애플리케이션



React 트리에 hydrateRoot()를 호출할 때 옵션으로 전달할 수 있는 세 번째 인수가 있습니다.

이 옵션 중 하나는 onRecoverableError이며, 이는 React가 오류에서 자동으로 복구할 때 호출할 콜백을 받습니다. 예를 들어 수분화 오류가 발생한 경우입니다.

이 콜백에 지표를 추가하여 문제를 로깅할 수 있도록 권장됩니다. 예를 들어 New Relic, Sentry, Datadog, Elastic RUM 등의 관측성 플랫폼에 이러한 문제를 기록할 수 있습니다.

여기에 예시 코드 조각이 있습니다:



```js
import { hydrateRoot } from 'react-dom/client';
import MyObservabilityPlatform from 'my-observability-platform';
import App from './App'
 
function onRecoverableError(error, errInfo) {
  let context = {};
 
  if (errInfo?.componentStack) {
     // 생성된 합성 오류를 사용하면 모니터링 서비스가 소스맵을 적용하여 스택 트레이스를 압축 해제하고 가독성 있게 만들 수 있습니다.
     const errorBoundaryError = new Error(error.message);
     errorBoundaryError.name = `React ErrorBoundary ${errorBoundaryError.name}`;
     errorBoundaryError.stack = errInfo.componentStack;
 
     error.cause = errorBoundaryError;
 
     context.componentStack = errInfo.componentStack;
  }
 
  MyObservabilityPlatform.captureException(error, { context })
}
 
const domNode = document.getElementById('root');
 
hydrateRoot(domNode, <App />, { onRecoverableError });
```

hydrateRoot() 옵션에 대한 추가 정보는 리액트 문서에서 확인할 수 있습니다.

NextJS 어플리케이션

NextJS를 사용할 때는 애플리케이션의 수화를 직접 호출할 필요가 없습니다. NextJS가 대신 수행해줍니다.



NextJS는 현재 hydrateRoot()에 onRecoverableError 옵션을 전달할 수 있는 기능을 제공하지 않습니다. 이 옵션을 노출하기 위한 시도에 대한 논의를 위해 https://github.com/vercel/next.js/discussions/36641을 참고하세요.

그러나 우리는 이 옵션을 수동으로 패치하여 로컬 및 프로덕션 환경에서 문제를 디버깅할 수 있습니다. 이를 위한 한 가지 방법은 Chrome 로컬 오버라이드를 사용하는 것입니다:

- Chrome에서 수분화 오류가 발생하는 페이지로 이동하고 개발자 도구를 엽니다.
- Sources 탭을 열고 왼쪽 메뉴에서 Page 탭을 선택합니다. 자산 트리에서 오른쪽 클릭하여 모든 파일에서 검색 옵션을 표시합니다.
- 열리는 창에서 onRecoverableError 용어를 검색하여 모든 코드 일치 항목을 확인합니다.
- 코드 중 하나는 this.onRecoverableError = a;와 유사해야 합니다. 이 코드를 수정하여 오류와 errorInfo 인수를 모두 콘솔에 기록하도록 수정할 것입니다.
- 파일 탭에서 오른쪽 클릭하여 Override Content 옵션을 클릭합니다. 이로써 측면 메뉴에 오버라이드 탭이 열릴 것입니다. Enable Local Overrides 옵션이 선택되어 있는지 확인합니다.
- 이 시점에서 파일이 압축되어 보인다면, 가독성을 높이기 위해 prettifier 버튼 ''를 사용합니다.
- 다음 스니펫으로 코드를 교체합니다:
this.onRecoverableError = (error, errorInfo) => console.error(error, errorInfo);. 이렇게 하면 수분화 오류와 추가 componentStack 정보가 이제 콘솔에 기록됩니다. 반드시 저장하세요!
- 페이지를 새로고침하고 이제 수분화 오류 옆에 추가 객체가 로그되는 것을 확인하십시오. 이제 컴포넌트 스택을 사용하여 어떤 컴포넌트에 문제가 있는지 추적할 수 있습니다. 스택이 압축되어 있기 때문에 어떤 컴포넌트가 작동 중인지 정확히 식별하기 어려울 수 있습니다 - identifier되는 요소인 주 태그부터 시작하여 트리를 따라 자식 요소로 이동하는 것이 종종 유용합니다.

수동으로 패치하는 대안적인 전략은 코드로 패치하는 것입니다. NextJS에 대한 아이디어를 위한 이 NextJS 논의 스레드 또는 코드 예제를 참조하십시오. 이는 프로덕션 환경에 권장되지 않지만 로컬 개발 빌드에 도입하는 것이 개발자 경험을 향상시키는 편리한 능력이 될 수도 있습니다.



## DevTools 디버거

수분 오류를 식별하는 또 다른 방법은 DevTools 디버거를 사용하여 예외 발생 시 일시 중지하는 것입니다. 특히 "잡힌 예외에서 일시 중지"는 수분 오류에 특히 유용할 수 있습니다.

이 방법의 단점은 응용 프로그램이 발생(및 잡는) 예외의 수에 따라 원인을 식별하는 것이 꽤 번거로울 수 있다는 것입니다. 문제와 관련이 있는 것을 찾기 전에 상당수의 관련이 없는 잡힌 예외를 한땀한땀 찾아야 할 수도 있습니다.

Chrome DevTools의 잡힌 예외에 대한 자세한 정보는 Chrome 개발자 문서에서 확인할 수 있습니다.



# 해결책

서버와 클라이언트 측에서 렌더링된 것을 조정할 수 없는 상황이라면 수분화 문제를 해결하는 몇 가지 전술이 있습니다.

![이미지](/assets/img/2024-05-14-EscapingReactHydrationErrorHell_4.png)

## 두 번째 렌더링으로 연기



한 가지 해결책은 서버 측 및 클라이언트 측의 첫 번째 렌더링에 동일한 콘텐츠가 렌더링되고, 그 후부터는 클라이언트 측 특정 컴포넌트를 렌더링할 수 있도록 하는 것입니다.

```js
const IsomorphicContainer = () => {
  const [isClient, setIsClient] = useState(false);
 
  useEffect(() => {
    setIsClient(true);
 
    return () => {
      setIsClient(false);
    }
  }, []);
 
  return isClient ? <ClientOnlyComponent /> : null;
}
```

이펙트는 서버 측에서 실행되지 않기 때문에 서버에서 렌더링될 때 isClient 값은 false입니다.

또한 이펙트는 첫 번째 렌더링 후에 실행되므로 클라이언트 측에서 첫 번째 패스에는 isClient 부울 값이 여전히 false이며 수분화 매칭이 유지됩니다.



React 트리에 컴포넌트가 마운트되면 부수 효과가 트리거되어 불리언을 true로 전환하며 `ClientOnlyComponent`를 생성합니다.

React 문서에서 자세한 정보를 확인할 수 있습니다.

추가적인 고려 사항

성능



이 해결책은 성능 부담이 적은 단순히 렌더링만 하는 것과 비교할 때 React 트리에 마운트될 때 컴포넌트가 두 번 렌더링되는 현상을 가져옵니다.

컴포넌트를 다시 렌더링하는 추가 CPU 시간은 가장 큰 콘텐츠 렌더 시간 (LCP) 및 다음 렌더링까지의 상호작용 (INP)과 같은 CPU에 의한 성능 지표에 부정적인 영향을 미칠 수 있습니다.

비스안스 스타일 콘텐츠의 깜빡임

시각적으로 무언가를 렌더링하는 컴포넌트의 경우, 이 접근 방법으로 비스안스 스타일 콘텐츠 깜박임 (FOUC)이 발생하는 경우, 화면을 다시 그리기 전에 트리거될 useLayoutEffect를 사용하는 것을 고려해보세요.



이는 화면에 첫 번째 다시 그리기가 발생하기 전에 첫 번째 렌더, 후크 실행 및 두 번째 렌더의 전체 주기가 모두 발생함을 보장합니다.

이로 인해 다음 페인트까지의 시간에 성능 영향을 미치지만 useEffect 사용은 항상 먼저 고려되어야 합니다. 특히 INP와 같은 지표들이 더 두드러질 때에는 더욱 그렇습니다.

## NextJS 동적 패키지 "매직"

NextJS를 사용 중이라면 클라이언트 측에서만 고려되어야 하는 컴포넌트를 지정하는 대체 옵션이 몇 가지 있습니다.



다음/동적 모듈을 사용하여 이를 구현했습니다:

```js
import dynamic from 'next/dynamic';
 
const ClientOnlyComponent = dynamic(() => import('../components/Component'), { ssr: false });
```

NextJS 문서에서 더 많은 정보를 확인할 수 있습니다.

## 로다블 컴포넌트 패키지 "매직"



만약 @loadable/component 패키지를 사용 중이라면, next/dynamic 패키지와 유사하게 컴포넌트를 클라이언트 측만 고려해야 한다는 옵션을 지정할 수 있습니다:

```js
import loadable from '@loadable/component';

// 이 동적 임포트는 서버 측에서 처리되지 않습니다
const Other = loadable(() => import('../components/Component'), { ssr: false });
```

Loadable 컴포넌트 문서에서 더 많은 정보를 확인할 수 있습니다.

## 다중 렌더링



브레이크포인트 기반 렌더링과 같은 시나리오를 다룰 때 “두 번째 렌더에 연기" 기술을 사용할 수 있지만, 이 경우 적어도 하나의 브레이크포인트가 올바른 컴포넌트가 두 번째로 렌더링될 때까지 다른 뷰포트를 위한 내용이 잠깐 나타나는 문제가 발생할 수 있어요.

CSS를 통해 이 문제를 완화할 수 있는데, 두 번째 렌더 전까지 내용을 시각적으로 숨겨놓은 후 렌더링하는 방법이 있지만, 이렇게 할 경우 콘텐츠 레이아웃 이동(CLS) 메트릭에 부정적인 영향을 미칠 수 있어요. CLS는 검색 엔진 최적화(SEO)에 영향을 미치며 사용자 경험을 나쁘게 만드는 요인이 될 수 있어요.

여기서 일반적으로 수용되는 해결책은 모든 잠재적 변형을 서버 측에서 렌더링하는 것이에요:

- 각 브레이크포인트에서 필요한 모든 변형을 서버 측에서 렌더링해요.
- 렌더링 블로킹 스타일이나 링크 태그로 전달되는 CSS 미디어 쿼리를 사용하여 클라이언트에서 처음으로 로딩될 때 사용자에게 원하는 변형만 표시되도록 해요.
- "두 번째 렌더에 연기" 기술을 사용하여 수분화 불일치가 없도록 해요.
- 두 번째 렌더링 시에는 원하지 않는 컴포넌트를 null로 렌더링하고 언마운트하면 돼요.



서버 렌더링된 HTML이 부풀어오르는 결과를 초래할 수 있는 이 문제는 TTFB에 영향을 미칠 수 있습니다. 또한 "두 번째 렌더링으로 연기" 기술의 CPU 사용량 주의사항을 겪을 수 있지만, 서버와 클라이언트 간에 원활한 전환을 보장하고 원치 않는 콘텐츠가 번쩍이지 않도록 해줍니다.

이 기술에 대한 자세한 정보는 다음 기사에서 확인할 수 있습니다: viewport 특정 반응형 디자인에 SSR을 사용할 때 CLS 제거하기.

## React 트리 가지치기

이 방법은 "다중 렌더링" 기술과 비슷한데, 모든 여러 변형을 모두 수화한 다음 제거하는 대신 리액트 트리를 수화하기 전/수화하는 동안 가지를 잘라냅니다:



- 모든 변형을 서버 측에서 렌더링합니다.
- CSS를 사용하여 원하지 않는 콘텐츠가 플래시되지 않도록 합니다.
- 변형을 하이드레이트/첫 번째 렌더링 시에 원하는 변형인지 여부를 결정하고, 그렇지 않은 경우 React가 해당 노드에 액세스하기 전에 DOM에서 제거합니다 — React는 존재했다는 것을 모르는 DOM 노드에 대해 일치하지 못합니다.
- DOM에 남아 있는 것이 유효한 유일한 변형인 경우 "두 번째 렌더에 위임" 기술을 사용할 필요가 없으므로 우리는 원하는대로 즉시 렌더링할 수 있습니다.

"다중 렌더링" 기술과 마찬가지로 이 기술도 TTFB에 영향을 줄 수 있는 팽창된 서버 렌더링 HTML을 만들지만, 다른 기술의 성능 영향은 없습니다.

이 기술에 대한 자세한 정보 및 구현 방법은 이 지스트 예제 및 @artsy/fresnel 패키지에 대한 이 PR에서 찾을 수 있습니다.

또한 최근 X(이전에는 Twitter로 알려진)에 대한 토론도 확인할 수 있습니다.



# 하이드레이션 경고 비활성화

React에서 HTML 요소 JSX는 하이드레이션 오류에서 발생하는 경고를 억제하는 데 사용할 수 있는 suppressHydrationWarning 부울을 받습니다.

이는 데이터가 조정되지 않을 때만 사용해야 합니다. 예를 들어, 타임스탬프나 날짜를 페이지에 작성할 때와 텍스트 콘텐츠에서 가리는 차이가 있는 경우에만 사용되어야 합니다.

추가 정보는 React 문서에서 확인할 수 있습니다.



이게 다예요! 읽어 주셔서 감사합니다 ☺️

수분 공급 오류를 일으키는 다른 예제가 있나요? 또는 문제를 해결하거나 디버그하는 편리한 방법이 있나요?

댓글로 알려주세요!