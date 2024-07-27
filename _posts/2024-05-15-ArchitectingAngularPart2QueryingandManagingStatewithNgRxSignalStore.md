---
title: "Angular 아키텍처 구축 제2부  NgRx SignalStore를 활용한 상태 쿼리 및 관리"
description: ""
coverImage: "/assets/img/2024-05-15-ArchitectingAngularPart2QueryingandManagingStatewithNgRxSignalStore_0.png"
date: 2024-05-15 02:58
ogImage: 
  url: /assets/img/2024-05-15-ArchitectingAngularPart2QueryingandManagingStatewithNgRxSignalStore_0.png
tag: Tech
originalTitle: "Architecting Angular: Part 2 — Querying and Managing State with NgRx SignalStore"
link: "https://medium.com/itnext/architecting-angular-part-2-querying-and-managing-state-with-ngrx-signalstore-1c931ad309c4"
---


<img src="/assets/img/2024-05-15-ArchitectingAngularPart2QueryingandManagingStatewithNgRxSignalStore_0.png" />

이 시리즈의 첫 번째 파트에서는 Apollo Client를 사용하여 Angular 애플리케이션에서 GraphQL API와 상호 작용하는 견고한 기반을 확립했습니다. 이제 애플리케이션 데이터 흐름에서 중요한 지점으로 약간 초점을 옮기면서 데이터를 효과적으로 처리하고 업데이트하는 방법을 살펴보겠습니다.

이를 어떻게 효과적으로 처리할지는 시험하고 검증된 서비스 및 서브젝트 패턴을 사용하거나 RxJs를 사용한 강력한 반응형 구현만으로도 충분히 달성할 수 있습니다. 그러나 애플리케이션이 점점 확장되고 더 많은 기능이 서로 작동해야 하는 경우, 상태 관리는 복잡해집니다.

이러한 이해를 바탕으로 많은 개발자들은 확장 가능하고 사용하기 쉬운 툴킷을 제공하는 외부 라이브러리로 돌아간다는 경향이 있습니다. 시장에는 여러 옵션이 있지만 가장 일반적인 것은 NgRx에 의한 Redux 기반 구현일 것입니다. 그러나 동일한 팀은 최근 SignalStore라는 최신 버전을 출시했는데, 이는 본질적으로 서비스와 서브젝트(시그널) 패턴을 확장한 것입니다.



주요 장점은 직관적이고 보일러플레이트가 적으며 선언적이라는 점입니다. 이는 확장 가능성에 도움이 되는 높은 모듈성을 구현하며 유형 안전 및 강하게 주장하는 동시에 유연한 밸런스를 제공합니다. 여기서 설치 단계를 찾을 수 있습니다.

## 할 일 저장소 설정하기

먼저, 우리는 todos.store.ts 파일을 생성할 수 있습니다. 여기에는 저장소를 정의할 것입니다. 개략적으로 보면 다음과 같을 것입니다:

```js
export const TodosStore = signalStore(
  withMethods((store) => {
    /*** 여기에 메서드가 사용 가능할 것입니다 ***/
  }),
  withComputed(() => ({
    /*** 여기에서 계산된 값 정의가 가능합니다 ***/
  })),
  withHooks(({ loadAll }) => ({
    /*** onInit 및 onDestroy 라이프사이클 후크에 액세스할 수 있습니다 ***/
  }))
);

export type TodosStore = InstanceType<typeof TodosStore>;

export function provideTodosStore(): Provider[] {
  return [TodosStore];
}
```



간단히 말하자면, `withMethods` 함수를 사용하여 메소드를 선언합니다. 이들은 상태 변이부터 API 호출 및 데이터 처리에 이르기까지 어떤 것이든 될 수 있습니다. UI를 보다 선언적으로 만들고 중복된 계산을 피하기 위해, `SignalStore` 내에서 계산된 속성을 사용할 수도 있습니다. 이를 통해 기본 상태에서 값을 유도할 수 있으며, 컴포넌트가 데이터를 표시하는 데 집중하도록 유지할 수 있습니다. 게다가, 컴포넌트에서 빌린 개념인 라이프사이클 후크도 있습니다. `withHooks`을 사용하면 상점의 생성과 소멸에 탭하여 초기화 또는 정리 같은 작업을 수행할 수 있습니다.

