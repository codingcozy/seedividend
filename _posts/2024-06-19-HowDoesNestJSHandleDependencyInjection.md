---
title: "NestJS에서 의존성 주입은 어떻게 처리될까요"
description: ""
coverImage: "/assets/img/2024-06-19-HowDoesNestJSHandleDependencyInjection_0.png"
date: 2024-06-19 23:13
ogImage:
  url: /assets/img/2024-06-19-HowDoesNestJSHandleDependencyInjection_0.png
tag: Tech
originalTitle: "How Does NestJS Handle Dependency Injection?"
link: "https://medium.com/@majidev/how-does-nestjs-handle-dependency-injection-60a1b5b4bc2d"
isUpdated: true
---

NestJS와 TypeScript를 사용하여 백엔드를 개발할 때, NestJS에서 @Injectable 데코레이터를 사용하는 것이 일반적입니다. EmailService가 @Injectable이고 다른 서비스에서 이를 주입하고 사용하려는 시나리오를 고려해 보겠습니다. 아래 코드를 살펴보세요:

```js
@Injectable()
class MyService {
  constructor(private readonly emailService: EmailService) {}
}
```

첫눈에 보기에는 모든 것이 잘 동작하는 것처럼 보입니다. 그러나 자세히 살펴보면 이 코드가 조금 이상해 보일 수 있습니다. TypeScript 코드가 JavaScript로 변환될 때, 타입 주석이 제거되기 때문입니다. 그래서 문제는 다음과 같이 발생합니다: NestJS는 EmailService와 같은 타입만으로 어떻게 주입할 서비스를 결정할까요?

![How Does NestJS Handle Dependency Injection](/assets/img/2024-06-19-HowDoesNestJSHandleDependencyInjection_0.png)

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

# 설명:

NestJS는 TypeScript의 메타데이터 및 리플렉션 기능을 활용하여 런타임에서 의존성에 대한 필요한 정보를 유지합니다. 이를 위해 reflect-metadata라는 라이브러리를 사용합니다. 이 라이브러리를 사용하면 NestJS가 의존성 주입에 사용할 수 있는 클래스와 메소드에 메타데이터를 추가할 수 있습니다.

NestJS는 의존성 주입을 처리하기 위해 데코레이터를 사용합니다. 위 예시에서 @Injectable() 데코레이터는 NestJS에 EmailService 클래스에 대한 메타데이터를 저장하도록 알려줍니다. 런타임에서 NestJS는 이 메타데이터를 활용하여 의존성을 식별하고 주입합니다.

이 프로세스가 올바르게 작동하도록 하려면 프로젝트에 reflect-metadata를 설치하고 주 파일(예: main.ts)에서 import해야 합니다.

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
import "reflect-metadata";
```

이렇게 하면 NestJS가 JavaScript로 변환될 때 타입 주석이 제거되어도 메타데이터 정보를 사용하여 의존성을 올바르게 식별하고 주입할 수 있습니다.

# 결론

NestJS는 TypeScript에서 메타데이터와 리플렉션을 사용하여 의존성을 효과적으로 관리합니다. 이 기능을 통해 NestJS는 타입 주석이 제거되어도 올바르게 의존성을 식별하고 주입할 수 있습니다. TypeScript로 서버 측 응용 프로그램을 개발할 때 NestJS의 강점 중 하나입니다.

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

NestJS가 메타데이터와 리플렉션을 통해 의존성 주입을 처리하는 방식을 이해하면 TypeScript와 NestJS의 힘을 최대로 발휘하면서 더 견고하고 유지보수가 쉬운 코드를 작성할 수 있습니다.

나의 Linkedin | 나의 Github
