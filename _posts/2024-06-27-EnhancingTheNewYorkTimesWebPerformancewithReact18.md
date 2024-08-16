---
title: "React 18로 뉴욕 타임스 웹 성능 향상 방법"
description: ""
coverImage: "/assets/img/2024-06-27-EnhancingTheNewYorkTimesWebPerformancewithReact18_0.png"
date: 2024-06-27 17:35
ogImage: 
  url: /assets/img/2024-06-27-EnhancingTheNewYorkTimesWebPerformancewithReact18_0.png
tag: Tech
originalTitle: "Enhancing The New York Times Web Performance with React 18"
link: "https://medium.com/timesopen/enhancing-the-new-york-times-web-performance-with-react-18-d6f91a7c5af8"
isUpdated: true
---




## React 18 업그레이드가 뉴욕 타임스 웹 사이트에 활력을 불어넣었고 우리가 직면한 일부 도전에 대해 어떻게 대처했는지 알아봅니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*rT1gMg-9ensw1FDxaAaq_Q.gif)

작성자: 이리야 구레비치

뉴욕 타임스의 소프트웨어 엔지니어로서 우리는 페이지 성능, SEO 및 최신 기술과의 연계 유지에 큰 가치를 둡니다. 이러한 우선 순위를 염두에 두고, React 18의 발표는 웹 개발의 끊임없이 확장되는 세계에서 상당하고 현실적인 발전으로 우리에게 돋보였습니다. React 기반 사이트의 경우, 이 업그레이드는 성능 향상과 흥미로운 새로운 기능에 접근할 수 있는 것을 약속했습니다. 지난 겨울, 우리는 주요 핵심 뉴스 사이트에서 React 18의 장점을 받아들이기로 결정했습니다. 이 과정에서 리액트와 우리 사이트의 고유한 특징을 극복해야 했지만, 최종적으로 우리는 큰 성능 향상을 이루어내고 향후 개선 가능성을 열어두었으며 아직 탐험 중입니다.

<div class="content-ad"></div>

우리의 업그레이드 과정에 들어가기 전에, React 18에서 주요 이점과 변경 사항 몇 가지를 살펴보겠습니다:

- Concurrent Mode로 더 부드러운 렌더링: React 18는 동시에 업데이트와 사용자 상호작용을 렌더링하는 새로운 패러다임인 Concurrent Mode를 소개했습니다. 이는 더 부드러운 애니메이션, 적은 화면 지연 및 누적 레이아웃 변경으로 이어지며 더 반응적인 사용자 경험을 제공합니다.
- 자동 일괄 처리 및 전환: 동시성을 최대한 활용하기 위해 React 18는 단일 렌더 사이클 내에서 상태 업데이트를 자동으로 일괄 처리하여 성능을 최적화합니다. 이는 메인 스레드에서 작업을 분할하여 거의 모든 작업이 동기적으로 실행되는 이전 메커니즘과 큰 차이가 있습니다. 또한 새로운 useTransition 훅을 도입하여 특정 상태가 UI를 차단하지 않고 업데이트되도록 엔지니어들이 보장할 수 있습니다.
- 흥미로운 새로운 기능: React 18은 서버 측 렌더링 및 선택적 가수분화를 통해 리액트 서버 컴포넌트를 통해 스트리밍 업데이트와 같은 흥미로운 기능을 제공하며 혁신적인 UI 패턴과 초기 렌더링을 가속화합니다.

성능 향상은 특히 INP(Interaction to Next Paint) 점수에서 상당히 중요했기 때문에 우리에게 매우 의미가 있었습니다. INP는 페이지 응답성의 측정 항목이며 구글이 웹 사이트를 검색 결과에서 순위를 매기는 데 사용하는 Core Web Vital 중 최신 메트릭스입니다. SEO 점수는 뉴스 조직에게 매우 중요하며 우리의 INP 점수를 개선하는 것은 어려운 도전이었기 때문에 React 업그레이드가 우리에게 높은 우선 순위(그리고 위험 부담)의 이니셔티브로 자리 잡았습니다.

# 우리의 이주 프로세스

<div class="content-ad"></div>

- 사용되지 않는 종속성 제거

마이그레이션을 시작하기 전에 React 18과 호환되지 않은 폐기된 Enzyme 테스팅 라이브러리를 제거해야 했습니다. 이를 위해 모든 테스트 파일을 보다 최신 라이브러리인 @testing-library/react으로 수동으로 이관해야 했습니다. 시간을 투자하는 측면에서, 이것이 전체 프로젝트에서 가장 큰 작업이었을 수도 있습니다. Enzyme은 저희 리포지토리 전체에 걸쳐 수백 개의 테스트 파일에서 사용되었으며, 이를 완전히 대체하려면 상당한 인적 노력과 몇 십 개의 풀 리퀘스트가 필요했습니다. 우리는 다른 제품 작업을 수용하고 개발자의 피로를 피하기 위해 단계적인 풀 리퀘스트로 이 작업을 몇 달 동안 해내었습니다. 노력의 끝에, 우리는 분명히 @testing-library/react API에 대한 전문가가 되었으며, React 18 업그레이드로 넘어갈 수 있어 기쁘게 생각했습니다.

2. 기반 설정

테스트 파일 마이그레이션이 완료되면 React 18 통합 작업을 시작할 수 있었습니다. 이를 안전하게 수행하기 위해, 먼저 주요 종속성, 유형 및 테스트를 React 18에 맞게 업그레이드하는 작업을 시작했습니다. 실제 기능을 구현하는 것이 아니라 React 18에 적합하도록 간단히 @types/react, react-test-renderer, react-dom 및 @testing-library 등 모든 것을 우리 리포지토리 전체의 package.json 파일에서 최신 버전으로 업그레이드했습니다. 모든 주요 의존성을 업그레이드하는 것은 동일 버전에 맞도록 일부 테스트 및 유형 정의를 리팩토링하는 것도 필요했습니다.

<div class="content-ad"></div>

3. 엔진 켜기

우리가 패키지 업그레이드에 자신감을 갖게 되자, 우리는 React 18의 새로운 기능을 안전하게 통합할 준비가 되었습니다. 이 기능을 현실로 바꾸기 위해, 우리는 최신 API인 createRoot와 hydrateRoot를 활용해야 했습니다. 우리는 여러 웹 서버에 걸쳐 React Hydration을 통합한 몇 가지 인스턴스를 가지고 있었는데, 모든 서버 간에 렌더링되는 일련의 공유 UI 구성 요소가 있었기 때문에 우리는 가능한 한 많은 곳에서 React 18 기능을 활성화시키는 것이 중요했습니다. 처음 보기에는 ReactDOM.hydrate를 hydrateRoot로 변경하는 것만으로 간단해 보였지만, 정말 그럴까요?

예기치 않은 도전

개발자로써 "운영 환경으로 전개" 버튼을 누를 때 자신감이 생기기 쉽습니다. 엔드 투 엔드 통합 및 단위 테스트가 통과되었고, 다양한 환경과 장치에서 QA를 수행했으며, 최신 기능을 곧 출시할 단계에 있다면, 그 생각이 들 수 있습니다. 우리는 뉴욕 타임즈 웹사이트에 최신 React 버전을 처음으로 배포했을 때 모두 그러했습니다. 새로운 업그레이드를 초기에 배포한 직후, "내장형 인터랙티브"라고 하는 일부 고트래픽 콘텐츠에 문제가 발생했습니다.

<div class="content-ad"></div>

# 리액트 18에 임베디드 인터랙티브 적용

![이미지](/assets/img/2024-06-27-EnhancingTheNewYorkTimesWebPerformancewithReact18_0.png)

뉴욕타임스에서는 custom 임베디드 인터랙티브를 사용하여 위험성 있는 `dangerouslySetInnerHTML`을 통해 서버 측에서 렌더링됩니다. 이러한 인터랙티브는 자체의 HTML, 링크 및 스크립트를 갖추며, React 트리와 독립적으로 실행됩니다. 편집자와 기자들은 코어 인프라를 변경하거나 다시 배포할 필요 없이 페이지에 일회용 및 독립적인 시각적 및 상호작용 요소를 삽입할 수 있습니다. 임베디드 인터랙티브는 우리의 일부 가장 중요한 보도 활동의 핵심 요소이지만, 개발자들에게 실제로 어려움을 초래할 수도 있습니다.

간단한 예시는 다음과 같습니다(script 태그는 페이지가 열리자마자 DOM을 수정할 것입니다):

<div class="content-ad"></div>

```js
const embeddedInteractiveString = `
  <div id="server-test">서버</div>
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const serverTestElement = document.getElementById("server-test");
      serverTestElement.textContent = "클라이언트";
    });
  </script>
`;
return <div dangerouslySetInnerHTML={ {__html: embeddedInteractiveString } } />;
```

이 설정에서 스크립트는 페이지 로드 후에 "server-test" 요소의 내용을 "server"에서 "client"로 수정합니다. 브라우저에서 렌더링된 스크립트가 React가 DOM을 하이드레이트하기 전에 실행되기 때문에 작동합니다. 이는 우리가 주입된 HTML 및 해당 스크립트가 의도한 대로 동작할 것을 신뢰하는 "블랙 박스"로 볼 수 있습니다.

하이드레이션 장벽

React 18이 도입되면서 더 엄격해진 하이드레이션 불일치 요구 사항이 있습니다. 새로운 규칙에 따르면 초기 브라우저 로드와 클라이언트 측 하이드레이션 사이의 모든 DOM 수정은 클라이언트 측 렌더링으로 되돌아가도록 트리거됩니다. 우리의 예시에서는 스크립트 태그가 하이드레이션 전에 "server-test" 요소를 수정하더라도, 하이드레이션 불일치에서 React는 서버 측 렌더링된 콘텐츠를 버리고 클라이언트 측 렌더링으로 되돌아가게 됩니다. 이전 버전의 React에서는 하이드레이션 불일치가 있더라도 React 팀이 클라이언트에서 완전히 다시 렌더링하는 대신 DOM 버전을 무효한 상태로 남기기로 선택했기 때문에 과거에는 문제가 발생하지 않았던 것입니다.


<div class="content-ad"></div>

실제적으로는 이게 무슨 뜻일까요? 사용자가 `dangerouslySetInnerHTML` 속성을 사용하여 클라이언트에 컴포넌트를 렌더링할 때, 안전성 상의 이유로 `script` 태그가 포함된 HTML은 브라우저에서 실행되지 않습니다. 이는 `dangerouslySetInnerHTML` 속성을 사용하여 클라이언트에서 재렌더링된 중에 하이드레이션 불일치 때문에 임베드된 상호 작용이 사실상 자바스크립트가 실행되지 않은 것처럼 렌더링됨을 의미합니다. 위의 예시에서, 텍스트 콘텐츠는 "서버"에서 "클라이언트"로 변경되지만, 하이드레이션 불일치로 인해 다시 "서버"로 렌더링됩니다. 이로 인해 일부 임베드된 상호 작용이 예상한 렌더와 매우 다르게 보여지게 되었습니다.

예상:

<img src="/assets/img/2024-06-27-EnhancingTheNewYorkTimesWebPerformancewithReact18_1.png" />

실제:

<div class="content-ad"></div>

<img src="/assets/img/2024-06-27-EnhancingTheNewYorkTimesWebPerformancewithReact18_2.png" />

그래서 우리는 무엇을 해야 할까요?

