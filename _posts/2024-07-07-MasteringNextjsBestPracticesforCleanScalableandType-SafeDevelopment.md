---
title: "Nextjs 마스터하기 깔끔하고 확장 가능하며 타입 안전한 개발을 위한 모범 사례"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-MasteringNextjsBestPracticesforCleanScalableandType-SafeDevelopment_0.png"
date: 2024-07-07 21:56
ogImage:
  url: /assets/img/2024-07-07-MasteringNextjsBestPracticesforCleanScalableandType-SafeDevelopment_0.png
tag: Tech
originalTitle: "Mastering Next.js: Best Practices for Clean, Scalable, and Type-Safe Development"
link: "https://medium.com/@iqbalpa/mastering-next-js-best-practices-for-clean-scalable-and-type-safe-development-2ee5693e73a9"
---

현대 웹 개발에서 Next.js는 견고하고 동적인 웹 애플리케이션을 구축하는 강력한 프레임워크로 떠오르고 있습니다. 그 유연성과 서버 측 렌더링(SSR) 및 정적 사이트 생성(SSG)과 같은 기능들로 인해, 개발자들이 고성능 웹 사이트를 만드는 데 선택하는 주요 도구가 되었습니다. 그러나 Next.js의 최대 잠재력을 활용하려면, 코드 품질, 유지 보수성 및 확장성을 보장하는 최상의 사례에 따라야 합니다. 본 문서에서는 SOLID 원칙, TypeScript 지침 및 Next.js 특화 전략을 아우르는 포괄적인 최상의 사례를 탐구하여, Next.js 프로젝트를 탁월한 수준으로 발전시킬 수 있도록 돕겠습니다.

![이미지](/TIL/assets/img/2024-07-07-MasteringNextjsBestPracticesforCleanScalableandType-SafeDevelopment_0.png)

## 제 1장: Next.js 개발에서 객체 지향 원칙

객체 지향 프로그래밍(OOP)은 "객체"라는 개념을 기반으로 하는 프로그래밍 패러다임으로, 이 객체는 필드(속성 또는 프로퍼티)에 데이터와 프로시저(메서드 또는 함수)에 코드를 포함할 수 있습니다. OOP 원칙을 준수하면 소프트웨어 시스템을 모듈식, 유연하고 유지보수하기 쉽게 설계하고 구현할 수 있습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 캡슐화

- 캡슐화는 데이터를 해당 데이터에 작용하는 메서드와 함께 묶거나, 객체의 일부 구성 요소에 대한 직접 액세스를 제한하는 것을 말합니다. 이는 객체의 내부 상태를 숨기고 상호 작용하는 데 제어된 인터페이스만 노출함으로써 도와줍니다.
- 자물쇠가 있는 금고를 생각해보세요. 자물쇠는 금고 안의 보물을 캡슐화하여 키(메서드)를 가진 사람들만 액세스할 수 있도록 합니다. 이렇게 함으로써 보물이 무단으로 액세스되거나 수정되는 것을 방지할 수 있습니다.

```js
class Post {
  constructor(title, content) {
    this._title = title; // 캡슐화된 속성
    this._content = content; // 캡슐화된 속성
  }

  getTitle() {
    return this._title; // 게터 메서드
  }

  setContent(content) {
    this._content = content; // 세터 메서드
  }

  getContent() {
    return this._content;
  }
}
```

## 추상화

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 추상화는 복잡한 구현 세부 사항을 숨기고 객체의 핵심 기능만 표시하는 과정입니다. 이는 객체가 무엇을 하는지에 초점을 맞춘 채 그것이 어떻게 하는지보다는 복잡성을 관리하는 데 도움이 됩니다.
- 자동차 계기판을 생각해보십시오. 이는 차의 내부 메커니즘을 공개하지 않고 속력, 연료 수준 및 엔진 온도와 같은 중요한 정보를 운전자에게 제공합니다. 이 추상화로 인해 운전자는 불필요한 세부 정보에 압도되지 않고 운전에 집중할 수 있습니다.

```js
class Post {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }

  displayPost() {
    console.log(`Title: ${this.title}`);
    console.log(`Content: ${this.content}`);
  }
}
```

## 상속

- 상속은 새 클래스가 기존 클래스로부터 속성과 메서드를 파생하는 메커니즘입니다. 이는 코드의 재사용성을 촉진하고 각 하위 클래스가 상위 클래스에서 속성과 동작을 상속받아 클래스 계층 구조를 생성하는 것을 허용합니다.
- 이전 세대로부터 일부 특성과 특징을 상속받는 가족 계보를 상상해보십시오. 마찬가지로 OOP에서는 하위 클래스가 상위 클래스로부터 속성과 메서드를 상속받아 클래스 계층 구조를 형성합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  displayInfo() {
    console.log(`Name: ${this.name}`);
    console.log(`Age: ${this.age}`);
  }
}

class User extends Person {
  constructor(name, age, email) {
    super(name, age); // 상위 클래스 생성자 호출
    this.email = email;
  }

  displayUser() {
    super.displayInfo(); // 상위 클래스 메서드 호출
    console.log(`Email: ${this.email}`);
  }
}
```

## 다형성

- 다형성은 서로 다른 클래스의 객체를 공통 슈퍼클래스의 객체로 취급할 수 있게 합니다. 이는 메서드를 슈퍼클래스에서 정의하고 서브클래스에서 오버라이드할 수 있어 코드의 유연성과 확장성을 제공합니다.
- “draw”라는 메서드를 가진 모양 클래스를 생각해보세요. 이 draw 메서드는 각 모양 서브클래스(e.g., 원, 사각형, 삼각형)마다 다르게 구현될 수 있어 각 모양이 고유한 방식으로 그려질 수 있으면서도 여전히 모양으로 처리될 수 있습니다.

```js
class Admin extends User {
  constructor(name, age, email, role) {
    super(name, age, email);
    this.role = role;
  }

  displayUser() {
    super.displayUser();
    console.log(`Role: ${this.role}`);
  }
}

class Guest extends User {
  constructor(name, age, email, status) {
    super(name, age, email);
    this.status = status;
  }

  displayUser() {
    super.displayUser();
    console.log(`Status: ${this.status}`);
  }
}
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

다음 옵젝트 지향 원칙들을 적용하여 Next.js 개발을 하면 모듈화되고 유연하며 유지보수가 용이한 코드를 디자인할 수 있어 애플리케이션을 구축하고 확장하기가 더 용이해집니다.

# Chapter 2: SOLID 원칙

## 단일 책임 원칙 (SRP)

- SRP는 클래스가 변경될 이유가 하나여야 한다고 이야기합니다. 이것은 클래스가 하나의 책임이나 역할만을 가져야 한다는 것을 의미합니다. 이 원칙은 클래스를 보다 집중적으로 만들어 이해하기 쉽고 버그 발생 가능성을 줄이는 데 도움이 됩니다.
- 예를 들어 빵을 굽는 일을 담당하는 제빵사가 있다고 상상해보세요. 만약 제빵사가 갑자기 빵을 굽는 일에 더해 고객에게 빵을 배달하는 책임도 맡는다면, 빵의 품질이 하락할 수 있습니다. 굽기에만 집중함으로써, 제빵사는 항상 완벽하게 빵을 굽을 수 있음을 보장할 수 있습니다.
- 다음은 Next.js에서 SRP를 적용하는 예시입니다. Card 컴포넌트를 만들고 싶다고 가정해봅시다. Card 폴더를 만들어 컴포넌트 자체와 필요한 상수들이 포함되도록 합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 컴포넌트인 Card.tsx입니다.

```js
import React from "react";
import { CardProps } from "./constants";

const Card: React.FC<CardProps> = ({ title, desc, color }) => {
  return (
    <div
      data-testid="card"
      style={{ backgroundColor: `#${color}` }}
      className="p-12 w-[348px] h-full lg:h-[438px] rounded-[30px] shadow-lg"
    >
      <h2 className="text-lg font-bold mb-3">{title}</h2>
      <p>{desc}</p>
    </div>
  );
};

