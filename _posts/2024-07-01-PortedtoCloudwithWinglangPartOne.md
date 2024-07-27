---
title: "Winglang으로 클라우드 마이그레이션 하기 파트 1"
description: ""
coverImage: "/assets/img/2024-07-01-PortedtoCloudwithWinglangPartOne_0.png"
date: 2024-07-01 19:57
ogImage: 
  url: /assets/img/2024-07-01-PortedtoCloudwithWinglangPartOne_0.png
tag: Tech
originalTitle: "Ported to Cloud with Winglang (Part One)"
link: "https://medium.com/itnext/ported-to-cloud-with-winglang-part-one-757d31fe5862"
---


## "Hexagonal Architecture Explained"에서의 Blue Zone Application

![이미지](/assets/img/2024-07-01-PortedtoCloudwithWinglangPartOne_0.png)

클라우드로 소프트웨어 응용 프로그램을 직접 이식하는 것은 종종 비효율적이며 유지보수가 어려운 코드로 이어집니다. 그러나 새로운 클라우드 지향 프로그래밍 언어 'Wing'을 Hexagonal Architecture와 결합하여 사용하면 성공적인 조합임이 입증되었습니다. 이 접근 방식은 비용, 성능, 유연성, 보안 사이에서 적절한 균형을 찾아냅니다.

이번 시리즈에서는 주류 프로그래밍 언어에서 Winglang로의 다양한 응용 프로그램 이관 경험을 공유하겠습니다. 제가 Wing에서 Hexagonal Architecture를 구현한 첫 번째 경험은 "Hello, Winglang Hexagon!"이라는 기사에서 보고되었습니다. 이것은 이 조합에 대한 신뢰를 증명하는 데 충분했지만, 이것은 "안녕, 세계!" 인사 서비스를 단순화한 것이므로, 몇 가지 필수 요소가 없었고 이러한 방법이 규모에 맞게 작동하는 능력을 증명하기에 부족했습니다.

<div class="content-ad"></div>

Part One에서는 최근 발표된 책 "Hexagonal Architecture Explained"에 소개된 “Blue Zone” 애플리케이션을 Java에서 Wing으로 이식하는 데 초점을 맞추었습니다. “Blue Zone” 애플리케이션은 많은 양의 코드베이스를 가져오며, 너무 복잡해서 다루기 어렵지는 않지만 대규모 애플리케이션 클래스를 잘 대표합니다. 또한, 이것이 처음에는 주류 Java로 작성되었다는 사실은 이러한 애플리케이션의 클라우드 네이티브 변형에 대한 흥미로운 사례 연구를 제공합니다.

이 보고서는 2024년 4월에 안타깝게도 세상을 떠난 이 책의 공동 저자인 Juan Manuel Garrido de Paz에 대한 헌사입니다.

계속 진행하기 전에 헥사고날 아키텍처 패턴의 기본 사항을 다시 살펴보겠습니다.

# 헥사고날 아키텍처 패턴 기본 사항

<div class="content-ad"></div>

"‘Hexagonal Architecture Explained’ 책의 두 번째 장을 참조하면 패턴에 대한 자세하고 공식적인 설명을 볼 수 있습니다. 여기서는 패턴의 주요 의미를 간략하게 되짚어 보겠습니다.

'Hexagonal Architecture' 패턴은 소프트웨어에서 관심사를 분리하는 간단하면서도 실용적인 접근 방법을 제안합니다. 관심사를 분리하는 것이 왜 중요한가요? 소프트웨어 코드 베이스는 전달된 가치에 비해 작지만 빠르게 성장합니다. 챙겨야 할 것이 너무 많습니다. 인지적 통제를 유지하기 위해서는 기관 또는 범주별로 고수준의 조직이 필요합니다. 이 도전에 대처하기 위해 'Hexagonal Architecture' 패턴은 특정 소프트웨어 응용 프로그램에 관여하는 모든 요소를 다섯 가지 다른 범주로 분할하고 각각을 개별적으로 처리하는 것을 제안합니다:

- 응용 프로그램 자체. 이 범주는 잠재적 고객과 사용자에게 제공되는 실제 가치를 캡슐화합니다. 이것이 소프트웨어가 처음부터 개발 및 사용되는 이유입니다. 때로는 핵심 또는 개발 중인 시스템(SuD)이라고도 불립니다. 이 부분에 대한 다른 이름으로 Computation이 있을 수 있습니다. 외부 입력이 처리되고 최종 결과물이 생성되는 곳입니다. 시각적으로 시스템의 응용 프로그램 부분은 육각형 형태로 표현됩니다. 이 모양에는 특별하거나 마법 같은 것은 없습니다. 'Hexagonal Architecture Explained’ 책의 저자들이 설명하는대로:

2. 응용 프로그램과 통신하는 외부 상호작용자들. 이들은 인간 최종 사용자, 전자 장치 또는 다른 응용 프로그램일 수 있습니다. 원래 패턴은 주요(또는 주도) 상호작용자와 (Driving) — 응용 프로그램과 상호작용을 시작하는 사람들, 그리고 보조(또는 기동) 상호작용자 — 응용 프로그램이 통신을 시작하는 사람들로 추가 분리를 제안합니다."

<div class="content-ad"></div>

3. 포트 — 주요 역할자가 사용할 수 있는 형식 인터페이스에 대한 공식 사양의 멋진 이름(주행 포트라고도 함) 또는 부차 역할자가 구현해야 하는 것(구동 포트라고도 함)으로, 응용 프로그램과 통신하기 위해. 인터페이스 동사의 공식 사양 외에도(예: 주차권 구매) 포트는 이러한 인터페이스를 통해 교환되는 데이터 구조에 대한 자세한 사양 제공.

4. 어댑터 — 외부 역할자와 포트 간의 간격을 메꾸는 역할. 이름에서 알 수 있듯이, 어댑터는 유의미한 계산을 수행하는 것이 아니라, 기본적으로 역할자가 이해할 수 있는 형식으로 데이터를 변환하거나 역할자가 이해할 수 있는 형식으로 데이터를 변환.

5. 설정자 — 외부 역할자를 해당 어댑터를 사용하여 포트를 통해 응용 프로그램에 연결함으로 모든 것을 하나로 규합. 하는 아키텍처적 결정과 가격/성능/유연성 요구사항에 대한 처리하려는 결정에 따라, 특정 구성을 응용 프로그램 배포 전에 정적으로 생성하거나 응용 프로그램 실행 중 동적으로 생성할 수 있음.

일반적인 신념과는 달리, 이 패턴은 한 범주, 예를 들어 응용 프로그램이 다른 것보다 중요하다거나 다른 것이 작아야 한다는 것을 의미하지 않음을 완전히 말하고 있지 않습니다. 포트와 어댑터가 없으면 어떤 응용 프로그램도 실제로 사용될 수 없습니다. 상대적인 크기는 확장성, 성능, 비용, 가용성 및 보안과 같은 비기능적 요구사항에 따라 종종 결정됩니다.

<div class="content-ad"></div>

패턴은 한 번에 한 가지 문제에 집중하여 복잡성과 위험을 줄이는 것을 제안합니다. 다른 측면을 일시적으로 무시하는 것을 시사합니다. 또한 동일한 계산에 대한 여러 구성의 존재를 보장하는 실용적인 방법을 시사합니다. 각 구성은 테스트 자동화이거나 다른 환경에서의 작동과 같은 특정한 필요성에 대응합니다.

아래 "Hexagonal Architecture Explained" 책에서 가져온 그림은 패턴의 모든 주요 요소를 잘 요약합니다:

![Hexagonal Architecture](/assets/img/2024-07-01-PortedtoCloudwithWinglangPartOne_1.png)

# "Blue Zone" 샘플 애플리케이션

<div class="content-ad"></div>

애플리케이션 README에서:

이 애플리케이션을 선택한 이유는 두 가지입니다. 첫째로, "헥사고날 아키텍처 설명" 책에서 권장하는 대표적인 예제로 소개되었습니다. 둘째로, 이 애플리케이션은 원래 Java로 개발되었습니다. Wing 프로그래밍 언어를 사용하여 꽤 복잡한 Java 애플리케이션을 클라우드로 이관하는 과정이 무엇인지 궁금해서 선택하게 되었습니다.

# 어디서부터 시작해야 하나요?

"헥사고날 아키텍처 설명" 책은 제 4.9장 "개발 순서는 무엇인가?"에서 합리적인 권고 사항을 제공합니다. "테스트부터 테스트"로 시작하여 계속 진행하는 것이 합리적입니다. 그러나 대부분의 소프트웨어 엔지니어들이 하는 것처럼 제가 한 일은 Java 코드를 Wing으로 번역하는 작업으로 시작했습니다. 일부를 제외한 며칠간의 업무 시간을 투자하여 Wing에서 로컬에서 외부 인터페이스를 시뮬레이트하면서 작동하는 것으로 진행 상태에 이르렀습니다.

<div class="content-ad"></div>

기술적으로는 작동했지만 결과적으로 코드 크기가 애플리케이션의 크기에 비해 너무 커서 이해하기 어렵고 미적으로 매력이 없으며 완전히 Wingish하지 않았어. 그래서 나는 두 주 동안 리팩터링 주기를 시작했고 Wing 언어와 클라우드 환경의 특정 요소에 맞춰 핵심 패턴 아이디어를 가장 관용적으로 표현하기 위해 노력했어.

다음으로 오는 것은 내가 작업한 방식과는 다르다. 그것은 코드의 큰 부분이 생산되고 평가되고 폐기되는 혼돈스런 순방향 이동의 긴 연속이었어. 이런 일은 주로 익숙하지 않은 기술과 도메인을 다룰 때 소프트웨어 개발 중에 발생해.

마침내, 다음에는 조금 덜 고통스럽고 더 생산적일 수 있는 좀 더 체계적이고 체계적인 프로세스로 서서히 체계화될 수 있는 무언가를 고안해냈어. 그래서 다음 번에는 현실에 일어난 것이 아닌 다음 번에 사용할 개념적으로 바람직한 순서로 내 연구 결과를 제시할 예정이야.

# 테스트부터 시작하라.

<div class="content-ad"></div>

더 정확하게 하려면, 시스템의 아키텍처적으로 중요한 사용 사례에 대한 일련의 수용 테스트로 시작하는 것이 가장 좋고 비용 효율적인 방법입니다. "Hexagonal Architecture Explained" 책의 5.1 장인 "이것이 사용 사례와 어떻게 관련되는가?"에서는 사용 사례 모델링과 육각형 아키텍처 사이의 깊은 연결에 대해 자세히 설명하고 있습니다. 꼼꼼히 읽을 가치가 있습니다.

심지어 이전 진술도 100% 정확하지는 않았습니다. 우리는 주요 외부 주체를 식별한 후 그들이 시스템과 상호 작용하는 가장 특징적인 방법으로 시작해야 합니다. "블루 존" 애플리케이션의 경우 주요 외부 주체로는 다음 두 가지가 있습니다:

- 카드 운전사
- 주차 감시관

카드 운전사 주체의 경우, 기본 사용 사례는 "티켓 구매"이며 주차 감시관 주체의 경우, 기본 사용 사례는 "차량 확인"일 것입니다. 이러한 사용 사례의 구현을 설명함으로써 우리는 보조 외부 주체와 그 밖의 요소를 식별할 수 있습니다.

<div class="content-ad"></div>

분석 결과로 얻은 초기 사용 사례 모델은 아래에 제시되어 있습니다:

![image](/assets/img/2024-07-01-PortedtoCloudwithWinglangPartOne_2.png)

위 다이어그램에는 Payment Service와 같은 하나의 보조 액터만 포함되어 있으며 데이터베이스와 같은 내부 보조 액터는 포함되어 있지 않습니다. 이러한 기술 요소들은 결국 Application에서 일치하는 Driven Ports에 의해 격리될 것이지만, 적어도 Use Case 액터의 전통적인 해석에서는 Use Case 외부 액터를 대표하지 않습니다.

개발을 시작하기 전에 사용 사례 수용 기준을 명시하는 것은 내부 재구성을 수행하는 동안 시스템의 안정성을 보장하기 위한 매우 효과적인 기술입니다. "Blue Zone" 애플리케이션의 경우, 사용 사례 수락 테스트는 Cucumber for Java 프레임워크를 사용하여 Gherkin 언어로 지정되었습니다.

<div class="content-ad"></div>

현재 Wing을 위한 Cucumber 프레임워크가 하나도 없습니다. 그 이유는 매우 어린 언어이기 때문입니다. JavaScript용 공식 Cucumber가 존재하고 TypeScript Cucumber Tutorial도 있지만, 이 기술에 대한 조사를 연기하고 Wing에서 몇 가지 테스트를 직접 복제해 보기로 결정했습니다.

놀랍게도 가능했고 제 목적을 위해 꽤 잘 작동했습니다. 다음은 Wing에서 완전히 명시된 Buy Ticket 사용 사례 happy path 수용 테스트의 예시입니다. 잘 작동했어요!

아래는 구입 티켓 사용 사례에 대한 happy path 수용 테스트의 예시입니다. 이는 Wing에서 완전히 명시된 Buy Ticket 사용 사례 happy path 수용 테스트의 예시입니다:

```js
bring "../src" as src;
bring "./steps" as steps;

/*
사용 사례: Buy Ticket
  AS
  a car driver
  I WANT TO
  a) obtain a list of available rates
  b) submit a "buy a ticket" request with the selected rate
  SO THAT
  I can park the car without being fined
*/
let _configurator = new src.Configurator("BuyTicketFeatureTest");
let _testFixture = _configurator.getForAdministering();
let _systemUnderTest = _configurator.getForParkingCars();
let _ = new steps.BuyTicketTestSteps(_testFixture, _systemUnderTest);

test "Buy ticket for 2 hours; no error" {
    /* Given */
        ["name",    "eurosPerHour"],
        ["Blue",    "0.80"],
        ["Green",   "0.85"],
        ["Orange",  "0.75"]
    ]);
    _.next_ticket_code_is("1234567890");
    _.current_datetime_is("2024/01/02 17:00");
    _.no_error_occurs_while_paying();
    /* When */
    _.I_do_a_get_available_rates_request();
    /* Then */
    _.I_should_obtain_these_rates([
        ["name",    "eurosPerHour"],
        ["Blue",    "0.80"],
        ["Green",   "0.85"],
        ["Orange",  "0.75"]
    ]);
    /* When */
    _.I_submit_this_buy_ticket_request([
        ["carPlate", "rateName", "euros", "card"],
        ["6989GPJ",  "Green",    "1.70",  "1234567890123456-123-062027"]
    ]);
    /* Then */
    _.this_pay_request_should_have_been_done([
        ["euros", "card"],
        ["1.70",  "1234567890123456-123-062027"]
    ]);
    /* And */
    _.this_ticket_should_be_returned([
        ["ticketCode", "carPlate", "rateName", "startingDateTime", "endingDateTime",   "price"],
        ["1234567890", "6989GPJ",  "Green",    "2024/01/02 17:00", "2024/01/02 19:00", "1.70"]
    ]);
    /* And */
    _.the_buy_ticket_response_should_be_the_ticket_stored_with_code("1234567890");
}
```

멋진 작업! 이 모든 것을 한 번에 처리하기에는 상당히 많은 것이 있습니다. 하나씩 해결해 나가 보겠습니다.

<div class="content-ad"></div>

## 테스트 구조

위의 테스트는 특정 프로젝트 폴더 구조를 가정하고 Wing 모듈 및 import 규칙을 반영합니다.

테스트 소스의 처음 두 줄에서 프로젝트에는 모든 소스 코드가 위치한 src와 모든 테스트가 위치한 test 두 개의 주요 폴더가 있다는 결론을 내릴 수 있습니다. 더하여, test\steps 하위 폴더가 있어 개별 테스트 단계 구현이 유지됩니다.

테스트 소스의 다음 세 줄에서는 사전 설정(Configurator) 객체를 할당하고 그 중 두 개의 포인터를 추출합니다.

<div class="content-ad"></div>

- _testFixture는 테스트 설정을 담당하는 사전 클래스를 가리킵니다.
- _systemUnderTest는 운전자 대상 주 포트 인터페이스를 가리킵니다.

다음으로, 우리는 개별 단계를 구현하는 BuyTicketTestSteps 객체를 할당합니다. 일반적으로, 이 객체는 거의 보이지 않는 밑줄 이름을 가지며, 전체 테스트 가독성을 향상시킵니다. 이는 일반 목적 호스트 언어에 내장된 도메인 특화 언어(DSL)를 개발하는 일반적인 기술입니다.

중요한 점은 제 경우에는 그렇지 않았지만, 간단한 src 및 test\steps 폴더 구조 및 다른 아키텍처 결정을 주도하는 간단한 테스트 설정으로 프로젝트를 시작하는 것이 완전히 가능하다는 것입니다.

물론, 단계가 구현되지 않았다면 테스트는 심지어 컴파일조차 되지 않을 것입니다. 진행하기 위해서는 BuyTicketTestSteps 클래스 내부를 살펴보아야 합니다.

<div class="content-ad"></div>

## 테스트 단계 클래스

"Buy Ticket Use Case"를 위한 테스트 단계 클래스는 아래에 제시되어 있습니다:

```js
bring expect;
bring "./Parser.w" as parse;
bring "./TestStepsBase.w" as base;
bring "../../src/application/ports" as ports;


pub class BuyTicketTestSteps extends base.TestStepsBase {
    _systemUnderTest: ports.ForParkingCars;
    inflight var _currentAvailableRates: Set<ports.Rate>;
    inflight var _currentBoughtTicket: ports.Ticket?;

    new(
        testFixture: ports.ForAdministering, 
        systemUnderTest: ports.ForParkingCars
    ) {
        super(testFixture);
        this._systemUnderTest = systemUnderTest;
    }
    
    inflight new() {
        this._currentBoughtTicket = nil;
        this._currentAvailableRates = Set<ports.Rate>[];
    }

    pub inflight the_existing_rates_in_the_repository_are(
        sRates: Array<Array<str>>
    ): void {
        this.testFixture.initializeRates(parse.Rates(sRates).toArray());
    }

    // 나머지 코드는 생략
}
```

이 클래스는 간단합니다! 사용자로 하여금 입력 데이터를 Array`Array`str``로 균일하게 해석하여, 응용프로그램 특정 데이터 구조로 변환한 후, 이를 testFixture 또는 _systemUnderTest 객체로 전송하여 중간 결과를 유지하고 적절한 곳에서 예상 대비 실제 결과를 비교합니다.

<div class="content-ad"></div>

유일하게 주의할 점은 사전 점검과 비행 정의를 올바르게 처리하는 것입니다. 이것을 올바르게 하도록 도와준 Cristian Pallares에게 감사드립니다.

우리는 명확하게 구분된 역할을 가진 세 가지 추가 요소를 가지고 있습니다:

- 파서: 균일한 문자열 입력 배열을 응용프로그램 특정 데이터 구조로 변환하는 역할을 담당합니다.
- 테스트 픽스처: 사전 조건 설정 및 사후 조건 확인을 위한 시스템과의 백도어 통신을 담당합니다.
- 시스템 테스트 대상: 응용프로그램 논리를 구현하는 역할을 담당합니다.

각각을 더 자세히 살펴보겠습니다.

<div class="content-ad"></div>

## 파서

아래는 **Parser** 모듈의 소스 코드입니다:

```js
bring structx;
bring datetimex;
bring "../../src/application/ports" as ports;


pub class Util {
    pub inflight static Rates(sRates: Array<Array<str>>): Set<ports.Rate> {
        return unsafeCast(
            structx.fromFieldArray(
                sRates, 
                ports.Rate.schema()
            )
        );
    }

    pub inflight static BuyRequest(
     sRequest: Array<Array<str>>
   ): ports.BuyTicketRequest {
        let requestSet: Set<ports.BuyTicketRequest> = unsafeCast(
            structx.fromFieldArray(
                sRequest, 
                ports.BuyTicketRequest.schema()
            )
        );
        return requestSet.toArray().at(0);
    }

    pub inflight static Tickets(
     sTickets: Array<Array<str>>
   ): Set<ports.Ticket> {
        return unsafeCast(
            structx.fromFieldArray(
                sTickets, 
                ports.Ticket.schema(), 
                datetimex.DatetimeFormat.YYYYMMDD_HHMM
            )
        );
    }

    pub inflight static Ticket(sTicket: Array<Array<str>>): ports.Ticket {
        return Util.Tickets(sTicket).toArray().at(0);
    }

    pub inflight static PayRequest(
     sRequest: Array<Array<str>>
   ): ports.PayRequest {
        let requestSet: Set<ports.PayRequest> = unsafeCast(
            structx.fromFieldArray(
                sRequest, 
                ports.PayRequest.schema()
            )
        );
        return requestSet.toArray().at(0);
    }

    pub inflight static CheckCarRequest(
     sRequest: Array<Array<str>>
   ): ports.CheckCarRequest {
        let requestSet: Set<ports.CheckCarRequest> = unsafeCast(
            structx.fromFieldArray(
                sRequest, 
                ports.CheckCarRequest.schema()
            )
        );
        return requestSet.toArray().at(0);
    }
    
    pub inflight static CheckCarResult(
     sResult: Array<Array<str>>
   ): ports.CheckCarResult {
        let resultSet: Set<ports.CheckCarResult> = unsafeCast(
            structx.fromFieldArray(
                sResult, ports.CheckCarResult.schema()
            )
        );
        return resultSet.toArray().at(0);
    }

    pub inflight static DateTime(dateTime: str): std.Datetime {
        return datetimex.parse(
            dateTime, 
            datetimex.DatetimeFormat.YYYYMMDD_HHMM
        );
    }

    pub inflight static PaymentError(error: str): ports.PaymentError {
        return Map<ports.PaymentError>{
            "NONE" => ports.PaymentError.NONE,
            "GENERIC_ERROR" => ports.PaymentError.GENERIC_ERROR,
            "CARD_DECLINED" => ports.PaymentError.CARD_DECLINED
        }.get(error);
    }
}
```

이 클래스는 알고리즘적으로는 정교하지 않지만 매우 중요한 아키텍처적 결정을 반영하고 있습니다.

<div class="content-ad"></div>

먼저, src\\application\ports 폴더에 위치한 시스템 Ports에 대한 종속성을 선언합니다. “헥사고날 아키텍처 설명서” 책의 4.8장인 “내 파일을 어디에 넣어야 할까요?”에서는 명확한 주장을 합니다:

그러나 “패턴의 의도와 일치하지 않는 폴더 구조가 손상을 일으키는 것을 관찰했습니다”라고 경고합니다. Java와 같은 강력한 형식의 언어에 대해, 주행 및 종속 Ports의 사양을 따로 유지하는 것을 권장합니다.

저도 그러한 구조로 시작했지만, 곧죽 코드의 크기를 키우고 Wing 모듈과 import 규칙을 효과적으로 활용할 수 없게 만든다는 것을 깨달았습니다. 이에 따라, 모든 Ports를 한 전용 폴더에 유지하기로 결정했습니다. 현재 애플리케이션의 크기를 고려하면, 이러한 결정은 타당해 보입니다.

둘째, 명시되지 않은 Wing 모듈과 import 기능을 활용하여, Util이라는 클래스의 모든 공용 정적 inflight 메서드를 클라이언트 모듈에서 직접 액세스할 수 있게 하여 코드 가독성을 개선합니다.

<div class="content-ad"></div>

세 번째로, 필요한 몇 가지 기능을 보완하기 위해 개발된 두 가지 Wing 표준 라이브러리 확장인 datetimex와 structx를 사용합니다. 이러한 확장 기능은 제가 여기에서 보고한 "Winglang 미들웨어 탐색" 프로젝트 endor.w의 일부였습니다.

이러한 확장 기능에 대한 정당성은 Port 인터페이스 및 데이터를 표현하는 핵심 아키텍처 결정을 살펴볼 때 명확해질 것입니다.

# Port 인터페이스 및 데이터 표현

Java와 같은 전통적인 강력한 형식의 객체 지향 언어는 모든 도메인 요소를 객체로 캡슐화하는 것을 주장합니다. 이 조언을 따른다면 Ticket 객체는 다음과 같이 보일 것입니다:

<div class="content-ad"></div>

```js
pub inflight class Ticket {
  pub ticketCode: str;
  pub carPlate: str;
  pub rateName: str;
  pub startingDateTime: std.Datetime;
  pub endingDateTime: std.Datetime;
  pub price: num;
  pub paymentId: str;
  
  new (ticketCode: str, ...) {
    this.ticketCode = ticketCode;
    ...
  }
  pub toJson(): Json {
    return Json {
       ticketCode: this.ticketCode,
       ...
  }
  pub static fromJson(data: Json): Ticket {
    return new Ticket(
      data.get("ticketCode").asStr(),
      ...
   );
  }
  pub toFieldArray(): Array<str> {
    return [
      this.ticketCode,
      ...
    ];
  }
  pub static fromFieldArray(records: Array<Array<str>>): Set<Ticket> {
    let result = new MutSet<Ticket>[];
    for record in records {
      result.add(new Ticket(
        record.at(0),
        ...
      );
    }
    return result.copy();
 }
}
```

이런 방식은 데이터 필드당 초기화 및 변환을 위해 코드당 6줄의 추가 코드를 도입하고 일부 고정된 메서드 정의 오버헤드가 발생합니다. 이로 인해 상당한 보일러플레이트 오버헤드가 발생합니다.

자바 및 파이썬과 같은 주류 언어는 데코레이터, 추상 베이스 클래스 또는 메타 클래스와 같은 다양한 메타 프로그래밍 자동화 도구를 사용하여 이러한 번거로움을 완화하려고 노력합니다.

Wing에서는 Wing 표준 라이브러리의 소량 조정만 이루어지면 이러한 것들이 비효율적이고 불필요함이 입증되었습니다.


<div class="content-ad"></div>

