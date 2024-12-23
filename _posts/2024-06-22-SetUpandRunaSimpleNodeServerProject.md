---
title: "간단한 Nodejs 서버 프로젝트 설정 및 실행 방법"
description: ""
coverImage: "/assets/img/2024-06-22-SetUpandRunaSimpleNodeServerProject_0.png"
date: 2024-06-22 14:05
ogImage:
  url: /assets/img/2024-06-22-SetUpandRunaSimpleNodeServerProject_0.png
tag: Tech
originalTitle: "Set Up and Run a Simple Node Server Project"
link: "https://medium.com/gitconnected/set-up-and-run-a-simple-node-server-project-38b403a3dc09"
isUpdated: true
---

컴퓨터 프로그래밍을 거의 3년째 배우고 있는데, 다른 개발자들을 도울 기술적 지식이 생겨났어요. 그래서 내가 잘 알고 있는 내용을 적어놓아 기억에 도움이 되고 다른 사람들에게도 참고할 수 있게 하려고 했어요. 그래서 뭔가를 시작하기로 했고, 간단하게 시작해보려고 하는데요, Node 애플리케이션을 사용하여 요청에 정적 파일로 응답하는 것부터 시작하려고 해요. 실제로는 경험이 많은 개발자들에게는 간단해 보일 수 있지만, 저는 이 부분을 조금 더 자세히 설명해볼 거에요. 왜냐하면 최소한의 웹 개발 지식이 있는 사람도 이 Node 앱을 시작하고 다음으로 진행할 재미있는 것들에 굳은 기초를 쌓을 수 있도록 하고 싶거든요. 물론 모든 것을 설명할 수는 없어서, 알고 싶다면 때로는 더 배울 수 있는 곳으로 보내줄게요.

## Level Up 인재 집단에 합류하세요

이 튜토리얼에서는 Node 서버를 설정하는 단계를 따라가겠어요. 클라이언트의 관점에서 (클라이언트란 서버와 통신하는 사람/컴퓨터입니다), 이 서버는 단 하나의 작업을 수행할 거에요: 단일 정적 HTML 페이지를 표시할 거에요. CSS도 없고, 프론트엔드 JavaScript도 없고, 데이터베이스 연결도 없고, 그리고 필요한 최소한의 NPM 패키지만 사용할 거에요 (NPM이 무엇인지는 곧 설명할게요). 사실, 이를 실제 인터넷에서 실행하지 않고 로컬에서만 실행할 거에요. 그리고 서버 in general이 어떻게 작동하는지, 클라이언트-서버 통신의 메커니즘에 대해 설명을 찾고 있다면, 좀 더 진지한 Node 작업을 하려면 그것에 대해 다루지 않을 거에요.

먼저, 전체 과정을 개략적으로 살펴봅시다:

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

- NodeJS 웹사이트로 이동해서 NodeJS를 다운로드하세요.
- Node와 NPM이 설치되었는지 확인하고 PATH가 정의되어 있는지 확인하세요.
- 새로운 프로젝트 폴더를 생성하세요.
- 프로젝트 폴더에서 NPM을 실행하세요 (백그라운드에서 실행됩니다).
- 필요한 NPM 패키지를 설치하세요.
- 프로젝트 폴더에 HTML 파일을 생성하세요 (이것이 클라이언트가 볼 내용입니다).
- 프로젝트 폴더에 Node/JavaScript 파일을 생성하세요 (이것이 서버 파일입니다).
- 서버를 실행하세요.
- (로컬) 웹사이트를 방문하세요!

단계 1: NodeJS 웹사이트로 이동해서 NodeJS를 다운로드하세요.

여기에 NodeJS 웹사이트가 있습니다. 이 튜토리얼을 따른다면 LTS(장기 지원) 버전을 다운로드하는 것을 추천드립니다. 이는 대부분의 사람들이 사용하고 안정적인 버전으로 다운로드하는 경우 무언가가 고장났을 때 더 나은 도움을 얻을 수 있습니다. 이 섹션 제목은 기술적으로 그리스도를 이끌었다가와 착각을 일으키는 거라고 합니다. 사실, 여러분은 NodeJS 설치 프로그램을 다운로드한 것이며, 다운로드가 완료되면 해당 프로그램을 열고 지침에 따라 Node를 설치해야 합니다.

단계 2: Node와 NPM이 설치되었는지 확인하고 PATH가 정의되어 있는지 확인하세요.

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

NodeJS를 다운로드하고 설치했다면, 터미널에서 다음 명령어를 실행하여 Node가 제대로 설치되었는지 확인하고 싶을 것입니다:

```js
node - v;
```

이 명령어를 실행하면 다음과 같이 버전 번호가 출력됩니다:

```js
v14.15.0
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

Node를 설치하면 Node Package Manager로도 알려진 NPM이 함께 설치됩니다. 명령 줄에서는 Node보다는 NPM과 더 많이 상호 작용할 가능성이 높습니다. 이 기능에 대해 설명하겠지만, 일단은 NPM이 설치되어 있고 PATH가 올바른지 확인하세요. 이를 확인하려면 노드를 확인한 것과 동일한 작업을 수행하세요:

```js
npm - v;
```

위 명령은 다음과 비슷한 숫자를 반환할 것입니다:

```js
6.14.8
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

사실, 명령 줄에서 대부분의 프로그램을 확인하는 일반적인 기술입니다. 명령 줄 구문에 너무 깊이 들어가지 않고, 대부분의 프로그램은 -v 플래그를 처리할 수 있으므로 명령 줄에서 상호 작용할 때 거의 항상 다음 형식을 따라 작동하는지 확인할 수 있습니다.

```js
프로그램명 - v;
```

모든 것이 잘 작동하면 다음 단계에 준비된 것입니다. 만약 다음과 같은 메시지를 받는다면:

```js
'node'는(은) 내부 또는 외부 명령, 실행할 수 있는 프로그램 또는 배치 파일이 아닙니다.
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

우선 해야 할 일은 9/10 번 이 문제가 발생하는 이유입니다. 가능한한 이 게시물을 짧게 유지하기 위해 문제 해결 방법에 대해 자세히 설명하지는 않겠습니다. 그러나 많은 사람들이 온라인에서 물어본 일반적인 문제입니다. Node와 NPM이 작동하는지 확인한 후 다음 단계로 넘어갈 수 있습니다.

단계 3: 새 프로젝트 폴더 만들기

프로젝트 폴더를 컴퓨터의 원하는 위치에 만들고 원하는 이름을 지을 수 있습니다. 이 단계는 간단합니다. 누구나 새 디렉토리나 폴더를 만드는 방법을 알고 있죠?

단계 4: 프로젝트 폴더에서 NPM 실행 시작하기

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

알겠어요, 그럼 NPM은 무엇인가요? 직접 웹사이트를 방문해서 확인해보세요. 하지만 Node를 배우고 있는 초심자를 위해 간단하게 설명하면, 패키지는 단지 Node 앱과 함께 작동하도록 설계된 프로그램입니다. 웹 앱이 무언가를 수행하거나 몇 가지 로직을 수행하거나 데이터를 조작하거나 다른 서비스와 통신해야 할 때, Node 파일에 직접 모든 코드를 작성하는 대신 패키지를 찾아서 다운로드하고 프로젝트에 추가할 수 있습니다. NPM 패키지를 사용하는 것이 항상 쉽다는 것은 아니라는 것을 의미합니다. 보통 여전히 패키지와 Node 프로젝트 간의 인터페이스를 생성하기 위해 일부 코드를 작성해야 하고 때로 그 코드가 다소 까다로울 수도 있습니다.

프로젝트 폴더에서 NPM을 시작하는 방법은 다음과 같습니다:

- 터미널을 열기
- 프로젝트 폴더까지 디렉토리를 변경
- 터미널에서 npm init 명령어를 실행

이 시점에서 다음 정보를 입력하라는 프롬프트가 표시될 것입니다:

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
이 유틸리티는 package.json 파일을 생성하는 과정을 안내해줍니다.
가장 일반적인 사항만 다루며 합리적인 기본값을 추측합니다.
이 필드에 대한 확정적인 설명과 각각의 기능에 대한 정확한 문서는 `npm help init`을 확인하세요.
나중에 `npm install <패키지>`를 사용하여 패키지를 설치하고
이를 package.json 파일의 종속성으로 저장해주세요.
```

이후 다음과 같이 표시되어야 합니다:

```js
Press ^C at any time to quit.
package name: (simple-node-server)
```

