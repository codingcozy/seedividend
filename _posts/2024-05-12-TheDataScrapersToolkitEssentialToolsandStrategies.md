---
title: "데이터 스크레이퍼의 도구 상자 필수 도구와 전략"
description: ""
coverImage: "/assets/img/2024-05-12-TheDataScrapersToolkitEssentialToolsandStrategies_0.png"
date: 2024-05-12 23:39
ogImage: 
  url: /assets/img/2024-05-12-TheDataScrapersToolkitEssentialToolsandStrategies_0.png
tag: Tech
originalTitle: "The Data Scraper’s Toolkit: Essential Tools and Strategies"
link: "https://medium.com/@danangfirmino26/the-data-scrapers-toolkit-essential-tools-and-strategies-e4d48e78653e"
isUpdated: true
---




![이미지](/assets/img/2024-05-12-TheDataScrapersToolkitEssentialToolsandStrategies_0.png)

# 1. 웹 스크래핑이란?

웹 스크래핑은 웹사이트에서 데이터를 추출하는 기술입니다. 이 과정은 자동화된 도구를 사용하여 가격 목록, 제품 세부정보, 이메일 주소 및 심지어 이미지와 같은 특정 정보를 수집하는 것을 포함합니다. 수집된 데이터는 시장 조사, 경쟁 분석 또는 온라인 데이터베이스 업데이트와 같은 다양한 목적으로 사용될 수 있습니다.

