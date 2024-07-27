---
title: "Redux에서 Redux Toolkit으로 마이그레이션 3부작 시리즈"
description: ""
coverImage: "/assets/img/2024-06-22-MigratingfromReduxtoReduxToolkitAThree-PartSeries_0.png"
date: 2024-06-22 03:16
ogImage: 
  url: /assets/img/2024-06-22-MigratingfromReduxtoReduxToolkitAThree-PartSeries_0.png
tag: Tech
originalTitle: "Migrating from Redux to Redux Toolkit: A Three-Part Series"
link: "https://medium.com/gitconnected/migrating-from-redux-to-redux-toolkit-a-three-part-series-564b858de3fe"
---


## 파트 1: Redux 및 Typescript를 사용하여 애플리케이션 개발하기

![이미지](/assets/img/2024-06-22-MigratingfromReduxtoReduxToolkitAThree-PartSeries_0.png)

레거시 코드베이스를 React로 이관하는 것은 오래된 개발 방식에서 새로운 방식을 가르치는 것과 비슷합니다. 도전적이지만 보람이 있어요! 저희 애플리케이션 중 하나에서는 Redux Toolkit 없이 Redux를 사용하고 있는데, 이전 방식에 대한 리소스를 찾기는 바늘을 건삭하는 것과 같습니다. 대부분의 현대적인 앱은 이제 Redux Toolkit을 사용하며, 이것은 Redux가 공식적으로 추천하는 방식입니다.

이것이 Redux에서 Redux Toolkit으로 마이그레이션하는 가이드를 작성하게 된 계기예요. 앱에 세련된 업그레이드를 해주는 것으로 생각해보세요! 이 튜토리얼은 3부작 시리즈로 이루어져 있을 것입니다: 먼저 전통적인 Redux를 사용하여 앱을 구축한 다음, Redux Toolkit으로 메이크오버할 거예요.

<div class="content-ad"></div>

간단한 GitHub 프로필 찾기 애플리케이션을 만들어 보세요

![GitHub profile finder](/assets/img/2024-06-22-MigratingfromReduxtoReduxToolkitAThree-PartSeries_1.png)

이 애플리케이션에서는 팔로워 수가 1000을 초과하는 인기 있는 사용자 목록을 선별해 두었습니다. 코딩 세계에서는 인기가 중요하니까요! 코딩 영웅들을 찾아보고 'View Repos' 옵션으로 그들의 공개 저장소로 들어가 보세요. 또한 즐겨찾기한 즐겨찾기기능(데이터 표시 제외)이 있어 좋아하는 사용자를 즐겨찾기할 수 있습니다.

전제 조건

<div class="content-ad"></div>

React와 TypeScript에 대한 좋은 이해도가 있어야 하며, Redux와 Tailwind CSS의 기본 지식이 필요합니다.

GitHub에서 우리 React 앱의 기본 설정을 찾을 수 있습니다.

이 저장소에 대해:
이 저장소 내에서, Vite 빌드 도구를 사용하여 구축된 기본 React 애플리케이션을 발견할 수 있습니다. 타입 안전성을 위해 TypeScript를 활용하고, 디자인을 위해 Tailwind CSS를 사용할 것입니다.

이 애플리케이션에 필요한 라이브러리를 설치해 봅시다.

<div class="content-ad"></div>

저희는 인터넷 연결에 Axios를 사용하고 앱을 탐색하기 위해 React Router를 사용하며 물론 상태를 유지하기 위해 Redux를 사용할 것입니다. 이 라이브러리들을 설치해 봅시다!!

![이미지](/assets/img/2024-06-22-MigratingfromReduxtoReduxToolkitAThree-PartSeries_2.png)

폴더 구조

이 폴더 구조를 계속 사용할 것입니다. 함께 따라오고 싶다면 이 튜토리얼과 함께 feature/old-redux 브랜치를 확인해 주세요. 함께 여정을 즐길까요!

<div class="content-ad"></div>


![이미지](/assets/img/2024-06-22-MigratingfromReduxtoReduxToolkitAThree-PartSeries_3.png)

먼저, 쉬운 작업으로 시작해보죠 - API 요청 설정해보기.

'redux' 폴더 아래에 'services'라는 폴더를 만들고, 그 안에 'index.ts'라는 파일을 만들어봅시다.

이 파일에서는 네 가지 유용한 메소드를 사용하여 조금의 마법을 부릴 겁니다:


<div class="content-ad"></div>

- 'fetchTopUsersBySize': 상위 사용자 목록을 가져옵니다.
- 'fetchUserBySearch': 사용자를 검색합니다.
- 'fetchReposByUserName': 특정 사용자의 저장소를 검색합니다.
- 'fetchRepoBySearch': 이름으로 저장소를 검색합니다.

```js
import api from '../api';

export const fetchTopUsersBySize = async (size: number = 30) => {
  const response = await api.get(
    `/search/users?q=followers:>1000&sort=followers&order=desc&per_page=${size}`
  );
  return response.data;
};

export const fetchUserBySearch = async (text: string) => {
  const response = await api.get(`/search/users?q=${text}`);
  return response.data;
};

export const fetchReposByUserName = async (userName: string) => {
  const response = await api.get(
    `/users/${userName}/repos?sort=created&direction=desc`
  );
  return response.data;
};

export const fetchRepoBySearch = async (userName: string, text: string) => {
  const response = await api.get(
    `/search/repositories?q=user:${userName}+${text}`
  );
  return response.data;
};
```

주요 Redux 개념 요약

- Store: 애플리케이션 전체 상태를 보유하는 단일 진리의 소스입니다.
- Actions: 발생한 일을 설명하는 일반적인 자바스크립트 객체입니다.
- Reducers: 현재 상태와 동작을 인자로 받아 새로운 상태를 반환하는 순수 함수입니다.

<div class="content-ad"></div>

리덕스 폴더 구조

![이미지](/assets/img/2024-06-22-MigratingfromReduxtoReduxToolkitAThree-PartSeries_4.png)

내 폴더 구조에 대한 자세한 내용은 다루지 않겠습니다. 다양한 개발자들은 서로 다른 관점으로 폴더 구조를 설정하기 때문입니다. 내 GitHub 저장소를 참조하여 내 코드 구조와 누락된 사항이 무엇인지 확인해보세요.

가장 먼저, 우리 액션을 설정해봅시다.

<div class="content-ad"></div>

우리의 액션 유형을 설정해 봅시다! 액션 유형을 다양한 섹션으로 분할하여 깔끔하게 유지합니다.

- Action Types를 위한 Enum: UsersActionTypes라는 열거형을 정의하여 모든 액션 유형 상수를 포함시킵니다. 이렇게 하면 관리가 쉬워지고 오타를 방지할 수 있습니다.
- 액션 인터페이스: 각 액션 유형에 대한 인터페이스를 정의합니다.
- 액션을 위한 Union Types: 관련된 액션을 그룹화하기 위해 유니온 타입을 정의합니다.

