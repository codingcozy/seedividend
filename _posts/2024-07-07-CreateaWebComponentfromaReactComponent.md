---
title: "React 컴포넌트에서 웹 컴포넌트 만드는 방법"
description: ""
coverImage: "/assets/img/2024-07-07-CreateaWebComponentfromaReactComponent_0.png"
date: 2024-07-07 21:26
ogImage: 
  url: /assets/img/2024-07-07-CreateaWebComponentfromaReactComponent_0.png
tag: Tech
originalTitle: "Create a Web Component from a React Component"
link: "https://medium.com/skeepers/create-a-web-component-from-a-react-component-bbe7c5f85ee6"
isUpdated: true
---



## 웹 컴포넌트 캡슐화가 제공하는 멋진 세계!

![이미지](/assets/img/2024-07-07-CreateaWebComponentfromaReactComponent_0.png)

웹 컴포넌트의 전체 칭찬에 대해 깊이 들어가지는 않겠습니다. 수백만 개의 기사들이 더 잘 설명해줄 수 있으니까요. 웹 컴포넌트는 우리에게 재사용 가능하고 독립적인 컴포넌트를 만들어 어디에서나 사용할 수 있게 해줍니다. 단일 JavaScript 프레임워크에 한정되지 않습니다. 그러나 저는 이 글을 작성한 이유는 주로 그들이 제공하는 캡슐화 때문입니다.

내 경험상, 클라이언트 웹사이트에 구현되는 "위젯"이라 불리는 작은 컴포넌트를 만들어야 했습니다. 이것은 쉽게 통합되고 재사용 가능하며 사용자 친화적이어야 했습니다. 이전에는 이 캡슐화를 달성하기 위해 iframe을 사용할 수 있었습니다. 그러나 점점 정교해지는 콘텐츠 보안 정책 (CSP) 및 보안 규칙로 인해 권한 관리가 악몽이 되었습니다. 클라이언트 DOM에 코드를 삽입하는 것은 다른 옵션이었지만 종종 폰트 크기가 누락되거나 !important로 인해 충돌하는 클라이언트 스타일과 같은 스타일 문제에 직면했습니다. 이는 우리와 클라이언트 모두에게 지저분하고 관리하기 어려운 문제로 이어졌습니다.

<div class="content-ad"></div>

## 🛠 Web Components를 활용해봐요!

여러 해 동안 Web Components의 부상을 보여줬는데요, 이는 캡슐화를 제공하고 위에서 언급한 문제들을 해결합니다. 사용자 친화적이며 접두사로 된 네임스페이스로 브랜딩이 가능하며 거의 모든 곳에서 호환되는데요 - 위젯을 만드는 완벽한 솔루션입니다.

하지만, 네이티브로 직접 웹 컴포넌트를 만드는 대신 React를 사용해야 하는 이유가 뭘까요? 잘못된 건 아니지만, VanillaJS로 웹 컴포넌트를 작성하는 것이 굉장히 매우 장황할 수 있다는 점입니다. 게다가 React에서 컴포넌트를 구축하면 복잡한 React로 관리되는 애플리케이션을 네이티브(또는 그렇지 않음) API와 함께 임베드할 수 있습니다. 또한, 이전에 만든 React 라이브러리에서 컴포넌트를 삽입할 수도 있어요. 오늘은 React에서 웹 컴포넌트를 만들고 싶었지만, SolidJS, VueJS 등과 같은 다양한 프론트엔드 프레임워크를 캡슐화하고 임베드하는 것도 완전히 가능합니다.

# 🚀 코딩할 시간입니다

<div class="content-ad"></div>

이론을 배웠으니 이제 실습할 시간입니다.

## 📦 설치

우리는 Vite를 사용하여 보일러플레이트를 만들 것입니다. 컴퓨터에 npm 및 node가 설치되어 있는 것으로 가정합니다!

```js
npm create vite
```

<div class="content-ad"></div>

