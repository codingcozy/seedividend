---
title: "ASPNET Core 웹 API에서 Dapr 상태 관리를 구현하는 방법"
description: ""
coverImage: "/assets/img/2024-07-13-ImplementingDaprStateManagementinASPNETCoreWebAPIs_0.png"
date: 2024-07-13 01:52
ogImage: 
  url: /assets/img/2024-07-13-ImplementingDaprStateManagementinASPNETCoreWebAPIs_0.png
tag: Tech
originalTitle: "Implementing Dapr State Management in ASP.NET Core Web APIs"
link: "https://medium.com/gitconnected/implementing-dapr-state-management-in-asp-net-core-web-apis-6878c95bdf10"
isUpdated: true
---




여행 중이신 분을 위한 팁을 공유합니다! 😊

분산 아키텍처에서는 일반적으로 주문 항목, 카탈로그에 항목 저장, 인증 처리 등과 같은 특정 도메인 주변에 설치된 여러 독립적인 상태가 없는 서비스가 있습니다.

서비스는 상태가 없어야 하지만 비즈니스 작업 또는 기능을 수행하기 위해 상태를 추적해야 하는 서비스가 있을 수 있습니다. Dapr에는 상태 추적을 간소화하고 다양한 데이터 저장소에 상태를 저장할 수 있도록하는 상태 관리 빌드 블록이 있습니다.

이 기사에서는 Dapr에서 상태 관리가 무엇인지, .NET ASP.NET Core Web API에서 어떻게 구현할 수 있는지에 대해 설명하겠습니다. 그런 다음 상태 관리 구성 요소를 구성하고 API를 테스트하여 실제 작동 방식을 확인해보겠습니다. ✈️

<div class="content-ad"></div>

이 글에서 사용할 전체 샘플을 보려면 제 GitHub에서 확인해주세요!

# Dapr에서 상태 관리란

Dapr에는 응용 프로그램이 상태 저장소에서 키/값 쌍을 저장, 쿼리, 삭제 및 읽을 수 있도록 하는 상태 관리 API가 있습니다. Dapr 응용 프로그램이 사용할 수 있는 다양한 지원 상태 저장소가 있습니다. MongoDB, Apache Cassandra, Redis, AWS DynamoDB, Azure Cosmos DB 등이 있습니다.

Dapr의 플러그 가능한 컴포넌트 기능 덕분에 데이터 저장소를 컴포넌트로 모델링하여 코드 변경 없이 다른 데이터 저장소를 사용할 수 있습니다.

<div class="content-ad"></div>

상태 관리는 응용 프로그램이 필요로 하는 데이터 일관성 수준을 선택할 수 있는 옵션을 제공하며 동시성을 처리하기 위해 낙관적 동시성 제어를 제공합니다. 기본적으로 Dapr은 최종 일관성 및 마지막 쓰기가 승리하는 동시성을 사용하지만 이러한 설정을 데이터 저장소의 요구 사항에 맞게 구성할 수 있습니다.

응용 프로그램의 상태와 상호 작용하기 위해 State Management 빌딩 블록은 다양한 CRUD 작업을 제공하며 키/값 상태를 쿼리하고 필터링할 수 있는 기능도 제공합니다. 또한 응용 프로그램에서 대규모 및 트랜잭션 작업을 수행할 수도 있습니다.

Dapr의 상태 관리에는 더 많은 기능이 있으므로 전체 내용을 확인하기 위해 문서를 참조하는 것이 좋습니다.

# .NET 7에서 Dapr 구성하기

<div class="content-ad"></div>

상태 관리가 어떻게 작동하는지 확인해보기 위해 ASP.NET Web API를 구축해보겠습니다. 이 API는 책 목록을 처리하는 기능을 담당할 것입니다. 우리의 책 모델은 간단하게 유지하고, API 코드에서 상태 저장소와 상호 작용하기 위해 필요한 API에 중점을 둘 것입니다.

이 프로젝트의 전체 코드를 보려면 제 GitHub 저장소를 확인해주세요.

ASP.NET Core Web API에서 Dapr를 사용하려면 Dapr.AspNetCore 패키지를 설치해야 합니다. 이를 위해 다음과 같이 .NET CLI 명령어를 실행할 수 있습니다:

```js
dotnet add package Dapr.AspNetCore
```

<div class="content-ad"></div>

Visual Studio에서 NuGet 패키지 관리자를 사용하여 설치할 수도 있어요. 이 패키지를 사용하면 Dapr 클라이언트를 통해 Dapr 애플리케이션과 상호 작용하고, ASP.NET 애플리케이션에서 Dapr를 사용하여 라우트 및 컨트롤러를 빌드할 수 있어요.

# Dapr 상태 관리와 로직 구현

