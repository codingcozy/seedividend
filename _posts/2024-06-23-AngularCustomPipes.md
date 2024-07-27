---
title: "Angular 커스텀 파이프 사용 방법"
description: ""
coverImage: "/assets/img/2024-06-23-AngularCustomPipes_0.png"
date: 2024-06-23 14:02
ogImage: 
  url: /assets/img/2024-06-23-AngularCustomPipes_0.png
tag: Tech
originalTitle: "Angular Custom Pipes"
link: "https://medium.com/@babatundelamidi/angular-custom-pipes-e0dac5f64b68"
---


Markdown 형식으로 테이블 태그를 변경하세요.

<div class="content-ad"></div>

## 간단한 사용자 정의 파이프 만들기

우리가 하는 일을 시작하기 위해 문자열에서 각 단어의 첫 글자를 대문자로 변경하는 파이프를 만들어보는 간달한 예제부터 사용해 봅시다.

1. 파이프 생성하기

```js
ng generate pipe capitalize
```

<div class="content-ad"></div>

2. 파이프 로직 구현

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value.replace(/\b\w/g, char => char.toUpperCase());
  }
}
```

3. 템플릿에서 파이프 사용

```html
<p>{ 'hello world' | capitalize }</p>
```

<div class="content-ad"></div>

## 매개변수를 사용한 Pipe 생성하기

사용자 정의 파이프는 매개변수도 받을 수 있습니다. 이 예제에서는 어떻게 매개변수를 가진 파이프를 생성하는지 자세히 살펴보겠습니다. 이 파이프 예제는 숫자를 지정된 소수 자리로 서식 지정합니다. 

1. 파이프 생성하기

```js
ng generate pipe decimalFormatter
```

<div class="content-ad"></div>

2. Pipe Logic을 구현하세요

```js
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
 name: 'decimalFormatter'
})
export class DecimalFormatterPipe implements PipeTransform {
transform(value: number, decimalPlaces: number): string {
 if (isNaN(value)) return value.toString();
 return value.toFixed(decimalPlaces);
 }
}
```

3. 파라미터와 함께 Pipe 사용하기

```js
<p>{ 1234.56789 | decimalFormatter:2 }</p>
```

<div class="content-ad"></div>

## 복잡한 변환에는 Pipes를 사용해요

가끔, Pipes는 더 복잡한 변환을 다루어야 할 때가 있어요. 특정 속성과 값에 따라 객체 배열을 필터링하는 Pipe를 만들어 보도록 해요.

1. Pipe 생성하기

```js
ng generate pipe filter
```

<div class="content-ad"></div>

2. 파이프 논리 구현하기

```js
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], property: string, value: any): any[] {
    if (!items || !property || value === undefined) return items;
    return items.filter(item => item[property] === value);
  }
}
```

3. 템플릿에서 파이프 사용하기

```js
export class AppComponent {
  users = [
    { name: 'AJ', role: 'admin' },
    { name: 'Segun', role: 'user' },
    { name: 'Homelander', role: 'admin' },
    { name: 'Alice', role: 'user' }
  ];
}
```

<div class="content-ad"></div>

```js
<ul>
@for(user of users; track user | filter:'role':'admin') {
 <li>
 { user.name } ({ user.role })
 </li>
}
</ul>
```

## 비동기 파이프 생성하기

Angular는 Observables 또는 Promises를 사용하여 비동기 파이프를 지원합니다. API에서 데이터를 가져와 표시하는 파이프를 만들어보겠습니다.

1. 파이프 생성하기


<div class="content-ad"></div>

```js
ng generate pipe fetchData
```

2. Pipe 로직 구현하기

```js
@Pipe({
 name: 'fetchData',
 pure: false
})
export class FetchDataPipe implements PipeTransform {
 private http = inject(HttpClient)
 transform(url: string): Observable<any> {
 return this.http.get(url);
 }
}
```

3. 템플릿에서 Pipe 사용하기

<div class="content-ad"></div>

```js
<div>
@if(apiUrl | fetchData | async as data) {
 <pre>{ data | json }</pre>
}
</div>
//apiUrl: string = 'https://api.example.com/data'
```

## 파이프 성능 최적화

기본적으로 Angular 파이프는 순수입니다. 이는 입력 참조가 변경될 때만 다시 실행됨을 의미합니다. 성능 상의 이유로 가능한 곳에서 이 동작을 활용하는 것이 중요합니다. 그러나 입력 데이터가 가변적인 경우, @Pipe 데코레이터의 pure 속성을 false로 설정하여 순수하지 않은 파이프를 생성할 수 있습니다.

순수하지 않은 파이프의 예시


<div class="content-ad"></div>

1. 파이프 생성하기

```js
ng generate pipe impure
```

2. 파이프 로직 구현하기

```js
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
 name: 'impure',
 pure: false
})
export class ImpurePipe implements PipeTransform {
transform(value: any, …args: any[]): any {
 // 사용자 정의 변환 로직
 return value;
 }
}
```

<div class="content-ad"></div>

## 커스텀 파이프에 대한 최상의 방법

가능한 경우 Pipes Pure를 유지하여 Angular의 변경 감지 최적화를 활용하세요.
단일 책임: 각 파이프는 단일 책임을 가져야 합니다. 변환 작업이 복잡한 경우 여러 파이프로 분리하는 것을 고려해보세요.
성능 고려사항: 특히 복잡한 변환 작업이나 대량 데이터세트의 경우 성능에 신경을 써야 합니다. 필요한 경우 캐싱 전략을 사용하세요.
오류 처리: 특히 외부 서비스와 상호작용이나 복잡한 작업을 수행하는 파이프의 경우 오류 처리를 구현하세요.
재사용성: 다른 컴포넌트 및 모듈에서 재사용할 수 있는 파이프를 만들어 중복을 피하세요.

Angular의 사용자 정의 파이프는 템플릿에서 데이터를 직접 변환하고 형식화하는 강력한 방법을 제공합니다. 이는 간단한 텍스트 변환부터 복잡한 데이터 조작 및 비동기 작업까지 다양할 수 있습니다. 사용자 정의 파이프를 효과적으로 이해하고 구현함으로써 Angular 애플리케이션의 가독성과 유지 관리성을 향상시킬 수 있습니다.