마지막으로, 이 종속성을 더 깔끔하게 제공할 수 있는 부분을 포함했습니다(예: 컴포넌트에 `provideTodosStore()`를 추가하는 방식). 그리고 스토어를 TodosStore 유형으로 생성자에 주입할 수 있도록 쉽게 스토어를 주입할 수 있게 되며 'constructor(private todosStore: TodosStore)'를 추가하는 것만큼 쉽습니다. 또한 클래스 속성에 `inject` 함수를 통해 주입할 수도 있지만, 저는 생성자 주입을 선호하는 편입니다. 더 읽기 쉽다고 느껴지기 때문입니다. 더 나아가, 전역으로 스토어를 제공하려면 다음과 같이 스토어를 선언하여 전역으로 제공할 수도 있습니다: `export const TodosStore = signalStore(' providedIn: `root` ', ...);`.

## 상태 정의

최초 반복에서는 다음과 같이 `withState()` 함수를 사용하여 상태를 정의할 수 있습니다.



```js
type TodosState = {
  data?: Todos[];
  errors?: string[];
  loading: boolean; 
}

const initialState: TodosState = {
  loading: true
}

export const TodosStore = signalStore(
  withState(initialState)
);
```

`TodosState` 타입은 상태가 어떻게 보일지를 정의합니다. 우리는 할 일 배열과 오류 문자열 배열이 있고 이 중 어떤 작업이 실패하면 로드될 예정이며 작업이 진행 중인지 여부를 나타내는 로딩 플래그가 있습니다.

데이터와 오류 속성은 로드될 때까지 기본적으로 정의되지 않기 때문에 초기 상태는 로딩 플래그만으로 설정할 수 있습니다. 그런 다음, 상태를 연결하여 상점을 설정합니다. 이것은 이전에 설명한 메커니즘을 사용하여 원하는 대로 변경할 수 있는 가장 기본적인 구현입니다.

...하지만 다르게 보일 수도 있습니다.




## 모듈화 - 사용자 정의 저장소 기능 외부화

더 많은 기능을 구축할수록 로딩 및 오류 상태를 관리하는 것이 반복적인 작업이 될 것을 알게될 것입니다. 중복을 피하고 코드를 모듈화 유지하기 위해 이를 재사용 가능한 기능으로 만들어봅시다. 이렇게하여 request.feature.ts 파일을 아래와 같이 생성할 수 있습니다.

```js
type RequestState = {
  loading: boolean;
  errors?: string[];
};

function withRequestStatus() {
  return signalStoreFeature(withState<RequestState>({ loading: false }));
}

function setLoading(): Partial<RequestState> {
  return { loading: true };
}

function setLoaded(): Partial<RequestState> {
  return { loading: false };
}

function setErrors(value: string[]): Partial<RequestState> {
  return { errors: value };
}

export { withRequestStatus, setLoading, setLoaded, setErrors };
```

이전과 마찬가지로 상태 타입을 생성한 다음 상태 기능을 연결할 수 있는 함수와 상태를 변이하는 데 사용할 수있는 몇 가지 함수를 만듭니다. 실제로는 아래와 같은 결과물이 나오게 될 것입니다.



```js
type TodosState = {
  data?: Todos[];
};

const initialState: TodosState = {
  data: []
};

export const TodosStore = signalStore(
  withState(initialState),
  withRequestStatus(),
  withMethods((store) => {
    const apollo = inject(Apollo);

    return {
      loadAll: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading())),
          switchMap(() => apollo.query({ query: GET_TODOS_QUERY })),
          tapResponse({
            next: (response: ApolloQueryResult<{ getTodos: Todo[] }>) =>
              patchState(store, { data: response.data.getTodos }),
            error: (errors: ApolloError[]) => patchState(store, setErrors(errors.map(e => e.message))),
            finalize: () => patchState(store, setLoaded()),
          })
        )
      ),
  }),
);
```

저희의 상태가 조금 줄어든 것을 보실 수 있고, 로딩 및 에러 기능을 추가하기 위해 플러그인을 사용했습니다. 앞으로는 메소드를 확장했습니다. 스토어를 인수로 사용하고 운영을 수행하기 위해 apollo 클라이언트를 주입했습니다.