Dapr가 설치되면 상태 저장소와 상호 작용할 인터페이스를 정의하기 시작할 수 있어요. 이번엔 그저 CRUD 애플리케이션일 뿐이니, 다음과 같이 기본 인터페이스를 정의할 수 있어요:

<div class="content-ad"></div>


위에서는 인터페이스를 정의하고 구현하며 다음과 같이 로직을 정의할 수 있습니다:

우선, BookService 클래스를 구현하고 있습니다. 해당 클래스는 IBookService 인터페이스를 상속받아 구현된 것으로, DaprClient 및 Logger와 같은 필수 의존성을 주입받습니다.

CreateBook 메서드는 BookDto를 매개변수로 받아서 새로운 Book을 저장하는 메서드입니다. 해당 Book 객체는 GUID를 Id로 지정하고, DaprClient를 사용하여 상태 저장소에 저장됩니다.

DeleteBook 메서드는 Id를 매개변수로 받아 해당 Book을 상태 저장소에서 삭제하는 메서드이며, GetBookById는 Id를 받아 해당 Book을 반환합니다.

GetBooksByCategory는 카테고리를 받아 해당 카테고리에 속하는 Book 목록을 반환하는 메서드이며, UpdateBook은 Id와 BookDto를 받아 해당 Book을 업데이트합니다.


이렇게 구현된 BookService 클래스에는 다양한 기능이 구현되어 있으며, 상세한 내용을 하나씩 분석해 보겠습니다.

<div class="content-ad"></div>

저는 이 애플리케이션이 사용할 스테이트 스토어의 이름인 STORE_NAME이라는 프라이빗 변수를 정의합니다. 따라서 상태를 저장하고 검색할 때 Dapr은 상태 스토어 구성요소인 statestore라는 스테이트 스토어를 찾아서 애플리케이션 상태를 저장하고 가져올 것입니다. 그런 다음, 생성자로 전달할 DaprClient와 ILogger에 대한 프라이빗 변수를 정의합니다.

CreateBook 메서드에서 새 BookDto 객체를 전달하고 SaveStateAsync`T` 메서드를 호출할 때 이를 스테이트 스토어에 저장합니다. 이 메서드에서 스테이트 스토어의 이름, 키로 사용할 Book ID 및 저장하려는 Book을 전달합니다.

DeleteBook 및 GetBookById 메서드는 간단합니다. 검색하거나 삭제할 Book의 ID를 전달하고, DeleteStateAsync 또는 GetStateAsync`T` (여기서 T는 Book인 경우)를 호출하여 Book ID와 스테이트 스토어의 이름을 전달합니다.

GetBooksByCategory는 약간 다릅니다. 여기서 우리의 책 카테고리 (로맨스, 픽션, 논픽션 등)를 전달하고 해당 카테고리를 가진 모든 책을 검색합니다. 그런 다음 특정 카테고리를 가진 모든 상태 객체를 검색하기 위해 필터 쿼리를 사용합니다. 상태 쿼리 API는 아직 알파 단계이므로 읽을 때 변경될 수 있지만 이 API를 사용하여 상태 스토어 구성요소에 저장된 키/값 데이터를 가져오거나 필터링하고 정렬할 수 있습니다.

<div class="content-ad"></div>

저희가 쿼리를 생성한 후에는, 해당 쿼리를 QueryStateAsync`T` 메소드의 매개변수로 전달합니다. (여기서 다시 한 번, T는 저희 Book 클래스를 가리킵니다.) 이후에는 해당 쿼리의 결과를 Book 객체의 목록으로 반환합니다.

마지막으로, UpdateBook 메소드는 간단합니다. 여기서는 기존 책의 id와 BookDto 요청 객체를 전달합니다. 우리는 책 id를 사용하여 기존의 책을 검색한 뒤 (다시 한 번 GetStateAsync`T`를 사용하여), 해당 책이 검색 가능하다면, 새 요청을 현재 책 객체로 간단하게 매핑하고, SaveStateAsync`T` 메소드를 사용하여 상태 저장소에 저장합니다.

인터페이스와 서비스 클래스를 정의했다면, 파일에서 해당 서비스를 등록할 수 있습니다. DaprClient와 함께 등록을 하려면 다음과 같이 합니다.

```js
builder.Services.AddDaprClient();
builder.Services.AddSingleton<IBookService, BookService>();
```

<div class="content-ad"></div>

이제 우리의 서비스가 정의되고 등록되었으므로, API 컨트롤러에서 구현할 수 있습니다!