```js
import { Users } from '../../types/usersTypes';

export enum UsersActionTypes {
  /** 사용자 가져오기 */
  FETCH_TOP_USERS_REQUEST = 'FETCH_TOP_USERS_REQUEST',
  FETCH_TOP_USERS_SUCCESS = 'FETCH_TOP_USERS_SUCCESS',
  FETCH_TOP_USERS_FAILURE = 'FETCH_TOP_USERS_FAILURE',

  /** 검색으로 사용자 가져오기 */
  FETCH_USERS_BY_SEARCH_REQUEST = 'FETCH_USERS_BY_SEARCH_REQUEST',
  FETCH_USERS_BY_SEARCH_SUCCESS = 'FETCH_USERS_BY_SEARCH_SUCCESS',
  FETCH_USERS_BY_SEARCH_FAILURE = 'FETCH_USERS_BY_SEARCH_FAILURE',

  /** 사용자 좋아요 옵션 전환 */
  TOGGLE_USER_LIKE = 'TOGGLE_USER_LIKE',
}

export interface FetchTopUsersRequestAction {
  type: typeof UsersActionTypes.FETCH_TOP_USERS_REQUEST;
}

export interface FetchTopUsersSuccessAction {
  type: typeof UsersActionTypes.FETCH_TOP_USERS_SUCCESS;
  payload: Users;
}

export interface FetchTopUsersFailureAction {
  type: typeof UsersActionTypes.FETCH_TOP_USERS_FAILURE;
  payload: string;
}

export interface FetchUsersBySearchRequestAction {
  type: typeof UsersActionTypes.FETCH_USERS_BY_SEARCH_REQUEST;
}

export interface FetchUsersBySearchSuccessAction {
  type: typeof UsersActionTypes.FETCH_USERS_BY_SEARCH_SUCCESS;
  payload: Users;
}

export interface FetchUsersBySearchFailureAction {
  type: typeof UsersActionTypes.FETCH_USERS_BY_SEARCH_FAILURE;
  payload: string;
}

export interface ToggleUserLikeAction {
  type: typeof UsersActionTypes.TOGGLE_USER_LIKE;
  payload: number;
}

export type FetchTopUsersActions =
  | FetchTopUsersRequestAction
  | FetchTopUsersSuccessAction
  | FetchTopUsersFailureAction;

export type FetchUsersBySearchActions =
  | FetchUsersBySearchRequestAction
  | FetchUsersBySearchSuccessAction
  | FetchUsersBySearchFailureAction;

export type UserActions =
  | FetchTopUsersActions
  | FetchUsersBySearchActions
  | ToggleUserLikeAction;
```

- FetchTopUsersRequestAction, FetchTopUsersSuccessAction, FetchTopUsersFailureAction: 상위 사용자 가져오기와 관련된 작업에 대한 인터페이스입니다. FETCH_TOP_USERS_SUCCESS에는 가져온 사용자 데이터가 포함된 Users 유형의 payload가 포함되어 있으며, FETCH_TOP_USERS_FAILURE에는 오류 메시지를 나타내는 문자열 유형의 payload가 포함되어 있습니다.
- FetchUsersBySearchRequestAction, FetchUsersBySearchSuccessAction, FetchUsersBySearchFailureAction: 검색으로 사용자를 가져오기 위한 유사한 인터페이스입니다.
- ToggleUserLikeAction: 좋아요 옵션을 전환하는 작업을 위한 인터페이스로, 사용자 ID를 나타내는 숫자 유형의 payload가 포함되어 있습니다.

<div class="content-ad"></div>

알림: 계속 진행하기 전에 redux-thunk를 설치해 봅시다.

![이미지](/assets/img/2024-06-22-MigratingfromReduxtoReduxToolkitAThree-PartSeries_5.png)

Redux Thunk는 액션 생성자가 액션 객체 대신 함수를 반환할 수 있게 해주는 미들웨어입니다. 이 함수는 비동기 작업을 수행하고 해당 작업이 완료되면 일반 동기 액션을 디스패치할 수 있습니다.

이제 우리의 액션 생성자와 thunk 함수를 준비해 봅시다. 이들은 데이터를 가져오고 필요한 액션을 디스패치하는 Redux 설정의 핵심 역할을 담당할 것입니다. 아래는 코드와 각 부분이 하는 역할에 대한 설명입니다.

<div class="content-ad"></div>

```js
import { Users } from '../../types/usersTypes';
import { fetchTopUsersBySize, fetchUserBySearch } from '../../services';
import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../../store';
import {
  FetchTopUsersRequestAction,
  UsersActionTypes,
  FetchTopUsersSuccessAction,
  FetchTopUsersFailureAction,
  FetchUsersBySearchRequestAction,
  FetchUsersBySearchSuccessAction,
  FetchUsersBySearchFailureAction,
  FetchTopUsersActions,
  FetchUsersBySearchActions,
  ToggleUserLikeAction,
} from './types';

// 액션 생성자
export const fetchTopUsersRequest = (): FetchTopUsersRequestAction => ({
  type: UsersActionTypes.FETCH_TOP_USERS_REQUEST,
});

export const fetchTopUsersSuccess = (
  users: Users
): FetchTopUsersSuccessAction => ({
  type: UsersActionTypes.FETCH_TOP_USERS_SUCCESS,
  payload: users,
});

export const fetchTopUsersFailure = (
  error: string
): FetchTopUsersFailureAction => ({
  type: UsersActionTypes.FETCH_TOP_USERS_FAILURE,
  payload: error,
});

export const fetchSearchUsersRequest = (): FetchUsersBySearchRequestAction => ({
  type: UsersActionTypes.FETCH_USERS_BY_SEARCH_REQUEST,
});

export const fetchSearchUsersSuccess = (
  users: Users
): FetchUsersBySearchSuccessAction => ({
  type: UsersActionTypes.FETCH_USERS_BY_SEARCH_SUCCESS,
  payload: users,
});

export const fetchSearchUsersFailure = (
  error: string
): FetchUsersBySearchFailureAction => ({
  type: UsersActionTypes.FETCH_USERS_BY_SEARCH_FAILURE,
  payload: error,
});

export const toogleUserLike = (userId: number): ToggleUserLikeAction => ({
  type: UsersActionTypes.TOGGLE_USER_LIKE,
  payload: userId,
});

// Thunk 함수
export const getTopUsersBySize =
  (
    size: number = 30
  ): ThunkAction<void, ApplicationState, unknown, FetchTopUsersActions> =>
  async (dispatch) => {
    dispatch(fetchTopUsersRequest());
    try {
      const users = await fetchTopUsersBySize(size);
      dispatch(fetchTopUsersSuccess(users));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(fetchTopUsersFailure(error.message));
      } else {
        dispatch(fetchTopUsersFailure('Oops something went wrong!!!'));
      }
    }
  };

export const getUsersBySearch =
  (
    userName: string
  ): ThunkAction<void, ApplicationState, unknown, FetchUsersBySearchActions> =>
  async (dispatch) => {
    dispatch(fetchSearchUsersRequest());
    try {
      const users = await fetchUserBySearch(userName);
      dispatch(fetchSearchUsersSuccess(users));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(fetchSearchUsersFailure(error.message));
      } else {
        dispatch(fetchSearchUsersFailure('Oops something went wrong!!!'));
      }
    }
  };
```

참고: ' ApplicationState '를 ‘../../store’에서 가져오는 것은 오류를 발생시킵니다. 하지만 걱정하지 마세요. 코드를 설정할 때 이를 수정할 것입니다.

- 액션 생성자: Redux 스토어에 보내는 액션을 생성하는 함수들입니다.

- fetchTopUsersRequest, fetchTopUsersSuccess, 그리고 fetchTopUsersFailure: 이러한 함수들은 상위 사용자를 가져오는 과정의 다른 단계(요청, 성공, 실패)을 위한 액션을 생성합니다.
- fetchSearchUsersRequest, fetchSearchUsersSuccess, 그리고 fetchSearchUsersFailure: 검색을 통해 사용자를 가져오기 위한 유사한 함수들입니다.
- toggleUserLike: 사용자의 좋아요 상태를 전환하는 액션을 생성합니다.

<div class="content-ad"></div>

2. Thunk 함수: 이는 비동기 작업을 처리하고 결과에 따라 액션을 디스패치하는 함수들입니다.

- getTopUsersBySize: 이 Thunk 함수는 특정 크기를 기반으로 상위 사용자들을 가져옵니다. 먼저 요청이 시작되었음을 나타내기 위해 fetchTopUsersRequest를 디스패치합니다. 그런 다음 fetchTopUsersBySize를 사용하여 사용자를 가져오려고 시도합니다. 성공하면 가져온 사용자와 함께 fetchTopUsersSuccess를 디스패치하고 오류가 발생하면 오류 메시지와 함께 fetchTopUsersFailure를 디스패치합니다.
- getUsersBySearch: getTopUsersBySize와 유사하게,이 Thunk 함수는 검색어를 기반으로 사용자를 가져오는 작업을 처리합니다. 시작을 나타내기 위해 fetchSearchUsersRequest를 디스패치 한 후 fetchUserBySearch를 사용하여 사용자를 가져오려고 시도합니다. 성공하면 사용자와 함께 fetchSearchUsersSuccess를 디스패치하고 실패하면 오류 메시지와 함께 fetchSearchUsersFailure를 디스패치합니다.

이러한 액션 생성자 및 Thunk 함수는 Redux 애플리케이션에서 데이터를 가져오고 상태 전환이 관리되는 논리를 처리하는 데 중요합니다. 이러한 방식으로 액션과 액션 유형을 구성함으로써 Redux 설정에서 다양한 사용자 관련 작업을 처리하기 위한 명확하고 관리 가능한 구조를 만들 수 있습니다. 이러한 구조가 갖춰지면 리듀서를 설정하여 이러한 작업을 처리하러 진행할 수 있습니다.

다음으로 리듀서를 설정해 봅시다. 여기서 상태 관리가 게임을 시작합니다.

<div class="content-ad"></div>

이 코드 조각은 애플리케이션의 상태가 Redux 스토어에 전달된 다양한 액션에 대한 응답으로 어떻게 업데이트되는지를 정의하기 때문에 중요합니다. 각 부분이 무엇을 하는지 살펴보겠습니다.

```js
import {
  UserActions,
  UsersActionTypes,
  FetchTopUsersSuccessAction,
  FetchTopUsersFailureAction,
  ToggleUserLikeAction,
} from '../actions/users/types';
import { Users } from '../types/usersTypes';

interface UsersState {
  loading: boolean;
  users: Users | null;
  error: string | null;
}

const initialState: UsersState = {
  loading: false,
  users: null,
  error: null,
};

export const usersReducer = (
  state = initialState,
  action: UserActions
): UsersState => {
  switch (action.type) {
    case UsersActionTypes.FETCH_TOP_USERS_REQUEST:
    case UsersActionTypes.FETCH_USERS_BY_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UsersActionTypes.FETCH_TOP_USERS_SUCCESS:
    case UsersActionTypes.FETCH_USERS_BY_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        users: (action as FetchTopUsersSuccessAction).payload,
        error: null,
      };
    case UsersActionTypes.FETCH_TOP_USERS_FAILURE:
    case UsersActionTypes.FETCH_USERS_BY_SEARCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: (action as FetchTopUsersFailureAction).payload,
      };

    case UsersActionTypes.TOGGLE_USER_LIKE: {
      const userId = (action as ToggleUserLikeAction).payload;
      if (!state.users) {
        return state; // 사용자 데이터가 null인 경우 상태를 그대로 반환합니다.
      }
      const updatedUsers = state.users.items.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            isLiked: !user.isLiked, // 좋아하는 속성을 토글합니다.
          };
        }
        return user;
      });
      return {
        ...state,
        users: {
          ...state.users,
          items: updatedUsers,
        },
      };
    }
    default:
      return state;
  }
};
```

- 상태 인터페이스 및 초기값:

- UsersState: 사용자의 Redux 상태의 모양을 정의하며, 데이터가 검색 중인지를 나타내는 loading, 사용자 데이터를 보유하거나 아직 검색되지 않은 경우 null 또는 오류 메시지를 저장하는 error를 포함합니다.
- initialState: 기본값으로 UsersState를 초기화합니다.

<div class="content-ad"></div>

2. Reducer Function:

- usersReducer: 이 함수는 디스패치된 액션에 기반하여 상태 업데이트를 처리합니다. 상태와 액션을 매개변수로 받습니다.
- switch 문: action.type을 평가하여 상태를 업데이트하는 방법을 결정합니다.
- FETCH_TOP_USERS_REQUEST 및 FETCH_USERS_BY_SEARCH_REQUEST: loading을 true로 설정하고 기존 오류를 지웁니다.
- FETCH_TOP_USERS_SUCCESS 및 FETCH_USERS_BY_SEARCH_SUCCESS: payload에서 가져온 사용자 데이터로 상태를 업데이트하고 loading을 false로 설정합니다.
- FETCH_TOP_USERS_FAILURE 및 FETCH_USERS_BY_SEARCH_FAILURE: payload에서 가져온 오류 메시지로 상태를 업데이트하고 loading을 false로 설정합니다.
- TOGGLE_USER_LIKE: userId로 식별된 사용자의 isLiked 속성을 토글합니다. 상태.users.items를 매핑하여 사용자를 찾고 isLiked를 토글한 후 새 배열인 updatedUsers를 반환합니다. 마지막으로 updatedUsers로 상태를 업데이트합니다. 왜 이렇게 많이 빙빙 돌까요? 상태는 불변이기 때문에 새 복사본을 만들어야 합니다.