패키지 이름: (simple-node-server)"와 이 설정 과정 중에 나오는 모든 후속 라인은 무엇을 요청하는지를 먼저 말하고 (이 경우 패키지 이름), 오른쪽에는 괄호 안에 값이 있을 수도 있고 비어 있을 수도 있습니다. 괄호 안의 값은 기본값이며, 이러한 각 라인에 대해 기본값을 그대로 사용하거나(비어있는 기본값도 허용됨), 또는 자신의 값을 입력한 후 enter를 누를 수 있습니다. 초보자 대부분은 기본값을 사용합니다.

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

이 설정에 대해 더 알아야 할 사항 하나 더 있어요. 진입점 변수는 대형 프로젝트에서는 보통 여러 서버 파일이 있기 때문에 Node가 앱을 시작할 때 진입점 파일을 사용하지만, 이처럼 간단한 경우에는 하나만 필요해요. Node와 작업을 시작할 때 헷갈렸던 점 중 하나는 주 서버 파일의 다른 이름들이었어요. 가장 흔히 본 것은:

- index.js
- app.js
- server.js

주 서버 파일의 이름은 임의로 정할 수 있고, 일부 Node를 사용하는 서비스는 서버 파일이 특정한 이름이어야 하거나 특정 위치에 있어야 하는 경우가 있는데, 이는 이 간단한 서버에 대해 굉장히 중요하지는 않지만 예제를 살펴볼 때 염두에 두어야 할 부분이에요.

작업을 마치면 터미널이 이와 같이 보일 거에요:

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

![이미지](/assets/img/2024-06-22-SetUpandRunaSimpleNodeServerProject_0.png)

프로젝트 폴더에 다음과 같이 보이는 package.json이라는 파일이 있어야 합니다:

단계 5: NPM 패키지 설치하기:

이제 NPM이 프로젝트와 연결되었으므로 명령줄을 사용하여 하나의 NPM 패키지를 설치할 것입니다. 이 특정 패키지는 대부분의 Node 서버 프로젝트에서 사용됩니다. Express.js라고 불리며 Node 자체와 밀접한 관계가 있습니다. 실제로 Express에서 제공하는 객체와 메소드를 사용하여 라우팅, 데이터베이스 통합, 오류 처리, 그리고 프론트엔드 템플릿 사용과 같은 일반적인 웹 개발 프로세스를 쉽게 처리할 수 있습니다.

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

저희 루트 프로젝트 폴더에 있는 package.json 파일은 앱에 대한 몇 가지 기본 정보를 담고 있지만, package.json 파일의 가장 일반적인 용도는 다운로드하고 프로젝트에 저장하는 모든 패키지의 레코드를 저장하는 것입니다. 이것은 우리의 프로젝트 코드가 다른 환경에서 실행되기 위해서 (예를 들어 팀과 함께 작업하거나, 오픈 소스 프로젝트를 다른 사람이 자신의 컴퓨터에서 작업할 수 있게 하거나, Amazon Web Services (AWS), Google App Engine (GAE), Heroku 또는 이와 유사한 서비스에 배포하고 싶은 경우) 필요합니다. 다른 환경은 프로젝트에서 사용하는 NPM 패키지를 알아야 하기 때문에 다운로드하고 저장할 수 있어야 합니다. 실제로 package.json이 수행하는 작업은 많지만, 당분간 꼭 알아야 할 것은 프로젝트의 기본 정보와 패키지를 포함한다는 것입니다.

간단히 말해, 패키지를 앱에 연결하는 두 가지 단계가 있습니다:

- NPM에서 패키지 다운로드/설치
- package.json의 "Dependencies"에 패키지 이름과 버전 번호 저장