export default Card;
```

2. 상수들을 저장하는 constants.ts.

```js
export type CardProps = {
  title: string,
  desc: string,
  color: string,
};
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

위의 두 가지를 분리함으로써 코드의 전반적인 가독성을 향상시킬 수 있습니다.

## 개방/폐쇄 원칙 (OCP)

- OCP는 소프트웨어 엔티티가 확장 가능하도록 열려 있지만 변경에는 폐쇄되어야 함을 명시합니다. 이는 기존 코드를 변경하지 않고 시스템에 새 기능을 추가할 수 있어야 함을 의미합니다.
- 차량을 예로 들어보겠습니다. 켄버파블 로프 랙이나 스포일러와 같은 다양한 액세서리로 쉽게 사용자 정의할 수 있도록 설계된 차량을 고려해보세요. 차량의 디자인은 이러한 액세서리를 추가하거나 제거할 수 있도록 해줌으로써 차량의 핵심 구조를 수정할 필요가 없게 합니다.
- Next.js에서 OCP를 구현하는 방법은 컴포넌트 확장의 사용입니다. 함수 컴포넌트를 확장하고 처음/기본 컴포넌트에 영향을 주지 않고 새 UI 컴포넌트를 추가할 수 있습니다. 이것이 각각 확장 가능하게 열려 있지만 수정에는 폐쇄된 구현입니다.

```js
# Card.tsx
type CardProps = {
  title: string;
  desc: string;
}

const Card: React.FC<CardProps> = ({title, desc}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{desc}</p>
    </div>
  )
}
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
# ExtendedCard.tsx
타입 ExtendedCardProps = {
  CardProps CardProps;
  좋아요 갯수 number;
}

const ExtendedCard: React.FC<ExtendedCardProps> = ({CardProps, 좋아요 갯수}) => {
  return (
    <div>
      <Card 속성={...CardProps} />
      <p>{좋아요 갯수}</p>
    </div>
  )
}
```

ExtendedCard 컴포넌트는 Card 컴포넌트에 새로운 요소를 추가하여 props 및 컴포넌트 자체를 확장합니다.

## Liskov Substitution Principle (LSP)

- LSP는 슈퍼클래스의 객체가 서브클래스의 객체로 대체될 수 있어야하며 프로그램의 정확성에 영향을 주지 않아야한다고 명시합니다. 즉, 서브클래스는 에러를 발생시키지 않고 기본 클래스를 대체할 수 있어야 합니다.
- 리모컨 자동차를 생각해보세요. 서로 다른 종류의 배터리를 교체할 수 있는 경우를 말합니다. 배터리가 맞고 필요한 전원을 제공한다면 어떤 브랜드나 종류의 배터리든 자동차의 작동에 영향을주지 않고 사용할 수 있습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

다음은 Next.js 컴포넌트에서 LSP 구현 예제입니다. 이 예제에서는 DisabledButton 컴포넌트가 Button 컴포넌트의 하위 클래스입니다. DisabledButton 컴포넌트는 기본 Button 컴포넌트의 기능을 확장하여 disabled 속성을 추가합니다. 하위 클래스임에도 불구하고, DisabledButton 컴포넌트는 Button 컴포넌트와 심리스하게 교체할 수 있으며 애플리케이션의 동작에 영향을 주지 않기 때문에 LSP를 준수합니다.

```js
// components/Button.tsx
import React from "react";

interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
```

```js
// components/DisabledButton.tsx
import React from "react";
import Button from "./Button";

interface DisabledButtonProps {
  onClick: () => void;
}

const DisabledButton: React.FC<DisabledButtonProps> = ({ onClick, children }) => {
  return (
    <Button onClick={onClick} disabled>
      {children}
    </Button>
  );
};

export default DisabledButton;
```

