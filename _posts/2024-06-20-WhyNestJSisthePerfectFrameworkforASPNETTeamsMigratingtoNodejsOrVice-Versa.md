---
title: "네스트JS는 ASPNET 팀이 노드js로 이전하거나 그 반대로 이동할 때 완벽한 프레임워크입니다"
description: ""
coverImage: "/assets/img/2024-06-20-WhyNestJSisthePerfectFrameworkforASPNETTeamsMigratingtoNodejsOrVice-Versa_0.png"
date: 2024-06-20 07:18
ogImage:
  url: /assets/img/2024-06-20-WhyNestJSisthePerfectFrameworkforASPNETTeamsMigratingtoNodejsOrVice-Versa_0.png
tag: Tech
originalTitle: "Why NestJS is the Perfect Framework for ASP.NET Teams Migrating to Node.js (Or Vice-Versa)"
link: "https://medium.com/nestjs-hero/why-nestjs-is-the-perfect-framework-for-asp-net-teams-migrating-to-node-js-or-vice-versa-e0e94dd4692a"
isUpdated: true
---

## Nest.js 대 ASP.NET: 프레임워크 비교

![이미지](/assets/img/2024-06-20-WhyNestJSisthePerfectFrameworkforASPNETTeamsMigratingtoNodejsOrVice-Versa_0.png)

웹 개발 여정을 시작하는 여러 가지 방법이 있습니다. 현대 웹에는 다양한 프레임워크가 있으며, 어떤 것이 최선인지 선택하는 것이 새로운 사용자들에게는 더 어려워지고 있습니다. 웹 프레임워크는 웹을 위해 만들어졌지만 사용해야 하는 다양한 이유가 있습니다.

구축할 웹 사이트 유형, 사이트의 성능 요구 사항, 사용 가능한 개발자 풀, 그리고 사용하는 클라우드 제공 업체에 따라 만들어야 할 결정에 영향을 줄 것입니다. 결과적으로, 프레임워크를 선택할 때 고려할 사항이 많이 있습니다.

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

# Nest.js와 ASP.NET이 무엇인가요?

먼저 Nest.js부터 알아보겠습니다.

## Nest.js

Nest.js는 TypeScript 프로그래밍 언어를 사용하여 완전히 구현된 Node.js 웹 프레임워크입니다. 다른 Node.js 웹 프레임워크와 비교할 때, Nest.js는 코드의 잘 정리된 프로젝트 구조에 중점을 둡니다. 경험 많은 개발자들은 Nest.js가 코드를 Angular 같은 다른 프레임워크로 어떻게 정리하는지를 알아볼 수 있을 것입니다.

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

Nest.js는 Express의 함수형 접근 방식과 비교하여 TypeScript의 객체 지향 프로그래밍을 완전히 활용합니다. 그러나 내부적으로 Nest.js는 HTTP 서버를 실행하기 위해 Express 또는 Fastify(구성에 따라 다름)를 사용합니다. 따라서 다른 프레임워크 위에 있는 추상화 계층으로 생각할 수 있습니다.

## ASP.NET

ASP.NET은 Microsoft가 만든 웹 프레임워크입니다. Microsoft의 C# 프로그래밍 언어를 사용합니다. ASP.NET은 2002년 초반부터 오랫동안 사용되어 왔습니다. 하지만 이전부터 지속적으로 새로운 버전을 출시하며 지속적으로 향상되어 왔습니다. 이러한 결과로 ASP.NET은 이제 C#으로 거의 모든 것을 구축할 수 있는 프로그래밍 도구 모음인 .NET으로 더 널리 알려지게 되었습니다.

웹 프레임워크는 이제 보편적으로 .NET Core로 불리며, .NET 6가 최신 버전입니다.

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

# TypeScript과 C#이 무엇인가요?

TypeScript과 C#은 모두 Microsoft가 만들었습니다. Microsoft는 닷컴 붐 속에서 수요가 증가함에 따라 C#을 만들었습니다. Sun Microsystems의 Java와 같은 언어가 웹 개발자들에 의해 가장 인기 있는 프로그래밍 언어 중 하나로 발전하는 가운데, Microsoft는 자사의 언어를 만들어 시장에 진입하기로 결정했습니다.