3. Default case: 액션 유형이 어떤 케이스와도 일치하지 않으면 상태를 그대로 반환합니다.

이 리듀서는 우리 상태의 내비게이터 역할을 합니다.

<div class="content-ad"></div>

루트 리듀서를 만들어 봅시다. combineReducers를 사용하여 rootReducer를 생성합니다. combineReducers를 사용하면 Redux 상태의 관리를 간단하게 만들 수 있습니다. 이를 통해 상태 관리 로직을 분리하여 전문화된 리듀서로 분할할 수 있습니다. 우리의 리듀서를 하나의 rootReducer로 결합함으로써, Redux 스토어가 애플리케이션의 다른 부분의 상태를 조직적이고 확장 가능한 방식으로 관리할 수 있도록 합니다.

```js
import { combineReducers } from 'redux';
import { usersReducer } from './userReducer';

// Combine Reducers
const rootReducer = combineReducers({
  users: usersReducer,
});

// export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
```

이제 우리의 액션과 리듀서가 원활하게 함께 작동하고 있으니, Redux 상태의 기반인 스토어를 구축할 시간입니다!

다음으로, 스토어 설정에 대해 자세히 알아보겠습니다.

<div class="content-ad"></div>

하지만 그 전에 애플리케이션에서 사용할 액션 유형을 내보내보겠습니다.

```js
import { UserActions } from '../actions/users/types';

export type AppActionTypes = UserActions;
```

여기는 Redux 스토어를 설정하는 코드입니다. 이곳에서 모든 마법이 일어납니다.

```js
import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from 'redux';
import { thunk, ThunkDispatch } from 'redux-thunk';
import rootReducer from '../reducers';
import { AppActionTypes } from '../types/types';
import loggingMiddleware from '../middlewares/logging';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// 미들웨어 배열 정의
const middleware = [thunk, loggingMiddleware];

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(applyMiddleware(...middleware))
);

export type ApplicationState = ReturnType<typeof rootReducer>;
export type ApplicationDispatch = ThunkDispatch<
  ApplicationState,
  unknown,
  AppActionTypes
>;
```

<div class="content-ad"></div>

- 창 선언: 우리는 Redux DevTools Extension과 호환되는 저장소를 만들기 위한 전역 인터페이스를 선언하여, 둘 사이의 원활한 통신을 보장합니다.
- 미들웨어 설정: 우리는 미들웨어 팀을 구성하며 thunk와 loggingMiddleware을 포함시켜, 비동기 작업 및 로깅 활동과 같은 작업을 처리할 준비를 합니다.
- Enhancers 조합: 이 함수는 미들웨어를 결합하고 저장소를 향상시키는 조합자를 만들어서, 모든 것이 원활하게 동작하도록 합니다. Redux DevTools Extension과 통합되며, 보기 좋은 저장소가 되도록 세심하게 조정됩니다!
- 저장소 생성: createStore를 사용하여 Redux 저장소를 만들어냅니다. rootReducer를 취하여 상태를 관리하며, 초기 상태로 undefined를 사용하며, 작업 및 상태 변경을 효과적으로 관리하기 위해 미들웨어를 적용합니다.
- 타입 정의: 마지막으로 rootReducer가 관리하는 Redux 상태의 유형으로 ApplicationState를 정의하고, 디스패치 함수의 유형으로 ApplicationDispatch를 정의하여 Redux 여행 중에 타입 안전성을 보장합니다.

