---
title: "Angular 프로젝트에서 React 컴포넌트 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-UseReactComponentInsideAngularProject_0.png"
date: 2024-06-22 03:34
ogImage:
  url: /assets/img/2024-06-22-UseReactComponentInsideAngularProject_0.png
tag: Tech
originalTitle: "Use React Component Inside Angular Project"
link: "https://medium.com/@wahidsaeed1/use-react-component-inside-angular-project-3c816213933c"
isUpdated: true
---

<img src="/assets/img/2024-06-22-UseReactComponentInsideAngularProject_0.png" />

많은 글에서 어떤 인기 있는 프레임워크가 더 나은지에 대한 논쟁을 보았을 겁니다. React JS인지 Angular인지요. 그러나 제가 알기로는 대부분의 현대 프레임워크들은 비슷하다고 생각해요. (각 프레임워크의 백지상태의 자바스크립트 뒷단이 어떻게 돌아가는지 알고 있다면 말이죠.) 단지 작은 구문 변경과 브라우저에서 div를 렌더링하는 방식에 약간의 차이만 있을 뿐입니다.

React JS가 최고인지 Angular가 최고인지는 중요하지 않아요. 전문가들은 신경 쓰지 않으며 더 많이 솔루션을 제공하는데 초점을 맞추죠.

그래서 만약 우리가 Angular와 React JS를 동시에 단일 프로젝트에서 사용하여 이 논쟁을 마무리짓는다면 어떨까요?

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

이를 위해 첫 번째 단계는 다음 명령을 CMD에서 실행하여 Angular 프로젝트를 초기화하는 것입니다:

```js
ng new angular-react

cd angular-react
```

위의 명령은 최신 버전의 새로운 Angular 프로젝트를 만들고, 그 후에 해당 프로젝트 루트 폴더로 이동합니다.

이후에 Angular 내에서 React를 지원하기 위한 모든 종속성들을 추가하세요:

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
npm install react, react-dom
```

프로젝트 내에서 React 패키지가 설치되면, React 컴포넌트를 작성하기 위해 tsconfig.json 파일을 .tsx를 지원하도록 업데이트해야 합니다:

```js
{
  "compilerOptions": {
    ...
    "jsx": "react",
    ...
  },
}
```

tsconfig.json 파일에서 compilerOptions 아래에 "jsx" 속성을 추가하고 값을 "react"로 설정하세요. 이렇게 하면 TypeScript 컴파일러가 JSX 또는 TSX 파일과 코드를 이해하고 지원할 수 있게 됩니다.

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

Typescript 구성이 완료되면 Angular에서 실제 React 코드가 작성된 새 컴포넌트를 생성할 것입니다.

```js
ng g c react-comp
```

위 명령은 프로젝트의 app 폴더에 새 컴포넌트를 추가할 것입니다. 컴포넌트를 추가한 후에는 react-comp.component.ts의 확장자를 react-comp.component.tsx로 변경하십시오.

```js
/** 컴포넌트 폴더 구조 **/

- react-comp
    react-comp.component.css
    react-comp.component.html
    react-comp.component.ts -> react-comp.component.tsx
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

HTML 파일에 div를 추가하고 ID를 할당하세요. 이렇게 하면 React가 해당 루트 div를 찾도록 도와줍니다:

```js
<p>react-comp works!</p>
<div id="react-comp"></div>
```

.tsx 파일 안에 다음 코드를 복사하세요:

```js
import { Component } from '@angular/core';
import React from 'react'
import ReactDOM from 'react-dom/client';
import { MyComponent } from 'react-sample'

@Component({
  selector: 'app-react-comp',
  standalone: true,
  imports: [],
  templateUrl: './react-comp.component.html',
  styleUrl: './react-comp.component.css'
})
export class ReactCompComponent {

  ngOnInit(): void {
    const root = ReactDOM.createRoot(
      document.getElementById('react-comp') as HTMLElement
    )

    root.render(
      <div>
        <MyComponent message='이거 에갈앵 안에 있는 리액트 컴포넌트입니다'  />
      </div>
    )

  }

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

위 코드는 Angular 컴포넌트이며, 컴포넌트 라이프사이클의 ngOnInit 이벤트에서 React 컴포넌트를 렌더링합니다.

그러면 이제 Angular 내에서 React 컴포넌트를 실행할 수 있습니다.

이 글의 자세한 설명을 원하시면 아래 링크를 참조해 주세요.

링크: [https://youtu.be/iI8IMVMrzWc](https://youtu.be/iI8IMVMrzWc)