JavaScript도 닷컴 붐 이후 지금까지 인기를 얻고 있었습니다. 2010년대 초, Microsoft 엔지니어들은 강력한 타입 시스템을 갖춘 JavaScript의 상위 집합인 TypeScript을 만들었습니다. 그러나 TypeScript은 2016년부터 맹활약하기 전에 성숙 과정을 거쳤습니다.

동일한 회사가 두 프로그래밍 언어를 만들었기 때문에 두 언어는 공통점이 많으며, 익숙함으로 인해 개발 경험이 증진되고 있습니다.

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

두 언어 모두 컴파일되기 때문에 컴파일러가 컴파일 시간에 오류를 확인합니다.

## TypeScript에서의 객체 지향 프로그래밍

TypeScript에서의 객체 지향 프로그래밍은 JavaScript보다 조금 더 나은 편입니다. 그러나 JavaScript와 TypeScript 모두 클래스를 지원하며, 두 언어 모두 코드 캡슐화를 구현하는 것은 꽤 간단해 보입니다.

```typescript
class Car {
  color: string;
  getColor() {
    return this.color;
  }
  setColor(_color: string) {
    this.color = _color;
  }
}
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

TypeScript에는 JavaScript에 없는 인터페이스가 있습니다.

```js
인터페이스 Car {
  type: string;
  getType(): string;
  setType(_type);
}
```

인터페이스의 구현은 다음과 같이 보일 것입니다:

```js
class Audi implements Car{
  type: string;
  color: string;
  getName() {
    return this.color;
  }
  setName(_color: string) {
    this.color = _color;
  }
  getType(): string {
    return this.type;
  }
  setType(_type: any) {
    this.type = _type;
  }
}
인터페이스 Car {
    type: string;
    getType(): string;
    setType(_type);
}
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

Nest.js는 TypeScript에서 OOP를 가장 효율적으로 활용하는 프레임워크 중 하나입니다. 모든 것이 인터페이스, 클래스 및 의존성 주입과 같은 OOP 개념에 기반을 두고 있습니다.

## C#에서의 객체 지향 프로그래밍

C#은 당시 가장 인기 있는 OOP 프로그래밍 언어인 Java를 모델로 삼았습니다. 최근까지 C#에서 코딩하는 것은 항상 Java에서 코딩하는 것과 동일한 단점을 가지고 있었습니다. main 함수를 만들어야 하고 복잡한 프로젝트 구조를 유지해야 하는 등의 단점이 있었습니다. 또한, 프로바이더, 서비스 또는 컨트롤러와 같은 클래스 이름이 유사하거나 충돌할 수 있습니다.

C#에서 유사한 베이스 클래스를 만드는 방법은 다음과 같을 것입니다:

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
class Car
{
  private string color;

  public void getColor()
  {
    return this.color;
  }

  public void setColor(string color)
  {
    this.color = color;
  }
}
```

인터페이스는 다음과 같이 보일 것입니다:

```js
interface ICar
{
    string getType();
    void setType(type);
}
```

전체 구현은 다음과 같이 보일 것입니다:

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
class Audi : ICar
{
  private string type;
  private string color;
  public void getColor()
  {
    return this.color;
  }
  public void setColor(string color)
  {
    this.color = _color;
  }
  public void getType()
  {
    return this.type;
  }
  public void setType(string type)
  {
    this.type = _type;
  }
}
```

개발자분께서 경험상 TypeScript와 비교하여 C#은 더 풍부한 객체지향 프로그래밍(OOP) 기능을 제공한다는 것을 알게 될 것입니다. 인터페이스는 C#이 할 수 있는 것들 중 일부에 불과합니다. 더 발전된 개념은 리플렉션(reflection)을 사용하는 것인데, 지금은 제가 먼저 가려고 하는 것 같네요.

## Nest.js vs. ASP.NET

이제 논란이 될 부분으로 향하고 있습니다. 프로젝트에는 무엇을 선택해야 할까요?

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

둘 다 놀라운 프레임워크인데 고려해야 할 일부 결정은 개인적인 기호에 따라 다르게 결정될 수 있습니다. 이 둘 사이에서 선택을 하는 것은 얼마나 유사한지 때문에 까다로운 일입니다.

## 주요 기능 비교

Nest.js와 ASP.NET은 인증, 캐싱 및 데이터베이스 액세스와 관련된 기능을 쉽게 제공합니다. 두 프레임워크 모두 사용할 수 있는 기능입니다. Nest.js는 @nestjs/passport, @nestjs/cache-manager 및 @nestjs/typeorm 패키지를 사용하여 이러한 기능을 제공합니다. 한편 ASP.NET은 Microsoft.AspNetCore.Authentication, Microsoft.AspNetCore.Caching.Memory 및 유명한 Microsoft.AspNetCore.Identity.EntityFrameworkCore와 같은 패키지를 통해 인증, 캐싱 및 데이터베이스 액세스(및 더!) 기능을 제공합니다.

Tevpro의 기사에서는 Nest.js가 제공하는 기본 기능의 집합을 설명하고 있습니다. Nest.js와 ASP.NET 간의 사용 가능한 패키지를 비교한 테이블을 참조하여 더 자세한 내용을 확인할 수 있습니다.

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

각 프레임워크의 주요 기능 간 결과는 비슷하지만, Nest.js와 ASP.NET은 둘 다 거대한 커뮤니티를 뒷받침하고 있습니다. 예를 들어, Nest.js는 Node.js 커뮤니티를 의지할 수 있고, ASP.NET은 거의 모든 대규모 기업 시스템에서 사용되기 때문에 대규모 기업 후원을 받고 있습니다.

당연히 ASP.NET 웹 프레임워크 쪽에는 Nest.js보다 더 많은 패키지가 있습니다. 이는 ASP.NET이 더 오래되었기 때문입니다. 그러나 언젠가는 Nest.js도 JavaScript 및 TypeScript 개발자들의 수가 더 많아지면서 혜택을 받을 것입니다.

## 유사점

Nest.js와 ASP.NET 사이에는 많은 유사점이 있다는 것이 놀라울 수도 있습니다. 그러나 둘 다 일상적으로 OOP에 크게 의존하고 있으며 TypeScript와 C#이 프로그래밍 언어로서 얼마나 유사한지를 고려할 때, 어떤 프레임워크를 사용하는지에 따라 앱을 비교할 때 큰 차이가 없습니다.

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

간단한 Nest.js 프로젝트를 위한 서비스 컨트롤러는 아래와 같이 보일 것입니다:

```js
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

AppController는 의존성 주입을 통해 AppService를 받아오며, getHello 함수는 문자열을 응답으로 반환합니다. 예를 들어, ASP.NET의 유사한 컨트롤러는 다음과 같이 보일 것입니다:

```js
namespace Backend.AppController
{
    [ApiController]
    public class AppController
    {
        private readonly AppService appService;

        public AppController(AppService _appService)
        {
            this.appService = _appService;
        }

        [HttpGet]
        public async Task<IActionResult> GetHello()
        {
            return Ok(this.appService.GetHello());
        }
    }
}
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

Nest.js와 비교하면 ASP.NET에서 작성하는 것이 더 장황해 보입니다. 그리고 두 가지 모두 컴파일된 언어를 사용하기 때문에 컴파일러가 런타임 전에 유형 오류와 같은 사소한 오류를 잡아줄 수 있습니다.

## Nest.js 대 ASP.NET 성능평가

두 프레임워크 간 속도를 비교하는 것은 논란이 될 수 있고, 최소한 몇몇 비평을 유발할 것입니다. 하지만 프레임워크를 선택할 때 약간 고려해 볼 가치가 있습니다.

2022년 Tech Empower Web Benchmarks에 따르면 ASP.NET Core는 14위로 세계에서 14번째로 빠른 프레임워크입니다.

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

![image 1](/assets/img/2024-06-20-WhyNestJSisthePerfectFrameworkforASPNETTeamsMigratingtoNodejsOrVice-Versa_1.png)

While Nest.js, using a Fastify backend, is ranked at #239.

![image 2](/assets/img/2024-06-20-WhyNestJSisthePerfectFrameworkforASPNETTeamsMigratingtoNodejsOrVice-Versa_2.png)

Please note that these benchmarks are arbitrary speed calculations of how fast a framework would respond. You don’t necessarily need a fast framework most of the time. And the most important metric is (arguably) your development speed, but that’s VERY subjective, bringing us to the next point.

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

---

# Nest.js 대신 ASP.NET을 고려해야 하는 시기 (또는 그 반대)

대중들의 의견을 살펴보면 결정을 내리기 어려울 것입니다. 두 프레임워크를 비교하는 의견은 주로 물어보는 커뮤니티에 따라 (또는 이 경우에는 Sub Reddit에 따라) 다를 수 있습니다.

Reddit을 살펴보면, 몇 개의 게시물이 두 프레임워크를 비교하는데 (일부 게시물은 Node.js를 직접적으로 ASP.NET과 비교합니다) 있습니다. 토론에서 주로 나오는 의견은 "Node.js에서 ASP.NET으로 전환하려면 먼저 TypeScript를 고려해보라"로 요약됩니다.

Nest.js는 이미 TypeScript를 사용하고 있으니, 이것이 문제를 해결해 줄 것이라 생각할 수 있겠죠? 그렇지 않습니다. 그렇게 간단하지는 않습니다. TypeScript를 사용하는 것이 더 나은 이유는 frontend 언어와 backend 언어를 결합해 소규모 팀이 제품을 성장시키기 더 쉬워지기 때문이라고 주장하기는 하지만, ASP.NET을 사용하는 경우 더 합리적인 상황이 있을 수 있습니다.

---

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

예를 들어 클라우드 공급업체가 Azure이고 벤더 락인이 신경 쓰이지 않는다면 ASP.NET이 더 나은 선택입니다.

그러나 보다 넓은 시각에서 볼 때 Nest.js와 ASP.NET 사이에 큰 차이가 많이 없습니다. 두 프레임워크가 추구하는 철학에는 많은 중첩이 있어서 OOP의 활발한 사용이 그 중 하나입니다. 때로는 특히 언어별 차이 덕분에 두 프레임워크 사이에 인상적인 유사성을 찾을 수 있습니다.

실용적으로 중요한 것은 기본 속도, 프로젝트 구조, 라이브러리 이용 가능성 및 커뮤니티 지원을 고려할 필요가 없습니다. 다음 사항만 고려하면 됩니다:

- 팀의 특정 기술 세트.
- 제품 개발 일정.
- 사용 중인 클라우드 공급업체.

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

두 프레임워크 모두 서버 측 렌더링 프레임워크로, 전통적인 MVC 애플리케이션을 간편하게 연결하여 밀접하게 통합된 모노리스를 만들 수 있습니다.

프레임워크를 선택할 때 흔히 발생하는 함정에 대해 알아야 합니다. 이전 선택사항에 과도하게 고집하지 말고, 시대가 변화하고 어떤 프레임워크가 인기 경쟁에서 우승한 것뿐만 아니라 그 기능적인 우수성 때문에 더 많이 채택될 수도 있다는 점을 인식해야 합니다. 사소한 문제 때문에 발목을 잡지 마세요, 더 나은 선택을 해보세요!

# 결론

Nest.js와 ASP.NET은 놀라운 프레임워크이지만, 일반적으로 사용 사례는 구축하고 있는 팀(또는 가지게 되는 팀) 유형에 제한됩니다.

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

이 프레임워크들을 명백하게 선택해야 하는 이유는 없어요. 다른 언어보다 여기서 사용하라고 강제하거나 산업에 특화된 작업을 진행하는 경우, 게임 개발에 Unity를 사용하면서 C#을 사용해야 하는 경우처럼 특정 언어 집합을 사용해야 하는 경우를 제외하고는 백엔드로 ASP.NET을 고려해 보세요.

Nest.js와 ASP.NET 중에서 선택하는 것은 Nest.js와 고성능 Go/Rust 웹 프레임워크 중에서 선택하는 것만큼 중대하지 않아요. 각각의 독특함은 있지만 전반적으로 차이보다는 중첩된 부분이 더 많아요. 그러니 기술에 대해 너무 꼼꼼하게 고려할 필요 없어요. 시대에 맞춰 움직이세요. 즐겁게 코딩하세요!

원문: https://blog.logrocket.com, 2022년 11월 22일에 발행됨.
