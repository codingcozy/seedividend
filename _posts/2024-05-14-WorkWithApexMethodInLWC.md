---
title: "LWC에서 Apex 메소드 사용하기"
description: ""
coverImage: "/assets/img/2024-05-14-WorkWithApexMethodInLWC_0.png"
date: 2024-05-14 13:43
ogImage: 
  url: /assets/img/2024-05-14-WorkWithApexMethodInLWC_0.png
tag: Tech
originalTitle: "Work With Apex Method In LWC"
link: "https://medium.com/@saurabh.samirs/work-with-apex-method-in-lwc-3da9db823571"
---


![이미지](/assets/img/2024-05-14-WorkWithApexMethodInLWC_0.png)

라이트닝 웹 컴포넌트(LWC)는 Salesforce가 제공하는 강력한 프레임워크로, 현대적이고 효율적인 사용자 인터페이스를 구축하는 데 사용됩니다. LWC의 기능을 향상시키는 주요 기능 중 하나는 Apex 메서드와 함께 작업할 수 있는 능력입니다. Apex 메서드를 사용하면 서버 측 작업을 수행하고 Salesforce 데이터베이스에서 데이터를 검색할 수 있어, 프런트엔드 LWC 컴포넌트와 백엔드 Salesforce 로직 사이에 원활한 통합이 제공됩니다. 이 블로그 포스트에서는 LWC에서 Apex 메서드를 사용하는 프로세스를 살펴보고 실제 예제를 통해 안내할 것입니다.

이 주제에서는 LWC 컴포넌트에서 어떻게 Apex 메서드를 호출하는지에 대해 알아볼 것입니다.



- 와이어 어댑터를 사용하여 Apex 메서드를 호출하는 방법을 소개합니다.
- 명령형 접근을 사용하여 Apex 메서드를 호출하는 방법을 소개합니다.
- 비동기 및 대기 접근 방법을 사용하여 Apex 메서드를 호출하는 방법을 소개합니다.

라이트닝 웹 컴포넌트(LWC)에서 Salesforce 개발 시 고려해야 할 두 가지 주요 측면이 있습니다: Apex 메서드를 라이트닝 웹 컴포넌트로 가져오는 방법과 다른 컴포넌트에서 사용할 수 있도록 Apex 메서드를 노출하는 방법입니다.

# 라이트닝 웹 컴포넌트로 Apex 메서드 가져오기

## 1. Import문:



라이트닝 웹 구성 요소에서 Apex 메서드를 사용하려면 해당 메서드를 구성 요소로 가져와야 합니다. 이 작업은 구성 요소의 JavaScript 파일에서 import 문을 사용하여 수행됩니다. import 문에는 Apex 메서드의 네임스페이스와 이름이 포함됩니다.

```js
import apexMethodName from '@salesforce/apex/namespace.classname.apexMethodReference';
```

- apexMethodName - Apex 메서드를 식별하는 심볼입니다.
- apexMethodReference - 가져올 Apex 메서드의 이름입니다.
- classname - Apex 클래스의 이름입니다.
- namespace - 구성 요소와 동일한 네임스페이스에 있는 클래스인 경우 네임스페이스를 지정하지 않습니다. 관리되는 패키지에 있는 클래스인 경우 관리되는 패키지의 네임스페이스를 지정합니다.

예시:



```js
import getAccountDetails from '@salesforce/apex/MyApexController.getAccountDetails';
```

## 2. Apex 메서드 호출하기:

한 번 가져온 후에 Apex 메서드를 컴포넌트의 JavaScript 파일에서 호출할 수 있어요. 이를 위해 반응형 데이터 가져오기에 `@wire` 데코레이터를 사용하거나 더 많은 제어를 위해 명령형 Apex를 사용할 수 있어요.

```js
// @wire 데코레이터 사용
@wire(getAccountDetails, { accountId: '$recordId' })
wiredAccount;
 
// 명령형 Apex 사용
connectedCallback() {
    getAccountDetails({ accountId: this.recordId })
        .then(result => {
            // 결과 처리
        })
        .catch(error => {
            // 에러 처리
        });
}
```



위의 예시에서 'getAccountDetails'는 가져온 Apex 메서드입니다. 첫 번째 예시는 데이터를 반응적으로 가져오기 위해 `@wire` 데코레이터를 사용하고, 두 번째 예시는 `connectedCallback` 라이프사이클 훅에서 명령형 호출을 보여줍니다.

# 컴포넌트에 Apex 메서드 노출하기

## 1. Apex 클래스에 주석 추가:

Apex 메서드를 라이트닝 웹 컴포넌트에서 접근 가능하게 하려면 `@AuraEnabled` 또는 `@AuraEnabled(cacheable=true)`와 같은 주석을 추가해야 합니다.



<img src="/assets/img/2024-05-14-WorkWithApexMethodInLWC_1.png" />

알아두세요!

Apex 메서드를 노출하려면 메서드가 `static`으로 표시되어 있어야 하며 반드시 `@AuraEnabled`로 주석 처리된 `global` 또는 `public`이어야 합니다.

`@AuraEnabled(cacheable=true)`로 표시된 Apex 메서드는 클라이언트 측 Lightning Data Service 캐시를 확인한 후 서버에서 Apex 메서드를 호출하려면 네트워크 호출을 발생시키기 전에 확인됩니다.



```js
public with sharing class MyApexController {
    @AuraEnabled(cacheable=true)
    public static String getAccountDetails(String accountId) {
        // Apex logic to fetch account details
        return 'Account details for ' + accountId;
    }
}
```

이 예제에서 `getAccountDetails`는 `@AuraEnabled(cacheable=true)`로 주석이 달려 있습니다.

## 2. Lightning 웹 컴포넌트에서 가져오고 사용하기:

Apex 메서드가 주석 처리된 후, 이전 섹션에서 설명한대로 Lightning 웹 컴포넌트에서 가져와 사용할 수 있습니다.



```js
import getAccountDetails from '@salesforce/apex/MyApexController.getAccountDetails';

// ...

@wire(getAccountDetails, { accountId: '$recordId' })
wiredAccount;
```

이제 Lightning Web Component에서 `getAccountDetails`를 사용하여 서버에서 데이터를 가져올 수 있습니다.

이러한 단계를 따라 하면 Lightning Web Component로 Apex 메서드를 원활하게 가져와 데이터를 검색하고, Apex 클래스에서 Apex 메서드를 Lightning Web Component에서 사용할 수 있게 공개할 수 있습니다. 이를 통해 Salesforce 개발에서 프론트엔드와 백엔드 간의 효율적인 통신이 가능해집니다.

각 시나리오를 예제 코드와 함께 단계별로 살펴보겠습니다:



# 1. LWC에 Apex 메서드 연결하기

Salesforce 데이터를 가져오려면 JS 파일에서 `@wire` 어댑터를 사용해야 합니다. 데이터를 받으려면 프로퍼티나 함수에 `@wire`를 사용할 수 있습니다. 반환된 데이터를 조작하려면 함수에 `@wire`를 사용하면 됩니다.

구문:

```js
import apexMethodName from '@salesforce/apex/namespace.classname.apexMethodReference';
@wire(apexMethodName, { apexMethodParams })
propertyOrFunction;
```



와이어 어댑터 예시

```js
// Apex 클래스(MyApexController)의 Apex 메서드
public with sharing class MyApexController {
 
    @AuraEnabled(cacheable=true)
    public static list<Account> getAccountDetails(){
        return [SELECT Id, Name, Rating, Type FROM Account LIMIT 10];
    }
}
```

```js
<!-- ldsWithApex.html -->
<template>
  <lightning-card title="LDS with Apex controller">
    <div class="slds-p-horizontal_small">
      <template for:each={accData} for:item="data">
        <div key={data.Id}>
          <p><strong>Name: - </strong>{data.Name}</p>
        </div>
      </template>
    </div>
  </lightning-card>
</template>
```

```js
// ldsWithApex.js
import { LightningElement, wire } from 'lwc';
import getAccountDetails from '@salesforce/apex/MyApexController.getAccountDetails';
 
export default class LdsWithApex extends LightningElement {
 
  accData = [];
 
  @wire(getAccountDetails)
  accDetails({ data, error }) {
    if (data) {
      console.log(JSON.stringify(data));
      this.accData = data
      if (error)
        console.log(error);
    }
  }
}
```



이 예제에서는 `@wire` 데코레이터를 사용하여 `getAccountDetails` 메서드를 호출합니다. 결과는 accData 속성에 저장되며, 포맷된 이름은 템플릿에 표시됩니다.

출력:

<img src="/assets/img/2024-05-14-WorkWithApexMethodInLWC_2.png" />

매개변수를 사용한 와이어 어댑터의 예시



```js
// ApexClassController에 있는 Apex 클래스의 Apex 메소드

public with sharing class ApexClassController {
 
    @AuraEnabled(cacheable=true)
    public static list<Account> getAccountDetailsByRating(String accRating){
        return [SELECT Id, Name, Rating, Type 
                FROM Account
                WHERE Rating =: accRating
                WITH SECURITY_ENFORCED LIMIT 10];
    }
}
```

```js
<!-- ldsWithApex.html -->

<template>
  <lightning-card title="Apex 컨트롤러에서 매개변수를 이용한 LDS">
    <div class="slds-p-horizontal_small">
      <lightning-combobox name="rating" label="등급" value="{accRating}" placeholder="등급 선택" options="{options}" onchange="{handleChange}">
      </lightning-combobox>
      <template for:each="{accDataByRating}" for:item="accData">
        <div key="{accData.Id}">
          <p><strong>이름: - </strong>{accData.Name} </p>
        </div>
      </template>
    </div>
  </lightning-card>
</template>
```

```js
// ldsWithApex.js

import { LightningElement, wire } from 'lwc';
import filterAccountDetails from '@salesforce/apex/ApexClassController.getAccountDetailsByRating';
 
export default class LdsWithApex extends LightningElement {
  accDataByRating = [];
  accRating = '';
 
  @wire(filterAccountDetails, { accRating: '$accRating' })
  accDetailsByType({ data, error }) {
    if (data) {
      console.log(JSON.stringify(data));
      this.accDataByRating = data;
      if (error)
        console.log(error);
    }
  }
 
  get options() {
    return [
      { label: '핫', value: 'Hot' },
      { label: '따뜻', value: 'Warm' },
      { label: '차가운', value: 'Cold' }
    ]
  }
 
  handleChange(event) {
    this.accRating = event.target.value;
    console.log('검색 등급:- ' + this.accRating);
  }
}
```

결과:
 



