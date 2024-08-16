---
title: "Tailwind CSS로 복잡한 애니메이션 만드는 방법"
description: "Tailwind CSS 사용할 때 애니메이션을 작업하는 방법에 대해서 소개합니다"
coverImage: ""
date: 2024-08-03 16:52
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
isUpdated: true
---





# Tailwind CSS로 복잡한 애니메이션 만드는 방법

TailwindCSS를 사용하여 인상적이고 복잡한 애니메이션을 만드는 방법에 대해 살펴보겠습니다. TailwindCSS는 개발자들이 모던하고 반응형이며 시각적으로 매력적인 사용자 인터페이스를 쉽게 구축할 수 있는 매우 인기있는 유틸리티 기반 CSS 프레임워크입니다.

<div class="content-ad"></div>

## TailwindCSS 소개

복잡한 애니메이션에 들어가기 전에, TailwindCSS를 간단히 소개하겠습니다. TailwindCSS는 HTML 요소에 직접 적용할 수 있는 다양한 유틸리티 클래스를 제공하여 사용자 지정 CSS를 작성하지 않고도 UI 컴포넌트를 구축할 수 있도록 하는 CSS 프레임워크입니다. TailwindCSS의 유연성을 통해 개발자들은 광범위한 디자인 스타일과 애니메이션을 손쉽게 구현할 수 있습니다.

## 준비물

- TailwindCSS 설정
- CSS 및 CSS에서의 애니메이션에 대한 기본적인 이해

## 우리가 만들 것

Tailwind CSS로 아래와 같은 애니메이션을 만들어보겠습니다.

<div class="content-ad"></div>

<img src="https://miro.medium.com/v2/resize:fit:1200/1*7luPcDVyB3smqaaFIgZ0SA.gif" />

## Tailwind CSS 애니메이션 시작하기

애니메이션에 들어가기 전에 프로젝트에 Tailwind CSS를 설정했는지 확인하세요.

Tailwind CSS는 HTML 요소에 적용할 수 있는 애니메이션에 대한 제한된 집합의 유틸리티 클래스를 제공합니다. 이를 살펴보겠습니다.

## 애니메이션 적용하기

TailwindCSS에는 Spin, Bounce, Ping, Pulse 등 다양한 미리 정의된 애니메이션이 있습니다. 요소에 애니메이션을 적용하려면 원하는 애니메이션 이름 뒤에 animate 클래스를 추가하면 됩니다. 예를 들어, spin 애니메이션을 적용하려면 animate-spin 클래스를 사용할 수 있습니다. 다음은 예시입니다.

```html
<div class="animate-spin">Look Mom! I am spinning!</div>
```

<div class="content-ad"></div>

이것은 페이지가 로드될 때 화면에서 div 요소를 회전시켜 "회전" 애니메이션을 적용합니다.

## 사용자 정의 애니메이션 정의하기

Tailwind.config.js에서 사용자 정의 애니메이션을 만들거나 기존 애니메이션을 사용자 정의하는 방법을 살펴보겠습니다.

새로운 @keyframes 애니메이션을 추가하려면 테마 구성의 keyframes 섹션을 사용하고 animation 섹션에 애니메이션을 추가하면 됩니다.

```js
module.exports = {
  theme: {
    extend: {
      animation: {
        //기존 애니메이션 사용자 정의하기
        "spin-slow": "spin 3s linear infinite",

        //새로운 애니메이션 추가하기
        "my-animation": "new-animation 3s linear infinite",
      },
      keyframes: {
        //여기서 새로운 애니메이션을 위한 keyframes를 추가합니다.
        "new-animation": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
};
```

이제 우리는 이 유틸리티를 사용하여 우리만의 사용자 정의 애니메이션을 만들 수 있습니다. 우리는 먼저 애니메이션의 @keyframes를 추가해야 합니다.