```js
import { Middleware } from 'redux';
import { ApplicationState } from '../store';

const loggingMiddleware: Middleware<object, ApplicationState> =
  (store) => (next) => (action) => {
    // 액션을 기록합니다.
    console.log('Action:', action);

    // 액션이 전달되기 전의 현재 상태를 가져옵니다.
    const prevState = store.getState();

    // 액션을 실행합니다.
    const result = next(action);

    // 액션이 전달된 후의 상태를 가져옵니다.
    const nextState = store.getState();

    // 상태 변경 사항을 기록합니다.
    console.log('이전 상태:', prevState);
    console.log('다음 상태:', nextState);

    return result;
  };

export default loggingMiddleware;
```

저장소가 설정되어 있으므로, Redux 상태 관리는 응용 프로그램의 복잡성을 처리할 준비가 되어 있습니다. 이제, 페이지를 구축하기 전에, 우리 전체 응용 프로그램을 `Provider store='store'`로 감싸봅시다. 이렇게 하면 Redux 저장소가 구성 요소 트리의 모든 구성 요소에서 사용할 수 있게 됩니다. store는 Redux 저장소의 인스턴스를 나타내는 속성으로 전달되며, 저장소는 여러분의 Redux 저장소 인스턴스를 나타냅니다.

<div class="content-ad"></div>

메인.tsx 파일에 이 코드를 추가해주세요.

```js
<Provider store={store}>
      <div className="min-h-screen flex  justify-center bg-gray-100">
        <div class="w-full max-w-screen-lg m-4 p-4 bg-white rounded shadow-md">
          <h1 className="text-4xl font-bold text-blue-900 mb-4 tracking-wider uppercase">
            GitHub Finder
          </h1>
          <RouterProvider router={router} />
        </div>
      </div>
    </Provider>
```

이 글이 조금 무거워지고 있는 것 같지만, Redux 상태 관리를 설정하는 데에는 약간의 노력이 필요합니다. 그게 바로 Redux Toolkit이라는 것을 만들었기 때문이죠. 다음 시리즈에서 이에 대해 다룰 예정입니다. 이제 내가 당신의 신뢰를 되찾았길 바라며, 어플리케이션에 대해 살펴봐요!

useSelector와 useDispatch 훅

<div class="content-ad"></div>

React Redux에서 useSelector 및 useDispatch 훅을 사용하면 컴포넌트가 Redux 스토어와 상호작용하는 방법이 간소화됩니다.

useSelector: 이 훅을 사용하면 컴포넌트가 Redux 상태의 특정 슬라이스를 선택할 수 있어 데이터 접근을 최적화하고 불필요한 렌더링을 최소화할 수 있습니다.

useDispatch: 액션을 디스패치하는 데 사용되며, useDispatch를 사용하면 컴포넌트가 상태 변경을 트리거하고 응용 프로그램 내에서 비동기 작업을 관리할 수 있습니다.

우리 애플리케이션에서 useSelector 훅을 사용하는 것은 다음과 같이 보입니다:

<div class="content-ad"></div>

```js
const state = useSelector((state:ApplicationState) => state.users);
```

매번 ApplicationState를 import하는 것은 조금 귀찮을 수 있습니다. 그래서 대신 전체 애플리케이션에서 사용할 수 있는 사용자 정의 훅을 만드는 것을 선호합니다. 제 사용자 정의 훅은 이렇게 생겼어요:

```js
export const useAppSelector: TypedUseSelectorHook<ApplicationState> =
  useSelector;
```

코드에서 단축키를 만드는 것과 비슷한데요 — 누가 코딩에서 단축키를 좋아하지 않겠어요? 😉


<div class="content-ad"></div>

비슷하게, 우리 애플리케이션에서 useDispatch 훅을 사용하는 것은 다음과 같습니다:

```js
const dispatch = useDispatch<ApplicationDispatch>();
```

또한, 반복적으로 ApplicationDispatch를 다루는 것은 번거로울 수 있습니다. 그래서 여기 내가 만든 커스텀 훅이 어떻게 단순화시키는지 알아봅시다:

```js
export const useAppDispatch: () => ApplicationDispatch = useDispatch;
```