React 18가 React 16보다 수분화 불일치에 더 민감하다는 사실을 감안할 때, 우리 앞에는 두 가지 선택지가 있었습니다. 첫 번째는 웹 사이트에서 발생할 수 있는 모든 수분화 불일치를 수정하는 것이었고, 두 번째는 수분화 불일치가 발생할 경우 클라이언트에서 재설치되도록 내장 상호작용형을 수정하는 것이었습니다. 이로 인해 우리는 애로 상황에 처해 있었습니다. 뉴욕 타임스는 수백 가지 다양한 구성 요소와 수만 개의 사용자 정의 임베디드 상호작용형을 포함한 수백만 개의 기사를 게시했습니다. 물론 모든 수분화 불일치를 수정하고 싶었지만, 어떻게 안전하게 할 수 있을까요?

결국, 우리는 두 가지 문제를 동시에 해결하기로 결정했습니다.

<div class="content-ad"></div>

# 내장 인터랙티브 스크립트 수동 추출 및 실행

innerHTML 프로퍼티를 통해 추가된 스크립트 태그나 클라이언트 측 재렌더링 도중 추가된 스크립트 태그는 브라우저 보안상의 이유로 자동으로 실행되지 않는다는 것을 알고 있습니다. 그렇다면 어떻게 해결할까요? 스크립트 태그는 수동으로 다른 DOM 요소의 자식 노드로 추가 또는 대체할 때에만 실행됩니다. 이는 스크립트 태그를 올바르게 실행하려면 먼저 대화형 HTML에서 추출하고 제거한 다음 컴포넌트가 다시 렌더링될 때 내장된 대화형 HTML의 올바른 위치에 다시 추가해야 한다는 것을 의미합니다.

```js
// 이 함수는 일반 HTML에서 스크립트 태그를 빈 플레이스홀더로 대체합니다.
// 이렇게 하면 나중에 클라이언트 마운트에서 실제 스크립트로 스크립트 태그 참조를 현위치에 대체할 수 있습니다.
export const addsPlaceholderScript = (scriptText, id, scriptCounter) => {
  let replacementToken = '';
  let hoistedText = scriptText;

  replacementToken = `<script id="${id}-script-${scriptCounter}"></script>`;
  hoistedText = hoistedText.replace('<script', `<script id="${id}-script-${scriptCounter}"`);

  return {
    replacementToken,
    hoistedText,
  };
};

// 이 함수는 대화형 HTML 문자열에서 `<script>` 태그를 추출하고 제거하며
// 클라이언트 마운트에서 실행할 스크립트 텍스트 배열과 스크립트를 제거한 빈 스크립트 참조가 있는 수정된 HTML 문자열을 포함하는 객체를 반환합니다.
export const extractAndReplace = (html, id) => {
  const SCRIPT_REGEX = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;
  let lastMatchAdjustment = 0;
  let scriptlessHtml = html;
  let match;
  const scriptsToRunOnClient = [];
  let scriptCounter = 0;
  while ((match = SCRIPT_REGEX.exec(html))) {
    const [matchText] = match;
    if (matchText) {
      let hoistedText = matchText;
      let replacementToken = '';
      ({ hoistedText, replacementToken } = addsPlaceholderScript(hoistedText, id, scriptCounter));
      scriptCounter += 1;
      const start = match.index - lastMatchAdjustment;
      const end = match.index + matchText.length - lastMatchAdjustment;
      scriptlessHtml = `${scriptlessHtml.substring(
        0,
        start
      )}${replacementToken}${scriptlessHtml.substring(end, scriptlessHtml.length)}`;
      scriptsToRunOnClient.push(hoistedText);
      lastMatchAdjustment += matchText.length - replacementToken.length;
    }
  }

  return {
    scriptsToRunOnClient,
    scriptlessHtml,
  };
};

// 클라이언트에서 스크립트 실행
const runScript = (clonedScript) => {
    const script = document.getElementById(document.getElementById(`${clonedScript.id}`))
    script.parentNode.replaceChild(clonedScript, script);
}
```

