---
title: "Angular 17의 새로운 기능들"
description: ""
coverImage: "/assets/img/2024-05-14-WhatsNewinAngular17_0.png"
date: 2024-05-14 13:55
ogImage: 
  url: /assets/img/2024-05-14-WhatsNewinAngular17_0.png
tag: Tech
originalTitle: "What’s New in Angular 17"
link: "https://medium.com/gitconnected/angular-17-18ea18ec41b9"
isUpdated: true
---




## 웹 개발

![Angular 17](/assets/img/2024-05-14-WhatsNewinAngular17_0.png)

앵귤러 팀이 더 이상 비밀로 간직할 수 없었습니다. 그들은 2023년 11월 8일에 프레임워크의 17번 버전을 공개하기 전 유튜브에서 지난 월요일에 흥미로운 소식을 드렸습니다.

이전 릴리스의 개발자 미리보기에 있던 신호와 독립 컴포넌트와 같은 기능에 추가로, 프레임워크는 시대에 발맞추기 위해 새롭게 변모했습니다. 앵귤러는 이제 새로운 사이트, 최신 문서 및 멋진 새로운 로고를 갖추었습니다! 마치 프레임워크가 새 옷장을 얻은 것 같군요.



만약 Angular의 최신 릴리스에 열정적이라면, 이 게시물을 놓치고 싶지 않을 거에요. 저와 함께 Angular 게임을 업그레이드할 수 있는 방법에 대해 살펴보세요.

![Angular Latest Release](/assets/img/2024-05-14-WhatsNewinAngular17_1.png)

이번 새 릴리스의 흥미로운 기능 중에는 새로운 템플릿 제어 블록 구문이 있어요. 이것은 더 부드럽고 표현력이 풍부한 코딩을 의미해요!

이제 이야기의 주인공인 'Deferred loading blocks'에 대해 알려드릴게요.



# 지연 로딩 블록

Angular 17에서는 @defer 컨트롤 블록을 사용하여 콘텐츠를 지연 로딩할 수 있습니다. 컴포넌트, 디렉티브, 파이프를 포함한 의존성에 대해서도 적용됩니다.

그리고 가장 좋은 점은?

지연 가능한 뷰를 통해 현재 사용자 상호작용에 필요한 뷰만 로드할 수 있습니다. 번역하자면, 더 빠른 초기로드 시간과 최적화된 경험을 얻을 수 있습니다. 누가 속도와 효율성을 좋아하지 않겠어요?



```js
@defer {
 <details-component />
} @loading (after 100ms; minimum 1s) {
 <p> Loading… </p>
} @error {
  <p> Failed to load the content ☹️ </p>
}
```

이고르 세도프는 코딩 심장을 뛰게 만들어 줄 비디오에서 예제와 사용 사례 시나리오를 제공했습니다:

# 조건부 렌더링

*ngIf, *ngFor 및 *ngSwitch 지시문에 작별 인사를 전하세요. 이제 더 나은 대안들이 있어서 더 쉬워졌습니다.



## @switch, @case, @default

@switch, @case, 그리고 @default은 제어 흐름 블록에서 멋진 친구들이에요. 다음 예시를 통해 어떻게 작동하는지 살펴보면서 동적 양식 템플릿에서 추출한 아래 예시를 리팩토링해 보겠습니다:

```js
<ng-container [ngSwitch]="formControl.controlType">
  <mat-form-field *ngSwitchCase="'dropdown'">
   ...
  </mat-form-field>
  <ng-container *ngSwitchCase="'slideToggle'">
    <mat-slide-toggle [formControl]="formGroup.get(formControl.key)">
     ...
    </mat-slide-toggle>
  </ng-container>
  <ng-container *ngSwitchCase="'checkbox'">
    <mat-checkbox [formControl]="formGroup.get(formControl.key)">
     ...
    </mat-checkbox>
  </ng-container>
</ng-container>
```

위의 코드 대신, @switch 블록에 세 개의 중첩된 블록을 사용할 거에요:



