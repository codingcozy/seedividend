---
title: "자바스크립트를 싫어해봤는데, 블레이저 덕분에 고마워요"
description: ""
coverImage: "/assets/img/2024-05-14-IHateJavaScriptThankYouBlazor_0.png"
date: 2024-05-14 15:56
ogImage: 
  url: /assets/img/2024-05-14-IHateJavaScriptThankYouBlazor_0.png
tag: Tech
originalTitle: "I Hate JavaScript, Thank You Blazor"
link: "https://medium.com/@mabroukmahdhi/i-hate-javascript-thank-you-blazor-8904333733bc"
isUpdated: true
---





<img src="/assets/img/2024-05-14-IHateJavaScriptThankYouBlazor_0.png" />

여러 해 동안 JavaScript는 웹 개발의 주인공으로 선전을 하면서 클라이언트 측 프로그래밍을 지배했습니다. 다양한 브라우저에서의 보급성과 웹 페이지 상호 작용에서 중요한 역할을 하는 기능으로 인해 사람들은 JavaScript를 떠날 수 없었습니다. 그러나 저와 JavaScript의 관계는 지금까지 괴로움으로 가득 찼습니다. 동적 타입의 특성부터 다양한 브라우저 간의 예측할 수 없는 동작까지, JavaScript와 함께한 여행은 디버깅과 해결책 찾기의 롤러코스터였습니다. 그런데 그 모든 것이 Blazor를 만나면서 달라졌습니다.

# JavaScript의 문제점

저와 같은 많은 개발자들이 겪은 것처럼 JavaScript에 대한 불평은 그 언어의 독특한 점과 일관성 부족에서 비롯됩니다. 여기에는 JavaScript의 특정 문제점을 자세히 살펴보며 이 언어의 풍경에 익숙한 많은 사람들에게 공감할 수 있는 예제가 포함되어 있습니다.




## 동적 타이핑의 문제점

자바스크립트의 동적 타이핑은 종종 그 유연성으로 인해 칭찬받지만, 변수가 언제든지 어떤 유형의 값을 보유할 수 있다는 것을 의미합니다. 그러나, 이 기능은 예상치 못한 동작과 디버깅하기 어려운 런타임 에러를 초래할 수 있습니다. 다음 예시를 살펴보세요:

```js
let value = "5";
console.log(value + 5); // 결과: "55"
```

이 스니펫에서, 자바스크립트는 두 숫자를 더하는 대신, 문자열과 숫자를 연결하여 "55"를 출력합니다. 이러한 타입 강제 변환이 컴파일 시점에 변수의 유형이 알려진 정적으로 타입화된 언어에서 왔던 사람들에게는 예상치 못할 수도 있습니다.



## 변수 스코핑과 `this` 키워드

자바스크립트의 변수 스코프 처리와 `this` 키워드는 혼란스러울 수 있습니다. var을 사용할 때 특히 변수의 스코프는 예측할 수 없는 동작으로 이어질 수 있습니다:

```js
for (var i = 0; i < 5; i++) {
  setTimeout(function() { console.log(i); }, 1000);
}
// 출력: 5, 5, 5, 5, 5
```

var의 함수 스코프 성질 때문에 루프가 어떤 것을 예상하는 대로 동작하지 않는데, setTimeout 함수가 실행될 때 i의 값이 이미 5에 도달했기 때문에 0부터 4가 아닌 5를 다섯 번 출력합니다.



안녕하세요! 

위의 표는 마크다운 형식으로 변경할 수 있습니다. 

이 키워드는 상황에 따라 다르게 동작하기 때문에 혼란스러울 수 있습니다:

```js
const object = {
  property: "Value",
  method: function() {
    console.log(this.property);
  }
};

object.method(); // 출력: "Value"
const detachedMethod = object.method;
detachedMethod(); // 출력: undefined
```

두 번째 호출에서는 this가 더 이상 객체를 가리키지 않기 때문에 결과가 정의되지 않았습니다.

## 콜백 지옥



자바스크립트의 비동기 특성은 종종 "콜백 지옥"으로 이어질 수 있습니다. 이는 콜백이 중첩되어 코드를 읽고 유지하기 어렵게 만듭니다:

```js
getData(function(a){
    getMoreData(a, function(b){
        getEvenMoreData(b, function(c){
            console.log('Got data:', c);
        });
    });
});
```

특히 복잡한 애플리케이션에서 이러한 중첩은 빠르게 관리하기 어려워질 수 있습니다.

# 블레이저가 등장합니다



Blazor의 강력한 프레임워크로서의 부상은 웹 개발 방법을 본질적으로 변화시켰습니다. 혁신적인 기능과 .NET 생태계와의 원활한 통합으로, JavaScript로 가지고 있던 불평을 해결할 뿐만 아니라 개발 워크플로우를 혁신적으로 바꿀 수 있었습니다. 여기에서는 Blazor가 웹 개발 환경을 변화시킨 내용에 대해 더 자세한 예제와 통찰을 공유하겠습니다. 특히 구성 요소 중심 아키텍처, 코드 공유의 원활함, 그리고 C#의 장점을 강조할 것입니다.