```js
// pages/index.tsx
import React from "react";
import Button from "../components/Button";
import DisabledButton from "../components/DisabledButton";

const Home: React.FC = () => {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <Button onClick={handleClick}>Click me!</Button>
      <DisabledButton onClick={handleClick}>Click me!</DisabledButton>
    </div>
  );
};

export default Home;
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## Interface Segregation Principle (ISP)

- ISP는 클라이언트가 사용하지 않는 인터페이스에 의존하지 않아야 한다는 원칙을 말합니다. 대신, 인터페이스는 클라이언트의 필요에 맞게 더 작고 더 집중된 인터페이스로 분리되어야 합니다.
- 예를 들어 사전 설치된 다양한 앱이 함께 제공되는 스마트폰을 상상해보세요. 모든 일을 처리하는 하나의 앱이 아니라 각 앱은 메시지, 이메일 또는 지도와 같이 특정 작업을 위해 설계되어 있어 전화 사용이 더욱 효율적이고 쉬워집니다.

이 예시에서 Card 구성 요소는 TextCardProps, ImageCardProps, VideoCardProps와 같은 필요한 인터페이스에만 의존하여 인터페이스 분리 원칙을 따르며, 애플리케이션에서 유지 보수 및 유연성이 향상됩니다.

```js
// Card/constants.ts
interface TextCardProps {
  type: "text";
  text: string;
}

interface ImageCardProps {
  type: "image";
  imageUrl: string;
}

interface VideoCardProps {
  type: "video";
  videoUrl: string;
}

type CardProps = TextCardProps | ImageCardProps | VideoCardProps;
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
// Card/Card.tsx
import React from "react";
import { CardProps } from "../interfaces";

const Card: React.FC<CardProps> = ({ type, ...props }) => {
  switch (type) {
    case "text":
      return <div>{(props as TextCardProps).text}</div>;
    case "image":
      return <img src={(props as ImageCardProps).imageUrl} alt="Card" />;
    case "video":
      return <video src={(props as VideoCardProps).videoUrl} controls />;
    default:
      return null;
  }
};

export default Card;
```

```js
// pages/Home.tsx
import React from "react";
import Card from "../components/Card";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Cards</h1>
      <Card type="text" text="This is a text card" />
      <Card type="image" imageUrl="https://example.com/image.jpg" />
      <Card type="video" videoUrl="https://example.com/video.mp4" />
    </div>
  );
};

export default Home;
```

## 의존 역전 원칙 (DIP)

- DIP(Dependency Inversion Principle)은 고수준 모듈이 저수준 모듈에 의존하지 않아야 한다는 것을 말합니다. 그 대신 둘 다 추상화에 의존해야 합니다. 이는 모듈들을 분리하여 재사용 가능하고 테스트하기 쉽게 만들어줍니다.
- 벽돌로 지어진 집을 생각해보세요. 각 벽돌이 아래 벽돌에 의존하는 대신, 모든 벽돌이 기초에 의존합니다. 기초가 튼튼하면 개별 벽돌을 교체해도 집은 안정적으로 유지됩니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

Next.js에서는 React의 Context API 또는 의존성 주입을 사용하여 의존성 역전 원칙(Dependency Inversion Principle, DIP)을 구현할 수 있습니다. 여기서 StoreProvider 컴포넌트는 나머지 애플리케이션에 Redux 스토어를 제공하는 역할을 합니다. 이를 통해 스토어의 생성을 사용하는 컴포넌트와 분리하여 테스트와 재사용성을 촉진합니다.

```js
// providers/StoreProvider.tsx
"use client";