더불어 RxJs의 강력함을 활용하기 위해 rxMethod를 사용할 것입니다. loadAll 함수를 호출하면 void 타입의 스트림이 생성됩니다. 그런 다음 스트림에 탭하여 우리가 만든 함수를 통해 상태를 로딩으로 설정할 수 있습니다. 이를 통해 스피너 등을 표시할 수 있습니다. 요청으로 스트림을 전환하고 마지막으로 @ngrx/operators 패키지의 tapResponse 연산자를 활용할 것입니다. 여기서 next에는 상태의 데이터 필드에 Todos를 설정하고, 요청이 실패한 경우에는 오류를 설정하고, 스트림이 완료되면 로딩을 false로 설정할 수 있습니다.

## Entity Management makes a comeback




이 코드는 NgRx에 익숙한 사용자들에게 이미 알려진 기능 중 하나로, SignalStore에서도 entity 관리 확장이 되돌아왔습니다. 이 기능은 addEntity, setEntity, updateEntity, removeEntity와 같은 메소드를 통해 CRUD 작업을 간편하게 수행할 수 있도록 도와줍니다.

아래는 저희의 스토어 최종 버전이며, 모든 CRUD 메소드가 해당 API 작업 및 상태 변이와 함께 구현된 것을 확인할 수 있습니다. rxMethod는 입력 스트림이 될 수 있는 아무 타입을 지정할 수 있습니다. 이는 가져올 할 일의 ID부터 업서트 작업을 위한 부분 또는 완전한 객체까지 다양할 수 있습니다. 이러한 매개변수를 메소드 호출에 추가하는 것이 필요합니다.

또한, 보류 중인 할 일과 완료된 할 일에 해당하는 배열을 얻을 수 있는 계산된 값의 예제를 볼 수 있습니다. withComputed 메소드는 스토어를 매개변수로 사용하며, 이를 통해 선택적으로 해당 부분을 선택하여 확장할 수 있습니다. 저희의 경우, 기준에 따라 필터링된 entities를 선택했습니다.



마침내 훅을 활용하게 됩니다. 이는 초기화 시 Todos를 로드하고 싶다는 것을 의미합니다. 실제로 스토어를 컴포넌트에 제공할 때 Todos는 이미 사전로드되어 있을 것입니다.

## 계속 진행하겠습니다...

드디어 우리가 구현한 상태 관리 기능을 어떻게 활용할 수 있는지 확인할 시간이 왔습니다. 사용자 인터페이스를 더 쉽게 구성하기 위해 Angular Material을 설치했으며 데이터를 목록으로 로드하거나 대화상자를 생성하는 등의 간단한 방법을 제공합니다.

```js
// todos.component.ts
@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todos.component.html',
  providers: [provideTodosStore()],
  imports: [
    MatDivider,
    MatToolbar,
    MatButton,
    MatList,
    MatListItem,
    MatIconButton,
    MatIcon,
    MatLine,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
  ],
})
export class TodosComponent {

  constructor(protected readonly store: TodosStore, protected readonly dialog: MatDialog) {}

  changeTodoCompletion(event: CdkDragDrop<Todo[]>): void {
    this.store.updateTodo({ id: event.item.data.id, completed: !event.item.data.completed });
  }

  openUpsertDialog(todo?: Todo): void {
    this.dialog.open(TodoDialogComponent, { data: { todo } });
  }
}
```



