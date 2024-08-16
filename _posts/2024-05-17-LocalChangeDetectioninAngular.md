---
title: "앵귤러에서의 로컬 변경되었을 때 감지하는 방법"
description: ""
coverImage: "/assets/img/2024-05-17-LocalChangeDetectioninAngular_0.png"
date: 2024-05-17 21:16
ogImage: 
  url: /assets/img/2024-05-17-LocalChangeDetectioninAngular_0.png
tag: Tech
originalTitle: "Local Change Detection in Angular"
link: "https://medium.com/ngconf/local-change-detection-in-angular-410d82b38664"
isUpdated: true
---





![Local Change Detection in Angular](/assets/img/2024-05-17-LocalChangeDetectioninAngular_0.png)

Angular 16 introduced Signals as a pivotal feature, setting the stage for future applications and laying the foundation for a zoneless environment. Signals operate reactively, enabling the generation of derived values or side effects through functions like signal(), computed(), and effect().

These Signals are instrumental in Angular’s shift from a component-centric rendering approach to one centered around Signals. The dependency graph created by Signals represents the application state. When this graph changes, Angular triggers a DOM update via Change Detection.

From a framework’s perspective, the render process is just a side effect of a Signal change. By reacting to the Signals, Angular knows exactly when and what to update.


<div class="content-ad"></div>

그것을 달성하기 위해서, 새로운 유형의 컴포넌트가 필요합니다. 새로운 Signal Component를 사용하면 Change Detection을 일으키는 것이 zone.js가 아니라 신호 자체가 됩니다.

불행히도, Signal Components는 17버전에서 사용할 수 없습니다. 그래서 우리는 조금 더 기다려야 합니다.

당연한 질문은: "Signals로부터 어떤 혜택을 받을 수 있나요?" 17에서는 대답이 있습니다: 지역 Change Detection입니다.

글을 읽는 것보다 비디오를 선호하신다면, 여기에 하나가 있습니다:

<div class="content-ad"></div>

# 성능이 떨어지는 변경 감지

현재 Angular는 변경이 발생했는지 실질적으로 인식하지 못합니다. 그래서 zone.js와 변경 감지에 의존합니다.

zone.js는 DOM 이벤트가 발생하거나 비동기 작업이 완료될 때 변경 감지를 트리거합니다.

변경 감지는 전체 컴포넌트 트리를 통과하고 변경 사항을 검색해야 합니다. 변경 사항을 감지하면 해당 DOM 노드를 업데이트합니다.

<div class="content-ad"></div>

이것은 전혀 변화가 없을 때도 변경 감지가 실행되므로 성능이 그리 좋지 않습니다.

![Local Change Detection in Angular](/assets/img/2024-05-17-LocalChangeDetectioninAngular_1.png)

부모 및 자식 컴포넌트가 있는 시나리오를 고려해보겠습니다. 부모 컴포넌트는 데이터 그리드를 표시하고, 자식 컴포넌트에는 마지막 업데이트 이후 경과된 시간을 보여주는 타이머가 있습니다:

```typescript
@Component({
  selector: 'app-list',
  template: `
      <div>
          <mat-table [dataSource]="dataSource">
              <ng-container matColumnDef="title">
                  <mat-header-cell *matHeaderCellDef> Title</mat-header-cell>
                  <mat-cell *matCellDef="let element">{ element.title }</mat-cell>
              </ng-container>
              <ng-container matColumnDef="description">
                  <mat-header-cell *matHeaderCellDef> Country</mat-header-cell>
                  <mat-cell *matCellDef="let element">{ element.description }</mat-cell>
              </ng-container>
              <mat-header-row *matHeaderRowDef="displayedColumns"/>
              <mat-row *matRowDef="let row; columns: displayedColumns;"/>
          </mat-table>
          <div>
              @if (lastUpdate) {
                  <app-timer [lastUpdate]="lastUpdate"></app-timer>
              }
              <button mat-raised-button color="primary" (click)="refresh()">Refresh</button>
          </div>
      </div>
      {logCd()}
  `,
  standalone: true,
  imports: [MatTableModule, MatButtonModule, TimerComponent]
})
export class ListComponent implements OnInit {
  lastUpdate: Date | undefined
  dataSource = new MatTableDataSource<Holiday[]>([]);
  displayedColumns = ['title', 'description'];
  ngOnInit() {
    this.refresh()
  }
  refresh() {
    fetch('https://api.eternal-holidays.net/holiday').then(res => res.json()).then(value => {
      this.lastUpdate = new Date();
      this.dataSource.data = value;
    });
  }
  logCd() {
    console.log('cd from list');
  }
}
```

<div class="content-ad"></div>

