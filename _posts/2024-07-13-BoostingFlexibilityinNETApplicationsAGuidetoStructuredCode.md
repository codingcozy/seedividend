---
title: "NET 애플리케이션 유연성 향상 구조화된 코드 작성을 위한 가이드"
description: ""
coverImage: "/assets/img/2024-07-13-BoostingFlexibilityinNETApplicationsAGuidetoStructuredCode_0.png"
date: 2024-07-13 21:27
ogImage: 
  url: /assets/img/2024-07-13-BoostingFlexibilityinNETApplicationsAGuidetoStructuredCode_0.png
tag: Tech
originalTitle: "Boosting Flexibility in .NET Applications: A Guide to Structured Code"
link: "https://medium.com/gitconnected/boosting-flexibility-in-net-applications-a-guide-to-structured-code-f65a13f4ef36"
---



![Boosting Flexibility in .NET Applications](/assets/img/2024-07-13-BoostingFlexibilityinNETApplicationsAGuidetoStructuredCode_0.png)

요 며칠간 새로운 솔루션을 개발하면서 언급할 가치가 있는 측면을 발견했어요. 바로 좋은 구조화와 관심 분리에 관한 것이죠.

# 문제 이해

먼저, 두 구성 요소가 어떻게 구조화되어 있고 서로 어떻게 통신하는지 살펴보겠습니다. 저는 .NET Core를 사용하여 C#으로 응용 프로그램을 작성하고 있습니다. 주기적으로 스크레이핑하는 스크레이퍼 구성 요소를 갖고 있습니다. 이를 백그라운드 서비스로 디자인했습니다. 이 구성 요소의 구체적인 내용은 이 기사에 중요하지 않습니다. 그냥 이 서비스가 스크랩에서 생성된 페이로드를 일종의 원시 데이터로 Azure EventGrid에 발행한다는 것만 알아두세요. 핵심 서비스는 이를 구문 분석하고 Azure SQL 데이터베이스에 저장하는 .NET Core Web API 서비스입니다.


<div class="content-ad"></div>


![Boosting Flexibility in .NET Applications](/assets/img/2024-07-13-BoostingFlexibilityinNETApplicationsAGuidetoStructuredCode_1.png)

오늘은 API 서비스에서 수신된 이벤트를 처리하고 처리하는 방법에 대해 이야기하려고 합니다. 처음에는 이벤트를 역직렬화하고 데이터 구조로 변환한 후 서비스 메서드에서 비즈니스 규칙을 통합하고 저장할 것으로 생각했습니다.

다음은 코드 일부입니다.

```js
public class CompanyService {
  ...
  
  public async Task CreateOrUpdateCompany(EventGridEvent eventGridEvent, CancellationToken cancellationToken){
    var receivedEvent = eventGridEvent.Data.ToObjectFromJson<CompanyScrapedEvent>();
    
    // 회사가 이미 있는지 확인 등.

    var company = new CompanyData {
        Name = receivedEvent.CompanyName,
        ...
    }

    await _dbContext.Companies.AddAsync(company, cancellationToken);
    await _dbContext.SaveChangesAsync(cancellationToken); 
  }
}
```

<div class="content-ad"></div>

이 방법을 처음 보면 꽤 간단해 보일 수 있어요. 하지만 실제로 무슨 일이 일어나는 걸까요? 우리는 구조가 변경될 수 있는 외부 이벤트를 통합하고, 이를 도메인별 모델에 꽤 밀접하게 결합하고 있어요. 이벤트의 변경은 쉽게 내 코드에 오류를 일으킬 수 있어요. 외부 이벤트와 도메인별 요구 사항 간의 결합이 너무 밀접하다고 생각해요.

게다가 유효성 검사와 비즈니스 규칙들은 코드를 부풀리고 가독성을 떨어뜨릴 수 있어요. 저는 종종 처리 방법에서 호출되는 메서드를 추가하는 접근 방식을 보아 왔어요. 그것이 해결책이 될 수는 있지만, 대게 절차적인 코드로 끝나곤 해요. 그렇기 때문에 그게 가는 길은 아닌 것 같아요.

또한 도메인 주도 설계 원칙을 적용할 때, 이벤트와 명령을 이해하는 것이 중요하죠. 예를 들어 'CompanyScraped' 이벤트를 생각해보세요. 이 이벤트는 과거에 발생한 것입니다. 그것에 반응하고 데이터를 변경하는 명령을 만들 수 있지만, 이벤트 자체는 정보를 어떻게 처리할지 전혀 모릅니다. 의미론적으로는 외부 이벤트가 즉시 쓰기 작업을 트리거하는 것은 약간 이상해요.

# 수직 슬라이스 아키텍처 적용

<div class="content-ad"></div>

나의 최근 기사에서는 수직 슬라이스 아키텍처 접근 방식을 자세히 설명했습니다. 물론, 여기서도 계속 설명하고 싶습니다. 쿼리와 명령을 구분한다는 것을 기억해 주세요. 또한 사용 사례의 구현이 별도의 슬라이스로 작동하는 방법을 보여줬습니다. 각 사용 사례에 대해 핸들러, 명령 또는 쿼리, 그리고 필요한 경우 응답 정의 클래스를 포함하는 별도의 폴더가 있습니다.

MediatR 및 .NET Minimal API를 사용하면 엔드포인트 핸들러 구현을 사용 사례(슬라이스)와 분리할 수 있으며 실제로 필요한 것에 대한 종속성을 제한하는 것이 쉽습니다. 아래의 엔드포인트 핸들러 예제를 참조하세요.

```js
var companies = await mediator.Send(new GetCompaniesQuery { Country = country, Score = score });
await context.Response.WriteAsJsonAsync(companies);
```

엔드포인트 구현은 해당 쿼리에 대한 지식만 가지고 있으며 MediatR을 사용하여 요청을 전송하며, MediatR은 다시 해당 쿼리를 해결하고 요청을 처리하기 위해 올바른 핸들러 구현을 호출할 수 있습니다. 이것은 코드에서 느슨한 결합과 높은 응집력을 위해 작성하는 뛰어난 예입니다.

<div class="content-ad"></div>

![image](/assets/img/2024-07-13-BoostingFlexibilityinNETApplicationsAGuidetoStructuredCode_2.png)

해당 사용 사례 자체, 즉 GetCompanyById 폴더 안에 있는 모든 것은 매우 응집력 있는 요소를 설명합니다. 이 요소들은 함께 속해 있고 밀접한 관련이 있습니다. 간단히 말해 함께 변경되는 코드는 함께 유지됩니다. 이것이 Vertical Slice Architecture 접근 방식의 엄청난 장점입니다.

Vertical Slice Architecture에 아직 익숙하지 않다면 다음 기사들을 읽어보시기를 권합니다:

Rethinking Architectural Boundaries: From Layered to Vertical Slice Architecture

<div class="content-ad"></div>

아키텍처 경계 다시 생각하기: .NET Core에서 수직 슬라이싱을 통한 디커플링

그럼, 실제 주제로 넘어가 봅시다. 우리가 Azure 이벤트 그리드로부터 웹훅을 받는 엔드포인트가 있다고 해봅시다 (다른 것일 수도 있습니다). 라우터는 다음과 같이 보일 것입니다:

```js
public static RouteGroupBuilder WebhooksEndpoint(this RouteGroupBuilder group)
{
    group.MapPost("/webhook", HandleEventGridWebhook);

    return group;
}
```

핸들러는 메서드 의존성 주입을 사용한 정적 메서드가 될 수 있습니다. 이 핸들러의 유일한 책임은 POST 웹훅을 받아 페이로드를 추출하고 올바른 명령을 호출하는 것입니다.

<div class="content-ad"></div>

```js
async static Task HandleEventGridWebhook(
    [FromBody] EventGridEvent[] eventGridEvents,
    HttpContext context,
    IMediator mediator)
{
    try
    {
        // 먼저 시스템 이벤트인지 확인하여 구독을 등록할 수 있는지 유효성을 검사합니다...
        ...  

        foreach (var eventGridEvent in eventGridEvents)
        {
            var receivedEvent = eventGridEvent.Data.ToObjectFromJson<CompanyScrapedEvent>();
            var command = new CreateOrUpdateCompanyCommand(){
                // 이벤트를 명령으로 매핑합니다.
            }
            await mediator.Send(command);
        }

        await context.Response.WriteAsync("비즈니스 이벤트가 수신되어 처리되었습니다!");
    
    }
    catch (Exception ex)
    {
        // 에러를 정상적으로 처리합니다.
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        await context.Response.WriteAsync("이벤트 처리 중 오류가 발생했습니다.");
    }
}
```

# 인프라스트럭처 레이어 개선

이로 인해 다음 사항에 대해 좀 더 심층적으로 고려해야 한다는 생각이 드네요. 먼저, 이벤트와 명령이 실제로 어디에 속하는지 궁금합니다. 명령은 특정 사용 사례의 일부라고 생각되며, 위에서 설명한 수직 슬라이스 접근 방식과 관련이 있습니다. 그러나 이벤트는 외부 서비스에서 가져오는 정의로, 응용 프로그램 레이어인지 인프라스트럭처 레이어인지 궁금합니다. 도메인 주도 설계 관점에서 응용 프로그램 레이어와 인프라스트럭처 레이어의 차이를 간단히 설명해 드릴게요.

인프라스트럭처 레이어: 이 레이어는 데이터베이스, 파일 시스템, 웹 서비스 등과 같은 외부 시스템 및 상호 작용과 관련된 모든 문제에 대해 책임을 지닙니다. 외부 이벤트 모델(즉, 외부 시스템에서 데이터를 역직렬화하는 데 사용하는 모델)은 일반적으로 여기에 속합니다. 외부 시스템과의 상호 작용 방식을 정의하는 이 모델들은 시스템이 외부 시스템과 어떻게 상호 작용하는지를 정의하기 때문입니다.


<div class="content-ad"></div>

응용 계층: 이 계층은 응용프로그램별 로직을 담당합니다. 즉, 시스템 내에서 사용 사례의 흐름을 조정합니다. 명령 및 쿼리는 일반적으로 여기에 위치하지만, 외부 시스템에서 수신한 데이터의 정확한 형태는 보통 여기에 속하지 않습니다. 일반적으로 여기에 사용 사례를 배치합니다. 이미 이 주제에 대해 기사에서 예제를 보여 드렸습니다.

외부 모델이 단순히 외부 시스템에서 수신한 데이터의 생 데이터 형태인 경우, 인프라스트럭처 계층에 가장 적합합니다. 다른 서비스를 통해 메시지 큐나 유사한 방법으로 수신된 이벤트에 해당됩니다. 그래서 이를 이 계층에 배치합니다.

# 이벤트를 명령으로 매핑하는 구현

제게 두 번째 문제는 이미 위의 예에서 언급한 대로 엔드포인트 핸들러에 이벤트에서 명령으로의 매핑이 포함된다는 점입니다. 이것은 큰 객체를 다룰 때 혼란스러울 수 있습니다. 필요한 경우 추가로 유효성 검사도 수행됩니다. 이것은 내 의견으로는 핸들러를 불필요하게 복잡하게 만들고 그 자리에 없어야 할 코드입니다.

<div class="content-ad"></div>

다시 말해서 매핑 코드를 외부에 아웃소싱하는 것이 더 나을 수 있습니다. 그렇게 하면 쉽게 확장 가능한 구조를 얻을 수 있습니다.

```js
/Infrastructure
    /IntegrationEvents
        /Incoming
            CompanyScrapedEvent.cs
            AnotherExternalEvent.cs
            ...
        /Outgoing
            ...
        /Mappers
            CompanyScrapedEventToCreateOrUpdateCommandMapper.cs
            ...
```

- Incoming: 외부 시스템에서 내 시스템으로 들어오는 이벤트 또는 데이터를 나타내는 모델입니다.
- Outgoing: 시스템이 외부 시스템으로 보내는 이벤트나 메시지가 있는 경우, 해당 모델을 여기에 정의할 수 있습니다.
- Mappers: 통합 이벤트 모델과 응용 프로그램의 내부 명령, 이벤트 또는 기타 표현 사이의 변환 논리입니다.

이렇게 조직화하면:

<div class="content-ad"></div>

- 우리는 시스템의 통합 포인트를 신속하게 식별하고 격리할 수 있습니다.
- 새로운 외부 시스템과 통합하거나 기존 통합이 변경될 때, 새로운 모델이나 로직을 추가해야 할 위치가 명확합니다.
- 입력 및 출력을 분리함으로써 특히 양방향 통합이 많은 시스템에서도 명확성을 높일 수 있습니다.

외부 관심사를 중심 도메인 및 애플리케이션 계층과 격리시켜야 한다는 핵심 원칙을 기억하세요. 이러한 관심사를 인프라스트럭처 계층에 배치하고 명확한 조직을 제공함으로써 이 원칙을 준수하고 시스템을 유지보수 가능하고 확장 가능하게 설정하고 있습니다.

이전에 언급한 맵핑 부분에 대해 이야기해 봅시다.

제가 예상하기에, 다른 시스템과 상호작용하는 응용프로그램에서는 일반적으로 여러 이러한 맵핑이 필요할 것입니다. 그래서 아래와 같이 인터페이스를 정의하는 것이 좋은 아이디어라고 생각합니다.

<div class="content-ad"></div>

```js
public interface IEventMapper<in TIn, out TOut>
{
    TOut Map(TIn inputEvent);
}
```

이것을 통해 전략 패턴 사용 능력을 활용하려고 합니다. 이 패턴은 이벤트에 따라 적절한 맵퍼를 식별하는 데 사용할 것입니다. 이는 인터페이스를 준수하는 것 외에도 모든 맵퍼를 개별적으로 등록할 필요가 없다는 추가적인 이점이 있습니다.

간단한 경우에는 맵퍼 구현이 다음과 같이 보입니다.

```js
public class CompanyScrapedEventToCreateOrUpdateCompanyCommandMapper : IEventMapper<ExternalSystemAEventModel, AddCompanyCommand>
{
    public CreateOrUpdateCompanyCommand Map(CompanyScrapedEvent inputEvent)
    {
        return new CreateOrUpdateCompanyCommand
        {
            // 프로퍼티 매핑
            Name = inputEvent.CompanyName,
            // ... 다른 매핑
        };
    }
}
```

<div class="content-ad"></div>

이제 다음과 같이 전략 클래스를 구현합시다:

```js
public class EventMapperStrategy
{
    private readonly IDictionary<Type, object> _mappers;

    public EventMapperStrategy()
    {
        _mappers = new Dictionary<Type, object>
        {
            { typeof(CompanyScrapedEvent), new CompanyScrapedEventToCreateOrUpdateCompanyMapper() },
        };
    }

    public IEventMapper<TIn, TOut> GetMapper<TIn, TOut>()
    {
        if (_mappers.TryGetValue(typeof(TIn), out var mapper))
        {
            return (IEventMapper<TIn, TOut>)mapper;
        }

        throw new InvalidOperationException($"No mapper found for type {typeof(TIn).Name}");
    }
}
```

이 접근 방식을 통해 매핑 로직을 집중화할 수 있습니다. 모든 이벤트 매핑은 한 곳에 있어 관리하고 확장하기 쉽습니다.

이 솔루션으로 SOLID 원칙을 따릅니다. 특히 개방/폐쇄 원칙과 단일 책임 원칙을 준수합니다. 기존 코드를 변경하지 않고 새로운 매퍼를 추가하여 시스템을 쉽게 확장할 수 있습니다.

<div class="content-ad"></div>

이벤트 유형에 따라 사용할 올바른 매퍼를 결정하는 것은 관심사 분리를 보장하는 EventMapperStrategy 클래스의 전적인 책임입니다.

Program.cs에서는 EventMapper 클래스를 다음과 같이 등록하기만 하면 됩니다:

```js
builder.Services.AddSingleton<EventMapperStrategy>();
```

엔드포인트 핸들러 내부의 구현을 살펴봅시다. 여전히 간결하고 명확하며 이해하기 쉽습니다. 여기에 최신화된 핸들러 구현이 있습니다.

<div class="content-ad"></div>

```js
static async Task HandleEventGridWebhook(
        [FromBody] EventGridEvent[] eventGridEvents,
        HttpContext context,
        EventMapperStrategy eventMapperStrategy,
        IMediator mediator) 
    {
        try
        {
            // 필요한 작업: 시스템 이벤트인지 확인하여 구독 등록하기...
            ...
            foreach (var eventGridEvent in eventGridEvents)
            {
                var receivedEvent = eventGridEvent.Data.ToObjectFromJson<CompanyEvent>();
                var command = eventMapperStrategy.GetMapper<CompanyEvent, AddCompanyCommand>().Map(receivedEvent);
                await mediator.Send(command);
            }

            await context.Response.WriteAsync("비즈니스 이벤트를 받았고 처리되었습니다!");
            }
        }
        catch (Exception ex)
        {
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            await context.Response.WriteAsync("이벤트 처리 중 오류가 발생했습니다.");
        }
    }
```

# 간단히 마무리하며

요약하자면, 응용 프로그램을 적절하게 구조화하고 관심을 분리하는 노력은 유지 보수성, 확장성 및 전반적인 품질에 상당한 영향을 미칠 수 있습니다. Vertical Slice Architecture 및 Domain-Driven Design과 같은 원칙을 적용하여, 응용 프로그램이 효과적으로 관리되며, 미래에 발생할 수 있는 변경에 유연하게 대응할 수 있도록 할 수 있습니다. 목표는 견고하며 이해하기 쉽고, 필요할 때는 쉽게 변경할 수 있는 시스템을 만드는 것입니다. 마치 레고 블록을 사용하여 구축하는 것과 같습니다 - 각 부품은 자리를 가지고 있으며, 추가하거나 변경할 때 손쉽게 할 수 있습니다.

건배하세요!
