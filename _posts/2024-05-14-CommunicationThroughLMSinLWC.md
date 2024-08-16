---
title: "LWC에서 LMS를 통한 커뮤니케이션"
description: ""
coverImage: "/assets/img/2024-05-14-CommunicationThroughLMSinLWC_0.png"
date: 2024-05-14 13:20
ogImage: 
  url: /assets/img/2024-05-14-CommunicationThroughLMSinLWC_0.png
tag: Tech
originalTitle: "Communication Through LMS in LWC"
link: "https://medium.com/@saurabh.samirs/communication-through-lms-in-lwc-ed892cedab94"
isUpdated: true
---





![이미지](/assets/img/2024-05-14-CommunicationThroughLMSinLWC_0.png)

Salesforce의 Lightning Message Service (LMS)는 돔 계층 구조 전체에서 Lightning Web Components (LWC) 간의 통신을 가능하게 하는 강력한 기능입니다. 이것은 요소가 직계 부모-자식 관계를 필요로하지 않고 서로 통신할 수 있도록 해주므로 복잡한 애플리케이션을 구축하는 유연한 도구입니다. 이 블로그에서는 LWC 간 통신을 위해 LMS를 사용하는 방법과 구현 예시를 살펴볼 것입니다.

# Lightning Message Service란?

Lightning Message Service (LMS)는 Salesforce가 제공하는 통신 프레임워크로, Lightning 페이지의 다른 구성 요소와 Lightning Web Components (LWC) 간에 효과적인 통신을 가능하게 합니다.




그것은 계층적 관계에 관계없이 컴포넌트 간에 통신할 수 있도록 해줘서 모듈식이고 연결된 애플리케이션을 쉽게 구축할 수 있습니다.

LMS는 컴포넌트가 데이터를 포함하는 메시지를 게시하고, 다른 컴포넌트가 이러한 메시지를 구독하고 반응할 수 있는 방법을 제공합니다. 이러한 분리된 통신 접근 방식은 Lightning 애플리케이션의 유연성과 유지 보수성을 향상시킵니다.

아래는 Lightning Message Service Flow 다이어그램입니다. Lightning Message Channels의 도움으로 다양한 컴포넌트 간의 통신을 보여줍니다.



# 라이트닝 메시지 서비스(LMS) 이해하기:

LMS는 컴포넌트가 메시지(이벤트)를 발행하고 구독하여 해당 메시지를 수신할 수 있는 pub-sub (publish-subscribe) 메시징 패턴을 제공합니다. 이 분리된 통신 메커니즘은 컴포넌트 간의 느슨한 결합을 촉진하여 재사용성과 유지 보수성을 향상시킵니다.

라이트닝 메시지 서비스에는 두 가지 주요 개념이 있습니다: 발행자(Publishers)와 구독자(Subscribers).

## 1. 발행자(Publisher):



- Publisher 구성 요소는 특정 메시지 채널로 메시지를 보내는 역할을 합니다.
- 이러한 메시지는 데이터를 전달하거나 비어 있을 수 있으며, 구독자는 이에 따라 반응할 수 있습니다.
- Publisher 구성 요소를 생성할 때는 `@salesforce/messageChannel` 모듈에서 `publish()` 함수를 import해야 합니다.
- 이 함수를 사용하면 Lightning Message Channel을 통해 메시지를 보낼 수 있습니다.

## 2. Subscriber:

- Subscriber 구성 요소는 특정 메시지 채널을 주시적으로 듣습니다.
- 이 채널에서 메시지가 발행될 때마다 해당 메시지에 응답할 수 있는 모든 구독된 구성 요소가 반응할 수 있습니다.
- 중요한 점은 Subscriber가 Publisher에 대한 구체적인 세부 정보를 알 필요가 없어서 유연하고 느슨하게 결합된 시스템을 유지하는 데 도움이 된다는 것입니다.

![이미지](/assets/img/2024-05-14-CommunicationThroughLMSinLWC_2.png)



## 주의 !

# LWC에서 라이트닝 메시지 서비스(LMS)를 통해 컴포넌트가 어떻게 통신하는지

## 메시지 채널 메타데이터 정의:

컴포넌트 간에 통신 채널을 설정하려면 먼저 Salesforce 조직에서 메시지 채널 메타데이터를 정의해야합니다. 아래 단계를 따르세요:



- Salesforce 프로젝트 구조의 `force-app/main/default` 하위에 "messageChannels"라는 폴더를 생성해주세요.

2. 이 폴더 안에 "messageChannelName.messageChannel-meta.xml" 형식의 XML 파일을 만들어주세요. 여기서 "messageChannelName"을 원하는 채널 이름으로 바꿔주세요.

3. 아래 코드를 참고하여 .xml 파일에 `lightning message field`를 정의해주세요:


sampleMessageChannel.messageChannel-meta.xml




md
```js
<!--?xml version="1.0" encoding="UTF-8"?-->
<lightningmessagechannel xmlns="http://soap.sforce.com/2006/04/metadata">
    <masterlabel>SampleMessageChannel</masterlabel>
    <isexposed>true</isexposed>
    <description>This is a sample Lightning Message Channel.</description>
     
    <!-- Define message payload fields -->
    <lightningmessagefields>
        <fieldname>recordId</fieldname>
        <description>This is the record Id that changed</description>
    </lightningmessagefields>
    <lightningmessagefields>
        <fieldname>recordData</fieldname>
        <description>The current data representing the record that changed</description>
    </lightningmessagefields>
</lightningmessagechannel>
```

## 설명:

- `isExposed` 태그는 컴포넌트를 사용할 수 있게 만드는 데 사용됩니다.
- `lightningMessageFields` 태그를 사용하여 필드를 정의하는데 특정 정보를 전달할 수 있습니다. 예를 들어 `recordId`를 정의할 수 있습니다.
- `description` 태그를 사용하여 Lightning 메시지 채널에 대한 설명을 추가하면 이 메시지 채널을 만드는 목표에 대해 설명할 수 있습니다.
- `.messageChannel-meta.xml` 파일이 작성되면 Salesforce org에 배포하세요.

## 메시지 서비스 기능 가져오기:




번역 : 

당신의 Lightning 웹 컴포넌트에서 필요한 메시지 서비스 기능을 다음과 같이 가져오세요:

```js
import { publish, subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';
import msgService from '@salesforce/messageChannel/messageChannelName__c';
```

## 메시지 서비스 범위 정의:

`@wire 어댑터`를 사용하여 메시지 서비스의 범위를 정의할 수 있습니다.
라이트닝 웹 컴포넌트에서는 `@wire 어댑터`로만 스코핑이 가능합니다.



예시:

```js
@wire(MessageContext)
messageContext;
```

# 메시지 채널 발행:

메시지 채널에 메시지를 발행하려면 라이트닝 메시지 서비스의 `publish()` 메서드를 사용하십시오. 이 메서드는 메시지 컨텍스트, 메시지 채널, 메시지 페이로드를 매개변수로 받습니다.



```js
const messagePayload = {
    recordId: '0012y00000L5R6jAAF',
    recordData: { /* 레코드를 나타내는 데이터 */ }
};
publish(this.messageContext, msgService, messagePayload);
```

`publish()` 메소드는 3개의 파라미터를 받습니다 :

- 메시지 컨텍스트 (객체 타입)
- 메시지 채널 (객체 타입)
- 메시지 페이로드 (메시지 페이로드는 JSON 객체입니다)

messageContext : `MessageContext` 객체는 Lightning 메시지 서비스를 사용하는 Lightning 웹 컴포넌트에 대한 정보를 제공합니다. 이 객체는 `MessageContext` 와이어 어댑터나 `createMessageContext()`를 통해 가져올 수 있습니다.



```js
@wire(MessageContext)
messageContext
```

messageChannel: 메시지 채널 객체입니다. 메시지 채널을 가져오려면 `@salesforce/messageChannel`과 같은 scoped 모듈을 사용하세요. 조직에서 메시지 채널을 만들려면 LightningMessageChannel 메타데이터 유형을 사용하세요.

message: 가입자에게 발행된 메시지를 포함하는 직렬화 가능한 JSON 객체입니다. 메시지에는 함수나 심볼을 포함할 수 없습니다.

# 메시지 채널 구독:



특정 메시지 채널의 메시지를 구독하려면 `subscribe()` 메서드를 사용하세요. 받은 메시지를 처리하기 위한 리스너 함수를 제공해주세요.

```js
this.subscription = subscribe(
    this.messageContext,
    msgService,
    (message) => this.handleMessage(message)
);
```

`subscribe()` 메서드는 4개의 매개변수를 받습니다:

- 메시지 컨텍스트 (객체 형식)
- 메시지 채널 (객체 형식)
- 리스너 (함수 형식)
- 구독자 옵션 (객체 형식)



