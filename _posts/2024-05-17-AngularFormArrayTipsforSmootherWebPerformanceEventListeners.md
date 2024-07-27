---
title: "웹 성능을 향상시키는 Angular FormArray 팁"
description: ""
coverImage: "/assets/img/2024-05-17-AngularFormArrayTipsforSmootherWebPerformanceEventListeners_0.png"
date: 2024-05-17 21:12
ogImage: 
  url: /assets/img/2024-05-17-AngularFormArrayTipsforSmootherWebPerformanceEventListeners_0.png
tag: Tech
originalTitle: "Angular FormArray Tips for Smoother Web Performance: Event Listeners"
link: "https://medium.com/gitconnected/angular-form-array-event-listeners-400f3761965c"
---


## 웹 개발

![이미지](/assets/img/2024-05-17-AngularFormArrayTipsforSmootherWebPerformanceEventListeners_0.png)

비디오 버전은 여기에서 확인할 수 있습니다.

FormArrays의 한 가지 큰 도전 과제는 최적의 웹 성능과 원활한 사용자 상호 작용을 보장하기 위해 이벤트 리스너를 효율적으로 관리하는 것입니다.

<div class="content-ad"></div>

아래 사례 연구에서는 FormArray의 항목이 변경될 때 API에서 데이터를 가져 오는 두 가지 전략을 밝힐 것입니다. 실제 예제와 함께 이를 살아있게 만들 것입니다. 각 접근 방법을 안내하고 코드 디자인 및 웹 성능에 어떤 것이 도움이 될지 살펴볼 것입니다. 그러니 코딩 모자를 준비하고 시작해 보세요.

기술적인 면으로 들어가기 위해 실제 시나리오로 들어가겠습니다. "사용자 지정 필드 집합 만들기" 양식을 보여드리겠습니다:

![이미지](/assets/img/2024-05-17-AngularFormArrayTipsforSmootherWebPerformanceEventListeners_1.png)

여기서 "필드 클래스 추가" 버튼을 클릭하고 필드 클래스를 선택한 후, 필드 클래스를 선택하면 Get 요청이 트리거되어 API로 전송되는 것을 관찰하십시오. 두 번째 필드 클래스를 선택하면 추가 요청이 전송됩니다.

<div class="content-ad"></div>

![Image](/assets/img/2024-05-17-AngularFormArrayTipsforSmootherWebPerformanceEventListeners_2.png)

이제 재미있는 부분으로 들어가서 두 가지 다른 방법으로 이러한 요청을 API로 보내는 방법을 살펴보겠습니다. 각 방법이 응용 프로그램의 성능에 어떤 영향을 미치는지 주의 깊게 살펴보세요.

그래서 먼저 소스 코드를 확인하고 현재 요청이 UI에서 API로 전송되는 방법을 살펴보겠습니다.

"사용자 지정 필드 세트 작성" 양식의 템플릿에서 fieldclasses 섹션에서 다음 FormArray가 있는 것을 확인할 수 있습니다:

<div class="content-ad"></div>

20번 라인에는 `mat-autocomplete` 목록이 포함되어 있습니다. 사용자가 "Add Fieldclass" 버튼을 클릭할 때마다 새로운 `mat-autocomplete`가 FormArray에 추가됩니다. 이는 가능한 fieldclass 값에 대한 제안이 포함된 드롭다운을 표시합니다.

ngOnInit() 라이프사이클 훅에서 다음 이벤트 리스너가 있습니다:

`.valueChanges()`에 대한 구독은 fielclasses FormArray에 연결되어 있어, FormArray에서 변경이 발생할 때마다 부모 컴포넌트로 이벤트 getOutputKeysForFieldClasses를 발행합니다.

부모 컴포넌트는 이를 표현식으로 캐치합니다: (getOutputKeysForFieldClasses)="getOutputKeys($event)"

<div class="content-ad"></div>

그리고 Store Service에서 getOutputKeysForFieldClasses(fieldClasses)을 호출할 거에요:

요즘 구현 상태를 확인하려면 브라우저에서 애플리케이션의 동작을 확인해봐요.

"사용자 정의 필드 집합 만들기" 양식을 다시 열고 보내질 API 요청의 숫자를 세볼 거에요.

- 먼저, "필드클래스 추가"를 클릭할 거에요,
- 항목을 선택하면 하나의 요청이 보내져요,
- "필드클래스 추가"를 다시 클릭합니다. 두 번째 클릭 후에는 FormArray에 두 번째 폼 필드만 있지만, 아직 필드클래스를 선택하지 않았어요. 그런데 또 다른 요청이 API로 전송돼요.

<div class="content-ad"></div>

<img src="/assets/img/2024-05-17-AngularFormArrayTipsforSmootherWebPerformanceEventListeners_3.png" />

사용자가 "Add Field class" 버튼을 클릭할 때마다 새로운 요청이 API로 전송됩니다. 심지어 새로 추가된 폼 필드가 아직 비어 있더라도 그렇습니다.

그 이유는 FormArray에 변경 사항이 있기 때문에 .valueChanges() 이벤트 리스너의 내용이 실행됩니다. 그러나 예상한 동작은 Fieldclass를 선택한 후에만 API로 Get 요청을 보내야 한다는 것입니다.

# 문제 해결

<div class="content-ad"></div>

이제 문제를 어떻게 해결할 수 있는지 살펴봅시다.

전체 FormArray의 변경 사항 구독을 제거할 것입니다. 대신 새로운 이벤트 리스너를 추가하고 `mat-autocomplete`에 연결할 것입니다.

따라서 옵션을 선택한 후 onSelectFieldclass() 메서드를 호출할 것이며, 이 메서드는 FormArray에서 Fieldclasses 목록을 검색하여 전달된 이벤트의 매개변수로 제공할 것입니다.

이전에는 Fieldclasses 목록도 FormArray에서 검색되었지만, getOutputKeysForFieldClasses 이벤트를 트리거해야 하는 시점이 다소 정확하지 않았습니다. 이제 옵션이 선택된 경우에만 이 이벤트가 발생됩니다.

<div class="content-ad"></div>

이제 브라우저에서 동작을 확인해 볼게요:
  
- "Add Fieldclass"를 클릭하면 요청이 전송되지 않아요.
- 2번 클릭해 봐도 요청이 전송되지 않아요.
- 그런데 Fieldclass를 선택하면 요청이 한 번만 전송돼요.

<img src="/assets/img/2024-05-17-AngularFormArrayTipsforSmootherWebPerformanceEventListeners_4.png" />

이제 요청이 예상대로 올바르게 전송돼요! 이를 통해 문제를 해결했어요.

<div class="content-ad"></div>

그냥 명심해야 할 점은 API로 보내는 요청의 수가 늘어나거나 예상된 것보다 훨씬 많은 이벤트 리스너의 문제로 인해 성능 문제가 발생하지 않도록 하려면 예제처럼 로직을 올바른 위치에 추가해야 한다는 것이에요.

# 두 가지 접근 방식 비교

여기서 FormArray의 .valueChanges observable을 구독한 것과 `mat-autocomplete` 태그의 (optionSelected) 이벤트에 의해 트리거된 onSelectItem() 메소드를 사용한 새로운 접근 방식 사이의 차이를 요약해 봤어.

디자인과 성능 측면에서 그 차이는 상당히 중요해요.

<div class="content-ad"></div>

## 원래 접근 방식: valueChanges 이벤트에 대해

- 이벤트 트리거: FormArray의 valueChanges 이벤트 리스너는 배열 내의 양식 컨트롤의 값이 변경될 때마다 또는 FormArray에 새 양식 컨트롤이 추가될 때마다 트리거됩니다. 이는 옵션 자동완성에서 옵션을 선택하는 것뿐만 아니라 모든 변경에 반응한다는 것을 의미합니다.
- 반응 범위가 넓음: 이벤트 리스너는 변경 유형을 구분하지 않습니다. 관련없는 변경에 반응할 수 있으며, 이는 내부 논리의 불필요한 실행으로 이어질 수 있습니다.
- 성능: 다른 유형의 FormArray 업데이트가 발생하는 경우에도 데이터를 가져오지 않아도 되는 경우를 고려하면 효율적이지 않습니다.

## 새로운 접근 방식: optionSelected 이벤트에 대해

- 특정 이벤트 트리거: onSelectItem() 메서드는 `mat-autocomplete`의 (optionSelected) 이벤트에 의해 특별히 트리거됩니다. 이렇게하면 메서드가 옵션을 활성적으로 선택했을 때만 실행되도록 보장하여 좀 더 명확해집니다.
- 단순화된 논리: 메서드는 선택한 옵션 처리에 직접 초점을 맞춥니다. 이로 인해 코드가 쉽고 유지보수가 쉬워지게 됩니다.
- 성능 향상: 선택 이벤트에만 반응함으로써 FormArray의 모든 미세한 변경에 반응하는 성능 부담을 피할 수 있습니다. 변경 빈도가 높은 양식에서 특히 유익할 수 있습니다.
- 부수 효과 감소: 옵션 선택에 대한 응답을 단지 옵션 선택으로 제한함으로써 관련 없는 양식 컨트롤 변경으로 인한 불필요한 프로세스 또는 부수 효과를 트리거할 위험이 줄어듭니다.

<div class="content-ad"></div>

요약하자면, `mat-autocomplete`의 (optionSelected) 이벤트에 관련된 새로운 접근 방식은 이벤트 중심 프로그래밍에서 더 나은 방법으로, 특히 복잡한 양식에서 효과적입니다.

그리고 이로써 우리는 Angular에서 양식 이벤트 처리를 최적화하는 방법에 대해 알아보았습니다! 기억해 주세요, 올바른 접근 방식은 좋은 코드를 훌륭한 코드로 만들 수 있으며, 성능을 향상시키고 개발 프로세스를 간소화할 수 있습니다.

# 최종 생각

오늘 탐구한 것은 빙산의 일각에 불과합니다.

<div class="content-ad"></div>

흥미로운가요?

여기에는 "웹 성능 101" 비디오 코스에 포함된 내용 일부만 입니다. 웹 개발 스킬을 더 향상시키고 싶다면, 이 기회를 놓치지 마세요!

이 여정을 시작한 이미 약 3만 명의 학생들과 함께 웹 성능의 예술과 과학을 마스터하는 여정에 참여하세요 🚀. 아래 링크를 확인하고 무엇이 이렇게 핫한지 직접 확인해보세요!

만약 이 포스트가 도움이 되었다면, 친구들과 공유해보세요. 호기심을 갖고 코딩을 계속해 나가다 보면, 다음 글에서 다시 만나요.

<div class="content-ad"></div>

# 더 알고 싶으세요?

내가 똑똑하고 호기심 많은 사람들을 위해 엔지니어링, 기술, 리더십에 대해 쓰고 있어요 🧠💡. 독점 액세스를 위한 무료 이메일 뉴스레터에 가입해보세요.