- @case(`dropdown`) 블록의 내용은 formControl.controlType이 `dropdown`과 같을 때 렌더링됩니다.
- @case(`slideToggle`) 블록의 내용은 formControl.controlType이 `slideToggle`과 같을 때 렌더링됩니다.
- @case(`checkbox`) 블록의 내용은 formControl.controlType이 `checkbox`와 같을 때 렌더링됩니다.

```js
@switch (formControl.controlType) {
  @case ('dropdown') {
    <mat-form-field *ngSwitchCase="'dropdown'">
     ...
    </mat-form-field>
  }
  @case ('slideToggle') {
    <mat-slide-toggle [formControl]="formGroup.get(formControl.key)">
      ...
    </mat-slide-toggle>
  }
  @case ('checkbox') {
    <mat-checkbox [formControl]="formGroup.get(formControl.key)">
     ...
    </mat-checkbox>
  }
  @default {
    ...
  }
}
```

새로운 구문으로 코드를 작성하면 매우 가독성이 좋아지고 개발자 경험이 향상됩니다(DX).

## @if, @else, @for, @empty



@if, @else 및 @for 블록을 사용하면 항목을 조건부로 렌더링하고 컬렉션을 쉽게 처리할 수 있습니다. 이전 구문 대신:

```js
<ng-container *ngIf="showAllFields; else customFieldsTemplate">
   <ng-container *ngFor="let ecsField of ecsFields; trackBy: trackByFn">
      <div class="mt-2">
        { ecsField.name }
      </div>
  </ng-container>
</ng-container>
<ng-template #customFieldsTemplate>
  Custom fields template.
</ng-template>
```

다음과 같이 템플릿에 로직을 구현할 수 있습니다:

```js
@if (showAllFields) {
  @for (ecsField of ecsFields; track: ecsField.id) {
    <div class="mt-2">
      { ecsField.name }
    </div>
  }
} @else {
  Custom fields template.
}
```



내장 @for 루프에는 0개의 항목을 포함하는 컬렉션을 위한 선택적인 @empty 블록을 통해 편리한 단축키가 함께 제공됩니다:

```js
@for (ecsField of ecsFields; track: ecsField.id) {
  <div class="mt-2">
    { ecsField.name }
  </div>
} @empty {
  필드 목록이 비어 있습니다.
}
```

# 반복문을 통한 빠른 렌더 속도

자, 이제 속도에 대해 이야기해봅시다.



*for에서 누락된 trackBy 함수는 성능 문제를 야기하기 쉽습니다. 하지만 @for를 사용하면 이런 문제가 사라집니다.

@for가 뛰어나게 만드는 점은 빠른 차이 비교 성능을 보장하기 위해 track이 필수적이라는 것입니다. 그리고 가장 좋은 점은 사용하기가 정말 쉽다는 것이죠! 이제 더 이상 컴포넌트 클래스에 메서드를 추가할 필요가 없습니다. trackBy와 달리 track은 표현식으로만 사용할 수 있습니다.

이 결과는 커뮤니티 프레임워크 벤치마킹에서 최대 90%까지 빠른 런타임을 제공할 수 있다는 것입니다!

# 새로운 제어 플로우 구문으로 마이그레이션하기



당신의 머리 속에서 삐죽삐죽한 무언가가 돌고 있을 거라고 느껴져요. 새 문법을 사용하려면 코드를 전면적으로 리팩토링해야 한다는 생각에 말이죠.

하지만 걱정 마세요! 기쁜 소식을 전해드릴게요.

리팩토링에 머리 아픔을 느끼지 않아도 됩니다. @angular/core:control-flow-migration 스키마가 모두 대신 처리해 드릴 거예요. 터미널을 열어서 다음 명령어를 실행해보세요:

```js
ng g @angular/core:control-flow-migration
```



# 렌더링을 위한 새로운 라이프사이클 후크

앵귤러의 서버 측 렌더링 (SSR) 및 정적 사이트 생성 (SSG) 성능을 더욱 원활하게 하기 위해, 앵귤러 팀은 DOM 흉내와 직접적인 DOM 조작에서 이별을 준비 중입니다.

이를 위해 프레임워크는 이제 afterRender 및 afterNextRender 라이프사이클 후크를 제공합니다:

- afterRender 후크는 렌더링이 완료된 후에 콜백을 트리거하기 위해 동작합니다.
- afterNextRender 후크는 다음 렌더링이 끝난 후에 트리거될 콜백을 등록합니다.



# SSR 기능 기본 제공

Angular의 옛날을 떠올려보면 SSR을 활성화하는 것은 모험을 떠나는 것과 같은 느낌이었습니다. 별도의 패키지(Angular Universal)와 중복된 빌드 프로세스를 다루고 angular.json에서 구성을 해석해야 했죠. 정말 머리 아파지죠.

하지만 새로운 시대가 열렸어요!

최신 애플리케이션 빌더는 간단함과 통일성에 초점을 맞추고 있습니다. Angular 앱을 위한 올인원 빌더를 제공해줘요. 앱 쉘, 브라우저, 서버 등을 모두 원활하게 통합시켜줍니다.



새 프로젝트를 시작할 때, 다음 명령어를 실행하여 SSR 마법을 뿌려보세요:

```js
ng new --ssr
```

CLI는 심지어 SSR을 활성화할지 묻기 위해 명령 프롬프트에서 확인을 요청할 거에요.

그리고 SSR을 나중에 선택하려면 걱정하지 마세요! 그냥 아래와 같이 입력해주세요:




npm install @angular/ssr --save


그럼요! 이제 Angular 앱이 SSR에 준비됐어요.

# 수분공급

수분공급은 서버에서 렌더된 애플리케이션을 클라이언트 측에서 다시 살려내는 마법 같은 행위에요.




서버 렌더링된 DOM 구조를 재사용하고 애플리케이션 상태를 유지하며 서버에서 이미 가져온 애플리케이션 데이터를 전송하며 기타 영웅적인 역할을 수행합니다.

그리고 놀랍게도!

SSR을 선택하면 기본적으로 하이드레이션을 사용합니다. 이 기술에 대해 더 깊이 이해하려면 하이드레이션 가이드를 확인하세요.

# ESBuild 및 Vite 기본 지원



자, 이제 엔진 덮개 아래를 살펴보겠습니다: Angular CLI의 빌드 파이프라인.

Angular는 CLI에서 ng build, ng serve 및 ng test와 같은 명령에 사용되는 빌더를 제공합니다. 이러한 내장 CLI 빌더 및 기타 빌더의 기본 대상 구성은 워크스페이스 구성 파일 angular.json의 architect 섹션에 사용 가능합니다:

![이미지](/assets/img/2024-05-14-WhatsNewinAngular17_2.png)

빌드 파이프라인에서 중요한 변경 사항은 모든 새 애플리케이션에 대해 esbuild 플러스 Vite가 기본적으로 활성화되었다는 사실입니다.



Angular 16에 개발자 미리보기로 도입된 Esbuild 및 Vite 기반 빌드 경험이 소개되었어요. 피드백 결과 몇 가지 경우 빌드 시간이 67% 향상되었다고 해요.

![2024-05-14-WhatsNewinAngular17_3.png](/assets/img/2024-05-14-WhatsNewinAngular17_3.png)

SSR 및 SSG를 사용하는 경우, ng build의 속도가 최대 87% 향상되고 ng serve의 편집-새로고침 루프도 80% 빨라져요.

# 마지막으로



Angular 버전 17은 우리가 기대하던 멋진 새로운 기능을 가져오는 것뿐만 아니라 버그 수정과 성능 향상도 포함되어 있어요.

더 자세한 내용이 궁금하다면, 백스테이지 패스는 GitHub에 있어요. 그리고 Angular의 미래를 예상해보고 싶다면, 로드맵을 확인해보세요.

즐거움을 놓치지 마세요! 터미널로 이동해서 `ng upgrade` 명령어로 마법을 일으켜보세요.

# 더 알고 싶다면?



제가 똑똑하고 호기심 많은 사람들을 위해 엔지니어링, 기술 및 리더십에 관한 글을 쓰고 있어요 🧠💡. 독점 액세스를 원하시면 무료 이메일 뉴스레터에 가입해주세요.

27,000여 명의 학생들과 함께 온라인 비디오 코스인 Web Performance 101: 웹 앱 성능 향상 방법을 받아보세요.