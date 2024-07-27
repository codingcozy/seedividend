---
title: "Angular에서 Observable과 Subject 사용법 차이점 및 활용 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-ObservableandSubjectsinAngular_0.png"
date: 2024-07-07 19:19
ogImage:
  url: /assets/img/2024-07-07-ObservableandSubjectsinAngular_0.png
tag: Tech
originalTitle: "Observable and Subjects in Angular"
link: "https://medium.com/@jaydeepvpatil225/observables-and-subjects-in-angular-a4d73dfa5bb"
---

<img src="/TIL/assets/img/2024-07-07-ObservableandSubjectsinAngular_0.png" />

안녕하세요! 이 글에서는 옵저버블(observable)과 서브젝트(subject)의 기본에 대해 알아볼 거에요. 또한 그들 간의 차이를 실제 예시를 통해 설명하고 다양한 종류의 서브젝트에 대해 이야기할 거에요.

# 안내

- Angular가 무엇인가요?

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

- Angular의 Observable

- Angular의 Subject

- Observable과 Subject의 실시간 사용 사례와 차이점

- 예제를 통한 Angular의 Subject 종류

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

# Prerequisites

- TypeScript에 대한 기본적인 이해
- VS Code
- Angular CLI

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

- NodeJS

## Angular이란 무엇인가요?

Angular은 웹 애플리케이션을 구축하기 위한 인기있는 오픈 소스 JavaScript 프레임워크입니다. Google에서 개발되었으며 현재는 Google의 Angular 팀에 의해 유지보수되고 있습니다. Angular를 사용하면 개발자들은 동적인 단일 페이지 애플리케이션(SPA)을 만들 수 있으며 복잡한 웹 애플리케이션을 구축하기 위한 구조화된 접근 방식을 제공합니다.

## Angular에서 Observable

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

- Angular에서 Observables는 JavaScript의 Reactive Extensions 라이브러리(RxJS)의 일부입니다.

- Observables은 애플리케이션의 각 부분 간에 메시지를 전달하는 데 지원을 제공합니다.

- Observables은 비동기 작업 및 데이터 스트림을 처리하는 데 널리 사용되는 강력한 기능입니다.

- Observables은 새로운 데이터나 이벤트가 발생할 때 구독하고 알림을 받을 수 있는 방법을 제공하여 실시간으로 변경에 반응할 수 있도록합니다.

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

# Angular에서 Subject

- RxJS Subject은 여러 Observers에게 값을 멀티캐스트 할 수 있는 특별한 유형의 Observable입니다. 일반 Observables은 유니캐스트입니다(각 구독한 Observer가 Observable의 독립적 실행을 소유함), 그에 반해 Subjects는 멀티캐스트입니다.

- Subject는 Observable과 비슷하지만 많은 Observers에게 멀티캐스트 할 수 있습니다. Subjects는 이벤트 발생자와 같습니다: 많은 청취자 목록을 유지합니다.

- 이는 Angular 프로젝트에 기본으로 포함된 JavaScript 반응 확장 라이브러리(RxJS)의 일부입니다.

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

# Observable과 Subject의 차이 및 실시간 사용 사례

Observable과 Subject는 모두 JavaScript의 Reactive Extensions (RxJS) 라이브러리의 일부이며 Angular에서 비동기 데이터 스트림 및 이벤트 처리를 관리하는 데 사용됩니다. 그러나 이들 간에 몇 가지 주요 차이점이 있습니다.

![Observable vs Subject](/TIL/assets/img/2024-07-07-ObservableandSubjectsinAngular_1.png)

# Angular에서의 다양한 Subject 유형 및 예제

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

RxJS 라이브러리에서 사용할 수 있는 주제 유형은 다음과 같습니다. 다양한 시나리오에 사용할 수 있습니다:

## 1. Subject

- Subject는 RxJS에서 주제의 기본 구현입니다.

- next() 메서드를 사용하여 새 값이 발행될 때 관찰자 목록을 유지하고 모든 관찰자에게 알림을 보내는 멀티캐스트 가능한 옵저버입니다.

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

- 초기 값을 갖고 있지 않아서 구독자들은 구독한 후에 발행된 값만 받습니다.
- 이는 추가 기능 없이 간단한 다중 발행체를 필요로 할 때 좋은 옵션입니다.

```js
//------------------Observables are unicast-----------------
    //observable
    let observable = new Observable<number>(ele =>
      ele.next(Math.random()))

    //first subscriber
    observable.subscribe(result => {
      this.first_subscriber_observable = result;
      console.log(result)
    })

    //second subscriber
    observable.subscribe(result => {
      this.second_subscriber_observable = result;
      console.log(result)
    })

    //third subscriber
    observable.subscribe(result => {
      this.thrid_subscriber_observable = result;
      console.log(result)
    })
    //--------------------------------------------------------

    //------------------Subjects are multicast-----------------
    //subject
    let subject = new Subject<number>()

    //first subscriber
    subject.subscribe(result => {
      this.first_subscriber_subject = result;
      console.log(result)
    })

    //second subscriber
    subject.subscribe(result => {
      this.second_subscriber_subject = result;
      console.log(result)
    })

    //third subscriber
    subject.subscribe(result => {
      this.third_subscriber_subject = result;
      console.log(result)
    })

    subject.next(Math.random())
    //--------------------------------------------------------
```