## 예제로 살펴보는 구성 요소 중심 아키텍처

Blazor의 가장 매력적인 특징 중 하나는 구성 요소 중심 아키텍처입니다. 이 접근 방식을 통해 개발자는 각 구성 요소가 자체 기능과 디자인을 관리하는 모듈식 방식으로 웹 UI를 구축할 수 있습니다. Blazor 구성 요소의 예제를 살펴보겠습니다:

```js
@page "/counter"

<h1>Counter</h1>

<p>Current count: @count</p>

<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>

@code {
    private int count = 0;

    private void IncrementCount()
    {
        count++;
    }
}
```



이 간단한 Counter 구성 요소는 Blazor의 접근 방식을 보여줍니다. 렌더링을 위한 HTML과 동작을 위한 C# 코드가 한 파일에 캡슐화되어 있습니다. 버튼을 클릭하면 IncrementCount 메서드가 count 변수를 업데이트하고 UI가 이 변경을 자동으로 반영합니다. 이 캡슐화와 마크업과 로직의 통합이 Blazor 컴포넌트를 재사용 가능하고 쉽게 관리할 수 있게 만듭니다.

## 서버와 클라이언트 간의 코드 공유의 원활함

Blazor의 서버 및 클라이언트 간 코드를 원활하게 공유할 수 있는 능력은 특히 둘 다에 공유되어야 하는 많은 로직이 필요한 프로젝트에게 혁명을 일으켰습니다. 이 능력은 중복을 줄이고 비즈니스 로직의 유지 보수를 간단하게 만듭니다. 다음은 클라이언트 (Blazor WebAssembly 앱 내) 및 서버 양쪽에서 사용되는 모델을 정의하는 방법의 예시입니다:

```js
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}
```



이 Product 클래스는 공유 라이브러리에 정의될 수 있으며 API 응답을 위한 서버와 렌더링 및 조작을 위한 클라이언트 모두에서 사용할 수 있습니다. 이는 클라이언트 및 서버 코드가 동기화되어 있음을 보장할 뿐만 아니라 C#의 강력한 타이핑을 활용하여 버그를 줄이는 데 도움이 됩니다.

## C# 및 컴파일 시간 오류 검사의 장점

UI 로직을 정적으로 타입된 언어인 C#로 작성으로 전환함으로써 런타임 오류를 줄이고 컴파일 시간 오류 검사를 통해 코드 품질을 향상시켰습니다. 다음은 비교적인 예시를 통해 설명합니다:

JavaScript에서 변수 이름에 오타가 있을 경우 런타임에서만 오류가 발견될 수 있다:



```js
let userName = "Mabrouk"; // 오타가 있는 변수 이름
console.log(userName); // ReferenceError: userName is not defined
```

한편, Blazor에서 비슷한 실수는 컴파일 시간에 잡힐 것입니다:

```js
string userName = "Mabrouk"; // 오타가 있는 변수 이름
Console.WriteLine(userName); // Compile-time error: The name 'userName' does not exist in the current context
```

이 즉각적인 피드백 루프는 디버깅 시간을 크게 줄이고 전체적인 생산성을 향상시킵니다.



# Blazor의 영향

Blazor는 내 생산성뿐만 아니라 웹 개발에 대한 태도도 개선시켰어요. JavaScript의 특이한 점에 대한 답답함은 신뢰할 수 있는 언어와 생태계에서 개발하는 만족을 주도록 바뀌었어요. Blazor가 기존 .NET 라이브러리와 도구와 통합되어 있어 새로운 프레임워크나 라이브러리를 계속 배우는 필요 없이 넓은 생태계를 활용할 수 있습니다.

Blazor Server의 서버 측 렌더링 기능과 Blazor WebAssembly의 클라이언트 측 기능은 응용 프로그램을 배포하고 실행하는 방법에 유연성을 제공하여 다양한 프로젝트 요구 사항에 맞춰줍니다. 이러한 다재다능함은 .NET 플랫폼에서 실행하는 성능 및 보안 이점과 결합되어 Blazor를 새로운 프로젝트나 기존 프로젝트에 모두 유용한 선택지로 만들어줍니다.

# 요약



자바스크립트는 여전히 웹 개발의 중심이 되어 있지만, 제 개인적인 여정은 웹 애플리케이션을 구축하기 위한 주요 프레임워크로 Blazor를 포용하게 되었습니다. 생산성 증가, C#로 코딩하는 즐거움, 그리고 Blazor로 개발된 애플리케이션의 견고함이 바로 제가 "자바스크립트를 싫어하지만 Blazor에게 고마워"라고 말하는 이유입니다.

자바스크립트에 대해 같은 답답함을 느끼는 분들에게는 Blazor를 탐험해 보라고 권유합니다. 당신에게도 저와 같이 웹 개발에 대한 시각을 바꿔줄 수 있을지도 모릅니다. 기술 선택이 프로젝트의 성패를 좌우할 수 있는 세상에서, Blazor는 .NET의 견고함을 현대적 웹 애플리케이션의 역동성과 결합하여 매력적인 대안을 제공합니다.