```js
@Component({
  selector: 'app-timer',
  template: `<span>Last Updated: { lastUpdateInSeconds | number:'1.0-0' } Seconds</span> { logCd() }`,
  standalone: true,
  imports: [DatePipe, DecimalPipe]
})
export class TimerComponent {
  @Input() lastUpdate = new Date();
  lastUpdateInSeconds = 0
  constructor() {
    setInterval(() => {
      this.lastUpdateInSeconds = (new Date().getTime() - this.lastUpdate.getTime()) / 1_000;
    }, 1000);
  }
  logCd() {
    console.log('log from timer');
  }
}
```

TimerComponent은 매 초 간격으로 lastUpdateInSeconds를 업데이트합니다. 이 간격은 zone.js가 매 초마다 변경 감지를 트리거할 수 있도록 합니다.

따라서 변경 감지가 시작되면 부모 구성 요소를 통해 데이터가 변경되었는지 확인합니다. 변경이 있으면 필요한 DOM 요소를 업데이트하고 TimerComponent로 이동합니다.

즉, Angular는 매 초 ListComponent를 불필요하게 확인합니다.


<div class="content-ad"></div>

이 컴포넌트의 logCd()은 체크가 실행될 때 마다 로그를 남깁니다. 현재로서는 매우 빈번하게 로그를 남깁니다.

# OnPush

Component 데코레이터의 인기 있는 설정 중 하나는 ChangeDetectionStrategy:OnPush입니다. Angular가 변경 감지를 실행할 때 그 설정이 있는 컴포넌트를 만나면 중단합니다. 또한 해당 컴포넌트가 "더러운" 것으로 표시하는 플래그가 없는 한 그 하위 항목을 통과하지 않습니다.

컴포넌트가 "더러워"지는 일반적인 기준은:

<div class="content-ad"></div>

- 입력값이 객체 참조를 변경합니다.
- 컴포넌트가 이벤트 핸들러를 실행합니다. 이벤트 핸들러가 없는 요소를 클릭하는 것만으로는 충분하지 않습니다.
- 비동기 파이프가 적용되어 기본 Observable이 새 값을 방출합니다.
- 시그널이 변경됩니다.

"더티 마킹"이 변경 감지를 트리거하지 않는다는 점을 중요하게 알아두어야 합니다. 이 동작은 여전히 zone.js의 작업으로, 실행된 이벤트 핸들러가 있거나 비동기 작업이 종료될 때 비동기적으로 스케줄링됩니다.

Angular가 컴포넌트를 "더티" 상태로 표시하면 해당 부모 컴포넌트에도 적용됩니다. 왜 이게 필요한 걸까요? 부모도 OnPush로 설정되어 있는 경우 CD가 자식 컴포넌트로 전파되지 않을 것입니다.

다음 그림은 OnPush와 기본 전략을 사용한 변경 감지의 차이를 보여 줍니다.

<div class="content-ad"></div>


![Local Change Detection in Angular](/assets/img/2024-05-17-LocalChangeDetectioninAngular_2.png)

![Local Change Detection in Angular](/assets/img/2024-05-17-LocalChangeDetectioninAngular_3.png)

이 그림에서는 "Dirty Marking"이라는 별도의 프로세스가 변경 감지 전에 실행되는 것을 보여줍니다. 이는 속성 바인딩이 포함되지 않은 경우에만 해당됩니다. "Dirty Checking"도 변경 감지 중에 발생할 것입니다.

따라서 TimerComponent가 ListComponent의 자식 요소인 한, 변경 감지는 ListComponent를 통과하여 해당 요소도 확인해야 합니다.


<div class="content-ad"></div>

# 함께 해요

TimerComponent에만 OnPush를 설정해보세요. 그러면 로그가 ListComponent에서만 발생하는 것을 볼 수 있을 거예요. 그 이유는 OnPush가 구성 요소에 대해 zone.js를 비활성화하지 않기 때문이에요. 여전히 간격을 인식하고 변경 감지를 트리거하여 매 초마다 실행해요.

TimerComponent는 어떤 기준(위의 목록 참조)도 해당되지 않아 '더티'로 표시되지 않습니다. 따라서 DOM이 업데이트되지 않아요. 비동기 작업은 변경 감지만 트리거하고 구성 요소를 '더티'로 표시하지는 않아요.

새로 고침을 클릭하면 TimerComponent에서도 변경 감지가 트리거되는 것을 볼 수 있어요. 이는 @Input이 새 참조로 업데이트되었기 때문이에요.

<div class="content-ad"></div>

만약 "Updated" 텍스트를 클릭하면 아무 변화가 없다는 것을 알 수 있어요. DOM 이벤트를 발생시켰지만 내부적으로 해당 이벤트를 처리할 이벤트 핸들러가 없어요.

텍스트에 이벤트 리스너를 추가해봐요. 아무 동작을 하지 않아도 괜찮아요. 그냥 존재하는 것만으로도 충분해요. 클릭하면 Change Detection이 실행되는 것을 확인할 수 있을 거예요.