어째서 서버에 스크립트를 유지하고 클라이언트에서 재실행하지 않고도 해결할 수 없을까요? 이를 몇 가지 시나리오에서 불가능한 이유 중 하나는 스크립트 태그 중 일부가 함수 클로저 내가 아닌 전역 변수를 선언하기 때문입니다. 서버에서 스크립트 태그를 미리 렌더링한 다음 클라이언트에서 재실행하면 전역 변수의 다시 선언으로 인한 오류가 발생하여 불가능합니다.

<div class="content-ad"></div>

그 초기 솔루션으로 많은 내장 상호작용을 수정했습니다. 그러나 임의로 순서 지정된 스크립트 실행과는 잘 맞지 않는 상호작용이 있습니다. 여기서 몇 가지 세심한 사항을 살펴보겠습니다:

스크립트 로드 순서

일부 상호작용 스크립트는 다시 내장된 상호작용 HTML에 추가될 때 올바른 순서로 로드되어야 합니다. 이전 스크립트 실행 전략은 모든 `script` 태그가 이미 서버에 선언되고 사전 렌더링되었다고 가정했습니다. 이제는 스크립트 태그를 제거하고 클라이언트에 재부팅해야 하기 때문에 이러한 원칙을 기반으로 한 몇 가지 내재 논리가 깨지게 될 것입니다. 예시를 통해 함께 살펴보겠습니다.

```js
<script>
  const results = document.getElementById("RESULTS_MANIFEST").innerHTML.ELECTION_RESULTS;
  // 결과를 사용하여 추가적인 로직 수행
</script>
<div>
  대화형 DOM 내용이 여기로 이동합니다
</div>
<script id="RESULTS_MANIFEST">{"ELECTION_RESULTS": ['result1', 'result2', ....]}</script>
```

<div class="content-ad"></div>

위의 시나리오에서는 두 번째 스크립트 태그의 ID를 사용하여 다른 스크립트 태그를 검색한 다음 두 번째 스크립트 태그의 innerHTML을 기반으로 일부 기존 논리를 활용하는 초기 스크립트가 있습니다. 이전 반복의 경우, 스크립트 태그는 서버에서 미리 렌더링되었기 때문에 기본적으로 문제 없이 DOM에서 스크립트 태그를 ID로 참조할 수 있었습니다.

최적의 상호 작용을 위해 스크립트 실행은 다시 DOM에 추가될 때 특정 순서를 따라야 합니다. 이에는 다음이 포함됩니다:

- 정적 데이터가 포함된 기능이 없는 manifest 스크립트를 먼저 추가합니다.
- 다음으로 src 속성을 가진 스크립트를 비동기적으로 실행합니다.
- 마지막으로 innerHTML에 있는 순수 JavaScript로 스크립트를 추가하고 실행합니다.

이 순서대로 진행하면 스크립트가 제대로 로드되기 전에 서로를 참조하지 못하도록 합니다.

<div class="content-ad"></div>

```js
// 제공된 스크립트 태그를 구문 분석하여 정렬을 위한 우선순위를 반환합니다.
// 우선순위 1: JSON 또는 기타 메타데이터 콘텐츠
// 우선순위 2: 다른 바닐라 JS 또는 src 콘텐츠
export const getPriority = template => {
  let priority;
  try {
    JSON.parse(template.innerHTML);
    priority = 1;
  } catch (err) {
    priority = 2;
  }
  return priority;
};


scripts.sort((a, b) => getPriority(a) - getPriority(b));
```

# 즉시 퍼포먼스 개선

매우 세심하게 조정된 이 내장형 인터랙티브 코드의 통합 후, 우리는 React 18을 다시 안전하게 출시할 수 있었습니다. 우리는 거의 40,000개의 사용자 정의 내장형 인터랙티브를 철저히 테스트할 수 없지만, 그래픽 팀이 자주 활용하는 재사용 가능한 몇 가지 템플릿을 신뢰할 수 있었습니다. 이를 통해 Svelte나 Adobe Illustrator 기반의 내장형 인터랙티브 내에서 특정 동작을 검증할 수 있었습니다. 장기적으로는 남아있는 하이드레이션 불일치를 해결하고 안심할 수 있는 상태에 도달하기 위한 노력을 계속하지만, 단기적으로는 다시 "배포" 버튼을 누르는 준비를 했습니다.