NPM 패키지를 다운로드하고 프로젝트에 설치하려면, 이 경우 express를 사용할 때, 터미널에서 다음 명령을 실행해야 합니다 (이 명령을 실행할 때 프로젝트의 루트 폴더에 있는지 확인하십시오):

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
npm i -s express
```

- npm은 실행 중인 프로그램 이름입니다.
- -i는 --install에 대한 약칭이며 둘 중 아무것이나 사용할 수 있습니다. 이 명령을 사용하면 express를 프로젝트 루트 폴더의 node_modules라는 폴더에 추가합니다. NPM으로 처음 패키지를 설치할 때까지 이 폴더가 프로젝트 폴더에 추가되지 않는다는 점을 유의해야 합니다. (그래서 아직 프로젝트 폴더에 보이지 않습니다).
- -s는 --save에 대한 약칭이며 둘 중 아무것이나 사용할 수 있습니다. npm install 명령에 추가할 수 있는 태그로, 자동으로 package.json에 저장합니다. -s 또는 --save를 잊어버리면 package.json에 패키지 이름과 버전 번호를 수동으로 추가할 수 있습니다. 어떻게든 추가하되, 패키지 이름과 버전 번호가 package.json에 있는지 확인하세요.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*L-A4jgG4P2bgdYca0guC3w.gif)

Step 6: HTML 파일 생성하기

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

프로젝트 폴더를 생성한 후에 완료해야 할 두 번째로 간단한 단계가 아닐까 싶어요. 폴더에 확장자 '.html'을 가진 파일을 추가하세요. 일반적으로 기본 html 파일의 이름은 'index.html'로 지정하지만, 이건 절대적인 규칙이 아니기 때문에 자유롭게 이름을 정하셔도 됩니다.

이게 모두요! 이것만 있으면 HTML 파일에 완성된 거죠, 여기서부터 본인이 원하는 형식의 HTML 페이지로 만들어가시면 됩니다:

7단계: 프로젝트 폴더에 Node/JavaScript 파일 만들기

프로젝트의 루트 폴더에 'index.js'라는 파일을 만들어주세요. 그렇습니다, 이제 루트 폴더 안에 'index.html' 파일과 'index.js' 파일이 모두 있게 될 거에요. 헷갈린다면, 조금 익숙해지기까지 조금 걸릴 수 있지만, 실제로는 노드가 서버를 시작하거나 페이지를 렌더링하는 과정에서 문제가 발생했을 때 디버깅에 유용할 수 있어요. 이 규칙은:

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

다양한 프론트엔드 프레임워크들, Handlebars와 같은 템플릿 엔진부터 React와 같은 JavaScript 프레임워크까지, 이를 활용하여 특정 폴더를 살펴 index.js 파일을 해당 디렉토리의 진입점으로 사용합니다.

어쨌든, 서버가 실제로 어떻게 작동하는지 전혀 모른다면, 서버가 하는 가장 기본적인 작업을 간단히 설명해 드리겠습니다:

- 클라이언트로부터 수신되는 요청을 처리하기 위해 포트를 개방합니다.
- 들어오는 각 요청에 대해 무엇을 해야 하는지 정의합니다 (서버의 응답).

이것이 적절히 요청-응답 주기라고 불리는 것의 가장 간단한 설명이며, 대부분 인터넷이 작동하는 방식입니다. 따라서 우리는 서버를 이렇게 설정해야 합니다.

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

노드/익스프레스 앱에서는 다음과 같이 작업을 수행합니다:

- 방금 설치한 Express 종속성을 가져옵니다.
- Express 앱 객체의 인스턴스를 생성합니다. 이 앱 객체에는 서버에 사용할 수있는 다양한 내장 메서드와 변수가 있습니다. 그 중 일부를 곧 보게 될 것입니다.
- 포트 번호를 변수에 저장합니다. 이 앱에서는 선택 사항이지만, 다른 사람들과 함께 앱을 개발하고 앱을 클라우드 기반 서비스에 배포할 때, 앱이 작동하는 환경을 결정하고 적절한 포트를 사용할 수 있도록 몇 가지 로직을 추가하고 싶어할 것입니다.
- 루트를 설정합니다. 이 경우 하나의 루트를 설정하고 해당 루트의 역할은 앱의 루트(‘/’)에서 요청을 받아들여 클라이언트 브라우저로 HTML 파일을 보내는 것입니다. 다시 말하지만, 규모가 큰 Node 앱을 작업하면 여러 루트가 있고 종종 완전히 분리된 라우터 파일이 있으며, 각각에는 여러 루트가 연결되어 있습니다.
- 마지막으로 서버를 위한 수신 포트를 설정해야 합니다. 이는 들어오는 연결을 대기하는 역할을 하며, Express 앱에서는 항상 파일의 끝에 있습니다.

그럼, 작업 방법은 다음과 같습니다:

- Node 파일에 종속성을 가져오려면 다음 형식을 따라야 합니다:

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
const <variable-name> = require('<name-of-package>');
```

여기 몇 가지 빠른 팁이에요:

- `variable-name`은 임의의 이름이에요. 원하는 대로 사용할 수 있어요. 하지만, 이 변수들을 그들의 의존성에 따라 명명하는 것이 최선의 실천 방법이에요.
- require()는 다른 Node 파일의 코드에 액세스할 수 있게 해주는 내장 Node 함수에요. 이 함수는 Node 서버에 가져오는 모든 의존성에 사용되며, 동일한 방식으로 자신의 Node 파일을 작성하고 주 서버 파일로 가져올 수 있어요.
- `name-of-package`은 가져오려는 폴더나 파일의 정확한 이름이에요 (JavaScript 파일만 가져올 경우 파일 확장자를 뺄 수 있어요). 가져오는 것이 NPM 패키지인 경우, package.json을 참조할 수 있어요. 왜냐하면 package.json에 나열된 것이 Node 서버 파일에서 필요한 문자열과 동일해야 하거든요. 저희의 package.json에는 의존성이 이렇게 나와 있어요:

```js
"dependencies": {
   "express": "^4.17.1"
}
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

요렇게 table 태그를 Markdown 형식으로 변경해보세요.

1. So, the package.json 파일에는 ‘express’가 있고 require() 함수는 'express' 문자열을 인수로 사용합니다.

2. 다음으로 Express에서 앱 객체 인스턴스를 생성해야 합니다. 앱 객체는 Node.js로 애플리케이션을 만들고 싶다면 꼭 이해해야 할 내용입니다. 우리는 다음과 같이 인스턴스화합니다:

```js
const app = express();
```

- 이 코드의 역할은 바로 위 줄에서 가져온 의존성을 실행하는 것뿐입니다. 그 의존성은 앱 객체를 내보내며 그 앱 객체가 app이라는 상수 변수에 저장됩니다. 이 앱 객체가 Express 코드를 보유하며, 여기서 가장 많은 상호작용을 할 것입니다.

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

3. 이건 쉬워요. 일단 변수 port에 포트 번호를 저장해 보세요. 3000에서 8000 사이의 숫자라면 어떤 숫자든 괜찮아요. 대부분의 사람들은 3000이나 8000을 주로 사용해요.

```js
const port = 5000;
```

4. app 오브젝트에는 HTTP 메소드를 기반으로 요청을 라우팅하는 여러 함수가 포함되어 있어요. 이 함수들 중 가장 일반적인 것들은:

- app.get()
- app.post()
- app.put()
- app.delete()
- app.use()
- app.all()

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

가장 흔한 함수 중 하나는 app.get()입니다. 이 함수는 GET 요청에 사용되며, 웹사이트에 방문할 때마다 실행됩니다. GET 요청은 인터넷에서 가장 흔한 종류이므로 app.get()를 살펴보겠습니다. Express 문서에서는 다음과 같이 정의하고 있습니다:

그리고 이에 대한 예시를 보여줍니다:

```js
app.get("/", function (req, res) {
  res.send("GET request to homepage");
});
```

이 정의를 보면 app.get() 함수가 path와 콜백 함수 두 가지 인수를 받을 것으로 예상됩니다. 예시에서는 두 개의 인수가 있는 것을 볼 수 있습니다:

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

- `/` = 경로
- function (req, res) ' res.send(`홈페이지로의 GET 요청`)' = 콜백 함수

이 예제에서는 하나의 콜백 함수만 있지만, 여러 개의 콜백 함수가 있을 수도 있어요. Express에서는 이러한 것들을 미들웨어라고 부르는데, 그 이유는 서버가 클라이언트 요청을 받는 시점과 응답을 다시 보내는 사이에 삽입되기 때문이에요. 게다가, 대규모 Node 프로젝트에서는 미들웨어 함수의 수가 상당히 많아지고, 종종 라우트가 여러 개의 미들웨어 함수를 가지게 되기도 해요. 또한, Node 프로젝트에서 사용할 수 있는 많은 NPM 패키지들이 미들웨어처럼 사용되도록 작성되어 있어요. 사실, Express도 이와 같은 것들뿐이에요:

Express에서는 많은 미들웨어가 다른 곳에 정의되어 이름과 함께 라우팅 함수로 전달될 수 있지만, 일반적으로 라우팅 함수의 마지막 콜백 함수는 이 예제와 비슷하게 보일 것이며, 이에 대해 아셔야 해요:

- req와 res 두 가지 인수를 가지고 있어요. 이것들은 새로운 요청-응답 주기 동안 다양한 작업을 수행하는 데 도움이 되는 내장 객체들이에요. Express는 이를 미들웨어 함수에서 기대하고 있어요. 현재는 req 객체를 사용하지는 않지만, 앱에 입력이나 URL 인코딩된 데이터 (URL에 서버로 전달되는 데이터)가 있는 경우 req 객체를 통해 해당 정보에 액세스할 수 있어요. res 객체는 서버가 응답을 보낼 때 사용할 객체에요. 중요한 점은 꼭 req와 res로 명명할 필요가 없다는 점이에요. Express는 req와 res 대신 사용하는 이름을 사용할 것이지만, 문서는 모두 req와 res를 참조하고 있고, 대부분의 Node 서버가 이 관례를 따르고 있기 때문에 그대로 따르는 것이 좋을 거예요.
- 이 함수는 대부분 미들웨어로 간주되는 것들과 약간 다르다는 점에 유의해야 해요. 왜냐하면 대부분의 미들웨어는 Express에게 다음 미들웨어로 계속 진행하라고 말하는 next 인수를 가지고 있는데, 이 함수는 res.sendFile()를 호출하기 때문에 요청-응답 주기의 끝을 의미하고, 서버는 해당 요청을 완료한 상태에요.

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

res.sendFile()에 대해 더 알고 싶다면 문서를 참조해보세요. 하지만 지금 당장 알아두어야 할 점은 다음과 같습니다.

```js
res.sendFile("<file-name>", { root: __dirname });
```

이것이 서버 파일(index.js)이 있는 같은 폴더(루트)에서 파일을 전송하는 방법입니다.

5. 마지막으로, 서버가 들어오는 요청을 수신하기로 약속하려면 코드를 설정해야 합니다. Express의 app 객체에는 이를 수행하는 app.listen()이라는 함수가 있습니다. 모든 매개변수는 옵션으로, 포트 번호를 포함한 것들입니다. 하지만 일반적으로 포트 번호가 적어도 하나 보이며 종종 콜백 함수도 함께 전달됩니다. 제가 앱에서 사용하는 app.listen()의 전체 버전은 다음과 같습니다:

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
app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
```

