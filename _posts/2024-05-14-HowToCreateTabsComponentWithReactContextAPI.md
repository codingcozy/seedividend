---
title: "React 와 Context API를 활용하여 탭 컴포넌트를 만드는 방법"
description: ""
coverImage: "/assets/img/2024-05-14-HowToCreateTabsComponentWithReactContextAPI_0.png"
date: 2024-05-14 10:28
ogImage: 
  url: /assets/img/2024-05-14-HowToCreateTabsComponentWithReactContextAPI_0.png
tag: Tech
originalTitle: "How To Create Tabs Component With React , Context API"
link: "https://medium.com/gitconnected/how-to-create-tabs-component-with-react-context-api-67839462aabc"
isUpdated: true
---




우리가 Medium Stats Chrome 확장 프로그램에서 사용 중인 동일한 탭 구성 요소입니다.

![탭 구성 요소 이미지](/assets/img/2024-05-14-HowToCreateTabsComponentWithReactContextAPI_0.png)

이 아이디어는 구성 요소 라이브러리나 서드파티 모듈 없이 재사용 가능한 컴포넌트를 만드는 것이었습니다.

# 단계 1 — 컨텍스트 생성



활성 탭의 인덱스는 컨텍스트에 저장되어야 합니다. 해당 인덱스 내에는 변경 함수도 저장됩니다. TabsContext.jsx 파일을 생성하세요.

```js
import React, { createContext, useState, useContext } from 'react';

const TabsContext = createContext({});

export const TabsProvider = ({ children, defaultIndex = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultIndex);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
};
```

TabsProvider와 가장 중요한 부분인 useTabs 훅이 준비되어 있습니다. 이를 사용하면 활성 인덱스에 액세스하고 탭을 변경할 수 있습니다.

# Step 2 — styles



우리는 Tailwind와 같은 스타일링 라이브러리를 사용하지 않아요. 마음대로 사용하셔도 돼요. 이 데모는 스타일에 구애받지 않아요. CSS 모듈을 사용할 거에요. styles.module.css 파일을 생성해주세요.

```js
.tabsList {
    display: flex;
    border-bottom: 1px solid #f2f2f2;
}

.tab {
    padding: 10px 15px;
    cursor: pointer;
    border: 1px solid #f2f2f2;
    background: #f2f2f26b;
    border-radius: 8px 8px 0 0;
    position: relative;
    top: 1px;
    color: #242424;
}

.activeTab {
    background: #fff;
    border-bottom: 1px solid #fff;
}

.tabPanel {
    padding: 10px;
    min-width: 750px;
}
```

# 단계 3 — 탭 컴포넌트

가장 중요한 부분 — 탭, 탭리스트, 탭 및 탭패널 컴포넌트를 만들 거에요. 모두 하나의 파일에 들어갈 거에요. 그들은 작아서 개발하기 편할 거에요 (개발자 경험). Tabs.jsx 파일을 생성해주세요.



```js
import { TabsProvider, useTabs } from './TabsContext.jsx';
import styles from './tabs.module.css';

export const Tabs = ({ children, defaultIndex }) => {
  return <TabsProvider defaultIndex={defaultIndex}>{children}</TabsProvider>;
};

export const TabList = ({ children }) => {
  return <div className={styles.tabsList}>{children}</div>;
};

export const Tab = ({ index, children }) => {
  const { activeTab, setActiveTab } = useTabs();
  return (
    <button className={`${styles.tab} ${activeTab === index ? styles.activeTab : ''}`} onClick={() => setActiveTab(index)}>
      {children}
    </button>
  );
};

export const TabPanel = ({ index, children }) => {
  const { activeTab } = useTabs();
  return activeTab === index ? <div className={styles.tabPanel}>{children}</div> : null;
};
```

Tabs — 탭 컨텍스트를 제공하는 빈 컨테이너입니다. 모든 하위 컴포넌트가 컨텍스트에 액세스할 수 있습니다.

TabList — 클릭할 탭 목록을 보여주는 컨테이너입니다. 스타일링을 위해서만 필요합니다.

Tab — 탭 자체입니다. 클릭할 수 있는 버튼뿐입니다. 활성 여부를 확인하고 클릭 이벤트를 처리하여 활성 탭을 변경합니다.




TabPanel — 탭의 내용.

# 단계 4 — 마지막 단계. 탭 컴포넌트 사용법

이제 필요한 곳이면 어디에서나 이 컴포넌트를 사용할 수 있습니다. 여기에 샘플이 있습니다.

```js
<Tabs>
    <TabList>
      <Tab index={0}>통계</Tab>
      <Tab index={1}>도구</Tab>
    </TabList>
    <TabPanel index={0}>내용 1</TabPanel>
    <TabPanel index={1}>내용 2</TabPanel>
</Tabs>
```



결과:

<img src="/assets/img/2024-05-14-HowToCreateTabsComponentWithReactContextAPI_1.png" />

코딩 재밌게 하세요!

## ✉️ 뉴스레터 구독은 여기에서 할 수 있어요.



또는

이전 이야기를 읽어보세요:

- 내가 처음으로 미디움에서 첫 100달러를 벌게 된 과정은? 💰💰💰