![Illustration](/TIL/assets/img/2024-07-07-ObservableandSubjectsinAngular_2.png)

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

## 2. BehaviorSubject

- BehaviorSubject는 RxJS의 다른 유형의 Subject입니다.
- 초기값을 가지고 있으며 구독자가 구독하는 즉시 초기값을 즉시 발행하며, 아직 next() 메서드를 사용하여 값이 발행되지 않은 경우에도 발행합니다.
- 초기값을 발행한 후에는 일반적인 Subject처럼 작동하여 next()를 사용하여 새 값이 발행될 때 구독자에게 알립니다.

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

· 새 구독자에게 마지막으로 알려진 값, 예를 들어 애플리케이션의 현재 상태 또는 API에서 검색한 최신 데이터를 제공하고 싶을 때 유용합니다.

```js
//----------Behavior Subject has default or last emitted value---------------
var behaviorSubject = new BehaviorSubject() < number > 123;

behaviorSubject.subscribe((ele) => {
  this.first_subscriber_behaviorSubject = ele;
  console.log(`first subscriber ${ele}`);
});

behaviorSubject.next(456);

behaviorSubject.subscribe((ele) => {
  this.second_subscriber_behaviorSubject = ele;
  console.log(`second subscriber ${ele}`);
});

//--------------------------------------------------------------------------
```

![Observableand SubjectsinAngular](/TIL/assets/img/2024-07-07-ObservableandSubjectsinAngular_3.png)

## 3. ReplaySubject

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

- ReplaySubject은 특정 수의 값을 버퍼링하고 새로운 구독자에 대해 다시 재생할 수 있는 subject입니다.

- ReplaySubject를 생성할 때 버퍼 크기를 지정할 수 있으며, 이는 새로운 구독자에 대해 다시 재생할 이전 값의 수를 결정합니다.

- 이는 새로운 구독자에게 값의 이력을 제공하거나 나중에 값을 캐시해야 할 때 유용합니다.

```js
//--------------- Replay subject buffers old values not default one -----------

const replaySuject = new ReplaySubject(2); // 만약 마지막 2개의 버퍼링된 값을 보여주고 싶다면, 그렇지 않으면 모든 값을 보여줌

replaySuject.next(111);
replaySuject.next(222);
replaySuject.next(333);

replaySuject.subscribe((e) => {
  console.log(`첫번째 구독자 ${e}`);
  this.first_subscriber_replaySubject.push(e);
});

// 새로운 값은 기존 구독자에게 표시됩니다.
replaySuject.next(444);

replaySuject.subscribe((e) => {
  console.log(`두번째 구독자 ${e}`);
  this.second_subscriber_replaySubject.push(e);
});

replaySuject.next(555);
//---------------------------------------------------------------------------
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

![image](/TIL/assets/img/2024-07-07-ObservableandSubjectsinAngular_4.png)

## 4. AsyncSubject

- AsyncSubject은 완료될 때 마지막 값을 만 방출하는 subject입니다.
- subject의 complete() 메서드가 호출될 때까지 어떤 값도 방출하지 않습니다. 완료되면 마지막 값을 (있는 경우) 구독자에게 방출합니다.

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

· 최종 값이 발행되기 전에 작업이 완료될 때 유용합니다. 예를 들어, HTTP 요청이 완료될 때까지 기다렸다가 응답을 단일 값으로 발행할 때 사용합니다.

```js
 //---------------Async subject sends the latest value to subscribers when it's completed-----------
    const asyncSubject = new AsyncSubject<number>();

    asyncSubject.subscribe(e =>
      {
        console.log(`첫 번째 구독자: ${e}`)
        this.first_subscriber_asyncSubject=e;
    });

    asyncSubject.next(111);
    asyncSubject.next(222);
    asyncSubject.next(333);
    asyncSubject.next(444);

    asyncSubject.subscribe(e => {
      console.log(`두 번째 구독자: ${e}`)
      this.second_subscriber_asyncSubject=e;
    });

    asyncSubject.next(555);
    asyncSubject.complete();

    //--------------------------------------------------------------------------
```

![이미지](/TIL/assets/img/2024-07-07-ObservableandSubjectsinAngular_5.png)

# GitHub URL

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

https://github.com/Jaydeep-007/angular-subject-and-observable

# 결론

이 글에서는 주제의 기본 사항과 옵저버블과 주제의 차이에 대해 서로 다른 유형과 예제를 다뤘습니다.

코딩 즐기세요!

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

# 친근한 한국어 번역

우리 커뮤니티에 함께해줘서 감사합니다! 떠나시기 전에:

- 작가를 클랩하고 팔로우해주세요! 👏
- PlainEnglish.io에서 더 많은 콘텐츠를 찾을 수 있어요! 🚀
- 무료 주간 뉴스레터를 구독해주세요. 🗞️
- 트위터, 링크드인, 유튜브, 디스코드에서 팔로우해주세요.