프로젝트를 설정하기 위한 몇 가지 안내를 받게 될 것입니다. 설정은 매우 쉽습니다. 구성을 선택하고 Vite가 나머지를 처리하도록 해야 합니다.

![image](/assets/img/2024-07-07-CreateaWebComponentfromaReactComponent_1.png)

이제 vite-project라는 새 폴더로 들어가서 종속성을 설치하세요.

```js
cd vite-project && npm install && npm install sass && npm run dev
```

<div class="content-ad"></div>

이 명령을 사용하면 종속성을 설치하고 스타일을 사전 처리기 SASS로 작성하기 위해 sass를 설치하고 로컬 서버를 실행할 수 있습니다.

## 📦 React로 위젯 만들기

워크플로를 따라 Subscription 위젯을 만드는 것을 제안합니다. 예를 들어 src/components 폴더에 Subscription.tsx 파일을 생성할 수 있습니다.

```js
// src/components/Subscription.tsx

import { FC } from "react";

export interface ISubscriptionProps {
  username: string;
  shouldDisplayMentions?: boolean;
}

export const Subscription: FC<ISubscriptionProps> = ({ username, shouldDisplayMentions }: ISubscriptionProps) => {
  return (
    <>
      <div className="subscription">
        <h2 className="subscription__title">Subscription</h2>
        <p className="subscription__greeting">Hello {username}!</p>

        <label htmlFor="email">
          <input id="email" type="email" className="subscription__input" placeholder="Enter your email" />
        </label>

        {shouldDisplayMentions && <p className="subscription__mentions">My mention should be display here...</p>}
      </div>
    </>
  );
};
```

<div class="content-ad"></div>

좋아요, 두 개의 props인 username과 shouldDisplayMentions을 가져오는 React 컴포넌트를 만들었어요. 이 컴포넌트는 제목과 이메일 입력란이 있는 팝업 형식이에요.

하지만 아직 결과물은 보이지 않아요. Vite는 실시간 리로딩 기능을 제공해주어요. 이 기능을 최대한 활용해볼게요! /src/App.tsx로 이동해서 기존 내용을 모두 지우고 다음 코드를 붙여넣어 주세요 👇. 저장한 뒤 자랑스러운 작품을 감상해보세요...

```js
// src/App.tsx

import { Subscription } from "./components/Subscription";

function App() {
  return <Subscription shouldDisplayMentions username="Nicolas" />;
}

export default App;
```

![2024-07-07-CreateaWebComponentfromaReactComponent_2.png](/assets/img/2024-07-07-CreateaWebComponentfromaReactComponent_2.png)

<div class="content-ad"></div>

음, 보세요... 현재 상태는 좋지 않네요. 정말 솔직히 말하면 좀 못생겼다고 할 수 있어요. 이제 조금 스타일을 넣어볼 시간입니다!

```js
// src/components/Subscription.scss

.subscription {
  text-align: center;
  padding: 10px;
  max-width: 400px;
  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  font-family: "Roboto", sans-serif;

  &__title {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #0785ff;
  }

  &__greeting {
    font-size: 20px;
    margin: 0 0 20px 0;
  }

  &__input {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-bottom: 10px;
  }

  &__mentions {
    font-size: 14px;
    color: #666666;
  }
}
```

우리의 스타일이 여기 있어요. 이것을 컴포넌트에 추가해야 해요...

```js
// src/components/Subscription.tsx

import { FC } from "react";
import styles from "./Subscription.scss?inline"; // 👈 스타일 가져오기

// ...


export const Subscription: FC<ISubscriptionProps> = ({
  username,
  shouldDisplayMentions,
}: ISubscriptionProps) => {
  return (
    <>
      <style>{styles}</style> {/* // 👈 스타일 가져오기 */}
      <div className="subscription">
        <h2 className="subscription__title">Subscription</h2>
        <p className="subscription__greeting">Hello {username}!</p>

        {/* ...나머지 코드 */}
    </>
  );
};
```

<div class="content-ad"></div>

![image](/assets/img/2024-07-07-CreateaWebComponentfromaReactComponent_3.png)