```js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        //우리의 fall 애니메이션 keyframes
        fall: {
          "0%": { transform: "translate(0%,-150%) skewX(0deg)" },
          "50%": { transform: "translate(0%,0%) skewX(-10deg)" },
          "100%": { transform: "translate(0%,150%) skewX(0deg)" },
        },
      },

      animation: {
        // 그런 다음 테마 구성의 애니메이션 섹션에서 이러한 keyframes를 이름으로 참조할 수 있습니다.
        fall: "fall 3s ease infinite",
        // 애니메이션 단축 CSS 속성 즉
        // 애니메이션 이름 | 애니메이션 지속 시간 | 애니메이션 타이밍 함수
        // 애니메이션 반복 횟수
      },
    },
  },
};
```

<div class="content-ad"></div>

이렇게 하면 이제 animate-fall 클래스를 적용하여 모든 요소에 우리의 fall 애니메이션을 적용할 수 있습니다.

우리의 fall 애니메이션을 사용할 준비가 되었습니다.

<img src="https://miro.medium.com/v2/resize:fit:1200/1*h2VZc5HtFSj1UBd1gp6_kg.gif" />

<div class="content-ad"></div>

이제 우리의 애니메이션을 해체해 보겠습니다.

- "Develop"라는 단어가 위에서 내려와 하단으로 외부로 확장됩니다.
- "Develop"가 나간 후에 "Design"이

중앙으로 우아하게 내려가며, 동기화를 보장하기 위해 애니메이션 주기의 절반(이 경우 1.5초)의 지연을 가집니다.

- "Develop"와 "Design"의 각 글자는 파도 모양으로 내려가며, 각 글자의 하강 사이에 100ms 또는 150ms의 지연이 있어 매력적인 시각적 효과를 만듭니다.

하지만 이를 어떻게 할까요? tailwind.config.js에는 하나의 애니메이션만 정의할 수 있고 애니메이션 지연을 적용할 수 있는 유틸리티 클래스가 없습니다.

이를 수행하는 방법이 두 가지 있습니다.

1. 임의의 값 사용하기
   테마에 포함시키기에 맞지 않는 일회용 애니메이션 값을 사용해야 하는 경우, 임의의 값 사용하기 위해 대괄호를 사용하여 어떤 임의의 값을 사용하여 property를 생성할 수 있습니다.

```html
<div class="animate-[fall_3s_ease_100ms_infinite]">
  <!-- 100ms 지연 추가 -->
</div>

<div class="animate-[fall_3s_ease_1s_infinite]">
  <!-- 1초 지연 추가 -->
</div>
```

<div class="content-ad"></div>

2. TailwindCSS 플러그인
   플러그인을 사용하면 Tailwind가 CSS 대신 JavaScript를 사용하여 사용자의 스타일시트에 새로운 스타일을 주입할 수 있습니다.

```js
module.exports = {
  plugin(({ matchUtilities, theme }) => {

      //Tailwind에 사용할 css 속성 추가
      matchUtilities({
        'animation-delay': (value) => {
          return {
            'animation-delay': value,
          };
        },
      });
    }),
  ],
}
```

이제 animation-delay-[time] 클래스를 사용하여 애니메이션이 시작되기 전에 지연을 도입할 수 있습니다.

```html
<div className="animate-delay animation-delay-[1000ms]">
  <!-- 1000ms 지연 추가 -->
</div>
```

이렇게 하면 이제 우리의 완전한 애니메이션을 만들 수 있습니다.

<div class="content-ad"></div>

```jsx
const TypographyAnimation = () => {
  const firstWord = "develop";
  const secondWord = "design";

  const renderWordAnimation = (word: string, startingDelay: number) => {
    return word.split("").map((letter, index) => (
      <span
        key={index}
        className={`animate-fall animation-delay-[${
          startingDelay + index * 50
        }ms] translate-y-[-150%]`}
      >
        {letter}
      </span>
    ));
  };

  return (
    <span className="relative inline-flex ml-2 overflow-hidden p-2">
      <div className="flex flex-row">{renderWordAnimation(firstWord, 0)}</div>

      <span className="absolute top-0 bottom-0">
        <div className="flex flex-row">
          {renderWordAnimation(secondWord, 1500)}
        </div>
      </span>
    </span>
  );
};
```
