---
title: "React에서 React Router 링크를 테스트하는 방법 초심자를 위한 안내"
description: ""
coverImage: "/assets/img/2024-05-14-HowtoTestaReactRouterLinkinReactABeginnersGuide_0.png"
date: 2024-05-14 10:15
ogImage: 
  url: /assets/img/2024-05-14-HowtoTestaReactRouterLinkinReactABeginnersGuide_0.png
tag: Tech
originalTitle: "How to Test a React Router Link in React: A Beginner’s Guide"
link: "https://medium.com/@hiraijaz956/how-to-test-a-react-router-link-in-react-a-beginners-guide-3b0ea3a8c67e"
---


안녕하세요! 유닛 테스트의 바다에 발을 담그기 시작하셨나요? 그렇다면 올바른 곳에 왔어요! 오늘은 React Router를 사용하는 React 애플리케이션에서 클릭 가능한 링크를 테스트하는 재미있는 시간을 갖도록 할 거예요. 재미있고 간단하게 진행하며 테스팅의 세계로 여행을 시작해보아요!

# 왜 네비게이션 링크를 테스트해야 하나요?

네비게이션 링크는 많은 웹 애플리케이션에서 사용자 상호작용의 중추입니다. 페이지를 새로고침하지 않고 사용자를 부드럽게 이동시키며, 이를 테스트하는 것이 사용자 경험의 연속성을 보장하는 데 중요합니다. 오늘은 이 링크들이 사용자를 목적지로 올바르게 안내하는지 확인하는 방법을 배우게 될 거예요.

# 코드: React Router 링크



작은 링크 컴포넌트를 작성해 보겠습니다. MagicDoor라고 부를게요. 보기에는 이렇습니다:

```js
// MagicDoor.js
import React from 'react';
import { Link } from 'react-router-dom';

function MagicDoor({ destinationId }) {
  return (
    <div>
      <Link to={{
        pathname: `/mystery-destination/${destinationId}`,
        state: { from: window.location.pathname }
      }}>
        목적지로 이동하기
      </Link>
    </div>
  );
}

export default MagicDoor;
```

이 컴포넌트에서 destinationId는 열고자 하는 목적지를 결정하는 고유한 키입니다. 상태(state)는 어디서 왔는지의 기억을 갖고 있어요.

# 테스트 시간: 제대로 열리나요?



자, 이제 MagicDoor가 예상대로 작동하는지 확인해 봅시다. 올바른 URL을 가지고 있는지 확인하고 클릭했을 때 어떻게 되는지 살펴봅시다:

```js
// MagicDoor.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import theme from 'core/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import MagicDoor from './MagicDoor';

describe('MagicDoor Component', () => {
  let store;
  beforeAll(() => {
    const mockStore = configureStore([]);
    store = mockStore({}); // 초기 상태
  });

  it('문 사용시 올바른 목적지로 이동해야 함', () => {
    const destinationId = '123';
    const destinationLink = `mystery-destination/${destinationId}`;
    render(
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <MagicDoor destinationId={destinationId} />
          </BrowserRouter>
        </MuiThemeProvider>
      </Provider>,
    );
    
    const door = screen.getByText('Step through to your destination');
    expect(door).toHaveAttribute('href', destinationLink);
    
    fireEvent.click(door);
    expect(window.location.pathname).toBe(destinationLink);
  });
});
```

# 방금 무엇을 했나요?

- 링크 찾기: getByText를 사용하여 텍스트에 따라 링크를 찾았습니다.
- URL 확인: 링크의 href 속성이 제공한 목적지와 일치하는지 확인했습니다.
- 클릭 시뮬레이션: fireEvent를 사용하여 클릭을 모방하고 올바른 URL이 열렸는지 확인했습니다.



# 왜 이겪소!

React Router로 테스트를 진행하면 앱의 내부 이동이 의도한 대로 작동하는지 확인할 수 있어 사용자 경험에서 중요합니다. 사용자 상호작용을 모방하고 결과 경로를 확인함으로써, 사용자가 정확히 이동할 위치를 확인합니다.

# 결론

이제 React Router를 사용하여 React 애플리케이션의 네비게이션 링크를 테스트할 견고한 방법을 갖게 되었습니다. 작성하는 모든 테스트는 더 신뢰할 수 있는 애플리케이션을 구축하는 데 도움이 되며, 네비게이션이 매끄럽고 올바르게 흘러가는 것을 확인합니다.



# 다음은 무엇인가요?

어플리케이션의 다른 유형의 상호작용을 위한 테스트를 추가해보는 것은 어떨까요? 모든 조각의 테스트는 연결되어 매끄럽고 버그가 없는 사용자 경험을 만들어냅니다. 여러분이 어떤 것들을 만들어내는지 댓글에서 제 경험을 공유해 주시면 정말로 좋겠어요!

기억하세요, 테스팅은 연습과 인내력으로 향상되는 기술입니다. 계속 하며 언젠가는 React 어플리케이션을 전문가처럼 테스트할 수 있게 될 거예요. 행복한 테스팅하세요!