티켓 데이터 구조를 다음과 같이 정의할 수 있습니다:

```rust
pub struct Ticket {                 //객체를 나타내는 데이터 구조
                                    //주차 티켓의 데이터를 포함함:
    ticketCode: str;                //티켓의 고유 식별자
                                    //필요한 경우 선행 0이 포함된 10자리 숫자
    carPlate: str;                  //주차된 차량의 차량 번호
    rateName: str;                  //차량이 주차된 지역의 요금 이름
    startingDateTime: std.Datetime; //주차 기간이 시작되는 시간
    endingDateTime: std.Datetime;   //주차 기간이 만료되는 시간
    price: num;                     //티켓에 지불한 유로 금액
    paymentId: str;                 //티켓을 받기 위해 수행된 결제의 고유 식별자
}
```

## 주차 차량용 포트

"Hexagonal Architecture Explained" 책의 권장 사항을 따라, 포트 명명은 For`ActorName` 컨벤션을 채택합니다. 다음은 주차 차량용 포트가 정의된 방법입니다:

<div class="content-ad"></div>

```rust
pub struct BuyTicketRequest {  // 차량을 주차하기 위한 티켓 구매에 필요한 입력 데이터:
    carPlate: str;    // 주차된 차량의 차량번호
    rateName: str;    // 주차된 지역의 요금 이름
    euros: num;       // 지불할 유로 금액
    card: str;        // 지불에 사용되는 카드, 'n-c-mmyyyy' 형식으로, 여기서
                      // 'n'은 카드 번호 (16자리)
                      // 'c'는 확인 코드 (3자리),
                      // 'mmyyyy'는 만료 월과 년 (6자리)
}

/**
 * DRIVING PORT (제공된 인터페이스)
 */
pub 인터페이스 ForParkingCars {
    /**
     * 도시의 규제된 지역에서 자동차를 주차하는 데 필요한 요금을 포함하는 세트를 반환합니다.
     * 요금이 없는 경우 빈 세트가 반환됩니다.
     */
    getAvailableRates(): Set<rate.Rate>;

    /**
     * 주차 요금을 지불하고, 요금이 적용된 지역에서 자동차를 주차하기 위한 티켓을 구매하여 리포지토리에 저장합니다.
     * 티켓의 유효 기간은 현재 날짜 및 시간부터 시작되며, 유로 금액을 기준으로 요금을 적용하여 분 단위로 계산됩니다.
     * @param request 티켓을 구매하는 데 필요한 입력 데이터
     *      @see BuyTicketRequest
     * @return 요금이 적용된 지역에서 자동차를 주차하기 위한 유효한 티켓,
     *    카드를 사용하여 유로 금액을 지불합니다.
     *    티켓은 지불한 식별자에 대한 참조를 보유합니다.
     * @throws BuyTicketRequestException
     *    요청에 있는 입력 데이터가 유효하지 않은 경우
     * @throws PayErrorException
     *    지불하는 동안 오류가 발생한 경우
     */
    buyTicket (request: BuyTicketRequest): ticket.Ticket;
}
```

티켓 및 요금 객체와 마찬가지로 BuyTicketRequest 객체는 위에서 설명한 자동 형변환 인프라에 의존하는 일반 Wing 구조체로 정의됩니다.

ForParkingCars는 Wing 인터페이스로 정의됩니다. 원래의 "Blue Zone" 구현과 달리이 구현에는 BuyTicketRequest 유효성 검사가 포트 사양에 포함되어 있지 않습니다. 이것은 일부로 이루어졌습니다.

강력한 객체 캡슐화는 validate() 메서드를 BuyTicketRequest 클래스에 포함하는 것을 권장하지만, 여기서 사용된 열린 불변 데이터 구조와 같이 해당 위치에서 수행할 수 있습니다. 반면에 포트 사양에 요청 유효성 검사 논리를 포함하는 것은 구현 세부 사항을 너무 일찍 가져오는 문제가 됩니다.


<div class="content-ad"></div>

## 포트 관리

이 기능은 testFixture 기능을 제공하기 위해 사용되며 길지만 완전히 직관적입니다:

```js
bring "./Rate.w" as rate;
bring "./Ticket.w" as ticket;
bring "./ForPaying.w" as forPaying;


/**
 * DRIVING PORT (제공된 인터페이스)
 * 초기화, 리포지토리에서 데이터 로드, 앱에서 사용되는 서비스 구성 등과 같은 관리 작업을 수행하는 데 사용됨.
 * 일반적으로 다음에서 사용됨:
 *      - 테스트(testing actors)에서 테스트 픽스처(tested actors)를 설정하기 위해.
 *      - 앱 초기화를 위한 시작.
 */
 pub inflight interface ForAdministering {

    /**
    * 주어진 요율을 데이터 리포지토리에로드하여,
    * 이전에 존재하던 요율을 삭제함.
    */
    initializeRates(newRates: Array<rate.Rate>): void;

    /**
    * 주어진 티켓을 데이터 리포지토리에로드하여,
    * 이전에 존재하던 티켓을 삭제함.
    */
    initializeTickets(newTickets: Array<ticket.Ticket>): void;

    /**
    * 주어진 티켓 코드를 요청 시 반환될 다음 코드로 설정함.
    */
    changeNextTicketCode(newNextTicketCode: str): void;

    /**
    * 주어진 코드로 저장된 티켓을 리포지토리에서 반환함.
    */
    getStoredTicket(ticketCode: str): ticket.Ticket;

    /**
    * "pay" 메서드에 대한 마지막 요청을 반환함.
    */
    getLastPayRequest(): forPaying.PayRequest;

    /**
    * "pay" 메서드에서 반환된 마지막 응답을 반환함.
    * 이는 지불 내역의 식별자임.
    */
    getLastPayResponse(): str;

    /**
    * 지불 에러의 확률을 매개변수로 지정된 "퍼센트"로 설정함.
    */
    setPaymentError(errorCode: forPaying.PaymentError): void;

    /**
    * "pay" 메서드 실행 시 발생한 에러 코드를 반환함.
    */
    getPaymentError(): forPaying.PaymentError;

    /**
    * 주어진 날짜-시각을 현재 날짜-시각으로 설정함.
    */
    changeCurrentDateTime(newCurrentDateTime: std.Datetime): void;

}
```

이제, 애플리케이션 로직 구현을 자세히 살펴보아야 합니다.

<div class="content-ad"></div>

# 구현 세부 정보

## 주차 차량 백엔드용

