---
title: "Angular에서 Enum 파워 유저 되는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-BeaPowerUserofEnumsinAngular_0.png"
date: 2024-06-22 03:13
ogImage: 
  url: /assets/img/2024-06-22-BeaPowerUserofEnumsinAngular_0.png
tag: Tech
originalTitle: "Be a Power User of Enums in Angular"
link: "https://medium.com/javascript-in-plain-english/be-a-power-user-of-enums-in-angular-d598f92fcb74"
isUpdated: true
---




테이블 태그를 마크다운 형식으로 변경해주세요.

<div class="content-ad"></div>

# 기본 Enums

Angular의 Enums은 기본적으로 숫자형입니다:

```js
// colors.enum.ts

export enum Color {
  Blue,  // 0
  Green, // 1
  Red    // 2
}
```

문자열 Enums도 사용할 수 있습니다:

<div class="content-ad"></div>

```js
export enum TimeZone {
  EasternTime = 'Eastern Time',
  CentralTime = 'Central Time',
  MountainTime = 'Mountain Time',
  PacificTime = 'Pacific Time',
  AlaskaTime = 'Alaska Time',
  HawaiiAleutianTime = 'Hawaii-Aleutian Time'
}
```

지금 필요에 따라 사용하면 됩니다.

# HTML에서의 Enum

Enum을 가지고 있으면 관련 데이터를 표현하는데 어디서든 사용하고 싶어질 것입니다. 그러나 Angular에서, HTML 코드에서 enum을 사용하는 것은 생각한 것만큼 간단하지 않습니다.

<div class="content-ad"></div>

## 코드

```js
// colors.model.ts

import { Color } from 'colors.enum.ts';

export interface ColorsViewModel {
  Color: typeof Color;
  colors: Color[];
  formGroup: FormGroup;
}
```

```js
// colors-example.component.ts

import { Color } from 'colors.enum.ts';
import { ColorsViewModel } from 'colors.model.ts';

@Component({
  selector: 'colors-example',
  styleUrls: ['colors-example.component.scss'],
  templateUrl: 'colors-example.component.html'
})
export class ColorsExampleComponent implements OnInit {
  @Input({ required: true }) public color: Color;

  public vm: ColorsViewModel;

  public ngOnInit(): void {
    this.vm = {
      Color,
      colors: Object.values(Color),
      formGroup: this.createFormGroup();
  }

  private createFormGroup(): FormGroup {
    return new FormGroup({
      colorOption: new FormControl<Color>(Color.Green)
    });
  }
}
```

```js
<!-- colors-example.component.html -->

<div *ngIf="vm">
  <ng-container [ngSwitch]="color">
    <ng-container *ngSwitchCase="vm.Color.Blue">
      <p style="color: blue">파란색</p>
    </ng-container>
    <ng-container *ngSwitchCase="vm.Color.Greed">
      <p style="color: green">초록색</p>
    </ng-container>
    <ng-container *ngSwitchCase="vm.Color.Red">
      <p style="color: red">빨간색</p>
    </ng-container>
  </ng-container>

  <p *ngIf="color === vm.Color.Red">대단해요!</p>

  <form [formGroup]="vm.formGroup">
    <mat-form-field>
      <mat-label>색상을 선택하세요</mat-label>
      <mat-select formControlName="colorOption">
        <mat-option *ngFor="let color of vm.colors" [value]="color">
          { color }
        </mat-option>
      </mat-select>
    </mat-form-field>
  </form>
</div>
```

<div class="content-ad"></div>

## 설명

여기서는 Color enum을 HTML에서 세 가지 다른 방법으로 사용하는 방법을 보여줍니다.
1. ngSwitch에서
2. === 비교에서
3. select/dropdown에서

Color enum의 실제 값들을 참조하여 enum을 사용합니다. 그러기 위해 colors.model.ts에서 Color: typeof Color라는 중요한 코드가 있습니다. 이 코드는 enum을 뷰 모델 개체에 추가하여 *ngIf="color === 2와 같은 것을 코딩하지 않고도 HTML에서 참조할 수 있도록 합니다.

그리고 dropdown에서는 Object.values(Color);를 사용하여 mat-select 옵션을 재입력할 수 있습니다.

<div class="content-ad"></div>

탁월하네요, 맞죠?

# TypeScript에서 Enum 사용하기

TypeScript에서 Enum을 사용하여 비교하는 것은 매우 간단합니다.

