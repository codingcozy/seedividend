---
title: "Angular에서의 코드 스멜  심층 분석  Part II"
description: ""
coverImage: "/assets/img/2024-05-14-CodesmellsinAngularDeepDivePartII_0.png"
date: 2024-05-14 12:56
ogImage: 
  url: /assets/img/2024-05-14-CodesmellsinAngularDeepDivePartII_0.png
tag: Tech
originalTitle: "Code smells in Angular — Deep Dive — Part II"
link: "https://medium.com/@robert.maiersilldorff/code-smells-in-angular-deep-dive-part-ii-747526c43cc9"
---


내 최근 블로그 게시물 중 하나에서 런타임 성능과 관련한 상위 5개 코드 스멜에 대해 깊이 파고들었습니다. 이번에는 프로젝트의 유지 관리성과 관련된 코드 스멜에 대해 더 많은 이야기를 나누고 싶습니다. 이 내용은 이전 블로그 게시물 [1]에 명시되어 있어요.

하지만, 하나의 코드 스멜을 추가하고 싶은데요, 바로 모듈 경계와 DRY 원칙입니다. 왜 이것을 추가하려고 하는 걸까요? 여러 달 동안 DRY 원칙이 제대로 이해되지 않았다는 것을 알게 되었기 때문에, 이 주제에 대해 더 내용을 발전시키고자 합니다.

![이미지](/assets/img/2024-05-14-CodesmellsinAngularDeepDivePartII_0.png)

## 1a. 모듈 경계와 DRY 원칙



이전 블로그 게시물 중 하나에서 프론트엔드에 DDD 개념을 추가하는 것을 제안했습니다. 이는 프로젝트를 쉽게 유지보수할 수 있도록 도와줄 것입니다 [2]. 다음 다이어그램은 예약 및 오퍼 서브도메인 뿐만 아니라 공유 도메인을 보여줍니다.

이 방식의 큰 장점은 무엇일까요?

- 모듈 경계를 쉽게 정의할 수 있음
- 모듈 간 느슨한 결합
- 구성 요소 및/또는 모델을 공유하기 위한 명시적 API

![다이어그램](/assets/img/2024-05-14-CodesmellsinAngularDeepDivePartII_1.png)



하지만 더 중요한 것이 하나 더 있어요. 바로 DRY 원리에 관한 것인데요. DRY 원리는 코드를 중복해서 작성하지 말고 재사용해야 한다는 원칙을 말해요. 실제로 각 하위 도메인 안에서도 그렇게 되어 있어요. 즉, 예약 부분에서는 코드를 중복해서 작성하면 안 돼요. 그렇다면 해당 부분을 예약 하위 도메인 안에 공유 모듈로 이동해 주세요.

하지만 이는 두 개의 하위 도메인 사이에 중복된 코드가 없어야 한다는 것을 의미하는 건 아니에요. 사실 유지보수성을 고려하면 모델이나 컴포넌트를 중복해서 작성하는 것이 오히려 합리적일 수도 있어요. 그 이유는 하위 도메인 간의 느슨한 결합을 보장하고 싶기 때문이에요.

계층 구조에도 동일한 원리가 적용돼요. 모듈 간에 강하게 결합되어 있다면 이를 제거하려 노력해야 하며, 이를 위해서 코드를 중복해야 하는 경우라도 꺼려서는 안 돼요.

그래서 프론트엔드 아키텍처와 모듈 경계는 어떤 프로젝트의 유지보수성에 큰 영향을 미친답니다. 프론트엔드에 DDD 개념을 적용할 필요는 없지만 모듈 간의 느슨한 결합을 유지하려 노력하는 것이 중요하답니다.



## 1b. Imports 처리 - 모듈 해결 없음

자주 볼 수있는 코드 스멜 중 하나는 모듈 해결이 없다는 것입니다. 왜 코드 스멜인가요? 모듈 해결이 없으면 import 경로에 매우 강하게 결합되어 있습니다. 경로가 변경되면 import도 변경해야 합니다. 우리가 원하는 행동은 아닙니다.

```js
import {Offers} from '../../../offers/models/offers.model';
import {Receipt} from '../../../booking/models/receipt.model';
import {StringUtils} from '../../shared/utils/string.utils';
```

각 디렉토리에 대한 배럴 파일을 도입하여 이러한 import에 어떤 영향을 미치는지 살펴봅시다.



