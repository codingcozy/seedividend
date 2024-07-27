---
title: "Angular 애플리케이션과 Net Web API를 Auth0로 안전하게 보호하기"
description: ""
coverImage: "/assets/img/2024-05-17-SecureanAngularapplicationandNetWebAPIwithAuth0_0.png"
date: 2024-05-17 03:31
ogImage: 
  url: /assets/img/2024-05-17-SecureanAngularapplicationandNetWebAPIwithAuth0_0.png
tag: Tech
originalTitle: "Secure an Angular application and .Net Web API with Auth0"
link: "https://medium.com/@cl0v15/secure-an-angular-application-and-net-web-api-with-auth0-df1db7d6effa"
---


<img src="/assets/img/2024-05-17-SecureanAngularapplicationandNetWebAPIwithAuth0_0.png" />

이 튜토리얼에서는 Angular 애플리케이션에 로그인 시스템을 추가하고 .Net Web API를 Auth0로 보호하는 방법을 배워보겠습니다.

먼저 무료 Auth0 계정을 생성하고 설정할 것입니다. 그 후 .Net 7 Web API를 생성하고 보호된 엔드포인트를 설정할 것입니다. 그런 다음 Angular 애플리케이션을 생성하고 JWT 베어러를 사용하여 Web API를 호출할 수 있는 로그인 시스템을 추가할 것입니다.

보안에 대해 잘 모르더라도, Auth0를 사용하면 보안 서비스를 처음부터 만들 필요 없이 응용 프로그램에 인증/권한 부여를 추가할 수 있는 좋은 방법입니다.

<div class="content-ad"></div>

# Auth0

## Auth0 계정 생성

https://auth0.com으로 이동하여 무료로 가입하고 계정을 설정하세요.

## Auth0 싱글 페이지 애플리케이션 구성

<div class="content-ad"></div>

왼쪽 메뉴에서 Applications > Applications로 이동하여 Default App을 선택하십시오. 설정 탭으로 이동하여 이름을 변경하십시오. 또한 새 응용 프로그램을 만들 수 있습니다.

설정에서 Angular 앱과 통신할 때 사용할 응용 프로그램 도메인, 클라이언트 ID 및 클라이언트 비밀번호를 확인할 수 있습니다.

앱 속성 아래로 스크롤하면 Application Type을 Single Page Application으로 변경할 수 있습니다.

Application URIs 섹션에서 Allowed Callback, Logout URLs 및 Allowed Web Origins에 URL http://localhost:4200/을 제공하십시오.

<div class="content-ad"></div>

http://localhost:4200/은 우리 Angular 애플리케이션의 로컬 URL이 되겠습니다.

# .Net 7 웹 API를 생성하고 보안 설정하기

## 새 .Net Web API 프로젝트 만들기

Visual Studio를 열고 ASP.NET Core Web API 프로젝트 템플릿에서 새 프로젝트를 만드세요. .Net 6 프레임워크를 선택하세요. 이 튜토리얼에서는 이 템플릿에서 생성된 WeatherForcastController를 사용할 것입니다. 이 컨트롤러에는 사용 예제에서 사용할 HTTP Get 엔드포인트가 포함되어 있습니다.

<div class="content-ad"></div>

프로젝트를 생성한 후 프로그램을 실행하고 https://localhost:7202/weatherforecast (포트 번호가 다를 수 있습니다)으로 JSON 형식의 WeatherForecast 목록이 반환되는지 확인해주세요.

## 교차 도메인 요청 허용

우리의 Angular 애플리케이션에서 모든 HTTP 요청을 허용해야 합니다. Program.cs 또는 Startup.cs 파일을 열어주세요.

builder.Services를 services로 바꿔주세요. 그리고 var builder = WebApplication.CreateBuilder(args); 다음에 services 변수를 만들어주세요:

<div class="content-ad"></div>

```js
var services = builder.Services;Copy
```

그 후에, CORS 미들웨어를 추가하세요.

