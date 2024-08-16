---
title: "Angular와 NET Core로 Google 캘린더에 이벤트 동기화하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-SynceventstoGooglecalendarusingangularanddotnetcore_0.png"
date: 2024-06-22 03:36
ogImage: 
  url: /assets/img/2024-06-22-SynceventstoGooglecalendarusingangularanddotnetcore_0.png
tag: Tech
originalTitle: "Sync events to Google calendar using angular and dot net core"
link: "https://medium.com/@machhindra10/sync-events-to-google-calendar-using-angular-and-dot-net-core-ae539c508bf9"
isUpdated: true
---




<img src="/assets/img/2024-06-22-SynceventstoGooglecalendarusingangularanddotnetcore_0.png" />

이 기사에서는 앵귤러를 프론트엔드로 사용하고 백엔드 프로그래밍 언어로 닷넷 코어를 사용하여 우리 애플리케이션의 이벤트를 구글 캘린더에 동기화하는 방법을 단계별로 설명합니다.

# 단계 1: 구글 콘솔 OAuth 2.0 클라이언트 ID 설정

- 구글 콘솔로 이동하여 구글 계정으로 로그인합니다.
- 새 프로젝트를 만들고 이름을 지정합니다.
- APIs 및 서비스로 이동하고 Google 캘린더 API를 활성화합니다.
- 다음으로 OAuth 동의 화면으로 이동합니다.
- 여기에 처음 왔고 OAuth 동의 화면이 아직 구성되지 않았다면, OAuth 동의 화면을 구성하도록 강제하며 정보를 입력하고 다음 스코프 탭으로 이동합니다.
- 스코프 추가 및 제거 버튼을 클릭하여 스코프 목록에서 ".../auth/calendar.events" 스코프를 선택합니다.
- 다음 단계에서는 테스트용 구글 사용자 ID를 입력합니다 (이것들은 캘린더 이벤트를 동기화 할 클라이언트의 구글 이메일 ID입니다).
- 자격 증명으로 이동하여 자격 증명 만들기 링크를 클릭하고 OAuth 클라이언트 ID를 선택합니다.
- 애플리케이션 유형을 웹 애플리케이션으로 설정합니다.
- 다음 설정에서 승인된 Javascript 원본 (구글에 로그인 할 웹 애플리케이션 도메인 링크 예: http://www.example.com 또는 http://localhost:4200) 및 승인된 리디렉션 URI (구글이 로그인 후 우리 애플리케이션으로 리디렉션 할 링크 예: http://www.example.com/google-login 또는 http://localhost:4200/google-login)를 입력합니다.
- 생성 후, 앵귤러 애플리케이션에서 사용할 클라이언트 ID를 복사하여 구글에 로그인하고 로그인 한 후 구글에서 액세스 토큰을 가져올 수 있습니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-22-SynceventstoGooglecalendarusingangularanddotnetcore_1.png" />

# 단계 2: Angular 애플리케이션 부분

- 이 부분에서는 Google에 로그인하여 유효한 액세스 토큰을 받아 dot net core 웹 API 백엔드 서비스로 보낼 것입니다.
- 위의 기능을 통합할 준비가 된 Angular 프로젝트를 가정합니다.
- 패키지 "angular-oauth2-oidc"를 설치합니다.
- npm i angular-oauth2-oidc를 실행합니다.
- Google에 로그인하기 위해 새로운 컴포넌트(예: google-login)를 생성합니다.
- 그 다음에 angular-oauth2-oidc에서 새로 생성한 컴포넌트로 라이브러리를 가져옵니다.

```js
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

constructor(private readonly oAuthService: OAuthService) {
    this.signIntoGoogle(); // 클라이언트 측에 저장된 Google 인증 토큰을 확인하고, 없다면 Google 로그인 페이지로 리디렉션합니다.
}
```

<div class="content-ad"></div>

아래는 클라이언트 ID를 사용하는 코드입니다.

```js
 signIntoGoogle() {

        const oAuthConfig: AuthConfig = {
          issuer: 'https://accounts.google.com',
          strictDiscoveryDocumentValidation: false,
          redirectUri: window.location.origin + '/google-login', // Google에서 인증 후 리디렉션할 URL
          clientId: your-client-id, //(Google 콘솔 OAuth2 클라이언트 ID)
          scope: 'https://www.googleapis.com/auth/calendar'
        }

        this.oAuthService.configure(oAuthConfig)        

        this.oAuthService.loadDiscoveryDocument().then(() => {
          this.oAuthService.tryLoginImplicitFlow().then(() => {
            if (!this.oAuthService.hasValidAccessToken()) { // 토큰이 유효한지 확인
              this.oAuthService.initLoginFlow() // 로그인이 되어 있지 않다면 Google 로그인 페이지로 이동
              console.log('Google에 로그인 중...') 
            } else {
              console.log('Google에 로그인됨') 
              this.syncEvents(); // 이미 로그인되어 있다면 syncEvents 메서드 호출
            }
          },
            (err) => {
                console.log("액세스 거부, 다시 시도해 주세요!") 
            })
        })      
  }

 syncEvents() {
    if (this.syncing) {
      return;
    }

    if (!this.oAuthService.hasValidAccessToken()) {
      this.router.navigate(['/google-login']) 
      return; // 로그인되어 있지 않거나 유효한 액세스 토큰을 찾지 못했을 때
    }

    let scopes = this.oAuthService.getGrantedScopes() as Array<string>;

    if (!scopes.includes("https://www.googleapis.com/auth/calendar")) {
      console.log("액세스 거부, 다시 시도해 주세요!")
      this.oAuthService.logOut();
      this.syncing = false;
      return;
    }

    this.syncing = true;
    console.log("동기화 중, 잠시 기다려 주세요...!")

    const token = {
      accessToken: this.oAuthService.getAccessToken()
    }
    
    // 데이터베이스에서 Google 캘린더로 약속, 이벤트 등을 동기화하도록 .NET Core 백엔드 웹 API 엔드포인트 호출
    this.http.post(env.API_ENDPOINT + 'api/googlecal/sync-events', token, {
    }).subscribe((response: any) => {
      console.log("이벤트가 성공적으로 동기화되었습니다!")
      this.syncing = false;
    }, err => {
      console.log(err);
      this.syncing = false;
    });
  }
```

7. 위 코드는 브라우저에 유효한 인증 토큰이 있는지 확인하고, 그렇지 않다면 Google에서 로그인 플로우를 시작합니다. Google에 성공적으로 로그인하면 Google이 Authorized Redirect Uris에서 정의한 유효한 URL로 리디렉트되고, 유효한 인증 토큰이 브라우저에 저장됩니다.

8. 다음으로 해당 토큰이 .NET Core 백엔드 웹 API로 전송되어 동기화(약속, 이벤트 등을 애플리케이션에서 Google 캘린더로 동기화)가 가능합니다.

<div class="content-ad"></div>

# 단계 3: Dotnet Core WebAPI 부분

- 여기서는 Angular 애플리케이션에서 게시된 유효한 액세스 토큰을 사용하여 Google 서비스를 생성하고 Google 기본 캘린더에 이벤트를 만드는 방법을 알아봅니다.
- NuGet에서 두 개의 패키지가 필요합니다.
- dotnet add package Google.Apis.Auth.AspNetCore3 — 버전 1.68.0
- dotnet add package Google.Apis.Calendar.v3 — 버전 1.68.0.3430
- 다음과 같이 컨트롤러에서 패키지를 가져옵니다.

```js
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Calendar.v3;
using Google.Apis.Calendar.v3.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;

using Google.Apis.Auth.AspNetCore3;
using Google.Apis.Auth.OAuth2.Responses;

namespace ngCommon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoogleCalController : ControllerBase
    {
        static string calendarId = "primary";

        [HttpPost, Route("sync-events")]
        public IActionResult CreateEventsToGoogleCalendar([FromBody] TokenResponse accessToken)
        {
            CalendarService _service = GetCalenderServiceFromAccessToken(accessToken.AccessToken);

            // 데이터베이스에서 객체 변수를 가져와 이벤트를 생성합니다.
            this.CreateCalenderEvent(_service, appointment); // 여러분의 애플리케이션 개체 변수

            // 이미 만들어진 캘린더 이벤트 가져오기
            List<Event> listEvents = this.GetCalenderEvents(_service);

            // 캘린더 이벤트를 반복하고 특정 이벤트를 업데이트합니다.
            foreach (var event1 in listEvents)
            {
                this.UpdateCalenderEvent(_service, event1, appointment); // 여러분의 애플리케이션 개체 변수
            }
            // 여러분의 애플리케이션과 관련된 삭제된 이벤트 ID
            var deletedApntIds = listEvents.Where(p => !appointments.Select(o => o.Id.ToString()).ToArray().Contains(p.ExtendedProperties.Private__.Where(k => k.Key == "appointmentId").FirstOrDefault().Value)).Select(p => p.Id).ToList(); 
            // 삭제된 ID를 반복하고 Google 캘린더에서 삭제합니다.
            foreach (var eventId in deletedApntIds)
            {
                this.DeleteCalenderEvent(_service, eventId);
            }

            return Ok(new { result = true });
        }


        private CalendarService GetCalenderServiceFromAccessToken(string accessToken)
        {
            GoogleCredential credential;
            credential = GoogleCredential.FromAccessToken(accessToken);

            // Google 캘린더 API 서비스 생성
            var service = new CalendarService(new BaseClientService.Initializer
            {
                HttpClientInitializer = credential,
                ApplicationName = "application name"
            });

            return service;
        }

        private void CreateCalenderEvent(CalendarService _service, Models.Appointment appointment)
        {
            DateTime newDate = new DateTime();
            Event body = new Event();

            EventDateTime start = new EventDateTime();
            start.DateTime = newDate; // 날짜와 시간

            EventDateTime end = new EventDateTime();
            end.DateTime = newDate;  // 날짜와 시간

            body.Start = start;
            body.End = end;
            body.Summary = "summary"; // 이벤트의 표시 이름
            body.Description = "some description";

            body.ExtendedProperties = new Event.ExtendedPropertiesData()
            {
                Private__ = new Dictionary<string, string>()
                {
                    {"origin","web"},
                    {  "appointmentId",    "some-text" },
                    {   "date", "some-text" },
                    {   "time", "some-text"},
                    { "patientId", "some-text"}
                    // 이러한 키-값 쌍을 사용하여 본인의 애플리케이션 관련 데이터를 삽입할 수 있습니다
                }
            };

            try
            {
                EventsResource.InsertRequest request = new EventsResource.InsertRequest(_service, body, calendarId);
                Event response = request.Execute();
            }
            catch (System.Exception ex)
            {
                throw;
            }

        }

        private List<Event> GetCalenderEvents(CalendarService _service)
        {
            DateTime dt1 = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 0, 0, 0);

            var newDate = new DateTimeOffset(dt1, this.GetTimeZoneInfo().GetUtcOffset(dt1));

            // 요청 매개변수 정의
            EventsResource.ListRequest request = _service.Events.List(calendarId);
            request.TimeMin = newDate.LocalDateTime;
            request.ShowDeleted = false;
            request.SingleEvents = true;
            // request.MaxResults = 10;
            request.OrderBy = EventsResource.ListRequest.OrderByEnum.StartTime;

            // 이벤트 목록
            Events events = request.Execute();
            return events.Items.Where(p => p.ExtendedProperties != null && p.ExtendedProperties.Private__ != null &&
                    p.ExtendedProperties.Private__.Where(p => p.Key == "origin").FirstOrDefault().Value == "web").Select(p => p).ToList();

        }

        private void UpdateCalenderEvent(CalendarService _service, Event event1, Models.Appointment appointment)
        {
            DateTime dt1 = new DateTime(appointment.Date.Year, appointment.Date.Month, appointment.Date.Day,
            appointment.Time.Hours, appointment.Time.Minutes, appointment.Time.Seconds);

            var newDate = new DateTimeOffset(dt1, this.GetTimeZoneInfo().GetUtcOffset(dt1));

            EventDateTime start = new EventDateTime();
            start.DateTime = newDate.LocalDateTime;

            EventDateTime end = new EventDateTime();
            end.DateTime = newDate.LocalDateTime;

            event1.Start = start;
            event1.End = end;

            event1.ExtendedProperties = new Event.ExtendedPropertiesData()
            {
                Private__ = new Dictionary<string, string>()
                {
                    { "origin","web"},
                    { "appointmentId",    appointment.Id.ToString() },
                    { "date", appointment.Date.ToShortDateString() },
                    { "time", appointment.Time.ToString()},
                    { "patientId", appointment.Patient.Id.ToString()}
                }
            };

            EventsResource.UpdateRequest request = new EventsResource.UpdateRequest(_service, event1, calendarId, event1.Id);
            Event response = request.Execute();
        }

        private bool DeleteCalenderEvent(CalendarService _service, string eventId)
        {
            EventsResource.DeleteRequest request = new EventsResource.DeleteRequest(_service, calendarId, eventId);
            string response = request.Execute();
            return true;
        }
    }
}
```

6. 이러한 위의 메서드를 사용하여 Google 캘린더에서 이벤트를 생성, 나열, 업데이트 및 삭제할 수 있습니다.

<div class="content-ad"></div>

구글 캘린더 이벤트를 생성할 때, "Events.ExtendedProperties"를 사용하여 애플리케이션과 관련된 정보를 저장하고, 이전에 설정한 "ExtendedProperties"를 기반으로 이벤트를 검색하여 애플리케이션을 통해 생성된 이벤트만 반환받을 수 있습니다.

읽어 주셔서 감사합니다!

코딩 즐기세요!