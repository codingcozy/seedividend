---
title: "ASPNET Core Web API를 사용하여 Google reCAPTCHA 구현하기"
description: ""
coverImage: "/assets/img/2024-05-14-ImplementingGooglereCAPTCHAusingASPNETCoreWebAPI_0.png"
date: 2024-05-14 14:34
ogImage: 
  url: /assets/img/2024-05-14-ImplementingGooglereCAPTCHAusingASPNETCoreWebAPI_0.png
tag: Tech
originalTitle: "Implementing Google reCAPTCHA using ASP.NET Core Web API"
link: "https://medium.com/@meghnav274/implementing-google-recaptcha-using-asp-net-core-web-24f539ba4987"
isUpdated: true
---





![Implementing reCAPTCHA using ASP.NET Core Web API](/assets/img/2024-05-14-ImplementingGooglereCAPTCHAusingASPNETCoreWebAPI_0.png)

폼을 디자인했지만 웹 사이트가 봇 공격이나 다른 자동화된 공격을 받고 백엔드로 무관한 데이터를 제출할까 걱정되나요? Google reCaptcha가 이 문제에 대한 해결책을 제공합니다.

Google reCaptcha는 사기를 탐지하고 합법적인 사용자만 시스템에 입력하고 로그인 페이지를 사용하거나 양식을 제출하거나 결제를 하거나 페이지를 보거나 가짜 사용자를 차단하는 등의 작업을 허용하는 시스템입니다.

이제 프로젝트에 reCaptcha를 구현하는 방법에 대해 이야기해보겠습니다. 프론트엔드로 HTML, CSS 및 Javascript을 사용하고 백엔드로는 ASP.NET Core Web API를 사용할 것입니다.




구현 부분은 상당히 쉽습니다. Google은 reCaptcha 생성을 위한 API를 제공하며, 해당 API의 JavaScript 파일 링크를 HTML 코드에 포함해야 합니다.

우리는 HTML과 CSS를 사용하여 간단한 로그인 폼을 만드는 것부터 시작할 것입니다.

나는 이 로그인 폼을 만들었는데, 여기에 Google reCaptcha를 추가할 것입니다.

![Login Form](/assets/img/2024-05-14-ImplementingGooglereCAPTCHAusingASPNETCoreWebAPI_1.png)



Google reCaptcha를 추가하려면 나중에 코드에서 사용할 키를 먼저 생성해야 합니다.

새 키를 생성하려면 다음 URL을 방문하십시오:

[https://www.google.com/recaptcha/admin/create](https://www.google.com/recaptcha/admin/create)

Google 계정으로 이미 로그인되어 있으면 등록 대시보드가 표시됩니다. 그렇지 않으면 Google 계정으로 먼저 로그인해야 합니다.



이것은 등록 키 대시보드입니다. 여기에는 레이블, reCaptcha 유형 및 도메인과 같은 기본 정보를 입력해야 합니다.

![이미지](/assets/img/2024-05-14-ImplementingGooglereCAPTCHAusingASPNETCoreWebAPI_2.png)

- 레이블은 키에 할당하려는 아무 이름이 될 수 있습니다.
- Google이 제공하는 두 가지 유형의 reCaptcha가 있습니다. v3와 v2입니다. 저희는 v2 "나는 로봇이 아닙니다" 확인란을 사용할 것입니다.
- 도메인 필드에는 Google reCaptcha를 사용할 도메인을 지정해야 합니다. 예를 들어, 웹 사이트 이름이 다음과 같다면:
https://your-website.com/index.html — 여기서는 도메인으로 your-website.com만 입력하면 됩니다.
저는 데모 목적으로 reCaptcha를 구현하고 있으므로 애플리케이션을 로컬 환경에서 실행할 것입니다. 따라서 도메인으로 127.0.0.1을 사용했습니다.

![이미지](/assets/img/2024-05-14-ImplementingGooglereCAPTCHAusingASPNETCoreWebAPI_3.png)



모든 세부 정보를 입력한 후 제출 버튼을 클릭해주세요. 그럼 두 개의 키가 생성됩니다. 클라이언트 측에서 사용되는 사이트 키와 서버 측에서 사용되는 시크릿 키가 있습니다.

![이미지](/assets/img/2024-05-14-ImplementingGooglereCAPTCHAusingASPNETCoreWebAPI_4.png)

코딩 부분으로 돌아가면, reCaptcha를 삽입할 위치에 다음 코드 라인을 추가해야 합니다. 로그인 버튼 앞에 추가하겠습니다.

```js
<div class="g-recaptcha" data-sitekey=여기에_사이트_키_입력></div>
```



원하는 위치에 이 div 클래스를 추가한 후, Google reCaptcha API를 호출하는 JavaScript 파일을 추가하십시오.

```js
<script type="text/javascript" src="https://www.google.com/recaptcha/api.js"></script>
```

reCaptcha를 추가한 후 로그인 페이지가 이렇게 보입니다.

![이미지](/assets/img/2024-05-14-ImplementingGooglereCAPTCHAusingASPNETCoreWebAPI_5.png)



아래에 HTML(index.html) 및 CSS(style.css) 파일의 코드를 찾을 수 있어요:

```js
<!DOCTYPE html>
<head>
    <title>로그인 페이지</title>
    <link rel="stylesheet" href="style.css">    
    <script type="text/javascript" src="https://www.google.com/recaptcha/api.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script type="text/javascript" src="script.js"></script>
</head>
<body>
    <div class="login-page">
        <div class="form">      
          <div class="login-form">
            <input type="text" placeholder="사용자 이름"/>
            <input type="password" placeholder="비밀번호"/>
            <div class="g-recaptcha" data-sitekey="6LfU_xMpAAAAADmXvZq0VqCVLIyJz3x6V8dUQeZ8"></div><br>
            <button onclick="LoginButton()">로그인</button>            
          </div>
        </div>
    </div>
</body>
</html>
```

```js
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: rgb(116, 223, 187);
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: rgb(8, 103, 116);
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #073b44;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
```

프론트엔드 부분이 이제 완료되었어요. 그 다음에는 자바스크립트를 사용하여 reCaptcha로부터 응답을 가져와서 시크릿 키를 사용하여 백엔드에서 응답을 확인할 거에요.



로그인 버튼에 onclick 함수를 추가했어요. 이 함수는 reCaptcha로부터 응답을 가져오고 API에 ajax 호출을 만들 거예요. 필요에 따라 세 개의 필드가 모두 채워질 때까지 로그인 버튼을 비활성화하는 기능 같은 다른 기능도 추가할 수 있어요. 여기서는 간단하게 reCaptcha의 유효성을 성공 또는 실패했을 때 경고 메시지를 표시해 줄 거에요.

API 쪽에서는 ASP.NET Core와 Visual Studio 2022를 사용하고 있어요. 제 블로그의 첫 번째 부분(단계 1)을 참조해서 Visual Studio 2022를 사용해 API 프로젝트를 만드는 방법을 알아볼 수 있어요.

- appsettings.json으로 이동해서 비밀 키를 추가하세요.

![이미지](/assets/img/2024-05-14-ImplementingGooglereCAPTCHAusingASPNETCoreWebAPI_6.png)



```js
"reCaptcha": {
    "SecretKey": Your_Secret_Key, 
  },
```

2. 새 컨트롤러를 만듭니다. 다음 단계를 따라주세요:
Controllers 폴더에서 우클릭 -` 추가 -` 컨트롤러 -` 빈 API 컨트롤러 선택 -` 컨트롤러에 이름 지정 (저는 UserController라고 이름짓겠습니다).

컨트롤러를 만들면 다음과 같은 모습이 될 것입니다:

<img src="/assets/img/2024-05-14-ImplementingGooglereCAPTCHAusingASPNETCoreWebAPI_7.png" />



3. 컨트롤러에 reCaptcha를 검증하는 로직을 추가하세요.

![이미지](/assets/img/2024-05-14-ImplementingGooglereCAPTCHAusingASPNETCoreWebAPI_8.png)

- 여기서 우리는 Configuration을 주입하여 appsettings.json에서 Secret Key를 가져오고 HttpClient를 사용하여 결과를 Google API 엔드포인트에 전송합니다.
- 'GetreCaptchaResponse'라는 메서드를 생성했는데, 이 메서드는 프론트 엔드에서 전송된 reCaptcha 응답을 받습니다. 그다음으로, 응답 및 시크릿 키를 저장할 'content' 변수를 생성합니다.
- Google은 응답과 시크릿 키가 전달되어야 하는 API 엔드포인트(https://www.google.com/recaptcha/api/siteverify)를 제공하고, json 형식의 결과를 제공합니다. 자세한 정보는 해당 페이지에서 확인할 수 있습니다.
우리는 이 내용을 해당 API로 전달하고 결과를 'response' 변수에 저장합니다.
- 이 응답이 성공하면 'Success' 및 'Error' 코드를 읽어 'result' 변수에 저장합니다.

아래에서 전체 코드를 찾을 수 있습니다.



```csharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace reCaptchaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        public UserController(IConfiguration configuration, HttpClient httpClient)
        {
            _configuration = configuration;
            _httpClient = httpClient;
        }
        [HttpGet("Captcha")]
        public async Task<bool> GetreCaptchaResponse(string userResponse)
        {
            var reCaptchaSecretKey = _configuration["reCaptcha:SecretKey"];

            if(reCaptchaSecretKey != null && userResponse != null)
            {
                var content = new FormUrlEncodedContent(new Dictionary<string, string>
                {
                    {"secret", reCaptchaSecretKey },
                    {"response", userResponse }
                });
                var response = await _httpClient.PostAsync("https://www.google.com/recaptcha/api/siteverify", content);
                if(response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadFromJsonAsync<reCaptchaResponse>();
                    return result.Success;
                }
            }
            return false;
        }

        public class reCaptchaResponse
        {
            public bool Success { get; set; }
            public string[] ErrorCodes { get; set; }
        }
    }
}
```

다음 단계는 HttpClient 미들웨어를 program.cs에 등록하고 이 API를 프론트엔드에서 호출할 것이므로 CORS (Cross Origin Resource Sharing)를 지정해야합니다. 이는 프론트엔드 코드에서 API에 액세스할 수 있도록 도와줍니다.

<img src="/assets/img/2024-05-14-ImplementingGooglereCAPTCHAusingASPNETCoreWebAPI_9.png" />

CORS를 지정하려면:




```js
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

app.UseCors();
```

To register HttpClient Middleware:

```js
builder.Services.AddHttpClient();
```

Your API Project is now completed. You can run and test it once using swagger.



이제 남은 것은 API를 구현하기 위해 ajax 호출을 작성하는 것입니다. 로그인 버튼에 onclick 함수를 추가하고 함수 내에서 ajax 호출을 정의할 것입니다.

<img src="/assets/img/2024-05-14-ImplementingGooglereCAPTCHAusingASPNETCoreWebAPI_10.png" />

여기서 reCaptcha 응답을 받아 이를 API의 매개변수로 보내고 있습니다. API 프로젝트를 실행하고 Swagger 페이지가 열리면 로컬호스트 URL을 복사하여 여기에 사용할 수 있습니다. 엔드포인트 이름을 정확히 지정했는지 확인해주세요!

이러한 변경 사항을 적용하고 애플리케이션을 실행한 후, 다음과 같은 경고를 받게 될 것입니다:




[이미지](/assets/img/2024-05-14-ImplementingGooglereCAPTCHAusingASPNETCoreWebAPI_11.png)

자바스크립트 (script.js) 코드는 다음과 같습니다:

```js
function LoginButton(){
    const reCaptchaResponse = grecaptcha.getResponse();
    if(reCaptchaResponse){
        $.ajax({
            type: "GET",
            url: "https://localhost:44317/api/User/Captcha",
            data: {userResponse : reCaptchaResponse},            
            success: function(data){
                if(data){
                    //API returned true
                    alert("Captcha Verified");
                }else{
                    //API returned false
                    alert("Please verify captcha again");
                }               
            },
            error: function(error){
                alert("Please try again");
            }
        });
    }
    else{
        alert("Something went wrong with reCaptcha. Please try again!");
    }
}
```

이 응용 프로그램의 소스 코드를 참조해주세요:
