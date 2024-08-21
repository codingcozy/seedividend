---
title: "NET과 Consul을 사용한 마이크로서비스 서비스 디스커버리 방법"
description: ""
coverImage: "/assets/img/2024-07-10-ServiceDiscoveryinMicroservicesWithNETandConsul_0.png"
date: 2024-07-10 02:24
ogImage:
  url: /assets/img/2024-07-10-ServiceDiscoveryinMicroservicesWithNETandConsul_0.png
tag: Tech
originalTitle: "Service Discovery in Microservices With .NET and Consul"
link: "https://medium.com/@MilanJovanovicTech/service-discovery-in-microservices-with-net-and-consul-9eb133d69cd4"
isUpdated: true
---

![image](/assets/img/2024-07-10-ServiceDiscoveryinMicroservicesWithNETandConsul_0.png)

마이크로서비스는 어플리케이션을 구축하고 확장하는 방식을 혁신했습니다. 대규모 시스템을 작고 독립적인 서비스로 분해함으로써 유연성, 민첩성 및 변화하는 요구사항에 빠르게 대응하는 능력을 얻을 수 있습니다. 그러나, 마이크로서비스 시스템은 매우 동적입니다. 서비스는 생성 및 소멸하며, 규모를 키우거나 줄이고, 시스템 내에서 움직일 수도 있습니다.

이러한 동적인 특성은 중요한 도전 과제를 제시합니다. 서비스들이 어떻게 신뢰성 있게 발견하고 통신할 수 있을까요?

IP 주소와 포트를 하드코딩하는 것은 부서지기 쉬운 레시피입니다. 서비스 인스턴스가 위치를 변경하거나 새로운 인스턴스가 생성되면 전체 시스템이 멈출 수 있습니다.

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

서비스 검색은 마이크로서비스들의 중심 디렉터리 역할을 합니다. 이것은 서비스들이 자신을 등록하고 다른 서비스들의 위치를 찾을 수 있는 메커니즘을 제공합니다.

이번 주 이슈에서는 .NET 마이크로서비스에서 Consul을 사용하여 서비스 검색을 구현하는 방법을 살펴보겠습니다.

# 서비스 검색이란?

서비스 검색은 개발자가 물리적인 IP 주소와 포트 대신 논리적인 이름을 사용해 외부 서비스를 참조할 수 있는 패턴입니다. 이것은 서비스들이 자신을 등록할 수 있는 중앙 위치를 제공합니다. 클라이언트는 서비스 레지스트리를 쿼리하여 서비스의 물리적인 주소를 알아낼 수 있습니다. 이것은 Netflix와 Amazon과 같은 대규모 분산 시스템에서 흔한 패턴입니다.

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

여기 서비스 검색 플로우가 어떻게 작동하는지 살펴보겠습니다:

- 서비스는 서비스 레지스트리에 자체 등록됩니다.
- 클라이언트는 물리적 주소를 얻기 위해 서비스 레지스트리를 조회해야 합니다.
- 클라이언트는 해결된 물리적 주소를 사용하여 서비스에 요청을 보냅니다.

![이미지](/assets/img/2024-07-10-ServiceDiscoveryinMicroservicesWithNETandConsul_1.png)

이 같은 개념은 여러 서비스를 호출할 때도 적용됩니다. 각 서비스는 서비스 레지스트리에 자신을 등록합니다. 클라이언트는 서비스를 참조하기 위해 논리적 이름을 사용하고 서비스 레지스트리에서 물리적 주소를 해결합니다.

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

![Service Discovery in Microservices with .NET and Consul](/assets/img/2024-07-10-ServiceDiscoveryinMicroservicesWithNETandConsul_2.png)

서비스 디스커버리에 대한 가장 인기 있는 솔루션은 Netflix Eureka와 HashiCorp Consul입니다.

또한 Microsoft에서 Microsoft.Extensions.ServiceDiscovery 라이브러리로 가벼운 솔루션이 있습니다. 이 라이브러리는 서비스의 물리적인 주소를 해결하기 위해 응용 프로그램 설정을 사용하므로 일부 수동 작업이 필요합니다. 그러나 Azure 앱 구성에 서비스 위치를 저장하여 중앙 서비스 레지스트리를 구현할 수 있습니다. 이 서비스 디스커버리 라이브러리에 대해 미래의 기사에서 자세히 살펴보겠습니다.

하지만 지금은 .NET 응용 프로그램에서 Consul을 통합하는 방법을 안내해 드리겠습니다.

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

# Consul 서버 설정하기

Consul 서버를 가장 간단하게 로컬에서 실행하는 방법은 Docker 컨테이너를 사용하는 것입니다. hashicorp/consul 이미지의 컨테이너 인스턴스를 만들 수 있습니다.

다음은 docker-compose 파일의 일부로 Consul 서비스를 구성하는 예시입니다:

```yaml
consul:
  image: hashicorp/consul:latest
  container_name: Consul
  ports:
    - "8500:8500"
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

localhost:8500으로 이동하면 Consul 대시보드가 나타납니다.

![Consul 대시보드](/assets/img/2024-07-10-ServiceDiscoveryinMicroservicesWithNETandConsul_3.png)

이제 Consul에 서비스를 등록하는 방법을 살펴보겠습니다.

# Consul을 사용한 .NET에서의 서비스 등록

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

스틸토 디스커버리 라이브러리를 이용하여 컨설과 함께 서비스 디스커버리를 구현할 거에요. 컨설 클라이언트 구현은 여러분의 애플리케이션이 컨설 서버에 서비스를 등록하고 다른 애플리케이션에 의해 등록된 서비스를 발견할 수 있도록 해줍니다.

스틸토.Discovery.Consul 라이브러리를 설치해봅시다:

```js
Install-Package Steeltoe.Discovery.Consul
```

일부 서비스를 구성하기 위해 AddServiceDiscovery를 호출하고 명시적으로 컨설 서비스 디스커버리 클라이언트를 구성해야 합니다. 다른 방법은 AddDiscoveryClient를 호출하여 런타임에 어떤 서비스 레지스트리가 사용 가능한지를 결정하는 리플렉션을 사용하는 것입니다.

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
Steeltoe.Discovery.Client 및 Steeltoe.Discovery.Consul을 사용하여 서비스를 등록할 수 있습니다.

먼저, 논리적 서비스 이름을 설정하여 Consul에 서비스를 등록할 수 있습니다. 애플리케이션이 시작되면 reporting-service 논리적 이름이 Consul 서비스 레지스트리에 추가됩니다. Consul은 이 서비스의 물리적 주소를 저장합니다.

{
  "Consul": {
    "Host": "localhost",
    "Port": 8500,
    "Discovery": {
      "ServiceName": "reporting-service",
      "Hostname": "reporting-api",
      "Port": 8080
    }
  }
}

애플리케이션을 시작하고 Consul 대시보드를 열면 reporting-service 및 해당 물리적 주소를 확인할 수 있어야 합니다.
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

![이미지](/assets/img/2024-07-10-ServiceDiscoveryinMicroservicesWithNETandConsul_4.png)

# 서비스 디스커버리 사용하기

HttpClient를 사용하여 HTTP 호출을 할 때 서비스 디스커버리를 사용할 수 있습니다. 서비스 디스커버리는 우리가 호출하려는 서비스에 대한 논리적인 이름을 사용할 수 있게 해줍니다. 네트워크 요청을 보낼 때, 서비스 디스커버리 클라이언트는 논리적인 이름을 올바른 물리적 주소로 대체합니다.

이 예제에서는 ReportingServiceClient의 기본 주소를 http://reporting-service로 구성하고 AddServiceDiscovery를 호출하여 서비스 디스커버리를 추가했습니다.

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

로드 밸런싱은 선택 사항이며 AddRoundRobinLoadBalancer 또는 AddRandomLoadBalancer를 호출하여 구성할 수 있습니다. 또한 ILoadBalancer 구현을 제공하여 사용자 정의 로드 밸런싱 전략을 구성할 수도 있습니다.

```js
builder.Services.AddHttpClient <
  ReportingServiceClient >
  ((client) => {
    client.BaseAddress = new Uri("http://reporting-service");
  })
    .AddServiceDiscovery()
    .AddRoundRobinLoadBalancer();
```

ReportingServiceClient 유형의 클라이언트를 일반 HttpClient처럼 사용하여 요청을 보낼 수 있습니다. 서비스 검색 클라이언트는 요청을 외부 서비스의 IP 주소로 보냅니다.

```js
app.MapGet("articles/{id}/report",
    async (Guid id, ReportingServiceClient client) =>
    {
        var response = await client
            .GetFromJsonAsync<Response>($"api/reports/article/{id}");

        return response;
    });
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

# 결론

서비스 디스커버리는 마이크로서비스 관리를 간편하게 만들어줍니다. 서비스 등록 및 발견을 자동화하여 수동 구성 업데이트가 필요하지 않아 에러 발생 가능성을 줄입니다.

서비스는 필요에 따라 서로의 위치를 발견할 수 있어 통신 채널이 열려 있는 상태를 유지할 수 있습니다. 서비스 디스커버리를 통해 서비스 장애나 실패 시 대체 서비스 인스턴스를 발견할 수 있어 마이크로서비스 시스템의 전반적인 탄력성을 높일 수 있습니다.

서비스 디스커버리를 숙달한다면 현대적인 분산 애플리케이션을 구축하는 강력한 도구를 얻을 수 있습니다.

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

이 예시의 소스 코드는 여기서 확인하실 수 있어요.

읽어 주셔서 감사합니다! 다음 주에 봐요!

원본 게시물은 2024년 7월 6일에 https://www.milanjovanovic.tech에서 게시되었습니다.

P.S. 준비가 되시면 도움 드릴 수 있는 방법이 3가지 있어요:

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

- 실용적인 클린 아키텍처: 이 포괄적인 강좌에 참여하여 2,900명 이상의 학생들이 함께하고 있습니다. 클린 아키텍처를 사용하여 프로덕션에 적합한 애플리케이션을 제작하는 시스템을 배울 수 있습니다. 현대 소프트웨어 아키텍처의 최상의 실천 방법을 적용하는 법을 배울 수 있습니다.
- 모듈러 모놀리스 아키텍처: 이 깊이 있는 강좌에 참여하여 750명 이상의 엔지니어들이 함께합니다. 현대 시스템을 구축하는 방식을 변화시키는 강좌로, 실제 시나리오에서 모듈러 모놀리스 아키텍처를 적용하는 최상의 실천 방법을 배울 수 있습니다.
- Patreon 커뮤니티: 1,050명 이상의 엔지니어들과 소프트웨어 아키텍트로 이루어진 커뮤니티에 함께하세요. 또한 내 YouTube 비디오에서 사용하는 소스 코드, 미래 비디오에 대한 빠른 엑세스, 그리고 내 강좌에 대한 독점 할인 혜택을 누릴 수 있습니다.
