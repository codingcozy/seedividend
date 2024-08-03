---
title: "Nextjs 14 unstable_cache 사용 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# Nextjs 14 unstable_cache 사용 방법

unstable_cache를 사용하면 데이터베이스 쿼리와 같은 비용이 많이 드는 작업의 결과를 캐시하고 여러 요청에서 재사용할 수 있습니다.

```js
import { getUser } from './data';
import { unstable_cache } from 'next/cache';

const getCachedUser = unstable_cache(
  async (id) => getUser(id),
  ['my-app-user']
);

export default async function Component({ userID }) {
  const user = await getCachedUser(userID);
  ...
}
```

> 알아두면 좋아요: 캐시 범위 내에서 헤더 또는 쿠키와 같은 동적 데이터 원본에 액세스하는 것은 지원되지 않습니다. 캐시된 함수 내에서 이 데이터가 필요한 경우, 캐시된 함수 외부에서 헤더를 사용하고 필요한 동적 데이터를 인수로 전달하십시오.

<div class="content-ad"></div>

> 경고: 이 API는 불안정하며 향후 변경될 수 있습니다. API가 안정화되면 필요한 경우 이주 문서 및 코드 수정을 제공할 것입니다.

## 매개변수

```js
const data = unstable_cache(fetchData, keyParts, options)();
```

- fetchData: 캐시하려는 데이터를 가져오는 비동기 함수입니다. Promise를 반환해야 하는 함수여야 합니다.
- keyParts: 캐시된 키를 식별하는 배열입니다. 전역적으로 고유한 값을 포함해야 하며, 함께 캐시되는 데이터의 키를 식별합니다. 캐시 키에는 함수에 전달된 인수도 포함됩니다.
- options: 캐시 동작을 제어하는 객체입니다. 다음 속성들을 포함할 수 있습니다:
  - tags: 캐시 무효화를 제어하는 데 사용할 수있는 태그의 배열입니다.
  - revalidate: 캐시를 재지정해야 하는 시간(초)입니다. 영구적으로 캐시하려면 건너뛰거나 false를 전달하거나, revalidateTag() 또는 revalidatePath() 메소드와 일치하는 경우까지 캐시를 유지합니다.
  - tags: 캐시 무효화를 제어하는 데 사용할 수있는 태그의 배열입니다.
  - revalidate: 캐시를 재지정해야 하는 시간(초)입니다. 영구적으로 캐시하려면 건너뛰거나 false를 전달하거나, revalidateTag() 또는 revalidatePath() 메소드와 일치하는 경우까지 캐시를 유지합니다.

<div class="content-ad"></div>

## 반환값

unstable_cache은 호출될 때 캐시된 데이터로 해결되는 Promise를 반환하는 함수를 반환합니다. 데이터가 캐시에 없는 경우 제공된 함수가 호출되어 그 결과가 캐시되고 반환됩니다.

## 버전 히스토리

| Version   | Changes                  |
| --------- | ------------------------ |
| `v14.0.0` | `unstable_cache` 도입됨. |

<div class="content-ad"></div>
