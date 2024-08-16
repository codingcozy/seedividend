---
title: "리액트, Framer 연동해서 사용하기"
description: ""
coverImage: "/assets/img/2024-05-20-ReactFramersequences_0.png"
date: 2024-05-20 22:09
ogImage: 
  url: /assets/img/2024-05-20-ReactFramersequences_0.png
tag: Tech
originalTitle: "React , Framer — sequences."
link: "https://medium.com/@anya./react-framer-sequences-397db9375fb4"
isUpdated: true
---




웹 애플리케이션용 애니메이션 코드 학습 경험을 공유하려 합니다. 웹 애플리케이션을 위해 애니메이션을 코드로 작성하는 데 사용한 몇 가지 간단하고 빠른 기술을 소개하겠습니다.

## 내용

5분 이내에 만들 수 있는 3가지 기본사항을 살펴보겠습니다.

- 각기 다른 변형 및 staggarChildren으로 간단한 연속 효과

<div class="content-ad"></div>


![Image 1](https://miro.medium.com/v2/resize:fit:1400/1*RDCcMOuV4CbcB0dhPd-sgQ.gif)

2. Sequencing with useAnimate()

![Image 2](https://miro.medium.com/v2/resize:fit:1400/1*-vqhUfXmPoehZSW8hRd7Lg.gif)

3. Sequence sequences 😄


<div class="content-ad"></div>

<img src="https://miro.medium.com/v2/resize:fit:1400/1*fYmW-ckGVVVdBn1hR23jzA.gif" />

## 설정

React 애플리케이션에 framer-motion을 설치하기만 하면 됩니다.

```js
npm install framer-motion
```

<div class="content-ad"></div>

## 이 기사에 대한 링크

Figma 링크, CodeSandbox: 링크 1, 링크 2, 링크 3

# 변형 및 staggerChildren을 사용한 간단한 순차

이것은 간단한 시각적 상태 변경이 있는 요소들에서 순차를 만드는 가장 쉬운 방법입니다. 이에는 두 가지 부분만이 필요합니다:

<div class="content-ad"></div>

- 변형을 사용하여 애니메이션 설정하기
- staggerChildren으로 조정하기

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*RDCcMOuV4CbcB0dhPd-sgQ.gif)

## 단계

- 애니메이션 디자인하기. 글귀가 약간 세로 방향으로 움직이면서 일련의 카드를 흐려지게 만들고 카드를 가로로 가로질러 나누는 선을 그렸습니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-05-20-ReactFramersequences_0.png" />

2. 컴포넌트와 스타일을 생성합니다.

```js
type Props = {
  label: string;
  text: string;
};

export const Card = ({ label, text }: Props) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.stepLabel}>{label}</div>
      <div className={styles.divider}></div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};
```

3. 이제 우리는 컴포넌트 내에서 재생하고 싶은 애니메이션을 위해 framer variants를 연결할 수 있습니다.

<div class="content-ad"></div>

<img src="https://miro.medium.com/v2/resize:fit:1400/1*dJC-pf0US95Bjk_16mz6vw.gif" />

변형 요소는 애니메이션이 시작하고 끝나는 스타일을 정의합니다. 여기서 텍스트에 대한 fadeIn 애니메이션과 함께 (텍스트가 수직으로도 5px 이동하는) 'start' 및 'end' 속성을 정의하고, 구분선에 대한 drawIn 애니메이션에 대해서도 두 가지 변형을 사용했습니다.

```js
...
  const fadeIn = {
    start: { opacity: "0%", y: "0px" },
    end: {
      opacity: "100%",
      y: "-5px",
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 2,
      },
    },
  };

  const drawIn = {
    start: { width: "0" },
    end: {
      width: "100%",
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 2,
      },
    },
  };
...
```

4. 부모 구성 요소에서 일련의 순서를 조율합니다.

<div class="content-ad"></div>


![이미지](https://miro.medium.com/v2/resize:fit:1400/1*RDCcMOuV4CbcB0dhPd-sgQ.gif)

부모 'CardContainer'에서 몇 줄의 코드로 자식 카드에 staggerChildren을 사용하여 지연을 둔 애니메이션을 시작할 수 있습니다.

```js
...
export const CardContainer = () => {
  const stagger = {
    start: {},
    end: {
      transition: {
        staggerChildren: 1,
      },
    },
  };
...
```

이 샌드박스에서 전체 코드를 확인하세요.


<div class="content-ad"></div>

# useAnimate()을 사용한 순차 처리

이 방법은 조금 더 노력이 필요하지만 더 많은 제어를 제공합니다. 각각의 요소를 '선택'하고 서로의 속성 및 타이밍에 관계하여 변경하는 개념입니다.

- 대상으로 지정할 요소들에 대한 범위 추가
- 요소들을 대상으로 선택하고 애니메이션을 추가합니다

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*-vqhUfXmPoehZSW8hRd7Lg.gif)

<div class="content-ad"></div>

## 단계

1. 애니메이션을 디자인하세요.

![image](/assets/img/2024-05-20-ReactFramersequences_1.png)

2. 컴포넌트를 생성하세요.

<div class="content-ad"></div>

```js
...
export const Card = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.textBox}>
        <div className={styles.i}>I</div>
        <div className={styles.heartTrack}>
          <div className={styles.heart}>
            <img src="/images/heart.svg" alt="heart" />
          </div>
        </div>
        <div className={styles.framer}>Framer</div>
      </div>
    </div>
  );
};
...
```

![React Framer sequences](/assets/img/2024-05-20-ReactFramersequences_2.png)

3. 사용할 요소에 애니메이션을 정의하여 순차적인 애니메이션을 활성화합니다. 이 경우에는 카드 컴포넌트의 바깥 요소에 범위를 설정하여 '나무 구조 안에서 애니메이션화할 요소를 선택할 수 있습니다.

```js
...

export const Card = () => {
  const [scope, animate] = useAnimate();
...

  return (
    <div className={styles.cardContainer} ref={scope}>
   ...
```

<div class="content-ad"></div>

4. 순서를 생성합니다. 하트가 텍스트로 내려오면서 약간 회전하고, 내 텍스트가 만나도록 슬라이드되기를 원합니다. 대상 요소를 참조하는 방법은 여러 가지가 있습니다. 클래스이름을 사용하고, 각 속성에 대한 모든 값을 제공하고 있습니다.

노트할 사항은 제 텍스트 애니메이션에 설정된 ‘`’으로, 연속성을 사용하여 애니메이션이 재생되는 시점을 정의할 수 있습니다. 타임라인에서 요소를 동시에 시작할 수 있는 유용한 방법 중 하나입니다.

```js
animate(
[
  [
    `.${styles.heart}`,
    { rotate: [0, 10, -10, 0], top: ["-20%", "40%"] },
    { duration: 3 },
  ],

  [
    `.${styles.textBox}`,
    { gap: ["250px", "24px"] },
    { duration: 2, at: "<" },
  ],
],
{ delay: 1 }
);
}, []);
```

<img src="https://miro.medium.com/v2/resize:fit:1400/1*-vqhUfXmPoehZSW8hRd7Lg.gif" />

<div class="content-ad"></div>

해당 샌드박스에서 전체 코드를 확인하세요.

# 시퀀스 하는 시퀀스 😄

마침내, 일련의 시퀀스를 조율하는 방법을 찾고 있었는데, 이것이 문서에서 찾을 수 있는 가장 간단한 방법이었습니다. 만약보다 견고한 해결책이 있다면 공유해주세요.

![image](https://miro.medium.com/v2/resize:fit:1400/1*fYmW-ckGVVVdBn1hR23jzA.gif)

<div class="content-ad"></div>

## 단계

- 시퀀스에 지연 추가

```js
  useEffect(() => {
    animate(
      [
        [
          scope.current,
          { backgroundColor: ["#ED2733", "#FF4D98"] },
          { duration: 1 },
        ],
        [
          `.${styles.heart}`,
          { rotate: [0, 10, -10, 0], top: ["-20%", "40%"] },
          { duration: 3 },
        ],
        [
          `.${styles.textBox}`,
          { gap: ["250px", "24px"] },
          { duration: 2, at: "<" },
        ],
      ],
      { delay: delay }
    );
  }, []);
```

2. Cards에 delay 속성 전달

<div class="content-ad"></div>

위의 코드를 번역하면 다음과 같다.

```javascript
...
<Card delay={1} />
<Card delay={2} />
...
```

이 샌드박스에서 전체 코드를 확인할 수 있습니다.

읽어 주셔서 감사합니다!