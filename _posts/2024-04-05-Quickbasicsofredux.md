---
title: "리덕스의 기본 사항을 빠르게 알아보자"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Quick basics of redux"
link: "https://medium.com/@devi.u/quick-basics-of-redux-acd2ec20a709"
---



React -Ui 라이브러리
Redux -상태 관리 라이브러리
react-redux - React와 Redux를 함께 사용할 수 있게 하는 라이브러리

Redux의 3가지 핵심 개념

1. Store → 애플리케이션의 상태를 보유
2. Action → 애플리케이션 상태의 변경을 설명
3. Reducer → 액션에 따라 상태 전환을 수행

3가지 원칙:

1. 전체 애플리케이션의 상태는 단일 저장소 내 객체 트리에 저장된다.
2. 상태를 변경하는 유일한 방법은 액션을 발행하는 것으로, 일어난 일을 설명하는 객체(앱의 상태를 업데이트하려면 리덕스에 액션 내에서 알려줘야 하며, 상태 객체를 직접 업데이트하는 것은 허용되지 않음).
3. 액션에 의해 변환된 상태 트리를 지정하려면 순수 리듀서를 작성하세요.

<div class="content-ad"></div>

리듀서 (가게주인)

```javascript
const reducer = (state, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        numOfCakes: state.numOfCakes - 1,
      };
  }
};
```

액션 == 애플리케이션이 상태와 상호작용하는 유일한 방법입니다. 앱에서 리덕스 스토어로 일반 자바스크립트 객체를 전달하는 데 사용됩니다.

리듀서 : 상태와 액션을 매개변수로받아 애플리케이션의 다음 상태를 반환하는 함수입니다.

<div class="content-ad"></div>

# 리덕스 스토어 :

- 전체 애플리케이션을 위한 하나의 스토어

**책임**:

- 애플리케이션 상태 보유
- getState()를 통해 상태에 액세스 허용
- dispatch(액션)을 통해 상태 업데이트 허용
- subscribe(리스너)를 통해 리스너 등록
- subscribe(리스너)로 반환된 함수를 통해 리스너 등록 해제

**Action Creator**:

- 객체를 반환하는 함수
