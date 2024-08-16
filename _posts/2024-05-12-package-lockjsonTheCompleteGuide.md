---
title: "패키지-락json 완전 가이드"
description: ""
coverImage: "/assets/img/2024-05-12-package-lockjsonTheCompleteGuide_0.png"
date: 2024-05-12 19:28
ogImage: 
  url: /assets/img/2024-05-12-package-lockjsonTheCompleteGuide_0.png
tag: Tech
originalTitle: "package-lock.json: The Complete Guide"
link: "https://medium.com/pavesoft/package-lock-json-the-complete-guide-2ae40175ebdd"
isUpdated: true
---




## package-lock.json이란 무엇이고, 왜 신경 써야 하나요?

### package.json이란?

package.json은 주로 당신의 Node.js 프로젝트가 실행되기 위해 필요한 종속성(라이브러리) 목록을 포함하는 버전 파일입니다.

또한 스크립트, 저자 및 라이센스 정보, 설명, 프로젝트 속성 등과 같은 다른 메타 정보도 포함하고 있습니다.



<img src="/assets/img/2024-05-12-package-lockjsonTheCompleteGuide_0.png" />

# 고유한 문제

위의 package.json에서 "dependencies" 객체가 package-name을 버전 범위로 매핑하는 것을 볼 수 있습니다.

<img src="/assets/img/2024-05-12-package-lockjsonTheCompleteGuide_1.png" />



이것은 npm install을 결정론적이지 않게 만듭니다. 그래서 오늘 npm install을 실행하고 3개월 후에 다시 실행하면 동일한 node_modules 트리를 얻을 수 없을 수 있습니다.

게다가, 만약 다른 개발자가 여러분의 프로젝트를 복제하고 그것에 몇 일 후에 npm install을 실행한다면, 그들은 다른 node_modules 의존성 트리를 가질 수 있습니다. 여러 명의 개발자가 같은 저장소에서 작업하는 경우(이는 대부분의 경우 조직 내에서 발생할 것으로 예상됩니다),이는 큰 문제를 일으킬 수 있으며 설치된 의존성에 일관성이 없거나 더 나빠른 변경으로 이어질 수 있습니다.

그래서 해결책은 무엇일까요? 먼저, 버전 범위가 무엇을 의미하는지 이해해 봅시다. 버전 범위는 하나 이상의 공백으로 구분된 숫자가 포함된 문자열입니다. 이 숫자들은 ^ ~ ` ||와 같은 일부 특수 기호도 포함합니다. 예: ^1.0.4, ~2.3, 4.4.x, `=2.3.4, `1.0.9 ||

![image](/assets/img/2024-05-12-package-lockjsonTheCompleteGuide_2.png)



이 기호들은 npm에게 다른 정보를 전달해요:

예를 들어, "foo" 패키지를 설치하고 싶다고 해봅시다. npm i foo를 실행한 후에, 내 package.json 파일에는 대부분 다음과 같은 항목이 있을 거에요:

```js
{
  "dependencies": {
    "foo": "^2.3.0",
    ...
    ...
  }
}
```

여기서 foo는 2.3.0 [주 버전 부 버전 패치 버전] 버전으로 설치되었어요. 이 caret 기호는 또 다른 정보를 알려줘요:



^2.3.0 — Caret Symbol: npm에게 마이너 및 패치 버전을 업그레이드하도록 지시하지만 메이저 버전은 업그레이드하지 않습니다. 기본적으로 2.3.4, 2.3.9, 2.4.5, 2.8는 가능하지만 3.0.0부터는 불가능합니다. (마이너 및 패치는 업그레이드하지만 메이저는 제외)

~2.3.0 — Tilde Symbol: npm에게 패치 버전을 업그레이드하도록 지시하지만 마이너 및 메이저 버전은 업그레이드하지 않습니다. 따라서 2.3.4, 2.3.9는 가능하지만 2.4.0부터는 불가능합니다. (패치는 업그레이드하지만 마이너 및 메이저는 제외)

다른 npm 버전 업데이트 전략을 표시하는 여러 기호가 있습니다. 공식 npm 웹사이트가 좋은 참고자료가 될 것입니다.

따라서 "foo": "^2.3.0"의 경우, 며칠 후에 npm install을 실행하면 자동으로 마이너/패치 버전이 업그레이드될 수 있습니다. 이는 바람직하지 않습니다...



# 패키지 잠금파일(package-lock.json)이란?

![이미지](/assets/img/2024-05-12-package-lockjsonTheCompleteGuide_3.png)

패키지 잠금파일(package-lock.json)은 노드.js 프로젝트에 설치된 종속성/패키지들과 정확한 버전 번호에 대한 정보를 포함하는 잠금 파일(lockfile)입니다 (*중요).

- 이 파일은 동일한 저장소에서 작업하는 다른 개발자들이 이전에 설치된 정확한 패키지 버전을 설치할 수 있도록 도와줍니다. 새 버전의 패키지가 출시되어도 다른 기기/환경에서 동일한 node_modules 트리를 유지할 수 있습니다.
- 패키지 잠금파일(package-lock.json)은 종속성을 특정 버전 번호로 잠그는 데 주로 사용됩니다.
- 이 파일은 node_modules 트리나 package.json 파일 중 하나라도 변경이 있을 때 자동으로 생성(또는 재생성)됩니다.
- 저장소를 복제하고 새 기기에서 npm i를 실행할 때, npm은 먼저 패키지 잠금파일(package-lock.json)이 있는지 확인합니다. 있을 경우 해당 파일에 있는 패키지를 설치합니다. 그렇지 않으면 package.json 파일을 확인하고 필요한 종속성 패키지를 설치합니다. (📦 이에 대한 주의사항은 뒤의 글에서 설명됩니다)



<img src="/assets/img/2024-05-12-package-lockjsonTheCompleteGuide_4.png" />

# 패키지 잠금 파일(package-lock.json)은 커밋해야 하나요?

네, 이 파일은 소스 저장소에 커밋해야 합니다. 이렇게 하면 개발자가 귀하의 리포지토리를 클론할 때 귀하의 컴퓨터/환경에 설치된 의존성과 정확히 일치하는 의존성을 설치할 수 있습니다. 다른 컴퓨터에서 node.js 환경을 복제하는 데 도움이 됩니다.

# 참고로



저는 YouTube에서 아름다운 자바스크립트 체험을 보여주는 비디오를 만들고 있어요. (참고로 코딩 튜토리얼 채널은 아니에요...) 제 비디오를 확인해보세요:

# npm install이 package-lock.json을 다시 작성하는 이유 / 시기

- 📦 주의: npm install은 package.json의 버전 범위 내에 설치할 패키지가 있는 경우에만 package-lock.json을 고려합니다.
- 잠금 파일에 지정된 패키지 버전이 package.json 파일의 버전 범위 내에 없는 경우, 패키지가 업데이트되고 package-lock.json 파일이 덮어씌워집니다.
- package-lock.json을 덮어쓰기 대신 설치를 실패하게 하려면 npm ci를 사용하세요.

예를 들어,



패키지.json에서는 종속성을 다음과 같이 선언합니다:

```js
"foo": "^2.3.0"
```

그리고 npm install을 실행하면, 다음과 같은 package-lock.json이 생성됩니다:

```js
"foo": "2.3.0"
```



몇 일 후에, "foo"의 새로운 부 버전인 "2.4.0"이 출시됩니다. 그리고 이렇게 됩니다:

npm install — package-lock 버전이 범위 내에 있으므로(예: ^2.3.0) 2.3.0이 설치됩니다.
npm ci — 이 명령은 어차피 package-lock.json만을 보기 때문에 2.3.0이 설치됩니다.

다음으로, package.json을 수동으로 업데이트합니다:

```js
"foo": "^2.4.0"
```



그럼 다시 실행해주세요:

npm install 명령어를 실행하면 package-lock 파일의 버전이 범위 내에 없기 때문에 (예: ^2.4.0), 2.4.0 버전으로 설치되며 package-lock.json 파일은 이제 다음과 같이 다시 작성됩니다:
"foo": "2.4.0"

npm ci 명령어를 실행하면 package-lock.json 파일만 고려하지만 버전이 범위 내에 없기 때문에 오류가 발생합니다.

npm ci 명령어는 npm install과 유사하지만 테스트 플랫폼, 지속적인 통합, 배포 등과 같은 자동 환경에서 사용하기 위한 명령어입니다. 즉, 종속성을 깔끔하게 설치하고 싶은 경우에 유용합니다. (출처: npm 문서)



# 간단히 말해요:

- npm install은 결정론적이지 않아서, 수천 개의 종속성이 포함된 리포지토리(다수의 개발자들이 참여)에서 작업할 때 문제가 발생할 수 있어요.
- package-lock.json 파일은 npm install이 실행될 때 항상 동일한 node_modules 트리가 생성되도록 보장해줘요.
- 최신 명령어인 npm ci는 항상 동일한 node_modules 트리를 생성하도록 보장하며, 그렇지 않으면 오류를 발생시켜요.