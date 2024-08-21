---
title: "Nextjs 서버 액션을 이용한 무한 스크롤 구현하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Infinite Scroll with Nextjs Server Actions A Simple Guide"
link: "https://medium.com/@ferlat.simon/infinite-scroll-with-nextjs-server-actions-a-simple-guide-76a894824cfd"
isUpdated: true
---

대량의 데이터를 처리할 때, 효과적인 프론트엔드 페이지네이션은 성능과 가독성을 유지하는 데 중요합니다. 특히 더 느린 장치에서는 더 그렇습니다. 페이지네이션에 현대적인 감각을 더하려면, 무한 스크롤을 살펴보고 Next.js 서버 액션의 강점을 활용하는 방법에 대해 알아보겠습니다.

# 단계 1 — 프로젝트 초기화

완성된 데모 프로젝트는 여기에서 찾을 수 있습니다. 새로운 Next.js 프로젝트를 생성하려면 다음 명령을 실행하고 지시에 따르세요.

```js
npx create-next-app@latest
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 예제에서는 TypeScript, Tailwind 및 Next.js 앱 라우터를 사용했어요.

저희 요구사항은 다음과 같아요:

- 무료 가짜 API sling academy에서 사용자 목록을 표시합니다.
- 빌드 시점에 처음 10명의 사용자를 정적으로 로드합니다.
- 페이지 하단으로 스크롤 할 때 추가 사용자 10명을 로드합니다.

# 단계 2 — 초기 사용자 표시

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 사용자 가져오기 함수

먼저 사용자를 가져오는 함수를 만들어보세요. `actions/getUsers.ts` 파일을 만들어주세요.

```js
// actions/getUsers.ts

'use server'
import { UserAPIResponse } from '@/types/User'

export const getUsers = async (offset: number, limit: number) => {
  try {
    const url = `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${limit}`
    const response = await fetch(url)
    const data = (await response.json()) as UserAPIResponse
    return data.users
  } catch (error: unknown) {
    console.log(error)
    throw new Error(`An error happened: ${error}`)
  }
}
```

# 사용자 UI 구성요소

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

사용자 데이터를 표시하는 간단한 카드 컴포넌트를 만들어주세요. 이를 위해 src/components/UserCard.tsx 파일을 작성해주세요.

```jsx
import { User } from "@/types/User";

type UserProps = {
  user: User,
};

export default function UserCard({ user }: UserProps) {
  return (
    <div className="bg-indigo-400 text-white rounded w-96 p-3">
      <div>{user.id}</div>
      <div>{user.first_name}</div>
      <div>{user.last_name}</div>
      <div>{user.phone}</div>
      <div>{user.email}</div>
    </div>
  );
}
```

# 사용자 페이지

src/app/page.tsx 파일에 있는 Next.js 홈페이지를 사용자 페이지로 대체하세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import UserCard from "@/components/UserCard";
import { getUsers } from "@/actions/getUsers";

const INITIAL_NUMBER_OF_USERS = 10;

export default async function Home() {
  const initialUsers = await getUsers(0, INITIAL_NUMBER_OF_USERS);

  return (
    <div className="flex flex-col gap-3">
      {initialUsers.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

## 단계 3 — 무한 스크롤로 더 많은 사용자 로드하기

### 사용자 목록을 자식 클라이언트 컴포넌트로 이동

사용자 페이지의 내용을 자식 클라이언트 컴포넌트로 이동하십시오. src/components/UserList.tsx를 생성하고 src/app/page.tsx에 포함시킵니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
// components/UserList.tsx
import { User } from "@/types/User";
import UserCard from "./UserCard";

type UserListProps = {
  initialUsers: User[],
};

export default function UserList({ initialUsers }: UserListProps) {
  return (
    <div className="flex flex-col gap-3">
      {initialUsers.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

```js
//app/page.tsx
import UserList from "@/components/UserList";
import { getUsers } from "@/actions/getUsers";

const INITIAL_NUMBER_OF_USERS = 10;

export default async function Home() {
  const initialUsers = await getUsers(0, INITIAL_NUMBER_OF_USERS);

  return <UserList initialUsers={initialUsers} />;
}
```

## 사용자를 상태로 이동

사용자 목록 컴포넌트에서 사용자 목록은 이제 React 상태입니다. 초기 값은 부모 페이지에서 정적으로 로드된 10명의 사용자로 설정되어 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
// components/UserList.tsx

import { 사용자 } from '@/types/User'
import UserCard from './UserCard'
import { useState } from 'react'

type UserListProps = {
  initialUsers: 사용자[]
}

export default function UserList({ initialUsers }: UserListProps) {
  const [users, setUsers] = useState<사용자[]>(initialUsers)

  return (
    <div className='flex flex-col gap-3'>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
```

## 오프셋 상태 생성 및 추가 사용자 로드 기능 만들기

아래 코드 스니펫에서, 초기값이 10으로 설정된 데이터 오프셋을 추적하는 시스템을 설정했습니다. 이 오프셋은 사용자가 추가 데이터를 요청할 때마다 10씩 증가합니다. 추가로, 현재 오프셋을 기반으로 추가 사용자를 검색하고 이를 사용자 상태에 추가하는 기능을 정의했습니다.

```js
// components/UserList.tsx

'use client'
import { 사용자 } from '@/types/User'
import UserCard from './UserCard'
import { useState } from 'react'
import { getUsers } from '@/actions/getUsers'

type UserListProps = {
  initialUsers: 사용자[]
}

const 가져올_사용자_수 = 10

export default function UserList({ initialUsers }: UserListProps) {
  const [offset, setOffset] = useState(가져올_사용자_수)
  const [users, setUsers] = useState<사용자[]>(initialUsers)

  const loadMoreUsers = async () => {
    const apiUsers = await getUsers(offset, 가져올_사용자_수)
    setUsers([...users, ...apiUsers])
    setOffset(offset + 가져올_사용자_수)
  }

  return (
    <div className='flex flex-col gap-3'>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
      <button onClick={loadMoreUsers}>더 불러오기</button>
    </div>
  )
}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

🥳 우리는 이제 사용자를 더 불러오는 버튼으로 활성화된 완전히 기능적인 페이징 기능을 갖추었습니다.

"getUsers" 함수가 NextJS 서버 액션인 점을 감안하면, 이 함수는 클라이언트 측이 아닌 서버에서 실행됩니다. 사용자가 처음으로 더 많은 사용자를 불러올 때, 정보는 API에서 가져와 캐시됩니다. 다른 사용자들이 더 많은 데이터를 요청해도 추가적인 API 호출이 필요하지 않으며, 데이터가 이미 NextJS 캐시에 저장되어 있기 때문에 그냥 사용할 수 있습니다! 이는 페이지 성능과 사용자 경험을 크게 향상시킵니다. 게다가 이는 동일한 결과를 얻기 위해 필요한 백엔드 호출을 줄일 수 있어 호스팅 비용을 절감할 수도 있습니다.

## 스크롤로 더 많은 사용자 불러오기

프로젝트에 마지막 손질로 사용자의 스크롤을 감지하고 loadMoreUsers 함수를 활성화하는 작업이 필요합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이를 위해 react-intersection-observer 라이브러리를 설치할 것입니다. 이 라이브러리는 컴포넌트가 뷰포트 내에 있는지 모니터링하는 프로세스를 간소화합니다.

```js
npm install react-intersection-observer
```

```js
// components/UserList.tsx

'use client'
import { User } from '@/types/User'
import UserCard from './UserCard'
import { useEffect, useState } from 'react'
import { getUsers } from '@/actions/getUsers'
import { useInView } from 'react-intersection-observer'

type UserListProps = {
  initialUsers: User[]
}

const NUMBER_OF_USERS_TO_FETCH = 10

export default function UserList({ initialUsers }: UserListProps) {
  const [offset, setOffset] = useState(NUMBER_OF_USERS_TO_FETCH)
  const [users, setUsers] = useState<User[]>(initialUsers)
  const { ref, inView } = useInView()

  const loadMoreUsers = async () => {
    const apiUsers = await getUsers(offset, NUMBER_OF_USERS_TO_FETCH)
    setUsers([...users, ...apiUsers])
    setOffset(offset + NUMBER_OF_USERS_TO_FETCH)
  }

  useEffect(() => {
    if (inView) {
      loadMoreUsers()
    }
  }, [inView])

  return (
    <div className='flex flex-col gap-3'>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
      <div ref={ref}>
        Loading...
      </div>
      {/* <button onClick={loadMoreUsers}>Load more</button> */}
    </div>
  )
}
```

축하합니다! 우리는 사용자 친화적인 무한 스크롤 기능을 구현했습니다. 이는 우리 애플리케이션을 더 현대적으로 만들어주는 것뿐만 아니라 성능도 향상시킵니다. Next.js 서버 액션 및 캐싱을 사용하여 데이터 검색을 세밀하게 조정하여 모든 것이 원활하게 작동하고 사용자에게 전반적으로 긍정적인 경험을 제공합니다! 🚀
