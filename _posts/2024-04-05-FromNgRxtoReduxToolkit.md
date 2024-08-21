---
title: "NgRx에서 Redux Toolkit으로 전환하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "From NgRx to Redux Toolkit"
link: "https://medium.com/@christian.tonye_16869/from-ngrx-to-redux-toolkit-60360b7f660"
isUpdated: true
---

## Ngrx Effects와 RTK query의 차이점

![이미지](/assets/img/FromNgRxtoReduxToolkit_0.png)

# 소개

약 한 해가 지났습니다 (이 글을 쓰기 시작한 지 꽤 오랜 시간이 지났죠 😅) 내가 리액트 앱에 착수한 이래. 앵귤러 출신이라서 그렇게 어렵지는 않았지만, 여전히 몇 가지 의문이 들기도 했어요. 폴더를 어떻게 구성해야 하지? 스타일링은 어떻게 해야 하나요? 리액트에서 번역을 위한 권장 라이브러리는 무엇인가요? 여기서 스토어를 어떻게 사용해야 할까요?

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

실제로 요즘 모든 모던 앱에는 액션을 보내고, 그것들을 상태에 저장하고, 다수의 컴포넌트 사이에서 공유하는 것이 필수적입니다. 이것이 우리의 기본이죠.

React 생태계에서는 Redux가 주요 역할을 하고, Angular 관점에서는 NgRx가 가장 인기 있는 도구입니다.

# 준비물

이 글에서는 일반적인 개요에 대해 다루지 않겠습니다. 그러나 백엔드 API에서 데이터를 저장하는 것에만 초점을 맞출 것입니다. 하지만 RTK 쿼리와 NgEffects의 차이에 대해 파헤치기 위해서는 Redux Toolkit과 NgRx 설치, 구성, 액션 목록을 알고 있어야 합니다. 제가 찾아본 다른 두 개의 꽤 괜찮은 글이, NgRx와 Redux Toolkit을 위한 이러한 부분을 다루고 있습니다.

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

# Ngrx with Effects

이미 NgRx에 익숙하시거나 위에서 언급한 기사를 읽으셨다면 좋으실 겁니다. NgEffects가 무엇인지 다시 상기시켜봅시다.

Effects는 NgRx의 스토어의 라이프사이클 프로세스로, 디스패치된 액션을 청취하고 가로채거나 서비스(백엔드 API)로부터 오는 데이터를 저장하기 위한 상호 작용을 트리거할 수 있습니다. 간단히 말해서 ngEffects는 액션의 이중 디스패치입니다.

지금 당신의 표정은 아마 무슨 말이죠?! 😵‍💫 ..... 설명해 드릴게요.

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

보통의 주기에서:

- 컴포넌트에서 액션을 발생시킵니다.
- 해당 액션은 리듀서에 의해 축소되어 상태를 변경합니다.
- 마지막으로 상태는 셀렉터를 통해 앱 전체에 전파됩니다.

NgEffects 주기에서:

- 첫 번째 액션이 직접적으로 리듀서가 아닌 이펙트 핸들러에서 받아옵니다.
- 이 사용자 정의 요소는 전달된 액션(매개변수와 함께)을 사용하고 서비스를 호출합니다.
- 대상 서비스는 백엔드로 REST 요청(예: GET 또는 기타)을 적용합니다. 우리의 경우, 영화 목록을 가져오는 GET이라고 가정해 봅시다.
- 이펙트 핸들러가 서비스로부터 결과를 받으면 해당 결과로 두 번째 액션을 발행할 수 있습니다.
- 두 번째 액션은 단순한 리듀서에 의해 수신되어 상태에 저장됩니다.
- 최종 값은 이제 셀렉터를 통해 하나 이상의 컴포넌트에서 사용할 수 있습니다.

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

지금까지 잘 따라왔나요? 걱정하지 마세요, 아래에 스키마가 있어요. 언제나 스케치를 보면 모든 것이 더 원할해져요 🙂

![FromNgRxtoReduxToolkit_1](/assets/img/FromNgRxtoReduxToolkit_1.png)

그래서 코드 베이스에서:

- 컴포넌트 어딘가에서 첫 번째 액션(영화 불러오기)의 디스패치에 대한 라인이 있어요.

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
//컴포넌트
this.store.dispatch({ type: "[Movies Page] Load Movies" });
```

2. 첫 번째 액션 로드 무비를 포착하여 데이터베이스를 가져오고 두 번째 액션 무비 로드 성공을 트리거하는 이펙트 핸들러

```js
//이펙트 클래스
loadMovies$ = createEffect(() =>
  this.actions$.pipe(
    ofType("[Movies Page] Load Movies"),
    exhaustMap(() =>
      this.moviesService.getAll().pipe(
        map((movies) => ({
          type: "[Movies API] Movies Loaded Success",
          payload: movies,
        })),
        catchError(() => EMPTY)
      )
    )
  )
);
```

3. 로드된 영화 목록을 상태로 줄이는 리듀서

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
// 리듀서
on(MoviesLoadedSuccess.movies, , (state, { movies }) => ({ ...state, movieList: movies}))
```

4. 영화 목록을 선택하는 선택기

```js
// 컴포넌트
this.movies = this.store.select(fromRoot.movielist);
```

자, 이제 NgEffects 프로세스에 익숙해졌으니 Redux toolkit과 RTK query에 대해 이야기해보겠습니다.

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

# RTK 쿼리

안녕하세요! 리액트에 들어가면서 백엔드에서 데이터를 가져오는 부분이 ngRx와 비슷할 것으로 예상했습니다.

그래서 동일한 예시를 살펴보겠습니다. 백엔드에서 영화 목록을 불러온다고 가정해봅시다.

- 첫 번째 단계는 액션을 트리거하는 것, ngRx처럼 영화를 로드하는 것이 맞나요?

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

- 네 할 수 있지만 노옵!!! “우선 쿼리인지 돌연변이인지 알아야 해”

- 뭐라고????

- 인터넷이 말해!!! 🤯

하하하하 제가 항상 영화 대본을 쓰는 게 꿈이었는데, 너무 못 쓰죠. 미안해.. 미안해.. 다시 집중합시다... 쿼리와 돌연변이.. 그 쿼리 또는 돌연변이 폭탄에 들어가기 전에, ‘썩은 것(덩어리)’들에 대해 알아야 해요.

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

## Thunks

지금 혼란스럽게 생각하는 것 같은데.. 뭔가요 뭔가? 제가 예전에 그랬어요.. 그래서 이거 쓰는 중이죠 🤓

Thunk는 백엔드 API에서 데이터를 가져오는 것과 같은 비동기 작업을 처리하는 데 도움이 되는 `createAsyncThunk`라는 내장된 미들웨어의 결과물입니다.

그래도 여전히 낯설어 보일테지만.. 코드 한 줄이 조금 도움이 될 거예요. 이것은 특정 영화 상점의 모든 영화를 가져오는 thunk입니다.

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
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movieAPI } from "./movieAPI";