import React, { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../context/hamburgerContext/store";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
 const storeRef = useRef<AppStore>();
 if (!storeRef.current) {
  // 처음 렌더링될 때 스토어 인스턴스를 생성합니다.
  storeRef.current = makeStore();
  storeRef.current.dispatch({ type: "INITIALIZE_HAMBURGER" });
 }

 return <Provider store={storeRef.current}>{children}</Provider>;
}
```

```js
// pages/_app.tsx
import "@/styles/globals.css";
import "@/styles/carousel.style.css";
import type { AppProps } from "next/app";
import TranslateProvider from "../providers/TranslateProvider";
import BaseLayout from "../components/elements/layout/BaseLayout";
import StoreProvider from "../providers/StoreProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TranslateProvider>
      <StoreProvider>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </StoreProvider>
    </TranslateProvider>
  );
}
```

## SOLID 원칙의 구현 장점

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

Next.js 프로젝트에서 SOLID 원칙을 적용하면 여러 가지 이점을 누릴 수 있어요.

- 향상된 코드 품질: SOLID 원칙을 따르면 더 깨끗하고 조직화된 코드를 작성할 수 있어요. 이는 이해하기 쉽고 유지보수하기 쉬운 코드로 이어지며 버그가 적어지고 개발 주기가 빨라집니다.
- 더 나은 확장성: SOLID 원칙은 모듈화된 설계를 촉진하여 새로운 기능을 추가하거나 애플리케이션을 확장할 때 쉬워집니다. 기존 기능을 수정하지 않고 기능을 확장할 수 있어요. 이는 코드 재사용을 촉진하고 버그 발생 가능성을 줄입니다.
- 향상된 유지보수성: SOLID 원칙을 적용하면 각 구성 요소가 단일 책임을 가지게 되어 문제가 발생했을 때 이를 분리하고 수정하기 쉬워집니다. 이는 새로운 개발자가 코드베이스에 익숙해지고 이해하기 쉽게 만들어 줘요.
- 더 큰 유연성: SOLID 원칙을 따르면 Next.js 애플리케이션의 동작을 쉽게 변경하거나 확장할 수 있습니다. 이 유연성은 요구 사항의 변화에 적응하거나 새로운 기능을 통합하는 데 중요합니다.
- 쉬운 테스트: SOLID 원칙은 격리된 환경에서 테스트하기 쉬운 코드를 촉진합니다. 이는 신뢰할 수 있는 테스트와 코드 정확성에 대한 더 높은 수준의 신뢰를 보장해 줍니다. 특히 Next.js 프로젝트에서는 구성 요소간 복잡한 상호작용으로 인해 테스트가 어려울 수 있습니다.

요약하자면, Next.js 프로젝트에서 SOLID 원칙을 적용하면 더 견고하고 유지보수하기 쉬운 확장 가능한 애플리케이션으로 이끌어줍니다. 이는 개발 경험과 최종 제품의 품질을 향상시킵니다.

# 제 3장: Next.js 및 Typescript Best Practices

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 장에서는 Next.js와 TypeScript를 사용하는 최상의 방법에 대해 알아보겠습니다. 이는 강력한 React 프레임워크의 장점과 정적 타이핑의 안전성 및 명확성을 결합한 것입니다. TypeScript가 어떻게 Next.js에서 개발 경험을 향상시키는지에 대해 살펴보겠습니다. 프로젝트 설정부터 컴포넌트 구조화 및 데이터 처리까지! 함께 알아봅시다!

1. `Avoid any and type everything`. 항상 any가 아닌 다른 타입으로 변수 또는 상수를 선언해야 합니다. TypeScript에서 타입 없이 변수나 상수를 선언할 때, 변수/상수의 타입은 할당된 값에 따라 추론됩니다. 새 프로젝트에서는 모든 엄격한 타입 확인 옵션을 활성화하기 위해 tsconfig.json 파일에서 strict:true를 설정하는 것이 좋습니다.

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

2. `Type Annotations for Props and State`. Next.js에서 TypeScript를 사용할 때, 컴포넌트의 props와 state에 대한 유형 주석을 제공하는 것이 중요합니다. 이는 컴포넌트로 흐르는 데이터의 올바른 유형을 보장하여 런타임 오류의 가능성을 줄입니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![Mastering Next.js: Best Practices for Clean, Scalable, and Type-Safe Development](/TIL/assets/img/2024-07-07-MasteringNextjsBestPracticesforCleanScalableandType-SafeDevelopment_1.png)

![Mastering Next.js: Best Practices for Clean, Scalable, and Type-Safe Development](/TIL/assets/img/2024-07-07-MasteringNextjsBestPracticesforCleanScalableandType-SafeDevelopment_2.png)

3. Leverage Functional Components and React Hooks. Functional components and React hooks are a powerful combination in Next.js. Functional components are easier to read and maintain, while hooks like useState and useEffect provide a cleaner way to manage state and side effects.

![Mastering Next.js: Best Practices for Clean, Scalable, and Type-Safe Development](/TIL/assets/img/2024-07-07-MasteringNextjsBestPracticesforCleanScalableandType-SafeDevelopment_3.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

4. TypeScript 유틸리티 타입(Partial, Required, Omit) 사용하기. Partial, Required, Omit과 같은 TypeScript 유틸리티 타입을 활용하면 더 정확한 타입 정의를 만들 수 있습니다. Partial을 사용하면 타입의 모든 속성을 옵션으로 만들 수 있고, Required는 타입의 모든 속성이 필수임을 보장하며, Omit은 기존 타입에서 특정 속성을 제외한 새로운 타입을 생성합니다.

5. ESLint로 코드 서식 일관성 유지 설정하기. ESLint는 코드 서식 지원 도구로 프로젝트 전체에서 일관된 코드 스타일을 유지하는 데 도움을 줍니다. Next.js 프로젝트에 설정하면 코드가 일관되게 서식이 맞춰져 가독성과 유지보수가 쉬워집니다.

![이미지](/TIL/assets/img/2024-07-07-MasteringNextjsBestPracticesforCleanScalableandType-SafeDevelopment_4.png)

6. "?"로 옵션으로 지정하기. TypeScript에서는 타입 정의에서 속성 이름 뒤에 "?"를 추가하여 속성을 옵션으로 표시할 수 있습니다. 이는 가끔 필요하지 않은 프롭스나 상태 속성이 있는 경우 유용합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

7. 조건부 렌더링. 조건부 렌더링은 특정 조건에 따라 다른 컴포넌트나 요소를 렌더링할 수 있습니다. 이를 위해 일반 JavaScript if 문이나 삼항 연산자를 JSX 코드 내에서 사용할 수 있습니다.

8. Redux를 사용하여 전역 상태 관리 활성화하기. Redux는 React 및 Next.js 애플리케이션에 많이 사용되는 상태 관리 라이브러리입니다. Redux를 사용하면 전역 상태를 유지할 수 있어 어떤 컴포넌트에서든 액세스할 수 있으며, 컴포넌트 트리의 여러 수준을 통해 props를 전달할 필요가 없습니다 (state drilling).

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![이미지](/TIL/assets/img/2024-07-07-MasteringNextjsBestPracticesforCleanScalableandType-SafeDevelopment_7.png)

9. 타입 정의, 인터페이스 및 상수를 하나의 파일로 분리하세요. 타입 정의, 인터페이스 및 상수를 하나의 파일에 유지하면 깔끔하고 조직적인 프로젝트 구조를 유지할 수 있습니다. 이렇게 하면 프로젝트가 성장함에 따라 타입 정의를 찾고 관리하는 것이 쉬워집니다.

![이미지](/TIL/assets/img/2024-07-07-MasteringNextjsBestPracticesforCleanScalableandType-SafeDevelopment_8.png)

10. 항목 목록을 만들고 배열을 반복하여 컴포넌트 목록을 만드세요. Next.js에서 항목 목록을 렌더링할 때 map 함수를 사용하여 배열을 반복하고 각 항목에 대해 컴포넌트를 렌더링할 수 있습니다. 이를 통해 기본 데이터가 변경될 때 자동으로 업데이트되는 동적 목록을 만들 수 있습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![이미지](/TIL/assets/img/2024-07-07-MasteringNextjsBestPracticesforCleanScalableandType-SafeDevelopment_9.png)

## Next.js의 장점 - TypeScript Best Practice

Next.js와 TypeScript를 결합하면 강력한 유형 시스템을 제공하여 코드 가독성과 유지 관리성을 향상시킬 수 있습니다. 이는 개발 중에 오류를 잡는 데 도움이 되며 이 조합은 더 견고하고 신뢰할 수 있는 애플리케이션을 만드는 데 기여할 수 있습니다. 또한 Next.js에서 TypeScript를 사용하면 더 나은 코드 구성 및 확장성을 구현할 수 있어 더 큰 코드베이스를 관리하고 개발팀 간 협업을 더 쉽게 할 수 있습니다.

참고문헌
