---
title: "모바일 시스템 디자인 연습 결제 시스템 설계 방법 PART - 1"
description: ""
coverImage: "/assets/img/2024-08-17-MobileSystemDesignExerciseDesigningaPaymentSystemPART1_0.png"
date: 2024-08-17 01:27
ogImage:
  url: /assets/img/2024-08-17-MobileSystemDesignExerciseDesigningaPaymentSystemPART1_0.png
tag: Tech
originalTitle: "Mobile System Design Exercise Designing a Payment System  PART  1"
link: "https://medium.com/@karishma-agr1996/design-a-payment-system-part-1-2648061560e2"
isUpdated: true
updatedAt: 1723864220814
---

결제 시스템은 개인, 기업 또는 단체 사이의 자금 이체를 용이하게 하는 메커니즘이나 인프라를 말합니다. 이를 통해 재화, 서비스 또는 채무에 대한 금전적 가치를 교환할 수 있습니다.

결제 시스템은 현금, 수표, 은행 이체와 같은 전통적인 방법뿐만 아니라 신용카드, 직불카드, 모바일 결제, 온라인 결제 플랫폼과 같은 현대 전자 결제 방법을 포함한 다양한 형태를 취할 수 있습니다. 이러한 시스템은 개인과 기업이 안전하고 효율적으로 결제를 보내고 받을 수 있도록 가능하게 합니다.

모바일을 통해 결제를 할 때 발생할 수 있는 시나리오는 일반적으로 두 가지입니다. A. 동료 간 거래를 하는 경우나 B. 온라인에서 상품이나 서비스를 구매하는 경우가 있습니다.

## 1. 친구 사이에서 자금을 이체할 때

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

앱 사용자들은 카드 세부정보를 추가하고 지갑을 만들어 사람들 사이에 쉽게 자금을 이체할 수 있습니다. 이 앱은 앱을 사용하는 연락처와 동기화됩니다. 사용자는 연락처를 선택하고 이체 금액을 입력하며, 지갑이나 직불/신용 카드에서 차감할지 선택합니다. 앱은 안전하게 거래를 처리하고 금액을 차감하여 수취인에게 전송합니다. 결제 영수증이 제공됩니다.

이러한 앱의 몇 가지 예시로는 PhonePe, Gpay, BHIM, Paytm 등이 있습니다.

# 2. 모바일에서 물건을 구매할 때

모바일 상거래 애플리케이션에서 사용자가 구매를 완료할 때, 그들은 항목을 장바구니에 추가합니다. 그런 다음 "지금 구매" 옵션으로 이동하여 주소 세부정보를 입력하고 제품 정보를 검토할 수 있는 페이지로 이동합니다. 마지막으로, 결제 정보 페이지에 도달합니다.

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

이 화면에서 사용자는 카드 번호, 이름, CVV 및 만료 날짜를 포함한 카드 세부정보를 입력합니다. 앱은 사용자의 은행과 안전하게 연결되어 결제 창을 엽니다. 여기서 사용자는 상인 은행으로부터 OTP(일회용 비밀번호)를 받아 앱에 입력합니다.

OTP를 입력한 후에, 구매 주기가 완료되고 거래가 처리됩니다.

참고: 결제 과정 중에 적용된 보안 조치 및 암호화 프로토콜을 강조하여 민감한 카드 소지자 데이터의 보호를 보장하는 것이 중요합니다.

# 앱 내 결제 시스템은 여러 중요한 목적을 수행합니다:

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

1. 편리한 거래: 결제 시스템을 통해 사용자는 외부 플랫폼으로 전환하거나 결제 세부 정보를 반복해서 제공할 필요 없이 앱 내에서 구매 및 거래를 할 수 있습니다. 이런 편의성은 사용자 경험을 향상시키고 원활한 거래를 촉진합니다.

2. 수익화: 앱 개발자와 기업들에게 결제 시스템을 통합하면 앱으로부터 직접 수익을 창출할 수 있습니다. 디지털 상품, 서비스, 구독, 물리적 제품까지 판매하고 결제를 앱 환경에서 안전하게 처리할 수 있습니다.

3. 앱 내 구매: 많은 앱에서 사용자가 경험을 향상시키기 위해 구매할 수 있는 추가 기능, 콘텐츠 또는 가상 아이템을 제공합니다. 결제 시스템을 통해 앱 내 구매의 원활한 통합이 가능해져 사용자는 프리미엄 콘텐츠를 잠금 해제하거나 업그레이드를 직접 앱 내에서 할 수 있습니다.

4. 보안과 신뢰: 안전한 결제 시스템을 통합하면 금융 거래가 안전하고 효율적으로 처리됨을 보장할 수 있습니다. 사용자는 민감한 결제 정보가 안전하게 보호된다는 점에 신뢰할 수 있고, 개발자들은 사용자 데이터를 보호하기 위한 확립된 보안 조치에 의지할 수 있습니다.

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

5. 국제 접근성: 결제 시스템은 다양한 결제 방법과 통화를 지원하여 다른 국가의 사용자가 앱과 상호 작용하기 쉽도록 돕습니다. 현지화된 결제 옵션을 제공함으로써 기업은 국제적으로 고객 베이스를 확대하고 다양한 시장에 맞출 수 있습니다.

6. 분석 및 보고: 결제 시스템은 일반적으로 자세한 거래 데이터와 분석을 제공하여 앱 개발자에게 사용자 행동, 구매 패턴 및 수익 메트릭스에 대한 통찰력을 제공합니다. 이 정보를 활용하여 가격 정책, 마케팅 전략 및 전반적인 앱 성능에 관한 결정을 내리는 데 도움이 됩니다.

7. 구독 관리: 앱이 구독 기반 서비스를 제공하는 경우, 결제 시스템을 통해 사용자가 구독하고, 구독을 관리하며 반복 결제를 편리하게 처리할 수 있습니다. 이는 사용자와 앱 개발자 모두를 위한 구독 관리 프로세스를 간소화합니다.

총적으로 앱 내 결제 시스템은 거래를 간편하게 만들어 주며 수익화를 지원하고 사용자 경험을 향상시키며 보안과 분석을 제공합니다. 사용자에게 제품, 서비스 또는 구독을 제공하려는 앱에게 필수적인 구성 요소입니다.

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

# Low Level System Design

아마존과 같은 결제 시스템을 설계하려고 노력하는 예시를 살펴보겠습니다.

다음은 아마존과 같은 플랫폼을 위한 결제 시스템 설계에 대해 낮은 수준에서 물어볼 수 있는 가능한 질문 목록입니다:

1. 결제 시스템에서 결제 게이트웨이 통합을 어떻게 처리할 것인가요?
2. 거래 중에 고객 결제 정보의 보안을 어떻게 보장할 것인가요?
3. 토큰화 프로세스를 설명하고 결제 시스템에 어떻게 구현할 것인가요?
4. 다양한 결제 방법을 처리하고 신용 카드, 직불 카드, 디지털 지갑 등 다양한 공급업체와의 호환성을 보장하는 방법은 무엇인가요?
5. 결제 시스템 내에서 사기 활동을 감지하고 방지하기 위해 어떤 메커니즘을 구축할 것인가요?
6. 시스템 내에서 반복 결제 및 구독을 처리하는 방법을 설명해 주세요.
7. 결제 알림을 처리하고 주문 이행 및 거래 상태에 대한 실시간 업데이트를 보장하기 위해 시스템을 설계하는 방법은 어떻게 되나요?
8. 결제 시스템 내에서 환불 및 분쟁 처리 프로세스를 설명해 주세요.
9. 다중 통화 거래를 지원하고 정확한 환율 변환율을 보장하기 위한 조치는 무엇인가요?
10. 상인이 판매, 수익 및 거래 지표를 추적할 수 있도록 구현할 거래 내역 및 보고 기능을 개요로 설명해 주실 수 있나요?
11. 결제 분석에 접근하는 방법과 상인에게 유용한 통찰력은 무엇인가요?
12. PCI-DSS(결제 카드 산업 데이터 보안 표준) 규정을 준수하는 방법을 어떻게 보장할 것인가요?
13. 회계 시스템과의 통합 프로세스를 설명하여 데이터 전송 및 결제 조정을 원활하게 하는 방법은 무엇인가요?
14. 결제 시스템 내에서 사용자 관리, 인증 및 권한을 어떻게 처리할 것인가요?
15. 높은 거래량을 처리하기 위해 결제 시스템의 성능 및 확장성을 최적화하기 위해 어떤 전략을 채택할 것인가요?
16. 플래시 세일이나 시즌 프로모션과 같은 이벤트 중에 피크 트래픽을 처리하기 위해 시스템을 설계할 것인가요?
17. 결제 시스템의 신뢰성과 정확성을 보장하기 위해 따를 테스트 및 품질 보증 프로세스를 설명해 주세요.
18. 시스템 오류나 다운타임을 어떻게 처리하여 방해를 최소화하고 중단 없이 결제 서비스를 할 수 있게 할 것인가요?
19. 결제 프로세스 중에 사용자 경험을 최적화하기 위한 전략은 무엇이며, 마찰을 최소화하고 편리함을 향상시키는 방법은 무엇인가요?
20. 사기 탐지 서비스나 환율 공급업체와 같은 제3자 서비스 및 API와의 원활한 통합을 보장하기 위한 방법은 무엇인가요?

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

이러한 질문은 지불 시스템 디자인의 다양한 측면을 다루며 아키텍처, 보안 조치, 규정 준수, 확장성 및 사용자 경험을 고려하는 지원자의 이해를 평가하는 데 도움이 될 수 있습니다.

3rd 파티 게이트웨이를 사용하고 있음을 염두에 두세요.

# 기능적 요구사항:

1. 사용자 등록: 사용자는 안전하게 계정을 생성하고 결제 세부정보를 등록할 수 있어야 합니다.
2. 제품 선택: 사용자는 장바구니에 상품을 추가하고 결제를 위해 체크아웃할 수 있어야 합니다.
3. 결제 방법: 시스템은 신용카드, 직불카드, 디지털 지갑 및 인터넷 뱅킹과 같은 다양한 결제 방법을 지원해야 합니다.
4. 결제 게이트웨이 통합: 시스템은 결제 게이트웨이와 통합하여 거래를 안전하게 처리하고 결제를 승인해야 합니다.
5. 주문 확인: 사용자는 결제가 성공적으로 처리되면 확인 이메일이나 알림을 받아야 합니다.
6. 주문 기록: 사용자는 주문 내역을 확인하고 결제 상태를 추적할 수 있어야 합니다.
7. 환불 및 반품: 시스템은 사용자가 필요한 경우 환불을 요청하고 반품을 시작할 수 있는 메커니즘을 제공해야 합니다.
8. 사기 탐지: 시스템은 부정거래를 식별하고 방지하기 위한 사기 탐지 메커니즘을 갖추어야 합니다.
9. 통화 변환: 필요한 경우 시스템은 국제 거래를 위해 통화 변환을 지원해야 합니다.
10. 보고서 및 분석: 시스템은 상인들을 위한 판매, 수익 및 거래 지표와 관련된 보고서와 분석을 생성해야 합니다.

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

# 비기능 요구 사항:

1. 보안
2. 성능
3. 확장성
4. 신뢰성
5. 사용성
6. 호환성
7. 규정 준수
8. 오류 처리
9. 통합
10. 성능 모니터링

이러한 요구 사항은 안전하고 신뢰할 수 있으며 사용자 친화적이며 다양한 거래를 효과적으로 처리할 수 있는 결제 시스템을 디자인하기 위한 기초를 제공합니다.

# 결제 시스템은 어떻게 작동합니까?

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

![image](/assets/img/2024-08-17-MobileSystemDesignExerciseDesigningaPaymentSystemPART1_0.png)

At a high level, here is how the payment system typically works on a merchant’s website:

1. Customer Selection: The customer selects products or services on the merchant’s website and proceeds to the checkout or payment page.

2. Payment Method Selection: The customer is presented with various payment methods to choose from, such as credit/debit cards, digital wallets (e.g., PayPal), or other options.

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

3. 데이터 입력: 고객이 필요한 결제 정보를 입력합니다. 이는 신용카드 상세정보 (카드 번호, 만료일, CVV), 청구 주소 및 기타 추가 인증 요소(예: 3D Secure 또는 OTP)를 포함할 수 있습니다.

4. 데이터 암호화: 결제 정보는 안전한 프로토콜(예: SSL)을 사용하여 암호화되어 전송 중에 그 기밀성과 무결성을 보호합니다.

5. 승인 요청: 상인 웹사이트가 결제 게이트웨이나 결제 처리 업체로 승인 요청을 보냅니다. 이 요청에는 결제 세부 정보가 포함되어 고객이 선택한 결제 방법으로 청구할 수 있는 승인을 요청합니다.

6. 결제 처리: 결제 게이트웨이가 승인 요청을 관련 금융 기관(예: 고객의 은행이나 신용카드 발급사)에 안전하게 전송합니다.

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

7. 승인 응답: 금융 기관은 가능한 자금, 카드 유효성 및 기타 요소에 기반하여 거래 요청을 평가합니다. 결제가 승인되었는지 또는 거절되었는지를 나타내는 승인 응답을 결제 게이트웨이로 보냅니다.

8. 상인에 대한 응답: 결제 게이트웨이는 승인 응답을 상인의 웹사이트로 전달하여 거래 상태를 알려줍니다.

9. 주문 처리: 결제가 승인된 경우 상인은 주문 처리를 진행하여 제품이나 서비스를 고객에게 제공합니다.

10. 결제 처리: 결제 처리 업체는 고객의 계좌에서 상인의 계좌로 자금을 이체하는 결제 처리 과정을 시작합니다. 결제 방법 및 관련 금융 기관에 따라 몇 영업일이 걸릴 수 있습니다.

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

11. 확인 및 영수증: 상인 웹 사이트는 고객에게 거래 성공의 확인과 기록용 영수증을 제공합니다.

결제 게이트웨이, 결제 프로세서 및 상인이 선택한 통합에 따라 구체적인 세부 정보와 중개인의 참여가 다를 수 있다는 점을 유의해야 합니다. 그러나 이 일반적인 흐름은 상인 웹 사이트의 전형적인 결제 시스템에서 수반되는 주요 단계를 개요합니다.

# 결제, 지급

Amazon과 같은 전자 상거래 앱을 사용할 때 고려해야 할 사항이 더 있습니다. Amazon에서는 여러 판매자가 제품을 웹 사이트에 게시하고 고객이 제품을 구매합니다. 고객이 결제를 완료하면 이 금액이 판매자의 은행 계좌가 아닌 Amazon의 은행 계좌로 이동됩니다. 이를 Pay-in이라고 합니다. 이후 전자 상거래 웹 사이트 은행 계좌가 이 금액을 판매자의 은행 계좌로 송금합니다. 이를 Payout이라고 합니다.

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

![이미지](/assets/img/2024-08-17-MobileSystemDesignExerciseDesigningaPaymentSystemPART1_1.png)

# 결제 게이트웨이

결제 게이트웨이는 전자 상거래 플랫폼과 통합될 때 결제를 진행하고 받을 수 있는 채널로 디자인된 온라인 결제 서비스입니다.

결제를 받는 절차에는 고객이 신용카드/체크카드 번호, 유효 날짜 및 CVV와 같은 세부 정보를 작성해야 합니다.

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

결제 게이트웨이는 온라인 결제 프로세스의 중요한 구성 요소입니다. 이들은 거래 데이터의 안전한 흐름을 상인, 고객 및 은행 간에 원활하게 조정합니다. 결제 게이트웨이가 내부적으로 어떻게 작동하는지에 대한 개요는 다음과 같습니다:

![이미지](/assets/img/2024-08-17-MobileSystemDesignExerciseDesigningaPaymentSystemPART1_2.png)

1. 초기화:
   — 상인은 필요한 API 또는 SDK를 통합하여 결제 게이트웨이와 그들의 웹사이트 또는 애플리케이션을 연동합니다.
   — 상인은 안전한 연결을 확립하기 위해 결제 게이트웨이 제공 업체로부터 필요한 자격 증명(예: API 키)을 획득합니다.

2. 고객이 결제를 시작합니다:
   — 고객은 상인의 웹사이트나 애플리케이션에서 원하는 제품이나 서비스를 선택한 후 체크아웃 페이지로 이동합니다.
   — 체크아웃 페이지에서 고객은 결제 게이트웨이가 제공하는 결제 수단(예: 신용카드, 직불카드, 디지털 지갑)을 선택합니다.

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

3. 암호화 및 안전 통신:

- 고객의 결제 정보, 즉 카드 세부 정보는 상인 애플리케이션 내에서 안전한 프로토콜(예: SSL/TLS)을 사용하여 암호화되고, 결제 게이트웨이로 전송되기 전에 처리됩니다.
- 암호화된 결제 데이터는 API 또는 안전한 HTTPS 통신을 통해 상인 서버에서 결제 게이트웨이 서버로 안전하게 전송됩니다.

4. 승인 요청:

- 결제 게이트웨이는 암호화된 결제 데이터를 받아 서버에서 해독합니다.
- 결제 게이트웨이는 그런 다음 승인 요청을 매입 은행(상인의 은행)이나 카드 네트워크(예: Visa, Mastercard)로 전달합니다.

5. 매입 은행 또는 카드 네트워크 처리:

- 매입 은행이나 카드 네트워크는 결제 게이트웨이로부터 승인 요청을 받습니다.
- 해당 은행이나 네트워크는 카드 세부 정보, 유효한 자금 및 사기 탐지 조치 등을 포함한 여러 가지 확인 및 유효성 검사를 수행합니다.
- 거래가 승인되면, 매입 은행이 승인 코드를 생성하여 결제 게이트웨이로 다시 전송합니다.

6. 거래 응답:

- 결제 게이트웨이는 매입 은행이나 카드 네트워크로부터 승인 응답을 받습니다.
- 응답에는 승인 또는 거절과 함께 승인 코드(해당되는 경우)와 같은 거래 상태가 포함됩니다.
- 결제 게이트웨이는 응답을 암호화하여 다시 상인 서버로 전송합니다.

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

7. 거래 정산:

- 결제가 승인되면 상인은 자금을 받기 위해 정산 프로세스를 시작합니다.
- 결제 게이트웨이는 일반적으로 취득 은행을 통해 고객의 계정에서 상인이 지정한 계정으로 승인된 자금을 안전하게 이체합니다.

8. 확인 및 완료:

- 결제 게이트웨이는 거래의 상태 및 세부 정보를 나타내는 확인 메시지나 응답을 상인의 서버로 전송합니다.
- 상인의 웹사이트나 애플리케이션은 주문 상태를 업데이트하고 고객에게 결제 확인을 제공한 다음 주문 이행을 계속합니다.

특정 결제 게이트웨이 제공업체, 통합 방법 및 지원되는 결제 방법에 따라 결제 게이트웨이의 내부 작업이 달라질 수 있다는 점을 염두에 두어야 합니다. 거래의 안전한 처리를 보장하기 위해 보안 조치, 업계 표준(예: PCI-DSS) 준수 및 사기 방지 메커니즘은 결제 게이트웨이 운영의 중요한 구성 요소입니다.

아래 razorPay 결제 게이트웨이에 대해 읽어보실 수 있습니다.

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

이것은 사용자 체크아웃 페이지가 어떻게 보일지, 그들이 카드 정보를 입력하는 양식을 볼 수 있을 것이고, 그 정보가 확인되어 결제 페이지로 이동하게 되며 거기서 결제를 확인해야 할 것임을 알려줍니다. 결제가 확인되면 주문 확인을 위해 콜백을 받게 되고 금액이 공제될 것입니다. 또한 전자 상거래 앱은 재고를 업데이트할 것입니다.

# 거래 중 고객 결제 정보의 보안을 보장하기 위해 어떤 조치를 취하겠습니까?

전자 상거래 앱의 개발 관점에서 결제나 사용자 결제 정보에 관련된 앱이 직면할 수 있는 여러 가지 잠재적인 보안 위협이 있습니다. 다음은 일반적인 보안 위협과 이를 보호하기 위한 조치입니다:

1. 중간자 공격:
   — 위협: 공격자가 앱과 결제 게이트웨이 간의 통신을 가로채어 민감한 결제 정보에 접근하고 조작할 수 있습니다.
   — 해결책: HTTPS 또는 SSL/TLS 암호화와 같은 안전한 통신 프로토콜을 구현하여 데이터 전송을 보호합니다. 신뢰할 수 있는 서버와의 통신을 보장하기 위해 인증서 핀닝을 사용하세요.

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

2. 보안이 약한 데이터 저장소:

- 침해: 지불 정보를 안전하게 저장하지 않아 불법 접근이나 데이터 침입에 취약해집니다.
- 해결책: 강력한 암호화 알고리즘을 사용하여 송수신 중과 휴식 중에 지불 데이터를 암호화하세요. 데이터베이스를 암호화하거나 안전한 클라우드 저장소 서비스를 구현하는 등 안전한 저장 메커니즘을 적용하세요.

3. 약한 인증:

- 침해: 약한 또는 쉽게 추측 가능한 비밀번호, 다중 요소 인증의 부재, 또는 부적절한 세션 관리로 사용자 계정과 지불 정보에 불법 접근이 발생합니다.
- 해결책: 강력한 암호 정책을 시행하고 사용자에게 고유하고 복잡한 암호를 선택하도록 유도하세요. 다중 요소 인증(MFA)을 구현하여 추가 보안 계층을 더하세요. 안전한 세션 관리 기술을 사용하고 세션 타임아웃을 시행하세요.

4. SQL 인젝션:

- 침해: 입력 유효성 검증이 충분하지 않아 공격자가 악의적인 SQL 쿼리를 삽입하고 지불 정보가 포함된 데이터베이스에 무단 액세스를 얻을 수 있습니다.
- 해결책: SQL 인젝션 공격을 방지하기 위해 매개변수화된 쿼리 또는 준비된 문을 사용하세요. 사용자 입력을 유효성 검사하고 악성 데이터가 SQL 쿼리로 실행되는 것을 방지하는 소독 기술을 구현하세요.

5. 교차 사이트 스크립팅(XSS):

- 침해: 사용자 생성 콘텐츠를 안전하게 처리하지 않아 공격자가 사용자가 볼 수 있는 웹 페이지에 악성 스크립트를 삽입하여 지불 정보를 침해할 수 있습니다.
- 해결책: XSS 공격을 방지하기 위해 입력 유효성 검사 및 출력 인코딩을 구현하세요. 사용자 입력과 출력을 자동으로 정리하는 보안 라이브러리와 프레임워크를 사용하세요. 보안 취약점을 해결하기 위해 소프트웨어를 정기적으로 업데이트하고 패치하세요.

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

6. 취약한 제3자 통합:
   — 위협: 보안이 약하거나 취약한 제3자 라이브러리, API 또는 결제 게이트웨이와 통합되어 결제 정보가 공격자에게 노출될 수 있음.
   — 해결책: 신뢰할 만한 안전한 제3자 통합을 철저히 검토하고 선택합니다. 라이브러리, API 및 결제 게이트웨이를 최신 보안 패치로 업데이트 유지합니다. 제3자 제공 업데이트 및 보안 속보를 모니터링합니다.

7. 안전하지 않거나 신뢰할 수 없는 결제 게이트웨이 통합 부족:
   — 위협: 안전하지 않거나 신뢰할 수 없는 결제 게이트웨이와 통합하여 결제 거래의 안전성을 compromise할 수 있음.
   — 해결책: 강력한 보안평판이 있는 신뢰할 수 있는 웰 에스타블리시드 결제 게이트웨이를 선택합니다. 결제 게이트웨이가 PCI DSS 컴플라이언스와 같은 업계 표준 보안 조치를 준수하는지 확인합니다.

8. 부적절한 오류 처리 및 로깅 미비:
   — 위협: 적절하지 않은 오류 처리 및 부족한 시스템 활동 로깅으로 인해 보안 침해를 신속하게 식별하고 대응하는 것이 어려움.
   — 해결책: 오류 메시지에서 민감한 정보 노출을 방지하기 위해 적절한 오류 처리 메커니즘을 구현합니다. 강력한 로깅 및 모니터링 시스템을 구현하여 보안 사건을 포착하고 분석합니다.

9. 정기 보안 감사 및 테스트 부족:
   — 위협: 앱의 보안을 정기적으로 평가하고 테스트하지 않아 취약점을 감지하지 못하는 것.
   — 해결책: 정기적인 보안 감사, 침투 테스트 및 취약점 평가를 수행하여 잠재적인 취약점을 식별하고 해결합니다. 코드 검토, 정적 분석 및 동적 스캐닝을 포함한 앱 개발의 모든 단계에서 보안 테스트를 수행합니다.

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

10. 사용자 인식 부족:
    — 위반 사항: 일반적인 보안 위험에 대한 사용자 교육 및 인식 부족으로 인해 사용자가 피싱 공격이나 기타 사회공학 기술에 피해를 입게 됨.
    — 해결책: 사용자에게 교육을 제공하여

# 비동기 통신

시스템 구성 요소가 비동기적으로 통신할 때 메시지가 전달되거나 응답이 반환될 것이라는 보장이 없습니다. 이는 시스템 성능을 향상시키기 위해 결제 업무에서 매우 흔히 사용됩니다. PSP 또는 은행과 같은 외부 시스템도 비동기 통신을 선호합니다. 이 경우 정확성을 어떻게 보장할 수 있을까요?

예를 들어, A 고객이 아마존 앱을 사용하여 무언가를 구매했다고 가정해봅시다. 사용자는 카드 정보를 추가하고 CVV를 입력하고 OTP 인증을 했습니다. 이제 사용자의 계좌에서 결제가 공제되었지만 결제 게이트웨이가 확인을 보내지 않거나 보내는 데 너무 많은 시간이 걸렸습니다. 이제 상인도 결제가 성공했는지 알 수 없습니다.

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

상인이 은행이나 결제 게이트웨이로부터 예상 시간 내에 확인을 받지 못하거나 확인이 전혀 오지 않는 경우 다음 단계를 수행할 수 있습니다:

1. 결제 게이트웨이 상태 모니터링: 일반적으로 상인들은 결제 게이트웨이나 제3자 결제 서비스 제공업체와 통합을 진행합니다. 결제 게이트웨이의 상태를 모니터링하여 확인 프로세스에 영향을 미칠 수 있는 보고된 문제 또는 다운타임을 확인해야 합니다.

2. 결제 게이트웨이 지원팀과 연락하기

3. 결제 로그 및 거래 내역 확인하기

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

4. 결제 요청 다시 시도하기 또는 재전송하기

5. 조정 및 환불: 이것은 관련 서비스 간의 상태를 주기적으로 비교하여 일치하는지 확인하는 실천 방법입니다. 보통 이는 결제 시스템의 마지막 방어선입니다.

매일 PSP 또는 은행은 자사의 클라이언트에게 정산 파일을 전송합니다. 정산 파일에는 은행 계좌의 잔액이 포함되어 있으며, 해당 은행 계좌에서 그날 발생한 모든 거래가 포함되어 있습니다. 조정 시스템은 정산 파일을 구문 분석하여 세부 정보를 장부 시스템과 비교합니다.

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

# 중복 결제를 방지하는 방법은 무엇인가요?

## 아이덴포턴시 :

