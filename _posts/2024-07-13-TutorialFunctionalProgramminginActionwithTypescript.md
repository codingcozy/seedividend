---
title: "튜토리얼 Typescript로 배우는 함수형 프로그래밍 실전 적용법"
description: ""
coverImage: "/TIL/assets/img/2024-07-13-TutorialFunctionalProgramminginActionwithTypescript_0.png"
date: 2024-07-13 20:37
ogImage: 
  url: /TIL/assets/img/2024-07-13-TutorialFunctionalProgramminginActionwithTypescript_0.png
tag: Tech
originalTitle: "Tutorial: Functional Programming in Action with Typescript"
link: "https://medium.com/@andrewrobertallison/tutorial-functional-programming-in-action-with-typescript-ab136b3db9a3"
---



![Tutorial Image](/TIL/assets/img/2024-07-13-TutorialFunctionalProgramminginActionwithTypescript_0.png)

# 소개

내 커리어 초반에 가르쳐진 한 가지는 JavaScript가 객체지향 언어가 아니라는 것이었습니다. 상속보다는 합성을 사용하고 함수(클래스가 아닌)를 일등 시민으로 다루는 것이 더 나은 접근이라는 것이죠. 전체 스택 역할을 하는 Scala가 백엔드 서비스로 사용되는 회사에 들어가니 정말 놀랍더군요. 프로그래밍에 대한 내가 알고 있던 것을 다시 생각해야 했고 Martin Odersky의 목소리를 듣는 데 많은 시간을 보내야 했습니다. 하지만 익숙해지고 나면 한 번도 되돌아보지 않았습니다. 그 이후로 프론트엔드를 위한 몇 가지 FP 트릭을 발견했는데 이를 공유하고 싶습니다.

이 자습서에서는 RxJS, fp-ts 및 io-ts라는 3가지 라이브러리와 그들과 관련된 함수형 프로그래밍 패러다임을 다룰 것입니다. io-ts의 피어 종속성인 fp-ts를 알아야 합니다. 


<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# FP 리프레셔

함수형 프로그래밍은 대학 대수 수업에서 순수 함수에 대한 강의를 떠올리게 합니다. 출력이 제공된 입력에만 의존하는 것이 이를 의미합니다. 이는 데이터의 변이를 피하고 "부작용"이 없도록 하는 것으로 더 예측 가능한 코드를 작성할 수 있습니다. 이것은 불변 변수의 값이 한 번 설정되면 나중에 변경할 수 없다는 점 때문에 때로는 귀찮음이 될 수도 있습니다.

map과 같은 고차 함수는 한 개 이상의 함수를 인수로 받아 새로운 함수를 반환하는데 함수형 프로그래밍에서 기본적인 역할을 합니다. 재사용성과 모듈성을 통해 기반 함수를 설정하고 확장해 나가는 데 더 빠르게 이동할 수 있습니다. 객체 지향 프로그래밍 (OOP)은 데이터 변환 프로세스를 다룰 때 복잡해지는 반면, 싱글톤, 정적 함수 또는 정적 변수를 사용해야 하는지 여부에 대한 문제가 발생할 수 있는 반면, 함수형 프로그래밍은 평이한 함수의 사용을 옹호함으로써 이러한 시나리오를 단순화합니다. 말 그대로 모든 것이 함수입니다

<img src="/TIL/assets/img/2024-07-13-TutorialFunctionalProgramminginActionwithTypescript_1.png" />

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# RxJS

이 라이브러리는 특히 클래스 간에 상태 "반응성"을 제공할 수 있는 반응형 프로그래밍 라이브러리로서 인기가 있습니다. 이 라이브러리는 JS의 어떤 값의 변경에 반응하기 위해 채울 수 있는 컨테이너 또는 구조물로 생각할 수 있습니다. 아마도 예상하신 대로, React와 아주 잘 작동하며 훅을 위한 일등 지원을 제공합니다. RxJS의 주요 개념들 중 일부는 공식 문서에서 쉽게 찾을 수 있지만, 여러분의 편의를 위해 여기에 간단히 기재하였습니다:

- Observables: RxJS는 시간이 지남에 따라 값 스트림을 방출하는 함수인 Observables 개념을 중심으로 구축되었습니다. Observables는 함수형 반응형 프로그래밍의 핵심 개념이며, 비동기 작업을 합성 및 선언적인 방식으로 표현할 수 있습니다.
- Operators: RxJS는 Observables을 변환, 필터링, 결합 및 조작하는 데 사용할 수 있는 다양한 방식의 연산자를 제공합니다. Operators는 하나 이상의 observables을 입력으로 사용하고 새로운 observable을 출력으로 반환하는 순수 함수입니다.
- 함수형 프로그래밍의 원칙들: RxJS는 불변성(한 번 생성되면 변경할 수 없음), 조합성(큰 애플리케이션을 위한 작은 구성 요소), 참조 투명성(동일한 입력은 몇 번 호출되었든 동일한 출력을 생성함)과 같은 많은 함수형 프로그래밍 원칙을 따릅니다. Observables 및 연산자는 부작용이 없는 순수 함수이며, 복합하여 복잡한 비동기 작업을 만들 수 있는 선언적인 방식으로 결합될 수 있습니다.

# fp-ts

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 라이브러리는 RxJS만큼 인기가 없고 조금 더 복잡합니다. 이 라이브러리는 사용자가 숫자뿐만 아니라 어떤 데이터 유형이든 연결할 수 있는 미리 작성된 함수를 제공합니다.

특징

- 대수적 데이터 유형: fp-ts는 Option, Either, Task 등의 대수적 데이터 유형을 제공하여 복잡한 데이터 구조를 안전하고 조립 가능한 방식으로 표현할 수 있습니다. 대수적 데이터 유형은 함수형 프로그래밍의 핵심 개념으로, null/undefined 오류 및 기타 일반적인 런타임 오류를 피하는 데 도움이 됩니다.
- 타입 클래스: fp-ts는 Functor, Applicative, Monad 등의 타입 클래스를 제공하여 필요한 인터페이스를 구현한 모든 데이터 유형과 작동하는 일반 함수를 정의할 수 있습니다. 타입 클래스는 추상화와 재사용을 위한 강력한 도구이며, 보다 일반적이고 조립 가능한 코드를 작성하는 데 도움이 됩니다.
- 함수형 프로그래밍 원칙: fp-ts는 불변성, 조합성, 참조 투명성 등 많은 함수형 프로그래밍 원칙을 따릅니다. 대수적 데이터 유형과 타입 클래스는 부작용이 없는 순수 함수로, 안전하고 조립 가능한 방식으로 결합하여 복잡한 프로그램을 만들 수 있습니다.

# io-ts

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 라이브러리는 3개 중 가장 작은 라이브러리이며 TypeScript 코드에 입력 및 출력 도우미를 제공합니다. 일반적인 사용 사례는 API 호출을 보내고 받는 것이지만 오디오 및 비디오와 같은 것들에도 유용합니다.

특징

- 런타임 유형 유효성 검사: io-ts는 데이터 구조에 대한 런타임 유형을 정의하는 방법을 제공하며 정의된 유형과 일치하는 데이터를 자동으로 유효성 검사하고 디코딩할 수 있습니다. 런타임 유형 유효성 검사는 런타임 오류를 방지하고 데이터 일관성을 보장하는 강력한 도구입니다.
- 유형 추론: io-ts는 런타임 유형 정의에서 TypeScript 유형을 추론할 수 있어 IDE에서 중복되는 유형 주석을 작성하지 않고도 유형 안전성 및 자동완성을 얻을 수 있습니다.
- 함수형 프로그래밍 원칙: io-ts는 불변성, 합성성, 참조 투명성과 같은 많은 함수형 프로그래밍 원칙을 따릅니다. 런타임 유형 정의는 부작용이 없는 순수 함수이며 선언적 방식으로 조합하고 재사용할 수 있습니다.

# 리액트로 데모하기

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

모든 세 가지 라이브러리를 사용하는 일반적인 사례는 API 호출을 필요 이상으로 복잡하게 만드는 것입니다. 우리가 일반적인 React.js 컴포넌트에서 어떻게 작동하는지 살펴봅시다.

```js
import React, { useState, useEffect } from 'react';
import { Observable } from 'rxjs';
import { pipe } from 'fp-ts/lib/pipeable';
import { map, fold } from 'fp-ts/lib/Either';
import * as t from 'io-ts';

const ResponseType = t.type({
  data: t.string,
});

const fetchData = (): Observable<t.TypeOf<typeof ResponseType>> => {
  return Observable.create(({ error, next, complete }) => {
    fetch('https://example.com/api/data')
      .then((response) => response.json())
      .then((data) => {
        const result = ResponseType.decode(data);
        pipe(
          result,
          fold(
            error,
            next,
          ),
        );
        complete();
      })
      .catch(error);
  });
};

const MyComponent = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const subscription = fetchData().subscribe(({ data }) => setData(data));
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <div>{data}</div>;
};
```

