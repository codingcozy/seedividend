---
title: "LWC에서 구성 요소 간 통신"
description: ""
coverImage: "/assets/img/2024-05-14-ComponentCommunicationinLWC_0.png"
date: 2024-05-14 15:09
ogImage: 
  url: /assets/img/2024-05-14-ComponentCommunicationinLWC_0.png
tag: Tech
originalTitle: "Component Communication in LWC"
link: "https://medium.com/@sendtosachin27/component-communication-in-lwc-a3ad91abad89"
---


![Component Communication in LWC](/assets/img/2024-05-14-ComponentCommunicationinLWC_0.png)

이 주제에서는 LWC 컴포넌트가 서로 통신하는 방법을 다룰 것입니다.

컴포넌트 간에 통신하는 네 가지 방법이 있습니다.

- 부모에서 자식으로의 통신
- 자식에서 부모로의 통신
- Pub-Sub 모델을 사용한 독립형 컴포넌트 간 통신 (구식 기술)
- 교차 프레임워크 (VF 페이지, Aura 및 라이트닝 메시징 서비스를 사용한 LWC 간 통신)



# 부모 자식간 통신

부모 자식 간 통신을 하려면 아래 단계를 따라하세요.

- 컴포넌트 구성을 만듭니다. 부모 클래스에서 `c-component-communication-child`와 같은 자식 컴포넌트에 액세스할 수 있습니다.
- 자식 컴포넌트에서 부모 데이터를 보관할 public 속성을 만들어야 합니다.
- public 속성을 만들기 위해 @api 데코레이터를 사용하십시오.
- 부모 컴포넌트에서 자식 컴포넌트의 public 속성을 정의하려면 하이픈(-) 부호를 사용합니다. 예를 들어, 자식 컴포넌트에 @api userDetails가 있다면 부모 컴포넌트에 user-details와 같이 작성해야 합니다.

## 부모에서 자식으로 통신하는 방법이 4가지 있습니다.



A. 자식에게 기본 데이터 전달
B. 자식에게 비 기본 데이터 전달
C. 작업 이벤트에서 자식에게 데이터 전달
D. 자식 메서드를 부모에서 호출

자식에게 기본 데이터 전달
--- --- --- --- --- --- --- ---

부모 컴포넌트

![이미지](/assets/img/2024-05-14-ComponentCommunicationinLWC_1.png)




![Child Component](/assets/img/2024-05-14-ComponentCommunicationinLWC_2.png)

![Child Component](/assets/img/2024-05-14-ComponentCommunicationinLWC_3.png)

![Child Component](/assets/img/2024-05-14-ComponentCommunicationinLWC_4.png)




결과

<img src="/assets/img/2024-05-14-ComponentCommunicationinLWC_5.png" />

## 자식에게 비 기본 데이터 전달

---



부모 컴포넌트

![이미지](/assets/img/2024-05-14-ComponentCommunicationinLWC_6.png)

![이미지](/assets/img/2024-05-14-ComponentCommunicationinLWC_7.png)

자식 컴포넌트




![Component Communication in LWC - Step 8](/assets/img/2024-05-14-ComponentCommunicationinLWC_8.png)

![Component Communication in LWC - Step 9](/assets/img/2024-05-14-ComponentCommunicationinLWC_9.png)

### Result

![Component Communication in LWC - Step 10](/assets/img/2024-05-14-ComponentCommunicationinLWC_10.png)




## 액션 이벤트 발생 시 자식에 데이터 전달

---

부모 컴포넌트

![이미지](/assets/img/2024-05-14-ComponentCommunicationinLWC_11.png)




![Child Component](/assets/img/2024-05-14-ComponentCommunicationinLWC_12.png)

![Child Component](/assets/img/2024-05-14-ComponentCommunicationinLWC_13.png)

![Child Component](/assets/img/2024-05-14-ComponentCommunicationinLWC_14.png)




결과

<img src="https://miro.medium.com/v2/resize:fit:1400/1*YiKgaCBRXqveyetchoFM8A.gif" />

## 부모에게 자식 메서드 호출하기

---



이 코드를 사용하면 querySelector 매개변수에 자식 컴포넌트 이름을 전달하여 자식 컴포넌트 메서드를 호출할 수 있습니다.
예시: this.template.querySelector('c-component-communication-child').childMethod().

부모 컴포넌트

![이미지](/assets/img/2024-05-14-ComponentCommunicationinLWC_15.png)

![이미지](/assets/img/2024-05-14-ComponentCommunicationinLWC_16.png)



Child Component

![Component Communication in LWC](/assets/img/2024-05-14-ComponentCommunicationinLWC_17.png)

![Component Communication in LWC](/assets/img/2024-05-14-ComponentCommunicationinLWC_18.png)

Result




![image](https://miro.medium.com/v2/resize:fit:1400/1*TkpNP-vozpdAfIjKnElUeA.gif)

# 자식에서 부모로 통신하기

자식에서 부모로 통신하려면 사용자 지정 이벤트를 사용하고 해당 이벤트를 발송해야 합니다. 하지만 사용자 지정 이벤트로 넘어가기 전에 먼저 이벤트가 무엇인지 알아보겠습니다.

이벤트란 무엇인가?
JS와 HTML의 상호 작용은 모두 이벤트를 통해 처리됩니다. 사용자나 브라우저가 페이지를 조작하려고 할 때 해당 페이지가 로드될 때 이를 이벤트라고 합니다. 모든 이벤트는 'on' 키워드로 시작합니다.




예를 들어, onclick, onchange, onkeyup 등.

## 커스텀 이벤트 생성 및 발송

커스텀 이벤트를 생성하려면 CustomEvent() 생성자를 사용하세요. 이 생성자에는 이벤트 유형을 나타내는 문자열이 필수 매개변수로 전달되어야 합니다.

커스텀 이벤트를 발송하려면 EventTarget.dispatchEvent()를 사용하세요. LWC에서 EventTarget는 this를 의미합니다.



부모 컴포넌트

![이미지1](/assets/img/2024-05-14-ComponentCommunicationinLWC_19.png)

![이미지2](/assets/img/2024-05-14-ComponentCommunicationinLWC_20.png)

자식 컴포넌트




![Screenshot 1](/assets/img/2024-05-14-ComponentCommunicationinLWC_21.png)

![Screenshot 2](/assets/img/2024-05-14-ComponentCommunicationinLWC_22.png)

Result

![Animation](https://miro.medium.com/v2/resize:fit:1400/1*4gUjy7HDpHBU0m-ucNilTQ.gif)




# Pub-Sub 모델을 사용한 독립 구성 요소 간 통신

두 개의 독립 구성 요소 간의 통신을 위해 두 가지 기술인 1) Pub-Sub 모델과 2) 라이트닝 메시지 서비스(LMS)를 사용합니다.

이 주제에서는 Pub-Sub 모델을 사용하여 독립 구성 요소 간 통신하는 방법을 배워 보겠습니다.

먼저, 원하는 이름으로 컴포넌트를 만들어야 합니다. 저는 pubsub이라는 이름을 사용했습니다.
해당 컴포넌트에는 아래 코드를 js 파일에 붙여넣으십시오.



```js
/* eslint-disable no-console */
const store = {};
/**
 * 이벤트에 대한 콜백 함수를 구독합니다.
 * @param {string} eventName - 청취할 이벤트의 이름.
 * @param {function} callback - 해당 이벤트가 발생했을 때 호출할 함수.
 */

const subscribe = (eventName, callback) => {
    if (!store[eventName]) {
        store[eventName] = new Set();
    }
    store[eventName].add(callback);
};

/**
 * 이벤트에 대한 콜백 함수 구독을 취소합니다.
 * @param {string} eventName - 구독을 취소할 이벤트의 이름.
 * @param {function} callback - 구독을 취소할 함수.
 */
const unsubscribe = (eventName, callback) => {
    if (store[eventName]) {
        store[eventName].delete(callback);
    }
};

/**
 * 청취자에게 이벤트를 발행합니다.
 * @param {string} eventName - 발행할 이벤트의 이름.
 * @param {*} payload - 발행할 이벤트의 페이로드.
 */

const publish = (eventName, payload) => {
    if (store[eventName]) {
        store[eventName].forEach(callback => {
            try {
                callback(payload);
            } catch (error) {
                console.error(error);
            }
        });
    }
};

export default {
    subscribe,
    unsubscribe,
    publish
};
```

위의 코드에서 두 개의 매개변수를 보유하는 세 개의 Const 변수가 있습니다. 첫 번째는 eventName이고 두 번째는 콜백 메서드입니다.

PubSubComp_A

![ComponentCommunicationinLWC_23](/assets/img/2024-05-14-ComponentCommunicationinLWC_23.png)





![PubSubComp_B](/assets/img/2024-05-14-ComponentCommunicationinLWC_25.png)

![Image](/assets/img/2024-05-14-ComponentCommunicationinLWC_26.png)




결과

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*50ZgsP84cx1CGezDS_iu6A.gif)