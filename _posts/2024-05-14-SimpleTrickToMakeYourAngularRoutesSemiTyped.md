---
title: "Angular Routes반쯤 타입 지정하는 간단한 꿀팁"
description: ""
coverImage: "/assets/img/2024-05-14-SimpleTrickToMakeYourAngularRoutesSemiTyped_0.png"
date: 2024-05-14 12:31
ogImage: 
  url: /assets/img/2024-05-14-SimpleTrickToMakeYourAngularRoutesSemiTyped_0.png
tag: Tech
originalTitle: "Simple Trick To Make Your Angular Routes (Semi) Typed"
link: "https://medium.com/javascript-in-plain-english/simple-trick-to-make-your-angular-routes-semi-typed-446063f0843f"
isUpdated: true
---





![Simple Trick To Make Your Angular Routes Semi-Typed](/assets/img/2024-05-14-SimpleTrickToMakeYourAngularRoutesSemiTyped_0.png)

링크나 버튼 요소의 [routerLink] 지시문이 하드 코딩된 값을 입력받는 프로젝트를 많이 본 적이 있습니다. 예를 들어:

```js
<a [routerLink]="['/movies', movie.id, 'edit']"> 영화 편집 </a>
```

만약 언젠가 movie를 film으로, edit을 update로 변경하고 싶을 때 링크가 깨지는 경우가 발생할 수 있습니다. 그래서 저는 이에 대한 일종의 방어선으로 작동하는 작은 꼼수를 고안해보았습니다.




## 단계 1: 라우트 정의하기

우리가 몇 개의 인증 관련 라우트들 중 일부를 가지고 있다고 가정해봅시다. auth.routes.ts 파일을 만들고 먼저 타입 또는 인터페이스를 생성할 것입니다:

```js
export type AuthRoutes = {
    login: Route
    register: Route
    verifyEmail: Route
}
```

이제 인터페이스에 따라 라우트를 선언해보겠습니다:



```js
export const authRoutes: AuthRoutes = {
    login: {
        path: 'login',
        loadComponent: () => import('./login.component')
            .then((m) => m.LoginComponent),
    },
    register: {
        path: 'register',
        loadComponent: () => import('./register.component')
            .then((m) => RegisterComponent),
    },
    verifyEmail: {
        path: 'verify-email/:token',
        loadComponent: () => import('./verify-email.component')
            .then((m) => m.VerifyEmailComponent),
    },
}
```

동일한 방식으로, 편의에 맞게 다른 세분화된 route 파일을 만들어보세요.

```js
export type MovieRoutes = {
    movieByActor: Route
}

export const movieRoutes: MovieRoutes = {
    movieByActor: {
        path: 'dashboard/actors/:actorId/movies/:movieId',
        loadComponent: import('./movie-details.component')
            .then(m => m.MovieDetailsComponent),
    }
}
```

또한 not-found-page.route.ts에 다음과 같은 캐치-올 route를 만들어봅시다:



```js
export type NotFoundPageRoutes = {
    index: Route
}

export const notFoundPageRoutes: NotFoundPageRoutes = {
    index: {
        path: '**',
        loadComponent: () => import('./not-found.page'),
    },
}
```

## 스텝 2: 라우트 등록하기

앱 라우트 파일인 app.routes.ts로 돌아가거나 애플리케이션 라우트를 정의한 곳으로 이동하세요. 모든 그룹화된 라우트를 여기로 가져와주세요:

```js
type GroupedRoutes = [
    HomeRoutes,
    AuthRoutes,
    MovieRoutes,
    // 모든 것을 수용하는 라우트는 마지막에 위치해야 합니다
    NotFoundPageRoutes,
]

const groupedRoutes: GroupedRoutes = [
    homeRoutes,
    authRoutes,
    movieRoutes,
    notFoundPageRoutes,
]
```



우리의 루트는 객체 안에 있기 때문에 펼쳐주어야 해요:

```js
const flattenedRoutes: Route[] = []
for (const routeGroup of groupedRoutes) {
    for (const route of Object.values(routeGroup)) {
        flattenedRoutes.push(route)
    }
}

export const AppRoutes = flattenedRoutes
```

앱 설정에 라우트를 등록해주세요 (일반적으로 app.config.ts 또는 main.ts 파일에 위치합니다):

```js
import { ApplicationConfig, importProvidersFrom } from '@angular/core'
// ... 다른 import들

export const appConfig: ApplicationConfig = {
    providers: [
        // ... 다른 프로바이더들
        provideRouter(

        	AppRoutes, // <-- 여기에 펼쳐진 라우트를 import 해요

        ),
    ],
}
```



## 단계 3: 사용하기

이 시점에서 우리의 솔루션이 준비되었습니다. 테스트 컴포넌트에서의 사용 예시:

```js
import { authRoutes, AuthRoutes } from 'src/pages/auth/auth.routes.ts';

@Component({
    selector: 'app-test',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
      <a
        routerLink="{ '/' + authRoutes.login.path }"
      >
        로그인
      </a>
          
      <a 
        routerLink="{ '/' + authRoutes.register.path }"
      >
        회원 가입
      </a>
  
      <!-- 경로 매개 변수 대체 -->
      <a 
        routerLink="{ 
          '/' + authRoutes.verifyEmail.path.replace(':token', token) 
        }">
          이메일 확인
      </a>

      <!-- 컨트롤러 클래스 내에서 사용 -->
      <button (click)="goToMoviesHome()">
        내 대시보드
      </button>
      
      <button (click)="goToMovie(actorId, movieId)">
        영화 상세 정보 보기
      </button>
    `,
    styleUrl: './test.component.scss',
})
export class TestComponent {
    readonly authRoutes: AuthRoutes = authRoutes
    
    token = 'abcd1234'
    movieId = '2'
    actorId = '1'
    
    goToMoviesHome() {
      this.router.navigateByUrl('/' + this.movieRoutes.index.path)
    }

    goToMovie(actorId: string, movieId: string) {
      this.router.navigateByUrl('/' + 
        this.movieRoutes.movieByActor
          .replace(':actorId', this.actorId)
          .replace(':movieId', this.movieId)
      )
    }
}
```

이제 경로가 원치 않는 링크 차단에 대한 정도로 더 안전합니다. 한 곳에서 경로 값을 변경하면 모든 링크가 그에 맞게 업데이트됩니다.



# 친절한 영어로 🚀

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 다음에 가시기 전에:

- 반드시 글쓴이를 클랩하고 팔로우해 주세요 👏
- 저희를 팔로우해 주세요: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼에서도 만나보세요: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠를 만나보세요