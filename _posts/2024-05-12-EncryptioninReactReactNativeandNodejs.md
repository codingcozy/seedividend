---
title: "리액트, 리액트 네이티브 및 노드js에서의 암호화"
description: ""
coverImage: "/assets/img/2024-05-12-EncryptioninReactReactNativeandNodejs_0.png"
date: 2024-05-12 21:56
ogImage: 
  url: /assets/img/2024-05-12-EncryptioninReactReactNativeandNodejs_0.png
tag: Tech
originalTitle: "Encryption in React, React Native and Node.js"
link: "https://medium.com/@asttle1997/encryption-in-react-react-native-and-node-js-ceee589f429f"
isUpdated: true
---




암호화에 대한 올바른 모듈을 선택해주세요

# 소개

최근 프로젝트에서 만났던 암호화 관련 문제를 공유하고자 합니다. 먼저 사용된 암호화 방법론을 설명하고 어려움에 대해 깊이 있는 이야기로 파헤쳐보겠습니다. 웹 및 모바일 애플리케이션을 개발할 때 고려해야할 중요한 점은 호환성입니다. 기능을 설계하거나 모듈을 선택하거나 솔루션을 고려할 때 전체적인 접근 방식이 있어야 합니다. 모든 플랫폼에서 작동해야 합니다.

# 암호화 아키텍처



- 프론트엔드(React, React Native)에서 AES 암호화 키 생성하기
- 백엔드(Node.js)에서 RSA 공개 및 개인 키 생성하기
- RSA 공개 키를 프론트엔드와 공유하기
- AES 키를 RSA 공개 키로 암호화하기
- 보낼 데이터를 AES 키로 암호화하기
- 암호화된 데이터와 암호화된 AES 키를 백엔드로 보내기
- 백엔드에서 RSA 개인 키를 사용하여 암호화된 AES 키를 해독하여 AES 키를 검색하기
- 검색된 AES 키를 사용하여 암호화된 요청 데이터를 해독하기.

백엔드는 비슷한 프로세스를 따라 프론트엔드로 응답을 돌려보낼 것입니다. 키를 생성하고 암호화하는데 사용된 암호화 기술 전체 과정에 대해 설명하지는 않겠습니다. 다른 글에서 다룰 수도 있겠지만, 이제는 문제에 집중해보겠습니다.

![Encryption in React, React Native, and Node.js](/assets/img/2024-05-12-EncryptioninReactReactNativeandNodejs_0.png)

# 문제



AES 키를 생성하고 RSA 키를 생성하며 RSA 키를 사용하여 AES 키를 암호화하는 경우, 코어 노드 js 모듈의 일부인 기본 암호화 모듈을 사용할 수 있습니다. React는 내부적으로 노드에 의존성이 있기 때문에 키를 생성하고 암호화하는 데 큰 문제가 없으며 추가 패키지도 필요하지 않습니다. 그러나 React Native의 경우 노드 코어 모듈을 지원하지 않습니다. 따라서 다양한 탐구 끝에 혼자 사용하면 좋지만 암호화를 만들기위해 패키지를 대체하는 것과 관련된 문제가 있는 react-native-rsa-native, crypto-browserify, react-native-fast-crypto, react-native-quick-crypto와 같은 패키지들은 작동하지 않는 것 같습니다.

# 해결책

모든 플랫폼(웹, 모바일 및 백엔드)을 위한 동일한 암호화 기능과 기술을 제공할 수 있는 일반적인 패키지를 검색하는 도중 더욱 신뢰할 수 있고 호환성이 뛰어나며 크기가 작고 인기가 많은 node-forge 패키지를 발견했습니다. 다른 패키지들과 비교했을 때 이 패키지는 모든 암호화 기능, 암호 및 암호화 기술을 갖추고 있어 솔루션을 구현하기 쉽게 만들어 주었습니다.

```js
// AES 키 생성
// 클라이언트 측 React 및 React Native

import forge from 'node-forge';
export const generateAesKey = () => {
  const aesSalt = forge.random.getBytesSync(16);
  const keyPassPhrase = forge.random.getBytesSync(16);
  const aesKey = forge.pkcs5.pbkdf2(
    keyPassPhrase,
    aesSalt,
    ENCRYPTION_AES_ENC_KEY_OPTIONS.iterations, // 필요에 따라 사용
    ENCRYPTION_AES_ENC_KEY_OPTIONS.keySize, // 필요에 따라 사용
  );
  return aesKey;
};
```



```js
// RSA 공개 및 개인 키 생성
// 서버 측 Node.js
const forge = require('node-forge');
const rsaKeyPair = forge.pki.rsa.generateKeyPair({ bits: BITS }); // 필요에 따라 사용
const publicKeyPem = forge.pki.publicKeyToPem(rsaKeyPair.publicKey);
const privateKeyPem = forge.pki.privateKeyToPem(rsaKeyPair.privateKey);
```

```js
// RSA 공개 키를 사용하여 AES 키 암호화
// React 및 React Native

import forge from 'node-forge';
export const encryptAesKey = (receivedpublicKeyPem: string, aesKey: string) => {
  try {
    const publicKey = forge.pki.publicKeyFromPem(receivedpublicKeyPem);
    const encryptedAesKey = publicKey.encrypt(aesKey, 'RSA-OAEP');
    return forge.util.encode64(encryptedAesKey);
  } catch (error) {
    console.error('암호화 오류:', error);
    throw error;
  }
};
```

```js
// RSA 개인 키를 사용하여 암호화된 AES 키 복호화
const decryptedAesKey = rsaKeyPair.privateKey.decrypt(forge.util.decode64(encryptedAesKey), 'RSA-OAEP');
```

요청 데이터를 AES 키를 사용하여 암호화하고 백엔드에서 데이터를 복호화하기 위해 제 요구에 따라 다른 모듈을 사용했습니다 (React에는 crypto-js, React Native에는 react-native-crypto-js). 여전히 이 프로세스에 node-forge를 사용할 수 있습니다.




읽어 주셔서 감사합니다! 👋