<div class="content-ad"></div>

우리가 사용자 정의 훅을 사용할 수 있게 되었으니, 이제 사용자 목록 페이지 구축에 집중해 보겠습니다. Redux 상태에 접근하기 위한 useAppSelector 및 액션을 디스패치하기 위한 useAppDispatch를 사용하여 원활한 사용자 경험을 만들 준비가 되었습니다. 시작해 봅시다!

```js
import React, { useEffect } from 'react';
import SearchBox from '../components/SearchBox';
import {
  getTopUsersBySize,
  getUsersBySearch,
  toggleUserLike,
} from '../redux/actions/users/actions';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import LikeButton from '../components/LikeButton';

const Home: React.FC = () => {
  const { loading, users, error } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const handleSearch = (query: string) => {
    if (query) {
      dispatch(getUsersBySearch(query));
    } else {
      dispatch(getTopUsersBySize());
    }
  };
  useEffect(() => {
    dispatch(getTopUsersBySize());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4 flex flex-col">
      <div className="flex justify-center mb-6">
        <div className="w-2/3">
          <SearchBox placeholder="Search user..." onSearch={handleSearch} />
        </div>
      </div>
      <hr />
      <h2 className="text-2xl text-blue-700 font-bold my-4">
        Users - {users?.total_count}
      </h2>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error message={error} />
      ) : (
        <div
          className="flex-grow  overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 300px)' }}
        >
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {users?.items.map((user) => (
              <li
                key={user.login}
                className="flex items-center space-x-4 p-4 bg-white rounded shadow hover:shadow-lg transition-shadow"
              >
                <img
                  src={user.avatar_url}
                  alt={`${user.login} avatar`}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-lg text-blue-950 font-medium">
                    {user.login}
                  </span>
                  <div className="flex gap-2">
                    <NavLink
                      className="underline underline-offset-2 text-orange-500 hover:text-orange-600"
                      to={`/${user.login}/repos`}
                    >
                      View repos
                    </NavLink>
                    <div>
                      <LikeButton
                        liked={!!user.isLiked}
                        toggleLike={() => dispatch(toggleUserLike(user.id))}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
```

- 상태 관리: useAppSelector 훅을 사용하여 Redux 상태에 접근하고, 특히 로딩 상태 (loading), 사용자 데이터 (users), 오류 메시지 (error)가 포함된 state.users에 접근합니다.
- 디스패치 함수: useAppDispatch는 디스패치 함수 dispatch를 얻기 위해 사용되며, 컴포넌트가 getTopUsersBySize, getUsersBySearch, toggleUserLike와 같은 액션을 디스패치할 수 있도록 합니다.

더 많은 라우팅 코드는 제 저장소에서 확인하실 수 있습니다



<div class="content-ad"></div>

지금 애플리케이션을 실행하면, 위대한 사용자 목록 페이지가 나타납니다! 축하해요, 성공했어요! 🎉 이 코드를 자유롭게 조작하고 도전하여 자체 Repository 페이지를 구현해 보세요. 그리고 기억하세요, 올바른 방향으로 가는 데 조금의 도움이 필요하다면, 우리의 저장소가 도와드릴 준비가 되어 있어요. 지금 바로 들어가서 새로 만든 것을 탐험해 보세요!

제가 긴 글을 썼다는 것을 알고 있어요, 전통적인 Redux 애플리케이션을 설치하는 것은 실제로 시간이 걸릴 수 있습니다 — 이렇게 강력한 라이브러리조차 비판에 직면하기도 했죠. 하지만 걱정하지 마세요! Redux 팀은 이 피드백을 즐겁게 받아들이고 이러한 문제점을 해결하는 주요 업데이트인 Redux Toolkit을 소개했어요. 마치 Redux가 새 옷을 입고 다시 사랑에 빠지는 것 같아요!

당신의 애플리케이션을 Redux Toolkit으로 마이그레이션하는 방법이 궁금하신가요? 계속 주목해 주세요. 더 간단하고 즐거운 상태 관리를 위한 건박스 스!!

코딩 즐기세요!!!