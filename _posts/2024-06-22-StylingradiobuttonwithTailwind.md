---
title: "Tailwind로 라디오 버튼 꾸미는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-StylingradiobuttonwithTailwind_0.png"
date: 2024-06-22 14:31
ogImage: 
  url: /assets/img/2024-06-22-StylingradiobuttonwithTailwind_0.png
tag: Tech
originalTitle: "Styling radio button with Tailwind"
link: "https://medium.com/@marek-rozmus/styling-radio-button-with-tailwind-6e16d6c0d68d"
---


## 스크래치에서 React 라디오 버튼 구성 요소 (스타일 지정)

![이미지](/assets/img/2024-06-22-StylingradiobuttonwithTailwind_0.png)

테일윈드로 스타일링하는 것에 대한 이 포스트 이후에 다른 포스트입니다. 체크박스 요소와 비슷하게, 라디오 버튼의 재스타일링을 단계별로 진행할 것입니다.

![이미지](/assets/img/2024-06-22-StylingradiobuttonwithTailwind_1.png)

<div class="content-ad"></div>

## 스타일링 단계별로

우리가 시작하는 것은 다음과 같습니다:

```js
const Radio = () => (
  <div>
    <input type="radio" />
    <label>This is the radio label</label>
  </div>
);
```

이제 레이블을 클릭할 수 있게 id를 추가해보세요:

<div class="content-ad"></div>

```js
const Radio = ({ id }: RadioProps) => (
  <div>
    <input type="radio" id={id} />
    <label htmlFor={id}>This is the radio label</label>
  </div>
);
```

## 스타일링

기본 스타일을 제거하려면 appearance-none 클래스를 사용하세요.

```js
<input type="radio" id={id} className="appearance-none" />
```

<div class="content-ad"></div>

라디오 버튼이 사라질 거에요 — 처음부터 디자인해야 해요.

## 라디오 버튼

폭과 높이를 추가하고, 테두리의 일부 색상을 넣고, 라운드하게 만들어주세요. 라운드하지 않으면 체크박스처럼 네모난 모습이 될 거에요.

```js
<input type="radio" id={id}
  className="
    appearance-none
    w-4 h-4 border-2 border-blue-500 rounded-full
  "
/>
```

<div class="content-ad"></div>

<img src="/assets/img/2024-06-22-StylingradiobuttonwithTailwind_2.png" />

## 정렬 수정

조금 어색해 보이네요. 일부 정렬이 필요합니다. 부모 div에 간단한 수정을 적용하면 이렇게 됩니다:

```js
<div className="flex gap-2 items-center">
  <input type="radio" id={id}
    className="
      appearance-none
      w-4 h-4 border-2 border-blue-500 rounded-full
    "
  />
  <label htmlFor={id}>라디오 라벨입니다</label>
</div>
```

<div class="content-ad"></div>

<img src="/assets/img/2024-06-22-StylingradiobuttonwithTailwind_3.png" />

수정 완료했어요! 맞죠? 음, 그건 상황에 따라 다를 거예요. 만약 깁ㄴ힐 라벨을 가지고 있고 텍스트 래핑이 발생할 경우 어떻게 되는지 확인해 보세요:

<img src="/assets/img/2024-06-22-StylingradiobuttonwithTailwind_4.png" />

우선 버튼이 줄어들었는데, 버튼 스타일에 shrink-0를 추가하여 쉽게 수정할 수 있어요.

<div class="content-ad"></div>


![이미지](/assets/img/2024-06-22-StylingradiobuttonwithTailwind_5.png)

이제 중앙에 버튼이 있는 것이 괜찮은지, 아니면 상단에 있는 것이 나은지에 대한 질문입니다. 저는 상단에 있기를 선호하며, 따라서 폰트 크기에 따라 일부 상단 여백을 추가하고 모두 상단으로 정렬합니다 (items-center를 제거).

```js
<div className="flex gap-2">
  <input type="radio" id={id}
    className="
      appearance-none shrink-0 mt-1
      w-4 h-4 border-2 border-blue-500 rounded-full
    "
  />
  <label htmlFor={id}>This is the radio label</label>
</div>
```

![이미지](/assets/img/2024-06-22-StylingradiobuttonwithTailwind_6.png)


<div class="content-ad"></div>

## 확인 상태 추가

체크 요소를 원 안에 배치해야 합니다. 따라서 체크 요소의 모양을 정의하고 적절한 위치에 배치하기 위해 절대적 사용법이 필요합니다.

```js
<input type="radio" id={id}
  className="
    relative
    appearance-none shrink-0 mt-1
    w-4 h-4 border-2 border-blue-500 rounded-full
  "
/>
<div
  className="
    absolute
    w-2 h-2 rounded-full bg-blue-500
  "
/>
<label htmlFor={id}>라디오 라벨입니다</label>
```