알았어요, 이것을 자세히 살펴보고 마무리하도록 하죠.

- port는 우리 index.js 파일 맨 위에서 정의한 것과 동일한 포트입니다.
- () => {}은 화살표 함수로, JavaScript에서 일반 함수와 정확히 동일한 작업을 수행하지만 조금 더 깔끔하게 보입니다.
- console.log()은 아마 이전에 본 적이 있을 것이라고 기대합니다. 그렇지 않은 경우, 이 줄은 단순히 주어진 문자열을 콘솔에 출력할 것입니다.

총으로, 당신의 index.js 파일은 이렇게 보일 것입니다:

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

단계 8: Node 서버 시작하기

코딩 부분은 여기까지입니다. 다음 단계는 실제로 서버를 시작하는 것입니다! 터미널을 열고 다음 명령을 실행하여 이를 수행할 수 있습니다:

```js
node index.js
```

콘솔에 원하는 포트 번호가 표시된 console.log 메시지가 표시되어야 합니다.

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

![Image](https://miro.medium.com/v2/resize:fit:1400/1*Oqa--bT2xy4bNeErxLWxpA.gif)

Step 9: 방문하고자하는 (로컬) 사이트 방문하기!

이제 할 일은 자신의 사이트로 이동하는 것뿐입니다. 귀하의 사이트는 로컬호스트에 호스팅되어 있으며 지정한 포트에서 실행 중입니다. 브라우저를 열고 아래 URL을 사용하세요:

```js
localhost:<포트번호>
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

웹 페이지에서 포함한 내용을 얻을 수 있어요! 첫 번째 노드 사이트를 호스팅했군요!

이 튜토리얼은 어떠셨나요? 모든 단계를 따라가고 로컬에서 간단한 HTML 페이지를 실행할 수 있었나요? 혼란스러운 용어가 있었다면 무엇이었나요? 댓글로 알려주세요.

# 코딩 레벨업

우리 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

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

- 👏 이야기에 박수를 보내고 저자를 팔로우하세요 👉
- 📰 Level Up Coding 게시물에서 더 많은 콘텐츠 확인하기
- 💰 무료 코딩 면접 코스 ⇒ 코스 보기
- 🔔 팔로우하기: 트위터 | 링크드인 | 뉴스레터

🚀👉 Level Up 인재 집단에 가입하여 놀라운 직업을 찾아보세요