```js
import {Offers} from '../../../offers/models';
import {Receipt} from '../../../booking/models';
import {StringUtils} from '../../shared/utils';
```

위의 해결책은 개선되었지만 여전히 상대 경로 대신 절대 경로를 사용합니다. 수동으로 변경할 수 있지만 꽤 귀찮고 시간이 오래 걸립니다. 그래서 모듈 해결책을 소개해보겠습니다.

다음 코드 스니펫을 tsconfig.json 파일에 추가합니다.

```js
"compilerOptions": {
   ...
   "paths": {
       "@offers/*": ["/src/app/offers/*"],
       "@booking/*": ["/src/app/booking/*"],
       "@shared/*": ["/src/app/shared/*"],
   }
   ...
}
```



지금부터는 기존 컴포넌트 내에서 imports를 간소화하기 위해 알림을 받게 될 것입니다. 그리고 모든 새로운 imports는 자동으로 새로운 모듈 해상도를 사용하게 됩니다.

```js
import {Offers} from '@offers/models';
import {Receipt} from '@booking/models';
import {StringUtils} from '@shared/utils';
```

## 2. 컴포넌트 내에서의 다중 책임

지금까지 접했던 또 다른 코드 냄새는 컴포넌트 내에서의 다중 책임입니다. 이는 단일 책임 원칙(SRP)과 충돌될 수 있습니다. SRP는 컴포넌트가 한 가지 일을 잘 처리해야 하지만 여러 가지 역할을 해서는 안 된다는 것을 명시합니다.



예시를 살펴보겠습니다. 다음 코드 조각은 예약을 검색하는 구성 요소를 보여줍니다. 그러나 더 자세히 살펴보면 이 구성 요소는 오퍼를 추가할 수 있는 기능도 제공합니다. 오퍼와 예약은 서로 다른 것이며(두 개의 서로 다른 서브도메인이기도 합니다), 하나의 구성 요소에서 다루어지면 안됩니다.

```js
export class SearchBookingComponent implements OnInit {

  bookings: Booking[];
  searchControl = new UntypedFormControl();
  filteredBookings$: Observable<Booking[]>;

  constructor(private bookingService: BookingService,
              private offerService: OfferService) {
    bookingService.getAll()
      .pipe(first())
      .subscribe((bookings) => {
        this.bookings = bookings;
      });
  }

  ngOnInit() {
    this.filteredBookings$ = this.searchControl.valueChanges.pipe(
      switchMap((searchText) => this.bookingService.search(searchText)),
      startWith(this.bookings)
    );
  }

  bookOffer(offer: Offer) {
    this.offerService.bookOffer(offer);
  }
}
```

또 다른 예시는 구성 요소 템플릿이 너무 복잡하다는 것입니다. 다음 코드 조각은 검색 입력 필드나 예약 목록 항목 뿐만 아니라 정보 대화상자까지 포함되어 있음을 보여줍니다.

```js
<form autocomplete="off" class="form-container">
  <div class="form-content">
    <h2 mat-subheader>Search bookings</h2>
    <div class="pl-3 pr-3">
      <mat-form-field>
        <input matInput [formControl]="searchControl" placeholder="Searching">
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>
    </div>
    <mat-list>
      <section class="scroll-container">
        <ng-container>
          <ng-container *ngFor="let booking of (filteredBookings$ | async)">
            <mat-list-item>
              <h4 mat-line>{booking?.header}</h4>
              <p mat-line>{booking?.content} </p>
              <button
                      type="button"
                      mat-icon-button
                      (click)="showBookingDetailsAction.emit()">
                <mat-icon aria-label="Side nav toggle icon">info</mat-icon>
              </button>
              <button
                      type="button"
                      mat-icon-button
                      (click)="bookOfferAction.emit()">
                <mat-icon aria-label="Side nav toggle icon">add_shopping_cart</mat-icon>
              </button>
              <ng-content></ng-content>
            </mat-list-item>
          </ng-container>
        </ng-container>
      </section>
      <section class="info-dialog" *ngIf="(dialogVisible$ | async)">
        <button type="button" mat-button.mat-small class="button-dismiss"
            (click)="close.next(true)"><i class="fal fa-times"></i>
        </button>
        <h1 mat-dialog-title><b>{ title }</b></h1>
        <div mat-dialog-content>
          <div class="font-settings" [innerHTML]="infos"></div>
        </div>
        <div mat-dialog-actions class="flex-content-end">
          <button type="button" mat-raised-button
                  (click)="close.next(true)">Close
          </button>
        </div>
      </section>
    </mat-list>
  </div>
</form>
```



첫 번째 개선 사항은 info-dialog을 별도의 컴포넌트로 이동하는 것입니다. 그러나 이것이 우리가 해야 할 유일한 개선 사항일까요? 아니요, 아닙니다. 단일 컴포넌트는 가능한 적은 사용자 상호 작용(또는 사용 사례)을 가져야 합니다.

사용 사례는 무엇인가요?

- 예약 검색
- 예약을 장바구니에 추가
- 예약 정보 표시

따라서 예약 목록 항목 컴포넌트도 도입할 것입니다.



## 3. 서비스 내 유틸리티 기능

테스트 작성은 정말 힘들 수 있어요. 시간이 지날수록 서비스와 컴포넌트는 복잡해지는 경향이 있어요. 그래서 매번 컴포넌트 및 서비스 테스트를 조정해야 해요. 거의 항상 추가해야 하는 종속성 때문이죠.

그래서 나는 언제나 비즈니스 로직을 서비스나 컴포넌트가 아닌 유틸 클래스로 옮길 거예요. 먼저, 유틸은 테스트하기가 훨씬 쉽고, 둘째로, 각 서브도메인의 비즈니스 로직을 단일 파일에 두고 싶어요. 전체 서브도메인을 훑어가며 비즈니스 로직을 찾지 않길 원하거든요.

```typescript
export class BookingUtil {

    public static isBookingSold(status: BookingStatus): boolean {
        return [
            bookingStatus.Reserved,
            bookingStatus.WaitingForCustomer,
            bookingStatus.Sold
        ].includes(status);
    }

    public static isBookingCancelable(status: BookingStatus, alterationType: BookingAlterationType): boolean {
        return (
            [
             bookingStatus.WaitingForCustomer
            ].includes(status) &&
            [
             bookingAlterationType.Cancelable,
             bookingAlterationType.CancelableOnWaiting
            ].includes(alterationType)
        );
    }

    public static getNextBookingNumber(bookings: Booking[]): number {
        const bookingNumbers = bookings
                    .filter((booking) => isNotEmpty(booking.bookingNumber))
                    .map((booking) => booking.bookingNumber));
        
        return Math.max(...bookingNumbers);
    }

    public static mergeBookings(firstBooking, secondBooking): number {
        ...
    } 
}
```



## 4. 중첩된 구독

다음으로 지적하고 싶은 코드 스멜은 중첩된 구독입니다. 중첩된 구독은 필요 이상으로 코드 라인이 더 많을 뿐만 아니라 원하지 않는 부작용을 일으킬 수도 있습니다.

예를 들어, 다음 코드 조각을 살펴보겠습니다. 검색 입력 필드의 텍스트가 변경될 때마다 HTTP 요청이 생성됩니다. 그러나 사용자가 문자를 추가할 때마다 HTTP 요청이 한 번만 실행되지 않고 여러 번 실행될 수 있습니다. 왜냐하면 두 번째 구독이 닫히지 않았기 때문입니다.

```js
const filteredBookings$ = new BehaviorSubject<Booking[]>([]);
this.searchControl.valueChanges.pipe(takeUntil(this.destroy$))
     .subscribe((text) => {
          this.bookingService.search(text).pipe(takeUntil(this.destroy$))
              .subscribe((bookings) => {
                  this.filteredBookings$.next(bookings);
              });
      });
```



이건 쉽게 수정할 수 있어요. takeUntil(this.destroy$)을 first()로 교체하면 됩니다. 하지만 여전히 많은 코드가 남아 있네요.

```js
const filteredBookings$ = new BehaviorSubject<Booking[]>([]);
this.searchControl.valueChanges.pipe(takeUntil(this.destroy$))
     .subscribe((text) => {
          this.bookingService.search(text).pipe(first())
              .subscribe((bookings) => {
                  this.filteredBookings$.next(bookings);
              });
      });
```

그래서 아래와 같이 코드를 간소화할 거예요. 이제 훨씬 깔끔하고 유지보수가 쉬워졌어요.

