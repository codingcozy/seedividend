---
title: "Go에서 Swagger 사용 아직 안 해봤다면 놓치고 있는 천재적인 선택"
description: ""
coverImage: "/assets/img/2024-07-13-SwaggerinGoWhyItstheGeniusMoveYouHaventMadeYet_0.png"
date: 2024-07-13 20:59
ogImage:
  url: /assets/img/2024-07-13-SwaggerinGoWhyItstheGeniusMoveYouHaventMadeYet_0.png
tag: Tech
originalTitle: "Swagger in Go: Why It’s the Genius Move You Haven’t Made Yet"
link: "https://medium.com/gitconnected/swagger-in-go-why-its-the-genius-move-you-haven-t-made-yet-0326f6e2881f"
isUpdated: true
---

![Swagger in Go](/assets/img/2024-07-13-SwaggerinGoWhyItstheGeniusMoveYouHaventMadeYet_0.png)

안녕하세요! Go에서 Swagger를 구현하는 실용적인 측면에 대해 알아볼 예정입니다.

여러분께서는 Swagger에 대해 어느 정도의 이해를 가지고 있거나 적어도 기본 개념을 알고 계신다고 가정하고 진행하겠습니다. Swagger를 처음 접하는 분들을 위해 간단히 소개해 드릴게요:

"Swagger는 서버를 이해하고 사용할 수 있도록 도와주는 도구로, 사용자를 위해 명확한 문서를 생성합니다. API를 사용할 수 있는 모든 방법을 보여주어 개발자가 소프트웨어를 구축하고 연결하기 쉽게 만들어 줍니다."

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

# 1. 부트스트래핑

시작해 보겠습니다. Swagger를 설정해야 합니다.

기본적인 예제로 Echo 프레임워크를 사용할 것이지만, Gin, Buffalo, net/http, Gorilla/mux, Fiber 등 다른 프레임워크를 사용하는 경우에도 단계는 거의 비슷합니다.

## 단계 1: Swag 도구 설치하기

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

첫 번째 단계는 Swagger 문서를 생성하는 데 필수적인 Swag 도구를 설치하는 것입니다.
터미널에서 다음 명령을 실행하세요:

```js
go install github.com/swaggo/swag/cmd/swag@latest
```

## 단계 2: 미들웨어 통합

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

이제 Swagger 미들웨어를 통합하는 데 집중해 보겠습니다. Echo를 사용하는 경우, echo-swagger 미들웨어가 필요합니다. 설치하는 방법은 다음과 같습니다:

```js
$ go get -u github.com/swaggo/echo-swagger
```

```js
import (
    "github.com/labstack/echo/v4"
    echoSwagger "github.com/swaggo/echo-swagger"
)

func main() {
    e := echo.New()
    e.GET("/swagger/*", echoSwagger.WrapHandler)
    e.Logger.Fatal(e.Start(":1323"))
}
```

Gin 프레임워크를 사용하는 경우, 접근 방식은 매우 유사하지만 gin-swagger 미들웨어를 대신 사용합니다.

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
$ go get -u github.com/swaggo/gin-swagger
```

```js
import (
    "github.com/gin-gonic/gin"
    ginSwagger "github.com/swaggo/gin-swagger"
    "github.com/swaggo/gin-swagger/swaggerFiles"
)