이미 목록을 확인하고 있는데, async 파이프도 추가해보도록 해요:

```js
@Component({
  selector: 'app-timer',
  template: `<span class="px-2">Last Updated: { lastUpdateInSeconds$ | async | number:'1.0-0' }
      Seconds</span> { logCd() }`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    DecimalPipe,
    AsyncPipe
  ]
})
export class TimerComponent {
  @Input() lastUpdate = new Date();

  lastUpdateInSeconds$ = interval(1000).pipe(map(() => this.lastUpdateInSeconds = (new Date().getTime() - this.lastUpdate.getTime()) / 1_000))

  logCd() {
    console.log('log from timer');
  }
}
```

<div class="content-ad"></div>

지금부터 타이머가 매 초 업데이트되어야 합니다. 만약 동기부여를 받았다면 컴포넌트에서 구독을 시도해 보세요. 그러면 변경 감지가 더 이상 컴포넌트를 확인하지 않음을 알 수 있을 것입니다.

이미 OnPush를 사용하고 있지만 변경 감지는 여전히 ListComponent를 매 초 확인합니다. 그것은 그다지 효율적이지 않습니다.

# 로컬 변경 감지

Angular 17와 신호를 발견하세요.

<div class="content-ad"></div>

앵귤러 팀이 17번 버전을 릴리스하기 일주일 전에, 로컬 변경 감지를 추가했습니다. 이 기능은 우리의 사용 사례에 완벽하게 어울립니다.

이를 통해 컴포넌트 트리에서 단일 컴포넌트를 더러운 상태로 표시할 수 있습니다. 따라서 변경 감지는 부모를 확인하지 않을 것입니다. 만약 그 자식 컴포넌트들이 OnPush로 표시되어 있다면, 그것들 또한 제외될 것입니다.

이 기능을 작동시키기 위해 우리는 두 가지 요소가 필요합니다: 신호(Signals)와 OnPush입니다. 그래서 필요한 것은 이 두 가지뿐입니다.

아래 그림은 이 새로운 기능을 보여줍니다:

<div class="content-ad"></div>


![Local Change Detection in Angular](/assets/img/2024-05-17-LocalChangeDetectioninAngular_4.png)

OnPush를 추가하고 TimerComponent를 Signals로 리팩토링한 코드입니다:

```javascript
@Component({
  selector: 'app-timer',
  template: `<span>Last Updated: {{ lastUpdateInSeconds() | number:'1.0-0' }} Seconds</span> {{ logCd() }}`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, DecimalPipe, AsyncPipe]
})
export class TimerComponent {
  @Input() lastUpdate = new Date();
  lastUpdateInSeconds = signal(0)
  constructor() {
    setInterval(() => {
      this.lastUpdateInSeconds.set((new Date().getTime() - this.lastUpdate.getTime()) / 1_000);
    }, 1000);
  }

  logCd() {
    console.log('log from timer');
  }
}
```

ListComponent도 OnPush여야 합니다. 그렇지 않으면 Change Detection이 항상 확인합니다.


<div class="content-ad"></div>

만약 지금 페이지를 새로고침하면, 타이머가 작동 중이지만 목록은 한 번만 확인되었습니다. 이제 "새로고침" 버튼을 클릭하면 ListComponent에서 처리되는 DOM 이벤트를 트리거합니다. 따라서 변경 감지는 해당 컴포넌트에 대해... 두 번 실행됩니다.

한 번이 아니라 두 번 왜 그럴까요? 여기에는 두 가지 트리거가 있습니다. 첫 번째는 DOM 이벤트이고, 두 번째는 나중에 약간 끝나는 fetch에서 비동기 작업입니다.

이것이 바로 로컬 변경 감지입니다. 시그널 컴포넌트에 대해 기대할 수 있는 일부를 간단히 살펴보았습니다.

# 요약

<div class="content-ad"></div>

로컬 변경 감지는 강력한 기능입니다. 변경 감지에서 어떤 구성 요소가 검사를 거쳐야 하는지 정확히 정의할 수 있습니다.

Angular 17에서만 사용 가능하며 OnPush 및 신호를 모두 사용해야 합니다.

이는 미래 신호 구성 요소의 일부로, 더욱 미세한 변경 감지가 가능해질 것입니다.

데모 저장소는 다음에서 확인할 수 있습니다:

<div class="content-ad"></div>

# 감사의 말씀

이 글을 철저히 검토하고 그림을 개선하도록 강력히 요구한
Thomas Laforge님에게 감사의 말씀을 전하고 싶습니다.

또한, Change Detection의 내부 작업에 대한 통찰을 제공해 준
Andrew Scott님과
Sander Elias님께도 감사의 말씀을 전합니다.

# 추가로 읽을 거리