![이미지](https://miro.medium.com/v2/resize:fit:1400/0*Ij_zMfi-q9nY4eIt.gif)

## 2. Apex 메서드를 명령적으로 호출하기

라이트닝 웹 컴포넌트(LWC)에서 Apex 메서드를 명령적으로 호출하는 것은 JavaScript 코드에서 Apex 메서드에 직접 호출을 하여 호출이 언제, 어떻게 실행되는지에 대해 더 많은 제어를 제공합니다. `@wire` 데코레이터를 사용하는 것과 달리, 명령적인 Apex 호출은 일반적으로 사용자 상호작용, 라이프사이클 이벤트 또는 다른 동적 조건에 대응하여 프로그래밍적으로 시작됩니다.

![이미지](/assets/img/2024-05-14-WorkWithApexMethodInLWC_3.png)



MIND IT!

메소드가 언제 호출되어야 하는지 제어하려면 명령형 접근 방식을 사용하세요.
예를 들어, 버튼을 클릭하여 데이터를 가져오고 싶다면 명령형 접근 방식을 사용할 수 있습니다.

사용하는 시점

- cacheable=true로 주석이 달려 있지 않은 메소드를 호출할 때, 이는 데이터를 삽입, 업데이트 또는 삭제하는 메소드를 포함합니다.
- 호출 시점을 제어할 때 (예: 버튼을 클릭하는 경우).
- Task 및 Event와 같이 지원되지 않는 객체로 작업할 때.
- `LightningElement`를 확장하지 않는 ES6 모듈에서 메소드를 호출할 때.



```js
// 에이펙스 클래스(ApexClassController)에 있는 에이펙스 메소드

public with sharing class ApexClassController {
     
    @AuraEnabled
    public static list<Account> getAccountDetailsImperatively(){
        return [SELECT Id, Name, Rating, Type 
                FROM Account
                WITH SECURITY_ENFORCED LIMIT 10];
    }
}
```

```js
<!-- ldsWithApex.html -->
<template>
  <lightning-card title="Imperatively Apex 메소드 호출">
    <div class="sIds-p-horizontal_small">
      <lightning-button variant="Brand" label="계정 세부정보 가져오기" title="acc details" onclick="{handleClick}">
      </lightning-button>
    </div>
    <div class="slds-p-horizontal_small">
      <template lwc:if="{accDetailsImperatively}">
        <template for:each="{accDetailsImperatively}" for:item="item">
          <div key="{item.Id}">
            <p><strong>이름: - </strong>{item.Name}</p>
          </div>
        </template>
      </template>
    </div>
  </lightning-card>
</template>
```

```js
// ldsWithApex.js
import { LightningElement, wire } from 'lwc';
import getAccountDetailsImperatively from '@salesforce/apex/ApexClassController.getAccountDetailsImperatively';
 
export default class LdsWithApex extends LightningElement {
  accDetailsImperatively = [];
  error = '';
 
  // Apex 메소드를 명령형적으로 호출하는 함수
  handleClick() {
    getAccountDetailsImperatively()
      .then((result) => {
        console.log(result);
        this.accDetailsImperatively = result
        this.error = undefined
      })
      .catch((error) => {
        console.log(error);
        this.accDetailsImperatively = undefined
        this.error = error
      })
  }
}
```

설명:




1. Imports:

- `import { LightningElement, wire } from ‘lwc’;`: 여기서는 LightningElement 및 wire와 같은 필요한 Lightning 웹 컴포넌트 모듈을 가져옵니다.
- `import getAccountDetailsImperatively from ‘@salesforce/apex/ApexClassController.getAccountDetailsImperatively’;`: ApexClassController Apex 클래스에서 getAccountDetailsImperatively Apex 메서드를 가져옵니다.

2. Class Definition:

- `export default class LdsWithApex extends LightningElement`: 여기서는 LdsWithApex 클래스를 정의하고 LightningElement를 확장합니다. 이 클래스는 Lightning 웹 컴포넌트의 동작을 캡슐화합니다.



3. 속성:

- `accDetailsImperatively = []; `: 이 속성은 Apex 메서드에서 반환된 결과를 저장할 배열(accDetailsImperatively)입니다.
- `error = ‘’; `: 이 속성은 Apex 메서드 호출 중 발생한 오류를 저장합니다.

4. 명령형 Apex 메서드 호출:

- `handleClick() '`: 이 메서드(handleClick)는 구성 요소에서 버튼 클릭과 같은 작업이 발생했을 때 호출됩니다.
- `getAccountDetailsImperatively()`: 이것은 명령형 Apex 메서드 호출입니다. 가져오기된 Apex 메서드를 사용하여 계정 세부 정보를 가져옵니다.
- `.then((result) =` ' … ') `: 이 부분은 성공 시나리오를 처리합니다. Apex 메서드 호출이 성공하면 결과가 콘솔에 로깅되고 `accDetailsImperatively` 속성이 결과로 업데이트됩니다.
- `.catch((error) =` ' … ') `: 이 부분은 오류를 처리합니다. Apex 메서드 호출 중 오류가 발생하면 오류가 콘솔에 로깅되고 오류 메시지로 `error` 속성이 업데이트됩니다.



사용 방법:

이 컴포넌트는 버튼이나 다른 사용자 인터페이스 요소와 연결할 수 있는 메소드 (`handleClick`)를 노출합니다. 사용자가 해당 요소와 상호 작용할 때, 명령형 Apex 메소드인 (`getAccountDetailsImperatively`)가 호출되고, 결과나 오류가 적절히 처리됩니다.

이 코드는 라이트닝 웹 컴포넌트에서 명령형 Apex를 사용하는 방법을 보여줍니다. 데이터를 가져오고 성공 및 오류 시나리오를 모두 처리합니다. 가져온 데이터는 컴포넌트에서 표시하거나 추가 처리를 위해 속성에 저장됩니다.

출력:




![image](https://miro.medium.com/v2/resize:fit:1400/0*ty-u1bBD3a58qUzR.gif)

Apex 메소드에 매개변수 값을 전달할 때, Apex 메소드의 매개변수와 일치하는 속성을 가진 객체에 값을 전달합니다.

예를 들어, Apex 메소드가 문자열 매개변수를 사용한다면 직접 문자열을 전달하지 마세요. 대신 값이 문자열인 속성을 포함한 객체를 전달하세요.

```js
// Apex 클래스의 Apex 메소드 (ApexClassController)
public with sharing class ApexClassController {
     
    @AuraEnabled
    public static list<Account> getAccountDetailsImperatively(String rating){
        return [SELECT Id, Name, Rating, Type 
                FROM Account
                WHERE Rating =: rating
                WITH SECURITY_ENFORCED LIMIT 10];
    }
}
```



```js
<!-- ldsWithApex.html -->
<template>
  <lightning-card title="매개변수와 함께 Apex 메서드를 취급하는 법">
    <div class="slds-p-horizontal_small">
      <lightning-combobox name="rating" label="등급" value="{rating}" placeholder="등급 선택" options="{options}" onchange="{handleRatingChange}">
      </lightning-combobox>
      <lightning-button variant="Brand" label="계정 세부 정보 가져오기" title="계정 세부 정보" onclick="{buttonHandler}">
      </lightning-button>
    </div>
 
    <div class="slds-p-horizontal_small">
      <template lwc:if="{accDetailsByRatingImperatively}">
        <template for:each="{accDetailsByRatingImperatively}" for:item="item">
          <div key="{item.Id}">
            <p><strong>이름: - </strong>{item.Name}</p>
          </div>
        </template>
      </template>
    </div>
  </lightning-card>
</template>
```

```js
// ldsWithApex.js
 
import { LightningElement } from 'lwc';
import getAccountDetailsByRatingImperatively from '@salesforce/apex/ApexClassController.getAccountDetailsByRatingImperatively';
 
export default class LdsWithApex extends LightningElement {
  rating = '';
  error = '';
  accDetailsByRatingImperatively = [];
 
  get options() {
    return [
      { label: '뜨거운', value: 'Hot' },
      { label: '따뜻한', value: 'Warm' },
      { label: '차가운', value: 'Cold' }
    ]
  }
 
  handleRatingChange(event) {
    this.rating = event.target.value;
  }
 
  buttonHandler() {
    getAccountDetailsByRatingImperatively({ rating: this.rating })
      .then((result) => {
        this.accDetailsByRatingImperatively = result
        this.error = undefined
      })
      .catch((error) => {
        this.error = error
        this.accDetailsByRatingImperatively = undefined
      })
  }
}
```

출력:

<img src="https://miro.medium.com/v2/resize:fit:1400/0*TytD0CuSTNo7y-1i.gif" />




아래 링크를 방문하시면 더 많은 정보를 얻을 수 있어요:

"더 흥미로운 LWC 주제를 기다려주세요. Salesforce 개발 전문가가 되기 위해 Lightning Web Components 세계를 계속 탐험해보세요."

LWC로 즐거운 코딩하세요!