func main() {
    r := gin.New()
    r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
    r.Run()
}
```

## 단계 3: 코드에 주석 추가하기

이제 main.go에 주석을 추가하여 Swagger 문서 작성을 용이하게합니다. 이러한 주석은 main() 함수 위에 배치하는 것이 가장 효율적입니다.

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
// Swagger
//
//  @title                       Pet Management API
//  @version                     1.0
//  @description                 A comprehensive API for managing pets, offering endpoints for creation, update, deletion, and retrieval of pet data.
//  @termsOfService              http://petmanagement.com/terms
//  @contact.name                API Support Team
//  @contact.url                 http://petmanagement.com/support
//  @contact.email               support@petmanagement.com
//  @license.name                Apache 2.0
//  @license.url                 http://www.apache.org/licenses/LICENSE-2.0.html
//  @host                        petmanagement.com
//  @BasePath                    /api/v1
//  @schemes                     http https
//  @securityDefinitions.apiKey  JWT
//  @in                          header
//  @name                        Authorization
//  @description                 JWT security accessToken. Please add it in the format "Bearer {AccessToken}" to authorize your requests.
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

// @title Pet Management API
// @version 1.0
// @description A comprehensive API for managing pets. It provides endpoints for creating, updating, deleting, and retrieving pet information.
// @termsOfService http://petmanagement.com/terms
// @contact.name API Support Team
// @contact.url http://petmanagement.com/support

주석들은 gofmt에 의해 재 서식화될 수 있으며, 이는 따라가기 어려운 레이아웃을 초래할 수 있습니다.

## 단계 4: Swagger 문서 생성

자, Swagger 문서를 생성해봅시다:

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
$ swag init
$ swag fmt # 주석 서식 맞춰주기
```

여기서 swag init 명령어가 중요하게 작용합니다. 이 명령어는 문서를 생성하며, swag fmt는 주석을 깔끔하게 정리하는 데 도움이 됩니다.

실행 후에는 프로젝트에 새로운 ./docs 폴더가 생겼음을 알 수 있을 것입니다. 해당 폴더에는 docs.go, swagger.json 및 swagger.yaml 파일이 포함됩니다. 일반적으로, JSON 및 YAML 파일을 생성하지 않고 docs.go 파일만 사용하는 경우 --outputType go 플래그를 사용하면 됩니다.

그런 다음, main.go 파일에 docs.go 파일을 포함하여 적절한 초기화를 수행하세요:

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
import _ "yourproject/docs"
```

참고: Go 언어에서 \_ 를 사용하여 패키지를 가져 오면 단지 해당 패키지의 초기화 부작용을 위해 가져온 것을 의미합니다.

서버를 실행하고 Swagger 문서는 http://localhost:1323/swagger/index.html (또는 사용자 정의 호스트/포트)에서 액세스 할 수 있어야합니다.

<img src="/assets/img/2024-07-13-SwaggerinGoWhyItstheGeniusMoveYouHaventMadeYet_1.png" />

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

비록 이것이 간단한 안내서에 대해 이해할 게 많아 보일 수 있지만, Swagger가 제공하는 다양한 옵션을 인식하는 것이 중요합니다. Swagger에 처음 접하는 사람들을 위해 각 어노테이션에 대한 간단한 설명을 제공합니다:

- @title: API에 이름을 지정합니다. 예를 들어 "펫 관리 API."
- @version: API의 현재 버전을 나타냅니다.
- @description: API가 하는 일에 대한 요약을 제공합니다. 예를 들어, 반려동물 정보 관리.
- @termsOfService, @contact.name, @contact.url, @contact.email: 연락처 세부 정보 및 서비스 약관 링크입니다.
- @license.name, @license.url: API 라이선스에 대한 정보입니다.
- @host: API의 주요 웹 주소를 제공합니다. 여기서는 "petmanagement.com."
- @BasePath: API에 액세스하는 루트 경로를 제공합니다. "/api/v1"과 같은 형태입니다.
- @schemes: API에서 사용하는 프로토콜입니다. 예를 들어 "https"와 "http"가 있습니다.
- @securityDefinitions.apiKey, @in, @name, @description: 이러한 어노테이션은 API 보안 및 사용 지침에 대한 세부 정보를 제공합니다.

# 2. API 정의하기

API 명세를 작성하는 것은 이미 다룬 기본 API 어노테이션에 더해 점진적인 과정입니다.

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

간단한 예시를 살펴보겠습니다: 데이터베이스에서 모든 애완동물을 가져오는 API입니다.

```js
type Pet struct {
  ID        int    `json:"id"`
  Name      string `json:"name"`
  Species   string `json:"species"`
}

// getPetByID godoc
//
//  @Summary        ID로 애완동물 가져오기
//  @Description    ID를 사용하여 애완동물 세부 정보 검색
//  @Tags           pets
//  @Accept         json
//  @Produce        json
//  @Security       JWT
//  @Param          id  path    int  true    "애완동물 ID"
//  @Success        200 {object} Pet  "애완동물의 세부 정보"
//  @Router         /pets/{id} [get]
func getPetByID(c echo.Context) error {
  // ID로 애완동물 반환하는 로직 구현
  return c.JSON(http.StatusOK, Pet{})
}

func main() {
  e := echo.New()
  e.GET("/pets/:id", getPetByID)
  e.GET("/swagger/*", echoSwagger.WrapHandler)
  e.Logger.Fatal(e.Start(":8081"))
}
```

이 후에는 `$ swag init` 명령으로 문서를 재생성하고 변경 사항을 반영하기 위해 서버를 다시 시작하세요.

<img src="/assets/img/2024-07-13-SwaggerinGoWhyItstheGeniusMoveYouHaventMadeYet_2.png" />

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

각 주석을 해독해보겠어요:

- @Summary: API 기능에 대한 간결한 설명을 제공해요. 예를 들어 "ID로 펫 가져오기" 같은 내용이죠.
- @Description: 함수 목적에 대한 더 자세한 설명을 제공해요.
- @Tags: API 엔드포인트를 분류하는 데 도움이 되요. 여기서 "pets"는 이 엔드포인트를 다른 펫 관련 작업과 연결해요.
- @Accept: JSON과 같은 허용 가능한 콘텐츠 유형을 지정해요.
- @Produce: API가 반환하는 콘텐츠 유형을 나타내요. 여기서 JSON으로 응답하도록 설정되어 있어요.
- @Security: 엔드포인트의 보안 메커니즘을 설명해요. "JWT"는 유효한 JSON 웹 토큰이 필요하다는 것을 나타내요.
- @Param: 예상되는 매개변수를 설명해요. 예를 들어 URL 경로에서 필요한 정수 매개변수인 "id"는 펫의 ID를 나타내요.
- @Success: API의 성공적인 응답을 설명해요. "200"은 성공을 나타내는 HTTP 상태 코드이고, 'object' Pet은 응답 구조를 설명하며, "펫의 세부 정보"는 응답이 포함하는 내용에 대해 간략히 설명해요.
- @Router: API의 경로(URL 경로)와 메서드를 정의해요. 여기서 /pets/'id'가 경로이고 [get]이 메서드에요.

Swagger는 이러한 주석을 해석할 뿐만 아니라 Pet 구조체를 사용하여 해당 모델을 작성해요. 나중에 이 모델 세부 정보를 더 구체화하고 개선하는 방법을 살펴볼 거에요.

![이미지](/assets/img/2024-07-13-SwaggerinGoWhyItstheGeniusMoveYouHaventMadeYet_3.png)

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

# 3. 다양한 환경에 맞게 Swagger 사용자 정의하기

Swagger 주석은 일반적으로 정적이며 사전에 컴파일됩니다.

그럼에도 불구하고 host, basePath, schemes, 보안 구성 같은 특정 요소들을 동적으로 조정하여 개발 또는 운영과 같은 다양한 환경에 적응할 수 있습니다.

$ swag init으로 생성된 docs.go 파일에서 SwaggerInfo 구조체를 찾을 수 있으며, 이는 이러한 런타임 조정에 중요합니다.

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
// SwaggerInfo은 Swag CLI로 생성된 구성을 보유합니다.
var SwaggerInfo = &swag.Spec{
    Version:          "1.0",
    Host:             "petmanagement.com",
    BasePath:         "/api/v1",
    Schemes:          []string{"http", "https"},
    Title:            "Pet Management API",
    Description:      "애완동물을 관리하기 위한 포괄적인 API로, 애완동물 데이터의 생성, 업데이트, 삭제 및 검색을 위한 엔드포인트가 포함되어 있습니다.",
    InfoInstanceName: "swagger",
    SwaggerTemplate:  docTemplate,
    LeftDelim:        "{",
    RightDelim:       "}",
}
```

환경에 따라 호스트 및 스키마를 수정해야 하는 경우, 로컬 또는 프로덕션 모드로 기반을 변경하기 위해 SwaggerInfo 구조체를 다음과 같이 업데이트하면 됩니다:

```js
// 사용자 정의 수정
if isLocal {
    docs.SwaggerInfo.Host = "localhost:8081"
    docs.SwaggerInfo.Schemes = []string{"http"}
}
```

이러한 런타임 조정을 넘어서 Swagger UI는 API 문서의 기능성을 향상시키기 위한 다양한 구성 옵션을 제공합니다.

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
e.GET("/swagger/*", echoswagger.EchoWrapHandler(echoswagger.PersistAuthorization(true)));
```

여기 몇 가지 주목할만한 옵션이 있어요:

- URL: API 정의의 위치를 지정합니다. API 정의가 다른 곳에 호스팅되어 있다면 여기에 그곳을 가리킬 수 있습니다. 기본값은 ["doc.json", "doc.yaml"]이지만, 이는 문서 폴더의 swagger.json 및 swagger.yaml과 관련이 없습니다.
- DocExpansion (기본값: "list"): API 라우트 및 태그가 Swagger UI에 표시되는 방식을 관리합니다. 기본 "list" 설정은 태그만 확장합니다. 다른 설정에는 "full" (태그 및 작업을 확장), "none" (아무 것도 확장하지 않음)이 포함됩니다.
- DeepLinking (기본값: true): Swagger 문서의 특정 섹션에 직접 링크를 만들 수 있도록 합니다. 직접 참조나 공유에 유용합니다.
- DefaultModelsExpandDepth (기본값: 1): 문서에서 기본적으로 모델 스키마가 얼마나 깊게 확장되는지 결정합니다. -1로 설정하면 UI에서 모델을 완전히 숨깁니다.
- InstanceName (기본값: "Swagger"): 동일한 라우터에 여러 Swagger 문서가 있는 경우 특히 유용합니다. 각 Swagger 인스턴스에 고유한 이름을 제공하여 충돌을 방지합니다.
- PersistAuthorization (기본값: false): 브라우저 세션에 인증 데이터(예: API 키 또는 OAuth 토큰)를 유지하여 매 페이지 새로 고침 시 다시 입력하지 않아도 되게 합니다.
- Oauth2DefaultClientID (기본값: ""): API가 인증에 OAuth2를 사용하는 경우 이 옵션은 OAuth2 인증 대화 상자의 client_id 필드를 미리 채웁니다. 테스트나 데모를 간소화합니다.

# 4. Model

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

Swagger UI는 자동으로 모델, 예제 및 세부 필드 정보를 만들어내며 유효성 검사를 포함합니다. Swagger 특정 어노테이션과 태그를 사용하여 모델을 다듬는 데 팩트를 들어봅시다.

## a. 설명

우선, 우리는 모델에 설명적인 어노테이션을 추가할 것입니다. 이제 주석으로 설명이 추가된 Pet 모델의 보다 정교한 버전을 고려해봅시다:

```js
// Pet 모델 정보
//
//  @description    스토어에 추가해야 하는
//  @description    Pet 객체
type Pet struct {
    // 애완동물의 ID
    ID          int    `json:"id"`
    Name        string `json:"name"` // 애완동물의 이름
    Species     string `json:"species"`
    Age         int    `json:"age"`
    Description string `json:"description"`
} //  @name   RenamePet
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

이번에는 몇 가지 개선 사항을 도입했습니다:

- @description을 사용하여 모델에 설명을 추가했습니다.
- @name을 사용하여 모델의 표시 이름을 변경했습니다.
- 개별 필드에 설명을 추가했습니다.

필드 설명을 필드 바로 위에 또는 즉시 뒤에 배치할 수 있습니다. 두 방법 모두 괜찮습니다.

<img src="/assets/img/2024-07-13-SwaggerinGoWhyItstheGeniusMoveYouHaventMadeYet_4.png" />

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

## b. 구조체 태그

스웨고(Swaggo)는 각 필드에 직접 길이 및 필수 필드와 같은 간단한 유효성 검사 및 예시를 통합할 수 있게 해주며, 모두 구조체 태그를 통해 가능합니다.

아래는 다양한 스웨거 별 구조체 태그로 향상된 Pet 구조체입니다. 간소화를 위해 설명은 생략했습니다:

```js
type Pet struct {
 ID          int    `json:"id" example:"1" format:"int64" minimum:"1" maximum:"100"`
 Name        string `json:"name" example:"Tom" minLength:"3" maxLength:"20"`
 Species     string `json:"species" example:"Cat"`
 Age         int    `json:"age" example:"2" minimum:"1" maximum:"20"`
 Description string `json:"description" example:"A cute cat"`
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

예제 태그의 효과는 즉시 API 섹션에서 눈에 띕니다. 게다가, 이 구조체가 요청의 일부라면 필드 유효성 검사가 활성화되어 Swagger UI 내에서 강제 적용됩니다.

![](/assets/img/2024-07-13-SwaggerinGoWhyItstheGeniusMoveYouHaventMadeYet_5.png)

다음은 구조체 태그 옵션을 설명한 것입니다:

- default: 클라이언트가 제공하지 않은 경우 필드에 대한 기본값을 설정합니다.
- example: Swagger 문서에 예시 값 표시.
- validate (문자열): "필수" 또는 "선택적"일 수 있습니다.
- maximum, minimum (숫자): 숫자 필드의 상한값과 하한값을 설정합니다.
- maxLength, minLength (정수): 문자열 필드의 최대 및 최소 길이를 지정합니다.
- multipleOf (숫자): 숫자 값을 특정 숫자의 배수로 요구합니다.
- enums (\*): 필드 또는 배열 요소에 대한 모든 가능한 값을 나열합니다.
- format (문자열): "date-time"과 같이 필드의 형식을 정의합니다.
- collectionFormat (배열): 배열의 형식을 설명하며, csv(쉼표로 구분), ssv(공백으로 구분), tsv(탭으로 구분), pipes(파이프(|)로 구분), multi(단일 매개변수 내에 여러 값), 또는 default(표준 배열 형식) 옵션이 사용됩니다.
- swaggerignore (부울): true인 경우 Swagger 문서에서 해당 필드를 제외합니다.
- swaggertype (문자열): 필드가 Swagger 문서에 나타나는 방식을 지정합니다. 예를 들어, time.Time 필드는 swaggertype:"string"을 사용하여 문자열로 나타낼 수 있습니다. 이는 custom UnmarshalJSON 및 MarshalJSON을 가진 유형에도 유용합니다.
- extensions: 표준 OpenAPI 명세에서 다루지 않는 추가 정보나 동작을 제공합니다.

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

코드에서 미리 정의된 열거형에 대해 Swaggo는 enums 태그를 사용하여 가능한 값을 수동으로 나열할 필요가 없습니다. Swaggo가 이 값을 자동으로 감지하고 생성합니다.

```js
type Species string

const (
  Cat Species = "Cat"
  Dog Species = "Dog"
)

type Pet struct {
  ID      int     `json:"id" example:"1" format:"int64" minimum:"1" maximum:"100"`
  Name    string  `json:"name" example:"Tom" minLength:"3" maxLength:"20"`
  Species Species `json:"species"`
}
```

Swaggo는 또한 첫 번째로 감지된 열거형 값을 예제로 선택하고 이를 위한 추가 모델을 생성합니다.

![스웨거 이미지](/assets/img/2024-07-13-SwaggerinGoWhyItstheGeniusMoveYouHaventMadeYet_6.png)

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

이제 Swaggo의 주요 측면과 기본 사항들을 다루었어요. 더 자세한 사용자 정의 및 고급 기능을 원하신다면, 여기서 제안하는 공식 설명서를 살펴보시기를 권해드립니다.
