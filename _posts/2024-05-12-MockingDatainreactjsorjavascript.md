---
title: "리액트 JS 또는 자바스크립트에서 데이터 가짜로 만들어 사용하기"
description: ""
coverImage: "/assets/img/2024-05-12-MockingDatainreactjsorjavascript_0.png"
date: 2024-05-12 23:23
ogImage: 
  url: /assets/img/2024-05-12-MockingDatainreactjsorjavascript_0.png
tag: Tech
originalTitle: "Mocking Data in react js or javascript"
link: "https://medium.com/@biplavmazumdar5/mocking-data-in-react-js-or-javascript-3f278ba7f550"
---


- React.js나 JavaScript에서 모킹 데이터는 개발이나 테스트 중에 API나 백엔드 서비스로부터의 응답을 시뮬레이션하기 위해 가짜 데이터를 생성하는 것을 의미합니다.
- 이를 통해 백엔드에 독립적으로 프론트 엔드 애플리케이션을 개발하고 테스트할 수 있습니다. 서버가 실제로 반환한 데이터와 상관없이 UI 컴포넌트가 예상대로 작동하는지 확인할 수 있습니다.

다음은 React.js나 JavaScript에서 모킹 데이터를 하는 일반적인 방법 몇 가지입니다:

- 하드코딩된 데이터: 코드 내에서 모의 데이터를 직접 정의합니다. 작은 데이터 세트나 정적 콘텐츠의 경우 특히 간단한 방법입니다.

```js
const mockData = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
  // 기타 모킹 데이터...
];
```



2. JSON 파일: 모의 데이터를 JSON 파일에 저장하고 필요할 때 코드로 가져옵니다. 이렇게 하면 모의 데이터를 코드베이스와 별도로 구성하고 관리할 수 있습니다.

```js
// mockData.json
[
  { "id": 1, "name": "John Doe", "age": 30 },
  { "id": 2, "name": "Jane Smith", "age": 25 }
  // 더 많은 모의 데이터...
]
```

- `./mockData.json`에서 mockData를 가져옵니다;

모의 라이브러리: faker.js 또는 mockjs와 같이 데이터를 모의하는 데 특별히 설계된 라이브러리를 사용하십시오. 이러한 라이브러리는 미리 정의된 스키마나 템플릿에 따라 랜덤하거나 현실적으로 보이는 모의 데이터를 생성합니다.



```js
// Using faker.js
import faker from 'faker';

const mockData = Array.from({ length: 10 }, () => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  age: faker.datatype.number({ min: 18, max: 100 })
}));
```

4. API 모킹: 만일 당신의 애플리케이션이 API와 통신한다면, axios-mock-adapter나 msw (Mock Service Worker)와 같은 도구를 사용하여 API 응답을 모킹할 수 있습니다. 이러한 도구들은 HTTP 요청을 가로채 미리 정의된 응답을 반환함으로써 다양한 시나리오와 예외 상황을 시뮬레이션할 수 있게 합니다.

```js
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onGet('/users').reply(200, [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 }
  // 더 많은 모킹 데이터...
]);
```

이것들은 React.js나 JavaScript에서 데이터를 모킹하는 방법의 일부 예시일 뿐입니다. 선택하는 접근 방식은 특정 사용 사례, 기호 및 애플리케이션의 복잡성에 따라 다릅니다. 데이터 모킹은 효과적인 개발과 테스트를 위해 필수적이며, 애플리케이션의 각 부분을 독립적으로 분리하고 유효성을 검사할 수 있도록 합니다.