Et voilà, you should have a component with our style. Of course, you can change it as you want.

![image](/assets/img/2024-07-07-CreateaWebComponentfromaReactComponent_4.png)

## 🚀 Create your Web Component From your React Component

<div class="content-ad"></div>

오랫동안 지연되었던 웹 구성 요소를 만들어 봅시다. 이를 위해 src 폴더의 루트에 새 파일 web-component.tsx를 추가하겠습니다.

```js
import ReactDOM from "react-dom/client";
import { ISubscriptionProps, Subscription } from "./components/Subscription";

export const normalizeAttribute = (attribute: string) => {
  return attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

class SubscriptionWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const props = this.getPropsFromAttributes<ISubscriptionProps>();
    const root = ReactDOM.createRoot(this.shadowRoot as ShadowRoot);
    root.render(<Subscription {...props} />);
  }

  private getPropsFromAttributes<T>(): T {
    const props: Record<string, string> = {};

    for (let index = 0; index < this.attributes.length; index++) {
      const attribute = this.attributes[index];
      props[normalizeAttribute(attribute.name)] = attribute.value;
    }

    return props as T;
  }
}

export default SubscriptionWebComponent;
```

위의 코드 덩어리는 웹 구성 요소를 선언하는 방법입니다. 좀 더 자세히 살펴보죠:

constructor는 요소가 생성될 때 호출됩니다. this.attachShadow(' mode: "open" ')를 사용하는 것을 볼 수 있는데, 이는 shadowRoot 메서드를 사용하여 Shadow DOM 내부 요소와 JavaScript 코드에서 상호 작용할 수 있도록 해줍니다.

<div class="content-ad"></div>

connectedCallback은 요소가 DOM에 추가된 후에 호출됩니다. 이 순간에는 태그의 속성이나 속성을 복원합니다. 그 후에는 React 애플리케이션을 Shadow DOM에 삽입합니다.

getPropsFromAttributes는 React 속성을 표준화하는 데 사용되는 도우미 함수입니다. 이것은 속성으로 속성을 전달하려면 prop 이름을 직접 사용할 수 없다는 것을 의미합니다. 대신, shouldDisplayMentions와 같은 prop 이름을 사용할 수 없습니다. 대신에 should-display-mentions와 같은 관습적인 네이밍 패턴을 따라야 합니다.

다음 단계는 웹 컴포넌트의 내보내기를 생성하여 라이브러리를 만드는 것입니다. 루트 src 폴더에 index.tsx라는 새 파일을 만드는 것을 제안합니다.

```js
// src/index.tsx

import SubscriptionWebComponent from "./web-component";

customElements.define("my-subscription", SubscriptionWebComponent);
```

<div class="content-ad"></div>

우리는 웹 구성 요소를 가져왔고 새로운 사용자 정의 요소를 설정했습니다. 첫 번째 매개변수에서는 당신의 태그 이름을 `my-subscription`으로 지정했고, 두 번째 매개변수에는 당신의 클래스 정의를 포함했습니다. 중요한 점은 태그 이름이 두 부분으로 구성된다는 것입니다: 첫 번째 부분은 당신의 네임스페이스이고, 두 번째 부분은 당신의 구성 요소의 이름입니다.

좋아요, 이제 웹 구성 요소를 구축하여 테스트해 볼 시간입니다. 그러나 먼저 번들러를 구성해야 합니다. vite.config.ts 파일로 가볼까요?

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  define: {
    "process.env": {
      NODE_ENV: "production",
    },
  },
  plugins: [react()],

  // 👇 이 코드를 추가해주세요
  build: {
    lib: {
      entry: "./src/index.tsx",
      name: "subscription",
      fileName: (format) => `subscription.${format}.js`,
    },
    target: "esnext",
  },
});
```

vite에게 우리 라이브러리를 구축할 것을 요청하여 웹 구성 요소와 함께 내보낼 파일을 지정했으며, umd 및 es와 같은 2개 형식을 갖기 위해 formats 키를 지정하지 않았습니다.

<div class="content-ad"></div>

이모든 작업을 끝낸 후에 우리는 라이브러리를 만들고 즐길 수 있어요!

```js
npm run build
```

# 🎉 테스트 시간!

빌드 명령어를 실행한 후 /dist 폴더가 생성된 것을 알게 될 거에요. 그 안에 index.html 파일을 만드는 것을 추천해요.

<div class="content-ad"></div>

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Example</title>
</head>

<body>
  <my-subscription username="방문자"></my-subscription>
  <script src="subscription.umd.js"></script>
</body>

</html>
```

간단히 index.html 파일을 브라우저에서 열어보세요. 요령되었습니다! 이제 구성 요소가 화면에 표시될 것입니다. 이제 my-subscription 태그에 속성 should-display-mentions=true를 추가하여 구성 요소가 변하는지 확인해보세요.

## 💥 더 나은 방법으로 만들 수 있습니다!

좋아요, 좋은데 사용자가 위젯을 공유하고 싶다면 사용자 정의를 허용하고 싶을 것입니다. 걱정하지 마세요. 당신은 그것을 할 수 있습니다. Subscription.scss 스타일 파일에서 CSS 변수를 소개할 것입니다.

<div class="content-ad"></div>

```js
// src/components/Subscription.scss

:host {
  --font-primary: "Roboto", sans-serif;
  --color-primary: #f44336;
}

.subscription {
  //...

  &__title {
    font-family: var(--external-font-primary, var(--font-primary));
    color: var(--external-color-primary, var(--color-primary));
  }


}
```

헷갈리시나요? 제가 설명해 드릴게요. :host는 간단한 CSS 가상 클래스입니다. 웹 구성 요소가 배치된 사용자 정의 요소를 선택하고 스타일을 지정하는 데 사용됩니다. 주로 구성 요소의 모양과 관련된 스타일을 캡슐화하고 정의하는 데 사용됩니다.

구성 요소 내에서 CSS 변수를 생성하고 값을 설정한 다음 구성 요소 내에서 사용할 수 있습니다. 예를 들어 var(--external-font-primary, var(--font-primary))를 고려해보세요. 첫 번째 변수는 :root 내에서 정의되며 두 번째 변수는 대체값으로 사용됩니다. 첫 번째 값이 정의되지 않은 경우 두 번째 값이 사용됩니다. 또한 :root 가상 클래스를 사용하여 사용자가 :host에서 정의한 변수를 재정의할 수도 있습니다.

색상 주요 변수를 재정의하고 사용자에게 자유롭게 사용할 수 있도록 해보죠.

<div class="content-ad"></div>

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Example</title>

  <style>
    /* 👇 여기에서 사용자 정의 가능합니다! */
    :root {
      --external-color-primary: #1a8917;
    }
  </style>
</head>

<body>
  <my-subscription username="방문자"></my-subscription>
  <script src="subscription.umd.js"></script>
</body>

</html>
```

페이지를 새로고침하면 제목이 녹색으로 표시될 것입니다! 사용자가 원하는 경우 오버라이드할 CSS 속성을 추가할 수 있습니다!

# ✌️결론

이는 Web Components 및 캡슐화에 대한 좋은 소개를 제공합니다. 나만의 공유 가능한 위젯을 만드는 데 흥미를 불러일으킬 수 있기를 바랍니다. 앞서 말했듯이, 저는 매일 사용하는 React를 사용하여 편안하게 사용합니다. 그러나 즐겨 사용하는 프레임워크를 사용하여 캡슐화된 애플리케이션을 만들 수 있습니다. 특히 Shopify와 같은 확장 앱을 개발할 때 이 접근 방식이 매우 유용합니다.

<div class="content-ad"></div>

👀 제 GitHub 저장소에 코드를 공유했어요. 자유롭게 시도해보세요! 그리고 기억하세요. GitHub에서는 https://github.com을 https://github.dev로 변경하여 프로젝트를 Visual Studio Code에서 바로 열 수 있어요! 👋