```js
const filteredBookings$ = this.searchControl.valueChanges.pipe(
  switchMap(text => this.bookingService.search(text))
)
```



다음 예시는 ngOnInit에서 사용할 수 없는 ViewChild입니다. 그러므로 BehaviorSubject를 사용하는 setter를 추가하여 PdfViewerComponent의 초기화에 대해 쉽게 알림을 받을 수 있습니다.

```js
@ViewChild('viewer')
set viewer(viewer: PdfViewerComponent | undefined) {
    this.viewer$.next(viewer);
}
```

이제 PdfViewerComponent에 의해 트리거된 모든 텍스트 선택 변경 사항에 구독하려고 합니다. 첫 번째 해결 방법은 다음과 같을 수 있습니다. 그러나 PdfViewer의 첫 번째 유효한 값만 필요하고 그 후에 변경 사항에 구독하려고 합니다. 중첩된 구독 없이 또는 그렇지 않을까요? 

```js
const ranges$ = new BehaviorSubject<Range[]>([]);
this.pdfViewer$.pipe(filter((viewer) => viewer != null), takeUntil(this.destroy$))
     .subscribe((viewer) => {
        this.textSelectionDestroy$.next();
        viewer?.textSelection.pipe(takeUntil(this.textSelectionDestroy$))
              .subscribe((ranges) => {
                  ranges$.next(ranges);
              });
});
```



물론, 이 문제에 대한 해결책이 있어요. 다음 코드를 살펴봐요. 하지만 잠시만요, 실수가 있네요. 모든 텍스트 선택 변경에 대해 알림을 받지 않고 첫 번째 변경에 대해서만 알게 될 거예요.

```js
const ranges$ = this.pdfViewer$.pipe(
      filter((viewer): viewer is NonNullable<PdfViewerComponent> => viewer != null),
      switchMap((viewer) => viewer.textSelection$)
);
```

오, 네 맞아요. 첫 번째 observable에서 구독을 취소해야 해요. `first()`를 추가해야 해요. 이제 코드가 잘 작동해요.

```js
const ranges$ = this.pdfViewer$.pipe(
      filter((viewer): viewer is NonNullable<PdfViewerComponent> => viewer != null),
      first(),
      switchMap((viewer) => viewer.textSelection$)
);
```



## 5. Mutable 대신 immutable을 사용하세요

객체나 배열을 직접 수정할 필요가 없습니다. 성능상의 이유일 때만 예외적으로 배열 조작을 직접 할 수 있습니다. 그 외에는 항상 immutable을 유지하는 것을 권장합니다.

```js
array.sort(...)   =>  array.slice().sort(...)
array.splice(...) =>  [...array.slice(0, start), ...items, ...array.slice(start + deleteCount)] 
obj.test = "123"  =>  obj = {...obj, test: "123"} 

Object.assign(obj, {test: "123"})  =>  obj = {...obj, test: "123"};
 
array.push(...)   =>  array = array.concat(...)
delete obj.test   =>  const {test, ...objWithoutTest} = obj;
```

Angular에서 왜 이것이 중요한가요?



만약 전에 작성한 블로그 포스트 [1] (코드 스멜의 첫 번째 부분)를 읽었다면, ChangeDetection 및 OnPush-Strategy에 익숙할 것입니다. 이는 뷰가 개체를 조작해도 다시 렌더링되지 않지만, 개체 참조가 변경되면 다시 렌더링됨을 의미합니다.

따라서 우리는 불변해야 합니다. 이는 구성 요소뿐만 아니라 순수 파이프에도 적용됩니다. 순수 파이프는 입력 참조가 변경된 경우에만 변환 기능을 트리거합니다.

# 요약

지금까지 경험한 상위 5가지 코드 스멜에 대해 심층적으로 살펴보았습니다. 따라서 모듈 해결 방법을 사용하고, 불변성을 유지하며, 중첩된 구독을 피하고, 비즈니스 로직을 단일 테스트 가능한 파일로 이동시키고, 구성 요소에 여러 책임을 부여하지 않도록 주의해주시기 바랍니다.



## 링크

- [1] [여기](https://medium.com/@robert.maiersilldorff/code-smells-in-angular-deep-dive-part-i-d63dd5f5215e)
- [2] [여기](https://blog.bitsrc.io/clean-frontend-architecture-2995c68702fb)