---
title: " HTML의 자기 닫는 태그는 사용을 자제해야 할까"
description: ""
coverImage: "/assets/img/2024-07-13-AreHTMLsSelf-ClosingTagsDiscouraged_0.png"
date: 2024-07-13 21:01
ogImage: 
  url: /assets/img/2024-07-13-AreHTMLsSelf-ClosingTagsDiscouraged_0.png
tag: Tech
originalTitle: "🧑‍🚀 Are HTML’s Self-Closing Tags Discouraged?"
link: "https://medium.com/@tomaszs2/are-htmls-self-closing-tags-discouraged-f02a72809415"
isUpdated: true
---




<img src="/assets/img/2024-07-13-AreHTMLsSelf-ClosingTagsDiscouraged_0.png" />

# HTML에서 self-closing 커스텀 태그는 표준화되어 있지 않은 이유가 있습니다. 그러나 안전하고 선택한 프레임워크에서 사용하는 것이 장려됩니다.

요즘 웹 개발에 대해 많은 것을 배우고 있어요. 그 중에 흥미로운 사실 하나는 자체 닫히는 태그가 이제는 권장되지 않는다는 것이에요. 

이것이 바로 뭐지? 생각해볼 만한 질문이 엄청 많이 생긴거예요.

<div class="content-ad"></div>

그래서, 평소처럼 이 주제를 조사해 봤어요. 그래서 우리 모두가 새로운 것을 배울 수 있게 되었어요.

# 개발자들은 HTML에서 자체 닫힌 태그를 원해요

하지만, 우리는 처음부터 시작해 봅시다. 자체 닫힌 태그란 무엇일까요? 자체 닫힌 태그는 명시적인 닫는 요소가 포함되지 않고 자동으로 닫히거나 자체 닫히는 HTML 태그입니다.

예를 들어, 이 태그는 여는 태그와 닫는 태그가 있습니다:

<div class="content-ad"></div>

```js
<div>something</div>
```

이 태그는 자체로 닫힌 태그입니다:

```js
<input />
```

자체로 닫힌 태그들은 내용을 전달할 필요가 없을 때에 사용되는 표준 태그의 간결한 버전입니다. HTML에서는 일부의 자체 닫힌 태그들이 정의되어 있습니다. 이 외의 태그들은 닫아주어야 합니다.

<div class="content-ad"></div>

커스텀 태그를 고려할 때 일이 흥미로워집니다. Angular, React, Vue.js, Ember 같은 프레임워크를 사용하면 커스텀 컴포넌트를 생성할 수 있습니다.

물론 웹 컴포넌트로도 가능합니다.

어떤 방법을 사용하더라도, 최종 목표는 기본 HTML 요소뿐만 아니라 커스텀 컴포넌트로 웹사이트와 앱을 구성할 수 있는 것입니다. 예를 들어:

```js
<my-custom-component>something</my-custom-component>
```

<div class="content-ad"></div>

복잡한 앱을 개발할 때 가능한 한 간결하게 작성하고 싶습니다. 그래서 내용을 전달할 필요가 없는 경우 자체 닫힘 태그를 사용하는 것이 좋습니다:

```js
<rectangle left="10" top="20" />
```

이것은 많은 웹 개발자들, 저 포함,의 기대입니다. 여기 다른 개발자가 6년 전에 이를 설명한 내용이 있습니다:

![Are HTML's Self-Closing Tags Discouraged](/assets/img/2024-07-13-AreHTMLsSelf-ClosingTagsDiscouraged_1.png)


<div class="content-ad"></div>

하지만 그것은 그리 간단하지 않다고 발생합니다. 실제로 Danny Engelman은 웹 컴포넌트가 자체 닫히는 태그를 지원하지 않을 것이라고 언급했습니다.

그의 코멘트 중 이 부분은 취소선이 그어져 있지만, 여전히 자체 닫히는 태그에 대한 요청이 얼마나 귀찮은지를 보여줍니다.

이 주제에 대해 많은 논의를 읽었는데, 사람들이 자체 닫히는 태그에 반대하는 이유를 배우는 것이 흥미롭습니다.

예를 들어 Henri Sivonen은 오래된 브라우저와 라이브러리가 이것을 구문 분석할 수 없게 될 수 있기 때문에 HTML 표준 웹 컴포넌트의 일부가 되기를 원하지 않습니다.

<div class="content-ad"></div>

흥미로운 점은, 그 댓글이 작성된 시점에 소개되었다면, 이제 7년이 지난 지금, 우리는 자체 닫힌 웹 구성 요소를 즐길 수 있었을 것입니다.

하지만 그런 일은 일어나지 않았고, 우리는 웹 구성 요소가 자체 닫힌 태그를 지원하지 않는 상황에 처해 있습니다.

2017년에는 HTML 표준화 팀이 구문 분석 알고리즘에 변경 사항을 도입하고 싶어하지 않은 것이 매우 이해할 만합니다.

그 해와 다음 해에는 거의 주요 변경 사항이 거의 없었습니다. 그러나 매년 변경 사항이 증가하고, 현재에 이르러 매년 알고리즘 문서에서 거의 20건의 업데이트를 보게 됩니다. 이렇게 7년간 총 120건의 주요 업데이트가 있었습니다:

<div class="content-ad"></div>


![image1](/assets/img/2024-07-13-AreHTMLsSelf-ClosingTagsDiscouraged_2.png)

![image2](/assets/img/2024-07-13-AreHTMLsSelf-ClosingTagsDiscouraged_3.png)

알고리즘에 대한 업데이트가 더 많이 있지만 자체 닫힌 태그들이 웹 구성 요소에서 잊혀지고 있는 것 같습니다.

하지만 실제로 논의는 아직 계속되고 있습니다. 주된 관심사는 보안 문제입니다. 그리고 보안에 대해 들으면 나쁜 조짐입니다.


<div class="content-ad"></div>

HTML은 브라우저뿐만 아니라 다양한 도구, 이메일 클라이언트, 파서 등에서도 사용됩니다.

만약 HTML에 self closed tags가 도입되고 사람들이 사용하기 시작하면, 이러한 도구들은 이를 알지 못하고 다르게 처리할 수 있습니다.

# HTML 표준에서 Self-closed Tags 사용은 위험할 수 있습니다

예를 들어, 유효성 검사기가 업데이트되어 새로운 구문이 유효한 HTML임을 인식할 수 있습니다. 이 HTML은 새로운 구문을 이해하지 못하는 프로세서로 전달될 수 있습니다.

<div class="content-ad"></div>

프로세서는 유효성 검사기에서 비롯된 것이기 때문에 유효한 HTML로 간주할 것입니다. 따라서 구식 방법으로 구문 분석을 수행할 것입니다.

프로세서의 관점에서 태그가 닫히지 않은 것으로 인식되기 때문에 HTML을 처리하면서 무엇이 잘못되었는지 인식하지 못하고 예상치 못한 결과를 낼 수 있습니다.

해커들은 이러한 상황을 좋아합니다. 왜냐하면 이를 이용하려고 도구 체인을 연구하고 시도하기 때문입니다.

이것은 약간 SQL 인젝션과 비슷합니다:

<div class="content-ad"></div>


![HTML Self-Closing Tags](/assets/img/2024-07-13-AreHTMLsSelf-ClosingTagsDiscouraged_4.png)

SQL Injection은 해커가 사용자가 제공한 텍스트가 살균되지 않았다는 사실을 악용하는 해킹 방법입니다. 이것은 데이터 대신 명령어인 부분이 포함되어 있다는 것을 의미합니다.

차량의 경우, 속도 카메라 소프트웨어가 번호판을 읽고 살균하지 않으면 SQL 쿼리에 넣을 수 있습니다. 그러나 데이터가 SQL 쿼리인 경우, 번호판은 TABLICE 데이터베이스에 떨어질 것입니다.

그래서 데이터를 제대로 살균하는 것이 매우 중요합니다. 그리고 이것이 자체 닫는 태그에 대한 모든 소란입니다. 세계의 모든 도구 체인이 트로이 목마 시나리오로부터 안전할 확실한 방법은 없습니다.


<div class="content-ad"></div>

아래 표의 형식을 마크다운 형식으로 변경하십시오.

<div class="content-ad"></div>


![image](/assets/img/2024-07-13-AreHTMLsSelf-ClosingTagsDiscouraged_5.png)

It just reminds me that HTML is a standard, and it’s a good thing it exists and there are people who work to make HTML safe and unified.

## There Are Ways To Use Self-closing Tags

But what about me and all the other developers who would still like to use self-closed tags?


<div class="content-ad"></div>

바닐라 코딩으로도 문제를 해결하는 것이 가능합니다. 해야 할 일은 HTML 파일을 변환하고 자체 종료 태그를 포함하여 확장하는 작은 빌드 스크립트를 작성하는 것뿐입니다. 5분만 투자하세요.

이것은 웹 프레임워크와 라이브러리가 존재하는 이유를 생각나게 합니다. HTML을 표준으로 인식함으로써 우리는 그 위에 더욱 발전시킬 수 있습니다.

예를 들어, 2023년 1월에 출시된 Angular v15.1부터는 자체 종료 태그를 지원합니다:

![image](/assets/img/2024-07-13-AreHTMLsSelf-ClosingTagsDiscouraged_6.png)

<div class="content-ad"></div>

Vue는 6년 동안 싱글 파일 컴포넌트에 내용을 전달하지 않는 경우, 자가 닫힘 태그를 권장합니다.

Ember는 더 나아가서 모든 컴포넌트에 대해 자가 닫힘 구문을 사용할 수 있도록 합니다.

React에서도 컴포넌트에 대해 자가 닫힘 태그를 사용할 수 있습니다.

모든 것은 프레임워크와 React가 HTML이나 JSX를 가져와 브라우저를 위한 HTML을 빌드하는 사실로 귀결됩니다. 이 프로세스에서 개발자는 자가 닫힘 태그를 얻고 브라우저는 보안 위험이나 브라우저 충돌이 없는 표준 HTML을 얻습니다.

<div class="content-ad"></div>

그래서 이것은 상호이익을 가져다줍니다. 아마도 프레임워크와 리액트에서 사용하는 HTML 문법은 표준 HTML과 다르지만, 어느 정도로는 HTML 표준에서 자체 닫힌 태그가 누락된 초기 실수를 수정합니다.

이에 대한 타당한 이유가 있었습니다. 프레임워크가 등장하기 전에 HTML은 태그의 계층 구조로 웹사이트를 구축하는 방법으로 간주되었습니다. 이 개념에서 사용자 정의 태그의 아이디어가 나오기 전에는 거의 항상 태그로 내용을 전달하고 싶었습니다. 그렇지 않으면 무용하게 됩니다.

사용자 정의 태그 및 컴포넌트의 등장과 함께, 구현과 내용을 캡슐화하는 방법으로 태그 없는 내용이 가능해지고 환영받게 되었습니다.

이는 HTML을 표준화할 때 내용이 없는 사용자 정의 태그를 예측하기 어려웠다는 것을 의미하며, 프레임워크는 자체 닫힌 태그로 이를 수정합니다. 이를 통해 템플릿에서 일정한 공간을 절약하고 명확성을 도입할 수 있게 됩니다.

<div class="content-ad"></div>

# 자체 닫기 태그를 사용해보세요

그것들은 말 그대로 깔끔하고 간결해 보이기만 하는 것이 아니라, 컴포넌트가 내용이 필요하지 않다는 것을 나타내어 인지적 노력과 왜 내용을 넣을 곳이 비어 있는지에 대한 불확실성을 줄여줍니다.

그래서 프레임워크를 사용하는 개발자들이 자체 닫기 태그를 사용해야 하는지 고려하는 것은 꽤 자연스러운 일입니다. 이런 이유로 많은 사람들이 HTML 표준에 자체 닫기 태그가 포함되어야 한다는 기대감을 가지고 있습니다. 이로 인해 HTML 표준을 다루는 사람들은 그것이 불가능하다고 생각하기 때문에 좌절감을 느낍니다. 그리고 누군가가 또 다른 안전한 방법을 극복해야 한다면, 저도 그것에 동의합니다.

이것이 주제에 대한 충분한 통찰력을 제공했으면 좋겠습니다. 연구를 하면서 놀랍게도 이 문제의 양쪽 모두가 상대방의 입장을 제대로 이해하지 못한다는 것을 깨달은 것이었습니다.

<div class="content-ad"></div>

이 기사가 유용하길 바랍니다. 기사의 주요 질문에 대한 답변은 명백히 "아닙니다." 놀라운 점은 없습니다. 일반적으로 제목 질문에 대한 답변은 "아니오"입니다.

자체 종료 태그를 사용하는 것은 불규칙하지 않습니다.

일반적인 HTML에서는 사용할 수 없지만(예외가 있는), Angular, Ember, Vue.js, React 또는 기타 프레임워크를 사용하는 경우 HTML이나 JSX에서 사용할 수 있습니다.

보안 문제에 대해 걱정할 필요가 없습니다. 목록에 없는 선택한 프레임워크(Svelte와 같은)가 지원하지 않으면 오류가 발생하여 보안 문제가 발생하지 않습니다. 그저 작동하지 않을 뿐입니다. 자체 종료 태그가 도구 체인(브라우저, 이메일 클라이언트 등)으로 기적같이 전달된다면, 잘못된 HTML임을 인식하고 표준에 따라 안전하게 처리하여 존재를 무시합니다.

<div class="content-ad"></div>

안녕하세요! 안전 사용을 위해 태그를 닫을 때 안전합니다.

태그를 자체적으로 닫아 간결한 템플릿을 즐기세요. 템플릿의 명확성과 가독성을 향상하는 좋고 안전한 방법입니다.

저는 주로 프론트엔드 개발, 코딩 및 오픈 소스에 대해 글을 쓰고 있어요. 25개의 멋진 오픈 소스 앱, Windows에서 빠른 node_modules, Storybook 8.1 및 VSCode 매크로를 확인해보세요.

박수를 보내주시고 공유하며 더 많은 코딩 글을 구독해주세요!