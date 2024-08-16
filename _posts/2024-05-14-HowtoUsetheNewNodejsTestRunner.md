---
title: "새로운 Nodejs 테스트 러너 사용 방법"
description: ""
coverImage: "/assets/img/2024-05-14-HowtoUsetheNewNodejsTestRunner_0.png"
date: 2024-05-14 15:43
ogImage: 
  url: /assets/img/2024-05-14-HowtoUsetheNewNodejsTestRunner_0.png
tag: Tech
originalTitle: "How to Use the New Node.js Test Runner"
link: "https://medium.com/bitsrc/how-to-use-the-new-node-js-test-runner-3a347289732"
isUpdated: true
---




Node.js 20 버전이 출시되면서 Node.js 18의 실험적인 테스트 러너가 안정 상태를 달성했습니다. 우리의 코드를 테스트하기 위해 이 새로운 테스트 러너를 어떻게 사용할 수 있는지 살펴봅시다.

이 테스트 러너는 test 및 describe/it 스타일 테스트를 지원하며, mocking, 여러 테스트 리포터 및 코드 커버리지도 포함하지만, 커버리지는 아직 실험 단계입니다.

![이미지](/assets/img/2024-05-14-HowtoUsetheNewNodejsTestRunner_0.png)

가장 일반적인 사용 사례 중 하나인 서비스 계층 테스트 및 fetch 함수 모의(mock)에 대해 알아보겠습니다. 이 안내서는 A부터 Z까지 실전 예제를 제공할 것입니다.



다음 명령을 터미널에서 실행하여 올바른 Node.js 버전을 사용하는지 먼저 확인해 보세요. "v20" 버전이 표시되어야 합니다. 다른 버전이 실행 중이라면 nvm을 사용하여 버전 20을 설치해주세요.

```js
node -v
// v20.4.0
```

우리가 테스트할 코드는 매우 간단한 데이터 검색 함수입니다. 이는 우리가 매일 작성하는 코드에서 매우 흔하게 사용됩니다. 이 예제는 100% 완벽하지는 않지만 이 글의 예시로는 충분히 작동할 것입니다. fetch를 종속성으로 사용한다는 점을 볼 수 있으므로 모의(mocking) 작업이 필요함을 알 수 있습니다.

```js
export const getUserById = async(id)=>{

  const res = await fetch(`www.example.com/users/${id}`)
  if(res.ok){
    const contents = await res.json();
    return contents.payload;
  }
  throw new Error('request failed');
}
```



우리는 데이터 검색이 성공적이고 값을 반환하는 "happy path"와 오류가 발생하는 실패 조건을 테스트해야 합니다.

get-user.test.mjs라는 테스트 파일을 생성해야 합니다. 우리는 node:test에서 사용할 함수들과 node:assert에서 assert 함수를 가져와야 합니다. 마지막으로, 테스트하고자 하는 함수를 가져와야 합니다.

```js
import { describe, it } from 'node:test';
import assert from 'node:assert'
import { getUserById } from './index.mjs';
```

이러한 임포트가 완료되었으므로, 이제 우리는 테스트를 작성할 수 있습니다. 익숙한 describe/it 패턴을 가져왔지만, 만족하는 경우에는 단순히 test를 함수로 가져올 수도 있습니다.




getUserById 함수에 대한 행복한 시나리오 테스트가 있습니다. 저희 함께 살펴보죠. it 함수에는 테스트의 컨텍스트인 매개변수 t를 사용하는 콜백이 포함되어 있습니다. 이 컨텍스트에는 함수를 모킹하는 데 사용할 수 있는 mock 속성이 있습니다. 이 경우에는 fetch 함수를 모킹합니다.

Jest를 사용한 적이 있는 사람들에게 친숙한 mockImplementationOnce 메서드가 여기서 fetch 함수를 모킹하는 데 사용됩니다.

이제 테스트 대상 함수를 호출하고 내장된 assert를 사용하여 결과를 확인할 수 있습니다.




## 더 알아보기:

## 에러 케이스 테스트

이제 행복한 경로를 테스트했으니 100% 커버리지를 달성하기 위해 에러 케이스를 테스트해야 합니다.

```js
    it('ok이 아닌 경우 에러를 throw 해야 합니다', async (t) => {
        const fn = t.mock.method(global, 'fetch');

        fn.mock.mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
            })
        );
        await assert.rejects(async () => {
            return await getUserById(2)
        },
        {
            name: 'Error',
            message: 'request failed',
        });
    });
```



우리는 지금 ok===false를 반환하는 모의 객체를 만들었습니다. 이것은 함수가 오류를 반환하는 결과를 가져옵니다. assert.rejects 함수는 이를 쉽게 파악하는 데 훌륭하며 오류 메시지를 정확하게 테스트할 수 있습니다. 작업을 마쳤습니다. 이제 테스트를 실행하는 방법을 살펴봅시다.

# 테스트 실행하기

테스트 실행은 쉽기만 하면서도 원시 구현에서 기대할 수 있는 것처럼 놀랍게 빠릅니다.

파일 이름이 filename.test.js인 모든 테스트 파일을 실행하려면 터미널에서 다음을 실행하면 됩니다:



```js
노드 --test
```

제 노트북(라이젠 7과 리눅스 장착)에서 이 간단한 테스트는 150밀리초 이내에 실행되는데, 정말 빠릅니다.

<img src="/assets/img/2024-05-14-HowtoUsetheNewNodejsTestRunner_1.png" />

# 코드 커버리지




코드 커버리지 모듈은 아직 실험 단계이지만 이 간단한 경우에서는 잘 작동하는 것 같아요. 사용하려면 다음 사항을 염두에 두시기 바랍니다. 이 기능은 더 최신 버전의 Node.js에서 작동을 멈출 수도 있습니다.

다음 명령어로 커버리지를 실행해요:

```js
node --experimental-test-coverage --test
```

그리고 우리는 Istanbul 커버리지 보고서와 매우 흡사한 다음 리포트를 받아요.



<img src="/assets/img/2024-05-14-HowtoUsetheNewNodejsTestRunner_2.png" />

마무리로, 20버전에서 소개된 Node.js 테스트 러너는 개발자들에게 안정적이고 빠르며 포괄적인 테스트 솔루션을 제공합니다. 간단한 데이터 검색 기능부터 더 복잡한 코드까지 테스트하는 경우에도, Node.js의 테스트 기능이 네이티브로 구현되어 있어 테스트 경험을 간소화하고 풍부하게 해줄 것입니다. 더 이상 외부 테스트 러너가 필요하지 않고, 훌륭한 성능과 고품질 문서를 자랑합니다. 자세한 정보는 문서를 참조해주시고, 프로젝트 수준에서 사용하는 과정을 알려주시면 감사하겠습니다.

독자분들을 조금 더 알고 싶습니다. 저는 다음에서 만날 수 있습니다.

https://www.linkedin.com/in/laurentzuijdwijk/ https://mentorcruise.com/mentor/laurentzuijdwijk/



## 자원

테스트 러너 문서: [링크](https://nodejs.org/api/test.html)  
Assert 문서: [링크](https://nodejs.org/api/assert.html)

# 리유저블 컴포넌트로 구성 가능한 앱을 만들어 보세요. 레고처럼 재사용 가능한 컴포넌트로

![이미지](/assets/img/2024-05-14-HowtoUsetheNewNodejsTestRunner_3.png)



비트는 조합 가능한 소프트웨어 개발을 위한 오픈소스 도구체인입니다.

비트를 사용하면 현대 웹 앱, UI 구성 요소, 백엔드 서비스 또는 CLI 스크립트와 같은 어떤 종류의 소프트웨어도, 독립적이고 재사용 가능하며 조립 가능한 소프트웨어 단위로 개발할 수 있습니다. 어플리케이션 전체에서 컴포넌트를 공유하여 협력이 쉽고 빠르게 빌드할 수 있도록 만들어보세요.

함께 조립 가능한 소프트웨어를 개발하는 100,000명 이상의 개발자와 함께하세요.

다음 자습서로 시작해보세요:



# → Micro-Frontends: 비디오 // 가이드

# → 코드 공유: 비디오 // 가이드

# → 현대화: 비디오 // 가이드

# → Monorepo: 비디오 // 가이드



# → 마이크로서비스: 비디오 // 가이드

# → 디자인 시스템: 비디오 // 가이드

# 권장 문서: