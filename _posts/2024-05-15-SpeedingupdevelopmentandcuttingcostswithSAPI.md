---
title: "개발 속도를 높이고 비용을 절감하는 방법 SAPI"
description: ""
coverImage: "/assets/img/2024-05-15-SpeedingupdevelopmentandcuttingcostswithSAPI_0.png"
date: 2024-05-15 15:40
ogImage: 
  url: /assets/img/2024-05-15-SpeedingupdevelopmentandcuttingcostswithSAPI_0.png
tag: Tech
originalTitle: "Speeding up development and cutting costs with SAPI"
link: "https://medium.com/@www.gesf/speeding-up-development-and-cutting-costs-with-sapi-ed058c4ed4b1"
isUpdated: true
---




모바일이나 웹 제품을 개발하거나 이미 보유하고 계신다면, 간단한 API인 SAPI를 사용하여 필요한 자원(인력)의 수를 줄이고 예상보다 빠르게 마감일에 도달할 수 있습니다.

![이미지](/assets/img/2024-05-15-SpeedingupdevelopmentandcuttingcostswithSAPI_0.png)

SAPI를 사용하면 REST API(공개 웹 주소)를 생성하여 클라이언트(애플리케이션)가 원하는 내용/응답 및 포맷으로 소비할 수 있습니다. 대부분의 웹 및 모바일 애플리케이션은 JSON을 사용하여 데이터를 전달합니다. JSON은 기본적으로 매우 특정한 형식의 텍스트(이름/값 쌍)입니다. 예를 들어:

```js
[
    {
        "title": "내 미디엄 게시물",
        "slug": "/my-medium-post",
        "author": "곤잘로",
        "categories": "REST-APIs",
        "tags": "API, Cloud, Platform",
        "excerpt": "개발 가속화를 위한 SAPI 사용",
        "content": "글 내용이 여기에 ...",
        "link": "https://simple-api.app",
        "unique": "5a365275f3e0dd9396dfe4682fe2876b",
        "created": "1691010876",
        "modified": "1691010876",
        "public": "예",
        "date": "2024년 12월 12일",
        "image": "https://simple-api.app/assets/logo.png"
    },
    { ... },
    { ... }
]
```



위의 예시는 JSON 구조를 보여줍니다. 이는 기사와 유사한 콘텐츠로, 뉴스 피드 앱에 공급하는 데 사용할 수 있는 내용입니다.

온라인에서 (또는 공개적으로 이용 가능한) 이와 유사한 엔드포인트를 생성하거나 보유하는 것은 매우 쉽고 직관적입니다. 앱에서 소비할 준비가 된 형태로 제공됩니다.

좋은 점은 다른 옵션이 여러 가지 있다는 것입니다:

- 정적 콘텐츠를 사용하여 (위의 예시처럼 특정 JSON 구조를 직접 복사/붙여넣기), 엔드포인트를 Google 스프레드시트에 연결하고 제품 재고 목록을 JSON 형식으로 변환하여 위의 예시와 같이 나열하는 것과 같은 가능성이 있습니다.
- 클라우드 SQL 관리자를 사용하여 데이터베이스와 테이블을 업로드, 생성하고 쿼리하는 능력 — 기존 데이터를 플랫폼에 가져와 필요한 쿼리를 실행하거나 저장하여 엔드포인트를 생성할 때 로드할 수 있음으로써 가장 좋은 조합 중 하나라고 말할 수 있습니다.
- Proxy SOAP 또는 공개 API를 사용하여 (이 시나리오에서 API의 응답은 위의 출력/연결에서 제공된 응답임) 엔드포인트를 암호로 보호하거나 웹훅을 설정하고 원격 구성을 사용하는 등의 설정 가능.




여기 제시된 다른 방법들 외에도, 편집기로 .csv 파일을 직접 업로드할 수도 있어요.

![image1](/assets/img/2024-05-15-SpeedingupdevelopmentandcuttingcostswithSAPI_1.png)

![image2](/assets/img/2024-05-15-SpeedingupdevelopmentandcuttingcostswithSAPI_2.png)

![image3](/assets/img/2024-05-15-SpeedingupdevelopmentandcuttingcostswithSAPI_3.png)



위의 그림에서 API 편집기가 어떻게 보이는지 확인할 수 있습니다.

고객 도메인은 사용자의 도메인 이름 아래에서 API가 실행되도록 도와주는 기능으로 개발 중입니다. 모바일 개발에서는 iOS를 예로 들면 다른 도메인에서 데이터를로드 할 때 보안 문제를 극복할 수 있습니다(자세한 내용은 문서 섹션에서 확인할 수 있습니다). 웹 개발에서는 CORS 문제가 발생할 수 있으므로 위의 기능에 주목하세요.

따라서 CEO, 기업가(혼자서 하는 일), 제품이 어떻게 보이고 어떤 콘텐츠가 있어야 하는지 전체 그림을 가진 사람이며(색상 테마, 메뉴 위치 및 번역을 포함한 내용 유형), 이러한 자료를 준비하고 응용 프로그램을 만들어야 하는 담당 개발자에게 전달하는 데 몇 시간을 소비하는 사람이라면 정말 흥미로울 것입니다!

위의 시나리오에서는 개발자가 아닌 경우 두 명의 사람이 있으면 작업을 완료할 수 있으며 충분합니다.



저희 API 및 API와 컨텐츠 생성, 배포, 수익화에 관련된 모든 도구를 이용해보시기를 초대합니다. (다음 게시물에서 다룰 도구도 있습니다.)