```js
using Bookstore.Api.Common.Dtos;
using Bookstore.Api.Common.Models;
using Bookstore.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.Api.Controllers
{
    [Route("api/books")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;
        private readonly ILogger<BookController> _logger;

        public BookController(ILogger<BookController> logger, IBookService bookService)
        {
            _logger = logger;
            _bookService = bookService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Book))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Get(string category)
        {
            try
            {
                var books = await _bookService.GetBooksByCategory(category);
                return Ok(books);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception thrown in {nameof(Get)}: {ex.Message}");
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("{bookId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Book))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetBook(string bookId)
        {
            try
            {
                var book = await _bookService.GetBookById(bookId);

                if (book is not null)
                {
                    return Ok(book);
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception thrown in {nameof(GetBook)}: {ex.Message}");
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
        
        ... 중략 ...

    }
}
```

### Dapr 상태 관리 구성 요소 사용하기

API를 테스트하기 전에 상태 관리 구성 요소를 설정해야 합니다. 이를 위해 모두가 사랑하는 YAML 마크업 언어를 사용하여 구성 요소를 정의할 수 있습니다! 😁


<div class="content-ad"></div>

저희 상태 저장소에는 Azure Cosmos DB를 사용할 예정입니다. Cosmos DB를 사용하도록 상태 저장소 구성 요소를 정의하려면 다음과 같이 작성할 수 있습니다:

```yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: statestore
spec:
  type: state.azure.cosmosdb
  version: v1
  metadata:
  - name: url
    value: <cosmos-url>
  - name: masterKey
    value: "<primary-key>"
  - name: database
    value: bookstoredb
  - name: collection
    value: books
```

상태 관리에 사용할 데이터 저장소를 정의하기 위해 type 필드를 사용합니다. 따라서 Cosmos DB의 경우 state.azure.cosmosdb 유형을 사용합니다. 메타데이터 섹션에서는 연결 문자열, 키, 테이블 이름 등을 구성합니다. Cosmos DB의 경우 응용 프로그램이 상태를 저장하는 데 사용할 URL, masterKey, 데이터베이스 및 컬렉션 이름을 제공해야 합니다.

다른 데이터 저장소들은 다양한 메타데이터를 사용하므로 Dapr에서 지원하는 모든 다양한 데이터 저장소를 확인하려면 상태 저장소 구성 방법을 구성하는 가이드와 이 참조를 살펴보세요.

<div class="content-ad"></div>

다른 중요한 점은 메타데이터 값에는 비밀이 포함될 수 있으며, 추천되는 방식인 시크릿 스토어를 사용하지 않는 한 평문으로 표시됩니다. 시크릿 스토어를 사용하는 것을 권장하는 패턴을 따르지 않는 한 애플리케이션에서 비밀을 평문으로 저장하지 마십시오! 

## API 테스트하기

상태 스토어 컴포넌트를 정의한 후에는 이제 API를 테스트할 수 있습니다. API를 실행하는 방법은 Dapr CLI를 사용하여 명령행에서 실행하거나 Visual Studio에서 실행하도록 launchSettings.json 파일을 구성하여 실행할 수 있습니다. 명령행을 통해 응용프로그램을 실행하려면 다음과 같이 사용할 수 있습니다:

```js
dapr run --app-id bookstore-api --app-port 7264 --dapr-http-port 3500 --app-ssl --resources-path ..\..\..\components\ -- dotnet run --launch-profile https
```

<div class="content-ad"></div>

다음은 dapr run 명령어를 자세히 살펴보겠습니다.

--app-id 옵션은 애플리케이션의 ID를 설정합니다. 이것은 서비스 검색 및 서비스 호출에 사용됩니다. (서비스 호출에 대한 Dapr Service Invocation에 대해 추천드리는 글이 있습니다. 이 글은 이 글을 읽은 후에 확인해보세요!)

나는 --app-port를 정의하여 애플리케이션이 HTTPS 포트에서 수신하도록 하고, --dapr-http-port를 Dapr이 수신할 포트로 설정했습니다 (기본값인 3500을 사용 중입니다). 또한 --resources-path 매개변수를 사용하여 애플리케이션이 Cosmos DB를 상태 저장소로 사용하도록 했습니다. 그리고 dotnet run --launch-profile https를 사용하여 애플리케이션을 실행했습니다.

또한 launchSettings.json 파일에서 API가 Dapr을 사용하도록 구성할 수도 있습니다.

<div class="content-ad"></div>

```json
{
  "$schema": "https://json.schemastore.org/launchsettings.json",
  "iisSettings": {
    "windowsAuthentication": false,
    "anonymousAuthentication": true,
    "iisExpress": {
      "applicationUrl": "http://localhost:6276",
      "sslPort": 44354
    }
  },
  "profiles": {
    "http": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "launchUrl": "swagger",
      "applicationUrl": "http://localhost:5101",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "https": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "launchUrl": "swagger",
      "applicationUrl": "https://localhost:7264;http://localhost:5101",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "launchUrl": "swagger",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "dapr": {
      "commandName": "Executable",
      "workingDirectory": "$(ProjectDir)",
      "executablePath": "dapr.exe",
      "commandLineArgs": "run --app-id bookstore-api --dapr-http-port 3500 --app-ssl --resources-path ../../../components/ --app-port 7264 -- dotnet run ."
    }
  }
}
```

dapr json 객체 블록을 살펴보세요. 이는 Dapr CLI를 통해 응용 프로그램을 실행하는 것과 본질적으로 동일하지만, 이 방법을 사용하면 Visual Studio에서 응용 프로그램을 실행할 수 있습니다. 마치 IIS Express 서버를 실행하거나 API를 위해 http 또는 https 서버를 실행하려는 경우처럼요.

API에서 테스트를 쉽게 할 수 있도록 Swagger를 사용하고 있지만, Postman이나 curl과 같은 도구를 사용하여 엔드포인트를 호출할 수도 있어요.

Cosmos DB에 저장할 도서를 만들어 봅시다. 새 도서를 저장하기 위해 POST 요청으로 /api/books 엔드포인트를 호출할 거에요. 요청이 유효하다면, 201 응답을 받을 거에요.

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-13-ImplementingDaprStateManagementinASPNETCoreWebAPIs_1.png)

내 새 책이 만들어졌습니다. Cosmos DB 컬렉션에서 확인할 수 있어요.

![이미지](/assets/img/2024-07-13-ImplementingDaprStateManagementinASPNETCoreWebAPIs_2.png)

이번에는 GET 엔드포인트 /api/books/category를 테스트해보겠어요. Fiction 카테고리를 전달하여 컬렉션에서 모든 소설 책을 가져와볼게요:

<div class="content-ad"></div>


![이미지](/assets/img/2024-07-13-ImplementingDaprStateManagementinASPNETCoreWebAPIs_3.png)

책을 가져오려면 해당 책 ID를 전달하여 /api/books/'bookId' 엔드포인트에 GET 요청을 보낼 수 있습니다:

![이미지](/assets/img/2024-07-13-ImplementingDaprStateManagementinASPNETCoreWebAPIs_4.png)

책을 업데이트하려면 기존 책의 ID와 업데이트된 책 정보가 담긴 새로운 요청 본문을 사용하여 /api/books/'bookId' 엔드포인트에 PUT 요청을 보낼 수 있습니다. 이 요청에서 기존 책의 가격을 업데이트하고 있는데, 요청은 다음과 같이 할 수 있습니다:


<div class="content-ad"></div>

![Image 5](/assets/img/2024-07-13-ImplementingDaprStateManagementinASPNETCoreWebAPIs_5.png)
요청이 성공적이었기 때문에 Cosmos DB에 가격이 업데이트된 것을 확인할 수 있어요.

![Image 6](/assets/img/2024-07-13-ImplementingDaprStateManagementinASPNETCoreWebAPIs_6.png)
마지막으로, 상태 저장소에서 책을 삭제하기 위해 /api/books/'bookId' 엔드포인트로 DELETE 요청을 하여 삭제하고 싶은 책의 ID를 전달하면 됩니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-07-13-ImplementingDaprStateManagementinASPNETCoreWebAPIs_7.png" />

DELETE 요청이 성공적으로 이루어지면, 우리는 Cosmos DB 컬렉션에서 책이 삭제된 것을 확인할 수 있습니다.

<img src="/assets/img/2024-07-13-ImplementingDaprStateManagementinASPNETCoreWebAPIs_8.png" />

# 결론

<div class="content-ad"></div>

이 기사에서는 Dapr의 State Management를 소개하고 분산 애플리케이션에서 상태를 저장하는 방법을 살펴보았어요. 그리고 ASP.NET Core Web API에서 Dapr State Management를 어떻게 사용할 수 있는지를 시연했고, 상태 저장소 구성 방법 및 API 프로젝트를 Dapr 애플리케이션으로 실행하고 테스트하는 방법도 소개했어요.

위 내용에 대한 질문이 있다면 언제든지 제 트위터 @willvelida로 문의해 주세요.

다음 시간까지 즐거운 코딩하시길 바래요! 🤓🖥️

# Level Up Coding

<div class="content-ad"></div>

우리 커뮤니티에 참여해 주셔서 감사합니다! 여행을 떠나시기 전에:

- 👏 이야기에 박수를 보내고 작가를 팔로우하세요 👉
- 📰 Level Up Coding 출판물에서 더 많은 콘텐츠를 확인하세요
- 💰 무료 코딩 면접 코스 ⇒ 코스 보기
- 🔔 우리를 팔로우하세요: 트위터 | 링크드인 | 뉴스레터

🚀👉 Level Up 인재 집단에 가입하여 놀라운 취업 기회를 찾아보세요