```js
app.UseCors("CorsPolicy");Copy
```

CORS 정책을 등록하고 http://localhost:4200 출처를 허용하세요.

<div class="content-ad"></div>


```js
services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder => builder
    .WithOrigins("http://localhost:4200")
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials());
});
```

## Auth0에 API 추가하기

Auth0 계정으로 돌아가서 Applications & APIs로 이동하여 새 API를 생성하세요.

API 이름과 식별자 URL(https://localhost:7202/로 포트 번호를 변경)을 입력하세요. RS256 알고리즘을 선택하세요.


<div class="content-ad"></div>

## API 엔드포인트 보안하기

이제 우리는 엔드포인트를 보안하고, 인증된 사용자만이 이에 액세스하고 반환된 콘텐츠와 함께 성공적인 HTTP 응답을 받을 수 있도록하려고합니다.

먼저, Get() 메서드에 Microsoft.AspNetCore.Authorization에서 [Authorize] 속성을 추가하십시오.

```csharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
```

<div class="content-ad"></div>

```csharp
namespace Auth0WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
        private readonly ILogger<WeatherForecastController> _logger;
        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }
        [HttpGet]
        [Authorize]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
```

우리는 ConfigurationManager를 통해 Audience 및 Domain 값을 액세스하고 싶어해요.

따라서 appsettings.json에 Audience와 Domain을 추가해주세요.

```json
"Auth0": {
  "Audience": "https://localhost:7202/",
  "Domain": "auth0tuto.eu.auth0.com"
}
```

<div class="content-ad"></div>

그러면 "테이블" 태그를 Markdown 형식으로 변경해주세요.


| 아이템 | 가격 |
|---|---|
| 사과 | 1.99 |
| 바나나 | 0.99 |
| 수박 | 5.99 |


<div class="content-ad"></div>

아래 코드를 추가하여 인증을 구성하십시오.

```js
services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.Authority = $"https://{auth0.Domain}/";
    options.Audience = auth0.Audience;
});
```

저희는 인증 토큰을 활용한 JWT 베어러 인증을 사용할 것입니다. 해당 인증은 Authorization HTTP 헤더에서 추출되고 유효성이 검사될 것입니다.

토큰을 유효성 검사하려면, Auth0 애플리케이션에서 구성한 도메인을 지정해야 합니다. 이 정보는 설정에서 찾을 수 있으며, 방금 생성한 Auth0 API의 식별자인 Audience(청중)도 지정해야 합니다.

<div class="content-ad"></div>

다음과 같이 AuthenticationMiddleware을 추가해 주세요:

```js
app.UseAuthentication();Copy
```

프로그램을 다시 실행하면 HTTP ERROR 401 (Unauthorized)를 받게 됩니다.

# Angular 애플리케이션을 만들어 로그인 시스템을 구축하세요

<div class="content-ad"></div>

## Angular CLI 설치

이미 시스템에 Angular이 설치되어 있는 경우, 이 단계를 건너뛰세요.

먼저, Node.js를 다운로드하고 설치해야 합니다 - ` https://nodejs.org/en/download

그런 다음, 명령 프롬프트에 이 명령을 입력하여 Angular CLI를 설치하세요.

<div class="content-ad"></div>

```js
npm install -g @angular/cli
```

만약 Windows를 사용 중이라면, PowerShell 스크립트 실행을 허용하기 위해 다음 명령을 실행해주세요.

```js
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

## Angular 애플리케이션 생성하기

<div class="content-ad"></div>

새로운 Angular 애플리케이션을 생성하려면 ng new CLI 명령어를 실행하세요.

```js
ng new auth0-angular-appCopy
```

앱에 포함할 기본 기능을 선택하세요.

애플리케이션이 생성되면 ng serve -o를 실행하여 브라우저에서 앱을 실행하고 엽니다.

<div class="content-ad"></div>

```js
ng serve --oCopy
```

이제 기본 Angular 애플리케이션을 실행하는 것을 확인할 수 있습니다.

## Auth0 SDK 설치

좋아하는 텍스트 편집기나 IDE로 애플리케이션을 열어보세요. 여기서는 VS Code를 사용하겠습니다.

<div class="content-ad"></div>

프로젝트 디렉토리 내에서 터미널을 열고 Auth0 Angular SDK를 설치하려면 다음 명령을 실행해주세요.

```js
npm install @auth0/auth0-angularCopy
```

app.module.ts를 열어서 AuthModule 패키지를 가져와서 AuthModule.forRoot를 호출하여 imports 목록에 추가해주세요. Auth0 애플리케이션 설정에서 Domain 및 ClientId 값을 복사해주세요.

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular'
```

<div class="content-ad"></div>

```js
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'auth0tuto.eu.auth0.com',
      clientId: 'aJZmQXUxWhl4arU5ZhN2FJ38YUQgNYbf'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## 로그인/로그아웃 추가하기

app.component.ts 파일을 열고 AuthService 클래스에 대한 종속성을 생성자에 추가하고 '@auth0/auth0-angular'에서 AuthService를 가져와주세요.

귀하의 코드는 다음과 같아야 합니다:

<div class="content-ad"></div>

```js
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
```

```js
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auth0-angular-app';
  constructor(public auth: AuthService) {}
}
```

이제 app.component.html 파일을 열어서 배너에 Twitter 버튼 바로 전에 다음 코드를 추가하세요.

```js
<ng-template #loggedOut>
  <button class="btn-login" (click)="auth.loginWithRedirect()">
    로그인
  </button>
</ng-template>
<button class="btn-login" (click)="auth.logout()" *ngIf="auth.isAuthenticated$ | async; else loggedOut">
  로그아웃
</button>
```

<div class="content-ad"></div>

loginWithRedirect() 메소드를 호출하면 사용자가 Auth0 Universal 로그인 페이지로 리디렉션되어 해당 페이지에서 애플리케이션으로 이동하기 전에 로그인 또는 회원 가입을 할 수 있습니다.

그런 다음, 다음 CSS를 `<style></style>` 사이에 추가해주세요.

```js
.btn-login {
  border-radius: 4px;
  border: 1px solid #eee;
  background-color: #fafafa;
  color: #333;
  padding: 10px 25px;
  text-decoration: none;
  cursor: pointer;
}
```

이제 배너에 로그인 버튼이 표시될 것입니다.

<div class="content-ad"></div>

`div class = "content" role = "main"`와 `/div` 사이의 모든 것을 삭제하고 다음 코드를 복사하여 붙여넣으십시오.

```js
<p *ngFor="let item of weatherForecasts">
  {item.date} |
  {item.temperatureC} °C |
  {item.temperatureF} °F |
  {item.summary}
</p>
```

## 회원 가입

로그인 버튼을 클릭하세요.

<div class="content-ad"></div>

지금은 Auth0 로그인 페이지로 이동되었습니다.

새 계정을 만들려면 가입하세요. 계정을 확인하기 위해 이메일을 받아야 합니다.

이제 Auth0 대시보드로 돌아가서, 왼쪽 메뉴에서 사용자 관리 `사용자`로 이동하여 사용자가 생성되었는지 확인하세요.

## 로그아웃

<div class="content-ad"></div>

가입한 후에는 로그인 버튼이 로그아웃 버튼으로 대체된 것을 볼 수 있습니다.

로그아웃하려면 클릭하십시오.

## 로그인

이제 다시 로그인 버튼을 클릭하여 응용 프로그램에 로그인하십시오.

<div class="content-ad"></div>

사용자 로그인 시스템이 작동되었으니, 이제 보안된 웹 API에 HTTP 호출을 만들어 날씨 예보 목록을 가져와 표시하고 싶어요.

## HTTP 서비스 생성

새 서비스를 만들기 위해 다음 Angular CLI 명령어를 실행해줘.

```js
ng g s weatherforecastCopy
```

<div class="content-ad"></div>

app.module.ts에 WeatherForecastService와 HttpClientModule를 providers 배열에 추가해주세요. './weatherforecast.service'에서 WeatherForecastService를 import하고, @angular/common/http에서 HttpClientModule를 import해주세요.

api.service.ts를 열어서 constructor에 HttpClient 의존성을 추가하고, @angular/common/http에서 클래스를 import하고 get() 메소드를 생성해주세요.

```typescript
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

constructor(private http: HttpClient) {}

get(): Observable<number> {
  return this.http.get<number>("https://localhost:7202/weatherforecast/");
}
```

이 메소드는 우리 Web API의 weatherforecast 엔드포인트로 GET http 호출을 하게 됩니다.

<div class="content-ad"></div>

귀하는 다음과 같이 서비스 클래스를 작성하셔야 합니다:

```js
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
```

```js
@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {
  constructor(private http: HttpClient) { }
  get(): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7202/weatherforecast");
  }
}
```

## 날씨 예보 표시하기

<div class="content-ad"></div>

app.components.ts로 돌아가서 생성자에 WeatherForecastService 종속성을 추가하고 ./weatherforecast.service에서 해당 클래스를 import하세요.

weatherForecasts 변수를 생성하고 초기화하세요.

```js
weatherForecast: any[] = [];
```

getWeatherForecasts() 메서드를 생성하여 날씨 예보 목록을 로드하세요.

<div class="content-ad"></div>


```js
getWeatherForecasts() {
  this.weatherForecastService.get().subscribe(data => {
    this.weatherForecast = data;
  })
}
```

```js
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { WeatherForecastService } from './weatherforecast.service';
```

```js
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'auth0-angular-app';
  weatherForecasts: any[] = [];
  constructor(
    public auth: AuthService,
    private weatherForecastService: WeatherForecastService
  ) {}
  ngOnInit(): void {
    this.getWeatherForecasts();
  }
  getWeatherForecasts() {
    this.weatherForecastService.get().subscribe(data => {
      this.weatherForecasts = data;
    })
  }
}
```

## Add JWT to the HTTP requests


<div class="content-ad"></div>

이전에 언급한 대로, 저희 웹 API는 HTTP 요청의 Authorization 헤더에서 JWT bearer를 디코딩하여 클라이언트의 엔드포인트 접근을 승인합니다.

Auth0 SDK를 사용하면 각 요청에 JWT를 수동으로 추가할 필요가 없습니다. 대신에, 우리를 대신해서 일을 처리해줄 Auth0 HTTP 인터셉터를 사용하겠습니다.

app.module.ts에서 AuthHttpInterceptor와 HTTP_INTERCEPTORS를 다음과 같이 providers 배열에 추가하세요:

```js
providers: [
  WeatherForecastService,
  { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
],Copy
```

<div class="content-ad"></div>

@angular/common/http에 HTTP_INTERCEPTORS와 @auth0/auth0-angular에 AuthHttpInterceptor을 추가해주세요.

AuthModule.forRoot()에서 audience와 httpInterceptor를 추가하고, 허용된 API 경로 목록에 API URL을 추가해주세요.

우리의 app.module.ts는 이제 다음과 같이 보입니다:

```js
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { WeatherForecastService } from './weatherforecast.service';
```

<div class="content-ad"></div>


```js
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'auth0tuto.eu.auth0.com',
      clientId: 'aJZmQXUxWhl4arU5ZhN2FJ38YUQgNYbf',
      audience: 'https://localhost:7202/',
      httpInterceptor: {
        allowedList: [ 'https://localhost:7202/*' ],
      },
    }),
  ],
  providers: [
    WeatherForecastService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

# 모두 테스트하기

이제 웹 API를 실행하고 Angular 애플리케이션에 로그인하세요.

이제 페이지에 표시되는 날씨 예보 목록을 볼 수 있어야 합니다.