이 예제에서는 io-ts를 사용하여 예상되는 API 응답의 형태를 나타내는 런타임 타입 ResponseType를 정의합니다. 그런 다음 API 호출을 수행하고 응답의 Observable을 반환하는 fetchData 함수를 정의합니다.

React 컴포넌트에서 useState 훅을 사용하여 검색한 데이터를 추적합니다. 그런 다음 useEffect 훅을 사용하여 fetchData에 의해 반환된 Observable을 구독합니다. 컴포넌트가 마운트될 때 Observable을 구독하고 데이터가 도착하면 검색된 데이터로 상태를 업데이트합니다. 또한 컴포넌트가 마운트 해제될 때 Observable을 구독 취소하여 메모리 누수를 방지합니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

fp-ts의 pipe 함수를 사용하여 API 응답의 디코딩과 결과를 Either로 폴딩하는 작업을 조합합니다. 이를 통해 디코딩 오류와 API 오류를 기능적이고 조합 가능한 방식으로 처리할 수 있습니다.

이제 더 고급 사용 사례를 살펴보고 GraphQL API와 함께 웹 데이터 테이블을 표시하는 방법을 살펴봅시다:

```js
import React, { useState, useEffect } from 'react';
import { pipe } from 'fp-ts/lib/pipeable';
import { map, fold } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Observable } from 'rxjs';

const ResponseType = t.type({
  data: t.type({
    users: t.array(
      t.type({
        id: t.string,
        name: t.string,
        email: t.string,
        phone: t.string,
      }),
    ),
  }),
});

const fetchData = (): Observable<t.TypeOf<typeof ResponseType>> => {
  const client = new ApolloClient({
    uri: 'https://mygraphqlapi.com/graphql',
    cache: new InMemoryCache(),
  });

  const query = gql`
    query {
      users {
        id
        name
        email
        phone
      }
    }
  `;

  return Observable.create(({ error, next, complete }) => {
    client
      .query({ query })
      .then(({ data }) => {
        const result = ResponseType.decode(data);
        pipe(
          result,
          fold(
            error,
            next,
          ),
        );
        complete();
      })
      .catch(error);
  });
};

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const subscription = fetchData().subscribe(({ data: { users } }) => setUsers(users));
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    | 표
    | 머리글
    | 승객
    | 별명
    | 전자 메일
    | 전화번호
    | ------
    | ----------
    | -------- 
    | {users.map(({ id, name, email, phone }) => (
      <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{phone}</td>
      </tr>
    ))}
    | 
  );
};
```

이 예제에서는 우리의 GraphQL 응답의 예상 모양을 나타내는 io-ts를 사용하여 런타임 유형인 ResponseType을 정의합니다. ApolloClient를 사용하여 GraphQL API에서 데이터를 가져오고 응답의 Observable을 반환하는 fetchData 함수를 정의합니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

우리의 React 컴포넌트에서는 useState 훅을 사용하여 가져온 데이터를 추적합니다. 그런 다음 useEffect 훅을 사용하여 fetchData에 의해 반환된 Observable을 구독합니다. 컴포넌트가 마운트될 때 Observable을 구독하고 데이터가 도착하면 상태를 업데이트합니다. 또한 컴포넌트가 마운트 해제될 때 Observable을 구독해제하여 메모리 누수를 방지합니다.

마지막으로, 가져온 데이터를 사용하여 웹 데이터 테이블을 렌더링합니다. 사용자 배열을 매핑하고 각 사용자에 대한 행을 렌더링하여 ID, 이름, 이메일 및 전화번호를 표시합니다.

# 결론

제 전문 경력의 대부분에서 프로젝트의 핵심 라이브러리와 기술 스택은 일반적으로 제 입성 전에 구현되었습니다. 새로 합류한 팀에게 다른 방향으로 이주할 것을 설득하는 것은 거의 불가능할 수 있습니다. 이미 있는 것에 헌신하고 나아가야 합니다. 그러나 운이 좋으면 JS 코드베이스에 함수형 프로그래밍 패턴과 라이브러리를 소개할 수있는 경우가 있습니다. 그렇게 하면 훨씬 더 행복할 수 있습니다! 프로그래밍 실수로 인해 버그가 발생할 가능성이 적어진다고 (제 의견으로는) 확신합니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

안녕하세요! 궁금한 점, 의견, 뜨거운 이야기가 있으면 아래에 남겨주세요!