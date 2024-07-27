---
title: "adamant-api v240 출시 v200 이후 달라진 점은"
description: ""
coverImage: "/assets/img/2024-06-22-adamant-apiv240isoutWhatschangedsincev200_0.png"
date: 2024-06-22 01:56
ogImage: 
  url: /assets/img/2024-06-22-adamant-apiv240isoutWhatschangedsincev200_0.png
tag: Tech
originalTitle: "adamant-api v2.4.0 is out. What’s changed since v2.0.0?"
link: "https://medium.com/adamant-im/adamant-api-v2-4-0-is-out-whats-changed-since-v2-0-0-809360bad3b8"
---


adamant-api는 패키지의 가장 큰 업데이트 이후 중요한 개선 사항과 수정 사항을 거쳐 상당한 향상을 이루었습니다. 전체적인 개발자 경험과 버그 수정을 목표로 한 패키지의 최대 업데이트 이후 주요 변경 사항을 살펴봅시다.

![image](/assets/img/2024-06-22-adamant-apiv240isoutWhatschangedsincev200_0.png)

# 버그 수정

- voteForDelegate() 유효성 검사 (v2.4.0): API.voteForDelegate() 메서드 내에서 공개 키 및 대표자 이름의 유효성 검사를 수정하였으며, 주소가 실제 대표자인지 체크하여 ADM 토큰의 낭비를 방지하였습니다.
- 노드 체크 버그 (v2.3.1): 헬스 체크 프로세스 중에 랜덤 노드가 한 개만 체크되던 버그를 해결하였습니다.
- 전역 설치 (v2.3.0): adamant-api에 의존하는 패키지의 전역 설치 문제를 해결하였습니다.

<div class="content-ad"></div>

# DX 개선 사항

- 로그 메시지 (v2.3.1): 보건 점검에 대한 로그 메시지를 개선하여 문제를 진단하고 시스템 상태를 모니터링하기 쉽게 했습니다.
- 트랜잭션 쿼리 메서드 (v2.3.0): 트랜잭션 쿼리 언어를 사용하는 엔드포인트에 대해 중첩 객체를 사용하도록 변경하였습니다:

```js
const blocks = await api.getTransactions({
  fromHeight: 7585271,
  and: {
    toHeight: 7586280, // 'and:toHeight' 대신 7586280 사용
  },
  or: {
    senderId: 'U18132012621449491414', // 'or:senderId' 대신 '...' 사용
  },
});
```

- WebSocket 초기화 (v2.1.0): api.initSocket() 메서드는 이제 WebSocketClient의 인스턴스를 수락합니다.

<div class="content-ad"></div>

```js
const socket = new WebSocketClient({ /* ... */ });
api.initSocket(socket);
```

- 메시지 인코딩 및 디코딩 (v2.1.0): encodeMessage() 및 decodeMessage() 함수가 퍼블릭 키를 Uint8Array 또는 Buffer로 받고, 패스프레이스 대신 키 쌍을 직접 전달할 수 있도록 업그레이드되었습니다:

```js
import {encodeMessage, createKeypairFromPassphrase} from 'adamant-api';
const {publicKey} = createKeypairFromPassphrase('...');
const message = encodeMessage(,, publicKey);
```

```js
import {decodeMessage, createKeypairFromPassphrase} from 'adamant-api';
const keyPair = createKeypairFromPassphrase('...');
const message = decodeMessage(,, keyPair);
```

<div class="content-ad"></div>

# 유틸리티 함수

- Validator 유틸리티(v2.2.0): API 내에서 여러 엔티티의 유효성을 향상시키기 위해 다양한 validator 유틸리티 함수를 내보냈습니다:

```js
function isPassphrase(passphrase: unknown): passphrase is string;
function isAdmAddress(address: unknown): address is AdamantAddress;
function isAdmPublicKey(publicKey: unknown): publicKey is string;
function isAdmVoteForPublicKey(publicKey: unknown): publicKey is string;
function isAdmVoteForAddress(address: unknown): boolean;
function isAdmVoteForDelegateName(delegateName: unknown): delegateName is string;
function validateMessage(message: string, messageType: MessageType = MessageType.Chat): {success: false; error: string} | {success: true};
function isDelegateName(name: unknown): name is string;
function admToSats(amount: number): number;
```

- 거래 쿼리 객체 변환(v2.3.0): transformTransactionQuery 함수를 소개하여 거래 쿼리를 간결화하고 구조화하여 더 읽기 쉽고 관리하기 쉽도록 만들었습니다:

<div class="content-ad"></div>

```js
상수 transformed를 transformTransactionQuery 함수로 변환했습니다. {
  fromHeight: 7585271,
  and: {
    toHeight: 7586280,
  },
  or: {
    senderId: 'U18132012621449491414',
  },
});
console.log(transformed); // {'and:toHeight': 7586280, 'or:senderId': /* ... */}
```

# 타입 정의

- 많은 메소드 내에서 트랜잭션 id에 대한 유형 정의가 수정되었으며, ChatTransactionData 인터페이스 내의 amount 속성 및 주 클래스의 options 내의 logLevel에 대한 유형 정의가 수정되었습니다.

GitHub의 릴리스 노트를 확인하십시오: [여기](https://github.com/Adamant-im/adamant-api-jsclient/blob/master/CHANGELOG.md)