메시지 컨텍스트: `MessageContext` 객체는 라이트닝 메시지 서비스를 사용하는 라이트닝 웹 컴포넌트에 대한 정보를 제공합니다. 이 객체는 `MessageContext` 와이어 어댑터를 통해 가져오거나 `createMessageContext()`를 통해 가져올 수 있습니다.

```js
@wire(MessageContext)
messageContext
```

메시지 채널: 메시지 채널 객체입니다. 메시지 채널을 가져오려면 scoped 모듈인 `@salesforce/messageChannel`을 사용하십시오. 조직에서 메시지 채널을 만들려면 LightningMessageChannel 메타데이터 유형을 사용하십시오.

리스너: 발행된 메시지를 처리하는 함수입니다.



subscriberOptions: (선택 사항) 이 객체는 `'scope: APPLICATION_SCOPE'`로 설정되었을 때, 애플리케이션 전반에서 메시지 채널에서 메시지를 수신할 수 있는 능력을 지정합니다. `lightning/messageService`에서 `APPLICATION_SCOPE`를 가져와야 합니다.

# 메시지 채널 구독 취소:

메시지 채널 구독을 취소하려면 `unsubscribe()` 메서드를 사용하고, `subscribe()` 함수에 의해 반환된 구독 객체를 제공하면 됩니다.

```js
unsubscribe(this.subscription);
```



# Salesforce Lightning Message Service를 언제 사용해야 할까요?

라이트닝 메시지 서비스는 Visualforce 페이지, Aura 및 LWC 간에 정보를 교환하거나 전달하는 방법입니다. LMS는 특히 구성 요소가 구성 요소 계층구조에서 직접적으로 관련되어 있지 않지만 서로 상호 작용해야 하는 시나리오에서 유용합니다. 다음은 LMS를 사용할 수 있는 몇 가지 상황입니다:

- 부모-자식 구성 요소 간 통신: 부모 구성 요소와 여러 자식 구성 요소가 있고, 이들 간에 데이터를 전달하거나 작업을 트리거하려는 경우입니다.
- 동료 구성 요소 간 통신: 페이지에 동료 구성 요소가 있고, 이들의 상태를 동기화하거나 데이터를 공유해야 하는 경우입니다.
- 크로스 도메인 통신: 관리되는 패키지와 사용자 지정 구성 요소와 같이 서로 다른 네임스페이스에 거주하는 구성 요소 간에 통신해야 하는 경우입니다.
- 동적 구성 요소 간 통신: 구성 요소가 런타임에서 동적으로 생성되거나 파괴되고, 이들 사이에 통신 채널을 설정할 유연한 방법이 필요한 경우입니다.

다음은 Lightning Message Service의 사용 예시 시나리오입니다:



당신이 Lightning 페이지에서 두 개의 컴포넌트를 가지고 있는 상황을 상상해봅시다: 계정 목록을 표시하는 부모 컴포넌트와 선택된 계정의 세부 정보를 보여주는 자식 컴포넌트가 있습니다. 사용자가 부모 컴포넌트에서 계정을 선택할 때, 자식 컴포넌트가 동적으로 업데이트되어 선택된 계정의 세부 정보를 표시하고 싶습니다.

# Salesforce Lightning Message Service의 제한 사항

- LMS는 Salesforce 모바일 앱, AppExchange, Lightning Out 및 Lightning Communities와 통합할 수 있는 능력이 없습니다.
- LMS는 iframe에서 작동하지 않습니다.
- LMS는 Salesforce 클래식에서 작동하지 않습니다.
- Salesforce UI에서 직접 라이트닝 메시지 채널을 생성하는 것을 지원하지 않습니다.

# 결론:



라이트닝 메시지 서비스(Lightning Message Service)는 Salesforce의 라이트닝 웹 컴포넌트(Lightning Web Components) 간 효율적인 통신을 가능케 하는 강력한 도구입니다. pub-sub 패턴을 구현함으로써 컴포넌트들은 분리된 방식으로 통신할 수 있으며, 이는 라이트닝 애플리케이션의 유연성과 확장성을 향상시킵니다. 올바른 사용법과 이해를 통해 LMS는 Salesforce에서 복잡하고 동적인 사용자 인터페이스를 원활하게 구축할 수 있도록 도와줍니다.

"더 많은 흥미로운 LWC 주제를 기대해주시고 Salesforce 개발 전문가가 되기 위해 라이트닝 웹 컴포넌트의 세계를 계속 탐험해보세요."

즐거운 LWC 코딩하세요!

더 자세한 내용은 아래 링크를 방문해주세요: