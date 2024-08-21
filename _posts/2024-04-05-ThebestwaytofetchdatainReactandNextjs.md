---
title: "React와 Nextjs에서 데이터를 가져오는 여러가지 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "The best way to fetch data in React and Nextjs"
link: "https://medium.com/@codewithmee/the-best-way-to-fetch-data-in-react-and-next-js-47b291922089"
isUpdated: true
---

웹 개발 세계에서 HTTP 요청을 하는 것은 기본적인 작업입니다. 개발자들은 종종 이를 위해 어떤 라이브러리 또는 도구를 사용할지 선택해야 합니다. 이 글에서는 TypeScript에서 HTTP 요청을 처리하는 세 가지 인기 있는 옵션인 fetch, axios, 그리고 tanstack react-query를 비교해 보겠습니다.

fetch
Fetch는 HTTP 요청을 보내고 받는 간단하고 네이티브한 방법을 제공하는 내장된 JavaScript 메서드입니다. TypeScript에서 Fetch를 사용하여 GET 요청을 보내는 방법은 다음과 같습니다.

```js
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
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

fetch는 내장되어 있어 가벼운 편이지만 캐싱 및 오류 상태 처리를 적절히 하지 못합니다. 그리고 포스트를 작성할 때 헤더와 콘텐츠 유형 등을 전달해야 합니다. 아래 예제를 확인해보세요.

```js
const url = "https://api.example.com/postData";

const data = {
  key1: "value1",
  key2: "value2",
};

const requestOptions = {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json",
  },
};

fetch(url, requestOptions)
  .then((response) => {
    if (!response.ok) {
      throw new Error("네트워크 응답이 문제가 있습니다");
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error("에러 발생:", error));
```

이것은 매우 난잡한 구문이지만 axios는 fetch보다 훨씬 더 깔끔한 구문을 가지고 있으니 함께 살펴보겠습니다.

axios

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

Axios는 HTTP 요청을 보다 간단하게 만들어주는 인기 있는 JavaScript 라이브러리입니다. 요청을 보내는 과정을 간소화하고 요청 및 응답 인터셉터와 같은 추가 기능을 제공합니다. axios를 사용하여 동일한 GET 요청을 하는 방법은 다음과 같습니다:

먼저 설치해주세요.

```js
npm install axios
```

```js
import axios from "axios";

axios
  .get("https://api.example.com/data")
  .then((response) => console.log(response.data))
  .catch((error) => console.error(error));
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

포스트 요청을 할 때

```js
import axios from "axios";

const url = "https://api.example.com/postData";

const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer YOUR_ACCESS_TOKEN",
};

const data = {
  key1: "value1",
  key2: "value2",
};

axios
  .post(url, data, { headers })
  .then((response) => console.log(response.data))
  .catch((error) => console.error("Error:", error));
```

여러분은 분명히 axios가 fetch보다 훨씬 깔끔한 구문을 가지고 있고, fetch보다 효율적이지만 에러 및 로딩 상태를 관리하지 못한다는 것을 알 수 있습니다. 따라서 로딩 및 에러 상태를 수동으로 관리해야 합니다. 하지만 걱정하지 마세요! 오늘의 주제, 히어로 @tanstack-react-query가 등장합니다.

React Query

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

React-Query은 데이터 가져오기 및 상태 관리, 오류 처리, 캐싱을 전문으로 하는 강력한 라이브러리입니다. 최근 5.0에서는 optimistic updates라는 새로운 기능이 추가되었어요. 이는 데이터 관리의 복잡성을 추상화하여 매우 효율적이고 개발자 친화적인 경험을 제공합니다. React-Query를 사용하여 데이터를 가져오는 예시를 보여드리겠습니다.

먼저 설치한 후 사용해보세요.

```js
npm install @tanstack/react-query
```

```js
import { useQuery } from "@tanstack/react-query";

const MyComponent = () => {
  const { data, error, loading } = useQuery("data", () =>
    fetch("https://api.example.com/data").then((response) => response.json())
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <>{loading ? <Text>Loading...</Text> : <div>Data: {data}</div>}</>;
};
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

게시물 또는 다른 변경 요청에 대해

```js
import { useMutation } from '@tanstack/react-query';
import axios from 'axios'

const PostData = () => {
  // 뮤테이션 함수를 정의합니다
  const postMutation = useMutation((newData) =>
     axios.post("url")
    }).then((response) => response.json())
  );

  const handlePost = async () => {
    // 여기에 데이터를 넣어주세요
    const newData = {
      key1: 'value1',
      key2: 'value2',
    };

    // 뮤테이션 실행
    await postMutation.mutateAsync(newData);
  };

  return (
    <div>
      <button onClick={handlePost} disabled={postMutation.isLoading}>
        {postMutation.isLoading ? '게시 중...' : '데이터 게시'}
      </button>

      {postMutation.isError && (
        <div>오류 발생: {postMutation.error.message}</div>
      )}

      {postMutation.isSuccess && (
        <div>데이터가 성공적으로 게시되었습니다: {postMutation.data}</div>
      )}
    </div>
  );
};
```

React Query를 통해 다양한 로딩 및 오류 상태를 아름답게 처리하는 방법을 명확히 볼 수 있습니다. 더 많은 정보를 원하시면 공식 문서를 방문해보세요.

낙관적 업데이트

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

상태를 낙관적으로 업데이트한 후 변경 사항을 수행하기 전에 뮤테이션이 실패할 수 있습니다. 이러한 실패 경우 대부분에서 낙관적 쿼리를 되돌릴 수 있는 재요청만으로 문제를 해결할 수 있습니다. 그러나 때로는, 재요청이 제대로 작동하지 않아 뮤테이션 오류가 서버 문제와 관련된 경우 낙관적 업데이트를 되돌리는 것이 더 나을 수 있습니다.

아래 예시를 확인해보세요. 사용자가 추가 버튼을 클릭하면 즉시 항목이 추가되고, 해당 작업의 프로미스가 성공적으로 처리되었는지 확인한 후 계속해서 추가됩니다. 반면 프로미스가 거부되면 요청이 반환된 후 자동으로 사라집니다. 이 강력한 기능이 좋은 사용자 경험을 제공할 수 있습니다.

```js
import { useMutation, useQuery } from "@tanstack/react-query";

let index = 3;
type Todo = {
  id: number,
  task: string,
};
const todos: Todo[] = [
  {
    id: 1,
    task: "사과 사기",
  },
  {
    id: 2,
    task: "바나나 사기",
  },
  {
    id: 3,
    task: "오렌지 사기",
  },
  {
    id: 4,
    task: "딸기 사기",
  },
];

export default function Home() {
  const { mutate, isPending, variables } = useMutation({
    mutationFn: async (newTodo: Todo) => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      todos.push(newTodo);
      index++;
    },
  });

  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: () => todos,
  });

  return (
    <div
      className="flex items-start justify-start min-h-screen 
                      py-2 mt-20 px-20 gap-8"
    >
      <button
        onClick={() => mutate({ id: index, task: `수박${index}` })}
        className="bg-purple-600 px-6 py-3 text-white"
      >
        추가
      </button>
      <ul>
        {data?.map((todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
        {isPending && <li className="opacity-50 text-white">{variables.task}</li>}
      </ul>
    </div>
  );
}
```

무한 스크롤링과 페이지네이션

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

위는 React Query를 사용한 무한 스크롤 및 페이지네이션 예제입니다. 곧 관련 블로그 글을 작성할 예정이니 함께 지켜봐 주세요.
