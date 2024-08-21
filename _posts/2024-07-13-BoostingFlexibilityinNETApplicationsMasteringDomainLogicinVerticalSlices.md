---
title: "NET 애플리케이션의 유연성 극대화 도메인 로직 수직 슬라이스 마스터하기"
description: ""
coverImage: "/assets/img/2024-07-13-BoostingFlexibilityinNETApplicationsMasteringDomainLogicinVerticalSlices_0.png"
date: 2024-07-13 21:25
ogImage:
  url: /assets/img/2024-07-13-BoostingFlexibilityinNETApplicationsMasteringDomainLogicinVerticalSlices_0.png
tag: Tech
originalTitle: "Boosting Flexibility in .NET Applications: Mastering Domain Logic in Vertical Slices"
link: "https://medium.com/gitconnected/boosting-flexibility-in-net-applications-mastering-domain-logic-in-vertical-slices-d26ad2e0883f"
isUpdated: true
---

<img src="/assets/img/2024-07-13-BoostingFlexibilityinNETApplicationsMasteringDomainLogicinVerticalSlices_0.png" />

함께 소프트웨어 개발의 복잡성을 마스터하는 여정을 계속해봅시다. 지난 글에서는 기능 또는 사용 사례를 구현할 때 나만의 사고 방식과 접근 방법에 대한 통찰을 제공했습니다. 항상 과정이라는 것을 보여줬죠. 즉, "작동함"에서 "견고하고 지속 가능하며 유지 관리가능한"으로 말이죠.

# 수직 슬라이스 아키텍처: 유연한 접근 방식

오늘의 글에서는 도메인별 핸들러를 어떻게 구현할 수 있는지 보여드리고 싶습니다. 미리 강조하고 싶은 점은 여전히 수직 슬라이스 아키텍처의 길을 따르고 있다는 것입니다. 그리고 그 이유가 있습니다. 이 방식을 통해 우리는 유연할 수 있기 때문이죠. "계층화된 아키텍처에서 수직 슬라이스 아키텍처로의 아키텍처적 경계 재고"라는 제 글에서 엄격한 계층화된 아키텍처 지지자에서 수직 슬라이스와 같은 유연한 접근 방식으로 진화하는 과정을 설명했습니다. 또한 항상 틀린 것과 맞는 것이 아니라 세상이 흑백이 아니라는 점을 상기시켜드리고 싶습니다. 종종 세세한 차이가 있고 올바른 아키텍처 접근 방식을 선택하는 것은 비즈니스 요구사항, 팀 배경 및 기술, 조직 구조 등과 같은 상황에 달려있음을 기억해주시기 바랍니다.

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

수직으로 조각을 나누면 특정 사용 사례를 구현하는 방법에 있어 유연성을 제공합니다. 예를 들어, 예전의 CRUD 패턴에서 우리는 간단한 요청을 받아 페이로드를 데이터베이스에 저장해야 할 수도 있습니다. 이 경우 서비스 클래스는 필요하지 않을 수 있으며 DbContext나 심지어 SQL 문만 있으면 될 수도 있습니다. 다른 경우에는 더 많은 로직이 필요하고 전용 도메인 서비스가 필요할 수도 있습니다. 내가 말하고 싶은 것은 우리가 반드시 처음부터 커밋할 필요가 없다는 것이고, 경우에 따라 가장 적합한 접근법을 선택할 수 있다는 것입니다.

하지만 다양한 사용 사례에 대해 더 관련성이 있는 일반적인 기능은 어떻게 해야 할까요? 이것이 이 기사에서 논의하고 싶은 것입니다.

또한 이러한 것들은 항상 매우 추상적으로 들리고 구체적인 구현은 많은 질문을 던지기 때문에, 저는 최근에 제 현재 프로젝트에서 구현한 예시를 보여드리고 제 방법을 설명하고 싶습니다.

# 서비스 클래스의 딜레마

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

시작하기 전에, 서비스 클래스에 대해 몇 마디 꼭 해야겠어요. 많은 해 동안, 저는 계층을 가볍게 유지하고 비즈니스 로직을 도메인 서비스로 넣는 것을 옹호해 왔어요. 그러나 아쉽게도, 제가 자주 비판하는 컨트롤러처럼, 서비스 클래스도 뚱뚱하고 지저분한 컨테이너가 되곤 해요. 이는 종종 단순히 "오, 주문 서비스가 필요하겠구나"라고 빠르게 생각하여 주문과 관련된 모든 것을 거기에 "모아" 놓기 때문일 때문이죠. 그것은 결국 클래스 내의 메소드 모음일 뿐이라고 생각하니까 더 이상 좋은 생각이 아니라고 생각해요. 단일 책임 원칙이 종종 빨리 깨지기 때문이에요. 따라서 우리는 계속해서 증가하는 사용 케이스의 수를 견딜 수 있는 더 나은 접근 방식이 필요합니다.

물론, 계층의 역할을 분리하면 관심사를 잘 분리할 수 있다는 점을 고려하는 방법이 있어요. 예를 들어, 도메인 모델은 어떤 비즈니스 규칙을 적용해야 하는지 알지만 영속성에 대해는 알지 못해요. 레포지토리는 그것을 알지만 도메인 로직과 관련이 없는 것을 알고 있어요.

하지만, 이것은 클래스가 컨테이너로 커지고 커지며 새로운 메소드로 확장되는 것을 막지 않고, 단일 책임의 위반으로 이어질 수 있다는 점을 방지하지는 못해요.

# 사례 연구: CountryFinder를 활용한 회사 데이터 스트림라인화

제 예시에서, 최근 Vertical Slice Architecture 접근 방식을 통해 들어오는 요청을 명령어로 전환하는 것을 설명한 지난 기사를 따라가고 싶어요. 이 기사는 솔루션의 구조화, 매핑 및 .NET에서 MediatR을 사용하여 명령어 적용에 중점을 둔 것이었어요.

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

이 사용 사례에서는 다른 시스템의 요청 데이터를 우리 시스템으로 변환하는 과정에서 다음과 같은 문제가 발생했습니다.

간단히 이에 대해 설명해 드리겠습니다. 제3자 서비스는 회사에 관한 정보를 포함하는 이벤트를 게시합니다. 이 이벤트에는 국가 정보가 포함되어 있는데, 아래 예시 payload에서 확인할 수 있듯이 국가 정보가 포함되어 있습니다.

```js
{
  "name": "My Test Company SL",
  "address": {
    "street_address": "Carretera Cádiz-Málaga 16",
    "zip_code": "20808",
    "state": "Guipúzcoa",
    "country": "España",
    "city": "Getaria"
  },
  // 추가 속성
  ...
}
```

그러나 요청 payload에서 국가는 여러 언어로 표시될 수 있습니다. 예를 들어 "Spain" 대신에 "España"로 나타날 수 있습니다. 그러나 제 도메인 모델에서 국가 정보는 ISO 3166–1 alpha-2 표준 국가 코드와 이름으로 구성된 국가 목록을 참조합니다. 다음 예시를 참조해주십시오.

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

<img src="/assets/img/2024-07-13-BoostingFlexibilityinNETApplicationsMasteringDomainLogicinVerticalSlices_1.png" />

어쨌든, 제가 해야 하는 것은 저장할 올바른 항목을 찾아서 저장 중인 레코드에 올바른 국가 코드를 할당하는 것입니다.

아마도 이미 알아챘겠지만, 이것은 이미 CreateOrUpdateCompanyHandler에 포함시키고 싶지 않은 코드입니다. 심지어 비공개(private) 메서드로 넣는다 해도, 그러면 많은 종속성과 너무 많은 지식이 담긴 거대한 클래스로 이어질 것입니다.

다음 그림을 살펴보고 핸들러가 수행해야 하는 작업을 대략적으로 이해해 보세요.

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

```csharp
public class CreateOrUpdateCompanyHandler : IRequestHandler<CreateOrUpdateCompanyCommand>
{
    private readonly DbContext _context;

    public CreateOrUpdateCompanyHandler(
        DbContext context)
    {
        _context = context;
    }

    public async Task Handle(CreateOrUpdateCompanyCommand command, CancellationToken cancellationToken)
    {
        // Step 1: Validate and find country
        ...

        // Step 2: Check if the company already exists
        ...

        // Step 3: Update or create company
        ...

        // Step 4: Save changes
        await _context.SaveChangesAsync(cancellationToken);
    }
}
```

여기서 필요한 것은 어떤 언어를 사용하더라도 올바른 국가 엔티티를 반환할 수 있는 작고 재사용 가능한 구성 요소입니다. 그리고 단일 책임 원칙을 충족시키기 위해 이 "것"은 그것만 할 수 있어야 합니다. 대략적으로 CountryFinder와 같은 것을 생각하고 있습니다.

처음으로 떠오른 생각은 리포지토리를 만들 수 있을 것이라는 것입니다. 국가 리포지토리와 회사 리포지토리를 만들어 데이터베이스 질의 및 쓰기와 관련된 모든 작업을 거기에 넣을 수 있습니다. 하지만 이것이 큰 도움이 될까요? 저는 아니라고 생각합니다. 왜냐하면 핸들러가 명령 데이터를 유효성 검사하고 변환하는 데 필요한 것이 없기 때문입니다. 회사 리포지토리는 회사 데이터 모델/데이터베이스와 상호 작용하는 방법에 대한 메서드 모음으로 단순히 변할 것입니다.

도메인 모델이 없거나 필요하지 않는 한 DbContext를 핸들러에 주입하고 생성된 데이터 객체를 저장하는 것으로 충분히 사용할 수 있습니다.

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

나라 항목을 결정하기 위해서는 레포지토리만으로는 충분하지 않을 거예요. 왜냐하면 입력값을 기반으로 나라 항목을 결정할 논리가 필요하기 때문이죠. 입력값은 기본적으로 영어로된 나라, 나라 코드 또는 다른 언어로 된 나라일 수 있어요.

하지만 한 걸음씩 진행해 보죠. 여전히 우리가 ISO 기반 테이블에서 "ES - 스페인" 항목을 "España" 입력값으로 어떻게 찾을지 문제를 해결해야 해요.

# 나라 번역 엔티티 구축

이를 위해 다음과 같은 솔루션을 만들었어요. 이 요구 사항을 확장 가능한 방식으로 해결하기 위해 비ISO 국가 이름을 ISO 국가 코드에 매핑하는 CountryTranslation 엔티티를 만들었어요. 이 엔티티를 나중에 CountryFinder에서 사용하여 국가 이름을 ISO 코드로 변환한 후 Countries 테이블을 찾아보고 싶어요.

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
public class CountryTranslation
{
    public string NonIsoName { get; set; }
    public string IsoCode { get; set; }
}
```

데이터베이스의 항목은 다음과 같이 보일 것입니다.

![image](/assets/img/2024-07-13-BoostingFlexibilityinNETApplicationsMasteringDomainLogicinVerticalSlices_2.png)

국가 이름을 다른 언어로 ISO 국가 코드에 매핑하는 데 필요한 사전 작업을 완료했습니다. 이를 통해 CountryFinder가 작동해야 하는 방법에 대한 아이디어가 나타납니다.

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

```javascript
public class CountryFinder
{
    private readonly DbContext _context;

    public CountryFinder(DbContext context)
    {
        _context = context;
    }

    public async Task<CountryData?> FindCountryAsync(string input)
    {
        // 먼저, ISO 국가 이름을 ISO 코드로 변환해 보세요
        ...

        // 그런 다음, ISO 코드로 찾아 보세요
        ...

        // 마지막으로, 이름으로 찾아 보세요

        return country;
    }
}
```

# CountryFinder는 어디에 위치해야 할까요?

하지만, 이 컴포넌트를 구현하기 전에, CountryFinder가 어디에 위치해야 할지 자문을 구하려고 합니다. 제가 말한 대로, 이것은 단일 책임 원칙을 준수하도록 정확히 한 가지 일을 하는 재사용 가능한 유닛입니다.

물론, CountryFinder를 "회사 생성 또는 업데이트" 슬라이스의 일부로 만들어 그곳에서만 사용할 수도 있습니다. 그러나 저는 Finder를 다른 사용 사례에서도 잘 활용할 수 있을 것으로 보여서 이를 재사용 가능하다고 생각하고 다른 위치를 볼 수 있습니다. 이는 수직 슬라이스 아키텍처에서 각 슬라이스(또는 기능 또는 사용 사례)가 격리되고 독립되어야 한다는 원칙을 따르기 때문입니다. 그러나 CountryFinder와 같은 일반적인 기능은 다른 슬라이스에서도 사용할 수 있습니다. CountryFinder 로직을 각 슬라이스에 넣는 대신 고립을 유지하려면서도 중복 코드를 피하려는 경향이 있습니다. 이는 잠재적인 코드 중복으로 인해 일반적으로 권장하지 않는 방법입니다.

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

저는 다양한 슬라이스에서 사용할 수 있는 CountryFinder와 같은 유틸리티나 서비스를 저장하는 공유 폴더를 애플리케이션 레이어 내에 생성하기로 결정했습니다. 애플리케이션 레이어는 다음과 같이 구성됩니다.

```js
-Application - Company - CreateOrUpdateCompany - Shared - CountryFinder;
```

# 애플리케이션 레이어와 인프라스트럭처 레이어의 구분

가끔 애플리케이션 렠이어와 인프라스트럭처 레이어 사이의 구별이 약간 모호할 수 있기 때문에, CountryFinder를 인프라스트럭처 레이어가 아닌 애플리케이션 레이어에 넣기로 한 이유에 대해 설명해 드리겠습니다. 결정은 때로는 애플리케이션과 아키텍처의 구체적인 내용에 따라 다를 수 있습니다.

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

내 의견으로는 도메인 주도 설계 방식과 수직 슬라이스 아키텍처에서는 파인더(Finder)가 비즈니스 사용 사례와 워크플로를 지원하는 데 주로 사용되는 경우 응용 프로그램 레이어의 일부로 간주될 수 있습니다. 응용 프로그램 레이어는 작업이 조정되고 비즈니스 규칙이 처리되며 도메인 엔티티가 특정 비즈니스 요구에 맞게 조율되는 곳입니다.

그러나 파인더가 데이터 액세스 로직을 추상화하는 데 책임이 있고 비즈니스 로직이 없는 경우 인프라스트럭처 레이어의 일부로 간주될 수 있습니다. 인프라스트럭처 레이어는 일반적으로 데이터베이스 액세스, 파일 시스템 액세스 및 기타 외부 통합과 같은 문제를 다룹니다.

파인더 구현이 데이터베이스를 쿼리하고 비즈니스 로직이나 변환 없이 데이터베이스 객체를 반환하는 경우 인프라스트럭처 레이어의 일부로 간주될 수 있습니다. 그러나 응용 프로그램의 필요에 맞는 비즈니스 규칙이나 변환이 포함된 경우 응용 프로그램 레이어의 일부가 될 것입니다.

# CountryFinder 구현

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

제 CountryFinder의 구현에서는 로직이 있기 때문에 명확하게 응용 프로그램 계층에 할당했습니다.

```js
public class CountryFinder : ICountryFinder
{
    private readonly IntentDbContext _context;

    public CountryFinder(IntentDbContext context)
    {
        _context = context;
    }

    public async Task<CountryData?> FindCountryAsync(string input)
    {
        var isoCode = await _context.CountryTranslations
            .Where(ct => ct.NonIsoName.Equals(input))
            .Select(ct => ct.IsoCode)
            .FirstOrDefaultAsync();

        if (isoCode != null)
        {
            input = isoCode;
        }

        // 그런 다음 ISO 코드로 검색 시도
        var country = await _context.Countries
            .FirstOrDefaultAsync(c => c.Code.Equals(input));

        if (country != null)
        {
            return country;
        }

        // 마지막으로 이름으로 검색 시도
        country = await _context.Countries
            .FirstOrDefaultAsync(c => c.Name.Equals(input));

        return country;
    }
}
```

CountryFinder를 사용하려면 서비스로 등록해야 합니다. 이를 위해 Program.cs에 다음 라인을 추가해야 합니다.

```js
builder.Services.AddTransient<ICountryFinder, CountryFinder>();
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

이제 서비스를 RequestHandler에 주입하고 사용할 수 있습니다. 업데이트된 구현은 이제 다음과 같이 보일 것입니다.

```js
public class CreateOrUpdateCompanyHandler : IRequestHandler<CreateOrUpdateCompanyCommand>
{
    private readonly IntentDbContext _context;
    private readonly CompanyDataFactory _companyDataFactory;
    private readonly ILogger<CreateOrUpdateCompanyHandler> _logger;
    private readonly ICountryFinder _countryFinder;

    public CreateOrUpdateCompanyHandler(
        ICountryFinder countryFinder,
        IntentDbContext context,
        CompanyDataFactory companyDataFactory,
        ILogger<CreateOrUpdateCompanyHandler> logger)
    {
        _logger = logger;
        _countryFinder = countryFinder;
        _context = context;
        _companyDataFactory = companyDataFactory;
    }

    public async Task Handle(CreateOrUpdateCompanyCommand command, CancellationToken cancellationToken)
    {
        try
        {
            // Step 1: Validate and find country
            var country = await _countryFinder.FindCountryAsync(command.Address?.Country);
            if (country == null)
            {
                throw new InvalidOperationException("Country not found.");
            }

            // Step 2: Check if the company already exists
            ...

            // Step 3: Update or create company
            ...

            // Step 4: Save changes and return company ID
            await _context.SaveChangesAsync(cancellationToken);
        }
        catch (Exception exception)
        {
            _logger.LogError(exception.Message);
        }

    }
}
```

# 결론

여기까지 CountryFinder 구성 요소를 세로 슬라이스 아키텍처 내에 생성 및 배포한 여정이었습니다. 이 과정을 통해 소프트웨어 개발의 복잡성과 영향을 분석하고 소프트웨어 아키텍처를 형성하는 의사 결정 과정에 대해 깊이 있게 살펴봤습니다.

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

세심한 단계별 분석을 통해, 우리는 클린 코드를 유지하고 단일 책임 원칙과 재사용 가능한 구성 요소 사이의 미묘한 균형을 탐구해 왔습니다. 수직 슬라이스 아키텍처에서 유연성의 중요성과 각 사용 사례의 고유한 요구 사항을 바탕으로 순 정보 결정을 내리는 필요성에 대해 논의했습니다.

본문을 마무리하며, 이 글이 소프트웨어 개발의 복잡성을 습득하는 길이 목적지가 아닌 여정임을 상기시키는 계기가 되기를 바랍니다. 지속적인 학습, 적응, 접근 방식 개선의 과정이 필요합니다.

건배!
