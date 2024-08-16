---
title: "아답터 디자인 패턴을 Angular에서 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-DesignPatternsAdapterinAngular_0.png"
date: 2024-06-22 03:29
ogImage: 
  url: /assets/img/2024-06-22-DesignPatternsAdapterinAngular_0.png
tag: Tech
originalTitle: "Design Patterns — Adapter in Angular"
link: "https://medium.com/@bulicka.alexandra/design-patterns-adapter-in-angular-4a9b9b993014"
isUpdated: true
---




구조 패턴은 클래스와 객체를 더 큰 구조로 결합하는 방법을 설명합니다.

구조 디자인 패턴에는 다음이 포함됩니다:
1. 어댑터
2. 컴포지트
3. 프록시
4. 플라이웨이트
5. 퍼사드
6. 브릿지
7. 데코레이터

어댑터 패턴은 한 클래스의 인터페이스를 클라이언트가 기대하는 인터페이스로 적응시킵니다. 이를 통해 그렇지 않았을 때 호환되지 않을 클래스 간의 협력이 가능해집니다. 이는 관련 없는 클래스끼리 협력할 수 있게 합니다.

Adapter 패턴을 구현하는 두 가지 방법이 있습니다:
- extends
- 합성

<div class="content-ad"></div>

양쪽 경우 모두 예제로 설명하는 것이 가장 쉬울 것입니다.

만약 전체 데모를 보고 싶다면, 제 데모 프로젝트를 확인해보세요.

## 확장

첫 번째 경우에는 부적절한 인터페이스를 가진 클래스에 파생 클래스를 배치하고 원하는 기능을 얻기 위해 해당 클래스에 메서드를 추가하는 방식으로 원하는 기능을 얻습니다.

<div class="content-ad"></div>

예를 들어, AdapterComponent 예제 구성 요소에서 TableComponent 구성 요소를 배치합니다.

아래에는 두 그룹의 버튼이 있습니다. 첫 번째 그룹인 Status에는 Status 열에 해당하는 값을 선택하는 라디오 버튼과 드롭다운 목록이 포함되어 있습니다. 두 번째 그룹인 Type 버튼에는 Type 열에 해당하는 값을 선택하는 라디오 버튼과 드롭다운 목록이 포함되어 있습니다. 아래는 AdapterComponent 구성 요소 템플릿입니다:

```js
<div>
    <div>
        <app-table [items]="currentTasks()" />
    </div>

    <div>
        <app-radio [name]="'filter'" 
                   [value]="FilterColumn.status" 
                   [label]="'Status'" [isChecked]="true"
            (selectedValue)="onRadioSelectionChange($event)" />

        <app-select-dropdown 
            *ngIf="configFilter.filterKey === FilterColumn.status" 
            [keys]="statusKeys"
            [values]="statusValues" 
            [selectedValue]="configFilter.statusValue"
            (selectionChange)="ngModelChangeFilterValue( FilterColumn.status, configFilter.statusValue = $event)" />
    </div>

    <div>
        <app-radio [name]="'filter'" 
                   [value]="FilterColumn.type" 
                   [label]="'Type'" [isChecked]="false"
            (selectedValue)="onRadioSelectionChange($event)" />

        <app-select-dropdown 
            *ngIf="configFilter.filterKey === FilterColumn.type" 
            [keys]="typesKeys"
            [values]="typesValues" 
            [selectedValue]="configFilter.typeValue"
            (selectionChange)="ngModelChangeFilterValue(FilterColumn.type, configFilter.typeValue = $event )" />
    </div>
</div>
```

TableComponent 구성 요소의 내용을 보여주는 클래스, 템플릿 및 스타일이 포함됩니다.

<div class="content-ad"></div>

```js
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table', 
  template: `
  <table>
    <thead>
        <th *ngFor="let column of columns">{ column }</th>
    </thead>
    <tbody>
        @for (item of items; track item.id;) {
        <tr>
            <td *ngFor="let column of columns">
                <ng-container [ngSwitch]="column">
                    <span *ngSwitchCase="'status'">{ item[column] | status }</span>
                    <span *ngSwitchCase="'type'">{ item[column] | types }</span>
                    <span *ngSwitchDefault>{ item[column] }</span>
                </ng-container>
            </td>
        </tr>
        }
    </tbody>
  </table>`,
    styles:[`
    table { border-collapse: collapse; }
    th, td { 
      border: 1px solid black; 
      padding: 8px; }
    th { background-color: #f2f2f2; }`]
})
export class TableComponent {
  @Input() items: any[] = [];
  columns: string[] = [];

  ngOnInit() {
    if (this.items.length > 0) {
      this.columns = Object.keys(this.items[0]);
    }
  }
}
```

라디오 버튼을 구현해야 하는데, 선택한 값을 위한 드롭다운 목록의 가시성을 토글하는 기능을 AdapterComponent 구성 요소에 구현해야 합니다. 재사용 가능한 컴포넌트를 구현하는 것이 가장 좋은 접근 방식입니다. 아래는 재사용 가능한 컴포넌트 RadioComponent의 제안된 구현입니다:

```js
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FilterColumn } from '../../model/model';

@Component({
  selector: 'app-radio',
  template: ` 
  <label>
    <input 
        type="radio" 
        name="{name}" 
        value="{value}" 
        (change)="onSelectionChange()" 
        [checked]="isChecked">
    { label }
  </label>`,
})
export class RadioComponent {

  @Input() name: string = '';
  @Input() value!: FilterColumn;
  @Input() label: string = '';
  @Input() isChecked: boolean = false;
  @Output() selectedValue = new EventEmitter<FilterColumn>();

  onSelectionChange() {
    this.selectedValue.emit(this.value);
  }
}
```

값 선택 드롭다운 목록을 위한 재사용 가능한 컴포넌트는 아래와 같습니다:


<div class="content-ad"></div>

```js
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-dropdown',
  template: `
  <select [(ngModel)]="selectedValue" (ngModelChange)="onSelectionChange()">
    <option *ngFor="let key of keys" [value]="key">{ values[key] }</option>
  </select>`
})
export class SelectDropdownComponent {
  @Input() keys: number[] = [];
  @Input() values: Record<number, string> = {};
  @Input() selectedValue: number | null = null;
  @Output() selectionChange: EventEmitter<number> = new EventEmitter<number>();

  onSelectionChange() {
    this.selectionChange.emit(Number(this.selectedValue!));
  }
}
```

Tasks 테이블에 대한 인터페이스 모델 및 우리가 집중할 값 선택을 위한 드롭다운 목록은 아래에 위치해 있습니다:

```js
export interface Tasks {
  readonly id: number;
  readonly name: string;
  readonly status: StatusKey;
  readonly type: TypesKey;
  readonly description: string;
}

export const Status: Record<number, string> = {
  1: 'done',
  2: 'during',
  3: 'not performed',
};

export type StatusKey = keyof typeof Status;

export type TaskTypes = {
  [key: number]: string;
};

export const Types: TaskTypes = {
  1: 'Urgent',
  2: 'Important',
  3: 'Routine',
  4: 'Extra',
  5: 'Training',
};

export type TypesKey = keyof typeof Types;

export enum FilterColumn {
  status = 'status',
  type = 'type',
}
```

Tasks 테이블의 현재 데이터는 주입된 DataService 서비스 내에 위치한 getCurrentTasks() 메서드를 사용하여 가져옵니다. 여기서 객체 배열의 값은 Signals로 래핑됩니다.


<div class="content-ad"></div>

변경된 테이블 태그를 마크다운 형식으로 바꿨습니다.

<div class="content-ad"></div>

표, 라디오 버튼 및 드롭다운 목록은 서로 통신하지 않습니다. 비록 라디오 버튼과 드롭다운 목록이 표의 요소를 포함하고 있지만요. 라디오 버튼 Status 및 Type은 표의 열 이름과 대응됩니다. 드롭다운 목록에는 필터링에 사용할 수 있는 열의 요소가 포함되어 있습니다. 이러한 요소들 간의 통신은 필터 메서드를 구현하여 수행할 수 있습니다:

```js
import { FilterColumn, Tasks } from '../../common/model/model';

export interface SingleColumnFilterable<T> {
    filterBySingleColumn(tasks: T[], column: keyof T, value: number): T[];
}

export class SingleColumnFilter implements SingleColumnFilterable<Tasks> {
    filterBySingleColumn(tasks: Tasks[], column: keyof typeof FilterColumn, value: number): Tasks[] {
        const filteredTasks = tasks.filter(task => task[column] == value);
        return filteredTasks;
    }
}
```

먼저, filterBySingleColumn 필터링 기능의 정의를 포함하는 SingleColumnFilterable 인터페이스를 구현합니다. 해당 함수는 매우 일반적이므로 SingleColumnFilterable 인터페이스는 다른 클래스에서 사용할 수 있습니다. filterBySingleColumn 메서드에는 열 이름 및 Tasks[] 개체 배열을 필터링하는 값을 포함하는 매개변수가 있습니다. 필터 값에 기반하여 필터링된 개체 배열을 반환합니다.

이 기능이 우리의 어댑터입니다. 지정된 인터페이스를 가진 개체 배열을 가져와 지정된 매개변수에 기반한 개체 배열을 반환합니다. 
어댑터 함수는 데이터를 필터링할 필요는 없지만, 작업을 수행하거나 변환하는 등의 작업을 수행할 수 있습니다.

<div class="content-ad"></div>

`filterBySingleColumn` 함수는 `SingleColumnFilter` 클래스를 확장한 `AdapterComponent` 클래스에서 사용됩니다. `filterBySingleColumn` 함수는 재사용 가능한 `SelectDropdownComponent`의 `ngModelChangeFilterValue` 메서드 내에 있습니다. 이 함수의 결과는 `DataService`로 전달됩니다. 서비스는 Signal을 사용하여 Tasks 객체의 배열을 업데이트하고 현재 Tasks 객체의 배열을 AdapterComponent로 전달합니다. 아래는 AdapterComponent의 구현입니다:

```js
import { Component, Inject, Signal, inject } from '@angular/core';
import { Status, Tasks, StatusKey, TypesKey, Types, FilterColumn } from '../../../common/model/model';
import { DataService } from '../../../common/service/data.service';
import { SingleColumnFilter,  } from '../../common/task-manager';
import { tasks } from '../../../common/service/data';

export interface FilterConfiguration {
  filterKey: FilterColumn;
  statusValue: keyof typeof Status | 0,
  typeValue: keyof typeof Types | 0;
}

@Component({
  selector: 'app-adapter',
  templateUrl: './adapter.component.html',
  styleUrl: './adapter.component.scss'
})
export class AdapterComponent extends SingleColumnFilter {
  private dataService = inject(DataService);
  startupConfiguration: FilterColumn = FilterColumn.status;
  FilterColumn = FilterColumn;
  configFilter: FilterConfiguration = {
    filterKey: this.startupConfiguration,
    statusValue: 0,
    typeValue: 0
  }

  statusKeys: StatusKey[] = Object.keys(Status).map(Number) as StatusKey[];
  statusValues = Status;

  typesKeys: TypesKey[] = Object.keys(Types).map(Number) as TypesKey[];
  typesValues = Types;

  protected currentTasks: Signal<Tasks[]> = this.dataService.getCurrentTasks();

  constructor() {
    super()
  }

  onRadioSelectionChange(selectedValue: FilterColumn) {

    selectedValue === FilterColumn.type ? this.configFilter.statusValue = 0 : this.configFilter.typeValue = 0
    if (this.configFilter.statusValue === 0 && this.configFilter.typeValue === 0) {
      this.dataService.updateTasks(tasks);
    }
    this.configFilter.filterKey = selectedValue
  }