새로운 기능을 출시한 후 (그리고 어떠한 문제도 발생하지 않는지를 신경 쓰면서 한 시간 동안 내부 알림을 신중히 확인한 후), 거의 즉시 성능 향상을 볼 수 있었습니다.


<div class="content-ad"></div>

![React Upgrade Chart](/assets/img/2024-06-27-EnhancingTheNewYorkTimesWebPerformancewithReact18_3.png)

이 차트에서 볼 수 있듯이, INP 스코어가 p75 범위에서 대략 30% 감소했어요!

업그레이드 이전에, 우리의 가장 큰 과제 중 하나는 페이지를 로드하는 동안 뉴스 사이트가 거치는 빈번한 재렌더링이었어요. 이는 사용자가 아직 로드 중인 페이지와 상호 작용을 시도할 때 부정적인 사용자 경험(그리고 하위 수준의 INP 스코어)을 초래했어요.

React 18을 업그레이드한 후, 재렌더링이 거의 절반으로 줄었어요!

<div class="content-ad"></div>


![Image](/assets/img/2024-06-27-EnhancingTheNewYorkTimesWebPerformancewithReact18_4.png)

이 두 가지 매우 눈에 띄고 중요한 개선 사항은 React 18의 자동 일괄 처리와 병행성 기능의 직접적인 결과입니다. 이는 우리가 올바른 방향으로 나아가고 있다는 매우 명확하고 긍정적인 신호를 주었습니다.

# 다음 단계

React 18 통합은 이미 우리에게 상당한 개선을 가져다 주었으며, 이전에 이용할 수 없었던 다양한 가능성의 문을 열어 주었습니다. 이제는 startTransition 및 React Server Components와 같은 새로운 기능의 잠재적 이점을 탐색하는 데 집중하고 있습니다. 우리의 핵심 의도는 지속적으로 INP 점수를 낮추고 전반적인 기능을 개선하는 것입니다. 그러나 이러한 개선 사항에 대해 답할 필요가 있는 질문에 대해 주의를 기울이고 있습니다. 현재 사용 중인 React 버전의 안정적이고 신뢰할 수 있는 성능을 보장하는 것이 현재 우리의 주요 업무입니다.


<div class="content-ad"></div>

뉴스 사이트 결과를 바탕으로, 우리는 유사한 성능 향상을 보인 기타 몇몇 사이트의 업그레이드를 추구할 자신감을 느꼈습니다. 3월 구글 데드라인 전에 INP 점수를 "나쁨" 영역을 벗어낼 수 있었으며, 구글의 검색 알고리즘 일부가 되었을 때 부정적인 SEO 결과를 보지 못했습니다. 우리는 독자들이 약간 빨라진 경험을 즐기고 있다고 생각합니다. 뉴스룸은 매일 강력하고 흥미로운 대화형 콘텐츠를 제공해왔으며, 가속화 프레임워크에 대해 두 번째 생각할 필요 없이 작업을 이어가고 있습니다.

Ilya Gurevich는 스타트업과 기업 환경에서 10년 이상의 경력을 가진 시니어 소프트웨어 엔지니어입니다. 그는 2019년 뉴욕타임스에 합류한 이후 현재 핵심 웹 플랫폼 팀의 일원입니다. 그는 주요 사이트를 구동하는 중앙집중식 NodeJS 플랫폼을 관리하며, 개발자 경험, 도구 및 수백 명 이상의 활발한 기여자가 있는 멀티 워크스페이스 모노레포의 빌드 프로세스에도 참여하고 있습니다. 그 전에는 레포터와 편집자를 위해 특별히 제작된 최첨단 실시간 협업 텍스트 편집기에 참여한 경력이 있습니다.