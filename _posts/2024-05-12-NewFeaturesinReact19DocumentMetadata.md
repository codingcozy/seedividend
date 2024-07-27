---
title: "React 19의 새로운 기능 - 문서 메타데이터"
description: ""
coverImage: "/assets/img/2024-05-12-NewFeaturesinReact19DocumentMetadata_0.png"
date: 2024-05-12 21:40
ogImage: 
  url: /assets/img/2024-05-12-NewFeaturesinReact19DocumentMetadata_0.png
tag: Tech
originalTitle: "New Features in React 19 — Document Metadata"
link: "https://medium.com/@vageeshawihangi/new-features-in-react-19-document-metadata-176db0733766"
---


🚀 React 19에서 SEO 및 접근성 향상하기 🌟

![React 19 새로운 기능 문서 메타데이터](/assets/img/2024-05-12-NewFeaturesinReact19DocumentMetadata_0.png)

안녕하세요, 개발자 여러분! 웹 개발에서 매우 중요한 주제를 이야기해보려고 해요: SEO 최적화와 접근성 보장하기입니다. "제목," "메타 태그," "설명"과 같은 요소들은 이러한 목표를 달성하는 데 중요한 역할을 합니다. 그러나 React에서는 특히 싱글 페이지 애플리케이션에서 이러한 요소들을 관리하는 것이 조금 어려울 수 있어요.

React SEO 최적화에서의 어려움:



요즘 개발자들은 자체 코드를 작성하거나 리액트 헬멧과 같은 패키지를 활용하여 경로 변경을 처리하고 메타 데이터를 업데이트하는 일에 자주 마주합니다. 그러나 이 과정은 메타 태그와 같은 SEO에 민감한 요소들을 다룰 때 반복적이고 오류를 범하기 쉽습니다.

리액트 19 이전:

이전에, 개발자들은 이러한 요소를 업데이트하기 위해 자체 코드를 작성해야 했습니다. 예를 들어, 다음 코드 조각을 살펴보세요:

```js
import React, { useEffect } from 'react';

const HeadDocument = ({ title }) => {
  useEffect(() => {
    document.title = title;

    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute('content', '새로운 설명');
    }
  }, [title]);

  return null;
};

export default HeadDocument;
```



위의 코드에서는 프롭에 따라 제목과 메타 태그를 업데이트하는 HeadDocument 컴포넌트가 있습니다. 우리는 이를 useEffect 훅에서 업데이트합니다. 또한 JavaScript를 사용하여 제목과 메타 태그를 업데이트합니다. 이 컴포넌트는 경로 변경시 업데이트됩니다. 이는 이 작업을 수행하는 깔끔한 방법은 아닙니다.

이 접근 방식으로는 작동하지만 React에서 SEO 요소를 관리하는 가장 깔끔한 방법은 아닙니다.

React 19부터:

React 19에서는 SEO 요소를 관리하는 것이 훨씬 간단하고 직관적으로 되었습니다. 이제 React 컴포넌트에서 직접 제목과 메타 태그를 사용할 수 있습니다. 아래와 같이요:



```js
const HomePage = () => {
  return (
    <>
      <title>Freecodecamp</title>
      <meta name="description" content="Freecode camp blogs" />
      {/* 페이지 콘텐츠 */}
    </>
  );
}
```

React 19 이전에는 React 컴포넌트에서 SEO 요소를 직접 사용할 수 없었습니다. 이제 React 19부터는 react-helmet과 같은 외부 패키지에 의존하지 않고 React 애플리케이션의 SEO 요소를 쉽게 관리할 수 있게 되었습니다.

결론:

React 19의 개선된 기능을 통해 컴포넌트 내에서 SEO 요소를 직접 관리할 수 있게 되어 React 애플리케이션의 SEO 최적화와 접근성 향상을 더욱 간편하게 할 수 있습니다. 더 많은 업데이트를 기대해 주시고 즐거운 코딩되세요! 👩‍💻👨‍💻




관련 링크:

- React 19의 새로운 기능

- React 19의 새로운 기능 — React 컴파일러

- React 19의 새로운 기능 — 서버 컴포넌트



React 19의 새로운 기능들 — 액션

React 19의 새로운 기능들 — 웹 컴포넌트

React 19의 새로운 기능들 — 자산 로딩

React 19의 새로운 기능들 — 새로운 React Hooks