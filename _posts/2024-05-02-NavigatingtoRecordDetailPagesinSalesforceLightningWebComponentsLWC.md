---
title: "(LWC)에서 레코드 상세 페이지로 이동하는 방법"
description: ""
coverImage: "/assets/img/2024-05-02-NavigatingtoRecordDetailPagesinSalesforceLightningWebComponentsLWC_0.png"
date: 2024-05-02 00:52
ogImage: 
  url: /assets/img/2024-05-02-NavigatingtoRecordDetailPagesinSalesforceLightningWebComponentsLWC_0.png
tag: Tech
originalTitle: "Navigating to Record Detail Pages in Salesforce Lightning Web Components (LWC)"
link: "https://medium.com/@anala007/navigating-to-record-detail-pages-in-salesforce-lightning-web-components-lwc-cf7bfe3e6e97"
isUpdated: true
---




![이미지](/assets/img/2024-05-02-NavigatingtoRecordDetailPagesinSalesforceLightningWebComponentsLWC_0.png)

Salesforce Lightning Web Components (LWC)에서는 다른 페이지로 이동하는 것이 흔한 요구 사항입니다. 사용자가 링크를 클릭했을 때 레코드의 상세 페이지로 이동하는 시나리오가 있습니다. 이 게시물에서는 Salesforce가 제공하는 NavigationMixin을 사용하여 LWC에서 레코드 상세 페이지로 이어지는 클릭 가능한 링크를 만드는 과정을 안내해 드릴 것입니다.

NavigationMixin 이해하기

NavigationMixin은 Salesforce가 제공하는 클래스로, 레코드 상세 페이지, 새 레코드 생성 페이지 또는 외부 URL과 같은 다양한 페이지로 이동할 수 있게 해줍니다. Navigate 메서드를 제공하여 Lightning Experience에서 서로 다른 페이지로 이동할 수 있습니다.

<div class="content-ad"></div>

컴포넌트 설정하기

우선, NavigationMixin을 사용하려면 컴포넌트의 JavaScript 컨트롤러에서 확장해야 합니다:

```js
import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class YourComponentName extends NavigationMixin(LightningElement) {
    // 여기에 컴포넌트 코드를 작성하세요
}
```

클릭 가능한 링크 만들기

<div class="content-ad"></div>

자, 이제 한 테이블이 있다고 상상해봅시다. 각 행이 레코드를 나타내며 특정 필드를 클릭할 수 있도록 하고 싶습니다. 예를 들어, 클릭 가능한 이름 필드가 있는 테이블을 가정해 봅시다:

```js
| scope="row">
|     <div class="slds-truncate" title={item.StepName}>
|         <a data-id={item.Id} onclick={navigateToRecord}>{item.Name}</a>
|     </div>
| </td>
```

여기에서는 링크를 클릭할 때 navigateToRecord 함수를 호출하기 위해 onclick 이벤트 핸들러가 추가되었습니다. 또한, 우리가 탐색하려는 레코드의 ID를 저장하기 위한 data-id 속성도 추가되었습니다.

레코드의 상세 페이지로 이동하기

<div class="content-ad"></div>

그 다음으로 JavaScript 컨트롤러에서 navigateToRecord 함수를 정의할 거에요. 이 함수는 NavigationMixin.Navigate 메소드를 사용하여 레코드의 상세 페이지로 이동합니다:

```js
navigateToRecord(event) {
    const recordId = event.currentTarget.dataset.id;
    
    this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId: recordId,
            actionName: 'view'
        }
    });
}
```

이 함수에서는 클릭한 링크의 data-id 속성에서 레코드 ID를 검색하여 NavigationMixin.Navigate 메소드에 전달하여 레코드의 상세 페이지로 이동할 거에요.

마무리

<div class="content-ad"></div>

그게 다야! 이제 테이블에서 이름 링크를 클릭하면 해당 레코드의 상세 페이지로 이동합니다. 이 접근법을 따라 테이블의 어떤 필드든 클릭 가능하게 만들어 해당 레코드의 상세 페이지로 이동할 수 있습니다. 이를 통해 구성 요소의 사용성을 크게 향상시키고 더 원활한 사용자 경험을 제공할 수 있습니다. 항상 구성 요소를 충분히 테스트하여 기대한 대로 작동하는지 확인하는 것을 잊지 마세요.