```js
<!-- todos.component.html -->
<mat-toolbar class="flex justify-between" color="primary">
  <span>할 일 목록</span>
  <button mat-raised-button color="accent" (click)="openUpsertDialog()">할 일 추가</button>
</mat-toolbar>

<section class="container mx-auto p-4 grid grid-cols-2 gap-4">
  <div>
    <h2 class="text-xl font-bold mb-2">보류 중인 할 일</h2>
    <mat-list cdkDropList [cdkDropListData]="store.pendingTodos()" cdkDropListSortingDisabled #pending="cdkDropList" [cdkDropListConnectedTo]="[completed]" (cdkDropListDropped)="changeTodoCompletion($event)">
      @for(todo of store.pendingTodos(); track todo.id) {
      <mat-list-item cdkDrag [cdkDragData]="todo">
        <mat-icon matListItemIcon class="text-gray-500">check_circle</mat-icon>
        <div matLine class="flex justify-between align-middle">
          <span>{ todo.text }</span>
          <div>
            <button mat-icon-button class="text-blue-500" (click)="openUpsertDialog(todo)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button class="text-red-500" (click)="store.removeTodo({ id: todo.id })">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </div>
      </mat-list-item>
      } @empty {
      <p>목록에 할 일이 없습니다.</p>
      }
    </mat-list>
  </div>

  <div>
    <h2 class="text-xl font-bold mb-2">완료된 할 일</h2>
    <mat-list cdkDropList [cdkDropListData]="store.completeTodos()" cdkDropListSortingDisabled #completed="cdkDropList" [cdkDropListConnectedTo]="[pending]" (cdkDropListDropped)="changeTodoCompletion($event)">
      @for(todo of store.completeTodos(); track todo.id) {
      <mat-list-item cdkDrag [cdkDragData]="todo">
        <mat-icon matListItemIcon class="text-green-500">check_circle</mat-icon>
        <div matLine class="flex justify-between align-middle">
          <span>{ todo.text }</span>
          <div>
            <button mat-icon-button class="text-blue-500" (click)="openUpsertDialog(todo)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button class="text-red-500" (click)="store.removeTodo({ id: todo.id })">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </div>
      </mat-list-item>
      } @empty {
      <p>목록에 할 일이 없습니다.</p>
      }
    </mat-list>
  </div>
</section>
```

```js
// todos-dialog.component.ts
@Component({
  selector: 'app-todo-upsert',
  standalone: true,
  template: `<h2 mat-dialog-title>{ id ? '할 일 수정' : '할 일 추가' }</h2>

    <mat-dialog-content>
      <form>
        <mat-form-field>
          <mat-label>할 일</mat-label>
          <input matInput [formControl]="text" />
        </mat-form-field>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-button (click)="dialogRef.close()">취소</button>
      <button mat-raised-button color="primary" [disabled]="text.invalid" (click)="upsertTodo()">저장</button>
    </mat-dialog-actions>`,
  providers: [provideTodosStore()],
  imports: [MatDialogModule, MatButtonModule, MatInputModule, ReactiveFormsModule],
})
export class TodoDialogComponent {
  protected readonly id?: string;
  protected readonly text: FormControl<string>;

  constructor(
    private readonly store: TodosStore,
    protected readonly dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data?: { todo?: Todo }
  ) {
    this.id = data?.todo?.id;
    this.text = new FormControl(data?.todo?.text ?? '', {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: true,
    });
  }

  upsertTodo(): void {
    if (this.id) {
      this.store.updateTodo({ id: this.id, text: this.text.value });
    } else {
      this.store.addTodo({ text: this.text.value });
    }
    this.dialogRef.close();
  }
}
```

요약하면 CRUD 기능을 커플 컴포넌트에서 구현했습니다. 초기에 OnInit 후크를 통해 데이터를로드하는 목록이 있습니다. 이 목록에는 한 열에서 다른 열로 항목을 이동할 때 저장소 업데이트를 호출하는 드래그 앤 드롭 기능이 있습니다. 게다가, ID가 있는지 여부에 따라 업데이트 또는 추가 메서드를 호출하는 재사용 가능한 대화 상자가 있습니다.

<img src="/assets/img/2024-05-15-ArchitectingAngularPart2QueryingandManagingStatewithNgRxSignalStore_1.png" />




## 마무리

이제 우리는 NgRx SignalStore의 힘을 활용하여 Todo 애플리케이션의 API와 컴포넌트 사이의 레이어의 반응적 기초를 만들었습니다. 우리는 작업을 별도로 정의함으로써 API 상호작용이 매우 간단해지며, 따라서 따로 두지 않고 직접 저장소에 구현한 이유입니다.

이를 통해 방법과 신호를 통해 결정론적인 데이터 흐름을 노출시켰는데, 이 때 신호는 직관적인 변경 감지 전략 및 UI 업데이트를 우아하게 수행하는 데 중요한 역할을 합니다.

다음 기사에서는 데이터 모의를 어떻게 구현하여 개발 경험을 향상시킬 수 있는지, 그리고 테스트를 위한 프론트엔드 분리를 완벽하게 하는 방법을 소개할 예정입니다.