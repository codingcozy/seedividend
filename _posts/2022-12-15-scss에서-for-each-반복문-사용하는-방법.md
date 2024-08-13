---
title: "scss에서 for each 반복문 사용하는 방법"
description: "sass, scss for each 반복문 문법에 대해서 정리했습니다"
coverImage: ""
date: 2024-08-03 16:52
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# scss에서 @for @each 반복문 사용하는 방법

scss에서 for, each 반복문을 작성할 수 있습니다.



<div class="content-ad"></div>

## 1. for ${i} from ${start} to ${end}

for문의 가장 기본적인 방법으로

`for ${i} from ${start} to ${end}`로 작성하면
i를 인덱스로 하고 start부터 end **미만**까지 반복합니다.
이하가 아니라 미만이라는 점만 참고하시면 됩니다.

```scss
$colorList: #e74c3c, #e67e22, #f1c40f, #2ecc71, #c0392b, #3498db, #2c3e50,
  #9b59b6, #bdc3c7, #7f8c8d, #2980b9;

// 1~10까지 반복
@for $i from 1 to 11 {
  &:nth-child(#{$i}) {
    background: nth($colorList, $i);
  }
}
```



<div class="content-ad"></div>

여기서 nth는 기본 내장 함수로서 scss의 배열에서 특정 값을 알아낼 수 있는 함수입니다.
자바스크립트로 치면 `colorList[i]` 와 같은 개념이겠죠.

## 2. for ${i} from ${start} through ${end}

첫번째 for문과의 차이점은 to가 through로 변경되었다는 점 뿐인데요.
start부터 end**이하** 까지 반복합니다.

```scss
$colorList: #e74c3c, #e67e22, #f1c40f, #2ecc71, #c0392b, #3498db, #2c3e50,
  #9b59b6, #bdc3c7, #7f8c8d, #2980b9;

// 1~11까지 반복
@for $i from 1 to 11 {
  &:nth-child(#{$i}) {
    background: nth($colorList, $i);
  }
}
```

## 3. @each ${item} in ${list}

다음은 @each 문법인데요. 자바스크립트의 for each 문법과 동일한 방식이라고 생각해주시면 됩니다.



<div class="content-ad"></div>

```scss
// index 찾는 방법
@each $color in $colorList {
}
```

위와 같이 작성할 수 있을텐데요.

each문의 문제는 index를알 수 없다는 점인데요.
그 부분은 이렇게 해결할 수 있습니다.

```scss
@each $color in $colorList {
  $i: index($colorList, $color);
  &:nth-child(#{$i}) {
    background: #{$color};
  }
}
```

index라는 내장 함수를 통해서 배열의 특정 값이 몇번째에 있는 값인지를 알아낼 수 있습니다.

그렇게 알아낸 $i 값으로 nth-child에 넣어주면서 사용할 수 있죠.

## 4. Map 형태의 for ${a},${b} in ${map}

index 내장함수를 통해서 index를 알아낼 수도 있지만 아래와 같이 map형태로 배열을 저장한다면
별도의 내장함수 없이 바로 each문을 통해서 스타일을 지정할 수 있습니다.

```scss
$colors: (
  1: #e74c3c,
  2: #e67e22,
  3: #f1c40f,
  4: #2ecc71,
  5: #c0392b,
  6: #3498db,
  7: #2c3e50,
  8: #9b59b6,
  9: #bdc3c7,
  10: #7f8c8d,
  11: #2980b9,
);

@each $i, $color in $colors {
  &:nth-child(#{$i}) {
    background: #{$color};
  }
}
```

@each 뒤에 오는 값에 map의 key, value로 할당하면 그 값을 반복문에서 사용할 수 있습니다.
그래서 별도로 index를 지정하지 않고도 nth-child에 인덱스 값을 넣을 수 있습니다.

오늘은 scss의 for문을 사용하는 방법에 대해서 알아보았습니다. 다음에는 다른 scss 문법에 대해서 알아보도록 하겠습니다.
