---
title: "Angular로 사용자 지정 날짜 범위 선택기 만드는 방법"
description: ""
coverImage: "/assets/img/2024-06-27-CreatingaCustomDatesRangePickerinAngular_0.png"
date: 2024-06-27 18:22
ogImage: 
  url: /assets/img/2024-06-27-CreatingaCustomDatesRangePickerinAngular_0.png
tag: Tech
originalTitle: "Creating a Custom Dates Range Picker in Angular"
link: "https://medium.com/stackademic/creating-a-custom-dates-range-picker-in-angular-874af7baf2ab"
isUpdated: true
---




이 글은 Angular에서 구성 요소로써 처음부터 날짜 범위 선택기를 만드는 방법을 설명하는 것을 목표로 하고 있습니다. 이것은 제 첫 번째 글의 두 번째 버전으로 여기에서 찾을 수 있습니다: [Medium 링크](https://medium.com/stackademic/creating-a-custom-date-time-picker-in-angular-5f00591d641c). 또한, 다음 글에서 작성할 사용자 정의 구성 요소의 장점을 잊지 않으세요.

![이미지](/assets/img/2024-06-27-CreatingaCustomDatesRangePickerinAngular_0.png)
  
## 생성 의도

이 구성 요소를 만들기 전에, 쉽게 스타일링할 수 있고 다음을 제공하는 범용 날짜 선택기를 찾고 있었습니다: 날짜 선택, 시간 선택, 범위 선택. 제가 필요한 것은 간단한 것이었지만, 조사 중에 대부분의 날짜 선택기가 너무 복잡하거나 필요한 조합을 제공하지 않는 것을 발견했습니다.

<div class="content-ad"></div>

## 필요한 기능들:

- 날짜 - 시간 선택기
- 오직 날짜 선택기
- 오직 시간 선택기
- 날짜 - 범위 선택기

이전에는 이 모든 것이 있었지만 범위 기능만 빠졌었어요. 그래서 논리를 간단한 말로 적어보기 시작했어요:

# 논리

<div class="content-ad"></div>

범위=false인 경우에 대한 두 가지 다른 출력이 필요합니다. 하나는 단일 선택이고 두 번째는 선택된 범위 배열이며 selectedRange[0]는 시작 선택이되고 selectedRange[1]는 끝 선택이됩니다.


![Creating a Custom Dates Range Picker in Angular](/assets/img/2024-06-27-CreatingaCustomDatesRangePickerinAngular_1.png)


그런 다음 범위를 확인하여 시각적으로 선택을 표시할 수 있도록해야합니다.

```js
inRangeSelection(i: number) {
  const currentDay = new Date(
    this.date.getFullYear(),
    this.date.getMonth(),
    i
  );

  return (
    this.range &&
    this.clickedDate &&
    this.clickedToDate &&
    this.clickedDate.getDate() < currentDay.getDate() &&
    this.clickedToDate.getDate() > currentDay.getDate() &&
    this.clickedDate.getFullYear() >= currentDay.getFullYear() &&
    this.clickedToDate.getFullYear() >= currentDay.getFullYear() &&
    this.clickedDate.getMonth() >= currentDay.getMonth() &&
    this.clickedToDate.getMonth() >= currentDay.getMonth()
  );
}
```

<div class="content-ad"></div>

```js
  setDate(index: number) {
    // 만약 범위 선택이 요청된 경우
    if (this.range) {
      // 순서가 매우 중요합니다 -> 이미 범위가 있는 경우 새로운 선택을 클릭하면 다시 처음부터 시작합니다
      if (this.clickedDate && this.clickedToDate) {
        this.clickedDate = null;
        this.clickedToDate = null;
      }

      // 이미 첫 번째 선택이 있는 경우 값을 clickedToDate에 할당합니다
      if (this.clickedDate && !this.clickedToDate) {
        this.clickedToDate = new Date(
          this.date.getFullYear(),
          this.date.getMonth(),
          index
        );
      }

      // 여기서만 첫 번째 및 가장 중요한 시작점 설정이 가능합니다
      if (!this.clickedToDate && !this.clickedDate) {
        this.clickedDate = new Date(
          this.date.getFullYear(),
          this.date.getMonth(),
          index
        );
      }

      // clickedToDate가 clickedDate보다 낮은 경우 뒤집습니다
      if (
        this.clickedDate &&
        this.clickedToDate &&
        this.clickedDate > this.clickedToDate
      ) {
        const clickedToDate = this.clickedDate;
        const clickedDate = this.clickedToDate;
        this.clickedDate = clickedDate;
        this.clickedToDate = clickedToDate;
      }
    // 일반 모드에서
    } else {
      this.clickedDate = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        index
      );
    }
  }
```

마지막으로 출력 메서드가 변경되었습니다:

```js
  confirm() {
    if (this.range) {
      if (this.clickedDate && this.clickedToDate) {
        this.selectRange.emit([this.clickedDate, this.clickedToDate]);
      }
    } else {
      if (this.clickedDate) {
        this.clickedDate.setHours(this.timeForm.get('hours')?.value || 0);
        this.clickedDate.setMinutes(this.timeForm.get('minutes')?.value || 0);
        this.selectDate.emit(this.clickedDate);
      }
    }
  }
```

## 모든 로직을 컴포넌트 내부에 놓게 된 이유는 무엇인가요?

<div class="content-ad"></div>

만약 저장소에서 전체 컴포넌트를 확인했다면: https://github.com/marekpanti/dateTimePicker/blob/master/projects/marekpanti/angular-date-time-picker/src/lib/angular-date-time-picker.component.ts 아마도 궁금할 것입니다. 왜 Marek는 패서드와 깔끔한 컴포넌트에 대해 언급했을 때 모든 로직을 컴포넌트 내부에 넣는 건지요.

룰에는 예외가 없는 법입니다. 복잡한 컴포넌트와 UI 컴포넌트의 경우, 나는 내 로직이 한 곳에 있기를 원합니다. 내 컴포넌트가 시각적이며 각 속성이 각 메소드와 연결되어 있음을 이해하기 때문에, 서비스를 분리하여 메소드를 읽는 것이 오히려 더 어려울 것입니다.

# 결론

이 글은 처음에 복잡해 보이지만 적절한 계획과 문제 이해로 자신만의 컴포넌트를 쉽게 만들 수 있는 방법을 잘 정리한 요약입니다.

<div class="content-ad"></div>

# Stackademic 🎓

끝까지 읽어 주셔서 감사합니다. 떠나시기 전에:

- 작가를 칭찬하고 팔로우해 주시면 감사하겠습니다! 👏
- 다음 채널을 구독해 주세요: X | LinkedIn | YouTube | Discord
- 다른 플랫폼도 방문해 보세요: In Plain English | CoFeed | Differ
- 더 많은 컨텐츠는 Stackademic.com에서 확인할 수 있습니다.