// loadMovies라는 Thunk입니다!!
const loadMovies = createAsyncThunk("movies/load movies", async (movieStoreId: number, thunkAPI) => {
  const response = await movieAPI.fetchAll(movieStoreId);
  return response.data;
});
```

createAsyncThunk의 첫 번째 매개변수가 액션이고, 두 번째 매개변수가 서비스의 비동기 콜백인 것을 알 수 있습니다. 이것은 상태 내의 액션을 줄이는 것처럼 보입니다만.. 현재 리듀서는 비동기이며 서비스를 사용합니다. 여러분에게 뭔가를 떠올리게 하지 않나요??

```js
//effects 클래스
loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType('[Movies Page] Load Movies'),
    exhaustMap(() => this.moviesService.getAll()
```

NgEffects의 첫 번째 부분... 액션에 대한 필터링을 하고 나서 서비스를 통해 비동기 프로세스를 실행합니다.

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

여기서 가장 큰 차이점은 NgRx에서 효과를 작성하지만 RTK 쿼리에서 써넣(funks)을 작성하지 않는다는 것입니다. 이것은 내부적으로 처리됩니다. 대신 추상 수준 더 높은 쿼리 및 변이(mutations)를 작성하게 됩니다.

써넣(funks)는 비동기 호출의 실행 및 결과 처리를 가정할 수 있으며, 이것들은 직접 스토어 상태에서 줄어듭니다.

마지막으로, 이러한 처리 결과에는 3가지 다른 상태가 있습니다: 진행 중, 완료됨, 거부됨. 써넣(funks)에 대해 더 자세히 알아보세요.

## RTK 쿼리 Api

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

이제 thunk 전문가가 되었으니 😜 RTK query에서 Api에 대해 이야기해볼까요? 예를 들어, Api는 정의된 백엔드 요청의 모음입니다.

아래의 Api에서는 영화 모두 불러오기를 위한 쿼리와 영화의 조회수 설정을 위한 뮤테이션을 정의하고 있습니다.

```js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://movieApi.co/api/v2/' }),
  endpoints: (builder) => ({
    loadMovies: builder.query<Movies[], string>({
      query: (movieStoreId) => `movies/${movieStoreId}`,
    }),
    setNbrOfViews: builder.mutation<Movie, {views: number, movieId: number}>({
      query: (body) => ({
        method: 'POST',
        url: `movies/views`,
        body: body
      })

    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoadMoviesQuery, useSetNbrOfViews } = movieApi
```

RTK query에서 쿼리는 builder.query를 사용하여 정의하고, 뮤테이션은 builder.mutation으로 정의할 수 있습니다. 그럼 뮤테이션과 쿼리가 뭘까요? NgRx에서는 그 차이를 두지 않죠!!!

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

질문에 답이 있어요. 누가 트리거를 발생시키고 있는지요? 쿼리는 자체적으로 트리거되는 요청이고, 뮤테이션은 작업이 트리거됩니다. 🤯 걱정 마세요, 설명해드릴게요.

## 쿼리

자체 트리거란 무엇일까요? 컴포넌트가 일부 파라미터를 감시하더라도 어떠한 데이터를 자동으로 가져온다는 것을 의미합니다.

예시: 컴포넌트가 페이지 파라미터에서 제공된 영화 스토어 ID의 영화를 바로로드합니다.

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
const { movieStoreId } = useParams();
const { data: movies } = useLoadMoviesQuery(movieStoreId ?? skipToken);
```

## 변이(Mutations)

여기에, 호출을 발생시킬 버튼 클릭이 있습니다.

```js
const [setNbrOfViews] = useSetNbrOfViews();
const handleNbrOfViews = async (movieId: number, nbrOfViews: number) => {
  const movie = await setNbrOfViews({ movieId, nbrOfViews }).unwrap();
};
////
<Button onClick={() => handleNbrOfViews(1, 4)}>Set Nrb of views</Button>;
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

## NgRx와의 차이

그래서 이 둘 사이의 차이는 무엇일까요.

그렇죠, RTK 쿼리의 주된 차이점은 액션을 디스패치하는 것을 잊어버리고, 정답을 선택하는 것을 잊어버리고, 우리가 실제로 언급하지 않은 rxjs 연산자를 잊어버리는 것입니다. 순수 요청을 실행하고, 그 요청은 모든 것(매개변수, 상태, 오류, 응답)와 함께 스토어에 저장됩니다. 그동안 모든 데이터들은 앱 어디서든지 접근할 수 있습니다.

우리가 모든 것을 갖고 있을 수 있다면 상태에서 응답을 축소하는 이유는 무엇일까요? RTK 쿼리는 진정한 제공된 캐싱 도구입니다.

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

대체적으로, 전체적으로 말하자면 완전히 사실이 아니더라도, 우리는 NgRx (이펙트)는 백엔드에서 데이터를 가져오고 저장하는 과정의 모든 단계에서 더 손이 가는 프로세스라고 말할 수 있습니다. 한편 RTK Query는 훅을 통해 사용할 수 있는 종합적인 패키지라고 볼 수 있습니다.

![NgRx to RTK Query](/assets/img/FromNgRxtoReduxToolkit_2.png)

# 결론

여기까지입니다…. 두 프로세스에 대한 제 경험과 배운 점을 요약했습니다 😅. 이 글은 겉핥기 수준에 불과하니, 깊이 파고들기를 적극 권장합니다. 댓글을 남기거나 질문하거나, 잘못 알고 있는 부분이 있다면 지적해 주세요!! 가끔은 헛소리를 많이 할 수 있어요 😂
