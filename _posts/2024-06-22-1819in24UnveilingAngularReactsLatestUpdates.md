---
title: "2024년 Angular 18, React 19 최신 업데이트 공개"
description: ""
coverImage: "/assets/img/2024-06-22-1819in24UnveilingAngularReactsLatestUpdates_0.png"
date: 2024-06-22 14:36
ogImage: 
  url: /assets/img/2024-06-22-1819in24UnveilingAngularReactsLatestUpdates_0.png
tag: Tech
originalTitle: "18 , 19 in ‘24:Unveiling Angular , Reacts Latest Updates!"
link: "https://medium.com/@sannidhisiva/exploring-the-latest-features-angular-18-react-19-13298d32f2cd"
---


👨‍💻 안녕하세요! 전문 개발자로서 웹 개발에 열정을 가지고 있는 Senior Full Stack 엔지니어입니다. 저는 Angular 및 React 프레임워크와 광범위하게 작업한 기회가 있었습니다. 웹 성능을 향상시키는 최신 기능을 탐험하는 것은 항상 흥미로운 일이었습니다.

![](/assets/img/2024-06-22-1819in24UnveilingAngularReactsLatestUpdates_0.png)

# 빠른 소개:

만약 이러한 웹 프레임워크가 무엇인지에 대해 생소하다면,

<div class="content-ad"></div>

Angular: Angular은 Google에서 지원하는 강력한 프론트엔드 프레임워크로, 효율적인 웹 애플리케이션을 구축하기 위한 다양한 도구를 제공합니다.

React: Facebook이 만든 React는 재사용 가능한 컴포넌트와 효율적인 렌더링 기술을 통해 상호 작용하는 사용자 인터페이스를 구축하는 것을 단순화한 JavaScript 라이브러리입니다.

Angular 18과 React 19의 최신 릴리스로 흥미로운 발전이 있고, 그들의 매력적인 기능들을 탐험하는 것을 곧 기대하고 있습니다.

# Angular 18

<div class="content-ad"></div>

Angular을 처음 사용해보는 분들을 위한 안내입니다. Angular의 홈페이지인 Home • Angular은 지금은 여러분의 첫 걸음을 시작할 수 있는 포괄적이고 가치 있는 자원으로 자리 잡았습니다. Angular 개발의 모든 면을 탐험하고 학습하기에 적합한 다양한 정보, 자습서 및 안내서가 제공됩니다.

최신 업그레이드에 대해 자세히 살펴보고, 특히 Angular에 처음 접하시는 분들을 위해 이러한 기능들을 일반적인 방식으로 설명해보겠습니다.

## 🟫변경 탐지 개선

Zone.js는 비동기 작업을 관리하여 Angular에서 자동으로 변경 탐지를 가능하게 합니다.

<div class="content-ad"></div>

앵귤러 사용법:

- 비동기 API를 패치합니다.
- 변경 감지를 트리거합니다.

단점:

- 성능 부담
- 복잡한 디버깅
- 라이브러리 호환성

<div class="content-ad"></div>

예시:

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-article',
  template: `
    <div>
      <p>Article이 발행되었습니까?: { isArticlePublished }</p>
      <button (click)="publishArticle()">기사 발행</button>
    </div>
  `
})
export class ArticleComponent {
  isArticlePublished = false;

  publishArticle() {
    setTimeout(() => {
      this.isArticlePublished = true;
    }, 1000);
  }
}
```

```js
import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-article',
  template: `
    <div>
      <p>Article이 발행되었습니까?: { isArticlePublished }</p>
      <button (click)="publishArticle()">기사 발행</button>
    </div>
  `
})
export class ArticleComponent {
  isArticlePublished = false;

  constructor(private cdr: ChangeDetectorRef) {}

  publishArticle() {
    setTimeout(() => {
      this.isArticlePublished = true;
      this.cdr.detectChanges();  // 변경 감지를 수동으로 트리거합니다.
    }, 1000);
  }
}
```

Angular 18에서는 Angular에서 zoneless 지원을 실험할 수 있습니다! 애플리케이션 부트스트랩에 provideExperimentalZonelessChangeDetection을 추가하기만 하면 됩니다:  

<div class="content-ad"></div>

```js
@Component({
  ...
  template: `
    <h1>Hello from { name() }!</h1>
    <button (click)="handleClick()">With Zoneless</button>
  `,
})
export class App {
  protected IsArticlePublished= signal('false');

