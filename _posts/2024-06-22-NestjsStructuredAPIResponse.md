---
title: "Nestjs에서 구조화된 API 응답 처리 방법"
description: ""
coverImage: "/assets/img/2024-06-22-NestjsStructuredAPIResponse_0.png"
date: 2024-06-22 02:19
ogImage: 
  url: /assets/img/2024-06-22-NestjsStructuredAPIResponse_0.png
tag: Tech
originalTitle: "Nest.js Structured API Response"
link: "https://medium.com/@zigbalthazar/nest-js-structured-api-response-5b1c165c262b"
isUpdated: true
---





![이미지](/assets/img/2024-06-22-NestjsStructuredAPIResponse_0.png)

Nest.js에는 미리 정의된 HTTP 응답 JSON 구조가 있습니다:

```js
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

응답 구조를 변경해야 하는 경우 더 많은 세부 정보를 추가하거나 이름이나 구조를 변경해야 할 수도 있습니다.
때로는 클라이언트(프론트엔드 또는 다른 서비스 클라이언트)를 위해 보다 구체적인 응답 구조를 정의해야 할 수도 있습니다.
컨트롤러 라우트의 끝에 사용자 정의 구조 응답을 작성하거나, 어디에서나 사용자 정의 응답을 보내기 위해 객체를 사용할 수 있습니다:


<div class="content-ad"></div>

가끔은 클라이언트(프론트엔드 또는 다른 서비스 클라이언트)에 대한 보다 구체적인 응답 구조를 정의하는 것이 필요할 수 있습니다.

어떤 경우에는 커스텀한 응답 구조를 작성해야 할 것이라고 생각할 수 있으며, 이를 위해 컨트롤러 루트의 끝에 커스텀 응답을 작성하거나 Response 객체를 사용하여 어디서든지(custom response를 전송할) 다음과 같이 사용할 수 있습니다:

```js
response
  .status(status)
  .json({
    statusCode: status,
    timestamp: new Date().toISOString(),
    path: request.url,
  });
```

# Class-Validator 응답이 커스텀 API 응답과 충돌합니다!

<div class="content-ad"></div>

우리 모두는 프로젝트에서 입력값을 유효성 검사하는 데 사용하고 있어요.
이 패키지는 다음과 같은 사전 정의된 오류 구조를 사용해요:

모두, 우리는 프로젝트에서 입력값을 유효성 검사하는 데 class-validator를 사용하고 있어요.
이 패키지는 다음과 같은 사전 정의된 오류 구조를 사용해요:

```js
{
  "statusCode": 400,
  "message": [
    {
      "property": "firstName",
      "message": "firstName must be longer than or equal to 1 characters"
    }
  ],
  "error": "Bad Request"
}
```

이 패키지를 사용할 때 코드에서는 class-validator 응답 구조와 호환되는 API 응답 구조를 사용하는 것이 좋아요. "property"를 클라이언트 측에 활용하여 오류를 적절한 위치(예: "property" 하단)에 표시할 수 있어요.

<div class="content-ad"></div>

# 서버에서 다국어 API 응답

다국어 플랫폼에서는 서버 측에서 오류 또는 메시지를 생성해야 할 경우가 있습니다. 클라이언트 측에서는 단순히 서버에서 받은 메시지를 표시해야 합니다. 이러한 경우에는 API 응답에 메시지를 포함해야 하며 이때 클라이언트가 메시지를 적절한 위치에 표시할 수 있도록 가이드하는 속성 필드가 포함되어야 합니다.

# 사용자 정의 응답 구조를 어떻게 정의할까요?

코드를 DRY하게 작성하고 복잡성을 줄이며 코드를 유지보수 가능하고 개발 가능하도록 해결해보겠습니다.

<div class="content-ad"></div>

# Let's Magic 🪄

다국어 및 class-validator와 호환되는 사용자 지정 응답을 정의하는 좋은 방법을 찾아봅시다:

- API 응답 유형 정의:

```js
export class messagesType {
  message: string
  property:string
}
export class ApiResponseDto<T> {
  statusCode: number;
  messages: messagesType[] | [];
  data: T;
}
```

<div class="content-ad"></div>

응답 데이터를 처리하기 위해 일반 유형을 사용하고 메시지를 메시지와 속성 필드를 포함한 배열로 만듭니다.

utils 서비스 또는 더 나은 곳에서 이 메서드를 정의할 수 있습니다:

```js
apiResponse<T>(statusCode: number, data: any = null, message: { message: string, property: string }[] | [] = []): ApiResponseDto<T> {
    return {
        statusCode,
        message,
        data,
    };
}
```

이 메서드는 API 응답 구조를 생성하여 반환하며, 유효성 검사, 살균 또는 원하는 모든 것을 추가할 수 있습니다.

<div class="content-ad"></div>

3. 이제 컨트롤러에서 메소드를 사용하여 반환하세요:

```js
return this.utilsService.apiResponse(
    HttpStatus.OK,
    functionReult,
    [{message:"email subscribed to newsletter",property:"email"}]
 )
```

4. apiResponseDto에 timeStamp, route 등의 데이터를 추가할 수 있어요. ✌️

이제 API 응답 결과를 즐기세요 ❤️.
질문은 언제든 환영이고, API 응답 구조에 대한 의견을 남겨주세요. 더 나아지도록 도와드릴게요.