  ngModelChangeFilterValue(typeFilter: keyof typeof FilterColumn, val: number) {

    const filteredTasks = this.filterBySingleColumn(tasks, typeFilter, Number(val));
    this.dataService.updateTasks(filteredTasks);
  }
}
```

## 조합

두 번째 경우에는 조합의 사용은 기존 클래스를 구성 요소로 포함하는 새 클래스의 객체를 생성하는 것을 의미합니다. 예를 들어, 드롭다운 리스트는 Tasks 객체의 배열 요소를 포함하는 새 클래스의 객체를 생성합니다. 두 개의 드롭다운 리스트가 함께 배열을 필터링하도록 하는 예시를 구현해봅시다. Status 또는 Type 드롭다운 리스트에서 값을 선택하면 Tasks 테이블이 필터링됩니다. 그러므로, 필터링할 column 이름과 마지막으로 선택된 값을 매개변수로 하는 ngModelChangeFilter 메서드를 생성해 봅시다.

<div class="content-ad"></div>

AdapterComponent 컴포넌트의 템플릿은 현재 다음과 같습니다:

```js
<div>
    <div>
        <app-table [items]="currentTasks()" />
    </div>

    <div>

        <app-radio [name]="'filter'" 
                   [value]="FilterColumn.status" 
                   [label]="'Status'" 
                   [isChecked]="true"
            (selectedValue)="onRadioSelectionChange($event)" />

        <app-select-dropdown 
            *ngIf="configFilter.filterKey === FilterColumn.status" 
            [keys]="statusKeys"
            [values]="statusValues" 
            [selectedValue]="configFilter.statusValue"
            (selectionChange)="ngModelChangeFilterValue( FilterColumn.status, configFilter.statusValue = $event)" />

    </div>
    <div>

        <app-radio [name]="'filter'" 
                   [value]="FilterColumn.type" 
                   [label]="'Type'" 
                   [isChecked]="false"
            (selectedValue)="onRadioSelectionChange($event)" />

        <app-select-dropdown 
            *ngIf="configFilter.filterKey === FilterColumn.type" 
            [keys]="typesKeys"
            [values]="typesValues" 
            [selectedValue]="configFilter.typeValue"
            (selectionChange)="ngModelChangeFilterValue(FilterColumn.type, configFilter.typeValue = $event )" />

    </div>
</div>
<hr>
<div>
    <div>
        <app-table [items]="currentTasks()" />
    </div>

    <div>
        <app-select-dropdown [keys]="statusKeys" 
            [values]="statusValues" 
            [selectedValue]="configFilter.statusValue"
            (selectionChange)="ngModelChangeFilter(configFilter.filterKey = FilterColumn.status, configFilter.statusValue = $event)" />


        <app-select-dropdown [keys]="typesKeys" 
            [values]="typesValues" 
            [selectedValue]="configFilter.typeValue"
            (selectionChange)="ngModelChangeFilter(configFilter.filterKey = FilterColumn.type, configFilter.typeValue = $event)" />
    </div>

</div>
```

컴포넌트의 AdapterComponent 클래스:

```js
import { Component, Signal, inject } from '@angular/core';
import { Status, Tasks, StatusKey, TypesKey, Types, FilterColumn } from '../../../common/model/model';
import { DataService } from '../../../common/service/data.service';
import { SingleColumnFilter, DoubleColumnFilter } from '../../common/task-manager';
import { tasks } from '../../../common/service/data';


export interface FilterConfiguration {
  filterKey: FilterColumn;
  statusValue: keyof typeof Status | 0,
  typeValue: keyof typeof Types | 0;
}


@Component({
  selector: 'app-adapter',
  templateUrl: './adapter.component.html',
  styleUrl: './adapter.component.scss'
})
export class AdapterComponent extends SingleColumnFilter {
  private dataService = inject(DataService);
  startupConfiguration: FilterColumn = FilterColumn.status;
  FilterColumn = FilterColumn;
  configFilter: FilterConfiguration = {
    filterKey: this.startupConfiguration,
    statusValue: 0,
    typeValue: 0
  }

