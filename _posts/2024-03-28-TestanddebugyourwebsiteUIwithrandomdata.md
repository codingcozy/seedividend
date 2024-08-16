---
title: "웹사이트 UI를 랜덤 데이터로 테스트하고 디버깅하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Test and debug your website UI with random data"
link: "https://medium.com/@mahdizarei0614/test-and-debug-your-website-ui-with-random-data-c0e4874a33b5"
isUpdated: true
---





저희 개발자들 모두(적어도 일 년 경력이 있는 개발자들)가 이런 경험을 했을 겁니다. 개발 중에 프로그램이 완벽하게 작동하는 것을 보았는데, 운영 환경에 배포하면 문제가 발생하는 경우가 많습니다. 사용자 버그 신고가 많아지거나, 특정 상황에서 발생하는 버그로 상사가 불평하는 경우도 있습니다. 그 문구가 10단어만 있는 게 아니라 200단어와 같이 긴 문구일 때는 어떻게 할까요? 사용자가 공백 없이 아주 긴 단어를 입력했을 때는 어떻게 할까요? 데이터 배열에 개발 당시 서버에서 항상 제공될 것으로 상상했던 특정 유형의 데이터가 포함되어 있지 않을 때는 어떻게 할까요?

![랜덤 데이터로 웹 사이트 UI를 테스트하고 디버깅해 보세요](/assets/img/TestanddebugyourwebsiteUIwithrandomdata_0.png)

저는 이런 문제를 자주 마주합니다. 그렇다면 솔루션은 뭘까요? 있을까요?

음, 있을 수도 없을 수도 있습니다! 예를 들어 수학적 접근 방식의 논리 버그와 같은 버그는 코드 수백 줄을 살펴보지 않고는 수정할 수 없지만, 이 글이 다루는 내용은 아닙니다. 단위 테스트, 통합 테스트, 그리고 End-to-End 테스트를 작성하여 일부 다른 종류의 버그와 장애를 수정할 수 있지만, 그러한 시간이 부족한 경우는 어떻게 할까요? 다양한 시나리오에서 어플리케이션이 어떻게 보이는지 확인하고 싶다면 어떻게 해야 할까요? 이 문제로 고민 중이시라면(특히 프론트엔드 개발자라면) 이 글이 도움이 될 것입니다! ;)

<div class="content-ad"></div>

<img src="/assets/img/TestanddebugyourwebsiteUIwithrandomdata_1.png" />

우선, 우리의 무작위 데이터를 생성하는 몇 가지 함수가 있어야 합니다.

가장 필요한 무작위 데이터의 경우는 다음과 같습니다:

- 텍스트
- 숫자
- 날짜
- 불리언
- 이미지

<div class="content-ad"></div>

텍스트부터 시작해볼게요. 우선, 무작위 텍스트를 만들기 위한 문자열이 필요합니다.

저는 Lorem ipsum 텍스트의 한 문단을 사용했어요:

```js
textArray = (
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut " +
  "labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris " +
  "nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit " +
  "esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in " +
  "culpa qui officia deserunt mollit anim id est laborum."
).split(" ");
```

이제 이 배열의 랜덤 범위를 선택하여 다양한 길이의 텍스트를 만들어봅시다.

<div class="content-ad"></div>

```js
this.textArray
  .slice(0, Math.ceil(this.textArray.length * Math.random()))
  .join(" ");
```

좋아요, 하지만 여전히 문제가 있어요. 템플릿에서 생성된 모든 텍스트들이 "Lorem ipsum dolor sit amet..."으로 시작하기 때문에 모두 같아 보여요. 그래서 그것도 섞어야 해요. 아래 함수가 해결할 거예요:

```js
  shuffle(array: string[]): string[] {
    let currentIndex = array.length;
    let randomIndex = 1;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }
```

이제 섞인 랜덤 길이의 텍스트로 접근할 거예요:

<div class="content-ad"></div>

```js
getRandomText(): string {
  return this.shuffle(
    this.textArray.slice(
      0,
      Math.floor(this.textArray.length * Math.random())
     )
  ).join(' ')
}
```

대박이죠? 좀 더 활용해 볼까요? 최소-최대 또는 고정 단어 수를 추가하는 건 어떨까요:

```js
getRandomText(length?: { min?: number; max?: number } | number): string {
  let textArray = this.randomTextArr;
  const minLength = typeof length === 'number' ? length : length?.min ?? 1;
  const maxLength =
    typeof length === 'number' ? length : length?.max ?? textArray.length;
  while (maxLength > textArray.length) {
    textArray = [...textArray, ...this.randomTextArr];
  }
  return this.shuffle(textArray)
    .slice(
      0,
      Math.ceil(
        ((maxLength ?? textArray.length) - (minLength ?? 0)) * Math.random() +
          (minLength ?? 0),
      ),
    )
    .join(' ')
    .trim();
}
```

멋지죠. 이제 여기처럼 사용할 수 있습니다:

<div class="content-ad"></div>

```js
this.getRandomText();
this.getRandomText({ min: 10 });
this.getRandomText({ min: 20, max: 30 });
this.getRandomText({ max: 100 });
```

텍스트 길이를 결정하는 논리는 랜덤 숫자를 생성하는 논리와 동일합니다:

```js
getRandomNumber(config?: { min?: number; max?: number }): number {
  return Math.ceil(
    ((config?.max ?? Number.MAX_VALUE) - (config?.min ?? 0)) *
      Math.random() +
      (config?.min ?? 0),
  )
}
```

좋아요. 이제 날짜를 살펴볼까요?

<div class="content-ad"></div>

랜덤한 날짜를 생성하려면 시작 날짜와 종료 날짜가 필요합니다. 저는 이렇게 했어요:

```js
getRandomDate(
    start: Date = new Date('1970-01-01'),
    end: Date = new Date()
): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}
```

좋아요. 부울값에 대해서는 이렇게 간단하게 코드를 작성했어요:

```js
getRandomBoolean(): boolean {
  return Math.random() >= .5;
}
```

<div class="content-ad"></div>

랜덤 이미지를 얻기 위해 Picsum Photos를 사용합니다. 이 함수는 지정된 너비와 높이로 Picum Photos에서 이미지를 다운로드할 수 있는 URL을 제공합니다:

```js
getRandomImageUrl(
  config?: { width: number; height: number } | number,
): string {
  const width = typeof config === 'number' ? config : config?.width ?? 200;
  const height = typeof config === 'number' ? config : config?.height ?? 200;
  return `https://picsum.photos/${width}/${height}?workAround=${Math.floor(Math.random() * 10000)}`;
}
```

workAround 매개변수를 사용하는 이유는 동일한 URL을 사용하여 Picsum Photos에 이미지를 요청할 때 동일한 이미지가 로드되는 것을 방지하는 것입니다. workAround를 사용하면 요청마다 고유한 이미지를 받을 수 있습니다.

이 접근 방법을 더 간편하게 사용하기 위해 해당 NPM 패키지를 만들었습니다. 아래 명령을 사용하여 프로젝트에 설치할 수 있습니다:

<div class="content-ad"></div>

```js
npm install @skybluedev/random.js
```

이 메소드들은 다음과 같이 접근할 수 있습니다:

```js
import random from "@skybluedev/random.js";

const randomText = random.string.get({ min: 5, max: 40 });
const randomNumber = random.number.get({ min: 5, max: 40 });
const randomBoolean = random.boolean.get();
const randomDate = random.date.get(
  new Date("2022-01-01"),
  new Date("2023-01-01")
);
const randomImage = random.image.get(400);
```

저는 이 라이브러리를 사용하여 제 Github의 해당 주소에서 방문할 수 있는 샘플 채팅 프로젝트에서 사용했습니다.

<div class="content-ad"></div>

![테이블](/assets/img/TestanddebugyourwebsiteUIwithrandomdata_2.png)