같은 색으로 간단한 원을 추가했지만, 좀 더 맞춤 정렬이 필요해 보입니다.

<div class="content-ad"></div>

아래와 같이 마진을 추가하면 끝!
```js
<div className="
  absolute
  w-2 h-2 rounded-full bg-blue-500 ml-1 mt-2"
/>
```


<div class="content-ad"></div>

저는 무언가 레이아웃하는 데 마진을 사용하는 것을 선호하지 않아요. 버튼의 너비를 변경하면 그 마진을 업데이트해야 할 필요도 있잖아요:

![이미지](/assets/img/2024-06-22-StylingradiobuttonwithTailwind_9.png)

또한 절대 위치를 사용하는 것도 좋아하지 않아요. 다른 방법이 없을까요?

## 그리드 배치

<div class="content-ad"></div>

다른 방법은 버튼과 체크 요소를 한 그리드 셀에 넣고 중앙 정렬을 사용하는 것입니다. 이제 모든 여백과 절대 위치 설정은 더 이상 필요하지 않습니다.

```js
<div className="grid place-items-center">
  <input type="radio" id={id}
    className="
      col-start-1 row-start-1
      appearance-none shrink-0
      w-4 h-4 border-2 border-blue-500 rounded-full
    "
  />
  <div
    className="
      col-start-1 row-start-1
      w-2 h-2 rounded-full bg-blue-500
    "
  />
</div>
```

그리고 버튼 크기를 변경하면 내부 원이 여전히 중앙에 있습니다.

<img src="/assets/img/2024-06-22-StylingradiobuttonwithTailwind_10.png" />

<div class="content-ad"></div>

## 정렬 문제가 되돌아왔어요

더 작은 컨테이너에서 새 구현을 확인한 후에 우리가 얻은 결과는 다음과 같아요:

![Image](/assets/img/2024-06-22-StylingradiobuttonwithTailwind_11.png)

조금 조정이 필요했어요 — 모든 것을 상단에 정렬하고 (유감스럽게도) 원을 조금 낮추기 위해 m-1을 사용했어요.

<div class="content-ad"></div>

```js
<div className="flex gap-2 items-start">
  <div className="grid place-items-center mt-1">
    <input type="radio" id={id}
      className="
        col-start-1 row-start-1
        appearance-none shrink-0
        w-4 h-4 border-2 border-blue-500 rounded-full
      "
    />
    <div
      className="
        col-start-1 row-start-1
        w-2 h-2 rounded-full bg-blue-500"
    />
  </div>
  <label htmlFor={id} 
    className="text-start">라디오 라벨입니다</label>
</div>
```

<img src="/assets/img/2024-06-22-StylingradiobuttonwithTailwind_12.png" />

## 선택 및 미선택 상태

더 나아가기 위해 컴포넌트에 일부 변경이 필요합니다 - label과 defaultChecked를 추가하세요. 여기에서 변경된 부분만 보여드리겠습니다. 전체 코드는 리포지토리에서 확인해주세요.

<div class="content-ad"></div>

```js
const Radio = ({ defaultChecked, id, label }: RadioProps) => (
...
    <input type="radio" id={id} defaultChecked={defaultChecked}
...
    <label htmlFor={id} className="text-start">{label}</label>
```

그리고 일부 컴포넌트 렌더링:

```js
<Radio id='radio1' label='라디오 1' defaultChecked />
<Radio id='radio2' label='라디오 2' defaultChecked={false} />
```

![이미지](/assets/img/2024-06-22-StylingradiobuttonwithTailwind_13.png)


<div class="content-ad"></div>

다음 표는 Markdown 형식으로 변환해야 합니다. 문제는 선택되지 않은 상태에 대한 스타일링이 누락되었다는 것입니다.

내부 원은 체크 상태가 true 일 때만 표시되어야 합니다. 따라서 배경색은 입력 요소의 체크 상태에 따라 지정되어야 합니다. 이는 입력 요소에 peer 클래스를 설정하고 배경색 앞에 peer-checked: 접두사를 추가하여 수행할 수 있습니다:

```js
<input type="radio" id={id} defaultChecked={defaultChecked}
  className="
    peer
    col-start-1 row-start-1
    appearance-none shrink-0
    w-4 h-4 border-2 border-blue-500 rounded-full
  "
/>
<div
  className="
    col-start-1 row-start-1
    w-2 h-2 rounded-full peer-checked:bg-blue-500
  "
/>
```

<img src="/assets/img/2024-06-22-StylingradiobuttonwithTailwind_14.png" />

<div class="content-ad"></div>

## 확인란을 클릭할 수 없습니다

두 번째 라디오 버튼의 동그라미를 클릭하여 선택하려고 시도해보세요. — 아무 일도 일어나지 않을 겁니다. 이제 "Radio 2" 라벨을 클릭해보세요. — 작동할 겁니다! 무슨 문제인 걸까요?
우리가 렌더링하는 내부 원이 클릭 이벤트를 막고 있습니다. 이 문제를 해결하려면 내부 원에 pointer-events-none 클래스를 추가해야 합니다. 이 클래스는 해당 요소에 어떠한 클릭 이벤트도 가져가지 말고 그냥 넘겨주라고 말합니다.

```js
<div
  className="
    pointer-events-none
    col-start-1 row-start-1
    w-2 h-2 rounded-full peer-checked:bg-blue-500
  "
/>
```

## 비활성 상태

<div class="content-ad"></div>

한국어로 번역하면:

```js
// 파일에 두 개의 추가 라디오 버튼을 추가해보세요:

<Radio id='radio1' label='라디오 1' defaultChecked />
<Radio id='radio2' label='라디오 2' defaultChecked={false} />
<Radio id='radio3' label='라디오 3 (비활성화됨)' defaultChecked disabled />
<Radio id='radio4' label='라디오 4 (비활성화됨)' defaultChecked={false} disabled />

// 그리고 컴포넌트를 업데이트해보세요:

const Radio = ({ defaultChecked, disabled, id, label }: RadioProps) => (
...
    <input type="radio" id={id} defaultChecked={defaultChecked}
      disabled={disabled}
...
```

<div class="content-ad"></div>

Radio 4(비활성화된)는 선택할 수 없습니다 — 그래서 정상적으로 작동하는 것 같아요. 그러나 외관을 업데이트해야 합니다. 사용자가 항목이 비활성화되었음을 알 수 있도록 해야 합니다. 내부 원 안에 peer-checked 및 peer-disabled를 사용해야 합니다.

```js
<input type="radio" id={id} defaultChecked={defaultChecked} disabled={disabled}
  className="
    peer
    col-start-1 row-start-1
    appearance-none shrink-0
    w-4 h-4 border-2 border-blue-500 rounded-full
    disabled:border-gray-400
  "
/>
<div
  className="
    pointer-events-none
    col-start-1 row-start-1
    w-2 h-2 rounded-full peer-checked:bg-blue-500
    peer-checked:peer-disabled:bg-gray-400
  "
/>
```

## 그런데 props에 disabled가 있어요

네, clsx 또는 classnames 패키지를 사용하여 이런식으로 사용할 수도 있어요:

<div class="content-ad"></div>

```js
<div
  className={cx(
    "pointer-events-none",
    "col-start-1 row-start-1",
    "w-2 h-2 rounded-full peer-checked:bg-blue-500",
    // "peer-checked:peer-disabled:bg-gray-400"
    {
      "!bg-gray-400": disabled,
    }
  )}
/>
```

하지만 이 경우에는 ! 중요성을 사용해야 합니다. 원하는 대로 사용해 주세요.

또 "disabled" 레이블을 스타일링하려면 prop만 사용할 수 있습니다. 이것은 레이블이 입력란의 형제가 아니기 때문에 노드 구조에서 tailwind 피어를 사용할 수 없기 때문입니다.

```js
<label htmlFor={id}
  className={cx(
    "text-start",
    {
      "text-gray-400": disabled,
    })}
>
  {label}
</label>
```

<div class="content-ad"></div>

<img src="/assets/img/2024-06-22-StylingradiobuttonwithTailwind_15.png" />

## 초점이 맞다

지금까지 초점 상태가 없었습니다. 따라서 요소를 클릭하고 초점이 맞으면 보이지 않습니다. Tab 키를 사용하여 페이지를 돌아다니면 다음과 같이 나올 수 있습니다:

<img src="/assets/img/2024-06-22-StylingradiobuttonwithTailwind_16.png" />

<div class="content-ad"></div>

다음은 테이블 태그를 마크다운 형식으로 변경하는 방법입니다:

```js
<input type="radio" id={id} defaultChecked={defaultChecked} disabled={disabled}
  className="
    peer
    col-start-1 row-start-1
    appearance-none shrink-0
    w-4 h-4 border-2 border-blue-500 rounded-full
    focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-blue-400
    disabled:border-gray-400
  "
/>
```

이제 항목을 클릭하면 외곽선이 표시됩니다:

<img src="/assets/img/2024-06-22-StylingradiobuttonwithTailwind_17.png" />

<div class="content-ad"></div>

아직 여기 있나요? 여기서 소개된 모든 내용을 포함한 완전한 라디오 그룹 컴포넌트 예제도 함께 제공하는 리포지토리를 확인해보세요.

내 컨텐츠가 마음에 드시나요? 저를 지원하고 커피 한 잔 사주세요. 정말 감사합니다!

![이미지](/assets/img/2024-06-22-StylingradiobuttonwithTailwind_18.png)