  statusKeys: StatusKey[] = Object.keys(Status).map(Number) as StatusKey[];
  statusValues = Status;

  typesKeys: TypesKey[] = Object.keys(Types).map(Number) as TypesKey[];
  typesValues = Types;

  protected currentTasks: Signal<Tasks[]> = this.dataService.getCurrentTasks();

  constructor() {
    super()
  }

  ngModelChangeFilter(typeSort: FilterColumn, val: number) {

    const data = new DoubleColumnFilter(tasks)
    const filteredTasks = data.filterByBothColumns(this.configFilter.statusValue, this.configFilter.typeValue)

    this.dataService.updateTasks(filteredTasks);
  }

  onRadioSelectionChange(selectedValue: FilterColumn) {

    selectedValue === FilterColumn.type ? this.configFilter.statusValue = 0 : this.configFilter.typeValue = 0
    if (this.configFilter.statusValue === 0 && this.configFilter.typeValue === 0) {
      this.dataService.updateTasks(tasks);
    }
    this.configFilter.filterKey = selectedValue
  }

  ngModelChangeFilterValue(typeFilter: keyof typeof FilterColumn, val: number) {

    const filteredTasks = this.filterBySingleColumn(tasks, typeFilter, Number(val));
    this.dataService.updateTasks(filteredTasks);
  }
}
```

<div class="content-ad"></div>

ngModelChangeFilter 메소드에는 DoubleColumnFilter 클래스의 객체가 포함되어 있습니다. DoubleColumnFilter 클래스의 매개변수는 tasks 객체의 배열을 전달합니다. 따라서 DoubleColumnFilter 클래스는 생성자에서 Tasks 객체의 배열을 받습니다. DoubleColumnFilter 클래스는 DoubleColumnFilterable 인터페이스를 구현합니다. 아래는 DoubleColumnFilter 클래스와 DoubleColumnFilterable 인터페이스의 구현 내용입니다:

```js
import { StatusKey, Tasks, TypesKey } from '../../common/model/model';

export interface DoubleColumnFilterable<T> {
    filterByBothColumns(status: StatusKey | 0, type: TypesKey | 0): T[];
}

export class DoubleColumnFilter implements DoubleColumnFilterable<Tasks> {
    constructor(private tasks: Tasks[]) {}
    
    filterByBothColumns(status: StatusKey | 0, type: TypesKey | 0): Tasks[] {
    
        return this.tasks.filter(task => {
            const statusMatches = status !== 0 ? task.status === status : true;
            const typeMatches = type !== 0 ? task.type === type : true;
            return statusMatches && typeMatches;
        });
    }
}
```

필터링된 결과는 DataService 서비스의 updateTasks 메소드로 전달됩니다. updateTasks 메소드는 Tasks 객체의 배열을 업데이트합니다.

생성자에 객체 배열을 주입하는 것은 정확히 합성입니다. 즉, 두 가지 추상화가 사용하는 것입니다. 이 경우에는 서로 다른 값과 서로 다른 열을 필터링하는 두 개의 드롭다운 목록이 추상화입니다. 그러나 둘 다 동일한 Tasks 객체 배열을 기반으로 합니다.

<div class="content-ad"></div>

## 요약

어댑터 패턴은 응용 프로그램 내의 다른 인터페이스 간의 상호 운용성을 제공하는 특정 기능을 수행하는 추상화입니다.

디자인 패턴의 전반적인 개념을 갖고 보면, 어댑터 패턴은 Liskov 대체 원칙(Liskov Substitution Principle, LSP) 및 단일 책임 원칙(Single Responsibility Principle, SRP)을 준수한다는 것이 분명합니다. LSP에서는 하위 클래스가 기본 클래스의 기능을 확장하면서 원래 동작을 변경하지 않습니다. SRP는 클래스를 작은 단위로 나누어 각각이 단일 기능을 수행하도록 하는 것을 포함합니다.