![이미지](https://miro.medium.com/v2/resize:fit:1000/0*MwktrV5bs-basgRX.gif)



일반적으로 시작하는 과정은 스크레이퍼 프로그램이 웹 페이지에 요청을 보내는 것으로 시작합니다. 그런 다음 페이지의 HTML 콘텐츠를 구문 분석하여 특정 데이터 요소를 검색합니다. 웹 스크래핑의 유연성 덕분에 웹 사이트에서 보이는 거의 모든 유형의 정보를 캡쳐할 수 있어 데이터 기반 의사 결정에 귀중한 도구가 됩니다.

## 2. 웹 스크래핑의 이점

가격 모니터링:

웹 스크래핑의 첫 번째 이점은 시장에서 제품 가격을 모니터링하는 것입니다. 예를 들어, 특정 유형의 식품을 판매하는 비즈니스를 소유하고 있다면, 유사한 항목이 판매되는 가격 범위를 항상 알고 있어야 합니다. 웹 스크래핑을 통해 가격을 쉽게 추적할 수 있습니다. 경쟁 업체가 얼마를 청구하는지 알면 자신의 제품 가격을 설정하는 것이 훨씬 간단해집니다.



다른 회사로부터 정보 수집:

다른 회사와 파트너십을 맺으려고 할 때 그들에 대해 더 많이 알아야 합니다. 웹 스크레이핑을 사용하면 잠재적인 파트너들에 대한 방대한 데이터를 수집할 수 있습니다. 이 정보를 통해 회사가 신뢰할 만하고 협력에 적합한지를 판단할 수 있습니다. 따라서 이 과정은 탄탄한 비즈니스 결정에 중요한 역할을 합니다.

시장 조사:

시장 조사는 모든 비즈니스에 있어 중요합니다. 사용자들이 원하는 것을 밝혀내고 효과적인 마케팅 전략을 구축하기 위한 기초 역할을 합니다. 시장 조사에는 가장 정확한 정보가 필수이며, 웹 스크레이핑은 이를 달성하는 데 도움을 줄 수 있습니다. 웹 스크레이핑을 통해 소비자들이 선호하는 최신 트렌드를 발견할 수 있습니다. 이 데이터를 분석하여 당신의 타겟 시장을 겨냥한 제품 개발을 안내하는 데 활용할 수 있습니다.



뉴스 및 콘텐츠 모니터링:

브랜드를 구축하는 가장 쉬운 방법 중 하나는 미디어를 새 제품 출시 행사로 초대하는 것입니다. 미디어는 행사를 취재하고 제품을 검토하여 귀중한 홍보를 만들어내어 비즈니스에 큰 도움이 됩니다. 미디어 보도를 모니터링하는 것은 웹 스크레이핑을 통해 손쉽게 할 수 있어 여러분의 제품 및 비즈니스에 대한 보도 내용을 확인할 수 있습니다.

리드 생성:

새로운 리드를 확보하기 위한 중요한 전략은 잠재고객으로부터 가능한 많은 연락처 정보를 수집하는 것입니다. 웹 스크레이핑은 잠재고객의 연락처 정보를 획득하는 데 매우 효과적인 방법으로, 새로운 고객을 대상으로 하는 데 도움이 됩니다.




![image](https://miro.medium.com/v2/resize:fit:960/0*LjUSDEg8no_fYQ64.gif)

# 3. 웹 스크래핑 기술

![image](/assets/img/2024-05-12-TheDataScrapersToolkitEssentialToolsandStrategies_1.png)

일반적으로 웹 스크래핑에는 두 가지 방법이 있습니다:



수동: 이 방법은 웹 페이지에서 데이터를 직접 복사하여 붙여넣기해야 합니다. 직관적이지만 대규모 데이터셋과 작업할 때 극도로 시간이 많이 걸리고 지루할 수 있습니다.

자동: 이 방법은 코딩, 소프트웨어 응용 프로그램 또는 브라우저 확장 프로그램을 활용합니다. 자동화는 데이터를 신속하게 스크래핑할 수 있는 능력으로 인해 인기를 얻고 있습니다. 사용 중인 구체적인 도구 또는 소프트웨어에 따라 방법이 다르지만, 모든 웹 스크래핑 봇은 세 가지 기본 원칙을 따릅니다:

- 요청:
이 과정은 GET 방법을 사용하여 대상 웹 사이트에 HTTP 요청을 보내는 것으로 시작됩니다. 프로그램은 원하는 웹 페이지에 액세스하여 정보를 가져옵니다. 이 단계를 통해 봇이 연결을 설정하고 데이터 추출을 위해 웹 페이지를 식별할 수 있도록 합니다.
- 파싱:
웹사이트로부터 응답을 받은 후, 프로그램은 파싱 프로세스를 시작합니다. 파싱은 데이터 스크래핑 기술을 활용하여 웹 페이지에서 특정 데이터 포인트를 추출하는 것을 의미합니다. 프로그램은 HTML 마크업 또는 다른 구조적 형식을 기반으로 관련 정보를 식별하고 분리합니다.
- 표시:
파싱을 통해 원하는 데이터를 수집하고 식별한 후, 읽기 쉬운 보고서나 표시로 변환됩니다. 데이터는 테이블, 그래프 또는 이전에 정의된 사양이나 필요에 맞는 구조와 일치하는 다양한 형식으로 제시될 수 있습니다. 최종 목표는 정보를 쉽게 이해할 수 있는 형식으로 제공하여 추가 분석이나 전략적 의사 결정에 활용할 수 있도록 하는 것입니다.

# 4. 웹 스크래핑 방법



- 대상 웹사이트 선택
스크래이핑할 웹사이트를 식별하여 시작하세요. 예를 들어, 고객 서평을 분석하려면 Amazon, Goodreads 또는 LibraryThing과 같은 웹사이트를 고려할 수 있습니다.
- 페이지 검사
코드에 뛰어들기 전에 스크래이핑할 데이터를 식별하는 것이 중요합니다. 페이지를 마우스 오른쪽 버튼으로 클릭하고 "요소 검사" 또는 "페이지 소스 보기"를 선택하여 웹사이트의 기본 HTML 코드를 확인합니다. 이를 통해 데이터의 구조를 파악할 수 있습니다.
- 원하는 데이터 식별
Amazon의 책 평가에 집중한다면, 페이지의 HTML 코드에서 평가가 있는 위치를 찾으세요. 대부분의 브라우저는 선택된 프런트엔드 콘텐츠와 해당 백엔드 코드를 강조합니다. 여기서 목표는 관련 데이터를 격리하는 데 도움이 되는 고유한 태그를 식별하는 것입니다.
- 코드 작성
관련 태그를 정확하게 찾았다면, 해당 태그를 스크래이핑 소프트웨어에 통합하세요. 이를 위해 파이썬이 주로 사용되며, 스크래이핑 프로세스를 단순화하는 강력한 라이브러리를 갖추고 있습니다. 분석하고 저장할 정확한 데이터를 책 제목, 작가 이름, 평점 등으로 지정하는 것을 잊지 마세요.
- 코드 실행
코드를 작성한 후에는 다음 단계인 실행 단계로 넘어가세요. 스크레이퍼는 사이트 접근을 요청하고 데이터를 추출하여 분석할 것입니다.
- 데이터 저장
추출, 분석 및 관련 데이터 수집을 마치면, 그것을 저장해야 합니다. 코드에 추가 라인을 넣어 알고리즘에 그 기능을 수행하도록 지시할 수 있습니다. 선택한 형식은 중요하지 않지만 가장 일반적인 Excel 형식에 준수해야 합니다. Python 정규식 모듈을 통해 코드를 실행하여 데이터셋을 더 깔끔하게 추출하는 것도 가능합니다.

# 5. 웹 스크래이핑 도구

웹 스크래이핑 도구는 웹사이트로부터 데이터를 자동으로 추출하기 위해 설계된 필수 소프트웨어 응용프로그램입니다. 이 도구들은 인터넷에서 대량의 정보를 수집하여 시장 조사, 감정 분석, 경쟁 분석 및 학술 연구와 같은 다양한 목적으로 정보를 접근 가능하고 사용 가능하게 만듭니다.

![이미지](/assets/img/2024-05-12-TheDataScrapersToolkitEssentialToolsandStrategies_2.png)



서버 측 스크래핑을 위해 개발자들은 효율성과 속도 때문에 Node.js를 자주 사용합니다. Playwright와 같은 라이브러리는 무해한 브라우저를 제어할 수 있어 실제 사용자가 웹 페이지를 탐색하는 것처럼 상호 작용을 자동화할 수 있습니다. 이는 웹 사이트에 로그인하거나 사용자 상호 작용 시에만로드되는 동적 AJAX 콘텐츠를 캡처하는 것을 포함할 수 있습니다. 인기 있는 라이브러리 Cheerio는 HTML 분석을 간단하게 제공하여 jQuery와 유사하게 데이터를 선택하고 조작하기 쉽게합니다. 또한 서버 작업에 적합한 속도와 효율성이 추가되어 있습니다.

Playwright의 주요 기능 중 하나는 브라우저 콘텍스트의 사용으로, 별도 및 독립적인 브라우저 세션을 모의합니다. 이는 여러 페이지 또는 시나리오를 동시에 처리할 수 있기 때문에 대용량 데이터 집합을 스크래핑하거나 여러 웹 페이지를 동시에 모니터링하는 데 적합합니다. 이러한 브라우저 콘텍스트를 다양한 네트워크 조건이나 장치와 일치하도록 사용자 정의함으로써, 안티 봇 조치를 우회하고 정확한 데이터를 수집할 수 있습니다.

Playwright는 현대 웹 기술의 복잡성을 탐색하는 데 특히 뛰어납니다. 이러한 기술들은 클라이언트 측 렌더링을 위해 JavaScript에 매우 의존하기 때문입니다. Playwright는 실제 사용자가 콘텐츠와 상호 작용하는 방식을 복제하기 위해 전체 브라우저 세션을 시작하여 데이터가 완전히로드 될 때까지 스크래핑 작업을 수행합니다. 이 기능은 전통적인 스크래핑 방법으로 종종 놓치는 동적 콘텐츠를 정확하게 캡처하기 위한 필수적인 요소입니다.

뿐만 아니라, JavaScript 웹 스크래핑 도구는 일정 간격으로 데이터 수집을 자동화하거나 특정 트리거에 응답하여 대량의 데이터를 효율적으로 처리할 수 있습니다. 캡처된 데이터는 JSON 또는 CSV와 같은 다양한 형식으로 내보낼 수 있으며, 데이터베이스 및 분석 파이프라인에 직접 공급하여 데이터 주도 애플리케이션과 프로세스에 쉽게 통합할 수 있습니다.



자동화는 Playwright가 빛나는 또 다른 영역입니다. Node.js를 기반으로 한 이 프레임워크는 자동화된 스크레이핑 작업을 정기적으로 예약하거나 특정 이벤트에 의해 트리거할 수 있도록 가능하게 합니다. 이 수준의 자동화는 데이터셋을 최신 상태로 유지하고 수동 개입을 줄여 비즈니스 및 연구자들 모두에게 데이터 수집을 간소화합니다.

# 6. HTML — HTML이란 무엇인가요?

웹 스크레이핑에서 HTML은 중요합니다. 데이터가 추출되는 웹 페이지의 구조를 형성하기 때문입니다. 각 웹 페이지의 HTML 코드는 콘텐츠의 구조와 조직을 나타내며, 스크레이퍼가 특정 데이터 포인트를 탐색하고 찾는 데 도움을 줍니다. HTML 프레임워크에는 `div`, `a`, `table`과 같이 다양한 태그가 있으며, 각각이 단락, 링크, 이미지 및 테이블과 같은 다른 구성 요소를 나타냅니다.

HTML의 계층 구조는 스크레이퍼가 콘텐츠가 어떻게 구성되어 있는지 이해하는 데 도움을 줍니다. 태그에는 id 및 class와 같은 속성이 포함되어 있으며, 이는 요소에 대한 고유한 식별자로 작용하여 스크레이퍼가 특정 정보를 빨리 찾을 수 있게 합니다. 예를 들어, 스크레이퍼가 특정 클래스 속성이 있는 'table'을 찾아 테이블 데이터를 추출하거나 고유한 id를 가진 'div' 내의 링크를 대상으로 할 수 있습니다.



특별한 스크레이핑 도구와 라이브러리를 사용하여 HTML을 파싱하면 개발자는 스크레이퍼가 필요로 하는 정확한 태그 또는 패턴을 찾도록 지시할 수 있습니다. 예를 들어, 전자 상거래 사이트에서 제품 리뷰를 수집한다면, 스크레이퍼는 각 리뷰를 둘러싼 HTML 태그와 속성을 식별하며 사용자 평가, 댓글 및 제품 이름을 추출할 것입니다.

JavaScript를 사용하여 콘텐츠를 비동기적으로 로드하는 동적 웹 페이지는 도전을 제기할 수 있습니다. 그러나 브라우저 자동화 도구를 갖춘 스크레이퍼는 실제 브라우징 세션을 시뮬레이트하여 원하는 데이터를 추출하기 전에 페이지가 완전히 렌더링되도록 할 수 있습니다.

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>간단한 HTML 예제</title>
</head>
<body>
    <h1>안녕, 세상아!</h1>
    <p>기본 HTML 페이지에 오신 것을 환영합니다.</p>
    <a href="https://www.example.com">예제 방문하기</a>
</body>
</html>
```

# 설명:



- `!DOCTYPE html`: 이 선언은 직접적으로 웹 스크래핑에 사용되지는 않지만 HTML5 표준을 기대한다는 것을 파서에 알려줍니다.
- `html lang="en"`: 페이지의 루트 요소로, 언어를 영어로 지정합니다. 언어 속성(lang)은 직접적으로 대상이 되지 않을 수 있지만, 언어 특정 사항에 기반한 조건부 스크래핑에 유용할 수 있습니다.
- `head`:

- `meta charset="UTF-8"`: 이 태그는 문자 인코딩을 UTF-8로 설정합니다. 텍스트를 올바르게 해석하는 데 중요하며, 특히 영어가 아닌 콘텐츠를 스크래핑할 때 인코딩 문제를 피하기 위해 중요합니다.
- `title`Simple HTML Example`/title`: 문서의 제목은 웹 스크래핑의 흔한 대상입니다. 페이지의 내용을 빨리 이해하거나 검색 결과 사이에서 페이지를 분류하는 데 자주 사용됩니다.

4. `body`:

- `h1`Hello, World!`/h1`: 제목은 스크래핑의 주요 대상이며, 주로 중요 정보나 요약을 포함합니다. 이 h1은 주제를 식별하는 데 사용되거나 웹 사이트를 통해 페이지 구조를 이해하는 데이터 세트의 일부로 사용될 수 있습니다.
- `p`Welcome to a basic HTML page.`/p`: 단락 태그는 페이지의 본문 텍스트를 주로 담고 있습니다. 이 데이터를 스크래핑하여 설명, 세부 사항 또는 관련 텍스트 콘텐츠를 추출하는 데 유용할 수 있습니다.
- `a href="https://www.example.com"`Visit Example`/a`: 하이퍼링크는 스크래핑 중에 웹 탐색에 중요합니다. href 속성은 URL을 제공하여 링크를 따르거나 리소스를 수집하거나 연결된 페이지를 스크래핑하는 데 사용할 수 있습니다. 이는 재귀적 기술을 사용하여 연결된 페이지 전체에서 데이터를 검색하는 깊은 웹 스크래핑에 필수적입니다.



# 7. HTTP - HTTP 개념

HTTP 또는 HyperText 전송 프로토콜은 월드 와이드 웹에서 데이터 통신의 기본 프로토콜로, 웹 브라우저를 서버와 연결합니다. 웹 스크래핑에 있어서 HTTP의 복잡성을 이해하는 것은 웹 사이트에서 데이터에 효과적으로 접근하고 검색하는 데 중요합니다.

![이미지](/assets/img/2024-05-12-TheDataScrapersToolkitEssentialToolsandStrategies_3.png)

웹 스크래핑과 관련된 HTTP의 기본적인 측면:



요청 및 응답: HTTP의 핵심은 요청과 응답 프로세스에 있습니다. 웹 스크래퍼는 브라우저 요청을 시뮬레이트하여 웹 페이지를 검색합니다. 각 요청은 GET과 같은 다양한 방법을 활용할 수 있습니다. 페이지 내용을 가져 오는 데 일반적으로 사용되는 방법과 POST, 종종 폼 데이터를 제출하거나 사이트에 로그인하는 데 사용되는 방법을 사용할 수 있습니다.

헤더: HTTP 요청 및 응답의 헤더는 중요한 메타 데이터를 전달합니다. 웹 스크래핑을 위해 User-Agent와 같은 헤더는 스크래퍼를 합법적인 브라우저로 위장시켜 기본적인 안티-스크래핑 검사를 우회하는 데 도움이 됩니다. 헤더 내의 쿠키는 세션 상태를 관리하여 스크래퍼가 여러 페이지를 걸쳐 로그인 상태를 유지할 수 있도록합니다.

상태 코드: 이 코드는 클라이언트에게 요청 상태에 대해 알려줍니다. 예를 들어, 200 상태 코드는 성공을 나타내고 404는 요청한 리소스가 없음을 나타냅니다. 이러한 코드를 이해하면 스크래퍼가 오류와 리디렉션을 효과적으로 처리 할 수 있습니다.

요청 제한: 많은 웹 사이트는 액세스 빈도를 제어하기 위해 요청 제한을 시행합니다. 웹 스크래퍼는 이러한 제한을 트리거하지 않도록 요청 속도를 관리해야하며, 그렇지 않으면 차단된 액세스 또는 법적 문제가 발생할 수 있습니다.



안녕하세요! 아래는 Markdown 형식으로 새롭게 구성된 내용입니다:

**보안 통신:** HTTP 요청은 HTTPS로 보안될 수 있습니다. 이를 통해 브라우저와 서버 간에 교환되는 데이터가 암호화됩니다. 이는 민감한 데이터를 수집할 때 개인 정보 보호와 보안을 유지하는 데 매우 중요합니다.

**APIs:** API를 통해 데이터를 제공하는 웹사이트는 HTML 파싱보다 데이터에 접근하는 구조화된 방법을 제공하며 종종 더 신뢰할 수 있습니다. API는 일반적으로 JSON 또는 XML과 같은 형식으로 데이터를 응답하며, 이는 스크래퍼가 처리하기에 편리합니다.

**8. PlayWright Javascript를 사용하여 가격 및 제품 정보 스크랩 합니다**

JavaScript에서 Playwright를 사용하여 웹 스크래핑 스크립트를 생성하기 전에 필요한 개발 환경을 설정하는 것이 중요합니다. 이 준비 단계를 통해 효율적이고 효과적인 웹 스크래핑에 필요한 모든 도구와 라이브러리가 마련됩니다.



개발 환경 설정하기

1. Visual Studio Code (VS Code) 설치:

- Visual Studio Code은 Microsoft에서 제공하는 가벼우면서도 강력한 소스 코드 편집기입니다. JavaScript와 Node.js를 기본으로 지원하며, 디버깅, 지능형 코드 완성 (IntelliSense), 쉬운 탐색을 포함한 다양한 확장 기능을 제공합니다.
- 먼저, 공식 Visual Studio Code 웹사이트에서 Visual Studio Code를 다운로드하고 설치하세요. 운영 체제 (Windows, macOS 또는 Linux)에 맞는 설치 지침을 따릅니다.

2. Node.js와 npm 설치:



- Node.js는 서버 측에서 JavaScript를 실행할 수 있게 해주는 런타임 환경이에요. Node.js에는 npm(node package manager)이 포함되어 있어서 Node.js 애플리케이션에 대한 의존성을 관리하는 데 도움을 줘.
- 공식 Node.js 웹사이트에서 Node.js를 다운로드하세요. 기본 옵션으로 Node.js를 설치하면 npm도 함께 설치되어 Playwright를 포함한 다양한 라이브러리를 다룰 준비가 돼.
- 설치 후에는 터미널이나 명령 프롬프트를 열어 node -v와 npm -v를 입력하면 시스템에 설치된 Node.js와 npm의 현재 버전을 확인할 수 있어.

3. Node.js 프로젝트 설정하기:

- Visual Studio Code를 열고 새 프로젝트 폴더를 만들거나 기존 폴더로 이동해.
- VS Code에서 터미널을 열고(또는 운영 체제 터미널을 사용해) 프로젝트 디렉토리로 이동한 후 npm init을 실행하여 새 Node.js 프로젝트를 초기화해. 이 명령은 프로젝트 디렉토리에 package.json 파일을 생성하며 모든 의존성과 프로젝트 메타데이터를 추적할 거야.

4. Playwright 설치하기:



- Node.js 환경이 준비되었습니다. npm install playwright 명령어를 실행하여 Playwright를 설치해보세요. 이 명령어는 Playwright와 의존성을 다운로드하고 이를 프로젝트의 node_modules 디렉토리에 추가합니다. 또한 package.json을 업데이트하여 Playwright를 의존성으로 포함시킵니다.
- Playwright 설치에는 Chromium, Firefox 및 WebKit용 브라우저 이진 파일이 포함되어 있어 스크립트가 다양한 브라우징 환경을 시뮬레이트할 수 있습니다.

```js
const playwright = require('playwright');
const fs = require('fs');
const path = require('path');
```

- const playwright = require(`playwright`);:

- 이 코드는 Playwright 라이브러리를 현재 파일로 가져옵니다. Playwright는 웹 스크레이핑 및 테스팅을 포함한 브라우저 자동화를 가능하게 하는 인기 있는 도구입니다.
- 이 import를 통해 다양한 브라우저(Chromium, Firefox, WebKit)에서 프로그래밍 방식으로 웹 페이지와 상호 작용하는 Playwright API를 사용할 수 있습니다.



2. const fs = require(`fs`);:

- 이는 Node.js의 fs (파일 시스템) 모듈을 가져와요. 이 모듈은 로컬 파일 시스템과 상호작용하기 위한 함수들을 제공해요.
- 이를 통해 스크립트는 파일을 읽고 쓸 수 있어요. 이는 로깅, 데이터 저장, 또는 기존 파일 작업에 유용해요.

3. const path = require(`path`);:

- 이는 Node.js의 path 모듈을 가져와요. 이 모듈은 파일 경로를 일관적이고 크로스 플랫폼으로 다루는 데 도움이 돼요.
- 파일 및 디렉토리 경로를 처리하는 유틸리티를 제공하며, 운영 체제에 관계없이 올바른 구문을 사용하도록 해줘요.



함께 해보기:

- 이러한 import를 사용하면 스크립트가 Playwright를 기반으로 한 웹 스크래핑이나 브라우저 자동화 프로젝트를 위한 기반을 설정합니다.
- playwright는 브라우저를 제어하여 URL로 이동하거나 요소를 클릭하고 데이터를 캡처하는 등의 상호작용을 가능하게 합니다.
- fs는 스크래핑 프로세스 중에 수집된 데이터를 저장하는 데 도움을 주며, JSON이나 CSV 파일로 저장하는 것도 가능합니다.
- path는 파일 경로를 적절하게 관리하여 어떤 운영 체제에서도 효율적으로 데이터를 저장하거나 읽을 수 있도록 도와줍니다.

예시 사용 사례:

- Playwright를 사용하여 웹페이지에 이동하고 정보를 스크래핑합니다.
- fs를 사용하여 수집한 데이터를 구조화된 형식으로 저장합니다.
- path를 사용하여 출력 파일을 효과적으로 정리합니다.



```js
(async () => {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
```

- (async () =` '...')():

- 이 구조는 즉시 호출되는 함수 표현식 (IIFE)으로, 코드가 정의된 즉시 실행되도록합니다.
- async 키워드는 함수에 비동기 작업이 포함되어 있음을 나타내며, 함수 내부에서 await을 사용할 수 있도록 합니다.
- 이 함수를 즉시 실행함으로써 비동기 작업을 깔끔하게 처리하고 전역 범위를 깔끔하게 유지할 수 있습니다

2. const browser = await playwright.chromium.launch();:



- 이 코드는 Playwright의 크로미움 엔진을 사용하여 브라우저 인스턴스를 초기화합니다.
- playwright.chromium은 Playwright의 크로미움 브라우저 자동화 엔진을 가리킵니다. 비슷한 옵션으로는 firefox와 webkit이 있습니다.
- launch()는 새로운 헤드리스(기본값) 브라우저 세션을 시작하는 비동기 메서드입니다.
- await 키워드는 함수가 브라우저가 완전히 로드될 때까지 실행을 일시 중지하고, 그 후에 로드된 브라우저 인스턴스를 browser 변수에 할당합니다.

3. const page = await browser.newPage();:

- 이 코드는 시작된 브라우저 인스턴스 내에서 새 페이지(또는 탭)를 생성합니다.
- 새 페이지는 독립적으로 작동하며, 한 페이지에서의 동작은 동일한 브라우저에서 열린 다른 페이지에 영향을 주지 않습니다.
- await 키워드는 다시 한 번 새 페이지가 준비될 때까지 실행을 일시 중지하고, 이를 page 변수에 할당합니다.

```js

  await page.goto('https://www.unitedbike.com/bikes');
```



- await: 이 키워드는 프로미스가 해결될 때까지 함수 실행을 일시 중지합니다. 이 경우에는 페이지가 완전히로드될 때까지 기다린 후 다음 라인으로 진행합니다.
- page.goto(url):
- 'goto'는 Playwright가 제공하는 메소드로, 브라우저 페이지를 지정된 URL로 이동하도록 지시합니다.
- 여기서 'url'은 방문할 웹 주소로, `https://www.unitedbike.com/bikes`로 지정되어 있습니다.
- 이 라인이 실행되면 Playwright 페이지 인스턴스는 주어진 URL로 이동하여 실제 브라우저처럼 페이지를 완전히 렌더링하고 JavaScript 기반 동적 콘텐츠를 포함합니다.

```js
  const productInfoElements = await page.$$eval('.product-information', elements => elements.map(el => {
    const caption = el.querySelector('.caption').textContent.trim();
    const price = el.querySelector('.price').textContent.trim();
    return `${caption},${price}`;
```

이 코드 스니펫은 Playwright 페이지 객체를 사용하여 특정 제품 정보를 추출하는 더 큰 웹 스크래핑 스크립트의 일부입니다. 각 부분의 설명을 보여드릴게요:

- const productInfoElements = await page.$$eval(...):



- const: 이 키워드는 페이지에서 추출된 데이터를 저장할 변수 productInfoElements를 선언합니다.
- await: 이 함수는 작업이 완료될 때까지 실행을 일시 중지하여 데이터가 준비되면 변수에 할당됩니다.
- page.$$eval:
- $$eval은 페이지의 모든 일치하는 요소에 대해 함수를 평가하는 Playwright 메서드입니다.
- 첫 번째 인수인 `.product-information`은 클래스가 .product-information인 모든 HTML 요소를 대상으로 하는 CSS 셀렉터입니다.
- 두 번째 인수는 선택된 요소에 대해 실행할 함수이며, 이 함수는 해당 요소들을 매개변수 elements로 받습니다.

2. elements.map(el => ` '...'):

- 이 map 함수는 elements 배열의 각 HTML 요소를 반복하며 각각의 요소를 처리하여 필요한 정보를 추출합니다.

3. const caption = el.querySelector(`.caption`).textContent.trim();:



- 코드는 각 .product-information 요소 내에서 클래스가 .caption인 자식 요소를 검색합니다.
- textContent는 해당 요소의 텍스트 콘텐츠를 가져오고, trim()은 앞뒤 공백을 제거합니다.
- 결과는 caption 변수에 저장됩니다.

4. const price = el.querySelector(`.price`).textContent.trim();:

- 캡션과 유사하게, 이 줄은 클래스가 .price인 자식 요소를 검색합니다.
- textContent는 .price 요소의 내부 텍스트를 추출하는데, 일반적으로 제품의 가격을 나타냅니다.
- trim()은 추가로 공백이 포함되지 않도록 합니다.

5. return $'caption',$'price';:



- 각 반복은 캡션과 가격 값을 쉼표로 구분된 형식으로 반환하는 문자열을 생성합니다.

```js
const outputFilePath = path.join(__dirname, 'product_information.csv');

fs.writeFileSync(outputFilePath, productInfoElements.join('\n'), 'utf8');

console.log(`Data telah diekspor ke file: ${outputFilePath}`);
await browser.close();
```

- const outputFilePath=path.join(__dirname,`product_information.csv`);:

- path.join:
- join은 여러 경로 세그먼트를 하나의 일관된 경로 문자열로 결합하는 path 모듈의 메서드입니다.
- 올바른 경로 구분자를 자동으로 적용하여 경로를 크로스 플랫폼으로 만듭니다(예: Windows의 백슬래시, Linux/macOS의 슬래시).
- __dirname:
- 이 특별한 변수는 현재 실행 중인 스크립트가 위치한 디렉토리의 절대 경로를 보유합니다.
- `product_information.csv`:
- 이것은 데이터가 저장될 CSV 파일의 이름입니다.
- path.join을 사용하면 실행 중인 스크립트의 디렉토리 내에 product_information.csv라는 이름의 파일의 전체 경로가 생성됩니다.



2. fs.writeFileSync(outputFilePath, productInfoElements.join(`\n`), `utf8`);:

fs.writeFileSync:

- fs 모듈의 이 동기 방식 메서드는 지정된 파일에 데이터를 직접 작성합니다.
- 세 가지 주요 인수를 취합니다.

- productInfoElements는 문자열의 배열(아마 제품 데이터를 포함한 것으로 예상)이어야 합니다.
- join(`\n`)은 이러한 문자열을 새 줄 문자(\n)로 구분하여 하나의 문자열로 연결하므로 CSV 데이터로 작성하기에 적합합니다.



- UTF-8로 지정된 인코딩 형식을 사용하여 파일에 올바른 텍스트 표현을 보장합니다.

3. console.log('데이터가 파일로 내보내졌습니다: $'outputFilePath');:

- 생성된 파일의 경로를 제공하고 데이터가 내보내졌음을 확인하는 콘솔 메시지를 출력합니다.

4. await browser.close();:



- 이전에 스크립트를 시작할 때 열었던 Playwright 브라우저 인스턴스를 종료합니다.
- 시스템 자원을 해제하고 모든 웹 스크래핑 작업이 완료된 후 깔끔하게 종료됩니다.

이제 터미널에서 다음 코드를 실행하세요:

```js
$ node scrap.js
```

출력 결과는 다음과 같을 것입니다.


| 모델명          | 가격                              |
|----------------|-------------------------------|
| VITESSA 2.00   | Rp 9,820,000, Rp 9,820,000   |
| VITESSA 1.00   | Rp 7,960,000, Rp 7,960,000   |
| STYGMA LITE   | Rp 14,060,000, Rp 14,060,000 |
| STYGMA        | Rp 18,640,000, Rp 18,640,000 |
| STERLING R2 DISC | Rp 33,260,000, Rp 33,260,000 |
| STERLING R1 DISC | Rp 26,200,000, Rp 26,200,000 |
| STERLING PRO DISC | Rp 75,000,000, Rp 75,000,000 |
| OXYDE PRO     | Rp 67,725,000, Rp 67,725,000 |
| OXYDE ONE     | Rp 20,370,000, Rp 20,370,000 |
| KYROSS 2.1    | Rp 18,140,000, Rp 18,140,000 |
| KYROSS 2.00+  | Rp 17,630,000, Rp 17,630,000 |
| KYROSS 1.1    | Rp 12,850,000, Rp 12,850,000 |
| KYROSS 1.00   | Rp 12,850,000, Rp 12,850,000 |
| GAVRIIL       | Rp 16,620,000, Rp 16,620,000 |
| E-GAVRIIL     | Rp 48,280,000, Rp 48,280,000 |
| EPSILON T6    | Rp 45,350,000, Rp 45,350,000 |

여기에 전체 코드가 있습니다:

```js
const playwright = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://www.unitedbike.com/bikes');

  const productInfoElements = await page.$$eval('.product-information', elements => elements.map(el => {
    const caption = el.querySelector('.caption').textContent.trim();
    const price = el.querySelector('.price').textContent.trim();
    return `${caption},${price}`;
  }));

  const outputFilePath = path.join(__dirname, 'product_information.csv');

  fs.writeFileSync(outputFilePath, productInfoElements.join('\n'), 'utf8');

  console.log(`데이터가 파일로 내보내졌습니다: ${outputFilePath}`);
  await browser.close();
})();
```

아마도 여기까지 JavaScript 플레이 라이팅 소개의 끝입니다. 웹 스크래핑과 playwright에 대해 더 깊이 파고들고 싶다면 이 웹 사이트를 방문해보세요.




감사합니다! :3