아이덴포턴시는 중복 결제 요청을 방지하고 결제 프로세스의 무결성을 보장하는 데 중요한 역할을 합니다. 클라이언트가 동일한 요청을 여러 번 보낼 때 동일한 결과를 받도록 보장합니다.

클라이언트(웹 및 모바일 애플리케이션)와 서버 간 통신에서, 아이덴포턴시 키는 일반적으로 클라이언트에 의해 생성되며 일정 기간 후에 만료되는 고유한 값을 나타냅니다. UUID가 아이덴포턴시 키로 자주 사용되며 많은 기술 회사들이 추천합니다. Stripe[19]나 PayPal[20]과 같은 회사들이 그 중 하나입니다. 아이덴포턴트 결제 요청을 수행하려면 아이덴포턴시 키를 HTTP 헤더에 추가해야 합니다: `idempotency-key: key_value`.

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

성능을 최적화하기 위해 서버는 멱등성 키와 관련된 초기 결제 요청의 응답을 캐싱할 수 있습니다. 동일한 키를 사용하여 후속 요청이 수신되면 서버는 캐시된 응답을 검색하고 결제를 다시 처리하지 않고 반환합니다.

이제 몇 가지 도움이 되는 멱등성의 시나리오를 살펴보겠습니다:

## 시나리오 1: 사용자가 결제 버튼을 두 번 클릭한 경우

사용자가 "결제"를 클릭할 때, 멱등성 키가 HTTP 요청의 일부로 결제 시스템에 전송됩니다. 전자 상거래 웹 사이트의 경우, 멱등성 키는 일반적으로 체크아웃 직전의 장바구니 ID입니다.

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

두 번째 요청에 대해서는 이미 idempotency 키를 결제 시스템에서 확인했기 때문에 재시도로 처리됩니다. 요청 헤더에 이전에 지정된 idempotency 키를 포함하면 결제 시스템은 이전 요청의 최신 상태를 반환합니다.

## 시나리오 2: 사용자가 결제를 진행했지만 확인을 받지 못해 다시 "결제"를 클릭하는 경우

결제 서비스는 PSP에 nonce를 보내고, PSP는 해당 토큰을 반환합니다. nonce는 결제 주문을 고유하게 나타내며, 토큰은 해당 nonce에 고유하게 매핑됩니다. 따라서 토큰은 결제 주문과 고유하게 매핑됩니다.

사용자가 "결제" 버튼을 다시 클릭하면 결제 주문이 동일하기 때문에 PSP에 보내는 토큰도 동일합니다. PSP 측에서 idempotency 키로 사용되는 이 토큰을 통해 두 번의 결제를 식별하고 이전 실행의 상태를 반환할 수 있습니다.

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

# 참고 자료

# 결론

여기서 많은 것을 다뤘어요. 면접에서 모든 것을 다 다룰 필요는 없어요. 기본적인 내용만 알려주면 됩니다. 이상적으로, 앱에 통합하는 결제 게이트웨이가 모든 것을 처리해줍니다. 단지 결제 게이트웨이로부터 받은 토큰을 안전하게 보관하면 됩니다. 또한 결제 시스템이 어떻게 작동하는지 알고 있어야 합니다.

다음 글에서 논의할 계획입니다.

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

- 구독 기반 결제를 추가하는 방법
- 결제 실패 또는 재시도 처리 방법

그리고 지갑이 어떻게 작동하는지 알고 싶다면 알려주세요.

이 기사가 도움이 되었길 바랍니다. 난 저수준 시스템 설계에 대해 더 쓰고 싶어하니 댓글 섹션에서 알려주세요. 또는 앞으로의 기사에서 개선할 부분이 있으면 karishma.agr1996@gmail.com 으로 쓰셔도 됩니다. 피드백은 소중합니다.

다른 사람들이 이 기사를 찾을 수 있도록 귀호강을 클릭해주시면 정말 감사하겠습니다 😃 .

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

![image](https://miro.medium.com/v2/resize:fit:1200/0*4S8DGn20jj7avRnz.gif)
