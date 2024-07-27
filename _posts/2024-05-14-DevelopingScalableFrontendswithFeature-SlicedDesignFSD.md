---
title: "살려나가는 프론트엔드 기능별 디자인 FSD으로 확장 가능한 프론트엔드 개발하기"
description: ""
coverImage: "/assets/img/2024-05-14-DevelopingScalableFrontendswithFeature-SlicedDesignFSD_0.png"
date: 2024-05-14 12:40
ogImage: 
  url: /assets/img/2024-05-14-DevelopingScalableFrontendswithFeature-SlicedDesignFSD_0.png
tag: Tech
originalTitle: "Developing Scalable Frontends with Feature-Sliced Design (FSD)"
link: "https://medium.com/bitsrc/developing-frontends-with-feature-sliced-design-a2e5aa33d02c"
---


## Feature-Sliced Design과 Bit를 활용한 현대 프런트엔드 구축

대규모 프런트엔드 앱을 작업해보셨다면, 프로젝트를 이해하기 어려운 상황에 직면했을 가능성이 높습니다.

프로젝트 전체에 흩어진 파일 및 컴포넌트들이 서로 의존하는 상황이 발생하여 유지보수가 매우 복잡해지곤 했을 것입니다!

따라서 이러한 문제를 방지하기 위해 프런트엔드 앱을 구성하는 최상의 방법을 보여주는 규칙과 규칙의 집합이 필요할 것입니다. 그리고 그것이 바로 Feature-Sliced Design이 하는 역할입니다.



# 피처 슬라이스 디자인이란 무엇인가요?

피처 슬라이스 디자인은 프론트엔드 아키텍처 패턴으로, 프론트엔드 앱을 구축하는 데 사용됩니다. 간단히 말해, 코드를 구성하는 규칙과 관례의 컴필레이션이라고 할 수 있습니다.

프론트엔드 애플리케이션을 세 가지 구성 요소로 분해하여 이 작업을 수행합니다:

피처 슬라이스 디자인으로 개발 중이라면, 당신의 앱은 이 세 가지 구성 요소, 즉 레이어(Layers), 슬라이스(Slices), 그리고 세그먼트(Segments)로 구성될 것입니다.



- 레이어: 모든 프로젝트에서 표준화된 레이어는 수직으로 배치됩니다. 이는 통신이 위에서 아래로 이루어질 수 있음을 의미합니다. 예를 들어, Pages 레이어는 Widgets 레이어와 통신할 수 있지만 그 반대는 불가능합니다. 또한, 앱은 최대 6개의 레이어를 가질 수 있습니다:
- shared — 프로젝트/비즈니스의 특정 내용에서 분리되어 재사용 가능한 기능입니다. (예: UIKit, 라이브러리, API)
- entities — 비즈니스 엔티티입니다. (예: 사용자, 제품, 주문)
- features — 사용자 상호작용, 사용자에게 비즈니스 가치를 제공하는 작업입니다. (예: SendComment, AddToCart, UsersSearch)
- widgets — 엔티티와 기능을 의미 있는 블록으로 결합하는 구성 레이어입니다. (예: IssuesList, UserProfile)
- pages — 엔티티, 기능 및 위젯을 사용하여 전체 페이지를 구성하는 구성 레이어입니다.
- app — 앱 전체의 설정, 스타일 및 제공자입니다.
- Slices: 각 레이어는 슬라이스로 구성됩니다. 이러한 슬라이스는 비즈니스 도메인을 기반으로 코드를 분할합니다. 이는 코드를 탐색하기 쉽도록 만들고 논리적으로 관련된 모듈을 가깝게 유지합니다. 그러나 기억해야 할 중요한 점은 슬라이스는 동일한 레이어 내의 슬라이스와 통신할 수 없으며 아래 레이어만 통신할 수 있다는 것입니다.
- Segments: 각 슬라이스는 세그먼트로 구성됩니다. 세그먼트는 기술적 용도를 기준으로 슬라이스 내에서 코드를 분리하는 작은 모듈입니다. 예를 들어, UI, API, lib과 같은 다른 기술적 용도로 다른 세그먼트를 가질 수 있습니다.

이러한 방식으로 코드를 구조화하면 다음과 같은 요소를 소개할 수 있습니다:

- 통일성: 프론트엔드 앱은 이제 레이어, 슬라이스 및 세그먼트에 따라 준수해야 하는 정의된 표준 규칙을 갖게 됩니다.
- 도메인 주도: 앱은 기술 중심보다 비즈니스 중심으로 구성됩니다. 이를 통해 프로젝트를 더 쉽게 탐색하고 기능을 더 깊이 이해할 수 있습니다.
- 유지보수성 향상: 모듈이 동일한 레이어 내의 모듈이나 상위 레이어와 통신할 수 없기 때문에 리팩토링 후 앱이 쉽게 고장나지 않습니다.