```js
if (this.color === Color.Blue) {
  console.log('바다를 좋아하나요?');
}

switch(this.color) {
  case Color.Blue:
    console.log('바다를 좋아하나요?');
    break;
  case Color.Green:
    console.log('잔디를 좋아하나요?');
    break;
  case Color.Red:
    console.log('일출을 좋아하나요?');
    break;
  default:
    console.log('기본 색상이 아닙니다.');
}
```

<div class="content-ad"></div>

하지만 열거형(enum)에서 모든 값을 사용하고 싶지 않을 때는 어떻게 해야 할까요?

색상 열거형(enum)을 변경하고 확장해 봅시다:

```js
// colors.enum.ts

export enum Color {
  Black,
  Blue,
  Brown,
  Green,
  Indigo,
  Orange,
  Red,
  Yellow,
  Violet
}
```

이제 색상을 서버로 전달하여 처리할 수 있습니다.

<div class="content-ad"></div>

```js
const coloredShoes: Shoes[] = await this.colorService
  .getShoesOfColor(this.vm.formGroup.get('colorOption'));
```

이제, 모든 색상을 사용하고 싶다고 상상해 봅시다:

```js
const allShoes: Shoes[] = await this.colorService
  .getShoesOfColor(Object.values(Color));
```

하지만 만약 일부 색상만 사용하고 싶다면 어떻게 해야 할까요?

<div class="content-ad"></div>

이렇게 할 수 있어요:

```js
const rainbowShoes: Shoes[] = await this.colorService
  .getShoesOfColor([
     Color.Red,
     Color.Orange,
     Color.Yellow,
     Color.Green,
     Color.Blue,
     Color.Indigo,
     Color.Violet
   ]);
```

하지만 만약 16개 색상, 64개 색상 또는 256개 색상이 있는 Color enum이 있다면 어떻게 될까요? 아이디어를 이해하셨죠. 경우에 따라서는 원하는 enum 값이 아닌 것을 지정하는 것이 더 쉬울 수 있습니다. 하지만 "파란색 계통이 아닌 모든 신발"과 같은 것을 어떻게 지정할 수 있을까요? Enum은 Object.values(Color).not([Color.Blue, Color.Indigo]);와 같이 쉬운 방법을 제공하지 않습니다.

TypeScript 제네릭이 해결책을 제공합니다!

<div class="content-ad"></div>

```js
/**
 * 주어진 enum 및 허용되지 않는 값에 따라 enum 값을 포함하는 배열을 반환합니다.
 *
 * @param myEnum enum의 이름입니다.
 * @param disallowedValues 반환되지 말아야할 myEnum 값들의 배열입니다.
 *
 * @return 허용되지 않는 값들을 제외한 모든 myEnum 값들의 배열입니다.
 */
export const numericEnumFilterOut: Function =
  <R extends number,
   T extends {[key: string]: R}>(myEnum: T, disallowedValues: R[]): R[] =>
    Object.entries(myEnum)
      .filter((type: [string, string | R]): boolean =>
        typeof type[1] === 'number' && !disallowedValues.includes(type[1]))
      .map((type: [string, R]): [string, R] => type as [string, R])
      .map(([, value]: [string, R]): R => value);
```

## 사용법

```js
const noBlue: Color[] =
  numericEnumFilterOut(Color, [Color.Blue, Color.Indigo]);

// noBlue = [Color.Red, Color.Orange, Color.Yellow, Color.Green, Color.Violet]
```

이제 다음과 같이 사용할 수 있습니다:


<div class="content-ad"></div>

```js
상수 비파란신: Shoes[] = await this.colorService
  .getShoesOfColor(numericEnumFilterOut(Color, [Color.Blue, Color.Indigo]));
```

# 결론

Enum은 깔끔한 코드를 작성하는 데 매우 강력한 도구입니다. TypeScript와 HTML 모두에서 사용하는 방법이 많습니다. 코딩할 때 강력한 무기가 될 수 있습니다. 즐거운 코딩하세요!

# 간단히 말하면 🚀

<div class="content-ad"></div>

인 플레인 잉글리쉬 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 반드시 박수를 보내고 작가를 팔로우해주세요 👏
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문: 스타카데믹 | 코피드 | 벤처 | 큐브드
- PlainEnglish.io에서 더 많은 콘텐츠를 확인하세요