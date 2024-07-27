---
title: "Angular 구독해야 할까요, 구독하지 말아야 할까요"
description: ""
coverImage: "/assets/img/2024-06-20-AngularToSubscribeorNotSubscribe_0.png"
date: 2024-06-20 00:24
ogImage: 
  url: /assets/img/2024-06-20-AngularToSubscribeorNotSubscribe_0.png
tag: Tech
originalTitle: "Angular: To Subscribe or Not Subscribe"
link: "https://medium.com/stackademic/angular-to-subscribe-or-not-subscribe-f5fc78aae05a"
---



![이미지](/assets/img/2024-06-20-AngularToSubscribeorNotSubscribe_0.png)

Angular에서의 구독(Subscriptions). 이 주제는 프레임워크를 처음 탐색하는 동안 매우 까다로워질 수 있습니다. Angular는 여전히 가장 의견이 분분한 프레임워크 중 하나이지만 Observable 및 구독에 대한 다양한 방법이 있습니다.

## subscribe()란 무엇인가요?

Angular에서 subscribe() 메서드는 Observable을 구독하는 데 사용됩니다. Observable은 Angular의 핵심 개념이며 이벤트, HTTP 요청과 같은 비동기 작업을 처리하는 데 사용됩니다. 거의 모든 것을 Observable로 변환할 수 있습니다. Observable을 구독하면 Observable이 새 값을 방출하거나 오류가 발생할 때 알림을 받고 싶습니다.


<div class="content-ad"></div>

subscribe 함수는 세 가지 콜백을 제공합니다: next, error, 그리고 complete.

next 콜백은 Observable이 방출하는 값을 처리하는 데 사용됩니다. Observable이 새 값을 생성할 때마다 호출됩니다. Observable이 방출하는 데이터를 처리할 수 있습니다.

error 콜백은 Observable의 실행 중에 발생할 수 있는 오류를 처리하는 데 사용됩니다. Observable에서 오류가 발생하면 Observable은 완료된 것으로 간주되며 구독이 자동으로 해지됩니다.

Observable이 완료되면 complete 콜백이 실행되고 자동으로 구독이 해지됩니다. 이는 구독이 종료되고 더 이상 값을 방출하지 않을 것을 의미합니다.

<div class="content-ad"></div>

## 예시 1 (명령형 구독)

매우 기본적인 예시를 시연해보겠습니다. 코드는 ngOnInit 훅(component 초기화)에서 bookService를 통해 백엔드 서버로 HTTP 호출을 트리거합니다. 컴포넌트는 라이프사이클 동안 단 한 번만 ngOnInit를 수행하므로bookService가 한 번만 호출된다는 것을 확신할 수 있습니다 (동일한 컴포넌트를 여러 번 사용하지 않는 한).

이 경우 구독을 처리해야 할 필요가 있을까요? 아니요.

HTTP 호출은 "cold observables"로 인식됩니다. Observable(HTTP 이벤트)는 새 값을 한 번만 방출하고 완료됩니다.

<div class="content-ad"></div>