# 기능 구분 디자인을 사용해야 할까요?



지금 보면, 특성 슬라이스 디자인을 프론트앤드 앱에 구현하는 데 상당한 노력이 필요하다는 것이 분명하게 드러납니다. 이것은 처음부터 시작하던지, 이전으로 마이그레이션하던지 관계없이 해당됩니다.

따라서 특성 슬라이스 디자인이 모두에게 적합한 것은 아니라는 것을 이해하는 것이 중요합니다. 사실, 저는 다음과 같은 상황에서 특성 슬라이스 디자인을 사용하길 권장합니다:

- 프론트엔드 앱을 구축 중이십니다. 백엔드 응용 프로그램을 특성 슬라이스 디자인으로 모델링하려고 하지 마십시오.
- 사용자를 위한 애플리케이션을 구축 중이며 UI 라이브러리가 아닙니다. UI 라이브러리에는 비즈니스 도메인도 API 호출도 다루지 않습니다. 사용자를 위한 애플리케이션만이 도메인으로 분리될 수 있습니다.
- 대규모 프로젝트를 구축 중이며 간단한 앱이 아닙니다. 간단한 할 일 애플리케이션을 만드는 경우에는 FSD의 장점을 알 수 없을 수도 있습니다. 그러나 WriterGate나 Medium과 같은 애플리케이션을 구축하는 경우, FSD가 유용할 수 있습니다.

만약 이 세 가지 요구 사항을 충족하는 프론트엔드 앱이라면, FSD를 사용해 보세요!



# Feature Sliced Design과 Bit를 사용하여 앱을 만드는 방법

이렇게까지 오셨다면, 귀하의 앱은 Feature Sliced Design (FSD)의 강력한 후보일 가능성이 높습니다. 그러니, FSD를 사용하여 앱을 어떻게 만들 수 있는지 살펴보겠습니다!

저는 Bit를 사용하여 FSD를 활용한 애플리케이션을 빌드할 것입니다. Bit는 조립 가능한 소프트웨어를 위한 혁신적인 빌드 시스템입니다.

Bit를 사용하면 독립적인 구성 요소를 빌드할 수 있습니다. 이러한 구성 요소는 격리된 공간에서 설계, 개발, 버전 관리되며 원격 범위에 호스팅됩니다. 이러한 범위는 컴포넌트를 더 잘 시각화하고 유지보수하기 쉽게 해주는 네임 스페이스를 통해 컴포넌트를 논리적으로 구조화하도록 장려합니다.



위에서 보듯이, 브랜드, 요소, 폰트라는 다른 네임스페이스에서 구성 요소를 논리적으로 정렬했습니다. 이러한 네임스페이스를 활용하여 Bit를 사용하여 FSD를 쉽게 처리할 수 있습니다!

# 단계 01: 필수 조건

먼저 Bit의 버전 관리자(BVMM)를 사용하여 Bit을 전역적으로 설치한 다음 React로 워크스페이스를 초기화하십시오. 이를 통해 React 공간에서 FSD에 작업할 수 있습니다.

```js
# bit 설치
npx @teambit/bvm install 

# 워크스페이스 초기화
bit new react workspace --default-scope dummyorg.fsd --aspect teambit.react/react-env
```



더미org.fsd를 본인의 비트 사용자 이름 및 범위 이름으로 교체하세요.

작업 공간을 성공적으로 생성했다면 아래의 출력이 표시됩니다:

<img src="/assets/img/2024-05-14-DevelopingScalableFrontendswithFeature-SlicedDesignFSD_0.png" />

다음으로 로컬 서버를 시작하려면 bit start를 실행하세요. 아래의 출력이 나타날 것입니다:



# 단계 02: Feature Sliced Design을 사용한 React 앱 정의하기

이제 Bit Components를 사용하여 Feature Sliced Design을 기반으로 한 React 앱을 구축해보겠습니다. 이 데모에서는 블로그 목록을 가져오는 React 앱을 구축해보겠습니다.

그래서, 우리 앱에서는 다음이 있을 것입니다:

- 앱 전체를 유지하는 React 앱
- 블로그 항목을 렌더링하는 Blog 페이지
- 단일 블로그 항목을 렌더링하는 Card 컴포넌트
- 블로그를 나타내는 엔티티
- 블로그 목록을 가져오는 API 호출



만약 이것을 FSD로 구조화한다면, 다음과 같이 논리적인 매핑이 있어야 합니다:

- app: 이 디렉토리는 블로그 목록을 위한 React 앱 컴포넌트를 보관할 것입니다.
- pages: 이 디렉토리는 블로그 목록 페이지를 위한 컴포넌트를 보관할 것입니다.
- widgets: 블로그 목록을 정의하는 단일 슬라이스가 생성될 것입니다.
- features: 첫 번째 기능으로 get-blog-posts 라는 슬라이스를 정의할 것입니다. 이 슬라이스에서는 기능이 작동하기 위한 데이터 가져오기 메커니즘을 정의하는 모델 세그먼트를 정의할 것입니다.
- entities: blog 라는 슬라이스를 정의할 것입니다. 블로그 슬라이스 내에서는 모델과 ui 두 세그먼트가 있을 것입니다. 모델에서는 블로그 항목의 데이터 모양을 정의하고, ui에서는 블로그 포스트 카드를 정의하는 React 컴포넌트인 blog-card를 가질 것입니다.

# 단계 03: Bit를 사용하여 컴포넌트 생성하기

다음으로, Bit를 사용하여 모든 필요한 컴포넌트를 생성해보겠습니다.



## 1: 엔티티 레이어 구축하기

먼저, 엔티티 레이어를 구축해 봅시다. 이를 위해 다음 명령을 사용하여 블로그 슬라이스를 생성해 보세요:

```js
bit create react-hook entities/blog/model && bit create react entities/blog/ui/blog-item
```

아래와 같이 새 디렉토리가 생성된 것을 확인할 수 있어요:




<img src="/assets/img/2024-05-14-DevelopingScalableFrontendswithFeature-SlicedDesignFSD_1.png" />

<img src="/assets/img/2024-05-14-DevelopingScalableFrontendswithFeature-SlicedDesignFSD_2.png" />

비트(Bit)를 사용하면 spec.tsx 파일과 composition.tsx 파일을 얻을 수 있다는 것을 이미 알아채셨을 것입니다. 단일 컴포넌트에 대한 테스트 케이스를 만들어 테스트 주도 개발(Test Driven Development)로 빌드할 수 있습니다. 또한 compositions 파일을 사용하여 소비자들에게 컴포넌트가 어떻게 사용될 수 있는지 보여주기 위해 컴포넌트의 다른 출력물을 생성할 수 있습니다.

그 다음, 블로그 모델과 블로그 카드 UI를 모델.ts와 blog-item.tsx 파일을 아래와 같이 업데이트하여 정의해 보겠습니다:




```js
// blog-item.tsx

import type { ReactNode } from 'react';
export type BlogItemProps = {
  id: string,
  title: string,
  description: string
  tags: string[]
};
const cardStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
};
const titleStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  marginBottom: '8px',
};
const tagsStyle: React.CSSProperties = {
  marginTop: '8px',
  color: '#555',
};
export function BlogItem({ description, id, title, tags }: BlogItemProps) {
  return (
    <div className="blog-card"
      key={id}
      style={cardStyle}>
      <h2 style={titleStyle}>{title}</h2>
      <p>{description}</p>
      <div className="tags" style={tagsStyle}>
        <strong>Tags:</strong> {tags.join(', ')}
      </div>
    </div>
  );
}
```

위에서 보듯이, 블로그 엔티티 및 블로그 카드를 정의하여 블로그를 볼 수 있는 기능을 구현할 수 있습니다. 전체 구현을 보려면 Bit Cloud에서 이 컴포넌트를 확인하세요.

하지만 로컬 서버는 이후 이렇게 보여야 합니다:

## 2: 기능 레이어 구축하기



다음으로, get-blog-posts 기능을 구축해 봅시다. 이를 위해 하나의 세그먼트가 필요합니다:

- model: 데이터를 가져오는 훅을 정의합시다.

이를 위해 React 컴포넌트를 생성해 봅시다:

```js
bit create react-hook features/get-blog-posts/model
```



그런 다음 아래와 같이 표시된 결과물을 보게 될 거에요:

<img src="/assets/img/2024-05-14-DevelopingScalableFrontendswithFeature-SlicedDesignFSD_3.png" />

<img src="/assets/img/2024-05-14-DevelopingScalableFrontendswithFeature-SlicedDesignFSD_4.png" />

model.ts 파일을 열어서 아래 코드를 포함시켜서 블로그를 가져와보세요:



```js
import { useBlogStore } from '@dummyorg/fsd.entities.blog.model';
import { useEffect } from 'react';

export function useGetBlogs() {
  const { blogs, getBlogs, loading } = useBlogStore();
  useEffect(() => {
    getBlogs();
  });
  return { blogs, loading };
}
```

# 3: 위젯 레이어 구축하기

이제 위젯인 블로그 목록을 만들어봅시다. 이를 위해 블로그 목록이라는 슬라이스와 슬라이스 내에 ui라는 세그먼트를 생성합시다. 다음 명령어를 사용하여 이 작업을 수행할 수 있습니다:

```js
bit create react widgets/blog-list/ui
```



새로운 디렉토리가 추가된 것을 확인해야 합니다:

![새 디렉토리 추가 사진](/assets/img/2024-05-14-DevelopingScalableFrontendswithFeature-SlicedDesignFSD_5.png)

ui.tsx 파일을 열고 아래 코드를 추가해주세요:

```js
import React from 'react';
import { Blog } from '@dummyorg/fsd.entities.blog.model';
import { BlogItem } from '@dummyorg/fsd.entities.blog.ui.blog-item';

export type UiProps = {
  blogs: Blog[]
};
export function Ui({ blogs = [] }: UiProps) {
  return blogs.map((blog) => (<BlogItem
    key={blog.id}
    description={blog.description}
    id={blog.id}
    tags={blog.tags}
    title={blog.title}
  />))
}
```



지역 서버로 이동하여 다음을 볼 수 있어요:

![Developing Scalable Frontends with Feature-Sliced Design](/assets/img/2024-05-14-DevelopingScalableFrontendswithFeature-SlicedDesignFSD_6.png)

Bit Cloud에서 해당 구성 요소의 전체 구현을 살펴볼 수 있어요.

# 4: 페이지 레이어 구축



다음으로, 블로그 목록을 나타내는 페이지를 만들어 보겠습니다. 이를 위해 슬라이스인  blog-list와 세그먼트인 ui를 생성해봅시다. 다음 명령어를 실행하세요:

```js
bit create react pages/blog-list/ui
```

이 명령을 실행하면 다음과 같이 출력됩니다:

<img src="/assets/img/2024-05-14-DevelopingScalableFrontendswithFeature-SlicedDesignFSD_7.png" />



다음으로 ui.tsx 파일을 열고 다음 스니펫을 포함하세요:

```js
import React from 'react';
import { useGetBlogs } from '@dummyorg/fsd.features.get-blog-posts.model';
import { BlogList } from '@dummyorg/fsd.widgets.blog-list.ui';

export function Ui() {
  const { blogs, loading } = useGetBlogs();
  if (loading) {
    return <p>
      Posts are loading...
    </p>
  }
  return (
    <BlogList
      blogs={blogs}
    />
  );
}
```

로컬 서버에서 아래와 같은 출력이 표시됩니다:



위의 텍스트를 친근한 톤으로 한국어로 번역해드리겠습니다.


<img src="/assets/img/2024-05-14-DevelopingScalableFrontendswithFeature-SlicedDesignFSD_9.png" />

<img src="/assets/img/2024-05-14-DevelopingScalableFrontendswithFeature-SlicedDesignFSD_10.png" />

우리는 이렇게 페이지를 설정했어요! 자세히 알아보려면 Bit Cloud에서 확인해보세요.

# 5: 앱 레이어 구축




마지막으로, 이 모든 것을 사용하는 앱을 만들어봅시다. 다음 명령을 실행하세요:

```js
bit create react-app app
```

이렇게 하면 앱 컴포넌트가 생성되며 아래와 같이 결과가 생성됩니다:

![Output](/assets/img/2024-05-14-DevelopingScalableFrontendswithFeature-SlicedDesignFSD_11.png)



이 앱을 Bit 서버 외부에서 로드할 수 있도록하려면 다음 몤령을 실행하십시오:

```js
bit use app
```

앱이 로드 가능한지 확인하려면 다음 몤령을 실행하십시오:

```js
bit app list
```



만약 당신의 앱이 로드될 수 있다면, 아래 출력을 확인할 수 있어야 합니다:

<img src="/assets/img/2024-05-14-DevelopingScalableFrontendswithFeature-SlicedDesignFSD_12.png" />

다음으로, 파일인 — app.tsx을 열고 다음 단락을 포함하세요:

```js
import React from "react";
import { BlogListPage } from "@dummyorg/fsd.pages.blog-list.ui";

export function App() {
  return <BlogListPage />
}
```



다음으로, 명령어를 실행하여 앱을 시작해보세요:

```js
bit run app
```

로컬호스트에서 앱이 시작되는 것을 확인할 수 있어요.

앱의 전체 구현을 보려면 Bit Cloud에서 확인해보세요.



# 마무리

보셨듯이, Feature Sliced Design은 응용 프로그램을 명확하고 구조화된 방식으로 구성할 때 매우 유용합니다. 팀원들이 프로젝트를 빠르게 탐색하고 기능을 더 잘 이해할 수 있도록 돕습니다.

만약 우리가 만든 앱을 살펴보고 싶다면, Bit Cloud에서 확인해보세요.

본문이 도움이 되었기를 바랍니다. FSD를 직접 시도해보고, 이 패턴에 대한 생각을 저에게 알려주세요!



감사합니다.

## 더 알아보기