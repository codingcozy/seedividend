---
title: "알아두면 유용한 optional chaining 과 nullish coalescing"
description: "javascript  ,  문법에 대해서 알아보는 글입니다"
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
isUpdated: true
---





# 알아두면 유용한 optional chaining 과 nullish coalescing

optional chaining(`?.`), nullish coalescing(`??`)를 이용해 변수에 따른 조건 분기 처리를 하는 여러 방법에 대해서 정리해 보려고 합니다.



<div class="content-ad"></div>

## 1. optional chaining(`?.`)

React와 Typescript로 UI개발을 하다 보면 컴포넌트의 props의 타입이 `?: number`와 같이 nullable 한 경우가 많이 있습니다.

```jsx
{...중략}

interface ImageListViewProps {
  imageList?: {
    width?: number;
    height?: number;
  }[];
}

export const ImageListView = ({imageList} :  ImageListViewProps)  => {
    return <ul>
	{imageList.map(image,i) => (
	    <li>
		<img src=""  width={image.width} height={image.height}>
	    </li>
	)}
    </ul>
}
```

imageList와 image의 width, height를 부모 props에서 전달해 주지 않았을 때
UI개발 시 대응하는 과정으로 설명드리겠습니다.

#### 1) imageList가 존재할 때만 이미지 리스트 노출

가장 기본적으로 `var ? a : b` 문법을 사용해서 아래와 같이 imageList가 존재할 때만 리스트를 노출하도록 표현할 수 있습니다.

```jsx
{...중략}

interface ImageListViewProps {
  imageList?: {
    width?: number;
    height?: number;
  }[];
}

export const ImageListView = ({imageList} :  ImageListViewProps)  => {
    return <ul>
	{imageList ? imageList.map(image,i) => (
	    <li>
		<img src=""  width={image.width} height={image.height}>
	    </li>
	) : <></>}
    </ul>
}
```



<div class="content-ad"></div>

위와 같이 작성했을 때는 imageList가 존재하지 않을 때 `<></>` Fragment 요소를 불필요하게 false 조건에 사용해 주어야 하는데요.

이런 부분을 optional chaining(`?.`) 을 통해서 아래와 같이 개선할 수 있습니다.

```jsx
{...중략}

interface ImageListViewProps {
  imageList?: {
    width?: number;
    height?: number;
  }[];
}

export const ImageListView = ({imageList} :  ImageListViewProps)  => {
    return <ul>
	{imageList?.map(image,i) => (
	    <li>
		<img src=""  width={image.width} height={image.height}>
	    </li>
	)}
    </ul>
}
```

optional chaining은 `?.` 좌측 값이 null, undefined인 경우 undefined를 리턴합니다.

위와 같은 방식으로 각 image에도 optional chaining을 적용해 보도록 하겠습니다.

```jsx
{...중략}

interface ImageListViewProps {
  imageList?: {
    width?: number;
    height?: number;
  }[];
}

export const ImageListView = ({imageList} :  ImageListViewProps)  => {
    return <ul>
	{imageList?.map(image,i) => (
	    <li>
		<img src=""  width={image?.width} height={image?.height}>
	    </li>
	)}
    </ul>
}
```

image가 존재할 때만 image의 width, height를 사용하는 형태로 작성해 보았는데요.

사실 위와 같이 작성하는 것은 의미가 없습니다.
위에서도 말했듯이 optional chaining은 `?.` 좌측 값이 nullable 한 경우에 의미가 있는 문법이기 때문입니다.
각 image는 width, height 값이 nullable할 뿐 객체 형식이기 때문에 `?.`를 사용하지 않아도 됩니다.

같은 의미에서 만약 아래와 같이 imageList가 nullable한 값이 아니라면
imageList에도 optional chaining이 필요하지 않게 됩니다.



<div class="content-ad"></div>

```jsx
{...중략}

interface ImageListViewProps {
  imageList: {
    width?: number;
    height?: number;
  }[];
}

export const ImageListView = ({imageList} :  ImageListViewProps)  => {
    return <ul>
	{imageList.map(image,i) => (
	    <li>
		<img src=""  width={image.width} height={image.height}>
	    </li>
	)}
    </ul>
}
```

다시 본론으로 돌아와서, image는 객체 형태로 존재하더라도 image의 width, height는 여전히 nullable한 값입니다.

## 2. nullish coalescing(`??`)

image의 width, height 값이 없을 경우 기본 사이즈를 노출하는 과정을 nullish coalescing(`??`)를 통해서 설명해 드리도록 하겠습니다.

imageList 때와 동일하게 가장 기본적인 방법인 `var ? a : b`를 사용해서 width, height의 기본 값을 아래와 같이 지정할 수 있습니다.

```jsx
{...중략}

interface ImageListViewProps {
  imageList?: {
    width?: number;
    height?: number;
  }[];
}

export const ImageListView = ({imageList} :  ImageListViewProps)  => {
    return <ul>
	{imageList?.map(image,i) => (
	    <li>
		<img src=""  width={image.width ? image.width : 200 } height={image.height ? image.height : 200}>
	    </li>
	)}
    </ul>
}
```

image의 width, height가 없을 경우에 기본 이미지 사이즈를 지정했지만 코드가 굉장히 길어지게 되었습니다.

이렇게 작성하면 코드가 길어지는 점 외에 다른 문제가 발생하는데요.
바로 width, height 값이 0인 경우에도 기본 이미지 사이즈로 지정한다는 점입니다.
`var ? a : b`는 자바스크립트의 신기한 특성 때문에 null, undefined 외에도 0, '', false에서도 결과값으로 b를 갖게 됩니다.

0이란 값이 들어왔을 때 0을 그대로 사용하고 싶다면 아래와 같이 조건이 하나 더 추가되어야 합니다.



<div class="content-ad"></div>

```jsx
{...중략}

interface ImageListViewProps {
  imageList?: {
    width?: number;
    height?: number;
  }[];
}

export const ImageListView = ({imageList} :  ImageListViewProps)  => {
    return <ul>
	{imageList?.map(image,i) => (
	    <li>
		<img src=""  width={image.width ? image.width : image.width == 0 ? image.width : 200  } height={image.height ? image.height : image.height == 0 ? image.height :  200}>
	    </li>
	)}
    </ul>
}
```

0에 대한 처리를 하기 위해 더 복잡해진 것을 보실 수 있습니다.
이번엔 OR(`||`) 연산자를 사용해서 기본 이미지 사이즈를 지정해 보겠습니다.

```jsx
{...중략}

interface ImageListViewProps {
  imageList?: {
    width?: number;
    height?: number;
  }[];
}

export const ImageListView = ({imageList} :  ImageListViewProps)  => {
    return <ul>
	{imageList?.map(image,i) => (
	    <li>
		<img src=""  width={image.width || 200 } height={image.height || 200}>
	    </li>
	)}
    </ul>
}
```

`var ? a : b`를 사용했을 때 보다 `||`를 사용했을 때 더 간결하게 작성할 수 있는데요.
하지만 `||`도 `var ? a : b`와 동일하게 width 값이 0이 들어오면 200을 리턴합니다.

이렇게 0, "", false를 제외한 null 혹은 undefined 값에 대해서만 거짓 판별을 하고 싶을 때 사용하는 것이 nullish coalescing(`??`) 입니다.

```jsx
{...중략}

interface ImageListViewProps {
  imageList?: {
    width?: number;
    height?: number;
  }[];
}

export const ImageListView = ({imageList} :  ImageListViewProps)  => {
    return <ul>
	{imageList?.map(image,i) => (
	    <li>
		<img src=""  width={image.width ?? 200 } height={image.height ?? 200}>
	    </li>
	)}
    </ul>
}
```



<div class="content-ad"></div>

위와 같이 작성하면 image의 width, height 값이 null 혹은 undefined이 들어왔을 때만 기본 사이즈인 200x200의 이미지를 만들 수 있게 됩니다.

## 정리

`var ? a : b`, `||`, `??` 세 가지 케이스를 정리해 보면 아래와 같습니다.

```js
let height1 = null;
let height2 = undefined;
let height3 = "";
let height4 = 0;
let height5 = false;
let height6 = 50;

console.log(height1 ? height1 : 200); // 200
console.log(height2 ? height2 : 200); // 200
console.log(height3 ? height3 : 200); // 200
console.log(height4 ? height4 : 200); // 200
console.log(height5 ? height5 : 200); // 200
console.log(height6 ? height6 : 200); //  50

console.log(height1 || 200); // 200
console.log(height2 || 200); // 200
console.log(height3 || 200); // 200
console.log(height4 || 200); // 200
console.log(height5 || 200); // 200
console.log(height6 || 200); //  50

console.log(height1 ?? 200); // 200
console.log(height2 ?? 200); // 200
console.log(height3 ?? 200); //  ''
console.log(height4 ?? 200); //   0
console.log(height5 ?? 200); // false
console.log(height6 ?? 200); //  50
```

## 마치며

각 문법들이 옳고 그름이 있는 것은 아니다 보니 상황에 맞게 적절한 것을 사용하는 것이 좋을 것 같습니다.
또한 개발코드와 연관이 되어있는 부분이기 때문에 협업하는 조직에 따라서도 스타일이 달라질 수 있어 이 부분도 고려하시면 좋을 것 같습니다.