![image](https://miro.medium.com/v2/resize:fit:1400/1*sjTC0Kw8kLgzFwvnHelfmw.gif)

우리의 이론은 콘솔 로그를 확인함으로써 확인되었습니다. next와 complete에 대한 subscribe() 콜백이 모두 실행되었고 Observable이 자동으로 구독 해제되었습니다.

하지만 Observable이 새로운 값들을 발행하는 빈도에 대해 확실하지 않을 때는 어떻게 해야 할까요?

# 구독 관리


<div class="content-ad"></div>

"핫 옵저버블"은 차가운 옵저버블과는 반대되는 다른 유형의 옵저버블입니다. 이는 얼마나 자주 새 값이 방출될지 예측할 수 없는 이벤트에 사용됩니다. 예시로는 마우스 이벤트, 폼 값 변경, 심지어 로컬 스토리지 업데이트 등이 있습니다.

이 범주 내에서 생성된 각 구독을 적절히 관리하는 것이 중요합니다. 효과적으로 구독 취소하는 여러 방법을 알아봅시다.

이 데모에서, 우리는 구독에 적절히 관리하지 않았을 때 발생할 수 있는 잠재적인 문제점을 쉽게 알 수 있습니다.

- '시작' 버튼을 누르면 handleKeyboardEvent() 함수가 트리거됩니다.
- handleKeyboardEvent() 내에서 컴포넌트는 키보드 입력에 구독합니다.
- 각 키 입력이 문자열 변수에 추가됩니다.
- 구독 관리가 부적절하여 여러 구독이 생성됩니다.
- 각 키 입력이 여러 번 옵저버블을 트리거하게 되어 여러 번 실행됩니다.

<div class="content-ad"></div>


![image](https://miro.medium.com/v2/resize:fit:1400/1*5B8aXGdi_KtczL2Bj7XYFA.gif)

## 수동으로 구독 취소하기

간단하지만 효과적인 방법은 모든 구독 객체에서 사용 가능한 unsubscribe() 함수를 활용하는 것입니다. 이 기술을 통해 접근 방식을 최적화해 봅시다.

- 우리는 fromEvent에서 구독을 subscription이라는 변수에 저장했습니다.
- '중지'를 클릭하면 기존 구독을 제거하고 새로운 구독을 생성하지 않습니다.
- 시작/중지 버튼을 클릭하여 이전 데모에서 발생했던 여러 구독 문제를 다시 만들어 보았지만 성공하지 못했습니다.
- 이제 애플리케이션이 의도한대로 작동합니다.


<div class="content-ad"></div>

<img src="https://miro.medium.com/v2/resize:fit:1400/1*HzcA5K_m8RveTyYgvKixZw.gif" />

여러 개의 구독을 할당할 때 주의하세요. 코드가 빨리 복잡해질 수 있습니다. (조금) 더 깔끔한 해결책은 구독을 효과적으로 관리하기 위해 Subscription 배열을 생성하는 것일 수 있습니다.

```js
// 다수의 구독 생성 예시
subscription1 = of(null).subscribe();
subscription2 = of(null).subscribe();
subscription3 = of(null).subscribe();
subscription4 = of(null).subscribe();
subscription5 = of(null).subscribe();
subscription6 = of(null).subscribe();

// 대신 Subscription 배열 생성
private subscriptions: Subscription[] = [];
this.subscriptions.push(
  of(null).subscribe()
);

// 컴포넌트 소멸 시 모든 구독 해제
ngOnDestroy(): void {
  this.subscriptions.forEach(subscription => subscription.unsubscribe());
}
```

그래도 모든 것을 배열에 넣는 것은 조금 이상하게 느껴질 수 있습니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-AngularToSubscribeorNotSubscribe_1.png" />

보다 원활한 해결책을 상상해보세요: 수동으로 구독을 해지하는 대신 Angular가 자동으로 처리하는 것은 어떨까요?

- 우리는 fromEvent에서 생성된 Observable을 변수 string$에 할당하고 있습니다.
- 우리의 템플릿에서는 async 파이프를 사용하여 string$에 구독하고 렌더링합니다.
- 시작을 false로 토글할 때, 우리의 Observable은 자동으로 구독 해지됩니다.
- 우리의 Observable은 이전 값에 현재 눌린 키를 연결하는 데 scan 연산자를 활용합니다.
- finalize 연산자는 Observable이 소멸될 때 콘솔에 확인 메시지를 로깅하여 Observable 구독을 보장합니다.

Angular에서 Observable과 함께 async 파이프를 사용하는 것은 일반적으로 템플릿에서 비동기 데이터를 관리하는 데 가장 좋은 방법으로 여겨집니다. async 파이프는 Observable에 자동으로 구독하고 값을 가져와보여주면서 뷰를 업데이트합니다. 이렇게 함으로써 코드를 단순화하고 구성 요소가 소멸될 때 자동으로 구독을 해지하여 잠재적인 메모리 누수를 방지합니다.

<div class="content-ad"></div>


![이미지](https://miro.medium.com/v2/resize:fit:1400/1*56m_2d_sldWVyBmbl5T6ZA.gif)

## RxJS take() 연산자 소개

테이블에서 행 위로 마우스를 올렸을 때 추가 세부 정보를 로드하려는 시나리오에서 RxJS take() 연산자는 가치 있는 도구로 입증됩니다. 이 연산자를 사용하면 Observable에서 발행되는 값의 수를 제한할 수 있습니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*ezlcTQirocW_SCwwTTXj4w.gif)


<div class="content-ad"></div>

수많은 구독이 생성되어 불필요한 HTTP 호출이 발생했습니다. 우리의 목표는 각 행의 세부 정보를 한 번만 호출한 후 구독을 해지하는 것이어야 합니다.

RxJs의 take 연산자를 실제로 살펴보겠습니다.

![RxJs take operator in action](https://miro.medium.com/v2/resize:fit:1400/1*vw1g8r3h31qfJWlbcIGoxA.gif)

의도한 대로 문제가 해결되었습니다. 여기서 확인할 수 있습니다:

<div class="content-ad"></div>

- `take(1)`을 추가하면 발행된 항목이 하나로 제한됩니다.
- 테이블의 각 행에 구독합니다.
- `hoverevent`에서 새로운 값이 발행됩니다.
- 다음 콜백이 트리거됩니다.
- 완료 콜백이 호출되어 Observable의 완료 및 자동 구독 해제가 이뤄집니다.
- 이전에 호버된 행에서 추가 값이 발행되지 않습니다.

우리는 결과를 저장하고 다시 호버할 때 즉시 사용할 수 있습니다. 새로운 HTTP 호출을 하지 않고 매우 빠르게 처리할 수 있습니다. 또는 RxJS `first()` 연산자를 선택할 수 있습니다.

## RxJs `takeUntil()` 연산자

구독을 관리하는 또 다른 널리 사용되는 접근 방법은 인기 있는 RxJS `takeUntil` 연산자입니다. 이 연산자는 Observable이 특정 조건이 충족될 때까지 새로운 값을 발행하도록 허용합니다. 충분한 이론, 이제 코드를 작성해 봅시다. 먼저 문제를 해결해 보겠습니다.

<div class="content-ad"></div>

자주 간과되는 문제: FormGroup의 valueChanges를 구독 해제하는 것을 잊는 것입니다. 이 시나리오에서는 간단한 양식을 만들었습니다. 이메일 양식 컨트롤의 값을 템플릿 문자열을 사용하여 동적으로 설정합니다. 이는 이름과 성의 소문자 버전을 점으로 구분하여 @gmail.com을 붙인 문자열을 결합합니다.

- combineLatest는 이름과 성 양식 컨트롤에서 생성된 옵저버블에 의해 발생한 최신 값을 결합하는 데 사용됩니다. startWith(``)는 옵저버블이 빈 문자열의 초기 값을 발행하도록 보장합니다.
- takeUntil(this.destroy$)는 destroy$ 옵저버블이 값을 발행할 때 구독이 자동으로 해제되도록 보장합니다. 이는 구성 요소 소멸 또는 정리 시 메모리 누수를 피하는 일반적인 패턴입니다.
- finalize(() =&gt; console.log(`UNSUBSCRIBED`))는 구독이 해제될 때 콘솔에 `UNSUBSCRIBED`를 로그하는 부수 효과입니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*kGUmkeauwpTqH25yITi7Sw.gif)

## takeUntilDestroy (v16부터)

<div class="content-ad"></div>

Angular v16부터는 새로운 takeUntilDestroy() 연산자를 활용할 수 있습니다. 이전 예제의 takeUntil(this.destroy$)와 동일한 작업을 수행하며, destroy$ subject를 만들지 않고 수동으로 호출할 필요가 없어집니다.

코드를 리팩토링해봅시다.

- takeUntil(this.destroy$)를 takeUntilDestroyed()로 대체했습니다.
- destroy$ Subject와 ngOnDestroyhook를 모두 제거했습니다.

결과를 확인해보겠습니다...

<div class="content-ad"></div>

아래와 같은 결과를 얻지는 못했지만, 우리가 어떻게 개선할 수 있는지 살펴보겠습니다.

destroyRef를 주입하고 takeUntilDestroyed()에 매개변수로 전달한 후, 이제 작동합니다.

# 결론

<div class="content-ad"></div>

오늘은 여기까지입니다! 이 기사를 통해 다양한 Observable을 활용한 다양한 시나리오를 탐구했습니다. 이를 처리하는 다양한 접근 방식을 공유했습니다. 개발자들에게는 자신의 코딩 취향과 구체적인 코드베이스에 가장 적합한 방법을 찾는 것을 권장합니다. 여러분의 코드베이스가 최신 트렌드와 부합한다든지 그렇지 않다든지, 이 기사에서의 중요한 결론은 수동 구독 관리를 두려워할 필요가 없다는 것입니다. 핵심은 신중함을 유지하고 구독 취소를 처리할 때 적절히 주의를 기울이는 것입니다. 이러한 관행을 수용하면 장기적으로 더 견고하고 유지보수 가능한 코드베이스를 보장할 수 있습니다.

# Stackademic

끝까지 읽어주셔서 감사합니다. 떠나시기 전에:

- 박수를 치고 작가를 팔로우해주세요! 👏
- 저희를 팔로우해주세요 X | LinkedIn | YouTube | Discord
- 다른 플랫폼들을 방문해주세요: In Plain English | CoFeed | Venture