  handleClick() {
    this.IsArticlePublished.set('true');
  }
}
```

Angular은 변경 감지를 최적화하기 위해 Zones를 사용하지만, Zones 없이도 신호 업데이트와 같은 적은 트리거로 작동할 수 있습니다.

## 🟫Angular Material 3

Angular Material은 Angular 애플리케이션에 대한 UI 컴포넌트 라이브러리로서 Google의 Material Design 명세를 구현합니다. 버튼, 입력란, 대화 상자, 내비게이션 패턴 등 재사용 가능하고 테스트된 UI 컴포넌트를 제공합니다.

<div class="content-ad"></div>

이러한 구성 요소들은 Material Design 원칙을 준수하여 웹 애플리케이션을위한 일관된 그리고 매력적인 사용자 인터페이스를 제공하도록 설계되었습니다.

참조: Angular Material UI 구성 요소 라이브러리

## 🟫 미리보는 신호 API

신호는 포함된 값에 대한 변경 사항이 있을 때 관심 있는 소비자에게 알림을 주는 값의 캡슐화입니다. 이들은 간단한 유형부터 복잡한 데이터 구조까지 다양한 데이터를 보유할 수 있습니다.

<div class="content-ad"></div>

신호의 값을 액세스하려면 해당 getter 함수를 호출해야 합니다. 이렇게 하면 Angular이 해당 사용 사항을 모니터링할 수 있습니다. 신호는 쓰기 가능하거나 읽기 전용 형태로 존재할 수 있습니다.

참고: Signals • 개요 • Angular

## 🟫지연 가능한 뷰

구성 요소 템플릿에서 지연 가능한 뷰를 사용하면 구성 요소, 지시문, 파이프 및 관련 CSS와 같은 특정 종속성의로드를 지연시킬 수 있습니다.

<div class="content-ad"></div>

이 기능은 템플릿의 일부를 @defer 블록으로 감싸서 해당 종속성이로드되어야 하는 조건을 정의하는 곳에 구현됩니다.

```js
@defer {
  <articlereview-component />
}
```

지연로드 가능한 뷰를 통해 개발자들은 쉽게 앱을 향상시키고 번들 크기를 줄일 수 있습니다.

## 🟫이벤트 재생

<div class="content-ad"></div>

사용자 이벤트(예: 클릭) 재생 가능성을 허용하여 수분화 로직이 완료되기 전에 페이지에서 발생한 이벤트를 다시 실행할 수 있습니다.

예시

대부분의 개발자가 일반적으로 이벤트 디스패치와 직접 상호 작용하지는 않지만, 이 문맥에서 이벤트 재생이 왜 가치 있는지 살펴봅시다. 기사를 읽는 웹사이트에서 상상해보세요. 우리는 가짜로로드 지연을 사용하여 네트워크 연결이 느린 시나리오를 시뮬레이션할 것입니다.

페이지가 로드되는 동안이며 완전히 상호작용 가능하기 전에 사용자가 기사를 읽고 여러 기사에 댓글을 남기기로 결정했다면, 페이지가 아직 완전히 상호작용적이지 않은 경우(수분화되지 않은 경우), 이 사용자 동작은 손실될 것입니다.

<div class="content-ad"></div>

버전 18부터 Angular은 사용자 상호작용을 기록하기 위해 이벤트 디스패치를 도입했습니다. 페이지가 완전히 로드된 후, Angular은 이러한 이벤트를 재생하여 모든 댓글이 여러 개의 게시물에 성공적으로 제출되도록 보장합니다.

```js
bootstrapApplication(App, {
  providers: [
    provideClientHydration(withEventReplay())
  ]
});
```

## 🟫ng-content의 콘텐츠를 위한 후속 처리

```js
@Component({
  selector: 'app-article',
  template: `
    <ng-content select=".article">게시물 이름</ng-content>

    <ng-content>댓글이 없습니다</ng-content>
  `,
})
export class Article {}
```

<div class="content-ad"></div>

## 🟫통합 형태 컨트롤 상태 변경 이벤트

내가 좋아하는 하나: Angular 폼의 FormControl, FormGroup 및 FormArray 클래스에는 이제 'events' 속성이 추가되었습니다.

이 속성을 사용하면 폼 컨트롤과 관련된 이벤트 스트림을 구독할 수 있어 값 변경, 터치 상태, 원시 상태 및 전반적인 컨트롤 상태의 변경 사항을 모니터링할 수 있습니다.

```js
const articleFeedbackControl = new FormControl<string|null>('article', Validators.required);
nameControl.events.subscribe(event => {
 
});
```

<div class="content-ad"></div>

## 🟫 라우트 리다이렉트 개선

Angular v18에서는 리다이렉트 처리의 유연성을 향상하기 위해 redirectTo 속성이 이제 문자열을 반환하는 함수를 지원합니다.

이를 통해 런타임 조건에 따라 보다 복잡한 리다이렉트 로직을 구현할 수 있습니다. 예를 들어, 동적 상태에 따라 리다이렉트해야 하는 경우 이 함수 내에 복잡한 로직을 정의할 수 있습니다:

```js
const routes: Routes = [
  { path: 'article/:articleId', component: ArticleComponent },
  {
    path: 'redirect-article',
    redirectTo: ({ queryParams }) => {
      const articleIdParam = queryParams['articleId'];
      if (articleIdParam) {
        return `/article/${articleIdParam}`;
      } else {
        // 오류 처리를 하거나 기본 경로로 리다이렉트할 수 있습니다
        return `/not-found`;
      }
    }
  },
  { path: 'not-found', component: NotFoundComponent },
];
```

<div class="content-ad"></div>

## 🟫 빌드 개선

Angular 16에서는 esbuild 및 Vite와 같은 현대적인 도구를 활용한 새로운 응용 프로그램 빌더를 공개했습니다. 이 빌더는 Angular 17의 새로운 프로젝트에 대한 기본값이 되었습니다.

새 빌드 시스템으로 이전하기 • Angular

![이미지](/assets/img/2024-06-22-1819in24UnveilingAngularReactsLatestUpdates_1.png)

<div class="content-ad"></div>

## 지금 React 19 기능에 대해 이야기해 봅시다

![React 19](/assets/img/2024-06-22-1819in24UnveilingAngularReactsLatestUpdates_2.png)

# React 19

## 🟢 React 컴파일러

<div class="content-ad"></div>

현재 React는 상태 변경 시 자동으로 다시 렌더링되지 않습니다. 이러한 다시 렌더링을 최적화하기 위해 개발자들은 보통 useMemo(), useCallback(), memo API를 수동으로 사용합니다.

React 팀은 해결책을 소개했습니다: React 컴파일러. 이 새로운 컴파일러는 다시 렌더링 관리를 자동화하는 데 설계되었습니다. React는 이제 자율적으로 상태를 업데이트하고 사용자 인터페이스를 새로 고칠 때 언제, 어떻게 할지 결정합니다.

## 🟢Actions

버전 19에서는 폼 작업 방식을 혁신할 것으로 약속된 Actions라는 흥미로운 새로운 기능이 도입될 예정입니다.

<div class="content-ad"></div>

조치를 취하면 HTML `form/` 태그와 기능들을 심플하게 통합할 수 있어요. 말 그대로, 이제 Actions로 onSubmit 이벤트를 대체할 수 있고, HTML 폼 안에서 속성으로 활용할 수 있어요.

```js
"use server"
const submitArticle = async (articleData) => {
    const newArticle = {
        title: articleData.get('title'),
        author: articleData.get('author'),
        content: articleData.get('content')
    };
};

const ArticleForm= () => {
    return <form action={submitArticle}>
        <div>
            <label>Article Name</label>
            <input type="text" name='title'/>
        </div>
        <div>
            <label>Author Name</label>
            <input type="text" name="author" />
        </div>
        <div>
            <label>Content</label>
            <input type="text" name="content" />
        </div>
        <button type='submit'>Submit</button>
    </form>
}

export default ArticleForm;
```

## 🟢문서 메타데이터

‘title,’ ‘meta 태그,’ 및 ‘description’과 같은 컴포넌트들이 SEO를 최적화하고 접근성을 보장하는 데 중요한 역할을 합니다. React에서는 싱글 페이지 애플리케이션이 널리 사용되는 상황에서 다양한 경로에서 이러한 컴포넌트들을 관리하는 것이 복잡해질 수 있어요.

<div class="content-ad"></div>

현재 개발자들은 경로 전환이나 필요에 따라 메타데이터를 업데이트하기 위해 react-helmet와 같은 도구를 활용하거나 사용자 정의 코드를 작성하는 경우가 많습니다. 그러나 이러한 접근 방식은 반복적이고 SEO 요소(meta 태그 등)를 처리할 때 특히 오류 발생 가능성이 있습니다.

현재:

```js
import React, { useEffect } from 'react';

const ArticleHead = ({ title, description }) => {
    useEffect(() => {
        document.title = title;

        const metaDescriptionTag = document.querySelector('meta[name="description"]');
        if (metaDescriptionTag) {
            metaDescriptionTag.setAttribute('content', description);
        }
    }, [title, description]);

    return null;
};

export default ArticleHead;
```

React 19 버전 변화:

<div class="content-ad"></div>

React 19에서는 React 컴포넌트 내에서 타이틀과 메타 태그를 직접 활용할 수 있습니다:

```js
import React from 'react';

const HomePage = () => {
  return (
    <>
      <title>Article Home Page - My Website</title>
      <meta name="description" content="다양한 주제에 대한 최신 기사 및 업데이트를 살펴보세요." />
      {/* 페이지 컨텐츠를 여기에 추가하세요 */}
    </>
  );
};

export default HomePage;
```

## 🟢새로운 React Hooks

useTransition을 사용한 액션:

<div class="content-ad"></div>

- 데이터 변이 중 보류 중인 상태를 처리하기 위한 useTransition 훅을 소개합니다.
- 낙관적 업데이트, 오류 및 순차적 요청을 효율적으로 관리할 수 있도록 합니다.

새로운 훅:

- useOptimistic: 폼 제출 중 즉시 피드백을 제공합니다.
- useFormStatus: 폼 상태를 관리합니다(예: pristine, dirty, touched).
- useFormState: 값 및 오류를 포함한 폼 상태를 추적합니다.
- useActionState: 일반적인 액션 시나리오를 간소화합니다.

이 흥미로운 주제는 철저한 논의를 위해 별도의 기사가 필요합니다.

<div class="content-ad"></div>

그리고 React에서 다가오는 개선 사항은 다음과 같습니다:

- suspense를 사용한 최적화된 에셋 로딩을 통한 성능 개선.
- 웹 컴포넌트를 React에 직접 통합하여 원활한 사용 환경 조성.

웹 컴포넌트 — React (reactjs.org)

👨‍💻 나는 Angular 18과 React 19에 대해 알아가는 것을 고대하고 있어. 이게 내 눈길을 사로잡았어:

<div class="content-ad"></div>

Angular 18:

- Zoneless 지원
- Angular Material 3
- 시그널 API
- 지연 로딩 뷰
- 이벤트 재생
- 라우트 리다이렉트
- 새로운 애플리케이션 빌더

React 19:

- React 컴파일러
- 액션들
- 문서 메타데이터
- 새로운 훅: useTransition, useOptimistic, useFormStatus, useActionState

<div class="content-ad"></div>

이번 업데이트들은 웹 성능, 사용자 경험, SEO, 그리고 개발자 생산성을 크게 향상시킬 것을 약속합니다. 탐험하고 배우는 것을 기다릴 수가 없네요! 🚀

💡제 소개가 귀하의 호기심을 자극하여 소프트웨어 프로젝트에 Angular 18과 React 19를 탐험하고 싶게 만들었으면 좋겠네요.