```js
bring "../../application/ports" as ports;
bring "../../application/usecases" as usecases;


pub class ForParkingCarsBackend impl ports.ForParkingCars {
    _buyTicket: usecases.BuyTicket;
    _getAvailableRates: usecases.GetAvailableRates;

    new(
        dataRepository: ports.ForStoringData,
        paymentService: ports.ForPaying,
        dateTimeService: ports.ForObtainingDateTime
    ) {
        this._buyTicket = new usecases.BuyTicket(
          dataRepository, paymentService, dateTimeService);
        this._getAvailableRates = new usecases.GetAvailableRates(
          dataRepository);
    }

    pub inflight getAvailableRates(): Set<ports.Rate> {
        return this._getAvailableRates.apply();
    }

    pub inflight buyTicket(request: ports.BuyTicketRequest): ports.Ticket {
        return this._buyTicket.apply(request);
    }
}
```

이 클래스는 src/outside/backend 폴더에 위치하고 ports.ForParkingCars 인터페이스의 구현을 제공합니다. 이 인터페이스는 직접 함수 호출에 적합합니다. 두 가지 추가 서드파티 포트를 가정하며, 실제 구현은 BuyTicket 및 GetAvailableRates 두 Use Case 구현에 위임됩니다. BuyTicket Use Case 구현은 핵심 시스템 로직이 있는 곳이므로 해당 부분을 살펴봅시다.

<div class="content-ad"></div>

## BuyTicket Use Case

```js
수정된 내용:

수정된 내용 없음

기능:

- 요청 유효성 검사
- 새 티켓 구매
- 티켓 레코드 생성
- 데이터베이스에 티켓 레코드 저장
```

“Buy Ticket” Use Case 구현 클래스는 src/application/usescases 폴더에 있습니다. 이 클래스는 다음 Use Case 로직을 실행하는 데 책임을지는 즉시 함수를 반환합니다:

- 요청 유효성 검사
- 새 티켓 구매
- 티켓 레코드 생성
- 데이터베이스에 티켓 레코드 저장

<div class="content-ad"></div>

Use Cases를 인플라이트 함수로 구현하는 주된 이유는 모든 Wing 이벤트 핸들러가 인플라이트 함수이기 때문입니다. 직접 함수 호출은 로컬 테스트에 유용하지만, 실제 배포에서는 일반적으로 HTTP REST 또는 GraphQL API 호출일 것입니다.

BuyTicketRequest의 실제 유효성 검사는 Verifier.w 모듈 내의 보조 Util 클래스로 위임됩니다. 이는 각 필드의 유효성 검사가 매우 상세하고 많은 저수준 구체적인 사항을 포함하여 전반적인 유스케이스 논리 이해에 적은 기여를 하는 경우가 많기 때문입니다.

## 모든 구성 요소 통합하기

"Hexagonal Architecture Explained" 책의 권장사항을 따르면, 이는 Configurator 클래스 내에서 구현됩니다.

<div class="content-ad"></div>

```js
import util;
import endor;
import outside from "./outside";
import ports from "./application/ports";

enum ApiType {
    DIRECT_CALL,
    HTTP_REST
}

enum ProgramType {
    UNKNOWN,
    TEST,
    SERVICE
}

class Configurator implements outside.BlueZoneApiFactory {
    _apiFactory: outside.BlueZoneApiFactory;

    constructor(name: string) {
        let mockService = new outside.mock.MockDataRepository();
        let programType = this._getProgramType(name);
        let mode = this._getMode(programType);
        let apiType = this._getApiType(programType, mode);
        this._apiFactory = this._getApiFactory(
            name,
            mode, 
            apiType,
            mockService,
            mockService,
            mockService
        );
    }

    _getProgramType(name: string): ProgramType {
        if (name.endsWith("Test")) {
            return ProgramType.TEST;
        } else if (name.endsWith("Service") || name.endsWith("Application")) {
            return ProgramType.SERVICE;
        } else if (std.Node.of(this).app.isTestEnvironment) {
            return ProgramType.TEST;
        }
        return ProgramType.UNKNOWN;
    }

    _getMode(programType: ProgramType): endor.Mode {
        if (let mode = util.tryEnv("MODE")) {
            return {
                "DEV": endor.Mode.DEV,
                "TEST": endor.Mode.TEST,
                "STAGE": endor.Mode.STAGE,
                "PROD": endor.Mode.PROD
            }[mode];
        } else if (programType == ProgramType.TEST) {
            return endor.Mode.TEST;
        } else if (programType == ProgramType.SERVICE) {
            return endor.Mode.STAGE;
        }
        return endor.Mode.DEV;
    }

    _getApiType(programType: ProgramType, mode: endor.Mode): ApiType {
        if (let apiType = util.tryEnv("API_TYPE")) {
            return {
                "DIRECT_CALL": ApiType.DIRECT_CALL,
                "HTTP_REST": ApiType.HTTP_REST
            }[apiType];
        } else if (programType == ProgramType.SERVICE) {
            return ApiType.HTTP_REST;
        }
        let target = util.env("WING_TARGET");
        if (target.contains("sim")) {
            return ApiType.DIRECT_CALL;
        }
        return ApiType.HTTP_REST;        
    }

    _getApiFactory(
        name: string, 
        mode: endor.Mode,
        apiType: ApiType,
        dataService: ports.ForStoringData,
        paymentService: ports.ForPaying,
        dateTimeService: ports.ForObtainingDateTime
    ): outside.BlueZoneApiFactory {
        let directCall = new outside.DirectCallApiFactory(
            dataService, 
            paymentService, 
            dateTimeService
        );
        if (apiType == ApiType.DIRECT_CALL) {
            return directCall;
        } else if (apiType == ApiType.HTTP_REST) {
            return new outside.HttpRestApiFactory(
                name,
                mode,
                directCall
            );
        }
    }

    getForAdministering(): ports.ForAdministering {
        return this._apiFactory.getForAdministering();
    }

    getForParkingCars(): ports.ForParkingCars {
        return this._apiFactory.getForParkingCars();
    }

    getForIssuingFines(): ports.ForIssuingFines {
        return this._apiFactory.getForIssuingFines();
    }

}
```

이건 실험적인, 아직 최종적이지는 않은 구현입니다. 하지만 프로덕션 배포 요구 사항을 해결하기 위해 확장할 수 있습니다. Wing 사전 검사 도구를 활용하여 정적 시스템 구성을 채택했습니다.

이 구현에서 특수 MockDataStore 객체가 모든 세컨더리 포트를 구현합니다: 데이터 서비스, 결제 서비스 및 날짜 및 시간 서비스. 반드시 이런 방식이어야 하는 것은 아니며, 시카플딩 개발 과정에서 시간을 절약하기 위해 만들어졌습니다.

Configurator 클래스의 주요 책임은 사용할 API 유형을 결정하는 것입니다.

<div class="content-ad"></div>

- 직접 호출
- 로컬 HTTP REST
- 원격 HTTP REST
- 로컬 HTTP REST 및 HTML
- 원격 HTTP REST 및 HTML

해당 API 생성은 해당 ApiFactory 클래스로 위임됩니다.

이러한 구현에서 주목할 점은 실제 HTML 기반 UI 모드를 제외한 모든 구성에 동일한 테스트 스위트가 사용된다는 것입니다. 후자도 구현할 수 있지만 Selenium과 같은 HTML 테스트 드라이버가 필요합니다.

처음으로 이러한 수준의 코드 재사용을 달성했습니다. 그 결과로 로컬 직접 호출 구성에서 코드 구조 리팩토링을 수행할 때 대부분의 시간을 실행하며, 실제 테스트 및 프로덕션 환경에서 수정 없이 실행될 것이라는 확신을 갖게 됩니다. 이는 Wing 클라우드지향 프로그래밍 언어와 헥사고널 아키텍처가 진정으로 우수한 조합임을 입증합니다.

<div class="content-ad"></div>

# 큰 그림

각 모듈의 전체 소스 코드를 모두 포함하면 이 문서의 크기가 너무 커질 수 있습니다. 본 프로젝트의 GitHub 저장소에 대한 엑세스는 요청 시 제공됩니다.

대신, 전체 폴더 구조, 두 개의 UML 클래스 다이어그램, 그리고 주요 프로그램 요소와 관계를 반영한 클라우드 리소스 다이어그램을 제시하겠습니다.

```js
├── src
│   ├── application
│   │   ├── ports
│   │   │   ├── ForAdministering.w
│   │   │   ├── ForIssuingFines.w
│   │   │   ├── ForObtainingDateTime.w
│   │   │   ├── ForParkingCars.w
│   │   │   ├── ForPaying.w
│   │   │   ├── ForStoringData.w
│   │   │   ├── Rate.w
│   │   │   └── Ticket.w
│   │   ├── usecases
│   │   │   ├── BuyTicket.w
│   │   │   ├── CheckCar.w
│   │   │   ├── GetAvailableRates.w
│   │   │   └── Veryfier.w
│   ├── outside
│   │   ├── backend
│   │   │   ├── ForAdministeringBackend.w
│   │   │   ├── ForIssuingFinesBackend.w
│   │   │   └── ForParkingCarsBackend.w
│   │   ├── http
│   │   │   ├── html
│   │   │   │    ├── _htmlForParkingCarsFormatter.ts
│   │   │   │    └── htmlForParkingCarsFormatter.w
│   │   │   ├── json
│   │   │   │    ├── jsonForIssuingFinesFormatter.w
│   │   │   │    └── jsonForParkingCarsFormatter.w
│   │   │   ├── ForIssuingFinesClient.w
│   │   │   ├── ForIssuingFinesController.w
│   │   │   ├── ForParkingCarsClient.w
│   │   │   ├── ForParkingCarsController.w
│   │   │   └── middleware.w
│   │   ├── mock
│   │   │   └── MockDataRepository.w
│   │   ├── ApiFactory.w
│   │   ├── BlueZoneAplication.main.w
│   │   ├── DirectCallApiFactory.w
│   │   └── HttpRestApiFactory.w
│   └── Configurator.w
├── test
│   ├── steps
│   │   ├── BuyTicketTestSteps.w
│   │   ├── CheckCarTestSteps.w
│   │   ├── Parser.w
│   │   └── TestStepsBase.w
│   ├── usecase.BuyTicketTest.w
│   └── usecase.CheckCarTest.w
├── .gitignore
├── LICENSE
├── Makefile
├── README.md
├── package-lock.json
├── package.json
└── tsconfig.json
```

<div class="content-ad"></div>

애플리케이션 로직 측면에서 이 프로젝트는 작습니다. 그러나 구조에 대한 인지적 제어를 충분히 요구하는 문제가 있는 정도로 이미 상당히 커졌습니다. 현재 버전은 다음과 같은 여러 기준 사이에서 합리적인 균형을 이루려고 노력합니다:

- 파일 구조의 깊이.
- 복잡성 및 import 문의 양.
- 의도한 가치를 전달하는 코드와, 해당 코드를 정리하고 테스트하여 전달하기 위해 필요한 코드 사이의 비율.

이 출판물의 모든 바람직한 지표 집합을 계산하는 것은 이 문서의 범위를 벗어납니다. 그러나 여기서 그림에서 손으로 간단한 계산을 수행할 수 있습니다: 애플리케이션 내부 폴더와 외부 폴더(중간 폴더 포함)에 있는 파일의 비율("가치"라고 부름)과 파일 및 폴더의 총 개수("물건"이라고 부름). 현재 버전에서 숫자는 다음과 같습니다:

총합: 55
src/application: 16
src/: 41
파일: 43
엄격한 가치 대 물건 비율: 16*100/55 = 29.09%
확장된 가치 대 물건 비율: (15+19)*100/42 = 74.55%

<div class="content-ad"></div>

크거나 작은가요? 좋은가 나쁜가요? 현재로서는 확실하지 않습니다. 초기 인상은 숫자가 건강하다는 것입니다. 더 타당한 결론을 도출하려면 추가 연구와 실험이 필요합니다. 실제 제품 시스템은 상당히 많은 테스트가 필요합니다.

인지 부담 관점에서 43개 파일은 인간 커뮤니케이션 채널과 짧은 기억의 유명한 7 ± 2 제한을 초과하는 많은 수입니다. 조직이 필요합니다. 현재 버전에서 한 수준에서의 파일 최대 개수는 8개이며, 이는 제한 내에 있습니다.

제시된 계층 다이어그램은 실제 그래프 이미지를 부분적으로만 반영합니다 - 'bring' 문의 교차 파일 종속성은 보이지 않습니다. 또한, 외부 종속성을 반영하고 패키지 크기에 영향을 미치는 __node_files__ 폴더가 누락되어 있습니다.

간단히 말해서, 도구 및 측정 방법론에 추가 투자가 없으면 그림은 부분적일 뿐입니다.

<div class="content-ad"></div>

원하는 방향을 정립할 수 있습니다: 가능한 한 직접 가치를 창출하는 자산과 그것이 작동하기 위해 필요한 지원 요소를 최소한으로 다루는 것을 선호합니다. 건강한 가치 대 지원물 비율은 언어 및 라이브러리 지원에서 올 수 있습니다. 생성 코드 자동화는 타이핑을 줄이지만 총인지 부담은 줄여주지 않을 것입니다.

## 클래스 다이어그램

"블루 존" 응용프로그램 요소를 모두 하나의 UML 클래스 다이어그램으로 그리는 것은 현실적이지 않을 수 있습니다. UML은 사전 점검 및 운행 중인 요소를 독립적으로 표현하는 것을 지원하지 않습니다. 시스템의 가장 중요한 부분을 별도로 시각화할 수 있습니다. 예를 들어, 아래는 응용프로그램 부분에 대한 UML 클래스 다이어그램입니다:

![애플리케이션 부분의 UML 클래스 다이어그램](/assets/img/2024-07-01-PortedtoCloudwithWinglangPartOne_3.png)

<div class="content-ad"></div>

주차 차량에 대한 IForParkingCars 및 ForIssuingFines 주요 인터페이스는 자동차 운전자 및 주차 감독관 주요 역할로 명명된다는 점에 주목해주세요. BuyTicket 및 CheckCar 사용 사례와는 이름이 다릅니다. 이것은 실수가 아닙니다. 주요 포트 인터페이스 이름은 특정 사용 사례에서 주요 역할에 따라 반영되어야 합니다. 이러한 명명에 대한 자동 규칙은 없습니다. 선택된 이름이 직관적이기를 바랍니다.

또한 애플리케이션 모듈 내에서 주요 인터페이스가 직접 구현되지 않으며 이러한 인터페이스와 사용 사례 구현 간에는 끊어짐이 있음을 알아주세요.

이 또한 실수가 아닙니다. 주요 인터페이스와 해당 사용 사례 구현 간의 구체적인 연결은 UML 클래스 다이어그램에서 나타나는 것과 같이 구성에 따라 달라집니다:

![class diagram](/assets/img/2024-07-01-PortedtoCloudwithWinglangPartOne_4.png)

<div class="content-ad"></div>

위의 클래스 다이어그램에 따르면 Configurator가 어떤 IBlueZoneApiFactory 구현체를 사용할지 결정합니다: 로컬 테스트용으로 DirectApiCallFactory를 사용하거나 HTTP를 통해 로컬 및 원격 테스트 및 프로덕션 배포용으로 HttpRestApiFactory를 사용합니다.

## 클라우드 리소스

![이미지](/assets/img/2024-07-01-PortedtoCloudwithWinglangPartOne_5.png)

<div class="content-ad"></div>

위에서 소개된 클라우드 리소스 다이어그램은 Wing 컴파일레이션 결과를 AWS 타겟 플랫폼에 반영한 것입니다. 이는 위에서 소개된 UML 클래스 다이어그램과 매우 다르며, 서로 보완하는 다양한 유형의 다이어그램이 있다는 것을 결론 지을 수 있습니다. 클라우드 리소스 다이어그램은 비용, 성능, 신뢰성, 회복력, 보안과 같은 시스템의 운영 측면을 이해하고 제어하는 데 중요합니다.

이전 다이어그램과 마찬가지로, 주요 과제는 규모입니다. 클라우드 리소스가 많아질수록 다이어그램은 너무 많은 세부 사항으로 혼동될 수 있습니다.

현재 모든 다이어그램 버전은 공식 청사진보다는 유용한 일러스트레이션 같은 모습입니다. 정확성과 이해도 사이의 적절한 균형을 찾는 것은 미래 연구의 주제입니다. 나는 초기 발표 중 하나에서 이 문제를 다루었습니다. 아마도 이 연구 주제로 다시 돌아가는 것이 좋을 것 같습니다.

# 결론

<div class="content-ad"></div>

최근 출간된 책 "Hexagonal Architecture Explained" 에서 소개된 “Blue Zone” 애플리케이션을 Java에서 Wing으로 이식하는 경험은 다음의 중간 결론으로 이어졌습니다.

- 소프트웨어 애플리케이션을 직접적으로 클라우드로 이식하는 것은 종종 비효율적이고 유지보수하기 어려운 코드로 이어질 수 있습니다.
- 각 프로그래밍 언어는 설계 결정을 표현하는 고유한 방식을 갖고 있으며, 하나에서 다른 언어로의 맹목적인 번역은 작동하지 않습니다.
- 새로운 클라우드 지향 프로그래밍 언어인 Wing에서 Hexagonal Architecture 패턴을 구현하는 것은 성공적인 조합이 되었습니다. 이 방식은 비용, 성능, 유연성, 보안 사이에서 적절한 균형을 갖추고 있습니다.
- 기능 면에서 조금만 발전한 응용 프로그램에서도 코드베이스 크기가 빠르게 증가합니다. 복잡성을 통제하기 위해서는 방법론과 지침이 필요합니다.
- 애플리케이션 로직과 클라우드 자원의 그래픽 표현은 설명을 위해 유용합니다. 이를 공식 청사진으로 전환하는 것은 추가 연구가 필요합니다.

# 감사의 글

본 출판물을 준비하는 동안 초안을 향상시키고 품질을 보장하기 위해 여러 중요 도구를 활용했습니다.

<div class="content-ad"></div>

이 문서 초고안은 노션의 무료 구독 기능을 통해 구조화 및 아이디어 개발을 용이하게 했습니다.

문법 및 철자 검토를 위해 Grammarly의 무료 버전이 기본적인 오류를 식별하고 수정하여 텍스트의 가독성을 보장하는 데 유용했습니다.

문체 표현의 향상과 이야기 일관성 검사는 ChatGPT 4o의 유료 버전을 사용하여 진행되었습니다. ChatGPT 4o 도구는 TypeScript의 Trusted Wing Libraries의 중요 부분인 datetimex와 struct를 개발하는 데도 사용되었습니다.

UML 클래스 다이어그램은 무료 버전의 PlantText UML 온라인 도구를 사용하여 생성되었습니다.

<div class="content-ad"></div>

테스트 단계 클래스에서 사전 확인 및 비행 정의를 올바르게 처리하는 데 Cristian Pallares의 도움이 중요했습니다.

이 출판물 초기 버전에 중요한 의견을 제공해 준 Elad Ben-Israel에게 많은 감사를 표합니다.

책의 공동 저자인 Juan Manuel Garrido de Paz가 개발한 "Blue Zone" 애플리케이션의 Java 버전입니다. Juan Manuel Garrido de Paz가 안타깝게도 2024년 4월에 세상을 떠났습니다. 그의 추억이 기억되길 바라며 이 보고서가 그에게 헌사가 되기를 바랍니다.

준비 과정에 모든 고급 도구와 자원이 크게 기여했지만, 이 글에서 제시된 개념, 솔루션 및 최종 결정은 내가 완전히 스스로 해결해 나가며 모든 책임을 져야 합니다.